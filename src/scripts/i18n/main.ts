import { putCommitFile } from "./lib/github/commits"
import { prepareEnglishFiles } from "./lib/workflows/file-preparation"
import { initializeWorkflow } from "./lib/workflows/initialize"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { handlePreTranslation } from "./lib/workflows/pre-translation"
import { downloadAndCommitTranslations } from "./lib/workflows/translation-download"
import { logSection } from "./lib/workflows/utils"
import { runSyntaxValidation } from "./lib/workflows/validation"
import { config } from "./config"
import { runSanitizer } from "./post_import_sanitize"

/**
 * Main orchestration function
 */
async function main() {
  const { verbose, existingPreTranslationId } = config

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

  // Phase 5: Run post-import sanitizer
  logSection("Running Post-Import Sanitizer")
  console.log(
    `[SANITIZE] Processing ${translationResult.committedFiles.length} committed files`
  )
  const sanitizeResult = runSanitizer(translationResult.committedFiles)
  const changedFiles = sanitizeResult.changedFiles || []

  if (changedFiles.length) {
    console.log(`Sanitizer modified ${changedFiles.length} files`)
    for (const file of changedFiles) {
      const relPath = file.path
      try {
        const buf = Buffer.from(file.content, "utf8")
        await putCommitFile(buf, relPath, translationResult.branch)
        if (verbose) {
          console.log(`[DEBUG] Committed sanitized file: ${relPath}`)
        }
      } catch (e) {
        console.warn(`Failed to commit sanitized file ${relPath}:`, e)
      }
    }
    console.log(`✓ Committed ${changedFiles.length} sanitized files`)
  } else {
    console.log("No sanitization changes needed")
  }

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

  // Phase 6: Create PR
  const pr = await createTranslationPR(
    translationResult.branch,
    translationResult.committedFiles,
    changedFiles,
    translationResult.languagePairs
  )

  // Phase 7: Run syntax tree validation
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
}

main().catch((err) => {
  console.error("\n========== ERROR ==========")
  console.error(err)
  process.exit(1)
})
