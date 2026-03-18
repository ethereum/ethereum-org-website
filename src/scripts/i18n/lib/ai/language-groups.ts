/**
 * Language group definitions for translation.
 *
 * Different script families require different translation strategies.
 * Gemini knows these rules natively -- we provide site-specific context,
 * not linguistic micromanagement.
 */

export type LanguageGroup =
  | "indic"
  | "cyrillic"
  | "rtl"
  | "cjk-phonetic"
  | "cjk-semantic"
  | "latin"

const GROUP_MAP: Record<string, LanguageGroup> = {
  // Indic (Brahmic scripts -- transliterate)
  hi: "indic",
  mr: "indic",
  bn: "indic",
  ta: "indic",
  te: "indic",
  // Cyrillic (transliterate, high Latin tolerance)
  ru: "cyrillic",
  uk: "cyrillic",
  // RTL (transliterate, BiDi considerations)
  ar: "rtl",
  ur: "rtl",
  // CJK Phonetic (Katakana/Hangul -- transliterate even in tags)
  ja: "cjk-phonetic",
  ko: "cjk-phonetic",
  // CJK Semantic (translate by meaning, not sound)
  zh: "cjk-semantic",
  "zh-tw": "cjk-semantic",
}

export function getLanguageGroup(code: string): LanguageGroup {
  return GROUP_MAP[code] || "latin"
}

export function isRtl(code: string): boolean {
  return code === "ar" || code === "ur"
}

export function needsTransliteration(code: string): boolean {
  const group = getLanguageGroup(code)
  return group !== "latin"
}

/**
 * Site-specific translation notes per language group.
 * These focus on ethereum.org conventions, not general linguistics
 * (Gemini already knows how Arabic/Japanese/etc. work).
 */
export function getSiteSpecificNotes(group: LanguageGroup): string {
  const common = `
Site-specific rules for ethereum.org:
- Frontmatter tags array: brand-name tags (Solidity, MetaMask, ERC-20) stay in Latin script. Concept tags (smart contracts, testing) should be translated.
- Code blocks: never translate functional code. Code comments may be translated.
- Internal links (href starting with /) must stay exactly as in English.
- Ticker symbols (ETH, BTC, ERC, EIP, BLS) always stay in Latin script.
- URLs and domain names always stay in Latin script.
- Use community glossary terms exactly as provided (these are community-voted).`

  switch (group) {
    case "rtl":
      return `${common}
- Wrap bare numeric dates (YYYY-MM-DD, DD/MM/YYYY) in <span dir="ltr">...</span> to prevent BiDi flipping.
- Wrap mathematical equations with operators in <span dir="ltr">...</span>.
- Use Western Arabic numerals (1, 2, 3) for Arabic. Urdu uses native numerals for prose but Western for technical identifiers.
- Never convert Gregorian dates to Hijri calendar.
- The word "state" in blockchain context means computational state, not political state.`

    case "cjk-phonetic":
      return `${common}
- Brand-name tags CAN be transliterated into native script (Katakana/Hangul) -- unlike other groups.
- Global acronyms (DeFi, NFT, API) may stay in Latin.`

    case "cjk-semantic":
      return `${common}
- Translate terms by meaning (calque), not by sound. Example: "Smart Contract" = 智能合约.
- Use officially established translations where they exist (Ethereum = 以太坊).
- If no official translation exists for a brand, keep it in Latin script.`

    case "indic":
    case "cyrillic":
      return `${common}
- Use Western Arabic numerals (1, 2, 3) -- not native numeral scripts.`

    case "latin":
      return `${common}
- Brand names must stay in English (do not translate Solidity, MetaMask, etc.).`
  }
}
