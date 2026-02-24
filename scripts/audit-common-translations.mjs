#!/usr/bin/env node
/**
 * Audits common.json translation namespace to identify:
 * 1. Unused keys (not referenced anywhere in the codebase)
 * 2. Page-specific keys (only used in one page, should be moved to page namespace)
 * 3. Keys used in multiple places (correctly in common)
 *
 * Run with: node scripts/audit-common-translations.mjs
 * Options:
 *   --fix             Remove unused keys and move page-specific keys
 *   --json            Output results as JSON
 *   --verbose         Show all key usages
 */

import { readdir, readFile, writeFile } from "fs/promises"
import { join, relative, extname } from "path"

const ROOT = new URL("..", import.meta.url).pathname
const INTL_DIR = join(ROOT, "src/intl")
const SEARCH_DIRS = [join(ROOT, "src"), join(ROOT, "app")]

const args = process.argv.slice(2)
const FIX_MODE = args.includes("--fix")
const JSON_OUTPUT = args.includes("--json")
const VERBOSE = args.includes("--verbose")

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"])

const DYNAMIC_KEY_PATTERNS = [/^language-/, /^region-/]

// Path to namespace mappings (from src/lib/utils/translations.ts)
const EXACT_PATH_NAMESPACE_MAP = {
  "/": "page-index",
  "/10years/": "page-10-year-anniversary",
  "/assets/": "page-assets",
  "/collectibles/": "page-collectibles",
  "/contributing/translation-program/acknowledgements/":
    "page-contributing-translation-program-acknowledgements",
  "/contributing/translation-program/contributors/":
    "page-contributing-translation-program-contributors",
  "/enterprise/": "page-enterprise",
  "/ethereum-history-founder-and-ownership/":
    "page-ethereum-history-founder-and-ownership",
  "/ethereum-vs-bitcoin/": "page-ethereum-vs-bitcoin",
  "/founders/": "page-founders",
  "/get-eth/": "page-get-eth",
  "/bug-bounty/": "page-bug-bounty",
  "/quizzes/": "learn-quizzes",
  "/trillion-dollar-security/": "page-trillion-dollar-security",
  "/wallets/find-wallet/": "page-wallets-find-wallet",
  "/wallets/": "page-wallets",
  "/what-is-ether/": "page-what-is-ether",
  "/what-is-the-ethereum-network/": "page-what-is-the-ethereum-network",
}

const PREFIX_PATH_NAMESPACE_MAP = [
  ["/staking/deposit-contract/", "page-staking-deposit-contract"],
  ["/staking/", "page-staking"],
  ["/layer-2/networks/", "page-layer-2-networks"],
  ["/layer-2/learn/", "page-layer-2-learn"],
  ["/layer-2/", "page-layer-2"],
  ["/developers/local-environment/", "page-developers-local-environment"],
  ["/developers/learning-tools/", "page-developers-learning-tools"],
  ["/developers/tutorials/", "page-developers-tutorials"],
  ["/developers/", "page-developers-index"],
  ["/contributing/translation-program/translatathon/", "page-translatathon"],
  ["/community/events/", "page-community-events"],
  ["/community/", "page-community"],
  ["/apps/", "page-apps"],
  ["/energy-consumption/", "page-energy-consumption"],
  ["/eth/", "page-eth"],
  ["/ethereum-forks/", "page-history"],
  ["/resources/", "page-resources"],
  ["/stablecoins/", "page-stablecoins"],
  ["/learn/", "page-learn"],
  ["/gas/", "page-gas"],
  ["/what-is-ethereum/", "page-what-is-ethereum"],
  ["/run-a-node/", "page-run-a-node"],
  ["/roadmap/", "page-roadmap"],
  ["/start/", "page-start"],
]

function getNamespaceForPath(pagePath) {
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

async function getCommonKeys() {
  const commonPath = join(INTL_DIR, "en/common.json")
  const common = JSON.parse(await readFile(commonPath, "utf-8"))
  return Object.keys(common)
}


async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "intl") continue
      yield* walkDir(path)
    } else if (EXTENSIONS.has(extname(entry.name))) {
      yield path
    }
  }
}

async function buildSearchIndex() {
  const index = new Map()

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
          index.get(key).push({
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

function categorizeByLocation(usages) {
  const categories = {
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

function isDynamicKey(key) {
  return DYNAMIC_KEY_PATTERNS.some((pattern) => pattern.test(key))
}

function getPageFromPath(filePath) {
  const match = filePath.match(/app\/\[locale\]\/(.+?)\/page\.tsx/)
  if (match) return `/${match[1]}/`
  if (filePath.includes("app/[locale]/page.tsx")) return "/"
  return null
}

function analyzeKey(key, searchIndex) {
  const usages = searchIndex.get(key) || []
  const categories = categorizeByLocation(usages)
  const isDynamic = isDynamicKey(key)

  const uniquePages = new Set()
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
  } else if (isDynamic) {
    recommendation = "keep-dynamic"
    reason = "Used dynamically, cannot be statically analyzed"
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

async function removeUnusedKeys(unusedKeys) {
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

async function movePageSpecificKeys(keysToMove) {
  // Group keys by target namespace
  const keysByNamespace = new Map()
  for (const item of keysToMove) {
    const pagePath = item.uniquePages[0]
    const namespace = getNamespaceForPath(pagePath)
    if (!namespace) {
      console.warn(`  ⚠️  No namespace mapping for ${pagePath}, skipping ${item.key}`)
      continue
    }
    if (!keysByNamespace.has(namespace)) {
      keysByNamespace.set(namespace, [])
    }
    keysByNamespace.get(namespace).push(item.key)
  }

  if (keysByNamespace.size === 0) {
    console.log("  No keys to move (no namespace mappings found)")
    return
  }

  const locales = await readdir(INTL_DIR)

  for (const locale of locales) {
    const commonPath = join(INTL_DIR, locale, "common.json")
    let common
    try {
      common = JSON.parse(await readFile(commonPath, "utf-8"))
    } catch {
      continue
    }

    let totalMoved = 0

    for (const [namespace, keys] of keysByNamespace) {
      const namespacePath = join(INTL_DIR, locale, `${namespace}.json`)
      let namespaceData = {}

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
        } else if (common[key] !== undefined && namespaceData[key] !== undefined) {
          // Key exists in both - just remove from common
          delete common[key]
        }
      }

      if (moved > 0) {
        // Save namespace file (preserve key order, new keys added at end)
        await writeFile(namespacePath, JSON.stringify(namespaceData, null, 2) + "\n")
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

async function main() {
  console.log("Auditing common.json translations...\n")

  const commonKeys = await getCommonKeys()

  console.log(`Found ${commonKeys.length} keys in common.json`)
  console.log("\nBuilding search index...")

  const searchIndex = await buildSearchIndex()
  console.log(`Indexed ${searchIndex.size} unique strings from codebase\n`)

  const results = {
    unused: [],
    moveToPage: [],
    keepDynamic: [],
    keep: [],
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
    console.log(`\n💡 Removing unused keys could save ~${unusedSize} bytes per locale`)

    if (FIX_MODE) {
      console.log("\n🔧 Removing unused keys...")
      await removeUnusedKeys(results.unused.map((r) => r.key))
    } else {
      console.log("\n   Run with --fix to remove unused keys")
    }
  }

  if (results.moveToPage.length > 0) {
    const moveSize = results.moveToPage.length * 50
    console.log(`\n💡 Moving page-specific keys could save ~${moveSize} bytes per locale`)

    if (FIX_MODE) {
      console.log("\n📦 Moving page-specific keys...")
      await movePageSpecificKeys(results.moveToPage)
    } else {
      console.log("\n   Run with --fix to move page-specific keys")
    }
  }
}

main().catch(console.error)
