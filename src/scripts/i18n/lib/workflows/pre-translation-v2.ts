/**
 * Pre-Translation Workflow v2
 *
 * Enhanced pre-translation with:
 * - Multi-job dispatch: separate jobs per (language, promptKey) combination
 * - Ephemeral prompts: dynamically composed with EthGlossary terms per language
 * - Parallel execution: configurable concurrency limit
 * - Artifact persistence: tracks ephemeral prompts for cleanup on resume
 *
 * This module can be enabled by setting USE_MODULAR_PROMPTS=true
 */

import * as fs from "fs"
import * as path from "path"

import { config } from "../../config"
import {
  createEphemeralPrompt,
  deleteEphemeralPrompts,
} from "../crowdin/ephemeral-prompts"
import {
  awaitPreTranslationCompleted,
  getPreTranslationStatus,
  postApplyPreTranslation,
} from "../crowdin/pre-translate"
import {
  composePromptForKey,
  groupFilesByPromptKey,
  logFullPrompt,
} from "../crowdin/prompt-composer"
import type { GlossaryByLanguage } from "../supabase"
import { getGlossaryForLanguage } from "../supabase"
import type { CrowdinPreTranslateResponse } from "../types"

import type { PreTranslationResult, WorkflowContext } from "./types"
import { delay, logSection, logSubsection } from "./utils"

// ============================================================================
// TYPES
// ============================================================================

/** A single pre-translation job with its associated prompt */
interface PreTranslationJob {
  /** Unique key for this job: {lang}-{promptKey} */
  jobKey: string
  /** Crowdin language code */
  languageId: string
  /** Prompt key (formal/informal) */
  promptKey: string
  /** File IDs to translate */
  fileIds: number[]
  /** Created ephemeral prompt ID (null if not yet created) */
  ephemeralPromptId: number | null
  /** Pre-translation job ID (null if not yet started) */
  preTranslationId: string | null
  /** Job status */
  status: "pending" | "prompt-created" | "started" | "completed" | "failed"
  /** Error message if failed */
  error?: string
}

/** Artifact data for multi-job pre-translation */
interface MultiJobArtifact {
  version: number
  timestamp: string
  targetPath: string | null
  userId: number
  jobs: Array<{
    jobKey: string
    languageId: string
    promptKey: string
    fileIds: number[]
    ephemeralPromptId: number | null
    preTranslationId: string | null
    status: string
  }>
}

/** Options for the multi-job pre-translation */
export interface MultiJobPreTranslationOptions {
  /** Crowdin user ID (required for ephemeral prompts) */
  userId: number
  /** EthGlossary entries grouped by language */
  glossary: GlossaryByLanguage
  /** Maximum concurrent jobs (default: 5) */
  concurrency?: number
  /** Enable verbose logging */
  verbose?: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ARTIFACT_FILE = "pre-translation-info-v2.json"
const DEFAULT_CONCURRENCY = 5

// ============================================================================
// ARTIFACT MANAGEMENT
// ============================================================================

/**
 * Write multi-job artifact for GitHub Actions
 */
function writeMultiJobArtifact(
  userId: number,
  jobs: PreTranslationJob[]
): void {
  const artifactData: MultiJobArtifact = {
    version: 2,
    timestamp: new Date().toISOString(),
    targetPath: config.targetPath || null,
    userId,
    jobs: jobs.map((j) => ({
      jobKey: j.jobKey,
      languageId: j.languageId,
      promptKey: j.promptKey,
      fileIds: j.fileIds,
      ephemeralPromptId: j.ephemeralPromptId,
      preTranslationId: j.preTranslationId,
      status: j.status,
    })),
  }

  const artifactDir = path.join(process.cwd(), "artifacts")
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true })
  }

  const artifactPath = path.join(artifactDir, ARTIFACT_FILE)
  fs.writeFileSync(artifactPath, JSON.stringify(artifactData, null, 2))

  console.log(
    `\n[ARTIFACT] Multi-job pre-translation info written to ${artifactPath}`
  )
}

/**
 * Read existing multi-job artifact (for resume)
 */
function readMultiJobArtifact(): MultiJobArtifact | null {
  const artifactPath = path.join(process.cwd(), "artifacts", ARTIFACT_FILE)
  if (!fs.existsSync(artifactPath)) {
    return null
  }
  try {
    const content = fs.readFileSync(artifactPath, "utf8")
    return JSON.parse(content) as MultiJobArtifact
  } catch {
    return null
  }
}

// ============================================================================
// JOB CREATION
// ============================================================================

/**
 * Create pre-translation jobs for all (language, promptKey) combinations
 */
function createJobs(
  fileIdToPath: Record<number, string>,
  languages: string[]
): PreTranslationJob[] {
  // Convert fileId→path mapping to path array for grouping
  const paths = Object.entries(fileIdToPath)
  const pathToFileId = new Map<string, number>()
  for (const [id, p] of paths) {
    pathToFileId.set(p, Number(id))
  }

  // Group files by prompt key
  const filesByPromptKey = groupFilesByPromptKey(paths.map(([, p]) => p))

  const jobs: PreTranslationJob[] = []

  // Create a job for each (language, promptKey) combination
  for (const lang of languages) {
    for (const group of filesByPromptKey) {
      const fileIds = group.filePaths
        .map((p) => pathToFileId.get(p))
        .filter((id): id is number => id !== undefined)

      if (fileIds.length === 0) continue

      jobs.push({
        jobKey: `${lang}-${group.promptKey}`,
        languageId: lang,
        promptKey: group.promptKey,
        fileIds,
        ephemeralPromptId: null,
        preTranslationId: null,
        status: "pending",
      })
    }
  }

  return jobs
}

// ============================================================================
// JOB EXECUTION
// ============================================================================

/**
 * Create ephemeral prompt for a job
 */
async function createPromptForJob(
  job: PreTranslationJob,
  userId: number,
  glossary: GlossaryByLanguage,
  verbose: boolean
): Promise<void> {
  // Get glossary terms for this language
  const glossaryTerms = getGlossaryForLanguage(glossary, job.languageId)

  // Compose the prompt
  const promptText = composePromptForKey(job.promptKey, {
    includeCrowdin: true,
    languageCode: job.languageId,
    glossaryTerms,
    verbose,
  })

  if (verbose) {
    logFullPrompt(promptText, `Prompt for ${job.jobKey}`)
  }

  // Create ephemeral prompt in Crowdin
  const { promptId } = await createEphemeralPrompt({
    userId,
    languageCode: job.languageId,
    promptKey: job.promptKey,
    promptText,
    verbose,
  })

  job.ephemeralPromptId = promptId
  job.status = "prompt-created"
}

/**
 * Start pre-translation job
 */
async function startPreTranslationJob(job: PreTranslationJob): Promise<void> {
  if (!job.ephemeralPromptId) {
    throw new Error(`Job ${job.jobKey}: No ephemeral prompt ID`)
  }

  const response = await postApplyPreTranslation(
    job.fileIds,
    [job.languageId],
    job.ephemeralPromptId
  )

  job.preTranslationId = response.identifier
  job.status = "started"

  console.log(
    `[PRE-TRANSLATE] Started job ${job.jobKey} (ID: ${response.identifier})`
  )
}

/**
 * Wait for a single pre-translation job to complete
 */
async function awaitJobCompletion(job: PreTranslationJob): Promise<void> {
  if (!job.preTranslationId) {
    throw new Error(`Job ${job.jobKey}: No pre-translation ID`)
  }

  try {
    const response = await awaitPreTranslationCompleted(job.preTranslationId)
    if (response.status === "finished") {
      job.status = "completed"
      console.log(`[PRE-TRANSLATE] ✓ Job ${job.jobKey} completed`)
    } else {
      job.status = "failed"
      job.error = `Unexpected status: ${response.status}`
      console.error(`[PRE-TRANSLATE] ✗ Job ${job.jobKey} failed: ${job.error}`)
    }
  } catch (error) {
    job.status = "failed"
    job.error = (error as Error).message
    console.error(`[PRE-TRANSLATE] ✗ Job ${job.jobKey} failed: ${job.error}`)
  }
}

/**
 * Process jobs with concurrency limit
 */
async function processJobsWithConcurrency<T>(
  items: T[],
  concurrency: number,
  processor: (item: T) => Promise<void>
): Promise<void> {
  let index = 0
  const results: Promise<void>[] = []

  async function processNext(): Promise<void> {
    while (index < items.length) {
      const currentIndex = index++
      await processor(items[currentIndex])
    }
  }

  // Start `concurrency` workers
  for (let i = 0; i < Math.min(concurrency, items.length); i++) {
    results.push(processNext())
  }

  await Promise.all(results)
}

// ============================================================================
// MAIN WORKFLOW
// ============================================================================

/**
 * Resume existing multi-job pre-translation
 */
async function resumeMultiJobPreTranslation(
  artifact: MultiJobArtifact,
  verbose: boolean
): Promise<CrowdinPreTranslateResponse[]> {
  logSection("Resuming Multi-Job Pre-Translation")

  const jobs: PreTranslationJob[] = artifact.jobs.map((j) => ({
    jobKey: j.jobKey,
    languageId: j.languageId,
    promptKey: j.promptKey,
    fileIds: j.fileIds,
    ephemeralPromptId: j.ephemeralPromptId,
    preTranslationId: j.preTranslationId,
    status: j.status as PreTranslationJob["status"],
  }))

  // Resume incomplete jobs
  const incompleteJobs = jobs.filter(
    (j) => j.status === "started" && j.preTranslationId
  )

  console.log(
    `[PRE-TRANSLATE] Resuming ${incompleteJobs.length} in-progress jobs`
  )

  const responses: CrowdinPreTranslateResponse[] = []

  for (const job of incompleteJobs) {
    const statusResp = await getPreTranslationStatus(job.preTranslationId!)

    if (statusResp.status === "in_progress") {
      console.log(
        `[PRE-TRANSLATE] Job ${job.jobKey} in progress (${statusResp.progress}%), waiting...`
      )
      const completed = await awaitPreTranslationCompleted(
        job.preTranslationId!
      )
      responses.push(completed)
    } else if (statusResp.status === "finished") {
      console.log(`[PRE-TRANSLATE] Job ${job.jobKey} already finished`)
      responses.push(statusResp)
    } else {
      console.warn(
        `[PRE-TRANSLATE] Job ${job.jobKey} has unexpected status: ${statusResp.status}`
      )
    }
  }

  // Clean up ephemeral prompts
  const promptIds = jobs
    .map((j) => j.ephemeralPromptId)
    .filter((id): id is number => id !== null)

  if (promptIds.length > 0) {
    console.log(
      `[PRE-TRANSLATE] Cleaning up ${promptIds.length} ephemeral prompts`
    )
    await deleteEphemeralPrompts(artifact.userId, promptIds, verbose)
  }

  return responses
}

/**
 * Start new multi-job pre-translation
 */
async function startMultiJobPreTranslation(
  context: WorkflowContext,
  options: MultiJobPreTranslationOptions
): Promise<CrowdinPreTranslateResponse[]> {
  const {
    userId,
    glossary,
    concurrency = DEFAULT_CONCURRENCY,
    verbose = false,
  } = options
  const { fileIdsSet, processedFileIdToPath, crowdinProjectFiles } = context

  logSection("Starting Multi-Job Pre-Translation")

  // Build fileId → path mapping
  const fileIdToPath: Record<number, string> = {}
  for (const fid of fileIdsSet) {
    if (processedFileIdToPath[fid]) {
      fileIdToPath[fid] = processedFileIdToPath[fid]
    } else {
      const existing = crowdinProjectFiles.find((f) => f.id === fid)
      if (existing) fileIdToPath[fid] = existing.path
    }
  }

  // Create jobs
  const jobs = createJobs(fileIdToPath, config.allCrowdinCodes)
  console.log(
    `[PRE-TRANSLATE] Created ${jobs.length} jobs for ${config.allCrowdinCodes.length} languages`
  )

  // Phase 1: Create ephemeral prompts (serially to avoid rate limits)
  logSubsection("Creating Ephemeral Prompts")
  for (const job of jobs) {
    await createPromptForJob(job, userId, glossary, verbose)
    // Small delay to avoid rate limits
    await delay(100)
  }
  console.log(`[PRE-TRANSLATE] Created ${jobs.length} ephemeral prompts`)

  // Write artifact (for resume)
  writeMultiJobArtifact(userId, jobs)

  // Phase 2: Start pre-translation jobs (with concurrency limit)
  logSubsection("Starting Pre-Translation Jobs")
  await processJobsWithConcurrency(jobs, concurrency, async (job) => {
    await startPreTranslationJob(job)
    // Update artifact after each job starts
    writeMultiJobArtifact(userId, jobs)
  })

  // If no targetPath (full translation), exit now
  if (!config.targetPath) {
    logSection("Full Translation Jobs Started")
    console.log(
      `${jobs.length} jobs started across ${config.allCrowdinCodes.length} languages.`
    )
    console.log(`This will take significant time to complete.`)
    console.log(`Resume later with the artifact file.`)
    process.exit(0)
  }

  // Phase 3: Wait for all jobs to complete
  logSubsection("Waiting for Pre-Translation Completion")
  await processJobsWithConcurrency(jobs, concurrency, async (job) => {
    await awaitJobCompletion(job)
    // Update artifact after each job completes
    writeMultiJobArtifact(userId, jobs)
  })

  // Check for failures
  const failedJobs = jobs.filter((j) => j.status === "failed")
  if (failedJobs.length > 0) {
    console.warn(`[PRE-TRANSLATE] ${failedJobs.length} jobs failed:`)
    for (const job of failedJobs) {
      console.warn(`  - ${job.jobKey}: ${job.error}`)
    }
  }

  // Phase 4: Clean up ephemeral prompts
  logSubsection("Cleaning Up Ephemeral Prompts")
  const promptIds = jobs
    .map((j) => j.ephemeralPromptId)
    .filter((id): id is number => id !== null)

  if (promptIds.length > 0) {
    await deleteEphemeralPrompts(userId, promptIds, verbose)
  }

  // Collect responses
  const completedJobs = jobs.filter(
    (j) => j.status === "completed" && j.preTranslationId
  )

  const responses: CrowdinPreTranslateResponse[] = []
  for (const job of completedJobs) {
    const resp = await getPreTranslationStatus(job.preTranslationId!)
    responses.push(resp)
  }

  console.log(
    `[PRE-TRANSLATE] ✓ Completed ${completedJobs.length}/${jobs.length} jobs`
  )

  return responses
}

/**
 * Handle multi-job pre-translation: resume existing or start new
 *
 * This is the main entry point for v2 pre-translation.
 * Uses modular prompts with EthGlossary injection per language.
 */
export async function handleMultiJobPreTranslation(
  context: WorkflowContext,
  options: MultiJobPreTranslationOptions
): Promise<PreTranslationResult> {
  const { verbose = false } = options

  // Check for existing v2 artifact (resume)
  const existingArtifact = readMultiJobArtifact()

  const responses = existingArtifact
    ? await resumeMultiJobPreTranslation(existingArtifact, verbose)
    : await startMultiJobPreTranslation(context, options)

  // Merge file IDs from all responses
  const allFileIds = new Set<number>()
  for (const resp of responses) {
    for (const fid of resp.attributes.fileIds) {
      allFileIds.add(fid)
    }
  }

  // Build file ID to path mapping
  const { processedFileIdToPath, crowdinProjectFiles } = context
  const fileIdToPathMapping: Record<number, string> = {}

  for (const fid of allFileIds) {
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

  // Return first response (for backward compatibility with single-job workflow)
  // The fileIdToPathMapping contains all files from all jobs
  return {
    response: responses[0] || {
      identifier: "multi-job",
      status: "finished",
      progress: 100,
      attributes: {
        languageIds: config.allCrowdinCodes,
        fileIds: Array.from(allFileIds),
        method: "ai",
        autoApproveOption: "none",
        duplicateTranslations: false,
        skipApprovedTranslations: false,
        labelIds: [],
        aiPromptId: null,
        excludeLabelIds: [],
        sourceLanguageId: null,
        fallbackLanguages: null,
        translateUntranslatedOnly: false,
        translateWithPerfectMatchOnly: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startedAt: null,
      finishedAt: new Date().toISOString(),
      eta: null,
    },
    fileIdToPathMapping,
  }
}
