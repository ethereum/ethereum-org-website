/**
 * Glossary client for fetching community-approved translations
 *
 * Fetches from the /api/glossary endpoint, which serves data from
 * the Supabase `top_translations` view via the data layer.
 */

const GLOSSARY_URL = "https://ethereum.org/api/glossary"

import type { GlossaryEntry } from "@/data-layer/fetchers/fetchTranslationGlossary"
export type { GlossaryEntry }

/** Glossary grouped by language code */
export type GlossaryByLanguage = Map<string, Map<string, string>>

/** Tone for translation register */
export type Tone = "informal" | "formal"

/**
 * Fetch all glossary entries from the glossary API
 */
export async function fetchGlossaryEntries(): Promise<GlossaryEntry[]> {
  try {
    const response = await fetch(GLOSSARY_URL)

    if (!response.ok) {
      throw new Error(`Glossary API error (${response.status})`)
    }

    const entries: GlossaryEntry[] = await response.json()
    console.log(`[GLOSSARY] Fetched ${entries.length} glossary entries`)
    return entries
  } catch (error) {
    console.warn("[GLOSSARY] Failed to fetch glossary:", error)
    return []
  }
}

/**
 * Group glossary entries by language code for efficient lookup
 * Returns Map<languageCode, Map<englishTerm, translatedTerm>>
 */
export function groupGlossaryByLanguage(
  entries: GlossaryEntry[]
): GlossaryByLanguage {
  const byLanguage: GlossaryByLanguage = new Map()

  for (const entry of entries) {
    if (!byLanguage.has(entry.language_code)) {
      byLanguage.set(entry.language_code, new Map())
    }
    byLanguage
      .get(entry.language_code)!
      .set(entry.string_term, entry.translation_text)
  }

  return byLanguage
}

/**
 * Get glossary terms for a specific language code
 * Returns Map<englishTerm, translatedTerm> or empty map if not found
 */
export function getGlossaryForLanguage(
  glossary: GlossaryByLanguage,
  languageCode: string
): Map<string, string> {
  return glossary.get(languageCode) ?? new Map()
}

/**
 * Format glossary as string for inclusion in AI prompts
 */
export function formatGlossaryForPrompt(
  glossaryTerms: Map<string, string>,
  tone: Tone = "informal"
): string {
  if (glossaryTerms.size === 0) return ""

  const toneInstruction =
    tone === "formal"
      ? "Use formal register."
      : "Use informal, friendly register."

  const terms = Array.from(glossaryTerms.entries())
    .map(([term, translation]) => `- "${term}" → "${translation}"`)
    .join("\n")

  return `## REQUIRED TERMINOLOGY

Use these exact translations. Do not substitute synonyms.
${toneInstruction}

${terms}`
}
