/**
 * Output Validation Tests -- P1-9
 *
 * Tests for pre-commit validation of LLM translation output.
 */

import { expect, test } from "@playwright/test"

import {
  validateTranslatedJson,
  validateTranslatedMarkdown,
} from "../../../src/scripts/intl-pipeline/lib/llm/output-validation"

// ===================================================================
// JSON Validation
// ===================================================================

test.describe("validateTranslatedJson", () => {
  const english = JSON.stringify({ title: "Hello", desc: "World" }, null, 2)

  test("valid translation passes", () => {
    const translated = JSON.stringify({ title: "Hola", desc: "Mundo" }, null, 2)
    expect(validateTranslatedJson(translated, english)).toEqual({ valid: true })
  })

  test("empty output fails", () => {
    const result = validateTranslatedJson("", english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Empty")
  })

  test("invalid JSON fails", () => {
    const result = validateTranslatedJson("{broken", english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Invalid JSON")
  })

  test("missing key fails", () => {
    // Same count but different keys
    const translated = JSON.stringify({ title: "Hola", wrong: "Mal" }, null, 2)
    const result = validateTranslatedJson(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Missing keys")
  })

  test("key count mismatch fails", () => {
    const translated = JSON.stringify(
      { title: "Hola", desc: "Mundo", extra: "Oops" },
      null,
      2
    )
    const result = validateTranslatedJson(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Key count mismatch")
  })

  test("Gemini refusal detected", () => {
    const result = validateTranslatedJson(
      "I cannot translate this content",
      english
    )
    expect(result.valid).toBe(false)
    expect(result.error).toContain("refusal")
  })
})

// ===================================================================
// Markdown Validation
// ===================================================================

test.describe("validateTranslatedMarkdown", () => {
  const english = `---
title: Test Page
description: A test description
---

# Heading {#heading}

Some content here.
`

  test("valid translation passes", () => {
    const translated = `---
title: Pagina de prueba
description: Una descripcion de prueba
---

# Encabezado {#heading}

Contenido aqui.
`
    expect(validateTranslatedMarkdown(translated, english)).toEqual({
      valid: true,
    })
  })

  test("empty output fails", () => {
    const result = validateTranslatedMarkdown("", english)
    expect(result.valid).toBe(false)
  })

  test("missing frontmatter fails when English has it", () => {
    const result = validateTranslatedMarkdown("# No frontmatter", english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Missing frontmatter")
  })

  test("unclosed frontmatter fails", () => {
    const result = validateTranslatedMarkdown("---\ntitle: Broken\n", english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Unclosed frontmatter")
  })

  test("suspiciously short output fails", () => {
    const result = validateTranslatedMarkdown("---\ntitle: X\n---\nY", english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Suspiciously short")
  })

  test("untranslated frontmatter (both title and desc) fails", () => {
    const translated = `---
title: Test Page
description: A test description
---

# Contenido traducido
`
    const result = validateTranslatedMarkdown(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("not translated")
  })

  test("untranslated title only is OK (technical titles)", () => {
    const translated = `---
title: Test Page
description: Una descripcion traducida que es lo suficientemente larga
---

# Contenido traducido aqui con suficiente texto para no ser sospechosamente corto y pasar la validacion
`
    const result = validateTranslatedMarkdown(translated, english)
    expect(result.valid).toBe(true)
  })

  test("missing code block placeholder fails", () => {
    const englishWithCode =
      "Some text\n<!-- CODE_BLOCK_0 -->\nMore text\n<!-- CODE_BLOCK_1 -->"
    const translated = "Texto\n<!-- CODE_BLOCK_0 -->\nMas texto"
    const result = validateTranslatedMarkdown(translated, englishWithCode)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("CODE_BLOCK_1")
  })

  test("hallucinated code fences fail when placeholders expected", () => {
    const englishWithCode = "Text\n<!-- CODE_BLOCK_0 -->\nMore"
    const translated =
      "Texto\n<!-- CODE_BLOCK_0 -->\n```solidity\nfake code\n```"
    const result = validateTranslatedMarkdown(translated, englishWithCode)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("hallucinating")
  })

  test("Gemini refusal at start detected", () => {
    const result = validateTranslatedMarkdown(
      "I'm sorry, I cannot translate this.",
      english
    )
    expect(result.valid).toBe(false)
    expect(result.error).toContain("refusal")
  })

  test("mid-content refusal detected", () => {
    const translated = `---
title: Pagina
description: Desc traducida con suficiente longitud para pasar
---

# Seccion uno

Contenido normal aqui.

I cannot translate this section due to policy restrictions.

Mas contenido.
`
    const result = validateTranslatedMarkdown(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Mid-content refusal")
  })
})
