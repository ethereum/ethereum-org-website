# Marathi (mr) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #48 "exposure" -> `उघडपणा` (frankness/openness) — a positive, and it collides with the page's own "open code" value.
- `शिल्लक` -> `बॅलन्स` drift away from the dominant locale form, which `glossary-tooltip.json` `state-definition` also uses.
- "calculated" -> `मोजला` (count/measure); technical register is `काढला`/`गणना केली`.
- Noun-stacked English-style compounds with gender disagreement in `app-nachtara-description` and `app-umbra-description`.

**Notes:**

- `स्तर २` (Devanagari numeral) conflicts with the Indic Western-Arabic-numerals rule but is locale-wide — 89 `स्तर २` vs 71 `स्तर 2` across `src/intl/mr`, 7 already in this file. Needs a separate sweep; **do not fix on one string**.
- `शून्य-ज्ञान पुरावा` in `app-freedom-tool-description` differs from the 6 in-file `झिरो-नॉलेज` but matches `glossary-tooltip.json`'s canonical term — not a defect.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.5/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `actor` -> `घटक` (was अभिनेते). **`miners` -> `खनिक`** (was `खनिज` = mineral, producing "minerals must use computing hardware"). `common.json`: zero-knowledge-proofs -> `शून्य-ज्ञान पुरावे` (matches the page title) and `enterprise-mainnet` -> `मेननेट`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `developer-hero-description` -> `बिल्डिंग` reads as a physical edifice; prefer `निर्मितीसाठी`. Moderate confidence -- the file code-mixes heavily.
- `fee-free-tier-plans` -> `{value}/महिना पासून` is a clumsy postposition after a slash-compound.

**Notes:**

- `fee-qualifier-stablecoins-lower-l2` carries Devanagari `स्तर २` while the SAME file's `page-find-wallet-layer-2` reads `स्तर 2`. ETHGlossary's mr entry is `स्तर २ (l2)`; locale is split 96/67. Follows the glossary, CONTRADICTS the house Western-numeral rule -- bn resolved the identical conflict the opposite way. See #53; needs a locale-wide sweep plus glossary normalization, NOT a one-string fix.
- Glossary compliance exact including the two native-word mandates (swap = अदलाबदल, bridge = सेतू).
