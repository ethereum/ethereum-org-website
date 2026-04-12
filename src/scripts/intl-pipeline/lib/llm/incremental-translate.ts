/**
 * Incremental section-level translation via Gemini.
 *
 * When drift detection identifies prose changes in specific sections,
 * this module sends ONE batched Gemini call per file with all changed
 * sections marked for translation and unchanged sections as context.
 *
 * Gemini returns translated sections as JSON keyed by section ID,
 * which are surgically placed back into the locale file.
 */

import { getLanguageGroup, getSiteSpecificNotes } from "./language-groups"

// Types for section-level translation
interface SectionForPrompt {
  /** Section heading ID */
  id: string
  /** "TRANSLATE" for changed sections, "CONTEXT" for surrounding context */
  action: "TRANSLATE" | "CONTEXT"
  /** The section content (normalized English for TRANSLATE, existing locale for CONTEXT) */
  content: string
  /** Heading text (for reference) */
  headingText?: string
  /** Heading level */
  level?: number
}

interface IncrementalTranslateOptions {
  /** English file path */
  filePath: string
  /** Target language code */
  targetLanguage: string
  /** Language display name */
  languageName: string
  /** Sections in document order with action tags */
  sections: SectionForPrompt[]
  /** Filtered glossary terms for this file */
  glossaryTerms: Map<string, string>
}

interface IncrementalTranslateResult {
  /** Map of section ID -> translated content */
  translations: Record<string, string>
  /** Token usage */
  tokensUsed: { input: number; output: number }
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

/**
 * Build a batched section-level translation prompt.
 *
 * All sections are included in document order. Changed sections are
 * tagged TRANSLATE; unchanged sections are tagged CONTEXT (existing
 * locale translation for voice/tone consistency).
 *
 * Gemini returns only the TRANSLATE sections as a JSON object
 * keyed by section ID.
 */
export function buildIncrementalPrompt(
  options: IncrementalTranslateOptions
): string {
  const { filePath, targetLanguage, languageName, sections, glossaryTerms } =
    options

  const group = getLanguageGroup(targetLanguage)
  const siteNotes = getSiteSpecificNotes(group)
  const glossarySection = formatGlossary(glossaryTerms)

  const translateIds = sections
    .filter((s) => s.action === "TRANSLATE")
    .map((s) => s.id)

  const sectionBlocks = sections
    .map((s) => {
      const headingAttr = s.headingText
        ? ` heading="${(s.level ? "#".repeat(s.level) + " " : "") + s.headingText.replace(/"/g, "&quot;")}"`
        : ""
      return `<SECTION id="${s.id}" action="${s.action}"${headingAttr}>\n${s.content}\n</SECTION>`
    })
    .join("\n\n")

  return `You are updating an existing translation. Some sections of this file changed in English and need retranslation. Other sections are provided as CONTEXT ONLY -- they show the existing translation voice and terminology.

File: ${filePath}
Target language: ${languageName} (${targetLanguage})
Sections to translate: ${translateIds.join(", ")}

${siteNotes}

${glossarySection}

RULES:
- Translate ONLY the content within <SECTION action="TRANSLATE"> tags.
- Use <SECTION action="CONTEXT"> sections for tone and terminology reference. Do NOT retranslate them.
- Preserve all markdown syntax, heading anchors {#id}, and placeholder tags exactly.
- Preserve heading anchor IDs exactly as in English ({#anchor-id}).

PLACEHOLDER RULES:
Self-closing placeholders (preserve exactly): <HTML-PLACEHOLDER-CODEBLOCK-****** />, <HTML-PLACEHOLDER-CODE-****** />, <HTML-PLACEHOLDER-IMAGE-****** />
Wrapper placeholders (translate text between tags): <HTML-PLACEHOLDER-LINK-******>text</...>, <HTML-PLACEHOLDER-HTMLTAG-******>text</...>, <HTML-PLACEHOLDER-COMPONENT-******>text</...>
You MAY reorder wrapper placeholders to match natural ${targetLanguage} word order.

OUTPUT FORMAT:
Return a JSON object where each key is a section ID from the TRANSLATE list, and the value is the translated content for that section. Example:
{
  "section-id-1": "translated content...",
  "section-id-2": "translated content..."
}

Output ONLY the JSON object. No markdown wrapping, no explanations, no XML tags.

=== SECTIONS ===
${sectionBlocks}
=== END SECTIONS ===`
}

// ---------------------------------------------------------------------------
// Response parser
// ---------------------------------------------------------------------------

/**
 * Parse Gemini's JSON response into a section ID -> translation map.
 */
export function parseIncrementalResponse(
  responseText: string
): Record<string, string> {
  // Strip markdown code block wrapping if present
  let cleaned = responseText.trim()
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n/, "").replace(/\n```\s*$/, "")
  }

  try {
    const parsed = JSON.parse(cleaned)
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      throw new Error("Expected a JSON object with section IDs as keys")
    }
    // Validate all values are strings
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== "string") {
        throw new Error(`Section "${key}" value is not a string`)
      }
    }
    return parsed as Record<string, string>
  } catch (error) {
    throw new Error(
      `Failed to parse incremental translation response: ${error instanceof Error ? error.message : String(error)}\nRaw response (first 500 chars): ${responseText.slice(0, 500)}`
    )
  }
}

// ---------------------------------------------------------------------------
// Section replacement
// ---------------------------------------------------------------------------

/**
 * Replace specific sections in a locale file with fresh translations.
 *
 * Finds each section by its heading ID and replaces the body content
 * between the heading line and the next heading of equal or higher level.
 * Preserves the heading line with its {#id} anchor.
 */
export function replaceSections(
  localeContent: string,
  translations: Record<string, string>
): string {
  const lines = localeContent.split("\n")
  const result: string[] = []

  // Build a map of heading ID -> { lineIndex, level } for the locale file
  const headingPattern = /^(#{1,6})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/
  const sectionRanges: Array<{
    id: string
    level: number
    startLine: number
    endLine: number
  }> = []

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(headingPattern)
    if (match) {
      const level = match[1].length
      const customId = match[3]
      if (customId) {
        sectionRanges.push({ id: customId, level, startLine: i, endLine: -1 })
      }
    }
  }

  // Calculate end lines (next heading of ANY level, or EOF).
  // Each section only covers its own direct body, not nested subsections.
  // This prevents duplicate content when both parent and child are replaced.
  for (let i = 0; i < sectionRanges.length; i++) {
    sectionRanges[i].endLine =
      i + 1 < sectionRanges.length
        ? sectionRanges[i + 1].startLine
        : lines.length
  }

  // Handle _preamble replacement (content between frontmatter and first heading)
  let lineIdx = 0
  if (translations["_preamble"] !== undefined) {
    const fmEnd = findFrontmatterEnd(lines)
    const firstHeading =
      sectionRanges.length > 0 ? sectionRanges[0].startLine : lines.length
    // Copy frontmatter
    for (let i = 0; i < fmEnd; i++) {
      result.push(lines[i])
    }
    // Insert translated preamble
    result.push("")
    result.push(translations["_preamble"].trim())
    result.push("")
    // Skip old preamble, start processing from first heading (or EOF)
    lineIdx = firstHeading
  }

  // Build the output, replacing heading sections that have translations
  for (const section of sectionRanges) {
    // Copy lines before this section (or between sections)
    while (lineIdx < section.startLine) {
      result.push(lines[lineIdx])
      lineIdx++
    }

    if (translations[section.id] !== undefined) {
      // Keep the heading line (with {#id})
      result.push(lines[section.startLine])
      // Insert translated content
      const translated = translations[section.id].trim()
      result.push("")
      result.push(translated)
      result.push("")
      // Skip the old section body
      lineIdx = section.endLine
    } else {
      // Keep existing content
      while (lineIdx < section.endLine) {
        result.push(lines[lineIdx])
        lineIdx++
      }
    }
  }

  // Copy any remaining lines after the last section
  while (lineIdx < lines.length) {
    result.push(lines[lineIdx])
    lineIdx++
  }

  return result.join("\n")
}

// ---------------------------------------------------------------------------
// Section extraction
// ---------------------------------------------------------------------------

interface ExtractedSection {
  id: string
  level: number
  headingText: string
  /** Body content below the heading (excludes heading line) */
  body: string
}

/**
 * Extract sections from a markdown file, keyed by heading {#id}.
 * Returns sections in document order.
 */
export function extractSections(content: string): ExtractedSection[] {
  const lines = content.split("\n")
  const headingPattern = /^(#{1,6})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/
  const sections: ExtractedSection[] = []

  // Find all heading positions
  const headings: Array<{
    line: number
    level: number
    id: string
    text: string
  }> = []
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(headingPattern)
    if (match) {
      const level = match[1].length
      const rawText = match[2]
      const customId = match[3]
      if (customId) {
        headings.push({
          line: i,
          level,
          id: customId,
          text: rawText.replace(/\s*\{#[^}]+\}/, "").trim(),
        })
      }
    }
  }

  // Extract preamble: content between frontmatter and first heading.
  // Many pages use the frontmatter title as h1, so prose between
  // frontmatter and the first ## is the intro paragraph.
  const frontmatterEnd = findFrontmatterEnd(lines)
  const firstHeadingLine = headings.length > 0 ? headings[0].line : lines.length
  if (frontmatterEnd < firstHeadingLine) {
    const preamble = lines
      .slice(frontmatterEnd, firstHeadingLine)
      .join("\n")
      .trim()
    if (preamble.length > 0) {
      sections.push({
        id: "_preamble",
        level: 0,
        headingText: "",
        body: preamble,
      })
    }
  }

  // Extract body content for each heading.
  // Each section only covers its own direct body (up to next heading of ANY
  // level), not nested subsections. Mirrors replaceSections logic.
  for (let i = 0; i < headings.length; i++) {
    const current = headings[i]
    const bodyStart = current.line + 1
    const bodyEnd =
      i + 1 < headings.length ? headings[i + 1].line : lines.length

    const body = lines.slice(bodyStart, bodyEnd).join("\n").trim()
    sections.push({
      id: current.id,
      level: current.level,
      headingText: current.text,
      body,
    })
  }

  return sections
}

/**
 * Build the TRANSLATE/CONTEXT section list for an incremental prompt.
 *
 * @param englishSections - Sections from current English file
 * @param localeSections - Sections from existing locale file
 * @param translateIds - Section IDs that need translation (from drift detection)
 */
export function buildSectionList(
  englishSections: ExtractedSection[],
  localeSections: ExtractedSection[],
  translateIds: string[]
): SectionForPrompt[] {
  const localeMap = new Map<string, ExtractedSection>()
  for (const s of localeSections) {
    localeMap.set(s.id, s)
  }

  const translateSet = new Set(translateIds)
  const result: SectionForPrompt[] = []

  for (const section of englishSections) {
    if (translateSet.has(section.id)) {
      // Changed section: send English content for translation
      result.push({
        id: section.id,
        action: "TRANSLATE",
        content: section.body,
        headingText: section.headingText,
        level: section.level,
      })
    } else {
      // Unchanged section: send existing locale translation as context
      const localeSection = localeMap.get(section.id)
      if (localeSection) {
        result.push({
          id: section.id,
          action: "CONTEXT",
          content: localeSection.body,
          headingText: localeSection.headingText,
          level: section.level,
        })
      }
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Section removal
// ---------------------------------------------------------------------------

/**
 * Remove a markdown section by its heading {#id} anchor.
 * Removes the heading line and all body content up to the next heading
 * of the same or higher level (or EOF). For removal, we DO want to
 * remove nested subsections (unlike replaceSections which is leaf-only).
 */
export function removeMarkdownSection(
  content: string,
  sectionId: string
): string {
  const lines = content.split("\n")
  const headingPattern = /^(#{1,6})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/
  let startLine = -1
  let startLevel = 0

  // Find the heading with this ID
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(headingPattern)
    if (match && match[3] === sectionId) {
      startLine = i
      startLevel = match[1].length
      break
    }
  }

  if (startLine === -1) return content

  // Find the end: next heading of same or higher level (remove entire subtree)
  let endLine = lines.length
  for (let i = startLine + 1; i < lines.length; i++) {
    const match = lines[i].match(headingPattern)
    if (match && match[1].length <= startLevel) {
      endLine = i
      break
    }
  }

  // Remove the section (and any trailing blank line)
  const result = [...lines.slice(0, startLine), ...lines.slice(endLine)]

  return result.join("\n")
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Find the line after frontmatter ends (after closing ---). Returns 0 if no frontmatter. */
function findFrontmatterEnd(lines: string[]): number {
  if (lines.length === 0 || lines[0].trim() !== "---") return 0
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") return i + 1
  }
  return 0
}

function formatGlossary(terms: Map<string, string>): string {
  if (terms.size === 0) return ""

  const entries: string[] = []
  terms.forEach((translated, en) => {
    entries.push(`- "${en}" -> "${translated}"`)
  })

  return `Community-voted glossary (use these exact translations):
${entries.join("\n")}`
}

// ---------------------------------------------------------------------------
// JSON section extraction / replacement
// ---------------------------------------------------------------------------

/**
 * Extract "sections" from a JSON file. Each top-level key (or nested
 * key path) becomes a section whose body is the string value.
 * Non-string values (objects) are flattened with "/" separators.
 */
export function extractJsonSections(content: string): ExtractedSection[] {
  const obj = JSON.parse(content)
  const sections: ExtractedSection[] = []

  function walk(o: Record<string, unknown>, prefix: string) {
    for (const [key, value] of Object.entries(o)) {
      const id = prefix ? `${prefix}/${key}` : key
      if (typeof value === "string") {
        sections.push({
          id,
          level: prefix ? 2 : 1,
          headingText: id,
          body: value,
        })
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        walk(value as Record<string, unknown>, id)
      }
    }
  }

  walk(obj, "")
  return sections
}

/**
 * Replace specific key values in a JSON string with fresh translations.
 * Handles nested keys using "/" separator (e.g., "test-nested/section-title").
 * Preserves formatting by operating on the parsed object and re-serializing.
 */
export function replaceJsonValues(
  localeContent: string,
  translations: Record<string, string>
): string {
  const obj = JSON.parse(localeContent)

  for (const [keyPath, translated] of Object.entries(translations)) {
    const parts = keyPath.split("/")
    let target = obj
    for (let i = 0; i < parts.length - 1; i++) {
      if (target[parts[i]] && typeof target[parts[i]] === "object") {
        target = target[parts[i]]
      } else {
        target = null as unknown as Record<string, unknown>
        break
      }
    }
    if (target) {
      target[parts[parts.length - 1]] = translated
    }
  }

  return JSON.stringify(obj, null, 2) + "\n"
}

// Re-export types for consumers
export type {
  IncrementalTranslateOptions,
  IncrementalTranslateResult,
  SectionForPrompt,
}

// ---------------------------------------------------------------------------
// Byte-size-aware section batching (CONCURRENCY-SPEC.md Part 2C)
// ---------------------------------------------------------------------------

import { MAX_CHUNK_BYTES } from "../../constants"

/**
 * Split sections into batches that fit within the byte budget.
 * CONTEXT sections are replicated into every batch for quality.
 * Only TRANSLATE sections count toward splitting decisions.
 *
 * Returns empty array if there are no TRANSLATE sections.
 */
export function batchSections(
  sections: Array<{
    id: string
    content: string
    action: "TRANSLATE" | "CONTEXT"
  }>,
  maxBytes: number = MAX_CHUNK_BYTES
): Array<
  Array<{ id: string; content: string; action: "TRANSLATE" | "CONTEXT" }>
> {
  const contextSections = sections.filter((s) => s.action === "CONTEXT")
  const translateSections = sections.filter((s) => s.action === "TRANSLATE")

  if (translateSections.length === 0) return []

  const contextBytes = contextSections.reduce(
    (sum, s) => sum + Buffer.byteLength(s.content, "utf-8"),
    0
  )

  // Budget for TRANSLATE content per batch = total budget - context overhead
  const translateBudget = Math.max(maxBytes - contextBytes, 1)

  const batches: Array<
    Array<{ id: string; content: string; action: "TRANSLATE" | "CONTEXT" }>
  > = []
  let currentTranslate: Array<{
    id: string
    content: string
    action: "TRANSLATE" | "CONTEXT"
  }> = []
  let currentBytes = 0

  for (const section of translateSections) {
    const sectionBytes = Buffer.byteLength(section.content, "utf-8")

    // If adding this section exceeds budget AND we already have sections, start new batch
    if (
      currentTranslate.length > 0 &&
      currentBytes + sectionBytes > translateBudget
    ) {
      batches.push([...contextSections, ...currentTranslate])
      currentTranslate = []
      currentBytes = 0
    }

    currentTranslate.push(section)
    currentBytes += sectionBytes
  }

  // Push remaining
  if (currentTranslate.length > 0) {
    batches.push([...contextSections, ...currentTranslate])
  }

  return batches
}
