/**
 * Tests for incremental section-level translation.
 * Tests response parsing and section replacement logic.
 * Does NOT test Gemini API calls.
 */

import { expect, test } from "@playwright/test"

import {
  extractSections,
  parseIncrementalResponse,
  replaceSections,
} from "@/scripts/i18n/lib/ai/incremental-translate"

test.describe("parseIncrementalResponse", () => {
  test("parses valid JSON response", () => {
    const response = JSON.stringify({
      "my-section": "Translated content here.",
      "other-section": "More translated content.",
    })
    const result = parseIncrementalResponse(response)
    expect(result["my-section"]).toBe("Translated content here.")
    expect(result["other-section"]).toBe("More translated content.")
  })

  test("strips markdown json code block wrapping", () => {
    const response = '```json\n{"my-section": "Translated."}\n```'
    const result = parseIncrementalResponse(response)
    expect(result["my-section"]).toBe("Translated.")
  })

  test("strips plain code block wrapping", () => {
    const response = '```\n{"my-section": "Translated."}\n```'
    const result = parseIncrementalResponse(response)
    expect(result["my-section"]).toBe("Translated.")
  })

  test("throws on non-object response", () => {
    expect(() => parseIncrementalResponse('"just a string"')).toThrow(
      "Expected a JSON object"
    )
  })

  test("throws on array response", () => {
    expect(() => parseIncrementalResponse("[]")).toThrow(
      "Expected a JSON object"
    )
  })

  test("throws on non-string values", () => {
    expect(() => parseIncrementalResponse('{"section": 42}')).toThrow(
      'Section "section" value is not a string'
    )
  })

  test("throws on invalid JSON", () => {
    expect(() => parseIncrementalResponse("not json at all")).toThrow(
      "Failed to parse"
    )
  })

  test("handles response with whitespace", () => {
    const response = '  \n{"my-section": "Content."}\n  '
    const result = parseIncrementalResponse(response)
    expect(result["my-section"]).toBe("Content.")
  })
})

test.describe("replaceSections", () => {
  const locale = [
    "---",
    "title: Prueba",
    "lang: es",
    "---",
    "",
    "## Primera seccion {#first}",
    "",
    "Contenido de la primera seccion.",
    "",
    "## Segunda seccion {#second}",
    "",
    "Contenido de la segunda seccion.",
    "",
    "## Tercera seccion {#third}",
    "",
    "Contenido de la tercera seccion.",
  ].join("\n")

  test("replaces a single section by ID", () => {
    const result = replaceSections(locale, {
      second: "Nuevo contenido de la segunda seccion.",
    })
    expect(result).toContain("Contenido de la primera seccion.")
    expect(result).toContain("Nuevo contenido de la segunda seccion.")
    expect(result).toContain("Contenido de la tercera seccion.")
    expect(result).toContain("{#second}")
  })

  test("replaces multiple sections", () => {
    const result = replaceSections(locale, {
      first: "Nuevo primero.",
      third: "Nuevo tercero.",
    })
    expect(result).toContain("Nuevo primero.")
    expect(result).toContain("Contenido de la segunda seccion.")
    expect(result).toContain("Nuevo tercero.")
  })

  test("preserves heading line with {#id}", () => {
    const result = replaceSections(locale, { first: "Replacement content." })
    expect(result).toContain("## Primera seccion {#first}")
    expect(result).toContain("Replacement content.")
    expect(result).not.toContain("Contenido de la primera seccion.")
  })

  test("returns unchanged content when no translations provided", () => {
    const result = replaceSections(locale, {})
    expect(result).toBe(locale)
  })

  test("handles section with no matching ID gracefully", () => {
    const result = replaceSections(locale, {
      nonexistent: "This should not appear anywhere problematic.",
    })
    // The nonexistent ID is simply ignored
    expect(result).toContain("Contenido de la primera seccion.")
    expect(result).toContain("Contenido de la segunda seccion.")
    expect(result).toContain("Contenido de la tercera seccion.")
  })

  test("handles nested headings (h3 under h2)", () => {
    const nestedLocale = [
      "## Parent {#parent}",
      "",
      "Parent content.",
      "",
      "### Child {#child}",
      "",
      "Child content.",
      "",
      "## Next {#next}",
      "",
      "Next content.",
    ].join("\n")

    const result = replaceSections(nestedLocale, {
      child: "New child content.",
    })
    expect(result).toContain("Parent content.")
    expect(result).toContain("New child content.")
    expect(result).toContain("Next content.")
    expect(result).toContain("### Child {#child}")
  })

  test("does not duplicate content when parent and child are both replaced", () => {
    const nestedLocale = [
      "## Parent {#parent}",
      "",
      "Parent content.",
      "",
      "### Child {#child}",
      "",
      "Child content.",
      "",
      "## Next {#next}",
      "",
      "Next content.",
    ].join("\n")

    const result = replaceSections(nestedLocale, {
      parent: "New parent content.",
      child: "New child content.",
    })
    // Each should appear exactly once (regression: previously duplicated)
    const parentMatches = result.match(/New parent content\./g)
    const childMatches = result.match(/New child content\./g)
    expect(parentMatches).toHaveLength(1)
    expect(childMatches).toHaveLength(1)
    // Structure preserved
    expect(result).toContain("## Parent {#parent}")
    expect(result).toContain("### Child {#child}")
    expect(result).toContain("Next content.")
  })

  test("preserves frontmatter", () => {
    const result = replaceSections(locale, { first: "Replaced." })
    expect(result).toContain("title: Prueba")
    expect(result).toContain("lang: es")
  })

  test("handles last section (no following heading)", () => {
    const result = replaceSections(locale, { third: "Final replacement." })
    expect(result).toContain("Final replacement.")
    expect(result).not.toContain("Contenido de la tercera seccion.")
  })
})

test.describe("extractSections", () => {
  test("extracts direct body only, not nested subsections", () => {
    const md = [
      "## Parent {#parent}",
      "",
      "Parent body.",
      "",
      "### Child {#child}",
      "",
      "Child body.",
      "",
      "## Sibling {#sibling}",
      "",
      "Sibling body.",
    ].join("\n")

    const sections = extractSections(md)
    const parent = sections.find((s) => s.id === "parent")
    const child = sections.find((s) => s.id === "child")

    expect(parent).toBeDefined()
    expect(parent!.body).toContain("Parent body.")
    expect(parent!.body).not.toContain("Child body.")

    expect(child).toBeDefined()
    expect(child!.body).toContain("Child body.")
  })
})
