# Gemini Translation Pipeline -- Future Features

> **Maintenance:** Remove or update entries here as they are implemented. Do not let this file accumulate stale items.

---

## Pipeline Quality (do more during translation, less during review)

### 1. Fix Comment Restoration Concatenation Bug

**Problem:** Translated code comments are concatenated with the original instead of replacing them. Example from uniswap PR #17808 line ~1260:
```
// **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) **** // **** ...Arabic... ****
```

**Root cause:** `restoreComments()` in `code-block-extractor.ts` appends the translated comment to the existing line content instead of replacing the original comment text. `translateCodeComments()` should use `strippedCode` (comments removed) as the base for restoration, not the original `block.content`.

**Complexity:** Low. ~5 line change in `translateCodeComments()`.

### 2. Stronger Glossary Enforcement

**Problem:** High-frequency glossary terms like "mint" are translated inconsistently (~10 occurrences in a single file using different forms). The glossary is sent in the prompt but Gemini doesn't always adhere strictly.

**Proposed solution:**
- Post-translation pass that scans output for known English glossary terms that should have been translated, and flags or auto-corrects them
- Consider a validation step that compares glossary term frequency in source vs translation
- May overlap with existing sanitizer `fixKnownBrandGarbles` pattern -- extend to glossary terms

### 3. Transliteration During Translation (not just post-processing)

**Problem:** Gemini regresses on transliterations (author names, brand names like "Proto-danksharding") that the sanitizer then has to catch. The review stage currently finds many transliteration issues that should have been handled during translation.

**Proposed solution:**
- Include transliteration banks directly in the translation prompt for non-Latin locales
- Add language-group-specific transliteration rules to `prompt-builder.ts` (currently only general rules are sent)
- The sanitizer already has `fixKnownBrandGarbles` with transliteration bank support -- ensure the translation prompt and sanitizer are aligned on the same bank

**Goal:** Review stage produces scores, not a thousand critical issues to patch.

### 4. Deep JSON Validation

**Problem:** Current validation only checks top-level JSON keys. Nested namespaces (common in `src/intl/` files) can have dropped or renamed keys at depth > 1 without detection.

**Proposed solution:** Recursive key comparison that walks the full object tree, reporting missing/added/renamed keys at any depth. Should handle arrays (compare by index) and nested objects (compare by key).

---

## Pipeline Features

### 5. Incremental Translation (update_only mode)

**Problem:** Full-file translation rewrites content that's already correctly translated, introducing unnecessary churn and non-deterministic discrepancies in approved translations.

**Proposed solution:** A workflow input `update_only` (boolean, default false) that:
- Fetches the existing translated file from the target branch
- Diffs against English to identify: untranslated blocks (still in English), blocks where English source changed, blocks already correctly translated
- Sends Gemini both files with instructions to only translate/update marked sections, preserving everything else verbatim

**Complexity by file type:**
- **JSON:** Low-medium. Key-by-key comparison, send only keys needing work, merge back.
- **Markdown:** Medium-high. Needs paragraph-level diffing. Either store a manifest of the English version last translated against, or use heuristics (is this paragraph still in English?).

**Prerequisite:** Ship and validate the full-translate mode first. This is a fast-follow.

### 6. Split PRs (one PR per language)

**Problem:** Large multi-language runs produce a single massive PR that's hard to review.

**Proposed solution:** A workflow input `split_prs` (boolean, default false) that:
- Creates a separate branch per language
- Runs translate -> sanitize -> JSX attrs per language
- Opens one PR per language against the base branch

**Implementation:** Loop the language iteration in `main-gemini.ts`, create branch per language via `postCreateBranchFrom`, call `createTranslationPR` per language. The per-language orchestration in `gemini-translate-files.ts` already processes one language at a time -- the change is in branching and PR creation, not translation.

**Prerequisite:** Validate the single-PR flow works reliably first.

### 7. Cost Tracking and Reporting

**Problem:** No visibility into per-run, per-language, or per-file translation costs.

**Proposed solution:** The pipeline already tracks `tokensUsed` per file. Aggregate and report in the PR body: total tokens, estimated cost, per-language breakdown. Could also write to a manifest for historical tracking.

---

## Automation

### 8. Auto-trigger Translations on Content Merge

**Problem:** Content changes merged to dev currently require manual triggering of the translation pipeline. PRs tagged "needs translations" accumulate.

**Proposed solution:**
- GitHub Action that watches for merges to dev affecting `public/content/` or `src/intl/en/`
- Automatically triggers the Gemini translation workflow for changed files
- Could be scoped to specific languages or all languages depending on the change
- Should respect a cooldown/batch window to avoid triggering on every small merge

**Prerequisite:** Incremental translation mode (#5) should be working first so auto-triggered runs only translate what changed, not entire files.

### 9. Full-language Retroactive Cleanup

**Problem:** Many languages were translated before the current pipeline improvements (transliteration banks, language-group rules, sanitizer fixes). Those translations have the same class of issues found in Arabic (state polysemy, brand garbles, wrong compounds, etc.).

**Proposed solution:** After all pending language reviews are complete:
- Run the full sanitizer (with all current fixes) against every translated language
- Apply transliteration banks where they exist
- Apply language-group-specific rules
- Re-translate files flagged by the sanitizer as having too many issues
- Catch up on any content changes merged to dev since the original full-repo translation round (PRs tagged "needs translations")

**Scope:** This is a large batch operation. Should be planned per-language with the split PR feature (#6) to keep reviews manageable.

### 10. Remove Supabase Glossary Fallback

**Problem:** The pipeline currently has two glossary sources: the local enhanced glossary (from `src/scripts/i18n/data/glossary/`) and a legacy Supabase/Crowdin glossary loaded via `getGlossaryForLanguage()`. The local glossary is the intended canonical source, but a fallback to Supabase exists for backwards compatibility while the local glossary is being built out.

**Goal:** Remove the Supabase fallback entirely so the pipeline queries one authoritative glossary source. The local glossary should be complete enough to be the sole source before the quality sweep (~$300-500 full retranslation).

**Required before removal:**
- Confirm all Supabase/Crowdin glossary terms have been migrated to the enhanced glossary
- Tier 2/3 translations are complete (or at least coverage is sufficient for all 24 languages)
- The local glossary is validated as a superset of the Supabase glossary

**Complexity:** Low. Remove the Supabase `getGlossaryForLanguage()` call and the try/catch fallback in `gemini-translate-files.ts`. Clean up unused imports.

**Prerequisite:** Quality sweep readiness. This is a pre-sweep cleanup item.

### 12. CI Enforcement for Custom Header IDs

**Problem:** Markdown content files must have unique custom header IDs
(`{#anchor-id}`) on all h1-h4 elements. These IDs are critical for:
- Section-level drift detection (manifest generator keys by header ID)
- Incremental translation splicing (match sections by ID across languages)
- URL fragment stability (anchor links shared across locales)

PR #17896 fixed 126 missing IDs, but there is no CI check to prevent
regressions. New content can be merged without header IDs.

**Proposed solution:** Add a check to the CI pipeline that:
1. Scans all `public/content/*.md` files (excluding translations)
2. Skips content inside code fences
3. Flags any h1-h4 header missing a `{#custom-id}` anchor
4. Flags duplicate IDs within the same file
5. Fails the build if violations are found

**Implementation options:**
- Extend the existing `pnpm markdown-checker` script
- Or add a standalone script run as a separate CI step
- The manifest generator's `parseMarkdownSections()` already does this
  parsing and could be reused

**Complexity:** Low. The parsing logic exists. Just needs a CLI wrapper
and a CI integration point.

**Prerequisite:** Must be in place before incremental translation launches
(Priority 4). Not needed for the quality sweep (Priority 3).

---

## Image Translation

### 11. Translate Text in Diagrams and Infographics

**Problem:** The site's text content is approaching full translation coverage across 24 languages, but figures, diagrams, and infographics containing English text remain untranslated. This creates a jarring experience -- a fully translated page with an English-only diagram in the middle.

This is NOT about logos, decorative images, or screenshots. It's specifically about educational diagrams and infographics that contain translatable English words (labels, captions, flow chart text, etc.).

**Scope:** Audit needed to determine the full inventory. The repo has some existing infrastructure for locale-specific image variants (needs investigation).

**Proposed approach:**
- Use Gemini's image generation capabilities (available via `@google/genai` SDK) to edit text within images, replacing English labels with translated equivalents
- Build a pipeline similar to the text translation flow: identify images with translatable text, extract the text, translate via glossary + LLM, generate localized image variants
- Store localized variants alongside originals using the existing locale-aware image infrastructure

**Key challenges:**
- **Text detection**: identifying which images contain translatable text vs. logos/decorations/screenshots
- **Text extraction**: reading the English text from the image accurately
- **Visual quality**: ensuring translated text fits, renders cleanly, and handles RTL scripts
- **QA**: automated generation is feasible but visual quality checks are harder to automate than text validation
- **Maintenance**: when an English diagram is updated, localized variants need regeneration

**Prerequisites:**
- Audit of existing locale-aware image infrastructure in the repo
- Inventory of images with translatable English text
- Evaluation of Gemini image generation API capabilities for text-in-image editing
- Understanding of how the site currently resolves image paths per locale

**Relationship to text translation pipeline:** This could eventually integrate with the same drift detection and automation infrastructure (gemini-v4). An image's "freshness" can be tracked the same way as a markdown file's -- by SHA of the source image.

---

## Package Extraction

### 13. Extract i18n Tooling into Standalone Packages

**Problem:** The glossary, translation pipeline, and (future) image pipeline are
all embedded in the ethereum-org-website repo. This creates repo bloat for
cloners (~68MB manifests alone), dependency pollution (i18n-only deps mixed with
website deps), and prevents reuse across other websites the team maintains.

**Proposed approach:** Phased extraction:
1. Extract the glossary (data + lookup module) into its own repo/package first
   (most self-contained, clear public value as a blockchain terminology resource)
2. Extract the pipeline core (prompt builder, normalizer, batcher, language
   groups) once it stabilizes post-quality-sweep
3. Repo-specific glue (Actions, sanitizer, manifests) stays in ethereum-org-website

**Prerequisite:** Quality sweep complete, pipeline stable, manifest format locked.

**Complexity:** Medium overall. Glossary extraction is low-medium; pipeline
extraction is medium-high due to interface boundary work.

---

## Housekeeping

### 14. Clean Up Working Docs

**Problem:** FUTURE.md itself, along with other working documents in
`src/scripts/i18n/` and `docs/`, have accumulated during active development.
Some items may be stale, completed, or contain references to internal tooling
that shouldn't be in the published repo.

**Tasks:**
- Audit FUTURE.md: remove completed items, update stale descriptions
- Audit `docs/` for any internal-only content that shouldn't be published
- Review `src/scripts/i18n/` for development artifacts vs production code
- Ensure no internal process references leak into public-facing files

**Prerequisite:** After quality sweep, when the pipeline is stable and the
scope of what's "done" vs "future" is clear.
