let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let dpr = window.devicePixelRatio;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight * 5;

context.lineWidth = 1;

let cx = canvas.width / 2;
let cy = canvas.height / 2;

function drawSpirograph(context, cx, cy, radius1, radius2, d, n) {
  let x;
  let y;
  let theta;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#052029';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#E5AEB3';

  context.beginPath();

  for (theta = 0; theta <= Math.PI * n; theta += 0.01) {
    x = cx + (radius1 + radius2) * Math.cos(theta) - d * Math.cos(theta * ((radius1+radius2)/radius2));
    y = cy + (radius1 + radius2) * Math.sin(theta) - d * Math.sin(theta * ((radius1+radius2)/radius2));
    context.lineTo(x, y);
  }

  context.stroke();
}

function handleOnChange() {
  let R = parseInt(document.getElementById('R').value || 0);
  let r = parseInt(document.getElementById('r').value || 0);
  let d = parseInt(document.getElementById('d').value || 0);
  let n = parseInt(document.getElementById('n').value || 20);

  drawSpirograph(context, canvas.width / 2, canvas.height / 2, R, r, d, n);
}

document.getElementById('R').value = '-100';
document.getElementById('r').value = '20';
document.getElementById('d').value = '50';
document.getElementById('n').value = '90';

drawSpirograph(context, canvas.width / 2, canvas.height / 2, -100, 20, 50, 100);
