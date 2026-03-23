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
 *   TARGET_LANGUAGES        - Comma-separated language codes (blank = all)
 *   GEMINI_CONCURRENCY      - Max parallel Gemini requests per language (default: 3)
 *   RESUME_RUN_ID           - Resume an interrupted run by ID
 *   BASE_BRANCH             - GitHub base branch (default: dev)
 *   SKIP_PR_CREATION        - Skip PR creation (default: false)
 */

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
    path: f.path,
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
    logSection("Creating Pull Request")

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

  logSection("Complete")
  console.log("[main] Gemini translation pipeline finished.")

  // Print summary
  for (const [lang, s] of Object.entries(stats)) {
    console.log(
      `  ${lang}: ${s.filesTranslated} translated, ${s.filesFailed} failed, ${s.totalInputTokens + s.totalOutputTokens} tokens`
    )
  }

  if (failedFiles.length > 0) {
    console.warn(
      `\n[main] ${failedFiles.length} file(s) could not be translated:`
    )
    for (const f of failedFiles) {
      console.warn(`  - ${f}`)
    }
  }
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error)
  process.exit(1)
})
