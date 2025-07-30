/*
 * service-worker.js – Service Worker basique pour permettre à l'application
 * de fonctionner hors ligne et de s'installer comme une PWA. Ce fichier
 * met en cache les ressources principales de l'application et sert les
 * fichiers en cache lorsqu'ils sont demandés. Si une ressource n'est pas
 * trouvée dans le cache, elle est récupérée depuis le réseau.
 */

const CACHE_NAME = 'roue-cache-v1';
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

// Installation : pré-cache toutes les ressources nécessaires.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activation : supprimer les anciens caches si besoin.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes : répondre avec le cache en priorité, sinon depuis le réseau.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
