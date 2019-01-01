require('dotenv').config();

const markdownOptions = require('./config/markdown');
const critical = require('./config/extract-critical');

const ssl = process.env.SSL ?
  { key: 'ssl/server.key', cert: 'ssl/server.crt' } :
  false;

module.exports = {
  name: 'www.sivasubramanyam.me',
  url: 'https://www.sivasubramanyam.me/',
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
  md: markdownOptions,
  critical
}
