/**
 * Integration tests for the sanitizer entry points.
 * Tests processMarkdownFile and processJsonFile end-to-end.
 */

import { expect, test } from "@playwright/test"

import { _testOnly } from "@/scripts/i18n/post_import_sanitize"

const { processMarkdownFile, processJsonFile } = _testOnly

test.describe("Integration Tests", () => {
  test.describe("processMarkdownFile", () => {
    test("fixes multiple issues in a single pass", () => {
      const content = [
        "---",
        "title: Test",
        "---",
        "",
        "## Heading? Heading? {#heading}",
        "",
        "See [link] (https://example.com) for more.",
        "",
        "\\*\\*bold\\*\\* text here",
        "",
        "Use <<guillemets>> for quoting",
      ].join("\n")

      // Use a path without /translations/ to skip English-comparison fixes
      const result = processMarkdownFile("/tmp/test.md", content)

      expect(result.fixed).toBe(true)
      // Duplicated heading fixed
      expect(result.content).toContain("## Heading? {#heading}")
      expect(result.content).not.toContain("Heading? Heading?")
      // Broken link fixed
      expect(result.content).toContain("[link](https://example.com)")
      // Escaped bold fixed
      expect(result.content).toContain("**bold**")
      // Guillemets fixed
      expect(result.content).toContain("\u00AB")
      expect(result.content).toContain("\u00BB")
    })

    test("standalone fixes applied when path has no translations segment", () => {
      const content = "Some EHT content with \\*\\*bold\\*\\*"
      const result = processMarkdownFile("/tmp/test.md", content)

      expect(result.content).toContain("ETH")
      expect(result.content).toContain("**bold**")
      // Should note that translations segment is missing
      expect(result.issues.some((i) => i.includes("No translations segment"))).toBe(true)
    })
  })

  test.describe("processJsonFile", () => {
    test("removes BOM", () => {
      const content = '\uFEFF{"key": "value"}'
      const result = processJsonFile("/tmp/test.json", content)
      expect(result.fixed).toBe(true)
      expect(result.content).toBe('{"key": "value"}')
    })

    test("removes BOM and validates JSON", () => {
      const content = '\uFEFF{"key": "value", "num": 42}'
      const result = processJsonFile("/tmp/test.json", content)
      expect(result.fixed).toBe(true)
      expect(result.content).toBe('{"key": "value", "num": 42}')
      expect(result.content).not.toContain("\uFEFF")
      expect(result.issues).toHaveLength(0)
    })

    test("reports JSON parse errors", () => {
      const content = '{"key": broken}'
      const result = processJsonFile("/tmp/test.json", content)
      expect(result.issues.some((i) => i.includes("JSON parse error"))).toBe(
        true
      )
    })

    test("leaves valid JSON unchanged", () => {
      const content = '{"key": "value"}'
      const result = processJsonFile("/tmp/test.json", content)
      expect(result.fixed).toBe(false)
      expect(result.content).toBe(content)
    })
  })
})
