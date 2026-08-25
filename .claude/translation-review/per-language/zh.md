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

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Second-highest of the fleet. Zero `智慧合约` regressions; `智能合约` correct throughout. No per-locale fixes needed beyond the fleet-wide items.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.3/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `nfts-hero-description` -> `数字藏品` is the ONLY occurrence of that term in `src/intl/zh/`; the repo uses `数字收藏品` in 5 other files. Worse, `数字藏品` is the term mainland platforms adopted for regulated, non-transferable domestic NFT substitutes, deliberately distanced from crypto NFTs -- a poor fit for an Ethereum NFT wallet page. Suggest `数字收藏品`. zh-tw correctly used the repo term.
- `fee-label-shield-unshield` -> `屏蔽` is the established Zcash-Chinese rendering, but in mainland usage it overwhelmingly reads "block/mute/censor", and this same file uses `阻止` for "block your access". Flagging the ambiguity, not calling it wrong.
- `fee-qualifier-per-card` -> `{value}/张卡` stacks the measure word oddly; `{value}/张` or `每张卡 {value}`.
- `crops-secure` -> `安全` is byte-identical to `page-find-wallet-security`, losing the EN Security/Secure split; zh-tw distinguishes them.

**Notes:**

- All 13 glossary terms exact including the noun/verb bridge split (`跨链费` per the verb form, not the noun `跨链桥`). `你` consistent 21x with zero `您` leakage.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

`智慧合约` did NOT recur (all 23 sites correct); state is `状态`, zero `国家`; client is `客户端`. Remaining: `妥协` (concession) for security compromise, `验证者指数` (numerical index) for validator index -- a regression, dev had `索引`; JWT token as `代币`; and `slot` collapsed into `时段` (the epoch word) because zh has no slot entry. dvt flipped register 你->您 against its own prior state and 5 siblings.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.3/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- Dropped character garbling a clause: `这里的研分为两条主线` -> `这里的研究分为两条主线` (`研` alone is not a word).

**Open (native call needed):**

- `Open Source AI Definition` is the only untranslated article title in the file, while the sibling key renders "The Open Source Definition" as `开源定义`.
- `Gas 上限计划` casing vs glossary `gas 上限`.
- ASCII/full-width comma mixing inside single strings.
- Zero Traditional-character leakage; the prior `slot`->`时段` collapse did not recur.
