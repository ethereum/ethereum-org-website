/**
 * Extract translatable JSX attributes from markdown files
 */

import type {
  ExtractedAttribute,
  FileExtractionResult,
  TranslatableAttribute,
} from "./types"
import { TRANSLATABLE_ATTRIBUTES } from "./types"

/**
 * Regex to match JSX/HTML-style attributes with quoted values.
 * Captures: attributeName="value" or attributeName='value'
 */
const ATTRIBUTE_REGEX =
  /\b([a-zA-Z][\w-]*)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g

/**
 * Regex to identify JSX component opening tags.
 * Captures the component name and all attributes.
 */
const JSX_COMPONENT_REGEX = /<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)(?:\/>|>)/g

/**
 * Check if a string appears to be English text (not a variable, URL, or code).
 * Uses heuristics: contains spaces, common English words, or sentence structure.
 */
function isLikelyEnglishText(value: string): boolean {
  // Skip empty or very short values
  if (!value || value.length < 3) return false

  // Skip URLs
  if (/^https?:\/\//.test(value)) return false

  // Skip paths
  if (/^[/.]/.test(value) || /\.(png|jpg|svg|gif|json|md)$/i.test(value))
    return false

  // Skip variables/placeholders like {variable} or {{variable}}
  if (/^\{.*\}$/.test(value)) return false

  // Skip CSS classes or technical identifiers (camelCase/kebab-case only)
  if (/^[a-z][a-zA-Z0-9-]*$/.test(value) && !value.includes(" ")) return false

  // Skip emoji-only values
  if (/^[\p{Emoji}\s]+$/u.test(value)) return false

  // Skip numbers-only
  if (/^[\d.,\s%$€£]+$/.test(value)) return false

  // Likely English if it contains spaces (multi-word) or common English patterns
  if (value.includes(" ")) return true

  // Single words that look like natural language (capitalized, common endings)
  if (/^[A-Z][a-z]+(?:ing|ed|er|est|ly|tion|ness)?$/.test(value)) return true

  return false
}

/**
 * Extract surrounding context (lines before/after) for translation accuracy.
 */
function extractContext(
  content: string,
  lineNumber: number,
  contextLines = 2
): string {
  const lines = content.split("\n")
  const startLine = Math.max(0, lineNumber - 1 - contextLines)
  const endLine = Math.min(lines.length, lineNumber + contextLines)

  return lines
    .slice(startLine, endLine)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ")
    .slice(0, 500) // Limit context length
}

/**
 * Extract translatable attributes from a single file's content.
 */
export function extractAttributesFromContent(
  content: string,
  filePath: string
): ExtractedAttribute[] {
  const attributes: ExtractedAttribute[] = []
  const lines = content.split("\n")

  // Track line numbers for each match
  let currentLine = 0
  let currentPos = 0

  // Process each JSX component
  let componentMatch: RegExpExecArray | null
  JSX_COMPONENT_REGEX.lastIndex = 0

  while ((componentMatch = JSX_COMPONENT_REGEX.exec(content)) !== null) {
    const componentName = componentMatch[1]
    const attributeString = componentMatch[2]
    const componentStartPos = componentMatch.index

    // Calculate line number for this component
    while (currentPos < componentStartPos && currentLine < lines.length) {
      currentPos += lines[currentLine].length + 1 // +1 for newline
      currentLine++
    }
    const componentLine = currentLine + 1 // 1-indexed

    // Extract attributes from this component
    let attrMatch: RegExpExecArray | null
    ATTRIBUTE_REGEX.lastIndex = 0

    while ((attrMatch = ATTRIBUTE_REGEX.exec(attributeString)) !== null) {
      const attrName = attrMatch[1]
      const attrValue = attrMatch[2] || attrMatch[3] // double or single quotes

      // Check if this is a translatable attribute
      if (
        !TRANSLATABLE_ATTRIBUTES.includes(attrName as TranslatableAttribute)
      ) {
        continue
      }

      // Check if the value looks like English text needing translation
      if (!isLikelyEnglishText(attrValue)) {
        continue
      }

      attributes.push({
        filePath,
        line: componentLine,
        column: attrMatch.index,
        attributeName: attrName as TranslatableAttribute,
        componentName,
        originalValue: attrValue,
        context: extractContext(content, componentLine),
      })
    }
  }

  return attributes
}

/**
 * Extract translatable attributes from a file, returning the extraction result.
 */
export function extractAttributesFromFile(
  content: string,
  filePath: string
): FileExtractionResult {
  const attributes = extractAttributesFromContent(content, filePath)

  return {
    filePath,
    attributes,
    content,
  }
}

/**
 * Extract attributes from multiple files.
 */
export function extractAttributesFromFiles(
  files: { path: string; content: string }[]
): FileExtractionResult[] {
  return files.map((file) => extractAttributesFromFile(file.content, file.path))
}

/**
 * Count total attributes across multiple extraction results.
 */
export function countExtractedAttributes(
  results: FileExtractionResult[]
): number {
  return results.reduce((sum, result) => sum + result.attributes.length, 0)
}
