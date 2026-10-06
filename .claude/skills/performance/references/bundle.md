# Bundle size / code splitting / RSC payload

## Lazy-load heavy below-fold deps

Always lazy-load anything above ~20KB gz: Swiper, Prism (`prism-react-renderer`), Solidity highlighting, Radix Dialog bodies, modals, accordion content below the fold, chart libraries.

Consolidate `next/dynamic` imports in a per-route lazy-imports module with `ssr: false` — existing examples: `app/[locale]/resources/_components/LazyImports.tsx` and `app/[locale]/_components/HomepageLazy.tsx`:

```tsx
const CodeExamples = dynamic(() => import(".../CodeExamples"), { ssr: false })
const AppsHighlight = dynamic(() => import(".../AppsHighlight"), { ssr: false })
```

Examples shipped:

- PR #17958 — `CodeExamples`, `AppsHighlight`
- PR #17661 — mobile menu content (`React.lazy()` + first-click trigger) — saved ~82KB
- SHA `a1f876f8f` — persona modal
- SHA `355070dc7` — homepage wrapper after upgrade chain

## Asset weight

- **SVG: optimize + provide dark variants** rather than filter hacks (SHA `33132d2f8`).

## RSC / translation payload

Targets: HTML < 500KB, RSC push calls < 70 (preferably < 40).

- **Server Component conversion** (PR #17650 — Footer). If a component has `useTranslation` and one trivial `onClick`, split out the interactive piece (e.g., `GoToTopButton.tsx`) and make the parent a server component using `getTranslations` from `next-intl/server`. ~95% less hydration.

Before/after examples from closed PR #17633: `/en/` 843 → 537KB, `/en/staking/` 595 → 282KB.

## Verify

Run `pnpm build` and check the route-level First Load JS deltas. For RSC payload, use Chrome DevTools Network → filter `?_rsc=`, measure raw HTML size with `curl -s URL | wc -c`, or fetch the stream directly:

```bash
curl -s -H "RSC: 1" "https://localhost:3000/en/?_rsc=1" | wc -c   # raw bytes
```
