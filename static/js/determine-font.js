let isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
if (!isMacLike) {
  let rootElement = document.getElementsByTagName('html')[0];
  rootElement.classList.add('inter');
}
