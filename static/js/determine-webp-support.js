let isWebp = () => document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');
if (isWebp()) {
  let html = document.getElementsByTagName('html')[0];
  html.className = 'webp';
}
