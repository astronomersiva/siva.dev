onmessage = function(evt) {
  let canvas = evt.data.canvas;
  let assetMap = evt.data.assetMap;
  let src = assetMap['/static/js/night-mode-stack.js'];
  importScripts(src);
  drawToCanvas(canvas, postMessage, assetMap);
};
