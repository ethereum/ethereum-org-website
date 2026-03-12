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
 * Post-import sanitizer for Crowdin translations.
 *
 * - Synchronize custom Markdown header IDs `{#...}` with English source (ASCII-only)
 * - Normalize block HTML tag line breaks (opening and closing tags on their own lines)
 * - Protect known brand/team names from inadvertent translation
 * - Validate JSON files; report issues
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/post_import_sanitize.ts
 *
 * Env:
 *   TARGET_LANGUAGES (comma-separated, e.g. "es-EM") optional; defaults to scanning all `translations/*` folders
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
 * Brand names that should NEVER be translated in ANY language.
 * These are proper nouns - programming languages, companies, products.
 */
const PROTECTED_BRAND_NAMES = [
  // Programming languages
  "Solidity",
  "Vyper",
  "Rust",
  "JavaScript",
  "TypeScript",
  "Python",
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

  // Extract tags arrays
  const tagsRe = /^tags:\s*\[([^\]]*)\]/m
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
  englishContent: string
): { content: string; fixCount: number; warnings: string[] } {
  const warnings: string[] = []
  let content = translatedContent
  let fixCount = 0

  // Auto-fix: Restore brand-name tags to English (leaves concept tags translated)
  const brandTagsResult = fixBrandTags(content, englishContent)
  content = brandTagsResult.content
  fixCount += brandTagsResult.fixCount
  if (brandTagsResult.fixCount > 0) {
    warnings.push(
      `Restored ${brandTagsResult.fixCount} brand-name tag(s) to English`
    )
  }

  // Warn: Brand names with count mismatches in body content
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

      // Fix escaped bold first: \*\*text\*\* → **text**
      // Require word-boundary context: opening \*\* must be preceded by
      // whitespace or start-of-line (not operands like `)` or `>` or word
      // chars) to avoid stripping literal \*\* in math (e.g., 2\*\*10).
      lines[j] = lines[j].replace(
        /(?<=\s|^)\\\*\\\*(.+?)\\\*\\\*(?=\s|$|[.,;:!?\])>])/gm,
        (_, inner) => {
          fixCount++
          return `**${inner}**`
        }
      )

      // Fix escaped italic: \*text\* → *text*
      // Runs after bold fix, so remaining \* pairs are italic.
      // Same word-boundary guard: \* used as multiplication (e.g.,
      // result\*i + other\*value) has operands directly adjacent,
      // while italic \*text\* has whitespace/line-boundary outside.
      lines[j] = lines[j].replace(
        /(?<=\s|^)\\\*(.+?)\\\*(?=\s|$|[.,;:!?\])>])/gm,
        (_, inner) => {
          fixCount++
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
    if (engFences[i].body !== transFences[i].body) {
      const preview = transFences[i].body.substring(0, 60).replace(/\n/g, "\\n")
      warnings.push(
        `Code fence #${i + 1} content differs from English: "${preview}..."`
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
  id: string // Custom ID from {#id}
  fullMatch: string // Full matched string for replacement
}

function extractHeaderStructure(md: string): HeaderInfo[] {
  const headers: HeaderInfo[] = []
  const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}[ \t]*$/gm
  let m: RegExpExecArray | null
  while ((m = headingRe.exec(md))) {
    headers.push({
      level: m[1].length,
      text: m[2].trim(),
      id: m[3].trim(),
      fullMatch: m[0],
    })
  }
  return headers
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
    const inlineCloseRe = new RegExp(`([^\\n])\\s*</${tag}>`, "g")
    md = md.replace(inlineCloseRe, (_, before) => `${before}\n</${tag}>`)
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

  for (let i = 0; i < translatedLines.length; i++) {
    const line = translatedLines[i]
    result.push(line)

    // Check if this line should be followed by a blank line
    const isHeader = headerPattern.test(line)
    const isBlockClose = blockComponentClosePattern.test(line)

    if (isHeader || isBlockClose) {
      const nextLine = translatedLines[i + 1]
      const hasBlankAfter = nextLine === ""

      // Find corresponding line in English by matching pattern
      let englishShouldHaveBlank = false
      for (let j = 0; j < englishLines.length; j++) {
        const englishLine = englishLines[j]
        if (isHeader && headerPattern.test(englishLine)) {
          // Headers should match by structure (level)
          const transLevel = (line.match(/^#+/) || [""])[0].length
          const engLevel = (englishLine.match(/^#+/) || [""])[0].length
          if (transLevel === engLevel) {
            englishShouldHaveBlank = englishLines[j + 1] === ""
            break
          }
        } else if (
          isBlockClose &&
          blockComponentClosePattern.test(englishLine)
        ) {
          englishShouldHaveBlank = englishLines[j + 1] === ""
          break
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
    const inlineCloseRe = new RegExp(`([^\\n])\\s*</${component}>`, "g")
    content = content.replace(inlineCloseRe, (_, before) => {
      fixCount++
      return `${before}\n</${component}>`
    })

    // Fix inline opening tags: <Component>content → <Component>\ncontent
    // Match any non-newline character after the tag (including other tags)
    const inlineOpenRe = new RegExp(`(<${component}[^>]*>)([^\\n])`, "g")
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
  let content = translatedMd
  let fixCount = 0

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
    // - Closing tag is on the next line (possibly with leading whitespace)
    // Pattern: <tag...>content-with-possible-nested-tags\n  </tag>
    const translatedMultiLineRe = new RegExp(
      `(<${tag}[^>]*>)([^\\n]+)\\n(\\s*</${tag}>)`,
      "g"
    )

    content = content.replace(
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

  return { content, fixCount }
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
  englishMd: string
): { content: string; fixCount: number } {
  // Fields that should never be translated - sync from English canonical
  // Note: 'buttons' array needs special handling (content translatable, toId/isSecondary not)
  // Note: 'lang' must NOT be protected - it must remain as target language code
  const protectedFields = [
    "template",
    "sidebar",
    "sidebarDepth",
    "published",
    "author",
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
 * Wrap frontmatter string values containing non-ASCII characters in double quotes.
 * Prevents YAML parsing issues with accented characters.
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

      // Check if value contains non-ASCII characters
      // eslint-disable-next-line no-control-regex
      if (/[^\x00-\x7F]/.test(value)) {
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
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        // Strip inline code spans for counting only — tags inside
        // backticks are literal text, not real HTML
        const lineForCounting = line.replace(/`[^`]+`/g, "")
        const closeRe = new RegExp(`</${tag}>`, "g")
        const openRe = new RegExp(`<${tag}[\\s>]`, "g")

        const closeCount = (lineForCounting.match(closeRe) || []).length
        const openCount = (lineForCounting.match(openRe) || []).length

        // If there are more closing tags than opening tags on this line,
        // remove the excess closing tags (the trailing orphans)
        if (closeCount > openCount) {
          // Keep the first `openCount` closers (paired with openers),
          // remove the rest (orphans at the end of the line)
          let kept = 0
          lines[i] = line.replace(closeRe, (match) => {
            kept++
            if (kept <= openCount) {
              return match // Keep — paired with an opener
            }
            fixCount++
            return "" // Remove — orphaned
          })
          // Clean up any resulting double spaces
          lines[i] = lines[i].replace(/  +/g, " ").trimEnd()
        }
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
  providedContent?: string
): {
  fixed: boolean
  issues: string[]
  content: string
} {
  const issues: string[] = []
  let content = providedContent || fs.readFileSync(mdPath, "utf8")

  let englishMd: string | undefined

  // Map translated path to English path: remove `/translations/<lang>/` segment
  const parts = mdPath.split(path.sep)
  const idx = parts.lastIndexOf("translations")
  const locale = idx !== -1 && idx + 1 < parts.length ? parts[idx + 1] : ""
  if (idx === -1 || idx + 2 >= parts.length) {
    issues.push("No translations segment found; skipping formatting sync")
  } else {
    // Use path.resolve to preserve absolute paths (path.join loses leading /)
    const englishPath = path.resolve(
      path.sep,
      ...parts.slice(0, idx),
      ...parts.slice(idx + 2) // drop translations/<lang>
    )
    if (fs.existsSync(englishPath)) {
      englishMd = fs.readFileSync(englishPath, "utf8")
      content = syncHeaderIdsWithEnglish(content, englishMd)
    } else {
      issues.push(`English source missing: ${path.relative(ROOT, englishPath)}`)
    }
  }

  const before = content

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
    () => fixMissingClosingEmTag(content),
    (n) => `Fixed ${n} missing </em> closing tags`
  )
  applyFix(
    () => fixImagePathDotSlash(content),
    (n) => `Fixed ${n} corrupted ./ image paths`
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

  // Warn about exposed MDX tags from broken backtick spans
  {
    const tagWarnings = warnExposedMdxTags(content)
    issues.push(...tagWarnings)
  }

  applyFix(
    () => normalizeFrontmatterDates(content),
    (n) => `Normalized ${n} frontmatter dates to ISO format`
  )
  applyFix(
    () => quoteFrontmatterNonAscii(content),
    (n) => `Quoted ${n} frontmatter values with non-ASCII chars`
  )
  applyFix(
    () => fixAsciiGuillemets(content),
    (n) => `Fixed ${n} ASCII guillemets (<< >>) to Unicode (« »)`
  )

  // Fix escaped backticks (\`) to regular backticks (`)
  {
    const snapshot = content
    content = content.replace(/\\`/g, "`")
    if (content !== snapshot) {
      const count = (snapshot.match(/\\`/g) || []).length
      issues.push(`Unescaped ${count} backslash-escaped backticks`)
    }
  }

  applyFix(
    () => fixTickerTranspositions(content),
    (n) => `Fixed ${n} ticker symbol transpositions`
  )
  applyFix(
    () => fixAsymmetricBackticks(content),
    (n) => `Fixed ${n} asymmetric backtick pairs`
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
      () => syncProtectedFrontmatterFields(content, englishMd!),
      (n) => `Synced ${n} protected frontmatter fields from English`
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
      () => restoreBlankLinesFromEnglish(content, englishMd!),
      (n) => `Restored ${n} blank lines from English`
    )
    applyFix(
      () => fixCollapsedComponentLineBreaks(content, englishMd!),
      (n) => `Fixed ${n} collapsed component line breaks`
    )

    // Fix and check protected brand names
    const brandResult = fixProtectedBrandNames(content, englishMd)
    if (brandResult.content !== content) {
      issues.push(`Fixed ${brandResult.fixCount} brand name issues`)
    }
    content = brandResult.content
    issues.push(...brandResult.warnings)

    // Fix translated hrefs using set comparison
    const hrefResult = fixTranslatedHrefs(content, englishMd)
    if (hrefResult.content !== content) {
      issues.push(
        `Fixed ${hrefResult.fixCount} translated hrefs: ${hrefResult.fixes.join(", ")}`
      )
    }
    content = hrefResult.content
    issues.push(...hrefResult.warnings)

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

    // Detect cross-script contamination
    if (locale) {
      const scriptWarnings = detectCrossScriptContamination(content, locale)
      issues.push(...scriptWarnings)
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

function processJsonFile(
  jsonPath: string,
  providedContent?: string
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
  langs?: string[]
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
    const { fixed, issues, content } = processMarkdownFile(
      fileInfo.path,
      fileInfo.content
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
    const { fixed, issues, content } = processJsonFile(
      fileInfo.path,
      fileInfo.content
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
    path: f.path,
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

/** @internal Exposed for unit testing only. Not part of the public API. */
export const _testOnly = {
  // Standalone fixes
  fixDuplicatedHeadings,
  fixBrokenMarkdownLinks,
  fixEscapedBoldAndItalic,
  fixAsciiGuillemets,
  fixBlockComponentLineBreaks,
  fixTickerTranspositions,
  escapeMdxAngleBrackets,
  removeOrphanedClosingTags,
  normalizeFrontmatterDates,
  quoteFrontmatterNonAscii,
  normalizeBlockHtmlLines,
  fixAsymmetricBackticks,
  // English-comparison fixes
  syncHeaderIdsWithEnglish,
  fixTranslatedHrefs,
  fixBrandTags,
  fixProtectedBrandNames,
  syncProtectedFrontmatterFields,
  restoreBlankLinesFromEnglish,
  collapseInlineHtmlFromEnglish,
  fixMergedClosingTags,
  normalizeInlineComponentsFromEnglish,
  repairUnclosedBackticks,
  restoreDroppedBackslashEscapes,
  fixCollapsedComponentLineBreaks,
  // Warnings
  warnPunctuationOnlyHeadings,
  fixBackslashBeforeClosingTag,
  fixJunkAfterHeadingAnchors,
  fixBacktickWrappedLinks,
  fixMissingLinkParentheses,
  fixMissingClosingEmTag,
  fixImagePathDotSlash,
  fixInnerQuotesInJsxAttributes,
  escapeTildeStrikethrough,
  fixBoldAdjacentNonLatin,
  fixItalicAdjacentNonLatin,
  fixDuplicateFrontmatterAuthor,
  fixBrokenBracketInLinks,
  stripLlmArtifactTokens,
  warnExposedMdxTags,
  warnTranslatedInlineCode,
  warnCodeFenceContentDrift,
  warnCatastrophicCodeFenceDrift,
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
