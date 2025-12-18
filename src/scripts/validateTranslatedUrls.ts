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
 *   pnpm validate-urls              # Report errors (incremental in CI)
 *   pnpm validate-urls --fix        # Auto-fix errors
 *   pnpm validate-urls --json       # Output as JSON
 *   pnpm validate-urls --full       # Force full validation (not incremental)
 */

import { execSync } from "child_process"
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

// ReDoS protection: maximum line length to process
const MAX_LINE_LENGTH = 10000
// ReDoS protection: maximum matches per line
const MAX_MATCHES_PER_LINE = 100

// Minimum similarity threshold for fuzzy matching suggestions
// Lower threshold to catch more potential matches
const SUGGEST_THRESHOLD = 0.4
const AUTO_FIX_THRESHOLD = 0.7

// Maximum URL length for Levenshtein computation (prevents memory exhaustion)
const MAX_URL_LENGTH = 500

// Known valid prefixes that don't need content files
// NOTE: This list must be manually maintained when new routes are added
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

// Sanitize filename to prevent path traversal
function sanitizeFilename(filename: string): string {
  if (
    filename.includes("..") ||
    filename.includes("\0") ||
    path.isAbsolute(filename)
  ) {
    throw new Error(`Invalid filename detected: ${filename}`)
  }
  return filename
}

// Recursively get all files matching an extension
function getAllFiles(
  dirPath: string,
  extension: string,
  arrayOfFiles: string[] = []
): string[] {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Warning: Directory not found: ${dirPath}`)
    return arrayOfFiles
  }

  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const sanitized = sanitizeFilename(file)
    const fullPath = path.join(dirPath, sanitized)
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
    console.warn(`Warning: Directory not found: ${intlDir}`)
    return []
  }

  const locales = fs.readdirSync(intlDir).filter((dir) => {
    const sanitized = sanitizeFilename(dir)
    const fullPath = path.join(intlDir, sanitized)
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
  suggestion?: string
  confidence?: number
}

// Levenshtein distance for fuzzy matching with length protection
function levenshtein(a: string, b: string): number {
  // Prevent memory exhaustion on very long strings
  if (a.length > MAX_URL_LENGTH || b.length > MAX_URL_LENGTH) {
    return Math.max(a.length, b.length)
  }

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

// Unified link extraction function (fixes code duplication)
function extractLinks(
  content: string,
  regex: RegExp,
  urlGroupIndex: number,
  textGroupIndex: number | null
): LinkInfo[] {
  const links: LinkInfo[] = []
  const lines = content.split("\n")

  lines.forEach((line, lineIndex) => {
    // ReDoS protection: skip lines that are too long
    if (line.length > MAX_LINE_LENGTH) {
      console.warn(
        `Warning: Line ${lineIndex + 1} exceeds max length (${line.length}), skipping`
      )
      return
    }

    let match
    const lineRegex = new RegExp(regex.source, "g")
    let matchCount = 0

    while (
      (match = lineRegex.exec(line)) !== null &&
      matchCount < MAX_MATCHES_PER_LINE
    ) {
      matchCount++
      const url = match[urlGroupIndex]
      if (!isExternalLink(url)) {
        links.push({
          text: textGroupIndex !== null ? match[textGroupIndex] : "",
          url: normalizeUrl(url),
          line: lineIndex + 1,
        })
      }
    }

    if (matchCount >= MAX_MATCHES_PER_LINE) {
      console.warn(
        `Warning: Line ${lineIndex + 1} hit max match limit, some links may be skipped`
      )
    }
  })

  return links
}

// Wrapper functions for backwards compatibility
function extractLinksFromMarkdown(content: string): LinkInfo[] {
  return extractLinks(content, MD_LINK_REGEX, 2, 1)
}

function extractLinksFromJson(content: string): LinkInfo[] {
  return extractLinks(content, JSON_HREF_REGEX, 1, null)
}

// Optimized fuzzy matching with candidate filtering
function findBestMatch(
  url: string,
  validPaths: Set<string>
): { path: string; confidence: number } | null {
  // Filter candidates by similar length (±30%) to reduce search space
  const urlLength = url.length
  const candidates = [...validPaths].filter((p) => {
    const lengthRatio = Math.abs(p.length - urlLength) / urlLength
    return lengthRatio < 0.3
  })

  // Further filter by common first path segment
  const urlSegments = url.split("/").filter(Boolean)
  const urlPrefix = urlSegments[0]?.toLowerCase()

  let searchSet = candidates
  if (urlPrefix) {
    const prefixFiltered = candidates.filter((p) => {
      const pathPrefix = p.split("/").filter(Boolean)[0]?.toLowerCase()
      if (!pathPrefix) return false
      // Check if prefixes are similar (within 2 edits)
      return pathPrefix === urlPrefix || levenshtein(urlPrefix, pathPrefix) <= 2
    })
    // Use filtered set if it has results, otherwise fall back to length-filtered set
    if (prefixFiltered.length > 0) {
      searchSet = prefixFiltered
    }
  }

  let bestMatch: { path: string; confidence: number } | null = null

  for (const validPath of searchSet) {
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
  const extractFn = isMarkdown ? extractLinksFromMarkdown : extractLinksFromJson
  const links = extractFn(translatedContent)

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

// Escape special regex characters in a string
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Atomic fix application with rollback support
interface FixResult {
  success: boolean
  fixedCount: number
  errors: string[]
}

function applyFixesWithRollback(
  fileResultsMap: Map<string, ValidationResult[]>
): FixResult {
  const backups = new Map<string, string>()
  const errors: string[] = []
  let totalFixed = 0

  try {
    // Phase 1: Create in-memory backups
    for (const [filePath] of fileResultsMap) {
      const originalContent = fs.readFileSync(filePath, "utf-8")
      backups.set(filePath, originalContent)
    }

    // Phase 2: Apply fixes
    for (const [filePath, results] of fileResultsMap) {
      const fixCount = applyFix(filePath, results)
      if (fixCount > 0) {
        console.log(`  Fixed ${fixCount} URL(s) in ${filePath}`)
        totalFixed += fixCount

        // Validate the fixed content (for JSON files)
        if (filePath.endsWith(".json")) {
          const fixedContent = fs.readFileSync(filePath, "utf-8")
          try {
            JSON.parse(fixedContent)
          } catch {
            throw new Error(`Fix corrupted JSON syntax in ${filePath}`)
          }
        }
      }
    }

    // Phase 3: Success
    return { success: true, fixedCount: totalFixed, errors: [] }
  } catch (error) {
    // Phase 4: Rollback on any error
    console.error("\nError during fix, rolling back changes...")
    for (const [filePath, originalContent] of backups) {
      try {
        fs.writeFileSync(filePath, originalContent)
      } catch (writeError) {
        errors.push(`Failed to rollback ${filePath}: ${writeError}`)
      }
    }
    errors.push(error instanceof Error ? error.message : String(error))
    return { success: false, fixedCount: 0, errors }
  }
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
    const oldUrl = escapeRegex(result.found.url)
    const newUrl = result.suggestion!

    // Use regex with global flag to replace ALL occurrences
    const patterns = [
      new RegExp(`\\]\\(${oldUrl}\\)`, "g"),
      new RegExp(`\\]\\(${oldUrl}/\\)`, "g"),
      new RegExp(`\\]\\(${oldUrl}#`, "g"),
      new RegExp(`href="${oldUrl}"`, "g"),
      new RegExp(`href="${oldUrl}/"`, "g"),
      new RegExp(`href=\\\\"${oldUrl}\\\\"`, "g"),
      new RegExp(`href=\\\\"${oldUrl}/\\\\"`, "g"),
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
      const matches = content.match(patterns[i])
      if (matches && matches.length > 0) {
        content = content.replace(patterns[i], replacements[i])
        fixCount += matches.length
        break
      }
    }
  }

  if (fixCount > 0) {
    fs.writeFileSync(filePath, content)
  }

  return fixCount
}

// Get list of changed files from git (for incremental validation)
function getChangedFiles(): string[] {
  try {
    // Try to get changed files compared to dev branch (common base for PRs)
    const gitDiff = execSync(
      "git diff --name-only origin/dev...HEAD 2>/dev/null || git diff --name-only HEAD~10...HEAD 2>/dev/null || echo ''",
      {
        encoding: "utf-8",
      }
    )
    return gitDiff.split("\n").filter(Boolean)
  } catch {
    // If git fails, return empty array (will fall back to full validation)
    return []
  }
}

// Check if we should run in incremental mode
function shouldValidateIncrementally(): boolean {
  return process.env.CI === "true" && !process.argv.includes("--full")
}

function main() {
  const args = process.argv.slice(2)
  const shouldFix = args.includes("--fix")
  const outputJson = args.includes("--json")
  const forceFull = args.includes("--full")

  console.log("Validating translated URLs...\n")
  console.log("Building list of valid paths...")

  // Build valid paths from English content
  const validPaths = buildValidPaths()
  console.log(`Found ${validPaths.size} valid URL paths\n`)

  // Find all translation files
  let mdFiles = getAllFiles(TRANSLATIONS_DIR, ".md")
  let jsonFiles = getTranslationJsonFiles()

  // Apply incremental validation in CI (unless --full is specified)
  if (shouldValidateIncrementally() && !forceFull) {
    const changedFiles = getChangedFiles()
    if (changedFiles.length > 0) {
      const changedSet = new Set(changedFiles)
      const originalMdCount = mdFiles.length
      const originalJsonCount = jsonFiles.length

      mdFiles = mdFiles.filter((f) => changedSet.has(f))
      jsonFiles = jsonFiles.filter((f) => changedSet.has(f))

      console.log(
        `Incremental mode: validating ${mdFiles.length + jsonFiles.length} changed files (of ${originalMdCount + originalJsonCount} total)\n`
      )
    }
  } else {
    console.log(
      `Scanning ${mdFiles.length} markdown files and ${jsonFiles.length} JSON files...\n`
    )
  }

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
      console.log("\nApplying fixes with rollback support...")

      // Group results by file
      const resultsByFile = new Map<string, ValidationResult[]>()
      for (const result of errors) {
        const existing = resultsByFile.get(result.file) || []
        existing.push(result)
        resultsByFile.set(result.file, existing)
      }

      const fixResult = applyFixesWithRollback(resultsByFile)

      if (fixResult.success) {
        console.log(`\nFixed ${fixResult.fixedCount} URL(s) total.`)
      } else {
        console.error("\nFix failed, all changes rolled back.")
        for (const err of fixResult.errors) {
          console.error(`  - ${err}`)
        }
        process.exit(1)
      }
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
