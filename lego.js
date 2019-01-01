require('dotenv').config();

const markdownOptions = require('./config/markdown');
const critical = require('./config/extract-critical');

module.exports = {
  name: 'www.sivasubramanyam.me',
  url: 'https://www.sivasubramanyam.me/',
  skipDirsInPostUrls: true,
  inlineSource: true,
  server: {
    port: 1511,
    host: process.env.HOST,
    ssl: {
      key: 'ssl/server.key',
      cert: 'ssl/server.crt'
    }
  },
  htmlMinifier: {
    minifyJS: {
      output: { quote_style: 3 }
    }
  },
  md: markdownOptions,
  critical
}
