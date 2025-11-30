/**
 * Supabase glossary fetcher using REST API
 * Fetches community-approved translations from the top_translations table
 */

export interface GlossaryEntry {
  term: string
  translation: string
  votes: number
  languageCode: string
}

export interface SupabaseRow {
  string_term: string
  translation_text: string
  total_votes: number
  language_code: string
}

/**
 * Fetch top-voted glossary terms for a specific language from Supabase
 */
export async function fetchGlossaryForLanguage(
  supabaseUrl: string,
  serviceRoleKey: string,
  languageCode: string,
  minVotes: number = 1
): Promise<GlossaryEntry[]> {
  const url = new URL(`${supabaseUrl}/rest/v1/top_translations`)
  url.searchParams.set("language_code", `eq.${languageCode}`)
  url.searchParams.set("total_votes", `gte.${minVotes}`)
  url.searchParams.set("order", "total_votes.desc,string_term.asc")
  url.searchParams.set(
    "select",
    "string_term,translation_text,total_votes,language_code"
  )

  console.log(`[GLOSSARY] Fetching from Supabase for language: ${languageCode}`)
  console.log(`[GLOSSARY] URL: ${url.toString()}`)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Supabase API error (${response.status}): ${errorText}`)
    }

    const rows: SupabaseRow[] = await response.json()
    console.log(
      `[GLOSSARY] Fetched ${rows.length} glossary entries for ${languageCode}`
    )

    return rows.map((row) => ({
      term: row.string_term,
      translation: row.translation_text,
      votes: row.total_votes,
      languageCode: row.language_code,
    }))
  } catch (error) {
    console.error(
      `[GLOSSARY] Failed to fetch glossary for ${languageCode}:`,
      error
    )
    throw error
  }
}

/**
 * Fetch glossary entries for all specified languages
 */
export async function fetchGlossaryForAllLanguages(
  supabaseUrl: string,
  serviceRoleKey: string,
  languageCodes: string[],
  minVotes: number = 1
): Promise<Record<string, GlossaryEntry[]>> {
  console.log(
    `[GLOSSARY] Fetching glossary for ${languageCodes.length} languages`
  )

  const results: Record<string, GlossaryEntry[]> = {}

  for (const langCode of languageCodes) {
    try {
      const entries = await fetchGlossaryForLanguage(
        supabaseUrl,
        serviceRoleKey,
        langCode,
        minVotes
      )
      results[langCode] = entries
    } catch (error) {
      console.warn(`[GLOSSARY] Skipping ${langCode} due to error:`, error)
      results[langCode] = []
    }
  }

  const totalEntries = Object.values(results).reduce(
    (sum, entries) => sum + entries.length,
    0
  )
  console.log(
    `[GLOSSARY] Fetched ${totalEntries} total entries across all languages`
  )

  return results
}

/**
 * Format glossary entries as CSV for Crowdin import
 * Format: term,translation,description,note
 */
export function formatGlossaryAsCSV(entries: GlossaryEntry[]): string {
  const header = "term,translation,description,note\n"
  const rows = entries.map((entry) => {
    const term = escapeCSV(entry.term)
    const translation = escapeCSV(entry.translation)
    const description = escapeCSV(`Community-voted (${entry.votes} votes)`)
    const note = escapeCSV("")
    return `${term},${translation},${description},${note}`
  })

  return header + rows.join("\n")
}

/**
 * Escape CSV values (quote if contains comma, quote, or newline)
 */
function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Format glossary entries as TBX (Term Base eXchange) for Crowdin import
 */
export function formatGlossaryAsTBX(
  entries: GlossaryEntry[],
  sourceLanguage: string,
  targetLanguage: string
): string {
  const now = new Date().toISOString()

  const termEntries = entries
    .map((entry) => {
      const escapedTerm = escapeXML(entry.term)
      const escapedTranslation = escapeXML(entry.translation)
      const escapedNote = escapeXML(`Community-voted: ${entry.votes} votes`)

      return `    <termEntry id="${escapedTerm}">
      <descripGrp>
        <descrip type="context">${escapedNote}</descrip>
      </descripGrp>
      <langSet xml:lang="${sourceLanguage}">
        <tig>
          <term>${escapedTerm}</term>
        </tig>
      </langSet>
      <langSet xml:lang="${targetLanguage}">
        <tig>
          <term>${escapedTranslation}</term>
        </tig>
      </langSet>
    </termEntry>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE martif SYSTEM "TBXcoreStructV02.dtd">
<martif type="TBX" xml:lang="${sourceLanguage}">
  <martifHeader>
    <fileDesc>
      <titleStmt>
        <title>Ethereum.org Community Glossary</title>
      </titleStmt>
      <sourceDesc>
        <p>Generated from Supabase community glossary on ${now}</p>
      </sourceDesc>
    </fileDesc>
    <encodingDesc>
      <p type="XCSURI">http://www.lisa.org/fileadmin/standards/tbx/TBXXCSV02.xcs</p>
    </encodingDesc>
  </martifHeader>
  <text>
    <body>
${termEntries}
    </body>
  </text>
</martif>`
}

/**
 * Escape XML special characters
 */
function escapeXML(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
