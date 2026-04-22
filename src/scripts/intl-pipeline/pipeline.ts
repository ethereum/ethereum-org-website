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
  type ContentTreeConfig,
  diff,
  extractChanges,
  parseJson,
  parseMarkdown,
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

  // Identify leaf translatableDrift sections
  const tdPaths = dr.translatableDrift.map((e) => e.path)
  const leafTdPaths = tdPaths.filter(
    (p) => !tdPaths.some((o) => o !== p && o.startsWith(p + "/"))
  )
  const leafTdIds = new Set(
    dr.translatableDrift
      .filter((e) => leafTdPaths.includes(e.path))
      .map((e) => e.id)
  )

  // Identify section renames
  const renames = cs.sectionRenames
  const renamedOldIds = new Set(renames.map((r) => r.oldId))
  const renamedNewIds = new Set(renames.map((r) => r.newId))

  // Truly added sections (not renames)
  const addedIds = new Set(
    dr.added.filter((e) => !renamedNewIds.has(e.id)).map((e) => e.id)
  )

  // Sections that need LLM: leaf translatableDrift + truly added
  const llmSectionIds = new Set([...leafTdIds, ...addedIds])
  // Remove frontmatter entries (handled separately)
  for (const id of llmSectionIds) {
    if (id.startsWith("frontmatter:")) {
      llmSectionIds.delete(id)
    }
  }

  let result = localeA

  // --- Phase 3: Deterministic Propagation ---

  // 3a. Heading ID renames
  for (const rename of renames) {
    result = result.replace(
      new RegExp(`\\{#${escapeRegex(rename.oldId)}\\}`, "g"),
      `{#${rename.newId}}`
    )
  }

  // 3b. Remove deleted components (e.g., <Divider />)
  for (const removed of dr.removed) {
    if (renamedOldIds.has(removed.id)) continue
    if (removed.id.startsWith("component:")) {
      result = result.replace(/\n*<Divider\s*\/>\s*\n*/g, "\n\n")
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

    if (change.elementType === "component-attribute" && change.key) {
      const attrPattern = new RegExp(
        `(${escapeRegex(change.key)}=")${escapeRegex(change.oldValue)}"`,
        "g"
      )
      if (attrPattern.test(result)) {
        result = result.replace(attrPattern, `$1${change.newValue}"`)
      } else {
        const jsxPattern = new RegExp(
          `(${escapeRegex(change.key)}=\\{)${escapeRegex(change.oldValue)}(\\})`,
          "g"
        )
        result = result.replace(jsxPattern, `$1${change.newValue}$2`)
      }
      continue
    }

    if (change.elementType === "inline-code") {
      result = result.replace(
        new RegExp("`" + escapeRegex(change.oldValue) + "`", "g"),
        "`" + change.newValue + "`"
      )
      continue
    }

    if (change.elementType === "link" && change.key === "href") {
      result = result.replace(
        new RegExp(`\\]\\(${escapeRegex(change.oldValue)}\\)`, "g"),
        `](${change.newValue})`
      )
      continue
    }

    if (change.elementType === "html-tag" && change.key === "href") {
      result = result.replace(
        new RegExp(`href="${escapeRegex(change.oldValue)}"`, "g"),
        `href="${change.newValue}"`
      )
      continue
    }

    if (change.elementType === "image" && change.key === "src") {
      result = result.replace(
        new RegExp(`\\]\\(${escapeRegex(change.oldValue)}\\)`, "g"),
        `](${change.newValue})`
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
            result = result.replace(
              new RegExp(`(<\\w+\\s+href="${escapeRegex(href)}")`, "g"),
              `$1 ${attrName}="${change.newValue}"`
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
          result = result.replace(oldAttr, newAttr)
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
              result = result.replace(
                `${key}="${oldVal}"`,
                `${key}="${newVal}"`
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

    if (!llm) {
      // Without LLM, use English-B content as fallback
      if (addedIds.has(sectionId)) {
        const enBOrder = getSectionOrder(englishB)
        const idx = enBOrder.indexOf(sectionId)
        if (idx > 0) {
          const prevId = enBOrder[idx - 1]
          const prevSec = findSection(result, prevId)
          if (prevSec) {
            result =
              result.slice(0, prevSec.end) +
              "\n" +
              englishContent +
              "\n" +
              result.slice(prevSec.end)
          }
        }
      } else {
        const localeSec = findSection(result, sectionId)
        if (localeSec) {
          result =
            result.slice(0, localeSec.start) +
            englishContent +
            "\n" +
            result.slice(localeSec.end)
        }
      }
      continue
    }

    const translated = llm(sectionId, englishContent)

    if (addedIds.has(sectionId)) {
      const enBOrder = getSectionOrder(englishB)
      const idx = enBOrder.indexOf(sectionId)
      if (idx > 0) {
        const prevId = enBOrder[idx - 1]
        const prevSec = findSection(result, prevId)
        if (prevSec) {
          result =
            result.slice(0, prevSec.end) +
            "\n" +
            translated +
            "\n" +
            result.slice(prevSec.end)
        }
      }
    } else {
      const localeSec = findSection(result, sectionId)
      if (localeSec) {
        result =
          result.slice(0, localeSec.start) +
          translated +
          "\n" +
          result.slice(localeSec.end)
      }
    }
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
