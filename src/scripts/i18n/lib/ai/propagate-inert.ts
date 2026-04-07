/**
 * Propagate inert-value changes from English to translated files.
 *
 * When English changes a URL, image path, inline code, component
 * attribute, or other non-translatable value without changing
 * translatable content, this script updates all translated files
 * deterministically -- no Gemini needed.
 *
 * Uses intl-content-tree's extractInertChanges() for detection,
 * then applies context-aware replacement per element type.
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' propagate-inert.ts \
 *     --file public/content/wrapped-eth/index.md [--dry-run]
 */

import { existsSync, readFileSync, realpathSync, writeFileSync } from "fs"
import { dirname, join, resolve } from "path"

import {
  deserialize,
  diff,
  extractInertChanges as extractFromTree,
} from "intl-content-tree"

import i18nConfig from "../../../../../i18n.config.json"

import {
  buildMarkdownManifest,
  type LocaleTranslationManifest,
  parseEnglishJson,
  parseEnglishMarkdown,
  type TreeManifest,
} from "./manifest-adapter"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InertChange {
  /** Element type (link, image, inline-code, component-attribute, etc.) */
  elementType: string
  /** The attribute/value key that changed */
  key: string
  /** Old value (from old English tree) */
  oldValue: string
  /** New value (from current English) */
  newValue: string
}

// ---------------------------------------------------------------------------
// Core: detect inert changes
// ---------------------------------------------------------------------------

/**
 * Compare current English against a stored source manifest. Returns a
 * list of inert values that changed, with full context (element type,
 * attribute name, old/new values).
 *
 * Delegates to intl-content-tree's extractInertChanges() which walks
 * old and new trees in parallel to extract precise change details.
 */
export function detectInertChanges(
  englishContent: string,
  sourceManifestJson: string,
  format: "markdown" | "json" = "markdown",
  localeContent?: string
): InertChange[] {
  const oldManifest: TreeManifest = JSON.parse(sourceManifestJson)
  const deserialized = deserialize(oldManifest)
  const newTree =
    format === "json"
      ? parseEnglishJson(englishContent)
      : parseEnglishMarkdown(englishContent)
  const driftResult = diff(deserialized, newTree)

  // extractInertChanges needs a fully parsed old tree (with values),
  // not a deserialized manifest (hashes only). Use the locale file as
  // the old tree source -- inert values aren't translated, so the
  // locale file has the same URLs/paths as the old English.
  const oldTree = localeContent
    ? format === "json"
      ? parseEnglishJson(localeContent)
      : parseEnglishMarkdown(localeContent)
    : deserialized

  const treeChanges = extractFromTree(oldTree, newTree, driftResult)

  return treeChanges.map((c) => ({
    elementType: c.elementType,
    key: c.key || "value",
    oldValue: c.oldValue,
    newValue: c.newValue,
  }))
}

// ---------------------------------------------------------------------------
// Core: apply changes to a locale file
// ---------------------------------------------------------------------------

/**
 * Apply inert changes to a translated file.
 *
 * For markdown: context-aware replacement within structural patterns
 * (link URLs, image paths, component attributes, frontmatter fields).
 * For JSON: parse, walk string values, replace, re-serialize.
 */
export function applyInertChanges(
  translatedContent: string,
  changes: InertChange[],
  format: "markdown" | "json" = "markdown"
): { content: string; applied: number; skipped: number } {
  if (format === "json") {
    return applyInertChangesJson(translatedContent, changes)
  }

  let content = translatedContent
  let applied = 0
  let skipped = 0

  for (const change of changes) {
    const replaced = contextAwareReplace(
      content,
      change.oldValue,
      change.newValue,
      change.elementType,
      change.key
    )

    if (replaced !== content) {
      content = replaced
      applied++
    } else {
      skipped++
    }
  }

  return { content, applied, skipped }
}

/**
 * Apply inert changes to a JSON locale file.
 * Parses the JSON, walks all string values, replaces old -> new,
 * then re-serializes. Avoids regex issues with escaped quotes.
 */
function applyInertChangesJson(
  translatedContent: string,
  changes: InertChange[]
): { content: string; applied: number; skipped: number } {
  const obj = JSON.parse(translatedContent)
  let applied = 0
  let skipped = 0

  for (const change of changes) {
    const found = jsonWalkReplace(obj, change.oldValue, change.newValue)
    if (found) {
      applied++
    } else {
      skipped++
    }
  }

  return {
    content: JSON.stringify(obj, null, 2) + "\n",
    applied,
    skipped,
  }
}

/** Recursively replace oldValue with newValue in all string values of a JSON structure. */
function jsonWalkReplace(
  o: Record<string, unknown>,
  oldValue: string,
  newValue: string
): boolean {
  let found = false
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === "string" && v.includes(oldValue)) {
      o[k] = v.split(oldValue).join(newValue)
      found = true
    } else if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === "string" && (v[i] as string).includes(oldValue)) {
          v[i] = (v[i] as string).split(oldValue).join(newValue)
          found = true
        } else if (typeof v[i] === "object" && v[i] !== null) {
          if (
            jsonWalkReplace(v[i] as Record<string, unknown>, oldValue, newValue)
          ) {
            found = true
          }
        }
      }
    } else if (typeof v === "object" && v !== null) {
      if (jsonWalkReplace(v as Record<string, unknown>, oldValue, newValue)) {
        found = true
      }
    }
  }
  return found
}

/**
 * Replace an inert value using context-aware matching.
 *
 * Each element type has a specific pattern that scopes the replacement
 * to the correct structural context, preventing false matches.
 * All branches use callback functions to prevent $ injection.
 */
function contextAwareReplace(
  content: string,
  oldValue: string,
  newValue: string,
  elementType: string,
  key: string
): string {
  const escaped = escapeRegex(oldValue)

  switch (elementType) {
    case "link": {
      // Match inside markdown link URL: [text](OLD) or href="OLD"
      const pattern = new RegExp(
        `(\\]\\()${escaped}(\\))|` + `(href=["'])${escaped}(["'])`,
        "g"
      )
      return content.replace(pattern, (_, mdPre, mdPost, hrefPre, hrefPost) => {
        if (mdPre) return `${mdPre}${newValue}${mdPost}`
        if (hrefPre) return `${hrefPre}${newValue}${hrefPost}`
        return newValue
      })
    }

    case "image": {
      // Match inside image path: ![alt](OLD)
      const pattern = new RegExp(
        `(!\\[(?:[^\\]]|\\\\\\])*\\]\\()${escaped}(\\))`,
        "g"
      )
      return content.replace(pattern, (_, pre, post) => {
        return `${pre}${newValue}${post}`
      })
    }

    case "inline-code": {
      // Match inside backticks: `OLD`
      const pattern = new RegExp(`(\`)${escaped}(\`)`, "g")
      return content.replace(pattern, (_, pre, post) => {
        return `${pre}${newValue}${post}`
      })
    }

    case "html-tag": {
      // Match inside attribute: key="OLD" or key='OLD'
      const pattern = new RegExp(
        `(${escapeRegex(key)}=["'])${escaped}(["'])`,
        "g"
      )
      return content.replace(pattern, (_, pre, post) => {
        return `${pre}${newValue}${post}`
      })
    }

    case "component-attribute": {
      // Match component attributes in multiple syntaxes:
      // key="OLD", key='OLD', key={OLD}, key={{OLD}}
      const escapedKey = escapeRegex(key)
      const patterns = [
        // String: key="OLD" or key='OLD'
        new RegExp(`(${escapedKey}=["'])${escaped}(["'])`, "g"),
        // JSX expression: key={OLD}
        new RegExp(`(${escapedKey}=\\{)${escaped}(\\})`, "g"),
        // JSX object: key={{OLD}}
        new RegExp(`(${escapedKey}=\\{\\{)${escaped}(\\}\\})`, "g"),
      ]
      for (const pattern of patterns) {
        const replaced = content.replace(pattern, (_, pre, post) => {
          return `${pre}${newValue}${post}`
        })
        if (replaced !== content) return replaced
      }
      return content
    }

    case "frontmatter-field": {
      // Match YAML frontmatter: key: OLD (only within --- fences)
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (!fmMatch) return content
      const fmContent = fmMatch[1]
      const escapedKey = escapeRegex(key)
      const pattern = new RegExp(`(^${escapedKey}:\\s*)${escaped}(\\s*$)`, "m")
      const newFm = fmContent.replace(pattern, (_, pre, post) => {
        return `${pre}${newValue}${post}`
      })
      if (newFm === fmContent) return content
      return content.replace(fmMatch[1], newFm)
    }

    case "code-body": {
      // Replace within code fences only, not in prose.
      return content.replace(
        /(```[^\n]*\n)([\s\S]*?)(```)/g,
        (_, open, body, close) => {
          return `${open}${body.replace(oldValue, () => newValue)}${close}`
        }
      )
    }

    default:
      // Fallback: replace first occurrence only (intentional -- without
      // structural context we can't safely replace all matches).
      return content.replace(oldValue, () => newValue)
  }
}

// ---------------------------------------------------------------------------
// Core: update translation manifest after propagation
// ---------------------------------------------------------------------------

/**
 * Update the translation manifest to reflect propagated inert changes.
 * Updates any placeholder entry whose values contain the old value.
 */
export function updateTranslationManifest(
  manifest: LocaleTranslationManifest,
  changes: InertChange[],
  newEnglishManifestHash: string
): LocaleTranslationManifest {
  const updated = { ...manifest }
  updated.englishManifestHash = newEnglishManifestHash
  updated.translatedAt = new Date().toISOString()

  const newMap = { ...updated.placeholderMap }
  for (const change of changes) {
    for (const [id, entry] of Object.entries(newMap)) {
      const newValues = { ...entry.values }
      let changed = false
      for (const [k, v] of Object.entries(newValues)) {
        if (v === change.oldValue) {
          newValues[k] = change.newValue
          changed = true
        }
      }
      if (changed) {
        newMap[id] = { ...entry, values: newValues }
      }
    }
  }
  updated.placeholderMap = newMap

  return updated
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2)
  let filePath = ""
  let dryRun = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" || args[i] === "-f") {
      filePath = args[++i]
    } else if (args[i] === "--dry-run") {
      dryRun = true
    }
  }

  if (!filePath) {
    console.log(`
Usage: npx ts-node propagate-inert.ts --file <english-path> [--dry-run]

Propagate URL/path/attribute changes from English to all translations.
Only inert changes are applied (no re-translation needed).

Options:
  --file, -f   English source file path
  --dry-run    Show what would change without writing files
`)
    process.exit(1)
  }

  const rootDir = process.cwd()

  // Path traversal guard (resolve + realpathSync to follow symlinks)
  const resolvedPath = resolve(rootDir, filePath)
  if (!resolvedPath.startsWith(rootDir)) {
    console.error("Error: file path must be within the project root")
    process.exit(1)
  }
  const realPath = realpathSync(resolvedPath)
  if (!realPath.startsWith(realpathSync(rootDir))) {
    console.error("Error: file path resolves outside the project root")
    process.exit(1)
  }

  const englishContent = readFileSync(realPath, "utf-8")

  const locales = i18nConfig
    .map((l: { code: string }) => l.code)
    .filter((code: string) => code !== "en")

  console.log(`Scanning for inert changes in: ${filePath}`)

  let totalApplied = 0
  let totalSkipped = 0

  for (const locale of locales) {
    const translationPath = filePath.replace(
      "public/content/",
      `public/content/translations/${locale}/`
    )
    const translationDir = join(rootDir, dirname(translationPath))
    const sourceManifestPath = join(translationDir, ".manifest-source.json")
    const translationManifestPath = join(
      translationDir,
      ".manifest-translation.json"
    )

    if (!existsSync(join(rootDir, translationPath))) continue
    if (!existsSync(sourceManifestPath)) {
      console.log(`  [${locale}] No source manifest, skipping`)
      continue
    }

    const sourceManifestJson = readFileSync(sourceManifestPath, "utf-8")

    const changes = detectInertChanges(englishContent, sourceManifestJson)

    if (changes.length === 0) {
      console.log(`  [${locale}] No inert changes`)
      continue
    }

    console.log(`  [${locale}] ${changes.length} inert change(s):`)
    for (const c of changes) {
      console.log(
        `    ${c.elementType}.${c.key}: ${c.oldValue.slice(0, 40)} -> ${c.newValue.slice(0, 40)}`
      )
    }

    if (dryRun) {
      console.log(`  [${locale}] (dry run, no changes written)`)
      continue
    }

    // Apply changes to the locale file
    const translatedContent = readFileSync(
      join(rootDir, translationPath),
      "utf-8"
    )
    const { content, applied, skipped } = applyInertChanges(
      translatedContent,
      changes
    )

    // Write manifests FIRST so a crash before content write
    // leaves stale manifests (safe: re-run will re-detect and re-apply)
    const newSourceManifest = buildMarkdownManifest(englishContent, filePath)

    if (existsSync(translationManifestPath)) {
      const translationManifest: LocaleTranslationManifest = JSON.parse(
        readFileSync(translationManifestPath, "utf-8")
      )
      const newSourceParsed = JSON.parse(newSourceManifest)
      const updatedTranslationManifest = updateTranslationManifest(
        translationManifest,
        changes,
        newSourceParsed.rootHash
      )
      writeFileSync(
        translationManifestPath,
        JSON.stringify(updatedTranslationManifest, null, 2) + "\n"
      )
    }

    writeFileSync(sourceManifestPath, newSourceManifest)

    if (applied > 0) {
      writeFileSync(join(rootDir, translationPath), content)
    }

    totalApplied += applied
    totalSkipped += skipped
    console.log(`  [${locale}] ${applied} applied, ${skipped} skipped`)
  }

  console.log(`\nTotal: ${totalApplied} applied, ${totalSkipped} skipped`)
  if (dryRun) {
    console.log("(dry run -- no files modified)")
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Error:", error)
    process.exit(1)
  })
}
