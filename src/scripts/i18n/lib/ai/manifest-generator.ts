/**
 * Translation manifest generator.
 *
 * Builds a merkle trie of content hashes for English source files,
 * keyed by {#header-id} for markdown and by JSON key path for JSON.
 *
 * The manifest enables:
 * - Drift detection: "which translations are stale?"
 * - Incremental translation: "only translate what changed"
 * - Baseline stamping: record English state at translation time
 */

import { createHash } from "crypto"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs"
import { dirname, join, relative } from "path"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A node in the merkle trie -- either a leaf (content) or branch (children) */
interface TrieNode {
  /** SHA-256 hash (12 hex chars) of this node's content or children */
  hash: string
  /** Children nodes (keyed by header ID or JSON key). Absent for leaves. */
  children?: Record<string, TrieNode>
}

/** Manifest for a single file */
interface FileManifest {
  /** File type */
  type: "markdown" | "json"
  /** Root hash (merkle root of all sections/keys) */
  hash: string
  /** Trie of sections (markdown) or keys (JSON) */
  trie: Record<string, TrieNode>
}

/** The complete translation manifest (used for full-repo generation) */
export interface TranslationManifest {
  version: number
  generated: string
  fileCount: number
  files: Record<string, FileManifest>
}

/**
 * Per-file manifest stored as .manifest.json sibling to translated index.md.
 * Records the English source hashes this translation was made against.
 */
export interface PerFileManifest {
  version: number
  /** English source file path (relative to repo root) */
  englishSource: string
  /** When this translation was last generated */
  translatedAt: string
  /** Root hash of the English source at translation time */
  englishHash: string
  /** Per-section hashes from the English source trie */
  sections: Record<string, string>
}

/**
 * Per-locale JSON manifest stored as .manifest.json in src/intl/{locale}/.
 * Records English source hashes for all JSON namespace files.
 */
export interface PerLocaleJsonManifest {
  version: number
  /** When this manifest was last updated */
  updatedAt: string
  /** Per-namespace file tracking */
  files: Record<
    string,
    {
      englishHash: string
      translatedAt: string
      keys: Record<string, string>
    }
  >
}

/** Result of a drift scan for a single file */
export interface DriftResult {
  /** English source file path */
  englishPath: string
  /** Translation file path */
  translationPath: string
  /** Whether any sections are stale */
  isStale: boolean
  /** Sections that changed (header IDs) */
  staleSections: string[]
  /** Whether no manifest exists (never translated or manifest missing) */
  noManifest: boolean
}

/** Result of a full drift scan across a locale */
export interface LocaleDriftReport {
  locale: string
  scannedAt: string
  totalFiles: number
  staleFiles: number
  missingManifests: number
  staleSections: number
  files: DriftResult[]
}

// ---------------------------------------------------------------------------
// Hashing
// ---------------------------------------------------------------------------

/** SHA-256 hash truncated to 12 hex characters */
function hashContent(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex").slice(0, 12)
}

/** Compute merkle hash from children hashes */
function merkleHash(children: Record<string, TrieNode>): string {
  const childHashes = Object.keys(children)
    .sort()
    .map((k) => children[k].hash)
    .join("")
  return hashContent(childHashes)
}

// ---------------------------------------------------------------------------
// Markdown parsing
// ---------------------------------------------------------------------------

/** Regex matching a heading with optional custom ID */
const HEADING_RE = /^(#{1,6})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/

interface ParsedSection {
  id: string
  level: number
  content: string
}

/**
 * Parse markdown into sections keyed by header ID.
 *
 * Strips code fences before parsing to avoid treating # comments as headers.
 * Preserves the heading hierarchy for merkle trie construction.
 */
function parseMarkdownSections(content: string): ParsedSection[] {
  const sections: ParsedSection[] = []

  // Extract frontmatter
  let body = content
  const fmMatch = content.match(/^(---\n[\s\S]*?\n---\n)/)
  if (fmMatch) {
    sections.push({
      id: "_frontmatter",
      level: 0,
      content: fmMatch[1],
    })
    body = content.slice(fmMatch[1].length)
  }

  // Replace code fences with placeholders to avoid parsing # comments
  const fences: string[] = []
  body = body.replace(/^([ \t]*)(```|~~~)([^\n]*)\n([\s\S]*?)\n\1\2[ \t]*$/gm, (match) => {
    fences.push(match)
    return `<!--FENCE_${fences.length - 1}-->`
  })

  // Split into lines and parse headings
  const lines = body.split("\n")
  let currentContent = ""
  let currentId = "_intro"
  let currentLevel = 0

  for (const line of lines) {
    const match = line.match(HEADING_RE)
    if (match) {
      // Save previous section
      if (currentContent.trim() || currentId === "_intro") {
        sections.push({
          id: currentId,
          level: currentLevel,
          content: currentContent,
        })
      }

      const level = match[1].length
      const headingText = match[2]
      const customId = match[3]

      // Use custom ID if present, otherwise generate from heading text
      currentId = customId || `_auto:${slugifyHeading(headingText)}`
      currentLevel = level
      currentContent = line + "\n"
    } else {
      currentContent += line + "\n"
    }
  }

  // Push final section
  if (currentContent.trim()) {
    sections.push({
      id: currentId,
      level: currentLevel,
      content: currentContent,
    })
  }

  return sections
}

/** Simple slugify for headings without custom IDs */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Build a merkle trie from parsed markdown sections.
 *
 * Sections are nested by heading level:
 * - h2 sections contain h3 children
 * - h3 sections contain h4 children
 * - Leaf sections (no children) hash their content directly
 * - Branch sections hash the concatenation of their children's hashes
 */
function buildMarkdownTrie(sections: ParsedSection[]): Record<string, TrieNode> {
  const root: Record<string, TrieNode> = {}

  // Stack tracks the current nesting: [level, parentChildren]
  const stack: Array<{ level: number; children: Record<string, TrieNode> }> = [
    { level: 0, children: root },
  ]

  for (const section of sections) {
    // Special cases: frontmatter and intro are always at root level
    if (section.id === "_frontmatter" || section.id === "_intro") {
      root[section.id] = { hash: hashContent(section.content) }
      continue
    }

    // Pop stack to find the right parent level
    while (stack.length > 1 && stack[stack.length - 1].level >= section.level) {
      // Before popping, finalize the parent's hash from its children
      const popped = stack.pop()!
      const parentEntry = findNodeInParent(stack[stack.length - 1].children, popped)
      if (parentEntry && parentEntry.children && Object.keys(parentEntry.children).length > 0) {
        parentEntry.hash = merkleHash(parentEntry.children)
      }
    }

    const parent = stack[stack.length - 1].children
    const node: TrieNode = { hash: hashContent(section.content) }

    // This node might get children later (if lower-level headings follow)
    parent[section.id] = node

    // Push onto stack as potential parent for deeper headings
    const nodeChildren: Record<string, TrieNode> = {}
    node.children = nodeChildren
    stack.push({ level: section.level, children: nodeChildren })
  }

  // Unwind stack and finalize hashes
  while (stack.length > 1) {
    const popped = stack.pop()!
    const parentEntry = findNodeInParent(stack[stack.length - 1].children, popped)
    if (parentEntry && parentEntry.children && Object.keys(parentEntry.children).length > 0) {
      parentEntry.hash = merkleHash(parentEntry.children)
    }
  }

  // Clean up empty children objects (leaves don't need them)
  cleanEmptyChildren(root)

  return root
}

/** Find a node in a parent's children that matches the given stack entry */
function findNodeInParent(
  parentChildren: Record<string, TrieNode>,
  stackEntry: { children: Record<string, TrieNode> }
): TrieNode | undefined {
  for (const node of Object.values(parentChildren)) {
    if (node.children === stackEntry.children) return node
  }
  return undefined
}

/** Remove empty children objects from leaf nodes */
function cleanEmptyChildren(trie: Record<string, TrieNode>): void {
  for (const node of Object.values(trie)) {
    if (node.children) {
      if (Object.keys(node.children).length === 0) {
        delete node.children
      } else {
        cleanEmptyChildren(node.children)
        // Recompute hash from children
        node.hash = merkleHash(node.children)
      }
    }
  }
}

// ---------------------------------------------------------------------------
// JSON parsing
// ---------------------------------------------------------------------------

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

/**
 * Build a merkle trie from a JSON file.
 *
 * Top-level keys become trie nodes. Nested objects recurse.
 * Leaf values are hashed as serialized JSON.
 */
function buildJsonTrie(content: string): Record<string, TrieNode> {
  const parsed = JSON.parse(content) as Record<string, JsonValue>
  return buildJsonTrieRecursive(parsed)
}

function buildJsonTrieRecursive(obj: Record<string, JsonValue>): Record<string, TrieNode> {
  const trie: Record<string, TrieNode> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      // Nested object -- recurse
      const children = buildJsonTrieRecursive(value as Record<string, JsonValue>)
      trie[key] = {
        hash: merkleHash(children),
        children,
      }
    } else {
      // Leaf value
      trie[key] = { hash: hashContent(JSON.stringify(value)) }
    }
  }

  return trie
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

/** Recursively find all markdown and JSON files in English content directories */
export function discoverEnglishFiles(rootDir: string): Array<{
  path: string
  type: "markdown" | "json"
}> {
  const files: Array<{ path: string; type: "markdown" | "json" }> = []

  // Markdown content (excluding translations)
  const contentDir = join(rootDir, "public/content")
  if (statSync(contentDir, { throwIfNoEntry: false })) {
    walkDir(contentDir, (filePath) => {
      if (filePath.includes("/translations/")) return
      if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
        files.push({ path: relative(rootDir, filePath), type: "markdown" })
      }
    })
  }

  // JSON intl files (English only)
  const intlDir = join(rootDir, "src/intl/en")
  if (statSync(intlDir, { throwIfNoEntry: false })) {
    walkDir(intlDir, (filePath) => {
      if (filePath.endsWith(".json")) {
        files.push({ path: relative(rootDir, filePath), type: "json" })
      }
    })
  }

  return files
}

function walkDir(dir: string, callback: (filePath: string) => void): void {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath, callback)
    } else {
      callback(fullPath)
    }
  }
}

// ---------------------------------------------------------------------------
// Main API
// ---------------------------------------------------------------------------

/**
 * Generate the translation manifest for all English source files.
 */
export function generateManifest(rootDir: string): TranslationManifest {
  const files = discoverEnglishFiles(rootDir)
  const manifest: TranslationManifest = {
    version: 1,
    generated: new Date().toISOString(),
    fileCount: files.length,
    files: {},
  }

  for (const file of files) {
    const content = readFileSync(join(rootDir, file.path), "utf-8")

    let trie: Record<string, TrieNode>
    if (file.type === "markdown") {
      const sections = parseMarkdownSections(content)
      trie = buildMarkdownTrie(sections)
    } else {
      trie = buildJsonTrie(content)
    }

    manifest.files[file.path] = {
      type: file.type,
      hash: merkleHash(trie),
      trie,
    }
  }

  return manifest
}

/**
 * Generate manifest for a single file (useful for incremental updates).
 */
export function generateFileManifest(
  content: string,
  fileType: "markdown" | "json"
): FileManifest {
  let trie: Record<string, TrieNode>
  if (fileType === "markdown") {
    const sections = parseMarkdownSections(content)
    trie = buildMarkdownTrie(sections)
  } else {
    trie = buildJsonTrie(content)
  }

  return {
    type: fileType,
    hash: merkleHash(trie),
    trie,
  }
}

// ---------------------------------------------------------------------------
// Per-file manifest I/O (markdown translations)
// ---------------------------------------------------------------------------

/** Flatten a trie into a flat map of section ID -> hash (for storage) */
function flattenTrie(
  trie: Record<string, TrieNode>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, node] of Object.entries(trie)) {
    const path = prefix ? `${prefix}/${key}` : key
    result[path] = node.hash
    if (node.children) {
      Object.assign(result, flattenTrie(node.children, path))
    }
  }
  return result
}

/**
 * Write a .manifest.json sibling next to a translated markdown file.
 *
 * Call this after translating a markdown file to record which English
 * source version the translation was made against.
 */
export function writeMarkdownManifest(
  translationPath: string,
  englishSourcePath: string,
  englishContent: string
): void {
  const fileManifest = generateFileManifest(englishContent, "markdown")
  const manifestPath = join(dirname(translationPath), ".manifest.json")

  const manifest: PerFileManifest = {
    version: 1,
    englishSource: englishSourcePath,
    translatedAt: new Date().toISOString(),
    englishHash: fileManifest.hash,
    sections: flattenTrie(fileManifest.trie),
  }

  mkdirSync(dirname(manifestPath), { recursive: true })
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
}

/**
 * Read a .manifest.json sibling from a translated markdown file.
 * Returns null if no manifest exists.
 */
export function readMarkdownManifest(
  translationPath: string
): PerFileManifest | null {
  const manifestPath = join(dirname(translationPath), ".manifest.json")
  if (!existsSync(manifestPath)) return null

  try {
    return JSON.parse(readFileSync(manifestPath, "utf-8"))
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Per-locale JSON manifest I/O
// ---------------------------------------------------------------------------

/**
 * Get the path to a locale's JSON tracking manifest.
 *
 * Stored OUTSIDE src/intl/ to avoid being picked up as an i18n namespace
 * by loadMessages() which reads all .json files in the locale directory.
 */
function getJsonTrackingPath(rootDir: string, locale: string): string {
  return join(rootDir, "src/scripts/i18n/data/tracking", `${locale}-json.json`)
}

/**
 * Update the JSON tracking manifest for a locale after
 * translating a JSON namespace file.
 */
export function updateJsonManifest(
  rootDir: string,
  locale: string,
  englishFilePath: string,
  englishContent: string
): void {
  const manifestPath = getJsonTrackingPath(rootDir, locale)
  mkdirSync(dirname(manifestPath), { recursive: true })
  const fileManifest = generateFileManifest(englishContent, "json")

  let manifest: PerLocaleJsonManifest
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, "utf-8"))
    } catch {
      manifest = { version: 1, updatedAt: "", files: {} }
    }
  } else {
    manifest = { version: 1, updatedAt: "", files: {} }
  }

  manifest.updatedAt = new Date().toISOString()
  manifest.files[englishFilePath] = {
    englishHash: fileManifest.hash,
    translatedAt: new Date().toISOString(),
    keys: flattenTrie(fileManifest.trie),
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
}

/**
 * Read the JSON tracking manifest for a locale.
 * Returns null if no manifest exists.
 */
export function readJsonManifest(
  rootDir: string,
  locale: string
): PerLocaleJsonManifest | null {
  const manifestPath = getJsonTrackingPath(rootDir, locale)
  if (!existsSync(manifestPath)) return null

  try {
    return JSON.parse(readFileSync(manifestPath, "utf-8"))
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Drift scanning
// ---------------------------------------------------------------------------

/**
 * Check drift for a single markdown translation file.
 *
 * Regenerates English hashes on the fly, compares against the stored
 * manifest, and reports which sections are stale.
 */
export function checkMarkdownDrift(
  rootDir: string,
  englishPath: string,
  translationPath: string
): DriftResult {
  const manifest = readMarkdownManifest(join(rootDir, translationPath))

  if (!manifest) {
    return {
      englishPath,
      translationPath,
      isStale: true,
      staleSections: [],
      noManifest: true,
    }
  }

  // Regenerate current English hashes
  const englishContent = readFileSync(join(rootDir, englishPath), "utf-8")
  const currentManifest = generateFileManifest(englishContent, "markdown")

  // Quick check: root hash match = fully up to date
  if (currentManifest.hash === manifest.englishHash) {
    return {
      englishPath,
      translationPath,
      isStale: false,
      staleSections: [],
      noManifest: false,
    }
  }

  // Drill into sections to find what changed
  const currentSections = flattenTrie(currentManifest.trie)
  const staleSections: string[] = []

  for (const [sectionId, currentHash] of Object.entries(currentSections)) {
    const storedHash = manifest.sections[sectionId]
    if (!storedHash || storedHash !== currentHash) {
      staleSections.push(sectionId)
    }
  }

  // Also check for sections that were removed from English
  for (const sectionId of Object.keys(manifest.sections)) {
    if (!(sectionId in currentSections) && !staleSections.includes(sectionId)) {
      staleSections.push(sectionId)
    }
  }

  return {
    englishPath,
    translationPath,
    isStale: staleSections.length > 0,
    staleSections,
    noManifest: false,
  }
}

/**
 * Check drift for a single JSON namespace file in a locale.
 */
export function checkJsonDrift(
  rootDir: string,
  englishPath: string,
  locale: string
): DriftResult {
  const manifest = readJsonManifest(rootDir, locale)
  const localeDir = `src/intl/${locale}`

  if (!manifest || !manifest.files[englishPath]) {
    return {
      englishPath,
      translationPath: localeDir,
      isStale: true,
      staleSections: [],
      noManifest: true,
    }
  }

  const tracked = manifest.files[englishPath]
  const englishContent = readFileSync(join(rootDir, englishPath), "utf-8")
  const currentManifest = generateFileManifest(englishContent, "json")

  if (currentManifest.hash === tracked.englishHash) {
    return {
      englishPath,
      translationPath: localeDir,
      isStale: false,
      staleSections: [],
      noManifest: false,
    }
  }

  const currentKeys = flattenTrie(currentManifest.trie)
  const staleSections: string[] = []

  for (const [key, currentHash] of Object.entries(currentKeys)) {
    if (!tracked.keys[key] || tracked.keys[key] !== currentHash) {
      staleSections.push(key)
    }
  }

  for (const key of Object.keys(tracked.keys)) {
    if (!(key in currentKeys) && !staleSections.includes(key)) {
      staleSections.push(key)
    }
  }

  return {
    englishPath,
    translationPath: localeDir,
    isStale: staleSections.length > 0,
    staleSections,
    noManifest: false,
  }
}

/**
 * Scan all translations for a locale and report drift.
 */
export function scanLocaleDrift(
  rootDir: string,
  locale: string
): LocaleDriftReport {
  const results: DriftResult[] = []
  const englishFiles = discoverEnglishFiles(rootDir)

  for (const file of englishFiles) {
    if (file.type === "markdown") {
      // Derive translation path from English path
      const translationPath = file.path.replace(
        "public/content/",
        `public/content/translations/${locale}/`
      )
      if (existsSync(join(rootDir, translationPath))) {
        results.push(checkMarkdownDrift(rootDir, file.path, translationPath))
      }
    } else {
      // JSON: check locale intl directory
      const localePath = file.path.replace("src/intl/en/", `src/intl/${locale}/`)
      if (existsSync(join(rootDir, localePath))) {
        results.push(checkJsonDrift(rootDir, file.path, locale))
      }
    }
  }

  const staleFiles = results.filter((r) => r.isStale)
  const missingManifests = results.filter((r) => r.noManifest)
  const totalStaleSections = staleFiles.reduce(
    (sum, r) => sum + r.staleSections.length,
    0
  )

  return {
    locale,
    scannedAt: new Date().toISOString(),
    totalFiles: results.length,
    staleFiles: staleFiles.length,
    missingManifests: missingManifests.length,
    staleSections: totalStaleSections,
    files: staleFiles,
  }
}
