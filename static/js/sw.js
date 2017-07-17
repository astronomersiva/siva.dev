var CACHE_NAME = 'sivasubramanyam.me';
var urlsToCache = [
  '/',
  '/static/css/styles.css',
  '/static/font-awesome.selected/css/font-awesome.selected.css',
  '/static/js/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
