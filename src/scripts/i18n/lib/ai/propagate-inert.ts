/**
 * Propagate inert-value changes from English to translated files.
 *
 * When English changes a URL, image path, inline code, component
 * attribute, or other non-translatable value without changing
 * translatable content, this script updates all translated files
 * deterministically -- no Gemini needed.
 *
 * Detection uses intl-content-tree's extractInertChanges() with
 * git-based old English retrieval (sourceCommitSha in manifest).
 *
 * Replacement is section-scoped and occurrence-counted:
 * 1. Parse the tree path to find the narrowest heading section
 * 2. Within that section's text range, count to the Nth occurrence
 *    of the element type (matching the tree's DFS order)
 * 3. Verify the value, replace only that single occurrence
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

export interface InertChange {
  /** Element type (link, image, inline-code, component-attribute, etc.) */
  elementType: string
  /** The attribute/value key that changed */
  key: string
  /** Old value (from old English tree) */
  oldValue: string
  /** New value (from current English) */
  newValue: string
  /** Full tree path (e.g., "dev-env/what-is-gas/component:4/attr:emoji") */
  path: string
  /** Component tag name (e.g., "YouTube", "InfoBanner") */
  tagName?: string
}

// ---------------------------------------------------------------------------
// Core: detect inert changes
// ---------------------------------------------------------------------------

/**
 * Compare current English against a stored source manifest. Returns a
 * list of inert values that changed, with full context (element type,
 * attribute name, old/new values, tree path).
 *
 * Uses the manifest's sourceCommitSha to fetch the old English content
 * via the GitHub API, giving us a fully parsed old tree with real values.
 */
export async function detectInertChanges(
  englishContent: string,
  sourceManifestJson: string,
  format: "markdown" | "json" = "markdown",
  oldEnglishContent?: string
): Promise<InertChange[]> {
  const oldManifest: TreeManifest & { sourceCommitSha?: string } =
    JSON.parse(sourceManifestJson)
  const deserialized = deserialize(oldManifest)
  const newTree =
    format === "json"
      ? parseEnglishJson(englishContent)
      : parseEnglishMarkdown(englishContent)
  const driftResult = diff(deserialized, newTree)

  // Build the old tree with real values (needed by extractInertChanges).
  // Priority: direct content > git history > deserialized (hashes only)
  let oldTree = deserialized
  let oldContent = oldEnglishContent
  if (!oldContent && oldManifest.sourceCommitSha && oldManifest.sourceFile) {
    // Lazy import to avoid pulling in GitHub config at module load time
    // (which requires I18N_GITHUB_API_KEY and breaks unit tests)
    const { fetchFileAtCommit } = await import("../github/files")
    oldContent = await fetchFileAtCommit(
      oldManifest.sourceFile,
      oldManifest.sourceCommitSha
    )
  }
  if (oldContent) {
    oldTree =
      format === "json"
        ? parseEnglishJson(oldContent)
        : parseEnglishMarkdown(oldContent)
  }

  const treeChanges = extractFromTree(oldTree, newTree, driftResult)

  // Deduplicate: the package can return the same change multiple times
  // (e.g., when a section appears in both inertDrift paths)
  const seen = new Set<string>()
  return treeChanges
    .map((c) => ({
      elementType: c.elementType,
      key: c.key || "value",
      oldValue: c.oldValue,
      newValue: c.newValue,
      path: c.path,
      tagName: c.tagName,
    }))
    .filter((c) => {
      const key = `${c.path}:${c.oldValue}:${c.newValue}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

// ---------------------------------------------------------------------------
// Core: apply changes to a locale file
// ---------------------------------------------------------------------------

/**
 * Apply inert changes to a translated file. Returns the modified content
 * and lists of which changes were applied vs skipped (for manifest updates).
 *
 * For markdown: section-scoped, occurrence-counted, value-verified.
 * For JSON: key-navigated, occurrence-counted within value string.
 */
export function applyInertChanges(
  translatedContent: string,
  changes: InertChange[],
  format: "markdown" | "json" = "markdown"
): { content: string; applied: InertChange[]; skipped: InertChange[] } {
  if (format === "json") {
    return applyInertChangesJson(translatedContent, changes)
  }
  return applyInertChangesMarkdown(translatedContent, changes)
}

// ---------------------------------------------------------------------------
// Markdown: section-scoped replacement
// ---------------------------------------------------------------------------

function applyInertChangesMarkdown(
  content: string,
  changes: InertChange[]
): { content: string; applied: InertChange[]; skipped: InertChange[] } {
  const applied: InertChange[] = []
  const skipped: InertChange[] = []

  for (const change of changes) {
    const scope = extractSectionScope(content, change.path)
    const occurrence = extractOccurrenceIndex(change.path, change.elementType)

    const result = replaceNthInScope(
      content,
      scope,
      change.oldValue,
      change.newValue,
      change.elementType,
      change.key,
      occurrence
    )

    if (result.replaced) {
      content = result.content
      applied.push(change)
    } else {
      skipped.push(change)
    }
  }

  return { content, applied, skipped }
}

/**
 * Extract the character range of the narrowest section that contains
 * the target node. Code-fence-aware: headings inside fences are ignored.
 */
function extractSectionScope(
  content: string,
  path: string
): { start: number; end: number } {
  // Frontmatter scope
  if (path.startsWith("frontmatter:")) {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (fmMatch) {
      return { start: 4, end: 4 + fmMatch[1].length }
    }
    return { start: 0, end: 0 }
  }

  // Preamble scope (content between frontmatter and first heading)
  if (path.startsWith("prose:0")) {
    const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/)
    const fmEnd = fmMatch ? fmMatch[0].length : 0
    const lines = content.split("\n")
    let firstHeadingPos = content.length
    let inFence = false
    let pos = 0
    for (const line of lines) {
      if (pos >= fmEnd) {
        if (line.startsWith("```")) inFence = !inFence
        if (!inFence && /^#{1,6}\s/.test(line)) {
          firstHeadingPos = pos
          break
        }
      }
      pos += line.length + 1
    }
    return { start: fmEnd, end: firstHeadingPos }
  }

  // Section scope: walk path segments to find innermost heading
  const segments = path.split("/")
  const headingIds: string[] = []
  for (const seg of segments) {
    // Stop at element-type segments (link:0, component:1, etc.)
    if (
      seg.match(
        /^(link|image|html-tag|component|attr|prose|inline-code|icu|code-fence|code-comment|code-body|table):/
      )
    ) {
      break
    }
    // Skip non-heading segments like _label
    if (!seg.startsWith("_")) {
      headingIds.push(seg)
    }
  }

  // Find the narrowest heading section
  let scopeStart = 0
  let scopeEnd = content.length

  for (const headingId of headingIds) {
    const range = findHeadingRange(content, headingId, scopeStart, scopeEnd)
    if (range) {
      scopeStart = range.start
      scopeEnd = range.end
    }
  }

  return { start: scopeStart, end: scopeEnd }
}

/**
 * Find a heading's content range within a portion of the document.
 * Code-fence-aware: skips headings inside fenced code blocks.
 * Returns the range from the heading line to the next heading of
 * same-or-higher level (or the end of the search range).
 */
function findHeadingRange(
  content: string,
  headingId: string,
  searchStart: number,
  searchEnd: number
): { start: number; end: number } | null {
  const lines = content.substring(searchStart, searchEnd).split("\n")
  const pattern = new RegExp(`\\{#${escapeRegex(headingId)}\\}`)
  let inFence = false
  let headingLine = -1
  let headingLevel = 0
  let pos = searchStart

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith("```")) inFence = !inFence

    if (!inFence && pattern.test(line)) {
      const levelMatch = line.match(/^(#{1,6})\s/)
      if (levelMatch) {
        headingLine = i
        headingLevel = levelMatch[1].length
        pos += line.length + 1
        break
      }
    }
    pos += line.length + 1
  }

  if (headingLine === -1) return null

  // Find end: next heading of same-or-higher level
  const headingStart = pos - lines[headingLine].length - 1
  inFence = false
  for (let i = headingLine + 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith("```")) inFence = !inFence
    if (!inFence) {
      const levelMatch = line.match(/^(#{1,6})\s/)
      if (levelMatch && levelMatch[1].length <= headingLevel) {
        return { start: headingStart, end: pos }
      }
    }
    pos += line.length + 1
  }

  return { start: headingStart, end: searchEnd }
}

/**
 * Extract the occurrence index from the path.
 * E.g., "dev-env/link:1" -> 1
 *
 * For most element types, the index is the number in the element's
 * own segment (link:1 = 2nd link). For component-attribute and
 * frontmatter-field, return 0 -- the attribute value + key name is
 * already unique within the section scope, so no occurrence counting
 * is needed (key="specificValue" matches exactly one element).
 */
function extractOccurrenceIndex(path: string, elementType: string): number {
  // Component attributes and frontmatter fields are unique by key+value
  if (
    elementType === "component-attribute" ||
    elementType === "frontmatter-field"
  ) {
    return 0
  }

  const segments = path.split("/")
  for (let i = segments.length - 1; i >= 0; i--) {
    const match = segments[i].match(/^([^:]+):(\d+)$/)
    if (match) {
      const segType = match[1]
      if (
        (elementType === "link" && segType === "link") ||
        (elementType === "image" && segType === "image") ||
        (elementType === "html-tag" && segType === "html-tag") ||
        (elementType === "inline-code" && segType === "inline-code") ||
        (elementType === "code-body" && segType === "code-body") ||
        (elementType === "code-fence" && segType === "code-fence")
      ) {
        return parseInt(match[2])
      }
    }
  }
  return 0
}

// ---------------------------------------------------------------------------
// JSON: path-navigated replacement
// ---------------------------------------------------------------------------

function applyInertChangesJson(
  content: string,
  changes: InertChange[]
): { content: string; applied: InertChange[]; skipped: InertChange[] } {
  const obj = JSON.parse(content)
  const applied: InertChange[] = []
  const skipped: InertChange[] = []

  for (const change of changes) {
    // Split path into key segments and element suffix.
    // E.g., "nested/subsection/hint/html-tag:0" ->
    //   keySegments = ["nested", "subsection", "hint"]
    //   elementSuffix = "html-tag:0"
    const segments = change.path.split("/")
    const keySegments: string[] = []
    let elementSuffix = ""
    for (const seg of segments) {
      if (
        seg.match(
          /^(html-tag|link|image|icu|prose|inline-code|code-fence|code-body):/
        )
      ) {
        elementSuffix = seg
        break
      }
      keySegments.push(seg)
    }

    // Navigate to the JSON key
    const target = navigateJsonPath(obj, keySegments)
    if (
      typeof target.value !== "string" ||
      !target.value.includes(change.oldValue)
    ) {
      skipped.push(change)
      continue
    }

    // Extract occurrence index from element suffix
    const occMatch = elementSuffix.match(/:(\d+)$/)
    const occurrence = occMatch ? parseInt(occMatch[1]) : 0

    // Replace Nth occurrence within this specific string value
    const updated = replaceNthInStringByType(
      target.value,
      change.oldValue,
      change.newValue,
      change.elementType,
      change.key,
      occurrence
    )

    if (updated !== target.value) {
      setJsonValue(obj, keySegments, updated)
      applied.push(change)
    } else {
      skipped.push(change)
    }
  }

  return {
    content: JSON.stringify(obj, null, 2) + "\n",
    applied,
    skipped,
  }
}

/** Navigate a parsed JSON object by key path segments. Returns the value and parent. */
function navigateJsonPath(
  obj: Record<string, unknown>,
  keySegments: string[]
): { value: unknown; parent: Record<string, unknown>; key: string } {
  let current: Record<string, unknown> = obj
  for (let i = 0; i < keySegments.length - 1; i++) {
    const next = current[keySegments[i]]
    if (typeof next !== "object" || next === null || Array.isArray(next)) {
      return { value: undefined, parent: current, key: keySegments[i] }
    }
    current = next as Record<string, unknown>
  }
  const lastKey = keySegments[keySegments.length - 1]
  return { value: current[lastKey], parent: current, key: lastKey }
}

/** Set a value in a parsed JSON object by key path segments. */
function setJsonValue(
  obj: Record<string, unknown>,
  keySegments: string[],
  value: string
): void {
  let current: Record<string, unknown> = obj
  for (let i = 0; i < keySegments.length - 1; i++) {
    current = current[keySegments[i]] as Record<string, unknown>
  }
  current[keySegments[keySegments.length - 1]] = value
}

// ---------------------------------------------------------------------------
// Shared: Nth-occurrence replacement by element type
// ---------------------------------------------------------------------------

/**
 * Replace the Nth occurrence of oldValue within a string, scoped by
 * element-type context. Used by both markdown (within a section slice)
 * and JSON (within a key's value string).
 */
function replaceNthInStringByType(
  text: string,
  oldValue: string,
  newValue: string,
  elementType: string,
  key: string,
  occurrence: number
): string {
  const pattern = buildContextPattern(oldValue, elementType, key)
  if (!pattern) {
    // No context pattern available -- fall back to Nth raw substring
    return replaceNthSubstring(text, oldValue, newValue, occurrence)
  }

  // Count matches to find the Nth one
  let matchIndex = 0
  return text.replace(pattern, (match, ...args) => {
    if (matchIndex++ === occurrence) {
      return buildReplacement(newValue, elementType, args)
    }
    return match
  })
}

/**
 * Build a context-specific regex for finding an inert value within its
 * structural context. Always uses the `g` flag for counting.
 */
function buildContextPattern(
  oldValue: string,
  elementType: string,
  key: string
): RegExp | null {
  const escaped = escapeRegex(oldValue)
  const escapedKey = escapeRegex(key)

  switch (elementType) {
    case "link":
      return new RegExp(
        `(\\]\\()${escaped}(\\))|(href=["'])${escaped}(["'])`,
        "g"
      )
    case "image":
      return new RegExp(`(!\\[(?:[^\\]]|\\\\\\])*\\]\\()${escaped}(\\))`, "g")
    case "html-tag":
      return new RegExp(`(${escapedKey}=["'])${escaped}(["'])`, "g")
    case "component-attribute":
      // Try all JSX syntaxes: key="val", key={val}, key={{val}}
      return new RegExp(
        `(${escapedKey}=["'])${escaped}(["'])` +
          `|(${escapedKey}=\\{)${escaped}(\\})` +
          `|(${escapedKey}=\\{\\{)${escaped}(\\}\\})`,
        "g"
      )
    case "frontmatter-field":
      return new RegExp(`(^${escapedKey}:\\s*)${escaped}(\\s*$)`, "gm")
    case "inline-code":
      return new RegExp(`(\`)${escaped}(\`)`, "g")
    case "icu-variable":
      // Match within ICU braces: {oldValue} or {oldValue,
      return new RegExp(`(\\{)${escaped}(\\}|,)`, "g")
    case "code-body":
      // For code-body, we need special handling (scope to fences)
      return null // handled by replaceNthSubstring within fence scope
    default:
      return null
  }
}

/**
 * Build the replacement string from a regex match, preserving the
 * structural context (capture groups). Uses callback approach to
 * prevent $ injection.
 */
function buildReplacement(
  newValue: string,
  elementType: string,
  groups: unknown[]
): string {
  switch (elementType) {
    case "link": {
      const [mdPre, mdPost, hrefPre, hrefPost] = groups as (
        | string
        | undefined
      )[]
      if (mdPre) return `${mdPre}${newValue}${mdPost}`
      if (hrefPre) return `${hrefPre}${newValue}${hrefPost}`
      return newValue
    }
    case "image":
    case "html-tag":
    case "inline-code":
    case "frontmatter-field": {
      const [pre, post] = groups as string[]
      return `${pre}${newValue}${post}`
    }
    case "component-attribute": {
      // 6 groups: (strPre, strPost, exprPre, exprPost, objPre, objPost)
      const [strPre, strPost, exprPre, exprPost, objPre, objPost] = groups as (
        | string
        | undefined
      )[]
      if (strPre) return `${strPre}${newValue}${strPost}`
      if (exprPre) return `${exprPre}${newValue}${exprPost}`
      if (objPre) return `${objPre}${newValue}${objPost}`
      return newValue
    }
    case "icu-variable": {
      const [pre, post] = groups as string[]
      return `${pre}${newValue}${post}`
    }
    default:
      return newValue
  }
}

/** Replace the Nth occurrence of a plain substring. */
function replaceNthSubstring(
  text: string,
  oldValue: string,
  newValue: string,
  occurrence: number
): string {
  let count = 0
  let pos = 0
  while (pos < text.length) {
    const idx = text.indexOf(oldValue, pos)
    if (idx === -1) break
    if (count === occurrence) {
      return (
        text.substring(0, idx) +
        newValue +
        text.substring(idx + oldValue.length)
      )
    }
    count++
    pos = idx + 1
  }
  return text // not found at occurrence index
}

/**
 * Replace the Nth occurrence of an inert value within a scoped content range.
 * Extracts the slice, runs occurrence-counted replacement, reconstructs.
 */
function replaceNthInScope(
  content: string,
  scope: { start: number; end: number },
  oldValue: string,
  newValue: string,
  elementType: string,
  key: string,
  occurrence: number
): { content: string; replaced: boolean } {
  if (scope.start >= scope.end) {
    return { content, replaced: false }
  }

  const slice = content.substring(scope.start, scope.end)

  // For code-body: special handling -- only replace within fences in the slice
  let replaced: string
  if (elementType === "code-body") {
    let found = false
    replaced = slice.replace(
      /(```[^\n]*\n)([\s\S]*?)(```)/g,
      (match, open, body, close) => {
        if (found) return match
        const updated = replaceNthSubstring(
          body,
          oldValue,
          newValue,
          occurrence
        )
        if (updated !== body) {
          found = true
          return `${open}${updated}${close}`
        }
        return match
      }
    )
    if (!found) return { content, replaced: false }
  } else {
    replaced = replaceNthInStringByType(
      slice,
      oldValue,
      newValue,
      elementType,
      key,
      occurrence
    )
  }

  if (replaced === slice) {
    return { content, replaced: false }
  }

  return {
    content:
      content.substring(0, scope.start) +
      replaced +
      content.substring(scope.end),
    replaced: true,
  }
}

// ---------------------------------------------------------------------------
// Core: update translation manifest after propagation
// ---------------------------------------------------------------------------

/**
 * Update the translation manifest to reflect propagated inert changes.
 * Matches placeholder entries by old value and element type (scoped).
 * Only updates entries for changes that were actually applied.
 */
export function updateTranslationManifest(
  manifest: LocaleTranslationManifest,
  appliedChanges: InertChange[],
  newEnglishManifestHash: string
): LocaleTranslationManifest {
  const updated = { ...manifest }
  updated.englishManifestHash = newEnglishManifestHash
  updated.translatedAt = new Date().toISOString()

  const newMap = { ...updated.placeholderMap }
  for (const change of appliedChanges) {
    // Find the placeholder entry by matching old value + element type
    for (const [id, entry] of Object.entries(newMap)) {
      if (entry.type !== change.elementType) continue
      const newValues = { ...entry.values }
      let changed = false
      for (const [k, v] of Object.entries(newValues)) {
        if (v === change.oldValue) {
          newValues[k] = change.newValue
          changed = true
          break // only update one match per change
        }
      }
      if (changed) {
        newMap[id] = { ...entry, values: newValues }
        break // move to next change
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

    const changes = await detectInertChanges(englishContent, sourceManifestJson)

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
    if (applied.length > 0) {
      const newSourceManifest = buildMarkdownManifest(englishContent, filePath)

      if (existsSync(translationManifestPath)) {
        const translationManifest: LocaleTranslationManifest = JSON.parse(
          readFileSync(translationManifestPath, "utf-8")
        )
        const newSourceParsed = JSON.parse(newSourceManifest)
        const updatedTranslationManifest = updateTranslationManifest(
          translationManifest,
          applied,
          newSourceParsed.rootHash
        )
        writeFileSync(
          translationManifestPath,
          JSON.stringify(updatedTranslationManifest, null, 2) + "\n"
        )
      }

      // Only stamp source manifest if ALL changes applied
      if (skipped.length === 0) {
        writeFileSync(sourceManifestPath, newSourceManifest)
      }

      writeFileSync(join(rootDir, translationPath), content)
    }

    totalApplied += applied.length
    totalSkipped += skipped.length
    console.log(
      `  [${locale}] ${applied.length} applied, ${skipped.length} skipped`
    )
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
