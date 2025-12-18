/**
 * Supabase glossary client for fetching community-approved translations
 *
 * Fetches from the `top_translations` view which contains the highest-voted
 * translation for each term/language pair.
 */

/** Glossary entry from Supabase top_translations view */
export interface GlossaryEntry {
  string_term: string
  translation_text: string
  language_code: string
  total_votes: number
}

/** Glossary grouped by language code */
export type GlossaryByLanguage = Map<string, Map<string, string>>

/**
 * Fetch all glossary entries from Supabase
 */
export async function fetchGlossaryEntries(): Promise<GlossaryEntry[]> {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[GLOSSARY] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY, skipping glossary fetch"
    )
    return []
  }

  const url = `${supabaseUrl}/rest/v1/top_translations?select=string_term,translation_text,language_code,total_votes`

  try {
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const text = await response.text().catch(() => "")
      throw new Error(`Supabase API error (${response.status}): ${text}`)
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
export function formatGlossaryForPrompt(glossary: Map<string, string>): string {
  if (glossary.size === 0) return ""

  const lines = Array.from(glossary.entries())
    .map(([term, translation]) => `- "${term}" → "${translation}"`)
    .join("\n")

  return `REQUIRED TERMINOLOGY (use these exact translations):\n${lines}`
}
