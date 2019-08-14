let demoCanvas = document.getElementById('demo');
let demoContext = demoCanvas.getContext('2d');

demoCanvas.width = demoCanvas.height = 300;

function handleDemoOnChange() {
  demoContext.clearRect(0, 0, demoCanvas.width, demoCanvas.height);

  let theta = (document.getElementById('theta').value) * Math.PI / 180;
  let cx = demoCanvas.width / 2;
  let cy = demoCanvas.height / 2;
  let r1 = 100;
  let r2 = 20;

  demoContext.strokeStyle = "grey";
  // center circle
  demoContext.beginPath();
  demoContext.arc(cx, cy, r1, 0, Math.PI * 2);
  demoContext.lineWidth = 2;
  demoContext.stroke();

  // rolling circle
  let x = cx + r1 * Math.cos(theta);
  let y = cy + r1 * Math.sin(theta);
  demoContext.beginPath();
  demoContext.arc(x, y, r2, 0, Math.PI * 2);
  demoContext.stroke();

  // spirograph
  demoContext.beginPath();
  demoContext.strokeStyle = "black";
  demoContext.moveTo(cx + r1 + r2, cy);
  for (let i = 0; i <= theta; i += 0.01) {
    x = cx + r1 * Math.cos(i) + r2 * Math.cos(i * 4);
    y = cy + r1 * Math.sin(i) + r2 * Math.sin(i * 4);
    demoContext.lineTo(x, y);
  }

  demoContext.stroke();
  demoContext.beginPath();

  // dot
  demoContext.fillStyle = "orange";
  demoContext.arc(x, y, demoCanvas.height * 0.01, 0, Math.PI * 2);
  demoContext.fill();
}

handleDemoOnChange();
