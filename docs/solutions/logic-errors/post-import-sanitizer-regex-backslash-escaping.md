---
title: Fix double-escaping of backslash-escaped angle brackets in MDX sanitizer
date: 2026-02-28
category: logic-errors
component: Translation post-import sanitizer
tags:
  - regex
  - mdx
  - escaping
  - i18n
  - sanitizer
  - translation
  - angle-brackets
severity: high
recurring: true
languages_affected:
  - vi
  - cs
  - fr
  - ru
files_modified:
  - src/scripts/i18n/post_import_sanitize.ts
  - tests/unit/sanitizer/standalone-fixes.spec.ts
  - public/content/translations/cs/developers/tutorials/how-to-mint-an-nft/index.md
  - public/content/translations/fr/developers/tutorials/how-to-mint-an-nft/index.md
  - public/content/translations/ru/developers/docs/networking-layer/portal-network/index.md
  - public/content/translations/ru/developers/tutorials/reverse-engineering-a-contract/index.md
  - public/content/translations/vi/developers/docs/networking-layer/portal-network/index.md
  - public/content/translations/vi/developers/tutorials/how-to-mint-an-nft/index.md
  - public/content/translations/vi/developers/tutorials/reverse-engineering-a-contract/index.md
---

# Fix double-escaping of backslash-escaped angle brackets in MDX sanitizer

## Problem Symptom

Translated markdown files contained `\&lt;1 GB RAM` instead of the correct `\<1 GB RAM`. This rendered as literal `\&lt;` in the browser rather than the intended `<` character. The pattern appeared across multiple languages (vi, cs, fr, ru) in files like `portal-network/index.md`, `how-to-mint-an-nft/index.md`, and `reverse-engineering-a-contract/index.md`.

The English source uses `\<1` as a valid MDX backslash escape for `<` before digits. After running the sanitizer, translations gained the extra `&lt;` entity, producing a double-escape.

## Root Cause Analysis

The `escapeMdxAngleBrackets` function in `src/scripts/i18n/post_import_sanitize.ts` (line 1558) used the following regex:

```typescript
// BUGGY:
parts[i] = parts[i].replace(/(?<!&lt|&)<(\d)/g, (_, digit) => {
  fixCount++
  return `&lt;${digit}`
})
```

The negative lookbehind `(?<!&lt|&)` excluded:
- `&lt` -- already HTML-entity-escaped (e.g., `&lt;1`)
- `&` -- ampersand prefix

It did **NOT** exclude `\` (backslash). When MDX content contained a valid backslash escape like `\<1 GB RAM`, the regex matched the `<` because `\` was not in the lookbehind. The replacement transformed `\<1` into `\&lt;1` -- a double-escape.

This bug was introduced because backslash-escaping of `<` is a less common MDX pattern than entity-escaping. The original regex only anticipated the two most common preceding characters (`&lt` and `&`) but missed the third valid escape prefix.

## Working Solution

### The Fix

**File:** `src/scripts/i18n/post_import_sanitize.ts` (line 1558)

Added `\\` to the negative lookbehind:

```typescript
// BEFORE (buggy):
parts[i] = parts[i].replace(/(?<!&lt|&)<(\d)/g, (_, digit) => {

// AFTER (fixed):
parts[i] = parts[i].replace(/(?<!&lt|&|\\)<(\d)/g, (_, digit) => {
```

The `\\` in the regex source represents a literal `\` character in the lookbehind, so the pattern now reads: "match `<` followed by a digit, but NOT if preceded by `&lt`, `&`, or `\`".

### Tests Added

Two new unit tests in `tests/unit/sanitizer/standalone-fixes.spec.ts`:

```typescript
test("does not escape < that is already backslash-escaped", () => {
  const input =
    "Accessible to resource-constrained devices (\\<1 GB RAM, \\<100 MB disk space, 1 CPU)"
  const { content, fixCount } = escapeMdxAngleBrackets(input)
  expect(content).toBe(input)
  expect(fixCount).toBe(0)
})

test("does not escape backslash-escaped < before single digit", () => {
  const input = "do the same in \\<10 minutes"
  const { content, fixCount } = escapeMdxAngleBrackets(input)
  expect(content).toBe(input)
  expect(fixCount).toBe(0)
})
```

All 131 tests pass (129 existing + 2 new).

### Translation Files Repaired

Reverted `\&lt;` back to `\<` in 7 files across 4 languages:

| Language | File |
|----------|------|
| cs | `developers/tutorials/how-to-mint-an-nft/index.md` |
| fr | `developers/tutorials/how-to-mint-an-nft/index.md` |
| ru | `developers/docs/networking-layer/portal-network/index.md` |
| ru | `developers/tutorials/reverse-engineering-a-contract/index.md` |
| vi | `developers/docs/networking-layer/portal-network/index.md` |
| vi | `developers/tutorials/how-to-mint-an-nft/index.md` |
| vi | `developers/tutorials/reverse-engineering-a-contract/index.md` |

## Prevention Strategies

### 1. Lookbehind Completeness Checklist

For every negative lookbehind `(?<!...)` in the sanitizer, verify coverage of **all** escape character families:
- `\` (backslash -- markdown/MDX escape)
- `&` and `&lt;`, `&amp;`, `&#` (HTML entities)
- `` ` `` (backtick -- code context)

### 2. Edge Case Test Matrix

Test these input patterns for any angle bracket escaping function:

| Input | Expected | Risk |
|-------|----------|------|
| `\<1` | unchanged | Backslash escape |
| `&lt;1` | unchanged | Entity escape |
| `&<1` | unchanged | Ampersand prefix |
| `<1` | `&lt;1` | Bare angle bracket |
| `\<10\<20` | unchanged | Multiple escapes |
| `\\<1` | `\\&lt;1` | Double backslash (literal `\` + bare `<`) |

### 3. Process Improvements

- **Dry-run diff viewer:** Run sanitizer in dry-run mode before committing, showing before/after for every file so reviewers can spot double-escaping visually.
- **Regex audit:** Periodically grep for `(?<!` in sanitizer files and verify each lookbehind covers backslash escapes.
- **Cross-language regression:** When a pattern is found in one language, scan all other languages for the same pattern before closing the issue.

## Related Documentation

- [Crowdin Translation Sanitizer MDX Fence Bugs](../build-errors/crowdin-translation-sanitizer-mdx-fence-bugs.md) -- Patterns 12-15 covering `escapeMdxAngleBrackets` bugs
- [Post-Import Sanitizer Regex Bugs: Whitespace Handling](./post-import-sanitizer-regex-bugs-whitespace-handling.md) -- Sibling regex bugs in the same sanitizer
- [Sanitizer Test Research](../integration-issues/sanitizer-test-research.md) -- Comprehensive pattern catalog (Patterns 1-16)
- [Known Patterns](~/.claude/translation-review/known-patterns.md) -- Pattern 6: Double-Escaping in MDX

## Commits

- `e6fa15813e` -- fix(i18n): fix backslash-escape double-encoding (regex fix + 2 tests + 7 file repairs)
- `dd44c06a36` -- fix(i18n): review vi translations PR #17176 (bulk Vietnamese translation fixes)
