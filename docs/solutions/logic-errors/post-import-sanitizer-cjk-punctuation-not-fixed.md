---
title: "Sanitizer Bug: CJK Punctuation Not Auto-Fixed in Non-CJK Locales"
date: 2026-03-25
category: logic-errors
component: src/scripts/i18n/post_import_sanitize.ts
tags:
  - i18n
  - sanitizer
  - cross-script
  - cjk
  - punctuation
  - urdu
severity: medium
symptoms:
  - "CJK ideographic full stop U+3002 appearing in Urdu (ur) translation files"
  - "detectCrossScriptContamination warns but does not fix cross-script punctuation"
  - "Detection pattern for non-CJK locales excludes CJK punctuation range U+3000-U+303F"
root_cause: |
  Two gaps in cross-script handling:
  1. Detection patterns for non-CJK locales (ar, ur, hi, etc.) only covered CJK Unified
     Ideographs (U+4E00-U+9FFF) but NOT CJK Symbols and Punctuation (U+3000-U+303F).
     The ideographic full stop U+3002 falls in the latter range, so it was not detected.
  2. detectCrossScriptContamination() only emits warnings -- it never modifies content.
     Even if the character were detected, it would not be fixed automatically.
resolution: |
  Added fixCrossScriptPunctuation() that replaces CJK ideographic full stop U+3002
  with locale-appropriate equivalents outside code fences:
  - ar/ur: U+06D4 (Arabic full stop)
  - hi/mr/bn: U+0964 (Devanagari danda)
  - Latin/Cyrillic/other non-CJK: ASCII period
  - CJK locales (ja, ko, zh, zh-tw): no-op (U+3002 is correct)
  Wired into both processMarkdownFile and processJsonFile pipelines, placed before
  detectCrossScriptContamination so warnings reflect post-fix state.
  11 unit tests added.
related:
  - docs/solutions/integration-issues/sanitizer-test-research.md
  - docs/solutions/integration-issues/post-import-sanitizer-bugs-found-japanese-review.md
discovered_in: "PR #17854 (Urdu full translation)"
files_affected:
  - public/content/translations/ur/developers/docs/standards/tokens/erc-1363/index.md
  - src/intl/ur/glossary-tooltip.json
---

# Sanitizer Bug: CJK Punctuation Not Auto-Fixed in Non-CJK Locales

## Problem

During review of PR #17854 (Urdu translation), two instances of CJK ideographic full stop
(`U+3002`) were found in Urdu files where the Urdu full stop (`U+06D4`) was expected:

- `erc-1363/index.md` line 191: inside a Solidity code comment
- `glossary-tooltip.json` line 165: in the zk-proof definition value

These are classic Gemini cross-script leak artifacts -- the model occasionally copies
punctuation from CJK training data into non-CJK output.

## Root Cause

The sanitizer had `detectCrossScriptContamination()` which warned about foreign characters,
but:

1. **Detection gap**: The `ur` detector pattern was `[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF]`,
   covering CJK ideographs but NOT CJK punctuation (`\u3000-\u303F`). The full stop `U+3002`
   is in the punctuation range, so it was invisible to the detector.

2. **No auto-fix**: Even if detected, the function only pushes to the warnings array. It never
   modifies content.

## Fix

Added `fixCrossScriptPunctuation(content, locale)` that:

- Processes content line-by-line with fence tracking (same pattern as `escapeMdxAngleBrackets`)
- Skips code fences and inline code spans
- Maps `U+3002` to the locale-appropriate full stop
- Returns `{ content, fixCount }` like all other fix functions

Locale mapping:

| Locale Group | Replacement | Unicode |
|-------------|-------------|---------|
| ar, ur | Arabic full stop | U+06D4 |
| hi, mr, bn | Devanagari danda | U+0964 |
| ja, ko, zh, zh-tw | No-op (correct) | U+3002 |
| All other | ASCII period | U+002E |

## Tests

11 tests in `tests/unit/sanitizer/standalone-fixes.spec.ts`:
- Per-locale replacement (ur, ar, hi, de, ru)
- CJK locale no-op (ja, zh)
- Code fence skipping
- Multiple occurrences
- Empty locale guard
- No-op when clean
