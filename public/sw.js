

self.addEventListener("install", (event) =>{
    console.log("[SW] Service Worker is installing....v1.2");
    event.waitUntil(
        caches.open('chatapp-v1.2')
        .then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/logo192.png',
                '/logo512.png',
                '/Logo.JPG',
                '/game.JPG',
                '/GameApp.JPG',
                '/Profile.jpg'
            ]);
        })
    );
} );


self.addEventListener('fetch', event =>{
    caches.match(event.request.url)
        .then(res => {
             if(res) {
                console.log("Intercept with cache", res);
                return res
            }

             return fetch(event.request);
        }
    )
});