// Supabase integration exports

export type { GlossaryByLanguage, GlossaryEntry, Tone } from "./glossary"
export {
  fetchGlossaryEntries,
  formatGlossaryForPrompt,
  getGlossaryForLanguage,
  groupGlossaryByLanguage,
} from "./glossary"
