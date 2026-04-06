# Incremental Translation Pipeline

## Overview

The i18n pipeline translates ethereum.org content (markdown + JSON) to 24 languages using Gemini. It operates in two modes:

- **Auto (default):** For each file+locale, auto-detects whether to do a full translation (no manifests exist) or an incremental update (manifests exist, only changed content retranslated).
- **Full:** Force retranslation of all targeted files regardless of manifest state.

The pipeline classifies English changes into two categories:
- **Inert changes** (URLs, image paths, code, component attributes): propagated deterministically without LLM calls.
- **Prose changes** (translatable text): retranslated via Gemini section-by-section, with unchanged sections provided as context for voice/tone consistency.

## Architecture

### Single Staging Branch

All pipeline runs commit to a single branch (`intl/staging` by default). This eliminates race conditions from concurrent runs and keeps translation PRs consolidated.

- If the branch exists, the pipeline merges the base branch into it before committing.
- If the branch doesn't exist, it creates one from the base branch.
- A GitHub Actions concurrency group ensures only one pipeline run executes at a time (additional runs queue).

The staging branch name is configurable via the `translation_branch` workflow input (useful for testing).

### Manifests

Two manifest files track translation state per file+locale:

**Source manifest (`.manifest-source.json`):** A content tree of the English file at the time of last translation. Stores hashes (not content) for each section, element, and attribute. Used to detect what changed in English since last translation.

**Translation manifest (`.manifest-translation.json`):** Records the inert values (URLs, paths, attribute values) as they existed at translation time. Used to propagate inert changes deterministically without re-reading old English content.

### Pipeline Phases

1. **Initialize:** Ensure staging branch exists and is up-to-date with base.
2. **Drift Detection:** For each file+locale, compare current English against stored manifest. Classify changes as inert, translatable, added, or removed. Files without manifests are queued for full translation.
3. **Full Translation:** New files go through `translateFile()` (normalizer + Gemini). Both manifests are generated and committed.
4. **Inert Propagation:** Deterministic replacement of URLs, paths, and attributes in existing translated files. No LLM calls. Handles reordered links (e.g., Japanese SOV word order placing links in different positions than English).
5. **Prose Retranslation:** Changed sections sent to Gemini with unchanged sections as context. Responses are spliced back into the locale file.
6. **Commit:** Updated locale files and refreshed manifests committed to the staging branch.
7. **Sanitize:** Post-import sanitizer runs on all Gemini-produced content (BiDi fixes for RTL languages, code fence alignment, etc.).

### Removed Content Handling

When English content is removed (sections deleted, JSON keys removed), the pipeline detects these as `drift.removed` entries and strips the corresponding content from all locale files. This enables safe deprecation of components and content without manual editing of translated files.

## Workflow

### GitHub Actions

```yaml
# Default: auto-detect mode
gh workflow run gemini-translations.yml \
  -f target_path="public/content/some-page/index.md" \
  -f target_languages="es,ja,ur"

# Force full retranslation
gh workflow run gemini-translations.yml \
  -f target_path="public/content/some-page/index.md" \
  -f mode="full"

# Use a test staging branch
gh workflow run gemini-translations.yml \
  --ref test-branch \
  -f base_branch="test-branch" \
  -f translation_branch="intl/test-staging"
```

### Content Author Workflow

1. Author writes/edits English content, merges PR to dev.
2. Pipeline dispatches (manually or scheduled), detects changes, translates.
3. Translations appear on `intl/staging` branch as a PR against dev.
4. Reviewer checks the translation PR, merges when satisfied.
5. For component deprecations: remove from English first, let the pipeline strip it from locales, then a cleanup job can safely delete the component file.

### Recovery

**Bad translation (not yet merged):** Re-run the pipeline targeting the specific file+locale. New commit overwrites the bad translation on the staging branch.

**Bad translation (already merged to dev):** Re-run with `mode: full` for that file. Fresh translation + manifest stamped.

**Corrupted manifests:** Delete the manifest files for the affected locale. Pipeline auto-detects "no manifest" and does full translation with fresh manifest generation.

**Nuclear recovery:** Delete all manifests for a locale and re-run full. Equivalent to a fresh translation sweep. Expensive but always safe.

## Key Design Decisions

- **Manifests are cheap, translations are expensive.** The architecture makes it easy to regenerate manifests and hard to lose good translations.
- **English is the source of truth.** Non-English files should never be edited manually. The pipeline is the exclusive manipulator.
- **Inert propagation avoids unnecessary LLM calls.** URL changes, path updates, and attribute changes are handled deterministically -- no Gemini tokens spent.
- **Section-level granularity.** Only changed sections are retranslated, with unchanged sections provided as context. This preserves voice consistency while minimizing cost.
- **One PR at a time.** The staging branch approach ensures there's never more than one open translation PR, avoiding manifest conflicts.

## File Locations

- Pipeline entry: `src/scripts/i18n/main-incremental.ts`
- Full pipeline: `src/scripts/i18n/main-gemini.ts`
- Manifest adapter: `src/scripts/i18n/lib/ai/manifest-adapter.ts`
- Inert propagation: `src/scripts/i18n/lib/ai/propagate-inert.ts`
- Incremental translate: `src/scripts/i18n/lib/ai/incremental-translate.ts`
- Branch utilities: `src/scripts/i18n/lib/github/branches.ts`
- Workflow: `.github/workflows/gemini-translations.yml`
- Content tree package: `intl-content-tree` (npm, MPL-2.0)
