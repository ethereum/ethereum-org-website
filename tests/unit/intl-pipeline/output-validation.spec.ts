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

  test("missing key fails with diagnostic of which key is missing", () => {
    // Same count but different keys: desc replaced with wrong
    const translated = JSON.stringify({ title: "Hola", wrong: "Mal" }, null, 2)
    const result = validateTranslatedJson(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("missing: desc")
    expect(result.error).toContain("extra: wrong")
  })

  test("key count mismatch fails with diagnostic of which key is extra", () => {
    const translated = JSON.stringify(
      { title: "Hola", desc: "Mundo", extra: "Oops" },
      null,
      2
    )
    const result = validateTranslatedJson(translated, english)
    expect(result.valid).toBe(false)
    expect(result.error).toContain("got 3, expected 2")
    expect(result.error).toContain("extra: extra")
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

  // Regression: whitepaper/index.md zh + zh-tw failed every scheduled run from
  // 2026-07-30 on, three attempts each, at a stable 381-393 chars against the
  // same 1571-char English chunk. Chinese renders that content in ~0.245 of the
  // characters; the flat 0.3 floor read correct output as truncation, the
  // manifest never stamped, and the next run repeated the whole file.
  const longEnglish = `---
title: Test Page
description: A test description
---

# Heading {#heading}

${"The quick brown fox jumps over the lazy dog. ".repeat(34)}
`
  const denseTranslation = `---
title: 測試頁面
description: 測試說明
---

# 標題 {#heading}

${"敏捷的棕色狐狸跳過懶狗。".repeat(30)}
`

  test("dense CJK output passes the CJK floor", () => {
    const ratio = denseTranslation.length / longEnglish.length
    expect(ratio).toBeGreaterThan(0.2)
    expect(ratio).toBeLessThan(0.3)

    expect(
      validateTranslatedMarkdown(denseTranslation, longEnglish, "zh").valid
    ).toBe(true)
    expect(
      validateTranslatedMarkdown(denseTranslation, longEnglish, "zh-tw").valid
    ).toBe(true)
  })

  test("the same ratio still fails for a non-CJK locale", () => {
    const result = validateTranslatedMarkdown(
      denseTranslation,
      longEnglish,
      "es"
    )
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Suspiciously short")
  })

  test("genuinely truncated CJK output still fails", () => {
    const truncated = `---
title: 測試頁面
description: 測試說明
---

# 標題 {#heading}

敏捷的棕色狐狸。
`
    const result = validateTranslatedMarkdown(truncated, longEnglish, "zh")
    expect(result.valid).toBe(false)
    expect(result.error).toContain("Suspiciously short")
  })

  test("omitting targetLanguage keeps the default floor", () => {
    const result = validateTranslatedMarkdown(denseTranslation, longEnglish)
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
