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
  fixMisplacedBacktickAroundJsxFragment,
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
  fixDuplicateFrontmatterAuthor,
  fixBrokenBracketInLinks,
  stripLlmArtifactTokens,
  fixSmartQuotesInJsxAttributes,
  stripCrowdinBoilerplate,
  fixDuplicatedTagValues,
  fixKnownBrandGarbles,
  fixMissingOpeningSup,
  fixSplitBoldMarkers,
  fixKnownWrongCompounds,
  fixGuillemetsInHtmlTags,
  fixMissingComponentClosingTags,
  fixMangledDocLinks,
  fixBrandCapitalization,
  fixFrontmatterLang,
  fixCrossScriptPunctuation,
  fixJsxAttributeSpacing,
  fixSpanWrappedBackticks,
  fixBoldWrappedOrderedListNumerals,
  fixEscapedQuotesInJsxAttributes,
  fixTranslatedJsonPlaceholders,
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

    test("preserves escaped asterisks used as multiplication signs", () => {
      const input =
        "_account<sub>new</sub> = condition<sub>result</sub>\\*i + (1-condition<sub>result</sub>)\\*account<sub>old</sub>_"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("preserves standalone escaped asterisks adjacent to operands", () => {
      const input = "result = a\\*b + c\\*d"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("still fixes italic when preceded by whitespace", () => {
      const input = "This is \\*italic text\\* here"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("This is *italic text* here")
      expect(fixCount).toBe(1)
    })

    test("still fixes italic at start of line", () => {
      const input = "\\*italic\\* at start"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("*italic* at start")
      expect(fixCount).toBe(1)
    })

    test("still fixes bold when preceded by whitespace", () => {
      const input = "This is \\*\\*bold text\\*\\* here"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("This is **bold text** here")
      expect(fixCount).toBe(1)
    })

    test("uses <strong> when bold is followed by Korean characters", () => {
      const input =
        "\\*\\*명문화된 제안자-빌더 분리(ePBS 또는 EIP-7732)\\*\\*는 제안자의 작업과"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe(
        "<strong>명문화된 제안자-빌더 분리(ePBS 또는 EIP-7732)</strong>는 제안자의 작업과"
      )
      expect(fixCount).toBe(1)
    })

    test("uses <strong> when bold is preceded and followed by CJK characters", () => {
      const input = "关于\\*\\*共识机制\\*\\*的讨论"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("关于<strong>共识机制</strong>的讨论")
      expect(fixCount).toBe(1)
    })

    test("uses ** when bold is followed by whitespace (Arabic with space)", () => {
      const input = "\\*\\*الترقية\\*\\* ستكون"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("**الترقية** ستكون")
      expect(fixCount).toBe(1)
    })

    test("uses <em> when italic is followed by Korean characters", () => {
      const input = "\\*이탈릭\\*은 텍스트"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("<em>이탈릭</em>은 텍스트")
      expect(fixCount).toBe(1)
    })

    test("uses ** when bold is followed by ASCII punctuation", () => {
      const input = "\\*\\*bold text\\*\\*. More text"
      const { content, fixCount } = fixEscapedBoldAndItalic(input)
      expect(content).toBe("**bold text**. More text")
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

    test("corrects TNF to NFT", () => {
      const input = "Um TNF é um token único"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("Um NFT é um token único")
      expect(fixCount).toBe(1)
    })

    test("corrects TNFs to NFTs", () => {
      const input = "representados como TNFs na Ethereum"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("representados como NFTs na Ethereum")
      expect(fixCount).toBe(1)
    })

    test("corrects TNF adjacent to markdown italic underscore", () => {
      const input = "_propriedade de TNF_"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("_propriedade de NFT_")
      expect(fixCount).toBe(1)
    })

    test("corrects ETTH to ETH", () => {
      const input = "As avaliações atuais de 1 ETTH"
      const { content, fixCount } = fixTickerTranspositions(input)
      expect(content).toBe("As avaliações atuais de 1 ETH")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixMisplacedBacktickAroundJsxFragment", () => {
    test("moves closing backtick to wrap </> in code span", () => {
      const input = "tunatumia kipengele tupu (`<> ...` </>) ili kuzifanya"
      const { content, fixCount } = fixMisplacedBacktickAroundJsxFragment(input)
      expect(content).toBe(
        "tunatumia kipengele tupu (`<> ... </>`) ili kuzifanya"
      )
      expect(fixCount).toBe(1)
    })

    test("fixes already-escaped \\</> variant", () => {
      const input = "tunatumia kipengele tupu (`<> ...` \\</>) ili kuzifanya"
      const { content, fixCount } = fixMisplacedBacktickAroundJsxFragment(input)
      expect(content).toBe(
        "tunatumia kipengele tupu (`<> ... </>`) ili kuzifanya"
      )
      expect(fixCount).toBe(1)
    })

    test("leaves correct backtick placement unchanged", () => {
      const input = "we use an empty component (`<> ... </>`) to combine"
      const { content, fixCount } = fixMisplacedBacktickAroundJsxFragment(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = "```tsx\n(`<> ...` </>)\n```"
      const { content, fixCount } = fixMisplacedBacktickAroundJsxFragment(input)
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

    test("preserves </em> when <em> is on previous line", () => {
      const input =
        '  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>\nweitere Änderungen der Gaspreisverfahrenscodes.</em></li>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("collapses double period after orphaned tag removal", () => {
      const input = "funguo za BLS za kutoa.</em></em>. Ili mthibitishaji"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe("funguo za BLS za kutoa. Ili mthibitishaji")
      expect(fixCount).toBe(2)
    })

    test("collapses double comma after orphaned tag removal", () => {
      const input = "first,</em>, second"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe("first, second")
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

    test("preserves blank lines before closing tags", () => {
      const input =
        "Some paragraph text.\n\n</ExpandableCard>\n\n<ExpandableCard"
      const { content } = fixBlockComponentLineBreaks(input)
      expect(content).toBe(input)
    })

    test("preserves blank lines between AlertContent and Alert closing tags", () => {
      const input = "</AlertContent>\n</Alert>"
      const { content } = fixBlockComponentLineBreaks(input)
      // Should NOT insert a blank line between them
      expect(content).toBe(input)
    })

    test("does not break AlertTitle onto new line (Alert must not match AlertTitle)", () => {
      const input =
        "<AlertContent>\n<AlertTitle>Do not confuse with zkEVM</AlertTitle>"
      const { content } = fixBlockComponentLineBreaks(input)
      // AlertTitle is NOT a block component; it should stay on one line
      expect(content).toContain(
        "<AlertTitle>Do not confuse with zkEVM</AlertTitle>"
      )
    })

    test("does not break AlertDescription onto new line", () => {
      const input = "<AlertDescription>Some warning text</AlertDescription>"
      const { content } = fixBlockComponentLineBreaks(input)
      // AlertDescription IS in BLOCK_MDX_COMPONENTS, so its opening/closing get line-broken
      // But the close regex should still work correctly
      expect(content).toContain("</AlertDescription>")
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

    test("quotes values containing colon-space (YAML nested mapping)", () => {
      const input =
        "---\ndescription: Una spiegazione degli account di Ethereum: le loro strutture dati.\n---\nContent"
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toContain(
        'description: "Una spiegazione degli account di Ethereum: le loro strutture dati."'
      )
      expect(fixCount).toBe(1)
    })

    test("quotes values containing hash (YAML comment)", () => {
      const input = "---\ntitle: Section #1 overview\n---\nContent"
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toContain('title: "Section #1 overview"')
      expect(fixCount).toBe(1)
    })

    test("leaves colon-space in already-quoted values unchanged", () => {
      const input =
        '---\ndescription: "Ethereum accounts: their data structures"\n---\nContent'
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

    test("preserves single-line div with content (inline usage)", () => {
      const input =
        "<div>Founders, need help? [Head over to Support](/founders/)</div>"
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe(input)
    })

    test("preserves single-line div with nested HTML", () => {
      const input =
        "<div><b>Wallet installed?</b><br/>Learn how to use it.</div>"
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe(input)
    })

    test("preserves single-line div inside Alert component", () => {
      const input = [
        '<Alert variant="update" className="mt-8">',
        '<Emoji text="\uD83C\uDF97\uFE0F" />',
        "<div>Para pendiri, butuh bantuan? [Kunjungi](/founders/)</div>",
        "</Alert>",
      ].join("\n")
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe(input)
    })

    test("still splits multi-line div closing tag", () => {
      const input = "line one\nline two</div>"
      const result = normalizeBlockHtmlLines(input)
      expect(result).toBe("line one\nline two\n</div>")
    })

    test("idempotent on already-correct content", () => {
      const input =
        "<div>Founders, need help? [Head over to Support](/founders/)</div>"
      const result1 = normalizeBlockHtmlLines(input)
      const result2 = normalizeBlockHtmlLines(result1)
      expect(result1).toBe(result2)
      expect(result1).toBe(input)
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

  test.describe("fixDuplicateFrontmatterAuthor", () => {
    test("removes duplicate author continuation line", () => {
      const input = `---
title: Merkle proofs
author: Ori Pomerantz
  Ori Pomerantz
tags: ["storage"]
---

Content here.`
      const { content, fixCount } = fixDuplicateFrontmatterAuthor(input)
      expect(content).toBe(`---
title: Merkle proofs
author: Ori Pomerantz
tags: ["storage"]
---

Content here.`)
      expect(fixCount).toBe(1)
    })

    test("leaves single-line author unchanged", () => {
      const input = `---
title: Test
author: Ori Pomerantz
tags: ["test"]
---

Content.`
      const { content, fixCount } = fixDuplicateFrontmatterAuthor(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles author with different name", () => {
      const input = `---
title: Test
author: Jane Doe
  Jane Doe
tags: ["test"]
---

Content.`
      const { content, fixCount } = fixDuplicateFrontmatterAuthor(input)
      expect(content).toBe(`---
title: Test
author: Jane Doe
tags: ["test"]
---

Content.`)
      expect(fixCount).toBe(1)
    })

    test("does not remove non-duplicate continuation", () => {
      const input = `---
title: Test
author: Ori Pomerantz
  and Sam Richards
tags: ["test"]
---

Content.`
      const { content, fixCount } = fixDuplicateFrontmatterAuthor(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not modify content outside frontmatter", () => {
      const input = `---
title: Test
author: Ori Pomerantz
---

author: Ori Pomerantz
  Ori Pomerantz`
      const { content, fixCount } = fixDuplicateFrontmatterAuthor(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixBrokenBracketInLinks", () => {
    test("fixes } instead of ] in markdown links", () => {
      const input = `[Mais em staking withdrawals}(/staking/withdrawals/)`
      const { content, fixCount } = fixBrokenBracketInLinks(input)
      expect(content).toBe(
        `[Mais em staking withdrawals](/staking/withdrawals/)`
      )
      expect(fixCount).toBe(1)
    })

    test("fixes multiple broken brackets", () => {
      const input = `[link1}(url1) and [link2}(url2)`
      const { content, fixCount } = fixBrokenBracketInLinks(input)
      expect(content).toBe(`[link1](url1) and [link2](url2)`)
      expect(fixCount).toBe(2)
    })

    test("leaves correct markdown links unchanged", () => {
      const input = `[correct link](/path/)`
      const { content, fixCount } = fixBrokenBracketInLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves curly braces in code blocks unchanged", () => {
      const input = "```\n[something}(other)\n```"
      const { content, fixCount } = fixBrokenBracketInLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles } followed by newline then (url)", () => {
      const input = `[Mais em staking withdrawals}\n(/staking/withdrawals/)`
      const { content, fixCount } = fixBrokenBracketInLinks(input)
      expect(content).toBe(
        `[Mais em staking withdrawals](/staking/withdrawals/)`
      )
      expect(fixCount).toBe(1)
    })
  })

  test.describe("stripLlmArtifactTokens", () => {
    test("strips <bos> token mid-word (Marathi)", () => {
      const input = "कृ<bos>ितपणे स्वस्त आहेत"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe("कृितपणे स्वस्त आहेत")
      expect(fixCount).toBe(1)
    })

    test("strips <eos> token", () => {
      const input = "some text<eos> more text"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe("some text more text")
      expect(fixCount).toBe(1)
    })

    test("strips <s> and </s> tokens", () => {
      const input = "<s>beginning of text</s>"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe("beginning of text")
      expect(fixCount).toBe(2)
    })

    test("strips <pad> and <unk> and <mask> tokens", () => {
      const input = "word<pad>word<unk>word<mask>word"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe("wordwordwordword")
      expect(fixCount).toBe(3)
    })

    test("strips multiple tokens in one string", () => {
      const input = "text<bos> with <eos>multiple<pad> tokens"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe("text with multiple tokens")
      expect(fixCount).toBe(3)
    })

    test("leaves content unchanged when no tokens present", () => {
      const input = "This is normal **markdown** with [links](/path)"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not strip tokens inside code blocks", () => {
      const input = "```\n<bos>token inside code\n```"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not strip tokens inside inline code", () => {
      const input = "the `<bos>` token is used for..."
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not strip valid HTML tags like <b> or <strong>", () => {
      const input = "<b>bold</b> and <strong>strong</strong>"
      const { content, fixCount } = stripLlmArtifactTokens(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixSmartQuotesInJsxAttributes", () => {
    test("fixes smart right double quotes in YouTube tag", () => {
      const input = "<YouTube id=\u201Du8XvkTrjITs\u201D />"
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe('<YouTube id="u8XvkTrjITs" />')
      expect(fixCount).toBe(1)
    })

    test("fixes smart left/right double quotes in Emoji tag", () => {
      const input = "<Emoji text=\u201C\u2B50\u201D />"
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe('<Emoji text="\u2B50" />')
      expect(fixCount).toBe(1)
    })

    test("fixes German low-9 opening quote in Alert variant", () => {
      const input = "<Alert variant=\u201Eupdate\u201C>"
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe('<Alert variant="update">')
      expect(fixCount).toBe(1)
    })

    test("fixes multiple tags in same content", () => {
      const input =
        "<YouTube id=\u201DGgKveVMLnoo\u201D />\n\nSome text\n\n<YouTube id=\u201Du8XvkTrjITs\u201D />"
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe(
        '<YouTube id="GgKveVMLnoo" />\n\nSome text\n\n<YouTube id="u8XvkTrjITs" />'
      )
      expect(fixCount).toBe(2)
    })

    test("leaves straight quotes untouched", () => {
      const input = '<YouTube id="u8XvkTrjITs" />'
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves smart quotes in prose untouched", () => {
      const input =
        'This is a \u201Cquoted\u201D word next to <YouTube id="abc" />'
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n<YouTube id=\u201Dabc\u201D />\n```"
      const { content, fixCount } = fixSmartQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("stripCrowdinBoilerplate", () => {
    test("strips Arabic boilerplate injected mid-paragraph", () => {
      const input =
        "المعاملات هي تعليمات من الحسابات موقعة بشكل مشفّر. نشكرك على مشاركتك في برنامج الترجمة ethereum.org. أبسط معاملة هي نقل ETH من حساب إلى آخر."
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe(
        "المعاملات هي تعليمات من الحسابات موقعة بشكل مشفّر. أبسط معاملة هي نقل ETH من حساب إلى آخر."
      )
      expect(fixCount).toBe(1)
    })

    test("strips English boilerplate injected mid-paragraph", () => {
      const input =
        "Some content here. Thank you for your participation in the ethereum.org Translation Program. More content follows."
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe("Some content here. More content follows.")
      expect(fixCount).toBe(1)
    })

    test("preserves boilerplate when standalone paragraph", () => {
      const input = "نشكرك على مشاركتك في برنامج الترجمة ethereum.org!"
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("preserves boilerplate as standalone line in multi-line content", () => {
      const input =
        "Some previous paragraph.\n\nنشكرك على مشاركتك في برنامج الترجمة ethereum.org!\n"
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input =
        "```\nSome text. نشكرك على مشاركتك في برنامج الترجمة ethereum.org. More.\n```"
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles no boilerplate", () => {
      const input = "Normal content without any boilerplate text."
      const { content, fixCount } = stripCrowdinBoilerplate(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixDuplicatedTagValues", () => {
    test("deduplicates ERC-721ERC-721 in frontmatter tags", () => {
      const input = 'tags: ["ERC-721ERC-721", "Alchemy", "Solidity"]'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe('tags: ["ERC-721", "Alchemy", "Solidity"]')
      expect(fixCount).toBe(1)
    })

    test("deduplicates in JSON values", () => {
      const input = '  "erc-721-term": "ERC-721ERC-721",'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe('  "erc-721-term": "ERC-721",')
      expect(fixCount).toBe(1)
    })

    test("handles multiple duplicated values", () => {
      const input = 'tags: ["ERC-721ERC-721", "ERC-20ERC-20"]'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe('tags: ["ERC-721", "ERC-20"]')
      expect(fixCount).toBe(2)
    })

    test("leaves non-duplicated values unchanged", () => {
      const input = 'tags: ["ERC-721", "Alchemy"]'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not match odd-length strings", () => {
      const input = '"abc"'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not false-positive on legitimate repeated content", () => {
      // "aa" is a valid 2-char string where first half equals second half
      // but we should only match when the repeated unit is at least 2 chars
      const input = '"testtest"'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe('"test"')
      expect(fixCount).toBe(1)
    })

    test("skips code blocks", () => {
      const input = '```\n"ERC-721ERC-721"\n```'
      const { content, fixCount } = fixDuplicatedTagValues(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixKnownBrandGarbles", () => {
    test("fixes GitHub garble to Latin without locale (fallback)", () => {
      const input = "- [يجتبه](https://github.com/alchemyplatform)"
      const { content, fixCount } = fixKnownBrandGarbles(input)
      expect(content).toBe("- [GitHub](https://github.com/alchemyplatform)")
      expect(fixCount).toBe(1)
    })

    test("fixes GitHub garble to Arabic transliteration with ar locale", () => {
      const input = "- [يجتبه](https://github.com/alchemyplatform)"
      const { content, fixCount } = fixKnownBrandGarbles(input, "ar")
      expect(content).toBe("- [غيت هاب](https://github.com/alchemyplatform)")
      expect(fixCount).toBe(1)
    })

    test("fixes multiple GitHub garbles with locale", () => {
      const input =
        "- [يجتبه](https://github.com/foo)\n- [يجتبه](https://github.com/bar)"
      const { content, fixCount } = fixKnownBrandGarbles(input, "ar")
      expect(content).toBe(
        "- [غيت هاب](https://github.com/foo)\n- [غيت هاب](https://github.com/bar)"
      )
      expect(fixCount).toBe(2)
    })

    test("fixes Solidity garble to Arabic transliteration in tags", () => {
      const input = 'tags: ["الصلابة", "Waffle", "الاختبار"]'
      const { content, fixCount } = fixKnownBrandGarbles(input, "ar")
      expect(content).toBe('tags: ["سوليديتي", "Waffle", "الاختبار"]')
      expect(fixCount).toBe(1)
    })

    test("fixes Solidity garble to Arabic transliteration in prose", () => {
      const input = "يمكنك كتابة العقود الذكية باستخدام الصلابة"
      const { content, fixCount } = fixKnownBrandGarbles(input, "ar")
      expect(content).toBe("يمكنك كتابة العقود الذكية باستخدام سوليديتي")
      expect(fixCount).toBe(1)
    })

    test("leaves correct brand names unchanged", () => {
      const input = '- [GitHub](https://github.com/foo)\ntags: ["Solidity"]'
      const { content, fixCount } = fixKnownBrandGarbles(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\nيجتبه\n```"
      const { content, fixCount } = fixKnownBrandGarbles(input, "ar")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixMissingOpeningSup", () => {
    test("restores missing <sup> before footnote link with </sup>", () => {
      const input = "أرقام[fn3](#notes)</sup>، مع وجود"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toBe("أرقام<sup>[fn3](#notes)</sup>، مع وجود")
      expect(fixCount).toBe(1)
    })

    test("restores missing <sup> before numbered footnote", () => {
      const input = "مرجع[1](#notes)</sup> هنا"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toBe("مرجع<sup>[1](#notes)</sup> هنا")
      expect(fixCount).toBe(1)
    })

    test("handles multiple missing openers", () => {
      const input = "أول[fn1](#notes)</sup> وثاني[fn2](#notes)</sup>"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toContain("<sup>[fn1](#notes)</sup>")
      expect(content).toContain("<sup>[fn2](#notes)</sup>")
      expect(fixCount).toBe(2)
    })

    test("leaves already-correct <sup> pairs unchanged", () => {
      const input = "أرقام<sup>[fn3](#notes)</sup>، مع وجود"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not add <sup> when </sup> has matching opener", () => {
      const input = "قيمة <sup>256</sup> عالية"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\n[fn1](#notes)</sup>\n```"
      const { content, fixCount } = fixMissingOpeningSup(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixSplitBoldMarkers", () => {
    test("fixes premature bold close with escaped end marker", () => {
      const input =
        "**اعتبارًا من التاريخ، فُقِد ما لا يقل عن 83 دولارًا.** لاحظ أن التنفيذ عرضة لهذه المشكلة.\\*\\*"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe(
        "**اعتبارًا من التاريخ، فُقِد ما لا يقل عن 83 دولارًا. لاحظ أن التنفيذ عرضة لهذه المشكلة.**"
      )
      expect(fixCount).toBe(1)
    })

    test("fixes real ERC-20 reception issue paragraph", () => {
      const input =
        '**اعتبارًا من <span dir="ltr">20/06/2024</span>، فُقِد ما لا يقل عن 83,656,418 دولارًا من الرموز المميزة بمعيار ERC-20 بسبب هذه المشكلة.** لاحظ أن التنفيذ الخالص لمعيار ERC-20 عرضة لهذه المشكلة ما لم تنفذ مجموعة من القيود الإضافية على المعيار كما هو موضح أدناه.\\*\\*'
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toContain("كما هو موضح أدناه.**")
      expect(content).not.toContain("\\*\\*")
      expect(fixCount).toBe(1)
    })

    test("leaves correct bold unchanged", () => {
      const input = "**هذا النص بخط عريض بالكامل.**"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves escaped bold that is fully escaped (not split)", () => {
      const input = "\\*\\*نص مهرب بالكامل\\*\\*"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles split bold ending with period before escaped markers", () => {
      const input = "**الحلول الممكنة.** يمكن اقتراح.\\*\\*"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe("**الحلول الممكنة. يمكن اقتراح.**")
      expect(fixCount).toBe(1)
    })

    test("skips code blocks", () => {
      const input = "```\n**text.** more.\\*\\*\n```"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not match when escaped markers are on a different line", () => {
      const input = "**text.** end of line\n\\*\\* start of next"
      const { content, fixCount } = fixSplitBoldMarkers(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixKnownWrongCompounds", () => {
    test("fixes state-channel compound terms", () => {
      const input = "تعتمد قنوات الدولة على بيانات الدولة"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("تعتمد قنوات الحالة على بيانات الحالة")
      expect(fixCount).toBe(2)
    })

    test("fixes governmental channels variant", () => {
      const input = "القنوات الحكومية تعمل بشكل جيد"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("قنوات الحالة تعمل بشكل جيد")
      expect(fixCount).toBe(1)
    })

    test("fixes statelessness as nationality", () => {
      const input = "انعدام الجنسية يقلل من التخزين"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("انعدام الحالة يقلل من التخزين")
      expect(fixCount).toBe(1)
    })

    test("fixes state update with wrong term", () => {
      const input = "تحديث الولاية يتطلب توقيع"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("تحديث الحالة يتطلب توقيع")
      expect(fixCount).toBe(1)
    })

    test("fixes ether as altruism", () => {
      const input = "الرمز الأصلي، الإيثار (ETH)."
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("الرمز الأصلي، الإيثر (ETH).")
      expect(fixCount).toBe(1)
    })

    test("fixes liquid staking as liquid mortgage", () => {
      const input = "الرهن العقاري السائل ومشتقاته"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe("التحصيص السائل ومشتقاته")
      expect(fixCount).toBe(1)
    })

    test("leaves correct terms unchanged", () => {
      const input = "قنوات الحالة تعتمد على إثبات الحصة"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\nقنوات الدولة\n```"
      const { content, fixCount } = fixKnownWrongCompounds(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixGuillemetsInHtmlTags", () => {
    test("fixes right guillemet replacing > after quoted attribute", () => {
      const input = '<span dir="ltr"\u00BB$100,000</span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe('<span dir="ltr">$100,000</span>')
      expect(fixCount).toBe(1)
    })

    test("fixes right guillemet replacing > at end of self-closing tag", () => {
      const input = "<br /\u00BB"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe("<br />")
      expect(fixCount).toBe(1)
    })

    test("fixes right guillemet replacing > in closing tag", () => {
      const input = "</span\u00BB"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe("</span>")
      expect(fixCount).toBe(1)
    })

    test("fixes left guillemet replacing < in opening tag", () => {
      const input = '\u00ABspan dir="ltr">$100,000</span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe('<span dir="ltr">$100,000</span>')
      expect(fixCount).toBe(1)
    })

    test("fixes left guillemet replacing < in closing tag", () => {
      const input = '<span dir="ltr">text\u00AB/span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe('<span dir="ltr">text</span>')
      expect(fixCount).toBe(1)
    })

    test("fixes both guillemets in same tag", () => {
      const input = '\u00ABspan dir="ltr"\u00BB$100</span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe('<span dir="ltr">$100</span>')
      expect(fixCount).toBeGreaterThanOrEqual(1)
    })

    test("fixes multiple broken tags in same line", () => {
      const input =
        '<span dir="ltr"\u00BB$100</span\u00BB and <span dir="ltr"\u00BB$200</span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(
        '<span dir="ltr">$100</span> and <span dir="ltr">$200</span>'
      )
      expect(fixCount).toBe(3)
    })

    test("fixes guillemet in i tag", () => {
      const input = "<i\u00BBtext</i>"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe("<i>text</i>")
      expect(fixCount).toBe(1)
    })

    test("fixes guillemet in Link component", () => {
      const input = '<Link href="https://example.com"\u00BBtext</Link>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe('<Link href="https://example.com">text</Link>')
      expect(fixCount).toBe(1)
    })

    test("leaves legitimate guillemet pairs unchanged", () => {
      const input = "\u00ABThe knowledge complexity\u00BB"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves Arabic quotation guillemets unchanged", () => {
      const input = "قال \u00ABمرحبا\u00BB في الاجتماع"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves correct HTML tags unchanged", () => {
      const input = '<span dir="ltr">$100,000</span>'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = '```\n<span dir="ltr"\u00BB$100</span>\n```'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips inline code", () => {
      const input = 'Use `<span dir="ltr"\u00BB` for RTL'
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves guillemet-quoted words unchanged (not HTML tags)", () => {
      // Ukrainian/Russian use guillemets as quotation marks.
      // Words like \u00ABcat\u00BB, \u00ABdog\u00BB, \u00ABnull\u00BB are quotes, not tags.
      const input =
        "- \u0440\u044F\u0434\u043E\u043A, \u0449\u043E \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0441\u043B\u043E\u0432\u043E \u00ABcat\u00BB;"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves guillemet-quoted multi-letter words unchanged", () => {
      const input =
        "- \u0440\u044F\u0434\u043E\u043A \u00ABdog\u00BB = [ 0x83 ]\n- \u0441\u043F\u0438\u0441\u043E\u043A [ \u00ABcat\u00BB, \u00ABdog\u00BB ]"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("still fixes actual HTML tags like \u00ABi\u00BB but not \u00ABcat\u00BB", () => {
      // \u00ABi\u00BB is a known HTML tag and should be fixed
      const input = "\u00ABi\u00BBtext</i>"
      const { content, fixCount } = fixGuillemetsInHtmlTags(input)
      expect(content).toBe("<i>text</i>")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixBrandCapitalization", () => {
    test("fixes Github to GitHub", () => {
      const input = "Check the [Github](https://github.com/example) repo"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe(
        "Check the [GitHub](https://github.com/example) repo"
      )
      expect(fixCount).toBe(1)
    })

    test("fixes Metamask to MetaMask", () => {
      const input = "Install Metamask from the store"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe("Install MetaMask from the store")
      expect(fixCount).toBe(1)
    })

    test("does NOT modify github.com URLs", () => {
      const input = "Visit https://github.com/ethereum"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does NOT modify github.io URLs", () => {
      const input = "See blog.ethereum.github.io for docs"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = "```\nGithub repo\n```"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("fixes multiple occurrences", () => {
      const input = "Use Github and Metamask"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe("Use GitHub and MetaMask")
      expect(fixCount).toBe(2)
    })

    test("leaves already-correct casing unchanged", () => {
      const input = "Use GitHub and MetaMask"
      const { content, fixCount } = fixBrandCapitalization(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixMissingComponentClosingTags", () => {
    test("adds missing closing SocialListItem tag", () => {
      const input =
        '<SocialListItem socialIcon="webpage"><Link href="https://example.com">Text</Link> - description'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(
        '<SocialListItem socialIcon="webpage"><Link href="https://example.com">Text</Link> - description</SocialListItem>'
      )
      expect(fixCount).toBe(1)
    })

    test("adds missing closing tag with italic content", () => {
      const input =
        '<SocialListItem socialIcon="webpage"><Link href="https://app.peera.ai/">Forum</Link> <i>- description</i>'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(
        '<SocialListItem socialIcon="webpage"><Link href="https://app.peera.ai/">Forum</Link> <i>- description</i></SocialListItem>'
      )
      expect(fixCount).toBe(1)
    })

    test("leaves properly closed tags unchanged", () => {
      const input =
        '<SocialListItem socialIcon="webpage"><Link href="https://example.com">Text</Link></SocialListItem>'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves properly closed tags with content after Link unchanged", () => {
      const input =
        '<SocialListItem socialIcon="webpage"><Link href="https://example.com">Text</Link> - desc</SocialListItem>'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple unclosed tags across lines", () => {
      const input =
        '<SocialListItem socialIcon="a">one\n<SocialListItem socialIcon="b">two'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toContain("one</SocialListItem>")
      expect(content).toContain("two</SocialListItem>")
      expect(fixCount).toBe(2)
    })

    test("does NOT fix ExpandableCard (multi-line component)", () => {
      const input = '<ExpandableCard title="test">content here'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not double-close already closed tag", () => {
      const input =
        '<SocialListItem socialIcon="a">text</SocialListItem>\n<SocialListItem socialIcon="b">text</SocialListItem>'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles mixed closed and unclosed on consecutive lines", () => {
      const input =
        '<SocialListItem socialIcon="a">closed</SocialListItem>\n<SocialListItem socialIcon="b">unclosed'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toContain("closed</SocialListItem>")
      expect(content).toContain("unclosed</SocialListItem>")
      expect(fixCount).toBe(1)
    })

    test("skips fenced code blocks", () => {
      const input = '```\n<SocialListItem socialIcon="a">unclosed\n```'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips inline code", () => {
      const input = 'Use `<SocialListItem socialIcon="a">unclosed` as example'
      const { content, fixCount } = fixMissingComponentClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixMangledDocLinks", () => {
    test("fixes DocLink mangled into markdown link syntax", () => {
      const input = '[<DocLink href="](/roadmap/beacon-chain)/">'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe('<DocLink href="/roadmap/beacon-chain/">')
      expect(fixCount).toBe(1)
    })

    test("fixes DocLink with different paths", () => {
      const input = '[<DocLink href="](/developers/docs/evm)/">'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe('<DocLink href="/developers/docs/evm/">')
      expect(fixCount).toBe(1)
    })

    test("fixes DocLink without trailing slash in mangled version", () => {
      const input = '[<DocLink href="](/roadmap/merge)/">'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe('<DocLink href="/roadmap/merge/">')
      expect(fixCount).toBe(1)
    })

    test("leaves correct DocLink unchanged", () => {
      const input = '<DocLink href="/roadmap/beacon-chain/">'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("leaves regular markdown links unchanged", () => {
      const input = "[some text](https://example.com)"
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = '```\n[<DocLink href="](/roadmap)/">\n```'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles multiple mangled DocLinks", () => {
      const input =
        '[<DocLink href="](/roadmap/beacon-chain)/">text</DocLink>\n[<DocLink href="](/roadmap/merge)/">text</DocLink>'
      const { content, fixCount } = fixMangledDocLinks(input)
      expect(content).toContain('<DocLink href="/roadmap/beacon-chain/">')
      expect(content).toContain('<DocLink href="/roadmap/merge/">')
      expect(fixCount).toBe(2)
    })
  })

  test.describe("removeOrphanedClosingTags — closer before opener", () => {
    test("removes </em> appearing before <em> on same line", () => {
      const input =
        '<li></em><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> - <em>Optymalizuje koszt.</em></li>'
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(
        '<li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> - <em>Optymalizuje koszt.</em></li>'
      )
      expect(fixCount).toBe(1)
    })

    test("does not remove </em> that follows <em> (correct order)", () => {
      const input = "<li><em>text</em> and <a href='/x'>link</a></li>"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("removes leading orphan even when counts are equal", () => {
      const input = "</em>some text <em>more text</em>"
      const { content, fixCount } = removeOrphanedClosingTags(input)
      expect(content).toBe("some text <em>more text</em>")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("quoteFrontmatterNonAscii — smart quote handling", () => {
    test("replaces smart quotes instead of double-wrapping", () => {
      const input =
        "---\nsummaryPoint1: \u201CZasady gry\u201D\nlang: pl\n---\n\nContent"
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      // Should replace smart quotes with straight quotes, not wrap
      expect(content).toContain('summaryPoint1: "Zasady gry"')
      expect(content).not.toContain('""')
      expect(fixCount).toBe(1)
    })

    test("handles value already in straight quotes (no change)", () => {
      const input = '---\ntitle: "Already quoted"\nlang: pl\n---\n\nContent'
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      expect(content).toContain('title: "Already quoted"')
      expect(fixCount).toBe(0)
    })

    test("handles mixed smart quotes and non-ASCII", () => {
      const input =
        "---\nsummaryPoint1: \u201CPolski tekst z \u0142\u201D\nlang: pl\n---\n\nContent"
      const { content } = quoteFrontmatterNonAscii(input)
      expect(content).toContain('summaryPoint1: "Polski tekst z \u0142"')
      // Outer smart quotes replaced with straight quotes
      expect(content).not.toContain("\u201C")
      expect(content).not.toContain("\u201D")
    })

    test("preserves inner smart quotes inside already-quoted value", () => {
      const input =
        '---\ndescription: "Wyja\u015Bnienie mechanizmu \u201CProof-of stake\u201D."\nlang: pl\n---\n\nContent'
      const { content, fixCount } = quoteFrontmatterNonAscii(input)
      // Inner smart quotes must stay -- they're typographic, not YAML delimiters
      expect(content).toContain("\u201CProof-of stake\u201D")
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixJsxAttributeSpacing", () => {
    test('normalizes href = "..." to href="..."', () => {
      const input =
        '<a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">text</a>'
      const { content, fixCount } = fixJsxAttributeSpacing(input)
      expect(content).toBe(
        '<a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">text</a>'
      )
      expect(fixCount).toBe(1)
    })

    test("normalizes multiple spaced attributes", () => {
      const input = '<Component href = "/path" id = "test">'
      const { content, fixCount } = fixJsxAttributeSpacing(input)
      expect(content).toBe('<Component href="/path" id="test">')
      expect(fixCount).toBe(2)
    })

    test("leaves correctly formatted attributes unchanged", () => {
      const input = '<a href="https://example.com">link</a>'
      const { content, fixCount } = fixJsxAttributeSpacing(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips code blocks", () => {
      const input = '```\n<a href = "test">\n```'
      const { content, fixCount } = fixJsxAttributeSpacing(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixEscapedQuotesInJsxAttributes", () => {
    test("removes backslash-escaped quotes in JSX attributes", () => {
      const input =
        '<ButtonLink variant=\\"outline-color\\" href=\\"/roadmap/danksharding/\\">Zaidi</ButtonLink>'
      const { content, fixCount } = fixEscapedQuotesInJsxAttributes(input)
      expect(content).toBe(
        '<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Zaidi</ButtonLink>'
      )
      expect(fixCount).toBeGreaterThan(0)
    })

    test("leaves normal JSX attributes unchanged", () => {
      const input =
        '<ButtonLink variant="outline" href="/path/">Text</ButtonLink>'
      const { content, fixCount } = fixEscapedQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("skips fenced code blocks", () => {
      const input = '```\n<Tag attr=\\"val\\">\n```'
      const { content, fixCount } = fixEscapedQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("only fixes lines that look like JSX tags", () => {
      const input = 'This is prose with a \\" quote in it'
      const { content, fixCount } = fixEscapedQuotesInJsxAttributes(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixFrontmatterLang", () => {
    test("fixes lang: en to target locale", () => {
      const input = `---\ntitle: "Test"\nlang: en\n---\n\nBody text`
      const { content, fixCount } = fixFrontmatterLang(input, "ur")
      expect(content).toBe(`---\ntitle: "Test"\nlang: ur\n---\n\nBody text`)
      expect(fixCount).toBe(1)
    })

    test("fixes wrong locale to correct one", () => {
      const input = `---\ntitle: "Test"\nlang: ja\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "ko")
      expect(content).toBe(`---\ntitle: "Test"\nlang: ko\n---\n\nBody`)
      expect(fixCount).toBe(1)
    })

    test("leaves correct locale unchanged", () => {
      const input = `---\ntitle: "Test"\nlang: ur\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "ur")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns unchanged when no frontmatter", () => {
      const input = `# Just a heading\n\nNo frontmatter here`
      const { content, fixCount } = fixFrontmatterLang(input, "ur")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns unchanged when no lang field in frontmatter", () => {
      const input = `---\ntitle: "Test"\nskill: beginner\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "ur")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns unchanged when locale is empty string", () => {
      const input = `---\ntitle: "Test"\nlang: en\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles lang with extra whitespace", () => {
      const input = `---\ntitle: "Test"\nlang:   en  \n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "ar")
      expect(content).toContain("lang: ar")
      expect(fixCount).toBe(1)
    })

    test("handles quoted lang value", () => {
      const input = `---\ntitle: "Test"\nlang: "en"\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "hi")
      expect(content).toContain("lang: hi")
      expect(fixCount).toBe(1)
    })

    test("does not modify lang-like text in body", () => {
      const input = `---\ntitle: "Test"\nlang: ur\n---\n\nlang: en appears in body`
      const { content, fixCount } = fixFrontmatterLang(input, "ur")
      expect(content).toBe(input)
      expect(content).toContain("lang: en appears in body")
      expect(fixCount).toBe(0)
    })

    test("handles hyphenated locale codes", () => {
      const input = `---\ntitle: "Test"\nlang: en\n---\n\nBody`
      const { content, fixCount } = fixFrontmatterLang(input, "zh-tw")
      expect(content).toContain("lang: zh-tw")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixCrossScriptPunctuation", () => {
    test("replaces \u3002 with \u06D4 for locale ur", () => {
      const input =
        "\u06CC\u06C1 \u0627\u06CC\u06A9 \u062C\u0645\u0644\u06C1 \u06C1\u06D2\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ur")
      expect(content).toBe(
        "\u06CC\u06C1 \u0627\u06CC\u06A9 \u062C\u0645\u0644\u06C1 \u06C1\u06D2\u06D4"
      )
      expect(fixCount).toBe(1)
    })

    test("replaces \u3002 with \u06D4 for locale ar", () => {
      const input = "\u0647\u0630\u0627 \u0646\u0635\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ar")
      expect(content).toBe("\u0647\u0630\u0627 \u0646\u0635\u06D4")
      expect(fixCount).toBe(1)
    })

    test("replaces \u3002 with \u0964 for locale hi", () => {
      const input =
        "\u092F\u0939 \u090F\u0915 \u0935\u093E\u0915\u094D\u092F \u0939\u0948\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "hi")
      expect(content).toBe(
        "\u092F\u0939 \u090F\u0915 \u0935\u093E\u0915\u094D\u092F \u0939\u0948\u0964"
      )
      expect(fixCount).toBe(1)
    })

    test("replaces \u3002 with . for locale de (Latin)", () => {
      const input = "Dies ist ein Satz\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "de")
      expect(content).toBe("Dies ist ein Satz.")
      expect(fixCount).toBe(1)
    })

    test("does NOT replace \u3002 for locale ja (CJK)", () => {
      const input = "\u3053\u308C\u306F\u6587\u3067\u3059\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ja")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does NOT replace \u3002 for locale zh (CJK)", () => {
      const input = "\u8FD9\u662F\u4E00\u4E2A\u53E5\u5B50\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "zh")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not touch \u3002 inside code fences", () => {
      const input = "text\u3002\n```\ncode\u3002\n```\nmore\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ur")
      expect(content).toContain("code\u3002")
      expect(fixCount).toBe(2)
    })

    test("handles multiple \u3002 in one file", () => {
      const input = "first\u3002 second\u3002 third\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ur")
      expect(content).not.toContain("\u3002")
      expect(fixCount).toBe(3)
    })

    test("no-op when no CJK punctuation present", () => {
      const input = "Normal text with no CJK."
      const { content, fixCount } = fixCrossScriptPunctuation(input, "ur")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns fixCount 0 when locale is empty", () => {
      const input = "text\u3002"
      const { content, fixCount } = fixCrossScriptPunctuation(input, "")
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixSpanWrappedBackticks", () => {
    test('unwraps <span dir="ltr"> around backtick content', () => {
      const input = '<span dir="ltr">`APPLY(S,TX) -> S\'`</span>'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`APPLY(S,TX) -> S'`")
      expect(fixCount).toBe(1)
    })

    test("handles multiple occurrences in one file", () => {
      const input = [
        '<span dir="ltr">`code1`</span> some text',
        '<span dir="ltr">`code2`</span> more text',
      ].join("\n")
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`code1` some text\n`code2` more text")
      expect(fixCount).toBe(2)
    })

    test('does not touch <span dir="ltr"> wrapping non-backtick content', () => {
      const input = '<span dir="ltr">2026-03-15</span>'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not touch backticks that are NOT inside spans", () => {
      const input = "Use `eth_getBalance` to query the balance."
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("handles whitespace inside the span", () => {
      const input = '<span dir="ltr"> `some_code` </span>'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`some_code`")
      expect(fixCount).toBe(1)
    })

    test("no-op when pattern not present", () => {
      const input = "Plain text with no spans or backticks."
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("returns correct fixCount", () => {
      const input = [
        '<span dir="ltr">`a`</span>',
        '<span dir="ltr">`b`</span>',
        '<span dir="ltr">`c`</span>',
      ].join(" ")
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(fixCount).toBe(3)
      expect(content).toBe("`a` `b` `c`")
    })

    test("skips code fences", () => {
      const input = '```\n<span dir="ltr">`code`</span>\n```'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("unwraps backticks around span (pattern 2: span visible as code)", () => {
      const input = '`<span dir="ltr">kR</span>`'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`kR`")
      expect(fixCount).toBe(1)
    })

    test("handles multiple pattern 2 occurrences", () => {
      const input =
        '`<span dir="ltr">S[i]</span>` and `<span dir="ltr">S[i-1]</span>`'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`S[i]` and `S[i-1]`")
      expect(fixCount).toBe(2)
    })

    test("handles mixed pattern 1 and pattern 2", () => {
      const input =
        '<span dir="ltr">`code`</span> and `<span dir="ltr">kR</span>`'
      const { content, fixCount } = fixSpanWrappedBackticks(input)
      expect(content).toBe("`code` and `kR`")
      expect(fixCount).toBe(2)
    })
  })

  test.describe("fixBoldWrappedOrderedListNumerals", () => {
    test("moves bold markers off numeral for ur locale", () => {
      const input = "**1. some text**"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ur"
      )
      expect(content).toBe("1. **some text**")
      expect(fixCount).toBe(1)
    })

    test("handles multi-digit numbers", () => {
      const input = "**12. longer item here**"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ur"
      )
      expect(content).toBe("12. **longer item here**")
      expect(fixCount).toBe(1)
    })

    test("handles multiple list items", () => {
      const input = "**1. first**\n\n**2. second**\n\n**3. third**"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ur"
      )
      expect(content).toBe("1. **first**\n\n2. **second**\n\n3. **third**")
      expect(fixCount).toBe(3)
    })

    test("no-op for non-ur locale", () => {
      const input = "**1. some text**"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ar"
      )
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("does not touch bold text without leading numeral", () => {
      const input = "**some bold text without number**"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ur"
      )
      expect(content).toBe(input)
      expect(fixCount).toBe(0)
    })

    test("preserves trailing punctuation", () => {
      const input =
        "**8. \u0622\u0646 \u0686\u06CC\u0646 \u0645\u0627\u0631\u06A9\u06CC\u0679 \u067E\u0644\u06CC\u0633\u0632**\u060C \u0634\u0646\u0627\u062E\u062A"
      const { content, fixCount } = fixBoldWrappedOrderedListNumerals(
        input,
        "ur"
      )
      expect(content).toContain("8. **")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixTranslatedJsonPlaceholders", () => {
    test("restores translated placeholder names to English", () => {
      const en = JSON.stringify({ key: "{days} ago" })
      const tr = JSON.stringify({ key: "{siku} zilizopita" })
      const { content, fixCount } = fixTranslatedJsonPlaceholders(tr, en)
      const parsed = JSON.parse(content)
      expect(parsed.key).toBe("{days} zilizopita")
      expect(fixCount).toBe(1)
    })

    test("handles multiple placeholders in one value", () => {
      const en = JSON.stringify({ k: "{count} of {total}" })
      const tr = JSON.stringify({ k: "{hesabu} ya {jumla}" })
      const { content, fixCount } = fixTranslatedJsonPlaceholders(tr, en)
      const parsed = JSON.parse(content)
      expect(parsed.k).toBe("{count} ya {total}")
      expect(fixCount).toBe(1)
    })

    test("leaves correct placeholders unchanged", () => {
      const en = JSON.stringify({ k: "{days} ago" })
      const tr = JSON.stringify({ k: "{days} zilizopita" })
      const { fixCount } = fixTranslatedJsonPlaceholders(tr, en)
      expect(fixCount).toBe(0)
    })

    test("skips keys not present in English", () => {
      const en = JSON.stringify({ a: "hello" })
      const tr = JSON.stringify({ a: "habari", b: "{extra}" })
      const { fixCount } = fixTranslatedJsonPlaceholders(tr, en)
      expect(fixCount).toBe(0)
    })
  })
})
