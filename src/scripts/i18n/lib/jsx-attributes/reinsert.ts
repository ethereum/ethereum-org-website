/**
 * Re-insert translated attribute values into file content
 */

import type {
  FileExtractionResult,
  FileTranslationResult,
  TranslatedAttribute,
} from "./types"

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Replace a single attribute value in content.
 * Handles both double and single quoted attributes.
 */
function replaceAttributeValue(
  content: string,
  attr: TranslatedAttribute
): string {
  // Build regex to find this specific attribute with its original value
  // Match: attributeName="originalValue" or attributeName='originalValue'
  const escapedOriginal = escapeRegex(attr.originalValue)
  const pattern = new RegExp(
    `(\\b${attr.attributeName}\\s*=\\s*)(?:"${escapedOriginal}"|'${escapedOriginal}')`,
    "g"
  )

  // Replace with translated value, preserving quote style (default to double quotes)
  return content.replace(pattern, `$1"${attr.translatedValue}"`)
}

/**
 * Re-insert all translated attributes into a file's content.
 */
export function reinsertTranslatedAttributes(
  extraction: FileExtractionResult,
  translatedAttributes: TranslatedAttribute[]
): FileTranslationResult {
  let updatedContent = extraction.content
  let successCount = 0

  // Sort by position (reverse order) to avoid offset issues when replacing
  const sortedAttrs = [...translatedAttributes].sort(
    (a, b) => b.line - a.line || b.column - a.column
  )

  for (const attr of sortedAttrs) {
    const beforeReplace = updatedContent
    updatedContent = replaceAttributeValue(updatedContent, attr)

    if (updatedContent !== beforeReplace) {
      successCount++
    }
  }

  return {
    filePath: extraction.filePath,
    translatedAttributes,
    updatedContent,
    hasChanges: successCount > 0,
  }
}

/**
 * Process multiple files with their translated attributes.
 */
export function reinsertTranslationsForFiles(
  extractions: FileExtractionResult[],
  translationsByFile: Map<string, TranslatedAttribute[]>
): FileTranslationResult[] {
  return extractions.map((extraction) => {
    const translations = translationsByFile.get(extraction.filePath) || []
    return reinsertTranslatedAttributes(extraction, translations)
  })
}
