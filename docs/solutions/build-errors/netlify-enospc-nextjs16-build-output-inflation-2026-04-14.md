---
title: "Netlify ENOSPC: Next.js 16 build output exceeds build VM disk"
date: 2026-04-14
category: build-errors
module: ethereum-org-website
problem_type: build_error
component: development_workflow
symptoms:
  - "ENOSPC: no space left on device during Netlify deploy — @netlify/plugin-nextjs fails at 'copying static assets'"
  - "Build command (pnpm build) completes successfully but plugin phase crashes"
  - "PRs build fine individually but fail when combined (cumulative disk pressure)"
  - "Next.js 16 generates ~30% larger per-locale output than Next.js 14 due to new .segments/ directories"
root_cause: config_error
resolution_type: config_change
severity: critical
tags:
  - netlify
  - nextjs-16
  - enospc
  - disk-space
  - build-pipeline
  - segments
  - webpack-cache
  - static-generation
---

# Netlify ENOSPC: Next.js 16 build output exceeds build VM disk

## Problem

The Netlify build fails with `ENOSPC: no space left on device` when combining the Videos Hub PR (#17870, adding 58 content pages x 25 locales = 1,450 new static pages) with the staging deploy. The Next.js build itself completes, but the `@netlify/plugin-nextjs` crashes during the post-build "copying static assets" phase.

## Symptoms

- `@netlify/plugin-nextjs` error:
  ```
  Error: Failed copying static assets
  ENOSPC: no space left on device, mkdir '/opt/build/repo/.netlify/static/content/translations/ko/developers/tutorials/...'
  ```
- Build command completes in ~16 minutes — failure is in the plugin phase after
- Each PR builds successfully on its own; only the combination exceeds disk
- The site previously built 17,000 pages across 67 locales on Next.js 14 without issues (January 2026)

## What Didn't Work

1. **Suspected 250 MB serverless function bundle limit** — Investigated and ruled out. The function bundle was 228 MB (under the 250 MB AWS Lambda cap). Exceeding that limit produces a different error: `"Serverless Function has exceeded the unzipped maximum size of 250 MB"`.

2. **Removing trigger.dev from devDependencies (PR #17968)** — Build still failed with the same error. The package was not a meaningful contributor to disk usage.

3. **English-only static generation for video pages (PR #17969)** — Build passed, but non-English video pages broke at runtime. The markdown content files in `public/content/translations/{locale}/videos/` were not available to the serverless function. Fixable by adding them to `included_files` in `netlify.toml`, but not the approach taken.

## Solution

Delete the webpack compilation cache after the build completes, before the Netlify plugin runs.

**Before** (`netlify.toml`):
```toml
command = "pnpm build"
```

**After** (`netlify.toml`):
```toml
command = "pnpm build && rm -rf .next/cache"
```

Validated: PR #17971 (videos PR + this fix) built successfully on Netlify.

## Why This Works

The upgrade from Next.js 14 to 16 (March 2026) silently inflated per-page build output by ~30%. Two new sources of disk growth:

**1. `.segments/` directories (new in Next.js 16)**

Next.js 16's enhanced routing generates `.segments/` trees for every pre-rendered page, containing pre-computed RSC payloads for client-side navigations. These account for ~44% of each locale's server output and **did not exist in Next.js 14**.

**2. Standalone output duplication**

The Netlify plugin forces `NEXT_PRIVATE_STANDALONE=true`, creating `.next/standalone/` — an exact 11 GB mirror of `.next/server/`.

**Measured comparison (local en,es builds):**

| Metric | Next.js 14.2.35 | Next.js 16.2.1 | Delta |
|---|---|---|---|
| en locale | 275 MB | 354 MB | +29% |
| es locale | 288 MB | 375 MB | +30% |
| `.segments/` dirs | 0 | 609 (327 MB) | entirely new |

**Full 25-locale build disk footprint (no videos):**

| Component | Size |
|---|---|
| `.next/server/app/` | 11 GB |
| `.next/standalone/` (mirror of server) | 11 GB |
| `.next/cache/webpack/` | 4.3 GB |
| `.netlify/deploy/` | 13 GB |
| `.netlify/static/` | 524 MB |
| `node_modules/` | 2.5 GB |
| **Total during plugin phase** | **~45 GB** |

The 4.3 GB webpack cache is generated during `pnpm build` and used for incremental recompilation. On Netlify, each build starts from a clean checkout — the cache is never reused. It sits as dead weight while the plugin creates deployment artifacts. Removing it after build frees enough headroom for the plugin to copy static assets.

## Prevention

- **Monitor the function bundle size.** Currently 228 MB / 250 MB (91%). Add a CI step to log and alert when it crosses a threshold (e.g., 240 MB). See `outputFileTracingExcludes` in `next.config.js` and `included_files` in `netlify.toml` for tuning levers.

- **`.segments/` cannot be disabled.** Confirmed via [vercel/next.js discussion #86320](https://github.com/vercel/next.js/discussions/86320). This is permanent overhead in Next.js 16+. Consider filing a feature request with concrete numbers (25 locales, 4.8 GB in segments).

- **Budget static page count.** Each new content section x 25 locales compounds disk pressure. For content-heavy sections (videos, tutorials), consider selective pre-rendering:
  - Generate English statically, serve other locales via ISR
  - Add content directories to `included_files` in `netlify.toml` so the serverless function can read them at runtime

- **Netlify does not document disk limits.** A staff member stated ["there are no disk limits"](https://answers.netlify.com/t/what-is-the-build-limits-about-disk-size/120392), but practical limits exist. The build VM is finite. This means disk exhaustion won't trigger a clear error threshold — it manifests as ENOSPC during whichever step happens to tip it over.

## Related Issues

- [docs/netlify-build-disk-usage.md](../../netlify-build-disk-usage.md) — Full investigation doc with detailed measurements and additional solution options
- [docs/solutions/integration-issues/netlify-isr-404-async-server-components.md](../integration-issues/netlify-isr-404-async-server-components.md) — Related: ISR content files not available to serverless function (relevant if shifting video pages to ISR)
- [vercel/next.js #86320](https://github.com/vercel/next.js/discussions/86320) — Community reports of `.next/` doubling in size after upgrading to Next.js 16
- [opennextjs-netlify #2037](https://github.com/opennextjs/opennextjs-netlify/issues/2037) — Known bug: remote builds produce duplicate files in the handler vs local
- PR #17870 / #17970 — Videos Hub feature that triggered the failure
- PR #17968 — Failed attempt: remove trigger.dev
- PR #17969 — Failed attempt: English-only static generation (build passed, runtime broke)
- PR #17971 — The fix: `rm -rf .next/cache` post-build
