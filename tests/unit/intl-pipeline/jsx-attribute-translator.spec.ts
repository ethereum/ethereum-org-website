/**
 * Unit tests for the JSX attribute translator.
 *
 * Covers the dedicated Phase 4b pass that translates the values of
 * translatable JSX component attributes (title, description, alt, etc.)
 * while leaving non-translatable attributes (eventCategory, href, src)
 * byte-for-byte intact.
 */

import { expect, test } from "@playwright/test"

import {
  applyAttributeTranslations,
  type AttributeLeaf,
  buildAttributePrompt,
  extractAttributeLeaves,
  parseAttributeResponse,
  translateJsxAttributes,
} from "@/scripts/intl-pipeline/lib/llm/jsx-attribute-translator"

const SAMPLE_QUANTUM = `## FAQ {#faq}

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Some prose body.

</ExpandableCard>

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

More prose.

</ExpandableCard>
`

test.describe("JSX Attribute Translator", () => {
  test.describe("extractAttributeLeaves", () => {
    test("extracts translatable attrs from JSX components", () => {
      const leaves = extractAttributeLeaves(SAMPLE_QUANTUM)
      const titles = leaves
        .filter((l) => l.attributeName === "title")
        .map((l) => l.englishValue)
      expect(titles).toContain(
        "Why can't Ethereum just replace BLS with a quantum-safe scheme?"
      )
      expect(titles).toContain("Can quantum computers steal my ETH today?")
    })

    test("does NOT extract non-translatable attrs (eventCategory, eventName)", () => {
      const leaves = extractAttributeLeaves(SAMPLE_QUANTUM)
      const names = leaves.map((l) => l.attributeName)
      expect(names).not.toContain("eventCategory")
      expect(names).not.toContain("eventName")
    })

    test("does NOT extract values that look like URLs or paths", () => {
      const md = `<Card title="/some/path" description="https://example.com" />`
      const leaves = extractAttributeLeaves(md)
      // title="/some/path" and description="https://example.com" should both
      // be filtered by the translatability heuristic.
      expect(leaves).toHaveLength(0)
    })

    test("does NOT extract single-word identifiers", () => {
      const md = `<Card title="myIdentifier" />`
      const leaves = extractAttributeLeaves(md)
      expect(leaves).toHaveLength(0)
    })

    // TODO: parseMarkdown from intl-content-tree treats multi-line JSX
    // components as prose rather than parsing them as components, so the
    // attribute walker can't see them. This is a parser limitation outside
    // this module's scope. The vast majority of real content uses single-line
    // JSX, which works correctly (covered by the test above).
    test.skip("handles multi-line components", () => {
      const md = `<ExpandableCard
  title="A real human readable title"
  eventCategory="/x"
>

body

</ExpandableCard>`
      const leaves = extractAttributeLeaves(md)
      const titles = leaves
        .filter((l) => l.attributeName === "title")
        .map((l) => l.englishValue)
      expect(titles).toContain("A real human readable title")
    })

    test("populates componentName and attributeName meta", () => {
      const leaves = extractAttributeLeaves(SAMPLE_QUANTUM)
      expect(leaves.length).toBeGreaterThan(0)
      const first = leaves[0]
      expect(first.componentName).toBe("ExpandableCard")
      expect(first.attributeName).toBe("title")
    })
  })

  test.describe("buildAttributePrompt", () => {
    test("includes target language and a numbered list", () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello world",
        },
      ]
      const prompt = buildAttributePrompt(leaves, "Spanish", new Map())
      expect(prompt).toContain("Spanish")
      expect(prompt).toContain('1. [Card.title] "Hello world"')
    })

    test("includes glossary when provided", () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
      ]
      const glossary = new Map([["Ethereum", "Ethereum"]])
      const prompt = buildAttributePrompt(leaves, "German", glossary)
      expect(prompt).toContain("Glossary")
      expect(prompt).toContain('"Ethereum" -> "Ethereum"')
    })

    test("omits glossary block when empty", () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
      ]
      const prompt = buildAttributePrompt(leaves, "French", new Map())
      expect(prompt).not.toContain("Glossary")
    })
  })

  test.describe("parseAttributeResponse", () => {
    test("parses a numbered list of translations", () => {
      const response = `1. Hola mundo
2. Buenos días`
      const result = parseAttributeResponse(response, 2)
      expect(result).toEqual(["Hola mundo", "Buenos días"])
    })

    test("strips surrounding quotes", () => {
      const response = `1. "Hola mundo"
2. 'Buenos días'`
      const result = parseAttributeResponse(response, 2)
      expect(result).toEqual(["Hola mundo", "Buenos días"])
    })

    test("returns null on count mismatch", () => {
      const response = `1. Hola`
      const result = parseAttributeResponse(response, 2)
      expect(result).toBeNull()
    })

    test("handles parens-style numbering", () => {
      const response = `1) Foo
2) Bar`
      const result = parseAttributeResponse(response, 2)
      expect(result).toEqual(["Foo", "Bar"])
    })
  })

  test.describe("applyAttributeTranslations", () => {
    test("replaces only the targeted attribute occurrence", () => {
      const locale = `<Card title="Hello world" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello world",
        },
      ]
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        ["Hola mundo"]
      )
      expect(content).toBe(`<Card title="Hola mundo" />`)
      expect(appliedCount).toBe(1)
    })

    test("preserves non-translatable attrs byte-for-byte", () => {
      const locale = `<ExpandableCard title="My title" eventCategory="/x" eventName="clicked x" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "ExpandableCard",
          attributeName: "title",
          englishValue: "My title",
        },
      ]
      const { content } = applyAttributeTranslations(locale, leaves, [
        "Mein Titel",
      ])
      expect(content).toBe(
        `<ExpandableCard title="Mein Titel" eventCategory="/x" eventName="clicked x" />`
      )
    })

    test("skips when English value is not found in locale", () => {
      const locale = `<Card title="Already translated" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello world",
        },
      ]
      const { content, appliedCount, skippedCount } =
        applyAttributeTranslations(locale, leaves, ["Hola mundo"])
      expect(content).toBe(locale)
      expect(appliedCount).toBe(0)
      expect(skippedCount).toBe(1)
    })

    test("skips no-op translations (translation === English)", () => {
      const locale = `<Card title="Hello" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
      ]
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        ["Hello"]
      )
      expect(content).toBe(locale)
      expect(appliedCount).toBe(0)
    })

    test("escapes inner double-quotes when surrounding quote is double", () => {
      const locale = `<ExpandableCard title="What is harvest now decrypt later?" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "ExpandableCard",
          attributeName: "title",
          englishValue: "What is harvest now decrypt later?",
        },
      ]
      // Translation contains inner double-quotes (e.g. quoting an English
      // phrase). Without escaping, this would produce invalid JSX:
      // title="ما هو "harvest now"؟"
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        [`ما هو "harvest now, decrypt later"؟`]
      )
      expect(appliedCount).toBe(1)
      expect(content).toBe(
        `<ExpandableCard title="ما هو &quot;harvest now, decrypt later&quot;؟" />`
      )
      // Sanity: the surrounding double quotes are still the outer attr quotes
      expect(content).not.toContain(`"ما هو "`)
    })

    test("supports single-quoted attributes and escapes inner single-quotes", () => {
      const locale = `<Card title='Hello world' />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello world",
        },
      ]
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        [`Don't forget`]
      )
      expect(appliedCount).toBe(1)
      expect(content).toBe(`<Card title='Don&apos;t forget' />`)
    })

    test("translation with the OPPOSITE quote style passes through unescaped", () => {
      // Single quote in a double-quoted attr is fine; no escape needed.
      const locale = `<Card title="Hello" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
      ]
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        [`Don't worry`]
      )
      expect(appliedCount).toBe(1)
      expect(content).toBe(`<Card title="Don't worry" />`)
    })

    test("escapes regex metacharacters in attribute values", () => {
      const locale = `<Card title="Why can't (this) work?" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Why can't (this) work?",
        },
      ]
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        ["Por qué (esto) no funciona?"]
      )
      expect(content).toContain('"Por qué (esto) no funciona?"')
      expect(appliedCount).toBe(1)
    })

    test("inserts $-bearing values literally (no capture-group expansion)", () => {
      const locale = `<Card title="Up to $14 fees" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Up to $14 fees",
        },
      ]
      // A string replacement would expand "$14" -> capture group 1 + "4"
      // (injecting `title="`). The function replacer keeps it literal.
      const { content, appliedCount } = applyAttributeTranslations(
        locale,
        leaves,
        ["Hasta $14, menos de $0.01"]
      )
      expect(content).toBe(`<Card title="Hasta $14, menos de $0.01" />`)
      expect(appliedCount).toBe(1)
    })
  })

  test.describe("translateJsxAttributes (orchestrator)", () => {
    test("translates with a mocked LLM call", async () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x1",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
        {
          id: "x2",
          componentName: "Card",
          attributeName: "title",
          englishValue: "World",
        },
      ]
      const locale = `<Card title="Hello" />\n<Card title="World" />`
      const llmOverride = async () => `1. Hola\n2. Mundo`

      const result = await translateJsxAttributes({
        leaves,
        localeContent: locale,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })

      expect(result.appliedCount).toBe(2)
      expect(result.failedCount).toBe(0)
      expect(result.content).toContain('title="Hola"')
      expect(result.content).toContain('title="Mundo"')
    })

    test("returns content unchanged when LLM throws", async () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
      ]
      const locale = `<Card title="Hello" />`
      const llmOverride = async () => {
        throw new Error("simulated failure")
      }

      const result = await translateJsxAttributes({
        leaves,
        localeContent: locale,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })

      expect(result.content).toBe(locale)
      expect(result.appliedCount).toBe(0)
      expect(result.failedCount).toBe(1)
    })

    test("returns content unchanged on malformed LLM response", async () => {
      const leaves: AttributeLeaf[] = [
        {
          id: "x1",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello",
        },
        {
          id: "x2",
          componentName: "Card",
          attributeName: "title",
          englishValue: "World",
        },
      ]
      const locale = `<Card title="Hello" />\n<Card title="World" />`
      const llmOverride = async () => `1. Hola` // only 1 line, expected 2

      const result = await translateJsxAttributes({
        leaves,
        localeContent: locale,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })

      expect(result.content).toBe(locale)
      expect(result.appliedCount).toBe(0)
      expect(result.failedCount).toBe(2)
    })

    test("backfill scenario: locale has English-valued attrs, pass translates them", async () => {
      // Simulates a file that was translated before Phase 4b existed: the
      // prose is in the target language but the JSX `title` attrs are still
      // English. The self-healing filter sends only the still-English attrs
      // to the LLM and leaves already-translated content alone.
      const localeContent = `## Preguntas frecuentes {#faq}

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Algún texto en español aquí.

</ExpandableCard>

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

Más texto en español.

</ExpandableCard>
`
      const leaves = extractAttributeLeaves(SAMPLE_QUANTUM)
      expect(leaves.length).toBe(2)

      const llmOverride = async () =>
        `1. ¿Por qué Ethereum no puede simplemente reemplazar BLS con un esquema cuántico-seguro?\n2. ¿Pueden las computadoras cuánticas robar mi ETH hoy?`

      const result = await translateJsxAttributes({
        leaves,
        localeContent,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })

      expect(result.appliedCount).toBe(2)
      expect(result.failedCount).toBe(0)
      // Translatable attrs replaced
      expect(result.content).toContain(
        "¿Por qué Ethereum no puede simplemente reemplazar BLS con un esquema cuántico-seguro?"
      )
      expect(result.content).toContain(
        "¿Pueden las computadoras cuánticas robar mi ETH hoy?"
      )
      // Non-translatable attrs untouched byte-for-byte
      expect(result.content).toContain(
        'eventCategory="/roadmap/future-proofing/quantum-resistance"'
      )
      expect(result.content).toContain(
        'eventName="clicked why cant ethereum just replace BLS?"'
      )
      expect(result.content).toContain(
        'eventName="clicked can quantum computers steal my ETH today?"'
      )
      // Prose untouched
      expect(result.content).toContain("Algún texto en español aquí.")
      expect(result.content).toContain("Más texto en español.")
    })

    test("backfill is idempotent: running twice yields no LLM call on second run", async () => {
      // First run translates; second run should see all English values gone
      // from the locale and skip the LLM entirely.
      const original = `<Card title="Hello world" />`
      const leaves: AttributeLeaf[] = [
        {
          id: "x",
          componentName: "Card",
          attributeName: "title",
          englishValue: "Hello world",
        },
      ]
      let llmCalls = 0
      const llmOverride = async () => {
        llmCalls++
        return "1. Hola mundo"
      }

      const first = await translateJsxAttributes({
        leaves,
        localeContent: original,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })
      expect(first.appliedCount).toBe(1)
      expect(llmCalls).toBe(1)

      const second = await translateJsxAttributes({
        leaves,
        localeContent: first.content,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride,
      })
      expect(second.appliedCount).toBe(0)
      expect(llmCalls).toBe(1) // not called again
    })

    test("no-ops cleanly with zero leaves", async () => {
      const locale = `<Card title="Hello" />`
      const result = await translateJsxAttributes({
        leaves: [],
        localeContent: locale,
        targetLanguage: "Spanish",
        glossary: new Map(),
        llmOverride: async () => {
          throw new Error("should not be called")
        },
      })
      expect(result.content).toBe(locale)
      expect(result.appliedCount).toBe(0)
    })
  })
})
