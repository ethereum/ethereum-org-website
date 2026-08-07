---
title: "setRequestLocale must run before any next-intl API in pages and generateMetadata"
date: 2026-07-16
category: architecture
module: app/[locale]/**/page.tsx, src/i18n/request.ts, src/lib/utils/metadata.ts
problem_type: "runtime-rendering, i18n, static-generation"
severity: high
symptoms:
  - "Netlify server-handler logs: 'Error: Page changed from static to dynamic at runtime /..., reason: headers'"
  - "Stack trace terminates in 'get requestLocale' (next-intl)"
  - "Only fires for on-demand URLs (invalid locale / unknown slug), e.g. /api/wallets, /videos/.DS_Store, /images/videos/<id>.jpg"
  - "Prerendered locale routes are unaffected, so the gap is latent and only a handful of routes alert"
tags:
  - next-intl
  - app-router
  - setRequestLocale
  - static-generation
  - generateMetadata
  - i18n
  - netlify
discovered_in: "PRs #18785, #18797, #18798, #18800 (recovery); #18811 (systemic); #19016 (full AST sweep, 14 pages)"
status: resolved
---

# `setRequestLocale` must run before any next-intl API

## Problem

Every async Server Component page and `generateMetadata` under `app/[locale]/` that touches a next-intl API must call `setRequestLocale(locale)` **first** -- right after resolving `locale` from `params`, before any other next-intl call. Omitting it opts the route into dynamic rendering, and for params rendered on-demand Next.js throws:

```
Error: Page changed from static to dynamic at runtime /..., reason: headers
    at get requestLocale (next-intl)
```

### Symptoms

- Netlify `___netlify-server-handler` logs the error above; the stack terminates in next-intl's `get requestLocale`.
- Only on-demand URLs trigger it -- an invalid-locale or unknown-slug probe not covered by `generateStaticParams`. Observed hits were bot/broken-link probes: `/api/wallets` and `/api/resources` (where `api` is captured as `[locale]`), `/videos/.DS_Store`, `/images/videos/<youtube-id>.jpg` (falling through the `[...slug]` catch-all).
- Prerendered locale routes look fine because they are built with no request headers, which is why the bug stayed latent across ~54 pages while only four routes alerted in production.

## Root Cause

next-intl's request config resolves the locale lazily:

```ts
// src/i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale // reads request headers unless setRequestLocale primed the cache
  // ...
})
```

`requestLocale` reads the request **headers** unless `setRequestLocale(locale)` has already primed the per-request cache. Any next-intl API (`getTranslations`, `getLocale`, `getFormatter`, ...) invoked before priming forces the header read, which opts the whole route into dynamic rendering. At build time there are no headers, so prerendered locales are unaffected; but an on-demand render (a param outside `generateStaticParams`) performs the header read at request time and Next.js aborts with the static-to-dynamic error instead of rendering statically or returning a clean 404.

### Only the bare API forms are at risk

`getConfig` short-circuits the header read when an explicit locale is passed:

```js
// next-intl/dist/.../server/react-server/getConfig.js
get requestLocale() {
  return localeOverride ? Promise.resolve(localeOverride) : getRequestLocale()
}
```

So `getTranslations({ locale, namespace })`, `getMessages({ locale })`, `getFormatter({ locale })`, `getNow({ locale })` and `getTimeZone({ locale })` never read headers. Only the bare forms do -- plus `getLocale()`, which has no override parameter and always resolves the request locale.

### Why there is no single central fix

next-intl is explicit that this cannot be hoisted into a parent:

> You need to call this function in every page and every layout that you intend to enable static rendering for since Next.js can render layouts and pages independently.

Priming the locale in `app/[locale]/layout.tsx` therefore does **not** discharge the obligation for the pages beneath it -- Next.js may run a page body before the layout body. #18999 moves `setRequestLocale` above that layout's `notFound()` bail as a safety net for pages authored without their own call; it is defence-in-depth, not a substitute for the per-entry-point rule below.

Within a single entry point there is no narrower fix either, because next-intl is reached through two independent paths:

1. The page calls `getTranslations("page-x")` directly to build its title.
2. The `getMetadata` / `getMdMetadata` helpers (`src/lib/utils/metadata.ts`) call `getTranslations("common")` **internally** -- so passing `locale` into them is not enough.

Fixing only the helper leaves the direct call reading headers, and vice versa. `setRequestLocale(locale)` at the top neutralizes both at once.

## The rule (fix)

Call `setRequestLocale(locale)` as the first statement, before any next-intl API, in **both** the page component and `generateMetadata`.

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server"

export default async function Page({ params }) {
  const { locale } = await params

  setRequestLocale(locale) // FIRST -- before any next-intl API

  const t = await getTranslations("page-namespace")
  return <h1>{t("page-title")}</h1>
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params

  setRequestLocale(locale) // FIRST -- covers both the direct getTranslations and getMetadata

  const t = await getTranslations("page-namespace")
  return await getMetadata({ locale, title: t("page-title") /* ... */ })
}
```

Descendant server components don't receive `params`; they read the locale with `getLocale()` from `next-intl/server`, which now resolves statically because the page already primed the cache. This covers the `page-jsonld.tsx` siblings and `_components/*` trees, which call bare `getTranslations` by design.

**Exception: `app/not-found.tsx`.** The root not-found boundary must stay on explicit-locale APIs. In dev, Next.js renders it alongside every page request in the same request-scoped cache, so calling `setRequestLocale` there poisons the locale of the page actually being rendered. Do not "fix" it to match the rule.

## Prevention

When authoring any route under `app/[locale]/`:

1. **`setRequestLocale(locale)` is the first line** of every page and every `generateMetadata` that uses next-intl -- before `getTranslations`, `getLocale`, `getMetadata`, `getMdMetadata`, or any other next-intl call.
2. **Remember the helpers count.** `getMetadata`/`getMdMetadata` call `getTranslations("common")` internally; passing them `locale` does not prime the cache.
3. **Test an on-demand URL**, not just a valid page. A bogus slug or invalid-locale path (`/api/<anything>`) is what exercises the header-read path; valid prerendered routes hide the bug. `/api/<real-page-slug>` is the sharpest probe: `proxy.ts`'s matcher excludes `api`, `_next`, `_vercel`, `.well-known` and any dotted path, so next-intl's middleware never normalizes the segment and it lands in `[locale]`.
4. **Audit by AST, not grep.** A file-level `grep setRequestLocale` gives false negatives -- most affected pages already call it in `generateMetadata`, so the file matches while the `Page` body is still broken. Check ordering per entry point (default export, `generateMetadata`, `generateViewport`) and count only bare-form calls as at risk.

## Related

- Recovery PRs (one route each): #18785 (videos `[slug]`), #18797 (wallets), #18798 (resources), #18800 (`[...slug]` `generateMetadata`). Systemic sweep across ~54 pages: #18811 -- incomplete: it left 14 `Page` bodies unfixed, which a later bot-probe wave surfaced one route at a time as #18932, #18994, #19003, #19005-#19012. #19016 replaced that set with a single AST-verified sweep.
- #18999 -- layout-level safety net (see "Why there is no single central fix").
- `docs/solutions/integration-issues/netlify-isr-404-async-server-components.md` -- adjacent static-vs-dynamic-on-Netlify failure, different mechanism (`unstable_cache` TTL forcing ISR).
- `.claude/skills/design-system/references/i18n-rtl.md` -- one-line rule + pointer here for UI-authoring agents.
- next-intl static rendering docs: https://next-intl.dev/docs/getting-started/app-router
- Next.js: https://nextjs.org/docs/messages/app-static-to-dynamic-error
