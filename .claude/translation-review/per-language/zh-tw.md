# Traditional Chinese (zh-tw) Translation Review Findings

> **PR:** #18344 (latest/ builder blog, 3 posts)
> **Date:** 2026-06-03
> **Quality Score:** 9.5/10

## Issues Fixed

| Fix | Count | File | Details |
|-----|-------|------|---------|
| 智慧合約 -> 智能合約 | 1 | why-build-on-ethereum (L82) | "smart contract" rendered with 智慧 (smartphone sense). ETHGlossary mandates 智能合約 for crypto context; note explicitly rejects 智慧. The zh-tw privacy file (L49) already used the correct 智能合約. |

## Glossary Anchors (zh-tw)

- smart contract = 智能合約 (NOT 智慧合約 -- 智慧 is the consumer-electronics "smart")
- builder = 建構者 (privacy file used 開發者/developer in places -- warning, blurs builder/developer)
- bundler = 捆綁器 (building file used 打包者 doublet -- warning)

## Notes

- No Simplified-character leakage. All anchors/hrefs/tickers/domains preserved. No semantic inversions.
- Brand transliterations (佩克特拉/Pectra, 富薩卡/Fusaka, 格蘭斯特丹/Glamsterdam) correct.
- Remaining items are minor terminology-consistency warnings (builder, bundler), not blocking.
