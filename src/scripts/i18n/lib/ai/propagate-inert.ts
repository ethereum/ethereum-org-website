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

import { existsSync, readFileSync, realpathSync, writeFileSync } from "fs"
import { dirname, join, resolve } from "path"

import {
  hash as treeHash,
  type SerializedNode,
  type TreeNode,
  walk,
} from "intl-content-tree"

import i18nConfig from "../../../../../i18n.config.json"

import {
  buildMarkdownManifest,
  detectDrift,
  type LocaleTranslationManifest,
  parseEnglishJson,
  parseEnglishMarkdown,
  type TreeManifest,
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
 *
 * Strategy: walk the OLD manifest tree (SerializedNode) and the NEW
 * parsed tree in parallel, matched by node ID at each level. For each
 * inert leaf whose anchorHash differs, use hash() to find the
 * translation manifest entry that produced the old hash, giving us
 * both old and new values.
 */
export function detectInertChanges(
  englishContent: string,
  sourceManifestJson: string,
  translationManifest: LocaleTranslationManifest,
  format: "markdown" | "json" = "markdown",
  localeContent?: string
): InertChange[] {
  const changes: InertChange[] = []
  const drift = detectDrift(englishContent, sourceManifestJson, format)

  // Parse current English tree (has new values)
  const newTree =
    format === "json"
      ? parseEnglishJson(englishContent)
      : parseEnglishMarkdown(englishContent)

  // Parse locale file for fallback old-value lookup (inert values aren't
  // translated, so the locale file has the same values as old English)
  const localeTree = localeContent
    ? format === "json"
      ? parseEnglishJson(localeContent)
      : parseEnglishMarkdown(localeContent)
    : undefined

  // Get old manifest tree (has old anchor hashes for structural matching)
  const oldManifest: TreeManifest = JSON.parse(sourceManifestJson)

  // Track consumed manifest entries so duplicate hashes (e.g. two links
  // to the same URL) each match a distinct placeholder entry.
  const consumed = new Set<string>()

  for (const entry of drift.inertDrift) {
    const newSection = findNodeById(newTree, entry.id)
    if (!newSection) continue

    // Find old section in manifest's serialized tree
    const oldSectionNode = findSerializedNode(oldManifest.tree, entry.id)
    if (!oldSectionNode) continue

    // Walk both trees in parallel, yielding inert leaf pairs
    for (const pair of matchInertNodes(newSection, oldSectionNode)) {
      const newValues = getNodeInertValues(pair.newNode)
      if (Object.keys(newValues).length === 0) continue

      // Skip if anchor hash hasn't actually changed
      if (pair.oldAnchorHash === pair.newNode.anchorHash) continue

      // Try translation manifest first
      const manifestMatch = findManifestEntryByAnchorHash(
        translationManifest,
        pair.oldAnchorHash,
        consumed
      )
      if (manifestMatch) {
        consumed.add(manifestMatch.id)
      }

      // Compare each inert value
      for (const [key, newValue] of Object.entries(newValues)) {
        let oldValue: string | undefined

        // Strategy 1: look up in translation manifest (with key aliasing)
        if (manifestMatch) {
          oldValue =
            manifestMatch.entry.values[key] ??
            (key === "href" ? manifestMatch.entry.values.url : undefined) ??
            (key === "url" ? manifestMatch.entry.values.href : undefined) ??
            (key === "src" ? manifestMatch.entry.values.path : undefined) ??
            (key === "path" ? manifestMatch.entry.values.src : undefined)
        }

        // Strategy 2: hash-match individual manifest values (handles
        // normalizer bundling attrs under different key names)
        if (!oldValue && manifestMatch) {
          for (const v of Object.values(manifestMatch.entry.values)) {
            if (treeHash(v) === pair.oldAnchorHash) {
              oldValue = v
              break
            }
          }
        }

        // Strategy 3: parse locale file to get old value directly.
        // Inert values aren't translated, so the locale file has the
        // same URLs/paths as the old English. This bypasses the
        // translation manifest entirely -- handles frontmatter fields,
        // component attributes, and any other nodes the normalizer
        // doesn't store in placeholderMap.
        if (!oldValue && localeTree) {
          const localeSection = findNodeById(localeTree, entry.id)
          if (localeSection) {
            for (const localePair of matchInertNodes(
              localeSection,
              oldSectionNode
            )) {
              if (localePair.newNode.id === pair.newNode.id) {
                const localeValues = getNodeInertValues(localePair.newNode)
                oldValue = localeValues[key]
                break
              }
            }
          }
        }

        if (oldValue && oldValue !== newValue) {
          changes.push({
            elementType: pair.newNode.elementType,
            key,
            oldValue,
            newValue,
            placeholderId: manifestMatch?.id,
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
 * For markdown: context-aware regex replacement within structural
 * patterns (link URLs, image paths, backticks, attributes).
 * For JSON: parse, walk string values, replace, re-serialize.
 * JSON needs this because quotes are escaped as \" in the raw file.
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
      // Fallback: replace first occurrence only (intentional -- without
      // structural context we can't safely replace all matches).
      // Callback prevents $ injection in replacement string.
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
 * Find a node in the serialized manifest tree by ID (recursive search).
 */
function findSerializedNode(
  node: SerializedNode,
  id: string
): SerializedNode | undefined {
  if (!node.children) return undefined
  if (node.children[id]) return node.children[id]
  for (const child of Object.values(node.children)) {
    const found = findSerializedNode(child, id)
    if (found) return found
  }
  return undefined
}

/**
 * Walk new tree and old serialized tree in parallel by matching child IDs.
 * Yields inert leaf pairs with the new node (full data) and old anchorHash.
 */
function* matchInertNodes(
  newNode: TreeNode,
  oldSerialized: SerializedNode
): Generator<{ newNode: TreeNode; oldAnchorHash: string }> {
  // Yield inert leaves AND mixed-content nodes that carry inert metadata.
  // Mixed nodes (e.g. links) have both translatable text and inert attributes
  // (href). getNodeInertValues downstream filters to inert keys only.
  if (
    newNode.contentType === "inert" ||
    (newNode.contentType === "mixed" &&
      newNode.meta &&
      Object.keys(newNode.meta).length > 0)
  ) {
    yield { newNode, oldAnchorHash: oldSerialized.anchorHash }
  }
  // Recurse into children by matching IDs
  if (oldSerialized.children) {
    for (const child of newNode.children) {
      const oldChild = oldSerialized.children[child.id]
      if (oldChild) {
        yield* matchInertNodes(child, oldChild)
      }
    }
  }
}

/**
 * Find a translation manifest entry whose values produce the given anchorHash.
 *
 * Tries multiple hash strategies to bridge the gap between the tree's
 * anchorHash computation (ALL meta keys including tagName) and the
 * content normalizer's placeholder format (may bundle attributes
 * differently or use different key names like url vs href).
 *
 * Strategies tried in order:
 * 1. Single value: hash(value)
 * 2. All values sorted: hash(sorted_keys.map(k => values[k]).join('\0'))
 * 3. Individual values: any single hash(v) matches (for bundled entries
 *    where the tree node is a leaf but the manifest groups parent attrs)
 */
function findManifestEntryByAnchorHash(
  manifest: LocaleTranslationManifest,
  oldAnchorHash: string,
  consumed: Set<string>
):
  | { id: string; entry: { type: string; values: Record<string, string> } }
  | undefined {
  for (const [id, entry] of Object.entries(manifest.placeholderMap)) {
    if (consumed.has(id)) continue
    const values = entry.values
    const keys = Object.keys(values)
    if (keys.length === 0) continue

    // Strategy 1: single value
    if (keys.length === 1) {
      if (treeHash(values[keys[0]]) === oldAnchorHash) {
        return { id, entry }
      }
      continue
    }

    // Strategy 2: all values sorted (matches computeHashes for multi-meta nodes)
    const metaValues = keys
      .sort()
      .map((k) => values[k])
      .join("\0")
    if (treeHash(metaValues) === oldAnchorHash) {
      return { id, entry }
    }

    // Strategy 3: any individual value matches (for bundled entries where
    // the normalizer groups parent+child attrs but the tree has separate
    // leaf nodes, e.g. component emoji stored with componentName)
    for (const v of Object.values(values)) {
      if (treeHash(v) === oldAnchorHash) {
        return { id, entry }
      }
    }
  }
  return undefined
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
