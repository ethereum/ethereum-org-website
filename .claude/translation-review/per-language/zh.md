# Simplified Chinese (zh) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-semantic: brands translated by meaning (Ethereum=以太坊). "smart contract" correctly 智能合约 (crypto sense), NOT 智慧合约 (smartphone sense) -- verified clean.
- Verified false positives (do NOT flag): MetaMask=梅塔马斯克 and rollups=汇总 both match ETHGlossary.
- No semantic inversions, no translated hrefs, no cross-script contamination. ICU/tags intact.
- Pipeline artifact fixed; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 8.9/10
- **Aspect (hand-fixed):** intro and "About" sentences came back tense-neutral after English moved to past. Fixed with `是`->`曾是` and `旨在`->`曾旨在`. Chinese has no tense morphology, so a tense-only English edit needs an explicit 曾/了 marker or it silently no-ops -- known-patterns #33.
- **Terminology split (left unfixed):** `get-involved` drifted to `翻译项目`/`项目页面` while the program page, contributing, `common.json` and `page-collectibles.json` all use `翻译计划`/`计划页面`.
- `remains a priority` overstated as `首要任务` ("top priority") on the program page.
- Bold rendered as `<strong>` HTML rather than `**` in 1-2 spots per file (new this run; dev had none). Valid MDX, renders identically, and arguably safer given CJK emphasis-flanking rules -- noted, not fixed.

## PR #18937 (intl/pending-content-translation-program-remove-recruitment-pages) -- 2026-07-29
- Program page fully retranslated again; the aspect fixes from #18935 were wiped and re-applied (`曾是` / `曾旨在` on lines 7 and 25). See known-patterns #34.
- **Program-name term flipped file-wide** to `翻译项目` (14 occurrences, zero `翻译计划`), the reverse of the split logged yesterday, where `get-involved` used `翻译项目` and the program page used `翻译计划`. The re-applied lines follow the new dominant term so the page is internally consistent, but `contributing/index.md`, `common.json` and `page-collectibles.json` still use `翻译计划` -- the cross-file split persists, now pointing the other way. Worth settling centrally rather than per-run.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `通用浏览器` unqualified reads as a *web* browser; the repo uses `区块浏览器` 15x, including later in the same string.
- `法律合约` for a PDF "legal contract" contradicts the ETHGlossary note on `contract` -> 合约 ("NOT a legal agreement"); `learn-quizzes.json` already uses `法律合同`.
- `合法身份` = "lawful status", not "legally recognized identity" (`法律身份`); `默认` = "by default" where English says "by design".
- `被关停` collocates with businesses/services, not people — the pre-reword `被封禁` was correct. `毫无价值` overstates "worth little". `塑造它的构建` misses the gaming noun sense of "build".

**Notes:**

- `隐形地址` for stealth address matches the dominant repo term (39 vs 6 for `隐身地址`).
- `《Asphodel: Prologue》` in 《》 follows Chinese title convention with the Latin name untouched — correct, not a brand modification.
- The `page-values` reword improves on the prior version, which over-translated "only a promise" as `一纸空头支票`.
