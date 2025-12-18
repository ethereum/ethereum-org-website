// JSX attribute translation workflow phase

import { translateJsxAttributes } from "../../translate-jsx-attributes"
import type { TranslationContext } from "../ai"
import { isGeminiAvailable } from "../ai"
import { putCommitFile } from "../github/commits"
import type { GlossaryByLanguage } from "../supabase"
import { getGlossaryForLanguage } from "../supabase"

import type { CommittedFile, LanguagePair } from "./types"
import { logSection } from "./utils"

export interface JsxTranslationResult {
  /** Whether Gemini was skipped due to missing API key */
  geminiSkipped: boolean
  /** Total attributes translated across all files */
  totalAttributesTranslated: number
  /** Total files updated */
  totalFilesUpdated: number
}

export interface JsxTranslationOptions {
  /** Pre-fetched glossary grouped by language */
  glossary?: GlossaryByLanguage
  /** Universal translation rules from Crowdin prompt */
  universalRules?: string
}

/**
 * Translate JSX attributes in markdown files via Gemini.
 * Updates committedFiles in-place with translated content.
 */
export async function runJsxTranslation(
  committedFiles: CommittedFile[],
  languagePairs: LanguagePair[],
  branch: string,
  verbose: boolean,
  options?: JsxTranslationOptions
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

    // Build translation context for this language
    const translationContext: TranslationContext = {
      universalRules: options?.universalRules,
      glossary: options?.glossary
        ? getGlossaryForLanguage(options.glossary, langCode)
        : undefined,
    }

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

    const jsxResult = await translateJsxAttributes({
      targetLanguage: langCode,
      files: langFiles,
      verbose,
      translationContext,
    })

    // Commit updated files
    if (jsxResult.updatedFiles.length > 0) {
      for (const updated of jsxResult.updatedFiles) {
        try {
          const buf = Buffer.from(updated.updatedContent, "utf8")
          await putCommitFile(buf, updated.filePath, branch)
          if (verbose) {
            console.log(`[JSX-TRANSLATE] Committed: ${updated.filePath}`)
          }

          // Update the committedFiles array with new content for sanitizer
          const existingFile = committedFiles.find(
            (f) => f.path === updated.filePath
          )
          if (existingFile) {
            existingFile.content = updated.updatedContent
          }
        } catch (e) {
          console.warn(
            `[JSX-TRANSLATE] Failed to commit ${updated.filePath}:`,
            e
          )
        }
      }
      console.log(
        `[JSX-TRANSLATE] ✓ Committed ${jsxResult.updatedFiles.length} files for ${langCode}`
      )
      totalFilesUpdated += jsxResult.updatedFiles.length
      totalAttributesTranslated += jsxResult.attributesTranslated
    }
  }

  return {
    geminiSkipped: false,
    totalAttributesTranslated,
    totalFilesUpdated,
  }
}
