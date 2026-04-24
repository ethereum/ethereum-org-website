/**
 * Chunking Tests -- CONCURRENCY-SPEC.md Part 2
 *
 * Validates byte-size-aware chunking for JSON, Markdown, and incremental sections.
 * MAX_CHUNK_BYTES = 65,536 (64KB)
 *
 * Tests with stubs will throw until real implementations are wired in.
 */

import { expect, test } from "@playwright/test"

import { MAX_CHUNK_BYTES } from "../../../src/scripts/intl-pipeline/constants"
import { chunkMarkdownProse } from "../../../src/scripts/intl-pipeline/lib/llm/code-block-extractor"
import { batchSections } from "../../../src/scripts/intl-pipeline/lib/llm/incremental-translate"
// ---------------------------------------------------------------------------
// Imports -- real for implemented modules, stubs for pending
// ---------------------------------------------------------------------------
import {
  chunkJson,
  mergeJsonBatches as mergeJsonChunks,
} from "../../../src/scripts/intl-pipeline/lib/llm/json-batcher"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeJsonWithKeys(count: number, valueSize: number): string {
  const obj: Record<string, string> = {}
  for (let i = 0; i < count; i++) {
    obj[`key-${String(i).padStart(3, "0")}`] = "x".repeat(valueSize)
  }
  return JSON.stringify(obj, null, 2)
}

function makeMarkdownSections(count: number, sizePerSection: number): string {
  const sections: string[] = []
  for (let i = 0; i < count; i++) {
    const heading = `## Section ${i + 1} {#section-${i + 1}}`
    const para = "Lorem ipsum dolor sit amet. ".repeat(
      Math.ceil(sizePerSection / 28)
    )
    sections.push(`${heading}\n\n${para.slice(0, sizePerSection)}`)
  }
  return sections.join("\n\n")
}

function byteSize(s: string): number {
  return Buffer.byteLength(s, "utf-8")
}

// ===================================================================
// PART 2A: JSON Chunking -- byte-size-aware (Spec lines 75-94)
// ===================================================================

test.describe("JSON chunking (byte-size-aware)", () => {
  test("file under 64KB produces 1 chunk", () => {
    const small = makeJsonWithKeys(10, 100)
    expect(byteSize(small)).toBeLessThan(MAX_CHUNK_BYTES)
    const chunks = chunkJson(small)
    expect(chunks).toHaveLength(1)
  })

  test("50 keys averaging 2KB each (~100KB) produces 2 chunks", () => {
    const large = makeJsonWithKeys(50, 2000)
    expect(byteSize(large)).toBeGreaterThan(MAX_CHUNK_BYTES)
    const chunks = chunkJson(large)
    expect(chunks).toHaveLength(2)
    for (const chunk of chunks) {
      expect(byteSize(chunk)).toBeLessThanOrEqual(MAX_CHUNK_BYTES + 1024)
    }
  })

  test("3 keys with one 200KB value produces 3 chunks (1 per key)", () => {
    const obj: Record<string, string> = {
      small1: "short value",
      huge: "x".repeat(200_000),
      small2: "another short value",
    }
    const json = JSON.stringify(obj, null, 2)
    const chunks = chunkJson(json)
    expect(chunks).toHaveLength(3)
  })

  test("single key exceeding budget produces 1 chunk (minimum guarantee)", () => {
    const obj = { "only-key": "x".repeat(100_000) }
    const json = JSON.stringify(obj, null, 2)
    const chunks = chunkJson(json)
    expect(chunks).toHaveLength(1)
  })

  test("key order preserved across chunks", () => {
    const keys = Array.from(
      { length: 30 },
      (_, i) => `key-${String(i).padStart(2, "0")}`
    )
    const obj: Record<string, string> = {}
    for (const k of keys) {
      obj[k] = "x".repeat(3000)
    }
    const json = JSON.stringify(obj, null, 2)
    const chunks = chunkJson(json)
    expect(chunks.length).toBeGreaterThan(1)

    const allKeys: string[] = []
    for (const chunk of chunks) {
      allKeys.push(...Object.keys(JSON.parse(chunk)))
    }
    expect(allKeys).toEqual(keys)
  })

  test("merged output matches original structure", () => {
    const obj: Record<string, string> = {}
    for (let i = 0; i < 40; i++) {
      obj[`key-${i}`] = `value-${i}-${"padding".repeat(500)}`
    }
    const json = JSON.stringify(obj, null, 2)
    const chunks = chunkJson(json)
    expect(chunks.length).toBeGreaterThan(1)

    const merged = mergeJsonChunks(chunks)
    expect(JSON.parse(merged)).toEqual(JSON.parse(json))
  })

  test("nested objects measured as one unit", () => {
    const obj: Record<string, unknown> = {
      simple: "x".repeat(20_000),
      nested: {
        a: "x".repeat(40_000),
        b: "y".repeat(40_000),
      },
      another: "y".repeat(20_000),
    }
    const json = JSON.stringify(obj, null, 2)
    // Total: ~120KB. "nested" alone is ~80KB (one unit, exceeds budget)
    // Should split into at least 2 chunks
    const chunks = chunkJson(json)
    expect(chunks.length).toBeGreaterThanOrEqual(2)
  })

  test("empty JSON object produces 1 chunk", () => {
    const chunks = chunkJson("{}")
    expect(chunks).toHaveLength(1)
  })

  test("file at exactly 64KB produces 1 chunk (boundary)", () => {
    let obj: Record<string, string> = { a: "" }
    let json = JSON.stringify(obj, null, 2)
    const padding = MAX_CHUNK_BYTES - byteSize(json)
    obj = { a: "x".repeat(Math.max(0, padding - 10)) }
    json = JSON.stringify(obj, null, 2)
    expect(byteSize(json)).toBeLessThanOrEqual(MAX_CHUNK_BYTES)
    const chunks = chunkJson(json)
    expect(chunks).toHaveLength(1)
  })

  test("CJK values chunk by byte size, not character count", () => {
    // Korean chars are 3 bytes each in UTF-8
    const koreanValue = "\uD55C".repeat(22_000) // ~66KB in UTF-8
    const obj = { "ko-text": koreanValue }
    const json = JSON.stringify(obj, null, 2)
    expect(byteSize(json)).toBeGreaterThan(MAX_CHUNK_BYTES)
    // Single key: minimum guarantee still produces 1 chunk
    const chunks = chunkJson(json)
    expect(chunks).toHaveLength(1)
  })
})

// ===================================================================
// PART 2B: Markdown Prose Chunking (Spec lines 96-113)
// ===================================================================

test.describe("Markdown chunking (heading + paragraph aware)", () => {
  test("file under 64KB produces 1 chunk", () => {
    const small = makeMarkdownSections(3, 5000)
    expect(byteSize(small)).toBeLessThan(MAX_CHUNK_BYTES)
    const chunks = chunkMarkdownProse(small)
    expect(chunks).toHaveLength(1)
  })

  test("3 sections of 40KB each produces 3 chunks", () => {
    const large = makeMarkdownSections(3, 40_000)
    expect(byteSize(large)).toBeGreaterThan(MAX_CHUNK_BYTES)
    const chunks = chunkMarkdownProse(large)
    expect(chunks).toHaveLength(3)
  })

  test("single 100KB section splits on paragraph boundaries", () => {
    const heading = "## Large section {#large-section}"
    const paragraphs: string[] = []
    for (let i = 0; i < 20; i++) {
      paragraphs.push("Lorem ipsum. ".repeat(400))
    }
    const section = `${heading}\n\n${paragraphs.join("\n\n")}`
    expect(byteSize(section)).toBeGreaterThan(MAX_CHUNK_BYTES)
    const chunks = chunkMarkdownProse(section)
    expect(chunks.length).toBeGreaterThan(1)
  })

  test("heading context included in each chunk of a split section", () => {
    const heading = "## Split section {#split-section}"
    const paragraphs: string[] = []
    for (let i = 0; i < 20; i++) {
      paragraphs.push(`Paragraph ${i}. ${"x".repeat(5000)}`)
    }
    const section = `${heading}\n\n${paragraphs.join("\n\n")}`
    const chunks = chunkMarkdownProse(section)
    for (const chunk of chunks) {
      expect(chunk).toContain("{#split-section}")
    }
  })

  test("reassembled output preserves all headings and content", () => {
    const sections = makeMarkdownSections(5, 20_000)
    const chunks = chunkMarkdownProse(sections)
    expect(chunks.length).toBeGreaterThan(1)
    const reassembled = chunks.join("\n\n")
    for (let i = 1; i <= 5; i++) {
      expect(reassembled).toContain(`{#section-${i}}`)
    }
  })

  test("code fences not split mid-fence", () => {
    const heading = "## Code section {#code-section}"
    const codeFence = "```solidity\n" + "// line\n".repeat(3000) + "```"
    const prose = "Some text before.\n\n" + codeFence + "\n\nSome text after."
    const section = `${heading}\n\n${prose}`
    const chunks = chunkMarkdownProse(section)
    for (const chunk of chunks) {
      const opens = (chunk.match(/```/g) || []).length
      expect(opens % 2).toBe(0)
    }
  })

  test("flat prose with no headings still chunks on paragraphs", () => {
    const paragraphs: string[] = []
    for (let i = 0; i < 20; i++) {
      paragraphs.push("No heading here. ".repeat(300))
    }
    const flatProse = paragraphs.join("\n\n")
    expect(byteSize(flatProse)).toBeGreaterThan(MAX_CHUNK_BYTES)
    const chunks = chunkMarkdownProse(flatProse)
    expect(chunks.length).toBeGreaterThan(1)
  })

  test("empty sections do not produce empty chunks", () => {
    const md = [
      "## Empty one {#empty-one}",
      "",
      "## Empty two {#empty-two}",
      "",
      "## Has content {#has-content}",
      "",
      "x".repeat(10_000),
    ].join("\n")
    const chunks = chunkMarkdownProse(md)
    for (const chunk of chunks) {
      expect(chunk.trim().length).toBeGreaterThan(0)
    }
  })

  test("single paragraph exceeding 64KB still produces a chunk (minimum guarantee)", () => {
    const heading = "## Giant para {#giant-para}"
    const giant = "word ".repeat(20_000)
    const section = `${heading}\n\n${giant}`
    const chunks = chunkMarkdownProse(section)
    expect(chunks.length).toBeGreaterThanOrEqual(1)
    expect(chunks[0]).toContain("{#giant-para}")
  })
})

// ===================================================================
// PART 2C: Incremental Section Batching (Spec lines 115-126)
// ===================================================================

test.describe("Incremental section batching (byte-size-aware)", () => {
  test("5 small sections (total 10KB) produce 1 batch", () => {
    const sections = Array.from({ length: 5 }, (_, i) => ({
      id: `section-${i}`,
      content: "x".repeat(2000),
      action: "TRANSLATE" as const,
    }))
    const batches = batchSections(sections)
    expect(batches).toHaveLength(1)
  })

  test("3 large sections (total 200KB) produce multiple batches", () => {
    const sections = Array.from({ length: 3 }, (_, i) => ({
      id: `section-${i}`,
      content: "x".repeat(70_000),
      action: "TRANSLATE" as const,
    }))
    const batches = batchSections(sections)
    expect(batches.length).toBeGreaterThan(1)
  })

  test("CONTEXT sections included in each batch", () => {
    const sections = [
      {
        id: "ctx-1",
        content: "Context for quality.",
        action: "CONTEXT" as const,
      },
      { id: "tr-1", content: "x".repeat(40_000), action: "TRANSLATE" as const },
      { id: "tr-2", content: "x".repeat(40_000), action: "TRANSLATE" as const },
    ]
    const batches = batchSections(sections)
    expect(batches.length).toBeGreaterThan(1)
    for (const batch of batches) {
      expect(batch.some((s) => s.action === "CONTEXT")).toBe(true)
    }
  })

  test("all TRANSLATE sections present across batches", () => {
    const translateIds = ["a", "b", "c", "d", "e"]
    const sections = translateIds.map((id) => ({
      id,
      content: "x".repeat(20_000),
      action: "TRANSLATE" as const,
    }))
    const batches = batchSections(sections)
    const allIds = batches.flatMap((b) =>
      b.filter((s) => s.action === "TRANSLATE").map((s) => s.id)
    )
    expect(allIds.sort()).toEqual(translateIds.sort())
  })

  test("single oversized TRANSLATE section gets its own batch", () => {
    const sections = [
      { id: "small", content: "short", action: "TRANSLATE" as const },
      {
        id: "huge",
        content: "x".repeat(100_000),
        action: "TRANSLATE" as const,
      },
      { id: "small2", content: "also short", action: "TRANSLATE" as const },
    ]
    const batches = batchSections(sections)
    const hugeBatch = batches.find((b) =>
      b.some((s) => s.id === "huge" && s.action === "TRANSLATE")
    )
    expect(hugeBatch).toBeDefined()
    expect(hugeBatch!.filter((s) => s.action === "TRANSLATE")).toHaveLength(1)
  })

  test("all CONTEXT, no TRANSLATE produces 0 batches", () => {
    const sections = [
      { id: "ctx-1", content: "context only", action: "CONTEXT" as const },
      { id: "ctx-2", content: "more context", action: "CONTEXT" as const },
    ]
    const batches = batchSections(sections)
    expect(batches).toHaveLength(0)
  })

  test("single small TRANSLATE section produces 1 batch", () => {
    const sections = [
      { id: "only", content: "short text", action: "TRANSLATE" as const },
    ]
    const batches = batchSections(sections)
    expect(batches).toHaveLength(1)
  })

  test("large CONTEXT sections counted toward batch byte budget", () => {
    const sections = [
      {
        id: "big-ctx",
        content: "x".repeat(50_000),
        action: "CONTEXT" as const,
      },
      { id: "tr-1", content: "x".repeat(20_000), action: "TRANSLATE" as const },
      { id: "tr-2", content: "x".repeat(20_000), action: "TRANSLATE" as const },
    ]
    const batches = batchSections(sections)
    expect(batches.length).toBeGreaterThan(1)
  })
})
