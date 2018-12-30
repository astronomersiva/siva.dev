require('dotenv').config();

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
  critical: {
    inline: true,
    dimensions: [
      {
        height: 800,
        width: 470
      }, {
        height: 900,
        width: 1200
      }
    ],
    penthouse: {
      timeout: 150000
    }
  },
  htmlMinifier: {
    minifyJS: {
      output: { quote_style: 3 }
    }
  }
}
