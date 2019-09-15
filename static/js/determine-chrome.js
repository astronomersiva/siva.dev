let isChrome = !!window.chrome;
if (isChrome) {
  let rootElement = document.getElementsByTagName('html')[0];
  rootElement.classList.add('enable-animations');
}
