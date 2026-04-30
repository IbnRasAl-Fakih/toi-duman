const CACHE_VERSION = "toi-duman-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = ["/", "/index.html"];
const CACHEABLE_DESTINATIONS = new Set(["font", "image", "script", "style"]);
const CACHEABLE_PATHS = ["/static/", "/images/", "/musics/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith("toi-duman-") && !cacheName.startsWith(CACHE_VERSION))
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || request.headers.has("range")) {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isCacheableAsset(request, url)) {
    event.respondWith(cacheFirst(request));
  }
});

function isCacheableAsset(request, url) {
  return CACHEABLE_DESTINATIONS.has(request.destination) || CACHEABLE_PATHS.some((path) => url.pathname.startsWith(path));
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);

  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put("/index.html", response.clone());
    }

    return response;
  } catch (error) {
    const cachedResponse = await caches.match("/index.html");

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}
