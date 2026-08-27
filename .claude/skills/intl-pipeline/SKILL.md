---
name: intl-pipeline
description: Use when working on the translation pipeline (`src/scripts/intl-pipeline/`), the post-import sanitizer (`intl-sanitizer.ts`), the `intl/pending-*` branches, the `intl-pipeline.yml` GitHub Actions workflow, ETHGlossary integration, or any translation-related issue (broken translations, missing locales, manifest drift, sanitizer false positives, ETHGlossary term lookups, language-group transliteration questions). Provides the manifest-driven incremental pipeline mental model, the "don't hand-propagate" rule, recovery procedures, the ETHGlossary-as-canonical-source policy, and the `intl/pending-{base}` orchestration contract.
---

# intl-pipeline

LLM-based, manifest-driven, incremental translation pipeline for ethereum.org. Translates English content (markdown in `public/content/`, JSON UI strings in `src/intl/en/`) into 24 target languages via Gemini — reached either directly or through OpenRouter (`LLM_PROVIDER`), whose keys carry a server-side spend limit — with a post-import sanitizer normalizing common artifacts. **The workflow runs daily at 04:20 UTC and on manual dispatch**; the cron was off between 2026-08-12 and 2026-08-27 after a run billed $1,108 unattended, and was restored once the input-side bounds had supervised runs behind them (`references/runbooks/cost-guard-tripped.md`). ETHGlossary is the authoritative source for all Ethereum-ecosystem term translations consumed by the pipeline. Read this file fully on activation; pull from `references/` only when the listed trigger applies.

## The Core Rule: Don't Hand-Propagate English Changes

The single highest-leverage habit for keeping translations correct: **never hand-edit translated content to reflect an English change.** The pipeline tracks state via manifests (`.manifests/{destPath}/source.json` + `translation.json` per file+locale); hand-edits that follow an English change desynchronize the manifest from reality, and the next pipeline run either re-translates over your edit or produces merge conflicts.

The rule is NOT "never edit locales." It IS "don't hand-propagate English updates":

- **Allowed:** Fixing a translation error when the English side hasn't moved (review-time corrections, sanitizer follow-ups). The manifest's English-to-locale map stays valid.
- **Not allowed:** Editing a locale to reflect a new English value (URL change, attribute change, restructured paragraph). The manifest map becomes wrong.
- **If English-to-locale sync is genuinely urgent** (build-breaking structural change with no pending PR open): make the English edit, then trigger `intl-pipeline.yml` with `stamp_only: true` to refresh manifests without translation. Safe only when no `intl/pending-{base}` branch exists for that base.

**Deletions go through English too.** To remove a string — including an orphaned key code no longer references — delete it from the English source only; the pipeline propagates the removal on its next run. Hand-deleting the locale copies is hand-propagation.

## Top Rules

1. **ETHGlossary is canonical for term translations.** Brand names, people's names, programming languages, OS/platform names, concept terms — all live in ETHGlossary. Don't maintain parallel term banks. The pipeline queries the API via `GLOSSARY_API_URL` (default in `src/scripts/intl-pipeline/config.ts`).
2. **One translation PR at a time per base branch.** The pipeline commits to `intl/pending-{base}` (e.g., `intl/pending-dev`). Subsequent runs merge `{base}` into pending first, then translate the delta. Parallel translation PRs against the same base will conflict.
3. **The pipeline only targets `dev` in production.** Hot fixes to `staging` / `master` go out English-only and catch up via prepare-release. Don't translate against `staging` / `master` unless you have a specific reason and use a custom `target_branch`.
4. **Manifests are inseparable from their locale file.** Each translated file has two manifests, centralized under `.manifests/{destPath}/`: `source.json` and `translation.json`. Delete one, you must regenerate both — easiest via the pipeline in `full` mode for that file+locale. Never hand-edit a manifest.
5. **The sanitizer runs post-translation, not pre.** Its job is to fix Gemini-introduced artifacts (BiDi mistakes, code-fence drift, brand-name mistranslations). It receives translation outputs, never English source.
6. **Don't add transliteration data here.** All term/brand/person transliteration policy lives in ETHGlossary's `docs/translation-policy.md` and per-language entries. The intl-pipeline consumes; it does not author.
7. **Sanitizer fixes must split on code blocks first.** Every text transformation in `intl-sanitizer.ts` MUST start with the code-block split pattern. Modifying code-fence contents breaks Solidity / Python / TypeScript examples in tutorials.
8. **Pipeline failures are not always pipeline bugs.** A "translation looks wrong" report may be: bad Gemini output (file upstream), missing ETHGlossary term (add there), correct per language-group policy (read translation-policy.md), or an actual pipeline bug. Triage before patching.

## Highest-Value Gotchas

These are landmines where the obvious-looking action is wrong. The full set is in `references/gotchas.md`; these come up most often.

### Naming legacy

Old names are dead — `src/scripts/i18n/`, `gemini-translations.yml`, `main-incremental.ts`, "i18n pipeline"; the canonical name everywhere is `intl-pipeline`. Update old names on sight.

### Manifests are centralized under `.manifests/`, not next to the locale file

Two manifests per file+locale at `.manifests/{destPath}/source.json` + `translation.json` (e.g. `.manifests/src/intl/ja/common.json/source.json`). Structure, lifecycle, and debugging: `references/manifests.md`.

### Spend bounds are input-side, and the tell is input tokens per call

Healthy runs average 4k–9k input tokens per call; the input:output ratio is NOT a signal. Before merging anything that touches batching, prompt assembly, or context selection, run `pnpm intl:estimate` and compare per-request input tokens against that range. Bounds, triage, and the incident that motivated them: `references/runbooks/cost-guard-tripped.md`.

### `intl/pending-{base}` branch lifecycle

The pipeline creates `intl/pending-{base}` on first run, commits translations to it, opens a PR against `{base}`. Subsequent runs MERGE `{base}` into pending first, then translate the delta. After the pending PR is merged, the branch is deleted; the next run creates a fresh one.

Do NOT rebase, squash, or force-push `intl/pending-{base}`. The pipeline depends on its history.

### SOV-language inline element reordering

For Korean, Urdu, and other SOV (subject-object-verb) languages, inline elements (links, inline code, JSX components) often appear in REVERSE order vs. English. The pipeline's inert-propagation pass matches elements by **value**, not by position. Any logic that assumes positional order will silently corrupt those languages.

### JSX attribute translation is a separate pass

JSX attribute values are NOT translated in the main Phase 4 LLM call. Phase 4b is a dedicated pass with an allow-list of translatable attribute names (`title`, `description`, `alt`, `label`, `aria-label`, `placeholder`, etc.) defined in `src/scripts/intl-pipeline/lib/shared-patterns.ts`. Touching attribute translation means touching that pass, not Phase 4.

### Sanitizer test scope is per-file, never per-language sweep

NEVER run the sanitizer against an entire language. It processes thousands of files and hangs for 30+ minutes. There is no per-file env var — the only env-based scoping is per-language via `TARGET_LANGUAGES` (e.g. `TARGET_LANGUAGES=ja`), which still sweeps that whole language. Scope to specific files programmatically by calling the exported `runSanitizer(filesWithContent)` from `intl-sanitizer.ts` with just the affected file(s). The slash command `/fix-sanitizer-bug` enforces this; if you script around it, preserve the constraint.

## Quick "Where Do I Look?" Cheatsheet

| I need...                              | Path                                                               |
| -------------------------------------- | ------------------------------------------------------------------ |
| Pipeline entry                         | `src/scripts/intl-pipeline/main.ts`                                |
| Sanitizer                              | `src/scripts/intl-pipeline/intl-sanitizer.ts`                      |
| Gemini adapter                         | `src/scripts/intl-pipeline/lib/llm/gemini.ts`                      |
| OpenRouter transport                   | `src/scripts/intl-pipeline/lib/llm/openrouter.ts`                  |
| Adapter registry / provider selection  | `src/scripts/intl-pipeline/lib/llm/adapters.ts`, `constants.ts`    |
| Spend bounds (budget + run fuse)       | `src/scripts/intl-pipeline/lib/llm/cost-meter.ts`                  |
| Work planner (shared with estimate)    | `src/scripts/intl-pipeline/lib/llm/plan.ts`                        |
| Cost estimate, no LLM calls            | `pnpm intl:estimate` (`src/scripts/intl-pipeline/estimate.ts`)     |
| Prompt builder                         | `src/scripts/intl-pipeline/lib/llm/prompt-builder.ts`              |
| Content normalizer                     | `src/scripts/intl-pipeline/lib/llm/content-normalizer.ts`          |
| Shared patterns (JSX attrs allow-list) | `src/scripts/intl-pipeline/lib/shared-patterns.ts`                 |
| Glossary config                        | `src/scripts/intl-pipeline/config.ts`                              |
| Workflow file                          | `.github/workflows/intl-pipeline.yml`                              |
| Per-file pipeline spec (canonical)     | `tests/specs/PIPELINE-SPEC.md`                                     |
| Concurrency / chunking spec            | `tests/specs/CONCURRENCY-SPEC.md`                                  |
| Test fixture mutation table            | `tests/specs/SPEC.md`                                              |
| Sanitizer test suite                   | `tests/unit/intl-pipeline/sanitizer/`                              |
| Pipeline test suite                    | `tests/unit/intl-pipeline/`                                        |
| Future-work backlog                    | `src/scripts/intl-pipeline/FUTURE.md`                              |
| Language config (canonical list)       | `i18n.config.json`                                                 |
| ETHGlossary repo                       | https://github.com/wackerow/ethglossary                            |
| ETHGlossary API root                   | https://ethglossary.visual-20-hoists.workers.dev                   |

## When to Load Each Reference

Pull these in only when the trigger applies. Don't read them all upfront.

- **`references/architecture.md`** — debugging pipeline behavior; the phase-by-phase walkthrough.
- **`references/manifests.md`** — manifests misbehave, or changing what the pipeline tracks.
- **`references/orchestration.md`** — working with `intl/pending-{base}` branches.
- **`references/recovery.md`** — translations broken, triaging "the pipeline did something wrong."
- **`references/sanitizer.md`** — sanitizer behavior, false positives/negatives, fix-function catalog.
- **`references/runbooks/fix-sanitizer-bug.md`** — confirmed sanitizer bug; when (not) to run `/fix-sanitizer-bug`.
- **`references/runbooks/cost-guard-tripped.md`** — `[cost-guard]` aborts, budget skips, cost-bound design, provider selection.
- **`references/ethglossary.md`** — term lookups, `script_rule`/`term_role` semantics, missing terms.
- **`references/non-english-edits.md`** — about to hand-edit a translated file.
- **`references/gotchas.md`** — something feels off and it isn't inline above.

## Other Project Skills That May Apply

- **`intl-review`** — For translation quality review (scoring rubric, language-group rules, brand-name policies, per-language findings). The review side of the same coin; the pipeline produces, intl-review evaluates.
- **`data-layer`** — For data fetching, if pipeline changes touch externally-sourced content.

## Pre-Merge Smoke Test

Before opening a PR that touches the pipeline:

- [ ] Sanitizer test suite passes (`npx playwright test --project=unit tests/unit/intl-pipeline/sanitizer/`)
- [ ] Pipeline test suite passes (`npx playwright test --project=unit tests/unit/intl-pipeline/`)
- [ ] No hand-edits to `public/content/translations/` or `src/intl/{non-en}/` files
- [ ] No manual changes to manifest files under `.manifests/`
- [ ] If renaming workflow / config paths, all doc references updated (search for old names)
- [ ] If adding pipeline-affecting code, `src/scripts/intl-pipeline/FUTURE.md` updated (or item removed if completed)
- [ ] If new sanitizer fix function, the code-block-split pattern is the first operation inside it
- [ ] If touching term policy or transliteration, change goes in ETHGlossary first — never duplicate term data here
- [ ] If touching the orchestration model (pending branch, temp branch, stamp_only), `references/orchestration.md` updated alongside
- [ ] If touching batching, prompt assembly, or context selection: `pnpm intl:estimate` run and per-request input tokens sane (4k–9k), plus `tests/unit/intl-pipeline/cost-incident.spec.ts` passing
- [ ] No new LLM call site that bypasses `callGeminiRaw` — it is the single choke point where the per-call ceiling and run fuse are enforced
