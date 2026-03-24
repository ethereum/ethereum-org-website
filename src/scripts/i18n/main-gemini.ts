/**
 * Main entry point for Gemini translation pipeline.
 *
 * Replaces Crowdin as the translation intermediary. Sends whole files
 * to Gemini with site-specific context, then runs sanitizer +
 * transliteration as post-processing.
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/main-gemini.ts
 *
 * Environment variables:
 *   GEMINI_API_KEY          - Gemini API key (required)
 *   I18N_GITHUB_API_KEY     - GitHub API key (required)
 *   TARGET_PATH             - Comma-separated file paths or single directory
 *   EXCLUDE_PATH            - Comma-separated paths to exclude from translation
 *   TARGET_LANGUAGES        - Comma-separated language codes (blank = all)
 *   GEMINI_CONCURRENCY      - Max parallel Gemini requests per language (default: 3)
 *   RESUME_RUN_ID           - Resume an interrupted run by ID
 *   BASE_BRANCH             - GitHub base branch (default: dev)
 *   SKIP_PR_CREATION        - Skip PR creation (default: false)
 */

import * as path from "path"

import { isGeminiAvailable } from "./lib/ai/gemini"
import { cleanupProgress } from "./lib/ai/progress-tracker"
import {
  createBranchFromSha,
  createBranchName,
  getBranchObject,
} from "./lib/github/branches"
import { geminiInitialize } from "./lib/workflows/gemini-initialize"
import { geminiTranslateFiles } from "./lib/workflows/gemini-translate-files"
import { runJsxTranslation } from "./lib/workflows/jsx-translation"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { logSection } from "./lib/workflows/utils"
import { config } from "./config"

async function main() {
  const pipelineStartTime = Date.now()
  logSection("Gemini Translation Pipeline")

  // Preflight checks
  if (!isGeminiAvailable()) {
    console.error("[ERROR] GEMINI_API_KEY is not set")
    process.exit(1)
  }

  if (!process.env.I18N_GITHUB_API_KEY) {
    console.error("[ERROR] I18N_GITHUB_API_KEY is not set")
    process.exit(1)
  }

  // Phase 1: Initialize
  const context = await geminiInitialize()

  if (context.englishFiles.length === 0) {
    console.log("[main] No files to translate. Exiting.")
    process.exit(0)
  }

  // Generate run ID and branch name
  const runId = process.env.RESUME_RUN_ID || `gemini-${Date.now().toString(36)}`
  const branchSuffix =
    context.targetLanguages.length === 1
      ? context.targetLanguages[0]
      : "translations"
  const branchName = createBranchName(branchSuffix)

  console.log(`[main] Run ID: ${runId}`)
  console.log(`[main] Branch: ${branchName}`)

  // Create branch from base
  const baseBranch = await getBranchObject(config.baseBranch)
  await createBranchFromSha(branchName, baseBranch.sha)

  // Phase 2: Translate files (committed incrementally as they complete)
  const { stats, committedFiles, failedFiles } = await geminiTranslateFiles(
    context,
    branchName,
    runId
  )

  // Phase 3: Post-import sanitization
  const sanitizerInput = committedFiles.map((f) => ({
    path: path.resolve(f.path),
    content: f.content,
  }))
  const sanitizeResult = await runPostImportSanitization(
    sanitizerInput,
    branchName
  )

  // Phase 4: JSX attribute translation (reuse existing Gemini JSX flow)
  if (isGeminiAvailable()) {
    const languagePairsForJsx = context.targetLanguages.map((code) => ({
      crowdinId: code,
      internalLanguageCode: code,
    }))
    try {
      await runJsxTranslation(
        sanitizerInput,
        languagePairsForJsx,
        branchName,
        context.glossary
      )
    } catch (error) {
      console.warn(
        `[main] JSX translation failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  // Phase 5: Create PR
  const skipPr = ["1", "true", "yes", "on"].includes(
    (process.env.SKIP_PR_CREATION || "").toLowerCase()
  )

  if (!skipPr) {
    const languagePairs = Object.keys(stats).map((code) => ({
      crowdinId: code,
      internalLanguageCode: code,
    }))

    await createTranslationPR(
      branchName,
      sanitizerInput,
      sanitizeResult.changedFiles,
      languagePairs
    )
  }

  // Cleanup progress manifest on success
  cleanupProgress({ runId, startedAt: "", languages: {} })

  // Print token usage summary table
  printTokenSummary(stats, Date.now() - pipelineStartTime)

  if (failedFiles.length > 0) {
    console.warn(
      `\n[main] ${failedFiles.length} file(s) could not be translated:`
    )
    for (const f of failedFiles) {
      console.warn(`  - ${f}`)
    }
  }

  logSection("Complete")
  console.log("[main] Gemini translation pipeline finished.")
}

/**
 * Print a formatted token usage summary table with per-language breakdown
 * and approximate cost estimation.
 */
function printTokenSummary(
  stats: Record<string, { filesTranslated: number; filesFailed: number; totalInputTokens: number; totalOutputTokens: number; durationSeconds: number }>,
  pipelineDurationMs: number
): void {
  logSection("Token Usage Summary")

  const fmt = (n: number) => n.toLocaleString("en-US")
  const pad = (s: string, w: number) => s.padStart(w)

  // Column headers
  console.log(
    `${"Language".padEnd(10)}| ${"Files".padStart(5)} | ${"Input".padStart(10)} | ${"Output".padStart(10)} | ${"Total".padStart(10)} | ${"Duration".padStart(9)}`
  )
  const sep = `${"-".repeat(10)}|${"-".repeat(7)}|${"-".repeat(12)}|${"-".repeat(12)}|${"-".repeat(12)}|${"-".repeat(10)}`
  console.log(sep)

  let grandInput = 0
  let grandOutput = 0
  let grandFiles = 0

  for (const [lang, s] of Object.entries(stats)) {
    const total = s.totalInputTokens + s.totalOutputTokens
    grandInput += s.totalInputTokens
    grandOutput += s.totalOutputTokens
    grandFiles += s.filesTranslated

    console.log(
      `${lang.padEnd(10)}| ${pad(String(s.filesTranslated), 5)} | ${pad(fmt(s.totalInputTokens), 10)} | ${pad(fmt(s.totalOutputTokens), 10)} | ${pad(fmt(total), 10)} | ${pad((s.durationSeconds || 0).toFixed(1) + "s", 9)}`
    )
  }

  console.log(sep)
  const grandTotal = grandInput + grandOutput
  const pipelineSecs = (pipelineDurationMs / 1000).toFixed(1)
  console.log(
    `${"TOTAL".padEnd(10)}| ${pad(String(grandFiles), 5)} | ${pad(fmt(grandInput), 10)} | ${pad(fmt(grandOutput), 10)} | ${pad(fmt(grandTotal), 10)} | ${pad(pipelineSecs + "s", 9)}`
  )

  // Approximate cost estimation
  // Rates based on Gemini Pro pricing ($/1M tokens) -- update as pricing changes
  const APPROX_INPUT_RATE = 1.25
  const APPROX_OUTPUT_RATE = 10.0
  const estCost =
    (grandInput / 1_000_000) * APPROX_INPUT_RATE +
    (grandOutput / 1_000_000) * APPROX_OUTPUT_RATE

  console.log(
    `\n  Estimated cost: ~$${estCost.toFixed(2)} (approximate -- based on Gemini Pro rates: $${APPROX_INPUT_RATE}/1M input, $${APPROX_OUTPUT_RATE}/1M output)`
  )
  console.log(
    `  Pipeline wall time: ${pipelineSecs}s`
  )
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error)
  process.exit(1)
})
