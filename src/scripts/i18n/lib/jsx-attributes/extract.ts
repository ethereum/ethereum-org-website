/**
 * Extract translatable JSX attributes from markdown files
 */

import type {
  ExtractedAttribute,
  FileExtractionResult,
  TranslatableAttribute,
} from "./types"
import {
  JSX_ATTRIBUTE_REGEX,
  JSX_COMPONENT_REGEX,
  TRANSLATABLE_ATTRIBUTES,
} from "./types"
import { isTranslatableValue } from "../shared-patterns"

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
    JSX_ATTRIBUTE_REGEX.lastIndex = 0

    while ((attrMatch = JSX_ATTRIBUTE_REGEX.exec(attributeString)) !== null) {
      const attrName = attrMatch[1]
      const attrValue = attrMatch[2] || attrMatch[3] // double or single quotes

      // Check if this is a translatable attribute
      if (
        !TRANSLATABLE_ATTRIBUTES.includes(attrName as TranslatableAttribute)
      ) {
        continue
      }

      // Check if the value looks like English text needing translation
      if (!isTranslatableValue(attrValue)) {
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
