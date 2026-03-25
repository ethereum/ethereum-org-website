#!/usr/bin/env npx tsx
/**
 * Transliterate English proper nouns in non-Latin-script translation files.
 *
 * Reads the lookup table from .claude/translation-review/transliterations/{lang}.json
 * and replaces English brand names, person names, and technical terms with their
 * native-script transliterations in body text.
 *
 * Usage:
 *   npx tsx src/scripts/i18n/transliterate.ts --lang=hi           # dry-run (default)
 *   npx tsx src/scripts/i18n/transliterate.ts --lang=hi --apply    # write changes
 *   npx tsx src/scripts/i18n/transliterate.ts --lang=hi --verbose  # show every replacement
 *
 * Supported languages: hi, mr, bn, ta, te, ar, ur, ru, uk, ja, ko, zh, zh-tw
 *
 * Protected zones (no replacements):
 *   - Code fences (```...```)
 *   - Inline code (`...`)
 *   - URLs and href attributes
 *   - Frontmatter `tags` arrays
 *   - JSX/HTML component names and attributes
 *   - Import/export statements
 *
 * Transliterated zones:
 *   - Body text, headings, list items, table cells
 *   - Frontmatter `author` field
 *   - Frontmatter `title` and `description` fields
 */

import * as fs from "node:fs"
import * as path from "node:path"

// ===== CLI Flags =====
const APPLY = process.argv.includes("--apply")
const VERBOSE = process.argv.includes("--verbose")
const DRY_RUN = !APPLY

const LANG_ARG = process.argv.find((a) => a.startsWith("--lang="))
const LANG = LANG_ARG?.split("=")[1]

const SUPPORTED_LANGS = [
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
]

if (!LANG || !SUPPORTED_LANGS.includes(LANG)) {
  console.error(
    `Usage: npx tsx src/scripts/i18n/transliterate.ts --lang=<code> [--apply] [--verbose]\n` +
      `Supported: ${SUPPORTED_LANGS.join(", ")}`
  )
  process.exit(1)
}

if (DRY_RUN) {
  console.log(`[transliterate] DRY RUN mode -- pass --apply to write changes\n`)
}

// ===== Configuration =====

const ROOT = process.cwd()
const TRANSLIT_JSON_PATH = path.join(
  ROOT,
  `.claude/translation-review/transliterations/${LANG}.json`
)

// Terms too ambiguous for automated word-boundary replacement.
// These are common English words that happen to also be brand names.
// They require manual review or tighter context matching.
const AMBIGUOUS_TERMS = new Set([
  "Go", // common verb
  "Base", // common noun
  "Compound", // common adjective/noun
  "Curve", // common noun
  "Scroll", // common noun/verb
  "Dart", // common noun
  "Brownie", // food
  "Lido", // place name
  "zkEVM", // technical acronym/standard, keep Latin (per Gemini)
])

// ===== Load Transliterations =====

interface TranslitEntry {
  text: string
  source: string
}

interface TranslitFile {
  _meta: Record<string, string>
  transliterations: Record<string, TranslitEntry>
  _alternatives?: Record<string, string[]>
}

const langJson: TranslitFile = JSON.parse(
  fs.readFileSync(TRANSLIT_JSON_PATH, "utf8")
)

const translit: Map<string, string> = new Map()
for (const [eng, entry] of Object.entries(langJson.transliterations)) {
  translit.set(eng, entry.text)
}

// Sort terms longest first to prevent partial matches
// e.g., "Ethereum Foundation" before "Ethereum", "Ethers.js" before "Ether"
const allTerms = [...translit.keys()].sort((a, b) => b.length - a.length)
const safeTerms = allTerms.filter((t) => !AMBIGUOUS_TERMS.has(t))

// ===== Regex Helpers =====

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Build a regex for matching a term with appropriate boundaries.
 *
 * Uses \b for terms that start/end with word characters [a-zA-Z0-9_].
 * Uses lookaround for terms with special chars at boundaries (C++, .NET).
 *
 * Devanagari chars are outside \w, so \b correctly matches at the
 * Latin/Devanagari boundary (e.g., "...देव Solidity कोड..." matches).
 */
function makePattern(term: string): RegExp {
  const escaped = escapeRegex(term)

  const startsWithWord = /^\w/.test(term)
  const endsWithWord = /\w$/.test(term)

  let pattern = escaped

  // Start boundary
  if (startsWithWord) {
    pattern = "\\b" + pattern
  } else {
    // For terms like ".NET" -- require whitespace/start/punctuation before
    pattern = "(?<=\\s|^|[>\"'(\\[])" + pattern
  }

  // End boundary
  if (endsWithWord) {
    pattern = pattern + "\\b"
  } else {
    // For terms like "C++" -- require whitespace/end/punctuation after
    pattern = pattern + "(?=\\s|$|[<\"',;.!?)\\]])"
  }

  return new RegExp(pattern, "g")
}

// Pre-compile patterns for all safe terms
const termPatterns: Array<{
  term: string
  pattern: RegExp
  replacement: string
}> = safeTerms.map((term) => ({
  term,
  pattern: makePattern(term),
  replacement: translit.get(term)!,
}))

// ===== Placeholder System =====
// Protect zones by replacing them with null-byte-delimited placeholders,
// performing transliteration on the remaining text, then restoring.

let phCounter = 0
let phMap: Map<string, string>

function ph(content: string): string {
  const key = `\x00PH${phCounter++}\x00`
  phMap.set(key, content)
  return key
}

function restore(text: string): string {
  // Restore in REVERSE order (newest placeholders first).
  // This handles nesting: if PH2 wraps PH1 wraps PH0,
  // restoring PH2 first reveals PH1, then PH1 reveals PH0.
  const entries = [...phMap.entries()].reverse()
  for (const [key, val] of entries) {
    text = text.split(key).join(val)
  }
  // Second pass: handle any remaining nested placeholders
  // that were revealed by the first pass
  for (const [key, val] of entries) {
    if (text.includes(key)) {
      text = text.split(key).join(val)
    }
  }
  return text
}

// ===== Markdown Processing =====

interface FileResult {
  file: string
  changed: boolean
  replacementCount: number
  details: string[]
}

function processMarkdownFile(filePath: string): FileResult {
  const content = fs.readFileSync(filePath, "utf8")
  const relPath = path.relative(ROOT, filePath)

  // Reset placeholder system
  phCounter = 0
  phMap = new Map()

  const lines = content.split("\n")
  const result: string[] = []
  const details: string[] = []
  let replacementCount = 0

  // State tracking
  let inFrontmatter = false
  let frontmatterDashes = 0
  let inCodeFence = false
  let codeFenceMarker = ""
  let inTagsBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1

    // --- Frontmatter boundary ---
    if (line.trim() === "---" && !inCodeFence) {
      frontmatterDashes++
      if (frontmatterDashes === 1) inFrontmatter = true
      if (frontmatterDashes === 2) {
        inFrontmatter = false
        inTagsBlock = false
      }
      result.push(line)
      continue
    }

    // --- Code fence boundary ---
    const fenceMatch = line.match(/^(`{3,})/)
    if (fenceMatch && !inFrontmatter) {
      if (!inCodeFence) {
        inCodeFence = true
        codeFenceMarker = fenceMatch[1]
      } else if (line.trim().startsWith(codeFenceMarker)) {
        inCodeFence = false
        codeFenceMarker = ""
      }
      result.push(line)
      continue
    }

    // --- Inside code fence: skip entirely ---
    if (inCodeFence) {
      result.push(line)
      continue
    }

    // --- Frontmatter handling ---
    if (inFrontmatter) {
      // Track tags array (could span multiple lines)
      if (/^\s*tags:\s*\[/.test(line)) {
        inTagsBlock = true
      }
      if (inTagsBlock) {
        if (line.includes("]")) inTagsBlock = false
        result.push(line) // Never touch tags
        continue
      }

      // Transliterate author, title, description fields
      if (/^\s*(author|title|description):\s*/.test(line)) {
        let modified = line
        // Reset per-line placeholders
        phCounter = 0
        phMap = new Map()

        // Protect domain names (ethereum.org, etc.)
        modified = modified.replace(
          /[a-zA-Z0-9][\w.-]*\.(org|com|io|net|dev|xyz|eth|fm|tv|co)\b/gi,
          (m) => ph(m)
        )

        // Protect quoted strings that look like URLs
        modified = modified.replace(/https?:\/\/[^\s"']+/g, (m) => ph(m))

        // Apply transliterations
        for (const { term, pattern, replacement } of termPatterns) {
          const before = modified
          modified = modified.replace(pattern, replacement)
          if (modified !== before) {
            replacementCount++
            details.push(
              `  L${lineNum}: "${term}" -> "${replacement}" (frontmatter)`
            )
          }
        }

        modified = restore(modified)
        result.push(modified)
        continue
      }

      // Other frontmatter fields: skip
      result.push(line)
      continue
    }

    // --- Body text ---
    let modified = line

    // Reset per-line placeholders
    phCounter = 0
    phMap = new Map()

    // 0. Protect MDX heading IDs: {#some-anchor-id}
    // These must stay ASCII or MDX/acorn parsing breaks
    modified = modified.replace(/\{#[^}]+\}/g, (m) => ph(m))

    // 0b. Protect domain names (e.g., "ethereum.org", "Etherscan.io")
    // These must NEVER be transliterated -- they are functional URLs/brands
    modified = modified.replace(
      /[a-zA-Z0-9][\w.-]*\.(org|com|io|net|dev|xyz|eth|fm|tv|co)\b/gi,
      (m) => ph(m)
    )

    // 1. Protect inline code
    modified = modified.replace(/`[^`\n]+`/g, (m) => ph(m))

    // 2. Protect markdown link URLs: [text](url)
    modified = modified.replace(/\]\([^)]+\)/g, (m) => ph(m))

    // 3. Protect autolinks and bare URLs
    modified = modified.replace(/https?:\/\/[^\s)>"']+/g, (m) => ph(m))

    // 4. Protect HTML/JSX attributes: href="...", src="...", id="...", etc.
    modified = modified.replace(/\w+="[^"]*"/g, (m) => ph(m))
    modified = modified.replace(/\w+='[^']*'/g, (m) => ph(m))

    // 5. Protect JSX component names: <ComponentName
    modified = modified.replace(/<\/?[A-Z]\w*/g, (m) => ph(m))

    // 6. Protect import/export lines entirely
    if (/^\s*(import|export)\s/.test(line)) {
      result.push(line)
      continue
    }

    // 7. Protect HTML comments
    modified = modified.replace(/<!--[\s\S]*?-->/g, (m) => ph(m))

    // Apply transliterations
    for (const { term, pattern, replacement } of termPatterns) {
      const before = modified
      modified = modified.replace(pattern, replacement)
      if (modified !== before) {
        // Count actual replacements (not just attempts)
        const matches = before.match(pattern)
        const count = matches ? matches.length : 1
        replacementCount += count
        if (VERBOSE || details.length < 200) {
          details.push(`  L${lineNum}: "${term}" -> "${replacement}"`)
        }
      }
    }

    // Restore protected zones
    modified = restore(modified)
    result.push(modified)
  }

  const newContent = result.join("\n")
  const changed = newContent !== content

  if (changed && APPLY) {
    fs.writeFileSync(filePath, newContent, "utf8")
  }

  return { file: relPath, changed, replacementCount, details }
}

// ===== JSON Processing =====

function processJsonFile(filePath: string): FileResult {
  const content = fs.readFileSync(filePath, "utf8")
  const relPath = path.relative(ROOT, filePath)
  const details: string[] = []
  let replacementCount = 0

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(content)
  } catch {
    return {
      file: relPath,
      changed: false,
      replacementCount: 0,
      details: ["  SKIP: invalid JSON"],
    }
  }

  function walkAndReplace(obj: unknown, jsonPath: string): unknown {
    if (typeof obj === "string") {
      let modified = obj

      // Protect URLs and domains
      phCounter = 0
      phMap = new Map()
      modified = modified.replace(
        /[a-zA-Z0-9][\w.-]*\.(org|com|io|net|dev|xyz|eth|fm|tv|co)\b/gi,
        (m) => ph(m)
      )
      modified = modified.replace(/https?:\/\/[^\s)>"']+/g, (m) => ph(m))
      modified = modified.replace(/<[^>]+>/g, (m) => ph(m)) // HTML tags

      for (const { term, pattern, replacement } of termPatterns) {
        const before = modified
        modified = modified.replace(pattern, replacement)
        if (modified !== before) {
          replacementCount++
          if (VERBOSE || details.length < 200) {
            details.push(`  ${jsonPath}: "${term}" -> "${replacement}"`)
          }
        }
      }

      modified = restore(modified)
      return modified
    }

    if (Array.isArray(obj)) {
      return obj.map((item, idx) => walkAndReplace(item, `${jsonPath}[${idx}]`))
    }

    if (obj && typeof obj === "object") {
      const result: Record<string, unknown> = {}
      for (const [key, val] of Object.entries(obj)) {
        // Don't modify keys, only values
        result[key] = walkAndReplace(val, `${jsonPath}.${key}`)
      }
      return result
    }

    return obj
  }

  const modified = walkAndReplace(parsed, "$") as Record<string, unknown>
  const newContent = JSON.stringify(modified, null, 2) + "\n"
  const changed = newContent !== content

  if (changed && APPLY) {
    fs.writeFileSync(filePath, newContent, "utf8")
  }

  return { file: relPath, changed, replacementCount, details }
}

// ===== Main =====

function main() {
  console.log(
    `[transliterate] Language: ${LANG} (${langJson._meta?.language_name || LANG})`
  )
  console.log(
    `[transliterate] Loading ${translit.size} terms from ${LANG}.json`
  )
  console.log(
    `[transliterate] ${safeTerms.length} safe terms, ${AMBIGUOUS_TERMS.size} skipped as ambiguous\n`
  )
  console.log(`Ambiguous (skipped): ${[...AMBIGUOUS_TERMS].join(", ")}\n`)

  // Find all translation files for the target language (Node 22+)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fsAny = fs as any
  const mdFiles = (
    fsAny.globSync(`public/content/translations/${LANG}/**/*.md`, {
      cwd: ROOT,
    }) as string[]
  ).map((f: string) => path.join(ROOT, f))
  const jsonFiles = (
    fsAny.globSync(`src/intl/${LANG}/**/*.json`, { cwd: ROOT }) as string[]
  ).map((f: string) => path.join(ROOT, f))

  console.log(
    `[transliterate] Found ${mdFiles.length} .md files, ${jsonFiles.length} .json files\n`
  )

  // Process markdown files
  const mdResults: FileResult[] = []
  for (const file of mdFiles) {
    const result = processMarkdownFile(file)
    mdResults.push(result)
  }

  // Process JSON files
  const jsonResults: FileResult[] = []
  for (const file of jsonFiles) {
    const result = processJsonFile(file)
    jsonResults.push(result)
  }

  // ===== Report =====
  const allResults = [...mdResults, ...jsonResults]
  const changedFiles = allResults.filter((r) => r.changed)
  const totalReplacements = allResults.reduce(
    (sum, r) => sum + r.replacementCount,
    0
  )

  console.log("=".repeat(70))
  console.log(
    `RESULTS: ${changedFiles.length} files changed, ${totalReplacements} replacements`
  )
  console.log("=".repeat(70))

  if (changedFiles.length > 0) {
    console.log("\nChanged files:")
    for (const r of changedFiles) {
      console.log(`\n  ${r.file} (${r.replacementCount} replacements)`)
      if (VERBOSE) {
        for (const d of r.details) {
          console.log(d)
        }
      }
    }
  }

  if (DRY_RUN && changedFiles.length > 0) {
    console.log(
      `\n[transliterate] DRY RUN complete. Run with --apply to write ${changedFiles.length} files.`
    )
  } else if (APPLY && changedFiles.length > 0) {
    console.log(
      `\n[transliterate] APPLIED: ${changedFiles.length} files written, ${totalReplacements} replacements.`
    )
  } else {
    console.log("\n[transliterate] No changes needed.")
  }

  // Summary by term frequency
  if (VERBOSE) {
    console.log("\n\nTerm frequency in changes:")
    const termCounts = new Map<string, number>()
    for (const r of allResults) {
      for (const d of r.details) {
        const match = d.match(/"([^"]+)" ->/)
        if (match) {
          termCounts.set(match[1], (termCounts.get(match[1]) || 0) + 1)
        }
      }
    }
    const sorted = [...termCounts.entries()].sort((a, b) => b[1] - a[1])
    for (const [term, count] of sorted.slice(0, 30)) {
      console.log(`  ${term}: ${count}`)
    }
  }
}

main()
