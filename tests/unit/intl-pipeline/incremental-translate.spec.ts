/**
 * Tests for incremental section-level translation.
 * Tests response parsing and section replacement logic.
 * Does NOT test Gemini API calls.
 */

import { expect, test } from "@playwright/test"

import {
  MAX_PROMPT_BYTES,
  RETRY_NOTE_RESERVE_BYTES,
} from "@/scripts/intl-pipeline/constants"
import {
  buildIncrementalPrompt,
  buildSectionList,
  extractJsonSections,
  extractSections,
  PARSE_ATTEMPTS,
  parseIncrementalResponse,
  removeMarkdownSection,
  replaceJsonValues,
  replaceSections,
  translateBatchWithParseRetry,
} from "@/scripts/intl-pipeline/lib/llm/incremental-translate"
import { classifyFailure } from "@/scripts/intl-pipeline/lib/quarantine"

test.describe("parseIncrementalResponse", () => {
  const block = (id: string, body: string) =>
    `<SECTION id="${id}">\n${body}\n</SECTION>`

  test("parses one section per envelope", () => {
    const result = parseIncrementalResponse(
      [
        block("my-section", "Translated content here."),
        block("other-section", "More translated content."),
      ].join("\n\n"),
      ["my-section", "other-section"]
    )
    expect(result["my-section"]).toBe("Translated content here.")
    expect(result["other-section"]).toBe("More translated content.")
  })

  test("a quote needs no escaping -- the format this replaced", () => {
    // The ur shape: every <span dir="ltr"> used to be a \" the model had to
    // get right inside a JSON string. Here it is just a quote.
    const body = 'ایک <span dir="ltr">NFT</span> بنایا گیا۔'
    const result = parseIncrementalResponse(block("a-section", body), [
      "a-section",
    ])
    expect(result["a-section"]).toBe(body)
  })

  test("a backslash needs no escaping either", () => {
    const body = 'echo "Error: no test specified" && exit 1 \\ done'
    const result = parseIncrementalResponse(block("a-section", body), [
      "a-section",
    ])
    expect(result["a-section"]).toBe(body)
  })

  test("keeps multi-line bodies and their blank lines", () => {
    const body = "First paragraph.\n\nSecond paragraph.\n\n- item\n- item"
    const result = parseIncrementalResponse(block("multi", body), ["multi"])
    expect(result["multi"]).toBe(body)
  })

  test("tolerates extra attributes on the tag", () => {
    const result = parseIncrementalResponse(
      '<SECTION action="TRANSLATE" id="x" heading="## Title">\nBody.\n</SECTION>',
      ["x"]
    )
    expect(result["x"]).toBe("Body.")
  })

  test("strips markdown code block wrapping", () => {
    const result = parseIncrementalResponse(
      "```\n" + block("my-section", "Translated.") + "\n```",
      ["my-section"]
    )
    expect(result["my-section"]).toBe("Translated.")
  })

  test("handles leading and trailing whitespace", () => {
    const result = parseIncrementalResponse(
      "  \n" + block("my-section", "Content.") + "\n  ",
      ["my-section"]
    )
    expect(result["my-section"]).toBe("Content.")
  })

  test("throws when the response carries no envelope", () => {
    expect(() =>
      parseIncrementalResponse("Here are your translations!", ["x"])
    ).toThrow(/Failed to parse incremental translation response/)
  })

  test("throws on the old JSON shape rather than accepting it", () => {
    // Hard cutover: a JSON body is a failed response, not a second format.
    expect(() =>
      parseIncrementalResponse('{"my-section": "Translated."}', ["my-section"])
    ).toThrow(/no <SECTION/)
  })

  test("a dropped closing tag fails instead of merging two sections", () => {
    const response = [
      '<SECTION id="first">',
      "First body.",
      '<SECTION id="second">',
      "Second body.",
      "</SECTION>",
    ].join("\n")
    expect(() =>
      parseIncrementalResponse(response, ["first", "second"])
    ).toThrow(/section "first" is missing its closing tag/)
  })

  test("an empty id is refused", () => {
    expect(() =>
      parseIncrementalResponse('<SECTION id="">\nBody.\n</SECTION>', ["x"])
    ).toThrow(/carries no id/)
  })

  test("a truncated response fails instead of half-succeeding", () => {
    // callGeminiRaw only refuses an entirely empty response, so output that
    // stopped at a token limit arrives looking like a success. Every block
    // before the cut parses; the cut one has no closing tag and nothing after
    // it to trip the swallowed-tag check. Under JSON this never parsed at all.
    const truncated = [
      block("first", "Done."),
      '<SECTION id="second">',
      "Half a sent",
    ].join("\n\n")
    expect(() =>
      parseIncrementalResponse(truncated, ["first", "second", "third"])
    ).toThrow(/missing 2 of 3 requested section\(s\): second, third/)
  })

  test("a response short one section is refused whole", () => {
    expect(() =>
      parseIncrementalResponse(block("first", "Done."), ["first", "second"])
    ).toThrow(/missing 1 of 2 requested section\(s\): second/)
  })

  test("the missing-id failure is quarantined as parse, not swallowed", () => {
    const err = (() => {
      try {
        parseIncrementalResponse(block("first", "Done."), ["first", "second"])
      } catch (e) {
        return e as Error
      }
      throw new Error("expected a throw")
    })()
    expect(classifyFailure(err.message)).toBe("parse")
  })

  test("extra sections nobody asked for do not fail the batch", () => {
    const result = parseIncrementalResponse(
      [block("first", "Done."), block("bonus", "Extra.")].join("\n\n"),
      ["first"]
    )
    expect(result["first"]).toBe("Done.")
  })

  test("a > inside a heading attribute stays out of the body", () => {
    // renderSectionBlock escapes " in the heading but not >, and the model is
    // apt to copy the attributes back.
    const result = parseIncrementalResponse(
      '<SECTION id="stake" heading="## 32 >= limit">\nCuerpo.\n</SECTION>',
      ["stake"]
    )
    expect(result["stake"]).toBe("Cuerpo.")
  })

  test("strips a CRLF envelope newline, not the content's", () => {
    const result = parseIncrementalResponse(
      '<SECTION id="x">\r\nLine one.\r\nLine two.\r\n</SECTION>',
      ["x"]
    )
    expect(result["x"]).toBe("Line one.\r\nLine two.")
  })

  test("the quarantine classifies every parse failure the same way", () => {
    const err = (() => {
      try {
        parseIncrementalResponse("not an envelope", ["x"])
      } catch (e) {
        return e as Error
      }
      throw new Error("expected a throw")
    })()
    expect(classifyFailure(err.message)).toBe("parse")
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

  test("the prompt asks for envelopes and never for JSON", () => {
    // The cutover lives in the prompt as much as the parser: if the OUTPUT
    // FORMAT block drifts back to describing a JSON object, the parser starts
    // rejecting every response the model sends.
    const prompt = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "markdown",
    })
    expect(prompt).toContain('<SECTION id="section-id-1">')
    expect(prompt).toContain("MUST NOT be escaped")
    expect(prompt).not.toMatch(/JSON object/)
  })

  test("RTL markdown prompt: span dir=ltr for body, LRI/PDI for frontmatter", () => {
    // Markdown has a dual policy: body uses <span dir="ltr"> (MDX parses HTML
    // and the browser honors `dir`), but frontmatter values must use raw
    // Unicode bidi isolates U+2066 (LRI) / U+2069 (PDI) -- the inner double
    // quote on a `dir="ltr"` attribute terminates the outer YAML string and
    // breaks the build.
    const prompt = buildIncrementalPrompt({
      ...baseOptions,
      fileType: "markdown",
    })
    expect(prompt).toContain('<span dir="ltr">')
    expect(prompt).toContain("U+2066")
    expect(prompt).toContain("U+2069")
    expect(prompt).toContain("frontmatter")
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

test.describe("translateBatchWithParseRetry", () => {
  const ok = '<SECTION id="a-section">\nContenido traducido.\n</SECTION>'
  const batch = {
    prompt: "PROMPT",
    irreducible: false,
    translateIds: ["a-section"],
  }
  const tokens = { input: 10, output: 20 }
  const reply = (text: string) => Promise.resolve({ text, tokensUsed: tokens })

  // No envelope at all -- the model answered in prose.
  const noEnvelope = "Sure! Here are the translated sections."
  // A dropped closing tag, which would silently merge two sections.
  const droppedTag =
    '<SECTION id="a-section">\nUno.\n<SECTION id="b-section">\nDos.\n</SECTION>'

  test("returns the first parsable response without re-sending", async () => {
    let calls = 0
    const r = await translateBatchWithParseRetry(batch, () => {
      calls++
      return reply(ok)
    })
    expect(calls).toBe(1)
    expect(r.translations["a-section"]).toBe("Contenido traducido.")
    expect(r.tokens).toEqual(tokens)
  })

  test("re-sends a response with no envelope and keeps the retry's result", async () => {
    const seen: string[] = []
    let calls = 0
    const r = await translateBatchWithParseRetry(batch, (prompt) => {
      seen.push(prompt)
      return reply(++calls === 1 ? noEnvelope : ok)
    })
    expect(calls).toBe(2)
    expect(r.translations["a-section"]).toBe("Contenido traducido.")
    expect(seen[0]).toBe("PROMPT")
    expect(seen[1]).toContain("COULD NOT BE READ")
  })

  test("re-sends a response whose closing tag was dropped", async () => {
    let calls = 0
    const r = await translateBatchWithParseRetry(batch, () =>
      reply(++calls === 1 ? droppedTag : ok)
    )
    expect(calls).toBe(2)
    expect(r.translations["a-section"]).toBe("Contenido traducido.")
  })

  test("bills every attempt, not just the one that parsed", async () => {
    let calls = 0
    const r = await translateBatchWithParseRetry(batch, () =>
      reply(++calls === 1 ? noEnvelope : ok)
    )
    expect(r.tokens).toEqual({ input: 20, output: 40 })
  })

  test("gives up after PARSE_ATTEMPTS and throws the parse error", async () => {
    let calls = 0
    await expect(
      translateBatchWithParseRetry(batch, () => {
        calls++
        return reply(noEnvelope)
      })
    ).rejects.toThrow(/Failed to parse incremental translation response/)
    expect(calls).toBe(PARSE_ATTEMPTS)
  })

  test("the quarantine still classifies the exhausted failure as parse", async () => {
    const err = await translateBatchWithParseRetry(batch, () =>
      reply(noEnvelope)
    ).catch((e: Error) => e)
    expect(classifyFailure((err as Error).message)).toBe("parse")
  })

  test("reports each re-send once, never the final failure", async () => {
    const attempts: number[] = []
    await translateBatchWithParseRetry(
      batch,
      () => reply(noEnvelope),
      (attempt) => attempts.push(attempt)
    ).catch(() => {})
    expect(attempts).toEqual([1, 2])
  })

  // A prompt the planner would never emit, since it reserves
  // RETRY_NOTE_RESERVE_BYTES; built here to prove the guard behind that reserve.
  const flushToCeiling = {
    prompt: "x".repeat(MAX_PROMPT_BYTES),
    irreducible: false,
    translateIds: ["a-section"],
  }

  test("does not re-send when the note would cross the per-call ceiling", async () => {
    let calls = 0
    await expect(
      translateBatchWithParseRetry(flushToCeiling, () => {
        calls++
        return reply(noEnvelope)
      })
    ).rejects.toThrow(/Failed to parse incremental translation response/)
    // Sending it would have earned a cost-guard refusal instead, which
    // classifies as nothing at all.
    expect(calls).toBe(1)
  })

  test("the refused re-send still quarantines as parse", async () => {
    const err = await translateBatchWithParseRetry(flushToCeiling, () =>
      reply(noEnvelope)
    ).catch((e: Error) => e)
    expect(classifyFailure((err as Error).message)).toBe("parse")
  })

  test("an irreducible batch is re-sent even past the ceiling", async () => {
    let calls = 0
    const r = await translateBatchWithParseRetry(
      { ...flushToCeiling, irreducible: true },
      () => reply(++calls === 1 ? noEnvelope : ok)
    )
    expect(calls).toBe(2)
    expect(r.translations["a-section"]).toBe("Contenido traducido.")
  })

  test("the note stays within the reserved headroom", async () => {
    // A parser complaint long enough to blow the reserve if echoed whole: the
    // offending key is quoted back in the message.
    const longKey = JSON.stringify({ ["k".repeat(3000)]: 42 })
    const small = { prompt: "P", irreducible: false, translateIds: ["a"] }
    let sent = ""
    await translateBatchWithParseRetry(small, (prompt) => {
      sent = prompt
      return reply(longKey)
    }).catch(() => {})
    expect(
      Buffer.byteLength(sent, "utf-8") -
        Buffer.byteLength(small.prompt, "utf-8")
    ).toBeLessThanOrEqual(RETRY_NOTE_RESERVE_BYTES)
  })

  test("re-sends when the response came back a section short", async () => {
    const short = '<SECTION id="a-section">\nUno.\n</SECTION>'
    const both = short + '\n\n<SECTION id="b-section">\nDos.\n</SECTION>'
    let calls = 0
    const r = await translateBatchWithParseRetry(
      { ...batch, translateIds: ["a-section", "b-section"] },
      () => reply(++calls === 1 ? short : both)
    )
    expect(calls).toBe(2)
    expect(r.translations["b-section"]).toBe("Dos.")
  })

  test("the retry note restates the envelope", async () => {
    let sent = ""
    await translateBatchWithParseRetry(batch, (prompt) => {
      sent = prompt
      return reply(noEnvelope)
    }).catch(() => {})
    expect(sent).toContain('<SECTION id="the-section-id">')
    expect(sent).toContain("do not escape quotes or backslashes")
    expect(sent).toContain("PROMPT")
  })
})
