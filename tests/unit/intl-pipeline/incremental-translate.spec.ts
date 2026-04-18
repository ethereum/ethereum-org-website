/**
 * Tests for incremental section-level translation.
 * Tests response parsing and section replacement logic.
 * Does NOT test Gemini API calls.
 */

import { expect, test } from "@playwright/test"

import {
  buildIncrementalPrompt,
  buildSectionList,
  extractJsonSections,
  extractSections,
  parseIncrementalResponse,
  removeMarkdownSection,
  replaceJsonValues,
  replaceSections,
} from "@/scripts/intl-pipeline/lib/llm/incremental-translate"

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

test.describe("buildIncrementalPrompt -- per-file-type BiDi rules", () => {
  const baseOptions = {
    filePath: "test.md",
    targetLanguage: "ar",
    languageName: "Arabic",
    sections: [
      {
        id: "intro",
        action: "TRANSLATE" as const,
        content: "Hello world.",
      },
    ],
    glossaryTerms: new Map<string, string>(),
  }

  test("RTL markdown prompt instructs span dir=ltr wrapping", () => {
    const prompt = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "markdown",
    })
    expect(prompt).toContain('<span dir="ltr">')
    expect(prompt).not.toContain("U+2066")
  })

  test("RTL json prompt instructs raw Unicode bidi isolates and forbids spans", () => {
    const prompt = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "json",
      filePath: "test.json",
    })
    expect(prompt).toContain("U+2066")
    expect(prompt).toContain("U+2069")
    expect(prompt).toContain('Do NOT use <span dir="ltr">')
  })

  test("non-RTL locale has no BiDi rules regardless of fileType", () => {
    const spanishMd = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "markdown",
      targetLanguage: "es",
      languageName: "Spanish",
    })
    const spanishJson = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "json",
      filePath: "test.json",
      targetLanguage: "es",
      languageName: "Spanish",
    })
    expect(spanishMd).not.toContain('<span dir="ltr">')
    expect(spanishMd).not.toContain("U+2066")
    expect(spanishJson).not.toContain('<span dir="ltr">')
    expect(spanishJson).not.toContain("U+2066")
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

// ===================================================================
// buildSectionList -- P1-10
// ===================================================================

test.describe("buildSectionList", () => {
  const englishSections = [
    {
      id: "intro",
      level: 2,
      headingText: "Introduction",
      body: "English intro.",
    },
    {
      id: "details",
      level: 2,
      headingText: "Details",
      body: "English details.",
    },
    {
      id: "conclusion",
      level: 2,
      headingText: "Conclusion",
      body: "English conclusion.",
    },
  ]

  const localeSections = [
    {
      id: "intro",
      level: 2,
      headingText: "Introduccion",
      body: "Intro en espanol.",
    },
    {
      id: "details",
      level: 2,
      headingText: "Detalles",
      body: "Detalles en espanol.",
    },
    {
      id: "conclusion",
      level: 2,
      headingText: "Conclusion",
      body: "Conclusion en espanol.",
    },
  ]

  test("marks specified IDs as TRANSLATE, others as CONTEXT", () => {
    const result = buildSectionList(englishSections, localeSections, [
      "details",
    ])
    expect(result).toHaveLength(3)
    expect(result.find((s) => s.id === "intro")!.action).toBe("CONTEXT")
    expect(result.find((s) => s.id === "details")!.action).toBe("TRANSLATE")
    expect(result.find((s) => s.id === "conclusion")!.action).toBe("CONTEXT")
  })

  test("TRANSLATE sections use English content", () => {
    const result = buildSectionList(englishSections, localeSections, [
      "details",
    ])
    expect(result.find((s) => s.id === "details")!.content).toBe(
      "English details."
    )
  })

  test("CONTEXT sections use locale content", () => {
    const result = buildSectionList(englishSections, localeSections, [
      "details",
    ])
    expect(result.find((s) => s.id === "intro")!.content).toBe(
      "Intro en espanol."
    )
  })

  test("sections without locale match are omitted from CONTEXT", () => {
    const result = buildSectionList(englishSections, [], ["details"])
    // intro and conclusion have no locale match, so only TRANSLATE section appears
    expect(result).toHaveLength(1)
    expect(result[0].action).toBe("TRANSLATE")
  })

  test("preserves document order", () => {
    const result = buildSectionList(englishSections, localeSections, [
      "conclusion",
      "intro",
    ])
    expect(result.map((s) => s.id)).toEqual(["intro", "details", "conclusion"])
  })
})

// ===================================================================
// removeMarkdownSection -- P1-10
// ===================================================================

test.describe("removeMarkdownSection", () => {
  test("removes section by heading ID", () => {
    const content = `## Keep me {#keep}

Keep content.

## Remove me {#remove}

Remove content.

## Also keep {#also-keep}

Also keep content.`

    const result = removeMarkdownSection(content, "remove")
    expect(result).toContain("{#keep}")
    expect(result).toContain("Keep content.")
    expect(result).not.toContain("{#remove}")
    expect(result).not.toContain("Remove content.")
    expect(result).toContain("{#also-keep}")
  })

  test("removes section and its subsections", () => {
    const content = `## Parent {#parent}

Parent content.

### Child {#child}

Child content.

## Next {#next}

Next content.`

    const result = removeMarkdownSection(content, "parent")
    expect(result).not.toContain("Parent content.")
    expect(result).not.toContain("Child content.")
    expect(result).toContain("Next content.")
  })

  test("returns content unchanged if ID not found", () => {
    const content = "## Section {#exists}\n\nContent."
    expect(removeMarkdownSection(content, "nonexistent")).toBe(content)
  })

  test("removes section at end of file", () => {
    const content = `## First {#first}

First content.

## Last {#last}

Last content.`

    const result = removeMarkdownSection(content, "last")
    expect(result).toContain("First content.")
    expect(result).not.toContain("Last content.")
  })
})

// ===================================================================
// extractJsonSections -- P1-10
// ===================================================================

test.describe("extractJsonSections", () => {
  test("extracts top-level string keys", () => {
    const json = JSON.stringify({ title: "Hello", desc: "World" }, null, 2)
    const sections = extractJsonSections(json)
    expect(sections).toHaveLength(2)
    expect(sections[0].id).toBe("title")
    expect(sections[0].body).toBe("Hello")
    expect(sections[1].id).toBe("desc")
    expect(sections[1].body).toBe("World")
  })

  test("flattens nested objects with / separator", () => {
    const json = JSON.stringify(
      {
        nested: { title: "Nested Title", desc: "Nested Desc" },
      },
      null,
      2
    )
    const sections = extractJsonSections(json)
    expect(sections).toHaveLength(2)
    expect(sections[0].id).toBe("nested/title")
    expect(sections[1].id).toBe("nested/desc")
  })

  test("skips non-string values (numbers, booleans, arrays)", () => {
    const json = JSON.stringify(
      {
        text: "translatable",
        count: 42,
        active: true,
        items: ["a", "b"],
      },
      null,
      2
    )
    const sections = extractJsonSections(json)
    expect(sections).toHaveLength(1)
    expect(sections[0].id).toBe("text")
  })

  test("handles empty object", () => {
    const sections = extractJsonSections("{}")
    expect(sections).toHaveLength(0)
  })
})

// ===================================================================
// replaceJsonValues -- P1-10
// ===================================================================

test.describe("replaceJsonValues", () => {
  test("replaces top-level key value", () => {
    const json = JSON.stringify({ title: "Hello", desc: "World" }, null, 2)
    const result = replaceJsonValues(json, { title: "Hola" })
    const parsed = JSON.parse(result)
    expect(parsed.title).toBe("Hola")
    expect(parsed.desc).toBe("World")
  })

  test("replaces nested key with / path", () => {
    const json = JSON.stringify(
      {
        nested: { title: "Hello", desc: "World" },
      },
      null,
      2
    )
    const result = replaceJsonValues(json, { "nested/title": "Hola" })
    const parsed = JSON.parse(result)
    expect(parsed.nested.title).toBe("Hola")
    expect(parsed.nested.desc).toBe("World")
  })

  test("replaces multiple keys at once", () => {
    const json = JSON.stringify({ a: "1", b: "2", c: "3" }, null, 2)
    const result = replaceJsonValues(json, { a: "uno", c: "tres" })
    const parsed = JSON.parse(result)
    expect(parsed.a).toBe("uno")
    expect(parsed.b).toBe("2")
    expect(parsed.c).toBe("tres")
  })

  test("skips invalid key path gracefully", () => {
    const json = JSON.stringify({ title: "Hello" }, null, 2)
    const result = replaceJsonValues(json, { "nonexistent/deep/path": "Hola" })
    const parsed = JSON.parse(result)
    expect(parsed.title).toBe("Hello")
  })

  test("output ends with newline", () => {
    const json = JSON.stringify({ title: "Hello" }, null, 2)
    const result = replaceJsonValues(json, { title: "Hola" })
    expect(result.endsWith("\n")).toBe(true)
  })
})
