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

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.6/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-label-shield-unshield` -> `Комісія за shield/unshield` is the only untranslated fragment in its bloc. Nothing is misstated and the Cyrillic-group rule tolerates Latin for technical terms, but it is opaque to a Ukrainian reader (#57).
- `fee-qualifier-per-card` -> `{value}/картку` (accusative) after a slash; convention is nominative or `за картку`.
- `fee-qualifier-stablecoins-lower-l2` -> `на рівнях 2 (l2)` is a literal plural of "L2s"; singular reads better.

**Notes:**

- Best plural morphology of the four Slavic locales -- correct ACCUSATIVE in the `one` branch (`1 мережу`, `1 мову`), the branch most commonly botched. `Підтримує` + one/few/many all verified.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

JSON inversion: "correct head of the chain" rendered as the chain's `початку` (beginning) -- the opposite end; solo:22 had the correct `вершини`. `виробництво` (manufacturing) for production at 4 dvt sites. "state" polysemy CLEAR (стан, zero держава). Compounding rendered 3 ways across cross-linking pages.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
