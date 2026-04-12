// Translation output sanitization workflow phase

import { runSanitizer } from "../../intl-sanitizer"
import { batchCommitFiles, BatchFile } from "../github/commits"

import type { CommittedFile } from "./types"
import { debugLog, logSection } from "./utils"

export interface SanitizationResult {
  changedFiles: CommittedFile[]
  totalProcessed: number
}

/**
 * Sanitize translation output and commit fixes.
 * Syncs heading IDs with English, normalizes formatting,
 * protects brand names, validates structure.
 */
export async function sanitizeTranslations(
  committedFiles: CommittedFile[],
  branch: string,
  englishContentMap?: Map<string, string>
): Promise<SanitizationResult> {
  logSection("Sanitizing Translation Output")

  console.log(`[sanitize] Processing ${committedFiles.length} files`)

  const sanitizeResult = await runSanitizer(
    committedFiles,
    undefined,
    englishContentMap
  )
  const changedFiles = sanitizeResult.changedFiles || []

  if (changedFiles.length) {
    console.log(`[sanitize] Modified ${changedFiles.length} files`)

    const filesToCommit: BatchFile[] = []

    for (const file of changedFiles) {
      const relPath = file.path
      const buf = Buffer.from(file.content, "utf8")
      filesToCommit.push({ path: relPath, content: buf })
      debugLog(`Will commit sanitized file: ${relPath}`)

      const existingFile = committedFiles.find((f) => f.path === relPath)
      if (existingFile) {
        existingFile.content = file.content
      }
    }

    try {
      await batchCommitFiles(
        filesToCommit,
        branch,
        `i18n: sanitize translation output`
      )
      console.log(`[sanitize] Committed ${changedFiles.length} sanitized files`)
    } catch (e) {
      console.warn(`[sanitize] Failed to commit:`, e)
    }
  } else {
    console.log("[sanitize] No changes needed")
  }

  return {
    changedFiles,
    totalProcessed: committedFiles.length,
  }
}
