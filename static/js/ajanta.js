let ajantaImages = document.getElementsByClassName('ajanta');
for (let ajanta of ajantaImages) {
  let [pixelated] = ajanta.getElementsByClassName('pixelated');
  let [original] = ajanta.getElementsByClassName('original');

  original.onload = function() {
    pixelated.classList.add('ajanta-hide');
    original.classList.add('ajanta-show');
    original.setAttribute('alt', pixelated.getAttribute('alt'));
  }

  let src = pixelated.getAttribute('data-src');
  if (src) {
    original.src = src;
  }
}
