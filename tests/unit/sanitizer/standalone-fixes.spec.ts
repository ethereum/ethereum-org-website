/**
 * Unit tests for standalone sanitizer fix functions.
 * These functions take only content (no English source needed).
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/i18n/post_import_sanitize"

const {
  fixDuplicatedHeadings,
  fixBrokenMarkdownLinks,
  fixEscapedBoldAndItalic,
  fixAsciiGuillemets,
  fixBlockComponentLineBreaks,
  fixTickerTranspositions,
  escapeMdxAngleBrackets,
  removeOrphanedClosingTags,
  normalizeFrontmatterDates,
  quoteFrontmatterNonAscii,
  normalizeBlockHtmlLines,
  toAsciiId,
  escapeRegex,
  extractHrefs,
  isInternalHref,
  splitIntoBlocks,
  fixBackslashBeforeClosingTag,
  fixAsymmetricBackticks,
  fixJunkAfterHeadingAnchors,
  fixBacktickWrappedLinks,
  fixMissingLinkParentheses,
  fixMissingClosingEmTag,
  fixImagePathDotSlash,
  fixInnerQuotesInJsxAttributes,
  escapeTildeStrikethrough,
  fixBoldAdjacentNonLatin,
  fixItalicAdjacentNonLatin,
} = _testOnly

test.describe("Standalone Fixes", () => {
  test.describe("fixDuplicatedHeadings", () => {
    test("removes duplicated heading text", () => {
      const input = "## What is Ethereum? What is Ethereum? {#what-is-ethereum}"
      const { content, fixCount } = fixDuplicatedHeadings(input)
      expect(content).toBe("## What is Ethereum? {#what-is-ethereum}")
      expect(fixCount).toBe(1)
    })

    test("leaves non-duplicated headings unchanged", () => {
      const input = "## Normal heading {#normal}"
      const { content, fixCount } = fixDuplicatedHeadings(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple headings with only some duplicated", () => {
      const input = [
        "## Good heading {#good}",
        "## Bad? Bad? {#bad}",
        "### Also fine {#fine}",
      ].join("\n")
      const { content, fixCount } = fixDuplicatedHeadings(input)
      expect(content).toContain("## Good heading {#good}")
      expect(content).toContain("## Bad? {#bad}")
      expect(content).toContain("### Also fine {#fine}")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixBrokenMarkdownLinks", () => {
    test("removes space between ] and (", () => {
      const input = "[text] (https://example.com)"
      const { content, fixCount } = fixBrokenMarkdownLinks(input)
      expect(content).toBe("[text](https://example.com)")
      expect(fixCount).toBe(1)
    })

    test("leaves correct links unchanged", () => {
      const input = "[text](https://example.com)"
      const { content, fixCount } = fixBrokenMarkdownLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("fixes multiple broken links in one string", () => {
      const input = "See [link1] (url1) and [link2]  (url2) for more."
      const { content, fixCount } = fixBrokenMarkdownLinks(input)
      expect(content).toBe("See [link1](url1) and [link2](url2) for more.")
      expect(fixCount).toBe(2)
    })
  })

  test.describe("fixEscapedBoldAndItalic", () => {
    test("unescapes bold markers", () => {
      const input = "This is \\*\\*bold\\*\\* text"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("This is **bold** text")
      expect(fixCount).toBe(1)
    })

    test("unescapes italic markers", () => {
      const input = "This is \\*italic\\* text"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("This is *italic* text")
      expect(fixCount).toBe(1)
    })

    test("skips table rows where escaped stars may be intentional", () => {
      const input = "| 2\\*\\*256 | exponent |"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code fences", () => {
      const input = "```\n\\*\\*bold\\*\\*\n```"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("fixes prose but skips table in mixed content", () => {
      const input = ["\\*\\*bold\\*\\* prose", "| 2\\*\\*256 | value |"].join(
        "\n"
      )
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toContain("**bold** prose")
      expect(content).toContain("| 2\\*\\*256 | value |")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixAsciiGuillemets", () => {
    test("converts << and >> to Unicode guillemets", () => {
      const input = "<<text>>"
      const { content, fixCount } = fixAsciiGuillemets(input)
      expect(content).toBe("\u00ABtext\u00BB")
      expect(fixCount).toBe(2)
    })

    test("skips inline code", () => {
      const input = "Use `<<operator>>` for shift"
      const { content, fixCount } = fixAsciiGuillemets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = "```\nresult = a << b\n```"
      const { content, fixCount } = fixAsciiGuillemets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixTickerTranspositions", () => {
    test("corrects EHT to ETH", () => {
      const input = "Send some EHT to the address"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("Send some ETH to the address")
      expect(fixCount).toBe(1)
    })

    test("corrects BSL to BLS and ECDAS to ECDSA", () => {
      const input = "BSL signatures use ECDAS"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("BLS signatures use ECDSA")
      expect(fixCount).toBe(2)
    })

    test("skips code fences", () => {
      const input = "```\nconst EHT = 'ticker'\n```"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips inline code", () => {
      const input = "The `EHT` variable is used here"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("escapeMdxAngleBrackets", () => {
    test("escapes < before digit", () => {
      const input = "Requires <5GB of disk space"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("Requires &lt;5GB of disk space")
      expect(fixCount).toBe(1)
    })

    test("escapes bare JSX fragment <>", () => {
      const input = "Returns <> from the function"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("Returns \\<> from the function")
      expect(fixCount).toBe(1)
    })

    test("escapes bare closing fragment </>", () => {
      const input = "Ends with </> here"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("Ends with \\</> here")
      expect(fixCount).toBe(1)
    })

    test("skips code blocks", () => {
      const input = "```\nif (x <5) return\n```"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not double-escape already escaped content", () => {
      const input = "Requires &lt;5GB of space"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not escape < that is already backslash-escaped", () => {
      // English uses \<1 GB to escape < in MDX prose.
      // The sanitizer must NOT convert \<1 to \&lt;1 (double-escape).
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
  })

  test.describe("removeOrphanedClosingTags", () => {
    test("removes trailing orphan </a> when paired closer exists", () => {
      const input = '<a href="/">Home</a> some prose </a>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe('<a href="/">Home</a> some prose')
      expect(fixCount).toBe(1)
    })

    test("leaves balanced tags unchanged", () => {
      const input = '<a href="/">Home</a>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code spans", () => {
      const input = "`</strong>` - description"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = "```html\n</a></a></a>\n```"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple orphan types on different lines", () => {
      const input = "text </a>\nmore text </strong>"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).not.toContain("</a>")
      expect(content).not.toContain("</strong>")
      expect(fixCount).toBe(2)
    })

    test("keeps first closer when one opener exists but two closers", () => {
      const input = '<a href="/">text</a></a>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe('<a href="/">text</a>')
      expect(fixCount).toBe(1)
    })

    test("preserves </em> when <em> spans across inline backticks", () => {
      const input =
        '  <li><a href="url">EIP-1344</a> – <em>`CHAINID` text.</em></li>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixBlockComponentLineBreaks", () => {
    test("adds newline before closing tag", () => {
      const input = "Some content</Card>"
      const { content, fixCount } = fixBlockComponentLineBreaks(input)
      expect(content).toBe("Some content\n</Card>")
      expect(fixCount).toBeGreaterThanOrEqual(1)
    })

    test("adds newline after opening tag", () => {
      const input = "<Card>Some content"
      const { content, fixCount } = fixBlockComponentLineBreaks(input)
      expect(content).toBe("<Card>\nSome content")
      expect(fixCount).toBeGreaterThanOrEqual(1)
    })

    test("leaves already separated tags unchanged in content", () => {
      const input = "<Card>\nSome content\n</Card>"
      const { content } = fixBlockComponentLineBreaks(input)
      // Content should be identical even if regex matches (replacement is a no-op)
      expect(content).toBe(input)
    })

    test("handles multiple component types", () => {
      const input = "text</ExpandableCard>\nmore</Alert>"
      const { content } = fixBlockComponentLineBreaks(input)
      expect(content).toContain("text\n</ExpandableCard>")
      expect(content).toContain("more\n</Alert>")
    })
  })

  test.describe("normalizeFrontmatterDates", () => {
    test("converts DD-MM-YYYY to ISO format", () => {
      const input = "---\npublished: 25-02-2026\n---\nContent"
      const { content, fixCount } = normalizeFrontmatterDates(input)
      expect(content).toContain("published: 2026-02-25")
      expect(fixCount).toBe(1)
    })

    test("converts DD/MM/YYYY with zero-padding", () => {
      const input = "---\npublished: 5/2/2026\n---\nContent"
      const { content, fixCount } = normalizeFrontmatterDates(input)
      expect(content).toContain("published: 2026-02-05")
      expect(fixCount).toBe(1)
    })

    test("leaves ISO dates unchanged", () => {
      const input = "---\npublished: 2026-02-25\n---\nContent"
      const { content, fixCount } = normalizeFrontmatterDates(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns unchanged when no frontmatter", () => {
      const input = "No frontmatter here"
      const { content, fixCount } = normalizeFrontmatterDates(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("quoteFrontmatterNonAscii", () => {
    test("quotes values with non-ASCII characters", () => {
      const input = "---\ntitle: \u00DCber Ethereum\n---\nContent"
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toContain('title: "\u00DCber Ethereum"')
      expect(fixCount).toBe(1)
    })

    test("leaves already-quoted values unchanged", () => {
      const input = '---\ntitle: "\u00DCber Ethereum"\n---\nContent'
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips YAML arrays", () => {
      const input = '---\ntags: ["\u00FCber", "test"]\n---\nContent'
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves ASCII-only values unchanged", () => {
      const input = "---\ntitle: About Ethereum\n---\nContent"
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("normalizeBlockHtmlLines", () => {
    test("splits inline closing tag to own line", () => {
      const input = "some text</section>"
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe("some text\n</section>")
    })

    test("leaves already-separated tags unchanged", () => {
      const input = "some text\n</section>"
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe(input)
    })
  })

  test.describe("Utility functions", () => {
    test("toAsciiId normalizes accented characters", () => {
      expect(toAsciiId("qu-est-ce-qu-ethereum")).toBe("qu-est-ce-qu-ethereum")
      expect(toAsciiId("\u00FCber-ethereum")).toBe("uber-ethereum")
    })

    test("toAsciiId strips non-ASCII non-alphanumeric chars", () => {
      // Each non-ASCII char (including NFD decomposition products) becomes "-"
      const result = toAsciiId("\u4F55\u304C-ethereum")
      expect(result).toMatch(/^-+-ethereum$/)
      expect(result).not.toContain("\u4F55")
      expect(result).not.toContain("\u304C")
    })

    test("escapeRegex escapes special regex characters", () => {
      expect(escapeRegex("foo.bar[0]")).toBe("foo\\.bar\\[0\\]")
      expect(escapeRegex("a+b*c")).toBe("a\\+b\\*c")
    })

    test("extractHrefs finds markdown and HTML hrefs", () => {
      const input =
        '[link](/path) and <a href="/other">text</a> and [ext](https://example.com)'
      const hrefs = extractHrefs(input)
      expect(hrefs.has("/path")).toBe(true)
      expect(hrefs.has("/other")).toBe(true)
      expect(hrefs.has("https://example.com")).toBe(true)
    })

    test("isInternalHref identifies internal links", () => {
      expect(isInternalHref("/about")).toBe(true)
      expect(isInternalHref("/en/docs")).toBe(true)
      expect(isInternalHref("//cdn.example.com")).toBe(false)
      expect(isInternalHref("https://example.com")).toBe(false)
    })

    test("splitIntoBlocks splits on blank lines", () => {
      const input = "Block one\n\nBlock two\n\nBlock three"
      const blocks = splitIntoBlocks(input)
      expect(blocks).toHaveLength(3)
      expect(blocks[0]).toBe("Block one")
      expect(blocks[1]).toBe("Block two")
      expect(blocks[2]).toBe("Block three")
    })
  })

  test.describe("fixBackslashBeforeClosingTag", () => {
    test("fixes backslash before </strong>", () => {
      const input = '<p className="mt-0"><strong>Bon à savoir\\</strong></p>'
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe(
        '<p className="mt-0"><strong>Bon à savoir</strong></p>'
      )
      expect(fixCount).toBe(1)
    })

    test("fixes backslash before </em>", () => {
      const input = "<em>some text\\</em>"
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe("<em>some text</em>")
      expect(fixCount).toBe(1)
    })

    test("fixes backslash before </a>", () => {
      const input = '<a href="/test">link text\\</a>'
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe('<a href="/test">link text</a>')
      expect(fixCount).toBe(1)
    })

    test("fixes multiple occurrences", () => {
      const input = "<strong>text1\\</strong> and <strong>text2\\</strong>"
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe("<strong>text1</strong> and <strong>text2</strong>")
      expect(fixCount).toBe(2)
    })

    test("leaves correct closing tags unchanged", () => {
      const input = "<strong>Bon à savoir</strong>"
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n<strong>text\\</strong>\n```"
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does NOT strip backslash from JSX fragment \\</>", () => {
      const input =
        "nous utilisons un composant vide (`<> ...` \\</>`) pour en faire un seul composant."
      const { content, fixCount } = fixBackslashBeforeClosingTag(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("escapeMdxAngleBrackets — extended patterns", () => {
    test("escapes bare < before word containing [", () => {
      const input = "| calldataload(4)<Stockage[4] calldataload(4) |"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("| calldataload(4)\\<Stockage[4] calldataload(4) |")
      expect(fixCount).toBe(1)
    })

    test("escapes multiple bare < before word[ patterns", () => {
      const input = "| <Stockage[4] foo | bar <Storage[2] baz |"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("| \\<Stockage[4] foo | bar \\<Storage[2] baz |")
      expect(fixCount).toBe(2)
    })

    test("leaves already-escaped \\<Word[ unchanged", () => {
      const input = "| calldataload(4)\\<Storage[4] |"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips <Word[ inside code blocks", () => {
      const input = "```\n<Storage[4]\n```"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not escape valid MDX component tags", () => {
      const input = '<Card title="test" />'
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips <digit inside inline backticks", () => {
      const input =
        "nibble `1` and nibbles `01` (both stored as `<01>`). To specify odd length"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips <hex inside inline backtick with long content", () => {
      const input =
        "`keccak256(<6661e9d6b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("escapes <digit in prose but not in adjacent inline code", () => {
      const input = "Use `<01>` for values <5GB"
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      expect(content).toBe("Use `<01>` for values &lt;5GB")
      expect(fixCount).toBe(1)
    })

    test("handles broken backtick parity without corrupting later code spans", () => {
      // Regression: patricia-merkle-trie line 82 had odd backtick count
      // `[ v0 ...` v15, vt ]` (Crowdin split the code span)
      // This caused parity flip, making `<01>` on line 92 land in prose
      const input = [
        "`branch` node `[ v0 ...` v15, vt ]`",
        "stored as `<01>`) to specify",
      ].join("\n")
      const { content, fixCount } = escapeMdxAngleBrackets(input)
      // The <01> is inside backticks and must NOT be escaped,
      // even though a broken backtick span above disrupts parity
      expect(content).not.toContain("&lt;01>")
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixAsymmetricBackticks", () => {
    test("fixes single-open double-close backtick pattern", () => {
      // Regression: Crowdin doubled the closing backtick in erc-721-vyper tutorial
      // `self.<имя переменной>`` → `self.<имя переменной>`
      const input =
        "Используйте `self.<имя переменной>`` (опять же, как и в Python)."
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe(
        "Используйте `self.<имя переменной>` (опять же, как и в Python)."
      )
      expect(fixCount).toBe(1)
    })

    test("does not touch valid double-backtick code spans", () => {
      // ``sender`` is a valid double-backtick code span
      const input = "токенов ``sender`` не менее"
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not touch triple backtick fences", () => {
      const input = "```python\ncode here\n```"
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("fixes asymmetric backtick at end of line", () => {
      const input = "Use `command``"
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe("Use `command`")
      expect(fixCount).toBe(1)
    })

    test("leaves balanced single backticks unchanged", () => {
      const input = "Use `self.<variable name>` as in Python."
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips content inside fenced code blocks", () => {
      const input = "```\n`broken``\n```"
      const { content, fixCount } = fixAsymmetricBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Pattern 17: Junk text after heading anchors (ko review PR #17166)
  // ─────────────────────────────────────────────────────────────────────────
  test.describe("fixJunkAfterHeadingAnchors", () => {
    test("removes Korean junk text after anchor ID", () => {
      const input =
        "## 덴쿤 네트워크 업그레이드는 어떤 문제를 해결하나요? {#network-impact}네트워크-충격"
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(
        "## 덴쿤 네트워크 업그레이드는 어떤 문제를 해결하나요? {#network-impact}"
      )
      expect(fixCount).toBe(1)
    })

    test("removes junk text with leading space after anchor", () => {
      const input =
        "## 이전 블롭 데이터는 어떻게 접근하나요? {#historical-access} 역사적인-접근"
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(
        "## 이전 블롭 데이터는 어떻게 접근하나요? {#historical-access}"
      )
      expect(fixCount).toBe(1)
    })

    test("handles multiple headings with junk", () => {
      const input = [
        "## Heading A {#id-a}한국어",
        "Some paragraph text.",
        "## Heading B {#id-b}더-텍스트",
      ].join("\n")
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(
        [
          "## Heading A {#id-a}",
          "Some paragraph text.",
          "## Heading B {#id-b}",
        ].join("\n")
      )
      expect(fixCount).toBe(2)
    })

    test("leaves clean anchors unchanged", () => {
      const input = "## Normal heading {#normal-heading}"
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves anchor followed by only whitespace unchanged", () => {
      const input = "## Title {#title}  "
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n## Code heading {#id}junk\n```"
      const { content, fixCount } = fixJunkAfterHeadingAnchors(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Pattern 18: Backtick-wrapped markdown links (ko review PR #17166)
  // ─────────────────────────────────────────────────────────────────────────
  test.describe("fixBacktickWrappedLinks", () => {
    test("unwraps a backtick-wrapped internal link", () => {
      const input =
        "이를 위해 `[배포](/developers/docs/smart-contracts/deploying/)`하기 전에"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe(
        "이를 위해 [배포](/developers/docs/smart-contracts/deploying/)하기 전에"
      )
      expect(fixCount).toBe(1)
    })

    test("unwraps a backtick-wrapped external link", () => {
      const input =
        "`[사용자에게 막대한 손실](https://rekt.news/leaderboard/)`로 이어질 수"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe(
        "[사용자에게 막대한 손실](https://rekt.news/leaderboard/)로 이어질 수"
      )
      expect(fixCount).toBe(1)
    })

    test("handles multiple backtick-wrapped links in one line", () => {
      const input = "`[link1](/path1)`와 `[link2](/path2)`를 참조하세요"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe("[link1](/path1)와 [link2](/path2)를 참조하세요")
      expect(fixCount).toBe(2)
    })

    test("leaves legitimate inline code unchanged", () => {
      const input = "Use `require()` for imports"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves regular markdown links unchanged", () => {
      const input = "[normal link](/path)"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n`[link](/path)`\n```"
      const { content, fixCount } = fixBacktickWrappedLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Pattern 19: Missing parentheses in link syntax (ko review PR #17166)
  // ─────────────────────────────────────────────────────────────────────────
  test.describe("fixMissingLinkParentheses", () => {
    test("fixes [text]https://url pattern", () => {
      const input = "- [EIP4844.com]https://www.eip4844.com/"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe("- [EIP4844.com](https://www.eip4844.com/)")
      expect(fixCount).toBe(1)
    })

    test("fixes [text]https://url with trailing text", () => {
      const input =
        "[Refik Anadol]https://x.com/refikanadol/status/1622623521104089090:는 모금"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe(
        "[Refik Anadol](https://x.com/refikanadol/status/1622623521104089090):는 모금"
      )
      expect(fixCount).toBe(1)
    })

    test("fixes [text]/internal/path/ pattern", () => {
      const input = "더 알아보기[이더리움 확장성]/roadmap/scaling/"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe("더 알아보기[이더리움 확장성](/roadmap/scaling/)")
      expect(fixCount).toBe(1)
    })

    test("leaves normal markdown links unchanged", () => {
      const input = "[text](https://example.com)"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves reference-style links unchanged", () => {
      const input = "[text][ref]"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple broken links", () => {
      const input = ["- [link1]https://a.com/", "- [link2]https://b.com/"].join(
        "\n"
      )
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe(
        ["- [link1](https://a.com/)", "- [link2](https://b.com/)"].join("\n")
      )
      expect(fixCount).toBe(2)
    })

    test("skips code blocks", () => {
      const input = "```\n[text]https://url.com\n```"
      const { content, fixCount } = fixMissingLinkParentheses(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixMissingClosingEmTag", () => {
    test("inserts missing </em> before </li>", () => {
      const input =
        '  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> \u2013 <em>`CHAINID` \uC635\uCF54\uB4DC\uB97C \uCD94\uAC00\uD558\uC5EC \uC7AC\uC0DD \uACF5\uACA9\uC73C\uB85C\uBD80\uD130 \uC774\uB354\uB9AC\uC6C0\uC744 \uBCF4\uD638\uD569\uB2C8\uB2E4.</li>'
      const { content, fixCount } = fixMissingClosingEmTag(input)
      expect(content).toBe(
        '  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> \u2013 <em>`CHAINID` \uC635\uCF54\uB4DC\uB97C \uCD94\uAC00\uD558\uC5EC \uC7AC\uC0DD \uACF5\uACA9\uC73C\uB85C\uBD80\uD130 \uC774\uB354\uB9AC\uC6C0\uC744 \uBCF4\uD638\uD569\uB2C8\uB2E4.</em></li>'
      )
      expect(fixCount).toBe(1)
    })

    test("leaves properly closed <em> unchanged", () => {
      const input =
        '  <li><a href="url">EIP-152</a> \u2013 <em>some text.</em></li>'
      const { content, fixCount } = fixMissingClosingEmTag(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple broken <li> items", () => {
      const input = [
        "  <li><em>first item.</li>",
        "  <li><em>second item.</em></li>",
        "  <li><em>third item.</li>",
      ].join("\n")
      const { content, fixCount } = fixMissingClosingEmTag(input)
      expect(content).toBe(
        [
          "  <li><em>first item.</em></li>",
          "  <li><em>second item.</em></li>",
          "  <li><em>third item.</em></li>",
        ].join("\n")
      )
      expect(fixCount).toBe(2)
    })

    test("skips code blocks", () => {
      const input = "```\n<li><em>broken.</li>\n```"
      const { content, fixCount } = fixMissingClosingEmTag(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixImagePathDotSlash", () => {
    test("fixes /.filename to ./filename in image syntax", () => {
      const input =
        "![\uCEF4\uD4E8\uD130 \uD654\uBA74\uC758 \uC774\uB354\uB9AC\uC6C0 \uB85C\uACE0](/.computer.png)"
      const { content, fixCount } = fixImagePathDotSlash(input)
      expect(content).toBe(
        "![\uCEF4\uD4E8\uD130 \uD654\uBA74\uC758 \uC774\uB354\uB9AC\uC6C0 \uB85C\uACE0](./computer.png)"
      )
      expect(fixCount).toBe(1)
    })

    test("also fixes in regular link syntax", () => {
      const input = "[link text](/.file.pdf)"
      const { content, fixCount } = fixImagePathDotSlash(input)
      expect(content).toBe("[link text](./file.pdf)")
      expect(fixCount).toBe(1)
    })

    test("leaves correct ./path unchanged", () => {
      const input = "![alt](./computer.png)"
      const { content, fixCount } = fixImagePathDotSlash(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves absolute /path unchanged", () => {
      const input = "![alt](/images/logo.png)"
      const { content, fixCount } = fixImagePathDotSlash(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n![alt](/.broken.png)\n```"
      const { content, fixCount } = fixImagePathDotSlash(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixInnerQuotesInJsxAttributes", () => {
    test("escapes inner quotes in title attribute", () => {
      const input =
        '<ExpandableCard\ntitle="\uC624\uD574: "\uB178\uB4DC\uB97C \uC2E4\uD589\uD558\uB824\uBA74 32 ETH\uB97C \uC2A4\uD14C\uC774\uD0B9\uD574\uC57C \uD569\uB2C8\uB2E4.""'
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toBe(
        '<ExpandableCard\ntitle="\uC624\uD574: &quot;\uB178\uB4DC\uB97C \uC2E4\uD589\uD558\uB824\uBA74 32 ETH\uB97C \uC2A4\uD14C\uC774\uD0B9\uD574\uC57C \uD569\uB2C8\uB2E4.&quot;"'
      )
      expect(fixCount).toBe(1)
    })

    test("escapes inner quotes in contentPreview attribute", () => {
      const input = 'contentPreview="\uAC70\uC9D3: "\uB0B4\uC6A9""'
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toBe(
        'contentPreview="\uAC70\uC9D3: &quot;\uB0B4\uC6A9&quot;"'
      )
      expect(fixCount).toBe(1)
    })

    test("handles multiple attributes with inner quotes", () => {
      const input = [
        "<ExpandableCard",
        'title="\uC624\uD574: "\uD14D\uC2A4\uD2B8""',
        'contentPreview="\uAC70\uC9D3: "\uB0B4\uC6A9"">',
      ].join("\n")
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toContain(
        'title="\uC624\uD574: &quot;\uD14D\uC2A4\uD2B8&quot;"'
      )
      expect(content).toContain(
        'contentPreview="\uAC70\uC9D3: &quot;\uB0B4\uC6A9&quot;">'
      )
      expect(fixCount).toBe(2)
    })

    test("leaves attributes without inner quotes unchanged", () => {
      const input =
        '<ExpandableCard\ntitle="Normal title without inner quotes">'
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves already-escaped &quot; unchanged", () => {
      const input = '<ExpandableCard\ntitle="Misconception: &quot;text&quot;">'
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = '```\ntitle="\uC624\uD574: "\uD14D\uC2A4\uD2B8""\\n```'
      const { content, fixCount } = fixInnerQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixBoldAdjacentNonLatin", () => {
    test("converts ** to <strong> when followed by Korean josa", () => {
      const input =
        "**\uB2E8\uC77C \uC2AC\uB86F \uCD5C\uC885 \uC2B9\uC778(SSF)**\uC73C\uB85C \uC54C\uB824\uC838"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(
        "<strong>\uB2E8\uC77C \uC2AC\uB86F \uCD5C\uC885 \uC2B9\uC778(SSF)</strong>\uC73C\uB85C \uC54C\uB824\uC838"
      )
      expect(fixCount).toBe(1)
    })

    test("converts ** to <strong> with verb suffix", () => {
      const input =
        "**\uCD5C\uC18C \uC2A4\uD14C\uC774\uD0B9 \uAE08\uC561\uC744 32 ETH\uB85C \uC124\uC815**\uD569\uB2C8\uB2E4."
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(
        "<strong>\uCD5C\uC18C \uC2A4\uD14C\uC774\uD0B9 \uAE08\uC561\uC744 32 ETH\uB85C \uC124\uC815</strong>\uD569\uB2C8\uB2E4."
      )
      expect(fixCount).toBe(1)
    })

    test("leaves bold with space after unchanged", () => {
      const input = "**some text** and more"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves bold followed by ASCII punctuation unchanged", () => {
      const input = "**text**, and **more**."
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = "```\n**text**\uAC00\uB098\uB2E4\n```"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles CJK characters (Chinese/Japanese)", () => {
      const input = "**\u6982\u8981**\u306B\u3064\u3044\u3066"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(
        "<strong>\u6982\u8981</strong>\u306B\u3064\u3044\u3066"
      )
      expect(fixCount).toBe(1)
    })

    test("does NOT match across line boundaries (regression)", () => {
      // This was the bridges/index.md bug: closing ** on line 1 paired
      // with opening ** on line 2 because [^*]+ crossed newlines
      const input = [
        "- **\uC2A4\uB9C8\uD2B8 \uACC4\uC57D \uC704\uD5D8 \u2014** \uC0AC\uC6A9\uC790 \uC790\uAE08",
        "- **\uAE30\uC220\uC801 \uC704\uD5D8 \u2014** \uC18C\uD504\uD2B8\uC6E8\uC5B4 \uC624\uB958",
      ].join("\n")
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("only converts second bold when first has space after", () => {
      const input = "**first** text **second**\uAC00"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe("**first** text <strong>second</strong>\uAC00")
      expect(fixCount).toBe(1)
    })

    test("leaves **text**: pattern unchanged", () => {
      const input =
        "- **\uC2E0\uB8B0\uAC00 \uD544\uC694 \uC5C6\uC74C(Trustless)**: \uAE30\uBCF8 \uB3C4\uBA54\uC778\uACFC"
      const { content, fixCount } = fixBoldAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixItalicAdjacentNonLatin", () => {
    test("converts *text* to <em> when followed by Korean josa", () => {
      const input =
        "_G_\uAC00 \uC788\uC2B5\uB2C8\uB2E4. _G_\uB97C \uACF1\uD560 \uC218"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(
        "<em>G</em>\uAC00 \uC788\uC2B5\uB2C8\uB2E4. <em>G</em>\uB97C \uACF1\uD560 \uC218"
      )
      expect(fixCount).toBe(2)
    })

    test("converts asterisk italic followed by Korean", () => {
      const input =
        "\uACF5\uC720 \uBE44\uBC00\uC778 *S*\uB77C\uACE0 \uD569\uB2C8\uB2E4"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(
        "\uACF5\uC720 \uBE44\uBC00\uC778 <em>S</em>\uB77C\uACE0 \uD569\uB2C8\uB2E4"
      )
      expect(fixCount).toBe(1)
    })

    test("handles italic with HTML sub tags inside", () => {
      const input = "*P<sub>pub</sub>*\uB97C \uC0AC\uC6A9\uD558\uC5EC"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(
        "<em>P<sub>pub</sub></em>\uB97C \uC0AC\uC6A9\uD558\uC5EC"
      )
      expect(fixCount).toBe(1)
    })

    test("leaves italic with space after unchanged", () => {
      const input = "*some text* and more"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves italic followed by ASCII punctuation unchanged", () => {
      const input = "*text*, and _more_."
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not match ** bold markers", () => {
      const input = "**\uD14D\uC2A4\uD2B8**\uAC00"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = "```\n_text_\uAC00\uB098\uB2E4\n```"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does NOT match across line boundaries", () => {
      const input = [
        "- *\uC704\uD5D8 \u2014* \uC0AC\uC6A9\uC790",
        "- *\uAE30\uC220\uC801 \uC704\uD5D8 \u2014* \uC18C\uD504\uD2B8\uC6E8\uC5B4",
      ].join("\n")
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles CJK characters (Japanese)", () => {
      const input = "*\u6982\u8981*\u306B\u3064\u3044\u3066"
      const { content, fixCount } = fixItalicAdjacentNonLatin(input)
      expect(content).toBe("<em>\u6982\u8981</em>\u306B\u3064\u3044\u3066")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("escapeTildeStrikethrough", () => {
    test("escapes tilde used as range between text", () => {
      const input = "100만~200만 이더"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe("100만\\~200만 이더")
      expect(fixCount).toBe(1)
    })

    test("escapes multiple tildes on the same line", () => {
      const input = "100만~200만 이더가 ... 65,536~97,152명의 검증자"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(
        "100만\\~200만 이더가 ... 65,536\\~97,152명의 검증자"
      )
      expect(fixCount).toBe(2)
    })

    test("leaves tildes in fenced code blocks", () => {
      const input = "```\n100~200\n```"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves already-escaped tildes unchanged", () => {
      const input = "100만\\~200만 이더"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves triple-tilde code fence markers unchanged", () => {
      const input = "~~~\ncode\n~~~"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves tildes in frontmatter unchanged", () => {
      const input = '---\ntitle: "2014년~현재"\n---\nBody text'
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves tildes inside markdown link URLs unchanged", () => {
      const input =
        "- [\uD615\uC2DD \uAC80\uC99D (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)"
      const { content, fixCount } = escapeTildeStrikethrough(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })
})
