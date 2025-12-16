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
import { logSection, logSubsection } from "./utils"

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
  const { verbose } = config
  const { englishBuffers } = context
  const { response, fileIdToPathMapping } = preTranslateResult

  const { languageIds, fileIds } = response.attributes

  // Build language pair mappings
  const languagePairs = buildLanguageMappings(languageIds)

  logSection("Creating Translation PR")

  // Create GitHub branch
  const { branch } = await postCreateBranchFrom(
    config.baseBranch,
    "crowdin-translations"
  )
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

      if (verbose) {
        console.log(`[DEBUG] Processing fileId: ${fileId} (${crowdinPath})`)
      }

      // 1- Build translation
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId,
        config.projectId
      )

      // 2- Download
      const { buffer } = await getBuiltFile(downloadUrl)

      if (verbose) {
        console.log(`[DEBUG] Downloaded ${buffer.length} bytes`)
      }

      // Check if translation differs from English
      const originalEnglish = englishBuffers[fileId]
      if (originalEnglish && originalEnglish.compare(buffer) === 0) {
        if (verbose) {
          console.warn(
            `[DEBUG] Skipping commit - content identical to English (no translation)`
          )
        }
        continue
      }

      // 3- Get destination path and commit
      const destinationPath = getDestinationFromPath(
        crowdinPath,
        internalLanguageCode
      )

      if (verbose) {
        console.log(`[DEBUG] Committing to: ${destinationPath}`)
      }

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
