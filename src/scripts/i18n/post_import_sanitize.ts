import * as fs from "fs"
import * as path from "path"

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
// const INTL_ROOT = path.join(ROOT, "src", "intl") // Not currently used

const BLOCK_HTML_TAGS = [
  "section",
  "div",
  "article",
  "aside",
  "header",
  "footer",
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

function lineAt(file: string, index: number): string {
  const fileSubstring = file.substring(0, index)
  const lines = fileSubstring.split("\n")
  const linePosition = lines.length
  const charPosition = lines[lines.length - 1].length + 1
  const lineNumber = `${linePosition}:${charPosition}`
  return lineNumber
}
type HeaderInfo = {
  level: number // Number of # symbols
  text: string // Header text (translated or English)
  id: string // Custom ID from {#id}
  fullMatch: string // Full matched string for replacement
}

function extractHeaderStructure(md: string): HeaderInfo[] {
  const headers: HeaderInfo[] = []
  const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$/gm
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

  // Match headers by position and level in the document structure
  // If structure matches, copy English IDs to translated headers
  if (englishHeaders.length !== translatedHeaders.length) {
    console.warn(
      `[WARN] Header count mismatch: English has ${englishHeaders.length}, translated has ${translatedHeaders.length}`
    )
  }

  let result = translatedMd
  // Match headers by index - same position = same semantic header
  for (let i = 0; i < translatedHeaders.length; i++) {
    const translatedHeader = translatedHeaders[i]
    const englishHeader = englishHeaders[i]

    if (!englishHeader) {
      // More headers in translation than English - skip
      continue
    }

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
 * Fix block-level React components that have opening/closing tags inline with content.
 * MDX parser requires these tags to be on separate lines.
 * Returns number of fixes applied.
 */
function fixBlockComponentLineBreaks(md: string): {
  content: string
  fixCount: number
} {
  const blockComponents = [
    "Card",
    "ExpandableCard",
    "Alert",
    "AlertEmoji",
    "AlertContent",
    "AlertDescription",
    "CardGrid",
    "InfoGrid",
    "InfoBanner",
    "ButtonLink",
    "Tabs",
    "TabItem",
  ]

  let content = md
  let fixCount = 0

  for (const component of blockComponents) {
    // Fix inline closing tags: content</Component> → content\n</Component>
    const inlineCloseRe = new RegExp(`([^\\n])\\s*</${component}>`, "g")
    content = content.replace(inlineCloseRe, (_, before) => {
      fixCount++
      return `${before}\n</${component}>`
    })

    // Fix inline opening tags: <Component>content → <Component>\ncontent
    // Only if there's actual content after the tag (not another tag or newline)
    const inlineOpenRe = new RegExp(`(<${component}[^>]*>)([^\\n<])`, "g")
    content = content.replace(inlineOpenRe, (_, tag, after) => {
      fixCount++
      return `${tag}\n${after}`
    })
  }

  return { content, fixCount }
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

  // Map translated path to English path: remove `/translations/<lang>/` segment
  const parts = mdPath.split(path.sep)
  const idx = parts.lastIndexOf("translations")
  if (idx === -1 || idx + 2 >= parts.length) {
    issues.push("No translations segment found; skipping header ID sync")
  } else {
    const englishPath = path.join(
      ...parts.slice(0, idx),
      ...parts.slice(idx + 2) // drop translations/<lang>
    )
    if (fs.existsSync(englishPath)) {
      const englishMd = fs.readFileSync(englishPath, "utf8")
      content = syncHeaderIdsWithEnglish(content, englishMd)
    } else {
      issues.push(`English source missing: ${path.relative(ROOT, englishPath)}`)
    }
  }

  const before = content

  // Fix block component line breaks (critical for MDX parser)
  const blockResult = fixBlockComponentLineBreaks(content)
  content = blockResult.content
  if (blockResult.fixCount > 0) {
    issues.push(`Fixed ${blockResult.fixCount} inline block component tags`)
  }

  content = normalizeBlockHtmlLines(content)

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

export function runSanitizer(
  filesWithContent?: Array<{ path: string; content: string }>,
  langs?: string[]
) {
  console.log("[SANITIZE] Starting post-import sanitizer")

  let mdFilesToProcess: Array<{ path: string; content: string }> = []
  let jsonFilesToProcess: Array<{ path: string; content: string }> = []

  if (filesWithContent && filesWithContent.length > 0) {
    // Process only the specific files provided with their in-memory content
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

  let mdFixed = 0
  const mdIssues: Array<{ file: string; issues: string[] }> = []
  const mdChanged: Array<{ path: string; content: string }> = []

  for (const fileInfo of mdFilesToProcess) {
    const { fixed, issues, content } = processMarkdownFile(
      fileInfo.path,
      fileInfo.content
    )
    if (fixed) {
      mdFixed++
      mdChanged.push({ path: fileInfo.path, content })
    }
    if (issues.length)
      mdIssues.push({ file: path.relative(ROOT, fileInfo.path), issues })
  }

  let jsonFixed = 0
  const jsonIssues: Array<{ file: string; issues: string[] }> = []
  const jsonChanged: Array<{ path: string; content: string }> = []

  for (const fileInfo of jsonFilesToProcess) {
    const { fixed, issues, content } = processJsonFile(
      fileInfo.path,
      fileInfo.content
    )
    if (fixed) {
      jsonFixed++
      jsonChanged.push({ path: fileInfo.path, content })
    }
    if (issues.length)
      jsonIssues.push({ file: path.relative(ROOT, fileInfo.path), issues })
  }

  console.log(
    `\n[SANITIZE] Markdown files scanned: ${mdFilesToProcess.length}, fixed: ${mdFixed}`
  )
  console.log(
    `[SANITIZE] JSON files scanned: ${jsonFilesToProcess.length}, fixed: ${jsonFixed}`
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
  }
}

if (require.main === module) {
  runSanitizer()
}
