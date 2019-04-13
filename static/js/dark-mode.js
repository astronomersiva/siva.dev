function applyMode() {
  let body = document.body;
  let currentMode = localStorage.getItem('mode');
  let toggle = document.getElementById('dark-mode-toggle');

  // handle macOS dark theme preference.
  // when the user hasn't set a preference in the site and preferred
  // scheme is dark, default to dark
  let darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (!currentMode && darkModeQuery.matches) {
    localStorage.setItem('mode', 'dark');
    currentMode = 'dark';
  }

  let meta = document.querySelector('meta[name="theme-color"]');

  if (currentMode === 'dark') {
    body.classList.add('dark');
    toggle.textContent = '🌖';
    toggle.setAttribute('title', 'Toggle Light Mode');
    meta.setAttribute('content', '#1e2227');
  } else {
    body.classList.remove('dark');
    toggle.textContent = '🌘';
    toggle.setAttribute('title', 'Toggle Dark Mode');
    meta.setAttribute('content', '#0000ff');
  }
}

applyMode();

let darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.onclick = function() {
  let currentMode = localStorage.getItem('mode');
  localStorage.setItem('mode', currentMode === 'dark' ? 'light' : 'dark');
  applyMode();
}
