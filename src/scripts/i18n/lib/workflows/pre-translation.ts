// Pre-translation workflow phase

import * as fs from "fs"
import * as path from "path"

import { config } from "../../config"
import { createEphemeralPrompt } from "../crowdin/ephemeral-prompts"
import {
  awaitPreTranslationCompleted,
  getPreTranslationStatus,
  postApplyPreTranslation,
} from "../crowdin/pre-translate"
import { getPromptInfo } from "../crowdin/prompt"
import { formatGlossaryForPrompt, getGlossaryForLanguage } from "../supabase"
import type { CrowdinPreTranslateResponse } from "../types"

import type { PreTranslationResult, WorkflowContext } from "./types"
import { debugLog, logSection } from "./utils"

/**
 * Resume existing pre-translation job
 */
async function resumePreTranslation(
  preTranslationId: string
): Promise<CrowdinPreTranslateResponse> {
  logSection(`Resuming Pre-Translation ${preTranslationId}`)

  const statusResp = await getPreTranslationStatus(preTranslationId)

  if (statusResp.status === "in_progress" || statusResp.status === "created") {
    const statusMsg =
      statusResp.status === "created"
        ? "Pre-translation queued (waiting for other jobs)"
        : `Pre-translation in progress (${statusResp.progress}%)`
    console.log(`${statusMsg}, waiting for completion...`)
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
 * Create ephemeral prompt with language-specific glossary
 */
async function createLanguagePrompt(
  userId: number,
  internalCode: string,
  glossary: WorkflowContext["glossary"],
  basePrompt: string,
  aiProviderId?: number,
  aiModelId?: string
): Promise<number> {
  const glossaryTerms = getGlossaryForLanguage(glossary, internalCode)
  const glossarySection = formatGlossaryForPrompt(glossaryTerms, "informal")

  const fullPrompt = glossarySection
    ? `${basePrompt}\n\n---\n\n${glossarySection}`
    : basePrompt

  if (glossaryTerms.size > 0) {
    console.log(
      `[GLOSSARY] Injecting ${glossaryTerms.size} terms for ${internalCode} into prompt`
    )
  }

  const { promptId } = await createEphemeralPrompt({
    userId,
    languageCode: internalCode,
    promptKey: "glossary",
    promptText: fullPrompt,
    aiProviderId,
    aiModelId,
  })

  return promptId
}

/**
 * Start pre-translation jobs for all target languages
 * Creates one ephemeral prompt and one job per language
 */
async function startPerLanguagePreTranslation(
  context: WorkflowContext
): Promise<CrowdinPreTranslateResponse[]> {
  const { allCrowdinCodes, allInternalCodes } = config
  const { fileIdsSet, crowdinUserId, glossary, languageJobs } = context

  if (!crowdinUserId) {
    throw new Error("Missing crowdinUserId in context")
  }

  logSection("Requesting AI Pre-Translation (Per-Language)")
  console.log(`Files to translate: ${fileIdsSet.size}`)
  console.log(`Target languages: ${allCrowdinCodes.join(", ")}`)

  // Load base prompt template
  const promptPath = path.join(
    process.cwd(),
    "src/scripts/i18n/lib/crowdin/pre-translate-prompt.txt"
  )
  const basePrompt = fs.readFileSync(promptPath, "utf8")

  // Get AI provider/model settings from the static prompt
  const staticPromptInfo = await getPromptInfo(
    crowdinUserId,
    config.preTranslatePromptId
  )
  debugLog(
    `Static prompt AI settings: provider=${staticPromptInfo.aiProviderId}, model=${staticPromptInfo.aiModelId}`
  )

  const fileIds = Array.from(fileIdsSet)

  // Process each language: create prompt, start job
  for (let i = 0; i < allInternalCodes.length; i++) {
    const internalCode = allInternalCodes[i]
    const crowdinCode = allCrowdinCodes[i]

    console.log(`\n[${internalCode}] Creating ephemeral prompt...`)

    // Create language-specific prompt with glossary
    const ephemeralPromptId = await createLanguagePrompt(
      crowdinUserId,
      internalCode,
      glossary,
      basePrompt,
      staticPromptInfo.aiProviderId ?? undefined,
      staticPromptInfo.aiModelId ?? undefined
    )

    console.log(`[${internalCode}] ✓ Created prompt (ID: ${ephemeralPromptId})`)
    console.log(`[${internalCode}] Submitting pre-translation job...`)

    // Submit pre-translation for this single language
    const response = await postApplyPreTranslation(
      fileIds,
      [crowdinCode],
      ephemeralPromptId
    )

    console.log(`[${internalCode}] ✓ Job created (ID: ${response.identifier})`)

    // Track job info for polling and cleanup
    languageJobs.push({
      internalCode,
      crowdinCode,
      ephemeralPromptId,
      preTranslationId: response.identifier,
    })
  }

  // Log all job IDs for potential manual resume (comma-separated for easy copy-paste)
  const allJobIds = languageJobs.map((j) => j.preTranslationId).join(",")
  logSection("Pre-Translation Jobs Summary")
  console.log(`Created ${languageJobs.length} pre-translation jobs:`)
  for (const job of languageJobs) {
    console.log(`  ${job.internalCode}: ${job.preTranslationId}`)
  }
  console.log(`\n📋 Copy for resume: ${allJobIds}`)

  // Exit early if skipAwait is set or if full translation mode (no targetPath)
  if (config.skipAwait || !config.targetPath) {
    const reason = config.skipAwait
      ? "skip_await option enabled"
      : "full translation job"
    logSection(`Exiting for Manual Resume (${reason})`)
    console.log(`\nTo resume, use PRETRANSLATION_ID:`)
    console.log(`  ${allJobIds}`)
    console.log(`\nCheck progress: https://crowdin.com/project/ethereum-org`)
    process.exit(0)
  }

  // Wait for all jobs to complete in parallel with continue-on-error
  logSection("Waiting for Pre-Translation Completion")

  const results = await Promise.all(
    languageJobs.map(async (job) => {
      console.log(`[${job.internalCode}] Waiting for completion...`)
      try {
        const completed = await awaitPreTranslationCompleted(
          job.preTranslationId
        )
        if (completed.status !== "finished") {
          throw new Error(`Unexpected status: ${completed.status}`)
        }
        console.log(`[${job.internalCode}] ✓ Completed!`)
        return { success: true as const, job, response: completed }
      } catch (err) {
        console.error(
          `[${job.internalCode}] ✗ Failed:`,
          err instanceof Error ? err.message : err
        )
        return { success: false as const, job, error: err }
      }
    })
  )

  const successes = results.filter((r) => r.success)
  const failures = results.filter((r) => !r.success)

  if (failures.length > 0) {
    console.warn(
      `\n[WARN] ${failures.length}/${languageJobs.length} jobs failed:`
    )
    for (const f of failures) {
      console.warn(`  - ${f.job.internalCode}: ${f.job.preTranslationId}`)
    }
  }

  if (successes.length === 0) {
    throw new Error("All pre-translation jobs failed")
  }

  console.log(
    `\n✓ ${successes.length}/${languageJobs.length} pre-translation jobs completed!`
  )
  return successes.map((s) => s.response)
}

/**
 * Resume multiple pre-translation jobs in parallel with continue-on-error
 */
async function resumeMultiplePreTranslations(
  preTranslationIds: string[]
): Promise<CrowdinPreTranslateResponse[]> {
  logSection(`Resuming ${preTranslationIds.length} Pre-Translation Jobs`)
  console.log(`IDs: ${preTranslationIds.join(", ")}`)

  const results = await Promise.all(
    preTranslationIds.map(async (id) => {
      try {
        const response = await resumePreTranslation(id)
        return { success: true as const, id, response }
      } catch (err) {
        console.error(
          `[ERROR] Job ${id} failed:`,
          err instanceof Error ? err.message : err
        )
        return { success: false as const, id, error: err }
      }
    })
  )

  // Separate successes and failures
  const successes = results.filter((r) => r.success)
  const failures = results.filter((r) => !r.success)

  if (failures.length > 0) {
    console.warn(
      `\n[WARN] ${failures.length}/${preTranslationIds.length} jobs failed:`
    )
    for (const f of failures) {
      console.warn(`  - ${f.id}`)
    }
  }

  if (successes.length === 0) {
    throw new Error("All pre-translation jobs failed")
  }

  console.log(
    `\n✓ ${successes.length}/${preTranslationIds.length} jobs completed successfully`
  )
  return successes.map((s) => s.response)
}

/**
 * Handle pre-translation: resume existing or start new per-language jobs
 */
export async function handlePreTranslation(
  context: WorkflowContext
): Promise<PreTranslationResult> {
  const { existingPreTranslationIds, verbose } = config
  const { fileIdsSet, processedFileIdToPath, crowdinProjectFiles } = context

  // Resume existing jobs or start new per-language jobs
  let responses: CrowdinPreTranslateResponse[]
  let fileIds: number[]

  if (existingPreTranslationIds.length > 0) {
    // Resume mode: one or more existing jobs
    responses = await resumeMultiplePreTranslations(existingPreTranslationIds)
    // Collect all fileIds from all responses
    fileIds = [...new Set(responses.flatMap((r) => r.attributes.fileIds))]
  } else {
    // New mode: per-language jobs
    responses = await startPerLanguagePreTranslation(context)
    // All jobs translate the same files, so just use the first response's fileIds
    fileIds = responses[0]?.attributes.fileIds ?? Array.from(fileIdsSet)
  }

  // Build mapping for commit phase
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
    responses,
    fileIdToPathMapping,
    fileIds,
  }
}
