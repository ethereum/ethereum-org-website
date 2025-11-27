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
const INTL_ROOT = path.join(ROOT, "src", "intl")

const _protectedNames = [
  "Ethereum",
  "ETH",
  "Solidity",
  "MetaMask",
  "GitHub",
  "Crowdin",
  "EIP",
  "NFT",
  "HTML",
  "PoW",
  "PoS",
]

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
function extractHeadingIds(md: string): Map<string, string> {
  // Map of heading text -> custom id found in English source
  const map = new Map<string, string>()
  const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$/gm
  let m: RegExpExecArray | null
  while ((m = headingRe.exec(md))) {
    const text = m[2].trim()
    const id = m[3].trim()
    map.set(text, id)
  }
  return map
}

function syncHeaderIdsWithEnglish(
  translatedMd: string,
  englishMd: string
): string {
  const englishIds = extractHeadingIds(englishMd)
  const headingRe = /^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$/gm
  return translatedMd.replace(headingRe, (full, hashes, text) => {
    const englishId = englishIds.get(text.trim())
    if (!englishId) return full // no corresponding English heading; leave as is
    const asciiId = toAsciiId(englishId)
    return `${hashes} ${text} {#${asciiId}}`
  })
}

function normalizeBlockHtmlLines(md: string): string {
  for (const tag of BLOCK_HTML_TAGS) {
    const inlineCloseRe = new RegExp(`([^\\n])\\s*</${tag}>`, "g")
    md = md.replace(inlineCloseRe, (_, before) => `${before}\n</${tag}>`)
  }
  return md
}

function protectNames(text: string): string {
  // Replace common incorrectly localized variants back to protected names.
  // This is heuristic; extend as needed per locale QA.
  const replacements: Array<[RegExp, string]> = [
    [/\bEtéreo\b/gi, "Ethereum"],
    [/\bEtéreum\b/gi, "Ethereum"],
    [/\bMetamask\b/gi, "MetaMask"],
    [/\bGithub\b/gi, "GitHub"],
    [/\bNft\b/g, "NFT"],
  ]
  let out = text
  for (const [re, val] of replacements) out = out.replace(re, val)
  // Normalize canonical capitalization of protected names
  for (const name of _protectedNames) {
    const re = new RegExp(`\\b${name}\\b`, "gi")
    out = out.replace(re, name)
  }
  return out
}

function processMarkdownFile(mdPath: string): {
  fixed: boolean
  issues: string[]
} {
  const issues: string[] = []
  let content = fs.readFileSync(mdPath, "utf8")

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
  content = normalizeBlockHtmlLines(content)
  content = protectNames(content)

  const fixed = before !== content
  if (fixed) fs.writeFileSync(mdPath, content, "utf8")
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
  return { fixed, issues }
}

function processJsonFile(jsonPath: string): {
  fixed: boolean
  issues: string[]
} {
  const issues: string[] = []
  let content = fs.readFileSync(jsonPath, "utf8")
  let fixed = false
  // Normalize BOM and smart quotes
  const cleaned = content
    .replace(/^\uFEFF/, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
  if (cleaned !== content) {
    content = cleaned
    fixed = true
  }
  try {
    JSON.parse(content)
  } catch (e) {
    issues.push(`JSON parse error: ${(e as Error).message}`)
  }
  if (fixed) fs.writeFileSync(jsonPath, content, "utf8")
  return { fixed, issues }
}

function languagesFromEnv(): string[] | undefined {
  const env = process.env.TARGET_LANGUAGES?.trim()
  if (!env) return undefined
  return env
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function runSanitizer(langs?: string[]) {
  const effectiveLangs = langs || languagesFromEnv()
  console.log("[SANITIZE] Starting post-import sanitizer")
  console.log(
    "[SANITIZE] Target languages:",
    effectiveLangs ?? "ALL detected in translations/"
  )

  const mdFiles = listFiles(CONTENT_ROOT, (f) => {
    if (!f.endsWith(".md")) return false
    if (!f.includes(`${path.sep}translations${path.sep}`)) return false
    if (effectiveLangs)
      return effectiveLangs.some((l) =>
        f.includes(`${path.sep}translations${path.sep}${l}${path.sep}`)
      )
    return true
  })

  let mdFixed = 0
  const mdIssues: Array<{ file: string; issues: string[] }> = []
  const mdChanged: string[] = []
  for (const f of mdFiles) {
    const { fixed, issues } = processMarkdownFile(f)
    if (fixed) {
      mdFixed++
      mdChanged.push(f)
    }
    if (issues.length) mdIssues.push({ file: path.relative(ROOT, f), issues })
  }

  const jsonFiles = listFiles(INTL_ROOT, (f) => {
    if (!f.endsWith(".json")) return false
    const p = path.relative(INTL_ROOT, f).split(path.sep)
    const langDir = p[0]
    if (!langDir) return false
    if (effectiveLangs) return effectiveLangs.some((l) => l.startsWith(langDir))
    return true
  })

  let jsonFixed = 0
  const jsonIssues: Array<{ file: string; issues: string[] }> = []
  const jsonChanged: string[] = []
  for (const f of jsonFiles) {
    const { fixed, issues } = processJsonFile(f)
    if (fixed) {
      jsonFixed++
      jsonChanged.push(f)
    }
    if (issues.length) jsonIssues.push({ file: path.relative(ROOT, f), issues })
  }

  console.log(
    `\n[SANITIZE] Markdown files scanned: ${mdFiles.length}, fixed: ${mdFixed}`
  )
  console.log(
    `[SANITIZE] JSON files scanned: ${jsonFiles.length}, fixed: ${jsonFixed}`
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

  const changedFiles = [...mdChanged, ...jsonChanged]
  return {
    changedFiles,
    markdown: { scanned: mdFiles.length, fixed: mdFixed },
    json: { scanned: jsonFiles.length, fixed: jsonFixed },
    issues: { markdown: mdIssues, json: jsonIssues },
  }
}

if (require.main === module) {
  runSanitizer()
}
