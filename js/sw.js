
let cacheName = 'rest-v1';

self.addEventListener('install', e=>{
  console.log('service worker: installed');
  e.waitUntil(caches.open(cacheName)
    .then(cache =>{
      console.log('service worker: caching files');
      return cache.addAll([
          '/skeleton',
          '/js/main.js',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          '/css/styles.css',
          '/data/restaurants.json',
          '/imgs/1.jpg',
          '/imgs/2.jpg',
          '/imgs/3.jpg',
          '/imgs/4.jpg',
          '/imgs/5.jpg',
          '/imgs/6.jpg',
          '/imgs/7.jpg',
          '/imgs/8.jpg',
          '/imgs/9.jpg',
          '/imgs/10.jpg',
          '/index.html',
          '/restaurant.html'

        ])
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
  const requestUrl = new URL(e.request.url);
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        e.respondWith(caches.match('/skeleton'));
        return;
      }
    }

  e.respondWith(
    caches.match(e.request)
    .then(response=> {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
