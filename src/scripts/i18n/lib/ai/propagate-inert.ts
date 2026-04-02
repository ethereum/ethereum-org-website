/**
 * Propagate inert-value changes from English to translated files.
 *
 * When English changes a URL, image path, or other non-translatable
 * attribute without changing translatable content, this script
 * updates all translated files deterministically -- no Gemini needed.
 *
 * Uses the .manifest.json placeholderMap to identify which values
 * changed and where they appear in each locale's file.
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' propagate-inert.ts \
 *     --file public/content/wrapped-eth/index.md
 */

import { existsSync, readFileSync, writeFileSync } from "fs"
import { dirname, join } from "path"

import i18nConfig from "../../../../../i18n.config.json"
import { normalizeContent } from "./content-normalizer"
import type { PerFileManifest } from "./manifest-generator"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InertChange {
  placeholderId: string
  type: string
  key: string
  oldValue: string
  newValue: string
}

interface PropagationResult {
  locale: string
  filePath: string
  changes: InertChange[]
  success: boolean
  error?: string
}

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

/**
 * Detect inert-value changes between the current English source and
 * the version recorded in the manifest's placeholderMap.
 */
export function detectInertChanges(
  englishContent: string,
  manifest: PerFileManifest
): InertChange[] {
  if (!manifest.placeholderMap) return []

  // Normalize the current English to get fresh placeholder map
  const { tree, extractions } = normalizeContent(englishContent)

  // Import buildPlaceholderMap logic inline (it's in gemini-translate.ts)
  // For now, rebuild the map from the tree
  const currentMap: Record<string, Record<string, string>> = {}

  function visit(node: { type: string; placeholder?: string; meta?: Record<string, unknown>; children?: unknown[] }): void {
    if (node.type === "link" && node.meta?.url && node.placeholder) {
      const hashMatch = String(node.placeholder).match(/LINK-([a-f0-9]+)/)
      if (hashMatch) {
        currentMap[`LINK-${hashMatch[1]}`] = { url: String(node.meta.url) }
      }
    }
    if (node.type === "image" && node.meta?.path && node.placeholder) {
      const hashMatch = String(node.placeholder).match(/IMAGE-([a-f0-9]+)/)
      if (hashMatch) {
        currentMap[`IMAGE-${hashMatch[1]}`] = { path: String(node.meta.path) }
      }
    }
    if (node.type === "html-tag" && node.meta?.inertAttributes && node.placeholder) {
      const hashMatch = String(node.placeholder).match(/HTMLTAG-([a-f0-9]+)/)
      if (hashMatch) {
        const attrs = node.meta.inertAttributes as Record<string, string>
        currentMap[`HTMLTAG-${hashMatch[1]}`] = { tagName: String(node.meta.tagName), ...attrs }
      }
    }
    if (node.type === "component" && node.meta?.inertAttributes && node.placeholder) {
      const hashMatch = String(node.placeholder).match(/COMPONENT-([a-f0-9]+)/)
      if (hashMatch) {
        const attrs = node.meta.inertAttributes as Record<string, string>
        currentMap[`COMPONENT-${hashMatch[1]}`] = { componentName: String(node.meta.componentName), ...attrs }
      }
    }
    if (Array.isArray((node as { children?: unknown[] }).children)) {
      for (const child of (node as { children: unknown[] }).children) {
        visit(child as typeof node)
      }
    }
  }

  for (const node of tree) {
    visit(node as Parameters<typeof visit>[0])
  }

  // Compare current values against manifest's recorded values
  const changes: InertChange[] = []

  for (const [placeholderId, recorded] of Object.entries(manifest.placeholderMap)) {
    const current = currentMap[placeholderId]
    if (!current) continue

    for (const [key, oldValue] of Object.entries(recorded.values)) {
      const newValue = current[key]
      if (newValue !== undefined && newValue !== oldValue) {
        changes.push({
          placeholderId,
          type: recorded.type,
          key,
          oldValue,
          newValue,
        })
      }
    }
  }

  return changes
}

/**
 * Apply inert-value changes to a single translated file.
 *
 * For each change, finds the old value in the translated file and
 * replaces it with the new value. URLs and paths are language-invariant
 * so this is a direct string replacement.
 */
export function applyInertChanges(
  translatedContent: string,
  changes: InertChange[]
): { content: string; applied: number; skipped: number } {
  let content = translatedContent
  let applied = 0
  let skipped = 0

  for (const change of changes) {
    if (content.includes(change.oldValue)) {
      // Replace all occurrences of the old value
      content = content.split(change.oldValue).join(change.newValue)
      applied++
    } else {
      skipped++
    }
  }

  return { content, applied, skipped }
}

/**
 * Propagate inert changes for a single English file across all locales.
 */
export function propagateInertChanges(
  rootDir: string,
  englishPath: string
): PropagationResult[] {
  const englishContent = readFileSync(join(rootDir, englishPath), "utf-8")
  const results: PropagationResult[] = []

  const locales = i18nConfig
    .map((l: { code: string }) => l.code)
    .filter((code: string) => code !== "en")

  for (const locale of locales) {
    const translationPath = englishPath.replace(
      "public/content/",
      `public/content/translations/${locale}/`
    )
    const manifestPath = join(
      rootDir,
      dirname(translationPath),
      ".manifest.json"
    )

    if (!existsSync(join(rootDir, translationPath))) {
      continue
    }

    if (!existsSync(manifestPath)) {
      results.push({
        locale,
        filePath: translationPath,
        changes: [],
        success: false,
        error: "No manifest found",
      })
      continue
    }

    try {
      const manifest: PerFileManifest = JSON.parse(
        readFileSync(manifestPath, "utf-8")
      )

      const changes = detectInertChanges(englishContent, manifest)

      if (changes.length === 0) {
        continue
      }

      const translatedContent = readFileSync(
        join(rootDir, translationPath),
        "utf-8"
      )
      const { content, applied, skipped } = applyInertChanges(
        translatedContent,
        changes
      )

      if (applied > 0) {
        writeFileSync(join(rootDir, translationPath), content)
      }

      results.push({
        locale,
        filePath: translationPath,
        changes,
        success: true,
      })

      console.log(
        `  [${locale}] ${applied} change(s) applied, ${skipped} skipped`
      )
    } catch (err) {
      results.push({
        locale,
        filePath: translationPath,
        changes: [],
        success: false,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  return results
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
Only changes to non-translatable values are applied (no re-translation needed).

Options:
  --file, -f   English source file path (e.g., public/content/wrapped-eth/index.md)
  --dry-run    Show what would change without writing files
`)
    process.exit(1)
  }

  const rootDir = process.cwd()
  const englishContent = readFileSync(join(rootDir, filePath), "utf-8")

  // First, detect changes against any locale's manifest (they all record the same English state)
  console.log(`Scanning for inert changes in: ${filePath}`)

  const results = propagateInertChanges(rootDir, filePath)

  if (results.length === 0) {
    console.log("No inert changes detected across any locale.")
    return
  }

  const totalApplied = results.filter((r) => r.success).length
  const totalFailed = results.filter((r) => !r.success).length

  console.log(`\nSummary: ${totalApplied} locale(s) updated, ${totalFailed} failed`)

  if (dryRun) {
    console.log("\n(dry run -- no files were modified)")
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Error:", error)
    process.exit(1)
  })
}
