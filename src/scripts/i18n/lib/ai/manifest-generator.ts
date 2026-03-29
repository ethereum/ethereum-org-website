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
import { readdirSync, readFileSync, statSync } from "fs"
import { join, relative } from "path"

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

/** The complete translation manifest */
export interface TranslationManifest {
  version: number
  generated: string
  fileCount: number
  files: Record<string, FileManifest>
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
