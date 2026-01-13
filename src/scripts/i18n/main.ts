import { deleteEphemeralPrompt } from "./lib/crowdin/ephemeral-prompts"
import { prepareEnglishFiles } from "./lib/workflows/file-preparation"
import { initializeWorkflow } from "./lib/workflows/initialize"
import { runJsxTranslation } from "./lib/workflows/jsx-translation"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { handlePreTranslation } from "./lib/workflows/pre-translation"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { downloadAndCommitTranslations } from "./lib/workflows/translation-download"
import { logSection } from "./lib/workflows/utils"
import { runSyntaxValidation } from "./lib/workflows/validation"
import { config } from "./config"

/**
 * Main orchestration function
 */
async function main() {
  const { existingPreTranslationId } = config

  // Phase 1: Initialize workflow
  const context = await initializeWorkflow()

  // Phase 2: Prepare English files (skip if resuming existing job)
  if (!existingPreTranslationId) {
    await prepareEnglishFiles(context)
  }

  // Phase 3: Handle pre-translation (resume or start new)
  const preTranslateResult = await handlePreTranslation(context)

  // Phase 4: Download and commit translations
  const translationResult = await downloadAndCommitTranslations(
    preTranslateResult,
    context
  )

  // Phase 5: Translate JSX attributes via Gemini (before sanitizer)
  const jsxTranslationResult = await runJsxTranslation(
    translationResult.committedFiles,
    translationResult.languagePairs,
    translationResult.branch,
    context.glossary
  )

  // Phase 6: Run post-import sanitizer
  const sanitizeResult = await runPostImportSanitization(
    translationResult.committedFiles,
    translationResult.branch
  )

  // Check if PR creation should be skipped
  const skipPrCreation = ["1", "true", "yes", "on"].includes(
    (process.env.SKIP_PR_CREATION || "").toLowerCase()
  )
  if (skipPrCreation) {
    logSection("Skipping PR Creation")
    console.log(
      `Files have been committed to branch: ${translationResult.branch}. No PR will be opened.`
    )
    console.log(
      `Set SKIP_PR_CREATION=false to enable automatic PR creation in the workflow.`
    )
    return
  }

  // Phase 7: Create PR
  const pr = await createTranslationPR(
    translationResult.branch,
    translationResult.committedFiles,
    sanitizeResult.changedFiles,
    translationResult.languagePairs,
    { geminiSkipped: jsxTranslationResult.geminiSkipped }
  )

  // Phase 8: Run syntax tree validation
  await runSyntaxValidation(
    pr,
    translationResult.committedFiles,
    context.englishBuffers,
    translationResult.fileIdToPathMapping
  )

  // Success!
  logSection("SUCCESS")
  console.log(`Pull Request: ${pr.html_url}`)
  console.log(
    `Languages: ${translationResult.languagePairs.map((p) => p.internalLanguageCode).join(", ")}`
  )
  console.log(`Files: ${preTranslateResult.response.attributes.fileIds.length}`)

  // Cleanup ephemeral prompt (best effort - don't fail the workflow if cleanup fails)
  if (context.ephemeralPromptId && context.crowdinUserId) {
    try {
      await deleteEphemeralPrompt(
        context.crowdinUserId,
        context.ephemeralPromptId
      )
    } catch (err) {
      console.warn(
        `[WARN] Failed to cleanup ephemeral prompt ${context.ephemeralPromptId}:`,
        err instanceof Error ? err.message : err
      )
    }
  }
}

main().catch((err) => {
  console.error("\n========== ERROR ==========")
  console.error(err)
  process.exit(1)
})
