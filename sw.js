/* Jesus, Maria e Você — service worker (offline + app) */
const CACHE = 'jesus-maria-e-voce-v3';
const ASSETS = [
  './',
  './index.html',
  './assets/dias.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde do cache na hora e atualiza em segundo plano.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Não intercepta o contador de visitas (serviço externo)
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      return cached || (await network) || cache.match('./index.html');
    })
  );
});
