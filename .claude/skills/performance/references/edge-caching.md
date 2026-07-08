# Edge caching & TTFB

## Established root cause (memorized)

Netlify Edge uses per-node LRU caching; low-traffic entries get evicted regardless of TTL. Edge misses fall to Durable cache in **us-east-1**, which is a 400–600ms round-trip for global users (top traffic: China, US, India). Cloudflare is in the path but does **not** cache HTML because `max-age=0` is set and `CDN-Cache-Control` headers are stripped by Netlify before reaching CF.

## Patterns that work

1. **Daily revalidate + client-side refresh API for volatile widgets** (PR #17815 — gas table). Keep the full page statically cacheable at `revalidate = 86400`; put volatile data in `/api/*` routes that the client calls on mount. Do not bake hourly data into the SSR'd HTML.

2. **Module-level `Map` caches for hot request-path lookups** (PR #17864 — `getTranslatedLocales()`). Cuts per-build repeated filesystem work and fixes inconsistency across concurrent requests.

3. **Cache translation/metadata registries** instead of re-reading from disk per request. Same pattern as `cachedStaticPages`.

## DON'T

- Do NOT add `unstable_cache` + `revalidate` on MDX/markdown routes with `generateStaticParams`. Triggers ISR and silently 404s on dynamic segments when `src/data` is not in the serverless bundle. Use `cache: "force-cache"` or `React.cache()` instead (SHA `e4d7a342c`, `bd9732ae0`, `e61afdbe2`).
- Do NOT add root-layout hooks that read request data (Sentry `getTraceData`, cookies, headers). One dynamic hook in `app/layout.tsx` makes every page dynamic and destroys edge caching (PR #16718 diagnosis).
- Do NOT propose adding `CDN-Cache-Control` headers as a TTFB fix — Netlify strips them (PR #17838 closed).
