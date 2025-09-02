self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-cache-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/mob-nav.css",
        "/alert.css",
        "/loader.css",
        "/auth.js",
        "/mob-nav.js",
        "/splash_screen.gif",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4ZzKDrWORcADycAPXxebG2OxidkvaSlDfkwActd_HZQ2Oqscs0hYn4u0Sa2Zz0LP0NxdUGpWgRBwP_yUGR_og_FOG91475jgrub0zJZuMkOO0DSjNJ_0XrE8A8JEC69QBOLXv8Q56BRRXgFxiAsquqqBQjfdhmz8zsX1xwBvhjJ-UNyZFYm4KqLKxBvU/s512/icon.png"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== "app-cache-v1") {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
