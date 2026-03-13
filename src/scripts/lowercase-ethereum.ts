/**
 * Lowercase "Ethereum" transform script.
 *
 * Converts "Ethereum" to "ethereum" as a common noun, preserving capitalization
 * for proper noun compounds (e.g. "Ethereum Foundation"), sentence starts,
 * and first-word-of-value positions (heading/label sentence casing).
 *
 * Usage:
 *   ts-node -O '{ "module": "commonjs" }' src/scripts/lowercase-ethereum.ts [options]
 *
 * Options:
 *   --dry-run   Print report, no file writes (default)
 *   --apply     Write changes to disk
 *   --files     Comma-separated list of specific files to process
 */

import * as fs from "fs"
import * as path from "path"

import minimist from "minimist"

// ---------------------------------------------------------------------------
// Proper noun allowlist -- these compound forms stay capitalized
// ---------------------------------------------------------------------------
const PROPER_NOUN_ALLOWLIST = [
  "Ethereum Foundation",
  "Ethereum Mainnet",
  "Ethereum Improvement Proposal", // singular + plural via startsWith
  "Ethereum Whitepaper",
  "Ethereum Developer Docs",
  "Ethereum Classic",
  "Ethereum Name Service",
  "Enterprise Ethereum Alliance",
  "Ethereum Cat Herders",
  "Ethereum Magicians",
  "Ethereum Virtual Machine",
  "Ethereum Request for Comments",
  "Ethereum WebAssembly",
]

// Event pattern: "Ethereum <City/Country>"
// We check if the word after "Ethereum" starts with an uppercase letter
// and is not a common word that follows "Ethereum" in normal prose
const COMMON_WORDS_AFTER_ETHEREUM = new Set([
  "is",
  "was",
  "has",
  "had",
  "can",
  "could",
  "will",
  "would",
  "should",
  "does",
  "did",
  "lets",
  "takes",
  "uses",
  "runs",
  "works",
  "makes",
  "gives",
  "needs",
  "allows",
  "enables",
  "provides",
  "supports",
  "powers",
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "for",
  "to",
  "in",
  "on",
  "at",
  "of",
  "by",
  "from",
  "with",
  "as",
  "into",
  "like",
  "over",
  "after",
  "before",
  "without",
  "through",
  "network",
  "ecosystem",
  "blockchain",
  "community",
  "protocol",
  "platform",
  "today",
  "every",
  "expanded",
  "doesn't",
  "cannot",
  "can't",
  "won't",
  "isn't",
  "aren't",
  "wasn't",
  "weren't",
  "don't",
  "didn't",
  "it",
  "you",
  "we",
  "they",
  "that",
  "this",
  "which",
  "while",
  "when",
  "where",
  "what",
  "how",
  "why",
  "not",
  "learn",
  "hub",
  "developer",
  "stack",
  "bug",
  "bounty",
])

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TransformChange {
  position: number
  reason: string
  original: string
  replacement: string
}

interface TransformResult {
  text: string
  changes: TransformChange[]
  preserved: TransformChange[]
}

interface FileReport {
  filePath: string
  changes: {
    key: string
    original: string
    transformed: string
    details: TransformChange[]
  }[]
  preserved: { key: string; details: TransformChange[] }[]
}

// ---------------------------------------------------------------------------
// Core transform: lowercaseEthereum
// ---------------------------------------------------------------------------
function lowercaseEthereum(text: string): TransformResult {
  const changes: TransformChange[] = []
  const preserved: TransformChange[] = []

  // Find all occurrences of "Ethereum" (capital E)
  const regex = /Ethereum/g
  let match: RegExpExecArray | null
  const positions: { index: number; length: number }[] = []

  while ((match = regex.exec(text)) !== null) {
    positions.push({ index: match.index, length: match[0].length })
  }

  if (positions.length === 0) {
    return { text, changes: [], preserved: [] }
  }

  // Process from end to start so indices remain valid
  let result = text
  for (let i = positions.length - 1; i >= 0; i--) {
    const pos = positions[i]
    const textAfter = text.substring(pos.index)

    // 1. Check proper noun allowlist
    if (isProperNounCompound(textAfter)) {
      preserved.push({
        position: pos.index,
        reason: "proper-noun-allowlist",
        original: "Ethereum",
        replacement: "Ethereum",
      })
      continue
    }

    // 2. Check event pattern ("Ethereum" + capitalized city/country name)
    if (isEventPattern(textAfter)) {
      preserved.push({
        position: pos.index,
        reason: "event-pattern",
        original: "Ethereum",
        replacement: "Ethereum",
      })
      continue
    }

    // 3. Check first-word-of-value (position 0, or preceded only by HTML tags)
    if (isFirstWordOfValue(text, pos.index)) {
      preserved.push({
        position: pos.index,
        reason: "first-word-of-value",
        original: "Ethereum",
        replacement: "Ethereum",
      })
      continue
    }

    // 4. Check sentence start (after . ! ? or start of string, looking past HTML tags)
    if (isSentenceStart(text, pos.index)) {
      preserved.push({
        position: pos.index,
        reason: "sentence-start",
        original: "Ethereum",
        replacement: "Ethereum",
      })
      continue
    }

    // 5. Otherwise -> lowercase
    result =
      result.substring(0, pos.index) +
      "ethereum" +
      result.substring(pos.index + pos.length)

    changes.push({
      position: pos.index,
      reason: "mid-sentence-lowercase",
      original: "Ethereum",
      replacement: "ethereum",
    })
  }

  // Reverse changes/preserved so they are in forward order for reporting
  changes.reverse()
  preserved.reverse()

  return { text: result, changes, preserved }
}

// ---------------------------------------------------------------------------
// Rule helpers
// ---------------------------------------------------------------------------

function isProperNounCompound(textFromEthereum: string): boolean {
  for (const compound of PROPER_NOUN_ALLOWLIST) {
    if (textFromEthereum.startsWith(compound)) {
      return true
    }
  }
  return false
}

function isEventPattern(textFromEthereum: string): boolean {
  // Match "Ethereum <Word>" where Word starts uppercase and is not a common word
  const eventMatch = textFromEthereum.match(/^Ethereum\s+([A-Z][a-zA-Z]+)/)
  if (!eventMatch) return false
  const nextWord = eventMatch[1].toLowerCase()
  return !COMMON_WORDS_AFTER_ETHEREUM.has(nextWord)
}

/**
 * Walk backward past HTML tags to find the "real" preceding content.
 * Returns the substring before the position with HTML tags stripped from the end.
 */
function getTextBeforeSkippingTags(text: string, position: number): string {
  let before = text.substring(0, position)
  // Repeatedly strip trailing HTML tags (opening or closing)
  // e.g., "<strong>", "</em>", "<a href=\"...\">", etc.
  let changed = true
  while (changed) {
    changed = false
    // Strip closing tags like </strong>
    const closeMatch = before.match(/<\/[a-zA-Z][a-zA-Z0-9]*>\s*$/)
    if (closeMatch) {
      before = before.substring(0, before.length - closeMatch[0].length)
      changed = true
      continue
    }
    // Strip opening tags like <strong> or <a href="...">
    const openMatch = before.match(/<[a-zA-Z][^>]*>\s*$/)
    if (openMatch) {
      before = before.substring(0, before.length - openMatch[0].length)
      changed = true
      continue
    }
  }
  return before
}

function isFirstWordOfValue(text: string, position: number): boolean {
  const before = getTextBeforeSkippingTags(text, position)
  // First word means nothing meaningful before it (empty or only whitespace)
  return before.trimStart().length === 0
}

function isSentenceStart(text: string, position: number): boolean {
  if (position === 0) return true

  const before = getTextBeforeSkippingTags(text, position)
  const trimmed = before.trimEnd()

  if (trimmed.length === 0) return true

  const lastChar = trimmed[trimmed.length - 1]
  // Sentence-ending punctuation followed by space
  if (lastChar === "." || lastChar === "!" || lastChar === "?") {
    return true
  }

  return false
}

// ---------------------------------------------------------------------------
// File processors
// ---------------------------------------------------------------------------

function processJsonFile(filePath: string, apply: boolean): FileReport {
  const raw = fs.readFileSync(filePath, "utf-8")
  const json = JSON.parse(raw) as Record<string, string>
  const report: FileReport = { filePath, changes: [], preserved: [] }

  for (const [key, value] of Object.entries(json)) {
    if (typeof value !== "string") continue
    if (!value.includes("Ethereum")) continue

    const result = lowercaseEthereum(value)

    if (result.changes.length > 0) {
      json[key] = result.text
      report.changes.push({
        key,
        original: value,
        transformed: result.text,
        details: result.changes,
      })
    }

    if (result.preserved.length > 0) {
      report.preserved.push({ key, details: result.preserved })
    }
  }

  if (apply && report.changes.length > 0) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8")
  }

  return report
}

function processTsxFile(filePath: string, apply: boolean): FileReport {
  const raw = fs.readFileSync(filePath, "utf-8")
  const report: FileReport = { filePath, changes: [], preserved: [] }

  if (!raw.includes("Ethereum")) {
    return report
  }

  let result = raw

  // Process quoted string literals in user-facing positions
  // Match: label/description/alt/title props, and JSX text content in quotes
  const stringLiteralRegex =
    /(?:(?:label|description|alt|title|content)\s*[:=]\s*)"([^"\n]*Ethereum[^"\n]*)"/g
  let stringMatch: RegExpExecArray | null

  const replacements: {
    start: number
    end: number
    original: string
    replacement: string
    changes: TransformChange[]
  }[] = []

  while ((stringMatch = stringLiteralRegex.exec(raw)) !== null) {
    const fullMatch = stringMatch[0]
    const stringContent = stringMatch[1]
    const contentStart = stringMatch.index + fullMatch.indexOf(stringContent)

    const transformed = lowercaseEthereum(stringContent)
    if (transformed.changes.length > 0) {
      replacements.push({
        start: contentStart,
        end: contentStart + stringContent.length,
        original: stringContent,
        replacement: transformed.text,
        changes: transformed.changes,
      })
    }
    if (transformed.preserved.length > 0) {
      report.preserved.push({
        key: `string@${contentStart}`,
        details: transformed.preserved,
      })
    }
  }

  // Also process single-line JSX text content between > and <
  // e.g., >Ethereum is the global network<
  // Excludes multiline content and JSX comments {/* ... */}
  const jsxTextRegex = />([^\n<]*Ethereum[^\n<]*)</g
  let jsxMatch: RegExpExecArray | null

  while ((jsxMatch = jsxTextRegex.exec(raw)) !== null) {
    const textContent = jsxMatch[1]
    const contentStart = jsxMatch.index + 1 // skip the >

    // Skip JSX comments: {/* ... */}
    if (textContent.includes("/*") || textContent.includes("*/")) continue

    // Skip import statements and non-user-facing code
    const lineStart = raw.lastIndexOf("\n", jsxMatch.index) + 1
    const line = raw.substring(
      lineStart,
      raw.indexOf("\n", jsxMatch.index + jsxMatch[0].length)
    )
    if (
      line.trimStart().startsWith("import ") ||
      line.trimStart().startsWith("//")
    )
      continue

    // Skip if this overlaps with an already-found string literal
    const overlaps = replacements.some(
      (r) => contentStart >= r.start && contentStart < r.end
    )
    if (overlaps) continue

    const transformed = lowercaseEthereum(textContent)
    if (transformed.changes.length > 0) {
      replacements.push({
        start: contentStart,
        end: contentStart + textContent.length,
        original: textContent,
        replacement: transformed.text,
        changes: transformed.changes,
      })
    }
    if (transformed.preserved.length > 0) {
      report.preserved.push({
        key: `jsx-text@${contentStart}`,
        details: transformed.preserved,
      })
    }
  }

  // Apply replacements from end to start
  replacements.sort((a, b) => b.start - a.start)
  for (const rep of replacements) {
    result =
      result.substring(0, rep.start) +
      rep.replacement +
      result.substring(rep.end)
    report.changes.push({
      key: `@${rep.start}`,
      original: rep.original,
      transformed: rep.replacement,
      details: rep.changes,
    })
  }

  if (apply && report.changes.length > 0) {
    fs.writeFileSync(filePath, result, "utf-8")
  }

  return report
}

// ---------------------------------------------------------------------------
// Demo file set (Phase 1)
// ---------------------------------------------------------------------------
const DEMO_FILES = [
  "src/intl/en/page-what-is-ethereum.json",
  "src/intl/en/page-index.json",
  "src/intl/en/common.json",
  "src/components/Hero/HomeHero2026/index.tsx",
  "app/[locale]/page.tsx",
]

// ---------------------------------------------------------------------------
// Report printer
// ---------------------------------------------------------------------------
function printReport(reports: FileReport[]): void {
  let totalChanges = 0
  let totalPreserved = 0

  for (const report of reports) {
    if (report.changes.length === 0 && report.preserved.length === 0) continue

    console.log(`\n${report.filePath}`)
    console.log("=".repeat(report.filePath.length))

    for (const change of report.changes) {
      totalChanges += change.details.length
      console.log(`  "${change.key}":`)
      console.log(`    "${change.original}"`)
      console.log(`    -> "${change.transformed}"`)
      for (const d of change.details) {
        console.log(`    [${d.reason} at pos ${d.position}]`)
      }
    }

    for (const pres of report.preserved) {
      totalPreserved += pres.details.length
      for (const d of pres.details) {
        console.log(
          `  "${pres.key}": (preserved -- ${d.reason} at pos ${d.position})`
        )
      }
    }
  }

  console.log(`\nTotal: ${totalChanges} changes, ${totalPreserved} preserved`)
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------
function main(): void {
  const argv = minimist(process.argv.slice(2))
  const apply = !!argv.apply
  const dryRun = !apply

  const fileArg = argv.files as string | undefined
  const files = fileArg ? fileArg.split(",").map((f) => f.trim()) : DEMO_FILES

  if (dryRun) {
    console.log("DRY RUN -- no files will be written")
  } else {
    console.log("APPLY MODE -- writing changes to disk")
  }

  const reports: FileReport[] = []

  for (const file of files) {
    const fullPath = path.resolve(file)
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`)
      continue
    }

    if (file.endsWith(".json")) {
      reports.push(processJsonFile(fullPath, apply))
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      reports.push(processTsxFile(fullPath, apply))
    } else {
      console.warn(`Unsupported file type: ${file}`)
    }
  }

  printReport(reports)
}

// Run if executed directly (not imported)
if (require.main === module) {
  main()
}

// ---------------------------------------------------------------------------
// Test-only exports
// ---------------------------------------------------------------------------
export const _testOnly = {
  lowercaseEthereum,
  isProperNounCompound,
  isEventPattern,
  isSentenceStart,
  isFirstWordOfValue,
  getTextBeforeSkippingTags,
  processJsonFile,
  processTsxFile,
  PROPER_NOUN_ALLOWLIST,
  COMMON_WORDS_AFTER_ETHEREUM,
}
