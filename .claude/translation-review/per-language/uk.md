# Ukrainian (uk) Translation Review Findings

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- Cyrillic (brand transliteration or Latin both fine).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `пропонентів блоків` -> `пропонувачів блоків` (`roadmap/privacy` L58). `пропонент` appears nowhere else in the uk tree; 26 files use `пропонувач`, 21 use `пропонувальник`.

**Not fixed (warning):** 4 Latin speaker labels (known-patterns #31); stray U+2066/U+2069 bidi isolates around "Ethereum" in `ethereum-privacy-stack-andy-guzman` L17 with no counterpart in English — invisible when rendered, but a pipeline artifact worth stripping upstream.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `шифровузлів` — a coinage appearing nowhere else in the uk tree.
- #45 `найвільніші`.
- `page-values-card-open-source-description` was rewritten active -> passive with an instrumental agent, which reads heavier than the string it replaced and clashes with its own active sibling `page-values-internet-list-open-code`.

**Notes:**

- uk is the only locale that got #47 right, rendering gatekeeper as `контролер` consistently with its own `page-values-faq-3-p1`.
- Terminology was verified against corpus frequency rather than intuition: `ончейн` (120 vs 21), `будівельник` (~75), `рівня 2 (l2)` lowercase (66 vs 11), `карбувати` for mint (14), `доведення з нульовим розголошенням` (124+).

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Heading fix: `## Стійкість мережі {#network-resilience}` -> `## Опірність мережі`, which had collapsed onto the identical rendering of `{#network-sustainability}` and produced duplicate-looking TOC entries. Its agent correctly cleared the PBS compound-vs-bare split as glossary-prescribed (#30).
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).
