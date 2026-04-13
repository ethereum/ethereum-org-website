# Translation Pipeline -- Future Features

> **Maintenance:** Remove or update entries here as they are implemented. Do not let this file accumulate stale items.

---

## Pipeline Quality

### 1. Fix Comment Restoration Concatenation Bug

**Problem:** Translated code comments are concatenated with the original instead of replacing them. Example: `// **** REMOVE LIQUIDITY **** // **** ...Arabic... ****`

**Root cause:** `restoreComments()` in `lib/llm/code-block-extractor.ts` appends the translated comment to the existing line content instead of replacing. `translateCodeComments()` should use `strippedCode` (comments removed) as the base for restoration, not the original `block.content`.

**Complexity:** Low. ~5 line change.

### 2. Stronger Glossary Enforcement

**Problem:** High-frequency glossary terms like "mint" are translated inconsistently. The glossary is sent in the prompt but Gemini doesn't always adhere strictly.

**Proposed solution:**
- Post-translation pass that scans output for known English glossary terms that should have been translated, and flags or auto-corrects them
- Consider a validation step that compares glossary term frequency in source vs translation
- May overlap with existing sanitizer `fixKnownBrandGarbles` pattern -- extend to glossary terms

### 3. Transliteration During Translation

**Problem:** Gemini regresses on transliterations (author names, brand names like "Proto-danksharding") that the sanitizer then has to catch.

**Proposed solution:**
- Include transliteration banks directly in the translation prompt for non-Latin locales
- Add language-group-specific transliteration rules to `lib/llm/prompt-builder.ts`
- Ensure the translation prompt and sanitizer are aligned on the same transliteration bank

### 4. Deep JSON Validation

**Problem:** Current validation only checks top-level JSON keys. Nested namespaces can have dropped or renamed keys at depth > 1 without detection.

**Proposed solution:** Recursive key comparison that walks the full object tree, reporting missing/added/renamed keys at any depth.

---

## Pipeline Features

### 5. Split PRs (one PR per language)

**Problem:** Large multi-language runs produce a single massive PR that's hard to review.

**Proposed solution:** A workflow input `split_prs` (boolean, default false) that creates a separate branch and PR per language.

---

## Automation

### 6. Auto-trigger Translations on Content Merge

**Problem:** Content changes merged to dev currently require manual triggering of the translation pipeline.

**Proposed solution:**
- GitHub Action that watches for merges to dev affecting `public/content/` or `src/intl/en/`
- Automatically triggers the translation workflow for changed files
- Should respect a cooldown/batch window to avoid triggering on every small merge

### 7. Full-language Retroactive Cleanup

**Problem:** Many languages were translated before current pipeline improvements. Those translations have the same class of issues found in Arabic (brand garbles, wrong compounds, etc.).

**Proposed solution:** After pending language reviews are complete:
- Run the full sanitizer against every translated language
- Apply transliteration banks and language-group-specific rules
- Re-translate files flagged as having too many issues

---

## Image Translation

### 8. Translate Text in Diagrams and Infographics

**Problem:** Educational diagrams and infographics contain English text that remains untranslated, creating a jarring experience on otherwise fully translated pages.

**Proposed approach:**
- Use Gemini's image generation capabilities to edit text within images
- Build a pipeline: identify images with translatable text, extract, translate, generate localized variants
- Track image freshness the same way as content files (by source SHA)

**Key challenges:** Text detection, visual quality with RTL scripts, maintenance when source diagrams update.

---

## Package Extraction

### 9. Extract i18n Tooling into Standalone Packages

**Problem:** Glossary, translation pipeline, and (future) image pipeline are embedded in the repo. Creates bloat and prevents reuse.

**Proposed approach:** Phased extraction:
1. Extract glossary (data + lookup) into its own package
2. Extract pipeline core (prompt builder, normalizer, batcher, language groups) once stable
3. Repo-specific glue (Actions, sanitizer, manifests) stays in ethereum-org-website
