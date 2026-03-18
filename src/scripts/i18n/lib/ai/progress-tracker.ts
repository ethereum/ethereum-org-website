/**
 * Resumable progress tracking for translation runs.
 * Stores state as a JSON manifest so interrupted runs can resume.
 */

import * as fs from "node:fs"
import * as path from "node:path"

const DEFAULT_PROGRESS_DIR = "/tmp"

interface LanguageProgress {
  status: "pending" | "in_progress" | "completed" | "failed"
  filesCompleted: string[]
  filesFailed: string[]
  startedAt?: string
  completedAt?: string
}

export interface TranslationProgress {
  runId: string
  startedAt: string
  languages: Record<string, LanguageProgress>
}

function getManifestPath(runId: string): string {
  return path.join(DEFAULT_PROGRESS_DIR, `translation-progress-${runId}.json`)
}

/**
 * Create or load a progress manifest.
 */
export function initProgress(
  runId: string,
  languages: string[]
): TranslationProgress {
  const manifestPath = getManifestPath(runId)

  // Resume existing
  if (fs.existsSync(manifestPath)) {
    const existing = JSON.parse(
      fs.readFileSync(manifestPath, "utf8")
    ) as TranslationProgress
    console.log(`[progress] Resuming run ${runId} from manifest`)
    return existing
  }

  // Create new
  const progress: TranslationProgress = {
    runId,
    startedAt: new Date().toISOString(),
    languages: Object.fromEntries(
      languages.map((lang) => [
        lang,
        {
          status: "pending" as const,
          filesCompleted: [],
          filesFailed: [],
        },
      ])
    ),
  }

  saveProgress(progress)
  return progress
}

/**
 * Check if a file has already been translated for a language.
 */
export function isFileCompleted(
  progress: TranslationProgress,
  language: string,
  filePath: string
): boolean {
  return (
    progress.languages[language]?.filesCompleted.includes(filePath) ?? false
  )
}

/**
 * Mark a file as completed for a language.
 */
export function markFileCompleted(
  progress: TranslationProgress,
  language: string,
  filePath: string
): void {
  const lang = progress.languages[language]
  if (!lang) return
  if (!lang.filesCompleted.includes(filePath)) {
    lang.filesCompleted.push(filePath)
  }
  lang.status = "in_progress"
  saveProgress(progress)
}

/**
 * Mark a file as failed for a language.
 */
export function markFileFailed(
  progress: TranslationProgress,
  language: string,
  filePath: string
): void {
  const lang = progress.languages[language]
  if (!lang) return
  if (!lang.filesFailed.includes(filePath)) {
    lang.filesFailed.push(filePath)
  }
  saveProgress(progress)
}

/**
 * Mark a language as completed.
 */
export function markLanguageCompleted(
  progress: TranslationProgress,
  language: string
): void {
  const lang = progress.languages[language]
  if (!lang) return
  lang.status = "completed"
  lang.completedAt = new Date().toISOString()
  saveProgress(progress)
}

/**
 * Check if a language is already completed.
 */
export function isLanguageCompleted(
  progress: TranslationProgress,
  language: string
): boolean {
  return progress.languages[language]?.status === "completed"
}

/**
 * Delete the manifest (cleanup after successful run).
 */
export function cleanupProgress(progress: TranslationProgress): void {
  const manifestPath = getManifestPath(progress.runId)
  if (fs.existsSync(manifestPath)) {
    fs.unlinkSync(manifestPath)
  }
}

function saveProgress(progress: TranslationProgress): void {
  const manifestPath = getManifestPath(progress.runId)
  fs.writeFileSync(manifestPath, JSON.stringify(progress, null, 2), "utf8")
}
