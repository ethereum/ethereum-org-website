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
      const heading = s.headingText
        ? `<!-- ${s.level ? "#".repeat(s.level) + " " : ""}${s.headingText} -->\n`
        : ""
      return `<SECTION id="${s.id}" action="${s.action}">\n${heading}${s.content}\n</SECTION>`
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

  // Calculate end lines (next heading of same or higher level, or EOF)
  for (let i = 0; i < sectionRanges.length; i++) {
    const current = sectionRanges[i]
    let endLine = lines.length
    for (let j = i + 1; j < sectionRanges.length; j++) {
      if (sectionRanges[j].level <= current.level) {
        endLine = sectionRanges[j].startLine
        break
      }
    }
    current.endLine = endLine
  }

  // Build the output, replacing sections that have translations
  let lineIdx = 0
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
// Helpers
// ---------------------------------------------------------------------------

function formatGlossary(terms: Map<string, string>): string {
  if (terms.size === 0) return ""

  const entries: string[] = []
  terms.forEach((translated, en) => {
    entries.push(`- "${en}" -> "${translated}"`)
  })

  return `Community-voted glossary (use these exact translations):
${entries.join("\n")}`
}

// Re-export types for consumers
export type {
  IncrementalTranslateOptions,
  IncrementalTranslateResult,
  SectionForPrompt,
}
