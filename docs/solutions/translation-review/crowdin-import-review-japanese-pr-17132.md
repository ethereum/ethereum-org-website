---
title: "Japanese Translation Import Review — PR #17132"
date: 2026-02-24
category: translation-review
severity: high
component: src/scripts/i18n/post_import_sanitize.ts
pipeline: review-translations-local
language: ja
pr_number: 17132
file_count_in_pr: 306
final_files_changed: 31
final_commit: 0bc77ee8b7
tags:
  - i18n
  - japanese
  - crowdin-import
  - sanitizer
  - translation-review
  - pipeline-first-run
  - post-import-sanitize
  - ai-review-agents
  - manual-review
  - brand-tags
  - mdx-escaping
related_prs:
  - "#17132"
related_branches:
  - i18n/import/2026-01-21T17-37-56-ja
  - fix-review-translations
symptoms:
  - "Old sanitizer produced ~46 modified files, ~35 of which contained incorrect changes"
  - "5 distinct bugs identified in the original post_import_sanitize.ts"
  - "Silent corruption of translation files — no errors raised, bad changes applied quietly"
  - "AI review agent patches included 2 bad changes (lowercased brand tag, corrupted href)"
  - "Whitespace issues in href attributes in restaking/index.md"
  - "Typo present in roadmap/merge content"
root_causes:
  - "Buggy post_import_sanitize.ts applying incorrect transformations to imported translations"
  - "Sanitizer lacked adequate guards against false-positive pattern matches"
  - "AI review agents occasionally producing invalid fixes (brand tag lowercasing, href corruption)"
  - "First-run pipeline — no prior calibration against Japanese translation corpus"
---

# Japanese Translation Import Review — PR #17132

## Problem

During the Japanese (ja) translation review of PR #17132 (branch `i18n/import/2026-01-21T17-37-56-ja`, 306 files), the `review-translations-local` pipeline exposed two intertwined categories of issues:

**Category A — Sanitizer corruption (the blocking problem):** The `post_import_sanitize.ts` script, invoked as Phase 1e via `sanitize-pr.ts --pr=17132`, modified 46 files. Manual review of the staged sanitizer output revealed that approximately 40 of those 46 files contained at least one incorrect change. Five distinct bugs in the sanitizer were silently corrupting translated content:

1. **Href substitution across misaligned paragraphs** — `fixTranslatedHrefs` replaced valid hrefs with unrelated paths (e.g., `/staking/` became `/roadmap/`)
2. **Brand tag lowercase casing** — `fixBrandTags` copied English source values (`"solidity"`) instead of canonical casing (`"Solidity"`)
3. **Invalid ticker correction + code-fence blindness** — `KECCAK` incorrectly listed as misspelling; no code-fence awareness
4. **Orphaned tag removal inside code spans** — stripped `` `</strong>` `` from backticks
5. **Orphaned tag removal order inverted** — removed paired closers instead of trailing orphans

**Category B — Legitimate translation quality issues:** The AI review agents found genuine problems in the Crowdin translations:

- Japanese typos: `なりまりました` → `なりました`, `バリデター` → `バリデータ`, `あな` → `あなた`, `ハッカーよく` → `ハッカーがよく`
- Broken HTML in glossary JSON: `</aをご覧ください。>` → `</a>をご覧ください。`
- Typo in href: `/saking/pools/` → `/staking/pools/`
- Transliteration error: `ブルーフ・オブ・ステーク` → `プルーフ・オブ・ステーク`
- Duplicated heading anchors: `{#scam-alert} {#scam-alert}`
- Missing blank lines after markdown headers
- Orphaned trailing `</a>` tags and `href = "..."` whitespace in HTML attributes

## Solution

The solution required a two-phase approach: fix the sanitizer itself, then re-run the pipeline and layer on legitimate review fixes.

### Phase 1: Sanitizer Bug Fixes (commit `d67a75cf9d`)

All 5 bugs were fixed in `post_import_sanitize.ts` on the `fix-review-translations` branch (109 insertions, 153 deletions). Full details in the [companion bug analysis document](../integration-issues/post-import-sanitizer-bugs-found-japanese-review.md).

Key fixes:
- `fixTranslatedHrefs` converted to **warn-only** (no content modification)
- `fixBrandTags` uses canonical casing from `PROTECTED_BRAND_NAMES` constant + targeted per-tag replacement preserving YAML formatting
- `KECCAK` removed from `TICKER_CORRECTIONS`; code-fence skipping added to `fixTickerTranspositions`
- `removeOrphanedClosingTags` gained code-block/code-span awareness and corrected removal order (keep paired closers, remove trailing orphans)

### Phase 2: Reset, Re-run, and Selective Patch Application

1. **Saved review-fix patches** for 3 files with both sanitizer and review changes (MM git state)
2. **Reverted all 46 sanitizer-modified files** back to HEAD
3. **Updated sanitizer** to the fixed version from `fix-review-translations`
4. **Re-ran sanitizer** — clean output with only legitimate fixes
5. **Selectively re-applied review patches**, rejecting 2 bad changes:
   - Rejected: lowercased brand tag `"Solidity"` → `"solidity"` in `uniswap-v2-annotated-code`
   - Rejected: corrupted href `/roadmap/` → `/energy-consumption/` in `roadmap/merge`
   - Accepted: structural repair (missing blank line after header) in `uniswap-v2-annotated-code`
   - Accepted: typo fix `なりまりました` → `なりました` in `roadmap/merge`
6. **Applied manual fix** for href attribute whitespace in `restaking/index.md`:

```html
<!-- Before -->
<a href = "https://vitalik.eth.limo/...">text</a>...prose... </a>

<!-- After -->
<a href="https://vitalik.eth.limo/...">text</a>...prose...
```

### Final Commit (`0bc77ee8b7`)

31 files changed, 44 insertions, 42 deletions:

| Category | Files | Example |
|----------|-------|---------|
| Brand tag canonical casing | 10 | `"hardhat"` → `"Hardhat"` in frontmatter tags |
| MDX angle bracket escaping | 4 | `<1 GB RAM` → `&lt;1 GB RAM` |
| Japanese typo fixes | 8 | `イーサリウム` → `イーサリアム` |
| Broken HTML repair | 2 | `</aをご覧ください。>` → `</a>をご覧ください。` |
| Href typo fix | 2 | `/saking/pools/` → `/staking/pools/` |
| Transliteration fix | 2 | `ブルーフ` → `プルーフ` |
| Duplicate heading anchor removal | 4 | `{#scam-alert} {#scam-alert}` → `{#scam-alert}` |
| Structural repair | 1 | Missing blank line after header |
| Orphaned tag + href whitespace | 1 | Trailing `</a>` removal + `href =` normalization |
| Character/particle fixes | 2 | `あな` → `あなた`, `ハッカーよく` → `ハッカーがよく` |

---

## Lessons Learned

### 1. Sanitizer Output Is Not Trustworthy Until Manually Verified

The sanitizer modified 46 files during the initial run. Approximately 40 contained at least one incorrect change. Had these been committed directly (as the automated `sanitization.ts` workflow does via `batchCommitFiles`), the corruption would have shipped to production. **The sanitizer generates candidates, not final output.**

### 2. AI Review Agents Introduce Their Own Error Class

Two of three review-fix patches contained bad changes. This mirrors the Czech review (PR #17553) where 27 of 29 initial findings were false positives. AI agents are a second sanitizer layer, not a human replacement. **Selective patch application** — accepting some hunks and rejecting others — was required.

### 3. Git Staging Discipline Is a Critical Safety Mechanism

The pipeline's design staged sanitizer output separately from review agent fixes (staged vs unstaged). This made it possible to attribute each change to its origin phase. When everything was unstaged, the two-phase categorization was lost and recovery was more complex. **Staging boundaries are a traceability mechanism.**

### 4. MM State Files Require Special Handling

When a file has been modified by both the sanitizer (staged) and the review agent (unstaged), a simple `git checkout` destroys the review information. The correct recovery sequence:
1. Save the review-only diff: `git diff path/to/file > /tmp/review-fix.patch`
2. Reset the file: `git checkout HEAD -- path/to/file`
3. Re-run fixed sanitizer
4. Re-apply review patch: `git apply /tmp/review-fix.patch`

### 5. Worktree Script Copies Drift From Upstream

The initial sanitizer run used an old copy of `post_import_sanitize.ts`. After fixing bugs on `fix-review-translations`, the worktree copy had to be manually updated. Changes on other branches do not propagate to worktrees automatically.

### 6. Auto-Fix Functions Require Unambiguous Correctness Criteria

Three of five sanitizer bugs attempted auto-fixes based on heuristics that were not reliably correct. If the correct output depends on document structure that the translation platform can modify, the fix must be warn-only.

---

## Pipeline Improvements

### 1. Mandatory Diff-Review Gate Between Sanitizer and Commit

Insert a review gate that generates a change summary, samples random diffs, and requires explicit confirmation before committing. Prevents silent corruption of ~40 files.

### 2. Sanitizer Version Pinning in Worktrees

When creating a worktree, record the sanitizer commit hash. Before running, compare against the latest version and prompt to update if they differ.

### 3. Structured Warning Handoff

Write sanitizer warnings to `sanitizer-warnings.json` instead of just stdout. Review agents can read this as input context, creating an explicit handoff rather than relying on operator relay.

### 4. Code-Region Immunity Check

Add a pre-commit verification that no transforms modified content inside fenced code blocks or inline code spans. Parse both original and modified files, extract code regions, and assert byte-identical content.

### 5. Review Agent Patches Must Be Individually Addressable

Each fix should be a discrete, independently-applicable unit — not a monolithic patch. Present fixes in a structured format (file, line, old, new, category, confidence) that the operator can accept/reject individually.

---

## Checklist for Future Reviews

### Pre-Sanitizer
- [ ] Verify sanitizer script matches latest version on `dev` or `fix-review-translations`
- [ ] Confirm English source files available at expected paths
- [ ] Note current `git status` — all files should be clean

### Sanitizer Execution
- [ ] Run with PR-scoped entry point (`sanitize-pr.ts <PR_NUMBER>`)
- [ ] Review stdout summary — if >50% of files written, investigate
- [ ] Spot-check 5 modified files for: href changes, brand tag casing, code fence integrity, orphan tag correctness
- [ ] If any spot-check fails, **stop and investigate**

### Staging
- [ ] Stage only sanitizer changes
- [ ] Verify with `git diff --cached --stat`
- [ ] Keep review agent output unstaged for clear separation

### Review Agent Execution
- [ ] If new language, run on 5–10 calibration files first
- [ ] Check first 5 findings manually — if >1 is false positive, stop and calibrate
- [ ] Never bulk-apply review fixes without per-fix inspection

### Recovery (If Something Goes Wrong)
- [ ] Save review diffs before resetting: `git diff <file> > /tmp/<file>.review.patch`
- [ ] Reset to clean: `git checkout HEAD -- <files>`
- [ ] Re-run fixed sanitizer
- [ ] Selectively re-apply review patches

---

## Related Documentation

- [Post-Import Sanitizer: 5 Bugs Found](../integration-issues/post-import-sanitizer-bugs-found-japanese-review.md) — Detailed root cause analysis of the 5 sanitizer bugs
- [Review Agent Calibration (Czech)](../integration-issues/crowdin-import-review-agent-calibration.md) — False positive calibration on Czech translations
- [Crowdin File Path Mapping and Review Workflow](../integration-issues/crowdin-file-path-mapping-and-review-workflow.md) — Worktree workflow, automation permissions
- [Turkish PR #17182 Review](./crowdin-import-review-turkish-pr-17182.md) — First review case study establishing baseline issue catalog
- [Scaling Translation Review Pipeline](./scaling-translation-review-pipeline.md) — Strategic roadmap with prevention matrix
- [Review Translations Permissions](../integration-issues/review-translations-permissions.md) — Sandbox permissions inventory for the pipeline
