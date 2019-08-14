let hero = '/static/images/hero-page.jpg';
let heroWebp = '/static/images/hero-page.webp';
let heroPost = '/static/images/hero-post.jpg';
let heroPostWebp = '/static/images/hero-post.webp';

if (window.innerWidth > 760) {
  let html = document.getElementsByTagName('html')[0];
  let heroDiv = document.getElementsByClassName('hero-page')[0];
  if (heroDiv) {
    if (html.className.includes('webp')) {
      hero = heroWebp;
    }
  } else {
    heroDiv = document.getElementsByClassName('hero-post')[0];
    hero = heroPost;

    if (html.className.includes('webp')) {
      hero = heroPostWebp;
    }
  }

  if (heroDiv) {
    let placeholderElement = new Image();
    placeholderElement.src = hero;

    placeholderElement.onload = function() {
      heroDiv.setAttribute('style', `background-image: url(${hero})`);
    }
  }
}
