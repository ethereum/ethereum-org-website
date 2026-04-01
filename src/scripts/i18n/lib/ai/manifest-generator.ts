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
  readFileSync,
  writeFileSync,
} from "fs"
import { dirname, join } from "path"

import {
  normalizeContent,
  collectLeafHashes,
} from "./content-normalizer"
import { FENCED_BLOCK_RE, FRONTMATTER_RE } from "../shared-patterns"

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
  /** Heading label text (without the {#id} anchor) */
  label: string
  /** Body content below the heading (excludes the heading line itself) */
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
  const fmMatch = content.match(FRONTMATTER_RE)
  if (fmMatch) {
    sections.push({
      id: "_frontmatter",
      level: 0,
      label: "",
      content: fmMatch[1],
    })
    body = content.slice(fmMatch[1].length)
  }

  // Replace code fences with placeholders to avoid parsing # comments
  const fences: string[] = []
  body = body.replace(FENCED_BLOCK_RE, (match) => {
    fences.push(match)
    return `<!--FENCE_${fences.length - 1}-->`
  })

  // Split into lines and parse headings
  const lines = body.split("\n")
  let currentContent = ""
  let currentLabel = ""
  let currentId = "_intro"
  let currentLevel = 0

  for (const line of lines) {
    const match = line.match(HEADING_RE)
    if (match) {
      // Save previous section (always push if it has a label -- heading sections
      // with empty body content still need to exist in the trie for nesting)
      if (currentContent.trim() || currentId === "_intro" || currentLabel) {
        sections.push({
          id: currentId,
          level: currentLevel,
          label: currentLabel,
          content: currentContent,
        })
      }

      const level = match[1].length
      const headingText = match[2]
      const customId = match[3]

      // Use custom ID if present, otherwise generate from heading text
      currentId = customId || `_auto:${slugifyHeading(headingText)}`
      currentLevel = level
      currentLabel = headingText
      // Body content starts empty -- heading line is NOT included in content
      currentContent = ""
    } else {
      currentContent += line + "\n"
    }
  }

  // Push final section
  if (currentContent.trim() || currentLabel) {
    sections.push({
      id: currentId,
      level: currentLevel,
      label: currentLabel,
      content: currentContent,
    })
  }

  // Restore code fences from placeholders so downstream consumers
  // (e.g., the content normalizer) see original fence content.
  for (const section of sections) {
    section.content = section.content.replace(
      /<!--FENCE_(\d+)-->/g,
      (_, idx) => fences[Number(idx)]
    )
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
 * Two-pass approach:
 * 1. Build a flat list of nodes with parent references based on heading level
 * 2. Assemble into a nested trie and compute hashes bottom-up
 *
 * Each heading section has _label and _content leaves, plus any child headings.
 */
function buildMarkdownTrie(sections: ParsedSection[]): Record<string, TrieNode> {
  const root: Record<string, TrieNode> = {}

  // Pass 1: build nodes and determine parent-child relationships
  interface SectionNode {
    id: string
    level: number
    label: string
    content: string
    children: Record<string, SectionNode>
  }

  const rootNode: SectionNode = {
    id: "_root",
    level: -1,
    label: "",
    content: "",
    children: {},
  }

  // Stack of ancestors -- each entry is the most recent node at that depth
  const stack: SectionNode[] = [rootNode]

  for (const section of sections) {
    const node: SectionNode = {
      id: section.id,
      level: section.level,
      label: section.label,
      content: section.content,
      children: {},
    }

    if (section.id === "_frontmatter" || section.id === "_intro") {
      rootNode.children[section.id] = node
      continue
    }

    // Pop stack to find parent (first ancestor with lower level)
    while (stack.length > 1 && stack[stack.length - 1].level >= section.level) {
      stack.pop()
    }

    // Add as child of current stack top
    stack[stack.length - 1].children[section.id] = node
    stack.push(node)
  }

  // Pass 2: convert to TrieNode with hashes, bottom-up
  function toTrieNode(node: SectionNode): TrieNode {
    // Frontmatter is YAML metadata -- hash raw content (no normalization)
    if (node.id === "_frontmatter") {
      return { hash: hashContent(node.content) }
    }

    // Intro (content before first heading) gets normalized like any section
    if (node.id === "_intro") {
      const { tree: introTree } = normalizeContent(node.content)
      const introLeaves = collectLeafHashes(introTree)
      if (Object.keys(introLeaves).length > 0) {
        const introChildren: Record<string, TrieNode> = {}
        for (const [key, hash] of Object.entries(introLeaves)) {
          introChildren[key] = { hash }
        }
        return { hash: merkleHash(introChildren), children: introChildren }
      }
      return { hash: hashContent(node.content) }
    }

    // Regular heading section: _label + normalized _content + child headings
    const children: Record<string, TrieNode> = {
      _label: { hash: hashContent(node.label) },
    }

    // Normalize content: decompose into translatable leaves and
    // inert placeholders. Only translatable content affects the hash.
    const { tree } = normalizeContent(node.content)
    const leafHashes = collectLeafHashes(tree)

    if (Object.keys(leafHashes).length > 0) {
      // _content becomes an interior node with translatable leaves
      const contentChildren: Record<string, TrieNode> = {}
      for (const [key, hash] of Object.entries(leafHashes)) {
        contentChildren[key] = { hash }
      }
      children._content = {
        hash: merkleHash(contentChildren),
        children: contentChildren,
      }
    } else {
      // No translatable content -- hash the raw content as fallback
      children._content = { hash: hashContent(node.content) }
    }

    // Add child heading sections
    for (const [childId, childNode] of Object.entries(node.children)) {
      children[childId] = toTrieNode(childNode)
    }

    return {
      hash: merkleHash(children),
      children,
    }
  }

  // Build root trie from rootNode's children
  for (const [id, node] of Object.entries(rootNode.children)) {
    root[id] = toTrieNode(node)
  }

  return root
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
// Main API
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Per-locale JSON manifest I/O
// ---------------------------------------------------------------------------

/**
 * Update the .manifest.json in a locale's intl directory after
 * translating a JSON namespace file.
 *
 * The dotfile prefix ensures loadMessages() skips it (filtered by
 * !entry.name.startsWith(".") in getNamespaces()).
 */
export function updateJsonManifest(
  localeDir: string,
  englishFilePath: string,
  englishContent: string
): void {
  const manifestPath = join(localeDir, ".manifest.json")
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
