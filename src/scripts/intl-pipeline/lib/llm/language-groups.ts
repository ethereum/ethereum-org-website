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
Site-specific rules for ethereum.org (group-specific overrides below take precedence):
- Frontmatter tags array: brand-name tags (Solidity, MetaMask, ERC-20) stay in Latin script. Concept tags (smart contracts, testing) should be translated.
- Code blocks: never translate functional code. Always translate code comments.
- Do not translate (keep in original Latin script): ticker symbols (ETH, BTC, ERC, EIP, BLS), URLs, domains, EVM opcodes (SSTORE, CALL, PUSH), hex values (0x...), cryptographic primitives (SHA-256, Keccak-256, ECDSA, zk-SNARKs), network names (Mainnet, Sepolia, Holesky, Goerli), license identifiers (MIT, Apache-2.0), mathematical notations and formulas.
- Treat client implementation names (Lighthouse, Prysm, Geth, Nethermind, Besu, Teku, Lodestar, Nimbus) as proper nouns; do not translate them. In non-Latin scripts, phonetic transliteration alongside the Latin name is acceptable.
- Use community glossary terms as provided. In languages with grammatical cases, decline glossary terms to fit the surrounding sentence naturally. If a term in the source text does not match the glossary's intended technical context, ignore the glossary entry and translate according to the general context of the sentence.
- First mention of acronym-style terms: when the glossary contains a term with an abbreviation in parentheses (e.g., "decentralized application (dapp)" -> "aplicacion descentralizada (dapp)"), expand it on first mention in each section. Use the full translated form with the abbreviation in parentheses. Subsequent mentions in the same section may use the short form alone. If the English source uses a shortened or variant form (e.g., "dapps" instead of "dapp"), still use the glossary's canonical translated form -- do not reproduce informal variants.
- Translate English idioms and colloquialisms by meaning, not literally. Use natural target-language expressions that convey the same meaning. Examples: "in the wild" = in actual use/in practice; "under the hood" = internally/how it works technically; "out of the box" = by default/without extra configuration; "a deep dive" = a detailed exploration; "the big picture" = the overall view. If no natural equivalent exists, rephrase plainly rather than producing an awkward literal translation.
- Do not translate technical concepts or loanwords unless an exact translation is provided in the glossary. If a term is not in the glossary, leave it in English.`

  switch (group) {
    case "rtl":
      return `${common}

BiDi rules for RTL -- wrap LTR content in <span dir="ltr">...</span> to prevent layout flipping:
- Wrap any technical string or number combined with Latin units, symbols, or operators: 32 ETH, 100 Gwei, 12.5%, $2,500 USD, v1.10.8, EIP-1559, > 0.01, 2x
- Wrap numbers containing separators (commas/periods): 21,000, 0.000252
- Wrap dates/times ONLY if they use Latin month names: June 18, 2022, 12:00 UTC
- Keep units, currency symbols, and operators INSIDE: <span dir="ltr">$100,000 USD</span> (correct)
- Punctuation (periods, commas, etc.) belonging to the RTL sentence stays OUTSIDE
- Do NOT wrap content inside backticks or text transliterated into target script
- Use Western Arabic numerals (1, 2, 3) for Arabic. Urdu uses native numerals for prose but Western for technical identifiers.
- Never convert Gregorian dates to Hijri calendar.
- The word "state" in blockchain context means computational state, not political state.
- Ensure Markdown syntax (headers, links, bullet points, tables) and HTML tags remain in LTR formatting.`

    case "cjk-phonetic":
      return `${common}
- Override: brand-name tags should be transliterated into native script (Katakana/Hangul) for this language group, unlike other groups where they stay Latin.
- Keep global acronyms (DeFi, NFT, API) in Latin.`

    case "cjk-semantic":
      return `${common}
- Translate terms by meaning (calque), not by sound. Example: "Smart Contract" = 智能合约.
- Use officially established translations where they exist (Ethereum = 以太坊).
- If no official translation exists for a brand, keep it in Latin script.`

    case "indic":
      return `${common}
- Use Western Arabic numerals (1, 2, 3) -- not native numeral scripts.`

    case "cyrillic":
      return `${common}
- Use Western Arabic numerals (1, 2, 3) -- not native numeral scripts.
- Use correct grammatical plural categories (one/few/many/other) as appropriate for the target language.`

    case "latin":
      return common
  }
}
