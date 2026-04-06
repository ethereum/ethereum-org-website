# Crowdin Translation Sanitizer: MDX Build Failures from Backslash Injection and Code Fence Drift

> **Date:** 2026-02-27
> **PR:** #17125 (French Crowdin import)
> **Component:** post-import translation sanitizer (`src/scripts/i18n/post_import_sanitize.ts`)
> **Problem type:** build-error, translation-artifact
> **Languages affected:** fr (confirmed); potentially any Crowdin-imported language
> **Severity:** Critical -- both patterns cause Netlify build failures (MDX compilation errors)
> **Tags:** crowdin, sanitizer, mdx, build-error, code-fence, backslash, translation

## Problem Symptom

The Netlify build for PR #17125 (French translation import, ~300 files) failed with MDX compilation errors in three files:

1. `public/content/translations/fr/ai-agents/index.md` -- "Unexpected character" at backslash before closing tag
2. `public/content/translations/fr/restaking/index.md` -- same backslash pattern (2 occurrences)
3. `public/content/translations/fr/developers/tutorials/reverse-engineering-a-contract/index.md` -- "Unexpected character `[`" from code fence boundaries being completely inverted

These are two distinct Crowdin translation artifacts that both manifest as MDX compilation failures.

## Root Cause Analysis

### Pattern 12: Backslash Before Closing HTML Tag

**What happens:** Crowdin's translation memory or post-processing inserts a backslash `\` immediately before closing HTML tags. This produces patterns like:

```
<strong>Bon a savoir\</strong>
```

The backslash is not valid in MDX/JSX context and causes the MDX compiler to choke.

**Why it happens:** Crowdin's TM system treats `</` as a potential escape sequence boundary and inserts a backslash as a "protective" escape. This is a known Crowdin artifact that appears inconsistently across languages.

**Affected tags:** Any closing HTML tag -- `</strong>`, `</em>`, `</a>`, `</p>`, and even JSX fragment closers `</>`.

**Real-world occurrences found in FR import:**
- `fr/ai-agents/index.md` line 67: `<strong>Bon a savoir\</strong>`
- `fr/restaking/index.md` lines 42, 99: same pattern
- `fr/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md` line 146: `\</>`

### Pattern 13: Catastrophic Code Fence Drift

**What happens:** Crowdin completely scrambles the boundaries between code fences and prose in translation files containing significant code blocks. The result is:

- Code that should be inside fences ends up as raw MDX prose (causing compilation errors)
- Prose/comments that should be outside fences get absorbed into code blocks
- Heading lines (`## Title {#anchor-id}`) get merged into adjacent prose paragraphs
- Anchor IDs (`{#custom-id}`) become detached from their heading lines

**Why it happens:** Crowdin's segmentation algorithm treats code fence markers (`` ``` ``) as segment boundaries. When translating, it can reassemble segments with fence markers in wrong positions. Files with many interleaved code/prose sections (like tutorials) are especially vulnerable.

**Scale of damage in FR import:** In `reverse-engineering-a-contract/index.md`, approximately 165 lines (581-746) were structurally destroyed:
- 22 code fence markers displaced
- Multiple headings absorbed into prose paragraphs
- Python decompiler output exposed as raw MDX
- Anchor IDs detached from heading lines

## Investigation Steps Tried

1. **Direct inspection** -- Read the affected French files and compared against English sources line-by-line
2. **Pattern identification** -- Found the backslash pattern was consistent and regex-matchable; the code fence drift was structural and not auto-fixable
3. **English source comparison** -- Confirmed English sources had correct structure; damage was purely from Crowdin processing
4. **Cross-file check** -- Searched all FR files for both patterns to determine full scope

## Working Solution

### Fix 1: `fixBackslashBeforeClosingTag` (Deterministic Auto-Fix)

Added to `src/scripts/i18n/post_import_sanitize.ts` at line 1625:

```typescript
function fixBackslashBeforeClosingTag(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split content to preserve code blocks (fenced and inline)
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match backslash immediately before </ (closing HTML tag) or </>
    parts[i] = parts[i].replace(/\\(<\/[a-zA-Z]*>)/g, (_match, tag) => {
      fixCount++
      return tag
    })
  }

  return { content: parts.join(""), fixCount }
}
```

**Wired into pipeline:** Placed before `removeOrphanedClosingTags` in `processMarkdownFile` via `applyFix`.

**Regex explanation:** `\\(<\/[a-zA-Z]*>)` matches a literal backslash followed by `</` + optional tag name + `>`. The capture group preserves the valid closing tag while discarding the backslash.

### Fix 2: `warnCatastrophicCodeFenceDrift` (Detection + Warning)

Added to `src/scripts/i18n/post_import_sanitize.ts` at line 497. This is a warning-only function because the damage is too structural to auto-fix -- it requires LLM-assisted reconstruction.

The function performs three checks:

1. **Prose-in-fences:** Compares each translated fence body against its English counterpart. If English has 3+ lines with code keywords but translated has <=2 lines with no code keywords, flags it.

2. **Code-outside-fences:** Scans prose sections (outside fences) for programming keywords (`def `, `class `, `if `, `return `, `require `, etc.). If 3+ keyword occurrences found outside fences, flags catastrophic inversion.

3. **Detached anchor IDs:** Checks that `{#anchor-id}` patterns only appear on heading lines (starting with `#`). Detached anchors indicate heading absorption.

### Manual Reconstruction for Pattern 13

The `reverse-engineering-a-contract/index.md` file required full manual reconstruction of lines 581-746 using the English structural skeleton with French prose reinserted. This was done by an agent that:

1. Used the English source as the structural template (fence positions, headings, anchor IDs)
2. Extracted translatable prose from the mangled French file
3. Rebuilt the file maintaining English code blocks verbatim
4. Verified: 22 fence markers balanced, all anchor IDs on heading lines

## Tests Added

### Standalone Fix Tests (`tests/unit/sanitizer/standalone-fixes.spec.ts`)

7 new tests for `fixBackslashBeforeClosingTag`:

| Test | Description |
|------|-------------|
| fixes backslash before closing strong tag | `\</strong>` -> `</strong>` |
| fixes backslash before closing em tag | `\</em>` -> `</em>` |
| fixes backslash before closing a tag | `\</a>` -> `</a>` |
| fixes multiple occurrences in one string | 2 fixes in single content block |
| leaves correct closing tags unchanged | No false positives on valid HTML |
| does not modify content inside code blocks | Preserves `\</strong>` inside backticks |
| fixes JSX fragment closer | `\</>` -> `</>` |

### Warning Tests (`tests/unit/sanitizer/warnings.spec.ts`)

5 new tests for `warnCatastrophicCodeFenceDrift`:

| Test | Description |
|------|-------------|
| detects prose inside code fences | Prose replacing code triggers warning |
| detects code keywords outside fences | `def`, `return`, etc. in prose triggers warning |
| no warning on correctly structured files | Clean content produces no warnings |
| detects detached heading anchors | `{#id}` not on `##` line triggers warning |
| no false positive on properly anchored headings | Correct `## Heading {#id}` produces no warning |

**Test results:** All 111 sanitizer tests pass (56 standalone + 22 warnings + 33 other).

## Prevention Strategies

### Short-term

1. **Sanitizer pipeline catches Pattern 12 automatically** -- The `fixBackslashBeforeClosingTag` function runs on every Crowdin import, catching all occurrences without manual intervention.

2. **Sanitizer warns on Pattern 13** -- The `warnCatastrophicCodeFenceDrift` function flags files with structural damage so they can be routed to LLM review.

### Medium-term

3. **Pre-import Crowdin configuration** -- Investigate Crowdin's "Code" content type settings to prevent code fence boundaries from being treated as translatable segments.

4. **Expand code keyword detection** -- Add language-specific keywords (Solidity: `pragma`, `mapping`, `event`; JavaScript: `const`, `function`, `async`) to improve detection sensitivity.

5. **Automated LLM reconstruction pipeline** -- When catastrophic drift is detected, automatically invoke an LLM agent to reconstruct the file from English structure + translated prose, similar to the manual process used here.

### Long-term

6. **Crowdin segment locking** -- Work with Crowdin to lock code fence markers and their contents as non-translatable segments, preventing the drift at source.

7. **Structural hash comparison** -- Generate a structural hash (fence positions, heading levels, anchor IDs) for English source files and compare against translated files post-import to catch any structural divergence.

## Files Changed

| File | Change |
|------|--------|
| `src/scripts/i18n/post_import_sanitize.ts` | Added `fixBackslashBeforeClosingTag` (line 1625) and `warnCatastrophicCodeFenceDrift` (line 497); wired both into pipeline; added to `_testOnly` export |
| `tests/unit/sanitizer/standalone-fixes.spec.ts` | 7 new tests for backslash fix |
| `tests/unit/sanitizer/warnings.spec.ts` | 5 new tests for catastrophic drift detection |
| `docs/solutions/integration-issues/sanitizer-test-research.md` | Added patterns 12 and 13 to catalog; moved both to "handled" list |
| `public/content/translations/fr/ai-agents/index.md` | Fixed `\</strong>` at line 67 |
| `public/content/translations/fr/restaking/index.md` | Fixed `\</strong>` at lines 42 and 99 |
| `public/content/translations/fr/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md` | Fixed `\</>` at line 146 |
| `public/content/translations/fr/developers/tutorials/reverse-engineering-a-contract/index.md` | Full structural reconstruction of lines 581-746 |

---

## Part 2: Follow-Up Build Failures (Patterns 14-15)

> **Date:** 2026-02-27 (same session, second build attempt)

After the Part 1 fixes were pushed and built, two more MDX compilation errors surfaced in the same PR.

### Pattern 14: Translated Word After Bare `<` Breaks MDX Tag Parsing

**Symptom:** `Unexpected character [ (U+005B) in name` on `/fr/developers/tutorials/reverse-engineering-a-contract`

**Root cause:** English has `\<Storage[4]` in markdown tables (opcode stack notation). Crowdin translated "Storage" to "Stockage" AND dropped the backslash escape, producing `<Stockage[4]`. MDX tries to parse `<Stockage` as a component tag, then chokes on `[`.

The existing `restoreDroppedBackslashEscapes` function only matches exact follower text from English. Since `Stockage[4]` != `Storage[4]`, the bare `<` went undetected.

**Fix:** Extended `escapeMdxAngleBrackets` with a new rule:

```typescript
// Escape < before word containing [ (e.g., <Stockage[4]) -- never valid MDX
parts[i] = parts[i].replace(/(?<!\\)<([a-zA-Z]+\[)/g, (_, after) => {
  fixCount++
  return `\\<${after}`
})
```

The pattern `<Word[` is never valid MDX/HTML syntax, so this is safe to escape unconditionally.

### Pattern 15: `fixBackslashBeforeClosingTag` Too Broad -- Strips `\</>`

**Symptom:** `Unexpected closing slash / in tag` on `/fr/developers/tutorials/creating-a-wagmi-ui-for-your-contract`

**Root cause:** The Pattern 12 fix (from Part 1) used regex `[a-zA-Z]*` (zero or more letters), which matched `\</>` -- a JSX fragment with an empty tag name. Stripping the backslash exposed bare `</>` to the MDX parser.

The `\</>` was actually a legitimate escape (placed by `escapeMdxAngleBrackets`) protecting a bare `</>` that sat outside inline code backticks due to a Crowdin backtick misplacement.

**Fix:** Changed quantifier from `*` to `+`:

```typescript
// Requires at least one letter in tag name -- leaves \</> (JSX fragment) intact
parts[i] = parts[i].replace(/\\(<\/[a-zA-Z]+>)/g, (_, tag) => {
```

**Cascading effect:** Once `\</>` was preserved, the existing `repairUnclosedBackticks` function could detect the real problem (odd backtick count on line 146) and fix the misplaced backtick: `` (`<> ...` </>`) `` became `` (`<> ... </>`) ``.

### Key Lesson: Sanitizer Function Interaction

This was a cascading failure:
1. `fixBackslashBeforeClosingTag` (Pattern 12 fix) stripped `\</>` -- unmasking a bare `</>` in prose
2. That bare `</>` was actually the symptom of a deeper problem: a misplaced backtick
3. `repairUnclosedBackticks` could have fixed the backtick, but only if the escapes were intact
4. Narrowing the regex (Pattern 15 fix) preserved `\</>`, letting `repairUnclosedBackticks` do its job

**Takeaway:** Sanitizer functions form a pipeline. Earlier functions that strip escapes can mask problems that later functions would fix. Each function should only strip escapes it's certain about -- use `+` not `*`, enumerate known tag names, and test with JSX fragments.

### Tests Added (Part 2)

6 new tests in `standalone-fixes.spec.ts`:

| Test | Description |
|------|-------------|
| does NOT strip backslash from JSX fragment `\</>` | Verifies `[a-zA-Z]+` excludes empty tag names |
| escapes bare `<` before word containing `[` | `<Stockage[4]` -> `\<Stockage[4]` |
| escapes multiple bare `<` before `word[` patterns | 2 occurrences in one string |
| leaves already-escaped `\<Word[` unchanged | No double-escaping |
| skips `<Word[` inside code blocks | Preserves code fence content |
| does not escape valid MDX component tags | `<Card>` left alone |

**Test results:** All 116 sanitizer tests pass (61 standalone + 22 warnings + 33 other).

### Additional Files Changed (Part 2)

| File | Change |
|------|--------|
| `src/scripts/i18n/post_import_sanitize.ts` | Extended `escapeMdxAngleBrackets` (+1 rule); narrowed `fixBackslashBeforeClosingTag` (`*` -> `+`) |
| `tests/unit/sanitizer/standalone-fixes.spec.ts` | 6 new tests |
| `docs/solutions/integration-issues/sanitizer-test-research.md` | Added patterns 14 and 15 |
| `public/content/translations/fr/.../reverse-engineering-a-contract/index.md` | `<Stockage[4]` escaped (lines 472-473) |
| `public/content/translations/fr/.../creating-a-wagmi-ui-for-your-contract/index.md` | Backtick fixed (line 146) |

### Prevention: Regex Safety Rules for Sanitizer Functions

1. **Use `+` not `*`** when matching tag names -- empty matches cause unintended stripping
2. **Test with JSX fragments** (`<>`, `</>`) as edge cases for any HTML tag regex
3. **Test idempotency** -- `sanitize(sanitize(x))` should equal `sanitize(x)`
4. **Test function composition** -- run functions in sequence and verify escapes survive
5. **Run `npx tsc --noEmit`** before pushing -- catches unused variables the test runner misses

## Cross-References

- [Sanitizer Test Research: Pattern Catalog](../integration-issues/sanitizer-test-research.md) -- Patterns 12-15
- [Post-Import Sanitizer Bugs Found During Japanese Review](../integration-issues/post-import-sanitizer-bugs-found-japanese-review.md) -- Prior sanitizer bug documentation
- [Crowdin Import Review Agent Calibration](../integration-issues/crowdin-import-review-agent-calibration.md) -- Agent calibration for translation reviews
- [Crowdin File Path Mapping and Review Workflow](../integration-issues/crowdin-file-path-mapping-and-review-workflow.md) -- Full review pipeline documentation
- [French Import Review](../integration-issues/crowdin-french-import-review-pr-17125.md) -- Comprehensive FR import context
- PR #17125 -- French Crowdin import (source of these bugs)
- PR #17654 -- Sanitizer test infrastructure (where test framework was established)
