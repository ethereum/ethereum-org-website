/**
 * Main entry point for Gemini direct translation pipeline.
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
 *   SPLIT_PRS               - One PR per language (default: false)
 */

import { config } from "./config"
import { cleanupProgress } from "./lib/ai/progress-tracker"
import { isGeminiAvailable } from "./lib/ai/gemini"
import {
  createBranchName,
  postCreateBranchFrom,
  getBranchObject,
} from "./lib/github/branches"
import { geminiInitialize } from "./lib/workflows/gemini-initialize"
import { geminiTranslateFiles } from "./lib/workflows/gemini-translate-files"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { runJsxTranslation } from "./lib/workflows/jsx-translation"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { logSection } from "./lib/workflows/utils"

async function main() {
  logSection("Gemini Direct Translation Pipeline")

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
  const runId =
    process.env.RESUME_RUN_ID ||
    `gemini-${Date.now().toString(36)}`
  const branchSuffix = context.targetLanguages.length === 1
    ? context.targetLanguages[0]
    : "translations"
  const branchName = createBranchName(branchSuffix)

  console.log(`[main] Run ID: ${runId}`)
  console.log(`[main] Branch: ${branchName}`)

  // Create branch from base
  const baseBranch = await getBranchObject(config.baseBranch)
  await postCreateBranchFrom(branchName, baseBranch.object.sha)

  // Phase 2: Translate files
  const { stats, committedFiles } = await geminiTranslateFiles(
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

    const totalFiles = Object.values(stats).reduce(
      (sum, s) => sum + s.filesTranslated,
      0
    )
    const totalTokens = Object.values(stats).reduce(
      (sum, s) => sum + s.totalInputTokens + s.totalOutputTokens,
      0
    )
    const languages = Object.keys(stats)

    const languagePairs = languages.map((code) => ({
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
  console.log("[main] Gemini direct translation pipeline finished.")

  // Print summary
  for (const [lang, s] of Object.entries(stats)) {
    console.log(
      `  ${lang}: ${s.filesTranslated} translated, ${s.filesFailed} failed, ${s.totalInputTokens + s.totalOutputTokens} tokens`
    )
  }
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error)
  process.exit(1)
})
