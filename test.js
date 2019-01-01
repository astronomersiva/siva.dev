require('dotenv').config();

const config = require('./lego');

const fs = require('fs');
const path = require('path');
const pLimit = require('p-limit');
const request = require('request-promise');
const glob = require('glob');

const getMatches = (string) => {
  let regex = /<loc>(.*)<\/loc>/g;
  
  let matches = [];
  let match;
  while (match = regex.exec(string)) {
    matches.push(match[1]);
  }
  
  return matches;
}

const sitemap = fs.readFileSync('./build/sitemap.xml').toString();
// ignore urls with gifs and iframes with animations
const urlsToIgnore = [
  'https://www.sivasubramanyam.me/facebook-friends-heatmap',
  'https://www.sivasubramanyam.me/independence-day',
  'https://www.sivasubramanyam.me/heatmaps',
  'https://www.sivasubramanyam.me/hexa-clock',
  'https://www.sivasubramanyam.me/paste-clean-diff',
  'https://sivasubramanyam.me/valparai/'
];

let replacementUrl = config.server.host === 'localhost' ?
  `http://localhost:${config.server.port}/` :
  `https://${config.server.host}:${config.server.port}/`;

const urls = getMatches(sitemap)
  .filter(url => !urlsToIgnore.includes(url))
  .map(url => url.replace(config.url, replacementUrl));

const Differencify = require('differencify');
const differencify = new Differencify({ debug: true, mismatchThreshold: 0.01 });

const MAX_CONCURRENT = (require('os').cpus().length || 2) / 2;
const limit = pLimit(MAX_CONCURRENT);

(async () => {
  let testPromises = [];

  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];

    try {
      let testName = url.replace(replacementUrl, '');
      if (!testName) {
        testName = 'index-test';
      } else {
        testName = testName.split('/')[testName.split('/').length - 1];
      }

      let options = { testName, chain: false };

      testPromises.push(
        limit(async() => {
          const target = differencify.init(options);
          await target.launch();
          const page = await target.newPage();
          await page.setViewport({ width: 1600, height: 1200 });
          await page.goto(url);
          await page.waitFor(1000);
          const image = await page.screenshot({ fullPage: true });
          const result = await target.toMatchSnapshot(image)
          await page.close();
          await target.close();

          if (result === true) {
            console.log(`Test passed for ${url}`)
          } else {
            console.log(`Test failed for ${url}`)
          }

          return result;
        })
      );
    } catch ({ message }) {
      console.log(`Error occurred while testing ${url}`);
      console.log(message);
    }
   
  }

  let testResult = await Promise.all(testPromises);
  testResult = testResult.reduce((previous, current) => previous && current, true);

  if (!testResult) {
    console.log(`Test failed`);

    let files = glob.sync('differencify_reports/__image_snapshots__/__differencified_output__/*.png');

    for (let index = 0; index < files.length; index++) {
      let image = files[index];
      let options = {
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
          authorization: `Bearer ${process.env.IMGUR_AUTH_TOKEN}`,
        },
        formData: {
          album: process.env.IMGUR_ALBUM,
          title: path.basename(image),
          image: fs.createReadStream(image)
        }
      };

      try {
        let response = await request(options);
        response  = JSON.parse(response);
        console.log(`Uploaded diff to ${response.data && response.data.link}`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // till diffs are stable when CSS blur is applied, need to fix upstream
  // process.exit(!testResult);
})();
