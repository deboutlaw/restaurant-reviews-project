
let cacheName = 'rest-v1';

self.addEventListener('install', e => {
  console.log('service worker: installed');
  e.waitUntil(caches.open(cacheName)
    .then(cache => {
      console.log('service worker: caching files');
      return cache.addAll([
          '/js/main.js',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/index.html',
          '/restaurant.html'
        ]);
    })
  );
});


self.addEventListener('activate', e => {
  console.log('service worker: activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
       return Promise.all(
         cacheNames.filter(cacheName => {
          return cacheName.startsWith('rest-') &&
                 cacheName != cacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', e => {
  console.log('service worker: fetching');
      e.respondWith(
        caches.match(e.request)
        .then(response => {
          return response || fetch(e.request);
        })
      );
  });


self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
