// Learned Cubic Disarray here - https://generativeartistry.com/tutorials/cubic-disarray/
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const size = window.innerWidth / 4;
const dpr = window.devicePixelRatio;

canvas.width = size * dpr;
canvas.height = size * dpr;

context.scale(dpr, dpr);
context.lineWidth = 2;
context.globalCompositeOperation = 'multiply'

let squareSize = window.innerWidth > 800 ? 30 : 10;

let rows;
for (let i = squareSize; i <= size - squareSize; i += squareSize) {
  rows += 1;
}

let colors = [
  '#B5838D',
  '#E5989B',
  '#E5989B',
  '#F4ACB7',
  '#F4ACB7',
  '#FFCAD4',
  '#FFCAD4',
  '#ffdde4',
  '#ffdde4'
];

let rowsForEachColor = rows / colors.length;

function draw(width, height, row) {
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = colors[row] || colors[colors.length - 1];
  context.rect(-width/2, -height/2, width, height);
  context.stroke();
}

function drawSquares(randomDisplacement = 15, rotateMultiplier = 20) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let i;
  let row;

  for (i = squareSize, row = 0; i <= size - squareSize; i += squareSize,row = 0) {
    for(let j = squareSize; j <= size - squareSize; j+= squareSize,row++) {
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      let rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;
  
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      let translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

      context.save();
      context.translate(i + translateAmt, j);
      context.rotate(rotateAmt);
      draw(squareSize, squareSize, row);
      context.restore();
    }
  }
}

drawSquares();

let microphone;
let toggle = document.querySelector('.pointer');

function respondToAmbientNoise() {
  toggle.textContent = 'Stop Interaction ⏹️';
  toggle.onclick = stopResponding;

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
      let audioContext = new AudioContext();
      let analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      javascriptNode.onaudioprocess = function() {
        let array = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(array);
        let values = 0;
        let length = array.length;

        for (let i = 0; i < length; i++) {
          values += (array[i]);
        }

        let average = (values / length) % 20;
        drawSquares(average, average);
    }
    })
    .catch(function(err) {});
}

function stopResponding() {
  microphone.disconnect();
  toggle.textContent = 'Start Interaction ▶️';
  toggle.onclick = respondToAmbientNoise;
}
