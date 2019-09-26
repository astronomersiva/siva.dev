const html = document.documentElement;
const DARK_MODE = 'dark-mode';
const LIGHT_MODE = 'light';

let currentMode = localStorage.getItem('mode');

function applyThemeColor() {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    if (currentMode === DARK_MODE) {
      meta.setAttribute('content', '#12141c');
    } else {
      meta.setAttribute('content', '#f0fcfd');
    }
  }
}

function applyMode() {
  let html = document.documentElement;
  currentMode = localStorage.getItem('mode');

  // handle macOS dark theme preference.
  // when the user hasn't set a preference in the site and preferred
  // scheme is dark, default to dark
  let darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (!currentMode && darkModeQuery.matches) {
    localStorage.setItem('mode', DARK_MODE);
    currentMode = DARK_MODE;
  }

  if (currentMode === DARK_MODE) {
    html.classList.add(DARK_MODE);
  } else {
    html.classList.remove(DARK_MODE);
  }

  applyThemeColor();
}

applyMode();

document.addEventListener('DOMContentLoaded', (event) => {
  let darkModeToggle = document.getElementById('dark-mode-toggle');
  applyThemeColor();

  function handleDarkModeToggle() {
    let currentMode = localStorage.getItem('mode');
    localStorage.setItem('mode', currentMode === DARK_MODE ? LIGHT_MODE : DARK_MODE);
    applyMode();
    document.activeElement.blur();
  }

  darkModeToggle.onclick = function() {
    handleDarkModeToggle();
  }

  darkModeToggle.onkeypress = function(event) {
    if (event.keyCode === 13) {
      handleDarkModeToggle();
    }
  }
})
