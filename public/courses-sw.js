/*
 * Courses app service worker: lessons you've opened keep working offline.
 * Registered per language with scope /courses/ or /<locale>/courses/, so it
 * controls only course pages. Same-origin GETs only; analytics and every
 * other request go straight to the network.
 *
 * - Pages and RSC payloads: network first, cached copy when offline
 * - Hashed build assets (/_next/static): cache first, they never change
 * - Images and fonts: cached copy at once, refreshed in the background
 */

const VERSION = "v1"
const PAGES = `courses-pages-${VERSION}`
const ASSETS = `courses-assets-${VERSION}`
const MAX_ENTRIES = 300

self.addEventListener("install", (event) => {
  // The course hub is the offline fallback for pages never opened
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.add(self.registration.scope))
      .catch(() => {})
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("courses-") && key !== PAGES && key !== ASSETS
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

// Oldest entries go first: Cache keys keep insertion order
const trim = async (name) => {
  const cache = await caches.open(name)
  const keys = await cache.keys()
  await Promise.all(
    keys.slice(0, -MAX_ENTRIES).map((key) => cache.delete(key))
  )
}

const store = (name, request, response) => {
  if (!response.ok || response.type !== "basic") return
  const copy = response.clone()
  caches
    .open(name)
    .then((cache) => cache.put(request, copy))
    .then(() => trim(name))
}

const networkFirst = async (request, fallbackToHub) => {
  try {
    const response = await fetch(request)
    store(PAGES, request, response)
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    if (fallbackToHub) {
      const hub = await caches.match(self.registration.scope)
      if (hub) return hub
    }
    throw error
  }
}

const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  store(ASSETS, request, response)
  return response
}

const staleWhileRevalidate = async (request, event) => {
  const cached = await caches.match(request)
  const fresh = fetch(request).then((response) => {
    store(ASSETS, request, response)
    return response
  })
  if (cached) {
    event.waitUntil(fresh.catch(() => {}))
    return cached
  }
  return fresh
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  const inScope = request.url.startsWith(self.registration.scope)

  if (request.mode === "navigate") {
    if (inScope) event.respondWith(networkFirst(request, true))
    return
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request))
    return
  }
  if (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/fonts/")
  ) {
    event.respondWith(staleWhileRevalidate(request, event))
    return
  }
  // Client-side navigation fetches the RSC payload from the page URL itself
  if (inScope) event.respondWith(networkFirst(request, false))
})
