let images = document.getElementsByTagName('img');
for (let image of images) {
  // old handling for lazy loading images
  let lazySrc = image.getAttribute('data-src');
  if (lazySrc) {
    image.src = lazySrc;
  }

}
