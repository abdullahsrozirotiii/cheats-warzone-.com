/* WarzoneCheats — offline fallback + static asset cache (Cloudflare Pages) */
const CACHE = 'warzonecheats-static-v6';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  '/',
  '/offline.html',
  '/favicon.webp',
  '/site.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches from previous SW versions
      caches
        .keys()
        .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
      // Enable navigation preload — cuts TTFB for repeat navigations
      self.registration.navigationPreload?.enable(),
    ]).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isPrecached = PRECACHE.includes(url.pathname);

  // Never cache large videos or non-precached raw images
  if (!isPrecached && (/\.(mp4|webm|mov)$/i.test(url.pathname) || url.pathname.startsWith('/videos/'))) {
    return;
  }

  const isOptimizedImage = /\.(webp|avif|svg)$/i.test(url.pathname);
  const isStaticBundle =
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/_astro/');

  // Cache-first for optimized images — repeat visits paint instantly.
  if (isOptimizedImage) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      }),
    );
    return;
  }

  // Network-first for navigations / HTML; cache static bundles on success.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && isStaticBundle) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
        }
        return Response.error();
      }),
  );
});
