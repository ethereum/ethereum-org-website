---
title: "i18n Incremental Translation Pipeline"
project: ethereum-org-website
repo: ethereum/ethereum-org-website
branches:
  v3: gemini-v3
  v4: gemini-v4
  v5: gemini-v5
base: dev
package: intl-content-tree (npm, MPL-2.0)
package_versions:
  - v0.1.3: initial integration
  - v0.1.4: diff entry types
  - v0.1.5: full inert extraction rewrite
  - v0.2.0: structuralDrift classification + getContainingSection
  - v0.2.1: bugfix
pipeline_phases:
  1: Initialize (staging branch)
  2: Drift Detection (auto-detect full vs incremental)
  3: Full Translation (new files, no manifests)
  4: Remove Deleted Content
  5: Prose Retranslation (section-level Gemini calls)
  6: Commit (locale files + manifests)
  7: Sanitize (BiDi, code fence alignment)
key_files:
  orchestrator: src/scripts/i18n/main-incremental.ts
  full_pipeline: src/scripts/i18n/main-gemini.ts
  manifest_adapter: src/scripts/i18n/lib/ai/manifest-adapter.ts
  inert_propagation: src/scripts/i18n/lib/ai/propagate-inert.ts
  incremental_translate: src/scripts/i18n/lib/ai/incremental-translate.ts
  gemini_translate: src/scripts/i18n/lib/ai/gemini-translate.ts
  content_normalizer: src/scripts/i18n/lib/ai/content-normalizer.ts
  branch_utils: src/scripts/i18n/lib/github/branches.ts
  file_fetch: src/scripts/i18n/lib/github/files.ts
  workflow: .github/workflows/gemini-translations.yml
status_as_of: 2026-04-10
confidence: high
---

# i18n Incremental Translation Pipeline

## 1. Problem History

### The Original Problem

Ethereum.org supports 25 languages (24 non-English). The site used **Crowdin** as its translation management platform, relying on community volunteers and machine translation. Problems:

- **Cost and vendor lock-in**: Crowdin is proprietary SaaS. The Ethereum Foundation prioritizes open-source and avoiding empowering already-powerful companies.
- **Quality inconsistency**: Volunteer skill varied widely.
- **Latency**: English changes took weeks or months to propagate to all 24 languages.
- **No incremental path**: Every translation cycle was essentially full retranslation or manual diff.

The decision was made to replace Crowdin with a **Gemini-based translation pipeline** -- in-house, controlled via GitHub Actions, with full ownership of tooling.

### Evolution: v3 -> v4 -> v5

**v3 (gemini-v3, ~Mar 23-28 2026): Full-File Translation**

Built the foundation: full-file translation with glossary enforcement, code block extraction/restoration, comment translation, incremental commit per language, post-import sanitization, JSON batching, safety settings, shared concurrency pool. 15 translation prompt rules. 100% custom header ID coverage.

v3 limitation: every run retranslates entire files. No drift detection, no incremental capability.

**v4 (gemini-v4, ~Mar 29 - Apr 8 2026): Incremental Translation**

Built manifest infrastructure (Merkle trie hash trees), content normalizer (placeholder extraction), inert-value propagation, `intl-content-tree` package integration (v0.1.3 through v0.1.5), 7-phase orchestrator, auto-detect full vs incremental, section-level prose retranslation, removed content pruning, staging branch infrastructure.

v4 shipped ~50 pipeline-specific commits. Critical bugs found and fixed: `restoreHeadingIds` not code-fence-aware, global regex replacement, duplicate section splicing, value-matching against wrong manifest state, hardcoded markdown format.

v4 known gap: inert propagation worked in unit tests but failed on real production content due to section-level drift classification being too coarse.

**v5 (gemini-v5, Apr 9 2026): Classification-Aware**

Strategic pivot: rather than shipping v4's complex inert propagation, the team decided to:
1. Simplify to section-level retranslation (any translatable drift = Gemini call)
2. Add stamp-only mode for manual inert propagation workflow
3. Integrate intl-content-tree v0.2.0 with `structuralDrift` classification and `getContainingSection()` helper
4. Preserve v4 inert propagation code for future re-enablement

v5 correctly classifies changes: only `translatableDrift` and `added` sections go to Gemini. Inert and structural drift are identified but not sent to the LLM.

### Key Architectural Decisions

**Single Translation Branch (`intl/pending`)**: All pipeline runs commit to one branch. One PR at a time. Concurrency group serializes runs. Eliminates manifest conflicts from concurrent PRs.

**Dual Manifests (Source + Translation)**: Source manifest stores English hash tree. Translation manifest stores locale-specific metadata (placeholder ordering, inert values, section status). Separation of concerns between English source of truth and locale-specific state.

**Package Analyzes, Pipeline Acts**: `intl-content-tree` handles detection (parsing, hashing, diffing, classifying). Pipeline handles replacement (section scoping, regex patterns, commit orchestration). Clean boundary established in v5 after v4's attempts to blur it.

**`sourceCommitSha` in Manifests**: Enables git-based retrieval of old English content via GitHub API. Required because manifests store hashes, not values.

**Hot Fixes Are English-Only**: Pipeline only targets `dev` in production. Multi-branch translation deferred as too complex for rare scenario.

**v4-Simplified Over v4-Full**: Ship section-level retranslation (correct on all content, slightly more Gemini calls) instead of node-level inert routing (buggy on real content). The incremental win is already massive: retranslate 3 changed sections instead of a 300-section file = 99% reduction.

### Timeline

| Period | Milestone |
|--------|-----------|
| Mar 23-25 | v3 foundation: logging, concurrency, code block protection |
| Mar 26-28 | v3 hardening: JSON batching, safety settings, glossary |
| Mar 29-30 | v4 manifest infrastructure |
| Apr 1-2 | Content normalizer, inert propagation |
| Apr 3-4 | BiDi sanitizer, intl-content-tree initial integration |
| Apr 5 | Orchestrator assembly, workflow YAML |
| Apr 6 | Testing blitz, auto-detect, JSON incremental |
| Apr 7-8 | GH Actions testing (test-6 through test-10), critical fence fix |
| Apr 9 | v4 freeze, v5 birth, v0.2.0 integration |
| Apr 10 | v5 ready for manual production testing |

---

## 2. What Works (Verified)

### Full Translation with Manifest Generation
When no locale file or manifest exists, the pipeline falls back to full-file Gemini translation (Phase 3). Both manifests stamped. Uses normalizer (placeholder-based) for markdown, raw translation for JSON.

### Section-Level Drift Detection (intl-content-tree v0.2.0+)
`diff()` returns 8 categories: `unchanged`, `inertDrift`, `translatableDrift`, `structuralDrift`, `added`, `removed`, `renamed`, `reordered`. Only `translatableDrift` and `added` trigger Gemini.

### Classification: Inert vs Structural vs Translatable
- **Inert**: URL changes, image paths, attributes. Language-independent.
- **Structural**: Component add/remove, code fence addition. No prose changed.
- **Translatable**: Actual prose text changes. Goes to Gemini.

### Section-Level Prose Retranslation
Changed sections tagged `TRANSLATE`; unchanged provide `CONTEXT`. Gemini returns JSON keyed by section ID. `replaceSections()` splices results back. Each section covers only its direct body (next heading of ANY level).

### Removed Content Pruning
Phase 4 handles `drift.removed`. Markdown: `removeMarkdownSection()` by heading `{#id}`. JSON: navigate key path, delete.

### Staging Branch
`intl/pending` with `ensureStagingBranch()`. Merges base before committing. Concurrency group serializes runs.

### Stamp-Only Mode
`STAMP_ONLY=true` skips Phases 3-5 and 7. Only stamps manifests. For manual inert propagation: dev changes English, manually propagates URLs, runs stamp-only.

### Sanitizer Integration
Phase 7 runs `runPostImportSanitization()` on all Gemini output. BiDi fixes, code fence alignment. Non-fatal.

### restoreHeadingIds Fence Fix
Tracks `inFence` state so Python `# comments` in code blocks aren't treated as headings. Sequential position matching for ID restoration.

---

## 3. What Was Tried and Failed

### 3.1 Value-Matching for Inert Propagation

**Attempted**: Compare new English tree nodes against old translation manifest `placeholderMap` by anchor hash to find what changed.

**Failed because**: The manifest stores OLD values. Looking up NEW values by hash can't find entries whose hash changed -- which is precisely the entries that need updating.

**Replaced by**: `extractInertChanges()` from intl-content-tree v0.1.5 which walks both old and new trees in parallel. Later superseded by v0.2.0's three-way classification.

**Lesson**: When detecting changes between two states, you need BOTH states' full data. A manifest snapshot of state A cannot find entries that changed in state B by hash lookup.

### 3.2 Locale-Tree-as-Proxy for Old English Content

**Attempted**: Parse the locale (translated) file as a proxy for old English, since inert values aren't translated.

**Failed because**: The tree parser assigns element indices (`link:0`, `component:2`) by DFS traversal order. Translated files can have different structural ordering than English -- SOV languages reorder, components shift relative to prose. `link:0` in English might be `link:1` in the locale.

**Replaced by**: `sourceCommitSha` + `fetchFileAtCommit()` to retrieve actual old English from git history.

**Lesson**: Translated files are NOT structural proxies for English. Only the actual old English file is reliable for tree structure comparison.

### 3.3 Regex-Based Global Replacement

**Attempted**: `string.replace(oldValue, newValue)` or global regex patterns to update locale files.

**Failed because**: Same URL appearing multiple times would ALL be replaced. `section-a/link:0` and `section-b/link:0` might have different old values, but global replace can't target specific occurrences.

**Replaced by**: Section-scoped, occurrence-counted replacement. `extractSectionScope()` finds the narrowest heading section. `replaceNthInScope()` replaces only the Nth occurrence within that scope. Context-aware patterns prevent false positives.

**Lesson**: Global find-and-replace is never safe for structural document edits. Scope + count + context = three layers of precision.

### 3.4 Hash-Based Manifest Entry Lookup (Key Name Mismatch)

**Attempted**: `findManifestEntryByAnchorHash` with three hash strategies to bridge normalizer vs tree representations.

**Failed because**: Normalizer used `"path"` for image sources, tree used `"src"`. Normalizer bundled parent+child attributes, tree had separate nodes. Normalizer excluded `tagName`, tree included it in hash. Silent hash mismatches.

**Replaced by**: `extractInertChanges()` from the package, which handles tree walking internally without cross-model bridging.

**Lesson**: When two systems independently model the same data, their representations WILL diverge. Have ONE system do the comparison.

### 3.5 Occurrence Counting with Component Attribute Indexes

**Attempted**: Parse `component:4/attr:emoji` path -- extract `4` as the occurrence index for the emoji attribute.

**Failed because**: `attr:emoji` is a key identifier, not a counter. `component:4` means "4th component in section" but the code used it as "4th emoji attribute" -- wrong count entirely.

**Replaced by**: Component attributes always use occurrence 0 (the key+value combination is unique within a section).

**Lesson**: Tree path segments encode different things depending on element type. Don't apply one interpretation universally.

### 3.6 restoreHeadingIds Without Fence Awareness

**Attempted**: Simple regex `^(#{1,6})\s+` with `gm` flag to find all headings in translated output.

**Failed because**: Python `# comments` inside code fences matched the heading regex. Heading N got heading N+K's ID (where K = number of code comments before it). Affected ALL locales simultaneously.

**Replaced by**: Fence-aware line-by-line processing. `inFence` boolean toggled on `` ``` `` lines, skip when inside fence.

**Lesson**: Any function processing markdown headings MUST be code-fence-aware. `#` has dual meaning (heading vs comment).

### 3.7 Section-Level Drift Classification Too Coarse

**Attempted**: Pre-v0.2.0, if ANY node changed within a section, the whole section was classified as `translatableDrift`. The pipeline tried to run inert propagation first, then send remainder to Gemini.

**Failed because**: A URL change or component addition would flag the entire section as needing retranslation. The pipeline's inert detection code had to be extremely reliable (it wasn't). Any bug in detection cascaded into wrong routing.

**Replaced by**: Two-stage fix. v4 simplification removed inert propagation entirely (all drift -> Gemini). v0.2.0 brought three-way classification from the package. Now only `translatableDrift` + `added` trigger Gemini.

**Lesson**: Classification logic belongs in the content tree package, not the pipeline. Ship the coarse approach first, optimize with precise classification later.

---

## 4. Current Architecture (v5)

### Data Flow

```
English file (from base_branch via checkout)
    |
    v
Phase 1: Initialize
    - Ensure staging branch (intl/pending)
    - Load English files from TARGET_PATH
    - Load glossary data
    |
    v
Phase 2: Drift Detection (per file x locale)
    - Load manifests + locale file from disk
    - hasEnglishChanged() -> root hash fast-path
    - detectDrift() -> DiffResult with 8 categories
    - Auto-detect: no manifest -> full translation queue
    - Deserialize manifest tree for getContainingSection()
    |
    v
Phase 3: Full Translation (new files only)
    - translateFile() via Gemini
    - Stamp both manifests
    |
    v
Phase 4: Remove Deleted Content
    - drift.removed entries
    - MD: removeMarkdownSection() by {#id}
    - JSON: delete by key path
    |
    v
Phase 5: Prose Retranslation
    - Only translatableDrift + added IDs
    - Map tree paths -> heading sections via getContainingSection()
    - Extract sections, build TRANSLATE/CONTEXT list
    - Single batched Gemini call per file
    - Parse JSON response, replace sections
    |
    v
Phase 6: Commit
    - Locale files via SharedCommitter
    - Stamp .manifest-source.json + .manifest-translation.json
    - In stamp-only: manifests only, no locale files
    |
    v
Phase 7: Sanitize
    - runPostImportSanitization() on Gemini output
    - BiDi, code fence alignment
    - Non-fatal
```

### Manifest System

**Source manifest** (`.manifest-source.json`): Serialized English content tree. Contains `rootHash`, `sourceCommitSha`, full tree structure with per-node hashes.

**Translation manifest** (`.manifest-translation.json`): Per-locale metadata. Contains `englishManifestHash`, `placeholderOrder`, `placeholderMap` (placeholder ID -> element type + inert values), `sections` (per-section status).

### What Is Partially Disabled

**Inert propagation** (`propagate-inert.ts`): `applyInertChanges()` and all helpers (section-scoped, occurrence-counted replacement) are implemented and tested (24 unit tests). `detectInertChanges()` was removed. The apply-side code remains for future re-enablement when pipeline-side tree walking is integrated. Currently handled via stamp-only mode (manual propagation + manifest update).

---

## 5. Related Documentation

- `docs/i18n-incremental-pipeline.md` -- Canonical pipeline spec (phases, configuration, workflow inputs)
- `docs/gemini-translation-roadmap.md` -- Original roadmap (priorities 1-5)
- `src/scripts/i18n/FUTURE.md` -- Feature backlog

### Test Files

| File | Tests |
|------|-------|
| `tests/unit/propagate-inert.spec.ts` | 24 tests: section-scoped replacement, JSON precision, manifest update |
| `tests/unit/incremental-translate.spec.ts` | 18 tests: section extraction, replacement, JSON sections |

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single staging branch (`intl/pending`) | Eliminates manifest conflicts from concurrent translation PRs |
| Hot fixes are English-only | Multi-branch translation too complex for rare scenario |
| Package analyzes, pipeline acts | Clean separation: `intl-content-tree` handles detection, pipeline handles replacement |
| v4 ships section-level retranslation | Correct on all content, 99% reduction vs full-file retranslation. Node-level optimization deferred. |
| `structuralDrift` classification | Distinguishes "section structure changed" from "prose text changed" -- only prose changes trigger Gemini |
| Stamp-only mode | Manual workaround for inert propagation: dev propagates changes, pipeline stamps manifests |
| Re-parse old English from git | Deserialized manifests lose `contentType`/`elementType`. `sourceCommitSha` + `git show` retrieves actual old content for accurate diffing. |

---

## 6. Lessons Learned

### Process Lessons

1. **Unit tests passing != production ready.** 47 tests passed with simple fixtures. The first real-world test on `security/index.md` exposed code fence handling, heading ID corruption, and drift classification issues that weeks of fixture testing missed.

2. **Test on real content early.** The pipeline went through ~40 commits of fix-on-fix because each iteration was validated against toy fixtures. A single run against one real markdown file would have caught the critical bugs in the first session.

3. **Don't blame external systems before checking your own code.** Multiple debugging rounds assumed Gemini was producing bad output when the real bugs were in `restoreHeadingIds`, `contextAwareReplace`, and `replaceSections`.

4. **Separate commit and push -- always.** The human needs a review window. Combining them removes the opportunity for review. This was violated multiple times, leading to broken commits on staging branches.

5. **Ship simple first, optimize later.** The v4/v5 split should have happened from the start. v4 (section-level retranslation) is production-ready. v5 (node-level inert routing) adds optimization. The pipeline would have shipped weeks earlier with this separation.

6. **New package versions require pipeline integration testing.** v0.2.0 correctly classified `structuralDrift`, but the pipeline only checked `inertDrift` and `translatableDrift`, causing structural changes to fall through to Gemini.

### Technical Lessons

1. **Tree node IDs != heading IDs.** Different ID spaces require `getContainingSection()` mapping.
2. **Manifest hashes != content values.** Deserialized trees have hashes, not text. Need `sourceCommitSha` + API for old values.
3. **Code fences create false heading matches.** `#` is both heading syntax and comment syntax.
4. **Locale files have different tree structure than English.** Node numbering differs due to language-specific prose decomposition.
5. **Regex global replacement is dangerous.** Always scope + count + verify.
6. **Overlapping section replacement corrupts content.** Set endLine to next heading of ANY level.

### Architecture Lessons

1. **Single staging branch eliminates manifest conflicts.**
2. **Classification granularity matters.** Section-level too coarse for inert routing, but correct for prose retranslation.
3. **Package should analyze, pipeline should act.** Clean separation prevents bugs from cross-concern logic.

---

## 7. Anti-Patterns to Avoid

| Anti-Pattern | What Happened | Prevention |
|---|---|---|
| Global regex replacement | Changed every URL occurrence, corrupting unrelated sections | Scope to narrowest section, count occurrences, verify value |
| Fixture-only testing | 47 tests passed, production content broke immediately | Include real production files in test suite |
| Blaming the LLM | Hours debugging prompts when bug was in post-processing | Diff raw LLM output against final output |
| Hardcoded format assumptions | `detectInertChanges` assumed markdown for all files | Pass format explicitly, never infer |
| Stamping manifests on partial success | Skipped changes permanently lost | Guard with applied-count check |
| Overlapping replacement ranges | h2 replacement included h3 content, duplicating it | Set end boundary to next heading of ANY level |
| Ignoring new enum values | Pipeline didn't handle `structuralDrift` from v0.2.0 | Exhaustive switch/match on typed results |
| `/` in JSON keys | `replaceJsonValues` uses `/` as nesting separator | Document as naming constraint or escape literal `/` in keys |

---

## 8. Testing Strategy

### Before Any Pipeline Merge

1. **Real-content integration tests.** Run against `security/index.md` (code fences, components), one JSON file with ICU, one RTL locale.
2. **Diff verification.** Assert: no unintended changes outside targeted sections, code fences byte-identical, heading IDs preserved.
3. **Round-trip test.** Run twice. Second run = zero drift. If drift persists, manifest stamping is wrong.
4. **Exhaustive routing test.** Mock diff with one entry in each classification bucket. Verify correct routing.
5. **Fence-awareness regression.** Any heading-related change must include Python `# comment` test case.
6. **Cross-locale structural divergence.** Test on Korean (SOV) and Arabic (BiDi).

### Test Infrastructure

- Keep `fixtures/real-content/` with snapshots of actual production files.
- Integration tests in CI against real fixtures, not just unit tests against synthetic content.
- Re-run full integration suite on every `intl-content-tree` version bump.

---

## 9. Open Items

### Must Fix Before Production
1. Code quality cleanup: ~50 pipeline commits, many fix-on-fix. Needs squashing.

### Should Fix
2. Commit consolidation: 6+ commits per language per run
3. DRY manifest stamping: duplicated in Phase 3, Phase 6, and full pipeline
4. Remove Crowdin vestiges
5. Naming audit

### Deferred to v5-Full
6. Re-enable inert propagation with pipeline-side tree walking
7. Structural propagation (component add/remove without Gemini)
8. Manifest conflict detection before committing

### Separate Tasks
9. Unused component cleanup cron (weekly scan for components only referenced in locale files)

---

## 10. Cost Context

| Operation | Estimated Cost |
|-----------|---------------|
| Initial full-repo pass (Crowdin + Gemini 2.5 Pro) | ~$1,500 |
| Full sweep with current pipeline | ~$300-500 |
| Incremental run (3 changed sections, 24 languages) | ~$0.50-2.00 |
| Stamp-only run (no Gemini) | ~$0 |
| Gemini Pro input | ~$1.25/1M tokens |
| Gemini Pro output | ~$10.00/1M tokens |
