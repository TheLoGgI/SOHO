const cacheName = 'v1'

// Source: https://gist.github.com/prof3ssorSt3v3/ec11c6dfd64e7700b2918b3a52f4ddd4
const cacheAssets = [
    'index.html',
    '/css/*',
    '/js/*',
    '/pages/*',
    '/favicons/*',
    'https://soho.lasseaakjaer.com/wp-json/wc/store/products'
]


// Install Event
self.addEventListener('install', (e) => {
    // Service Worker Installed
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            // Adding files to cache
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting()) 
    )

})

// Activate Event - clean up old cache
self.addEventListener('activate', (e) => {
    // Service Worker Activated
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        // Clean Old Service Worker Cache
                        return caches.delete(cache)
                    }
                })
            )
        })
    )

})

self.addEventListener('fetch', (fetchEvent) => {

    // Looking for an image, check cache othervise fetch and put to cache
    if (fetchEvent.request.destination === 'image') {
        fetchEvent.respondWith(async function() {

            // Checks cache for requst data
            const cachedResponse = await caches.match(fetchEvent.request)

            // If requst data exists return the data as response
            if (cachedResponse) return cachedResponse

            // Fetch requested data, normal behavior
            const networkResponse = await fetch(fetchEvent.request)

                // Cache the network respose data
                const cache = await caches.open(cacheName)
                cache.put(fetchEvent.request, networkResponse.clone())
            
            // Return the network data as response
            return networkResponse

        }())
        return     
    }

    if (fetchEvent.request.methode === "POST") {
        return 
    }

    // If offline, use cache
    fetchEvent.respondWith(
        fetch(fetchEvent.request).catch(() => 
            caches.match(fetchEvent.request)
        )
    )
   

})
