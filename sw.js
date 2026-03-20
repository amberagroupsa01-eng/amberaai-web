const CACHE_NAME = 'ambera-ai-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.html',
  '/auth.html',
  '/dashboard.html',
  '/register.html',
  '/payment.html',
  '/shop.html',
  '/parrainage.html',
  '/notifications.html',
  '/blocage.html',
  '/police.html',
  '/assureurs.html',
  '/chat.html',
  '/puce-fantome.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
