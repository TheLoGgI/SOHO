const cacheName = 'v1'


const cacheAssets = [
    'index.html',
    '/css/style.css',
    '/js/main.js',
    '/favicons/*',
    'https://soho.lasseaakjaer.com/wp-json/wc/store/products'
]

console.log('caches ', caches)

// Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed')

    console.log('installed event', e);
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Caching files: ', cache)
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting()) 
        // clients.claim()
    )

})

// Activate Event - clean up old cache
self.addEventListener('activate', (e) => {
    console.log('Service Worker Activated')

    console.log('Activated event', e);
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Clean Old Wervice Worker Cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )

})

self.addEventListener('fetch', (fetchEvent) => {
    console.log('Service Worker Fetched ', fetchEvent.request.destination)

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
        console.log('fetchEvent methode: ', fetchEvent.request.methode);
        return 
    }

    // If offline, use cache
    fetchEvent.respondWith(
        fetch(fetchEvent.request).catch(() => 
            caches.match(fetchEvent.request)
        )
    )
   

})
