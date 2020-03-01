let ajantaImages = document.getElementsByClassName('ajanta');
let htmlElement = document.getElementsByTagName('html')[0];

for (let ajanta of ajantaImages) {
  let [pixelated] = ajanta.getElementsByClassName('pixelated');
  let [original] = ajanta.getElementsByClassName('original');

  let src = pixelated.getAttribute('data-src');

  original.onload = function() {
    pixelated.classList.add('ajanta-hide');
    original.classList.add('ajanta-show');
    original.setAttribute('alt', pixelated.getAttribute('alt'));
  }

  original.onerror = function() {
    original.src = pixelated.getAttribute('data-src');
    original.onerror = null;
  }

  if (src) {
    let canResize = !pixelated.hasAttribute('data-skip-cdn');
    let isWebpAvailable = htmlElement.className.includes('webp');
    let resizeServer = '';
    if (canResize && !window.location.hostname.includes('127.0.0.1')) {
      resizeServer = 'https://cdn.sivasubramanyam.me/unsafe';
      resizeServer = `${resizeServer}/${window.innerWidth < 700 ? '700x' : '1400x'}`;
      resizeServer = `${resizeServer}/filters:no_upscale()${isWebpAvailable ? ':format(webp)' : ''}/${window.location.hostname}`;
    }

    original.src = `${resizeServer}${src}`;
  }
}
