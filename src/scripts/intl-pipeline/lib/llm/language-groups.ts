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
  // CJK Phonetic (Katakana/Hangul)
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
 * BiDi isolation rules for RTL translations, branched by file type.
 *
 * Markdown uses the `<span dir="ltr">` HTML wrapper -- the site's
 * long-standing convention. MDX parses HTML, browsers honor the dir
 * attribute, and source diffs stay human-readable.
 *
 * JSON must use raw Unicode bidi isolate characters instead. JSON
 * values are consumed by next-intl's t() as plain text, which does
 * not support rich markup -- an embedded `<span>` renders literally
 * on screen, breaking the UI.
 */
function rtlBidiRules(fileType: "markdown" | "json"): string {
  const isMd = fileType === "markdown"

  const opener = isMd
    ? `BiDi rules for RTL -- wrap LTR content in <span dir="ltr">...</span> to prevent layout flipping. NEVER use this wrapper inside YAML frontmatter values: the inner double-quote on the dir attribute terminates the outer YAML string and breaks the build. For LTR fragments inside frontmatter values (title, description, breadcrumb), use raw Unicode bidi isolates U+2066 (LRI, open) and U+2069 (PDI, close) instead -- e.g. \`title: "Devconnect Argentina ⁦2025⁩ recap"\`.`
    : `BiDi rules for RTL in JSON values -- isolate LTR content using raw Unicode characters U+2066 (LRI, open) and U+2069 (PDI, close). Do NOT use <span dir="ltr"> tags -- they break next-intl's t() which renders JSON values as plain text, not rich markup.`

  const keepUnitsExample = isMd
    ? `Keep units, currency symbols, and operators INSIDE: <span dir="ltr">$100,000 USD</span> (correct)`
    : `Keep units, currency symbols, and operators INSIDE the isolate: \u2066$100,000 USD\u2069 (correct)`

  const doNotWrap = isMd
    ? `Do NOT wrap content inside backticks or text transliterated into target script`
    : `Do NOT wrap text transliterated into target script`

  const mdOnlyTrailer = isMd
    ? `\n- Ensure Markdown syntax (headers, links, bullet points, tables) and HTML tags remain in LTR formatting.`
    : ``

  return `${opener}
- Wrap any technical string or number combined with Latin units, symbols, or operators: 32 ETH, 100 Gwei, 12.5%, $2,500 USD, v1.10.8, EIP-1559, > 0.01, 2x
- Wrap numbers containing separators (commas/periods): 21,000, 0.000252
- Wrap dates/times ONLY if they use Latin month names: June 18, 2022, 12:00 UTC
- ${keepUnitsExample}
- Punctuation (periods, commas, etc.) belonging to the RTL sentence stays OUTSIDE
- ${doNotWrap}
- Use Western Arabic numerals (1, 2, 3) for Arabic. Urdu uses native numerals for prose but Western for technical identifiers.
- Never convert Gregorian dates to Hijri calendar.${mdOnlyTrailer}`
}

// Locale-specific corrections for mistakes reviews keep fixing in one locale.
const LOCALE_NOTES: Record<string, string> = {
  vi: `- "Get" in a call to action ("Get a wallet", "Get ETH", "Get started") means obtain or start: use "Nhận", "Lấy" or "Bắt đầu" as fits. Never "Tải" (download) unless the English says download.`,
}

/**
 * Site-specific translation notes per language group.
 * These focus on ethereum.org conventions, not general linguistics
 * (Gemini already knows how Arabic/Japanese/etc. work).
 *
 * fileType controls the BiDi wrapping syntax for RTL output so the
 * result round-trips through each format:
 *   markdown -> HTML numeric entities (&#x2066;...&#x2069;) render via
 *     browser HTML parsing; visible in source diffs.
 *   json     -> raw Unicode LRI/PDI (U+2066, U+2069) because JSON values
 *     are consumed as plain text by next-intl's t(); HTML entities would
 *     render literally on screen.
 */
export function getSiteSpecificNotes(
  group: LanguageGroup,
  fileType: "markdown" | "json",
  locale: string
): string {
  const notes = groupNotes(group, fileType)
  return LOCALE_NOTES[locale] ? `${notes}\n${LOCALE_NOTES[locale]}` : notes
}

function groupNotes(
  group: LanguageGroup,
  fileType: "markdown" | "json"
): string {
  const common = `
Site-specific rules for ethereum.org (group-specific overrides below take precedence):
- Frontmatter tags array: brand-name tags (Solidity, MetaMask, ERC-20) stay in Latin script. Concept tags (smart contracts, testing) should be translated.
- Code blocks: never translate functional code. Translate code comments, except machine-read directives (SPDX-License-Identifier, solhint-disable, eslint-disable, prettier-ignore, @ts-ignore, #pragma version, #!), which stay exactly as in English.
- Do not translate (keep in original Latin script): ticker symbols (ETH, BTC, ERC, EIP, BLS), URLs, domains, EVM opcodes (SSTORE, CALL, PUSH), hex values (0x...), cryptographic primitives (SHA-256, Keccak-256, ECDSA, zk-SNARKs), network names (Mainnet, Sepolia, Holesky, Goerli), license identifiers (MIT, Apache-2.0), mathematical notations and formulas.
- Names of software, clients, wallets, protocols, companies, libraries, programming languages and tools (MetaMask, Uniswap, Chainlink, Coinbase, Lighthouse, Prysm, Geth, Besu, Teku, Nethermind, Slither, Hardhat, Solidity) stay in Latin script exactly as written in English, in every language. Never transliterate or translate them, not even alongside the Latin name, and not even where a glossary entry or existing text uses a native-script form. Only Ethereum, Ether and Bitcoin follow the glossary; a brand with an official native-script name of its own (Binance in Chinese) may use it where the glossary gives that name.
- Use community glossary terms as provided. In languages with grammatical cases, decline glossary terms to fit the surrounding sentence naturally. If a term in the source text does not match the glossary's intended technical context, ignore the glossary entry and translate according to the general context of the sentence.
- Glossary terms with an abbreviation in parentheses (e.g., "decentralized application (dapp)" -> "aplicacion descentralizada (dapp)", "layer 2 (L2)") pair a long form with its abbreviation. Follow the English source: where it writes the long form, use the translated long form, adding the abbreviation only if English does; where it writes only the abbreviation (L2, dapp, NFT), write only the abbreviation and never expand it: no long form before it, no parenthetical after it, in prose, headings, link text and frontmatter alike. A glossary line that maps an abbreviation to itself ("L2" -> "L2") means exactly that. Abbreviations keep their English capitalization exactly (L1, L2, never l1, l2), even when a glossary entry shows them in lower case. Plural or variant forms in English (e.g., "dapps") take the glossary's spelling of the same form, inflected as the language requires -- do not reproduce informal variants.
- Translate English idioms and colloquialisms by meaning, not literally. Use natural target-language expressions that convey the same meaning. Examples: "in the wild" = in actual use/in practice; "under the hood" = internally/how it works technically; "out of the box" = by default/without extra configuration; "a deep dive" = a detailed exploration; "the big picture" = the overall view. If no natural equivalent exists, rephrase plainly rather than producing an awkward literal translation.
- Do not translate technical concepts or loanwords unless an exact translation is provided in the glossary. If a term is not in the glossary, leave it in English.
- The word "state" in blockchain context means computational state, not political state.`

  switch (group) {
    case "rtl":
      return `${common}

${rtlBidiRules(fileType)}`

    case "cjk-phonetic":
      return `${common}
- Brand, product and tool names and brand-name tags stay in Latin script here too: never write them in Katakana/Hangul (MetaMask, not メタマスク or 메타마스크), even where neighbouring existing text does. Ethereum, Ether and Bitcoin still take their glossary forms.
- Keep global acronyms (DeFi, NFT, API) in Latin.`

    case "cjk-semantic":
      return `${common}
- Translate concept terms by meaning (calque), not by sound. Example: "Smart Contract" = 智能合约.
- Ethereum, Ether and Bitcoin take their glossary forms. Other brand, product and tool names stay in Latin script, never phonetic Hanzi (MetaMask, not 梅塔马斯克), unless the glossary gives the brand's own official Chinese name.`

    case "indic":
      return `${common}
- ALWAYS use Western Arabic numerals (0-9) for ALL digits -- including in headings, numbered lists, dates, statistics, and prose. Never use native numeral scripts (e.g., never ১২৩, never १२३). This applies to the entire site, not just code.`

    case "cyrillic":
      return `${common}
- ALWAYS use Western Arabic numerals (0-9) for ALL digits -- including in headings, numbered lists, dates, statistics, and prose. Never use native numeral scripts.
- Use correct grammatical plural categories (one/few/many/other) as appropriate for the target language.`

    case "latin":
      return common
  }
}
