const isWebpSupported = document.getElementsByTagName('html')[0].className.includes('webp');

function getCDNUrl(src) {
  let resizeServer = '';
  if (!window.location.hostname.includes('127.0.0.1')) {
    resizeServer = 'https://cdn.sivasubramanyam.me/unsafe';
    resizeServer = `${resizeServer}/${window.innerWidth < 700 ? '700x' : '1400x'}`;
    let hostName = window.location.hostname;
    hostName = hostName.startsWith('https') ? hostName : `https://${hostName}`;
    resizeServer = `${resizeServer}/filters:no_upscale()${isWebpSupported ? ':format(webp)' : ''}/${hostName}`;
  }

  return `${resizeServer}${src}`;
}

// Based on https://github.com/deanhume/lazy-observer-load/blob/master/lazy-load.js

(() => {
  // Get all of the images that are marked up to lazy load
  const images = document.querySelectorAll('.img-responsive');
  const config = {
    rootMargin: '100px 0px',
    threshold: 0.01
  };

  let imageCount = images.length;
  let observer;

  // If we don't have support for intersection observer, loads the images immediately
  if (!('IntersectionObserver' in window)) {
    loadImagesImmediately(images);
  } else {
    // It is supported, load the images
    observer = new IntersectionObserver(onIntersection, config);

    // foreach() is not supported in IE
    for (let i = 0; i < images.length; i++) { 
      let image = images[i];
      if (image.classList.contains('img-responsive--handled')) {
        continue;
      }

      observer.observe(image);
    }
  }

  /**
   * Fetchs the image for the given URL
   * @param {string} url 
   */
  function fetchImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = getCDNUrl(url);
      image.onload = resolve;
      image.onerror = function() {
        image.src = url;
        image.onerror = null;
        image.onload = reject;
      };
    });
  }

  /**
   * Preloads the image
   * @param {object} image 
   */
  function preloadImage(image) {
    let src = image.dataset.imgSrc;
    if (!src) {
      return;
    }

    return fetchImage(src)
      .then(() => { applyImage(image, src); })
      .catch(() => { applyImage(image, src, true); });
  }

  /**
   * Load all of the images immediately
   * @param {NodeListOf<Element>} images 
   */
  function loadImagesImmediately(images) {
    // foreach() is not supported in IE
    for (let i = 0; i < images.length; i++) { 
      let image = images[i];
      preloadImage(image);
    }
  }

  /**
   * Disconnect the observer
   */
  function disconnect() {
    if (!observer) {
      return;
    }

    observer.disconnect();
  }

  /**
   * On intersection
   * @param {array} entries 
   */
  function onIntersection(entries) {
    // Disconnect if we've already loaded all of the images
    if (imageCount === 0) {
      disconnect();
    }

    // Loop through the entries
    for (let i = 0; i < entries.length; i++) { 
      let entry = entries[i];
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        imageCount--;

        // Stop watching and load the image
        observer.unobserve(entry.target);
        preloadImage(entry.target);
      }
    }
  }

  /**
   * Apply the image
   * @param {object} img 
   * @param {string} src 
   */
  function applyImage(img, src, skipCDN) {
    img.classList.add('ajanta-hide');

    let lazyLoadedImage = img.nextElementSibling;
    let loadingIndicator = lazyLoadedImage.dataset.loaded;
    let loadingIndicatorDiv = document.querySelector(`[data-loading="${loadingIndicator}"]`)
    if (loadingIndicatorDiv) {
      loadingIndicatorDiv.style.opacity = 0;
      loadingIndicatorDiv.style.animationPlayState = 'paused';
    }

    // Prevent this from being lazy loaded a second time.
    img.classList.add('img-responsive--handled');

    lazyLoadedImage.src = skipCDN ? src : getCDNUrl(src);
    lazyLoadedImage.setAttribute('alt', img.getAttribute('alt'));
    lazyLoadedImage.classList.add('ajanta-show');
  }
})();
