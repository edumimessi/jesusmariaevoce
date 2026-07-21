/* Jesus, Maria e Você — service worker (offline + app) */
const CACHE = 'jesus-maria-e-voce-v4';
const ASSETS = [
  './',
  './index.html',
  './assets/dias.js',
  './assets/santos.js',
  './assets/style.css',
  './assets/liturgia.js',
  './assets/app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde do cache e atualiza os arquivos em seguida.
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      const network = fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          cache.put(request, response.clone());
        }
        return response;
      }).catch(() => null);
      return cached || (await network) || cache.match('./index.html');
    })
  );
});
