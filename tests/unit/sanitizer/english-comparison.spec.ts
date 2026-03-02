/**
 * Unit tests for sanitizer functions that compare translated content
 * against English source content.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/i18n/post_import_sanitize"

const {
  syncHeaderIdsWithEnglish,
  fixBrandTags,
  fixProtectedBrandNames,
  syncProtectedFrontmatterFields,
  restoreBlankLinesFromEnglish,
  collapseInlineHtmlFromEnglish,
  fixMergedClosingTags,
  normalizeInlineComponentsFromEnglish,
  repairUnclosedBackticks,
  restoreDroppedBackslashEscapes,
  fixCollapsedComponentLineBreaks,
} = _testOnly

test.describe("English Comparison Fixes", () => {
  test.describe("syncHeaderIdsWithEnglish", () => {
    test("replaces translated IDs with ASCII English IDs when counts match", () => {
      const english = [
        "## What is Ethereum? {#what-is-ethereum}",
        "## How does it work? {#how-does-it-work}",
      ].join("\n")
      const translated = [
        "## \u30A4\u30FC\u30B5\u30EA\u30A2\u30E0\u3068\u306F? {#\u30A4\u30FC\u30B5\u30EA\u30A2\u30E0\u3068\u306F}",
        "## \u3069\u306E\u3088\u3046\u306B\u6A5F\u80FD\u3059\u308B\u304B? {#\u3069\u306E\u3088\u3046\u306B}",
      ].join("\n")
      const result = syncHeaderIdsWithEnglish(translated, english)
      expect(result).toContain("{#what-is-ethereum}")
      expect(result).toContain("{#how-does-it-work}")
    })

    test("returns original when header counts mismatch", () => {
      const english = "## One heading {#one}"
      const translated = [
        "## \u898B\u51FA\u30571 {#one}",
        "## \u898B\u51FA\u30572 {#two}",
      ].join("\n")
      const result = syncHeaderIdsWithEnglish(translated, english)
      expect(result).toBe(translated)
    })

    test("normalizes accented IDs to ASCII", () => {
      const english = "## \u00DCber uns {#\u00FCber-uns}"
      const translated =
        "## \u79C1\u305F\u3061\u306B\u3064\u3044\u3066 {#\u79C1\u305F\u3061}"
      const result = syncHeaderIdsWithEnglish(translated, english)
      expect(result).toContain("{#uber-uns}")
    })

    test("preserves blank lines after headers with duplicate IDs", () => {
      // Regression: dao/index.md has multiple headers sharing {#governance-example}.
      // The regex captured trailing \n in fullMatch, and .replace() with duplicate
      // fullMatch values double-stripped newlines from the first occurrence,
      // merging the header with its following paragraph.
      const english = [
        "### Delegation {#governance-delegation}",
        "",
        "Delegation is like representative democracy.",
        "",
        "#### A famous example {#governance-example}",
        "",
        "[ENS](https://ens.domains) - ENS holders can delegate.",
        "",
        "### Automatic governance {#governance-example}",
        "",
        "In many DAOs transactions execute automatically.",
        "",
        "#### A famous example {#governance-example}",
        "",
        "[Nouns](https://nouns.wtf) - automatic execution.",
      ].join("\n")
      const translated = [
        "### Delegirovanie {#governance-delegation}",
        "",
        "Delegirovanie - primer demokratii.",
        "",
        "#### Izvestnyj primer {#governance-example}",
        "",
        "[ENS](https://ens.domains) - vladeltsy ENS.",
        "",
        "### Avtomaticheskoe upravlenie {#governance-example}",
        "",
        "Vo mnogih DAO tranzakcii vypolnyayutsya.",
        "",
        "#### Izvestnyj primer {#governance-example}",
        "",
        "[Nouns](https://nouns.wtf) - avtomaticheskoe.",
      ].join("\n")
      const result = syncHeaderIdsWithEnglish(translated, english)
      // Both h4 headers must retain blank lines after them
      expect(result).toContain(
        "#### Izvestnyj primer {#governance-example}\n\n[ENS]"
      )
      expect(result).toContain(
        "#### Izvestnyj primer {#governance-example}\n\n[Nouns]"
      )
      // No line merging -- header must not be joined with paragraph
      expect(result).not.toMatch(
        /#### Izvestnyj primer \{#governance-example\}\[/
      )
    })
  })

  test.describe("fixBrandTags", () => {
    test("restores brand tags to canonical casing", () => {
      const english = [
        "---",
        'tags: ["solidity", "ethereum"]',
        "---",
        "Content",
      ].join("\n")
      const translated = [
        "---",
        'tags: ["\u30BD\u30EA\u30C7\u30A3\u30C6\u30A3", "\u30A4\u30FC\u30B5\u30EA\u30A2\u30E0"]',
        "---",
        "Content",
      ].join("\n")
      const { content, fixCount } = fixBrandTags(translated, english)
      expect(content).toContain('"Solidity"')
      expect(content).toContain('"Ethereum"')
      expect(fixCount).toBe(2)
    })

    test("leaves non-brand concept tags translated", () => {
      const english = [
        "---",
        'tags: ["zero-knowledge", "solidity"]',
        "---",
      ].join("\n")
      const translated = [
        "---",
        'tags: ["\u30BC\u30ED\u77E5\u8B58", "\u30BD\u30EA\u30C7\u30A3\u30C6\u30A3"]',
        "---",
      ].join("\n")
      const { content, fixCount } = fixBrandTags(translated, english)
      // "zero-knowledge" is not a brand, so it stays translated
      expect(content).toContain('"\u30BC\u30ED\u77E5\u8B58"')
      // "solidity" is a brand, so it becomes "Solidity"
      expect(content).toContain('"Solidity"')
      expect(fixCount).toBe(1)
    })

    test("returns unchanged when tag counts mismatch", () => {
      const english = ["---", 'tags: ["solidity"]', "---"].join("\n")
      const translated = [
        "---",
        'tags: ["\u30BD\u30EA\u30C7\u30A3\u30C6\u30A3", "extra"]',
        "---",
      ].join("\n")
      const { content, fixCount } = fixBrandTags(translated, english)
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })

    test("returns unchanged when no frontmatter", () => {
      const { content, fixCount } = fixBrandTags(
        "no frontmatter",
        "no frontmatter"
      )
      expect(content).toBe("no frontmatter")
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixProtectedBrandNames", () => {
    test("warns when brand count drops in translation", () => {
      const english = "Ethereum is great. Ethereum rocks. Ethereum forever."
      const translated = "Ethereum is great. Something else. Something more."
      const { warnings } = fixProtectedBrandNames(translated, english)
      const ethereumWarning = warnings.find((w) => w.includes('"Ethereum"'))
      expect(ethereumWarning).toBeDefined()
      expect(ethereumWarning).toContain("3x in English")
      expect(ethereumWarning).toContain("1x in translation")
    })

    test("delegates tag fixing to fixBrandTags", () => {
      const english = ["---", 'tags: ["solidity"]', "---", "Content"].join("\n")
      const translated = [
        "---",
        'tags: ["\u30BD\u30EA\u30C7\u30A3\u30C6\u30A3"]',
        "---",
        "Content",
      ].join("\n")
      const { content, fixCount } = fixProtectedBrandNames(translated, english)
      expect(content).toContain('"Solidity"')
      expect(fixCount).toBe(1)
    })
  })

  test.describe("syncProtectedFrontmatterFields", () => {
    test("restores translated protected fields from English", () => {
      const english = [
        "---",
        "template: tutorial",
        "sidebar: true",
        "published: 2024-01-01",
        "---",
      ].join("\n")
      const translated = [
        "---",
        "template: \u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB",
        "sidebar: \u306F\u3044",
        "published: 01-01-2024",
        "---",
      ].join("\n")
      const { content, fixCount } = syncProtectedFrontmatterFields(
        translated,
        english
      )
      expect(content).toContain("template: tutorial")
      expect(content).toContain("sidebar: true")
      expect(content).toContain("published: 2024-01-01")
      expect(fixCount).toBe(3)
    })

    test("does NOT sync lang field", () => {
      const english = "---\nlang: en\n---"
      const translated = "---\nlang: ja\n---"
      const { content, fixCount } = syncProtectedFrontmatterFields(
        translated,
        english
      )
      expect(content).toContain("lang: ja")
      expect(fixCount).toBe(0)
    })

    test("leaves already-correct fields unchanged", () => {
      const english = "---\ntemplate: tutorial\n---"
      const translated = "---\ntemplate: tutorial\n---"
      const { content, fixCount } = syncProtectedFrontmatterFields(
        translated,
        english
      )
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("restoreBlankLinesFromEnglish", () => {
    test("adds blank line after heading when English has it", () => {
      const english = "## Heading {#id}\n\nParagraph text"
      const translated = "## \u898B\u51FA\u3057 {#id}\nParagraph text"
      const { content, fixCount } = restoreBlankLinesFromEnglish(
        translated,
        english
      )
      expect(content).toContain("## \u898B\u51FA\u3057 {#id}\n\nParagraph text")
      expect(fixCount).toBe(1)
    })

    test("leaves unchanged when both already have blank lines", () => {
      const english = "## Heading {#id}\n\nText"
      const translated = "## \u898B\u51FA\u3057 {#id}\n\nText"
      const { content, fixCount } = restoreBlankLinesFromEnglish(
        translated,
        english
      )
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })

    test("preserves blank lines with multiple same-level headers", () => {
      // Regression: dao/index.md had multiple h4 headers; the function
      // must not remove existing blank lines when English also has them
      const english = [
        "#### A famous example {#governance-example}",
        "",
        "[ENS](https://claim.ens.domains/delegate-ranking) - ENS holders",
        "",
        "### Automatic governance {#auto-governance}",
        "",
        "In many DAOs transactions execute automatically",
        "",
        "#### A famous example {#governance-example-2}",
        "",
        "[Nouns](https://nouns.wtf/) - automatic execution",
      ].join("\n")
      const translated = [
        "#### Izvestnyj primer {#governance-example}",
        "",
        "[ENS](https://claim.ens.domains/delegate-ranking) - vladeltsy",
        "",
        "### Avtomaticheskoe upravlenie {#auto-governance}",
        "",
        "Vo mnogih DAO tranzakcii vypolnyayutsya avtomaticheski",
        "",
        "#### Izvestnyj primer {#governance-example-2}",
        "",
        "[Nouns](https://nouns.wtf/) - avtomaticheskoe vypolnenie",
      ].join("\n")
      const { content, fixCount } = restoreBlankLinesFromEnglish(
        translated,
        english
      )
      // All blank lines already present -- nothing should change
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })

    test("does not remove blank lines translation has but English lacks", () => {
      // Function should only ADD blank lines, never remove them
      const english = "#### Example {#ex}\nContent without blank line"
      const translated = "#### Primer {#ex}\n\nContent with blank line"
      const { content } = restoreBlankLinesFromEnglish(translated, english)
      // Translation's blank line must be preserved
      expect(content).toContain("#### Primer {#ex}\n\nContent with blank line")
    })
  })

  test.describe("collapseInlineHtmlFromEnglish", () => {
    test("collapses multi-line to single line when English is single-line", () => {
      const english = "<div>content here</div>"
      const translated = "<div>content here\n</div>"
      const { content, fixCount } = collapseInlineHtmlFromEnglish(
        translated,
        english
      )
      expect(content).toBe("<div>content here</div>")
      expect(fixCount).toBe(1)
    })

    test("leaves multi-line when English is multi-line", () => {
      const english = "<div>\ncontent\n</div>"
      const translated = "<div>content\n</div>"
      const { content, fixCount } = collapseInlineHtmlFromEnglish(
        translated,
        english
      )
      // English is not single-line for this div, so no collapse
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("fixMergedClosingTags", () => {
    test("splits merged closing tag when English has it on own line", () => {
      const english = [
        '<ButtonLink href="/test">',
        "  Click here",
        "</ButtonLink>",
      ].join("\n")
      const translated = [
        '<ButtonLink href="/test">',
        "  \u30AF\u30EA\u30C3\u30AF</ButtonLink>",
      ].join("\n")
      const { content, fixCount } = fixMergedClosingTags(translated, english)
      expect(content).toContain("\u30AF\u30EA\u30C3\u30AF\n")
      expect(content).toContain("</ButtonLink>")
      expect(fixCount).toBe(1)
    })

    test("leaves unchanged when English has single-line format", () => {
      const english = '<ButtonLink href="/test">Click</ButtonLink>'
      const translated =
        '<ButtonLink href="/test">\u30AF\u30EA\u30C3\u30AF</ButtonLink>'
      const { content, fixCount } = fixMergedClosingTags(translated, english)
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("normalizeInlineComponentsFromEnglish", () => {
    test("collapses multi-line ButtonLink to match English single-line", () => {
      const english = '<ButtonLink href="/docs">Learn more</ButtonLink>'
      const translated =
        '<ButtonLink href="/docs">\n  \u8A73\u7D30\u306F\u3053\u3061\u3089\n</ButtonLink>'
      const { content, fixCount } = normalizeInlineComponentsFromEnglish(
        translated,
        english
      )
      expect(content).not.toContain("\n")
      expect(content).toContain("\u8A73\u7D30\u306F\u3053\u3061\u3089")
      expect(fixCount).toBe(1)
    })

    test("keys by href attribute for matching", () => {
      const english = [
        '<ButtonLink href="/a">Text A</ButtonLink>',
        '<ButtonLink href="/b">\n  Text B\n</ButtonLink>',
      ].join("\n")
      const translated = [
        '<ButtonLink href="/a">\n  Text A\n</ButtonLink>',
        '<ButtonLink href="/b">\n  Text B\n</ButtonLink>',
      ].join("\n")
      const { content, fixCount } = normalizeInlineComponentsFromEnglish(
        translated,
        english
      )
      // Only /a should be collapsed (English is single-line)
      // /b stays multi-line (English is multi-line)
      expect(fixCount).toBe(1)
      // The collapsed one should not have newlines around its content
      expect(content).toMatch(/<ButtonLink href="\/a">Text A<\/ButtonLink>/)
    })
  })

  test.describe("repairUnclosedBackticks", () => {
    test("adds closing backtick when English has balanced pair", () => {
      const english = "Use the `<Storage[4]>` to store data"
      const translated = "Use the `<Storage[4]> to store data"
      const { content, fixCount } = repairUnclosedBackticks(translated, english)
      expect(content).toContain("`<Storage[4]>`")
      expect(fixCount).toBe(1)
    })

    test("leaves balanced backticks unchanged", () => {
      const english = "Use the `<Storage[4]>` to store data"
      const translated = "Use the `<Storage[4]>` to store data"
      const { content, fixCount } = repairUnclosedBackticks(translated, english)
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })
  })

  test.describe("restoreDroppedBackslashEscapes", () => {
    test("restores backslash before < when English has it", () => {
      const english = "Values \\<Storage[4]> are mapped"
      const translated = "Values <Storage[4]> are mapped"
      const { content, fixCount } = restoreDroppedBackslashEscapes(
        translated,
        english
      )
      expect(content).toContain("\\<Storage[4]>")
      expect(fixCount).toBe(1)
    })

    test("restores backslash for <= comparison", () => {
      const english = "When x \\<=256"
      const translated = "When x <=256"
      const { content, fixCount } = restoreDroppedBackslashEscapes(
        translated,
        english
      )
      expect(content).toContain("\\<=256")
      expect(fixCount).toBe(1)
    })

    test("skips code blocks", () => {
      const english = "```\n\\<Storage>\n```\nProse \\<tag>"
      const translated = "```\n<Storage>\n```\nProse <tag>"
      const { content, fixCount } = restoreDroppedBackslashEscapes(
        translated,
        english
      )
      // Code block should not be touched
      expect(content).toContain("```\n<Storage>\n```")
      // Prose should be fixed
      expect(content).toContain("Prose \\<tag>")
      expect(fixCount).toBe(1)
    })
  })

  test.describe("fixCollapsedComponentLineBreaks", () => {
    test("inserts newline between components when English has it", () => {
      const english = "</Card>\n<Card>"
      const translated = "</Card> <Card>"
      const { content, fixCount } = fixCollapsedComponentLineBreaks(
        translated,
        english
      )
      expect(content).toBe("</Card>\n<Card>")
      expect(fixCount).toBe(1)
    })

    test("leaves already-separated components unchanged", () => {
      const english = "</Card>\n<Card>"
      const translated = "</Card>\n<Card>"
      const { content, fixCount } = fixCollapsedComponentLineBreaks(
        translated,
        english
      )
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })
  })
})
