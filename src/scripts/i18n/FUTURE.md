# Gemini Direct Translation Pipeline -- Future Features

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
- Include transliteration banks (from `.claude/translation-review/transliterations/`) directly in the translation prompt for non-Latin locales
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
- Automatically triggers the Gemini direct translation workflow for changed files
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
