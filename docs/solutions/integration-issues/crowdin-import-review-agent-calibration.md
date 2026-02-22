---
title: "Crowdin Import Review Agent Calibration: Czech Part 07 (PR #17553)"
date: 2026-02-21
category: integration-issues
tags:
  - translation-review
  - i18n
  - crowdin
  - review-agent
  - worktree
  - false-positive-correction
  - code-block-policy
  - sanitizer
problem_type: process/integration
components:
  - review-translations-local.md
  - known-patterns.md
  - post_import_sanitize.ts
  - gh-cli
  - next-build (scoped locale)
severity: medium
status: resolved
related:
  - docs/solutions/translation-review/crowdin-import-review-turkish-pr-17182.md
---

# Crowdin Import Review Agent Calibration

## Problem Summary

During the Czech (cs) part-7 translation import for ethereum.org (PR #17553), the AI-powered translation review workflow produced **27 false positives out of 29 findings** on its first run. The review agent incorrectly flagged all translated concept tags in tutorial frontmatter as needing reversion to English, and applied a blanket "no translation in code blocks" rule that penalized translated code comments (which are beneficial for readers).

A second calibrated run found **4 genuine critical issues and 5 warnings** — all in code blocks where functional code had been translated.

## Symptoms

1. Review agent flagged 27 translated tutorial tags (e.g., `"smart kontrakt ucty"`, `"testovani"`) as critical issues requiring English reversion
2. Review agent flagged translated Solidity comments inside code blocks as warnings
3. 16 incorrect tag reverts + 2 incorrect JSON fixes were applied before the user caught them
4. Scoring summary was missing from workflow output
5. `gh` CLI failed with TLS errors in sandbox; `git diff` returned empty results in worktree

## Root Cause Analysis

### 1. Blanket Tag Rule (27 false positives)

`known-patterns.md` Pattern #10 stated "Tags should remain in English" with no distinction between brand-name tags and concept tags. Tutorial frontmatter `tags` arrays contain both:

- **Brand-name tags** (must stay English): `"solidity"`, `"hardhat"`, `"web3"`, `"remix"`
- **Concept tags** (intentionally translated): `"smart contracts"`, `"testing"`, `"security"`, `"deploying"`

The review command (`review-translations-local.md`) had no guidance about this distinction, so the agent treated every non-English tag as an error.

### 2. Blanket Code Block Rule (false warnings on comments)

Line 231 of `review-translations-local.md` said "Code blocks are intact and not translated." This made no distinction between:

- **Functional code** (identifiers, strings, config keys) — must stay English
- **Code comments** (`//`, `/* */`, `#`) — may be translated to aid reader comprehension

### 3. Genuine Issues Masked by Noise

The 27 false positives buried the 2 real issues in the first run. Only after calibrating the rules and re-running did the agent surface actual problems: translated struct field names, TOML config keys, string literals, and console output in code blocks.

## Solution

### Fix 1: Nuanced Tag Policy

**File:** `known-patterns.md (local: `~/.claude/translation-review/`)` (Pattern #10)

Rewrote from blanket "Tags should remain in English" to:

> **Frontmatter Tag Translation -- Brand Names Only (MEDIUM)**
>
> Only **brand-name tags** must remain in English; concept tags are intentionally translated by Crowdin.
>
> - Brand-name tag example (MUST fix): `tags: ["solidity", ...]` translated to local equivalent
> - Concept tag example (CORRECT): `tags: ["smart contracts", ...]` translated to `["smart kontrakt ucty", ...]`
>
> Rule: Only flag translated tags that are proper nouns or brand names.

**File:** `review-translations-local command (local: `~/.claude/commands/`)` (terminology checklist)

Added explicit block:

```
IMPORTANT -- Tutorial frontmatter `tags` arrays:
- Brand-name tags (e.g., "solidity", "hardhat", "alchemy", "JavaScript") MUST stay English
- Concept/category tags (e.g., "smart contracts", "testing", "security") are intentionally translated
- Rule of thumb: proper noun or product name = English; generic descriptive term = translated is correct
```

### Fix 2: Nuanced Code Block Policy

**File:** `review-translations-local command (local: `~/.claude/commands/`)` (structural checklist, line 231)

Replaced:
```
- Code blocks are intact and not translated
```

With:
```
- Code blocks: functional code (identifiers, strings, config keys, variable names,
  console/error output) must stay in English. Code comments (//, /* */, #) may be
  translated -- these aid reader comprehension and don't affect execution.
```

**File:** `known-patterns.md (local: `~/.claude/translation-review/`)` (new Pattern #11)

Added "Code Block Translation Policy" with examples:

| Category | Rule | Example |
|----------|------|---------|
| Variable/function names | Must stay English | `uint256 balance` not `uint256 zustatek` |
| String literals | Must stay English | `bytes("entry already written")` |
| Config keys (TOML/JSON) | Must stay English | `[[accounts]]` not `[[ucty]]` |
| Console/error output | Must stay English | `Listening on port 3000` |
| Code comments | May be translated | `// Zkontrolujte zustatek uctu` is fine |

### Fix 3: Genuine Translation Issues (second run)

After calibration, the review agent correctly identified and we fixed:

| File | Issue | Fix |
|------|-------|-----|
| `all-you-can-cache/index.md` | Misplaced backtick causing MDX build failure | Fixed backtick placement |
| `all-you-can-cache/index.md` | 3 translated Solidity string literals | Restored English strings |
| `app-plasma/index.md` | Noir struct field names translated | Restored `balance`, `address`, `from`, `to`, `amount` |
| `app-plasma/index.md` | TOML config keys/values translated | Restored `message`, `[[accounts]]`, `address`, `balance` |
| `app-plasma/index.md` | Console + error output translated | Restored English output |

### Fix 4: Mandatory Scoring Summary

**File:** `review-translations-local command (local: `~/.claude/commands/`)` (Phase 2 and Phase 3)

Added explicit instructions requiring the agent to display the scoring summary before concluding. The summary is now a mandatory deliverable of every review run.

## Infrastructure Notes

### Worktree Setup Pattern

The established pattern for translation review in worktrees:

1. Worktree at `.worktrees/{lang}-part-{N}/` (typically created by sanitizer)
2. All file reads/edits use the worktree absolute path
3. English source comparison at worktree's `public/content/` (not translations dir)
4. Scoped build: `NEXT_PUBLIC_BUILD_LOCALES=en,{lang} pnpm build`
5. PR file list via `gh api repos/{owner}/{repo}/pulls/{N}/files --paginate` (not `git diff` in worktree)

### Sandbox Permissions

- `gh` CLI requires `dangerouslyDisableSandbox: true` due to TLS certificate verification failures in sandbox
- `api.github.com` is in the network allowlist but socket-level TLS handshake still fails in sandboxed mode
- Scoped builds avoid network-dependent data fetches that can cause hangs

## Prevention Strategies

### Before Applying Any Review Agent Fixes

1. **Spot-check the first 5 findings manually.** If more than 1 is a false positive, stop and calibrate before continuing.
2. **Never bulk-apply fixes** from a first-run agent on a new language or updated ruleset. Always validate.
3. **Separate staged (sanitizer) from unstaged (review) changes.** The sanitizer's deterministic fixes are pre-validated; review agent fixes need human confirmation.

### Iterative Calibration Loop

```
Run review agent on sample files
        |
        v
Examine output for false positives / false negatives
        |
        v
Classify each error:
  - Knowledge base gap --> update rules
  - Prompt ambiguity --> rewrite instruction
  - Infrastructure issue --> fix config
        |
        v
Re-run on SAME files (regression test)
        |
        v
Confirm error count decreased, no new false positives
```

### New Language Onboarding Checklist

- [ ] Extract glossary terms for the language from `fetch-translation-glossary.json`
- [ ] Check if `per-language/{code}.md` exists with prior findings
- [ ] Run review agent on 5-10 calibration files covering diverse content types
- [ ] Validate: zero false positives on translated concept tags
- [ ] Validate: zero false positives on translated code comments
- [ ] Validate: scoring summary is produced
- [ ] Run scoped build to verify no MDX errors

## Quality Scores (PR #17553, Czech)

| Category | Score |
|----------|-------|
| Brand Name Preservation | 9/10 |
| Technical Accuracy | 7/10 |
| Semantic Fidelity | 9/10 |
| Terminology Consistency | 9/10 |
| Tone/Register | 8/10 |
| **Overall** | **8.4/10** |

## Cross-References

- [Turkish PR #17182 Review](../translation-review/crowdin-import-review-turkish-pr-17182.md) -- first translation review case study, established the 5-agent architecture

### Local Tooling (not yet committed to repo)

The following files are part of a local Claude Code workflow currently being iterated. They will be committed to the repo once the review process stabilizes:

- **known-patterns.md** (`~/.claude/translation-review/`) -- living document of all discovered patterns (11 categories)
- **review-translations-local** (`~/.claude/commands/`) -- full review workflow definition with sub-agent architecture
- **fetch-translation-glossary.json** (`~/.claude/translation-review/`) -- community-voted term translations
