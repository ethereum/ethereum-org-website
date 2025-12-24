#!/usr/bin/env npx ts-node
/**
 * sanitize.ts
 *
 * Post-translation sanitization for Crowdin imports.
 * Validates and fixes common translation issues.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/sanitize.ts [input-dir] [output-dir]
 *   npx ts-node src/scripts/i18n/sanitize.ts translations-es processed/es
 *
 * Environment:
 *   TARGET_LANGUAGE - Language code being processed
 *
 * Checks:
 *   - Internal paths not translated (e.g., /governance/ stays /governance/)
 *   - External URLs not modified
 *   - Domain names preserved
 *   - Frontmatter lang field matches target
 *   - No broken markdown syntax
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs"
import path from "path"

// Language code mapping (Crowdin code -> internal code)
import i18nConfig from "../../../i18n.config.json"

import { loadEnv } from "./lib/env"

const crowdinToInternal: Record<string, string> = {}
for (const { crowdinCode, code } of i18nConfig) {
  crowdinToInternal[crowdinCode] = code
}

interface SanitizeResult {
  file: string
  issues: string[]
  fixes: string[]
  modified: boolean
  skipped?: boolean
  skipReason?: string
}

interface SanitizeOptions {
  englishRoot: string
  targetLanguage: string
  internalLanguageCode: string
}

/**
 * Compare translated content with English source.
 * Returns true if content is effectively untranslated.
 */
function isUntranslated(
  translatedContent: string,
  englishContent: string
): boolean {
  // Normalize whitespace for comparison
  const normalizeWhitespace = (s: string) => s.replace(/\s+/g, " ").trim()

  const normalizedTranslated = normalizeWhitespace(translatedContent)
  const normalizedEnglish = normalizeWhitespace(englishContent)

  // Exact match after normalization = untranslated
  if (normalizedTranslated === normalizedEnglish) {
    return true
  }

  // Check if only the lang field changed (still untranslated)
  const withoutLang = (s: string) =>
    s.replace(/lang:\s*["']?[a-z-]+["']?/gi, "lang: PLACEHOLDER")
  if (withoutLang(normalizedTranslated) === withoutLang(normalizedEnglish)) {
    return true
  }

  // For JSON files, check if values are identical
  if (translatedContent.trim().startsWith("{")) {
    try {
      const translatedJson = JSON.parse(translatedContent)
      const englishJson = JSON.parse(englishContent)

      // Compare stringified versions (keys order may differ)
      const translatedValues = Object.values(translatedJson).sort()
      const englishValues = Object.values(englishJson).sort()

      if (JSON.stringify(translatedValues) === JSON.stringify(englishValues)) {
        return true
      }
    } catch {
      // Not valid JSON, continue with other checks
    }
  }

  return false
}

/**
 * Extract all internal links from markdown content.
 */
function extractInternalLinks(content: string): string[] {
  const links: string[] = []

  // Markdown links: [text](/path)
  const mdLinkRegex = /\]\(\/([^)#\s]+)/g
  let match
  while ((match = mdLinkRegex.exec(content)) !== null) {
    links.push(match[1])
  }

  // href attributes: href="/path"
  const hrefRegex = /href=["']\/([^"'#\s]+)/g
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push(match[1])
  }

  return links
}

/**
 * Extract all external URLs from content.
 */
function extractExternalUrls(content: string): Map<string, string> {
  const urls = new Map<string, string>()

  const urlRegex = /https?:\/\/([^\s"')<>\]]+)/g
  let match
  while ((match = urlRegex.exec(content)) !== null) {
    const fullUrl = match[0]
    const domain = match[1].split("/")[0]
    urls.set(fullUrl, domain)
  }

  return urls
}

/**
 * Check for translated internal paths.
 * Internal paths should NEVER be translated.
 */
function checkInternalPaths(
  content: string,
  englishContent: string
): { issues: string[]; fixes: Map<string, string> } {
  const issues: string[] = []
  const fixes = new Map<string, string>()

  const englishLinks = new Set(extractInternalLinks(englishContent))
  const translatedLinks = extractInternalLinks(content)

  // Known path translations that are WRONG
  const knownBadTranslations: Record<string, string> = {
    gobernanza: "governance",
    gobierno: "governance",
    desarrolladores: "developers",
    comunidad: "community",
    aprender: "learn",
    contribuir: "contributing",
    billeteras: "wallets",
    seguridad: "security",
    privacidad: "privacy",
    // Add more as discovered
  }

  for (const link of translatedLinks) {
    // Check if this looks like a translated path
    const segments = link.split("/")
    for (const segment of segments) {
      const correction = knownBadTranslations[segment.toLowerCase()]
      if (correction) {
        issues.push(
          `Translated path detected: /${link} (${segment} -> ${correction})`
        )
        fixes.set(
          `/${link}`,
          `/${link.replace(new RegExp(segment, "gi"), correction)}`
        )
      }
    }

    // Check if link exists in English (allowing for some variance)
    const linkBase = link.split("/")[0]
    if (!englishLinks.has(link) && !englishLinks.has(linkBase)) {
      // Might be a translated path
      const lowerLink = link.toLowerCase()
      for (const englishLink of englishLinks) {
        if (
          englishLink.toLowerCase() !== lowerLink &&
          englishLink.split("/").length === link.split("/").length
        ) {
          // Similar structure, different content - likely translated
          issues.push(
            `Possibly translated path: /${link} (expected something like /${englishLink})`
          )
        }
      }
    }
  }

  return { issues, fixes }
}

/**
 * Check for modified external URLs.
 * Domain names and URLs should never be modified.
 */
function checkExternalUrls(
  content: string,
  englishContent: string
): { issues: string[]; fixes: Map<string, string> } {
  const issues: string[] = []
  const fixes = new Map<string, string>()

  const englishUrls = extractExternalUrls(englishContent)
  const translatedUrls = extractExternalUrls(content)

  // Check for domain changes
  for (const [translatedUrl, translatedDomain] of translatedUrls) {
    // Find corresponding English URL by looking for similar patterns
    for (const [englishUrl, englishDomain] of englishUrls) {
      // Same path structure but different domain?
      const translatedPath = translatedUrl.replace(/^https?:\/\/[^/]+/, "")
      const englishPath = englishUrl.replace(/^https?:\/\/[^/]+/, "")

      if (
        translatedPath === englishPath &&
        translatedDomain !== englishDomain
      ) {
        issues.push(`Domain changed: ${englishDomain} -> ${translatedDomain}`)
        fixes.set(translatedUrl, englishUrl)
      }
    }
  }

  // Check for twitter.com -> x.com changes (or vice versa)
  // These should be flagged but may be intentional
  const twitterUrls = [...translatedUrls.keys()].filter(
    (u) => u.includes("twitter.com") || u.includes("x.com")
  )
  const englishTwitterUrls = [...englishUrls.keys()].filter(
    (u) => u.includes("twitter.com") || u.includes("x.com")
  )

  if (twitterUrls.length !== englishTwitterUrls.length) {
    issues.push(
      `Twitter/X URL count mismatch: English has ${englishTwitterUrls.length}, translated has ${twitterUrls.length}`
    )
  }

  return { issues, fixes }
}

/**
 * Check and fix frontmatter.
 */
function checkFrontmatter(
  content: string,
  internalLangCode: string
): { issues: string[]; fixes: Map<string, string> } {
  const issues: string[] = []
  const fixes = new Map<string, string>()

  // Check lang field
  const langMatch = content.match(
    /^---[\s\S]*?lang:\s*["']?(\w+)["']?[\s\S]*?---/m
  )
  if (langMatch) {
    const currentLang = langMatch[1]
    if (currentLang !== internalLangCode && currentLang !== "en") {
      issues.push(
        `Incorrect lang in frontmatter: ${currentLang} (expected ${internalLangCode})`
      )
      fixes.set(`lang: ${currentLang}`, `lang: ${internalLangCode}`)
      fixes.set(`lang: "${currentLang}"`, `lang: ${internalLangCode}`)
      fixes.set(`lang: '${currentLang}'`, `lang: ${internalLangCode}`)
    }
  }

  return { issues, fixes }
}

/**
 * Check for broken markdown syntax.
 */
function checkMarkdownSyntax(content: string): string[] {
  const issues: string[] = []

  // Unclosed code blocks
  const codeBlockMatches = content.match(/```/g) || []
  if (codeBlockMatches.length % 2 !== 0) {
    issues.push("Unclosed code block (odd number of ``` markers)")
  }

  // Broken links (common translation artifacts)
  if (
    content.includes("](") &&
    !content.includes("](http") &&
    !content.includes("](/")
  ) {
    // Check for malformed links like ]( without valid content
    const brokenLinks = content.match(/\]\(\s*\)/g)
    if (brokenLinks) {
      issues.push(`Found ${brokenLinks.length} empty link(s)`)
    }
  }

  // Broken JSX (unclosed tags)
  const jsxOpenTags = content.match(/<[A-Z][a-zA-Z]*[^/>]*>/g) || []
  const jsxCloseTags = content.match(/<\/[A-Z][a-zA-Z]*>/g) || []
  const selfClosingTags = content.match(/<[A-Z][a-zA-Z]*[^>]*\/>/g) || []

  const openCount = jsxOpenTags.length - selfClosingTags.length
  const closeCount = jsxCloseTags.length

  if (Math.abs(openCount - closeCount) > 2) {
    issues.push(
      `Possible JSX tag mismatch: ${openCount} open, ${closeCount} close`
    )
  }

  return issues
}

/**
 * Apply fixes to content.
 */
function applyFixes(content: string, fixes: Map<string, string>): string {
  let result = content
  for (const [from, to] of fixes) {
    result = result.split(from).join(to)
  }
  return result
}

/**
 * Sanitize a single file.
 */
function sanitizeFile(
  filePath: string,
  englishFilePath: string,
  options: SanitizeOptions
): SanitizeResult {
  const result: SanitizeResult = {
    file: filePath,
    issues: [],
    fixes: [],
    modified: false,
    skipped: false,
  }

  // Read files
  const content = readFileSync(filePath, "utf-8")
  const englishContent = existsSync(englishFilePath)
    ? readFileSync(englishFilePath, "utf-8")
    : ""

  // Check if content is untranslated (matches English source)
  if (englishContent && isUntranslated(content, englishContent)) {
    result.skipped = true
    result.skipReason = "Content matches English source (not translated)"
    return result
  }

  let fixedContent = content
  const allFixes = new Map<string, string>()

  // Run checks
  if (englishContent) {
    const pathCheck = checkInternalPaths(content, englishContent)
    result.issues.push(...pathCheck.issues)
    for (const [k, v] of pathCheck.fixes) allFixes.set(k, v)

    const urlCheck = checkExternalUrls(content, englishContent)
    result.issues.push(...urlCheck.issues)
    for (const [k, v] of urlCheck.fixes) allFixes.set(k, v)
  }

  const frontmatterCheck = checkFrontmatter(
    content,
    options.internalLanguageCode
  )
  result.issues.push(...frontmatterCheck.issues)
  for (const [k, v] of frontmatterCheck.fixes) allFixes.set(k, v)

  const syntaxIssues = checkMarkdownSyntax(content)
  result.issues.push(...syntaxIssues)

  // Apply fixes
  if (allFixes.size > 0) {
    fixedContent = applyFixes(content, allFixes)
    result.fixes = [...allFixes.entries()].map(
      ([from, to]) => `${from} -> ${to}`
    )
    result.modified = fixedContent !== content
  }

  // Update lang in frontmatter if needed
  if (filePath.endsWith(".md")) {
    const langRegex = /^(---[\s\S]*?lang:\s*)["']?en["']?([\s\S]*?---)$/m
    if (langRegex.test(fixedContent)) {
      fixedContent = fixedContent.replace(
        langRegex,
        `$1${options.internalLanguageCode}$2`
      )
      result.modified = true
      result.fixes.push(`lang: en -> lang: ${options.internalLanguageCode}`)
    }
  }

  return { ...result, content: fixedContent } as SanitizeResult & {
    content: string
  }
}

/**
 * Recursively process all files in a directory.
 */
function processDirectory(
  inputDir: string,
  outputDir: string,
  options: SanitizeOptions
): SanitizeResult[] {
  const results: SanitizeResult[] = []

  function walkDir(dir: string, relPath: string = "") {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const relativePath = path.join(relPath, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        walkDir(fullPath, relativePath)
      } else if (entry.endsWith(".md") || entry.endsWith(".json")) {
        // Determine English source path
        const englishPath = path.join(options.englishRoot, relativePath)

        // Process file
        const result = sanitizeFile(
          fullPath,
          englishPath,
          options
        ) as SanitizeResult & {
          content?: string
        }
        results.push(result)

        // Skip writing files that are untranslated
        if (result.skipped) {
          continue
        }

        // Write to output
        const outputPath = path.join(outputDir, relativePath)
        mkdirSync(path.dirname(outputPath), { recursive: true })
        writeFileSync(
          outputPath,
          result.content || readFileSync(fullPath, "utf-8")
        )
      }
    }
  }

  walkDir(inputDir)
  return results
}

async function main() {
  console.log("[SANITIZE] Starting translation sanitization...")

  // Parse arguments
  const args = process.argv.slice(2)
  const inputDir = args[0] || "translations"
  const outputDir = args[1] || "processed"

  // Load environment
  const env = loadEnv()
  const targetLanguage = env.targetLanguage || env.targetLanguages[0]
  const internalLanguageCode =
    crowdinToInternal[targetLanguage] || targetLanguage

  console.log(`[SANITIZE] Input: ${inputDir}`)
  console.log(`[SANITIZE] Output: ${outputDir}`)
  console.log(
    `[SANITIZE] Language: ${targetLanguage} -> ${internalLanguageCode}`
  )

  if (!existsSync(inputDir)) {
    console.error(`[SANITIZE] Input directory not found: ${inputDir}`)
    process.exit(1)
  }

  // Create output directory
  mkdirSync(outputDir, { recursive: true })

  // Process files
  const options: SanitizeOptions = {
    englishRoot: "public/content",
    targetLanguage,
    internalLanguageCode,
  }

  const results = processDirectory(inputDir, outputDir, options)

  // Summary
  const withIssues = results.filter((r) => r.issues.length > 0 && !r.skipped)
  const modified = results.filter((r) => r.modified)
  const skipped = results.filter((r) => r.skipped)
  const written = results.filter((r) => !r.skipped)

  console.log(`\n[SANITIZE] Processed ${results.length} files`)
  console.log(`[SANITIZE] Files written: ${written.length}`)
  console.log(`[SANITIZE] Files skipped (untranslated): ${skipped.length}`)
  console.log(`[SANITIZE] Files with issues: ${withIssues.length}`)
  console.log(`[SANITIZE] Files modified: ${modified.length}`)

  // Report issues
  if (withIssues.length > 0) {
    console.log("\n[SANITIZE] Issues found:")
    for (const result of withIssues) {
      console.log(`\n  ${result.file}:`)
      for (const issue of result.issues) {
        console.log(`    - ${issue}`)
      }
      if (result.fixes.length > 0) {
        console.log(`    Fixes applied:`)
        for (const fix of result.fixes) {
          console.log(`      * ${fix}`)
        }
      }
    }
  }

  // Write summary report
  const reportPath = path.join(outputDir, "sanitize-report.json")
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        language: targetLanguage,
        internalCode: internalLanguageCode,
        totalFiles: results.length,
        filesWritten: written.length,
        filesSkipped: skipped.length,
        filesWithIssues: withIssues.length,
        filesModified: modified.length,
        details: withIssues,
        skippedFiles: skipped.map((r) => ({
          file: r.file,
          reason: r.skipReason,
        })),
      },
      null,
      2
    )
  )
  console.log(`\n[SANITIZE] Report saved to ${reportPath}`)

  console.log("[SANITIZE] Sanitization complete!")
}

main().catch((error) => {
  console.error("[SANITIZE] Fatal error:", error)
  process.exit(1)
})
