/**
 * Cost estimate for a translation run -- assembles every prompt, sends none.
 *
 * Usage:
 *   pnpm intl:estimate                                  # whole tree, all locales
 *   TARGET_PATH=src/intl/en/learn-quizzes.json pnpm intl:estimate
 *   TARGET_LANGUAGES=ar,de pnpm intl:estimate
 *   ESTIMATE_MODE=full pnpm intl:estimate              # cost of a forced full run
 *
 * Exits 1 if any file+locale would be refused by the per-file budget, so this
 * doubles as a regression check: a batching bug shows up as a projected-cost
 * blowup and a non-zero exit instead of an invoice.
 *
 * Reads the same local inputs as the pipeline (working tree, .manifests/, git
 * history for the manifest's source commit) and shares its planner, so the
 * numbers are the run's numbers. No LLM calls; the only network call is
 * ETHGlossary, which is ours and free.
 */

import { execFileSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

import i18nConfig from "../../../i18n.config.json"

import { getDestinationFromPath } from "./lib/github/commits"
import {
  chunkProse,
  PROSE_SIZE_THRESHOLD,
} from "./lib/llm/code-block-extractor"
import { chunkJson } from "./lib/llm/json-batcher"
import { hasEnglishChanged } from "./lib/llm/manifest-adapter"
import { chunksNeeded, planIncrementalBatches } from "./lib/llm/plan"
import {
  config,
  getExcludedReason,
  normalizeTargetPath,
  validateTargetPath,
} from "./config"
import {
  INPUT_RATE_USD_PER_1M,
  MANIFESTS_DIR,
  MAX_PROMPT_BYTES,
  OUTPUT_RATE_USD_PER_1M,
} from "./constants"
import { getLlmSectionIds } from "./pipeline"

// Bytes per token, calibrated against run 31149083965's metered usage: mixed
// English-source/non-Latin-context prompts came in at 2.65, Latin-script ~4.
// Estimates only -- the guards measure bytes, which is what we control.
const LATIN_LOCALES = new Set([
  "cs",
  "de",
  "es",
  "fr",
  "id",
  "it",
  "pl",
  "pt-br",
  "sw",
  "tr",
  "vi",
])
const bytesPerToken = (locale: string) =>
  LATIN_LOCALES.has(locale) ? 4.0 : 2.65

interface Row {
  file: string
  locale: string
  mode: "incremental" | "full"
  /** LLM requests this plan would make */
  calls: number
  chunks: number
  plannedBytes: number
  budgetBytes: number | null
  inputTokens: number
  costUsd: number
  verdict: "ok" | "REFUSED"
}

function walkForExt(dir: string, ext: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === "translations") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkForExt(full, ext))
    else if (entry.isFile() && full.endsWith(ext)) out.push(full)
  }
  return out
}

function expandTargets(): Array<{
  path: string
  content: string
  type: "markdown" | "json"
}> {
  const seeds = config.targetPaths.length
    ? config.targetPaths
    : [config.jsonRoot, config.mdRoot]

  const paths: string[] = []
  for (const seed of seeds) {
    const normalized = normalizeTargetPath(seed)
    validateTargetPath(normalized)
    const abs = path.join(process.cwd(), normalized)
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
      const ext = normalized.startsWith(config.jsonRoot) ? ".json" : ".md"
      paths.push(
        ...walkForExt(abs, ext).map((p) => path.relative(process.cwd(), p))
      )
    } else if (fs.existsSync(abs)) {
      paths.push(normalized)
    }
  }

  return paths
    .filter((p) => !getExcludedReason(p))
    .map((p) => ({
      path: p,
      content: fs.readFileSync(path.join(process.cwd(), p), "utf-8"),
      type: p.endsWith(".md") ? ("markdown" as const) : ("json" as const),
    }))
}

/**
 * Full translation sends disjoint chunks of the whole file, so its cost is the
 * file itself plus per-call boilerplate -- no drift detection involved.
 */
function planFull(
  file: { path: string; content: string; type: "markdown" | "json" },
  locale: string
): Row {
  const chunks =
    file.type === "json"
      ? chunkJson(file.content).length
      : chunkProse(file.content, PROSE_SIZE_THRESHOLD).length
  // Each chunk carries its content plus rules/glossary; 4KB is the observed
  // boilerplate for the full-translation prompt.
  const plannedBytes = Buffer.byteLength(file.content, "utf-8") + chunks * 4096
  const inputTokens = Math.round(plannedBytes / bytesPerToken(locale))
  // Full translation returns the whole file, so output ~= input content size.
  const outputTokens = Math.round(
    Buffer.byteLength(file.content, "utf-8") / bytesPerToken(locale)
  )
  return {
    file: file.path,
    locale,
    mode: "full",
    calls: chunks,
    chunks,
    plannedBytes,
    budgetBytes: null,
    inputTokens,
    costUsd:
      (inputTokens / 1_000_000) * INPUT_RATE_USD_PER_1M +
      (outputTokens / 1_000_000) * OUTPUT_RATE_USD_PER_1M,
    verdict: "ok",
  }
}

// Belt to the braces: nothing in this file's import graph reaches an LLM call
// site, and a zero fuse means that if one is ever added, the first request
// throws instead of spending. Set before ./constants is read.
process.env.INTL_MAX_COST_USD = "0"

async function main() {
  const rows: Row[] = []
  const files = expandTargets()
  const locales = config.allInternalCodes
  // MODE is taken by the estimator itself, so the run being estimated is chosen
  // with ESTIMATE_MODE (default: what a normal "auto" run would do).
  const simulatedMode = process.env.ESTIMATE_MODE === "full" ? "full" : "auto"

  console.log(
    `[estimate] ${files.length} file(s) x ${locales.length} locale(s), estimating a "${simulatedMode}" run, no LLM calls`
  )

  for (const file of files) {
    for (const locale of locales) {
      const destPath = getDestinationFromPath(file.path, locale)
      const manifestPath = path.join(
        process.cwd(),
        MANIFESTS_DIR,
        destPath,
        "source.json"
      )
      const localePath =
        file.type === "markdown"
          ? path.join(process.cwd(), destPath)
          : path.join(
              process.cwd(),
              `src/intl/${locale}/${path.basename(file.path)}`
            )

      const hasLocale = fs.existsSync(localePath)
      const hasManifest = fs.existsSync(manifestPath)

      if (simulatedMode === "full" || !hasLocale || !hasManifest) {
        rows.push(planFull(file, locale))
        continue
      }

      const sourceManifestJson = fs.readFileSync(manifestPath, "utf-8")
      if (!hasEnglishChanged(file.content, sourceManifestJson, file.type)) {
        continue
      }

      // Old English from the manifest's commit -- same lookup the pipeline does.
      let englishA: string
      try {
        const sha = JSON.parse(sourceManifestJson).sourceCommitSha
        if (!/^[0-9a-f]{40}$/i.test(sha || "")) throw new Error("bad sha")
        englishA = execFileSync("git", ["show", `${sha}:${file.path}`], {
          encoding: "utf-8",
          maxBuffer: 1 << 28,
        })
      } catch {
        rows.push(planFull(file, locale))
        continue
      }

      const sectionIds = getLlmSectionIds(englishA, file.content, file.type)
      if (sectionIds.length === 0) continue

      const langEntry = i18nConfig.find(
        (l: { code: string }) => l.code === locale
      )
      const planned = planIncrementalBatches({
        filePath: file.path,
        fileType: file.type,
        locale,
        languageName: langEntry?.name ?? locale,
        englishContent: file.content,
        localeContent: fs.readFileSync(localePath, "utf-8"),
        sectionIds,
        // Glossary omitted: it adds a few KB per prompt and thousands of API
        // calls to an estimate. Noted in the footer as unmodelled.
        glossaryTerms: new Map(),
      })
      if (!planned) continue

      const inputTokens = Math.round(
        planned.projectedBytes / bytesPerToken(locale)
      )
      // Output is the translated changed content only.
      const outputTokens = Math.round(
        planned.translatableBytes / bytesPerToken(locale)
      )
      rows.push({
        file: file.path,
        locale,
        mode: "incremental",
        calls: planned.batches.length,
        chunks: chunksNeeded(planned.translatableBytes),
        plannedBytes: planned.projectedBytes,
        budgetBytes: planned.budget.limitBytes,
        inputTokens,
        costUsd:
          (inputTokens / 1_000_000) * INPUT_RATE_USD_PER_1M +
          (outputTokens / 1_000_000) * OUTPUT_RATE_USD_PER_1M,
        verdict:
          planned.overBudget || planned.tooManyBatches ? "REFUSED" : "ok",
      })
    }
  }

  if (rows.length === 0) {
    console.log("[estimate] Nothing to translate -- no drift detected")
    return 0
  }

  const fmt = (n: number) => n.toLocaleString("en-US")
  const refused = rows.filter((r) => r.verdict === "REFUSED")

  // Per-file rollup, then the worst offenders in full.
  const byFile = new Map<
    string,
    { locales: number; bytes: number; cost: number; refused: number }
  >()
  for (const r of rows) {
    const agg = byFile.get(r.file) ?? {
      locales: 0,
      bytes: 0,
      cost: 0,
      refused: 0,
    }
    agg.locales += 1
    agg.bytes += r.plannedBytes
    agg.cost += r.costUsd
    if (r.verdict === "REFUSED") agg.refused += 1
    byFile.set(r.file, agg)
  }

  console.log(
    `\n${"file".padEnd(62)}${"locales".padStart(8)}${"prompt bytes".padStart(15)}${"est. $".padStart(10)}${"refused".padStart(9)}`
  )
  console.log("-".repeat(104))
  for (const [file, agg] of [...byFile.entries()].sort(
    (a, b) => b[1].cost - a[1].cost
  )) {
    console.log(
      `${file.slice(0, 60).padEnd(62)}${String(agg.locales).padStart(8)}${fmt(agg.bytes).padStart(15)}${("$" + agg.cost.toFixed(2)).padStart(10)}${(agg.refused || "").toString().padStart(9)}`
    )
  }

  const totalCost = rows.reduce((s, r) => s + r.costUsd, 0)
  const totalInput = rows.reduce((s, r) => s + r.inputTokens, 0)
  console.log("-".repeat(104))
  console.log(
    `${"TOTAL".padEnd(62)}${String(rows.length).padStart(8)}${fmt(rows.reduce((s, r) => s + r.plannedBytes, 0)).padStart(15)}${("$" + totalCost.toFixed(2)).padStart(10)}${(refused.length || "").toString().padStart(9)}`
  )
  const totalCalls = rows.reduce((s, r) => s + r.calls, 0)
  console.log(
    `\n  ${fmt(rows.length)} file+locale plan(s), ${fmt(totalCalls)} LLM request(s), ${fmt(totalInput)} est. input tokens, ${fmt(Math.round(totalInput / Math.max(totalCalls, 1)))} per request`
  )
  console.log(
    `  Rates: $${INPUT_RATE_USD_PER_1M}/1M input, $${OUTPUT_RATE_USD_PER_1M}/1M output. Token counts are byte-derived estimates; glossary bytes not modelled.`
  )

  if (refused.length > 0) {
    console.log(
      `\n[estimate] ${refused.length} file+locale plan(s) EXCEED the per-file budget (${fmt(MAX_PROMPT_BYTES)} bytes per call x chunks):`
    )
    for (const r of refused.slice(0, 20)) {
      console.log(
        `  ${r.file} (${r.locale}): ${fmt(r.plannedBytes)} planned vs ${fmt(r.budgetBytes ?? 0)} budget, ${r.chunks} chunk(s)`
      )
    }
    if (refused.length > 20) {
      console.log(`  ... and ${refused.length - 20} more`)
    }
    return 1
  }

  console.log("\n[estimate] All plans within budget")
  return 0
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(
      `[estimate] Failed: ${err instanceof Error ? err.stack : err}`
    )
    process.exit(2)
  })
