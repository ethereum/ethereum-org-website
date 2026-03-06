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
| 12 | Backslash before closing HTML tag | fr #17125 | `<strong>Bon à savoir\</strong>` — backslash inserted before `</` | Critical — breaks MDX compilation |
| 13 | Code fence drift — comments inside fence, code outside | fr #17125 | Crowdin puts translated comment inside `` ```python `` fence, leaves actual Python code as raw MDX | Critical — breaks MDX compilation |
| 14 | Translated word after bare `<` breaks MDX tag parsing | fr #17125 | `<Stockage[4]` — Crowdin translates `Storage` to `Stockage` but drops `\` escape before `<` | Critical — breaks MDX compilation |
| 15 | `fixBackslashBeforeClosingTag` too broad — strips `\</>` | fr #17125 | `\</>` in prose is a legitimate escape; stripping `\` exposes bare `</>` to MDX | Critical — breaks MDX compilation |
| 16 | Asymmetric backtick pair (single-open, double-close) | ru #17127 | `` `self.<name>`` `` — Crowdin doubles closing backtick, exposing `<name>` as raw HTML | Critical — breaks MDX compilation |

| 17 | Junk text after heading anchors | ko #17166 | `{#network-impact}네트워크-충격` -- Crowdin appends translated anchor IDs | Critical -- breaks rendering |
| 18 | Backtick-wrapped markdown links | ko #17166 | `` `[text](/path)` `` -- links rendered as inline code | High -- breaks navigation |
| 19 | Missing parentheses in link syntax | ko #17166 | `[text]https://url` or `[text]/path/` -- parens stripped | Critical -- breaks navigation |
| 20 | Missing `</em>` before `</li>` in HTML lists | ko #17166 | `<em>text.</li>` -- Crowdin drops closing `</em>` | Critical -- breaks MDX compilation |
| 21 | Image path `./` corrupted to `/.` | ko #17166 | `(/.computer.png)` instead of `(./computer.png)` | Critical -- ENOENT breaks build |
| 22 | Backtick split exposing bare `</>` or `<tag>` | ko #17166 | `` `<> ...` </>`) `` -- backtick closed early, `</>` exposed to MDX parser | Critical -- breaks MDX compilation |
| 23 | Inner quotes in JSX attribute break parsing | ko #17166 | `title="오해: "text""` -- `"` inside `title="..."` terminates attribute early | Critical -- breaks MDX compilation |
| 24 | `removeOrphanedClosingTags` strips valid `</em>` | ko #17166 | `<em>`...`` `CHAINID` ``...`</em></li>` -- inline backtick split puts `<em>` and `</em>` in different segments, making `</em>` look orphaned; sanitizer is not idempotent | Critical -- regression breaks MDX compilation |
| 25 | Tilde range notation triggers strikethrough | ko #17166 | `100만~200만 ... 65,536~97,152명` -- two `~` chars parsed as `<del>` by remark-gfm | High -- garbled rendering |
| 26 | Bold markers not parsed when adjacent to non-Latin text | ko #17166 | `**단일 슬롯 최종 승인(SSF)**으로` -- MDX emphasis parser requires word boundary after closing `**`; fix converts ONLY non-Latin-adjacent cases to `<strong>` HTML tags to preserve josa attachment; lookbehind prevents cross-boundary matching between closing `**` on one line and opening `**` on the next | High -- asterisks render literally |
| 27 | Italic markers not parsed when adjacent to non-Latin text | ko #17166 | `_G_가`, `*S*라고` -- same word-boundary issue as bold but for single `*` and `_` italic syntax; fix converts to `<em>` HTML tags; handles both asterisk and underscore variants | High -- asterisks/underscores render literally |
| 28 | Duplicate author frontmatter continuation line | pt-br #17122 | `author: Ori Pomerantz\n  Ori Pomerantz` -- Crowdin duplicates the author name on an indented YAML continuation line; parsed value becomes "Ori Pomerantz Ori Pomerantz" | High -- broken frontmatter metadata |
| 29 | Broken markdown link: `}` instead of `]` | pt-br #17122 | `[Mais em staking withdrawals}(/staking/withdrawals/)` -- Crowdin replaces closing `]` with `}`, breaking the link | High -- breaks navigation |
| 30 | TNF ticker transposition for NFT | pt-br #17122 | `TNF` instead of `NFT` -- 37 occurrences across pt-br files; pt-br uses `NFT` (356 occurrences) confirming TNF is a Crowdin error | Medium -- wrong acronym |
| 31 | Translated inline code content with orphaned backticks | pt-br #17122 | EN: `` pass `wallet`, the compiled `` -> PT: `passar a carteira \`, o arquivo` -- Crowdin translates content inside backticks, breaking the code span and leaving orphaned backticks | High -- broken inline code, stray backtick in prose |
| 32 | False-positive "Exposed MDX tag" for PascalCase components | PR #17702 | `<DocLink href="...">` flagged as exposed tag -- 384 false warnings across 72 files; DocLink is registered MDX component in MdComponents | Low -- false warning, no build impact |

## Patterns Already Handled by Sanitizer (Confirmed Working)

These patterns are covered by existing fix functions and should have regression tests:

- **Duplicated headings** (`fixDuplicatedHeadings`) — `## Text? Text? {#id}`
- **Broken markdown links** (`fixBrokenMarkdownLinks`) — `] (url)` space
- **Escaped bold/italic** (`fixEscapedBoldAndItalic`) — `\*\*text\*\*`; uses lookbehind to skip `\*` used as multiplication (e.g., `operand\*operand`)
- **ASCII guillemets** (`fixAsciiGuillemets`) — `<<text>>`
- **Ticker transpositions** (`fixTickerTranspositions`) — `EHT` → `ETH`, `TNF` → `NFT`, `TNFs` → `NFTs`; uses alphanumeric-only boundaries to match adjacent to markdown `_`
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
- **Backslash before closing tag** (`fixBackslashBeforeClosingTag`) — `\</strong>` → `</strong>`
- **Catastrophic code fence drift detection** (`warnCatastrophicCodeFenceDrift`) — prose/code boundaries swapped
- **Asymmetric backtick pairs** (`fixAsymmetricBackticks`) — `` `content`` `` → `` `content` `` (Crowdin doubles closing backtick)
- **Junk after heading anchors** (`fixJunkAfterHeadingAnchors`) — `{#id}translated-text` stripped (ko PR #17166)
- **Backtick-wrapped links** (`fixBacktickWrappedLinks`) — `` `[text](url)` `` → `[text](url)` (ko PR #17166)
- **Missing link parentheses** (`fixMissingLinkParentheses`) — `[text]https://url` → `[text](https://url)` (ko PR #17166)
- **Missing closing `</em>`** (`fixMissingClosingEmTag`) — `<em>text.</li>` → `<em>text.</em></li>` (ko PR #17166)
- **Image path `./` corruption** (`fixImagePathDotSlash`) — `](/.file.png)` → `](./file.png)` (ko PR #17166)
- **Exposed MDX tags warning** (`warnExposedMdxTags`) — bare `<tag>` or `</>` outside backticks (ko PR #17166); PascalCase tags (`<DocLink>`, etc.) are automatically treated as safe MDX components and skipped (PR #17702)
- **Inner quotes in JSX attributes** (`fixInnerQuotesInJsxAttributes`) — `title="text: "inner""` → `title="text: &quot;inner&quot;"` (ko PR #17166)
- **Orphan tag idempotency** (`removeOrphanedClosingTags`) — fenced-only split + inline-stripped counting prevents false orphan detection when `<em>` spans inline code (ko PR #17166)
- **Tilde strikethrough escape** (`escapeTildeStrikethrough`) — `100만~200만` → `100만\~200만` prevents remark-gfm `<del>` (ko PR #17166)
- **Bold adjacent non-Latin** (`fixBoldAdjacentNonLatin`) — `**text**가` → `<strong>text</strong>가` converts ONLY non-Latin-adjacent cases to HTML tags; uses lookbehind to prevent cross-boundary matching (ko PR #17166)
- **Italic adjacent non-Latin** (`fixItalicAdjacentNonLatin`) — `*text*가` / `_text_가` → `<em>text</em>가` mirrors bold fix for single `*` and `_` italic syntax (ko PR #17166)
- **Translated inline code warning** (`warnTranslatedInlineCode`) — warns when inline code span count drops significantly OR when orphaned backticks are detected on a line; signals Crowdin translated content inside backticks (pt-br PR #17122)

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
