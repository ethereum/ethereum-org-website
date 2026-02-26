# Sanitizer Test Research: Patterns from PR Analysis

> **Date:** 2026-02-25
> **Source PRs:** #17544 (zh-tw), #17529 (sw), #17492 (ta), #17441 (bn), #17467 (ur), #17389 (de), #17182 (tr), #17132 (ja), #17090 (zh), #16979 (es)
> **Purpose:** Document new translation artifact patterns found during PR research, informing future sanitizer improvements and test coverage.

## New Patterns Not Yet Covered by Sanitizer

| # | Pattern | Source PR | Example | Severity |
|---|---------|-----------|---------|----------|
| 1 | Full-width parentheses break markdown links | zh-tw #17544 | `[text]（/url/）` instead of `[text](/url/)` | High — breaks navigation |
| 2 | Lorem ipsum placeholder left in JSON | zh #17090 | "Lorem ipsum dolor sit amet" in real translation value | Medium — user-visible |
| 3 | Protocol separator corruption | ta #17492 | `http.bitcoinmagazine.com` instead of `http://` | High — breaks links |
| 4 | Chinese text leaking into image paths | zh #17090 | `![alt](./file.png 中文)` | High — breaks images |
| 5 | Missing whitespace around inline HTML in JSON | es #16979 | `word<strong>word</strong>word` | Low — cosmetic |
| 6 | Crowdin `''text''` double-apostrophe artifacts | sw #17529 | 86 occurrences across 3 files | Medium — unnatural text |
| 7 | Translated `@username` GitHub handles | sw #17529 | `@axic` → `kwaaxic` | Medium — broken attribution |
| 8 | Translated interpolation placeholders in JSON | bn #17441 | `{appName}` → `{Bengali script}` | Critical — breaks rendering |
| 9 | Simplified Chinese contamination in zh-tw | zh-tw #17544 | `着` (simplified) instead of `著` (traditional) | Medium — wrong variant |
| 10 | "Gas" translated as "Sprit" (gasoline) in German | de #17389 | 31 replacements needed across files | Medium — semantic error |
| 11 | Dropped glossary links during translation | ur #17467 | Entire `<a href>` tag removed, only text remains | High — loses links |

## Patterns Already Handled by Sanitizer (Confirmed Working)

These patterns are covered by existing fix functions and should have regression tests:

- **Duplicated headings** (`fixDuplicatedHeadings`) — `## Text? Text? {#id}`
- **Broken markdown links** (`fixBrokenMarkdownLinks`) — `] (url)` space
- **Escaped bold/italic** (`fixEscapedBoldAndItalic`) — `\*\*text\*\*`
- **ASCII guillemets** (`fixAsciiGuillemets`) — `<<text>>`
- **Ticker transpositions** (`fixTickerTranspositions`) — `EHT` → `ETH`
- **MDX angle brackets** (`escapeMdxAngleBrackets`) — `<5GB`
- **Orphaned closing tags** (`removeOrphanedClosingTags`) — trailing `</a>`
- **Block component line breaks** (`fixBlockComponentLineBreaks`)
- **Frontmatter date normalization** (`normalizeFrontmatterDates`)
- **Frontmatter non-ASCII quoting** (`quoteFrontmatterNonAscii`)
- **Header ID sync** (`syncHeaderIdsWithEnglish`)
- **Brand tag restoration** (`fixBrandTags`)
- **Protected frontmatter sync** (`syncProtectedFrontmatterFields`)
- **Translated href detection** (`fixTranslatedHrefs`) — warn only
- **Cross-script contamination** (`detectCrossScriptContamination`)
- **Code fence drift** (`warnCodeFenceContentDrift`)
- **Backslash escape restoration** (`restoreDroppedBackslashEscapes`)
- **Unclosed backtick repair** (`repairUnclosedBackticks`)

## Recommendations for Future Sanitizer Iteration

1. **Full-width parentheses** (#1) — Add regex to normalize `（` → `(` and `）` → `)` inside markdown link syntax
2. **Translated interpolation placeholders** (#8) — Compare `{placeholder}` tokens between English and translated JSON; flag mismatches
3. **Protocol corruption** (#3) — Detect `http.` or `https.` followed by a domain and flag as potential `://` corruption
4. **Lorem ipsum detection** (#2) — Simple regex check in JSON values for "Lorem ipsum"
5. **Double-apostrophe artifacts** (#6) — Replace `''` with `'` in non-code contexts
6. **Translated @handles** (#7) — Compare `@username` patterns against English source

## Related Documentation

- [Post-Import Sanitizer Bugs Found During Japanese Review](./post-import-sanitizer-bugs-found-japanese-review.md)
- [Crowdin Import Review Agent Calibration](./crowdin-import-review-agent-calibration.md)
- [Crowdin File Path Mapping and Review Workflow](./crowdin-file-path-mapping-and-review-workflow.md)
