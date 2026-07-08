/**
 * Unit tests for the content normalizer.
 *
 * Covers key behaviors and regressions:
 * - Indented fence handling (no double-indent)
 * - Duplicate placeholder reconstruction
 * - Component children recursive normalization
 * - Prose fence (md/markdown) wrapper placeholders
 * - Hash stability (inert changes don't flip hash)
 */

import { expect, test } from "@playwright/test"

import { normalizeContent } from "@/scripts/intl-pipeline/lib/llm/content-normalizer"

test.describe("Content Normalizer", () => {
  test.describe("indented code fences", () => {
    test("does not double-indent placeholder for indented fences", () => {
      const input = "1. Step\n\n    ```sh\n    pnpm install\n    ```\n\n2. Next"
      const { normalized } = normalizeContent(input)
      // Placeholder should NOT have leading spaces
      const lines = normalized.split("\n")
      const phLine = lines.find((l) => l.includes("HTML-PLACEHOLDER-CODEBLOCK"))
      expect(phLine).toBeDefined()
      expect(phLine!.startsWith("    ")).toBe(false)
    })

    test("reconstruction restores original indentation", () => {
      const input = "1. Step\n\n    ```sh\n    pnpm install\n    ```\n\n2. Next"
      const { normalized, extractions } = normalizeContent(input)
      // Simulate reconstruction
      let result = normalized
      extractions.forEach((original, placeholder) => {
        result = result.split(placeholder).join(original)
      })
      expect(result).toContain("    ```sh")
      expect(result).toContain("    ```")
    })
  })

  test.describe("duplicate content-addressed placeholders", () => {
    test("same inline code produces same placeholder ID", () => {
      const input = "Use `base fee` and then `base fee` again"
      const { normalized } = normalizeContent(input)
      const matches = normalized.match(/HTML-PLACEHOLDER-CODE-[a-f0-9]+/g) || []
      expect(matches.length).toBe(2)
      expect(matches[0]).toBe(matches[1])
    })

    test("same link produces same placeholder ID", () => {
      const input = "See [docs](/docs/) and also [docs](/docs/)"
      const { normalized } = normalizeContent(input)
      const matches = normalized.match(/HTML-PLACEHOLDER-LINK-[a-f0-9]+/g) || []
      // 2 open + 2 close = 4 matches, all same hash
      expect(matches.length).toBe(4)
      expect(matches[0]).toBe(matches[1])
    })
  })

  test.describe("component children normalization", () => {
    test("recursively normalizes children into sub-nodes", () => {
      const input =
        '<ExpandableCard title="What is staking?" eventCategory="test">\n\nSee [link](/url/) for details.\n\n</ExpandableCard>'
      const { tree } = normalizeContent(input)
      // Should have a component node
      const component = tree.find((n) => n.type === "component")
      expect(component).toBeDefined()
      // Component children should include link sub-nodes
      if (component && "children" in component && component.children) {
        const linkNode = component.children.find((c) => c.type === "link")
        expect(linkNode).toBeDefined()
      }
    })

    test("component children text is visible in normalized output (wrapper style)", () => {
      const input =
        '<ExpandableCard title="Frequently asked questions" eventCategory="test">\n\nThis is translatable.\n\n</ExpandableCard>'
      const { normalized } = normalizeContent(input)
      expect(normalized).toContain("This is translatable.")
      expect(normalized).toContain("HTML-PLACEHOLDER-COMPONENT")
    })
  })

  test.describe("prose code fences", () => {
    test("md-tagged fences use wrapper placeholders", () => {
      const input = "```md\nSome prose content\n```"
      const { normalized } = normalizeContent(input)
      // Should be wrapper, not self-closing
      expect(normalized).toContain("<HTML-PLACEHOLDER-CODEBLOCK-")
      expect(normalized).toContain("</HTML-PLACEHOLDER-CODEBLOCK-")
      expect(normalized).toContain("Some prose content")
    })

    test("markdown-tagged fences use wrapper placeholders", () => {
      const input = "```markdown\n# Heading\n\nParagraph\n```"
      const { normalized } = normalizeContent(input)
      expect(normalized).toContain("</HTML-PLACEHOLDER-CODEBLOCK-")
    })

    test("solidity fences use self-closing placeholders", () => {
      const input = "```solidity\ncontract Foo {}\n```"
      const { normalized } = normalizeContent(input)
      expect(normalized).toContain("HTML-PLACEHOLDER-CODEBLOCK-")
      expect(normalized).toContain("/>")
      expect(normalized).not.toContain("contract Foo")
    })
  })

  // Hash stability tests removed -- relied on deleted manifest-generator.
  // Hash behavior now validated by intl-content-tree package (182 tests).

  test.describe("placeholder pre-validation", () => {
    test("rejects content containing reserved placeholder syntax", () => {
      const input = "Text with <HTML-PLACEHOLDER-LINK-abc123> in it"
      expect(() => normalizeContent(input)).toThrow("reserved")
    })

    test("rejects placeholder syntax even inside backticks", () => {
      // Pre-validation runs on raw content before any extraction
      const input = "Use `<HTML-PLACEHOLDER-LINK-abc123>` as example"
      expect(() => normalizeContent(input)).toThrow("reserved")
    })
  })
})
