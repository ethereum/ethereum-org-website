---
title: "Async Server Components in MDX Pages Cause 404s on Netlify After Cache Expiry"
slug: "netlify-isr-404-async-server-components"
category: "integration-issues"
severity: "critical"
symptoms:
  - "Gaming page (or any use-case page) returns 404 after ~24 hours on Netlify"
  - "Page works locally and on first deploy, fails after unstable_cache TTL expires"
  - "Netlify serverless function logs show missing content files during ISR revalidation"
components:
  - "app/[locale]/[...slug]/page.tsx"
  - "src/components/Content/apps/CategoryAppsGrid.tsx"
  - "src/lib/data/index.ts"
  - "src/layouts/md/UseCases.tsx"
tags:
  - "netlify"
  - "next.js"
  - "isr"
  - "unstable_cache"
  - "server-components"
  - "data-layer"
  - "mdx"
discovered_at: "2026-03-17"
discovered_in: "PR #17722"
status: "open"
---

# Async Server Components in MDX Pages Cause 404s on Netlify

## Problem

Any MDX-rendered page that embeds an async server component calling `unstable_cache`-wrapped data (e.g., `getAppsData()`) will 404 on Netlify after the cache TTL expires.

### Symptoms

- Page loads correctly on first deploy and locally in dev
- After ~24 hours (when `unstable_cache` with `revalidate: 86400` expires), the page returns 404
- Netlify serverless function cannot find `public/content/` markdown files during ISR revalidation
- Affects any use-case page using `<CategoryAppsGrid>`: gaming, defi, nft, etc.

### Root Cause

The architecture has a fundamental mismatch between **static content availability** and **runtime data revalidation**:

1. **Build time**: The catch-all route `app/[locale]/[...slug]/page.tsx` pre-renders pages from `public/content/*.md` files. `generateStaticParams()` discovers all markdown slugs and generates static HTML. Async server components (like `CategoryAppsGrid`) are awaited and their data is embedded in the static output.

2. **Runtime (after cache expiry)**: When `unstable_cache` TTL expires, Next.js triggers ISR revalidation via Netlify's serverless function. The serverless function re-executes the full page render pipeline, which requires:
   - Reading the markdown file from `public/content/` → **NOT AVAILABLE** in serverless runtime
   - The `importMd()` call fails → page returns 404

3. **Why content isn't available**: Netlify's serverless environment only bundles JavaScript and explicitly required assets. Static files in `public/content/` are served by the CDN but are **not included in the serverless function bundle**. The catch-all route's `generateStaticParams()` already handles this with a try/catch that returns `[]`, but that doesn't help when ISR tries to revalidate an already-built page.

```
Build time (works):
  [next build] → reads public/content/gaming/index.md → renders CategoryAppsGrid → static HTML ✓

After cache expiry (breaks):
  [serverless ISR] → reads public/content/gaming/index.md → FILE NOT FOUND → 404 ✗
```

### Key Constraint

The `unstable_cache` wrapper in `src/lib/data/index.ts` uses a two-layer cache:

```typescript
// Layer 1: unstable_cache (persistent, server-side, triggers ISR on expiry)
const persistentCache = unstable_cache(fetcher, cacheKey, { revalidate: 86400 })

// Layer 2: React cache (request-scoped deduplication)
return cache(persistentCache)
```

The `revalidate: 86400` parameter is what forces the page into ISR mode. Any async server component that calls a function wrapped this way will inherit the revalidation behavior, converting a static page into an ISR page.

## Affected Components

| Component | Role |
|-----------|------|
| `app/[locale]/[...slug]/page.tsx` | Catch-all route that reads markdown from `public/content/` |
| `CategoryAppsGrid` | Async server component calling `getAppsData()` |
| `getAppsData()` in `src/lib/data/index.ts` | `unstable_cache`-wrapped with 24h revalidation |
| `UseCases.tsx` layout | Registers `CategoryAppsGrid` as MDX component |
| Any `public/content/*/index.md` using `<CategoryAppsGrid>` | Gaming, DeFi, NFT pages |

## Possible Solutions

### Option A: Pre-fetch data at page level and pass as props

Move the `getAppsData()` call from inside `CategoryAppsGrid` to the `[...slug]/page.tsx` route handler. Pass the data down as a prop through the MDX rendering pipeline. This keeps the page's static generation intact since the data is fetched once at build time and embedded.

**Pros**: Clean separation; page stays fully static
**Cons**: Requires threading props through the MDX rendering pipeline, which is non-trivial

### Option B: Client-side data fetch via API route

Convert `CategoryAppsGrid` to a client component that fetches from `/api/apps?category=gaming`. The page itself stays fully static; data is loaded client-side after hydration.

**Pros**: Simple; page is always static; data always fresh
**Cons**: Loading state / CLS; no SEO for app listings; extra API route to maintain

### Option C: Build-time data injection into MDX

A build script that reads apps data and injects it directly into the markdown files (or a JSON sidecar) before `next build`. No runtime data fetching needed.

**Pros**: Fully static; fastest possible page loads
**Cons**: Requires build pipeline changes; data staleness between deploys

### Option D: Use `revalidate: false` (infinite cache) with on-demand revalidation

Set `unstable_cache` to never expire automatically. Instead, trigger revalidation explicitly from the Trigger.dev daily task via Next.js `revalidatePath()` or `revalidateTag()` API.

**Pros**: No surprise ISR; pages stay static until explicitly refreshed
**Cons**: Requires Netlify to support on-demand ISR (it does via `@netlify/plugin-nextjs`); more complex orchestration

## Prevention

When adding async server components to MDX-rendered pages in this codebase:

1. **Never call `unstable_cache`-wrapped fetchers with finite `revalidate`** from components embedded in `[...slug]` catch-all pages — this converts static pages to ISR pages that will fail on Netlify
2. **Test on Netlify preview deploys**, not just local dev — the serverless runtime environment differs significantly from local `next dev`
3. **Check if the page route uses `generateStaticParams()`** — if it does, the page is expected to be fully static and should not have runtime data dependencies
4. **Prefer client-side fetching or build-time data injection** for dynamic data on otherwise-static MDX pages

## Related

- PR #17722 — Gaming page revamp (where this was discovered)
- `docs/solutions/performance-issues/github-contributors-data-layer-migration.md` — Related data-layer architecture
- Next.js ISR documentation: pages must be re-renderable in the serverless runtime
- Netlify Next.js plugin: `@netlify/plugin-nextjs` handles ISR but requires all page dependencies to be available at runtime
