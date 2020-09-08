importScripts('/static/js/night-mode-stack.js');

onmessage = function(evt) {
  let canvas = evt.data.canvas;
  drawToCanvas(canvas, postMessage);
};
