function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let pixels;
let originalPixels;
let context;

async function showDiff() {
  await sleep(500);
  context.putImageData(pixels, 0, 0);
  await sleep(500);
  context.putImageData(originalPixels, 0, 0);

  requestAnimationFrame(showDiff);
}

async function drawToCanvas(canvas, postMessage) {
  postMessage(1);

  context = canvas.getContext('2d');

  let newWidth = context.canvas.width;
  let newHeight = context.canvas.height;
  let oldWidth = 1000;
  let oldHeight = 1000;
  context.scale(newWidth / oldWidth, newHeight / oldHeight);

  let response = await fetch('/static/images/night-mode/examples/1.jpg');
  let fileBlob = await response.blob();
  let bitmap = await createImageBitmap(fileBlob);

  context.drawImage(bitmap, 0, 0);

  pixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  originalPixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

  for (let n = 2; n <= 10; n++) {
    postMessage(n);

    let response = await fetch(`/static/images/night-mode/examples/${n}.jpg`);
    let fileBlob = response.blob();

    let promises = [fileBlob, sleep(1000)];
    let [image] = await Promise.all(promises);

    let bitmap = await createImageBitmap(image);
    context.drawImage(bitmap, 0, 0);

    let newPixels = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < newPixels.data.length; i++) {
      pixels.data[i] = ((pixels.data[i]*(n - 1)) + newPixels.data[i])/((n - 1) + 1)
    }

    context.putImageData(pixels, 0, 0);
  }

  showDiff();
}
