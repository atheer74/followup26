const CACHE_NAME = 'doc-management-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/vite.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Activate worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages
  );
});

self.addEventListener('fetch', event => {
    // Stale-while-revalidate strategy
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // Don't cache non-GET requests or responses from chrome-extension://
                    if (event.request.method === 'GET' && !event.request.url.startsWith('chrome-extension://')) {
                       cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                  // The network failed, do nothing, the cached response (if any) is already returned.
                });

                // Return cached response if available, otherwise wait for network
                return response || fetchPromise;
            });
        })
    );
});
