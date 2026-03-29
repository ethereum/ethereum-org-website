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
- Use community glossary terms as provided. In languages with grammatical cases, decline glossary terms to fit the surrounding sentence naturally.
- Do not translate technical concepts or loanwords unless an exact translation is provided in the glossary. If a term is not in the glossary, leave it in English.`

  switch (group) {
    case "rtl":
      return `${common}
- Content inside backticks (\`inline code\`) is already rendered as LTR monospace. Do NOT wrap backtick content in <span dir="ltr"> -- this breaks MDX rendering. Use <span dir="ltr">...</span> ONLY for bare mathematical expressions or bare numeric dates that are NOT already inside backticks.
- Wrap bare numeric dates (YYYY-MM-DD, DD/MM/YYYY) in <span dir="ltr">...</span> to prevent BiDi flipping.
- Wrap mathematical equations with operators in <span dir="ltr">...</span>, but only when they are NOT inside backticks.
- Ensure Markdown syntax (headers, links, bullet points, tables) and HTML tags remain in LTR formatting, even when wrapping RTL text.
- Use Western Arabic numerals (1, 2, 3) for Arabic. Urdu uses native numerals for prose but Western for technical identifiers.
- Never convert Gregorian dates to Hijri calendar.
- The word "state" in blockchain context means computational state, not political state.`

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
