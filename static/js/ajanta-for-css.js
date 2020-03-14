function lazyLoadBackground() {
  let hero = '/static/images/bhutan.jpg';
  let heroWebp = '/static/images/bhutan.jpg';
  let heroMobile = '/static/images/bhutan-mobile.jpg';
  let isDarkMode = localStorage.getItem('mode') === 'dark-mode';
  
  let htmlEl = document.getElementsByTagName('html')[0];
  let heroDiv = document.getElementsByClassName('header-home')[0];
  if (heroDiv) {
    if (htmlEl.className.includes('webp')) {
      hero = heroWebp;
    }
  
    if (window.matchMedia('(max-width: 479px)').matches) {
      hero = heroMobile;
    }
  
    let placeholderElement = new Image();
    placeholderElement.src = hero;
  
    placeholderElement.onload = function() {
      if (isDarkMode) {
        heroDiv.setAttribute('style', `background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${hero})`);
      } else {
        heroDiv.setAttribute('style', `background-image: url(${hero})`);
      }
    }
  }
}

window.addEventListener('load', lazyLoadBackground);
