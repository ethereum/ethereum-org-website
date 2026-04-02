// Custom markdownlint rule: require {#custom-id} on all h1-h4 headings
// ethereum.org uses custom header IDs for translation infrastructure,
// URL fragment stability, and section-level drift detection.
//
// For translation files, auto-fix copies IDs from the English counterpart
// (matched by heading position). For English files, auto-fix slugifies
// the heading text.

const fs = require("fs")
const path = require("path")

const HEADING_RE = /^(#{1,4})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/
const TRANSLATIONS_DIR = "public/content/translations/"

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseHeadingsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8")
    const lines = content.split("\n")
    const headings = []
    let inCodeFence = false

    for (const line of lines) {
      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_RE.exec(line)
      if (!match) continue

      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        id: match[3] || null,
      })
    }
    return headings
  } catch {
    return null
  }
}

function getEnglishPath(filePath) {
  // Normalize to forward slashes for consistent matching
  const normalized = filePath.replace(/\\/g, "/")
  const idx = normalized.indexOf(TRANSLATIONS_DIR)
  if (idx === -1) return null

  const afterTranslations = normalized.slice(idx + TRANSLATIONS_DIR.length)
  // Strip locale prefix: "ja/staking/solo/index.md" -> "staking/solo/index.md"
  const withoutLocale = afterTranslations.replace(/^[^/]+\//, "")
  const root = normalized.slice(0, idx)
  return path.join(root, "public/content", withoutLocale)
}

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["heading-requires-id", "ethereum-heading-id"],
  description: "Headings h1-h4 must have a custom {#anchor-id}",
  tags: ["headings", "ethereum"],
  parser: "none",
  function: (params, onError) => {
    const filePath = params.name
    const isTranslation = filePath
      .replace(/\\/g, "/")
      .includes(TRANSLATIONS_DIR)

    // For translations, load English headings for ID lookup
    let englishHeadings = null
    if (isTranslation) {
      const englishPath = getEnglishPath(filePath)
      if (englishPath) {
        englishHeadings = parseHeadingsFromFile(englishPath)
      }
    }

    let inCodeFence = false
    let headingIndex = 0

    for (let i = 0; i < params.lines.length; i++) {
      const line = params.lines[i]

      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_RE.exec(line)
      if (!match) continue

      const level = match[1].length
      const text = match[2].trim()
      const id = match[3]

      if (!id) {
        const error = {
          lineNumber: i + 1,
          context: line.trim(),
        }

        if (isTranslation) {
          const englishId =
            englishHeadings &&
            englishHeadings[headingIndex] &&
            englishHeadings[headingIndex].id
          if (englishId) {
            error.detail = `h${level} missing {#id}. English: {#${englishId}}`
            error.fixInfo = {
              lineNumber: i + 1,
              editColumn: line.trimEnd().length + 1,
              insertText: ` {#${englishId}}`,
            }
          } else {
            error.detail = `h${level} missing {#id}. Fix English source first`
          }
        } else {
          const suggested = slugify(text)
          error.detail = `h${level} missing {#id}. Suggested: {#${suggested}}`
          error.fixInfo = {
            lineNumber: i + 1,
            editColumn: line.trimEnd().length + 1,
            insertText: ` {#${suggested}}`,
          }
        }

        onError(error)
      }

      headingIndex++
    }
  },
}
