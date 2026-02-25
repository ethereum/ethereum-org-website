#!/usr/bin/env npx tsx
/**
 * Audits common.json translation namespace to identify:
 * 1. Unused keys (not referenced anywhere in the codebase)
 * 2. Page-specific keys (only used in one page, should be moved to page namespace)
 * 3. Keys used in multiple places (correctly in common)
 *
 * Run with: npx tsx src/scripts/i18n/audit-common-translations.ts
 * Options:
 *   --fix             Remove unused keys and move page-specific keys
 *   --json            Output results as JSON
 *   --verbose         Show all key usages
 */

import { readdir, readFile, writeFile } from "fs/promises"
import { dirname, extname, join, relative } from "path"
import { fileURLToPath } from "url"

import {
  EXACT_PATH_NAMESPACE_MAP,
  PREFIX_PATH_NAMESPACE_MAP,
} from "@/lib/utils/translations"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "../../..")
const INTL_DIR = join(ROOT, "src/intl")
const SEARCH_DIRS = [join(ROOT, "src"), join(ROOT, "app")]

const args = process.argv.slice(2)
const FIX_MODE = args.includes("--fix")
const JSON_OUTPUT = args.includes("--json")
const VERBOSE = args.includes("--verbose")

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"])
const APP_DIR = join(ROOT, "app/[locale]")

const DYNAMIC_KEY_PATTERNS = [/^language-/, /^region-/]

/**
 * Extract all URL slugs from the app directory structure.
 * These are used as breadcrumb translations via t(path) in Breadcrumbs component.
 */
async function getBreadcrumbSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>()

  async function scanDir(dir: string): Promise<void> {
    try {
      const entries = await readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const name = entry.name
          // Skip dynamic routes, private folders, and component folders (PascalCase)
          if (
            !name.startsWith("[") &&
            !name.startsWith("_") &&
            name[0] === name[0].toLowerCase()
          ) {
            slugs.add(name)
            await scanDir(join(dir, name))
          }
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
  }

  await scanDir(APP_DIR)
  return slugs
}

interface Usage {
  file: string
  line: number
  content: string
}

interface Categories {
  components: Usage[]
  layouts: Usage[]
  pages: Usage[]
  lib: Usage[]
  hooks: Usage[]
  other: Usage[]
}

interface Analysis {
  key: string
  usageCount: number
  usages?: Usage[]
  categories: {
    components: number
    layouts: number
    pages: number
    lib: number
    hooks: number
    other: number
  }
  uniquePages: string[]
  isDynamic: boolean
  recommendation: string
  reason: string
}

function getNamespaceForPath(pagePath: string): string | null {
  // Check exact matches first
  if (EXACT_PATH_NAMESPACE_MAP[pagePath]) {
    return EXACT_PATH_NAMESPACE_MAP[pagePath]
  }
  // Check prefix matches (order matters - more specific first)
  for (const [prefix, namespace] of PREFIX_PATH_NAMESPACE_MAP) {
    if (pagePath.startsWith(prefix)) {
      return namespace
    }
  }
  return null
}

async function getCommonKeys(): Promise<string[]> {
  const commonPath = join(INTL_DIR, "en/common.json")
  const common = JSON.parse(await readFile(commonPath, "utf-8"))
  return Object.keys(common)
}

async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "intl"
      )
        continue
      yield* walkDir(path)
    } else if (EXTENSIONS.has(extname(entry.name))) {
      yield path
    }
  }
}

async function buildSearchIndex(): Promise<Map<string, Usage[]>> {
  const index = new Map<string, Usage[]>()

  for (const dir of SEARCH_DIRS) {
    for await (const filePath of walkDir(dir)) {
      const content = await readFile(filePath, "utf-8")
      const lines = content.split("\n")

      lines.forEach((line, lineNum) => {
        const matches = line.matchAll(/["'`]([a-zA-Z][\w-]*(?:-[\w-]+)*)["'`]/g)
        for (const match of matches) {
          const key = match[1]
          if (!index.has(key)) {
            index.set(key, [])
          }
          index.get(key)!.push({
            file: relative(ROOT, filePath),
            line: lineNum + 1,
            content: line.trim().slice(0, 100),
          })
        }
      })
    }
  }

  return index
}

function categorizeByLocation(usages: Usage[]): Categories {
  const categories: Categories = {
    components: [],
    layouts: [],
    pages: [],
    lib: [],
    hooks: [],
    other: [],
  }

  for (const usage of usages) {
    if (usage.file.startsWith("src/components/")) {
      categories.components.push(usage)
    } else if (usage.file.startsWith("src/layouts/")) {
      categories.layouts.push(usage)
    } else if (usage.file.startsWith("app/")) {
      categories.pages.push(usage)
    } else if (usage.file.startsWith("src/lib/")) {
      categories.lib.push(usage)
    } else if (usage.file.startsWith("src/hooks/")) {
      categories.hooks.push(usage)
    } else {
      categories.other.push(usage)
    }
  }

  return categories
}

// Populated at runtime by main()
let breadcrumbSlugs: Set<string> = new Set()

function isDynamicKey(key: string): boolean {
  return (
    DYNAMIC_KEY_PATTERNS.some((pattern) => pattern.test(key)) ||
    breadcrumbSlugs.has(key)
  )
}

function getPageFromPath(filePath: string): string | null {
  const match = filePath.match(/app\/\[locale\]\/(.+?)\/page\.tsx/)
  if (match) return `/${match[1]}/`
  if (filePath.includes("app/[locale]/page.tsx")) return "/"
  return null
}

function analyzeKey(key: string, searchIndex: Map<string, Usage[]>): Analysis {
  const usages = searchIndex.get(key) || []
  const categories = categorizeByLocation(usages)
  const isDynamic = isDynamicKey(key)

  const uniquePages = new Set<string>()
  for (const usage of categories.pages) {
    const page = getPageFromPath(usage.file)
    if (page) uniquePages.add(page)
  }

  let recommendation = "keep"
  let reason = ""

  if (usages.length === 0 && !isDynamic) {
    recommendation = "unused"
    reason = "No usages found in codebase"
  } else if (
    categories.components.length > 0 ||
    categories.layouts.length > 0 ||
    categories.lib.length > 0
  ) {
    recommendation = "keep"
    reason = "Used in shared components/layouts/lib"
  } else if (isDynamic) {
    // Check dynamic BEFORE move-to-page since breadcrumb slugs appear only in one page
    recommendation = "keep-dynamic"
    reason = "Used dynamically (breadcrumb slug or pattern match)"
  } else if (
    usages.length > 0 &&
    categories.components.length === 0 &&
    categories.layouts.length === 0 &&
    categories.lib.length === 0 &&
    uniquePages.size === 1
  ) {
    recommendation = "move-to-page"
    reason = `Only used in ${[...uniquePages][0]}`
  } else if (uniquePages.size > 1) {
    recommendation = "keep"
    reason = `Used across ${uniquePages.size} pages`
  }

  return {
    key,
    usageCount: usages.length,
    usages: VERBOSE ? usages : undefined,
    categories: {
      components: categories.components.length,
      layouts: categories.layouts.length,
      pages: categories.pages.length,
      lib: categories.lib.length,
      hooks: categories.hooks.length,
      other: categories.other.length,
    },
    uniquePages: [...uniquePages],
    isDynamic,
    recommendation,
    reason,
  }
}

async function removeUnusedKeys(unusedKeys: string[]): Promise<void> {
  const locales = await readdir(INTL_DIR)

  for (const locale of locales) {
    const commonPath = join(INTL_DIR, locale, "common.json")
    try {
      const common = JSON.parse(await readFile(commonPath, "utf-8"))
      let removed = 0

      for (const key of unusedKeys) {
        if (common[key] !== undefined) {
          delete common[key]
          removed++
        }
      }

      if (removed > 0) {
        await writeFile(commonPath, JSON.stringify(common, null, 2) + "\n")
        console.log(`  ${locale}: removed ${removed} unused keys`)
      }
    } catch {
      console.warn(`  Skipping ${locale}: could not process`)
    }
  }
}

async function movePageSpecificKeys(keysToMove: Analysis[]): Promise<void> {
  // Group keys by target namespace
  const keysByNamespace = new Map<string, string[]>()
  for (const item of keysToMove) {
    const pagePath = item.uniquePages[0]
    const namespace = getNamespaceForPath(pagePath)
    if (!namespace) {
      console.warn(
        `  ⚠️  No namespace mapping for ${pagePath}, skipping ${item.key}`
      )
      continue
    }
    if (!keysByNamespace.has(namespace)) {
      keysByNamespace.set(namespace, [])
    }
    keysByNamespace.get(namespace)!.push(item.key)
  }

  if (keysByNamespace.size === 0) {
    console.log("  No keys to move (no namespace mappings found)")
    return
  }

  const locales = await readdir(INTL_DIR)

  for (const locale of locales) {
    const commonPath = join(INTL_DIR, locale, "common.json")
    let common: Record<string, string>
    try {
      common = JSON.parse(await readFile(commonPath, "utf-8"))
    } catch {
      continue
    }

    let totalMoved = 0

    for (const [namespace, keys] of keysByNamespace) {
      const namespacePath = join(INTL_DIR, locale, `${namespace}.json`)
      let namespaceData: Record<string, string> = {}

      try {
        namespaceData = JSON.parse(await readFile(namespacePath, "utf-8"))
      } catch {
        // File doesn't exist, will create it
      }

      let moved = 0
      for (const key of keys) {
        // Only move if key exists in common and doesn't already exist in target
        if (common[key] !== undefined && namespaceData[key] === undefined) {
          namespaceData[key] = common[key]
          delete common[key]
          moved++
        } else if (
          common[key] !== undefined &&
          namespaceData[key] !== undefined
        ) {
          // Key exists in both - just remove from common
          delete common[key]
        }
      }

      if (moved > 0) {
        // Save namespace file (preserve key order, new keys added at end)
        await writeFile(
          namespacePath,
          JSON.stringify(namespaceData, null, 2) + "\n"
        )
        totalMoved += moved
      }
    }

    if (totalMoved > 0) {
      // Save common.json (preserve key order)
      await writeFile(commonPath, JSON.stringify(common, null, 2) + "\n")
      console.log(`  ${locale}: moved ${totalMoved} keys`)
    }
  }

  // Print summary of moves
  console.log("\n  Moved keys by namespace:")
  for (const [namespace, keys] of keysByNamespace) {
    console.log(`    ${namespace}: ${keys.length} keys`)
  }
}

async function main(): Promise<void> {
  console.log("Auditing common.json translations...\n")

  // Load breadcrumb slugs from app directory structure
  breadcrumbSlugs = await getBreadcrumbSlugs()
  console.log(`Found ${breadcrumbSlugs.size} breadcrumb slugs from app routes`)

  const commonKeys = await getCommonKeys()

  console.log(`Found ${commonKeys.length} keys in common.json`)
  console.log("\nBuilding search index...")

  const searchIndex = await buildSearchIndex()
  console.log(`Indexed ${searchIndex.size} unique strings from codebase\n`)

  const results = {
    unused: [] as Analysis[],
    moveToPage: [] as Analysis[],
    keepDynamic: [] as Analysis[],
    keep: [] as Analysis[],
  }

  for (const key of commonKeys) {
    const analysis = analyzeKey(key, searchIndex)

    switch (analysis.recommendation) {
      case "unused":
        results.unused.push(analysis)
        break
      case "move-to-page":
        results.moveToPage.push(analysis)
        break
      case "keep-dynamic":
        results.keepDynamic.push(analysis)
        break
      default:
        results.keep.push(analysis)
    }
  }

  if (JSON_OUTPUT) {
    console.log(JSON.stringify(results, null, 2))
    return
  }

  console.log("=".repeat(60))
  console.log("AUDIT RESULTS")
  console.log("=".repeat(60))

  console.log(`\n🗑️  UNUSED KEYS (${results.unused.length}):`)
  console.log("   These keys have no references in the codebase")
  if (results.unused.length > 0) {
    for (const item of results.unused.slice(0, 30)) {
      console.log(`   - ${item.key}`)
    }
    if (results.unused.length > 30) {
      console.log(`   ... and ${results.unused.length - 30} more`)
    }
  } else {
    console.log("   None found!")
  }

  console.log(`\n📦 PAGE-SPECIFIC KEYS (${results.moveToPage.length}):`)
  console.log("   Consider moving these to page-specific namespaces")
  if (results.moveToPage.length > 0) {
    for (const item of results.moveToPage) {
      console.log(`   - ${item.key} → ${item.reason}`)
    }
  } else {
    console.log("   None found!")
  }

  console.log(`\n🔄 DYNAMIC KEYS (${results.keepDynamic.length}):`)
  console.log("   Used dynamically, keep in common")
  if (results.keepDynamic.length > 0) {
    for (const item of results.keepDynamic) {
      console.log(`   - ${item.key}`)
    }
  }

  console.log(`\n✅ CORRECTLY IN COMMON (${results.keep.length}):`)
  console.log("   Used across multiple components/pages")
  if (VERBOSE && results.keep.length > 0) {
    for (const item of results.keep.slice(0, 20)) {
      console.log(`   - ${item.key} (${item.usageCount} usages)`)
    }
    if (results.keep.length > 20) {
      console.log(`   ... and ${results.keep.length - 20} more`)
    }
  }

  console.log(`\n${"=".repeat(60)}`)
  console.log("SUMMARY")
  console.log("=".repeat(60))
  console.log(`Total keys in common.json: ${commonKeys.length}`)
  console.log(`  ✅ Correctly placed: ${results.keep.length}`)
  console.log(`  🔄 Dynamic (keep): ${results.keepDynamic.length}`)
  console.log(`  📦 Could move to page: ${results.moveToPage.length}`)
  console.log(`  🗑️  Unused: ${results.unused.length}`)

  if (results.unused.length > 0) {
    const unusedSize = results.unused.length * 50
    console.log(
      `\n💡 Removing unused keys could save ~${unusedSize} bytes per locale`
    )

    if (FIX_MODE) {
      console.log("\n🔧 Removing unused keys...")
      await removeUnusedKeys(results.unused.map((r) => r.key))
    } else {
      console.log("\n   Run with --fix to remove unused keys")
    }
  }

  if (results.moveToPage.length > 0) {
    const moveSize = results.moveToPage.length * 50
    console.log(
      `\n💡 Moving page-specific keys could save ~${moveSize} bytes per locale`
    )

    if (FIX_MODE) {
      console.log("\n📦 Moving page-specific keys...")
      await movePageSpecificKeys(results.moveToPage)
    } else {
      console.log("\n   Run with --fix to move page-specific keys")
    }
  }
}

main().catch(console.error)
