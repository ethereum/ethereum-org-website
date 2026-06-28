// Custom markdownlint rule: translation heading IDs must match English
// Compares the SET of IDs (not order) between a translation file and
// its English counterpart. Flags IDs present in translation but not
// English, and IDs present in English but missing from translation.
// No auto-fix -- mismatches require manual investigation.

const fs = require("fs")
const path = require("path")

const HEADING_ID_RE = /^#{1,4}\s+.+?\s*\{#([^}]+)\}\s*$/
const TRANSLATIONS_DIR = "public/content/translations/"

function extractIds(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8")
    const lines = content.split("\n")
    const ids = []
    let inCodeFence = false

    for (const line of lines) {
      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_ID_RE.exec(line)
      if (match) ids.push(match[1])
    }
    return ids
  } catch {
    return null
  }
}

function getEnglishPath(filePath) {
  const normalized = filePath.replace(/\\/g, "/")
  const idx = normalized.indexOf(TRANSLATIONS_DIR)
  if (idx === -1) return null

  const afterTranslations = normalized.slice(idx + TRANSLATIONS_DIR.length)
  const withoutLocale = afterTranslations.replace(/^[^/]+\//, "")
  const root = normalized.slice(0, idx)
  return path.join(root, "public/content", withoutLocale)
}

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["match-english-heading-ids", "ethereum-match-english-ids"],
  description: "Translation heading IDs must match the English source",
  tags: ["headings", "ethereum", "translations"],
  parser: "none",
  function: (params, onError) => {
    const filePath = params.name
    if (!filePath.replace(/\\/g, "/").includes(TRANSLATIONS_DIR)) return

    const englishPath = getEnglishPath(filePath)
    if (!englishPath) return

    const englishIds = extractIds(englishPath)
    if (!englishIds) return

    const translationIds = extractIds(filePath)
    if (!translationIds) return

    const englishSet = new Set(englishIds)
    const translationSet = new Set(translationIds)

    // Find IDs in translation that don't exist in English
    let inCodeFence = false
    for (let i = 0; i < params.lines.length; i++) {
      const line = params.lines[i]

      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_ID_RE.exec(line)
      if (!match) continue

      const id = match[1]
      if (!englishSet.has(id)) {
        onError({
          lineNumber: i + 1,
          detail: `{#${id}} not found in English source`,
          context: line.trim(),
        })
      }
    }

    // Find IDs in English that are missing from translation
    // Report on line 1 since we can't point to a specific line
    for (const id of englishIds) {
      if (!translationSet.has(id)) {
        onError({
          lineNumber: 1,
          detail: `English {#${id}} missing from this translation`,
        })
      }
    }
  },
}
