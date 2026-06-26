# RSC / translation payload

Targets: HTML < 500KB, RSC push calls < 70 (preferably < 40).

## Patterns

1. **Server Component conversion** (PR #17650 — Footer). If a component has `useTranslation` and one trivial `onClick`, split out the interactive piece (e.g., `GoToTopButton.tsx`) and make the parent a server component using `getTranslations` from `next-intl/server`. ~95% less hydration.

## Measurement

```bash
curl -s -H "RSC: 1" "https://localhost:3000/en/?_rsc=1" | wc -c   # raw bytes
```

Before/after examples from closed PR #17633: `/en/` 843 → 537KB, `/en/staking/` 595 → 282KB.
