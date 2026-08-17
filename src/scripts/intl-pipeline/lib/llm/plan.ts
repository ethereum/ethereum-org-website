/**
 * Incremental work planning: what a file+locale will send, before it sends it.
 *
 * Prompts are assembled from local files only, so the entire cost of a
 * translation task is knowable with zero network calls. This module is that
 * calculation, shared by the pipeline (which refuses plans over budget) and by
 * `MODE=estimate` (which prints them and spends nothing). Sharing it is the
 * point: an estimator that reimplements planning eventually lies about it.
 */

import { MAX_BATCHES_PER_FILE, MAX_CHUNK_BYTES } from "../../constants"

import { createFileBudget, type FileBudget } from "./cost-meter"
import {
  batchSections,
  buildIncrementalPrompt,
  buildSectionList,
  extractJsonSections,
  extractSections,
  sectionWireBytes,
} from "./incremental-translate"

export interface PlannedBatch {
  prompt: string
  bytes: number
  translateCount: number
}

export interface IncrementalPlan {
  batches: PlannedBatch[]
  /** Total prompt bytes this file+locale will send if the plan runs */
  projectedBytes: number
  /** Wire bytes of content being translated (drives the budget) */
  translatableBytes: number
  /** Content bytes only, no envelope -- what the model actually renders */
  translatableContentBytes: number
  translateCount: number
  budget: FileBudget
  overBudget: boolean
  tooManyBatches: boolean
}

export interface PlanOptions {
  filePath: string
  fileType: "markdown" | "json"
  locale: string
  languageName: string
  englishContent: string
  localeContent: string
  /** Section IDs drift detection says need the LLM */
  sectionIds: string[]
  glossaryTerms: Map<string, string>
}

/**
 * Plan the batches for one file+locale. Returns null when nothing needs the LLM.
 * Never throws on budget: callers decide whether to refuse or report.
 */
export function planIncrementalBatches(
  options: PlanOptions
): IncrementalPlan | null {
  const {
    filePath,
    fileType,
    locale,
    languageName,
    englishContent,
    localeContent,
    sectionIds,
    glossaryTerms,
  } = options

  if (sectionIds.length === 0) return null

  const extract = fileType === "json" ? extractJsonSections : extractSections
  const sectionList = buildSectionList(
    extract(englishContent),
    extract(localeContent),
    sectionIds
  )

  const translateSections = sectionList.filter((s) => s.action === "TRANSLATE")
  if (translateSections.length === 0) return null

  const batches = batchSections(
    sectionList.map((s) => ({
      id: s.id,
      content: s.content || "",
      action: s.action,
      headingText: s.headingText,
    }))
  )

  const planned: PlannedBatch[] = batches.map((batch) => {
    const sections = sectionList.filter((s) => batch.some((b) => b.id === s.id))
    const prompt = buildIncrementalPrompt({
      filePath,
      fileType,
      targetLanguage: locale,
      languageName,
      sections,
      glossaryTerms,
    })
    return {
      prompt,
      bytes: Buffer.byteLength(prompt, "utf-8"),
      translateCount: sections.filter((s) => s.action === "TRANSLATE").length,
    }
  })

  const translatableBytes = translateSections.reduce(
    (sum, s) =>
      sum +
      sectionWireBytes({
        id: s.id,
        content: s.content || "",
        headingText: s.headingText,
      }),
    0
  )
  const translatableContentBytes = translateSections.reduce(
    (sum, s) => sum + Buffer.byteLength(s.content || "", "utf-8"),
    0
  )
  const budget = createFileBudget(`${filePath} (${locale})`, translatableBytes)
  const projectedBytes = planned.reduce((sum, p) => sum + p.bytes, 0)

  return {
    batches: planned,
    projectedBytes,
    translatableBytes,
    translatableContentBytes,
    translateCount: translateSections.length,
    budget,
    overBudget: projectedBytes > budget.limitBytes,
    tooManyBatches: planned.length > MAX_BATCHES_PER_FILE,
  }
}

/** Chunks the translatable content genuinely needs, for reporting. */
export function chunksNeeded(translatableBytes: number): number {
  return Math.max(1, Math.ceil(translatableBytes / MAX_CHUNK_BYTES))
}
