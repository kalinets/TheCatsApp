var CACHE_NAME = 'the-cats-app-cache-v1'
var urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/bundle.js',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('fetch', function(event) {
  if (navigator.onLine) {
    return fetch(event.request.clone()).then(function (response) {
      if (!response || response.status !== 200) {
        return response
      }

      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, response.clone())
      })

      return response
    }).catch(function (err) {
      console.log(err)
    })
  } else {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response) {
        // A cached response has been found!
        return response
      } else {
        // We don't have a cached response, initiate a fetch...
        return fetch(event.request)
      }
    }))
  }
})
