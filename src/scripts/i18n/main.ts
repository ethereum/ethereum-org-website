import { deleteEphemeralPrompt } from "./lib/crowdin/ephemeral-prompts"
import { prepareEnglishFiles } from "./lib/workflows/file-preparation"
import { initializeWorkflow } from "./lib/workflows/initialize"
import { runJsxTranslation } from "./lib/workflows/jsx-translation"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { handlePreTranslation } from "./lib/workflows/pre-translation"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import {
  buildLanguageMappings,
  downloadAndCommitTranslations,
} from "./lib/workflows/translation-download"
import type { PreTranslationResult, SplitPRResult } from "./lib/workflows/types"
import { logSection } from "./lib/workflows/utils"
import { runSyntaxValidation } from "./lib/workflows/validation"
import { config } from "./config"

/**
 * Main orchestration function
 */
async function main() {
  const { existingPreTranslationIds } = config

  // Phase 1: Initialize workflow
  const context = await initializeWorkflow()

  // Phase 2: Prepare English files (skip if resuming existing jobs)
  if (existingPreTranslationIds.length === 0) {
    await prepareEnglishFiles(context)
  }

  // Phase 3: Handle pre-translation (resume or start new)
  const preTranslateResult = await handlePreTranslation(context)

  // Check if PR creation should be skipped
  const skipPrCreation = ["1", "true", "yes", "on"].includes(
    (process.env.SKIP_PR_CREATION || "").toLowerCase()
  )

  // Split PR mode: create one PR per language
  if (config.splitPrs) {
    const results: SplitPRResult[] = []

    for (const response of preTranslateResult.responses) {
      const langId = response.attributes.languageIds[0]
      const langCode = buildLanguageMappings([langId])[0].internalLanguageCode

      logSection(`Processing Language: ${langCode}`)

      // Create single-response PreTranslationResult for this language
      const singleLangResult: PreTranslationResult = {
        responses: [response],
        fileIdToPathMapping: preTranslateResult.fileIdToPathMapping,
        fileIds: preTranslateResult.fileIds,
      }

      try {
        // Phase 4: Download and commit translations
        const translationResult = await downloadAndCommitTranslations(
          singleLangResult,
          context
        )

        // Phase 5: Translate JSX attributes via Gemini
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

        if (skipPrCreation) {
          console.log(
            `[${langCode}] Branch created: ${translationResult.branch}`
          )
          results.push({ language: langCode, status: "success" })
          continue
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

        console.log(`[${langCode}] ✓ PR created: ${pr.html_url}`)
        results.push({
          language: langCode,
          status: "success",
          prUrl: pr.html_url,
        })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        console.error(`[${langCode}] ✗ Failed: ${errorMsg}`)
        results.push({ language: langCode, status: "failed", error: errorMsg })
      }
    }

    // Print summary
    logSection("SPLIT PR SUMMARY")
    const successes = results.filter((r) => r.status === "success")
    const failures = results.filter((r) => r.status === "failed")

    console.log(`Created: ${successes.length}/${results.length}`)
    if (successes.length > 0) {
      console.log(`\nSuccessful:`)
      for (const r of successes) {
        console.log(`  ${r.language}: ${r.prUrl ?? "(branch only)"}`)
      }
    }
    if (failures.length > 0) {
      console.log(`\nFailed:`)
      for (const r of failures) {
        console.log(`  ${r.language}: ${r.error}`)
      }
    }

    if (successes.length === 0) {
      throw new Error("All language PRs failed")
    }
  } else {
    // Single PR mode (default): all languages in one PR
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
    console.log(`Files: ${preTranslateResult.fileIds.length}`)
  }

  // Cleanup all ephemeral prompts (best effort - don't fail the workflow if cleanup fails)
  if (context.languageJobs.length > 0 && context.crowdinUserId) {
    logSection("Cleaning Up Ephemeral Prompts")
    for (const job of context.languageJobs) {
      try {
        await deleteEphemeralPrompt(
          context.crowdinUserId,
          job.ephemeralPromptId
        )
        console.log(
          `✓ Deleted prompt for ${job.internalCode} (ID: ${job.ephemeralPromptId})`
        )
      } catch (err) {
        console.warn(
          `[WARN] Failed to cleanup ephemeral prompt ${job.ephemeralPromptId} (${job.internalCode}):`,
          err instanceof Error ? err.message : err
        )
      }
    }
  }
}

main().catch((err) => {
  console.error("\n========== ERROR ==========")
  console.error(err)
  process.exit(1)
})
