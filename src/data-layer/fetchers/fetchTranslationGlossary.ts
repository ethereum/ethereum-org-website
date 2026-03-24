export type GlossaryEntry = {
  string_term: string
  translation_text: string
  language_code: string
  total_votes: number
}

/**
 * Fetch community-approved translation glossary from Supabase.
 * Returns the highest-voted translation for each term/language pair.
 */
export async function fetchTranslationGlossary(): Promise<GlossaryEntry[]> {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  const baseUrl = `${supabaseUrl}/rest/v1/top_translations?select=string_term,translation_text,language_code,total_votes`
  const pageSize = 1000
  const entries: GlossaryEntry[] = []

  console.log("Starting translation glossary fetch")

  let hasMore = true
  let offset = 0
  while (hasMore) {
    const url = `${baseUrl}&limit=${pageSize}&offset=${offset}`
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

    const page: GlossaryEntry[] = await response.json()
    entries.push(...page)

    hasMore = page.length === pageSize
    offset += pageSize
  }

  console.log(`Successfully fetched ${entries.length} glossary entries`)

  return entries
}
