# Bundle size / code splitting

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

**Weigh the cost honestly, in compressed bytes.** Server-rendering a listing multiplies raw HTML but compresses well, because Tailwind class strings repeat. On `/developers/tutorials/` (109 cards) it was raw 228 KB → 543 KB but brotli 26.8 KB → 36.6 KB. Compare against a peer page before calling it a regression — see `rsc.md`.

## Asset weight

- **SVG: optimize + provide dark variants** rather than filter hacks (SHA `33132d2f8`).

## Verify

Run `pnpm build` and check the route-level First Load JS deltas. For RSC payload, use Chrome DevTools Network → filter `?_rsc=` or measure raw HTML size with `curl -s URL | wc -c`.
