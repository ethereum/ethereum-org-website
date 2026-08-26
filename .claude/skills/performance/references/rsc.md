# RSC / translation payload

Targets: HTML < 500KB, RSC push calls < 70 (preferably < 40).

## Reading the HTML target

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

## Patterns

1. **Server Component conversion** (PR #17650 — Footer). If a component has `useTranslation` and one trivial `onClick`, split out the interactive piece (e.g., `GoToTopButton.tsx`) and make the parent a server component using `getTranslations` from `next-intl/server`. ~95% less hydration.

## Measurement

```bash
curl -s -H "RSC: 1" "https://localhost:3000/en/?_rsc=1" | wc -c   # raw bytes
```

Before/after examples from closed PR #17633: `/en/` 843 → 537KB, `/en/staking/` 595 → 282KB.
