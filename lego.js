require('dotenv').config();

const md = require('./config/markdown');
const critical = require('./config/extract-critical');
const rss = require('./config/rss');

const ssl = process.env.SSL ?
  { key: 'ssl/server.key', cert: 'ssl/server.crt' } :
  false;

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
  rss
}
