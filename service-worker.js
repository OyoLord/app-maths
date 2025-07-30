/*
 * service-worker.js – Met en cache les fichiers de l'application pour permettre
 * un fonctionnement hors ligne. Les PDFs sont chargés en ligne au moment de
 * l'ouverture et ne sont pas pré-cachés.
 */

const CACHE_NAME = 'my-app-cache-v1';
const URLS_TO_CACHE = [
  './',
  './home.html',
  './index.html',
  './math.html',
  './timer.html',
  './style.css',
  './manifest.json',
  './icon.png',
  './script/wheel.js',
  './script/math.js',
  './script/timer.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.map(name => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
