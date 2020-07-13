const fs = require('fs');
const HEADERS = './_headers';

const _headers = fs.readFileSync(HEADERS).toString();
const assetMap = JSON.parse(fs.readFileSync('./build/static/assetMap.json'));

let revisionedHero = assetMap['/static/images/bhutan.jpg'];
let linkHeader = `Link: <${revisionedHero}>; rel=preload; as=image`;

let serverPushHeader = `/\n  ${linkHeader}\n/blog/\n  ${linkHeader}\n/art/\n  ${linkHeader}`;

fs.writeFileSync(HEADERS, `${_headers.trim()}\n${serverPushHeader}`);
