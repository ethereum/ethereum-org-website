/**
 * Incremental work planning: what a file+locale will send, before it sends it.
 *
 * Prompts are assembled from local files only, so the entire cost of a
 * translation task is knowable with zero network calls. This module is that
 * calculation, shared by the pipeline (which refuses plans over budget) and by
 * `MODE=estimate` (which prints them and spends nothing). Sharing it is the
 * point: an estimator that reimplements planning eventually lies about it.
 */

import {
  MAX_BATCHES_PER_FILE,
  MAX_CHUNK_BYTES,
  MAX_CONTEXT_BYTES,
  MAX_PROMPT_BYTES,
  MIN_CONTENT_BUDGET_BYTES,
} from "../../constants"

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
  /**
   * Carries one section already past the content budget, so no smaller call
   * exists and the per-call ceiling does not apply.
   */
  irreducible: boolean
  /** Over the per-call ceiling despite being splittable -- must not be sent */
  overCeiling: boolean
}

export interface IncrementalPlan {
  batches: PlannedBatch[]
  /** Total prompt bytes this file+locale will send if the plan runs */
  projectedBytes: number
  /** Wire bytes of content being translated (drives the budget) */
  translatableBytes: number
  /** Content bytes only, no envelope -- what the model actually renders */
  translatableContentBytes: number
  /** Rules + glossary bytes carried by every call for this file+locale */
  overheadBytes: number
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

  // Build, measure, tighten. Predicting a prompt's size from a budget means
  // every future prompt change can silently break the arithmetic -- the first
  // attempt at this missed the "Sections to translate:" id list and ran 307
  // bytes over. Instead the planner renders the real prompts and shrinks the
  // content budget until no splittable batch exceeds the per-call ceiling.
  const buildPlan = (budget: number): PlannedBatch[] => {
    const batches = batchSections(
      sectionList.map((s) => ({
        id: s.id,
        content: s.content || "",
        action: s.action,
        headingText: s.headingText,
      })),
      budget
    )
    return batches.map((batch) => {
      const sections = sectionList.filter((s) =>
        batch.some((b) => b.id === s.id)
      )
      const prompt = buildIncrementalPrompt({
        filePath,
        fileType,
        targetLanguage: locale,
        languageName,
        sections,
        glossaryTerms,
      })
      const translate = sections.filter((s) => s.action === "TRANSLATE")
      const bytes = Buffer.byteLength(prompt, "utf-8")
      // One section that alone exceeds the content budget is as small as this
      // call gets; anything else over the ceiling is a batching error.
      const irreducible =
        translate.length === 1 &&
        sectionWireBytes({
          id: translate[0].id,
          content: translate[0].content || "",
          action: "TRANSLATE",
          headingText: translate[0].headingText,
          level: translate[0].level,
        }) > budget
      return {
        prompt,
        bytes,
        translateCount: translate.length,
        irreducible,
        overCeiling: !irreducible && bytes > MAX_PROMPT_BYTES,
      }
    })
  }

  let contentBudget = MAX_CHUNK_BYTES
  let planned = buildPlan(contentBudget)
  for (
    let attempt = 0;
    attempt < 8 && planned.some((b) => b.overCeiling);
    attempt++
  ) {
    // Shrink by the worst overshoot plus a margin, so this converges in one or
    // two passes rather than crawling.
    const worst = Math.max(
      ...planned.filter((b) => b.overCeiling).map((b) => b.bytes)
    )
    contentBudget = Math.max(
      MIN_CONTENT_BUDGET_BYTES,
      contentBudget - (worst - MAX_PROMPT_BYTES) - 1024
    )
    planned = buildPlan(contentBudget)
    if (contentBudget <= MIN_CONTENT_BUDGET_BYTES) break
  }

  // Overhead is what every call carries regardless of content: rules, the
  // glossary, and the prompt scaffolding. Reported so a run can see why its
  // content budget shrank.
  const overheadBytes = Buffer.byteLength(
    buildIncrementalPrompt({
      filePath,
      fileType,
      targetLanguage: locale,
      languageName,
      sections: [],
      glossaryTerms,
    }),
    "utf-8"
  )

  if (planned.some((b) => b.overCeiling)) {
    throw new Error(
      `[cost-guard] ${filePath} (${locale}): cannot fit batches under the ` +
        `${MAX_PROMPT_BYTES.toLocaleString("en-US")}-byte per-call ceiling. Prompt overhead is ` +
        `${overheadBytes.toLocaleString("en-US")} bytes (rules + ${glossaryTerms.size} glossary terms) ` +
        `and context is capped at ${MAX_CONTEXT_BYTES.toLocaleString("en-US")}. Refusing to send.`
    )
  }

  const translatableBytes = translateSections.reduce(
    (sum, s) =>
      sum +
      sectionWireBytes({
        id: s.id,
        content: s.content || "",
        action: "TRANSLATE",
        headingText: s.headingText,
        level: s.level,
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
    overheadBytes,
    translateCount: translateSections.length,
    budget,
    overBudget: projectedBytes > budget.limitBytes,
    tooManyBatches: planned.length > MAX_BATCHES_PER_FILE,
  }
}

/**
 * A chunk past the chunk budget is one the chunkers could not split -- one
 * paragraph, one JSON key, one section. There is no smaller call to make, so
 * the per-call ceiling does not apply to it. Shared by the full-translation
 * path and the estimator so they cannot disagree about what gets sent.
 */
export function isIrreducibleChunk(chunkBytes: number): boolean {
  return chunkBytes > MAX_CHUNK_BYTES
}

/** Chunks the translatable content genuinely needs, for reporting. */
export function chunksNeeded(translatableBytes: number): number {
  return Math.max(1, Math.ceil(translatableBytes / MAX_CHUNK_BYTES))
}
