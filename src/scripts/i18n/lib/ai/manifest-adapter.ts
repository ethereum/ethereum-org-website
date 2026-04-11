/**
 * Adapter between intl-content-tree package and our pipeline.
 *
 * Maps the package's generic API to our Gemini translation pipeline's
 * needs. Handles:
 * - Ethereum.org-specific translatableAttributes config
 * - Manifest content generation as strings (for GitHub API commits)
 * - Per-locale translation manifest for Gemini output data
 */

import { execSync } from "child_process"

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
 *
 * Re-parses the old English content from git (via sourceCommitSha) to get
 * a fully-typed tree with correct contentType/elementType/value on all
 * nodes. Falls back to deserialize() if the sha is missing or git show
 * fails (e.g., file didn't exist at that commit).
 */
export function detectDrift(
  currentEnglishContent: string,
  storedManifestJson: string,
  format: "markdown" | "json",
  filePath: string
): DiffResult {
  const storedManifest: TreeManifest & { sourceCommitSha?: string } =
    JSON.parse(storedManifestJson)

  const parse = (content: string): TreeNode =>
    format === "markdown"
      ? parseMarkdown(content, ETHEREUM_ORG_CONFIG)
      : parseJson(content, ETHEREUM_ORG_CONFIG, ETHEREUM_ORG_JSON_CONFIG)

  let oldTree: TreeNode
  try {
    if (!storedManifest.sourceCommitSha) throw new Error("no sourceCommitSha")
    const oldContent = execSync(
      `git show ${storedManifest.sourceCommitSha}:${filePath}`,
      { encoding: "utf-8" }
    )
    oldTree = parse(oldContent)
  } catch {
    console.warn(
      `[detectDrift] git show failed for ${filePath}, falling back to deserialize`
    )
    oldTree = deserialize(storedManifest)
  }

  const newTree = parse(currentEnglishContent)
  return diff(oldTree, newTree)
}

/**
 * Extract specific inert value changes from two parsed trees.
 *
 * Handles two cases:
 * 1. sectionIds: sections with same ID in both trees (inertDrift)
 *    -> matched by path within section
 * 2. renamePairs: sections with different IDs (removed+added = rename)
 *    -> matched by DFS order within section (handles index shifts)
 *
 * Requires both trees to be freshly parsed (not deserialized).
 */
export function extractInertChangesFromTrees(
  oldContent: string,
  newContent: string,
  format: "markdown" | "json",
  sectionIds: string[],
  renamePairs: Array<{ oldId: string; newId: string }> = [],
  structuralSectionIds: string[] = []
): Array<{
  elementType: string
  key: string
  oldValue: string
  newValue: string
  path: string
  tagName?: string
  action?: "update" | "add-attribute" | "remove-node" | "add-node"
  nodeText?: string
  insertAfter?: string
}> {
  const parse = (content: string): TreeNode =>
    format === "markdown"
      ? parseMarkdown(content, ETHEREUM_ORG_CONFIG)
      : parseJson(content, ETHEREUM_ORG_CONFIG, ETHEREUM_ORG_JSON_CONFIG)

  const oldTree = parse(oldContent)
  const newTree = parse(newContent)

  const findSection = (tree: TreeNode, id: string): TreeNode | undefined => {
    if (tree.id === id && tree.nodeType === "section") return tree
    for (const child of tree.children) {
      const found = findSection(child, id)
      if (found) return found
    }
    return undefined
  }

  /** Collect inert nodes with full path keys */
  const collectInertByPath = (
    node: TreeNode,
    prefix: string
  ): Map<string, TreeNode> => {
    const map = new Map<string, TreeNode>()
    const path = prefix ? `${prefix}/${node.id}` : node.id
    if (node.contentType === "inert") {
      map.set(path, node)
    }
    for (const child of node.children) {
      for (const [k, v] of collectInertByPath(child, path)) {
        map.set(k, v)
      }
    }
    return map
  }

  /** Collect inert nodes in DFS order (for position-based matching) */
  const collectInertOrdered = (node: TreeNode): TreeNode[] => {
    const result: TreeNode[] = []
    if (node.contentType === "inert") {
      result.push(node)
    }
    for (const child of node.children) {
      result.push(...collectInertOrdered(child))
    }
    return result
  }

  type Change = {
    elementType: string
    key: string
    oldValue: string
    newValue: string
    path: string
    tagName?: string
    action?: "update" | "add-attribute" | "remove-node" | "add-node"
    nodeText?: string
    insertAfter?: string
  }

  const changes: Change[] = []
  const seen = new Set<string>()

  const addChange = (c: Change): void => {
    const dedupKey = `${c.elementType}:${c.key}:${c.oldValue}:${c.newValue}`
    if (seen.has(dedupKey)) return
    seen.add(dedupKey)
    changes.push(c)
  }

  const compareNodes = (
    oldNode: TreeNode,
    newNode: TreeNode,
    path: string
  ): void => {
    // Compare value
    if (
      newNode.value !== undefined &&
      oldNode.value !== undefined &&
      newNode.value !== oldNode.value
    ) {
      addChange({
        elementType: newNode.elementType,
        key: newNode.meta?.name || newNode.elementType,
        oldValue: oldNode.value,
        newValue: newNode.value,
        path,
        tagName: newNode.meta?.tagName,
      })
    }

    // Compare meta values (href, src, etc.)
    if (newNode.meta && oldNode.meta) {
      for (const [metaKey, newVal] of Object.entries(newNode.meta)) {
        if (metaKey === "tagName" || metaKey === "name") continue
        const oldVal = oldNode.meta[metaKey]
        if (oldVal !== undefined && oldVal !== newVal) {
          // Changed meta value
          addChange({
            elementType: newNode.elementType,
            key: metaKey,
            oldValue: oldVal,
            newValue: newVal,
            path,
            tagName: newNode.meta?.tagName,
          })
        } else if (oldVal === undefined) {
          // New attribute added
          addChange({
            elementType: newNode.elementType,
            key: metaKey,
            oldValue: "",
            newValue: newVal,
            path,
            tagName: newNode.meta?.tagName,
            action: "add-attribute",
          })
        }
      }
    }
  }

  /** Collect ALL nodes (not just inert) in DFS order for structural comparison */
  const collectAllOrdered = (
    node: TreeNode
  ): Array<{ node: TreeNode; isLeaf: boolean }> => {
    const result: Array<{ node: TreeNode; isLeaf: boolean }> = []
    const isLeaf = node.children.length === 0
    if (node.nodeType === "element") {
      result.push({ node, isLeaf })
    }
    for (const child of node.children) {
      result.push(...collectAllOrdered(child))
    }
    return result
  }

  /** Detect removed and added nodes between two sections */
  const detectStructuralChanges = (
    oldSection: TreeNode,
    newSection: TreeNode,
    sectionPath: string
  ): void => {
    const oldElements = collectAllOrdered(oldSection)
    const newElements = collectAllOrdered(newSection)

    // Build sets of element signatures for comparison
    const oldSigs = new Map<string, TreeNode>()
    for (const { node } of oldElements) {
      const sig = nodeSignature(node)
      if (sig) oldSigs.set(sig, node)
    }

    const newSigs = new Map<string, TreeNode>()
    for (const { node } of newElements) {
      const sig = nodeSignature(node)
      if (sig) newSigs.set(sig, node)
    }

    // Nodes in old but not new = removed
    for (const [sig, node] of oldSigs) {
      if (newSigs.has(sig)) continue
      if (node.elementType === "component" && node.meta?.tagName) {
        addChange({
          elementType: node.elementType,
          key: node.meta.tagName,
          oldValue: node.meta.tagName,
          newValue: "",
          path: sectionPath,
          tagName: node.meta.tagName,
          action: "remove-node",
        })
      }
    }

    // Nodes in new but not old = added (only inert ones)
    for (const [sig, node] of newSigs) {
      if (oldSigs.has(sig)) continue
      // Code fences with non-markdown language
      if (node.elementType === "code-body" && node.value) {
        const lang = node.meta?.language || ""
        if (lang && lang !== "markdown" && lang !== "md" && lang !== "mdx") {
          // Find the preceding element to determine insertion point
          const idx = newElements.findIndex((e) => e.node === node)
          let anchor = ""
          if (idx > 0) {
            const prev = newElements[idx - 1].node
            if (prev.meta?.tagName) anchor = `<${prev.meta.tagName}`
            else if (prev.value) anchor = prev.value.substring(0, 40)
          }
          const fenceText = "```" + lang + "\n" + node.value + "\n```"
          addChange({
            elementType: node.elementType,
            key: "code-fence",
            oldValue: "",
            newValue: fenceText,
            path: sectionPath,
            tagName: lang,
            action: "add-node",
            nodeText: fenceText,
            insertAfter: anchor,
          })
        }
      }
    }
  }

  /** Create a signature string for a node for set comparison */
  /** Find the parent component's tagName for a given child node */
  const findParentTagName = (
    root: TreeNode,
    target: TreeNode
  ): string | undefined => {
    for (const child of root.children) {
      if (child === target) return root.meta?.tagName
      const found = findParentTagName(child, target)
      if (found) return found
    }
    return undefined
  }

  const nodeSignature = (node: TreeNode): string | null => {
    if (node.elementType === "component" && node.meta?.tagName) {
      // Self-closing components like <Divider />
      if (node.children.length === 0 && !node.value) {
        return `component:${node.meta.tagName}`
      }
    }
    if (node.elementType === "code-body" && node.value) {
      return `code-body:${node.meta?.language}:${node.value.substring(0, 50)}`
    }
    return null
  }

  // Case 1: Same-ID sections (inertDrift) -- match by path
  const sorted = [...sectionIds].sort(
    (a, b) => b.split("/").length - a.split("/").length
  )

  for (const sectionId of sorted) {
    const oldSection = findSection(oldTree, sectionId)
    const newSection = findSection(newTree, sectionId)
    if (!oldSection || !newSection) continue

    const oldNodes = collectInertByPath(oldSection, "")
    const newNodes = collectInertByPath(newSection, "")

    for (const [nodePath, newNode] of newNodes) {
      const oldNode = oldNodes.get(nodePath)
      if (!oldNode) continue
      compareNodes(oldNode, newNode, `${sectionId}/${nodePath}`)
    }

    // Structural changes within same-ID sections
    detectStructuralChanges(oldSection, newSection, sectionId)
  }

  // Case 1b: Structural sections -- only detect added/removed elements
  for (const sectionId of structuralSectionIds) {
    if (sectionIds.includes(sectionId)) continue // already processed
    const oldSection = findSection(oldTree, sectionId)
    const newSection = findSection(newTree, sectionId)
    if (!oldSection || !newSection) continue
    detectStructuralChanges(oldSection, newSection, sectionId)
  }

  // Case 2: Renamed sections -- match by DFS order + element type
  for (const { oldId, newId } of renamePairs) {
    const oldSection = findSection(oldTree, oldId)
    const newSection = findSection(newTree, newId)
    if (!oldSection || !newSection) continue

    const oldNodes = collectInertOrdered(oldSection)
    const newNodes = collectInertOrdered(newSection)

    // Group by elementType + key for ordered matching
    const oldByTypeKey = new Map<string, TreeNode[]>()
    for (const node of oldNodes) {
      const key = `${node.elementType}:${node.meta?.name || ""}`
      if (!oldByTypeKey.has(key)) oldByTypeKey.set(key, [])
      oldByTypeKey.get(key)!.push(node)
    }

    const newByTypeKey = new Map<string, TreeNode[]>()
    for (const node of newNodes) {
      const key = `${node.elementType}:${node.meta?.name || ""}`
      if (!newByTypeKey.has(key)) newByTypeKey.set(key, [])
      newByTypeKey.get(key)!.push(node)
    }

    // Match by position within each type+key group
    for (const [typeKey, newGroup] of newByTypeKey) {
      const oldGroup = oldByTypeKey.get(typeKey)
      if (!oldGroup) {
        // New attribute type -- detect as add-attribute
        for (const node of newGroup) {
          if (
            node.elementType === "component-attribute" &&
            node.value &&
            node.meta?.name
          ) {
            // Find parent component tag name
            const parentTag = findParentTagName(newSection, node)
            addChange({
              elementType: node.elementType,
              key: node.meta.name,
              oldValue: "",
              newValue: node.value,
              path: `${newId}/${typeKey}`,
              tagName: parentTag,
              action: "add-attribute",
            })
          }
        }
        continue
      }
      const limit = Math.min(oldGroup.length, newGroup.length)
      for (let i = 0; i < limit; i++) {
        compareNodes(oldGroup[i], newGroup[i], `${newId}/${typeKey}:${i}`)
      }
    }

    // Structural changes within renamed sections
    detectStructuralChanges(oldSection, newSection, newId)
  }

  return changes
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
