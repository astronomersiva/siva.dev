function clonePixels(pixels, width, height) {
  return new ImageData(
    new Uint8ClampedArray(pixels),
    width,
    height
  );
}

const noisyImage = new Image();
noisyImage.src = '/static/images/night-mode/noise.jpg';

const outputCanvas = document.getElementById('noisy-image');
const outputCanvasContext = outputCanvas.getContext('2d');
const outputContainer = document.getElementById('output-container');

let oldWidth = 400;
let oldHeight = 393;
let newWidth = outputContainer.clientWidth;
let newHeight = outputContainer.clientHeight;
outputCanvas.width = newWidth;
outputCanvas.height = newHeight;

noisyImage.onload = function() {
  outputCanvasContext.drawImage(noisyImage, 0, 0);
}

let cached = {};
function increaseBrightness() {
  let newBrightness = parseInt(document.getElementById('brightnessSlider').value);
  let brightnessPixels = outputCanvasContext.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
  let pixelsCopy = clonePixels(brightnessPixels.data, outputCanvas.width, outputCanvas.height);
  for (let i = 0; i < pixelsCopy.data.length; i += 4) {
    if (!cached[i]) {
      cached[i] = pixelsCopy.data[i];
      cached[i + 1] = pixelsCopy.data[i + 1];
      cached[i + 2] = pixelsCopy.data[i + 2];
    }

    pixelsCopy.data[i] = cached[i] + newBrightness;
    pixelsCopy.data[i + 1] = cached[i + 1] + newBrightness;
    pixelsCopy.data[i + 2] = cached[i + 2] + newBrightness;
  }
  outputCanvasContext.putImageData(pixelsCopy, 0, 0);
}

let stackContainer = document.getElementById('stack-container');
stackContainer.style.height = `${stackContainer.clientWidth}px`;
stackContainer.style.background = '#333';

function stackImages(button) {
  button.disabled = true;
  button.innerText = 'Stacking Images';

  let canvas = document.querySelector('#canvas');
  let stackContainer = document.getElementById('stack-container');
  canvas.width = stackContainer.clientWidth;
  canvas.height = stackContainer.clientWidth;

  if (canvas.transferControlToOffscreen) {
    let worker = new Worker('/static/js/night-mode-worker.js');
    let offscreen = canvas.transferControlToOffscreen();
    worker.postMessage({ canvas: offscreen }, [offscreen]);

    worker.onmessage = function(event) {
      updateProgress(event.data);
    }
  } else {
    function postMessage(progress) {
      updateProgress(progress);
    }

    let stack = document.createElement('script');
    stack.setAttribute('src', '/static/js/night-mode-stack.js');
    stack.onload = function() {
      drawToCanvas(canvas, postMessage);
    }

    document.body.appendChild(stack);
  }
}

function updateProgress(progress) {
  document.getElementById('result').innerText = `🚧 Processing ${progress} of 10`;
  if (progress === 10) {
    document.getElementById('result').innerText = `✔️ Processing complete. Showing Before, After.`;
    document.getElementById('stack-images').style.display = 'none';
  }
}
