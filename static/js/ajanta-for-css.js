function lazyLoadBackground() {
  let isDarkMode = localStorage.getItem('mode') === 'dark-mode';

  let heroDiv = document.getElementsByClassName('header-home')[0];
  if (heroDiv) {
    let hero = '/static/images/bhutan.jpg';
    let style;

    if (window.matchMedia('(max-width: 479px)').matches) {
      style = isDarkMode
        ? 'background: #12141c'
        : `background: #d6e6f2`;

      heroDiv.setAttribute('style', style);
    } else {
      style = isDarkMode
        ? `background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${hero})`
        : `background-image: url(${hero})`;

      let placeholderElement = new Image();
      placeholderElement.src = hero;
    
      placeholderElement.onload = function() {
        heroDiv.setAttribute('style', style);
      }
    }
  }
}

window.addEventListener('load', lazyLoadBackground);
