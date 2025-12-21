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
  // NOTE: ButtonLink is excluded - children should remain inline
  const blockComponentClosePattern =
    /<\/(Alert|AlertContent|AlertDescription|Card|ExpandableCard|CardGrid|InfoGrid|Tabs|TabItem|InfoBanner)>/

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
 * Fix block-level React components that have opening/closing tags inline with content.
 * MDX parser requires these tags to be on separate lines.
 * Returns number of fixes applied.
 */
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
  // Block components that need opening/closing tags on separate lines
  // NOTE: ButtonLink is intentionally excluded - it's an inline component
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

  // Fix frontmatter issues (don't need English source)
  const dateResult = normalizeFrontmatterDates(content)
  content = dateResult.content
  if (dateResult.fixCount > 0) {
    issues.push(
      `Normalized ${dateResult.fixCount} frontmatter dates to ISO format`
    )
  }

  const quoteResult = quoteFrontmatterNonAscii(content)
  content = quoteResult.content
  if (quoteResult.fixCount > 0) {
    issues.push(
      `Quoted ${quoteResult.fixCount} frontmatter values with non-ASCII chars`
    )
  }

  const guillemetResult = fixAsciiGuillemets(content)
  content = guillemetResult.content
  if (guillemetResult.fixCount > 0) {
    issues.push(
      `Fixed ${guillemetResult.fixCount} ASCII guillemets (<< >>) to Unicode (« »)`
    )
  }

  // Fix escaped backticks (\`) to regular backticks (`)
  // Crowdin sometimes escapes backticks unnecessarily
  const escapedBacktickCount = (content.match(/\\`/g) || []).length
  if (escapedBacktickCount > 0) {
    content = content.replace(/\\`/g, "`")
    issues.push(`Unescaped ${escapedBacktickCount} backslash-escaped backticks`)
  }

  // Fix block component line breaks (critical for MDX parser)
  const blockResult = fixBlockComponentLineBreaks(content)
  content = blockResult.content
  if (blockResult.fixCount > 0) {
    issues.push(`Fixed ${blockResult.fixCount} inline block component tags`)
  }

  content = normalizeBlockHtmlLines(content)

  // Normalize inline components and restore blank lines from English source
  if (englishMd) {
    // Sync protected frontmatter fields (template, sidebar, etc.)
    const protectedResult = syncProtectedFrontmatterFields(content, englishMd)
    content = protectedResult.content
    if (protectedResult.fixCount > 0) {
      issues.push(
        `Synced ${protectedResult.fixCount} protected frontmatter fields from English`
      )
    }

    // Collapse inline HTML tags to match English single-line format
    const inlineHtmlResult = collapseInlineHtmlFromEnglish(content, englishMd)
    content = inlineHtmlResult.content
    if (inlineHtmlResult.fixCount > 0) {
      issues.push(
        `Collapsed ${inlineHtmlResult.fixCount} inline HTML tags to match English`
      )
    }

    // Fix JSX component closing tags merged with content (split to own line)
    const mergedTagResult = fixMergedClosingTags(content, englishMd)
    content = mergedTagResult.content
    if (mergedTagResult.fixCount > 0) {
      issues.push(
        `Split ${mergedTagResult.fixCount} merged closing tags to own lines`
      )
    }

    // Collapse inline component line breaks to match English format
    const inlineResult = normalizeInlineComponentsFromEnglish(
      content,
      englishMd
    )
    content = inlineResult.content
    if (inlineResult.fixCount > 0) {
      issues.push(
        `Normalized ${inlineResult.fixCount} inline components to match English`
      )
    }

    // Repair unclosed backticks in inline code
    const backtickResult = repairUnclosedBackticks(content, englishMd)
    content = backtickResult.content
    if (backtickResult.fixCount > 0) {
      issues.push(`Repaired ${backtickResult.fixCount} unclosed backticks`)
    }

    const blankLineResult = restoreBlankLinesFromEnglish(content, englishMd)
    content = blankLineResult.content
    if (blankLineResult.fixCount > 0) {
      issues.push(
        `Restored ${blankLineResult.fixCount} blank lines from English`
      )
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
