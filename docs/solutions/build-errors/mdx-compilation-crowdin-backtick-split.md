---
title: MDX Compilation Error from Split Backticks in Translated Angle Bracket Expressions
date: 2026-02-19
category: build-errors
tags:
  - MDX
  - translations
  - Crowdin
  - angle-brackets
  - backticks
  - i18n
  - next-mdx-remote
severity: high
component: next-mdx-remote / Crowdin translations
symptoms:
  - "Netlify build fails with: Expected a closing tag for `<c>` before the end of `paragraph`"
  - Build failure on translated pages only (not English source)
  - Error points to lines where angle brackets appear outside backtick code spans
root_cause: Crowdin translation splits backtick wrapping around code expressions containing angle brackets, leaving bare <a>, <b>, <c> etc. that MDX interprets as unclosed JSX tags
resolution_time: quick
---

# MDX Compilation Error from Split Backticks in Translated Angle Bracket Expressions

## Problem Symptom

Netlify build fails during static page generation with repeated errors like:

```
[next-mdx-remote] error compiling MDX:
Expected a closing tag for `<c>` (436:204-436:207) before the end of `paragraph`
```

Affected pages (this instance):
- `/cs/developers/tutorials/ai-trading-agent`
- `/ja/developers/tutorials/ai-trading-agent`
- `/pt-br/developers/tutorials/ai-trading-agent`
- `/ur/developers/tutorials/ai-trading-agent`

## Root Cause Analysis

The English source uses backtick-wrapped code expressions containing angle brackets:

```markdown
which in a C-derived language would be `<b> ? <a> : <c>`.
```

During Crowdin translation, translators inadvertently split the backtick pair. The backtick closes after `?`, leaving `<a>` and `<c>` as bare text:

```markdown
# Broken (backtick closes too early):
který by v jazyce odvozeném od C byl `<b> ?` <a> : <c>`.

# Fixed (single backtick pair wraps all angle brackets):
který by v jazyce odvozeném od C byl `<b> ? <a> : <c>`.
```

MDX (via `next-mdx-remote`) interprets bare `<a>` and `<c>` as opening JSX/HTML tags without corresponding closing tags, causing compilation failure.

## Solution

Re-wrap the angle-bracketed expressions inside a single backtick pair in each affected translation file.

### Files Modified

| Language | File | Line |
|----------|------|------|
| Czech | `public/content/translations/cs/developers/tutorials/ai-trading-agent/index.md` | 446 |
| Japanese | `public/content/translations/ja/developers/tutorials/ai-trading-agent/index.md` | 445 |
| Portuguese-BR | `public/content/translations/pt-br/developers/tutorials/ai-trading-agent/index.md` | 447 |
| Urdu | `public/content/translations/ur/developers/tutorials/ai-trading-agent/index.md` | 446 |

### Before/After

**Czech:**
```diff
- `<b> ?` <a> : <c>`
+ `<b> ? <a> : <c>`
```

**Japanese:**
```diff
- `<b> ?` <a> : <c>`
+ `<b> ? <a> : <c>`
```

**Portuguese-BR:**
```diff
- `<b> ?` <a> : <c>`.`
+ `<b> ? <a> : <c>`.
```
(Also removed stray extra backtick at end)

**Urdu:**
```diff
- `<b> ?` ہوگا <a> : <c>`
+ `<b> ? <a> : <c>` ہوگا
```
(Reordered so angle brackets stay inside backticks)

## Related Context

### Prior Occurrences

- **Commit `76675a5717`** ("fix: escape angle brackets in translated MDX files") — Fixed the same class of issue across 18 languages in an earlier import. This confirms it is a recurring pattern.
- **Commit `3ef2bbb91e`** ("i18n: post-import sanitization") — Ran the existing sanitizer on the same tutorial content.
- **Commit `01fd093439`** ("fix(i18n): post_import_sanitize on ai-trading-agents") — Latest sanitizer run, which did not catch this particular pattern.

### Existing Sanitizer

The project has `src/scripts/i18n/post_import_sanitize.ts` with functions like `fixAsciiGuillemets()` that handle `<<`/`>>` conversions. However, it does **not** currently detect split backtick wrapping around single angle bracket expressions like `<a>`, `<b>`, `<c>`.

## Prevention Strategies

### 1. Add Sanitizer Rule (Recommended)

Add a `fixBareAngleBrackets()` function to `post_import_sanitize.ts` that:
- Scans each line for bare `<identifier>` patterns outside of backtick spans and code fences
- Compares with the English source to find the intended backtick-wrapped version
- Auto-fixes when the match is unambiguous; flags for manual review otherwise

### 2. Pre-Build Validation

Add a validation step that checks all translated MDX files for bare angle brackets outside code contexts before the build runs. This would catch issues before they reach Netlify.

### 3. Crowdin Configuration

- Lock inline code patterns containing angle brackets as "Do not translate" segments
- Add context notes warning translators about preserving backtick pairs around code expressions

## Verification

After applying fixes, confirm with a full build:

```bash
pnpm build
```

Check that the 4 previously-failing pages no longer produce MDX compilation errors.
