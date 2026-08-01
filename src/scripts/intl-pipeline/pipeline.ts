/**
 * Incremental Translation Pipeline
 *
 * Given an English content change (A -> B), updates locale translations with
 * minimum LLM usage. Changes that don't affect translatable prose are
 * propagated deterministically. Only actual prose changes go to the LLM.
 *
 * Uses intl-content-tree for Merkle-tree-based change detection.
 */

import {
  type ChangeSet,
  type ContentTreeConfig,
  diff,
  type DiffResult,
  extractChanges,
  getNodeByPath,
  LABEL_NODE_ID,
  parseJson,
  parseMarkdown,
  type TreeNode,
  walk,
} from "intl-content-tree"

import { TRANSLATABLE_ATTRIBUTES } from "./lib/shared-patterns"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const PIPELINE_CONFIG: Partial<ContentTreeConfig> = {
  depth: "element",
  translatableAttributes: [...TRANSLATABLE_ATTRIBUTES],
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LlmTranslator = (
  sectionId: string,
  englishContent: string
) => string

// ---------------------------------------------------------------------------
// Text helpers (fence-aware)
// ---------------------------------------------------------------------------

export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function findNextHeading(text: string, startFrom: number): number {
  let inFence = false
  const lines = text.slice(startFrom).split("\n")
  let pos = startFrom
  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      pos += lines[i].length + 1
      continue
    }
    const line = lines[i]
    if (line.startsWith("```")) {
      inFence = !inFence
    }
    if (!inFence && line.match(/^#{1,6}\s/)) {
      return pos
    }
    pos += line.length + 1
  }
  return text.length
}

export function findSection(
  text: string,
  sectionId: string
): { start: number; end: number; headingLine: string } | null {
  const pattern = new RegExp(
    `(^#{1,6}\\s+[^\\n]*\\{#${escapeRegex(sectionId)}\\}[^\\n]*)`,
    "m"
  )
  const match = text.match(pattern)
  if (!match || match.index === undefined) return null
  const lineStart = text.lastIndexOf("\n", match.index) + 1
  const afterHeading = match.index + match[0].length
  const end = findNextHeading(text, afterHeading)
  return { start: lineStart, end, headingLine: match[0] }
}

export function getSectionOrder(text: string): string[] {
  const ids: string[] = []
  let inFence = false
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence
    if (inFence) continue
    const m = line.match(/^#{2,6}\s+[^\n]*\{#([^}]+)\}/)
    if (m) ids.push(m[1])
  }
  return ids
}

interface HeadingInfo {
  level: number
  id: string | null
  label: string
  lineIdx: number
}

/** All heading lines outside code fences, in document order. */
function scanHeadings(text: string): HeadingInfo[] {
  const out: HeadingInfo[] = []
  let inFence = false
  const lines = text.split("\n")
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = lines[i].match(/^(#{1,6})\s+(.*)$/)
    if (!m) continue
    out.push({
      level: m[1].length,
      id: m[2].match(/\{#([^}]+)\}/)?.[1] ?? null,
      label: m[2].replace(/\s*\{#[^}]+\}\s*$/, "").trim(),
      lineIdx: i,
    })
  }
  return out
}

function anchorSet(text: string): Set<string> {
  const ids = new Set<string>()
  for (const h of scanHeadings(text)) if (h.id) ids.add(h.id)
  return ids
}

/**
 * Nearest enclosing heading section for a tree path. Element segments carry a
 * colon (`link:0`, `component:8`, `frontmatter:image`); section segments don't.
 */
function containingSectionId(path: string): string | null {
  const segments = path.split("/").filter((s) => !s.includes(":"))
  return segments.length ? segments[segments.length - 1] : null
}

/**
 * Run a text transform over one section of the locale file instead of the whole
 * document, so a changed value can't rewrite identical values elsewhere. Falls
 * back to document scope when the section can't be located (root-level content,
 * or an anchor that has drifted out of the locale).
 */
function applyInSection(
  text: string,
  sectionId: string | null,
  transform: (scope: string) => string
): string {
  if (sectionId) {
    const sec = findSection(text, sectionId)
    if (sec) {
      return (
        text.slice(0, sec.start) +
        transform(text.slice(sec.start, sec.end)) +
        text.slice(sec.end)
      )
    }
  }
  return transform(text)
}

/** Drop lines [start, end) and collapse the blank run left at the seam. */
function spliceLines(lines: string[], start: number, end: number): string[] {
  const out = [...lines.slice(0, start), ...lines.slice(end)]
  while (
    start > 0 &&
    out[start - 1]?.trim() === "" &&
    out[start]?.trim() === ""
  ) {
    out.splice(start, 1)
  }
  return out
}

/** Drop text [start, end) and collapse the blank run left at the seam. */
function spliceRange(text: string, start: number, end: number): string {
  const before = text.slice(0, start)
  let after = text.slice(end)
  if (/\n\s*\n$/.test(before)) after = after.replace(/^\s*\n+/, "")
  return before + after
}

/**
 * Remove a locale section whose English counterpart was deleted. Stops at any
 * heading whose anchor still exists in English, so a surviving subsection is
 * never collateral damage.
 */
function removeLocaleSection(
  text: string,
  sectionId: string,
  keepAnchors: Set<string>
): string {
  const headings = scanHeadings(text)
  const idx = headings.findIndex((h) => h.id === sectionId)
  if (idx === -1) return text
  const lines = text.split("\n")
  const start = headings[idx].lineIdx
  let end = lines.length
  for (let i = idx + 1; i < headings.length; i++) {
    const h = headings[i]
    if (h.level <= headings[idx].level || (h.id && keepAnchors.has(h.id))) {
      end = h.lineIdx
      break
    }
  }
  return spliceLines(lines, start, end).join("\n")
}

/**
 * Remove a JSX component the English side deleted. Matched by tag name plus its
 * inert attribute values, never by position -- SOV locales reorder elements.
 */
function removeLocaleComponent(
  text: string,
  node: TreeNode,
  sectionId: string | null
): string {
  const tag = node.meta?.tagName
  if (!tag) return text
  const attrValues = node.children
    .filter((c) => c.elementType === "component-attribute" && c.value)
    .map((c) => c.value as string)

  return applyInSection(text, sectionId, (scope) => {
    const openTagPattern = new RegExp(
      `<${escapeRegex(tag)}(?=[\\s/>])([^>]*?)(/)?>`,
      "g"
    )
    let match: RegExpExecArray | null
    while ((match = openTagPattern.exec(scope)) !== null) {
      if (!attrValues.every((v) => match![1].includes(v))) continue
      let end: number
      if (match[2] === "/") {
        end = match.index + match[0].length
      } else {
        const closeIdx = scope.indexOf(`</${tag}>`, match.index)
        if (closeIdx === -1) continue
        end = closeIdx + tag.length + 3
      }
      return spliceRange(scope, match.index, end)
    }
    return scope
  })
}

/** Tag name plus sorted attribute values -- a component's identity, order-free. */
function componentIdentity(node: TreeNode): string {
  const attrs = node.children
    .filter((c) => c.elementType === "component-attribute" && c.value)
    .map((c) => `${c.meta?.name ?? ""}=${c.value}`)
    .sort()
  return `${node.meta?.tagName ?? ""}|${attrs.join(",")}`
}

function countComponents(tree: TreeNode, identity: string): number {
  let n = 0
  for (const node of walk(tree)) {
    if (
      node.elementType === "component" &&
      componentIdentity(node) === identity
    )
      n++
  }
  return n
}

/** Force `{#sectionId}` onto a heading line, replacing any other anchor. */
function withAnchor(headingLine: string, sectionId: string): string {
  const trimmed = headingLine.trimEnd()
  if (trimmed.includes(`{#${sectionId}}`)) return trimmed
  return `${trimmed.replace(/\s*\{#[^}]*\}\s*$/, "")} {#${sectionId}}`
}

function headingLabel(headingLine: string): string {
  return headingLine
    .replace(/^#{1,6}\s+/, "")
    .replace(/\s*\{#[^}]+\}\s*$/, "")
    .trim()
}

/**
 * Join a heading line with an LLM section translation.
 *
 * The prompt sends the heading as an attribute and asks only for body content
 * back, so the heading must be supplied here rather than trusted to appear in
 * the model output. Ordinary body updates discard an echoed heading. The pure
 * transformer still accepts one for known heading additions/relabels, while
 * production routes those changes to full translation before this path.
 */
function assembleSection(
  headingLine: string,
  translated: string,
  sectionId: string,
  acceptEchoedHeading: boolean
): string {
  const body = translated.replace(/^\s+/, "").trimEnd()
  const firstBreak = body.indexOf("\n")
  const firstLine = firstBreak === -1 ? body : body.slice(0, firstBreak)
  if (/^#{1,6}\s/.test(firstLine)) {
    const rest =
      firstBreak === -1 ? "" : body.slice(firstBreak + 1).replace(/^\n+/, "")
    const heading = acceptEchoedHeading
      ? withAnchor(firstLine, sectionId)
      : headingLine
    return rest ? `${heading}\n\n${rest}` : heading
  }
  return body ? `${headingLine}\n\n${body}` : headingLine
}

/** Replace a located section with `content`, keeping a blank line before the next heading. */
function spliceSection(
  text: string,
  section: { start: number; end: number },
  content: string
): string {
  const separator = section.end < text.length ? "\n\n" : "\n"
  return (
    text.slice(0, section.start) + content + separator + text.slice(section.end)
  )
}

// ---------------------------------------------------------------------------
// Structural invariants
// ---------------------------------------------------------------------------

export interface StructuralRegression {
  kind:
    | "anchor"
    | "heading-count"
    | "heading-level"
    | "heading-parent"
    | "heading-order"
    | "href"
  detail: string
}

export interface IncrementalHazard {
  kind:
    | "analysis"
    | "heading-addition"
    | "heading-label"
    | "heading-level"
    | "heading-parent"
    | "heading-order"
    | "unanchored-heading"
    | "frontmatter-translation"
    | "ambiguous-href"
  detail: string
}

export type IncrementalSafetyIssue = IncrementalHazard | StructuralRegression

export type IncrementalFallbackStage = "preflight" | "post-assembly"

/** Destination token without a Markdown link's optional title. */
function markdownDestination(target: string): string {
  const trimmed = target.trim()
  if (trimmed.startsWith("<")) {
    const closingBracket = trimmed.indexOf(">")
    if (closingBracket !== -1) return trimmed.slice(0, closingBracket + 1)
  }
  const whitespace = trimmed.search(/\s/)
  return whitespace === -1 ? trimmed : trimmed.slice(0, whitespace)
}

function normalizedMarkdownHref(target: string): string {
  const destination = markdownDestination(target)
  return destination.startsWith("<") && destination.endsWith(">")
    ? destination.slice(1, -1)
    : destination
}

function hrefList(text: string): string[] {
  const hrefs: string[] = []
  for (const node of walk(parseMarkdown(text, PIPELINE_CONFIG))) {
    if (node.elementType === "link" && typeof node.meta?.href === "string") {
      hrefs.push(normalizedMarkdownHref(node.meta.href))
    } else if (
      node.elementType === "image" &&
      typeof node.meta?.src === "string"
    ) {
      hrefs.push(normalizedMarkdownHref(node.meta.src))
    } else if (
      node.elementType === "html-tag" &&
      typeof node.meta?.href === "string"
    ) {
      hrefs.push(node.meta.href)
    } else if (
      node.elementType === "component-attribute" &&
      node.meta?.name === "href" &&
      typeof node.value === "string"
    ) {
      hrefs.push(node.value)
    }
  }
  return hrefs
}

/** Replace only a Markdown link destination, preserving any locale title. */
function replaceMarkdownDestination(
  text: string,
  oldTarget: string,
  newTarget: string
): string {
  const oldDestination = markdownDestination(oldTarget)
  const newDestination = markdownDestination(newTarget)
  if (!oldDestination || !newDestination) return text

  if (oldDestination === newDestination) {
    const exactTarget = new RegExp(
      `(\\]\\(\\s*)${escapeRegex(oldTarget.trim())}(?=\\s*\\))`,
      "g"
    )
    return text.replace(
      exactTarget,
      (_, prefix: string) => `${prefix}${newTarget.trim()}`
    )
  }

  const destinationPattern = new RegExp(
    `(\\]\\(\\s*)${escapeRegex(oldDestination)}(?=\\s|\\))`,
    "g"
  )
  return text.replace(
    destinationPattern,
    (_, prefix: string) => `${prefix}${newDestination}`
  )
}

function replaceQuotedAttributeValue(
  text: string,
  attribute: string,
  oldValue: string,
  newValue: string
): string {
  const pattern = new RegExp(
    `(\\b${escapeRegex(attribute)}\\s*=\\s*)(["'])${escapeRegex(oldValue)}\\2`,
    "g"
  )
  return text.replace(
    pattern,
    (_, prefix: string, quote: string) => `${prefix}${quote}${newValue}${quote}`
  )
}

/** Multiset difference: items in `actual` that `expected` does not account for. */
function surplus(expected: string[], actual: string[]): string[] {
  const budget = new Map<string, number>()
  for (const x of expected) budget.set(x, (budget.get(x) ?? 0) + 1)
  const out: string[] = []
  for (const x of actual) {
    const left = budget.get(x) ?? 0
    if (left === 0) out.push(x)
    else budget.set(x, left - 1)
  }
  return out
}

interface StructuralDelta {
  missingAnchors: string[]
  extraAnchors: string[]
  headingDelta: number
  levelMismatches: string[]
  parentMismatches: string[]
  orderMismatches: string[]
  missingHrefs: string[]
  extraHrefs: string[]
}

interface AnchoredHeading {
  id: string
  level: number
  label: string
  parentId: string | null
}

function anchoredHeadings(text: string): AnchoredHeading[] {
  const stack: HeadingInfo[] = []
  const out: AnchoredHeading[] = []
  for (const heading of scanHeadings(text)) {
    while (stack.length && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    if (heading.id) {
      out.push({
        id: heading.id,
        level: heading.level,
        label: heading.label,
        parentId:
          [...stack].reverse().find((candidate) => candidate.id)?.id ?? null,
      })
    }
    stack.push(heading)
  }
  return out
}

function headingMismatchLists(
  english: string,
  locale: string
): {
  levels: string[]
  parents: string[]
  order: string[]
} {
  const englishHeadings = anchoredHeadings(english)
  const localeHeadings = anchoredHeadings(locale)
  const localeById = new Map(
    localeHeadings.map((heading) => [heading.id, heading])
  )

  const levels: string[] = []
  const parents: string[] = []
  for (const heading of englishHeadings) {
    const localeHeading = localeById.get(heading.id)
    if (!localeHeading) continue
    if (localeHeading.level !== heading.level) {
      levels.push(`${heading.id}:${heading.level}->${localeHeading.level}`)
    }
    if (localeHeading.parentId !== heading.parentId) {
      parents.push(
        `${heading.id}:${heading.parentId ?? "root"}->${localeHeading.parentId ?? "root"}`
      )
    }
  }

  const localePositions = new Map(
    localeHeadings.map((heading, index) => [heading.id, index])
  )
  const commonEnglish = englishHeadings.filter((heading) =>
    localeById.has(heading.id)
  )
  const order: string[] = []
  for (let i = 0; i < commonEnglish.length; i++) {
    for (let j = i + 1; j < commonEnglish.length; j++) {
      const first = commonEnglish[i].id
      const second = commonEnglish[j].id
      if (localePositions.get(first)! > localePositions.get(second)!) {
        order.push(`${first} must precede ${second}`)
      }
    }
  }
  return { levels, parents, order }
}

function structuralDelta(english: string, locale: string): StructuralDelta {
  const enAnchors = anchoredHeadings(english).map((heading) => heading.id)
  const locAnchors = anchoredHeadings(locale).map((heading) => heading.id)
  const enHrefs = hrefList(english)
  const locHrefs = hrefList(locale)
  const headingMismatches = headingMismatchLists(english, locale)
  return {
    missingAnchors: surplus(locAnchors, enAnchors),
    extraAnchors: surplus(enAnchors, locAnchors),
    headingDelta: scanHeadings(english).length - scanHeadings(locale).length,
    levelMismatches: headingMismatches.levels,
    parentMismatches: headingMismatches.parents,
    orderMismatches: headingMismatches.order,
    missingHrefs: surplus(locHrefs, enHrefs),
    extraHrefs: surplus(enHrefs, locHrefs),
  }
}

/**
 * Structure the incremental merge lost or duplicated relative to English.
 *
 * Reported against the pre-run baseline, not against English outright: locale
 * files legitimately trail English (roughly 7% of them differ on anchors before
 * any run), so only regressions this run introduced are actionable. A non-empty
 * result means the merged output should be discarded in favour of a full
 * translation of that file.
 */
export function findStructuralRegressions(
  englishA: string,
  localeA: string,
  englishB: string,
  localeB: string,
  format: "markdown" | "json" = "markdown"
): StructuralRegression[] {
  if (format !== "markdown") return []

  const before = structuralDelta(englishA, localeA)
  const after = structuralDelta(englishB, localeB)
  const out: StructuralRegression[] = []

  for (const id of surplus(before.missingAnchors, after.missingAnchors)) {
    out.push({ kind: "anchor", detail: `{#${id}} dropped from locale` })
  }
  for (const id of surplus(before.extraAnchors, after.extraAnchors)) {
    out.push({ kind: "anchor", detail: `{#${id}} not in English` })
  }
  if (after.headingDelta !== before.headingDelta) {
    out.push({
      kind: "heading-count",
      detail: `heading count off by ${after.headingDelta} (was ${before.headingDelta})`,
    })
  }
  for (const mismatch of surplus(
    before.levelMismatches,
    after.levelMismatches
  )) {
    out.push({
      kind: "heading-level",
      detail: `heading level changed: ${mismatch}`,
    })
  }
  for (const mismatch of surplus(
    before.parentMismatches,
    after.parentMismatches
  )) {
    out.push({
      kind: "heading-parent",
      detail: `heading parent changed: ${mismatch}`,
    })
  }
  for (const mismatch of surplus(
    before.orderMismatches,
    after.orderMismatches
  )) {
    out.push({
      kind: "heading-order",
      detail: `heading order changed: ${mismatch}`,
    })
  }
  for (const href of surplus(before.missingHrefs, after.missingHrefs)) {
    out.push({ kind: "href", detail: `${href} dropped from locale` })
  }
  for (const href of surplus(before.extraHrefs, after.extraHrefs)) {
    out.push({ kind: "href", detail: `stale ${href} left in locale` })
  }
  return out
}

/** Full translations have no historical locale drift to preserve. */
export function findFullTranslationStructuralRegressions(
  english: string,
  translated: string,
  format: "markdown" | "json" = "markdown"
): StructuralRegression[] {
  return findStructuralRegressions("", "", english, translated, format)
}

function countValues(values: string[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return counts
}

/**
 * English changes the body-only incremental contract cannot apply safely.
 * These are rejected before an LLM call or blob write and use full translation
 * for this file only.
 */
export function findIncrementalHazards(
  englishA: string,
  englishB: string,
  format: "markdown" | "json" = "markdown",
  config: Partial<ContentTreeConfig> = PIPELINE_CONFIG
): IncrementalHazard[] {
  if (format !== "markdown") return []

  let changes: ChangeSet
  try {
    const treeA = parseMarkdown(englishA, config)
    const treeB = parseMarkdown(englishB, config)
    changes = extractChanges(treeA, treeB)
  } catch (error) {
    return [
      {
        kind: "analysis",
        detail: `could not classify English structure: ${error instanceof Error ? error.message : String(error)}`,
      },
    ]
  }

  const hazards: IncrementalHazard[] = []
  const headingsA = anchoredHeadings(englishA)
  const headingsB = anchoredHeadings(englishB)
  const byIdA = new Map(headingsA.map((heading) => [heading.id, heading]))
  const byIdB = new Map(headingsB.map((heading) => [heading.id, heading]))
  const renameToNew = new Map(
    changes.sectionRenames.map((rename) => [rename.oldId, rename.newId])
  )
  const renameToOld = new Map(
    changes.sectionRenames.map((rename) => [rename.newId, rename.oldId])
  )

  const mappedOldId = (newId: string): string | null => {
    if (byIdA.has(newId)) return newId
    return renameToOld.get(newId) ?? null
  }
  const mappedNewId = (oldId: string): string | null => {
    const renamed = renameToNew.get(oldId)
    if (renamed && byIdB.has(renamed)) return renamed
    return byIdB.has(oldId) ? oldId : null
  }

  const duplicateCountsA = countValues(headingsA.map((heading) => heading.id))
  const duplicateCountsB = countValues(headingsB.map((heading) => heading.id))
  for (const [id, count] of duplicateCountsB) {
    if (count > (duplicateCountsA.get(id) ?? 0)) {
      hazards.push({
        kind: "heading-addition",
        detail: `{#${id}} is duplicated in the new English structure`,
      })
    }
  }

  for (const headingB of headingsB) {
    const oldId = mappedOldId(headingB.id)
    if (!oldId) {
      hazards.push({
        kind: "heading-addition",
        detail: `new section {#${headingB.id}} needs a translated heading`,
      })
      continue
    }
    const headingA = byIdA.get(oldId)
    if (!headingA) continue
    if (headingA.label !== headingB.label) {
      hazards.push({
        kind: "heading-label",
        detail: `{#${headingB.id}} label changed and the incremental response is body-only`,
      })
    }
    if (headingA.level !== headingB.level) {
      hazards.push({
        kind: "heading-level",
        detail: `{#${headingB.id}} moved from h${headingA.level} to h${headingB.level}`,
      })
    }

    const oldParent = headingA.parentId ? mappedNewId(headingA.parentId) : null
    if (oldParent !== headingB.parentId) {
      hazards.push({
        kind: "heading-parent",
        detail: `{#${headingB.id}} moved from {#${oldParent ?? "root"}} to {#${headingB.parentId ?? "root"}}`,
      })
    }
  }

  const oldOrderAfterDeletesAndRenames = headingsA
    .map((heading) => mappedNewId(heading.id))
    .filter((id): id is string => id !== null)
  const existingNewOrder = headingsB
    .filter((heading) => mappedOldId(heading.id) !== null)
    .map((heading) => heading.id)
  if (
    oldOrderAfterDeletesAndRenames.join("\n") !== existingNewOrder.join("\n")
  ) {
    hazards.push({
      kind: "heading-order",
      detail: "existing sections changed document order",
    })
  }

  const unanchoredA = scanHeadings(englishA)
    .filter((heading) => !heading.id)
    .map((heading) => `${heading.level}:${heading.label}`)
  const unanchoredB = scanHeadings(englishB)
    .filter((heading) => !heading.id)
    .map((heading) => `${heading.level}:${heading.label}`)
  if (unanchoredA.join("\n") !== unanchoredB.join("\n")) {
    hazards.push({
      kind: "unanchored-heading",
      detail: "an unanchored heading was added, removed, moved, or relabelled",
    })
  }

  for (const change of changes.changes) {
    if (
      change.elementType === "frontmatter-field" &&
      change.contentType === "translatable"
    ) {
      hazards.push({
        kind: "frontmatter-translation",
        detail: `frontmatter field ${change.key ?? change.path} needs translation`,
      })
    }
  }

  for (const headingB of headingsB) {
    const oldId = mappedOldId(headingB.id)
    if (!oldId) continue
    const sectionA = findSection(englishA, oldId)
    const sectionB = findSection(englishB, headingB.id)
    if (!sectionA || !sectionB) continue
    const hrefsA = hrefList(englishA.slice(sectionA.start, sectionA.end))
    const hrefsB = hrefList(englishB.slice(sectionB.start, sectionB.end))
    const countsA = countValues(hrefsA)
    const countsB = countValues(hrefsB)
    for (const [href, oldCount] of countsA) {
      const newCount = countsB.get(href) ?? 0
      if (oldCount <= 1 || newCount >= oldCount) continue
      const added = [...countsB].filter(
        ([candidate, count]) => count > (countsA.get(candidate) ?? 0)
      )
      const unambiguousWholeReplacement =
        newCount === 0 &&
        added.length === 1 &&
        added[0][1] - (countsA.get(added[0][0]) ?? 0) === oldCount
      if (!unambiguousWholeReplacement) {
        hazards.push({
          kind: "ambiguous-href",
          detail: `{#${headingB.id}} changes only some repeated occurrences of ${href}`,
        })
      }
    }
  }

  return hazards
}

interface IncrementalSafetyOptions<T> {
  englishA: string
  englishB: string
  localeA: string
  format: "markdown" | "json"
  generateIncremental: () => string | Promise<string>
  acceptIncremental: (content: string) => T | Promise<T>
  fallbackToFull: (
    issues: IncrementalSafetyIssue[],
    stage: IncrementalFallbackStage
  ) => T | Promise<T>
}

/** Execute the exact preflight -> incremental -> invariant -> commit boundary. */
export async function runIncrementalWithStructuralFallback<T>(
  options: IncrementalSafetyOptions<T>
): Promise<T> {
  const hazards = findIncrementalHazards(
    options.englishA,
    options.englishB,
    options.format
  )
  if (hazards.length > 0) {
    return options.fallbackToFull(hazards, "preflight")
  }

  const result = await options.generateIncremental()
  const regressions = findStructuralRegressions(
    options.englishA,
    options.localeA,
    options.englishB,
    result,
    options.format
  )
  if (regressions.length > 0) {
    return options.fallbackToFull(regressions, "post-assembly")
  }

  return options.acceptIncremental(result)
}

function parseFrontmatter(
  text: string
): { yaml: string; body: string; start: number; end: number } | null {
  if (!text.startsWith("---")) return null
  const endIdx = text.indexOf("\n---", 3)
  if (endIdx === -1) return null
  const yamlEnd = endIdx + 4
  return {
    yaml: text.slice(4, endIdx),
    body: text.slice(yamlEnd),
    start: 0,
    end: yamlEnd,
  }
}

// ---------------------------------------------------------------------------
// JSON Pipeline
// ---------------------------------------------------------------------------

function pipelineJson(
  englishA: string,
  englishB: string,
  localeA: string,
  config: Partial<ContentTreeConfig>,
  llm?: LlmTranslator
): string {
  const enB = JSON.parse(englishB) as Record<string, unknown>
  const locA = JSON.parse(localeA) as Record<string, unknown>

  const treeA = parseJson(englishA, config)
  const treeB = parseJson(englishB, config)
  const dr = diff(treeA, treeB)
  const cs = extractChanges(treeA, treeB)

  const unchangedIds = new Set(dr.unchanged.map((e) => e.id))
  const inertIds = new Set(dr.inertDrift.map((e) => e.id))
  const translatableIds = new Set(dr.translatableDrift.map((e) => e.id))
  const addedIds = new Set(dr.added.map((e) => e.id))
  const removedIds = new Set(dr.removed.map((e) => e.id))

  const result: Record<string, unknown> = {}

  for (const key of Object.keys(enB)) {
    if (removedIds.has(key)) continue

    if (addedIds.has(key)) {
      result[key] = llm ? llm(key, String(enB[key])) : enB[key]
      continue
    }

    // Nested objects
    if (
      typeof enB[key] === "object" &&
      enB[key] !== null &&
      !Array.isArray(enB[key])
    ) {
      if (translatableIds.has(key)) {
        if (llm) {
          result[key] = llm(key, JSON.stringify(enB[key]))
        } else {
          const nested = { ...(locA[key] as Record<string, unknown>) }
          for (const change of cs.changes) {
            if (
              change.path.startsWith(key + "/") &&
              change.action === "update"
            ) {
              const subKey = change.path.split("/").pop()!
              if (change.contentType === "translatable") continue
              if (
                subKey &&
                subKey in nested &&
                change.oldValue &&
                change.newValue
              ) {
                nested[subKey] = String(nested[subKey]).replace(
                  change.oldValue,
                  change.newValue
                )
              }
            }
          }
          result[key] = nested
        }
        continue
      }
      result[key] = locA[key] ?? enB[key]
      continue
    }

    if (unchangedIds.has(key)) {
      result[key] = locA[key]
      continue
    }

    if (translatableIds.has(key)) {
      result[key] = llm ? llm(key, String(enB[key])) : (locA[key] ?? enB[key])
      continue
    }

    if (inertIds.has(key)) {
      let value = String(locA[key] ?? enB[key])
      const keyChanges = cs.changes.filter(
        (c) => c.path.startsWith(key + "/") || c.path === key
      )
      for (const change of keyChanges) {
        if (
          change.action !== "update" ||
          change.oldValue === undefined ||
          change.newValue === undefined
        )
          continue

        if (change.elementType === "icu-variable") {
          const oldVarName = change.oldValue.match(/^\{(\w+)/)?.[1]
          const newVarName = change.newValue.match(/^\{(\w+)/)?.[1]
          if (oldVarName && newVarName) {
            value = value.replace(
              new RegExp(`\\{${escapeRegex(oldVarName)}([,}])`, "g"),
              `{${newVarName}$1`
            )
          }
        } else if (change.key === "href") {
          value = value.replace(`"${change.oldValue}"`, `"${change.newValue}"`)
        }
      }
      result[key] = value
      continue
    }

    result[key] = locA[key] ?? enB[key]
  }

  return JSON.stringify(result, null, 2) + "\n"
}

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

/**
 * Ordered hashes of a subtree's translatable leaves, excluding the heading
 * label. A section's own `contentHash` also folds in inert children, so it moves
 * when only a URL or attribute changed.
 */
function translatableFingerprint(node: TreeNode): string {
  const hashes: string[] = []
  for (const child of walk(node)) {
    if (child.id === LABEL_NODE_ID) continue
    if (child.children.length === 0 && child.contentType === "translatable") {
      hashes.push(child.contentHash)
    }
  }
  return hashes.join("|")
}

interface Routing {
  leafTdPaths: string[]
  addedIds: Set<string>
  renamedOldIds: Set<string>
  llmSectionIds: Set<string>
}

function route(
  treeA: TreeNode,
  treeB: TreeNode,
  dr: DiffResult,
  cs: ChangeSet
): Routing {
  // Leaf translatableDrift sections only -- parents would duplicate their children
  const tdPaths = dr.translatableDrift.map((e) => e.path)
  const leafTdPaths = tdPaths.filter(
    (p) => !tdPaths.some((o) => o !== p && o.startsWith(p + "/"))
  )
  const leafTdIds = dr.translatableDrift
    .filter((e) => leafTdPaths.includes(e.path))
    .map((e) => e.id)

  const renamedOldIds = new Set(cs.sectionRenames.map((r) => r.oldId))
  const renamedNewIds = new Set(cs.sectionRenames.map((r) => r.newId))

  const addedIds = new Set(
    dr.added.filter((e) => !renamedNewIds.has(e.id)).map((e) => e.id)
  )

  // A renamed section whose translatable content also changed has to be
  // retranslated: it lands in neither `added` nor `translatableDrift`, so
  // renaming the anchor alone would leave the old body under the new heading.
  const renamedRetranslateIds = new Set<string>()
  for (const rename of cs.sectionRenames) {
    const oldPath = dr.removed.find((e) => e.id === rename.oldId)?.path
    const newPath = dr.added.find((e) => e.id === rename.newId)?.path
    if (!oldPath || !newPath) continue
    const oldNode = getNodeByPath(treeA, oldPath)
    const newNode = getNodeByPath(treeB, newPath)
    if (!oldNode || !newNode) continue
    if (translatableFingerprint(oldNode) !== translatableFingerprint(newNode)) {
      renamedRetranslateIds.add(rename.newId)
    }
  }

  const llmSectionIds = new Set(
    [...leafTdIds, ...addedIds, ...renamedRetranslateIds].filter(
      (id) => !id.startsWith("frontmatter:")
    )
  )

  return { leafTdPaths, addedIds, renamedOldIds, llmSectionIds }
}

/** Section IDs the LLM must translate for this English diff. */
export function getLlmSectionIds(
  englishA: string,
  englishB: string,
  format: "markdown" | "json",
  config: Partial<ContentTreeConfig> = PIPELINE_CONFIG
): string[] {
  const parse = format === "markdown" ? parseMarkdown : parseJson
  const treeA = parse(englishA, config)
  const treeB = parse(englishB, config)
  return [
    ...route(treeA, treeB, diff(treeA, treeB), extractChanges(treeA, treeB))
      .llmSectionIds,
  ]
}

// ---------------------------------------------------------------------------
// Markdown Pipeline
// ---------------------------------------------------------------------------

function pipelineMarkdown(
  englishA: string,
  englishB: string,
  localeA: string,
  config: Partial<ContentTreeConfig>,
  llm?: LlmTranslator
): string {
  const treeA = parseMarkdown(englishA, config)
  const treeB = parseMarkdown(englishB, config)
  const dr = diff(treeA, treeB)
  const cs = extractChanges(treeA, treeB)

  const renames = cs.sectionRenames
  const { leafTdPaths, addedIds, renamedOldIds, llmSectionIds } = route(
    treeA,
    treeB,
    dr,
    cs
  )

  let result = localeA

  // --- Phase 3: Deterministic Propagation ---

  // 3a. Heading ID renames
  for (const rename of renames) {
    result = result.replace(
      new RegExp(`\\{#${escapeRegex(rename.oldId)}\\}`, "g"),
      `{#${rename.newId}}`
    )
  }

  // 3b. Remove what English deleted: whole sections by anchor, components by
  // tag + inert attribute values. Prose and list items are not removed here --
  // deleting a block whose translated counterpart can't be matched by an
  // identifier would be a guess. Those live inside a section whose contentHash
  // changed, so the LLM retranslates the section from English-B instead; if it
  // doesn't, findStructuralRegressions catches the leftovers.
  const enBAnchors = anchorSet(englishB)
  const componentPaths = new Set<string>()

  for (const removed of dr.removed) {
    if (renamedOldIds.has(removed.id)) continue
    const node = getNodeByPath(treeA, removed.path)
    if (node?.elementType === "component") {
      componentPaths.add(removed.path)
      continue
    }
    if (node?.nodeType === "section" && !enBAnchors.has(removed.id)) {
      result = removeLocaleSection(result, removed.id, enBAnchors)
    }
  }

  // A component with children is reported as removals of those children, not of
  // the component node, so collect the enclosing component path either way.
  for (const change of cs.changes) {
    if (change.action !== "remove") continue
    const componentPath = change.path.match(/^(.*component:\d+)(?:\/|$)/)?.[1]
    if (componentPath) componentPaths.add(componentPath)
  }

  // Budget per identity: only as many copies as English actually lost, so a tag
  // that still appears elsewhere in English is left alone.
  const removalBudget = new Map<string, number>()
  for (const path of componentPaths) {
    const node = getNodeByPath(treeA, path)
    if (node?.elementType !== "component") continue
    const identity = componentIdentity(node)
    if (!removalBudget.has(identity)) {
      removalBudget.set(
        identity,
        countComponents(treeA, identity) - countComponents(treeB, identity)
      )
    }
    if ((removalBudget.get(identity) ?? 0) <= 0) continue
    const pruned = removeLocaleComponent(
      result,
      node,
      containingSectionId(path)
    )
    if (pruned !== result) {
      result = pruned
      removalBudget.set(identity, (removalBudget.get(identity) ?? 0) - 1)
    }
  }

  // 3c. Apply inert value updates from extractChanges
  for (const change of cs.changes) {
    if (change.action !== "update") continue
    if (change.oldValue === undefined || change.newValue === undefined) continue

    // Check if this change is inside an LLM section
    let belongsToLlmSection = false
    for (const id of llmSectionIds) {
      if (
        change.path.includes("/" + id + "/") ||
        change.path.startsWith(id + "/")
      ) {
        belongsToLlmSection = true
        break
      }
    }
    for (const p of leafTdPaths) {
      if (change.path.startsWith(p + "/") || change.path === p) {
        belongsToLlmSection = true
        break
      }
    }

    // Skip changes inside LLM sections when mock is provided
    if (belongsToLlmSection && llm) continue

    // Skip translatable changes without LLM
    if (change.contentType === "translatable") continue

    // Inert/mixed changes: apply to locale text
    if (change.elementType === "frontmatter-field" && change.key) {
      const fm = parseFrontmatter(result)
      if (fm) {
        const keyPattern = new RegExp(
          `^(${escapeRegex(change.key)}:\\s*).*$`,
          "m"
        )
        const newYaml = fm.yaml.replace(keyPattern, `$1${change.newValue}`)
        result = `---\n${newYaml}\n---${fm.body}`
      }
      continue
    }

    // Value substitutions are scoped to the section the change belongs to: the
    // same URL, path or code span routinely appears in several sections, and a
    // document-wide replace rewrites every one of them.
    const scopeId = containingSectionId(change.path)

    if (change.elementType === "component-attribute" && change.key) {
      const attrPattern = new RegExp(
        `(${escapeRegex(change.key)}=")${escapeRegex(change.oldValue)}"`,
        "g"
      )
      const jsxPattern = new RegExp(
        `(${escapeRegex(change.key)}=\\{)${escapeRegex(change.oldValue)}(\\})`,
        "g"
      )
      result = applyInSection(result, scopeId, (scope) =>
        attrPattern.test(scope)
          ? scope.replace(attrPattern, `$1${change.newValue}"`)
          : scope.replace(jsxPattern, `$1${change.newValue}$2`)
      )
      continue
    }

    if (change.elementType === "inline-code") {
      const pattern = new RegExp("`" + escapeRegex(change.oldValue) + "`", "g")
      result = applyInSection(result, scopeId, (scope) =>
        scope.replace(pattern, "`" + change.newValue + "`")
      )
      continue
    }

    if (
      (change.elementType === "link" || change.elementType === "image") &&
      (change.key === "href" || change.key === "src")
    ) {
      result = applyInSection(result, scopeId, (scope) =>
        replaceMarkdownDestination(scope, change.oldValue!, change.newValue!)
      )
      continue
    }

    if (change.elementType === "html-tag" && change.key === "href") {
      result = applyInSection(result, scopeId, (scope) =>
        replaceQuotedAttributeValue(
          scope,
          "href",
          change.oldValue!,
          change.newValue!
        )
      )
      continue
    }
  }

  // 3d. Apply structural additions
  for (const change of cs.changes) {
    if (change.action !== "add") continue

    const attrName = change.key || change.path.match(/attr:(\w+)$/)?.[1]

    if (
      change.elementType === "component-attribute" &&
      attrName &&
      change.newValue
    ) {
      for (const enBLine of englishB.split("\n")) {
        if (!enBLine.includes(`${attrName}="${change.newValue}"`)) continue
        const hrefMatch = enBLine.match(/href="([^"]+)"/)
        if (hrefMatch) {
          const href = hrefMatch[1]
          const enAHasIt = englishA
            .split("\n")
            .some((l) => l.includes(`href="${href}"`) && l.includes(attrName))
          if (!enAHasIt) {
            const pattern = new RegExp(
              `(<\\w+\\s+href="${escapeRegex(href)}")`,
              "g"
            )
            result = applyInSection(
              result,
              containingSectionId(change.path),
              (scope) =>
                scope.replace(pattern, `$1 ${attrName}="${change.newValue}"`)
            )
          }
        }
        break
      }
      continue
    }

    if (change.elementType === "code-body" && change.newValue) {
      const pathParts = change.path.split("/")
      const codeFenceIdx = pathParts.findIndex((p) =>
        p.startsWith("code-fence:")
      )
      const sectionId = codeFenceIdx > 0 ? pathParts[codeFenceIdx - 1] : ""

      if (sectionId) {
        const sec = findSection(result, sectionId)
        if (sec) {
          const enBSec = findSection(englishB, sectionId)
          if (enBSec) {
            const enBContent = englishB.slice(enBSec.start, enBSec.end)
            const fencePattern = /```\w+\n[\s\S]*?```/g
            const enASecObj = findSection(englishA, sectionId)
            const enAContent = enASecObj
              ? englishA.slice(enASecObj.start, enASecObj.end)
              : ""
            let fenceMatch: RegExpExecArray | null
            while ((fenceMatch = fencePattern.exec(enBContent)) !== null) {
              if (!enAContent.includes(fenceMatch[0])) {
                const secContent = result.slice(sec.start, sec.end)
                const trimmed = secContent.trimEnd()
                const insertAt = sec.start + trimmed.length
                result =
                  result.slice(0, insertAt) +
                  "\n\n" +
                  fenceMatch[0] +
                  "\n" +
                  result.slice(sec.end)
                break
              }
            }
          }
        }
      }
      continue
    }
  }

  // 3e. Supplementary pass: propagate attribute changes extractChanges missed
  const inertOrStructIds = new Set([
    ...dr.inertDrift.map((e) => e.id),
    ...dr.structuralDrift.map((e) => e.id),
  ])
  for (const sectionId of inertOrStructIds) {
    if (sectionId.startsWith("frontmatter:") || sectionId.includes(":"))
      continue

    const enASec = findSection(englishA, sectionId)
    const enBSec = findSection(englishB, sectionId)
    if (!enASec || !enBSec) continue

    const enAContent = englishA.slice(enASec.start, enASec.end)
    const enBContent = englishB.slice(enBSec.start, enBSec.end)

    // Compare heading lines for attribute changes
    const enAHeading = enAContent.split("\n")[0]
    const enBHeading = enBContent.split("\n")[0]
    if (enAHeading !== enBHeading) {
      const headingAttrPattern = /(\w+)="([^"]*)"/g
      const headingAAttrs: Array<[string, string]> = []
      const headingBAttrs: Array<[string, string]> = []
      let m: RegExpExecArray | null
      while ((m = headingAttrPattern.exec(enAHeading)) !== null) {
        headingAAttrs.push([m[1], m[2]])
      }
      headingAttrPattern.lastIndex = 0
      while ((m = headingAttrPattern.exec(enBHeading)) !== null) {
        headingBAttrs.push([m[1], m[2]])
      }
      for (let i = 0; i < headingAAttrs.length; i++) {
        if (
          headingBAttrs[i] &&
          headingAAttrs[i][0] === headingBAttrs[i][0] &&
          headingAAttrs[i][1] !== headingBAttrs[i][1]
        ) {
          const oldAttr = `${headingAAttrs[i][0]}="${headingAAttrs[i][1]}"`
          const newAttr = `${headingBAttrs[i][0]}="${headingBAttrs[i][1]}"`
          result = applyInSection(result, sectionId, (scope) =>
            scope.replace(oldAttr, newAttr)
          )
        }
      }
    }

    // Compare component attributes within the section
    const enALines = enAContent.split("\n").slice(1)
    const enBLines = enBContent.split("\n").slice(1)
    for (let i = 0; i < Math.min(enALines.length, enBLines.length); i++) {
      if (enALines[i] === enBLines[i]) continue
      if (enALines[i].match(/^\s*</) || enBLines[i].match(/^\s*</)) {
        const attrPat = /(\w+)="([^"]*)"/g
        const aAttrs = new Map<string, string>()
        const bAttrs = new Map<string, string>()
        let am: RegExpExecArray | null
        while ((am = attrPat.exec(enALines[i])) !== null)
          aAttrs.set(am[1], am[2])
        attrPat.lastIndex = 0
        while ((am = attrPat.exec(enBLines[i])) !== null)
          bAttrs.set(am[1], am[2])
        for (const [key, oldVal] of aAttrs) {
          const newVal = bAttrs.get(key)
          if (newVal && newVal !== oldVal) {
            const alreadyHandled = cs.changes.some(
              (c) => c.oldValue === oldVal && c.newValue === newVal
            )
            if (!alreadyHandled) {
              result = applyInSection(result, sectionId, (scope) =>
                scope.replace(`${key}="${oldVal}"`, `${key}="${newVal}"`)
              )
            }
          }
        }
      }
    }
  }

  // --- Phase 4 & 5: LLM Translation + Assembly ---

  for (const sectionId of llmSectionIds) {
    const enBSec = findSection(englishB, sectionId)
    if (!enBSec) continue
    const englishContent = englishB.slice(enBSec.start, enBSec.end).trimEnd()

    // Without an LLM the English body stands in, so the pipeline stays testable
    // and a missing API key degrades to untranslated rather than to data loss.
    const translated = llm ? llm(sectionId, englishContent) : englishContent

    if (addedIds.has(sectionId)) {
      const enBOrder = getSectionOrder(englishB)
      const idx = enBOrder.indexOf(sectionId)
      if (idx <= 0) continue
      const prevSec = findSection(result, enBOrder[idx - 1])
      if (!prevSec) continue
      // New section: no locale heading exists yet, so English-B's stands in when
      // the model returns body only.
      const section = assembleSection(
        enBSec.headingLine,
        translated,
        sectionId,
        true
      )
      result =
        result.slice(0, prevSec.end) +
        section +
        "\n\n" +
        result.slice(prevSec.end)
      continue
    }

    const localeSec = findSection(result, sectionId)
    if (!localeSec) continue
    // An empty model response must never be written back: it would delete the
    // whole section, heading included.
    if (!translated.trim()) continue
    const previousId =
      renames.find((rename) => rename.newId === sectionId)?.oldId ?? sectionId
    const enASec = findSection(englishA, previousId)
    const headingChanged =
      enASec !== null &&
      headingLabel(enASec.headingLine) !== headingLabel(enBSec.headingLine)
    result = spliceSection(
      result,
      localeSec,
      assembleSection(
        localeSec.headingLine,
        translated,
        sectionId,
        headingChanged
      )
    )
  }

  // --- Section Reordering ---
  const enBH2Order = getSectionOrder(englishB).filter((id) => {
    const match = englishB.match(
      new RegExp(`^##\\s+[^\\n]*\\{#${escapeRegex(id)}\\}`, "m")
    )
    return match !== null
  })

  const h2Sections: { id: string; content: string }[] = []
  let beforeFirstH2 = ""

  {
    const lines = result.split("\n")
    let inFence = false
    const h2Starts: { id: string; lineIdx: number }[] = []
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("```")) inFence = !inFence
      if (inFence) continue
      const m = lines[i].match(/^## [^\n]*\{#([^}]+)\}/)
      if (m) h2Starts.push({ id: m[1], lineIdx: i })
    }

    if (h2Starts.length > 0) {
      beforeFirstH2 = lines.slice(0, h2Starts[0].lineIdx).join("\n") + "\n"
      for (let i = 0; i < h2Starts.length; i++) {
        const startLine = h2Starts[i].lineIdx
        const endLine =
          i + 1 < h2Starts.length ? h2Starts[i + 1].lineIdx : lines.length
        h2Sections.push({
          id: h2Starts[i].id,
          content:
            lines.slice(startLine, endLine).join("\n") +
            (endLine < lines.length ? "\n" : ""),
        })
      }
    }
  }

  if (h2Sections.length > 0 && enBH2Order.length > 0) {
    const sectionMap = new Map(h2Sections.map((s) => [s.id, s.content]))
    const reordered: string[] = []
    for (const id of enBH2Order) {
      const content = sectionMap.get(id)
      if (content) {
        reordered.push(content)
        sectionMap.delete(id)
      }
    }
    for (const [, content] of sectionMap) {
      reordered.push(content)
    }
    result = beforeFirstH2 + reordered.join("")
  }

  return result.trimEnd() + "\n"
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function pipeline(
  englishA: string,
  englishB: string,
  localeA: string,
  format: "markdown" | "json",
  llm?: LlmTranslator,
  config: Partial<ContentTreeConfig> = PIPELINE_CONFIG
): string {
  if (format === "json") {
    return pipelineJson(englishA, englishB, localeA, config, llm)
  }
  return pipelineMarkdown(englishA, englishB, localeA, config, llm)
}
