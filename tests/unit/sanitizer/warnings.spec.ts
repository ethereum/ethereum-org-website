/**
 * Unit tests for sanitizer warning functions.
 * These functions detect issues and return warnings without modifying content.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/i18n/post_import_sanitize"

const {
  warnPunctuationOnlyHeadings,
  warnCodeFenceContentDrift,
  warnCatastrophicCodeFenceDrift,
  fixTranslatedHrefs,
  detectCrossScriptContamination,
} = _testOnly

test.describe("Warning Functions", () => {
  test.describe("warnPunctuationOnlyHeadings", () => {
    test("warns on heading with only punctuation text", () => {
      const input = "## \u3002 {#who-is-involved}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("only punctuation")
    })

    test("does not warn on real heading text", () => {
      const input = "## Real heading {#id}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings).toHaveLength(0)
    })

    test("warns on question-mark-only heading", () => {
      const input = "## ??? {#faq}"
      const warnings = warnPunctuationOnlyHeadings(input)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("only punctuation")
    })
  })

  test.describe("warnCodeFenceContentDrift", () => {
    test("no warning when fences are identical", () => {
      const content = "```js\nconst x = 1\n```"
      const warnings = warnCodeFenceContentDrift(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("warns when code content was translated", () => {
      const english = "```js\nconst x = 1\n```"
      const translated = "```js\nconst x = 1\u306E\u5024\n```"
      const warnings = warnCodeFenceContentDrift(translated, english)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("content differs")
    })

    test("warns on fence count mismatch", () => {
      const english = "```js\ncode1\n```\n\n```py\ncode2\n```"
      const translated = "```js\ncode1\n```"
      const warnings = warnCodeFenceContentDrift(translated, english)
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("count mismatch")
    })
  })

  test.describe("warnCatastrophicCodeFenceDrift", () => {
    test("detects prose inside fences that should contain code", () => {
      const english = [
        "Some prose here.",
        "",
        "```python",
        "def foo(x, y):",
        "  if x > y:",
        "    return x",
        "  return y",
        "```",
        "",
        "More prose.",
      ].join("\n")
      const translated = [
        "Du texte ici.",
        "",
        "```python",
        "Voici une explication de la fonction.",
        "```",
        "",
        "def foo(x, y):",
        "  if x > y:",
        "    return x",
        "  return y",
        "",
        "Plus de texte.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      expect(warnings.length).toBeGreaterThan(0)
      expect(warnings[0]).toContain("CATASTROPHIC")
    })

    test("detects code keywords outside fences", () => {
      const english = [
        "```python",
        "def unknown2e7ba6ef(uint256 _param1):",
        "  require _param2 == addr(_param2)",
        "  if currentWindow <= _param1:",
        "    revert with 0, 'error'",
        "```",
      ].join("\n")
      const translated = [
        "```python",
        "Voici ce que le decompilateur nous donne.",
        "```",
        "",
        "def unknown2e7ba6ef(uint256 _param1):",
        "  require _param2 == addr(_param2)",
        "  if currentWindow <= _param1:",
        "    revert with 0, 'error'",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      expect(warnings.length).toBeGreaterThan(0)
      const hasCodeOutsideFence = warnings.some(
        (w) => w.includes("code keyword") || w.includes("CATASTROPHIC")
      )
      expect(hasCodeOutsideFence).toBe(true)
    })

    test("no warning when fences match correctly", () => {
      const content = [
        "Some prose.",
        "",
        "```python",
        "def foo():",
        "  return 1",
        "```",
        "",
        "More prose.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("detects detached heading anchor IDs", () => {
      const english = [
        "### claim {#claim}",
        "",
        "Some text about claim.",
      ].join("\n")
      const translated = [
        "### Du texte ici.",
        "",
        "claim {#claim} Le code est complexe.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(translated, english)
      const hasDetachedAnchor = warnings.some((w) =>
        w.includes("anchor")
      )
      expect(hasDetachedAnchor).toBe(true)
    })

    test("no false positive on anchor IDs properly on heading lines", () => {
      const content = [
        "### La revendication {#claim}",
        "",
        "Some text about claim.",
      ].join("\n")
      const warnings = warnCatastrophicCodeFenceDrift(content, content)
      const anchorWarnings = warnings.filter((w) =>
        w.includes("anchor")
      )
      expect(anchorWarnings).toHaveLength(0)
    })
  })

  test.describe("fixTranslatedHrefs (warn-only)", () => {
    test("NEVER modifies content", () => {
      const english =
        "See [docs](/docs) and [about](/about)"
      const translated =
        "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/wrong-path) and [\u6982\u8981](/about)"
      const { content, fixCount } = fixTranslatedHrefs(translated, english)
      expect(content).toBe(translated)
      expect(fixCount).toBe(0)
    })

    test("warns about missing English hrefs", () => {
      const english = "See [docs](/docs) and [about](/about)"
      const translated = "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/docs)"
      const { warnings } = fixTranslatedHrefs(translated, english)
      const missingWarning = warnings.find((w) => w.includes("/about"))
      expect(missingWarning).toBeDefined()
      expect(missingWarning).toContain("Missing href")
    })

    test("warns about translation-only hrefs", () => {
      const english = "See [docs](/docs)"
      const translated =
        "See [\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8](/docs) and [\u4ED6](/other)"
      const { warnings } = fixTranslatedHrefs(translated, english)
      const invalidWarning = warnings.find((w) => w.includes("/other"))
      expect(invalidWarning).toBeDefined()
      expect(invalidWarning).toContain("Invalid internal href")
    })

    test("no warnings when all hrefs match", () => {
      const content = "See [text](/docs) and [more](/about)"
      const { warnings } = fixTranslatedHrefs(content, content)
      expect(warnings).toHaveLength(0)
    })

    test("warns on block count mismatch without modifying content", () => {
      const english = "Block one\n\nBlock two\n\nBlock three"
      const translated = "Block one\n\nBlock two"
      const { content, warnings } = fixTranslatedHrefs(translated, english)
      expect(content).toBe(translated)
      const blockWarning = warnings.find((w) => w.includes("Block count"))
      expect(blockWarning).toBeDefined()
    })
  })

  test.describe("detectCrossScriptContamination", () => {
    test("warns on Cyrillic chars in Japanese content", () => {
      const content = "\u30A4\u30FC\u30B5\u30EA\u30A2\u30E0\u306F \u0410\u0411\u0412 \u3067\u3059"
      const warnings = detectCrossScriptContamination(content, "ja")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("Cyrillic")
    })

    test("warns on Devanagari chars in Bengali content", () => {
      const content = "\u09AC\u09BE\u0982\u09B2\u09BE \u0915\u0916\u0917 \u099F\u09C7\u0995\u09CD\u09B8\u099F"
      const warnings = detectCrossScriptContamination(content, "bn")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("Devanagari")
    })

    test("warns on CJK chars in Tamil content", () => {
      const content = "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u4E2D\u6587 \u0B89\u0BB0\u0BC8"
      const warnings = detectCrossScriptContamination(content, "ta")
      expect(warnings.length).toBe(1)
      expect(warnings[0]).toContain("CJK")
    })

    test("returns no warnings for unknown locale", () => {
      const content = "some \u0410\u0411\u0412 text"
      const warnings = detectCrossScriptContamination(content, "xx-unknown")
      expect(warnings).toHaveLength(0)
    })

    test("skips characters inside code blocks", () => {
      const content = "```\n\u0410\u0411\u0412\n```\n\u30C6\u30B9\u30C8"
      const warnings = detectCrossScriptContamination(content, "ja")
      // Cyrillic is inside code block, should be skipped
      expect(warnings).toHaveLength(0)
    })

    test("skips characters inside inline code", () => {
      const content = "\u30C6\u30B9\u30C8 `\u0410\u0411\u0412` \u30C6\u30B9\u30C8"
      const warnings = detectCrossScriptContamination(content, "ja")
      expect(warnings).toHaveLength(0)
    })
  })
})
