// Post-import sanitization workflow phase

import { runSanitizer } from "../../post_import_sanitize"
import { batchCommitFiles, BatchFile } from "../github/commits"

import type { CommittedFile } from "./types"
import { debugLog, logSection } from "./utils"

export interface SanitizationResult {
  /** Files that were modified by the sanitizer */
  changedFiles: CommittedFile[]
  /** Total files processed */
  totalProcessed: number
}

/**
 * Run post-import sanitizer on committed files.
 * Updates committedFiles in-place with sanitized content.
 */
export async function runPostImportSanitization(
  committedFiles: CommittedFile[],
  branch: string
): Promise<SanitizationResult> {
  logSection("Running Post-Import Sanitizer")

  console.log(`[SANITIZE] Processing ${committedFiles.length} committed files`)

  const sanitizeResult = runSanitizer(committedFiles)
  const changedFiles = sanitizeResult.changedFiles || []

  if (changedFiles.length) {
    console.log(`Sanitizer modified ${changedFiles.length} files`)

    const filesToCommit: BatchFile[] = []

    for (const file of changedFiles) {
      const relPath = file.path
      const buf = Buffer.from(file.content, "utf8")
      filesToCommit.push({ path: relPath, content: buf })
      debugLog(`Will commit sanitized file: ${relPath}`)

      // Update committedFiles with sanitized content for validation
      const existingFile = committedFiles.find((f) => f.path === relPath)
      if (existingFile) {
        existingFile.content = file.content
      }
    }

    try {
      await batchCommitFiles(
        filesToCommit,
        branch,
        `i18n: post-import sanitization`
      )
      console.log(`✓ Committed ${changedFiles.length} sanitized files`)
    } catch (e) {
      console.warn(`Failed to commit sanitized files:`, e)
    }
  } else {
    console.log("No sanitization changes needed")
  }

  return {
    changedFiles,
    totalProcessed: committedFiles.length,
  }
}
