---
name: intl-review
description: Use when reviewing translation imports/PRs (especially against `intl/pending-*` branches), evaluating translation quality across any of the 24 target languages, triaging issues in `.claude/translation-review/`, scoring a locale's translation, running the `/review-translations` slash command, debugging brand-name mistranslations or glossary deviations, or working with the per-language findings tracking files. Covers the scoring rubric, ETHGlossary-as-authority policy, language-group rules, agent-role split (structural / terminology / semantic), the concept-tag-vs-brand-tag distinction in frontmatter, and the critical-vs-warning severity policy.
---

# intl-review

Translation-quality review for ethereum.org's 24-language pipeline output. Reviews target the LLM (Gemini)-produced translations on `intl/pending-{base}` branches plus any historical Crowdin imports still in flight. ETHGlossary (https://ethglossary.visual-20-hoists.workers.dev) is the authoritative source for terminology — deviations are **critical issues**, not warnings. Read this file fully on activation; pull from `references/` only when the listed trigger applies.

## The Core Rule: ETHGlossary Is Authority

When evaluating a translated brand name, person name, programming language, OS name, or any Ethereum-ecosystem term, **the ETHGlossary entry for that term in that language is the truth**. Deviations are **critical** issues that must be flagged (and auto-fixed when running `/review-translations` without `--no-fix`).

This is not a stylistic preference — it's a determinism guarantee. The translation pipeline queries ETHGlossary; reviewers verify the output matches. If you think the glossary is wrong, the fix is to update ETHGlossary (https://github.com/wackerow/ethglossary), not to leave the translation as-is.

Use the `/filter` endpoint to get the subset of glossary terms that actually appear in a given English source file. Don't reason from memory about brand names; look them up.

## Top Rules

1. **Glossary deviations are CRITICAL, not warnings.** Any time a translated term differs from the ETHGlossary entry for that language, that's a critical issue. The review report must list them so Phase 5 can auto-fix.
2. **Internal hrefs must stay English.** `/governance` in Spanish content must be `/governance`, not `/gobernanza`. Translated URLs break navigation. Same for anchor IDs (`#section-id`).
3. **Concept tags translate; brand-name tags don't.** Tutorial frontmatter `tags:` arrays contain a mix. Brand names (`"solidity"`, `"hardhat"`, `"alchemy"`) stay English. Concept/category tags (`"smart contracts"`, `"testing"`, `"security"`) are intentionally translated by the pipeline and must NOT be reverted to English.
4. **Code blocks: functional code stays English; comments may be translated.** Identifiers, strings, config keys, console output — English. Code comments (`//`, `/* */`, `#`) may be translated to aid reader comprehension.
5. **Brand-name policy is per-language, per-term.** Some brands stay Latin in CJK (Solidity, Hardhat per ETHGlossary's `script_rule: always_latin`); some transliterate (Ethereum → イーサリアム per `transliterate`); some have native calques in `zh`/`zh-tw`. Use the glossary; don't pattern-match.
6. **MDX syntax errors are CRITICAL (build-breaking).** Raw `<` before numbers, unclosed backticks, orphaned closing tags, JSX attributes with embedded unescaped quotes — any of these breaks the build for that locale. Flag and fix.
7. **Reporting zero critical issues is a valid outcome.** Don't invent issues to "show your work." If a thorough review surfaces no criticals, report `0 critical, N warnings` (or `0/0`) and that's a valid result.
8. **Auto-fix is opt-out, not opt-in.** `/review-translations` applies fixes by default. Use `--no-fix` for review-only runs (GitHub Actions context, no commit auth). The review report still lists what would have been fixed.
9. **All review changes go on the `intl/pending-*` branch being reviewed — NEVER `dev`.** Translation fixes AND knowledge-base updates (`known-patterns.md`, `per-language/{lang}.md`) for a given review are committed to that review's own `intl/pending-{base}` branch so they ride with the PR to GitHub. See the next section.

## Where Review Changes Live

Both translation fixes and knowledge-base updates (`per-language/{lang}.md`, `known-patterns.md`) go on the `intl/pending-{base}` branch under review — the `/review-translations` worktree — so they ride with the PR. Never leave review artifacts on `dev`; if you catch yourself editing `.claude/translation-review/` in the `dev` checkout, move them to the review branch and restore `dev`. Sequence: commit → push → submit review (`--approve` once the fix is pushed and no criticals remain, else `--comment`).

## Highest-Value Gotchas

These are landmines where the obvious-looking call is wrong. The full set is in `references/gotchas.md`.

### Frontmatter `tags` arrays mix two policies

Tutorial markdown files have `tags:` in YAML frontmatter. They contain a mix of:

- **Brand-name tags** (`"solidity"`, `"hardhat"`, `"alchemy"`, `"JavaScript"`, `"ERC-721"`) — MUST stay English. The sanitizer auto-fixes these; flag only if missed.
- **Concept/category tags** (`"smart contracts"`, `"testing"`, `"security"`, `"deploying"`, `"frontend"`, `"nodes"`) — INTENTIONALLY translated into the target language. Translated forms like `"smart kontrakt účty"` (Czech) or `"bezpečnost"` (Czech security) are **correct**.

Rule: proper noun / product name → English. Generic descriptive term → translated form is right.

### Semantic inversions on consensus terms

High-frequency real-world failure mode: Gemini occasionally swaps proof-of-stake and proof-of-work, or mistranslates "mainnet" as "market" or "main network." These are critical semantic errors, not warnings. Spot-check consensus, mainnet, testnet, validator, miner, client when reviewing.

### Cross-script contamination

Old Crowdin imports sometimes have characters from one script leaking into another (Devanagari in Turkish, CJK in Arabic). Less common with the new pipeline but still possible. Flag any unexpected-script characters; they indicate translation memory leaks.

### Lorem ipsum / placeholder text in JSON

Real translation values sometimes contain "Lorem ipsum dolor sit amet" or similar placeholder text. Treat as a critical user-visible issue.

### Translated GitHub `@username` handles

`@axic` becoming `@kwaaxic` (Swahili) or similar — broken attribution. Flag.

### Asymmetric backticks and orphaned HTML tags

Single-open / double-close backticks (`` `text`` ``), missing `</em>`before`</li>`, raw `</a>` without opener — all break MDX compilation. Critical.

### `/review-translations` requires a named branch, never detached HEAD

The slash command's worktree setup enforces this; if you script around it, the build verification step depends on the named branch being checked out.

### `gh` CLI in Claude Code sandbox

`gh` requires `dangerouslyDisableSandbox: true` due to the sandbox's TLS proxy. Git commands work fine in sandbox (SSH). `pnpm install` / `pnpm build` may also need the sandbox disable on filesystem-heavy operations.

## Quick "Where Do I Look?" Cheatsheet

| I need...                              | Path                                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Slash command (full pipeline)          | `/review-translations` (`.claude/commands/review-translations.md`)                                                 |
| Issue-pattern catalog                  | `.claude/translation-review/known-patterns.md` + `references/known-patterns.md`                                    |
| Per-language rules                     | `references/language-rules.md` (sourced from `.claude/translation-review/localization-rules-by-language-group.md`) |
| Scoring rubric                         | `references/scoring-rubric.md`                                                                                     |
| Per-language findings                  | `.claude/translation-review/per-language/{lang}.md`                                                                |
| ETHGlossary terms (filtered to source) | `POST /api/v1/filter`                                                                                              |
| ETHGlossary terms (full per-language)  | `GET /api/v1/translations/{lang}`                                                                                  |
| ETHGlossary policy                     | https://github.com/wackerow/ethglossary/blob/main/docs/translation-policy.md                                       |
| Sanitizer source                       | `src/scripts/intl-pipeline/intl-sanitizer.ts`                                                                      |
| Sanitizer test research                | `docs/solutions/integration-issues/sanitizer-test-research.md`                                                     |
| Past review post-mortems               | `docs/solutions/integration-issues/` + `docs/solutions/logic-errors/`                                              |
| Language config                        | `i18n.config.json`                                                                                                 |

## When to Load Each Reference

Pull these in only when the trigger applies.

- **`references/known-patterns.md`** — Load when starting any review. The catalog of recurring issue patterns (brand mistranslations, MDX syntax errors, semantic inversions, cross-script contamination, etc.).
- **`references/language-rules.md`** — Load when working on a specific non-Latin-script language (ar, bn, hi, ja, ko, mr, ru, ta, te, uk, ur, zh, zh-tw). Per-language-group rules for prose, UI tags, numerals, code, people's names.
- **`references/scoring-rubric.md`** — Load when scoring a PR or producing a quality report. The 5-category rubric (Brand Name Preservation, Technical Accuracy, Semantic Fidelity, Terminology Consistency, Tone/Register) with weighting.
- **`references/ethglossary-usage.md`** — Load when integrating ETHGlossary lookups into a review (which endpoint, when to use `/filter` vs `/translations/{lang}`, how to handle missing terms, what `script_rule` and `term_role` mean for reviewers).
- **`references/per-language-tracking.md`** — Load when writing to or reading from `.claude/translation-review/per-language/{lang}.md`. The convention for accumulating findings across reviews.
- **`references/gotchas.md`** — Load when something feels off and you can't find it inline. The long tail of confusion patterns.
- **`references/critical-vs-warning.md`** — Load when deciding whether to flag an issue as critical (auto-fix) or warning (manual review). The severity rubric.
- **`references/agent-roles.md`** — Load when planning a multi-agent review (structural / terminology / semantic). The split and what each role focuses on.

## Other Project Skills That May Apply

- **`intl-pipeline`** — For the pipeline side: how translations are produced, manifest invariants, sanitizer behavior, the `intl/pending-{base}` model. When a review surfaces a pipeline-level bug (not a translation-level one), reach for this skill.
- **`design-system`** — When a translation issue is rendering-related (BiDi flip, RTL spacing, layout overflow from longer non-English strings).

## Pre-Merge Smoke Test

Before submitting a translation-quality review:

- [ ] ETHGlossary `/filter` endpoint was called for at least one file per language (don't review from memory)
- [ ] All critical issues listed (glossary deviations, MDX syntax errors, brand mistranslations, translated hrefs, semantic inversions)
- [ ] Frontmatter `tags` distinction respected (brand tags English, concept tags translated)
- [ ] Code-block policy applied (functional code English, comments may be translated)
- [ ] Per-language quality score produced in the 5-category rubric
- [ ] Per-language findings file updated at `.claude/translation-review/per-language/{lang}.md`
- [ ] If new issue pattern surfaced, added to `references/known-patterns.md` (or `known-patterns.md` in the KB)
- [ ] All review changes (fixes + knowledge-base updates) committed to the `intl/pending-*` branch under review and pushed — never left on `dev`
- [ ] Build verification (`--build-local` or `--netlify-check`) run if the review touched MDX-syntax-related issues
