/**
 * Propagate inert-value changes from English to translated files.
 *
 * When English changes a URL, image path, inline code, or other
 * non-translatable attribute without changing translatable content,
 * this script updates all translated files deterministically --
 * no Gemini needed.
 *
 * Uses:
 * - intl-content-tree diff to detect which elements have inert drift
 * - .manifest-source.json to compare old vs new English hashes
 * - .manifest-translation.json to look up old inert values for replacement
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' propagate-inert.ts \
 *     --file public/content/wrapped-eth/index.md [--dry-run]
 */

import { existsSync, readFileSync, writeFileSync } from "fs"
import { dirname, join, resolve } from "path"

import { type TreeNode, walk } from "intl-content-tree"

import i18nConfig from "../../../../../i18n.config.json"

import {
  buildMarkdownManifest,
  detectDrift,
  type LocaleTranslationManifest,
  parseEnglishMarkdown,
} from "./manifest-adapter"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InertChange {
  /** Element type (link, image, inline-code, etc.) */
  elementType: string
  /** The attribute/value key that changed */
  key: string
  /** Old value (from translation manifest) */
  oldValue: string
  /** New value (from current English) */
  newValue: string
  /** Placeholder ID from the translation manifest (for targeted updates) */
  placeholderId?: string
}

// ---------------------------------------------------------------------------
// Core: detect inert changes
// ---------------------------------------------------------------------------

/**
 * Compare current English against a stored source manifest and
 * translation manifest. Returns a list of inert values that changed.
 */
export function detectInertChanges(
  englishContent: string,
  sourceManifestJson: string,
  translationManifest: LocaleTranslationManifest
): InertChange[] {
  const changes: InertChange[] = []
  const drift = detectDrift(englishContent, sourceManifestJson, "markdown")

  // Parse English once, reuse for all drift entries
  const englishTree = parseEnglishMarkdown(englishContent)

  for (const entry of drift.inertDrift) {
    const section = findNodeById(englishTree, entry.id)
    if (!section) continue

    for (const node of walkInertLeaves(section)) {
      const nodeValues = getNodeInertValues(node)

      // Find matching manifest entry -- require ALL values to match
      const manifestMatch = findInTranslationManifest(
        translationManifest,
        nodeValues
      )
      if (!manifestMatch) continue

      // Compare each inert value (with href/url aliasing)
      for (const [key, newValue] of Object.entries(nodeValues)) {
        const oldValue =
          manifestMatch.entry.values[key] ??
          (key === "href" ? manifestMatch.entry.values.url : undefined) ??
          (key === "url" ? manifestMatch.entry.values.href : undefined)
        if (oldValue && oldValue !== newValue) {
          changes.push({
            elementType: node.elementType,
            key,
            oldValue,
            newValue,
            placeholderId: manifestMatch.id,
          })
        }
      }
    }
  }

  return changes
}

// ---------------------------------------------------------------------------
// Core: apply changes to a locale file
// ---------------------------------------------------------------------------

/**
 * Apply inert changes to a translated file.
 *
 * Uses context-aware replacement to match within the expected
 * structural context (link URLs, image paths, backticks, attributes).
 * All replacements use callback functions to prevent $ injection.
 */
export function applyInertChanges(
  translatedContent: string,
  changes: InertChange[]
): { content: string; applied: number; skipped: number } {
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
 * Replace an inert value using context-aware matching.
 *
 * All branches use callback functions to prevent $ injection in
 * replacement strings (C1 fix).
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
      // Uses permissive alt text pattern to handle ] in alt text
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

    case "html-tag":
    case "component-attribute": {
      // Match inside attribute: key="OLD" or key='OLD'
      const pattern = new RegExp(
        `(${escapeRegex(key)}=["'])${escaped}(["'])`,
        "g"
      )
      return content.replace(pattern, (_, pre, post) => {
        return `${pre}${newValue}${post}`
      })
    }

    case "code-body": {
      // Replace within code fences only, not in prose.
      // Inner replace uses callback to prevent $ injection.
      return content.replace(
        /(```[^\n]*\n)([\s\S]*?)(```)/g,
        (_, open, body, close) => {
          return `${open}${body.replace(oldValue, () => newValue)}${close}`
        }
      )
    }

    default:
      // Fallback: direct replacement using callback to prevent $ injection
      return content.replace(oldValue, () => newValue)
  }
}

// ---------------------------------------------------------------------------
// Core: update translation manifest after propagation
// ---------------------------------------------------------------------------

/**
 * Update the translation manifest to reflect propagated inert changes.
 * Only updates the specific placeholder entry identified during detection.
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
    // Only update the specific placeholder entry, not all matching values
    if (change.placeholderId && newMap[change.placeholderId]) {
      const entry = newMap[change.placeholderId]
      const newValues = { ...entry.values }
      for (const [k, v] of Object.entries(newValues)) {
        if (v === change.oldValue) {
          newValues[k] = change.newValue
        }
      }
      newMap[change.placeholderId] = { ...entry, values: newValues }
    }
  }
  updated.placeholderMap = newMap

  return updated
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findNodeById(tree: TreeNode, id: string): TreeNode | undefined {
  for (const node of walk(tree)) {
    if (node.id === id) return node
  }
  return undefined
}

function* walkInertLeaves(node: TreeNode): Generator<TreeNode> {
  if (
    node.contentType === "inert" ||
    (node.contentType === "mixed" &&
      node.meta &&
      Object.keys(node.meta).length > 0)
  ) {
    yield node
  }
  for (const child of node.children) {
    yield* walkInertLeaves(child)
  }
}

function getNodeInertValues(node: TreeNode): Record<string, string> {
  const values: Record<string, string> = {}
  if (node.contentType === "inert" && node.value) {
    values.value = node.value
  }
  if (node.meta) {
    for (const [k, v] of Object.entries(node.meta)) {
      if (
        k !== "tagName" &&
        k !== "language" &&
        k !== "containsMarkdown" &&
        k !== "containsHtml" &&
        k !== "name"
      ) {
        values[k] = v
      }
    }
  }
  return values
}

/**
 * Find a manifest entry where ALL inert values match (not just one).
 * Returns the entry and its placeholder ID for targeted updates.
 */
function findInTranslationManifest(
  manifest: LocaleTranslationManifest,
  nodeValues: Record<string, string>
):
  | { id: string; entry: { type: string; values: Record<string, string> } }
  | undefined {
  for (const [id, entry] of Object.entries(manifest.placeholderMap)) {
    if (allValuesMatch(entry.values, nodeValues)) {
      return { id, entry }
    }
  }
  return undefined
}

/**
 * Check that ALL inert values from the node match the manifest entry.
 * Prevents false matches when multiple elements share one value.
 */
function allValuesMatch(
  manifestValues: Record<string, string>,
  nodeValues: Record<string, string>
): boolean {
  if (Object.keys(nodeValues).length === 0) return false
  for (const [k, v] of Object.entries(nodeValues)) {
    const manifestVal =
      manifestValues[k] ??
      (k === "href" ? manifestValues.url : undefined) ??
      (k === "url" ? manifestValues.href : undefined)
    if (manifestVal !== v) return false
  }
  return true
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

  // Path traversal guard
  const resolvedPath = resolve(rootDir, filePath)
  if (!resolvedPath.startsWith(rootDir)) {
    console.error("Error: file path must be within the project root")
    process.exit(1)
  }

  const englishContent = readFileSync(resolvedPath, "utf-8")

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
    if (!existsSync(translationManifestPath)) {
      console.log(`  [${locale}] No translation manifest, skipping`)
      continue
    }

    const sourceManifestJson = readFileSync(sourceManifestPath, "utf-8")
    const translationManifest: LocaleTranslationManifest = JSON.parse(
      readFileSync(translationManifestPath, "utf-8")
    )

    const changes = detectInertChanges(
      englishContent,
      sourceManifestJson,
      translationManifest
    )

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
    const newSourceParsed = JSON.parse(newSourceManifest)
    const updatedTranslationManifest = updateTranslationManifest(
      translationManifest,
      changes,
      newSourceParsed.rootHash
    )

    writeFileSync(sourceManifestPath, newSourceManifest)
    writeFileSync(
      translationManifestPath,
      JSON.stringify(updatedTranslationManifest, null, 2) + "\n"
    )

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
