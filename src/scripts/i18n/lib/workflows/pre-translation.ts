// Pre-translation workflow phase

import * as fs from "fs"
import * as path from "path"

import { config } from "../../config"
import {
  awaitPreTranslationCompleted,
  getPreTranslationStatus,
  postApplyPreTranslation,
} from "../crowdin/pre-translate"
import type { CrowdinPreTranslateResponse } from "../types"

import type { PreTranslationResult, WorkflowContext } from "./types"
import { logSection } from "./utils"

/**
 * Write pre-translation artifact for GitHub Actions
 */
function writePreTranslationArtifact(
  preTranslationId: string,
  fileCount: number,
  languages: string[]
): void {
  const artifactData = {
    preTranslationId,
    timestamp: new Date().toISOString(),
    fileCount,
    languages,
    targetPath: config.targetPath || null,
  }

  const artifactDir = path.join(process.cwd(), "artifacts")
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true })
  }

  const artifactPath = path.join(artifactDir, "pre-translation-info.json")
  fs.writeFileSync(artifactPath, JSON.stringify(artifactData, null, 2))

  console.log(`\n[ARTIFACT] Pre-translation info written to ${artifactPath}`)
  console.log(`[ARTIFACT] Pre-translation ID: ${preTranslationId}`)
  console.log(
    `[ARTIFACT] To resume this job later, use: PRETRANSLATION_ID=${preTranslationId}`
  )
}

/**
 * Resume existing pre-translation job
 */
async function resumePreTranslation(
  preTranslationId: string
): Promise<CrowdinPreTranslateResponse> {
  logSection(`Resuming Pre-Translation ${preTranslationId}`)

  const statusResp = await getPreTranslationStatus(preTranslationId)

  if (statusResp.status === "in_progress") {
    console.log(
      `Pre-translation in progress (${statusResp.progress}%), waiting for completion...`
    )
    return await awaitPreTranslationCompleted(preTranslationId)
  } else if (statusResp.status === "finished") {
    console.log(`Pre-translation already finished, proceeding to download...`)
    return statusResp
  } else {
    throw new Error(
      `Pre-translation ${preTranslationId} has unexpected status: ${statusResp.status}`
    )
  }
}

/**
 * Start new pre-translation job
 */
async function startNewPreTranslation(
  fileIdsSet: Set<number>
): Promise<CrowdinPreTranslateResponse> {
  logSection("Requesting AI Pre-Translation")
  console.log(`Files to translate: ${fileIdsSet.size}`)
  console.log(`Target languages: ${config.allCrowdinCodes.join(", ")}`)
  console.log(`AI Prompt ID: ${config.preTranslatePromptId}`)

  const applyPreTranslationResponse = await postApplyPreTranslation(
    Array.from(fileIdsSet),
    config.allCrowdinCodes
  )

  console.log(
    `✓ Pre-translation job created (ID: ${applyPreTranslationResponse.identifier})`
  )

  // Write artifact with pre-translation ID
  writePreTranslationArtifact(
    applyPreTranslationResponse.identifier,
    fileIdsSet.size,
    config.allCrowdinCodes
  )

  // If no targetPath specified (full translation), exit now and let Crowdin work
  if (!config.targetPath) {
    logSection("Full Translation Job Started")
    console.log(
      `This is a large job that will take significant time to complete.`
    )
    console.log(
      `The workflow will exit now. Resume later with the pre-translation ID above.`
    )
    console.log(
      `Check Crowdin dashboard for progress: https://crowdin.com/project/ethereum-org`
    )
    process.exit(0)
  }

  // For file/directory mode, wait for completion
  console.log(`\nWaiting for pre-translation to complete...`)
  const completedResponse = await awaitPreTranslationCompleted(
    applyPreTranslationResponse.identifier
  )

  if (completedResponse.status !== "finished") {
    throw new Error(
      `Pre-translation ended with unexpected status: ${completedResponse.status}`
    )
  }

  console.log(`✓ Pre-translation completed successfully!`)
  return completedResponse
}

/**
 * Handle pre-translation: resume existing or start new
 */
export async function handlePreTranslation(
  context: WorkflowContext
): Promise<PreTranslationResult> {
  const { existingPreTranslationId, verbose } = config
  const { fileIdsSet, processedFileIdToPath, crowdinProjectFiles } = context

  // Resume existing or start new
  const preTranslateResponse = existingPreTranslationId
    ? await resumePreTranslation(existingPreTranslationId)
    : await startNewPreTranslation(fileIdsSet)

  // Build mapping for commit phase
  const { fileIds } = preTranslateResponse.attributes
  const fileIdToPathMapping: Record<number, string> = {}

  for (const fid of fileIds) {
    if (processedFileIdToPath[fid]) {
      fileIdToPathMapping[fid] = processedFileIdToPath[fid]
    } else {
      const existing = crowdinProjectFiles.find((f) => f.id === fid)
      if (existing) fileIdToPathMapping[fid] = existing.path
    }
    if (!fileIdToPathMapping[fid] && verbose) {
      console.warn(`[WARN] Missing path mapping for fileId=${fid}`)
    }
  }

  return {
    response: preTranslateResponse,
    fileIdToPathMapping,
  }
}
