#!/usr/bin/env npx ts-node
/**
 * crowdin-poll.ts
 *
 * Polls a pre-translation job until completion.
 * Designed to be run as a separate job that can be scheduled/retried.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-poll.ts [job-id]
 *   npx ts-node src/scripts/i18n/crowdin-poll.ts --file pretranslate-job-id.txt
 *
 * Environment:
 *   CROWDIN_API_KEY or I18N_CROWDIN_API_KEY - Crowdin API token
 *   CROWDIN_PROJECT_ID - Crowdin project ID (default: 834930)
 *   PRETRANSLATE_JOB_ID - Job ID (alternative to CLI arg)
 *   POLL_INTERVAL_MS - Poll interval in ms (default: 60000 = 1 minute)
 *   POLL_TIMEOUT_MS - Timeout in ms (default: 43200000 = 12 hours)
 *
 * Exit codes:
 *   0 - Job completed successfully
 *   1 - Job failed or error
 *   2 - Job still in progress (timeout)
 */

import { existsSync, readFileSync, writeFileSync } from "fs"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

// Configuration
const DEFAULT_POLL_INTERVAL_MS = 60_000 // 1 minute
const DEFAULT_TIMEOUT_MS = 12 * 60 * 60 * 1000 // 12 hours
const STATUS_FILE = "pretranslate-status.json"

type JobStatus = "created" | "in_progress" | "canceled" | "failed" | "finished"

interface StatusOutput {
  jobId: string
  status: JobStatus
  progress: number
  startedAt: string | null
  finishedAt: string | null
  checkedAt: string
}

/**
 * Get job ID from CLI args, file, or environment.
 */
function getJobId(): string {
  // Check CLI args
  const args = process.argv.slice(2)

  if (args[0] === "--file" && args[1]) {
    if (existsSync(args[1])) {
      return readFileSync(args[1], "utf-8").trim()
    }
    throw new Error(`File not found: ${args[1]}`)
  }

  if (args[0] && !args[0].startsWith("--")) {
    return args[0]
  }

  // Check environment
  if (process.env.PRETRANSLATE_JOB_ID) {
    return process.env.PRETRANSLATE_JOB_ID
  }

  // Check default file
  if (existsSync("pretranslate-job-id.txt")) {
    return readFileSync("pretranslate-job-id.txt", "utf-8").trim()
  }

  throw new Error(
    "No job ID provided. Use: crowdin-poll.ts <job-id> or set PRETRANSLATE_JOB_ID"
  )
}

/**
 * Check the status of a pre-translation job.
 */
async function checkJobStatus(jobId: string): Promise<StatusOutput> {
  const projectId = crowdinClient.projectId

  const response = await crowdinClient.translations.preTranslationStatus(
    projectId,
    jobId
  )

  const data = response.data

  return {
    jobId,
    status: data.status as JobStatus,
    progress: data.progress,
    startedAt: data.startedAt,
    finishedAt: data.finishedAt,
    checkedAt: new Date().toISOString(),
  }
}

/**
 * Poll until job completes or timeout.
 */
async function pollUntilComplete(
  jobId: string,
  intervalMs: number,
  timeoutMs: number
): Promise<StatusOutput> {
  const startTime = Date.now()

  for (;;) {
    const status = await checkJobStatus(jobId)

    // Save status to file for inspection
    writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2))

    console.log(
      `[POLL] Status: ${status.status} | Progress: ${status.progress}% | ` +
        `Elapsed: ${Math.round((Date.now() - startTime) / 1000 / 60)}min`
    )

    // Check for completion
    if (status.status === "finished") {
      console.log("[POLL] Job completed successfully!")
      return status
    }

    if (status.status === "failed") {
      console.error("[POLL] Job failed!")
      throw new Error("Pre-translation job failed")
    }

    if (status.status === "canceled") {
      console.error("[POLL] Job was canceled!")
      throw new Error("Pre-translation job was canceled")
    }

    // Check timeout
    if (Date.now() - startTime > timeoutMs) {
      console.warn("[POLL] Timeout reached, job still in progress")
      // Exit with code 2 to indicate timeout (can be retried)
      process.exit(2)
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }
}

/**
 * Single status check mode (no polling).
 */
async function checkOnce(jobId: string): Promise<void> {
  const status = await checkJobStatus(jobId)
  writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2))

  console.log(JSON.stringify(status, null, 2))

  if (status.status === "finished") {
    process.exit(0)
  } else if (status.status === "failed" || status.status === "canceled") {
    process.exit(1)
  } else {
    // Still in progress
    process.exit(2)
  }
}

async function main() {
  // Load environment (for project ID)
  loadEnv()

  const jobId = getJobId()
  console.log(`[POLL] Polling job: ${jobId}`)

  // Check for --once flag
  if (process.argv.includes("--once")) {
    await checkOnce(jobId)
    return
  }

  // Get poll configuration
  const intervalMs = parseInt(
    process.env.POLL_INTERVAL_MS || String(DEFAULT_POLL_INTERVAL_MS),
    10
  )
  const timeoutMs = parseInt(
    process.env.POLL_TIMEOUT_MS || String(DEFAULT_TIMEOUT_MS),
    10
  )

  console.log(`[POLL] Interval: ${intervalMs / 1000}s`)
  console.log(`[POLL] Timeout: ${timeoutMs / 1000 / 60}min`)

  await pollUntilComplete(jobId, intervalMs, timeoutMs)
}

main().catch((error) => {
  console.error("[POLL] Fatal error:", error)
  process.exit(1)
})
