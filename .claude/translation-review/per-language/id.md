# id Translation Review Findings

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.3/10

**Fixed (critical):** `set anonimitas` -> `himpunan anonimitas` (`roadmap/privacy` L74). The companion video transcript already used the glossary form 3x in the same PR — cross-file disagreement was the tell.

**Not fixed (warning):** `Likuiditas` capitalized mid-sentence — the glossary entry itself is capitalized, so this is a glossary-hygiene item, not a translation error. `attester` inconsistent within one transcript.

## Glossary Anchors (id)
- anonymity set = himpunan anonimitas (NOT `set anonimitas`)
- Indonesian legitimately borrows English technical terms; only flag whole untranslated sentences.

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 8.6/10
- **Tense (partially hand-fixed):** program page intro was unmarked present after English moved to past; fixed by adding `dulunya`. The "About" line (`bertujuan`) was **deliberately left unmarked** -- `telah bertujuan` is ungrammatical with a stative purpose verb, `pernah bertujuan` implies an abandoned goal, and a second `dulunya` in the same section reads as repetition. Line 7's marker sets the past frame for the page. Revisit only with a native reviewer; see known-patterns #33.
- **Terminology:** "issue" rendered `isu` on the program page vs `masalah (issue)` used throughout `contributing/index.md`.
- Winddown copy itself is accurate and idiomatic (`sedang dihentikan secara bertahap`, `karya mereka tetap tayang di situs ini`).

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `Endpoint RPC` in `app-publicnode-description` is the only `Endpoint` in the locale; id renders "RPC endpoint" as `titik akhir RPC` in 5 other places.
- #48 "exposure" -> `pengungkapan` (disclosure) is neutral-to-positive and near-synonymous with `transparansi`.
- "worth little" -> `menjadi tidak berharga` (worthless) drops the hedge.

**Notes:**

- `bertujuan`-style tense-neutrality (#33) did not recur: `sebelum kontrak ada` and `belum diterapkan` both carry their temporal force.
- The adjectival/nominal zero-knowledge split (`bukti tanpa pengetahuan` nominal, `zero-knowledge` as modifier) is coherent and matches 6 pre-existing uses in the same file.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- No per-locale fixes needed beyond the fleet-wide items. Open: `common.json` `zero-knowledge-proofs` uses the hybrid `Bukti zero-knowledge` where the glossary compound is `Bukti tanpa pengetahuan`, which `learn-quizzes.json` already uses 8+ times.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).
