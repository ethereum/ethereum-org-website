# Translation Pipeline -- Future Features

> **Maintenance:** Remove or update entries here as they are implemented. Do not let this file accumulate stale items.

---

## Pipeline Quality

### 1. Deep JSON Validation

**Problem:** Current validation only checks top-level JSON keys (`validateTranslatedJson` in `lib/llm/output-validation.ts`). Nested namespaces can have dropped or renamed keys at depth > 1 without detection.

**Proposed solution:** Recursive key comparison that walks the full object tree, reporting missing/added/renamed keys at any depth.

---

## Pipeline Features

### 2. Restore Split PRs (one PR per language) -- nice-to-have

**Problem:** Large multi-language runs produce a single massive PR that's hard to review. This previously worked via a `SPLIT_PRS` workflow input (commit `a52be9ddd9`) but was removed during the pipeline rewrite.

**Nuance:** Today's orchestration assumes one `intl/pending-<base>` per base. Restoring split PRs means applying the full orchestration contract (base-into-pending merge, fail-fast, local-tree sync, temp branch, PR) independently per language -- e.g. `intl/pending-<base>-<lang>`. The old implementation predates this model, so it needs adaptation rather than cherry-pick.

---

## Automation

### 3. Auto-trigger Translations on Content Merge

**Problem:** Content changes merged to dev currently require manual triggering of the translation pipeline.

**Proposed solution:**
- GitHub Action that watches for merges to dev affecting `public/content/` or `src/intl/en/`
- Automatically triggers the translation workflow for changed files
- Should respect a cooldown/batch window to avoid triggering on every small merge

### 4. Full-language Retroactive Cleanup

**Problem:** Many languages were translated before current pipeline improvements. Those translations have the same class of issues found in Arabic (brand garbles, wrong compounds, etc.).

**Proposed solution:** After pending language reviews are complete:
- Run the full sanitizer against every translated language
- Apply transliteration banks and language-group-specific rules
- Re-translate files flagged as having too many issues

---

## Image Translation

### 5. Translate Text in Diagrams and Infographics

**Problem:** Educational diagrams and infographics contain English text that remains untranslated, creating a jarring experience on otherwise fully translated pages.

**Proposed approach:**
- Use Gemini's image generation capabilities to edit text within images
- Build a pipeline: identify images with translatable text, extract, translate, generate localized variants
- Track image freshness the same way as content files (by source SHA)

**Key challenges:** Text detection, visual quality with RTL scripts, maintenance when source diagrams update.

---

## Package Extraction

### 6. Extract i18n Tooling into Standalone Packages

**Problem:** Glossary, translation pipeline, and (future) image pipeline are embedded in the repo. Creates bloat and prevents reuse.

**Proposed approach:** Phased extraction:
1. Extract glossary (data + lookup) into its own package
2. Extract pipeline core (prompt builder, normalizer, batcher, language groups) once stable
3. Repo-specific glue (Actions, sanitizer, manifests) stays in ethereum-org-website
