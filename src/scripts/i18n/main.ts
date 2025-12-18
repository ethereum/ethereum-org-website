import { getUniversalTranslationRules } from "./lib/crowdin/prompt"
import { getCurrentUser } from "./lib/crowdin/user"
import { fetchGlossaryEntries, groupGlossaryByLanguage } from "./lib/supabase"
import { prepareEnglishFiles } from "./lib/workflows/file-preparation"
import { initializeWorkflow } from "./lib/workflows/initialize"
import { runJsxTranslation } from "./lib/workflows/jsx-translation"
import { createTranslationPR } from "./lib/workflows/pr-creation"
import { handlePreTranslation } from "./lib/workflows/pre-translation"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { downloadAndCommitTranslations } from "./lib/workflows/translation-download"
import {
  getWorkflowRunUrl,
  logSection,
  logSubsection,
} from "./lib/workflows/utils"
import { runSyntaxValidation } from "./lib/workflows/validation"
import { config } from "./config"

/**
 * Main orchestration function
 */
async function main() {
  const { verbose, existingPreTranslationId } = config

  // Phase 1: Initialize workflow
  const context = await initializeWorkflow()

  // Phase 1b: Fetch translation context (glossary + prompt rules)
  logSubsection("Loading Translation Context")
  const [glossaryEntries, currentUser] = await Promise.all([
    fetchGlossaryEntries(),
    getCurrentUser(),
  ])
  const glossary = groupGlossaryByLanguage(glossaryEntries)
  const universalRules = await getUniversalTranslationRules(
    currentUser.id,
    config.preTranslatePromptId
  )
  if (verbose) {
    console.log(
      `[DEBUG] Loaded ${glossaryEntries.length} glossary entries, ${universalRules.length} chars of translation rules`
    )
  }

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
    verbose,
    { glossary, universalRules }
  )

  // Phase 6: Run post-import sanitizer
  const sanitizeResult = await runPostImportSanitization(
    translationResult.committedFiles,
    translationResult.branch,
    verbose
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
    {
      geminiSkipped: jsxTranslationResult.geminiSkipped,
      workflowRunUrl: getWorkflowRunUrl(),
    }
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
}

main().catch((err) => {
  console.error("\n========== ERROR ==========")
  console.error(err)
  process.exit(1)
})
