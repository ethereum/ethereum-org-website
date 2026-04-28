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
| 33 | LLM artifact tokens exposed in MDX | PR #17730 (mr) | `कृ<bos>ितपणे` -- `<bos>` (beginning-of-sequence) token from machine translation leaks into prose; MDX parser treats it as unrecognized JSX component; other tokens: `<eos>`, `<s>`, `</s>`, `<pad>`, `<unk>`, `<mask>` | Critical -- breaks MDX compilation |
| 34 | Smart/curly quotes in JSX attribute values | PR #17770 (cs,de,pl,zh) | `<YouTube id=\u201Du8XvkTrjITs\u201D />` -- Crowdin or LLM replaces straight `"` with smart quotes (U+201C/U+201D/U+201E) inside JSX component attribute values; MDX parser expects `"` or `'` to delimit attributes | Critical -- breaks MDX compilation |
| 35 | Crowdin boilerplate injected mid-paragraph | ar #17105 | `...مشفّر. نشكرك على مشاركتك في برنامج الترجمة ethereum.org. أبسط معاملة...` -- Crowdin thank-you message injected between sentences in transactions/index.md; legitimate as standalone line in translation-program pages | Medium -- garbled content |
| 36 | Duplicated tag values (concatenated with self) | ar #17105 | `"ERC-721ERC-721"` in frontmatter tags and JSON glossary -- Crowdin concatenates the tag value with itself; found in 5 files (3 MD + 2 JSON) | Medium -- wrong tag value |
| 37 | Brand name garbled as Arabic transliteration "يجتبه" | ar #17105 | `[يجتبه](https://github.com/...)` -- "GitHub" consistently garbled across 15 files, 82 occurrences; appears to be Crowdin TM artifact | High -- wrong brand name, user-visible |
| 38 | Brand name "Solidity" literally translated as "الصلابة" | ar #17105 | `tags: ["الصلابة", "Waffle"]` -- programming language name translated as its literal meaning "hardness"; found in 3 Waffle tutorial files | Medium -- wrong brand name in tags |
| 39 | Abbreviation stripped from parentheses in frontmatter | ar #17105 | `title: "الأصول الحقيقية ()"` -- English has `(RWA)` but Crowdin strips the Latin abbreviation leaving empty parens; also found for `(PoA)` | Medium -- missing abbreviation |
| 40 | Base digit merged into `<sup>` exponent tag | ar #17105 | EN: `2<sup>256</sup>` -> AR: `<sup>2256</sup>` -- Crowdin absorbs the base number into the superscript, making exponent unreadable. Detectable by comparing `<sup>` contents against English. | High -- wrong math rendering |
| 41 | Missing opening `<sup>` on footnote links | ar #17105 | EN: `<sup>[fn3](#notes)</sup>` -> AR: `[fn3](#notes)</sup>` -- Crowdin drops the opening `<sup>` tag, leaving an orphaned `</sup>`. Detectable by finding `</sup>` without matching `<sup>`. | High -- broken markup |
| 42 | Split bold with escaped closing markers | ar #17105 | EN: `**full paragraph bold.**` -> AR: `**first sentence.** rest of text.\*\*` -- Crowdin splits a bold block by closing `**` mid-paragraph, then appends escaped `\*\*` at the end. The escaped markers render as literal asterisks. Fix: compare bold spans against English; detect `\*\*` preceded by an earlier premature `**` close. | High -- broken formatting, visible asterisks |
| 43 | Crowdin numbered tag placeholders exposed | ar #17105 | EN: `<strong>text</strong>` -> AR: `</0>text&lt;0>` or `</0>text<0>` -- Crowdin replaces HTML tags with numbered placeholders `<0>`, `<1>` etc. during translation, but fails to restore them. Tags are inverted (closer first) and/or HTML-escaped. Fix: map `<N>`/`</N>` back to actual tags by comparing against English source. | Critical -- breaks MDX |
| 44 | Known wrong Arabic compound terms for "state" | ar #17105 | "قنوات الدولة" (nation-state channels) for "state channels", "بيانات الدولة" (nation-state data) for "state data", "انعدام الجنسية" (statelessness as nationality) for "statelessness". 32+ occurrences across 4+ files. Fix: map of known wrong compounds -> correct ones. | High -- wrong meaning |
| 45 | "Ether" translated as "الإيثار" (altruism) | ar #17105 | Crowdin/MT translates "ether" as "الإيثار" (altruism, a real Arabic word) instead of "الإيثر" (transliteration). Same class as brand garble corrections. | Medium -- wrong term |
| 46 | `normalizeBlockHtmlLines` splits single-line `<div>content</div>` | id i18n/id-03-23T2228 | EN: `<div>text</div>` (one line) -> sanitizer splits to `<div>text\n</div>` (two lines) -- `normalizeBlockHtmlLines` unconditionally splits closing block HTML tags to their own line, even when the opening tag is on the same line (inline usage). MDX treats the split content as a paragraph and fails: "Expected a closing tag for `<div>` before the end of `paragraph`". Found in 6 files across 5 languages (id, tr, pt-br, ja, es). | Critical -- breaks MDX compilation |

| 47 | Unquoted frontmatter value with YAML-special characters | it #17841 | `description: Una spiegazione degli account di Ethereum: le loro strutture dati...` -- colon-space (`: `) inside unquoted YAML value triggers `YAMLParseError: Nested mappings are not allowed`; existing `quoteFrontmatterNonAscii` only quotes values with non-ASCII chars, missing pure-ASCII values with YAML-special sequences | Critical -- breaks build |

| 48 | `collapseInlineHtmlFromEnglish` matches across code fences and newlines | it #17841 | Inside ````tsx` fence: `<div>{error?.message}</div>\n \n</div>` -- regex `\s*</div>` crosses the blank line and collapses a separate `</div>` onto the previous line, producing `<div>{error?.message}</div></div>`. Two bugs: (1) no code fence protection, (2) `\s*` matches newlines allowing cross-line grabs | High -- corrupts code examples |
| 49 | Lowercased MDX component name | de #17842 | `<emoji text=":tada:" size={1} />` instead of `<Emoji .../>` -- translation pipeline lowercases the PascalCase MDX component tag; MDX component names are case-sensitive, so the lowercased tag won't resolve to the registered component | Critical -- breaks rendering |
| 50 | `removeOrphanedClosingTags` strips valid cross-line `</em>` | de #17842 | `<em>\ntext</em></li>` -- `<em>` is on line N, `</em>` is on line N+1; line-by-line counting sees no opener on line N+1 and strips `</em>` as orphaned, breaking MDX compilation. Regression from sanitizer's own orphan removal logic. | Critical -- breaks MDX compilation |

| 49 | Orphaned `</em>` BEFORE `<a>` in HTML list items | pl #17445 | `<li></em><a href="...">EIP-145</a> - <em>text</li>` -- `</em>` appears before its opener `<em>`; `removeOrphanedClosingTags` sees balanced open/close counts on the line so doesn't remove it | Critical -- breaks MDX compilation |
| 50 | Smart quote double-wrapping in YAML frontmatter | pl #17445 | `summaryPoint1: ""text""` -- value had smart quotes `\u201C...\u201D`; `quoteFrontmatterNonAscii` saw non-ASCII, didn't recognize smart quotes as existing quoting, wrapped in straight quotes producing double-wrapping | Critical -- breaks YAML parsing |
| 51 | Extra spaces around `=` in JSX attributes | pl #17445 | `<a href = "https://...">` -- Crowdin introduces spaces around `=` in href and other JSX attributes; no sanitizer function normalizes this | High -- may break strict MDX parsers |
| 52 | Orphaned opening backtick with missing closer | pl #17445 | `` `<nazwa opcodu>(...). `` -- opening backtick with no closing backtick; `repairUnclosedBackticks` needs English comparison and may miss cases where English also has backticks but the translated line lost one | High -- exposed MDX tags |
| 53 | Crowdin misplaces closing backtick before JSX fragment closer | sw #17521 | EN: `` (`<> ... </>`) `` -> SW: `` (`<> ...` </>) `` -- Crowdin moves closing backtick before `</>`, then `escapeMdxAngleBrackets` escapes the exposed `</>` as `\</>`. Fix: detect `` `<content>` </>) `` pattern and move closing backtick to include `</>` | Critical -- breaks MDX display |
| 54 | Double punctuation after orphaned tag removal | sw #17521 | `kutoa.</em></em>.` -> `kutoa..` -- `removeOrphanedClosingTags` strips orphaned `</em>` tags but leaves behind double periods where the tag sat between two periods. Fix: collapse `..` to `.` after orphan removal | Low -- cosmetic but noticeable |
| 55 | Escaped quotes `\"` in MDX JSX attributes | sw #17521 | `<ButtonLink variant=\"outline-color\" href=\"/roadmap/\">` -- Crowdin backslash-escapes quotes in JSX attributes; valid in JSON but breaks MDX compilation | Critical -- breaks build |
| 56 | Translated interpolation placeholders in JSON | sw #17521 | EN: `{days}` -> SW: `{siku}` -- Crowdin translates the variable name inside `{}` braces; the app expects the English key name | Critical -- breaks rendering |

## Patterns Already Handled by Sanitizer (Confirmed Working)

These patterns are covered by existing fix functions and should have regression tests:

- **Duplicated headings** (`fixDuplicatedHeadings`) -- `## Text? Text? {#id}`
- **Broken markdown links** (`fixBrokenMarkdownLinks`) -- `] (url)` space
- **Escaped bold/italic** (`fixEscapedBoldAndItalic`) -- `\*\*text\*\*`; uses lookbehind to skip `\*` used as multiplication (e.g., `operand\*operand`)
- **ASCII guillemets** (`fixAsciiGuillemets`) -- `<<text>>`
- **Ticker transpositions** (`fixTickerTranspositions`) -- `EHT` -> `ETH`, `TNF` -> `NFT`, `TNFs` -> `NFTs`; uses alphanumeric-only boundaries to match adjacent to markdown `_`
- **MDX angle brackets** (`escapeMdxAngleBrackets`) -- `<5GB`
- **Orphaned closing tags** (`removeOrphanedClosingTags`) -- trailing `</a>`
- **Block component line breaks** (`fixBlockComponentLineBreaks`)
- **Brand capitalization** (`fixBrandCapitalization`) -- `Github` -> `GitHub`, `Metamask` -> `MetaMask`; skips URLs (github.com etc.) and code blocks. Added in uk PR #17472 review.
- **Guillemet false positive on short words** (`fixGuillemetsInHtmlTags` bugfix) -- Previously converted guillemet-quoted words like `<<cat>>` to `<cat>` because `^[a-z]{1,4}$` was too broad. Fixed to use HTML tag whitelist. Found in uk PR #17472 (RLP file).
- **Multi-line YAML brand tags** (`fixBrandTags` bugfix) -- Tags regex `[^\]]*` didn't match newlines in multi-line YAML arrays. Fixed to `[\s\S]*?`. Found in uk PR #17472 (wagmi tutorial).
- **Brand tag list expanded** -- Added React, Vite, Wagmi, Noir to `PROTECTED_BRAND_NAMES`. Found missing during uk PR #17472 when "react" -> "react/respond" semantic mistranslation in tags wasn't caught.
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
- **LLM artifact token stripping** (`stripLlmArtifactTokens`) — strips `<bos>`, `<eos>`, `<s>`, `</s>`, `<pad>`, `<unk>`, `<mask>` tokens from prose; these leak from machine translation pipelines and break MDX compilation (mr PR #17730)
- **Block HTML inline usage preserved** (`normalizeBlockHtmlLines`) — no longer splits `<div>content</div>` when both tags are on the same line; only splits multi-line block closing tags to their own line. Fixes MDX "Expected a closing tag before end of paragraph" error (id i18n/id-03-23T2228, pattern #46)
- **Lowercased MDX component names** (`fixLowercasedMdxComponents`) — `<emoji>` -> `<Emoji>` restores PascalCase from English source; translation pipelines occasionally lowercase custom component tags, and MDX component names are case-sensitive (de PR #17842, pattern #49)
- **Orphaned closer-before-opener** (`removeOrphanedClosingTags`) — `</em><a>...<em>text</em>` now correctly removes the leading `</em>` even when open/close counts are equal on the line; uses left-to-right balance scanning instead of simple count comparison (pl PR #17445, pattern #50)
- **Smart quote double-wrapping prevention** (`quoteFrontmatterNonAscii`) — replaces smart/curly quotes (U+201C/U+201D/U+201E/U+201F) with straight `"` before checking if YAML value needs quoting, preventing `""text""` double-wrapping (pl PR #17445, pattern #51)
- **JSX attribute spacing** (`fixJsxAttributeSpacing`) — normalizes `href = "..."` to `href="..."` inside HTML/JSX tags; Crowdin sometimes introduces spaces around `=` in attributes (pl PR #17445, pattern #52)
- **Escaped backtick inside inline code** (escaped-backtick fix) — `\`` replacement now skips inline code spans to preserve `\` as legitimate content in `` `\` ``; previously stripped the backslash leaving empty backticks `` `` `` (bn PR #17866, pattern #53)
- **Block component regex over-matching** (`fixBlockComponentLineBreaks`) — `Alert` regex no longer matches `AlertTitle`/`AlertEmoji` etc.; added negative lookahead `(?![A-Za-z])` after component name to prevent prefix matching (bn PR #17866, pattern #54)

- **Bare LTR values in RTL** (`fixBareRtlValues`) -- numbers with Latin units (32 ETH, 100 Gwei), percentages (12.5%), currency ($2,500 USD), version/protocol IDs (EIP-1559), large formatted numbers (21,000), multipliers (2x) unwrapped in ar/ur files get `<span dir="ltr">` wrapping. Skips code blocks, inline code, URLs, existing spans, frontmatter. (gemini-v4, pattern #55)
- **Unit outside BiDi span** (`fixUnitOutsideSpan`) -- Gemini sometimes produces `<span dir="ltr">$100,000</span> USD` with the unit outside; corrected to `<span dir="ltr">$100,000 USD</span>`. Matches known Latin units (ETH, BTC, Gwei, USD, etc.). (gemini-v4, pattern #56)

- **Misaligned closing code fences** (`fixMisalignedCodeFences`) -- indented opening fences (4 spaces) with unindented closing fences, breaking syntax highlighting and parsers. Systematic across Gemini translations of files with list-item code blocks (e.g., `ethereum-for-web2-auth` in id, it locales). (gemini-v4/Anchor bug report, pattern #57)

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
