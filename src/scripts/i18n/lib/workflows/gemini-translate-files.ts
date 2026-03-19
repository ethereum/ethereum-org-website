/**
 * Orchestrate file translation per language.
 *
 * Each successful translation is committed immediately (amend pattern:
 * one growing commit per language). Failed files are skipped, not fatal.
 * The pipeline only throws if ALL files for ALL languages fail.
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
import { getDestinationFromPath, IncrementalCommitter } from "../github/commits"
import { getGlossaryForLanguage } from "../supabase/glossary"

import type { GeminiWorkflowContext } from "./gemini-initialize"
import { logSection } from "./utils"

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
 * Files are committed as they complete (no work lost on partial failure).
 * Throws only if zero files were translated across all languages.
 */
export async function geminiTranslateFiles(
  context: GeminiWorkflowContext,
  branchName: string,
  runId: string
): Promise<{
  branch: string
  stats: Record<string, TranslationStats>
  committedFiles: CommitFile[]
  failedFiles: string[]
}> {
  const { englishFiles, glossary, targetLanguages } = context
  const concurrency = Number(process.env.GEMINI_CONCURRENCY) || 3
  const progress = initProgress(runId, targetLanguages)
  const allStats: Record<string, TranslationStats> = {}
  const allCommittedFiles: CommitFile[] = []
  const allFailedFiles: string[] = []

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

    const { stats, files, failedFiles } = await translateLanguage(
      englishFiles,
      language,
      glossaryTerms,
      branchName,
      concurrency,
      progress
    )

    allStats[language] = stats
    allCommittedFiles.push(...files)
    allFailedFiles.push(...failedFiles.map((f) => `${language}:${f}`))

    if (stats.filesTranslated > 0) {
      markLanguageCompleted(progress, language)
    }

    console.log(
      `[translate] ${language} done: ${stats.filesTranslated} translated, ${stats.filesSkipped} skipped, ${stats.filesFailed} failed`
    )
    console.log(
      `[translate] ${language} tokens: ${stats.totalInputTokens} in, ${stats.totalOutputTokens} out`
    )
  }

  // Fail if nothing was translated at all
  const totalTranslated = Object.values(allStats).reduce(
    (sum, s) => sum + s.filesTranslated,
    0
  )
  if (totalTranslated === 0 && allFailedFiles.length > 0) {
    throw new Error(
      `All translations failed. Failed files:\n${allFailedFiles.map((f) => `  - ${f}`).join("\n")}`
    )
  }

  if (allFailedFiles.length > 0) {
    console.warn(
      `[translate] ${allFailedFiles.length} file(s) failed (${totalTranslated} succeeded):\n${allFailedFiles.map((f) => `  - ${f}`).join("\n")}`
    )
  }

  return {
    branch: branchName,
    stats: allStats,
    committedFiles: allCommittedFiles,
    failedFiles: allFailedFiles,
  }
}

/**
 * Translate all files for a single language.
 * Each success is committed immediately via IncrementalCommitter.
 * Failures are logged and skipped.
 */
async function translateLanguage(
  englishFiles: GeminiWorkflowContext["englishFiles"],
  language: string,
  glossaryTerms: Map<string, string>,
  branchName: string,
  concurrency: number,
  progress: TranslationProgress
): Promise<{
  stats: TranslationStats
  files: CommitFile[]
  failedFiles: string[]
}> {
  const limiter = createRateLimiter(concurrency)
  const stats: TranslationStats = {
    filesTranslated: 0,
    filesSkipped: 0,
    filesFailed: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
  }

  const translatedFiles: CommitFile[] = []
  const failedFiles: string[] = []

  // Incremental committer: one amending commit per language
  const committer = new IncrementalCommitter(
    branchName,
    `i18n(${language}): Gemini direct translation`
  )
  await committer.init()

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

      // Commit immediately -- serialized internally by the committer
      await committer.commitFile(destPath, result.translatedContent)

      translatedFiles.push({
        path: destPath,
        content: result.translatedContent,
      })

      stats.filesTranslated++
      stats.totalInputTokens += result.tokensUsed.input
      stats.totalOutputTokens += result.tokensUsed.output
      markFileCompleted(progress, language, file.path)

      console.log(
        `  [${language}] ${file.path} -> ${destPath} (${result.tokensUsed.input + result.tokensUsed.output} tokens) [committed]`
      )
    } catch (error) {
      stats.filesFailed++
      failedFiles.push(file.path)
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

  if (committer.fileCount > 0) {
    console.log(
      `[translate] ${language}: ${committer.fileCount} files committed to branch`
    )
  }

  return { stats, files: translatedFiles, failedFiles }
}
