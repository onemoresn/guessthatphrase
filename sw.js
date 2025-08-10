// This is the service worker script (sw.js)
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    const cacheName = 'guess-the-phrase-cache-v1';
    const filesToCache = [
        '/',
        '/index.html',
        '/manifest.json',
        'https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap'
    ];

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Caching assets.');
            return cache.addAll(filesToCache).catch(err => {
                console.error('Failed to cache files:', err);
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
