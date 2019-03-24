require('dotenv').config();

const path = require('path');
const md = require('./config/markdown');
const critical = require('./config/extract-critical');
const rss = require('./config/rss');

const ssl = process.env.SSL
  ? { key: 'ssl/server.key', cert: 'ssl/server.crt' }
  : false;

let cacheDir = '';
if (process.env.NETLIFY_BUILD_BASE) {
  cacheDir = path.join(process.env.NETLIFY_BUILD_BASE, 'cache', 'lego');
}

module.exports = {
  name: 'siva.dev',
  url: 'https://siva.dev/',
  author: 'Sivasubramanyam A',
  skipDirsInPostUrls: true,
  inlineSource: true,
  server: {
    port: 1511,
    host: process.env.HOST || 'localhost',
    ssl
  },
  htmlMinifier: {
    minifyJS: {
      output: { quote_style: 3 }
    }
  },
  md,
  critical,
  rss,
  cacheDir
}
