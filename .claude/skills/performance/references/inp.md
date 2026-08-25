# INP / main-thread work

## Patterns

1. **Virtualize lists above ~30 rows** using `@tanstack/react-virtual` (already a dep). Shipped for:
   - `/get-eth/` country picker (240 options): INP 1048ms → 248ms (PR #17912, SHA `db6902280`).
   - Find Wallets list (PR #16233).

   For `react-select`, virtualize `MenuList`; for tables, wrap rows.

2. **Defer analytics to idle.** `trackCustomEvent` in `requestIdleCallback` (fallback `setTimeout(0)`); cache opt-out flag in memory so per-click does not re-parse `localStorage`. Capture URL **synchronously** before the idle callback (race fix, SHA `3dcaef917`).

3. **Guard Matomo `init()` with `isOptedOut()`** (PR #17922). The tracker script fires a request even without `trackPageView` calls when `init()` runs.

4. **Keep heavy panels mounted** — `<PersistentPanel>` pattern (PR #16694). Drawers/sheets that re-mount filter state every open are a common INP source.

5. **`startTransition` + `useDeferredValue`** for filter updates (PR #16694 ProductTable).

6. **Single-pass `.filter()`** — chained `.filter().filter().filter()` forces N array traversals; combine into one predicate (SHA `298e00f9b`).

7. **Custom `memo` comparator** on filter components that receive heavy props (SHA `16973e2c3`).

8. **Defer below-fold sections with `Suspense` + skeletons** so above-fold paint is not blocked by KPI/chart/simulator hydration (SHA `4d212c956` — homepage KPI/Carousel/Simulator). Pair with `generateMetadata` for the streaming SSR boundary.

## Measure with web-vitals in prod build

```tsx
onINP((m) => console.log(m.value, m.attribution))
```

Compare before/after on the actual slow interaction, not the whole page.
