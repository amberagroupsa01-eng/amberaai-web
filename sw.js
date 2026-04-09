// Tracium Service Worker — Cache désactivé
const CACHE_NAME = 'tracium-v2';

// Vider tous les anciens caches au démarrage
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Ne jamais utiliser le cache — toujours aller sur le réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Hors ligne', { status: 503 });
    })
  );
});
