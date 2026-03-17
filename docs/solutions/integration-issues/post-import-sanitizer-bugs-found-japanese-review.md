---
title: Post-import sanitizer script introduced 5 correctness bugs in Japanese translation files
date: 2026-02-24
category: integration-issues
severity: high
component: src/scripts/i18n/post_import_sanitize.ts
tags: [i18n, sanitizer, crowdin, translation-import, href-corruption, brand-names, orphaned-tags, code-fence, ticker-transposition]
related_prs: ["#17132"]
related_branches: ["fix-review-translations"]
symptoms:
  - Internal page hrefs in translated markdown replaced with unrelated paths (e.g., /staking/ became /roadmap/)
  - Brand name tags written with incorrect lowercase casing (e.g., "solidity" instead of "Solidity")
  - YAML tags block multi-line formatting destroyed by full-line reconstruction
  - KECCAK (valid all-caps form) incorrectly rewritten as "Keccak" inside code fences
  - Closing HTML tags stripped from inside inline code spans (e.g., `</strong>` incorrectly removed)
  - First paired closing tag removed instead of trailing orphan, worsening HTML structure
root_causes:
  - fixTranslatedHrefs used block positional index alignment which is unreliable due to Crowdin blank line insertion/removal shifting paragraph indices
  - fixBrandTags read tag values from the English source rather than from PROTECTED_BRAND_NAMES canonical casing map
  - fixBrandTags reconstructed the entire YAML tags line rather than doing targeted per-tag replacement
  - KECCAK was erroneously listed in the ticker transpositions corrections map despite being a valid all-caps identifier
  - fixTickerTranspositions had no code-fence awareness and modified content inside fenced code blocks
  - removeOrphanedClosingTags operated on raw text without markdown parsing, making it blind to inline code spans
  - removeOrphanedClosingTags removal logic targeted the first excess closer rather than the last (trailing orphan)
---

# Post-Import Sanitizer: 5 Bugs Found During Japanese Translation Review

## Problem

During the Japanese (ja) translation review of PR #17132 (306 files, branch `i18n/import/2026-01-21T17-37-56-ja`), the post-import sanitizer script on the `fix-review-translations` branch was found to silently corrupt translated files in 5 distinct ways. The sanitizer ran as Phase 1e of the `review-translations-local` pipeline, modifying 46 files. Manual review of the staged changes revealed that many modifications were incorrect — hrefs pointed to wrong pages, brand names were lowercased, code examples were mangled, and HTML structure was worsened.

**Files affected:** ~40 of the 46 sanitizer-modified files contained at least one incorrect change.

## Solution

All 5 bugs were fixed in commit `d67a75cf9d` on the `fix-review-translations` branch.

**File:** `src/scripts/i18n/post_import_sanitize.ts`
**Diff:** 109 insertions, 153 deletions (net reduction via simplification)

---

### Bug 1: `fixTranslatedHrefs` — Block-Positional Href Substitution Corrupts Unrelated Paragraphs

**Root cause:** The function split both English and translated documents into "blocks" (paragraphs separated by blank lines) and compared hrefs at the same positional index. When exactly one href was "displaced" and one was "missing" in a block pair, it auto-substituted. The fatal assumption: block N in the translation corresponds to block N in the English source. Crowdin routinely adds/removes blank lines, causing paragraph indices to drift. A substitution based on misaligned pairs replaces a valid href with one from an entirely different section.

**Manifestation (ja review):**

| File | Original href | Replaced with |
|------|--------------|---------------|
| `eth/supply/index.md` | `/staking/` | `/roadmap/` |
| `ethereum-forks/index.md` | `/roadmap/beacon-chain` | `/glossary/#difficulty-bomb` |
| `ethereum-forks/index.md` | `/glossary/#ice-age` | `/roadmap/beacon-chain` |
| `roadmap/merge/index.md` | `/roadmap/` | `/energy-consumption/` |
| `what-are-apps/index.md` | `/wallets/find-wallet` | `/get-eth` |

**Fix:** Converted to **warn-only**. The function now performs a document-level set comparison (all English hrefs vs all translation hrefs) and emits warnings for mismatches without modifying any content. Href repairs are left to AI review agents with full semantic context.

```typescript
// Before: auto-fix based on block-positional matching
if (uniqueDisplaced.length === 1 && uniqueMissing.length === 1) {
  blockFixes.push({ blockIdx: i, wrong: uniqueDisplaced[0], correct: uniqueMissing[0] })
}

// After: warn-only, document-level set comparison
return {
  content: translatedContent, // No modifications
  fixCount: 0,
  fixes: [],
  warnings: allWarnings,
}
```

---

### Bug 2: `fixBrandTags` — English Source Values (Lowercase) Used Instead of Canonical Casing; YAML Formatting Destroyed

**Root cause (sub-bug A):** When correcting brand tags, the code replaced translated tags with `engTag` — the raw value from the English source YAML. Many English sources store tags in lowercase (e.g., `"solidity"`, `"alchemy"`). The canonical casing is defined in `PROTECTED_BRAND_NAMES` (`"Solidity"`, `"Alchemy"`).

**Root cause (sub-bug B):** After computing corrected tags, the code reconstructed the entire `tags: [...]` line from scratch, destroying multi-line YAML formatting, collapsing spacing, and normalizing quoting style.

**Manifestation (ja review):** ~30 tutorial files had brand tags lowercased and YAML reformatted:
```yaml
# Before (correct)
tags: [ "Solidity", "hardhat", "Alchemy", "スマート契約", "デプロイ" ]

# After sanitizer (wrong)
tags: ["solidity", "hardhat", "alchemy", "スマート契約", "デプロイ"]
```

**Fix:** Uses canonical casing from a `Map<lowercase, canonical>` built from `PROTECTED_BRAND_NAMES`. Performs targeted in-place replacement of individual quoted tags instead of reconstructing the full line, preserving original YAML formatting.

```typescript
// Before: copies English source value
return engTag  // "solidity" from English YAML

// After: looks up canonical casing
const brandCanonical = new Map<string, string>()
for (const brand of PROTECTED_BRAND_NAMES) {
  brandCanonical.set(brand.toLowerCase(), brand)
}
const canonical = brandCanonical.get(engTag.toLowerCase()) // "Solidity"
```

---

### Bug 3: `fixTickerTranspositions` — `KECCAK` in Corrections Map + No Code-Fence Awareness

**Root cause (sub-bug A):** `TICKER_CORRECTIONS` contained `KECCAK: "Keccak"`. `KECCAK` is a valid all-caps form of the hash algorithm name used in specifications and code.

**Root cause (sub-bug B):** The function applied word-boundary replacements across the entire document string with no code-block awareness. Corrections were applied inside fenced code blocks and inline code spans.

**Manifestation (ja review):** In 2 files (`web3-secret-storage-definition/index.md`, `web3-secret-storage/index.md`), `KECCAK(DK[16..31] ++ <ciphertext>)` inside a JS code block was changed to `Keccak(...)`.

**Fix:** Removed `KECCAK` from corrections map. Added code-fence skipping using the same `split(codeBlockPattern)` approach used by `escapeMdxAngleBrackets`.

---

### Bug 4: `removeOrphanedClosingTags` — No Code-Block/Code-Span Awareness

**Root cause:** The function operated on raw text line-by-line, counting opening and closing HTML tags. It had no mechanism to skip content inside fenced code blocks or inline code spans.

**Manifestation (ja review):** In `translators-guide/index.md`, the line `` `</strong>` - _終了タグ_ `` (an educational code example showing an HTML tag) had `</strong>` stripped from inside the backticks, producing `` `` - _終了タグ_ ``.

**Fix:** Added code-block/code-span splitting as the outermost loop, processing only non-code parts for orphan detection.

---

### Bug 5: `removeOrphanedClosingTags` — First Excess Closer Removed Instead of Last

**Root cause:** Given a line with more closers than openers (e.g., `<a href="...">text</a> prose </a>`), the `excess` counter decremented from the first `.replace()` match, removing the **first** `</a>` (correctly paired with its opener) and leaving the trailing orphan.

**Manifestation (ja review):** In `restaking/index.md`, a line with `<a href="...">link text</a>...prose... </a>` had the correct closer stripped and the orphan preserved, breaking the anchor tag.

**Fix:** Inverted the logic — keep the first N closers (paired with openers), remove subsequent excess (trailing orphans):

```typescript
// Before: removes FIRST excess (wrong — strips paired closers)
let excess = closeCount - openCount
lines[i] = line.replace(closeRe, (match) => {
  if (excess > 0) { excess--; return "" }
  return match
})

// After: keeps FIRST N (paired), removes trailing orphans
let kept = 0
lines[i] = line.replace(closeRe, (match) => {
  kept++
  if (kept <= openCount) return match  // Keep paired closer
  return ""                            // Remove orphan
})
```

---

## Prevention Strategies

### Design Principles Violated

| Bug | Principle Violated |
|-----|-------------------|
| 1 | **No structural isomorphism assumption** — paragraph indices are not a join key between source and translation |
| 2 | **Single source of truth** — canonical values come from constants, not document content |
| 3a | **Correction scope** — don't list valid forms as misspellings |
| 3b, 4 | **Context boundary respect** — code regions are off-limits for prose transformations |
| 5 | **Semantic intent** — orphans are trailing excess, not leading excess |

### Rules for Sanitizer Development

1. **Warn before you fix:** Auto-fix only when the correct value is unambiguous and comes from a constant. When the fix requires assumptions about document structure, default to warn-only.

2. **Constants are authoritative, documents are inputs:** Never derive canonical values from document text. `PROTECTED_BRAND_NAMES` owns the casing, not the English YAML file.

3. **Code regions are off-limits:** Every transformation pass must split on code blocks/spans before processing. The recommended pattern: `content.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g)` — odd indices are code, skip them.

4. **Structural matching requires confirmation:** Any logic pairing source and translated elements must include a confidence check. Low confidence → warn and skip.

5. **Removal algorithms must define "which N":** Specify and justify selection strategy (first, last, trailing, etc.) based on semantic intent.

### Testing Recommendations

**Href alignment:**
- Test with translated file having extra/fewer blank lines than English
- Verify no href substitution occurs when block counts differ

**Brand tag casing:**
- Test with English source having lowercase brand tags
- Verify output uses `PROTECTED_BRAND_NAMES` casing, not English source casing
- Verify multi-line YAML tag arrays are preserved

**Code-fence awareness:**
- Test ticker corrections, orphan removal, and all text transforms with content inside fenced and inline code
- Verify code regions are never modified

**Orphan tag removal:**
- Test `<a>text</a> prose </a>` — trailing orphan should be removed, paired closer preserved
- Test `` `</strong>` `` — tag inside backticks should not be touched

## Related Documentation

- [Crowdin Import Review Agent Calibration](./crowdin-import-review-agent-calibration.md) — False positive calibration on Czech translations
- [Crowdin File Path Mapping and Review Workflow](./crowdin-file-path-mapping-and-review-workflow.md) — Worktree workflow, automation permissions, orphan detection
- [Scaling Translation Review Pipeline](../translation-review/scaling-translation-review-pipeline.md) — Strategic roadmap with prevention matrix
- [Turkish PR #17182 Review](../translation-review/crowdin-import-review-turkish-pr-17182.md) — First review case study establishing baseline issue catalog
