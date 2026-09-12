# Data-layer URL normalization

## The problem (PR #17853)

`/developers/tools/*` pages had roughly 950 broken in-app links, accounting for ~93% of site-wide 4xx errors. Root cause: the BuidlGuidl API returned dirty URL data.

- `website`: bare domains like `bonadocs.com` (no protocol)
- `twitter`: mix of bare handles (`@thirdweb`), partial URLs (`x.com/rv_inc`), and full URLs

The render layer used `isExternal()` from `src/lib/utils/url.ts`, which only tested for the literal substring `http`. Bare domains failed that test and were classified as **internal routes** — so `next/link` tried to route to `/bonadocs.com` inside the app, producing 404s.

## Why not fix `isExternal()`?

Tempting, but wrong. `isExternal()` is used in many contexts across the site. Teaching it to recognize bare domains means:
- Inventing heuristics ("does it look like a TLD?") that will get edge cases wrong.
- Coupling every consumer of `isExternal()` to the quirks of one external API.
- Pushing validation complexity into a widely-used utility that should stay dumb.

## The principle

**Dirty data gets cleaned at the fetch boundary, not the render boundary.**

Every fetcher in `src/data-layer/fetchers/` owns the contract of its own upstream. Render code should trust that:
- URL fields are either absolute (`https://...`) or empty strings.
- Social handles are fully-qualified URLs, not bare `@handles`.

That trust lets `isExternal()`, `<a>`, and `next/link` usage stay uniform site-wide.

## The pattern

Inside the fetcher (`fetchBuidlGuidl.ts`):

```ts
const normalizeUrl = (u?: string): string => {
  if (!u) return ""
  if (/^https?:\/\//.test(u)) return u
  return `https://${u}`
}

const normalizeTwitter = (t?: string): string => {
  if (!t) return ""
  if (/^https?:\/\//.test(t)) return t
  const handle = t.replace(/^@|^x\.com\/|^twitter\.com\//, "")
  return `https://x.com/${handle}`
}
```

Apply to each field at the point you transform the API response into your internal shape:

```ts
return apiResponse.map(tool => ({
  name: tool.name,
  website: normalizeUrl(tool.website),
  twitter: normalizeTwitter(tool.twitter),
  // ...
}))
```

## Gotchas

- **Don't assume field meaning holds across field names.** A bare string `"thirdweb"` in a `website` field would produce `https://thirdweb` — invalid. Trust only the specific contract of the specific API; if the API says `twitter` is always a social reference, normalize it. Don't blindly apply `normalizeUrl` to every stringish field.
- **Empty string vs. undefined.** Keep the normalized contract consistent — pick one (empty string is easier for downstream rendering, since `null`-checks and `?.` chains differ).
- **This is not input validation for user-generated content.** Fetcher normalization is about trusting a specific upstream's documented shape, not about defending against arbitrary strings.

## When to extend this to new fetchers

Apply when a new `src/data-layer/fetchers/*.ts` is:
- Importing data from an external API you don't control, AND
- The data contains URL-like or social-handle-like fields that downstream UI will render as links.

Don't pre-emptively add normalization helpers "just in case" — only when a real field in a real fetcher needs cleaning.
