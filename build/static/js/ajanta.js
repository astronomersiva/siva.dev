let ajantaImages = document.getElementsByClassName('ajanta');
for (let ajanta of ajantaImages) {
  let [pixelated] = ajanta.getElementsByClassName('pixelated');
  let [original] = ajanta.getElementsByClassName('original');

  original.onload = function() {
    pixelated.classList.add('ajanta-hide');
    original.classList.add('ajanta-show');
    original.setAttribute('alt', pixelated.getAttribute('alt'));
  }

  let src = pixelated.src.replace('/lowres', '');
  let imageFormat = pixelated.getAttribute('data-image-format');
  if (imageFormat) {
    src = src.replace('png', imageFormat);
  }

  original.src = src;
}
