let ajantaImages = document.getElementsByClassName('ajanta');
let htmlElement = document.getElementsByTagName('html')[0];

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
    let webpSrc = htmlElement.className.includes('webp') && pixelated.getAttribute('webp');
    if (webpSrc) {
      original.src = webpSrc;
    } else {
      original.src = src;
    }
  }
}
