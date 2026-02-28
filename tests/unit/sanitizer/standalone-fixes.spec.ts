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
})
