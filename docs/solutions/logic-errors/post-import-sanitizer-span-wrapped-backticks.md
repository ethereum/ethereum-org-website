---
title: Fix <span dir="ltr"> wrapping backtick inline code in RTL translations
date: 2026-03-25
category: logic-errors
component: Translation post-import sanitizer
tags:
  - mdx
  - rtl
  - bidi
  - inline-code
  - sanitizer
  - translation
  - span-dir-ltr
severity: high
recurring: true
languages_affected:
  - ar
  - ur
files_modified:
  - src/scripts/i18n/post_import_sanitize.ts
  - tests/unit/sanitizer/standalone-fixes.spec.ts
---

# Fix `<span dir="ltr">` wrapping backtick inline code in RTL translations

## Problem Symptom

In RTL translation files (Arabic, Urdu), inline code wrapped in markdown backticks was rendered as broken text instead of properly formatted code. The MDX output contained patterns like:

```
<span dir="ltr">`APPLY(S,TX) -> S'`</span>
```

MDX cannot nest markdown syntax (backticks) inside JSX (`<span>` tags). The backtick content renders as literal broken text instead of an inline code block.

## Root Cause Analysis

Two sources produce this invalid pattern:

1. **Sanitizer's own RTL fixes**: `fixBareRtlDates` and `fixBareRtlEquations` wrap bare LTR content (dates, math equations) in `<span dir="ltr">...</span>` for BiDi correctness. While the `RTL_SKIP_PATTERN` regex is designed to skip inline code, edge cases can result in backtick content being wrapped.

2. **Gemini translations**: The LLM translator sometimes produces `<span dir="ltr">` wrappers around backtick content directly in its output.

In both cases, the `<span dir="ltr">` wrapper is redundant because inline code in backticks is already inherently LTR (rendered in a monospace Latin font by the browser).

## Fix Applied

Added a new sanitizer function `fixSpanWrappedBackticks` that:

1. Splits content on code fences (to avoid modifying fenced code blocks)
2. Finds all instances of `<span dir="ltr">` followed by backtick content followed by `</span>`
3. Replaces with just the backtick content (stripping the span wrapper)
4. Handles optional whitespace between the span tags and the backtick content

The function is placed in the pipeline immediately after `fixBareRtlDates` and `fixBareRtlEquations`, so it cleans up after them. It also handles cases where Gemini produced the pattern directly.

### Regex pattern

```typescript
/<span dir="ltr">\s*(`[^`]+`)\s*<\/span>/g
```

This matches `<span dir="ltr">` + optional whitespace + backtick-delimited content + optional whitespace + `</span>`, and replaces with just the backtick content (capture group 1).

## Verification

- Unit tests added in `tests/unit/sanitizer/standalone-fixes.spec.ts`
- Tests cover: basic unwrapping, multiple occurrences, non-backtick spans left alone, bare backticks left alone, whitespace handling, no-op case, correct fixCount, code fence skipping
