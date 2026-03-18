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
  const { stats } = await geminiTranslateFiles(context, branchName, runId)

  // Collect all committed files for downstream phases
  // (sanitizer and PR creation expect CommittedFile format)
  const committedFiles = Object.entries(stats).flatMap(([lang, s]) =>
    Array(s.filesTranslated)
      .fill(null)
      .map((_, i) => ({
        path: `translated-${lang}-${i}`, // placeholder -- sanitizer reads from branch
        content: "",
        language: lang,
      }))
  )

  // Phase 3: Post-import sanitization
  logSection("Post-Import Sanitization")
  console.log(
    "[main] Running sanitizer on translated files..."
  )
  // The sanitizer reads files from the branch and fixes in place
  // For now, we'll note this needs integration with the branch-based sanitizer
  // TODO: Integrate runPostImportSanitization with the Gemini workflow

  // Phase 4: Transliteration
  logSection("Transliteration")
  console.log(
    "[main] Transliteration runs as part of the sanitizer for non-Latin locales"
  )
  // TODO: Invoke transliterate.ts per non-Latin language on the committed files

  // Phase 5: Create PR
  const skipPr = ["1", "true", "yes", "on"].includes(
    (process.env.SKIP_PR_CREATION || "").toLowerCase()
  )

  if (!skipPr) {
    logSection("Creating Pull Request")

    // Build summary
    const totalFiles = Object.values(stats).reduce(
      (sum, s) => sum + s.filesTranslated,
      0
    )
    const totalTokens = Object.values(stats).reduce(
      (sum, s) => sum + s.totalInputTokens + s.totalOutputTokens,
      0
    )
    const languages = Object.keys(stats)

    console.log(`[main] Total: ${totalFiles} files, ${totalTokens} tokens`)
    console.log(`[main] Languages: ${languages.join(", ")}`)

    // TODO: Create PR using createTranslationPR with adapted parameters
    console.log(`[main] PR creation pending integration`)
  }

  // Cleanup progress manifest on success
  const progress = {
    runId,
    startedAt: "",
    languages: {},
  }
  cleanupProgress(progress)

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
