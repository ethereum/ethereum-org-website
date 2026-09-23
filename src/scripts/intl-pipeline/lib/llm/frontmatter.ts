/**
 * Frontmatter propagation helpers.
 *
 * intl-content-tree >= 0.4 parses the frontmatter block as YAML, so a change
 * arrives as a path into that document: `frontmatter:image`,
 * `frontmatter:topic/1`, `frontmatter:author/name`. Every edit here goes through
 * the `yaml` Document API and mutates existing nodes in place, so quoting style,
 * block vs flow sequences, and comments survive. A regex over `key: value` lines
 * cannot do that: it splices an item into the `topic:` line above the list, and
 * drops the quotes that keep `breadcrumb: "AI Agents: Luna"` valid YAML.
 */

import {
  type Document,
  isCollection,
  isMap,
  isScalar,
  isSeq,
  parseDocument,
  Scalar,
  YAMLSeq,
} from "yaml"

export const FRONTMATTER_PREFIX = "frontmatter:"

/** Sequence fields travel to the LLM as one item per line. */
const ITEM_SEPARATOR = "\n"

export interface FrontmatterDoc {
  doc: Document
  /** Everything after the closing fence, leading newline included */
  body: string
}

/** Split a markdown file into its YAML block and body. */
export function splitFrontmatter(
  text: string
): { yaml: string; body: string } | null {
  if (!text.startsWith("---")) return null
  const endIdx = text.indexOf("\n---", 3)
  if (endIdx === -1) return null
  return { yaml: text.slice(4, endIdx), body: text.slice(endIdx + 4) }
}

/**
 * Parse a file's frontmatter into an editable document. Returns null when the
 * file has no frontmatter or the block is not valid YAML -- callers must then
 * leave the frontmatter alone rather than guess.
 */
export function parseFrontmatterDoc(text: string): FrontmatterDoc | null {
  const split = splitFrontmatter(text)
  if (!split) return null
  const doc = parseDocument(split.yaml)
  if (doc.errors.length > 0 || !isMap(doc.contents)) return null
  return { doc, body: split.body }
}

/** Re-emit the file with the (possibly mutated) frontmatter document. */
export function serializeFrontmatter(fm: FrontmatterDoc): string {
  // Keep untouched lines byte-identical: no `[ "a" ]` padding on flow
  // sequences, and no folding of long plain scalars at 80 columns.
  const yaml = fm.doc.toString({ flowCollectionPadding: false, lineWidth: 0 })
  return `---\n${yaml}---${fm.body}`
}

/**
 * `frontmatter:topic/1` -> ["topic", 1]. Numeric segments are sequence indexes.
 */
export function frontmatterPath(id: string): (string | number)[] {
  return id
    .slice(FRONTMATTER_PREFIX.length)
    .split("/")
    .map((seg) => (/^\d+$/.test(seg) ? Number(seg) : seg))
}

/** The top-level field a frontmatter path belongs to. */
export function frontmatterKey(id: string): string {
  return String(frontmatterPath(id)[0])
}

function scalarText(node: unknown): string {
  if (!isScalar(node)) return ""
  if (typeof node.value === "string") return node.value
  if (node.value === null || node.value === undefined) return ""
  return node.source ?? String(node.value)
}

/**
 * A field's text as sent to the LLM: the scalar itself, or one sequence item
 * per line. Undefined for absent fields and for shapes with no single text form
 * (mappings, sequences of mappings).
 */
export function frontmatterFieldText(
  doc: Document,
  key: string
): string | undefined {
  const node = doc.get(key, true)
  if (isScalar(node)) return scalarText(node)
  if (isSeq(node)) {
    if (!node.items.every((item) => isScalar(item))) return undefined
    return node.items.map(scalarText).join(ITEM_SEPARATOR)
  }
  return undefined
}

function copyStyle(from: unknown, to: Scalar): void {
  if (isScalar(from) && from.type) to.type = from.type
}

/**
 * Write a field's text back, mirroring `frontmatterFieldText`. Scalars keep
 * their quoting; sequences are rebuilt item by item and keep each item's
 * style. The list takes English's shape: when `template` (the English
 * document) is given, the text must carry exactly as many lines as English has
 * items, otherwise the field is left untouched and false is returned -- a
 * model that dropped or merged a line must not change the list's shape.
 */
export function setFrontmatterFieldText(
  doc: Document,
  key: string,
  text: string,
  template?: Document
): boolean {
  const existing = doc.get(key, true)
  const templateNode = template?.get(key, true)
  const wantsSeq = isSeq(existing) || (!existing && isSeq(templateNode))

  if (wantsSeq) {
    const items = text.split(ITEM_SEPARATOR).map((s) => s.trim())
    const expectedCount = isSeq(templateNode)
      ? templateNode.items.length
      : isSeq(existing)
        ? existing.items.length
        : items.length
    if (items.length !== expectedCount) return false
    const seq = isSeq(existing) ? existing : new YAMLSeq()
    if (!isSeq(existing) && isSeq(templateNode)) {
      seq.flow = templateNode.flow
    }
    const styleSource = isSeq(existing)
      ? existing.items
      : isSeq(templateNode)
        ? templateNode.items
        : []
    seq.items = items.map((item, i) => {
      const scalar = new Scalar(item)
      copyStyle(styleSource[i] ?? styleSource[0], scalar)
      return scalar
    })
    if (!isSeq(existing)) doc.set(key, seq)
    return true
  }

  if (isScalar(existing)) {
    existing.value = text
    return true
  }
  if (existing !== undefined && existing !== null) return false

  const scalar = new Scalar(text)
  copyStyle(templateNode, scalar)
  doc.set(key, scalar)
  return true
}

export interface FrontmatterChange {
  action: "update" | "add" | "remove"
  /** Tree path, e.g. `frontmatter:topic/1` */
  path: string
  oldValue?: string
  newValue?: string
}

/**
 * Apply one deterministic change to the document. Sequence items are matched
 * by their old value before their index: a locale list that drifted out of
 * step with English (the pre-0.4 blind spot) must not have the wrong item
 * edited or removed. Returns false when the target could not be located.
 */
export function applyFrontmatterChange(
  doc: Document,
  change: FrontmatterChange,
  english?: Document
): boolean {
  const path = frontmatterPath(change.path)
  const parentPath = path.slice(0, -1)
  const last = path[path.length - 1]
  const parent = parentPath.length ? doc.getIn(parentPath) : doc.contents

  if (change.action === "remove") {
    if (isSeq(parent)) {
      const idx = seqIndex(parent, last, change.oldValue)
      if (idx === -1) return false
      parent.delete(idx)
      return true
    }
    if (!doc.hasIn(path)) return false
    doc.deleteIn(path)
    return true
  }

  if (change.newValue === undefined) return false

  if (change.action === "update") {
    if (isSeq(parent)) {
      const idx = seqIndex(parent, last, change.oldValue)
      if (idx === -1) return false
      const item = parent.get(idx, true)
      if (!isScalar(item)) return false
      item.value = change.newValue
      return true
    }
    const node = doc.getIn(path, true)
    if (!isScalar(node)) return false
    node.value = change.newValue
    return true
  }

  // add
  if (typeof last === "number") {
    let seq: YAMLSeq
    if (isSeq(parent)) {
      seq = parent
    } else {
      if (parent !== undefined && parent !== null) return false
      seq = new YAMLSeq()
      const englishSeq = english?.getIn(parentPath)
      if (isSeq(englishSeq)) seq.flow = englishSeq.flow
      doc.setIn(parentPath, seq)
    }
    const scalar = new Scalar(change.newValue)
    copyStyle(seq.items[0] ?? english?.getIn(path, true), scalar)
    seq.items.splice(Math.min(last, seq.items.length), 0, scalar)
    return true
  }

  if (doc.hasIn(path)) return false
  const scalar = new Scalar(change.newValue)
  copyStyle(english?.getIn(path, true), scalar)
  doc.setIn(path, scalar)
  return true
}

/** Locate a sequence item by old value first, then by index. */
function seqIndex(
  seq: YAMLSeq,
  index: string | number,
  oldValue: string | undefined
): number {
  if (oldValue !== undefined) {
    const byValue = seq.items.findIndex(
      (item) => isScalar(item) && scalarText(item) === oldValue
    )
    if (byValue !== -1) return byValue
  }
  if (typeof index === "number" && index < seq.items.length) return index
  return -1
}

/** True when the path names a whole field rather than an item or subkey. */
export function isWholeField(id: string): boolean {
  return frontmatterPath(id).length === 1
}

/** Whether a node exists at this frontmatter path. */
export function hasFrontmatterPath(doc: Document, id: string): boolean {
  const path = frontmatterPath(id)
  return isCollection(doc.contents) && doc.hasIn(path)
}
