let hero = '/static/images/hero.jpg';
let heroWebp = '/static/images/hero.webp';

let htmlEl = document.getElementsByTagName('html')[0];
let heroDiv = document.getElementsByClassName('header-home')[0];
if (heroDiv) {
  if (htmlEl.className.includes('webp')) {
    hero = heroWebp;
  }

  let placeholderElement = new Image();
  placeholderElement.src = hero;

  placeholderElement.onload = function() {
    heroDiv.setAttribute('style', `background-image: url(${hero})`);
  }
}
