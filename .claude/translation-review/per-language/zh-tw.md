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

## PR #18772 (community-stories.json, 2026-07-10) -- 8.3/10
- CRIT fixed: 智慧合約 -> 智能合約, 4 occurrences in 3 keys (story-charles x2, story-rodrigo-nunez, story-mesoreefdao). FULL REGRESSION of the PR #18344 finding -- the pipeline re-emits this error on fresh translations; verify on every zh-tw import.
- Otherwise clean: no simplified-character leakage (even in story-shangzi whose source author wrote Simplified), no inversions.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `區塊提議者` -> `區塊提案者` (`roadmap/privacy` L58). The sibling `eip-7805-focil-explained` uses 提案者/區塊提案者 correctly 6+ times.

**Not fixed (warning):** `credible neutrality` rendered 可靠中立性 vs 可信中立性 in one file; 區塊構建 (23x) vs 區塊建構 (7x).

**Convention confirmed:** zh-tw keeps all 44/44 video speaker labels in Latin. That is deliberate — do not "fix" it (known-patterns #31).
