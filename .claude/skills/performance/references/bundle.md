# Bundle size / code splitting / RSC payload

## Lazy-load heavy below-fold deps

Always lazy-load anything above ~20KB gz: Swiper, Prism (`prism-react-renderer`), Solidity highlighting, Radix Dialog bodies, modals, accordion content below the fold, chart libraries.

Consolidate `next/dynamic` imports in a per-route lazy-imports module — existing examples: `app/[locale]/resources/_components/LazyImports.tsx` and `app/[locale]/_components/HomepageLazy.tsx`:

```tsx
const CodeExamples = dynamic(() => import(".../CodeExamples"), { ssr: false })
const AppsHighlight = dynamic(() => import(".../AppsHighlight"), { ssr: false })
```

**First decide whether the component holds editorial content** — see the next section. `ssr: false` is right for interactive widgets and modals; it is wrong for anything that has to reach a crawler.

Examples shipped:

- PR #17958 — `CodeExamples`, `AppsHighlight`
- PR #17661 — mobile menu content (`React.lazy()` + first-click trigger) — saved ~82KB
- SHA `a1f876f8f` — persona modal
- SHA `355070dc7` — homepage wrapper after upgrade chain

## Never lazy-load editorial content (SEO)

Lazy-loading is a bundle decision; it is also, accidentally, a **crawlability** decision. Content behind `next/dynamic` is absent from server HTML, and crawlers that don't execute JS — Googlebot's first pass, and GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot at all — see only the fallback.

Split the call by what the component _is_:

| Component holds…                                                       | Use                                          |
| ---------------------------------------------------------------------- | -------------------------------------------- |
| Interactive widget, modal, simulator, chart — no indexable prose       | `dynamic(..., { ssr: false })`               |
| Editorial copy, listings, or internal links that drive crawl discovery | **A direct import.** Not `dynamic()` at all. |

⚠️ **Dropping `ssr: false` is not enough.** `dynamic()` wraps the component in `Suspense` either way, so the server emits the fallback inline and streams the real markup into a `<div hidden id="S:…">` that only an inline `$RC()` script swaps in. A JS-less crawler still gets a skeleton. Measured on a production build in PR for issue #18977: with `ssr: false` removed but `dynamic()` kept, all 57 tutorial links were present but sat inside the hidden container with the skeleton still rendered.

Reference: `app/[locale]/apps/_components/TopApps.tsx` imports Swiper directly and server-renders 13 slides inline. Use it as the model for content carousels.

**Weigh the cost honestly, in compressed bytes.** Server-rendering a listing multiplies raw HTML but compresses well, because Tailwind class strings repeat. On `/developers/tutorials/` (109 cards) it was raw 228 KB → 543 KB but brotli 26.8 KB → 36.6 KB. Compare against a peer page before calling it a regression — see "Reading the HTML target" below.

## Asset weight

- **SVG: optimize + provide dark variants** rather than filter hacks (SHA `33132d2f8`).

## RSC / translation payload

Targets: HTML < 500KB, RSC push calls < 70 (preferably < 40).

- **Server Component conversion** (PR #17650 — Footer). If a component has `useTranslation` and one trivial `onClick`, split out the interactive piece (e.g., `GoToTopButton.tsx`) and make the parent a server component using `getTranslations` from `next-intl/server`. ~95% less hydration.

Before/after examples from closed PR #17633: `/en/` 843 → 537KB, `/en/staking/` 595 → 282KB.

### Reading the HTML target

500KB is a **raw-bytes smoke signal, not a pass/fail gate** — it flags a page worth looking at, and the look is what decides. Two rules keep it honest:

1. **Judge on compressed bytes.** That's what ships. Markup compresses ~14:1 here because Tailwind class strings repeat, so raw size overstates a content-heavy page badly.
2. **Compare against a peer page**, not against 500KB in the abstract. A listing page should be measured against other listing pages.

As of the en-only build for issue #18977, **53 of 399 prerendered pages (13%) exceed 500KB raw**, including every comparable catalog page:

| Page                                       | Raw    | Brotli |
| ------------------------------------------ | ------ | ------ |
| `/developers/tools`                        | 949 KB | 77 KB  |
| `/wallets/find-wallet`                     | 944 KB | 71 KB  |
| `/apps`                                    | 407 KB | 47 KB  |
| `/developers/tutorials` (109 cards, SSR'd) | 543 KB | 37 KB  |

So a catalog page landing at ~550KB raw / ~37KB brotli is **in range, not a regression** — it is the lightest catalog page on the site by transfer. Reach for a fix when compressed size is out of line with peers, or when the raw figure comes from duplication rather than content.

Measure both:

```bash
curl -s URL | wc -c                  # raw
curl -s URL | brotli -q 11 -c | wc -c  # what actually ships
```

## Verify

Run `pnpm build` and check the route-level First Load JS deltas. For RSC payload, use Chrome DevTools Network → filter `?_rsc=`, measure raw HTML size with `curl -s URL | wc -c`, or fetch the stream directly:

```bash
curl -s -H "RSC: 1" "https://localhost:3000/en/?_rsc=1" | wc -c   # raw bytes
```
