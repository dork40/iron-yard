const cacheName = "iron-yard-static-v5.1.2";
self.addEventListener("install", event => event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(["/", "/manifest.webmanifest", "/icon.svg", "/favicon.svg"]))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key))))));
self.addEventListener("fetch", event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== location.origin) return;
  if (request.mode === "navigate") { event.respondWith(fetch(request).then(response => response).catch(() => caches.match("/"))); return; }
  event.respondWith(caches.match(request).then(cached => cached ?? fetch(request).then(response => { if (response.ok && ["script", "style", "image", "font"].includes(request.destination)) void caches.open(cacheName).then(cache => cache.put(request, response.clone())); return response; })));
});
