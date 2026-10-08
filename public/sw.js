const CACHE_VERSION = 'digital-sathi-v1.0.0';
const STATIC_CACHE = `ds-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `ds-runtime-${CACHE_VERSION}`;

// Core static assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/pwa-icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-192.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1. Only handle GET requests; never cache POST, PUT, DELETE, etc.
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 2. Ignore non-http/https schemes (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // 3. Strictly bypass and NEVER cache backend/API calls, MongoDB routes, auth endpoints, or TTS proxy
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.includes('/auth') ||
    url.pathname.includes('/user') ||
    url.pathname.includes('/profile') ||
    url.pathname.includes('/db') ||
    url.hostname.includes('onrender.com') ||
    url.hostname.includes('mongodb.net') ||
    url.hostname.includes('translate.google.com')
  ) {
    return;
  }

  // 4. HTML / Navigation requests: Network First, fallback to cached index.html for offline support
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return caches.match('/');
        })
    );
    return;
  }

  // 5. Static assets (JS, CSS, images, fonts): Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.json') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 6. Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseClone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
