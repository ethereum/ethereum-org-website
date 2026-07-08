---
title: "Sanitizer Regex Bugs: Backtick Parity Cascade and Header Newline Stripping"
date: 2026-02-27
category: logic-errors
component: src/scripts/i18n/post_import_sanitize.ts
tags:
  - i18n
  - sanitizer
  - regex
  - markdown
  - crowdin
  - escapeMdxAngleBrackets
  - extractHeaderStructure
  - syncHeaderIdsWithEnglish
severity: high
symptoms:
  - "Inline code with angle brackets falsely escaped (<01> -> &lt;01>)"
  - "Blank lines between headers and paragraphs removed, merging content onto one line"
  - "Backtick parity flip from Crowdin-broken code spans cascading to later lines"
  - "Duplicate header IDs causing double newline stripping via .replace()"
root_cause: |
  Bug 1: Global content.split() on inline code pattern didn't account for odd backtick
  counts (from Crowdin breaking code spans across lines), causing parity inversion for
  all subsequent parts.
  Bug 2: Regex \s*$ in multiline mode captured trailing \n in fullMatch; .replace() on
  first occurrence of duplicated header text stripped newline twice, merging header with
  following paragraph.
resolution: |
  Bug 1: Rewrote escapeMdxAngleBrackets to process line-by-line with fenced block state
  tracking. Each line's inline code spans are split independently.
  Bug 2: Changed regex from \s*$ to [ \t]*$ so fullMatch only captures horizontal
  whitespace, never trailing newlines.
related:
  - docs/solutions/integration-issues/translation-review-session-errors-sed-sanitizer-unicode.md
  - docs/solutions/build-errors/crowdin-translation-sanitizer-mdx-fence-bugs.md
  - docs/solutions/integration-issues/post-import-sanitizer-bugs-found-japanese-review.md
  - docs/solutions/integration-issues/sanitizer-test-research.md
---

# Sanitizer Regex Bugs: Backtick Parity Cascade and Header Newline Stripping

Discovered during Russian translation review of PR #17127. Both bugs are logic errors in the text processing pipeline of `post_import_sanitize.ts`.

## Bug 1: escapeMdxAngleBrackets -- Cross-line Backtick Parity Cascade

### Symptom

In `patricia-merkle-trie/index.md`, `<01>` and `<6661...>` inside inline backtick code spans were falsely escaped to `&lt;01>` and `&lt;6661...>`. These were inside code and should not have been touched.

### Root Cause

Crowdin broke an inline code span across a line boundary on line 82:

```
`branch` node `[ v0 ...` v15, vt ]`
```

This produced 5 backticks on that line (odd count). The original implementation used a single global `content.split(/(codeBlockPattern)/g)` across the entire file. The regex split puts code at odd indices and prose at even indices. An odd backtick count on one line flipped the parity for all subsequent parts, so `<01>` on line 92 (genuinely inside inline code) was misclassified as prose and escaped.

### Fix

Rewrote `escapeMdxAngleBrackets` from global `content.split()` to line-by-line processing:

```typescript
// BEFORE (buggy): global split -- odd backtick cascades across entire file
const parts = content.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g)
for (let i = 0; i < parts.length; i++) {
  if (i % 2 === 1) continue // Skip code -- but parity is wrong after broken span
  // Incorrectly treats <01> on line 92 as prose
}

// AFTER (fixed): line-by-line with fenced block tracking
const lines = content.split("\n")
let inFencedBlock = false
for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  const line = lines[lineIdx]
  if (/^(`{3,}|~{3,})/.test(line)) {
    inFencedBlock = !inFencedBlock
    continue
  }
  if (inFencedBlock) continue
  // Split THIS LINE on inline code spans -- parity is isolated per line
  const parts = line.split(/(`[^`]+`)/g)
  // ...process parts with correct parity...
}
```

Each line's inline code spans are split independently, so a broken backtick on line 82 has zero effect on how line 92 is parsed.

### Regression Test

```typescript
test("handles broken backtick parity without corrupting later code spans", () => {
  const input = [
    "`branch` node `[ v0 ...` v15, vt ]`",
    "stored as `<01>`) to specify",
  ].join("\n")
  const { content, fixCount } = escapeMdxAngleBrackets(input)
  expect(content).not.toContain("&lt;01>")
  expect(fixCount).toBe(0)
})
```

## Bug 2: extractHeaderStructure -- Trailing Newline in fullMatch

### Symptom

In `dao/index.md`, the blank line between `#### Известный пример {#governance-example}` and the `[ENS]...` paragraph was removed. The header and paragraph were merged onto a single line.

### Root Cause

The regex in `extractHeaderStructure`:

```typescript
// BEFORE: \s*$ captures trailing \n in multiline mode
const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$/gm
```

In multiline mode, `\s*$` matches 0+ whitespace (including `\n`) before the line anchor. This means `fullMatch` (captured by `m[0]`) included the trailing newline character.

Then in `syncHeaderIdsWithEnglish`:

```typescript
const updatedHeader = `${"#".repeat(level)} ${text} {#${asciiId}}`
result = result.replace(translatedHeader.fullMatch, updatedHeader)
```

The replacement `updatedHeader` does NOT include a trailing `\n`, but `fullMatch` DOES. So every `.replace()` call stripped the newline after the header.

For `dao/index.md`, four headings share `{#governance-example}`. Two are identical `#### Известный пример {#governance-example}`. Since `String.replace()` matches only the first occurrence, the first header was targeted twice (once for itself, once for the second identical header), double-stripping its newline and merging it with the following paragraph.

### Fix

One character class change in the regex:

```diff
- const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$/gm
+ const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}[ \t]*$/gm
```

`[ \t]*$` matches only horizontal whitespace (spaces and tabs), never `\n`. The `fullMatch` no longer includes the trailing newline, so `.replace()` preserves line structure.

### Regression Test

```typescript
test("preserves blank lines after headers with duplicate IDs", () => {
  const english = [
    "#### A famous example {#governance-example}",
    "",
    "[ENS](https://ens.domains) - ENS holders can delegate.",
    "",
    "### Automatic governance {#governance-example}",
    "",
    "In many DAOs transactions execute automatically.",
    "",
    "#### A famous example {#governance-example}",
    "",
    "[Nouns](https://nouns.wtf) - automatic execution.",
  ].join("\n")
  // ... translated version with same structure ...
  const result = syncHeaderIdsWithEnglish(translated, english)
  expect(result).toContain("#### Izvestnyj primer {#governance-example}\n\n[ENS]")
  expect(result).toContain("#### Izvestnyj primer {#governance-example}\n\n[Nouns]")
  expect(result).not.toMatch(/#### Izvestnyj primer \{#governance-example\}\[/)
})
```

## Investigation Method

1. **Diagnostic tracing script**: Called all 24 sanitizer pipeline functions sequentially on the affected file, checking for blank line preservation after each. Identified `syncHeaderIdsWithEnglish` as the first function to collapse the blank line.

2. **Deep trace on fullMatch**: Logged `JSON.stringify(fullMatch)` for each header, revealing every `fullMatch` ended with `\n`.

3. **Duplicate-ID double-strip**: Traced how `String.replace()` hit the first identical header occurrence twice when processing duplicate-ID headers in sequence.

4. **Real-file verification**: Ran the fixed `escapeMdxAngleBrackets` against the actual `patricia-merkle-trie` file and confirmed `fixCount: 0` (no false escapes).

## Prevention Strategies

### For Parity-Based Processing (Bug 1 class)

- **Always process delimited content line-by-line** when parity matters. Global `split()` across an entire file is fragile when delimiters can be unbalanced.
- **Track fenced block state** with a boolean across lines rather than relying on regex to match the entire block.
- **Test with real Crowdin output**, not just synthetic inputs. Crowdin regularly breaks code spans in ways that synthetic tests don't cover.

### For Regex in Multiline Mode (Bug 2 class)

- **Never use `\s*$` in multiline anchored positions.** Use `[ \t]*$` for horizontal whitespace only. The `\s` character class includes `\n`, which `$` in multiline mode matches before.
- **Audit all `\s$` patterns** in the codebase for unintended newline capture.
- **Verify `fullMatch` contents** in tests -- assert that `m[0]` does not include trailing newlines when that's not the intent.

### For String.replace() with Duplicates

- **Be aware that `.replace()` only targets the first occurrence.** When processing a list of patterns that may have duplicates, earlier replacements can cause later ones to re-target the first occurrence.
- **Consider using index-based replacement** (tracking positions) instead of string-based `.replace()` when duplicates are possible.

### General Pipeline Design

- **Line-by-line processing** should be the default for markdown/MDX sanitization. Global operations are only safe for simple, context-free substitutions.
- **Add structural assertions** between pipeline stages: verify line count, blank line count, and newline preservation before and after each transform.

## Test Coverage

7 regression tests added across two test files:

- `tests/unit/sanitizer/standalone-fixes.spec.ts`: 4 tests for `escapeMdxAngleBrackets`
- `tests/unit/sanitizer/english-comparison.spec.ts`: 3 tests for `syncHeaderIdsWithEnglish` and `restoreBlankLinesFromEnglish`

All 123 sanitizer unit tests pass after the fixes.
