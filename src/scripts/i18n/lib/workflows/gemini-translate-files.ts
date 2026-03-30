/**
 * Orchestrate file translation across all languages.
 *
 * All languages share a single Gemini concurrency pool (GEMINI_CONCURRENCY,
 * default 16). Languages don't wait for each other -- as slots free up,
 * the next pending file from any language fills the slot. This naturally
 * pipelines across languages when there are fewer files than slots.
 *
 * Each translated file is committed immediately via a SharedCommitter
 * (serialized internally) for crash safety. After all translations
 * complete, individual commits are squashed into one per language.
 */

import { join } from "path"

import { translateFile } from "../ai/gemini-translate"
import { filterGlossaryFlat } from "../ai/glossary-lookup"
import {
  updateJsonManifest,
  writeMarkdownManifest,
} from "../ai/manifest-generator"
import {
  initProgress,
  isFileCompleted,
  isLanguageCompleted,
  markFileCompleted,
  markFileFailed,
  markLanguageCompleted,
  type TranslationProgress,
} from "../ai/progress-tracker"
import { createRateLimiter, type RateLimiter } from "../ai/rate-limiter"
import { getDestinationFromPath, SharedCommitter } from "../github/commits"
import { getGlossaryForLanguage } from "../supabase/glossary"

/** Paths to local glossary data (relative to project root) */
const GLOSSARY_DATA_DIR = join(process.cwd(), "src/scripts/i18n/data/glossary")
const GLOSSARY_PATH = join(GLOSSARY_DATA_DIR, "glossary-terms-enhanced.json")
const TRANSLATIONS_DIR = join(GLOSSARY_DATA_DIR, "translations")

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
  durationSeconds: number
}

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
  const concurrency = Number(process.env.GEMINI_CONCURRENCY) || 16
  const progress = initProgress(runId, targetLanguages)
  const allStats: Record<string, TranslationStats> = {}
  const allCommittedFiles: CommitFile[] = []
  const allFailedFiles: string[] = []

  // One shared committer for all languages -- serializes ref updates
  const committer = new SharedCommitter(branchName)
  await committer.init()

  // One shared Gemini concurrency pool across all languages
  const limiter = createRateLimiter(concurrency)

  console.log(
    `[translate] ${targetLanguages.length} language(s), ${englishFiles.length} file(s) each, concurrency ${concurrency}`
  )

  // Dispatch all languages concurrently -- they share the limiter
  const languageTasks = targetLanguages.map((language) => async () => {
    if (isLanguageCompleted(progress, language)) {
      console.log(`[translate] ${language} already completed, skipping`)
      return
    }

    const langStartTime = Date.now()
    const glossaryTerms = getGlossaryForLanguage(glossary, language)
    console.log(
      `[translate] ${language}: ${englishFiles.length} files, ${glossaryTerms.size} glossary terms`
    )

    const { stats, files, failedFiles } = await translateLanguage(
      englishFiles,
      language,
      glossaryTerms,
      committer,
      limiter,
      progress
    )

    stats.durationSeconds = (Date.now() - langStartTime) / 1000
    allStats[language] = stats
    allCommittedFiles.push(...files)
    allFailedFiles.push(...failedFiles.map((f) => `${language}:${f}`))

    if (stats.filesTranslated > 0) {
      markLanguageCompleted(progress, language)
    }

    console.log(
      `[translate] ${language} done: ${stats.filesTranslated} translated, ${stats.filesSkipped} skipped, ${stats.filesFailed} failed (${stats.durationSeconds.toFixed(1)}s)`
    )
    console.log(
      `[translate] ${language} tokens: ${stats.totalInputTokens.toLocaleString("en-US")} in, ${stats.totalOutputTokens.toLocaleString("en-US")} out`
    )
  })

  // All languages run concurrently, bounded by the shared limiter
  await Promise.all(languageTasks.map((task) => task()))

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

  // Squash individual file commits into one per language
  if (committer.totalFiles > 0) {
    logSection("Squashing Commits")
    await committer.squashByLanguage()
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
 * Uses the shared rate limiter so slots are shared across languages.
 */
async function translateLanguage(
  englishFiles: GeminiWorkflowContext["englishFiles"],
  language: string,
  glossaryTerms: Map<string, string>,
  committer: SharedCommitter,
  limiter: RateLimiter,
  progress: TranslationProgress
): Promise<{
  stats: TranslationStats
  files: CommitFile[]
  failedFiles: string[]
}> {
  const stats: TranslationStats = {
    filesTranslated: 0,
    filesSkipped: 0,
    filesFailed: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    durationSeconds: 0,
  }

  const translatedFiles: CommitFile[] = []
  const failedFiles: string[] = []

  const tasks = englishFiles.map((file) => async () => {
    if (isFileCompleted(progress, language, file.path)) {
      stats.filesSkipped++
      return
    }

    await limiter.acquire()
    try {
      // Filter glossary to only terms present in this source file
      let fileGlossary = glossaryTerms
      try {
        const filtered = filterGlossaryFlat(
          file.content,
          file.type,
          language,
          GLOSSARY_PATH,
          TRANSLATIONS_DIR
        )
        if (filtered.size > 0) {
          fileGlossary = filtered
          console.log(
            `  [glossary] ${file.path}: ${filtered.size} terms matched`
          )
        }
      } catch {
        // Local glossary unavailable -- fall back to Supabase glossary
      }

      const result = await translateFile({
        filePath: file.path,
        fileContent: file.content,
        fileType: file.type,
        targetLanguage: language,
        glossaryTerms: fileGlossary,
      })

      const destPath = getDestinationFromPath(file.path, language)

      // Commit immediately -- serialized by the shared committer's queue
      await committer.commitFile(destPath, result.translatedContent, language)

      // Stamp manifest: record which English source version this translation
      // was made against, enabling drift detection later
      try {
        const rootDir = process.cwd()
        if (file.type === "markdown") {
          writeMarkdownManifest(
            join(rootDir, destPath),
            file.path,
            file.content
          )
        } else {
          const localeDir = join(rootDir, `src/intl/${language}`)
          updateJsonManifest(localeDir, file.path, file.content)
        }
      } catch (err) {
        console.warn(
          `  [manifest] ${file.path}: failed to write manifest (non-fatal): ${err instanceof Error ? err.message : String(err)}`
        )
      }

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

  await Promise.all(tasks.map((task) => task()))

  return { stats, files: translatedFiles, failedFiles }
}
