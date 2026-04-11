/**
 * Glossary lookup index and source-file filtering.
 *
 * Builds an index from all surface forms (terms, aliases, morphological
 * variants) and filters the glossary to only terms present in a given
 * source file. Outputs a lean format for LLM prompt injection.
 *
 * Integration point: replaces the raw glossaryTerms Map in prompt-builder.ts
 * with a filtered, context-rich set of entries.
 */

import { readFileSync } from "fs"
import { join } from "path"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Entry format for LLM prompt injection (agreed with Relay/Pipeline Agent) */
export interface GlossaryEntryForPrompt {
  english: string
  translation: string
  example?: string
  note?: string
}

/** Result of filtering the glossary against a source file */
export interface FilterResult {
  sourceFile: string
  language: string
  matchedCount: number
  totalGlossaryTerms: number
  entries: GlossaryEntryForPrompt[]
}

/** Internal: a matched term with occurrence count */
interface TermMatch {
  entryId: string
  forms: Set<string>
  count: number
}

/** Shape of a per-language translation entry in glossary-{lang}.json */
interface TranslationEntry {
  term: string
  aliases?: string[]
  transliteration?: string | null
  morphology?: Record<string, unknown> | null
  contexts?: {
    prose?: { term: string; example?: string }
    heading?: { term: string }
    tag?: { term: string }
    ui?: { term: string }
    code?: { term: string }
  } | null
  grammar?: Record<string, unknown> | null
  plurals?: Record<string, string> | null
  source?: string
  confidence?: string
  notes?: string | null
}

/** Shape of a term in glossary-terms-enhanced.json */
interface GlossaryTerm {
  term?: string
  category?: string
  aliases?: Array<string | { term: string; status?: string; note?: string }>
  forms?: Record<string, unknown>
  translation_note?: string
  note?: string
  content_occurrences?: number
}

// ---------------------------------------------------------------------------
// Index builder
// ---------------------------------------------------------------------------

/**
 * Build a lookup index mapping every surface form (lowercase) to its entry ID.
 *
 * Surface forms include: entry key, term, aliases (string or object),
 * and morphological form values.
 */
export function buildLookupIndex(
  glossaryTerms: Record<string, GlossaryTerm>
): Map<string, string> {
  const index = new Map<string, string>()

  for (const [entryId, entry] of Object.entries(glossaryTerms)) {
    const forms = new Set<string>()

    // Entry key itself
    forms.add(entryId)

    // Display term
    if (entry.term) forms.add(entry.term)

    // Aliases
    if (entry.aliases) {
      for (const alias of entry.aliases) {
        if (typeof alias === "string") {
          forms.add(alias)
        } else if (alias && typeof alias === "object" && "term" in alias) {
          forms.add(alias.term)
        }
      }
    }

    // Morphological forms
    if (entry.forms && typeof entry.forms === "object") {
      for (const [key, val] of Object.entries(entry.forms)) {
        if (key === "compounds" && val && typeof val === "object") {
          for (const compVal of Object.values(val as Record<string, string>)) {
            if (typeof compVal === "string") forms.add(compVal)
          }
        } else if (typeof val === "string") {
          forms.add(val)
        }
      }
    }

    // Add all forms to index (lowercased, min length 2)
    for (const form of forms) {
      if (form && form.length >= 2) {
        const normalized = form.toLowerCase().trim()
        if (!index.has(normalized)) {
          index.set(normalized, entryId)
        }
      }
    }
  }

  return index
}

/**
 * Build a single RegExp that matches any indexed surface form.
 * Sorted by length descending so "proof of stake" matches before "stake".
 */
export function buildMatchPattern(index: Map<string, string>): RegExp {
  const forms = Array.from(index.keys()).sort((a, b) => b.length - a.length)

  const escaped = forms.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))

  return new RegExp(`\\b(${escaped.join("|")})\\b`, "gi")
}

// ---------------------------------------------------------------------------
// Source text extraction
// ---------------------------------------------------------------------------

/** Extract matchable text from a markdown file. */
function extractMarkdownText(content: string): string {
  let text = content

  // Strip frontmatter
  if (text.startsWith("---")) {
    const end = text.indexOf("---", 3)
    if (end !== -1) text = text.slice(end + 3)
  }

  // Strip code blocks
  text = text.replace(/```[\s\S]*?```/g, " ")
  text = text.replace(/`[^`]+`/g, " ")

  // Strip HTML/MDX tags
  text = text.replace(/<[^>]+>/g, " ")

  // Keep link text, strip URLs
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

  return text
}

/** Extract matchable text from a JSON file (string values only, not keys). */
function extractJsonValues(content: string): string {
  const values: string[] = []

  function walk(obj: unknown): void {
    if (typeof obj === "string") {
      values.push(obj)
    } else if (Array.isArray(obj)) {
      for (const item of obj) walk(item)
    } else if (obj && typeof obj === "object") {
      for (const val of Object.values(obj)) walk(val)
    }
  }

  try {
    walk(JSON.parse(content))
  } catch {
    // If JSON parse fails, treat as plain text
    return content
  }

  // Join values and strip HTML
  return values.join(" ").replace(/<[^>]+>/g, " ")
}

/** Extract matchable text from source content, auto-detecting file type. */
export function extractSourceText(
  content: string,
  fileType: "markdown" | "json"
): string {
  return fileType === "json"
    ? extractJsonValues(content)
    : extractMarkdownText(content)
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/**
 * Find all glossary terms that appear in the source text.
 * Returns a map of entry ID -> match info (forms matched, occurrence count).
 */
export function findMatchingTerms(
  sourceText: string,
  index: Map<string, string>,
  pattern: RegExp
): Map<string, TermMatch> {
  const matches = new Map<string, TermMatch>()

  let match: RegExpExecArray | null
  // Reset lastIndex for global regex
  pattern.lastIndex = 0

  while ((match = pattern.exec(sourceText)) !== null) {
    const surfaceForm = match[1].toLowerCase()
    const entryId = index.get(surfaceForm)

    if (entryId) {
      const existing = matches.get(entryId)
      if (existing) {
        existing.forms.add(surfaceForm)
        existing.count++
      } else {
        matches.set(entryId, {
          entryId,
          forms: new Set([surfaceForm]),
          count: 1,
        })
      }
    }
  }

  return matches
}

// ---------------------------------------------------------------------------
// Output formatting
// ---------------------------------------------------------------------------

/**
 * Load a per-language translation file.
 * Returns a map of entry ID -> translation entry.
 */
export function loadTranslations(
  translationsDir: string,
  langCode: string
): Record<string, TranslationEntry> {
  const filePath = join(translationsDir, `glossary-${langCode}.json`)
  try {
    const content = readFileSync(filePath, "utf-8")
    return JSON.parse(content) as Record<string, TranslationEntry>
  } catch {
    return {}
  }
}

/**
 * Format matched terms into the lean GlossaryEntryForPrompt format.
 *
 * - english + translation: always included
 * - note: when present (disambiguation)
 * - example: only when term appears 2+ times in source
 */
export function formatForPrompt(
  matchedTerms: Map<string, TermMatch>,
  glossaryTerms: Record<string, GlossaryTerm>,
  translations: Record<string, TranslationEntry>
): GlossaryEntryForPrompt[] {
  const entries: GlossaryEntryForPrompt[] = []

  for (const [entryId, matchInfo] of matchedTerms) {
    const glossaryEntry = glossaryTerms[entryId]
    if (!glossaryEntry) continue

    const translation = translations[entryId]
    const english = glossaryEntry.term ?? entryId

    const entry: GlossaryEntryForPrompt = {
      english,
      translation: translation?.term ?? "",
    }

    // Example sentence: only for high-frequency terms (2+ occurrences)
    if (matchInfo.count >= 2 && translation?.contexts?.prose?.example) {
      entry.example = translation.contexts.prose.example
    }

    // Notes: translation notes or disambiguation context
    const note = translation?.notes ?? glossaryEntry.translation_note
    if (note) {
      entry.note = note
    }

    entries.push(entry)
  }

  return entries
}

// ---------------------------------------------------------------------------
// Main API
// ---------------------------------------------------------------------------

/**
 * Filter the glossary to only terms present in a source file,
 * formatted for LLM prompt injection.
 *
 * This is the main entry point for pipeline integration.
 */
export function filterGlossaryForSource(
  sourceContent: string,
  fileType: "markdown" | "json",
  langCode: string,
  glossaryPath: string,
  translationsDir: string
): FilterResult {
  // Load glossary metadata
  const glossaryData = JSON.parse(readFileSync(glossaryPath, "utf-8"))
  const glossaryTerms: Record<string, GlossaryTerm> =
    glossaryData.confirmed_terms ?? glossaryData.entries ?? {}

  // Build index and pattern
  const index = buildLookupIndex(glossaryTerms)
  const pattern = buildMatchPattern(index)

  // Extract text and find matches
  const text = extractSourceText(sourceContent, fileType)
  const matches = findMatchingTerms(text, index, pattern)

  // Load translations and format
  const translations = loadTranslations(translationsDir, langCode)
  const entries = formatForPrompt(matches, glossaryTerms, translations)

  return {
    sourceFile: "",
    language: langCode,
    matchedCount: matches.size,
    totalGlossaryTerms: Object.keys(glossaryTerms).length,
    entries,
  }
}

/**
 * Convenience: filter and return as Map<string, string> for backwards
 * compatibility with existing formatGlossary() in prompt-builder.ts.
 */
export function filterGlossaryFlat(
  sourceContent: string,
  fileType: "markdown" | "json",
  langCode: string,
  glossaryPath: string,
  translationsDir: string
): Map<string, string> {
  const result = filterGlossaryForSource(
    sourceContent,
    fileType,
    langCode,
    glossaryPath,
    translationsDir
  )

  const map = new Map<string, string>()
  for (const entry of result.entries) {
    if (entry.translation) {
      map.set(entry.english, entry.translation)
    }
  }
  return map
}
