---
title: "Korean (ko) Translation Import - Crowdin Artifact Sanitization"
date: 2026-02-28
category: integration-issues
severity: critical
component: src/scripts/i18n/post_import_sanitize.ts
tags:
  - crowdin
  - i18n
  - translation
  - mdx-rendering
  - markdown-artifacts
  - sanitization
  - ko-translation
related_prs:
  - "17166"
status: resolved
description: |
  Three new Crowdin translation artifact patterns discovered during Korean (ko)
  translation import that break MDX rendering and navigation:
  1. Junk after heading anchors
  2. Backtick-wrapped links
  3. Missing link parentheses
  Additional manual issues: ERC number garbling, semantic inversions, broken
  cross-page links, garbled HTML in JSON translations, machine translation
  artifacts.
solution_summary: |
  - 3 new sanitizer functions in post_import_sanitize.ts
  - 19 new unit tests added (150 total passing)
  - Manual fixes applied to 9 files for non-automatable issues
test_file: tests/unit/sanitizer/standalone-fixes.spec.ts
test_coverage: "19 new unit tests (150 total passing)"
---

# Korean (ko) Translation Import: Crowdin Artifact Sanitization

> **PR:** #17166
> **Language:** Korean (ko)
> **Files reviewed:** 301 (255 markdown, 46 JSON)
> **Quality score:** 8.5/10 (post-fix)

## Problem

During review of Korean translation import PR #17166, three new deterministic
Crowdin artifact patterns were discovered that break MDX rendering and
navigation. These join the existing catalog of 16 known patterns documented in
[sanitizer-test-research.md](./sanitizer-test-research.md).

### Pattern #17: Junk After Heading Anchors

Crowdin treats the `{#anchor-id}` custom heading ID as translatable text and
appends its "translation" of the slug immediately after the closing brace:

```markdown
## Before (broken)
## Dencun {#network-impact}네트워크-충격

## After (fixed)
## Dencun {#network-impact}
```

**Severity:** Critical -- breaks heading rendering and TOC generation.

### Pattern #18: Backtick-Wrapped Links

Crowdin wraps entire inline markdown links inside backticks, converting
clickable links into inert inline code:

```markdown
## Before (broken)
이를 위해 `[배포](/developers/docs/smart-contracts/deploying/)`하기 전에

## After (fixed)
이를 위해 [배포](/developers/docs/smart-contracts/deploying/)하기 전에
```

**Severity:** High -- breaks navigation.

### Pattern #19: Missing Link Parentheses

Crowdin strips the parentheses that delimit the URL in a markdown link:

```markdown
## Before (broken)
- [EIP4844.com]https://www.eip4844.com/

## After (fixed)
- [EIP4844.com](https://www.eip4844.com/)
```

**Severity:** Critical -- breaks navigation.

## Root Cause

Crowdin's machine translation pipeline produces these artifacts because:

1. **Heading anchors**: Crowdin treats `{#slug}` as translatable content and
   generates a Korean "translation" of the slug text.
2. **Backtick wrapping**: Crowdin occasionally treats markdown link syntax as
   code, wrapping it in backticks during the translation pass.
3. **Parenthesis stripping**: Crowdin's link parsing sometimes drops the `()`
   delimiters when the translator edits the link text, leaving bare URLs.

All three are deterministic and machine-detectable, making automated
remediation viable.

## Solution

### Automated Fixes (3 New Functions)

All three functions live in `src/scripts/i18n/post_import_sanitize.ts` and
share the same structural pattern: split on code blocks first, skip
odd-indexed segments (code), then apply regex to prose segments only.

#### 1. `fixJunkAfterHeadingAnchors`

```typescript
function fixJunkAfterHeadingAnchors(content: string): {
  content: string
  fixCount: number
}
```

**Key regex:** `/(\{#-?[a-z0-9][-a-z0-9]*\})[ \t]*([^\s\n}][^\n]*)/g`

- `[ \t]*` (horizontal whitespace only) is critical -- `\s*` would cross
  newlines and eat subsequent paragraph content.
- `-?` before the anchor ID handles `{#-erc-777-vs-erc-20}` where Crowdin
  generates a leading dash.
- Secondary filter: only strips text containing non-ASCII characters or
  hyphenated Latin slugs, avoiding false positives on legitimate trailing
  content.

#### 2. `fixBacktickWrappedLinks`

```typescript
function fixBacktickWrappedLinks(content: string): {
  content: string
  fixCount: number
}
```

**Key regex:** `` /`(\[[^\]]+\]\([^)]+\))`/g ``

- Only matches when entire backtick span content is a complete markdown link.
- Legitimate inline code like `` `require()` `` does not match.
- Code-block split intentionally omits inline backticks from the splitter
  pattern, since the targets being fixed are themselves backtick-delimited.

#### 3. `fixMissingLinkParentheses`

```typescript
function fixMissingLinkParentheses(content: string): {
  content: string
  fixCount: number
}
```

**Key regex:** `/(\[[^\]]+\])((?:https?:\/\/|\/)[^\s[\]()<>\u3000-\u9FFF\uAC00-\uD7AF]*)/g`

- URL terminator includes Korean/CJK Unicode ranges to prevent absorbing
  adjacent prose characters.
- Trailing punctuation stripping: `[:.,;!?]+$` is split off the URL and
  re-appended as prose punctuation.
- Excludes reference-style links `[text][ref]`.

### Integration

The functions are wired into `processMarkdownFile` via the `applyFix` helper,
running after `fixBrokenMarkdownLinks` and before frontmatter normalization:

```typescript
applyFix(
  () => fixMissingLinkParentheses(content),
  (n) => `Fixed ${n} links with missing parentheses`
)
applyFix(
  () => fixBacktickWrappedLinks(content),
  (n) => `Unwrapped ${n} backtick-wrapped markdown links`
)
applyFix(
  () => fixJunkAfterHeadingAnchors(content),
  (n) => `Removed ${n} junk text fragments after heading anchors`
)
```

All three are exported via the `_testOnly` object for unit testing.

### Manual Fixes (9 Files)

These required manual intervention because the defects were semantically
ambiguous or involved data corruption that regex cannot distinguish from valid
content:

| File | Issue | Why Not Automatable |
|------|-------|---------------------|
| `ko/roadmap/dencun/index.md` | 6 junk anchors, 16 broken links | Links split across prose with no protocol prefix |
| `ko/roadmap/pectra/7702/index.md` | ERC-437->ERC-4337, Cons/Benefits swap, GitHub identifiers | Number garbling requires English source; semantic inversion |
| `ko/desci/index.md` | financial->scientific | Semantic inversion indistinguishable from valid translation |
| `ko/payments/index.md` | 5 broken links, brand names | Same link reconstruction problem as dencun |
| `ko/eth/supply/index.md` | Escaped bold, broken link | Mixed artifact types |
| `ko/erc-777/index.md` | Leading-dash anchor junk | Fixed manually before function was generalized |
| `page-layer-2-learn.json` | Garbled `<strong>` tags | JSON path, not markdown; separate validation |
| `page-layer-2-networks.json` | Nonsense label | Machine translation artifact |
| `page-what-is-ethereum.json` | Garbled tags + artifacts | JSON path limitation |

## Key Implementation Details

### `[ \t]*` vs `\s*`

Using `\s*` in `fixJunkAfterHeadingAnchors` allows the regex to match across
newlines, incorrectly treating the first word of the next paragraph as junk.
The `[ \t]*` constraint ensures matching stays on the same line. This was
caught by integration tests.

### Trailing Punctuation Stripping

Crowdin sometimes produces `[text]https://url:` where `:` is Korean
sentence-final punctuation grafted onto the URL. The function splits off
`/[:.,;!?]+$/` before wrapping in parentheses and re-appends it as plain
text: `[text](https://url):` rather than `[text](https://url:)`.

### Leading-Dash Anchors

The anchor regex includes `-?` to handle `{#-erc-777-vs-erc-20}`. Crowdin
generates a leading hyphen when the source heading starts with a special
character. Without `-?`, such anchors would not match.

### Code-Block Splitting Strategy

All functions use `content.split(codeBlockPattern)` where the pattern is in a
capture group. JavaScript's `String.prototype.split` with a captured group
preserves delimiters in the array. Odd-indexed elements are code blocks
(skipped); even-indexed are prose (processed).

`fixBacktickWrappedLinks` intentionally omits inline backticks from its
splitter -- including them would cause the targets to be skipped.

## Test Coverage

**File:** `tests/unit/sanitizer/standalone-fixes.spec.ts`

| Function | Tests | Key Cases |
|----------|-------|-----------|
| `fixJunkAfterHeadingAnchors` | 6 | Korean junk, leading-dash anchors, multiple headings, clean pass-through, code blocks |
| `fixBacktickWrappedLinks` | 6 | Internal/external links, multiple per line, legitimate code unchanged, code blocks |
| `fixMissingLinkParentheses` | 7 | External URLs, internal paths, trailing punctuation, reference-style exclusion, code blocks |

**Total:** 19 new tests, 150 passing across all sanitizer functions.

## Prevention & Best Practices

### Automated (Sanitizer Catches)

- All three patterns run automatically on every Crowdin import
- Results logged with fix counts per file
- No manual intervention needed for these specific artifacts

### Manual Review Still Needed

- **Semantic inversions** (Benefits/Cons swap, financial/scientific)
- **ERC/EIP number garbling** (context-dependent; requires English source)
- **HTML tag corruption in JSON** (separate code path from markdown)
- **Machine translation nonsense** (requires fluency in target language)
- **Dropped glossary links** (detecting missing HTML requires source comparison)

### Korean-Specific Guidance

- Heading anchor junk is **almost always present** in Korean imports
- CJK languages (Korean, Chinese, Japanese) share similar Crowdin patterns
- Pages with many links (roadmap, ERC standards) need extra attention
- JSON translations should be checked for HTML tag integrity separately

### Recommendations for Future Imports

1. Always run sanitizer before manual review
2. Pay special attention to roadmap pages (dense link content)
3. Check JSON translations for `<strong>` / `<a>` tag integrity
4. Run cross-language spot checks if a new pattern emerges in one locale

## Related Documentation

- [Sanitizer Test Research: Pattern Catalog](./sanitizer-test-research.md) -- Patterns #17-19
- [Post-Import Sanitizer Bugs: Japanese Review](./post-import-sanitizer-bugs-found-japanese-review.md) -- Sibling review documenting 5 sanitizer design principles
- [Crowdin Import Review Agent Calibration](./crowdin-import-review-agent-calibration.md) -- Calibrated agent framework for translation reviews
- [Crowdin File Path Mapping and Review Workflow](./crowdin-file-path-mapping-and-review-workflow.md) -- 8-step worktree review workflow
- [Crowdin Translation Sanitizer: MDX Build Failures](../build-errors/crowdin-translation-sanitizer-mdx-fence-bugs.md) -- MDX-specific patterns from French review
- [Translation href Sync Issues](./translation-href-sync-issues.md) -- href corruption patterns in JSON files
- [Scaling Translation Review Pipeline](../translation-review/scaling-translation-review-pipeline.md) -- Strategic roadmap for 178 translation PRs
