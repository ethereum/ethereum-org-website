// JSX attribute translation workflow phase

import { config } from "../../config"
import { translateJsxAttributes } from "../../translate-jsx-attributes"
import { isGeminiAvailable } from "../ai"
import { batchCommitFiles, BatchFile } from "../github/commits"
import type { GlossaryByLanguage } from "../supabase"
import { getGlossaryForLanguage } from "../supabase"

import type { CommittedFile, LanguagePair } from "./types"
import { debugLog, logSection } from "./utils"

export interface JsxTranslationResult {
  /** Whether Gemini was skipped due to missing API key */
  geminiSkipped: boolean
  /** Total attributes translated across all files */
  totalAttributesTranslated: number
  /** Total files updated */
  totalFilesUpdated: number
}

/**
 * Translate JSX attributes in markdown files via Gemini.
 * Updates committedFiles in-place with translated content.
 */
export async function runJsxTranslation(
  committedFiles: CommittedFile[],
  languagePairs: LanguagePair[],
  branch: string,
  glossary: GlossaryByLanguage
): Promise<JsxTranslationResult> {
  logSection("JSX Attribute Translation")

  if (!isGeminiAvailable()) {
    console.warn(
      `[JSX-TRANSLATE] ⚠️ GEMINI_API_KEY not set - JSX attributes may remain untranslated`
    )
    return {
      geminiSkipped: true,
      totalAttributesTranslated: 0,
      totalFilesUpdated: 0,
    }
  }

  let totalAttributesTranslated = 0
  let totalFilesUpdated = 0

  // Process each language separately
  for (const langPair of languagePairs) {
    const langCode = langPair.internalLanguageCode

    // Filter files for this language (markdown only)
    const langFiles = committedFiles
      .filter((f) => f.path.includes(`/translations/${langCode}/`))
      .filter((f) => f.path.endsWith(".md") || f.path.endsWith(".mdx"))
      .map((f) => ({ path: f.path, content: f.content }))

    if (langFiles.length === 0) {
      console.log(`[JSX-TRANSLATE] No markdown files for ${langCode}`)
      continue
    }

    console.log(
      `[JSX-TRANSLATE] Processing ${langFiles.length} files for ${langCode}`
    )

    const glossaryTerms = getGlossaryForLanguage(glossary, langCode)
    const jsxResult = await translateJsxAttributes({
      targetLanguage: langCode,
      files: langFiles,
      glossaryTerms,
      verbose: config.verbose,
    })

    // Batch commit updated files
    if (jsxResult.updatedFiles.length > 0) {
      const filesToCommit: BatchFile[] = []

      for (const updated of jsxResult.updatedFiles) {
        const buf = Buffer.from(updated.updatedContent, "utf8")
        filesToCommit.push({ path: updated.filePath, content: buf })
        debugLog(`JSX-TRANSLATE: Will commit ${updated.filePath}`)

        // Update the committedFiles array with new content for sanitizer
        const existingFile = committedFiles.find(
          (f) => f.path === updated.filePath
        )
        if (existingFile) {
          existingFile.content = updated.updatedContent
        }
      }

      try {
        await batchCommitFiles(
          filesToCommit,
          branch,
          `i18n(${langCode}): JSX attribute translations`
        )
        console.log(
          `[JSX-TRANSLATE] ✓ Committed ${jsxResult.updatedFiles.length} files for ${langCode}`
        )
        totalFilesUpdated += jsxResult.updatedFiles.length
        totalAttributesTranslated += jsxResult.attributesTranslated
      } catch (e) {
        console.warn(
          `[JSX-TRANSLATE] Failed to commit files for ${langCode}:`,
          e
        )
      }
    }
  }

  return {
    geminiSkipped: false,
    totalAttributesTranslated,
    totalFilesUpdated,
  }
}
