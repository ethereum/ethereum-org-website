// Syntax tree validation workflow phase

import { postPullRequestComment } from "../github/pull-requests"
import {
  formatValidationComment,
  validateJsonStructure,
  validateJsxAttributes,
  validateMarkdownStructure,
} from "../validation/syntax-tree"

import type { CommittedFile, PullRequest } from "./types"
import { debugLog, logSection } from "./utils"

/** Default threshold for JSX attribute untranslated percentage */
const DEFAULT_JSX_THRESHOLD = 5

/**
 * Run syntax tree validation and post comment if issues found
 */
export async function runSyntaxValidation(
  pr: PullRequest,
  committedFiles: CommittedFile[],
  englishBuffers: Record<number, Buffer>,
  fileIdToPathMapping: Record<number, string>
): Promise<void> {
  logSection("Running Syntax Tree Validation")

  const validationResults: Parameters<typeof formatValidationComment>[0] = []

  for (const file of committedFiles) {
    const isJson = file.path.toLowerCase().endsWith(".json")
    const isMarkdown = file.path.toLowerCase().endsWith(".md")

    if (!isJson && !isMarkdown) continue

    // Find the corresponding English file
    let englishContent: string | null = null

    // Determine the English source path
    if (isJson) {
      // Extract the file name from the destination path
      const match = file.path.match(/src\/intl\/[^/]+\/(.+)$/)
      if (match) {
        const fileName = match[1]
        // Find the English buffer from our tracked files
        for (const [fileId, buffer] of Object.entries(englishBuffers)) {
          const crowdinPath = fileIdToPathMapping[Number(fileId)]
          if (crowdinPath && crowdinPath.includes(fileName)) {
            englishContent = buffer.toString("utf8")
            break
          }
        }
      }
    } else if (isMarkdown) {
      // Extract the relative path from translations
      const match = file.path.match(
        /public\/content\/translations\/[^/]+\/(.+)$/
      )
      if (match) {
        const relPath = match[1]
        // Find the English buffer
        for (const [fileId, buffer] of Object.entries(englishBuffers)) {
          const crowdinPath = fileIdToPathMapping[Number(fileId)]
          if (crowdinPath && crowdinPath.includes(relPath)) {
            englishContent = buffer.toString("utf8")
            break
          }
        }
      }
    }

    if (!englishContent) {
      debugLog(`Could not find English source for ${file.path}`)
      continue
    }

    // Validate structure
    if (isJson) {
      const result = validateJsonStructure(englishContent, file.content)
      validationResults.push({
        path: file.path,
        type: "json",
        result,
      })
      if (!result.isValid) {
        debugLog(`JSON validation failed for ${file.path}`)
      }
    } else if (isMarkdown) {
      const result = validateMarkdownStructure(englishContent, file.content)
      validationResults.push({
        path: file.path,
        type: "markdown",
        result,
      })
      if (!result.isValid) {
        debugLog(`Markdown validation failed for ${file.path}`)
      }

      // Also validate JSX attributes for markdown files (compare against English)
      const jsxThreshold =
        Number(process.env.JSX_UNTRANSLATED_THRESHOLD) || DEFAULT_JSX_THRESHOLD
      const jsxResult = validateJsxAttributes(
        englishContent,
        file.content,
        jsxThreshold
      )
      if (!jsxResult.isValid) {
        validationResults.push({
          path: file.path,
          type: "jsx-attributes",
          result: jsxResult,
        })
        debugLog(
          `JSX attribute validation flagged ${file.path}: ${jsxResult.untranslatedPercentage.toFixed(1)}% untranslated`
        )
      }
    }
  }

  // Post validation comment if there are issues
  const validationComment = formatValidationComment(validationResults)
  if (validationComment) {
    console.log(`\n⚠️ Syntax validation issues found, posting comment...`)
    try {
      await postPullRequestComment(pr.number, validationComment)
      console.log(`✓ Posted validation comment to PR`)
    } catch (e) {
      console.warn(`Failed to post validation comment:`, e)
    }
  } else {
    console.log(`✓ All files passed syntax tree validation`)
  }
}
