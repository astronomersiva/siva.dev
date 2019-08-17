---
title: Adding Dark Mode to a Static Site
date: August 17, 2019
description: A guide on implementing Dark Mode using Local Storage and JavaScript.
tags: JavaScript
code: true
order: 41
featured: true
showOnHomePage: true
---

I recently implemented *Dark Mode* on this site and it proved to be an interesting endeavour.

The styles themselves were quite simple to apply thanks to
[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

```css
html {
  --color-text: #1f1f1f;
  --color-bg: white;
}

html.dark-mode {
  --color-text: #a8a8a8;
  --color-bg: #121212;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}
```

By adding/removing the `dark-mode` class to the `<html>` element, it's possible to change the styles of
different elements on the site. Maintaining the user's choice between page transition is a little
more work as static sites like mine do not have a server and database to persist data. Therefore,
it has to be stored at the user's browser itself. **Local Storage** is a good choice for this.
Unlike cookies, it doesn't expire and there's no need to worry about compliance with privacy laws
as the contents of Local Storage aren't automatically sent to the server with each network call.

The script itself is rather straightforward. The value of an entry in Local Storage is checked
and the class `dark-mode` is added to `html`'s `classList` if its value is `dark`. I also handled
the newly introduced `prefers-color-scheme` [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).


```javascript
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';
const THEME = 'mode';

function applyTheme() {
  // Do not use `<body>` here as it wouldn't be available yet.
  let html = document.documentElement;
  let currentMode = localStorage.getItem(THEME);

  // Handle macOS dark theme preference.
  // When the user hasn't set a preference in the site and the preferred
  // scheme is dark, default to dark.
  let darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (!currentMode && darkModeQuery.matches) {
    localStorage.setItem(THEME, DARK_MODE);
    currentMode = DARK_MODE;
  }

  if (currentMode === DARK_MODE) {
    html.classList.add(DARK_MODE);
  } else {
    html.classList.remove(DARK_MODE);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  darkModeToggle.onclick = function() {
    let currentMode = localStorage.getItem(THEME);
    localStorage.setItem(THEME, currentMode === DARK_MODE ? LIGHT_MODE : DARK_MODE);
    applyTheme();
  }
});
```

To avoid white flashes during page transitions when the user has set dark mode, it is
important to place this script immediately after opening the `<head>` tag. If you are
using [critical](https://github.com/addyosmani/critical/) to extract critical styles,
you will have to force include dark mode related styles to avoid these flashes.
This can be done by passing the corresponding styles to [penthouse](https://github.com/addyosmani/critical/)
using the `forceInclude` option. Example,

```javascript
// critical.config.js
{
  penthouse: {
    forceInclude: ['.dark-mode > body']
  }
}
```
