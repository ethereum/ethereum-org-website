# Bundle size / code splitting

## Lazy-load heavy below-fold deps

Always lazy-load anything above ~20KB gz: Swiper, Prism (`prism-react-renderer`), Solidity highlighting, Radix Dialog bodies, modals, accordion content below the fold, chart libraries.

Consolidate `next/dynamic` imports in `app/[locale]/_components/*LazyImports.tsx` with `ssr: false`:

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

## Verify

Run `pnpm build` and check the route-level First Load JS deltas. For RSC payload, use Chrome DevTools Network → filter `?_rsc=` or measure raw HTML size with `curl -s URL | wc -c`.
