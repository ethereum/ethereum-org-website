/**
 * Adapter between intl-content-tree package and our pipeline.
 *
 * Maps the package's generic API to our Gemini translation pipeline's
 * needs. Handles:
 * - Ethereum.org-specific translatableAttributes config
 * - Manifest content generation as strings (for GitHub API commits)
 * - Per-locale translation manifest for Gemini output data
 */

import {
  type ContentTreeConfig,
  deserialize,
  diff,
  type DiffEntry,
  type DiffResult,
  getInertValue,
  hasChanges,
  MANIFEST_VERSION,
  parseJson,
  parseMarkdown,
  serialize,
  type TreeManifest,
  type TreeNode,
  validate,
  type ValidationResult,
  walk,
} from "intl-content-tree"

// ---------------------------------------------------------------------------
// Ethereum.org config
// ---------------------------------------------------------------------------

/** Attributes whose values need translation on this site */
const ETHEREUM_ORG_CONFIG: Partial<ContentTreeConfig> = {
  depth: "element",
  translatableAttributes: [
    "title",
    "description",
    "alt",
    "label",
    "aria-label",
    "placeholder",
    "buttonLabel",
    "name",
    "caption",
    "contentPreview",
    "location",
  ],
}

/**
 * Detect JSON string values that contain markdown syntax.
 * When true, the value is parsed recursively using the markdown parser,
 * decomposing links, images, and formatting into child nodes.
 * Handles dapp descriptions and other rich-text JSON values.
 */
const ETHEREUM_ORG_JSON_CONFIG = {
  markdownValueDetector: (_, value: string): boolean => {
    // Heuristic: requires structural markdown patterns (not just inline bold).
    // Triggers on: paragraph-break + list items, numbered lists, or images.
    // Does NOT trigger on standalone **bold** in normal prose.
    return /\n\n[-*] |\n\n\d+\. |!\[.*\]\(/.test(value)
  },
}

// ---------------------------------------------------------------------------
// Source manifest (English content tree)
// ---------------------------------------------------------------------------

/**
 * Parse English markdown and generate a manifest string for committing.
 */
export function buildMarkdownManifest(
  englishContent: string,
  sourceFile: string,
  sourceCommitSha?: string
): string {
  const tree = parseMarkdown(englishContent, ETHEREUM_ORG_CONFIG)
  const manifest = serialize(tree, sourceFile)
  const output = sourceCommitSha ? { ...manifest, sourceCommitSha } : manifest
  return JSON.stringify(output, null, 2) + "\n"
}

/**
 * Parse English JSON and generate a manifest string for committing.
 */
export function buildJsonManifest(
  englishContent: string,
  sourceFile: string,
  sourceCommitSha?: string
): string {
  const tree = parseJson(
    englishContent,
    ETHEREUM_ORG_CONFIG,
    ETHEREUM_ORG_JSON_CONFIG
  )
  const manifest = serialize(tree, sourceFile)
  const output = sourceCommitSha ? { ...manifest, sourceCommitSha } : manifest
  return JSON.stringify(output, null, 2) + "\n"
}

/**
 * Parse English content into a tree (for use by the translation pipeline).
 */
export function parseEnglishMarkdown(content: string): TreeNode {
  return parseMarkdown(content, ETHEREUM_ORG_CONFIG)
}

/**
 * Parse English JSON into a tree.
 */
export function parseEnglishJson(content: string): TreeNode {
  return parseJson(content, ETHEREUM_ORG_CONFIG, ETHEREUM_ORG_JSON_CONFIG)
}

/**
 * Detect drift between current English and a stored manifest.
 */
export function detectDrift(
  currentEnglishContent: string,
  storedManifestJson: string,
  format: "markdown" | "json"
): DiffResult {
  const storedManifest: TreeManifest = JSON.parse(storedManifestJson)
  const oldTree = deserialize(storedManifest)
  const newTree =
    format === "markdown"
      ? parseMarkdown(currentEnglishContent, ETHEREUM_ORG_CONFIG)
      : parseJson(
          currentEnglishContent,
          ETHEREUM_ORG_CONFIG,
          ETHEREUM_ORG_JSON_CONFIG
        )
  return diff(oldTree, newTree)
}

/**
 * Quick check: has the English content changed since the manifest was stamped?
 */
export function hasEnglishChanged(
  currentEnglishContent: string,
  storedManifestJson: string,
  format: "markdown" | "json"
): boolean {
  const storedManifest: TreeManifest = JSON.parse(storedManifestJson)
  const newTree =
    format === "markdown"
      ? parseMarkdown(currentEnglishContent, ETHEREUM_ORG_CONFIG)
      : parseJson(
          currentEnglishContent,
          ETHEREUM_ORG_CONFIG,
          ETHEREUM_ORG_JSON_CONFIG
        )
  return hasChanges(newTree, storedManifest)
}

/**
 * Validate a markdown file's readiness for incremental tracking.
 */
export function validateMarkdown(content: string): ValidationResult {
  const tree = parseMarkdown(content, ETHEREUM_ORG_CONFIG)
  return validate(tree)
}

/**
 * Get an inert value by path from an English content tree.
 */
export function getEnglishInertValue(
  content: string,
  path: string,
  format: "markdown" | "json"
): string | undefined {
  const tree =
    format === "markdown"
      ? parseMarkdown(content, ETHEREUM_ORG_CONFIG)
      : parseJson(content, ETHEREUM_ORG_CONFIG, ETHEREUM_ORG_JSON_CONFIG)
  return getInertValue(tree, path)
}

// ---------------------------------------------------------------------------
// Per-locale translation manifest (Gemini output data)
// ---------------------------------------------------------------------------

/**
 * Per-locale translation manifest, stored alongside the English source
 * manifest. Records how the LLM ordered elements in the translated
 * output, enabling deterministic inert propagation without retranslation.
 */
export interface LocaleTranslationManifest {
  version: number
  locale: string
  translatedAt: string
  /** Hash of the English source manifest this was translated against */
  englishManifestHash: string
  /** Placeholder IDs in the order Gemini returned them */
  placeholderOrder: string[]
  /** Placeholder ID -> inert values at translation time */
  placeholderMap: Record<
    string,
    { type: string; values: Record<string, string> }
  >
  /** Per-section translation status */
  sections: Record<
    string,
    {
      translatedAt: string
      status: "success" | "failed" | "skipped"
      glossaryVersion?: string
    }
  >
}

/**
 * Build a locale translation manifest string for committing.
 */
export function buildLocaleTranslationManifest(opts: {
  locale: string
  englishManifestHash: string
  placeholderOrder: string[]
  placeholderMap: Record<
    string,
    { type: string; values: Record<string, string> }
  >
  sections: Record<
    string,
    {
      translatedAt: string
      status: "success" | "failed" | "skipped"
      glossaryVersion?: string
    }
  >
}): string {
  const manifest: LocaleTranslationManifest = {
    version: MANIFEST_VERSION,
    locale: opts.locale,
    translatedAt: new Date().toISOString(),
    englishManifestHash: opts.englishManifestHash,
    placeholderOrder: opts.placeholderOrder,
    placeholderMap: opts.placeholderMap,
    sections: opts.sections,
  }
  return JSON.stringify(manifest, null, 2) + "\n"
}

/**
 * Extract placeholder data from a parsed tree for building translation
 * manifests. Works for both markdown and JSON trees. Walks the tree
 * collecting inert/mixed nodes with their meta values.
 */
export function extractPlaceholderData(tree: TreeNode): {
  placeholderOrder: string[]
  placeholderMap: Record<
    string,
    { type: string; values: Record<string, string> }
  >
} {
  const order: string[] = []
  const map: Record<string, { type: string; values: Record<string, string> }> =
    {}

  let counter = 0
  for (const node of walk(tree)) {
    if (
      node.contentType === "inert" ||
      (node.contentType === "mixed" &&
        node.meta &&
        Object.keys(node.meta).length > 0)
    ) {
      const values: Record<string, string> = {}
      if (node.contentType === "inert" && node.value) {
        values.value = node.value
      }
      if (node.meta) {
        // Include ALL meta keys (including tagName) so the hash of
        // these values matches the tree's anchorHash computation.
        for (const [k, v] of Object.entries(node.meta)) {
          if (k !== "language" && k !== "name") {
            values[k] = String(v)
          }
        }
      }
      if (Object.keys(values).length > 0) {
        const id = `${node.elementType.toUpperCase()}-${counter++}`
        order.push(id)
        map[id] = { type: node.elementType, values }
      }
    }
  }

  return { placeholderOrder: order, placeholderMap: map }
}

// Re-export types consumers need
export type { DiffEntry, DiffResult, TreeManifest, TreeNode, ValidationResult }
export { MANIFEST_VERSION }
