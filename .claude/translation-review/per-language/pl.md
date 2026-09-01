# Polish (pl) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.8/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- Latin-script (brands stay Latin).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.5/10

**Fixed (critical):** `receipts` rendered in the retail sense `paragonów` (shop receipts) instead of the Ethereum sense (`ethereum-privacy-stack-andy-guzman` L105) -> `pokwitowań`. The same PR used `pokwitowań` correctly for "receipt-freeness" in `roadmap/privacy` L102.

**Not fixed (warning):** `walidatory` vs `walidatorzy` (non-personal vs personal plural) both used for validators.

## Glossary Anchors (pl)
- receipt = pokwitowanie (NEVER `paragon` — that is a shop receipt)

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.1/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `ciphernodes` -> `węzłów szyfrujących`. The pl agent graded this **critical**; 14 other locales graded the same calque defensible, which is why it was left for an English-side fix rather than a one-locale edit.
- `app-kohaku-description` "adopt" -> `zaadaptować` (adapt/modify).
- `page-values-internet-list-open-code` regressed `w którym` to the colloquial `gdzie` with a non-spatial antecedent.

**Notes:**

- **Do not "fix" „sól" for salt.** Polish cryptography standardly uses *sól*, and the definitional framing plus quotes make the term-of-art reading unambiguous.
- `budowniczowie` for "builders" is house-consistent (31 occurrences in `src/intl/pl`). `wybijasz` for game-mint matches existing NFT usage.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.8/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `receipt` -> `pokwitowanie` in both `receipts_root` table rows (was `paragon`, a till receipt) -- glamsterdam and learn-quizzes already had it right. Dropped `[aktualizacji London](/ethereum-forks/#london)` restored.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.6/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> `Inwestujesz długoterminowo?` reframes holding as investing (#58); prefer `Trzymasz długoterminowo?`.
- `new-to-crypto-hero-description` -> `abyś mógł` addresses a male reader; only 2 occurrences in all of `src/intl/pl`, so not a house pattern.
- `fee-qualifier-per-card` -> `{value}/kartę` puts accusative after a slash; unit-price convention is nominative or `za kartę`.

**Notes:**

- Plural branches verified correct: `Obsługuje` + one `1 sieć` (acc sg) / few `2 sieci` (acc pl) / many `5 sieci` (gen pl). Glossary-perfect including `wymiana` for swap.
- One of only 5 locales whose ETHGlossary L2 entry is correctly capitalized (#53).

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.8/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Highest score in the fleet. Only real criticals: `frazy seed`->`frazy odzyskiwania` (security-critical glossary term, correct 3x elsewhere in the same PR) and the dvt staking-pool conflation. `pokwitowanie` for receipt token held correctly. Animacy wobble now shows as `klienty`/`klienci` for software clients.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.0/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- `events` -> `zdarzenia` (the Solidity/log-event word) in the community/outreach paragraph -> `wydarzenia`. Glossary over-application; regresses the pre-PR text and contradicts `common.json`.

**Open (native call needed):**

- `podążają dwoma podejściami:` dropped the preposition and left the list in the nominative.
- `z Erigon` missing instrumental declension.
- `klienty` (md) vs `klienci` (JSON) for the same referent.
- `solidność` for cryptographic soundness is a loose calque.
- Masculine-gendered past/conditional forms address a male reader at 3 sites.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.6/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Open (native call needed):**

- `Spotkaj się z ciekawymi na Devcon 8` -- bare `ciekawymi` is ambiguous between "curious (people)" and "interesting (things)". `z ciekawymi świata` or `z ciekawskimi` disambiguates toward the English "the curious".

**Open (upstream, do not fix in locale):**

- `Odbierz 10% zniżki` deviates from ETHGlossary `claim` = `roszczenie`. Not auto-fixed for the same reason as ru -- a `roszczenie`-based imperative is worse copy on a discount banner. See known-patterns #75.
