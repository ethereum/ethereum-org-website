// Translation download workflow phase

import { config } from "../../config"
import { getBuiltFile, postBuildProjectFileTranslation } from "../crowdin/build"
import { postCreateBranchFrom } from "../github/branches"
import { getDestinationFromPath, putCommitFile } from "../github/commits"
import { mapCrowdinCodeToInternal } from "../utils/mapping"

import type {
  CommittedFile,
  LanguagePair,
  PreTranslationResult,
  TranslationDownloadResult,
  WorkflowContext,
} from "./types"
import { debugLog, logSection, logSubsection } from "./utils"

/**
 * Build language pair mappings from Crowdin IDs to internal codes
 */
export function buildLanguageMappings(languageIds: string[]): LanguagePair[] {
  return languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: mapCrowdinCodeToInternal(crowdinId),
  }))
}

/**
 * Download translations from Crowdin and commit to GitHub branch
 */
export async function downloadAndCommitTranslations(
  preTranslateResult: PreTranslationResult,
  context: WorkflowContext
): Promise<TranslationDownloadResult> {
  const { englishBuffers } = context
  const { responses, fileIdToPathMapping, fileIds } = preTranslateResult

  // Collect all language IDs from all responses (each response has one language)
  const languageIds = responses.flatMap((r) => r.attributes.languageIds)

  // Build language pair mappings
  const languagePairs = buildLanguageMappings(languageIds)

  logSection("Creating Translation PR")

  // Create GitHub branch (use language code as suffix for single-language PRs)
  const branchSuffix =
    languagePairs.length === 1
      ? languagePairs[0].internalLanguageCode
      : "crowdin-translations"
  const { branch } = await postCreateBranchFrom(config.baseBranch, branchSuffix)
  console.log(`✓ Created branch: ${branch}`)

  // Track all committed files with their content for sanitizer/validation
  const committedFiles: CommittedFile[] = []

  // For each language, download and commit translations
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    logSubsection(
      `Building translations for ${crowdinId} (${internalLanguageCode})`
    )

    // Build, download and commit each file
    for (const fileId of fileIds) {
      const crowdinPath = fileIdToPathMapping[fileId]

      debugLog(`Processing fileId: ${fileId} (${crowdinPath})`)

      // 1- Build translation
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId,
        config.projectId
      )

      // 2- Download
      const { buffer } = await getBuiltFile(downloadUrl)
      debugLog(`Downloaded ${buffer.length} bytes`)

      // Check if translation differs from English
      const originalEnglish = englishBuffers[fileId]
      if (originalEnglish && originalEnglish.compare(buffer) === 0) {
        debugLog(
          `Skipping commit - content identical to English (no translation)`
        )
        continue
      }

      // 3- Get destination path and commit
      const destinationPath = getDestinationFromPath(
        crowdinPath,
        internalLanguageCode
      )
      debugLog(`Committing to: ${destinationPath}`)

      await putCommitFile(buffer, destinationPath, branch)

      // Track this file's path and content for sanitizer/validation
      committedFiles.push({
        path: destinationPath,
        content: buffer.toString("utf8"),
      })
    }

    console.log(`✓ Committed translations for ${internalLanguageCode}`)
  }

  return {
    branch,
    committedFiles,
    languagePairs,
    fileIdToPathMapping,
  }
}
