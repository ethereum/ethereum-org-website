/**
 * Validate Translated URLs
 *
 * Detects translated URL paths in translation files. URLs should always use
 * English paths regardless of content language.
 *
 * Strategy: Build a list of valid English URL paths from the content structure,
 * then check each internal link in translations against this list.
 *
 * Usage:
 *   pnpm validate-urls          # Report errors
 *   pnpm validate-urls --fix    # Auto-fix errors
 *   pnpm validate-urls --json   # Output as JSON
 */

import fs from "fs"
import path from "path"

// Configuration
const CONTENT_DIR = "public/content"
const TRANSLATIONS_DIR = "public/content/translations"
const INTL_DIR = "src/intl"
const DEFAULT_LOCALE = "en"

// Regex patterns for extracting links
// Captures internal links starting with / but not just /# (hash-only links)
const MD_LINK_REGEX = /\[([^\]]*)\]\((\/[^)#\s]+)/g
const JSON_HREF_REGEX = /href=\\?"(\/[^"#\\]+)/g

// Minimum similarity threshold for fuzzy matching suggestions
// Lower threshold to catch more potential matches
const SUGGEST_THRESHOLD = 0.4
const AUTO_FIX_THRESHOLD = 0.7

// Known valid prefixes that don't need content files
const VALID_PREFIXES = [
  "/developers/docs/",
  "/developers/tutorials/",
  "/glossary",
  "/community/",
  "/contributing/",
  "/roadmap/",
  "/staking/",
  "/layer-2/",
  "/run-a-node/",
  "/gas/",
  "/governance/",
  "/enterprise/",
  "/defi/",
  "/dao/",
  "/nft/",
  "/desci/",
  "/refi/",
  "/social-networks/",
  "/decentralized-identity/",
  "/dapps/",
  "/wallets/",
  "/security/",
  "/web3/",
  "/zero-knowledge-proofs/",
  "/bridges/",
  "/history/",
  "/whitepaper/",
  "/energy-consumption/",
  "/upgrades/",
  "/eips/",
  "/about/",
  "/assets/",
  "/bug-bounty/",
  "/brand-assets/",
  "/languages/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/cookie-policy/",
  "/guides/",
  "/quizzes/",
  "/learn/",
  "/eth/",
  "/what-is-ethereum/",
  "/get-eth/",
]

// Exact paths to whitelist (valid routes not in content directory)
const WHITELISTED_PATHS = [
  "/apps",
  "/what-is-ether",
  "/developers",
  "/stablecoins",
  "/developers/local-environment",
  "/developers/learning-tools",
]

// Path prefixes to whitelist (dynamic routes)
const WHITELISTED_PREFIXES = [
  "/apps/", // /apps/categories/gaming, etc.
]

// Recursively get all files matching an extension
function getAllFiles(
  dirPath: string,
  extension: string,
  arrayOfFiles: string[] = []
): string[] {
  if (!fs.existsSync(dirPath)) {
    return arrayOfFiles
  }

  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, extension, arrayOfFiles)
    } else if (file.endsWith(extension)) {
      arrayOfFiles.push(fullPath)
    }
  }

  return arrayOfFiles
}

// Get all translation JSON files (excluding English)
function getTranslationJsonFiles(): string[] {
  const intlDir = INTL_DIR
  if (!fs.existsSync(intlDir)) {
    return []
  }

  const locales = fs.readdirSync(intlDir).filter((dir) => {
    const fullPath = path.join(intlDir, dir)
    return fs.statSync(fullPath).isDirectory() && dir !== DEFAULT_LOCALE
  })

  const files: string[] = []
  for (const locale of locales) {
    const localePath = path.join(intlDir, locale)
    getAllFiles(localePath, ".json", files)
  }

  return files
}

// Build set of all valid URL paths from English content
function buildValidPaths(): Set<string> {
  const validPaths = new Set<string>()

  // Add known valid prefixes
  for (const prefix of VALID_PREFIXES) {
    validPaths.add(prefix.replace(/\/$/, ""))
  }

  // Add paths from English content files
  const englishMdFiles = getAllFiles(CONTENT_DIR, ".md").filter(
    (f) => !f.includes("/translations/")
  )

  for (const file of englishMdFiles) {
    // Convert file path to URL path
    // public/content/about/index.md -> /about
    // public/content/developers/docs/intro-to-ethereum/index.md -> /developers/docs/intro-to-ethereum
    const relativePath = file
      .replace(/^public\/content\//, "")
      .replace(/\/index\.md$/, "")
      .replace(/\.md$/, "")
    if (relativePath) {
      validPaths.add("/" + relativePath)
    }
  }

  return validPaths
}

interface LinkInfo {
  text: string
  url: string
  line: number
}

interface ValidationResult {
  file: string
  type: "error" | "warning"
  message: string
  found: LinkInfo
  expected?: LinkInfo
  suggestion?: string
  confidence?: number
}

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

function similarity(a: string, b: string): number {
  if (a === b) return 1
  const distance = levenshtein(a.toLowerCase(), b.toLowerCase())
  const maxLen = Math.max(a.length, b.length)
  return 1 - distance / maxLen
}

function normalizeUrl(url: string): string {
  // Remove trailing slash, query params, and anchors for comparison
  return url.replace(/\/$/, "").replace(/[?#].*$/, "")
}

function isExternalLink(url: string): boolean {
  return (
    url.startsWith("http") ||
    url.startsWith("mailto:") ||
    url.startsWith("ipfs:") ||
    url.startsWith("//")
  )
}

function extractLinksFromMarkdown(content: string): LinkInfo[] {
  const links: LinkInfo[] = []
  const lines = content.split("\n")

  lines.forEach((line, lineIndex) => {
    let match
    const regex = new RegExp(MD_LINK_REGEX.source, "g")
    while ((match = regex.exec(line)) !== null) {
      const url = match[2]
      if (!isExternalLink(url)) {
        links.push({
          text: match[1],
          url: normalizeUrl(url),
          line: lineIndex + 1,
        })
      }
    }
  })

  return links
}

function extractLinksFromJson(content: string): LinkInfo[] {
  const links: LinkInfo[] = []
  const lines = content.split("\n")

  lines.forEach((line, lineIndex) => {
    let match
    const regex = new RegExp(JSON_HREF_REGEX.source, "g")
    while ((match = regex.exec(line)) !== null) {
      const url = match[1]
      if (!isExternalLink(url)) {
        links.push({
          text: "",
          url: normalizeUrl(url),
          line: lineIndex + 1,
        })
      }
    }
  })

  return links
}

function findBestMatch(
  url: string,
  validPaths: Set<string>
): { path: string; confidence: number } | null {
  let bestMatch: { path: string; confidence: number } | null = null

  for (const validPath of validPaths) {
    const conf = similarity(url, validPath)
    if (
      conf > SUGGEST_THRESHOLD &&
      (!bestMatch || conf > bestMatch.confidence)
    ) {
      bestMatch = { path: validPath, confidence: conf }
    }
  }

  return bestMatch
}

function isValidPath(url: string, validPaths: Set<string>): boolean {
  // Check exact match in valid paths
  if (validPaths.has(url)) {
    return true
  }

  // Check exact whitelist
  if (WHITELISTED_PATHS.includes(url)) {
    return true
  }

  // Check whitelisted prefixes
  for (const prefix of WHITELISTED_PREFIXES) {
    if (url.startsWith(prefix)) {
      return true
    }
  }

  // Check if URL starts with any valid prefix
  for (const prefix of VALID_PREFIXES) {
    if (url.startsWith(prefix.replace(/\/$/, ""))) {
      return true
    }
  }

  return false
}

function validateFile(
  translatedFilePath: string,
  isMarkdown: boolean,
  validPaths: Set<string>
): ValidationResult[] {
  const results: ValidationResult[] = []

  // Read translated file
  const translatedContent = fs.readFileSync(translatedFilePath, "utf-8")

  // Extract links
  const extractLinks = isMarkdown
    ? extractLinksFromMarkdown
    : extractLinksFromJson
  const links = extractLinks(translatedContent)

  // Check each link
  for (const link of links) {
    // Skip if the URL is valid
    if (isValidPath(link.url, validPaths)) {
      continue
    }

    // Try to find a fuzzy match for suggestion
    const match = findBestMatch(link.url, validPaths)

    // Report all invalid paths as errors
    results.push({
      file: translatedFilePath,
      type: "error",
      message: match ? "Translated URL path detected" : "Invalid URL path",
      found: link,
      suggestion: match?.path,
      confidence: match?.confidence,
    })
  }

  return results
}

function applyFix(filePath: string, results: ValidationResult[]): number {
  let content = fs.readFileSync(filePath, "utf-8")
  let fixCount = 0

  // Only fix errors with high confidence
  const fixableResults = results.filter(
    (r) =>
      r.type === "error" &&
      r.suggestion &&
      r.confidence &&
      r.confidence >= AUTO_FIX_THRESHOLD
  )

  for (const result of fixableResults) {
    const oldUrl = result.found.url
    const newUrl = result.suggestion!

    // Replace the URL (with and without trailing slash)
    const patterns = [
      `](${oldUrl})`,
      `](${oldUrl}/)`,
      `](${oldUrl}#`,
      `href="${oldUrl}"`,
      `href="${oldUrl}/"`,
      `href=\\"${oldUrl}\\"`,
      `href=\\"${oldUrl}/\\"`,
    ]

    const replacements = [
      `](${newUrl})`,
      `](${newUrl}/)`,
      `](${newUrl}#`,
      `href="${newUrl}"`,
      `href="${newUrl}/"`,
      `href=\\"${newUrl}\\"`,
      `href=\\"${newUrl}/\\"`,
    ]

    for (let i = 0; i < patterns.length; i++) {
      if (content.includes(patterns[i])) {
        content = content.replace(patterns[i], replacements[i])
        fixCount++
        break
      }
    }
  }

  if (fixCount > 0) {
    fs.writeFileSync(filePath, content)
  }

  return fixCount
}

function main() {
  const args = process.argv.slice(2)
  const shouldFix = args.includes("--fix")
  const outputJson = args.includes("--json")

  console.log("Validating translated URLs...\n")
  console.log("Building list of valid paths...")

  // Build valid paths from English content
  const validPaths = buildValidPaths()
  console.log(`Found ${validPaths.size} valid URL paths\n`)

  // Find all translation files
  const mdFiles = getAllFiles(TRANSLATIONS_DIR, ".md")
  const jsonFiles = getTranslationJsonFiles()

  console.log(
    `Scanning ${mdFiles.length} markdown files and ${jsonFiles.length} JSON files...\n`
  )

  const allResults: ValidationResult[] = []

  // Validate markdown files
  for (const file of mdFiles) {
    const results = validateFile(file, true, validPaths)
    allResults.push(...results)
  }

  // Validate JSON files
  for (const file of jsonFiles) {
    const results = validateFile(file, false, validPaths)
    allResults.push(...results)
  }

  const errors = allResults.filter((r) => r.type === "error")

  if (outputJson) {
    console.log(JSON.stringify({ errors }, null, 2))
  } else {
    // Print errors
    if (errors.length > 0) {
      const fixable = errors.filter((e) => e.suggestion)
      const unfixable = errors.filter((e) => !e.suggestion)

      if (fixable.length > 0) {
        console.log("ERRORS (with suggestions):\n")
        for (const result of fixable) {
          console.log(`${result.file}:${result.found.line}`)
          console.log(`  Found:    ${result.found.url}`)
          console.log(
            `  Fix:      ${result.found.url} → ${result.suggestion} (${Math.round(result.confidence! * 100)}% match)`
          )
          console.log()
        }
      }

      if (unfixable.length > 0) {
        console.log("ERRORS (no suggestion - review manually):\n")
        for (const result of unfixable) {
          console.log(`${result.file}:${result.found.line}`)
          console.log(`  Invalid:  ${result.found.url}`)
          console.log()
        }
      }
    }

    const fixableCount = errors.filter(
      (e) => e.suggestion && e.confidence && e.confidence >= AUTO_FIX_THRESHOLD
    ).length
    console.log(
      `Summary: ${errors.length} errors (${fixableCount} auto-fixable)`
    )

    if (shouldFix && errors.length > 0) {
      console.log("\nApplying fixes...")

      // Group results by file
      const resultsByFile = new Map<string, ValidationResult[]>()
      for (const result of errors) {
        const existing = resultsByFile.get(result.file) || []
        existing.push(result)
        resultsByFile.set(result.file, existing)
      }

      let totalFixes = 0
      for (const [file, results] of resultsByFile) {
        const fixCount = applyFix(file, results)
        if (fixCount > 0) {
          console.log(`  Fixed ${fixCount} URL(s) in ${file}`)
          totalFixes += fixCount
        }
      }

      console.log(`\nFixed ${totalFixes} URL(s) total.`)
    } else if (errors.length > 0) {
      console.log("\nRun with --fix to auto-correct errors.")
    }
  }

  // Exit with error code if there are unfixed errors
  if (errors.length > 0 && !shouldFix) {
    process.exit(1)
  }
}

try {
  main()
} catch (error) {
  console.error("Error:", error)
  process.exit(1)
}
