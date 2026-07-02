---
name: intl-pipeline
description: Use when working on the translation pipeline (`src/scripts/intl-pipeline/`), the post-import sanitizer (`intl-sanitizer.ts`), the `intl/pending-*` branches, the `intl-pipeline.yml` GitHub Actions workflow, ETHGlossary integration, or any translation-related issue (broken translations, missing locales, manifest drift, sanitizer false positives, ETHGlossary term lookups, language-group transliteration questions). Provides the manifest-driven incremental pipeline mental model, the "don't hand-propagate" rule, recovery procedures, the ETHGlossary-as-canonical-source policy, and the `intl/pending-{base}` orchestration contract.
---

# intl-pipeline

LLM-based, manifest-driven, incremental translation pipeline for ethereum.org. Translates English content (markdown in `public/content/`, JSON UI strings in `src/intl/en/`) into 24 target languages via Gemini, with a post-import sanitizer normalizing common artifacts. ETHGlossary (https://ethglossary.visual-20-hoists.workers.dev) is the authoritative source for all Ethereum-ecosystem term translations consumed by the pipeline. Read this file fully on activation; pull from `references/` only when the listed trigger applies.

## The Core Rule: Don't Hand-Propagate English Changes

The single highest-leverage habit for keeping translations correct: **never hand-edit translated content to reflect an English change.** The pipeline tracks state via manifests (`.manifest-source.json` + `.manifest-translation.json` per file+locale); hand-edits that follow an English change desynchronize the manifest from reality, and the next pipeline run either re-translates over your edit or produces merge conflicts.

The rule is NOT "never edit locales." It IS "don't hand-propagate English updates":

- **Allowed:** Fixing a translation error when the English side hasn't moved (review-time corrections, sanitizer follow-ups). The manifest's English-to-locale map stays valid.
- **Not allowed:** Editing a locale to reflect a new English value (URL change, attribute change, restructured paragraph). The manifest map becomes wrong.
- **If English-to-locale sync is genuinely urgent** (build-breaking structural change with no pending PR open): make the English edit, then trigger `intl-pipeline.yml` with `stamp_only: true` to refresh manifests without translation. Safe only when no `intl/pending-{base}` branch exists for that base.

**Deletions go through English too.** The pipeline propagates only what *changes* in canonical English; it never scans for unused or orphaned strings. To remove a string, delete it from English (`src/intl/en/` or the English content) first — the pipeline then propagates the removal to the locales. Nothing auto-prunes a key just because code stopped referencing it.

## Top Rules

1. **ETHGlossary is canonical for term translations.** Brand names, people's names, programming languages, OS/platform names, concept terms — all live in ETHGlossary. Don't maintain parallel term banks. The pipeline queries the API via `GLOSSARY_API_URL` (default in `src/scripts/intl-pipeline/config.ts`).
2. **One translation PR at a time per base branch.** The pipeline commits to `intl/pending-{base}` (e.g., `intl/pending-dev`). Subsequent runs merge `{base}` into pending first, then translate the delta. Parallel translation PRs against the same base will conflict.
3. **The pipeline only targets `dev` in production.** Hot fixes to `staging` / `master` go out English-only and catch up via prepare-release. Don't translate against `staging` / `master` unless you have a specific reason and use a custom `translation_branch`.
4. **Manifests are inseparable from their locale file.** Each translated file has two manifests next to it: `.manifest-source.json` and `.manifest-translation.json`. Delete one, you must regenerate both — easiest via the pipeline in `full` mode for that file+locale. Never hand-edit a manifest.
5. **The sanitizer runs post-translation, not pre.** Its job is to fix Gemini-introduced artifacts (BiDi mistakes, code-fence drift, brand-name mistranslations). It receives translation outputs, never English source.
6. **Don't add transliteration data here.** All term/brand/person transliteration policy lives in ETHGlossary's `docs/translation-policy.md` and per-language entries. The intl-pipeline consumes; it does not author.
7. **Sanitizer fixes must split on code blocks first.** Every text transformation in `intl-sanitizer.ts` MUST start with the code-block split pattern. Modifying code-fence contents breaks Solidity / Python / TypeScript examples in tutorials.
8. **Pipeline failures are not always pipeline bugs.** A "translation looks wrong" report may be: bad Gemini output (file upstream), missing ETHGlossary term (add there), correct per language-group policy (read translation-policy.md), or an actual pipeline bug. Triage before patching.

## Highest-Value Gotchas

These are landmines where the obvious-looking action is wrong. The full set is in `references/gotchas.md`; these come up most often.

### Naming legacy

The pipeline was historically called the "Gemini translation pipeline" and the "i18n pipeline." Old docs and external references may still use those names. Canonical names today:

- Module path: `src/scripts/intl-pipeline/` (was `src/scripts/i18n/`)
- Workflow file: `.github/workflows/intl-pipeline.yml` (was `gemini-translations.yml`)
- Pipeline entry: `src/scripts/intl-pipeline/main.ts` (was `main-incremental.ts` / `main-gemini.ts`)
- Module name in prose: `intl-pipeline`. Avoid `i18n-pipeline` and `gemini-translations` in new content.

If you see one of the old names in a doc or comment, update it.

### Manifests live next to the locale file, not centralized

For `public/content/translations/ja/some-page/index.md`, the manifests are:

- `public/content/translations/ja/some-page/index.md.manifest-source.json`
- `public/content/translations/ja/some-page/index.md.manifest-translation.json`

Same pattern for JSON locale files in `src/intl/{locale}/`. Don't move a locale file without moving its manifests; renaming a content file means renaming six files per locale (file + 2 manifests, times the en source).

### `intl/pending-{base}` branch lifecycle

The pipeline creates `intl/pending-{base}` on first run, commits translations to it, opens a PR against `{base}`. Subsequent runs MERGE `{base}` into pending first, then translate the delta. After the pending PR is merged, the branch is deleted; the next run creates a fresh one.

Do NOT rebase, squash, or force-push `intl/pending-{base}`. The pipeline depends on its history.

### `stamp_only: true` is the override hatch

If a structural change in English would break the build for translated locales (a removed component the locale still references, an MDX-incompatible change), trigger `intl-pipeline.yml` with `stamp_only: true` AFTER fixing the English side. This regenerates manifests without translation. Safe only when no pending branch exists for that base.

### SOV-language inline element reordering

For Korean, Urdu, and other SOV (subject-object-verb) languages, inline elements (links, inline code, JSX components) often appear in REVERSE order vs. English. The pipeline's inert-propagation pass matches elements by **value**, not by position. Any logic that assumes positional order will silently corrupt those languages.

### JSX attribute translation is a separate pass

JSX attribute values are NOT translated in the main Phase 4 LLM call. Phase 4b is a dedicated pass with an allow-list of translatable attribute names (`title`, `description`, `alt`, `label`, `aria-label`, `placeholder`, etc.) defined in `src/scripts/intl-pipeline/lib/shared-patterns.ts`. Touching attribute translation means touching that pass, not Phase 4.

### Sanitizer test scope is per-file, never per-language sweep

NEVER run the sanitizer against an entire language. It processes thousands of files and hangs for 30+ minutes. Always scope to specific files via `TARGET_FILES` env var. The slash command `/fix-sanitizer-bug` enforces this; if you script around it, preserve the constraint.

## Quick "Where Do I Look?" Cheatsheet

| I need... | Path |
|---|---|
| Pipeline entry | `src/scripts/intl-pipeline/main.ts` |
| Sanitizer | `src/scripts/intl-pipeline/intl-sanitizer.ts` |
| Gemini adapter | `src/scripts/intl-pipeline/lib/llm/gemini.ts` |
| Prompt builder | `src/scripts/intl-pipeline/lib/llm/prompt-builder.ts` |
| Content normalizer | `src/scripts/intl-pipeline/lib/llm/content-normalizer.ts` |
| Shared patterns (JSX attrs allow-list) | `src/scripts/intl-pipeline/lib/shared-patterns.ts` |
| Glossary config | `src/scripts/intl-pipeline/config.ts` |
| Workflow file | `.github/workflows/intl-pipeline.yml` |
| Per-file pipeline spec (canonical) | `tests/specs/PIPELINE-SPEC.md` |
| Concurrency / chunking spec | `tests/specs/CONCURRENCY-SPEC.md` |
| Test fixture mutation table | `tests/specs/SPEC.md` |
| Sanitizer test suite | `tests/unit/intl-pipeline/sanitizer/` |
| Pipeline test suite | `tests/unit/intl-pipeline/` |
| Future-work backlog | `src/scripts/intl-pipeline/FUTURE.md` |
| Language config (canonical list) | `i18n.config.json` |
| ETHGlossary repo | https://github.com/wackerow/ethglossary |
| ETHGlossary API root | https://ethglossary.visual-20-hoists.workers.dev |
| Slash command: fix sanitizer bug | `/fix-sanitizer-bug` (`.claude/commands/fix-sanitizer-bug.md`) |
| Slash command: review translations | `/review-translations` (`.claude/commands/review-translations.md`) |

## When to Load Each Reference

Pull these in only when the trigger applies. Don't read them all upfront.

- **`references/architecture.md`** — Load when debugging pipeline behavior or wanting the phase-by-phase walkthrough (change detection, routing, deterministic propagation, LLM translation, JSX attribute pass, assembly, manifest update).
- **`references/manifests.md`** — Load when manifests misbehave (mismatched hashes, missing sections, drift on supposedly-unchanged files), or when changing what the pipeline tracks.
- **`references/orchestration.md`** — Load when working with `intl/pending-{base}` branches: base-into-pending merges, temp-branch lifecycle, multi-run coordination, what happens when base moves during a run.
- **`references/recovery.md`** — Load when translations are broken and you need to recover (bad LLM output, corrupted manifests, accidental hand-edits, build failure on a locale). The first place to go when triaging "the pipeline did something wrong."
- **`references/sanitizer.md`** — Load when investigating sanitizer behavior, false positives / negatives, or adding fix functions. Pattern catalog lives in `docs/solutions/integration-issues/sanitizer-test-research.md`.
- **`references/runbooks/fix-sanitizer-bug.md`** — Load when you have a confirmed sanitizer bug and need the test-first workflow (triage / write failing test / implement / verify).
- **`references/ethglossary.md`** — Load when ETHGlossary is the question: how the pipeline queries terms, when to add to ETHGlossary, how `script_rule` and `term_role` map to pipeline behavior, what to do when a term is missing.
- **`references/non-english-edits.md`** — Load when about to edit a translated file by hand. Tells you when it's safe (English unchanged) and when it isn't (sync after English change).
- **`references/gotchas.md`** — Load when something feels off and you can't find it inline above. The long tail of landmines.

## Other Project Skills That May Apply

- **`intl-review`** — For translation quality review (scoring rubric, language-group rules, brand-name policies, per-language findings). The review side of the same coin; the pipeline produces, intl-review evaluates.
- **`data-layer`** — For data fetching, if pipeline changes touch externally-sourced content.

## Pre-Merge Smoke Test

Before opening a PR that touches the pipeline:

- [ ] Sanitizer test suite passes (`npx playwright test --project=unit tests/unit/intl-pipeline/sanitizer/`)
- [ ] Pipeline test suite passes (`npx playwright test --project=unit tests/unit/intl-pipeline/`)
- [ ] No hand-edits to `public/content/translations/` or `src/intl/{non-en}/` files
- [ ] No manual changes to `*.manifest-*.json` files
- [ ] If renaming workflow / config paths, all doc references updated (search for old names)
- [ ] If adding pipeline-affecting code, `src/scripts/intl-pipeline/FUTURE.md` updated (or item removed if completed)
- [ ] If new sanitizer fix function, the code-block-split pattern is the first operation inside it
- [ ] If touching term policy or transliteration, change goes in ETHGlossary first — never duplicate term data here
- [ ] If touching the orchestration model (pending branch, temp branch, stamp_only), `references/orchestration.md` updated alongside
