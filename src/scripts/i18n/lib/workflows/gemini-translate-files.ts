/**
 * Orchestrate file translation per language.
 * For each language: translate all files, validate, batch commit.
 */

import { translateFile } from "../ai/gemini-translate"
import {
  initProgress,
  isFileCompleted,
  isLanguageCompleted,
  markFileCompleted,
  markFileFailed,
  markLanguageCompleted,
  type TranslationProgress,
} from "../ai/progress-tracker"
import { createRateLimiter } from "../ai/rate-limiter"
import {
  batchCommitFiles,
  type BatchFile,
  getDestinationFromPath,
} from "../github/commits"
import { getGlossaryForLanguage, type GlossaryByLanguage } from "../supabase/glossary"
import { logSection } from "./utils"
import type { GeminiWorkflowContext } from "./gemini-initialize"

interface CommitFile {
  path: string
  content: string
}

interface TranslationStats {
  filesTranslated: number
  filesSkipped: number
  filesFailed: number
  totalInputTokens: number
  totalOutputTokens: number
}

/**
 * Translate all files for all target languages.
 * Returns the branch name and per-language stats.
 */
export async function geminiTranslateFiles(
  context: GeminiWorkflowContext,
  branchName: string,
  runId: string
): Promise<{
  branch: string
  stats: Record<string, TranslationStats>
  committedFiles: CommitFile[]
}> {
  const { englishFiles, glossary, targetLanguages } = context
  const concurrency = Number(process.env.GEMINI_CONCURRENCY) || 3
  const progress = initProgress(runId, targetLanguages)
  const allStats: Record<string, TranslationStats> = {}
  const allCommittedFiles: CommitFile[] = []

  for (const language of targetLanguages) {
    logSection(`Translating: ${language}`)

    if (isLanguageCompleted(progress, language)) {
      console.log(`[translate] ${language} already completed, skipping`)
      continue
    }

    const glossaryTerms = getGlossaryForLanguage(glossary, language)
    console.log(
      `[translate] ${language}: ${englishFiles.length} files, ${glossaryTerms.size} glossary terms, concurrency ${concurrency}`
    )

    const { stats, files } = await translateLanguage(
      englishFiles,
      language,
      glossaryTerms,
      branchName,
      concurrency,
      progress
    )

    allStats[language] = stats
    allCommittedFiles.push(...files)
    markLanguageCompleted(progress, language)

    console.log(
      `[translate] ${language} done: ${stats.filesTranslated} translated, ${stats.filesSkipped} skipped, ${stats.filesFailed} failed`
    )
    console.log(
      `[translate] ${language} tokens: ${stats.totalInputTokens} in, ${stats.totalOutputTokens} out`
    )
  }

  return { branch: branchName, stats: allStats, committedFiles: allCommittedFiles }
}

/**
 * Translate all files for a single language.
 */
async function translateLanguage(
  englishFiles: GeminiWorkflowContext["englishFiles"],
  language: string,
  glossaryTerms: Map<string, string>,
  branchName: string,
  concurrency: number,
  progress: TranslationProgress
): Promise<{ stats: TranslationStats; files: CommitFile[] }> {
  const limiter = createRateLimiter(concurrency)
  const stats: TranslationStats = {
    filesTranslated: 0,
    filesSkipped: 0,
    filesFailed: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
  }

  const translatedFiles: CommitFile[] = []

  // Process files with bounded concurrency
  const tasks = englishFiles.map((file) => async () => {
    // Skip already completed
    if (isFileCompleted(progress, language, file.path)) {
      stats.filesSkipped++
      return
    }

    await limiter.acquire()
    try {
      const result = await translateFile({
        filePath: file.path,
        fileContent: file.content,
        fileType: file.type,
        targetLanguage: language,
        glossaryTerms,
      })

      const destPath = getDestinationFromPath(file.path, language)
      translatedFiles.push({
        path: destPath,
        content: result.translatedContent,
      })

      stats.filesTranslated++
      stats.totalInputTokens += result.tokensUsed.input
      stats.totalOutputTokens += result.tokensUsed.output
      markFileCompleted(progress, language, file.path)

      console.log(
        `  [${language}] ${file.path} -> ${destPath} (${result.tokensUsed.input + result.tokensUsed.output} tokens)`
      )
    } catch (error) {
      stats.filesFailed++
      markFileFailed(progress, language, file.path)
      console.error(
        `  [${language}] FAILED ${file.path}: ${error instanceof Error ? error.message : String(error)}`
      )
    } finally {
      limiter.release()
    }
  })

  // Execute all tasks (concurrency handled by limiter)
  await Promise.all(tasks.map((task) => task()))

  // Batch commit all translated files for this language
  if (translatedFiles.length > 0) {
    console.log(
      `[translate] Committing ${translatedFiles.length} files for ${language}...`
    )
    const batchFiles: BatchFile[] = translatedFiles.map((f) => ({
      path: f.path,
      content: Buffer.from(f.content, "utf8"),
    }))
    await batchCommitFiles(
      batchFiles,
      branchName,
      `i18n(${language}): Gemini direct translation\n\n${translatedFiles.length} files translated via Gemini (direct)`
    )
  }

  return { stats, files: translatedFiles }
}
