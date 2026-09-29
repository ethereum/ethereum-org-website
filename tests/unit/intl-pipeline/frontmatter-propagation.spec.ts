/**
 * Frontmatter and preamble propagation in incremental mode.
 *
 * intl-content-tree >= 0.4 exposes frontmatter sequences and mappings as real
 * nodes, so their edits finally reach the pipeline. Before this suite, the
 * pipeline's only frontmatter writer was a single-line regex that spliced a
 * sequence item into the `key:` line and dropped the quotes around values with
 * colons, and translatable fields plus the preamble were detected as drift and
 * then silently dropped.
 *
 * Every assertion re-parses the output frontmatter with `yaml` -- the property
 * that matters is that the file stays valid and carries the English shape.
 */

import { parseDocument } from "yaml"
import { expect, test } from "@playwright/test"

import { getLlmSectionIds, pipeline } from "../../../src/scripts/intl-pipeline"
import { extractSections } from "../../../src/scripts/intl-pipeline/lib/llm/incremental-translate"
import { PREAMBLE_ID } from "../../../src/scripts/intl-pipeline/pipeline"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const doc = (fm: string, body = BODY_EN) => `---\n${fm}\n---\n${body}`

const BODY_EN = `
## Section {#sec}

English prose here.
`
const BODY_DE = `
## Abschnitt {#sec}

Deutscher Text hier.
`

const fmOf = (text: string) => {
  const end = text.indexOf("\n---", 3)
  return text.slice(4, end)
}
const parsedFm = (text: string) => {
  const parsed = parseDocument(fmOf(text))
  expect(
    parsed.errors,
    `frontmatter must stay valid YAML:\n${fmOf(text)}`
  ).toEqual([])
  return parsed.toJS() as Record<string, unknown>
}

/** Model that "translates" by prefixing, one line at a time. */
const prefixing = (sectionId: string, english: string) =>
  english
    .split("\n")
    .map((line) => `[${sectionId}] ${line}`)
    .join("\n")

// ---------------------------------------------------------------------------
// Inert frontmatter: deterministic, no LLM
// ---------------------------------------------------------------------------

test.describe("inert frontmatter propagation", () => {
  test("sequence item update keeps the list shape and item quoting", () => {
    const a = doc('title: "T"\ntopic:\n  - "defi"\n  - "staking"')
    const b = doc('title: "T"\ntopic:\n  - "defi"\n  - "solo-staking"')
    const de = doc('title: "T de"\ntopic:\n  - "defi"\n  - "staking"', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).topic).toEqual(["defi", "solo-staking"])
    expect(fmOf(out)).toContain('  - "solo-staking"')
  })

  test("sequence shrinking from 4 items to 1 removes the dropped items", () => {
    const four = 'topic:\n  - "use-cases"\n  - "ai"\n  - "agents"\n  - "dapps"'
    const a = doc(`title: "T"\n${four}`)
    const b = doc('title: "T"\ntopic:\n  - "use-cases"')
    const de = doc(`title: "T de"\n${four}`, BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).topic).toEqual(["use-cases"])
  })

  test("sequence items are matched by value when the locale list drifted", () => {
    // Locale still carries items English dropped in an earlier, undetected edit
    const a = doc('title: "T"\ntopic:\n  - "defi"\n  - "nft"')
    const b = doc('title: "T"\ntopic:\n  - "defi"\n  - "dao"')
    const de = doc(
      'title: "T de"\ntopic:\n  - "stale"\n  - "defi"\n  - "nft"',
      BODY_DE
    )

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).topic).toEqual(["stale", "defi", "dao"])
  })

  test("sequence item added is inserted at the English position", () => {
    const a = doc('title: "T"\ntopic:\n  - "defi"')
    const b = doc('title: "T"\ntopic:\n  - "defi"\n  - "nft"')
    const de = doc('title: "T de"\ntopic:\n  - "defi"', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).topic).toEqual(["defi", "nft"])
  })

  test("a new inert sequence field is created from English", () => {
    const a = doc('title: "T"\nlang: en')
    const b = doc('title: "T"\nlang: en\ntopic:\n  - "defi"\n  - "nft"')
    const de = doc('title: "T de"\nlang: de', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).topic).toEqual(["defi", "nft"])
    expect(parsedFm(out).lang).toBe("de")
  })

  test("a field English removed is removed from the locale", () => {
    const a = doc('title: "T"\ntopic:\n  - "defi"\nlang: en')
    const b = doc('title: "T"\nlang: en')
    const de = doc('title: "T de"\ntopic:\n  - "defi"\nlang: de', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out)).not.toHaveProperty("topic")
    expect(parsedFm(out).lang).toBe("de")
  })

  test("quoted scalar with a colon stays quoted", () => {
    const a = doc('title: "T"\nbreadcrumb: "AI Agents: Luna"')
    const b = doc('title: "T"\nbreadcrumb: "AI Agents: Nova"')
    const de = doc('title: "T de"\nbreadcrumb: "KI-Agenten: Luna"', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).breadcrumb).toBe("AI Agents: Nova")
    expect(fmOf(out)).toContain('breadcrumb: "AI Agents: Nova"')
  })

  test("plain scalar that now needs quoting is quoted by the serializer", () => {
    const a = doc('title: "T"\nformat: talk')
    const b = doc('title: "T"\nformat: "talk: keynote"')
    const de = doc('title: "T de"\nformat: talk', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).format).toBe("talk: keynote")
  })

  test("unquoted path update still works", () => {
    const a = doc('title: "T"\nimage: /images/old.png')
    const b = doc('title: "T"\nimage: /images/new.png')
    const de = doc('title: "T de"\nimage: /images/old.png', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(fmOf(out)).toContain("image: /images/new.png")
  })

  test("flow sequences keep their spelling", () => {
    const a = doc('title: "T"\ntopic: ["defi", "nft"]\nimage: /a.png')
    const b = doc('title: "T"\ntopic: ["defi", "nft"]\nimage: /b.png')
    const de = doc(
      'title: "T de"\ntopic: ["defi", "nft"]\nimage: /a.png',
      BODY_DE
    )

    const out = pipeline(a, b, de, "markdown")
    expect(fmOf(out)).toContain('topic: ["defi", "nft"]')
    expect(fmOf(out)).toContain("image: /b.png")
  })

  test("comments and untouched fields survive an edit", () => {
    const a = doc('title: "T"\nlang: en # locale\nimage: /a.png')
    const b = doc('title: "T"\nlang: en # locale\nimage: /b.png')
    const de = doc('title: "T de"\nlang: de # locale\nimage: /a.png', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(fmOf(out)).toContain("lang: de # locale")
    expect(fmOf(out)).toContain('title: "T de"')
  })

  test("body is untouched by frontmatter-only changes", () => {
    const a = doc('title: "T"\ntopic:\n  - "defi"')
    const b = doc('title: "T"\ntopic:\n  - "nft"')
    const de = doc('title: "T de"\ntopic:\n  - "defi"', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(out.endsWith(BODY_DE)).toBe(true)
  })

  test("a locale whose frontmatter is not valid YAML is left alone", () => {
    const a = doc('title: "T"\nimage: /a.png')
    const b = doc('title: "T"\nimage: /b.png')
    const de = doc("title: T de\nbroken: [unclosed\nimage: /a.png", BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(fmOf(out)).toBe("title: T de\nbroken: [unclosed\nimage: /a.png")
  })
})

// ---------------------------------------------------------------------------
// Translatable frontmatter: routed to the LLM
// ---------------------------------------------------------------------------

test.describe("translatable frontmatter routing", () => {
  test("a changed description is an LLM section, not a dropped change", () => {
    const a = doc('title: "T"\ndescription: "One"')
    const b = doc('title: "T"\ndescription: "Two"')
    expect(getLlmSectionIds(a, b, "markdown")).toEqual([
      "frontmatter:description",
    ])
  })

  test("summaryPoints and tags are translatable fields", () => {
    const a = doc('title: "T"\nsummaryPoints:\n  - "A"\ntags: ["x"]')
    const b = doc('title: "T"\nsummaryPoints:\n  - "B"\ntags: ["y"]')
    expect(getLlmSectionIds(a, b, "markdown").sort()).toEqual([
      "frontmatter:summaryPoints",
      "frontmatter:tags",
    ])
  })

  test("extractSections exposes translatable fields, one item per line", () => {
    const sections = extractSections(
      doc(
        'title: "T"\ndescription: "D"\ntopic:\n  - "defi"\nsummaryPoints:\n  - "A"\n  - "B"'
      )
    )
    const ids = sections.map((s) => s.id)
    expect(ids).toContain("frontmatter:title")
    expect(ids).toContain("frontmatter:description")
    expect(ids).toContain("frontmatter:summaryPoints")
    expect(ids).not.toContain("frontmatter:topic")
    expect(
      sections.find((s) => s.id === "frontmatter:summaryPoints")?.body
    ).toBe("A\nB")
  })

  test("the model's description is written back with quoting preserved", () => {
    const a = doc('title: "T"\ndescription: "One"')
    const b = doc('title: "T"\ndescription: "Two: expanded"')
    const de = doc('title: "T de"\ndescription: "Eins"', BODY_DE)

    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(parsedFm(out).description).toBe(
      "[frontmatter:description] Two: expanded"
    )
    expect(fmOf(out)).toContain(
      'description: "[frontmatter:description] Two: expanded"'
    )
  })

  test("a translated list is written back item by item", () => {
    const a = doc('title: "T"\nsummaryPoints:\n  - "A"\n  - "B"')
    const b = doc('title: "T"\nsummaryPoints:\n  - "A"\n  - "B2"\n  - "C"')
    const de = doc(
      'title: "T de"\nsummaryPoints:\n  - "A de"\n  - "B de"',
      BODY_DE
    )

    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(parsedFm(out).summaryPoints).toEqual([
      "[frontmatter:summaryPoints] A",
      "[frontmatter:summaryPoints] B2",
      "[frontmatter:summaryPoints] C",
    ])
  })

  test("a list that comes back with the wrong item count falls back to English", () => {
    const a = doc('title: "T"\nsummaryPoints:\n  - "A"\n  - "B"')
    const b = doc('title: "T"\nsummaryPoints:\n  - "A"\n  - "B2"\n  - "C"')
    const de = doc(
      'title: "T de"\nsummaryPoints:\n  - "A de"\n  - "B de"',
      BODY_DE
    )

    const out = pipeline(a, b, de, "markdown", () => "only one line")
    expect(parsedFm(out).summaryPoints).toEqual(["A", "B2", "C"])
  })

  test("a reordered translatable list is retranslated whole, not patched with English", () => {
    const a = doc('title: "T"\nsummaryPoints:\n  - "A"\n  - "B"')
    const b = doc('title: "T"\nsummaryPoints:\n  - "B"\n  - "A"')
    const de = doc(
      'title: "T de"\nsummaryPoints:\n  - "A de"\n  - "B de"',
      BODY_DE
    )

    expect(getLlmSectionIds(a, b, "markdown")).toEqual([
      "frontmatter:summaryPoints",
    ])
    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(parsedFm(out).summaryPoints).toEqual([
      "[frontmatter:summaryPoints] B",
      "[frontmatter:summaryPoints] A",
    ])
  })

  test("without an LLM, English stands in (never silently dropped)", () => {
    const a = doc('title: "T"\ndescription: "One"')
    const b = doc('title: "T"\ndescription: "Two"')
    const de = doc('title: "T de"\ndescription: "Eins"', BODY_DE)

    const out = pipeline(a, b, de, "markdown")
    expect(parsedFm(out).description).toBe("Two")
  })

  test("an empty model response leaves the field untouched", () => {
    const a = doc('title: "T"\ndescription: "One"')
    const b = doc('title: "T"\ndescription: "Two"')
    const de = doc('title: "T de"\ndescription: "Eins"', BODY_DE)

    const out = pipeline(a, b, de, "markdown", () => "")
    expect(parsedFm(out).description).toBe("Eins")
  })

  test("an unchanged translatable field is not sent and not touched", () => {
    const a = doc('title: "T"\ndescription: "One"\nimage: /a.png')
    const b = doc('title: "T"\ndescription: "One"\nimage: /b.png')
    const de = doc('title: "T de"\ndescription: "Eins"\nimage: /a.png', BODY_DE)

    expect(getLlmSectionIds(a, b, "markdown")).toEqual([])
    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(parsedFm(out).description).toBe("Eins")
    expect(parsedFm(out).image).toBe("/b.png")
  })
})

// ---------------------------------------------------------------------------
// Preamble: prose before the first heading
// ---------------------------------------------------------------------------

test.describe("preamble propagation", () => {
  const withPreamble = (intro: string, body: string) =>
    `---\ntitle: "T"\n---\n\n${intro}\n${body}`

  test("a changed intro paragraph routes as one pseudo-section", () => {
    const a = withPreamble("Old intro.", BODY_EN)
    const b = withPreamble("New intro with a [link](/x/).", BODY_EN)
    expect(getLlmSectionIds(a, b, "markdown")).toEqual([PREAMBLE_ID])
  })

  test("the translated intro replaces the locale intro and nothing else", () => {
    const a = withPreamble("Old intro.", BODY_EN)
    const b = withPreamble("New intro.", BODY_EN)
    const de = withPreamble("Alte Einleitung.", BODY_DE)

    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(out).toContain(`\n[${PREAMBLE_ID}] New intro.\n`)
    expect(out).not.toContain("Alte Einleitung.")
    expect(out.endsWith(BODY_DE)).toBe(true)
    expect(fmOf(out)).toBe('title: "T"')
  })

  test("an intro added in English is inserted after the frontmatter", () => {
    const a = `---\ntitle: "T"\n---\n${BODY_EN}`
    const b = withPreamble("Brand new intro.", BODY_EN)
    const de = `---\ntitle: "T de"\n---\n${BODY_DE}`

    const out = pipeline(a, b, de, "markdown", prefixing)
    expect(
      out.startsWith(
        `---\ntitle: "T de"\n---\n\n[${PREAMBLE_ID}] Brand new intro.\n\n## Abschnitt`
      )
    ).toBe(true)
  })
})
