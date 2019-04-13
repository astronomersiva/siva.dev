let leftEye = document.getElementsByClassName('eye')[0];
let rightEye = document.getElementsByClassName('eye')[1];

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function positionIris(element, event) {
  let rect = element.getBoundingClientRect();
  let x = rect.left - event.clientX;
  let y = rect.top - event.clientY;
  let angle = Math.atan2(y, x);
  // this magic number 40 is due to position absolute
  element.style.transform = `rotate(${toDegrees(angle) - 40}deg)`;
}

function onMouseMove(event) {
  positionIris(leftEye, event);
  positionIris(rightEye, event);
}

// no use in doing this for touch events
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
  let body = document.body;
  body.classList.add('animate');
  document.addEventListener('mousemove', onMouseMove);
}
