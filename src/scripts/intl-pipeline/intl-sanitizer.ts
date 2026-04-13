import * as fs from "fs"
import * as path from "path"

// franc-min is ESM-only; use dynamic import
let francDetect: ((text: string) => string) | null = null
async function loadFranc(): Promise<void> {
  if (francDetect) return
  try {
    const francModule = await import("franc-min")
    francDetect = francModule.franc
  } catch {
    console.warn(
      "[SANITIZE] franc-min not available; skipping language detection"
    )
  }
}

/**
 * Translation output sanitizer.
 *
 * - Synchronize custom Markdown header IDs `{#...}` with English source (ASCII-only)
 * - Normalize block HTML tag line breaks (opening and closing tags on their own lines)
 * - Protect known brand/team names from inadvertent translation
 * - Validate JSON files; report issues
 *
 * Wired into the pipeline via lib/workflows/sanitization.ts
 */

const ROOT = process.cwd()
const CONTENT_ROOT = path.join(ROOT, "public", "content")

const BLOCK_HTML_TAGS = [
  "section",
  "div",
  "article",
  "aside",
  "header",
  "footer",
]

/**
 * MDX block components that need opening/closing tags on separate lines.
 * ButtonLink is intentionally excluded - it's an inline component.
 */
const BLOCK_MDX_COMPONENTS = [
  "Card",
  "ExpandableCard",
  "Alert",
  "AlertEmoji",
  "AlertContent",
  "AlertDescription",
  "CardGrid",
  "InfoGrid",
  "InfoBanner",
  "Tabs",
  "TabItem",
]

function listFiles(
  dir: string,
  predicate: (file: string) => boolean
): string[] {
  const out: string[] = []
  const stack: string[] = [dir]
  while (stack.length) {
    const d = stack.pop()!
    const entries = fs.readdirSync(d, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(d, e.name)
      if (e.isDirectory()) stack.push(full)
      else if (predicate(full)) out.push(full)
    }
  }
  return out
}

function toAsciiId(id: string): string {
  // keep only ASCII letters, numbers, hyphens and underscores; strip accents
  const normalized = id.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return normalized.replace(/[^A-Za-z0-9_-]/g, "-")
}

// Critical regex checks adapted from legacy markdownChecker
const BROKEN_LINK_REGEX = /\[[^\]]+\]\([^)\s]+\s[^)]+\)/g
const INVALID_LINK_REGEX =
  /(?<!!)\[[^\]]+\]\((?!<|\/|#|http|mailto:)[^)]*(?<!\.pdf)\)/g
const LINK_TEXT_MISSING_REGEX = /(?<![^\s])\[\]\(([^)]+)\)/g
const INCORRECT_PATH_IN_TRANSLATED_MARKDOWN =
  /image:\s+\.\.\/\.\.\/(assets\/|\.\.\/assets\/)/g
const COMMON_SPELLING_MISTAKES = [
  "Ethreum",
  "Etherum",
  "Etherium",
  "Etheruem",
  "Etereum",
  "Eterium",
  "Etherem",
  "Etheerum",
  "Ehtereum",
  "Eferum",
]
const CASE_SENSITIVE_SPELLING_MISTAKES = ["Metamask", "Github"]

/**
 * Locales that use non-Latin scripts and require transliteration of brand names.
 * For these languages, brand names should be transliterated into the target script,
 * NOT kept in Latin. The sanitizer should NOT revert transliterated brands to English.
 * Locales that use non-Latin scripts for brand name transliteration.
 */
const TRANSLITERATION_LOCALES = new Set([
  "hi",
  "mr",
  "bn",
  "ta",
  "te",
  "ar",
  "ur",
  "ru",
  "uk",
  "ja",
  "ko",
  "zh",
  "zh-tw",
])

/**
 * Brand names that should NEVER be translated in ANY language.
 * These are proper nouns - programming languages, companies, products.
 * For Latin-script languages: must stay in English.
 * For non-Latin-script languages: must be TRANSLITERATED (phonetic), not translated.
 */
const PROTECTED_BRAND_NAMES = [
  // Programming languages
  "Solidity",
  "Vyper",
  "Rust",
  "JavaScript",
  "TypeScript",
  "Python",
  "Noir",
  // Companies/Products
  "Alchemy",
  "Infura",
  "MetaMask",
  "Consensys",
  "Chainlink",
  "OpenZeppelin",
  "Gnosis",
  "Flashbots",
  "Etherscan",
  "Hardhat",
  "Foundry",
  "Remix",
  "Truffle",
  "Ganache",
  "Brownie",
  "Waffle",
  "React",
  "Vite",
  "Wagmi",
  // Protocols/Projects
  "Uniswap",
  "Aave",
  "Compound",
  "MakerDAO",
  "Lido",
  "Rocket Pool",
  "ENS",
  // Ethereum clients
  "Besu",
  "Geth",
  "Nethermind",
  "Erigon",
  "Prysm",
  "Lighthouse",
  "Teku",
  "Nimbus",
  "Lodestar",
  // Core terms that must stay English
  "Ethereum",
  "Bitcoin",
  "Beacon Chain",
  "Solana",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Base",
]

/**
 * Common ticker/acronym transpositions found in translations.
 * Maps wrong form → correct form.
 */
const TICKER_CORRECTIONS: Record<string, string> = {
  EHT: "ETH",
  ETTH: "ETH",
  BSL: "BLS",
  ECDAS: "ECDSA",
  TNFs: "NFTs",
  TNF: "NFT",
}

/**
 * Known Crowdin boilerplate strings that get injected mid-content.
 * These are legitimate as standalone paragraphs in translation-program pages,
 * but are artifacts when embedded within other sentences.
 */
const CROWDIN_BOILERPLATE = [
  "نشكرك على مشاركتك في برنامج الترجمة ethereum.org",
  "Thank you for your participation in the ethereum.org Translation Program",
]

/**
 * Strip Crowdin boilerplate strings when injected mid-paragraph.
 * Only strips when preceded by ". " (sentence boundary) on the same line.
 * Preserves standalone occurrences (legitimate content in translation-program pages).
 * Skips code blocks.
 */
function stripCrowdinBoilerplate(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const bp of CROWDIN_BOILERPLATE) {
      const escaped = bp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      // Match: ". boilerplate[.!] " — embedded after a sentence-ending period
      // Use [ \t]+ to avoid crossing line boundaries (standalone lines are legitimate)
      const re = new RegExp(`\\.[ \\t]+${escaped}[.!]?[ \\t]*`, "g")
      parts[i] = parts[i].replace(re, () => {
        fixCount++
        return ". "
      })
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Known garbled transliterations of brand names from Crowdin.
 * Maps the garbled form to the correct brand name.
 *
 * For non-Latin-script languages (ar, hi, etc.), the correct form is the
 * proper transliteration into the target script, loaded from the
 * transliteration bank at .claude/translation-review/transliterations/{locale}.json.
 *
 * The static map below provides fallback Latin-script corrections.
 * At runtime, loadTransliterationCorrections() merges these with the bank.
 */
const BRAND_GARBLE_CORRECTIONS: Record<string, string> = {
  يجتبه: "GitHub",
  الصلابة: "Solidity",
}

/**
 * Load transliteration bank for a locale and build a garble->correct map.
 * Returns the static BRAND_GARBLE_CORRECTIONS with correct forms overridden
 * by the transliteration bank when available.
 */
function loadBrandGarbleCorrections(locale?: string): Record<string, string> {
  if (!locale) return BRAND_GARBLE_CORRECTIONS

  const bankPath = path.join(
    __dirname,
    "../../../.claude/translation-review/transliterations",
    `${locale}.json`
  )

  let bank: Record<string, { text: string }> = {}
  try {
    if (fs.existsSync(bankPath)) {
      const raw = JSON.parse(fs.readFileSync(bankPath, "utf8"))
      bank = raw.transliterations || {}
    }
  } catch {
    // Fall back to static map
  }

  const corrections = { ...BRAND_GARBLE_CORRECTIONS }

  // Override with transliteration bank values where available
  for (const [garble, latinBrand] of Object.entries(BRAND_GARBLE_CORRECTIONS)) {
    const entry = bank[latinBrand]
    if (entry?.text) {
      corrections[garble] = entry.text
    }
  }

  return corrections
}

/**
 * Fix known garbled transliterations of brand names.
 * Replaces consistent Crowdin artifacts with the correct form:
 * - For non-Latin locales: proper transliteration from the bank
 * - Fallback: Latin brand name
 * Skips code blocks.
 */
function fixKnownBrandGarbles(
  content: string,
  locale?: string
): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const corrections = loadBrandGarbleCorrections(locale)

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const [garble, correct] of Object.entries(corrections)) {
      const escaped = garble.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const re = new RegExp(escaped, "g")
      parts[i] = parts[i].replace(re, () => {
        fixCount++
        return correct
      })
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix missing opening <sup> tags before footnote links.
 * Crowdin sometimes drops the opening <sup> tag, leaving an orphaned </sup>.
 * Pattern: `[fnN](#anchor)</sup>` without a preceding `<sup>`.
 * Fix: insert `<sup>` before the `[`.
 * Skips code blocks.
 */
function fixMissingOpeningSup(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match: [linktext](#anchor)</sup> NOT preceded by <sup>
    // Use negative lookbehind for <sup>
    parts[i] = parts[i].replace(
      /(?<!<sup>)(\[[^\]]+\]\([^)]+\)<\/sup>)/g,
      (_, group) => {
        fixCount++
        return `<sup>${group}`
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix base digits merged into <sup> exponent tags by Crowdin.
 * English: `2<sup>256</sup>` -> Crowdin merges to: `<sup>2256</sup>`
 * Fix: extract the base digit(s) from inside <sup> using English as reference.
 *
 * Strategy: For each <sup>DIGITS</sup> in translation, check if English has
 * N<sup>M</sup> where NM equals DIGITS. If so, split accordingly.
 * Skips code blocks.
 */
function fixMergedSupDigits(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let fixCount = 0

  // Extract all N<sup>M</sup> patterns from English (base + exponent)
  const engSupRe = /(\d+)<sup>(\d+)<\/sup>/g
  const engExponents: Array<{ base: string; exp: string; merged: string }> = []
  let m
  while ((m = engSupRe.exec(englishContent)) !== null) {
    engExponents.push({ base: m[1], exp: m[2], merged: m[1] + m[2] })
  }

  if (engExponents.length === 0)
    return { content: translatedContent, fixCount: 0 }

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = translatedContent.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Find <sup>DIGITS</sup> where DIGITS matches a merged base+exp from English
    parts[i] = parts[i].replace(/<sup>(\d+)<\/sup>/g, (match, digits) => {
      const eng = engExponents.find((e) => e.merged === digits)
      if (eng) {
        fixCount++
        return `${eng.base}<sup>${eng.exp}</sup>`
      }
      return match
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix Crowdin numbered tag placeholders (<0>, </0>, <1>, etc.)
 * Crowdin replaces HTML tags with numbered placeholders during translation,
 * but sometimes fails to restore them. Tags may be inverted (closer first)
 * and/or HTML-escaped (&lt;0> instead of <0>).
 *
 * Strategy: Build a map from numbered tags to actual HTML tags by parsing
 * the English source. Then replace all numbered tags in the translation.
 * Handles inverted order and HTML-escaped variants.
 */
/**
 * Remove self-closing JSX components from translations that no longer
 * exist in the English source. These are stale references to components
 * that were removed from the English content but persist in translations.
 *
 * Only removes self-closing components (<ComponentName ... />) on their
 * own line. Does not touch open/close component pairs.
 */
function removeStaleComponents(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = translatedContent.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue

    // Match self-closing JSX components on their own line
    parts[i] = parts[i].replace(
      /^[ \t]*<([A-Z][a-zA-Z]+)\b[^>]*\/>\s*$/gm,
      (match, componentName) => {
        // Check if this component exists anywhere in the English source
        if (!englishContent.includes(componentName)) {
          fixCount++
          return ""
        }
        return match
      }
    )
  }

  let result = parts.join("")
  // Clean up triple+ blank lines left by removal (only if we actually removed something)
  if (fixCount > 0) {
    result = result.replace(/\n{3,}/g, "\n\n")
  }

  return { content: result, fixCount }
}

function fixCrowdinNumberedTags(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let fixCount = 0

  // Build tag map from English: find HTML tags and assign numbers by order
  // Crowdin assigns <0> to the first tag pair, <1> to the second, etc.
  const tagPairRe = /<(strong|em|b|i|u|s|mark|code|span[^>]*)>/g
  const tagMap = new Map<string, { open: string; close: string }>()
  let tagIndex = 0
  let m
  const seen = new Set<string>()

  while ((m = tagPairRe.exec(englishContent)) !== null) {
    const tagName = m[1].split(/\s/)[0] // Get just the tag name without attrs
    const fullOpen = m[0]
    if (!seen.has(tagName)) {
      seen.add(tagName)
      tagMap.set(String(tagIndex), {
        open: fullOpen,
        close: `</${tagName}>`,
      })
      tagIndex++
    }
  }

  if (tagMap.size === 0) return { content: translatedContent, fixCount: 0 }

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = translatedContent.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const [num, tags] of tagMap) {
      // Replace </N>text<N> (inverted) or </N>text&lt;N> (inverted + escaped)
      const invertedRe = new RegExp(
        `</${num}>([\\s\\S]*?)(?:&lt;${num}>|<${num}>)`,
        "g"
      )
      parts[i] = parts[i].replace(invertedRe, (_, inner) => {
        fixCount++
        return `${tags.open}${inner}${tags.close}`
      })

      // Replace <N>text</N> (correct order but numbered)
      const normalRe = new RegExp(
        `(?:&lt;${num}>|<${num}>)([\\s\\S]*?)</${num}>`,
        "g"
      )
      parts[i] = parts[i].replace(normalRe, (_, inner) => {
        fixCount++
        return `${tags.open}${inner}${tags.close}`
      })
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix split bold markers where Crowdin prematurely closes ** mid-paragraph
 * and escapes the real closing marker as \*\*.
 *
 * Pattern: `**text1.** text2.\*\*` -> `**text1. text2.**`
 *
 * On a single line: opening ** ... premature ** close ... escaped \*\* at end.
 * Fix: remove the premature close, unescape the end marker.
 * Skips code blocks. Only operates within single lines (no cross-line spans).
 */
function fixSplitBoldMarkers(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    const lines = parts[i].split("\n")
    for (let j = 0; j < lines.length; j++) {
      // Match: **text1.** text2.\*\* on the same line
      // Opening ** at start/after whitespace, premature ** close, then escaped \*\* at end
      const re = /(\*\*)((?:(?!\*\*).)+?)\*\*((?:(?!\\\*\\\*).)+?)\\\*\\\*/g
      lines[j] = lines[j].replace(re, (_, open, inner1, inner2) => {
        fixCount++
        return `${open}${inner1}${inner2}**`
      })
    }
    parts[i] = lines.join("\n")
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Known wrong Arabic compound terms found in Crowdin translations.
 * Maps wrong compound -> correct compound.
 * These are always wrong in the Ethereum docs context -- "الدولة" means
 * "nation-state" but "state" in CS/blockchain means "حالة" (condition).
 */
const KNOWN_WRONG_COMPOUNDS: Record<string, string> = {
  // State polysemy: political state -> computational state
  "قنوات الدولة": "قنوات الحالة",
  "قناة الدولة": "قناة الحالة",
  "بيانات الدولة": "بيانات الحالة",
  "التزامات الدولة": "التزامات الحالة",
  "جذور الدولة": "جذور الحالة",
  "تحديثات الدولة": "تحديثات الحالة",
  "تحولات الدولة": "تحولات الحالة",
  "تحديث الولاية": "تحديث الحالة",
  "القنوات الحكومية": "قنوات الحالة",
  "التحديثات الحكومية": "تحديثات الحالة",
  "القناة الحكومية": "قناة الحالة",
  "للقنوات الحكومية": "لقنوات الحالة",
  "انعدام الجنسية": "انعدام الحالة",
  "عديمة الجنسية": "عديمة الحالة",
  "عديمي الجنسية": "عديمي الحالة",
  "انتهاء صلاحية الدولة": "انتهاء صلاحية الحالة",
  "مسؤولية الدولة": "مسؤولية الحالة",
  // Ether as altruism
  الإيثار: "الإيثر",
  // Liquid staking as liquid mortgage
  "الرهن العقاري السائل": "التحصيص السائل",
}

/**
 * Fix known wrong Arabic compound terms.
 * These are always-wrong translations where Crowdin/MT picks the wrong
 * meaning of an ambiguous English word (e.g., "state" as nation-state).
 * Skips code blocks.
 */
function fixKnownWrongCompounds(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const [wrong, correct] of Object.entries(KNOWN_WRONG_COMPOUNDS)) {
      const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const re = new RegExp(escaped, "g")
      parts[i] = parts[i].replace(re, () => {
        fixCount++
        return correct
      })
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix duplicated tag/JSON values where a string is concatenated with itself.
 * E.g. "ERC-721ERC-721" -> "ERC-721".
 * Only operates on quoted string values (double quotes) to avoid false positives.
 * The repeated unit must be at least 2 characters.
 * Skips code blocks.
 */
function fixDuplicatedTagValues(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match quoted strings where the value is exactly doubled
    parts[i] = parts[i].replace(/"([^"]{2,})\1"/g, (_, half) => {
      fixCount++
      return `"${half}"`
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Restore abbreviations stripped from parentheses in frontmatter.
 * When English has "(RWA)" but translation has "()", restore the abbreviation.
 * Only restores ASCII/Latin abbreviations (not translated text).
 * Only operates within the frontmatter section.
 */
function restoreStrippedAbbreviations(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let fixCount = 0
  const fmRe = /^---\n([\s\S]*?)\n---/
  const transFmMatch = translatedContent.match(fmRe)
  const engFmMatch = englishContent.match(fmRe)

  if (!transFmMatch || !engFmMatch)
    return { content: translatedContent, fixCount: 0 }

  // Only process frontmatter portion
  let transFm = transFmMatch[1]
  const engFm = engFmMatch[1]

  // Find all "(ABBREV)" patterns in English frontmatter
  const abbrevsInEnglish: string[] = []
  const abbrevRe = /\(([A-Za-z][A-Za-z0-9-]{0,10})\)/g
  let m
  while ((m = abbrevRe.exec(engFm)) !== null) {
    abbrevsInEnglish.push(m[1])
  }

  if (abbrevsInEnglish.length === 0)
    return { content: translatedContent, fixCount: 0 }

  // For each abbreviation found in English, check if translation has "()"
  let abbrevIdx = 0
  transFm = transFm.replace(/\(\)/g, () => {
    if (abbrevIdx < abbrevsInEnglish.length) {
      const abbrev = abbrevsInEnglish[abbrevIdx]
      abbrevIdx++
      fixCount++
      return `(${abbrev})`
    }
    return "()"
  })

  if (fixCount === 0) return { content: translatedContent, fixCount: 0 }

  const content = translatedContent.replace(fmRe, `---\n${transFm}\n---`)
  return { content, fixCount }
}

/**
 * Fix ticker symbol transpositions.
 * Only matches whole words (word boundaries) to avoid false positives.
 * Skips code blocks (fenced and inline) where these forms may be valid.
 */
function fixTickerTranspositions(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split content to preserve code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const [wrong, correct] of Object.entries(TICKER_CORRECTIONS)) {
      // Use alphanumeric-only boundaries instead of \b so that
      // markdown syntax chars like _ (italic) don't prevent matching.
      const re = new RegExp(
        `(?<![A-Za-z0-9])${escapeRegex(wrong)}(?![A-Za-z0-9])`,
        "g"
      )
      const matches = parts[i].match(re)
      if (matches && matches.length > 0) {
        fixCount += matches.length
        parts[i] = parts[i].replace(re, correct)
      }
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix case-sensitive brand capitalization mistakes.
 *
 * Maps wrong-case variants to canonical forms. Skips URLs (github.com etc.)
 * and code blocks. Only matches standalone occurrences (not inside URLs).
 */
const BRAND_CAPITALIZATION_FIXES: Record<string, string> = {
  Metamask: "MetaMask",
  Github: "GitHub",
}

function fixBrandCapitalization(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const [wrong, correct] of Object.entries(BRAND_CAPITALIZATION_FIXES)) {
      // Match the wrong form but NOT when followed by .com/.org/.io/etc.
      // (i.e., skip domain names like github.com)
      const re = new RegExp(
        `(?<![A-Za-z0-9/])${escapeRegex(wrong)}(?!\\.(?:com|org|io|dev|net))(?![A-Za-z0-9])`,
        "g"
      )
      const matches = parts[i].match(re)
      if (matches && matches.length > 0) {
        fixCount += matches.length
        parts[i] = parts[i].replace(re, correct)
      }
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix only brand/product/language name tags in frontmatter.
 * Generic concept tags (e.g. "zero-knowledge" → "nulová znalost") should
 * remain in the native language. Only tags that match a protected brand name
 * in the English source are restored to their canonical casing.
 *
 * Uses targeted replacement to preserve original formatting (multi-line YAML,
 * spacing, quoting style) instead of reconstructing the entire tags line.
 */
function fixBrandTags(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const transMatch = translatedContent.match(frontmatterRe)
  const engMatch = englishContent.match(frontmatterRe)

  if (!transMatch || !engMatch)
    return { content: translatedContent, fixCount: 0 }

  const transFm = transMatch[1]
  const engFm = engMatch[1]

  // Extract tags arrays (handles both single-line and multi-line YAML)
  const tagsRe = /^tags:\s*\[([\s\S]*?)\]/m
  const engTagsMatch = engFm.match(tagsRe)
  const transTagsMatch = transFm.match(tagsRe)

  if (!engTagsMatch || !transTagsMatch)
    return { content: translatedContent, fixCount: 0 }

  // Parse tag values (handles quoted and unquoted)
  const parseTags = (raw: string): string[] =>
    raw
      .split(",")
      .map((t) => t.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean)

  const engTags = parseTags(engTagsMatch[1])
  const transTags = parseTags(transTagsMatch[1])

  // Build a map from lowercase brand name to canonical casing
  const brandCanonical = new Map<string, string>()
  for (const brand of PROTECTED_BRAND_NAMES) {
    brandCanonical.set(brand.toLowerCase(), brand)
  }

  // Identify tags that need fixing: brand tags whose translation differs
  // from the canonical casing. Iterate the shorter list so we only fix
  // positions that exist in both arrays (Crowdin may drop or add tags).
  let fixCount = 0
  let updatedFm = transFm
  const minLen = Math.min(engTags.length, transTags.length)

  for (let i = 0; i < minLen; i++) {
    const engTag = engTags[i]
    const transTag = transTags[i]
    const canonical = brandCanonical.get(engTag.toLowerCase())

    if (!canonical) continue // Not a brand tag — leave as-is
    if (transTag === canonical) continue // Already correct

    // Targeted replacement: find the exact quoted tag in frontmatter and replace
    // Match the tag with its surrounding quotes to avoid false positives
    const quotedTagRe = new RegExp(`(["'])${escapeRegex(transTag)}\\1`)
    if (quotedTagRe.test(updatedFm)) {
      updatedFm = updatedFm.replace(quotedTagRe, `$1${canonical}$1`)
      fixCount++
    }
  }

  if (fixCount === 0) return { content: translatedContent, fixCount: 0 }

  const content = translatedContent.replace(
    frontmatterRe,
    `---\n${updatedFm}\n---`
  )

  return { content, fixCount }
}

/**
 * Fix lowercased MDX component names in translations.
 *
 * Translation pipelines occasionally lowercase PascalCase MDX component tags
 * (e.g. <Emoji> becomes <emoji>). MDX component names are case-sensitive,
 * so the lowercased tag won't resolve to the registered component.
 * This function extracts PascalCase component names from the English source
 * and restores their casing in the translation.
 */
function fixLowercasedMdxComponents(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  // Extract PascalCase component names from English (opening, closing, self-closing)
  const componentRe = /<\/?([A-Z][a-zA-Z0-9]+)[\s/>]/g
  const componentNames = new Set<string>()
  let match
  while ((match = componentRe.exec(englishContent)) !== null) {
    componentNames.add(match[1])
  }

  if (componentNames.size === 0)
    return { content: translatedContent, fixCount: 0 }

  // Build a map from lowercase name to PascalCase
  const caseMap = new Map<string, string>()
  for (const name of componentNames) {
    caseMap.set(name.toLowerCase(), name)
  }

  let fixCount = 0

  // Split to preserve code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = translatedContent.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match opening/closing/self-closing tags with lowercase names
    parts[i] = parts[i].replace(
      /<(\/?)([a-z][a-z0-9]*)(?=[\s/>])/g,
      (full, slash, tagName) => {
        const correct = caseMap.get(tagName)
        if (!correct) return full // Not a known MDX component
        fixCount++
        return `<${slash}${correct}`
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix protected brand names that were mistranslated.
 * For each brand found in English source, if the count drops in translation,
 * attempt to restore by finding the translated variants and replacing them.
 *
 * Strategy: For brand names where English count > translation count,
 * we can't easily know what the mistranslation IS without locale knowledge.
 * So we report these as warnings for the LLM review to handle.
 *
 * For frontmatter `tags`, only brand/product/language names are restored
 * to English; generic concept tags remain in the native language.
 */
function fixProtectedBrandNames(
  translatedContent: string,
  englishContent: string,
  locale?: string
): { content: string; fixCount: number; warnings: string[] } {
  const warnings: string[] = []
  let content = translatedContent
  let fixCount = 0
  const isTranslitLang = locale ? TRANSLITERATION_LOCALES.has(locale) : false

  // Auto-fix: Restore brand-name tags to English (leaves concept tags translated)
  // Runs for ALL locales: brand tags are UI filter chips that stay Latin even in
  // non-Latin scripts (per Gemini guidance: developers scan for brand names visually)
  const brandTagsResult = fixBrandTags(content, englishContent)
  content = brandTagsResult.content
  fixCount += brandTagsResult.fixCount
  if (brandTagsResult.fixCount > 0) {
    warnings.push(
      `Restored ${brandTagsResult.fixCount} brand-name tag(s) to English`
    )
  }

  // Warn: Brand names with count mismatches in body content
  // SKIP for non-Latin locales -- brands are transliterated, won't match Latin regex
  if (isTranslitLang) {
    // For transliteration languages, brand count mismatches are expected
    // (brands appear in native script, not Latin). No warnings needed.
  } else {
    for (const brand of PROTECTED_BRAND_NAMES) {
      const brandRegex = new RegExp(`\\b${escapeRegex(brand)}\\b`, "g")
      const inEnglish = englishContent.match(brandRegex)

      if (inEnglish && inEnglish.length > 0) {
        const inTranslation = content.match(brandRegex)
        const englishCount = inEnglish.length
        const translationCount = inTranslation?.length ?? 0

        if (translationCount < englishCount) {
          warnings.push(
            `Protected brand "${brand}" appears ${englishCount}x in English but ${translationCount}x in translation - may have been mistranslated`
          )
        }
      }
    }
  }

  return { content, fixCount, warnings }
}

/**
 * Fix duplicated headings where the text is repeated.
 * Pattern: ## Text? Text? {#id} → ## Text? {#id}
 * This happens when translators accidentally duplicate question headings.
 */
function fixDuplicatedHeadings(content: string): {
  content: string
  fixCount: number
} {
  let result = content
  let fixCount = 0

  // Match headings where text is duplicated: ## Text Text {#id} or ## Text? Text? {#id}
  // Captures: (hashes) (text including punctuation) (same text) (custom id)
  const duplicatedHeadingRe =
    /^(#{1,6})\s+(.+?[?!.]?)\s+\2\s*(\{#[^}]+\})\s*$/gm

  result = result.replace(duplicatedHeadingRe, (_, hashes, text, id) => {
    fixCount++
    return `${hashes} ${text} ${id}`
  })

  return { content: result, fixCount }
}

/**
 * Fix escaped bold/italic markers from Crowdin.
 * Crowdin often escapes markdown emphasis during translation:
 *   \*\*text\*\* → **text** (bold)
 *   \*text\*    → *text*   (italic)
 *
 * IMPORTANT: Skips table rows (lines starting with |) where \*\* may be
 * intentional — e.g., `2\*\*256` for exponentiation in EVM opcode tables.
 * Also skips code blocks.
 */
function fixEscapedBoldAndItalic(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split content to preserve code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    const lines = parts[i].split("\n")
    for (let j = 0; j < lines.length; j++) {
      // Skip table rows — \*\* may be intentional (e.g., 2\*\*256)
      if (lines[j].trimStart().startsWith("|")) continue

      // Fix escaped bold first: \*\*text\*\* → **text** or <strong>text</strong>
      // Require word-boundary context: opening \*\* must be preceded by
      // whitespace, start-of-line, or non-ASCII chars (CJK/Korean/Arabic
      // don't use spaces between words). Avoids stripping literal \*\* in
      // math (e.g., 2\*\*10) where operands are ASCII digits/variables.
      //
      // When the closing ** is followed by a non-ASCII character, CommonMark
      // may fail to recognize the right-flanking delimiter run (specifically
      // when the inner text ends with punctuation like ')' and is followed
      // by a non-ASCII letter like Korean particles). Use <strong> tags in
      // these cases to guarantee correct rendering.
      lines[j] = lines[j].replace(
        /(?<=\s|^|[\u0080-\uFFFF])\\\*\\\*(.+?)\\\*\\\*(?=\s|$|[.,;:!?\])>]|[\u0080-\uFFFF])/gm,
        (fullMatch, inner, offset) => {
          fixCount++
          const nextChar = lines[j][offset + fullMatch.length]
          if (nextChar && nextChar.charCodeAt(0) > 127) {
            return `<strong>${inner}</strong>`
          }
          return `**${inner}**`
        }
      )

      // Fix escaped italic: \*text\* → *text* or <em>text</em>
      // Runs after bold fix, so remaining \* pairs are italic.
      // Same word-boundary guard plus non-ASCII awareness.
      // Same <em> fallback for non-ASCII followers as bold above.
      lines[j] = lines[j].replace(
        /(?<=\s|^|[\u0080-\uFFFF])\\\*(.+?)\\\*(?=\s|$|[.,;:!?\])>]|[\u0080-\uFFFF])/gm,
        (fullMatch, inner, offset) => {
          fixCount++
          const nextChar = lines[j][offset + fullMatch.length]
          if (nextChar && nextChar.charCodeAt(0) > 127) {
            return `<em>${inner}</em>`
          }
          return `*${inner}*`
        }
      )
    }
    parts[i] = lines.join("\n")
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Warn on headings where the text is only punctuation (no actual words).
 * Example: `## 。 {#who-is-involved}` — heading text is just a period.
 * This indicates Crowdin dropped the heading text during translation.
 */
function warnPunctuationOnlyHeadings(content: string): string[] {
  const warnings: string[] = []
  const headingRe = /^(#{1,6})\s+(.+?)\s*(\{#[^}]+\})?\s*$/gm
  let match
  while ((match = headingRe.exec(content))) {
    const text = match[2].trim()
    // Remove the custom ID if it got captured in the text
    const cleanText = text.replace(/\{#[^}]+\}/, "").trim()
    // Check if remaining text is only punctuation/whitespace
    if (cleanText.length > 0 && /^[\p{P}\p{S}\s]+$/u.test(cleanText)) {
      warnings.push(
        `Heading text is only punctuation: "${match[0].trim()}" — likely missing translation`
      )
    }
  }
  return warnings
}

/**
 * Warn when fenced code block content differs between English and translation.
 * Code inside fences should never be translated (variable names, keywords, etc.).
 * Catches issues like `or` → `または` inside code fences.
 */
/**
 * Strip comments from a code block body so we can compare functional code only.
 * Handles JS-family (// and block comments), Python/Vyper (# and docstrings), and shell (#).
 */
function stripCodeComments(body: string, lang: string): string {
  const l = lang.toLowerCase().split(/\s+/)[0]

  const isPython = ["python", "py", "vyper", "ruby", "rb"].includes(l)
  const isShell = [
    "bash",
    "sh",
    "shell",
    "zsh",
    "fish",
    "yaml",
    "yml",
    "toml",
  ].includes(l)
  const isJs = !isPython && !isShell // default to JS-family

  let result = body

  if (isPython) {
    // Remove """ ... """ docstrings (multiline)
    result = result.replace(/"""[\s\S]*?"""/g, '""""""')
    // Remove # comments (preserve the line structure)
    result = result.replace(/#[^\n]*/g, "#")
  } else if (isShell) {
    result = result.replace(/#[^\n]*/g, "#")
  } else if (isJs) {
    // Remove /* ... */ block comments (preserve as marker)
    result = result.replace(/\/\*[\s\S]*?\*\//g, "/**/")
    // Remove // line comments
    result = result.replace(/\/\/[^\n]*/g, "//")
  }

  // Normalize whitespace for comparison: collapse blank lines, trim each line
  return result
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function warnCodeFenceContentDrift(
  translatedContent: string,
  englishContent: string
): string[] {
  const warnings: string[] = []

  const extractCodeFences = (
    content: string
  ): Array<{ lang: string; body: string }> => {
    const fences: Array<{ lang: string; body: string }> = []
    const re = /```(\w*)\n([\s\S]*?)```/g
    let match
    while ((match = re.exec(content))) {
      fences.push({ lang: match[1] || "", body: match[2].trim() })
    }
    return fences
  }

  const engFences = extractCodeFences(englishContent)
  const transFences = extractCodeFences(translatedContent)

  if (engFences.length !== transFences.length) {
    warnings.push(
      `Code fence count mismatch: English has ${engFences.length}, translation has ${transFences.length}`
    )
    return warnings
  }

  for (let i = 0; i < engFences.length; i++) {
    const lang = engFences[i].lang || transFences[i].lang
    const engStripped = stripCodeComments(engFences[i].body, lang)
    const transStripped = stripCodeComments(transFences[i].body, lang)

    if (engStripped !== transStripped) {
      const preview = transStripped.substring(0, 60).replace(/\n/g, "\\n")
      warnings.push(
        `Code fence #${i + 1} functional code differs from English: "${preview}..."`
      )
    }
  }

  return warnings
}

/**
 * Detects catastrophic code fence drift where Crowdin has structurally
 * mangled the interleaving of prose and code blocks. Signals include:
 * - Translated fence bodies contain natural language instead of code
 * - Programming keywords appear outside code fences
 * - Heading anchor IDs ({#id}) are detached from heading lines
 */
function warnCatastrophicCodeFenceDrift(
  translatedContent: string,
  englishContent: string
): string[] {
  const warnings: string[] = []

  const extractCodeFences = (
    content: string
  ): Array<{ lang: string; body: string; lineCount: number }> => {
    const fences: Array<{ lang: string; body: string; lineCount: number }> = []
    const re = /```(\w*)\n([\s\S]*?)```/g
    let match
    while ((match = re.exec(content))) {
      const body = match[2].trim()
      fences.push({
        lang: match[1] || "",
        body,
        lineCount: body.split("\n").length,
      })
    }
    return fences
  }

  // Code keywords that should only appear inside fences
  const codeKeywords =
    /^(?:def |class |if |elif |else:|while |for |return |require |revert |import |from |call |log )/m

  const engFences = extractCodeFences(englishContent)
  const transFences = extractCodeFences(translatedContent)

  // Check 1: Fence bodies that look like prose instead of code
  if (engFences.length === transFences.length) {
    let proseInFenceCount = 0
    for (let i = 0; i < engFences.length; i++) {
      const engHasCode = codeKeywords.test(engFences[i].body)
      const transHasCode = codeKeywords.test(transFences[i].body)
      const transIsShort = transFences[i].lineCount <= 2
      const engIsLong = engFences[i].lineCount >= 3

      if (engHasCode && !transHasCode && transIsShort && engIsLong) {
        proseInFenceCount++
      }
    }

    if (proseInFenceCount >= 1) {
      warnings.push(
        `CATASTROPHIC code fence drift: ${proseInFenceCount} fences contain prose instead of code. ` +
          `File needs structural reconstruction from English source.`
      )
    }
  }

  // Check 2: Code keywords outside fences in translated content
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = translatedContent.split(codeBlockPattern)
  let codeOutsideFenceCount = 0

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks
    const globalKeywords =
      /^(?:def |class |if |elif |else:|while |for |return |require |revert |import |from |call |log )/gm
    const matches = parts[i].match(globalKeywords)
    if (matches) codeOutsideFenceCount += matches.length
  }

  if (codeOutsideFenceCount >= 3) {
    warnings.push(
      `CATASTROPHIC code fence drift: ${codeOutsideFenceCount} code keyword occurrences found outside fences. ` +
        `Code blocks may have been inverted with prose.`
    )
  }

  // Check 3: Detached heading anchor IDs
  const anchorIdPattern = /\{#[\w-]+\}/g
  const lines = translatedContent.split("\n")
  for (const line of lines) {
    const anchors = line.match(anchorIdPattern)
    if (anchors && !line.match(/^#{1,6}\s/)) {
      warnings.push(
        `Detached heading anchor: "${anchors[0]}" not on a heading line: "${line.substring(0, 80)}"`
      )
    }
  }

  return warnings
}

/**
 * Fix broken markdown links where there's a space between ] and (.
 * Pattern: ] (https://... → ](https://...
 * This is a common translation artifact from Crowdin.
 */
function fixBrokenMarkdownLinks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Match ] followed by space(s) then ( - this breaks markdown links
  const result = content.replace(/\]\s+\(/g, () => {
    fixCount++
    return "]("
  })

  return { content: result, fixCount }
}

/**
 * Fix collapsed line breaks between consecutive MDX components.
 * Pattern: </Component> <Component> → </Component>\n<Component>
 * This happens when translators collapse multiple components onto one line.
 */
function fixCollapsedComponentLineBreaks(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let result = translatedContent
  let fixCount = 0

  // Find components that appear consecutively in English (on separate lines)
  // and restore line breaks in translation if they were collapsed
  const consecutiveComponentRe =
    /<\/([A-Z][A-Za-z]*)[^>]*>\s*<([A-Z][A-Za-z]*)/g

  // Check English for line break patterns between components
  const englishMatches = [...englishContent.matchAll(consecutiveComponentRe)]
  for (const match of englishMatches) {
    const fullMatch = match[0]
    // If English has a newline between these components
    if (fullMatch.includes("\n")) {
      // Find same pattern in translation (possibly without newline)
      const closingTag = match[1]
      const openingTag = match[2]
      const collapsedRe = new RegExp(
        `</${closingTag}>[ \\t]+<${openingTag}`,
        "g"
      )
      const collapsedMatches = result.match(collapsedRe)
      if (collapsedMatches) {
        fixCount += collapsedMatches.length
        result = result.replace(collapsedRe, `</${closingTag}>\n<${openingTag}`)
      }
    }
  }

  return { content: result, fixCount }
}

/**
 * Extract all href values from content (both markdown links and JSX/HTML attributes).
 */
function extractHrefs(content: string): Set<string> {
  const hrefs = new Set<string>()

  // Markdown links: [text](href)
  const markdownLinkRe = /\[[^\]]*\]\(([^)]+)\)/g
  let match
  while ((match = markdownLinkRe.exec(content))) {
    hrefs.add(match[1])
  }

  // JSX/HTML href attributes: href="..." or href='...'
  const hrefAttrRe = /href=["']([^"']+)["']/g
  while ((match = hrefAttrRe.exec(content))) {
    hrefs.add(match[1])
  }

  return hrefs
}

/**
 * Split markdown content into logical blocks (paragraphs/sections).
 * Blocks are separated by blank lines.
 */
function splitIntoBlocks(content: string): string[] {
  // Split on one or more blank lines
  return content.split(/\n\s*\n/).filter((block) => block.trim().length > 0)
}

/**
 * Detect translated/mismatched hrefs by comparing against English source.
 * Warn-only — does NOT auto-fix, because block-positional alignment between
 * English and translated documents is unreliable (Crowdin often adds/removes
 * blank lines, shifting paragraph indices and causing incorrect substitutions).
 *
 * Earlier approach: block-level href comparison using per-paragraph extraction
 * (extractHrefsFromBlock) to match hrefs positionally. Abandoned because Crowdin
 * paragraph drift caused incorrect substitutions. See docs/solutions/ for details.
 *
 * Href fixes are left to the AI review agents which have full semantic context.
 */
function fixTranslatedHrefs(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number; fixes: string[]; warnings: string[] } {
  const englishBlocks = splitIntoBlocks(englishContent)
  const translatedBlocks = splitIntoBlocks(translatedContent)

  // Collect all English internal hrefs as the "valid" set
  const allEnglishHrefs = extractHrefs(englishContent)
  // Collect all translation internal hrefs
  const allTransHrefs = extractHrefs(translatedContent)

  const allWarnings: string[] = []

  // Warn about block count mismatch (indicates paragraph alignment drift)
  if (englishBlocks.length !== translatedBlocks.length) {
    allWarnings.push(
      `Block count mismatch: English has ${englishBlocks.length}, translation has ${translatedBlocks.length}`
    )
  }

  // Document-level href comparison: find hrefs in translation that don't
  // exist anywhere in English (likely translated or corrupted paths)
  for (const href of allTransHrefs) {
    if (isInternalHref(href) && !allEnglishHrefs.has(href)) {
      allWarnings.push(
        `Invalid internal href "${href}" — not found in English source`
      )
    }
  }

  // Find English hrefs missing from translation entirely
  for (const href of allEnglishHrefs) {
    if (isInternalHref(href) && !allTransHrefs.has(href)) {
      allWarnings.push(
        `Missing href "${href}" — present in English but not in translation`
      )
    }
  }

  return {
    content: translatedContent, // No modifications — warn only
    fixCount: 0,
    fixes: [],
    warnings: allWarnings,
  }
}

/**
 * Fix markdown links where square brackets around the link text are missing.
 * Requires English source to identify which hrefs should be links.
 *
 * Handles two Crowdin corruption patterns:
 * 1. text(/path/) — brackets missing, parens present
 * 2. text/path/  — both brackets and parens missing
 *
 * Uses English markdown links as the source of truth: for each English
 * [text](href), checks if the translation has that href in a proper
 * markdown link. If not, searches for the naked href and wraps the
 * preceding text in brackets (and adds parens if missing).
 */
function fixMissingLinkBrackets(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  // Extract all markdown links from English
  const englishLinkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  const englishHrefs: string[] = []
  let linkMatch
  while ((linkMatch = englishLinkRe.exec(englishContent))) {
    englishHrefs.push(linkMatch[2])
  }

  if (englishHrefs.length === 0) {
    return { content: translatedContent, fixCount: 0 }
  }

  // Split to preserve code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = translatedContent.split(codeBlockPattern)
  let fixCount = 0

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    for (const href of englishHrefs) {
      // Only process internal hrefs with at least one path segment —
      // external URLs and bare "/" are too prone to false positives
      if (!href.startsWith("/") || href === "/") continue

      // Skip if translation already has this href in a proper link
      if (parts[i].includes(`](${href})`)) continue

      const escapedHref = escapeRegex(href)

      // Pattern 1: text(/href/) — brackets missing, parens present
      // Find (/href/) NOT preceded by ]
      const parenPattern = new RegExp(`(?<!\\])\\(${escapedHref}\\)`, "g")
      let pMatch
      while ((pMatch = parenPattern.exec(parts[i]))) {
        const parenPos = pMatch.index
        // Walk backwards to find link text start
        const textStart = findLinkTextStart(parts[i], parenPos)
        const linkText = parts[i].substring(textStart, parenPos).trim()
        // Safety: skip if link text contains ]( — already has a link inside
        if (linkText.length > 0 && !linkText.includes("](")) {
          const before = parts[i].substring(0, textStart)
          const after = parts[i].substring(parenPos + pMatch[0].length)
          parts[i] = `${before}[${linkText}](${href})${after}`
          fixCount++
          break // Re-scan after mutation
        }
      }

      // Pattern 2: text/href/ — both brackets and parens missing
      if (parts[i].includes(`](${href})`)) continue // Check again after pattern 1

      const barePattern = new RegExp(`(?<!\\()${escapedHref}(?!\\))`, "g")
      let bMatch
      while ((bMatch = barePattern.exec(parts[i]))) {
        const hrefPos = bMatch.index
        // Verify this isn't inside an already-formed link
        const precedingChars = parts[i].substring(
          Math.max(0, hrefPos - 2),
          hrefPos
        )
        if (precedingChars.includes("](")) continue

        const textStart = findLinkTextStart(parts[i], hrefPos)
        const linkText = parts[i].substring(textStart, hrefPos).trim()
        // Safety: skip if link text contains ]( — already has a link inside
        if (linkText.length > 0 && !linkText.includes("](")) {
          const before = parts[i].substring(0, textStart)
          const after = parts[i].substring(hrefPos + bMatch[0].length)
          parts[i] = `${before}[${linkText}](${href})${after}`
          fixCount++
          break // Re-scan after mutation
        }
      }
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Walk backwards from a position to find where link text starts.
 * Stops at: start of line, list marker (- / * / 1.), or sentence boundary.
 */
function findLinkTextStart(text: string, pos: number): number {
  let textStart = pos
  for (let k = pos - 1; k >= 0; k--) {
    const ch = text[k]
    if (ch === "\n") {
      textStart = k + 1
      // Skip past list markers
      const lineContent = text.substring(k + 1, pos)
      const listMatch = lineContent.match(/^(\s*[-*+]\s+|\s*\d+\.\s+)/)
      if (listMatch) {
        textStart = k + 1 + listMatch[0].length
      }
      break
    }
    if (k === 0) {
      textStart = 0
      const lineContent = text.substring(0, pos)
      const listMatch = lineContent.match(/^(\s*[-*+]\s+|\s*\d+\.\s+)/)
      if (listMatch) {
        textStart = listMatch[0].length
      }
    }
  }
  return textStart
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Check if href is an internal link (starts with / but not //).
 */
function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//")
}

function lineAt(file: string, index: number): string {
  const fileSubstring = file.substring(0, index)
  const lines = fileSubstring.split("\n")
  const linePosition = lines.length
  const charPosition = lines[lines.length - 1].length + 1
  const lineNumber = `${linePosition}:${charPosition}`
  return lineNumber
}
interface HeaderInfo {
  level: number // Number of # symbols
  text: string // Header text (translated or English)
  id: string // Custom ID from {#id}, empty if none
  fullMatch: string // Full matched string for replacement
}

function extractHeaderStructure(md: string): HeaderInfo[] {
  const headers: HeaderInfo[] = []
  let inFence = false
  for (const line of md.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = line.match(/^(#{1,6})\s+(.+?)(?:\s*\{#([^}]+)\})?[ \t]*$/)
    if (m) {
      headers.push({
        level: m[1].length,
        text: m[2].trim(),
        id: (m[3] || "").trim(),
        fullMatch: m[0],
      })
    }
  }
  return headers
}

/**
 * Fix heading anchors that Crowdin detached from their heading lines.
 *
 * Crowdin sometimes strips the `###` prefix and merges the heading text
 * with the following paragraph, leaving `{#anchor-id}` in prose.
 * MDX parses this as a JSX expression, acorn chokes, and the build crashes.
 *
 * Uses English source to determine the correct heading level.
 */
function fixDetachedHeadingAnchors(
  translated: string,
  english: string
): { content: string; fixCount: number } {
  let fixCount = 0

  // Build a map: anchor-id -> heading level from English
  const headingRe = /^(#{1,6})\s+.*\{#([\w-]+)\}/gm
  const anchorLevelMap = new Map<string, string>()
  let m: RegExpExecArray | null
  while ((m = headingRe.exec(english))) {
    anchorLevelMap.set(m[2], m[1])
  }

  if (anchorLevelMap.size === 0) {
    return { content: translated, fixCount: 0 }
  }

  // Process line by line on the FULL content (not code-block-split)
  // to preserve heading context. Skip lines inside fenced code blocks.
  const lines = translated.split("\n")
  const newLines: string[] = []
  let inFencedBlock = false

  for (const line of lines) {
    if (/^```|^~~~/.test(line.trim())) {
      inFencedBlock = !inFencedBlock
      newLines.push(line)
      continue
    }
    if (inFencedBlock) {
      newLines.push(line)
      continue
    }

    // Already a heading line? Leave as-is
    if (/^#{1,6}\s/.test(line)) {
      newLines.push(line)
      continue
    }

    // Check for {#anchor-id} on a non-heading line
    const anchorMatch = line.match(/^(.+?)\s*(\{#([\w-]+)\})\s*(.*)$/)
    if (!anchorMatch) {
      newLines.push(line)
      continue
    }

    const [, beforeAnchor, anchorTag, anchorId, afterAnchor] = anchorMatch
    const level = anchorLevelMap.get(anchorId)

    if (!level) {
      newLines.push(line)
      continue
    }

    // Restore: "Text {#id} Paragraph..." -> "### Text {#id}\n\nParagraph..."
    const headingLine = `${level} ${beforeAnchor.trim()} ${anchorTag}`
    newLines.push(headingLine)
    if (afterAnchor.trim()) {
      newLines.push("")
      newLines.push(afterAnchor.trim())
    }
    fixCount++
  }

  return { content: newLines.join("\n"), fixCount }
}

function syncHeaderIdsWithEnglish(
  translatedMd: string,
  englishMd: string
): string {
  // Extract header structure from both files
  const englishHeaders = extractHeaderStructure(englishMd)
  const translatedHeaders = extractHeaderStructure(translatedMd)

  // Only sync header IDs when structure matches (same count).
  // Positional sync with mismatched counts shifts all IDs after the
  // first missing/extra heading, corrupting anchors across the file.
  if (englishHeaders.length !== translatedHeaders.length) {
    console.warn(
      `[WARN] Header count mismatch: English has ${englishHeaders.length}, translated has ${translatedHeaders.length} — skipping header ID sync`
    )
    return translatedMd
  }

  let result = translatedMd
  // Match headers by index - same position = same semantic header
  for (let i = 0; i < translatedHeaders.length; i++) {
    const translatedHeader = translatedHeaders[i]
    const englishHeader = englishHeaders[i]

    if (translatedHeader.level !== englishHeader.level) {
      console.warn(
        `[WARN] Header level mismatch at position ${i}: English H${englishHeader.level} vs translated H${translatedHeader.level}`
      )
      // Still try to sync the ID even if levels don't match
    }

    // Replace the translated header's ID with the English ID (ASCII-normalized)
    const asciiId = toAsciiId(englishHeader.id)
    const updatedHeader = `${"#".repeat(translatedHeader.level)} ${translatedHeader.text} {#${asciiId}}`

    // Use a more specific replacement to avoid affecting other occurrences
    result = result.replace(translatedHeader.fullMatch, updatedHeader)
  }

  return result
}

function normalizeBlockHtmlLines(md: string): string {
  for (const tag of BLOCK_HTML_TAGS) {
    // Use [ \t]* (horizontal whitespace) instead of \s* to preserve blank lines
    const inlineCloseRe = new RegExp(`([^\\n])[ \\t]*</${tag}>`, "g")
    md = md.replace(
      inlineCloseRe,
      (match: string, before: string, offset: number) => {
        // Find start of current line
        const lineStart = md.lastIndexOf("\n", offset) + 1
        const lineContent = md.slice(lineStart, offset + match.length)
        // If opening tag is on the same line, this is inline usage -- leave it
        if (new RegExp(`<${tag}[\\s>]`).test(lineContent)) {
          return match
        }
        return `${before}\n</${tag}>`
      }
    )
  }
  return md
}

/**
 * Restore blank lines after headers and block components by comparing
 * with English source structure. This preserves readability and formatting.
 */
function restoreBlankLinesFromEnglish(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  const translatedLines = translatedMd.split("\n")
  const englishLines = englishMd.split("\n")

  let fixCount = 0
  const result: string[] = []

  // Patterns that should have blank lines after them
  const headerPattern = /^#{1,6}\s+/
  const blockComponentClosePattern = new RegExp(
    `</(${BLOCK_MDX_COMPONENTS.join("|")})>`
  )

  let inCodeFence = false
  for (let i = 0; i < translatedLines.length; i++) {
    const line = translatedLines[i]
    result.push(line)

    // Track code fence boundaries
    if (/^```|^~~~/.test(line.trim())) {
      inCodeFence = !inCodeFence
    }

    // Skip lines inside code fences (e.g., Python # comments match header pattern)
    if (inCodeFence) continue

    // Check if this line should be followed by a blank line
    const isHeader = headerPattern.test(line)
    const isBlockClose = blockComponentClosePattern.test(line)

    if (isHeader || isBlockClose) {
      const nextLine = translatedLines[i + 1]
      // Treat whitespace-only lines as blank (not just empty string)
      const hasBlankAfter = nextLine !== undefined && nextLine.trim() === ""

      // Find corresponding line in English by matching pattern
      let englishShouldHaveBlank = false

      if (isBlockClose) {
        // Match by specific tag name to avoid cross-tag false matches
        const tagMatch = line.match(
          new RegExp(`</(${BLOCK_MDX_COMPONENTS.join("|")})>`)
        )
        if (tagMatch) {
          const tagName = tagMatch[1]
          const specificCloseRe = new RegExp(`</${tagName}>`)
          for (let j = 0; j < englishLines.length; j++) {
            if (specificCloseRe.test(englishLines[j])) {
              englishShouldHaveBlank = englishLines[j + 1] === ""
              break
            }
          }
        }
      } else if (isHeader) {
        for (let j = 0; j < englishLines.length; j++) {
          const englishLine = englishLines[j]
          if (headerPattern.test(englishLine)) {
            const transLevel = (line.match(/^#+/) || [""])[0].length
            const engLevel = (englishLine.match(/^#+/) || [""])[0].length
            if (transLevel === engLevel) {
              englishShouldHaveBlank = englishLines[j + 1] === ""
              break
            }
          }
        }
      }

      // Add blank line if English has it but translation doesn't
      if (englishShouldHaveBlank && !hasBlankAfter && nextLine !== undefined) {
        result.push("")
        fixCount++
      }
    }
  }

  return { content: result.join("\n"), fixCount }
}

/**
 * Normalize inline component formatting to match English source.
 * If English has the component on one line, collapse translated version too.
 * This prevents MDX from wrapping multi-line content in <p> tags.
 */
function normalizeInlineComponentsFromEnglish(
  translatedMd: string,
  englishMd: string
): {
  content: string
  fixCount: number
} {
  const inlineComponents = ["ButtonLink"]

  let content = translatedMd
  let fixCount = 0

  for (const component of inlineComponents) {
    // Extract English instances and check if they're single-line
    // Key by href attribute since that's preserved in translation
    const englishRe = new RegExp(
      `<${component}[^>]*href="([^"]*)"[^>]*>([\\s\\S]*?)</${component}>`,
      "g"
    )
    const englishFormats = new Map<string, boolean>() // href -> isOneLine

    let match
    while ((match = englishRe.exec(englishMd))) {
      const href = match[1]
      const innerContent = match[2]
      const isOneLine = !innerContent.includes("\n")
      englishFormats.set(href, isOneLine)
    }

    // For each translated instance, mirror English format
    const translatedRe = new RegExp(
      `(<${component}[^>]*href="([^"]*)"[^>]*>)([\\s\\S]*?)(</${component}>)`,
      "g"
    )
    content = content.replace(
      translatedRe,
      (fullMatch, openTag, href, innerContent, closeTag) => {
        const englishIsOneLine = englishFormats.get(href)
        const translatedHasLineBreaks = innerContent.includes("\n")

        // If English is single-line but translated has line breaks, collapse it
        if (englishIsOneLine && translatedHasLineBreaks) {
          fixCount++
          return `${openTag}${innerContent.trim()}${closeTag}`
        }
        return fullMatch
      }
    )
  }

  return { content, fixCount }
}

function fixBlockComponentLineBreaks(md: string): {
  content: string
  fixCount: number
} {
  let content = md
  let fixCount = 0

  for (const component of BLOCK_MDX_COMPONENTS) {
    // Fix inline closing tags: content</Component> → content\n</Component>
    // Use [ \t]* (horizontal whitespace) instead of \s* to preserve blank lines
    const inlineCloseRe = new RegExp(`([^\\n])[ \\t]*</${component}>`, "g")
    content = content.replace(inlineCloseRe, (_, before) => {
      fixCount++
      return `${before}\n</${component}>`
    })

    // Fix inline opening tags: <Component>content → <Component>\ncontent
    // Match any non-newline character after the tag (including other tags)
    // Use (?![A-Za-z]) after component name to prevent "Alert" matching "AlertTitle"
    const inlineOpenRe = new RegExp(
      `(<${component}(?![A-Za-z])[^>]*>)([^\\n])`,
      "g"
    )
    content = content.replace(inlineOpenRe, (_, tag, after) => {
      fixCount++
      return `${tag}\n${after}`
    })
  }

  return { content, fixCount }
}

/**
 * Collapse inline HTML tags to single line when English source has them on one line.
 * Fixes MDX paragraph wrapping issues: <div>content\n</div> → <div>content</div>
 */
function collapseInlineHtmlFromEnglish(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  const inlineTags = ["div", "span", "p", "strong", "em"]
  let fixCount = 0

  // Split on code fences to protect code blocks
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = translatedMd.split(codeBlockPattern)

  // Build a set of lines in English where tag opens and closes on same line
  const englishLines = englishMd.split("\n")

  for (const tag of inlineTags) {
    // Find English lines that have <tag...>...</tag> all on one line
    // (content can include nested tags like <b>, <br/>, etc.)
    const singleLinePattern = new RegExp(`<${tag}[^>]*>.*</${tag}>`)
    const englishSingleLineSet = new Set<string>()

    for (const line of englishLines) {
      if (singleLinePattern.test(line)) {
        // Extract just the opening tag to use as a key
        const openTagMatch = line.match(new RegExp(`<${tag}[^>]*>`))
        if (openTagMatch) {
          englishSingleLineSet.add(openTagMatch[0])
        }
      }
    }

    // In translated content, find cases where:
    // - Opening tag + content is on one line (content may include nested tags)
    // - Newline follows
    // - Closing tag is on the NEXT line (horizontal whitespace only, no newline crossing)
    // Use [ \t]* instead of \s* to prevent matching across blank lines
    const translatedMultiLineRe = new RegExp(
      `(<${tag}[^>]*>)([^\\n]+)\\n([ \\t]*</${tag}>)`,
      "g"
    )

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) continue // Skip code blocks

      parts[i] = parts[i].replace(
        translatedMultiLineRe,
        (fullMatch, openTag, innerContent, closeTagLine) => {
          // Check if this opening tag should be single-line per English
          if (englishSingleLineSet.has(openTag)) {
            fixCount++
            // Collapse: opening tag + trimmed content + closing tag (no newline)
            return `${openTag}${innerContent.trim()}${closeTagLine.trim()}`
          }
          return fullMatch
        }
      )
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix JSX component closing tags that are merged with content.
 * English format:
 *   <ButtonLink href="...">
 *     Content
 *   </ButtonLink>
 * Spanish (broken):
 *   <ButtonLink href="...">
 *     Content</ButtonLink>
 * This function splits the closing tag to its own line when English has it that way.
 */
function fixMergedClosingTags(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  const componentTags = ["ButtonLink", "Link"]
  let content = translatedMd
  let fixCount = 0

  for (const tag of componentTags) {
    // Find patterns in English where the closing tag is on its own line
    // Pattern: <Tag...>\n  content\n</Tag> or <Tag...>\n  content\n  </Tag>
    const englishMultiLineRe = new RegExp(
      `<${tag}[^>]*>\\n[\\s\\S]*?\\n\\s*</${tag}>`,
      "g"
    )

    // Check if English uses multi-line format for this component
    if (!englishMultiLineRe.test(englishMd)) continue

    // In translated content, find cases where closing tag is merged with content on same line
    // Pattern: <Tag...>\n  content</Tag> (content and closing tag on same line)
    const mergedPattern = new RegExp(
      `(<${tag}[^>]*>\\n)(\\s*)([^\\n]+)(</${tag}>)`,
      "g"
    )

    content = content.replace(
      mergedPattern,
      (match, openTagLine, indent, innerContent, closeTag) => {
        // Only fix if the inner content doesn't end with just whitespace
        // and the closing tag is directly after content (not on its own line)
        const trimmedContent = innerContent.trimEnd()
        if (trimmedContent.length > 0 && !innerContent.includes("\n")) {
          fixCount++
          // Split: put closing tag on its own line with same indentation
          return `${openTagLine}${indent}${trimmedContent}\n${indent}${closeTag}`
        }
        return match
      }
    )
  }

  return { content, fixCount }
}

/**
 * Repair unclosed backticks by comparing with English source.
 * Detects lines with odd backtick counts containing < and attempts repair.
 */
function repairUnclosedBackticks(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  const translatedLines = translatedMd.split("\n")
  const englishLines = englishMd.split("\n")
  let fixCount = 0

  for (let i = 0; i < translatedLines.length; i++) {
    const line = translatedLines[i]
    const backtickCount = (line.match(/`/g) || []).length

    // Odd number of backticks and contains < means potentially unclosed code with HTML-like content
    if (
      backtickCount % 2 === 1 &&
      line.includes("<") &&
      !line.includes("```")
    ) {
      // Try to find a matching English line with similar structure
      for (const engLine of englishLines) {
        // Look for English lines with balanced backticks containing similar patterns
        const engBackticks = (engLine.match(/`/g) || []).length
        if (
          engBackticks % 2 === 0 &&
          engBackticks > 0 &&
          engLine.includes("<")
        ) {
          // Extract inline code blocks from English
          const codeBlockRe = /`([^`]+)`/g
          let engMatch
          while ((engMatch = codeBlockRe.exec(engLine))) {
            const engCode = engMatch[1]
            // Check if the translated line contains this code pattern without closing backtick
            const unbalancedPattern = new RegExp(
              "`" +
                engCode
                  .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                  .replace(/\s+/g, "\\s*")
            )
            if (
              unbalancedPattern.test(line) &&
              !line.includes("`" + engCode + "`")
            ) {
              // Found a match - add the missing closing backtick
              translatedLines[i] = line.replace(
                new RegExp(
                  "`" +
                    engCode
                      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                      .replace(/\s+/g, "\\s*")
                ),
                "`" + engCode + "`"
              )
              fixCount++
              break
            }
          }
          if (fixCount > 0) break
        }
      }
    }
  }

  return { content: translatedLines.join("\n"), fixCount }
}

/**
 * Fix Crowdin-split inline code spans by comparing against English.
 *
 * Crowdin sometimes inserts a premature closing backtick inside an inline
 * code span, splitting it into two fragments:
 *   English:  `<> ... </>`
 *   Crowdin:  `<> ...` </>`
 *
 * This function finds inline code spans in English, checks if the translated
 * line has the same content split across two backtick-delimited fragments,
 * and merges them back into a single span.
 */
function fixCrowdinSplitBackticks(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  const translatedLines = translatedMd.split("\n")
  const englishLines = englishMd.split("\n")
  let fixCount = 0

  // Extract all inline code spans from English
  const engCodeSpans: string[] = []
  const codeSpanRe = /`([^`]+)`/g
  for (const engLine of englishLines) {
    let m: RegExpExecArray | null
    while ((m = codeSpanRe.exec(engLine)) !== null) {
      engCodeSpans.push(m[1])
    }
  }

  for (let i = 0; i < translatedLines.length; i++) {
    const line = translatedLines[i]
    if (line.startsWith("```") || line.startsWith("~~~")) continue

    for (const engCode of engCodeSpans) {
      // Build a pattern that matches the English code content split by
      // a premature backtick close+reopen: `part1` part2`
      // Match: `<prefix>` <suffix>` where prefix+suffix = engCode
      // The split point could be anywhere, so try each possible split
      for (let splitAt = 1; splitAt < engCode.length; splitAt++) {
        const prefix = engCode.slice(0, splitAt)
        const suffix = engCode.slice(splitAt)
        const prefixEsc = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const suffixEsc = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        // Match: `prefix` suffix` with optional whitespace around the split
        const splitPattern = new RegExp(
          "`" + prefixEsc + "`\\s*" + suffixEsc + "`"
        )
        if (splitPattern.test(line)) {
          translatedLines[i] = line.replace(splitPattern, "`" + engCode + "`")
          fixCount++
          break
        }
      }
      if (fixCount > 0) break
    }
  }

  return { content: translatedLines.join("\n"), fixCount }
}

/**
 * Normalize frontmatter dates from localized format (DD-MM-YYYY) back to ISO (YYYY-MM-DD).
 */
function normalizeFrontmatterDates(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Match frontmatter block
  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRe)
  if (!match) return { content, fixCount }

  let frontmatter = match[1]
  const originalFrontmatter = frontmatter

  // Fix published: dates in DD-MM-YYYY or DD/MM/YYYY format
  frontmatter = frontmatter.replace(
    /^(published:\s*)(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/gm,
    (_, prefix, day, month, year) => {
      fixCount++
      // Pad day and month with leading zeros if needed
      const paddedDay = day.padStart(2, "0")
      const paddedMonth = month.padStart(2, "0")
      return `${prefix}${year}-${paddedMonth}-${paddedDay}`
    }
  )

  if (frontmatter !== originalFrontmatter) {
    content = content.replace(frontmatterRe, `---\n${frontmatter}\n---`)
  }

  return { content, fixCount }
}

/**
 * Sync protected frontmatter fields from English source.
 * These fields should never be translated (e.g., template, sidebar).
 */
function syncProtectedFrontmatterFields(
  translatedMd: string,
  englishMd: string,
  locale?: string
): { content: string; fixCount: number } {
  // Fields that should never be translated - sync from English canonical
  // Note: 'buttons' array needs special handling (content translatable, toId/isSecondary not)
  // Note: 'lang' must NOT be protected - it is handled by fixFrontmatterLang()
  // Note: 'author' is excluded for non-Latin locales -- author names render to readers
  //   and should be transliterated for reading flow
  const isTranslitLang = locale ? TRANSLITERATION_LOCALES.has(locale) : false
  const protectedFields = [
    "template",
    "sidebar",
    "sidebarDepth",
    "published",
    ...(isTranslitLang ? [] : ["author"]),
    "source",
    "sourceUrl",
    "address",
    "emoji",
    "skill",
    "isOutdated",
    "incomplete",
    "hideEditButton",
    "showDropdown",
    "image",
    "blurDataURL",
  ]
  let fixCount = 0

  // Extract frontmatter from both
  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const transMatch = translatedMd.match(frontmatterRe)
  const engMatch = englishMd.match(frontmatterRe)

  if (!transMatch || !engMatch) return { content: translatedMd, fixCount }

  let transFrontmatter = transMatch[1]
  const engFrontmatter = engMatch[1]

  for (const field of protectedFields) {
    // Get English value
    const engFieldRe = new RegExp(`^${field}:\\s*(.+)$`, "m")
    const engFieldMatch = engFrontmatter.match(engFieldRe)
    if (!engFieldMatch) continue

    const englishValue = engFieldMatch[1].trim()

    // Check if translated value differs
    const transFieldRe = new RegExp(`^${field}:\\s*(.+)$`, "m")
    const transFieldMatch = transFrontmatter.match(transFieldRe)

    if (transFieldMatch) {
      const translatedValue = transFieldMatch[1].trim()
      // Remove quotes for comparison
      const cleanTranslated = translatedValue.replace(/^["']|["']$/g, "")
      const cleanEnglish = englishValue.replace(/^["']|["']$/g, "")

      if (cleanTranslated !== cleanEnglish) {
        // Replace with English value
        transFrontmatter = transFrontmatter.replace(
          transFieldRe,
          `${field}: ${englishValue}`
        )
        fixCount++
      }
    }
  }

  if (fixCount > 0) {
    return {
      content: translatedMd.replace(
        frontmatterRe,
        `---\n${transFrontmatter}\n---`
      ),
      fixCount,
    }
  }

  return { content: translatedMd, fixCount }
}

/**
 * Force the frontmatter `lang` field to match the locale derived from the file path.
 * The lang field must always equal the target language code (e.g., "ur", "ja", "es").
 * This is a deterministic fix -- the correct value is encoded in the path itself:
 *   public/content/translations/<LANG_CODE>/...
 */
function fixFrontmatterLang(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!locale) return { content, fixCount: 0 }

  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRe)
  if (!match) return { content, fixCount: 0 }

  const frontmatter = match[1]
  const langRe = /^lang:\s*(.+)$/m
  const langMatch = frontmatter.match(langRe)
  if (!langMatch) return { content, fixCount: 0 }

  const currentLang = langMatch[1].trim()
  if (currentLang === locale) return { content, fixCount: 0 }

  const fixedFrontmatter = frontmatter.replace(langRe, `lang: ${locale}`)
  return {
    content: content.replace(frontmatterRe, `---\n${fixedFrontmatter}\n---`),
    fixCount: 1,
  }
}

/**
 * Sync non-translatable fields (toId, isSecondary) in the buttons frontmatter
 * array from the English source. The 'content' field is translatable and preserved.
 * Addresses the gap noted in syncProtectedFrontmatterFields (line 1217 comment).
 */
function syncButtonsFrontmatterFields(
  translatedMd: string,
  englishMd: string
): { content: string; fixCount: number } {
  let fixCount = 0

  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const transMatch = translatedMd.match(frontmatterRe)
  const engMatch = englishMd.match(frontmatterRe)

  if (!transMatch || !engMatch) return { content: translatedMd, fixCount }

  const transFm = transMatch[1]
  const engFm = engMatch[1]

  const protectedButtonFields = ["toId", "isSecondary"]

  // Collect English values for each protected field (in order of appearance)
  const engValuesMap: Record<string, string[]> = {}
  for (const field of protectedButtonFields) {
    engValuesMap[field] = []
    const re = new RegExp(`^\\s+${field}:\\s*(.+)$`, "gm")
    let m: RegExpExecArray | null
    while ((m = re.exec(engFm)) !== null) {
      engValuesMap[field].push(m[1].trim())
    }
  }

  // Track occurrence index per field
  const fieldIdx: Record<string, number> = {}
  for (const field of protectedButtonFields) {
    fieldIdx[field] = 0
  }

  // Process translated frontmatter line by line
  const lines = transFm.split("\n")
  for (let i = 0; i < lines.length; i++) {
    for (const field of protectedButtonFields) {
      const lineRe = new RegExp(`^(\\s+${field}:\\s*)(.+)$`)
      const lineMatch = lines[i].match(lineRe)
      if (!lineMatch) continue

      const idx = fieldIdx[field]
      const engValues = engValuesMap[field]
      if (idx >= engValues.length) break

      const transValue = lineMatch[2].trim()
      const engValue = engValues[idx]

      // Strip quotes for comparison
      const cleanTrans = transValue.replace(/^["']|["']$/g, "")
      const cleanEng = engValue.replace(/^["']|["']$/g, "")

      if (cleanTrans !== cleanEng) {
        lines[i] = `${lineMatch[1]}${engValue}`
        fixCount++
      }

      fieldIdx[field]++
    }
  }

  if (fixCount > 0) {
    const newFm = lines.join("\n")
    return {
      content: translatedMd.replace(frontmatterRe, `---\n${newFm}\n---`),
      fixCount,
    }
  }

  return { content: translatedMd, fixCount }
}

/**
 * Fix ASCII guillemets (<< and >>) to proper Unicode guillemets (« and »).
 * Prevents MDX parsing errors from malformed angle bracket sequences.
 * IMPORTANT: Skips code blocks where << and >> are valid bit-shift operators.
 */
function fixAsciiGuillemets(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split content to preserve code blocks (both fenced and inline)
  // Fenced: ```...``` or ~~~...~~~
  // Inline: `...`
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    // Skip code blocks (odd indices after split with capturing group)
    if (i % 2 === 1) continue

    // Count and replace in non-code parts only
    const leftMatches = parts[i].match(/<</g)
    const rightMatches = parts[i].match(/>>/g)

    if (leftMatches) {
      fixCount += leftMatches.length
      parts[i] = parts[i].replace(/<</g, "«")
    }
    if (rightMatches) {
      fixCount += rightMatches.length
      parts[i] = parts[i].replace(/>>/g, "»")
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix Unicode guillemets (U+00AB, U+00BB) that replace < or > in HTML tags.
 *
 * Gemini/Crowdin sometimes substitutes the right guillemet for > when closing
 * an HTML attribute (e.g., dir="ltr">> becomes dir="ltr">). Similarly, left
 * guillemet can replace <.
 *
 * Only fixes guillemets adjacent to HTML tag syntax. Leaves legitimate
 * guillemet quotation pairs (e.g., <<text>>) untouched.
 */
function fixGuillemetsInHtmlTags(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue

    // Process line by line for context
    const lines = parts[i].split("\n")
    for (let j = 0; j < lines.length; j++) {
      // Match complete tag-like patterns with guillemets replacing < or >
      // Pattern 1: «tagname attr="val"»  or «/tagname» (guillemets as < and >)
      // Must contain tag-like syntax: attributes (=, quotes) or be a closing tag (/)
      lines[j] = lines[j].replace(
        /\u00AB(\/?[a-zA-Z][\w]*(?:\s[^>\u00BB]*)?)[>\u00BB]/g,
        (match, inner) => {
          // Closing tag: «/span» -- always valid
          if (inner.startsWith("/")) {
            fixCount++
            return "<" + inner + ">"
          }
          // Opening tag with attributes: «span dir="ltr"» -- has = or quotes
          if (/[="']/.test(inner)) {
            fixCount++
            return "<" + inner + ">"
          }
          // Simple tag: «br» «i» «b» -- only known HTML tag names
          // Whitelist prevents false positives on guillemet-quoted words
          // like «cat» «dog» «null» which are legitimate quotation marks
          const KNOWN_SHORT_HTML_TAGS = new Set([
            "a",
            "b",
            "i",
            "p",
            "s",
            "u",
            "br",
            "em",
            "hr",
            "li",
            "ol",
            "td",
            "th",
            "tr",
            "ul",
            "dd",
            "dl",
            "dt",
            "div",
            "img",
            "nav",
            "pre",
            "sub",
            "sup",
          ])
          if (KNOWN_SHORT_HTML_TAGS.has(inner)) {
            fixCount++
            return "<" + inner + ">"
          }
          return match
        }
      )

      // Pattern 2: <tagname ...» (right guillemet as >, left < is correct)
      lines[j] = lines[j].replace(/<([^<>]*)\u00BB/g, (_, inner) => {
        fixCount++
        return "<" + inner + ">"
      })
    }
    parts[i] = lines.join("\n")
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix missing closing tags on single-line MDX components.
 *
 * Crowdin/Gemini sometimes drops the closing tag on components that should
 * be self-contained on a single line (e.g., <SocialListItem>).
 */
function fixMissingComponentClosingTags(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const singleLineComponents = ["SocialListItem"]

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue

    const lines = parts[i].split("\n")
    for (let j = 0; j < lines.length; j++) {
      for (const comp of singleLineComponents) {
        const openPattern = new RegExp(`<${comp}\\s[^>]*>`)
        const closePattern = new RegExp(`</${comp}>`)

        if (openPattern.test(lines[j]) && !closePattern.test(lines[j])) {
          lines[j] = lines[j].trimEnd() + `</${comp}>`
          fixCount++
        }
      }
    }
    parts[i] = lines.join("\n")
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix DocLink components mangled into markdown link syntax by Crowdin/Gemini.
 *
 * Pattern: `[<DocLink href="](/actual/path)/">` -> `<DocLink href="/actual/path/">`
 *
 * Crowdin treats `<DocLink href="...">` as a markdown link, wrapping the
 * component tag in `[...]()` syntax and moving the href into the parentheses.
 */
function fixMangledDocLinks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue

    // Match: [<DocLink href="](path)/">  or  [<DocLink href="](path)">
    parts[i] = parts[i].replace(
      /\[<DocLink\s+href="\]\(([^)]+)\)\/?">?/g,
      (_, path) => {
        fixCount++
        const normalizedPath = path.endsWith("/") ? path : path + "/"
        return `<DocLink href="${normalizedPath}">`
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Wrap frontmatter string values in double quotes when they contain characters
 * that break YAML parsing: non-ASCII characters, colon-space (`: `), or
 * space-hash (` #`) sequences.
 */
function quoteFrontmatterNonAscii(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Match frontmatter block
  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRe)
  if (!match) return { content, fixCount }

  let frontmatter = match[1]
  const originalFrontmatter = frontmatter

  // Find lines with unquoted values containing non-ASCII
  const lines = frontmatter.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Match key: value pattern
    const keyValueRe = /^(\s*\w+:\s*)(.+)$/
    const kvMatch = line.match(keyValueRe)
    if (kvMatch) {
      const [, prefix, value] = kvMatch
      const trimmedValue = value.trim()

      // Replace smart/curly quotes ONLY when they act as the outer value
      // delimiters (first and last character). Inner smart quotes inside an
      // already-quoted value are legitimate typographic quotes and must stay.
      // e.g., summaryPoint1: \u201CText\u201D  ->  summaryPoint1: "Text"
      // but NOT: description: "Text \u201Cinner\u201D."  (leave inner alone)
      const smartOpen = /^[\u201C\u201E\u201F]/
      const smartClose = /[\u201D\u201E\u201F]$/
      if (smartOpen.test(trimmedValue) && smartClose.test(trimmedValue)) {
        // Smart quotes are the outer delimiters -- replace only first and last
        const inner = trimmedValue.slice(1, -1)
        lines[i] = `${prefix}"${inner}"`
        fixCount++
        continue
      }

      // Skip if already quoted (starts and ends with matching quotes)
      if (
        (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
        (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
      ) {
        continue
      }

      // Skip YAML arrays - they handle their own internal quoting
      // Inline arrays: tags: [ "value1", "value2" ]
      if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
        continue
      }
      // Multi-line array items with - prefix won't match our key:value regex,
      // but check explicitly for robustness (e.g., `key: - value` edge case)
      if (trimmedValue.startsWith("-")) {
        continue
      }

      // Check if value needs quoting:
      // 1. Contains non-ASCII characters (accented chars, CJK, etc.)
      // 2. Contains YAML-special sequences that break parsing
      //    - `: ` (colon-space) triggers nested mapping error
      //    - ` #` (space-hash) triggers inline comment
      const needsQuoting =
        // eslint-disable-next-line no-control-regex
        /[^\x00-\x7F]/.test(value) ||
        /: /.test(trimmedValue) ||
        / #/.test(trimmedValue)

      if (needsQuoting) {
        // Escape any existing double quotes in the value
        const escapedValue = trimmedValue.replace(/"/g, '\\"')
        lines[i] = `${prefix}"${escapedValue}"`
        fixCount++
      }
    }
  }

  frontmatter = lines.join("\n")
  if (frontmatter !== originalFrontmatter) {
    content = content.replace(frontmatterRe, `---\n${frontmatter}\n---`)
  }

  return { content, fixCount }
}

/**
 * Expected Unicode script ranges per locale.
 * Maps locale prefix to regex of UNEXPECTED characters.
 * If these characters appear in a file for that locale, it's contamination.
 */
const CROSS_SCRIPT_DETECTORS: Record<
  string,
  { name: string; pattern: RegExp }
> = {
  // Latin-script languages should not contain Devanagari, CJK, Arabic, etc.
  tr: {
    name: "Devanagari/CJK/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF]/g,
  },
  fr: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  de: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  es: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  it: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  pt: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  pl: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  cs: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  id: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  sw: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  vi: {
    name: "Devanagari/CJK/Cyrillic/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/g,
  },
  // Cyrillic languages should not contain Devanagari, CJK, Arabic, etc.
  ru: {
    name: "Devanagari/CJK/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0600-\u06FF]/g,
  },
  uk: {
    name: "Devanagari/CJK/Arabic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0600-\u06FF]/g,
  },
  // Arabic should not contain Devanagari, CJK, Cyrillic, etc.
  ar: {
    name: "Devanagari/CJK/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF]/g,
  },
  ur: {
    name: "Devanagari/CJK/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0400-\u04FF]/g,
  },
  // Devanagari languages should not contain CJK, Arabic, Cyrillic
  hi: {
    name: "CJK/Arabic/Cyrillic",
    pattern: /[\u4E00-\u9FFF\u0600-\u06FF\u0400-\u04FF]/g,
  },
  mr: {
    name: "CJK/Arabic/Cyrillic",
    pattern: /[\u4E00-\u9FFF\u0600-\u06FF\u0400-\u04FF]/g,
  },
  // CJK languages should not contain Devanagari, Arabic, Cyrillic
  ja: {
    name: "Devanagari/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/g,
  },
  ko: {
    name: "Devanagari/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/g,
  },
  "zh-tw": {
    name: "Devanagari/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u0600-\u06FF\u0400-\u04FF]/g,
  },
  // Tamil/Telugu should not contain Devanagari, CJK, Arabic, Cyrillic
  ta: {
    name: "Devanagari/CJK/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0600-\u06FF\u0400-\u04FF]/g,
  },
  te: {
    name: "Devanagari/CJK/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0600-\u06FF\u0400-\u04FF]/g,
  },
  // Bengali should not contain other Indic, CJK, Arabic, Cyrillic
  bn: {
    name: "Devanagari/CJK/Arabic/Cyrillic",
    pattern: /[\u0900-\u097F\u4E00-\u9FFF\u0600-\u06FF\u0400-\u04FF]/g,
  },
}

/** RTL locales that need BiDi protection checks. */
const RTL_LOCALES = new Set(["ar", "ur"])

/**
 * Split pattern for RTL BiDi fixes. Skips:
 * - Fenced code blocks (```...```, ~~~...~~~)
 * - Inline code (`...`)
 * - Markdown link URLs: ](url)
 * - Bare URLs: https://... or http://...
 * - HTML attributes: attr="value"
 * - Already-wrapped spans: <span dir="ltr">...</span>
 */
const RTL_SKIP_PATTERN =
  /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`|\]\([^)]+\)|https?:\/\/[^\s<>)]+|<span dir="ltr">[\s\S]*?<\/span>|\w+="[^"]*")/g

/**
 * Wrap bare numeric dates in RTL files with <span dir="ltr"> to prevent
 * BiDi flipping. Dates like "2026-03-15" or "03/15/2026" visually flip
 * in RTL text because hyphens/slashes are BiDi-neutral characters.
 *
 * Skips: code blocks, inline code, markdown link URLs, bare URLs,
 * HTML attributes, already-wrapped spans, and frontmatter.
 */
function fixBareRtlDates(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!RTL_LOCALES.has(locale)) return { content, fixCount: 0 }
  let fixCount = 0

  // Split out frontmatter to avoid touching date-like strings in YAML
  const fmRe = /^(---\n[\s\S]*?\n---\n)/
  const fmMatch = content.match(fmRe)
  const frontmatter = fmMatch ? fmMatch[1] : ""
  let body = fmMatch ? content.slice(frontmatter.length) : content

  const parts = body.split(RTL_SKIP_PATTERN)

  // Date patterns: YYYY-MM-DD, YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY
  const dateRe = /\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{4}/g

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip protected zones

    parts[i] = parts[i].replace(dateRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
  }

  body = parts.join("")
  return { content: frontmatter + body, fixCount }
}

/**
 * Wrap bare math equations in RTL files with <span dir="ltr"> to prevent
 * BiDi flipping. Equations like "1150 - 187 = 963" visually flip because
 * operators (=, -, +, *, /) are BiDi-neutral.
 *
 * Only matches patterns with digits on BOTH sides of operators to avoid
 * false positives with markdown syntax (* for bold/italic, - for lists,
 * / in paths).
 *
 * Skips: code blocks, inline code, markdown link URLs, bare URLs,
 * HTML attributes, already-wrapped spans, and frontmatter.
 */
function fixBareRtlEquations(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!RTL_LOCALES.has(locale)) return { content, fixCount: 0 }
  let fixCount = 0

  // Split out frontmatter
  const fmRe = /^(---\n[\s\S]*?\n---\n)/
  const fmMatch = content.match(fmRe)
  const frontmatter = fmMatch ? fmMatch[1] : ""
  let body = fmMatch ? content.slice(frontmatter.length) : content

  const parts = body.split(RTL_SKIP_PATTERN)

  // Match: num (op num)+ = num (op num)* -- full equation chains
  // e.g. 20+10*0.907=29.07, 0-1=2^256-1, 112+32=256
  // Requires digits flanking all operators to avoid markdown syntax false positives.
  // Operators: +, -, ^, raw * and /, markdown-escaped \* and \/
  const OP = "(?:[-+^]|\\\\?[*/])"
  const NUM = "\\d+(?:\\.\\d+)?"
  const eqRe = new RegExp(
    `${NUM}(?:\\s*${OP}\\s*${NUM})+\\s*=\\s*${NUM}(?:\\s*${OP}\\s*${NUM})*`,
    "g"
  )

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip protected zones

    parts[i] = parts[i].replace(eqRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
  }

  body = parts.join("")
  return { content: frontmatter + body, fixCount }
}

/**
 * Fix misaligned closing code fences.
 *
 * When Gemini translates markdown with indented code fences (e.g., inside
 * numbered lists), it sometimes strips the indentation from the closing
 * fence while preserving it on the opening fence. This breaks syntax
 * highlighting and confuses parsers.
 *
 * Example:
 *   Input:  "    ```sh\n    cmd\n```"     (opening indented, closing not)
 *   Output: "    ```sh\n    cmd\n    ```"  (closing indentation restored)
 *
 * Only fixes cases where the opening fence is indented and the closing
 * fence is not. Does not touch correctly-aligned or non-indented fences.
 */
function fixMisalignedCodeFences(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const lines = content.split("\n")

  let inFence = false
  let openIndent = ""
  let openFenceChar = ""

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!inFence) {
      // Check for indented opening fence
      const openMatch = line.match(/^([ \t]+)(```|~~~)(.*)$/)
      if (openMatch) {
        inFence = true
        openIndent = openMatch[1]
        openFenceChar = openMatch[2]
      }
      continue
    }

    // Inside a fence -- look for closing fence
    const closeMatch = line.match(/^([ \t]*)(```|~~~)\s*$/)
    if (closeMatch && closeMatch[2] === openFenceChar) {
      const closeIndent = closeMatch[1]
      if (closeIndent.length < openIndent.length) {
        // Misaligned: restore the opening fence's indentation
        lines[i] = openIndent + openFenceChar
        fixCount++
      }
      inFence = false
      openIndent = ""
      openFenceChar = ""
    }
  }

  return { content: lines.join("\n"), fixCount }
}

/**
 * Wrap bare LTR values in RTL files with <span dir="ltr"> to prevent
 * BiDi rendering issues. Catches patterns Gemini may miss:
 *
 * - Numbers with Latin units: 32 ETH, 100 Gwei, 2 TB, 13s, 24h
 * - Percentages: 12.5%, 51%, -12.5%
 * - Currency: $100,000, $2,500 USD
 * - Version/protocol IDs: v1.10.8, EIP-1559, ERC-721
 * - Large formatted numbers: 21,000, 100,000
 * - Decimal numbers with context: 0.000252 ETH
 * - Multipliers: 2x, 100x
 *
 * Skips: code blocks, inline code, markdown link URLs, bare URLs,
 * HTML attributes, already-wrapped spans, and frontmatter.
 */
function fixBareRtlValues(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!RTL_LOCALES.has(locale)) return { content, fixCount: 0 }
  let fixCount = 0

  const fmRe = /^(---\n[\s\S]*?\n---\n)/
  const fmMatch = content.match(fmRe)
  const frontmatter = fmMatch ? fmMatch[1] : ""
  let body = fmMatch ? content.slice(frontmatter.length) : content

  const parts = body.split(RTL_SKIP_PATTERN)

  // Common Latin units that appear after numbers in ethereum.org content
  const UNITS =
    "ETH|BTC|Gwei|gwei|Wei|wei|USD|EUR|GBP|MB|GB|TB|KB|TH\\/s|MH\\/s|GH\\/s|APR|APY"

  // Order matters: currency first (captures $), then numUnit (skips $ prefix)

  // Pattern 1: Currency with $ symbol ($100,000, $2,500 USD)
  const currencyRe =
    /(?<!<span dir="ltr">)(\$\d[\d,.]*(?:\s*(?:USD|EUR|GBP))?)(?!\s*<\/span>)/g

  // Pattern 2: Number + Latin unit (32 ETH, 100 Gwei, 2 TB, 13s, 24h)
  // Negative lookbehind for $ prevents double-wrapping currency amounts
  const numUnitRe = new RegExp(
    `(?<!<span dir="ltr">)(?<!\\$)(-?\\d[\\d,.]*\\s*(?:${UNITS}|[smh]\\b|x\\b))(?!\\s*<\\/span>)`,
    "g"
  )

  // Pattern 3: Bare percentages (-12.5%, 51%)
  const pctRe = /(?<!<span dir="ltr">)(-?\d[\d,.]*\s*%)(?!\s*<\/span>)/g

  // Pattern 4: Version/protocol IDs (v1.10.8, EIP-1559, ERC-721)
  const versionRe =
    /(?<!<span dir="ltr">)((?:v\d+\.\d+(?:\.\d+)*|(?:EIP|ERC|BLS)-\d+))(?!\s*<\/span>)/g

  // Pattern 5: Large formatted numbers standing alone (21,000 but not inside other patterns)
  const largeNumRe =
    /(?<!<span dir="ltr">)(?<!\d)(\d{1,3}(?:,\d{3})+)(?!\s*(?:[a-zA-Z%$]|<\/span>))/g

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip protected zones

    let part = parts[i]
    part = part.replace(currencyRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
    part = part.replace(numUnitRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
    part = part.replace(pctRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
    part = part.replace(versionRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
    part = part.replace(largeNumRe, (match) => {
      fixCount++
      return `<span dir="ltr">${match}</span>`
    })
    parts[i] = part
  }

  body = parts.join("")
  return { content: frontmatter + body, fixCount }
}

/**
 * Fix units that ended up outside <span dir="ltr"> wrappers.
 * Gemini sometimes produces: <span dir="ltr">$100,000</span> USD
 * Correct form: <span dir="ltr">$100,000 USD</span>
 */
function fixUnitOutsideSpan(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!RTL_LOCALES.has(locale)) return { content, fixCount: 0 }
  let fixCount = 0

  const UNITS = "ETH|BTC|Gwei|gwei|Wei|wei|USD|EUR|GBP|MB|GB|TB|KB"
  const re = new RegExp(
    `(<span dir="ltr">)([^<]+)(<\\/span>)\\s*(${UNITS})`,
    "g"
  )

  const fixed = content.replace(re, (_, open, inner, close, unit) => {
    fixCount++
    return `${open}${inner} ${unit}${close}`
  })

  return { content: fixed, fixCount }
}

/**
 * Remove redundant <span dir="ltr"> wrappers around backtick-delimited inline
 * code. MDX cannot nest markdown syntax (backticks) inside JSX (<span>), so
 * `<span dir="ltr">`\`...\``</span>` renders as broken text instead of inline
 * code. Inline code is already inherently LTR (monospace Latin font), so the
 * wrapper is both harmful and unnecessary.
 *
 * This can be produced by fixBareRtlDates/fixBareRtlEquations wrapping content
 * that was already inside backticks, or by Gemini translations directly.
 *
 * Skips code fences (operates only on prose).
 */
function fixSpanWrappedBackticks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split out code fences so we only operate on prose
  const fencePattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(fencePattern)

  // Pattern 1: <span dir="ltr"> wrapping backtick content
  const spanAroundBacktickRe = /<span dir="ltr">\s*(`[^`]+`)\s*<\/span>/g

  // Pattern 2: backticks wrapping <span dir="ltr"> content (makes span visible as code)
  const backtickAroundSpanRe = /`<span dir="ltr">\s*([\s\S]+?)\s*<\/span>`/g

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code fences
    parts[i] = parts[i].replace(spanAroundBacktickRe, (_, backtickContent) => {
      fixCount++
      return backtickContent
    })
    parts[i] = parts[i].replace(backtickAroundSpanRe, (_, innerContent) => {
      fixCount++
      return `\`${innerContent}\``
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Urdu-specific: move bold markers off ordered list numerals so CSS can
 * render the number in the correct Urdu/Nastaliq numeral script.
 *
 * When Gemini produces `**1. some text**`, the numeral is inside the bold
 * span and CSS `list-style-type` cannot restyle it. The fix moves the bold
 * markers after the `N. ` prefix: `1. **some text**`.
 *
 * Only applies to Urdu (ur) locale.
 */
function fixBoldWrappedOrderedListNumerals(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (locale !== "ur") return { content, fixCount: 0 }

  let fixCount = 0
  // Match start-of-line **N. ...** where N is one or more digits
  // The closing ** can be followed by any trailing punctuation
  const re = /^\*\*(\d+\.\s)([\s\S]*?)\*\*/gm
  content = content.replace(re, (_, numPrefix, rest) => {
    fixCount++
    return `${numPrefix}**${rest}**`
  })

  return { content, fixCount }
}

/**
 * Warn about translated technical numerals in any locale.
 * Technical identifiers like ERC-20, EIP-1559, Web3 must keep Western Arabic
 * numerals. Detects Arabic-Indic (٠-٩) or Extended Arabic-Indic (۰-۹) digits
 * in these contexts.
 */
function warnTranslatedTechnicalNumerals(content: string): string[] {
  const warnings: string[] = []

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  // Arabic-Indic digits: ٠١٢٣٤٥٦٧٨٩
  // Extended Arabic-Indic digits: ۰۱۲۳۴۵۶۷۸۹
  const nativeDigit = /[\u0660-\u0669\u06F0-\u06F9]/

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Check for ERC/EIP with native digits
    const techRe = /(?:ERC|EIP|Web|Layer\s*|L)[\u0660-\u0669\u06F0-\u06F9-]+/g
    const matches = parts[i].match(techRe)
    if (matches) {
      for (const m of matches) {
        if (nativeDigit.test(m)) {
          warnings.push(
            `Translated technical numeral "${m}" -- must use Western Arabic digits (e.g., ERC-20, not ERC-٢٠)`
          )
        }
      }
    }
  }

  return warnings
}

/**
 * Replace CJK ideographic full stop (U+3002) with the locale-appropriate
 * full stop character.  CJK locales (ja, ko, zh, zh-tw) are skipped since
 * the character is correct there.  Skips code fences using the robust
 * line-by-line fence-tracking pattern.
 */
function fixCrossScriptPunctuation(
  content: string,
  locale: string
): { content: string; fixCount: number } {
  if (!locale) return { content, fixCount: 0 }

  // CJK locales: the ideographic full stop is correct -- nothing to fix
  const CJK_LOCALES = new Set(["ja", "ko", "zh", "zh-tw"])
  if (CJK_LOCALES.has(locale)) return { content, fixCount: 0 }

  // Determine the replacement character based on locale script
  let replacement: string
  if (locale === "ar" || locale === "ur") {
    replacement = "\u06D4" // Arabic full stop
  } else if (locale === "hi" || locale === "mr" || locale === "bn") {
    replacement = "\u0964" // Devanagari danda
  } else {
    replacement = "." // Latin/Cyrillic/Tamil/Telugu/etc.
  }

  let fixCount = 0
  const lines = content.split("\n")
  let inFencedBlock = false

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]

    // Track fenced code block boundaries
    if (/^(`{3,}|~{3,})/.test(line)) {
      inFencedBlock = !inFencedBlock
      continue
    }
    if (inFencedBlock) continue

    // Split on inline code spans to avoid touching code
    const inlineCodePattern = /(`[^`]+`)/g
    const parts = line.split(inlineCodePattern)

    let changed = false
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) continue // Skip inline code spans

      const original = parts[i]
      parts[i] = parts[i].replace(/\u3002/g, () => {
        fixCount++
        return replacement
      })
      if (parts[i] !== original) changed = true
    }

    if (changed) {
      lines[lineIdx] = parts.join("")
    }
  }

  return { content: lines.join("\n"), fixCount }
}

/**
 * Detect cross-script contamination in translated content.
 * Returns warnings for unexpected Unicode characters based on the file's locale.
 */
function detectCrossScriptContamination(
  content: string,
  locale: string
): string[] {
  const warnings: string[] = []
  const detector = CROSS_SCRIPT_DETECTORS[locale]
  if (!detector) return warnings

  // Skip code blocks — foreign characters in code are valid
  const codeBlockRe = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockRe)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    const matches = parts[i].match(detector.pattern)
    if (matches && matches.length > 0) {
      // Get unique characters found
      const uniqueChars = Array.from(new Set(matches)).slice(0, 5).join(", ")
      warnings.push(
        `Cross-script contamination: found ${matches.length} ${detector.name} character(s) in ${locale} file (e.g., ${uniqueChars})`
      )
    }
  }

  return warnings
}

/**
 * Fix misplaced closing backtick around JSX fragment patterns.
 * Crowdin sometimes moves the closing backtick before `</>`, producing:
 *   (`<> ...` </>)  instead of  (`<> ... </>`)
 * The escapeMdxAngleBrackets function then escapes the exposed </>,
 * making things worse. This fix must run BEFORE escapeMdxAngleBrackets.
 */
function fixMisplacedBacktickAroundJsxFragment(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Process line-by-line, skip fenced code blocks
  const lines = content.split("\n")
  let inFencedBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (/^(`{3,}|~{3,})/.test(line)) {
      inFencedBlock = !inFencedBlock
      continue
    }
    if (inFencedBlock) continue

    // Match: `<content>` </>) or `<content>` \</>) -- backtick closed too early
    // The closing backtick should wrap the </> too.
    // Pattern: backtick-content-backtick SPACE </> or \</> followed by )
    lines[i] = line.replace(
      /(`<[^`]*`)\s*(?:\\)?(<\/>)(\))/g,
      (_, codeSpan, fragment, paren) => {
        fixCount++
        // Move closing backtick to after the fragment
        return codeSpan.slice(0, -1) + " " + fragment + "`" + paren
      }
    )
  }

  return { content: lines.join("\n"), fixCount }
}

/**
 * Escape raw `<` before numbers in MDX content.
 * Pattern: `<5GB` becomes `&lt;5GB` to prevent MDX treating it as a JSX tag.
 * Skips code blocks (fenced and inline) where `<` is valid.
 */
function escapeMdxAngleBrackets(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Process line-by-line, tracking fenced code block state.
  // This avoids a global split where a broken backtick on one line
  // (odd count from Crowdin artifacts) cascades to corrupt later lines.
  const lines = content.split("\n")
  let inFencedBlock = false

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]

    // Track fenced code block boundaries
    if (/^(`{3,}|~{3,})/.test(line)) {
      inFencedBlock = !inFencedBlock
      continue
    }
    if (inFencedBlock) continue

    // Split this single line on inline code spans.
    // Per-line splitting ensures broken backticks don't cascade across lines.
    const inlineCodePattern = /(`[^`]+`)/g
    const parts = line.split(inlineCodePattern)

    let changed = false
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) continue // Skip inline code spans

      const original = parts[i]

      // Match < followed by a digit (not already escaped, not part of HTML tag)
      parts[i] = parts[i].replace(/(?<!&lt|&|\\)<(\d)/g, (_, digit) => {
        fixCount++
        return `&lt;${digit}`
      })

      // Escape bare JSX fragment <> in prose (Crowdin drops backticks around `<>`)
      parts[i] = parts[i].replace(/(?<!\\|`)<>(?!`)/g, () => {
        fixCount++
        return "\\<>"
      })

      // Escape bare closing JSX fragment </> in prose
      parts[i] = parts[i].replace(/(?<!\\|`)<\/>(?!`)/g, () => {
        fixCount++
        return "\\</>"
      })

      // Escape < before word containing [ (e.g., <Stockage[4]) — never valid MDX
      parts[i] = parts[i].replace(/(?<!\\)<([a-zA-Z]+\[)/g, (_, after) => {
        fixCount++
        return `\\<${after}`
      })

      if (parts[i] !== original) changed = true
    }

    if (changed) {
      lines[lineIdx] = parts.join("")
    }
  }

  return { content: lines.join("\n"), fixCount }
}

/**
 * Restore backslash escapes before < that Crowdin dropped during translation.
 * Compares English source to find all \< patterns, then checks if the
 * translated file has the same context without the backslash.
 */
function restoreDroppedBackslashEscapes(
  content: string,
  englishContent: string
): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g

  // Collect all \<X patterns from English prose (outside code blocks)
  const enParts = englishContent.split(codeBlockPattern)
  const escapedFollowers = new Set<string>()
  for (let i = 0; i < enParts.length; i++) {
    if (i % 2 === 1) continue
    const matches = enParts[i].matchAll(/\\<([^\s>]{1,30})/g)
    for (const m of matches) {
      escapedFollowers.add(m[1]) // e.g., "Storage[4]", "=2^256"
    }
  }

  if (escapedFollowers.size === 0) return { content, fixCount }

  // Check translation for bare <X where English has \<X
  const trParts = content.split(codeBlockPattern)
  for (let i = 0; i < trParts.length; i++) {
    if (i % 2 === 1) continue
    for (const follower of escapedFollowers) {
      const bare = `<${follower}`
      const escaped = `\\<${follower}`
      if (trParts[i].includes(bare) && !trParts[i].includes(escaped)) {
        trParts[i] = trParts[i].split(bare).join(escaped)
        fixCount++
      }
    }
  }

  return { content: trParts.join(""), fixCount }
}

/**
 * Detect and remove orphaned closing HTML tags.
 * These appear when translation restructures sentences and leaves behind
 * closing tags like </a> without matching openers.
 * Only removes tags that have NO corresponding opener in the same paragraph.
 *
 * Skips code blocks (fenced and inline) where closing tags are valid content.
 * Removes excess closers from right-to-left (last occurrence first) so that
 * correctly-paired closers near their openers are preserved.
 */

/**
 * Fix asymmetric backtick pairs where Crowdin doubled the closing backtick.
 * Pattern: `content`` → `content` (single-open, double-close)
 *
 * Does NOT touch:
 * - Valid double-backtick code spans: ``content`` (double-open, double-close)
 * - Triple-backtick fences: ```
 * - Already balanced single-backtick spans: `content`
 */
function fixAsymmetricBackticks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const lines = content.split("\n")
  let inFencedBlock = false

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]

    // Track fenced code block boundaries
    if (/^(`{3,}|~{3,})/.test(line)) {
      inFencedBlock = !inFencedBlock
      continue
    }
    if (inFencedBlock) continue

    // Match single-open, double-close: `content`` (not preceded or followed by `)
    // (?<!`) ensures the opening backtick is single (not part of ``)
    // [^`]+ matches the code content (no backticks inside)
    // ``(?!`) ensures exactly two closing backticks (not part of ```)
    const asymmetricRe = /(?<!`)(`[^`]+`)`(?!`)/g
    const fixed = line.replace(asymmetricRe, (_, correctSpan) => {
      fixCount++
      return correctSpan
    })

    if (fixed !== line) {
      lines[lineIdx] = fixed
    }
  }

  return { content: lines.join("\n"), fixCount }
}

function fixBackslashBeforeClosingTag(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Split content to preserve code blocks (fenced and inline)
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match backslash immediately before closing HTML tags like \</strong>
    // Requires at least one letter in tag name — leaves \</> (JSX fragment) intact
    parts[i] = parts[i].replace(/\\(<\/[a-zA-Z]+>)/g, (_, tag) => {
      fixCount++
      return tag
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Remove junk text appended after heading anchor IDs.
 * Crowdin sometimes appends translated "translations" of the anchor ID
 * after the {#anchor-id} tag, e.g. {#network-impact}네트워크-충격
 * These break rendering and must be stripped.
 */
function fixJunkAfterHeadingAnchors(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match {#anchor-id} followed by non-whitespace junk on the SAME line
    // Uses [ \t]* (horizontal whitespace only) to avoid crossing newlines
    parts[i] = parts[i].replace(
      /(\{#-?[a-z0-9][-a-z0-9]*\})[ \t]*([^\s\n}][^\n]*)/g,
      (_match, anchor, junk) => {
        // Only strip if the junk looks like a translated anchor (non-ASCII or hyphenated)
        // eslint-disable-next-line no-control-regex
        if (/[^\x00-\x7F]|^[a-z]+-[a-z]+/.test(junk.trim())) {
          fixCount++
          return anchor
        }
        return _match // Leave as-is if it's normal trailing content
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix non-ASCII characters inside heading anchor IDs.
 * MDX heading IDs ({#some-id}) must be ASCII or acorn parsing breaks.
 * This can happen when transliteration scripts or Crowdin replace
 * English words inside anchor IDs with native-script equivalents.
 *
 * Example: {#Communities-and-डीएओज़} → strips non-ASCII segments
 *
 * This is a safety net; the transliterate script also protects {#...}.
 */
function fixNonAsciiHeadingIds(
  content: string,
  englishContent?: string
): { content: string; fixCount: number; fixes: string[] } {
  let fixCount = 0
  const fixes: string[] = []

  // Build a map of English heading IDs by position for restoration
  const englishIds: string[] = []
  if (englishContent) {
    const idPattern = /^#{1,6}\s+.*?\{#([\w-]+)\}/gm
    let m
    while ((m = idPattern.exec(englishContent)) !== null) {
      englishIds.push(m[1])
    }
  }

  let translatedIdx = 0
  // eslint-disable-next-line no-control-regex
  content = content.replace(
    /^(#{1,6}\s+.*?)\{#([^}]+)\}/gm,
    (match, prefix, id) => {
      const currentIdx = translatedIdx++
      // Check if the ID contains non-ASCII characters
      // eslint-disable-next-line no-control-regex
      if (/[^\x00-\x7F]/.test(id)) {
        // Prefer English source ID if available
        if (englishIds[currentIdx]) {
          fixCount++
          fixes.push(`{#${id}} -> {#${englishIds[currentIdx]}}`)
          return `${prefix}{#${englishIds[currentIdx]}}`
        }
        // Fallback: strip non-ASCII segments and clean up
        const asciiOnly = id
          .replace(/[^\u0020-\u007E]+/g, "")
          .replace(/-{2,}/g, "-")
          .replace(/^-|-$/g, "")
        if (asciiOnly) {
          fixCount++
          fixes.push(`{#${id}} -> {#${asciiOnly}}`)
          return `${prefix}{#${asciiOnly}}`
        }
      }
      return match
    }
  )

  return { content, fixCount, fixes }
}

/**
 * Fix Crowdin JSX/markdown hybrid mangling.
 * Crowdin sometimes converts JSX components with href attributes into
 * a broken hybrid of markdown link syntax and JSX:
 *   [<ButtonLink href="](/path)">  (broken)
 *   <ButtonLink href="/path">      (correct)
 *
 * This happens with any JSX component that has an href attribute.
 */
function fixJsxMarkdownHybrids(content: string): {
  content: string
  fixCount: number
  fixes: string[]
} {
  let fixCount = 0
  const fixes: string[] = []

  // Pattern: [<ComponentName href="](url-path)optional-tail">
  // Captures: component name, any pre-href attrs, the split URL parts
  content = content.replace(
    /\[<([A-Z]\w+)(\s+[^>]*)?\s+href="?\]\(([^)]+)\)([^"]*)"?\s*>/g,
    (_, component, preAttrs, urlPart, urlTail) => {
      const href = urlPart + (urlTail || "")
      const attrs = preAttrs ? preAttrs.trim() + " " : ""
      fixCount++
      fixes.push(
        `[<${component} href="](${urlPart})${urlTail}"> -> <${component} ${attrs}href="${href}">`
      )
      return `<${component} ${attrs}href="${href}">`
    }
  )

  return { content, fixCount, fixes }
}

/**
 * Unwrap markdown links that Crowdin wrapped in backticks.
 * Pattern: `[text](url)` → [text](url)
 * Only matches when the backtick content is a complete markdown link.
 */
function fixBacktickWrappedLinks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip fenced code blocks

    // Match `[link text](url)` - backtick-wrapped markdown links
    // The content between backticks must be a valid markdown link
    parts[i] = parts[i].replace(/`(\[[^\]]+\]\([^)]+\))`/g, (_, link) => {
      fixCount++
      return link
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix markdown links where parentheses around the URL are missing.
 * Pattern: [text]https://url or [text]/internal/path/
 * NOT to be confused with reference-style links [text][ref].
 */
function fixMissingLinkParentheses(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match [text] followed immediately by a URL (https://, http://, or /path)
    // URL ends at whitespace, Korean/CJK chars, or certain punctuation
    parts[i] = parts[i].replace(
      /(\[[^\]]+\])((?:https?:\/\/|\/)[^\s[\]()<>\u3000-\u9FFF\uAC00-\uD7AF]*)/g,
      (match, linkText, rawUrl) => {
        // Skip if already has parentheses (shouldn't match, but safety check)
        if (match.includes("](")) return match
        // Skip reference-style links [text][ref]
        if (/^\[/.test(rawUrl)) return match

        // Strip trailing punctuation that is prose, not URL
        const trailingPunct = /[:.,;!?]+$/.exec(rawUrl)
        const url = trailingPunct
          ? rawUrl.slice(0, -trailingPunct[0].length)
          : rawUrl
        const suffix = trailingPunct ? trailingPunct[0] : ""

        fixCount++
        return `${linkText}(${url})${suffix}`
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix missing </em> closing tags before </li> in HTML lists.
 * Crowdin sometimes drops the </em> when translating list items.
 * Pattern: <em>text.</li> → <em>text.</em></li>
 */
function fixMissingClosingEmTag(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Only split on fenced blocks — inline backticks must NOT split here
  // because <em>..`code`..></li> spans across inline code spans
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match <em> content that ends with </li> without a closing </em>
    parts[i] = parts[i].replace(
      /(<em>(?:(?!<\/em>)[\s\S])*?)(<\/li>)/g,
      (_, emContent, closeLi) => {
        fixCount++
        return emContent + "</em>" + closeLi
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix image/link paths where ./ was corrupted to /. by Crowdin.
 * Pattern: (/.filename) → (./filename)
 */
function fixImagePathDotSlash(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match ](/. followed by a word char — the ./ was inverted to /.
    parts[i] = parts[i].replace(/(\]\()\/\.(\w)/g, (_, prefix, firstChar) => {
      fixCount++
      return prefix + "./" + firstChar
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix backslash-escaped quotes in JSX/MDX attributes.
 *
 * Crowdin sometimes backslash-escapes double quotes in JSX attributes:
 *   <ButtonLink variant=\"outline-color\" href=\"/path/\">
 * This is valid in JSON but breaks MDX compilation.
 * Fix: remove the backslash before quotes in JSX-like tag attributes.
 */
function fixEscapedQuotesInJsxAttributes(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip fenced code blocks

    const original = parts[i]
    // Match JSX tag lines containing =\"  and replace all \" with "
    parts[i] = parts[i].replace(/^(\s*<[A-Za-z].*)\\"(.*)$/gm, (fullLine) => {
      // Only fix lines that have =\" (attribute assignment with escaped quote)
      if (!fullLine.includes('=\\"')) return fullLine
      return fullLine.replace(/\\"/g, '"')
    })
    if (parts[i] !== original) {
      // Count the number of \" that were replaced
      const replacements =
        (original.match(/\\"/g) || []).length -
        (parts[i].match(/\\"/g) || []).length
      fixCount += replacements
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix inner quotes inside JSX attribute values that break MDX parsing.
 * Crowdin translates attribute content like title="Misconception: &quot;text&quot;"
 * but uses literal " instead of &quot;, prematurely closing the attribute.
 * Pattern: title="오해: "text"" → title="오해: &quot;text&quot;"
 */
function fixInnerQuotesInJsxAttributes(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip fenced code blocks

    // Line-based: match attr="..." where greedy .* captures all content
    // up to the LAST " on the line (the real attribute closer).
    // Allow optional trailing > or /> after the closing quote (last attr on a tag).
    parts[i] = parts[i].replace(
      /^(\s*(?:title|contentPreview|label|description)=")(.*)(")(\s*\/?>?\s*)$/gm,
      (match, prefix, inner, closer, trailing) => {
        // Skip if no inner quotes or already escaped
        if (!inner.includes('"') || inner.includes("&quot;")) return match
        fixCount++
        return prefix + inner.replace(/"/g, "&quot;") + closer + trailing
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Fix Crowdin variable-expansion leak inside JSX attribute values.
 *
 * Crowdin sometimes treats `$N` inside attribute values as a variable reference,
 * expanding `$1` to the attribute name itself (e.g., "description") and leaving
 * the remaining digits. This produces patterns like:
 *   description="...text... description=4 ...text..."
 * where the English source had:
 *   description="...text... $14 ...text..."
 *
 * The fix keeps the translated text and replaces only the leaked
 * `<attrName>=<digits>` with the corresponding `$NN` from the English source.
 */
function fixLeakedAttrNamesInJsxValues(
  translatedContent: string,
  englishContent: string
): { content: string; fixCount: number } {
  let fixCount = 0

  const jsxAttrNames = "title|description|label|alt|contentPreview"
  // Match leaked attrName=digits INSIDE a quoted attribute value
  const leakInsideValue = new RegExp(`\\b(${jsxAttrNames})=(\\d+)\\b`, "g")

  const lines = translatedContent.split("\n")
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]
    if (!leakInsideValue.test(line)) continue
    leakInsideValue.lastIndex = 0

    // Only operate inside quoted attribute values on JSX component lines
    // (lines containing <Card, <ExpandableCard, etc.)
    if (!/^\s*<[A-Z]/.test(line)) continue

    // Find the matching English line by emoji (stable across translations)
    const emojiMatch = line.match(/emoji="([^"]*)"/)
    if (!emojiMatch) continue
    const emoji = emojiMatch[1]

    let engLine = ""
    for (const el of englishContent.split("\n")) {
      if (el.includes(`emoji="${emoji}"`)) {
        engLine = el
        break
      }
    }
    if (!engLine) continue

    // Replace each leaked attrName=digits with the $NN from English
    lines[li] = line.replace(leakInsideValue, (match, _, digits) => {
      // Verify this is inside a quoted attribute value (not a bare attribute)
      // by checking that the attribute pattern `leakedName="...` does NOT
      // start right before this match (which would be the real attribute)
      const matchPos = line.indexOf(match)
      const before = line.slice(Math.max(0, matchPos - 2), matchPos)
      if (before.endsWith('="') || before.endsWith("='")) {
        // This is the actual attribute assignment, not a leak inside a value
        return match
      }

      // Find all $N+ patterns in the English line's same attribute value
      const attrRegex = new RegExp(`(${jsxAttrNames})="([^"]*)"`, "g")
      let engM: RegExpExecArray | null
      while ((engM = attrRegex.exec(engLine)) !== null) {
        const engValue = engM[2]
        // Look for $digits in the English value
        const dollarMatch = engValue.match(new RegExp(`\\$(\\d*${digits})\\b`))
        if (dollarMatch) {
          fixCount++
          return "$" + dollarMatch[1]
        }
      }
      return match
    })
  }

  return { content: lines.join("\n"), fixCount }
}

/**
 * Escape lone tildes used as range/approximate notation.
 * In Korean (and other CJK), `100만~200만` uses ~ as "to/approximately",
 * but remark-gfm treats paired ~text~ as strikethrough (<del>).
 * Fix: escape as \~ to prevent strikethrough parsing.
 * Skips frontmatter, fenced code blocks, and already-escaped tildes.
 */
function escapeTildeStrikethrough(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  // Skip frontmatter
  let frontmatter = ""
  let body = content
  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/)
  if (fmMatch) {
    frontmatter = fmMatch[0]
    body = content.slice(frontmatter.length)
  }

  // Split on fenced code blocks, inline code, AND markdown link URLs.
  // The ](url) portion of links is skipped to avoid escaping tildes
  // in URLs like https://example.com/~user/path
  const skipPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`|\]\([^)]+\))/g
  const parts = body.split(skipPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks and link URLs

    // Match a lone ~ between non-whitespace, non-tilde chars
    // that isn't already escaped with backslash
    parts[i] = parts[i].replace(/([^\s~\\])~([^\s~])/g, (_, before, after) => {
      fixCount++
      return before + "\\~" + after
    })
  }

  return { content: frontmatter + parts.join(""), fixCount }
}

/**
 * Convert **bold**[non-Latin] to <strong>bold</strong>[non-Latin].
 * MDX's emphasis parser requires a word boundary after closing **;
 * without one, asterisks render literally. In Korean (and other CJK),
 * postpositions (josa) must attach directly to the preceding word --
 * inserting a space would break grammar. Using HTML <strong> tags
 * sidesteps the parser limitation while preserving correct orthography.
 */
function fixBoldAdjacentNonLatin(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  // Match **bold text** immediately followed by a non-Latin char.
  // Lookbehind ensures we only match OPENING ** (preceded by whitespace,
  // opening punctuation, or start of line) -- prevents cross-boundary
  // matches where a CLOSING ** on one line pairs with an OPENING ** on
  // the next. [^*\n]+ prevents cross-line matching as extra safety.
  // Unicode ranges: Hangul Syllables + Compat Jamo, CJK, Hiragana, Katakana.
  // Ranges with combining marks (Hangul Jamo U+1100, Devanagari, Thai,
  // Arabic) are excluded to satisfy no-misleading-character-class.
  const boldFollowedByNonLatin =
    /(?<=[\s([]|^)\*\*([^*\n]+)\*\*([\u3130-\u318F\uAC00-\uD7AF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF])/gm

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    parts[i] = parts[i].replace(boldFollowedByNonLatin, (_, inner, char) => {
      fixCount++
      return "<strong>" + inner + "</strong>" + char
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Convert *italic*[non-Latin] to <em>italic</em>[non-Latin].
 * Same word-boundary issue as bold: MDX emphasis parser requires a word
 * boundary after closing * or _. Handles both * and _ italic syntax.
 * Lookbehind prevents cross-boundary matching. Does not match ** bold.
 */
function fixItalicAdjacentNonLatin(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  // Non-Latin char class (same as bold fix, no combining-mark ranges)
  const NL =
    "[\\u3130-\\u318F\\uAC00-\\uD7AF\\u4E00-\\u9FFF\\u3040-\\u309F\\u30A0-\\u30FF]"

  // Asterisk italic: *text*[non-Latin]
  // (?<!\*) ensures we don't match inside ** bold markers
  const asteriskItalic = new RegExp(
    "(?<=[\\s(\\[]|^)(?<!\\*)\\*([^*\\n]+)\\*(" + NL + ")",
    "gm"
  )

  // Underscore italic: _text_[non-Latin]
  const underscoreItalic = new RegExp(
    "(?<=[\\s(\\[]|^)_([^_\\n]+)_(" + NL + ")",
    "gm"
  )

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    parts[i] = parts[i].replace(asteriskItalic, (_, inner, char) => {
      fixCount++
      return "<em>" + inner + "</em>" + char
    })
    parts[i] = parts[i].replace(underscoreItalic, (_, inner, char) => {
      fixCount++
      return "<em>" + inner + "</em>" + char
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Warn when the translation has significantly fewer inline code spans than
 * English, or when backtick spans cross line boundaries (indicating broken
 * inline code where Crowdin translated the content inside backticks).
 *
 * Example:
 *   EN: "pass `wallet`, the compiled json"
 *   PT: "passar a carteira `, o arquivo json"
 *
 * Two checks:
 * 1. Count comparison: warns when 3+ spans fewer or 20%+ drop.
 * 2. Multi-line backtick spans: a single backtick that opens on one line
 *    and closes on another is almost always a broken inline code span.
 */
function warnTranslatedInlineCode(
  translated: string,
  english: string
): string[] {
  const warnings: string[] = []
  const fencePattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g

  function countInlineCodeSpans(content: string): number {
    const parts = content.split(fencePattern)
    let count = 0
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) continue
      const spans = parts[i].match(/`[^`]+`/g)
      if (spans) count += spans.length
    }
    return count
  }

  // Check 1: count comparison
  const englishCount = countInlineCodeSpans(english)
  const translatedCount = countInlineCodeSpans(translated)

  if (englishCount > 0) {
    const diff = englishCount - translatedCount
    const pctDrop = diff / englishCount

    if (diff >= 3 || (diff >= 1 && pctDrop >= 0.2)) {
      warnings.push(
        `Inline code span count: English has ${englishCount}, translation has ${translatedCount} (${diff} fewer) -- may indicate translated or broken inline code`
      )
    }
  }

  // Check 2: detect multi-line backtick spans in prose (broken inline code)
  const parts = translated.split(fencePattern)
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue
    const lines = parts[i].split("\n")
    for (let j = 0; j < lines.length; j++) {
      // Count backticks on this line (outside double/triple backticks)
      const stripped = lines[j].replace(/``[^`]*``/g, "")
      const backtickCount = (stripped.match(/`/g) || []).length
      if (backtickCount % 2 === 1) {
        warnings.push(
          `Orphaned backtick on line: "${lines[j].trim().substring(0, 80)}..." -- likely broken inline code span`
        )
      }
    }
  }

  return warnings
}

/**
 * Warn about bare MDX-meaningful tags outside backticks.
 * Detects <tag> or </> patterns that should be inside inline code
 * but got exposed by Crowdin splitting backtick spans.
 */
function warnExposedMdxTags(content: string): string[] {
  const warnings: string[] = []

  // Known safe HTML elements (PascalCase MDX components are handled above)
  const safePattern =
    /^\/?(a|em|strong|b|i|u|mark|cite|code|li|ul|ol|p|br|div|span|img|h[1-6]|table|tr|td|th|thead|tbody|blockquote|pre|hr|sup|sub|details|summary|abbr|del|ins|kbd|s|small|var|wbr|figcaption|figure|section|article|aside|footer|header|main|nav|dl|dt|dd)\b/

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip fenced code blocks

    // Split out inline code spans to avoid false positives
    const inlineParts = parts[i].split(/(`[^`]+`)/g)

    for (let j = 0; j < inlineParts.length; j++) {
      if (j % 2 === 1) continue // Skip inline code

      // Find bare <tag> or </> patterns
      const tagMatches = inlineParts[j].matchAll(
        /<\/?([a-zA-Z][a-zA-Z0-9]*)?[^>]*>/g
      )
      for (const m of tagMatches) {
        const tagName = m[1] || "" // empty for </>
        // PascalCase tags are MDX components (e.g., DocLink, ExpandableCard)
        // — they never break compilation, so skip them unconditionally
        if (tagName && /^[A-Z]/.test(tagName)) continue
        if (tagName && safePattern.test(tagName)) continue
        // URL autolinks <https://...> and <http://...> are valid markdown
        // and commonly used inside [label](<url>) to wrap URLs with
        // special chars (parens, underscores). Skip these entirely.
        if (/^https?$/i.test(tagName)) continue
        // This is a bare tag outside backticks — likely exposed by Crowdin
        warnings.push(
          `Exposed MDX tag outside backticks: "${m[0]}" — may break MDX compilation`
        )
      }
    }
  }

  return warnings
}

function removeOrphanedClosingTags(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const orphanTags = ["a", "span", "em", "strong", "b", "i", "u"]

  // Fenced-only split: inline backticks must NOT fragment the content
  // because HTML tags like <em>...`code`...</em> legitimately span
  // across inline code spans (idempotency bug #24).
  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  for (let partIdx = 0; partIdx < parts.length; partIdx++) {
    if (partIdx % 2 === 1) continue // Skip fenced code blocks

    for (const tag of orphanTags) {
      const lines = parts[partIdx].split("\n")
      // Track unclosed openers across lines so a </tag> on line N+1
      // paired with <tag> on line N is not treated as orphaned (dev).
      let unclosedFromPrev = 0
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        // Strip inline code spans for counting only -- tags inside
        // backticks are literal text, not real HTML
        const lineForCounting = line.replace(/`[^`]+`/g, "")
        const closeRe = new RegExp(`</${tag}>`, "g")
        const openRe = new RegExp(`<${tag}[\\s>]`, "g")
        const closeCount = (lineForCounting.match(closeRe) || []).length
        const openCount = (lineForCounting.match(openRe) || []).length

        // Scan left-to-right tracking opener/closer balance.
        // Include carry-over from previous lines (dev) so multi-line
        // spans are not treated as orphaned.
        // A closer is orphaned if no unmatched opener precedes it.
        if (closeCount > 0) {
          // Build a list of opener and closer positions for this tag
          const openPosRe = new RegExp(`<${tag}[\\s>]`, "g")
          const closePosRe = new RegExp(`</${tag}>`, "g")
          type TagEvent = { pos: number; type: "open" | "close" }
          const events: TagEvent[] = []
          let m: RegExpExecArray | null
          while ((m = openPosRe.exec(lineForCounting)) !== null) {
            events.push({ pos: m.index, type: "open" })
          }
          while ((m = closePosRe.exec(lineForCounting)) !== null) {
            events.push({ pos: m.index, type: "close" })
          }
          events.sort((a, b) => a.pos - b.pos)

          // Walk events left-to-right: closers without a pending opener
          // are orphans. Start pendingOpeners with carry-over from prev lines.
          let pendingOpeners = unclosedFromPrev
          const orphanCloserPositions: number[] = []
          for (const ev of events) {
            if (ev.type === "open") {
              pendingOpeners++
            } else {
              if (pendingOpeners > 0) {
                pendingOpeners-- // Paired
              } else {
                orphanCloserPositions.push(ev.pos)
              }
            }
          }

          if (orphanCloserPositions.length > 0) {
            // Remove orphaned closers from the ORIGINAL line (not lineForCounting)
            const closeTag = `</${tag}>`
            // Map orphan positions from lineForCounting to indices in original line
            const countingPositions: number[] = []
            const cRe = new RegExp(escapeRegex(closeTag), "g")
            let cm: RegExpExecArray | null
            while ((cm = cRe.exec(lineForCounting)) !== null) {
              countingPositions.push(cm.index)
            }
            const toRemoveIndices = new Set(
              orphanCloserPositions.map((pos) => countingPositions.indexOf(pos))
            )

            let result = ""
            let closerIdx = 0
            const closeReForReplace = new RegExp(escapeRegex(closeTag), "g")
            let lastEnd = 0
            let rm: RegExpExecArray | null
            while ((rm = closeReForReplace.exec(line)) !== null) {
              if (toRemoveIndices.has(closerIdx)) {
                result += line.slice(lastEnd, rm.index)
                lastEnd = rm.index + rm[0].length
                fixCount++
              }
              closerIdx++
            }
            result += line.slice(lastEnd)
            // Collapse doubled punctuation left behind after tag removal
            // e.g., "word.</em>." becomes "word.." after removal, fix to "word."
            result = result.replace(/([.!?,;:])(\s*)\1/g, "$1$2")
            lines[i] = result.replace(/  +/g, " ").trimEnd()
          }
        }

        // Update carry-over: unclosed openers from this line
        const effectiveOpen = openCount + unclosedFromPrev
        unclosedFromPrev = Math.max(0, effectiveOpen - closeCount)
      }
      parts[partIdx] = lines.join("\n")
    }
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Detect paragraphs that appear to be untranslated (still in English).
 * Uses franc-min for language detection on paragraph-sized chunks.
 * Only flags paragraphs with high confidence of being English in non-English files.
 */
function detectUntranslatedContent(content: string, locale: string): string[] {
  if (!francDetect) return []
  // Don't check English files
  if (locale === "en") return []

  const warnings: string[] = []

  // Split into paragraphs (skip frontmatter, code blocks)
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n?/, "")
  const withoutCodeBlocks = withoutFrontmatter.replace(/```[\s\S]*?```/g, "")

  const paragraphs = withoutCodeBlocks
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 100) // Only check substantial paragraphs

  let untranslatedCount = 0
  for (const para of paragraphs) {
    const cleanPara = para
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Remove markdown links (keep text)
      .replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
      .replace(/`[^`]+`/g, "") // Remove inline code
      .trim()

    if (cleanPara.length < 80) continue // Too short for reliable detection

    const detected = francDetect(cleanPara)
    if (detected === "eng") {
      untranslatedCount++
      // Only report first 3 to avoid noise
      if (untranslatedCount <= 3) {
        const preview = cleanPara.substring(0, 80).replace(/\n/g, " ")
        warnings.push(
          `Possibly untranslated paragraph (detected as English): "${preview}..."`
        )
      }
    }
  }

  if (untranslatedCount > 3) {
    warnings.push(
      `...and ${untranslatedCount - 3} more potentially untranslated paragraphs`
    )
  }

  return warnings
}

function processMarkdownFile(
  mdPath: string,
  providedContent?: string,
  englishContentMap?: Map<string, string>
): {
  fixed: boolean
  issues: string[]
  content: string
} {
  const issues: string[] = []
  let content = providedContent || fs.readFileSync(mdPath, "utf8")

  const before = content
  let englishMd: string | undefined

  // Map translated path to English path: remove `/translations/<lang>/` segment
  const parts = mdPath.split(path.sep)
  const idx = parts.lastIndexOf("translations")
  const locale = idx !== -1 && idx + 1 < parts.length ? parts[idx + 1] : ""
  if (idx === -1 || idx + 2 >= parts.length) {
    issues.push("No translations segment found; skipping formatting sync")
  } else {
    // Derive the relative English path (e.g. public/content/bridges/index.md)
    const englishRelPath = [...parts.slice(0, idx), ...parts.slice(idx + 2)]
      .join(path.sep)
      // Strip leading absolute prefix to get repo-relative path
      .replace(/^.*?public\/content\//, "public/content/")

    // Try in-memory map first (from GitHub API), then fall back to disk
    if (englishContentMap?.has(englishRelPath)) {
      englishMd = englishContentMap.get(englishRelPath)!
    } else {
      // Absolute path for disk fallback (local/CLI usage)
      const englishPath = path.resolve(
        path.sep,
        ...parts.slice(0, idx),
        ...parts.slice(idx + 2) // drop translations/<lang>
      )
      if (fs.existsSync(englishPath)) {
        englishMd = fs.readFileSync(englishPath, "utf8")
      }
    }

    if (englishMd) {
      // Fix detached heading anchors BEFORE syncing IDs
      {
        const snapshot = content
        const result = fixDetachedHeadingAnchors(content, englishMd)
        content = result.content
        if (content !== snapshot) {
          issues.push(`Restored ${result.fixCount} detached heading anchor(s)`)
        }
      }
      content = syncHeaderIdsWithEnglish(content, englishMd)
    } else {
      const englishPath = path.resolve(
        path.sep,
        ...parts.slice(0, idx),
        ...parts.slice(idx + 2)
      )
      issues.push(`English source missing: ${path.relative(ROOT, englishPath)}`)
    }
  }

  // Helper: only log a fix if content actually changed
  function applyFix(
    fn: () => { content: string; fixCount: number },
    label: (count: number) => string
  ) {
    const snapshot = content
    const result = fn()
    content = result.content
    if (content !== snapshot) {
      issues.push(label(result.fixCount))
    }
  }

  applyFix(
    () => stripLlmArtifactTokens(content),
    (n) => `Stripped ${n} LLM artifact token(s) (<bos>, <eos>, etc.)`
  )
  applyFix(
    () => stripCrowdinBoilerplate(content),
    (n) => `Stripped ${n} Crowdin boilerplate injection(s)`
  )
  applyFix(
    () => fixMissingOpeningSup(content),
    (n) => `Restored ${n} missing opening <sup> tag(s)`
  )
  applyFix(
    () => fixSplitBoldMarkers(content),
    (n) => `Fixed ${n} split bold marker(s) (premature close + escaped end)`
  )
  applyFix(
    () => fixKnownWrongCompounds(content),
    (n) => `Fixed ${n} known wrong compound term(s)`
  )
  applyFix(
    () => fixKnownBrandGarbles(content, locale),
    (n) => `Fixed ${n} known brand name garble(s)`
  )
  applyFix(
    () => fixDuplicatedTagValues(content),
    (n) => `Fixed ${n} duplicated tag value(s)`
  )
  applyFix(
    () => fixSmartQuotesInJsxAttributes(content),
    (n) => `Fixed smart quotes in ${n} JSX tag attribute(s)`
  )
  applyFix(
    () => fixJsxAttributeSpacing(content),
    (n) => `Fixed ${n} spaced JSX attribute(s)`
  )
  applyFix(
    () => fixDuplicateFrontmatterAuthor(content),
    (n) => `Fixed ${n} duplicate author frontmatter lines`
  )
  applyFix(
    () => fixBrokenBracketInLinks(content),
    (n) => `Fixed ${n} broken } brackets in markdown links`
  )
  applyFix(
    () => fixDuplicatedHeadings(content),
    (n) => `Fixed ${n} duplicated headings`
  )
  applyFix(
    () => fixBrokenMarkdownLinks(content),
    (n) => `Fixed ${n} broken markdown links`
  )
  applyFix(
    () => fixMissingLinkParentheses(content),
    (n) => `Fixed ${n} links with missing parentheses`
  )
  applyFix(
    () => fixBacktickWrappedLinks(content),
    (n) => `Unwrapped ${n} backtick-wrapped markdown links`
  )
  applyFix(
    () => fixJunkAfterHeadingAnchors(content),
    (n) => `Removed ${n} junk text fragments after heading anchors`
  )
  applyFix(
    () => fixNonAsciiHeadingIds(content, englishMd),
    (n) => `Fixed ${n} non-ASCII heading anchor IDs`
  )
  applyFix(
    () => fixJsxMarkdownHybrids(content),
    (n) => `Fixed ${n} Crowdin JSX/markdown hybrid manglings`
  )
  applyFix(
    () => fixMissingClosingEmTag(content),
    (n) => `Fixed ${n} missing </em> closing tags`
  )
  applyFix(
    () => fixImagePathDotSlash(content),
    (n) => `Fixed ${n} corrupted ./ image paths`
  )
  applyFix(
    () => fixEscapedQuotesInJsxAttributes(content),
    (n) => `Fixed ${n} backslash-escaped quotes in JSX attributes`
  )
  applyFix(
    () => fixInnerQuotesInJsxAttributes(content),
    (n) => `Fixed ${n} unescaped inner quotes in JSX attributes`
  )
  applyFix(
    () => escapeTildeStrikethrough(content),
    (n) => `Escaped ${n} tildes to prevent strikethrough`
  )
  applyFix(
    () => fixBoldAdjacentNonLatin(content),
    (n) => `Converted ${n} **bold** to <strong> tags before non-Latin text`
  )

  applyFix(
    () => fixItalicAdjacentNonLatin(content),
    (n) => `Converted ${n} *italic* to <em> tags before non-Latin text`
  )

  applyFix(
    () => normalizeFrontmatterDates(content),
    (n) => `Normalized ${n} frontmatter dates to ISO format`
  )
  applyFix(
    () => quoteFrontmatterNonAscii(content),
    (n) => `Quoted ${n} frontmatter values with unsafe YAML chars`
  )
  applyFix(
    () => fixFrontmatterLang(content, locale),
    (n) => `Fixed ${n} frontmatter lang field to match locale "${locale}"`
  )
  applyFix(
    () => fixFrontmatterLang(content, locale),
    (n) => `Fixed ${n} frontmatter lang field to match locale "${locale}"`
  )
  applyFix(
    () => fixAsciiGuillemets(content),
    (n) => `Fixed ${n} ASCII guillemets (<< >>) to Unicode (« »)`
  )
  applyFix(
    () => fixGuillemetsInHtmlTags(content),
    (n) => `Fixed ${n} guillemet(s) replacing < or > in HTML tags`
  )
  applyFix(
    () => fixMissingComponentClosingTags(content),
    (n) => `Fixed ${n} missing component closing tag(s)`
  )
  applyFix(
    () => fixMangledDocLinks(content),
    (n) => `Fixed ${n} mangled DocLink component(s)`
  )

  // Fix escaped backticks (\`) to regular backticks (`)
  // Must skip code blocks and inline code to avoid stripping backslashes that are
  // legitimate content inside backtick delimiters (e.g., `\` should stay as-is)
  {
    const snapshot = content
    const cbPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
    const cbParts = content.split(cbPattern)
    for (let ci = 0; ci < cbParts.length; ci++) {
      if (ci % 2 === 1) continue // Skip code blocks and inline code
      cbParts[ci] = cbParts[ci].replace(/\\`/g, "`")
    }
    content = cbParts.join("")
    if (content !== snapshot) {
      const count =
        (snapshot.match(/\\`/g) || []).length -
        (content.match(/\\`/g) || []).length
      if (count > 0) {
        issues.push(`Unescaped ${count} backslash-escaped backticks`)
      }
    }
  }

  applyFix(
    () => fixBrandCapitalization(content),
    (n) => `Fixed ${n} brand capitalization issue(s)`
  )
  applyFix(
    () => fixTickerTranspositions(content),
    (n) => `Fixed ${n} ticker symbol transpositions`
  )
  applyFix(
    () => fixAsymmetricBackticks(content),
    (n) => `Fixed ${n} asymmetric backtick pairs`
  )
  applyFix(
    () => fixMisplacedBacktickAroundJsxFragment(content),
    (n) => `Repaired ${n} Crowdin-split backtick span(s)`
  )
  applyFix(
    () => escapeMdxAngleBrackets(content),
    (n) => `Escaped ${n} raw angle brackets in prose`
  )
  applyFix(
    () => fixBackslashBeforeClosingTag(content),
    (n) => `Fixed ${n} backslash-before-closing-tag artifacts`
  )
  applyFix(
    () => removeOrphanedClosingTags(content),
    (n) => `Removed ${n} orphaned closing HTML tags`
  )
  applyFix(
    () => fixBlockComponentLineBreaks(content),
    (n) => `Fixed ${n} inline block component tags`
  )
  applyFix(
    () => fixEscapedBoldAndItalic(content),
    (n) => `Unescaped ${n} bold/italic markers from Crowdin`
  )

  content = normalizeBlockHtmlLines(content)

  // Normalize inline components and restore blank lines from English source
  if (englishMd) {
    applyFix(
      () => removeStaleComponents(content, englishMd!),
      (n) => `Removed ${n} stale component(s) not in English source`
    )
    applyFix(
      () => syncProtectedFrontmatterFields(content, englishMd!, locale),
      (n) => `Synced ${n} protected frontmatter fields from English`
    )
    applyFix(
      () => syncButtonsFrontmatterFields(content, englishMd!),
      (n) =>
        `Synced ${n} buttons frontmatter fields (toId/isSecondary) from English`
    )
    applyFix(
      () => collapseInlineHtmlFromEnglish(content, englishMd!),
      (n) => `Collapsed ${n} inline HTML tags to match English`
    )
    applyFix(
      () => fixMergedClosingTags(content, englishMd!),
      (n) => `Split ${n} merged closing tags to own lines`
    )
    applyFix(
      () => normalizeInlineComponentsFromEnglish(content, englishMd!),
      (n) => `Normalized ${n} inline components to match English`
    )
    applyFix(
      () => restoreDroppedBackslashEscapes(content, englishMd!),
      (n) => `Restored ${n} dropped backslash escapes before <`
    )
    applyFix(
      () => repairUnclosedBackticks(content, englishMd!),
      (n) => `Repaired ${n} unclosed backticks`
    )
    applyFix(
      () => fixCrowdinSplitBackticks(content, englishMd!),
      (n) => `Repaired ${n} Crowdin-split backtick span(s)`
    )
    applyFix(
      () => restoreBlankLinesFromEnglish(content, englishMd!),
      (n) => `Restored ${n} blank lines from English`
    )
    applyFix(
      () => fixCollapsedComponentLineBreaks(content, englishMd!),
      (n) => `Fixed ${n} collapsed component line breaks`
    )
    applyFix(
      () => fixLowercasedMdxComponents(content, englishMd!),
      (n) => `Restored ${n} lowercased MDX component name(s) to PascalCase`
    )
  }

  // Warn about exposed MDX tags from broken backtick spans
  // (runs after fixLowercasedMdxComponents so restored PascalCase tags are skipped)
  {
    const tagWarnings = warnExposedMdxTags(content)
    issues.push(...tagWarnings)
  }

  if (englishMd) {
    // Fix and check protected brand names
    const brandResult = fixProtectedBrandNames(content, englishMd, locale)
    if (brandResult.content !== content) {
      issues.push(`Fixed ${brandResult.fixCount} brand name issues`)
    }
    content = brandResult.content
    issues.push(...brandResult.warnings)

    // Restore abbreviations stripped from parentheses
    const abbrevResult = restoreStrippedAbbreviations(content, englishMd)
    if (abbrevResult.content !== content) {
      issues.push(
        `Restored ${abbrevResult.fixCount} stripped abbreviation(s) in frontmatter`
      )
    }
    content = abbrevResult.content

    // Fix base digits merged into <sup> tags by Crowdin
    const supResult = fixMergedSupDigits(content, englishMd)
    if (supResult.content !== content) {
      issues.push(
        `Fixed ${supResult.fixCount} merged digit(s) in <sup> exponent tag(s)`
      )
    }
    content = supResult.content

    // Fix Crowdin numbered tag placeholders (<0>, </0>, etc.)
    const tagResult = fixCrowdinNumberedTags(content, englishMd)
    if (tagResult.content !== content) {
      issues.push(
        `Fixed ${tagResult.fixCount} Crowdin numbered tag placeholder(s)`
      )
    }
    content = tagResult.content

    // Fix leaked attr names inside JSX attribute values (Crowdin $N expansion)
    const leakedAttrResult = fixLeakedAttrNamesInJsxValues(content, englishMd)
    if (leakedAttrResult.content !== content) {
      issues.push(
        `Fixed ${leakedAttrResult.fixCount} leaked attribute name(s) in JSX values`
      )
    }
    content = leakedAttrResult.content

    // Fix translated hrefs using set comparison
    const hrefResult = fixTranslatedHrefs(content, englishMd)
    if (hrefResult.content !== content) {
      issues.push(
        `Fixed ${hrefResult.fixCount} translated hrefs: ${hrefResult.fixes.join(", ")}`
      )
    }
    content = hrefResult.content
    issues.push(...hrefResult.warnings)

    // Fix missing link brackets (needs English source for link identification)
    applyFix(
      () => fixMissingLinkBrackets(content, englishMd),
      (n) => `Fixed ${n} missing link brackets`
    )

    // Re-run JSX hybrid fix AFTER fixMissingLinkBrackets, which can
    // re-introduce [<Component href="](path)"> by wrapping bare JSX hrefs
    applyFix(
      () => fixJsxMarkdownHybrids(content),
      (n) => `Fixed ${n} Crowdin JSX/markdown hybrid manglings`
    )
    applyFix(
      () => fixMangledDocLinks(content),
      (n) => `Fixed ${n} mangled DocLink component(s)`
    )

    // Warn on punctuation-only headings (dropped translation text)
    const punctuationHeadingWarnings = warnPunctuationOnlyHeadings(content)
    issues.push(...punctuationHeadingWarnings)

    // Warn on code fence content drift (translated code blocks)
    const codeFenceWarnings = warnCodeFenceContentDrift(content, englishMd)
    issues.push(...codeFenceWarnings)

    const catastrophicDriftWarnings = warnCatastrophicCodeFenceDrift(
      content,
      englishMd
    )
    issues.push(...catastrophicDriftWarnings)

    // Warn on translated inline code (broken backtick spans)
    const inlineCodeWarnings = warnTranslatedInlineCode(content, englishMd)
    issues.push(...inlineCodeWarnings)

    // Fix CJK full stops before cross-script detection (so it doesn't warn
    // about characters we already fixed)
    if (locale) {
      applyFix(
        () => fixCrossScriptPunctuation(content, locale),
        (n) =>
          `Replaced ${n} CJK ideographic full stop(s) with locale-appropriate punctuation`
      )
    }

    // Detect cross-script contamination
    if (locale) {
      const scriptWarnings = detectCrossScriptContamination(content, locale)
      issues.push(...scriptWarnings)

      // Fix misaligned closing code fences (all locales)
      const fenceResult = fixMisalignedCodeFences(content)
      if (fenceResult.fixCount > 0) {
        content = fenceResult.content
        issues.push(
          `Fixed ${fenceResult.fixCount} misaligned closing code fence(s)`
        )
      }

      // RTL-specific BiDi fixes: wrap bare dates and equations in <span dir="ltr">
      const dateResult = fixBareRtlDates(content, locale)
      if (dateResult.fixCount > 0) {
        content = dateResult.content
        issues.push(
          `Wrapped ${dateResult.fixCount} bare numeric date(s) in <span dir="ltr"> for RTL`
        )
      }
      const eqResult = fixBareRtlEquations(content, locale)
      if (eqResult.fixCount > 0) {
        content = eqResult.content
        issues.push(
          `Wrapped ${eqResult.fixCount} bare math equation(s) in <span dir="ltr"> for RTL`
        )
      }
      const valResult = fixBareRtlValues(content, locale)
      if (valResult.fixCount > 0) {
        content = valResult.content
        issues.push(
          `Wrapped ${valResult.fixCount} bare LTR value(s) in <span dir="ltr"> for RTL`
        )
      }
      const unitResult = fixUnitOutsideSpan(content, locale)
      if (unitResult.fixCount > 0) {
        content = unitResult.content
        issues.push(
          `Fixed ${unitResult.fixCount} unit(s) outside <span dir="ltr"> wrapper`
        )
      }

      // Remove redundant <span dir="ltr"> around backtick inline code
      // (cleans up after fixBareRtl*/fixBareRtlValues and Gemini)
      const spanBtResult = fixSpanWrappedBackticks(content)
      if (spanBtResult.fixCount > 0) {
        content = spanBtResult.content
        issues.push(
          `Unwrapped ${spanBtResult.fixCount} redundant <span dir="ltr"> around backtick code`
        )
      }

      applyFix(
        () => fixBoldWrappedOrderedListNumerals(content, locale),
        (n) =>
          `Moved ${n} bold marker(s) off ordered list numerals for Urdu numeral rendering`
      )

      // Technical numeral warnings (all locales)
      const numeralWarnings = warnTranslatedTechnicalNumerals(content)
      issues.push(...numeralWarnings)
    }

    // Detect untranslated content
    if (locale) {
      const untranslatedWarnings = detectUntranslatedContent(content, locale)
      issues.push(...untranslatedWarnings)
    }
  }

  const fixed = before !== content
  // Only write to disk if no content was provided (legacy mode)
  if (fixed && !providedContent) {
    fs.writeFileSync(mdPath, content, "utf8")
  }
  // Run critical checks (report-only)
  let m: RegExpExecArray | null
  // Broken links containing spaces inside URL
  while ((m = BROKEN_LINK_REGEX.exec(content))) {
    issues.push(`Broken link format at ${mdPath}:${lineAt(content, m.index)}`)
  }
  // Invalid links (exclude images/internal/hash/http/mailto/pdf/<...>)
  while ((m = INVALID_LINK_REGEX.exec(content))) {
    issues.push(`Invalid link at ${mdPath}:${lineAt(content, m.index)}`)
  }
  // Empty link text
  while ((m = LINK_TEXT_MISSING_REGEX.exec(content))) {
    issues.push(`Link text missing at ${mdPath}:${lineAt(content, m.index)}`)
  }
  // Incorrect image path in translated markdown
  if (mdPath.includes(`${path.sep}translations${path.sep}`)) {
    while ((m = INCORRECT_PATH_IN_TRANSLATED_MARKDOWN.exec(content))) {
      issues.push(
        `Incorrect image path at ${mdPath}:${lineAt(content, m.index)}`
      )
    }
  }
  // Spelling mistakes (case-insensitive)
  for (const mistake of COMMON_SPELLING_MISTAKES) {
    const re = new RegExp(mistake, "gi")
    while ((m = re.exec(content))) {
      issues.push(
        `Spelling mistake "${mistake}" at ${mdPath}:${lineAt(content, m.index)}`
      )
    }
  }
  // Case-sensitive mistakes for brands
  for (const mistake of CASE_SENSITIVE_SPELLING_MISTAKES) {
    const re = new RegExp(mistake, "g")
    while ((m = re.exec(content))) {
      issues.push(
        `Brand capitalization issue "${mistake}" at ${mdPath}:${lineAt(content, m.index)}`
      )
    }
  }
  return { fixed, issues, content }
}

/**
 * Fix translated interpolation placeholders in JSON values.
 *
 * Crowdin sometimes translates the variable name inside {braces}:
 *   EN: "{days} ago" -> SW: "{siku} zilizopita"
 * The app expects the English key name. This function compares each
 * translated JSON value against its English counterpart and restores
 * the original placeholder names.
 */
function fixTranslatedJsonPlaceholders(
  translatedJson: string,
  englishJson: string
): { content: string; fixCount: number } {
  let fixCount = 0

  let trObj: Record<string, string>
  let enObj: Record<string, string>
  try {
    trObj = JSON.parse(translatedJson)
    enObj = JSON.parse(englishJson)
  } catch {
    return { content: translatedJson, fixCount: 0 }
  }

  for (const key of Object.keys(trObj)) {
    const enVal = enObj[key]
    if (!enVal || typeof enVal !== "string" || typeof trObj[key] !== "string")
      continue

    // Extract placeholders from English: {word} patterns
    const enPlaceholders = enVal.match(/\{[a-zA-Z_]\w*\}/g)
    if (!enPlaceholders || enPlaceholders.length === 0) continue

    // Extract placeholders from translated value
    const trPlaceholders = trObj[key].match(/\{[a-zA-Z_]\w*\}/g)
    if (!trPlaceholders || trPlaceholders.length === 0) continue

    // If counts match but names differ, map by position
    if (enPlaceholders.length === trPlaceholders.length) {
      let val = trObj[key]
      let changed = false
      for (let j = 0; j < enPlaceholders.length; j++) {
        if (trPlaceholders[j] !== enPlaceholders[j]) {
          val = val.replace(trPlaceholders[j], enPlaceholders[j])
          changed = true
        }
      }
      if (changed) {
        trObj[key] = val
        fixCount++
      }
    }
  }

  if (fixCount === 0) return { content: translatedJson, fixCount }

  // Re-serialize preserving the original formatting (2-space indent)
  const content = JSON.stringify(trObj, null, 2) + "\n"
  return { content, fixCount }
}

function processJsonFile(
  jsonPath: string,
  providedContent?: string,
  englishContent?: string
): {
  fixed: boolean
  issues: string[]
  content: string
} {
  const issues: string[] = []
  let content = providedContent || fs.readFileSync(jsonPath, "utf8")
  const before = content

  // Normalize BOM and smart quotes
  content = content
    .replace(/^\uFEFF/, "")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")

  // Extract locale from JSON path (e.g., src/intl/ar/page-about.json -> ar)
  const jsonParts = jsonPath.split(path.sep)
  const intlIdx = jsonParts.lastIndexOf("intl")
  const jsonLocale =
    intlIdx !== -1 && intlIdx + 1 < jsonParts.length
      ? jsonParts[intlIdx + 1]
      : ""

  // Fix known brand garbles in JSON values
  const garbleResult = fixKnownBrandGarbles(content, jsonLocale)
  if (garbleResult.fixCount > 0) {
    content = garbleResult.content
    issues.push(`Fixed ${garbleResult.fixCount} known brand name garble(s)`)
  }

  // Fix duplicated tag values in JSON
  const dupResult = fixDuplicatedTagValues(content)
  if (dupResult.fixCount > 0) {
    content = dupResult.content
    issues.push(`Fixed ${dupResult.fixCount} duplicated tag value(s)`)
  }

  // Fix known wrong compound terms in JSON values
  const compoundResult = fixKnownWrongCompounds(content)
  if (compoundResult.fixCount > 0) {
    content = compoundResult.content
    issues.push(`Fixed ${compoundResult.fixCount} known wrong compound term(s)`)
  }

  // Fix CJK ideographic full stops in JSON values
  if (jsonLocale) {
    const punctResult = fixCrossScriptPunctuation(content, jsonLocale)
    if (punctResult.fixCount > 0) {
      content = punctResult.content
      issues.push(
        `Replaced ${punctResult.fixCount} CJK ideographic full stop(s) with locale-appropriate punctuation`
      )
    }
  }

  // Fix translated interpolation placeholders if English is available
  if (englishContent) {
    const placeholderResult = fixTranslatedJsonPlaceholders(
      content,
      englishContent
    )
    if (placeholderResult.fixCount > 0) {
      content = placeholderResult.content
      issues.push(
        `Fixed ${placeholderResult.fixCount} translated placeholder(s)`
      )
    }
  }

  // Try parsing to validate JSON
  try {
    JSON.parse(content)
  } catch (e) {
    const error = e as Error
    issues.push(`JSON parse error: ${error.message}`)
  }

  const fixed = before !== content
  // Only write to disk if no content was provided (legacy mode)
  if (fixed && !providedContent) {
    fs.writeFileSync(jsonPath, content, "utf8")
  }

  return { fixed, issues, content }
}

function languagesFromEnv(): string[] | undefined {
  const env = process.env.TARGET_LANGUAGES?.trim()
  if (!env) return undefined
  return env
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export async function runSanitizer(
  filesWithContent?: Array<{ path: string; content: string }>,
  langs?: string[],
  englishContentMap?: Map<string, string>
) {
  console.log("[SANITIZE] Starting post-import sanitizer")
  await loadFranc()

  let mdFilesToProcess: Array<{ path: string; content: string }> = []
  let jsonFilesToProcess: Array<{ path: string; content: string }> = []

  if (filesWithContent && filesWithContent.length > 0) {
    // Process specific files; if content is empty, reads from disk and writes fixes back
    console.log(
      `[SANITIZE] Target: ${filesWithContent.length} specific file(s)`
    )
    mdFilesToProcess = filesWithContent.filter((f) => f.path.endsWith(".md"))
    jsonFilesToProcess = filesWithContent.filter((f) =>
      f.path.endsWith(".json")
    )
  } else {
    // Fallback to language-based scanning (reads from disk)
    const effectiveLangs = langs || languagesFromEnv()
    console.log(
      "[SANITIZE] Target languages:",
      effectiveLangs ?? "ALL detected in translations/"
    )
    const mdFilePaths = listFiles(CONTENT_ROOT, (f) => {
      if (!f.endsWith(".md")) return false
      if (!f.includes(`${path.sep}translations${path.sep}`)) return false
      if (effectiveLangs)
        return effectiveLangs.some((l) =>
          f.includes(`${path.sep}translations${path.sep}${l}${path.sep}`)
        )
      return true
    })
    const jsonFilePaths = listFiles(CONTENT_ROOT, (f) => {
      if (!f.endsWith(".json")) return false
      if (!f.includes(`${path.sep}translations${path.sep}`)) return false
      if (effectiveLangs)
        return effectiveLangs.some((l) =>
          f.includes(`${path.sep}translations${path.sep}${l}${path.sep}`)
        )
      return true
    })
    // Convert file paths to objects without content (will be read from disk)
    mdFilesToProcess = mdFilePaths.map((p) => ({ path: p, content: "" }))
    jsonFilesToProcess = jsonFilePaths.map((p) => ({ path: p, content: "" }))
  }

  // --- Orphan detection: flag translated files with no English counterpart ---
  const orphanWarnings: Array<{ file: string; suggestion: string }> = []
  const translationsDir = path.join(CONTENT_ROOT, "translations")

  for (const fileInfo of [...mdFilesToProcess, ...jsonFilesToProcess]) {
    const filePath = fileInfo.path
    // Extract the relative path after translations/<lang>/
    const txIdx = filePath.indexOf(`${path.sep}translations${path.sep}`)
    if (txIdx === -1) continue

    const afterTranslations = filePath.substring(
      txIdx + `${path.sep}translations${path.sep}`.length
    )
    // Strip the language code prefix: <lang>/rest/of/path
    const slashIdx = afterTranslations.indexOf(path.sep)
    if (slashIdx === -1) continue

    const langCode = afterTranslations.substring(0, slashIdx)
    const relPathWithinLang = afterTranslations.substring(slashIdx + 1)

    // Derive the expected English source path
    const englishPath = path.join(CONTENT_ROOT, relPathWithinLang)

    if (!fs.existsSync(englishPath)) {
      const relFile = path.relative(ROOT, filePath)
      // Try to find the English file by filename to suggest the correct location
      const basename = path.basename(relPathWithinLang)
      const parentDir = path.basename(path.dirname(relPathWithinLang))
      let suggestion = "No English counterpart found"

      // Search for matching parent/file pattern in English content
      const englishContentFiles = listFiles(CONTENT_ROOT, (f) => {
        if (f.includes(`${path.sep}translations${path.sep}`)) return false
        return (
          f.endsWith(`${path.sep}${parentDir}${path.sep}${basename}`) &&
          !f.includes(`${path.sep}translations${path.sep}`)
        )
      })

      if (englishContentFiles.length === 1) {
        const correctEnglishRel = path.relative(
          CONTENT_ROOT,
          englishContentFiles[0]
        )
        const correctTranslationPath = path.join(
          translationsDir,
          langCode,
          correctEnglishRel
        )
        suggestion = `Likely belongs at: ${path.relative(ROOT, correctTranslationPath)}`
      } else if (englishContentFiles.length > 1) {
        suggestion = `Ambiguous: ${englishContentFiles.length} English candidates found (${englishContentFiles.map((f) => path.relative(CONTENT_ROOT, f)).join(", ")})`
      }

      orphanWarnings.push({ file: relFile, suggestion })
    }
  }

  if (orphanWarnings.length > 0) {
    console.log(
      `\n[SANITIZE] ⚠ Orphaned translations (no English source at expected path):`
    )
    for (const w of orphanWarnings) {
      console.log(`  - ${w.file}`)
      console.log(`    ${w.suggestion}`)
    }
  }

  let mdFixed = 0
  let mdDiskWrites = 0
  const mdIssues: Array<{ file: string; issues: string[] }> = []
  const mdChanged: Array<{ path: string; content: string }> = []

  for (const fileInfo of mdFilesToProcess) {
    // Read original from disk for accurate disk-write detection
    const originalOnDisk = fs.existsSync(fileInfo.path)
      ? fs.readFileSync(fileInfo.path, "utf8")
      : null
    // Skip files that were deleted (e.g. removed in dev merge) and have no provided content
    if (originalOnDisk === null && !fileInfo.content) {
      continue
    }
    const { fixed, issues, content } = processMarkdownFile(
      fileInfo.path,
      fileInfo.content,
      englishContentMap
    )
    if (fixed) {
      mdFixed++
      mdChanged.push({ path: fileInfo.path, content })
    }
    // Track actual disk changes (content differs from what's on disk)
    if (originalOnDisk !== null && content !== originalOnDisk) {
      mdDiskWrites++
    }
    if (issues.length)
      mdIssues.push({ file: path.relative(ROOT, fileInfo.path), issues })
  }

  let jsonFixed = 0
  let jsonDiskWrites = 0
  const jsonIssues: Array<{ file: string; issues: string[] }> = []
  const jsonChanged: Array<{ path: string; content: string }> = []

  for (const fileInfo of jsonFilesToProcess) {
    const originalOnDisk = fs.existsSync(fileInfo.path)
      ? fs.readFileSync(fileInfo.path, "utf8")
      : null
    // Skip files that were deleted (e.g. removed in dev merge) and have no provided content
    if (originalOnDisk === null && !fileInfo.content) {
      continue
    }
    // Load English counterpart for JSON placeholder comparison
    // e.g., src/intl/sw/page-apps.json -> src/intl/en/page-apps.json
    let englishJsonContent: string | undefined
    const jsonRelParts = fileInfo.path.split(path.sep)
    const intlIdx = jsonRelParts.lastIndexOf("intl")
    if (intlIdx !== -1 && intlIdx + 2 < jsonRelParts.length) {
      const enJsonPath = [
        ...jsonRelParts.slice(0, intlIdx + 1),
        "en",
        ...jsonRelParts.slice(intlIdx + 2),
      ].join(path.sep)
      if (fs.existsSync(enJsonPath)) {
        englishJsonContent = fs.readFileSync(enJsonPath, "utf8")
      }
    }
    const { fixed, issues, content } = processJsonFile(
      fileInfo.path,
      fileInfo.content,
      englishJsonContent
    )
    if (fixed) {
      jsonFixed++
      jsonChanged.push({ path: fileInfo.path, content })
    }
    if (originalOnDisk !== null && content !== originalOnDisk) {
      jsonDiskWrites++
    }
    if (issues.length)
      jsonIssues.push({ file: path.relative(ROOT, fileInfo.path), issues })
  }

  console.log(
    `\n[SANITIZE] Markdown: ${mdFilesToProcess.length} scanned, ${mdDiskWrites} written to disk`
  )
  console.log(
    `[SANITIZE] JSON: ${jsonFilesToProcess.length} scanned, ${jsonDiskWrites} written to disk`
  )

  if (mdIssues.length || jsonIssues.length) {
    console.log("\n[SANITIZE] Issues detected:")
    for (const i of mdIssues) {
      console.log(` - MD ${i.file}`)
      for (const msg of i.issues) console.log(`   • ${msg}`)
    }
    for (const i of jsonIssues) {
      console.log(` - JSON ${i.file}`)
      for (const msg of i.issues) console.log(`   • ${msg}`)
    }
  } else {
    console.log("\n[SANITIZE] No issues detected.")
  }

  const changedFiles = [...mdChanged, ...jsonChanged].map((f) => ({
    path: path.relative(ROOT, f.path),
    content: f.content,
  }))
  return {
    changedFiles,
    markdown: { scanned: mdFilesToProcess.length, fixed: mdFixed },
    json: { scanned: jsonFilesToProcess.length, fixed: jsonFixed },
    issues: { markdown: mdIssues, json: jsonIssues },
    orphanWarnings,
  }
}

/**
 * Fix duplicate author continuation line in frontmatter.
 * Crowdin sometimes duplicates the author name on an indented YAML continuation
 * line, e.g.:
 *   author: Ori Pomerantz
 *     Ori Pomerantz
 * This collapses it to a single line.
 */
function fixDuplicateFrontmatterAuthor(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const frontmatterRe = /^---\n([\s\S]*?)\n---/
  const fmMatch = content.match(frontmatterRe)
  if (!fmMatch) return { content, fixCount }

  const fm = fmMatch[1]
  // Match: author: <name>\n  <same name>
  const dupAuthorRe = /^(author:\s*(.+))$\n^\s+\2$/m
  const match = fm.match(dupAuthorRe)
  if (match) {
    const fixedFm = fm.replace(dupAuthorRe, "$1")
    fixCount = 1
    return {
      content: content.replace(frontmatterRe, `---\n${fixedFm}\n---`),
      fixCount,
    }
  }
  return { content, fixCount }
}

/**
 * Fix broken markdown links where `}` was used instead of `]`.
 * Crowdin sometimes replaces the closing `]` with `}` in markdown links:
 *   [link text}(url)  ->  [link text](url)
 * Also handles cases where a newline separates `}` from `(url)`.
 */
function fixBrokenBracketInLinks(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    // Match [text}\n?(url) - } instead of ] with optional newline
    parts[i] = parts[i].replace(
      /\[([^\]{}]+)\}\s*\n?\s*\(([^)]+)\)/g,
      (_, text, url) => {
        fixCount++
        return `[${text}](${url})`
      }
    )
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Strips LLM artifact tokens (<bos>, <eos>, <s>, </s>, <pad>, <unk>, <mask>)
 * that leak from machine translation pipelines into prose content.
 * These tokens are never valid in markdown/MDX and will break the MDX parser
 * since they look like unrecognized JSX components.
 */
function stripLlmArtifactTokens(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0
  const tokenPattern = /<\/?(?:bos|eos|s|pad|unk|mask)>/gi

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks
    parts[i] = parts[i].replace(tokenPattern, () => {
      fixCount++
      return ""
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Replace smart/curly quotes used as JSX attribute value delimiters with
 * straight ASCII double quotes. Crowdin and LLMs occasionally convert the
 * straight `"` inside `<Component attr="value" />` to typographic variants
 * (U+201C, U+201D, U+201E, U+201F), which breaks MDX compilation.
 *
 * Only touches quotes that appear inside `<Tag ...>` or `<Tag ... />` — smart
 * quotes in regular prose are left alone.
 */
function fixSmartQuotesInJsxAttributes(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]+`)/g
  const parts = content.split(codeBlockPattern)

  // Match JSX/HTML tags (self-closing or opening) that contain smart quotes
  const smartQuoteChars = /[\u201C\u201D\u201E\u201F]/
  const tagPattern = /<[A-Za-z][^>]*[\u201C\u201D\u201E\u201F][^>]*\/?>/g

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks
    if (!smartQuoteChars.test(parts[i])) continue // Fast bail

    parts[i] = parts[i].replace(tagPattern, (tag) => {
      const fixed = tag.replace(/[\u201C\u201D\u201E\u201F]/g, '"')
      if (fixed !== tag) fixCount++
      return fixed
    })
  }

  return { content: parts.join(""), fixCount }
}

/**
 * Normalize JSX/HTML attribute spacing: `attr = "value"` -> `attr="value"`.
 * Crowdin sometimes introduces spaces around `=` in translated JSX attributes.
 */
function fixJsxAttributeSpacing(content: string): {
  content: string
  fixCount: number
} {
  let fixCount = 0

  const codeBlockPattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g
  const parts = content.split(codeBlockPattern)

  // Match entire HTML/JSX tags, then fix spaced attributes within each
  const tagRe = /<[A-Za-z][^>]*>/g
  const spacedAttrRe = /(\w+)\s+=\s+"/g

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue // Skip code blocks

    parts[i] = parts[i].replace(tagRe, (tag) => {
      return tag.replace(spacedAttrRe, (attrMatch, attr) => {
        const normalized = `${attr}="`
        if (normalized !== attrMatch) {
          fixCount++
        }
        return normalized
      })
    })
  }

  return { content: parts.join(""), fixCount }
}

/** @internal Exposed for unit testing only. Not part of the public API. */
export const _testOnly = {
  // Standalone fixes
  fixDuplicatedHeadings,
  fixBrokenMarkdownLinks,
  fixEscapedBoldAndItalic,
  fixAsciiGuillemets,
  fixGuillemetsInHtmlTags,
  fixMissingComponentClosingTags,
  fixMangledDocLinks,
  removeStaleComponents,
  fixBlockComponentLineBreaks,
  fixTickerTranspositions,
  fixBrandCapitalization,
  fixMisplacedBacktickAroundJsxFragment,
  escapeMdxAngleBrackets,
  removeOrphanedClosingTags,
  normalizeFrontmatterDates,
  quoteFrontmatterNonAscii,
  fixFrontmatterLang,
  normalizeBlockHtmlLines,
  fixAsymmetricBackticks,
  fixJsxAttributeSpacing,
  // English-comparison fixes
  syncHeaderIdsWithEnglish,
  fixDetachedHeadingAnchors,
  fixTranslatedHrefs,
  fixMissingLinkBrackets,
  fixBrandTags,
  fixProtectedBrandNames,
  syncProtectedFrontmatterFields,
  syncButtonsFrontmatterFields,
  restoreBlankLinesFromEnglish,
  collapseInlineHtmlFromEnglish,
  fixMergedClosingTags,
  normalizeInlineComponentsFromEnglish,
  repairUnclosedBackticks,
  fixCrowdinSplitBackticks,
  restoreDroppedBackslashEscapes,
  fixCollapsedComponentLineBreaks,
  // Warnings
  warnPunctuationOnlyHeadings,
  fixBackslashBeforeClosingTag,
  fixJunkAfterHeadingAnchors,
  fixNonAsciiHeadingIds,
  fixJsxMarkdownHybrids,
  fixBacktickWrappedLinks,
  fixMissingLinkParentheses,
  fixMissingClosingEmTag,
  fixImagePathDotSlash,
  fixEscapedQuotesInJsxAttributes,
  fixInnerQuotesInJsxAttributes,
  fixTranslatedJsonPlaceholders,
  escapeTildeStrikethrough,
  fixBoldAdjacentNonLatin,
  fixItalicAdjacentNonLatin,
  fixDuplicateFrontmatterAuthor,
  fixBrokenBracketInLinks,
  stripLlmArtifactTokens,
  fixSmartQuotesInJsxAttributes,
  stripCrowdinBoilerplate,
  fixDuplicatedTagValues,
  fixKnownBrandGarbles,
  restoreStrippedAbbreviations,
  fixMergedSupDigits,
  fixCrowdinNumberedTags,
  fixLeakedAttrNamesInJsxValues,
  fixLowercasedMdxComponents,
  fixMissingOpeningSup,
  fixSplitBoldMarkers,
  fixKnownWrongCompounds,
  warnExposedMdxTags,
  fixBareRtlDates,
  fixBareRtlEquations,
  fixMisalignedCodeFences,
  fixBareRtlValues,
  fixUnitOutsideSpan,
  fixSpanWrappedBackticks,
  fixBoldWrappedOrderedListNumerals,
  warnTranslatedTechnicalNumerals,
  warnTranslatedInlineCode,
  warnCodeFenceContentDrift,
  stripCodeComments,
  warnCatastrophicCodeFenceDrift,
  fixCrossScriptPunctuation,
  detectCrossScriptContamination,
  // Utilities
  toAsciiId,
  extractHeaderStructure,
  escapeRegex,
  extractHrefs,
  isInternalHref,
  splitIntoBlocks,
  // Entry points
  processMarkdownFile,
  processJsonFile,
}

if (require.main === module) {
  runSanitizer().catch(console.error)
}
