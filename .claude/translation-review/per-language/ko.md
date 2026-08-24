# Korean (ko) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-phonetic (Hangul transliteration of brands is correct).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #45 "free-est" -> `가장 자유로우며` (liberty sense).
- `page-values-internet-list-censorship` "Access no one can block" -> `접근성`, which means *accessibility* (a11y) in Korean tech writing; the pre-PR `접근 권한` was tighter.

**Notes:**

- The collateral `갖습니다` -> `가집니다` reword on the 42-character-address sentence is **neutral** — both are standard 합니다체 forms of 가지다.
- `page-values-cost-inevitable` fixed a real prior error: old `이 모든 것이 불가피한 것은 아닙니다` was a partial negation ("not *all* of this is inevitable"); new `이 중 어느 것도` correctly renders "none of this".

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `exposure` -> `노출` in `bridges/index.md` (was `투자`/invest, which the next sentence contradicts); ko `learn-quizzes.json` already used 노출 for the identical English. Open: L2/wallet brand names Latin-vs-Hangul split in `page-what-is-ethereum.json`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> `장기 투자` adds investment framing absent from "Holding for the long run?", and contradicts its own sibling `장기 보관`. See #58.
- `finance-hero-title` -> `탈중앙화 금융(DeFi) 및 금융용 지갑` reads "decentralized finance (DeFi) and finance wallets"; glossary-legal but ja/zh/zh-tw keep the bare acronym in titles.
- `crops-secure` -> `보안` is a noun and byte-identical to `page-find-wallet-security`, losing the EN Security/Secure split; `안전` carries the adjective sense.

**Notes:**

- Strongest `fee-row-label` in its bloc (`수수료 부과 항목`). `쉴드/언쉴드` correctly transliterates the privacy-pool term.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.2/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Truncated word `스마트 컨트랙` (not a word). saas:71 rendered majority-client as `다수의` (many clients), inverting the risk. `Mainnet` left Latin against glossary. JSON risk bullet flattened "Your ETH is at stake" into "your ETH gets staked", removing the risk framing. Launchpad rendered 3 ways.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- `계약` -> `컨트랙트` for smart contracts, against a glossary note that explicitly forbids `계약`.
- `오픈소스` -> `오픈 소스` at 41 sites, aligning the page with `common.json`/`page-values.json` and tree precedent (194:16 spaced). Before the fix the /values CTA and the page title it links to disagreed.

**Open (native call needed):**

- `capture` -> `독점` (market monopoly); corporate capture is `장악`/`사유화`.
- `Survey of blockchain oracles` -> `설문조사` (questionnaire); the pre-PR line had the correct `조사`.
- `Zero Knowledge podcast` proper name translated.
