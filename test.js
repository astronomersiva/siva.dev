require('dotenv').config();

const config = require('./lego');

const fs = require('fs');
const pLimit = require('p-limit');

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
const differencify = new Differencify({ debug: true });

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

      testPromises.push(
        limit(async() => await differencify
          .init({ testName: testName })
          .launch(/** { headless: false } */)
          .newPage()
          .setViewport({ width: 1600, height: 1200 })
          .goto(url)
          .waitFor(1000)
          .screenshot({ fullPage: true })
          .toMatchSnapshot()
          .result((result) => {
            if (result === true) {
              console.log(`Test passed for ${url}`)
            }
          })
          .close()
          .end()
        )
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
  }

  process.exit(!testResult);
})();
