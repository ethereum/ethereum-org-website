# Gemini Direct Translation Pipeline -- Future Features

> **Maintenance:** Remove or update entries here as they are implemented. Do not let this file accumulate stale items.

## 1. Incremental Translation (update_only mode)

**Problem:** Full-file translation rewrites content that's already correctly translated, introducing unnecessary churn and non-deterministic discrepancies in approved translations.

**Proposed solution:** A workflow input `update_only` (boolean, default false) that:
- Fetches the existing translated file from the target branch
- Diffs against English to identify: untranslated blocks (still in English), blocks where English source changed, blocks already correctly translated
- Sends Gemini both files with instructions to only translate/update marked sections, preserving everything else verbatim

**Complexity by file type:**
- **JSON:** Low-medium. Key-by-key comparison, send only keys needing work, merge back.
- **Markdown:** Medium-high. Needs paragraph-level diffing. Either store a manifest of the English version last translated against, or use heuristics (is this paragraph still in English?).

**Prerequisite:** Ship and validate the full-translate mode first. This is a fast-follow.

## 2. Split PRs (one PR per language)

**Problem:** Large multi-language runs produce a single massive PR that's hard to review.

**Proposed solution:** A workflow input `split_prs` (boolean, default false) that:
- Creates a separate branch per language
- Runs translate -> sanitize -> JSX attrs per language
- Opens one PR per language against the base branch

**Implementation:** Loop the language iteration in `main-gemini.ts`, create branch per language via `postCreateBranchFrom`, call `createTranslationPR` per language. The per-language orchestration in `gemini-translate-files.ts` already processes one language at a time -- the change is in branching and PR creation, not translation.

**Prerequisite:** Validate the single-PR flow works reliably first.

## 3. Deep JSON Validation

**Problem:** Current validation only checks top-level JSON keys. Nested namespaces (common in `src/intl/` files) can have dropped or renamed keys at depth > 1 without detection.

**Proposed solution:** Recursive key comparison that walks the full object tree, reporting missing/added/renamed keys at any depth. Should handle arrays (compare by index) and nested objects (compare by key).

## 4. Cost Tracking and Reporting

**Problem:** No visibility into per-run, per-language, or per-file translation costs.

**Proposed solution:** The pipeline already tracks `tokensUsed` per file. Aggregate and report in the PR body: total tokens, estimated cost, per-language breakdown. Could also write to a manifest for historical tracking.
