// Crowdin AI Completions (QA check) helpers

import {
  config,
  CROWDIN_API_BASE_URL,
  crowdinBearerHeaders,
} from "../../config"

export type QaCompletionRequest = {
  projectId: number
  sourceLanguageId: string
  targetLanguageId: string
  stringIds: number[]
}

export type QaCompletionJob = {
  id: string
  status: "in_progress" | "finished" | string
  progress?: number
}

export type QaIssue = {
  fileId: number
  stringId: number
  severity: "error" | "warning" | "info"
  title: string
  details?: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Resolve the Crowdin user ID from the API
 */
export const resolveCrowdinUserId = async (): Promise<string> => {
  const url = new URL(`${CROWDIN_API_BASE_URL}/user`)
  const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`resolveCrowdinUserId (${res.status}): ${text}`)
  }
  const json = await res.json()
  const id = String(json.data?.id || json.id)
  if (!id) throw new Error("Failed to resolve Crowdin user id from /user")
  return id
}

/**
 * List all string IDs for a given file
 */
export const listStringIdsForFile = async (
  fileId: number
): Promise<number[]> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/strings`
  )
  url.searchParams.set("fileId", String(fileId))
  url.searchParams.set("limit", "500")
  const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`listStringIdsForFile (${res.status}): ${text}`)
  }
  const json = await res.json()
  type StringItem = { data: { id: number } }
  const items: StringItem[] = json.data || []
  const ids: number[] = items.map((d) => d.data.id)
  return ids
}

/**
 * Post QA completions request
 */
export const postQaCompletions = async (
  qaPromptId: number,
  payload: QaCompletionRequest
): Promise<QaCompletionJob> => {
  const userId = await resolveCrowdinUserId()
  if (!userId)
    throw new Error("Failed to resolve Crowdin user ID for completions")
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/users/${userId}/ai/prompts/${qaPromptId}/completions`
  )
  const bodyPayload = { resources: payload }
  console.log(`[QA-CHECK][DEBUG] POST ${url.toString()}`)
  console.log(`[QA-CHECK][DEBUG] Body:`, JSON.stringify(bodyPayload, null, 2))
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { ...crowdinBearerHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  })
  console.log(`[QA-CHECK][DEBUG] Response status: ${res.status}`)
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    console.log(`[QA-CHECK][DEBUG] Error response:`, text)
    if (res.status === 403) {
      throw new Error(
        `QA completions endpoint not accessible (403). ` +
          `This may require Crowdin Enterprise or AI credits. URL: ${url.toString()} Raw: ${text}`
      )
    }
    throw new Error(`postQaCompletions (${res.status}): ${text}`)
  }
  const json = await res.json()
  console.log(
    `[QA-CHECK][DEBUG] Success response:`,
    JSON.stringify(json, null, 2)
  )
  return json.data as QaCompletionJob
}

/**
 * Get QA completion status
 */
export const getQaCompletion = async (
  completionId: string
): Promise<QaCompletionJob> => {
  const userId = await resolveCrowdinUserId()
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/users/${userId}/ai/prompts/completions/${completionId}`
  )
  const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`getQaCompletion (${res.status}): ${text}`)
  }
  const json = await res.json()
  return json.data as QaCompletionJob
}

/**
 * Poll QA completion until finished with adaptive intervals
 */
export const awaitQaCompletion = async (
  completionId: string,
  timeoutMs = config.pretranslateTimeoutMs,
  baseIntervalMs = config.pretranslatePollBaseMs
): Promise<QaCompletionJob> => {
  const start = Date.now()
  let attempt = 0
  const computeInterval = (elapsedMs: number): number => {
    const minutes = elapsedMs / 60000
    if (minutes < 10) return baseIntervalMs
    if (minutes < 30) return Math.max(baseIntervalMs * 2, 60_000)
    if (minutes < 60) return Math.max(baseIntervalMs * 4, 180_000)
    return Math.max(baseIntervalMs * 10, 300_000)
  }
  while (Date.now() - start <= timeoutMs) {
    attempt++
    const elapsed = Date.now() - start
    let job: QaCompletionJob
    try {
      job = await getQaCompletion(completionId)
    } catch (e) {
      const wait = computeInterval(elapsed)
      console.warn(
        `[QA-CHECK][POLL] Error on attempt ${attempt}: ${(e as Error).message}. Waiting ${wait}ms.`
      )
      await delay(wait)
      continue
    }
    if (job.status !== "in_progress") return job
    const wait = computeInterval(elapsed)
    console.log(
      `[QA-CHECK][POLL] attempt=${attempt} progress=${job.progress ?? 0}% nextWait=${wait}ms`
    )
    await delay(wait)
  }
  throw new Error("Timed out awaiting QA completion")
}

/**
 * Download QA completion results
 */
export const downloadQaCompletionResult = async (
  completionId: string
): Promise<QaIssue[]> => {
  const userId = await resolveCrowdinUserId()
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/users/${userId}/ai/prompts/completions/${completionId}/download`
  )
  const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`downloadQaCompletionResult (${res.status}): ${text}`)
  }
  // Assume JSON structure containing issues; adjust as per actual response
  const arrayBuffer = await res.arrayBuffer()
  const text = Buffer.from(arrayBuffer).toString("utf-8")
  try {
    const parsed = JSON.parse(text)
    const issues: QaIssue[] = parsed.issues || parsed.data || []
    return issues
  } catch {
    // If plain text, return empty and attach raw for summary
    return []
  }
}

/**
 * Summarize QA issues for PR body
 */
export const summarizeQaIssues = (
  issues: QaIssue[],
  fileIdToPath: Record<number, string>,
  lang: string
): string => {
  if (!issues.length) return `No QA issues detected for ${lang}.`
  const counts = { error: 0, warning: 0, info: 0 }
  for (const i of issues) {
    const sev = i.severity
    if (sev === "error" || sev === "warning" || sev === "info") {
      counts[sev]++
    }
  }
  const top = issues.slice(0, 10)
  const lines = [
    `QA for ${lang}: ${counts.error} errors, ${counts.warning} warnings, ${counts.info} info`,
  ]
  for (const i of top) {
    const path = fileIdToPath[i.fileId] || `fileId=${i.fileId}`
    lines.push(`- [${i.severity}] ${path} string=${i.stringId} — ${i.title}`)
  }
  return lines.join("\n")
}
