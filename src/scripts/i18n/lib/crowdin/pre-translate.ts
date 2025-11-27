// Crowdin pre-translation operations

import {
  config,
  CROWDIN_API_BASE_URL,
  crowdinBearerHeaders,
} from "../../config"
import type { CrowdinPreTranslateResponse } from "../types"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Apply pre-translation to files
 */
export const postApplyPreTranslation = async (
  fileIds: number[],
  languageIds?: string[],
  aiPromptIdOverride?: number
): Promise<CrowdinPreTranslateResponse> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/pre-translations`
  )
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        languageIds: languageIds || config.allCrowdinCodes,
        fileIds,
        method: "ai",
        aiPromptId:
          typeof aiPromptIdOverride === "number"
            ? aiPromptIdOverride
            : config.preTranslatePromptId,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `Crowdin postApplyPreTranslation failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = {
      data: CrowdinPreTranslateResponse
    }
    const json: JsonResponse = await res.json()

    return json.data
  } catch (error) {
    console.error("postApplyPreTranslation error:", error)
    throw error
  }
}

/**
 * Get pre-translation status
 */
export const getPreTranslationStatus = async (
  preTranslationId: string
): Promise<CrowdinPreTranslateResponse> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/pre-translations/${preTranslationId}`
  )
  try {
    const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `Crowdin getPreTranslationStatus failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = {
      data: CrowdinPreTranslateResponse
    }
    const json: JsonResponse = await res.json()

    return json.data
  } catch (error) {
    console.error("getPreTranslationStatus error:", error)
    throw error
  }
}

/**
 * Polls Crowdin for the status of a pre-translation job and resolves when it finishes.
 *
 * This function repeatedly calls `getPreTranslationStatus` for the given
 * pre-translation ID until the job is no longer in progress. It uses adaptive
 * polling intervals based on elapsed time and will abort with an error if the operation
 * does not complete within the configured timeout.
 *
 * @param preTranslationId - The identifier of the Crowdin pre-translation job to monitor.
 * @param opts - Optional configuration for timeout and base polling interval
 *
 * @returns A promise that resolves with the final CrowdinPreTranslateResponse when the
 *          job status becomes "finished".
 *
 * @throws {Error} If the wait times out
 * @throws {Error} If the pre-translation completes with an unexpected status
 * @throws {Error} If an error is thrown while fetching the pre-translation status
 */
export const awaitPreTranslationCompleted = async (
  preTranslationId: string,
  opts?: { timeoutMs?: number; baseIntervalMs?: number }
): Promise<CrowdinPreTranslateResponse> => {
  const timeoutMs = opts?.timeoutMs ?? config.pretranslateTimeoutMs
  const baseInterval = opts?.baseIntervalMs ?? config.pretranslatePollBaseMs
  const start = Date.now()
  let attempt = 0

  const computeInterval = (elapsedMs: number): number => {
    const minutes = elapsedMs / 60000
    if (minutes < 10) return baseInterval
    if (minutes < 30) return Math.max(baseInterval * 2, 60_000)
    if (minutes < 60) return Math.max(baseInterval * 4, 180_000)
    return Math.max(baseInterval * 10, 300_000) // cap at 5 min
  }

  // Bounded loop: terminates once elapsed exceeds timeoutMs
  while (Date.now() - start <= timeoutMs) {
    const elapsed = Date.now() - start
    attempt++
    let res: CrowdinPreTranslateResponse
    try {
      res = await getPreTranslationStatus(preTranslationId)
    } catch (e) {
      // transient fetch errors: log + continue within timeout window
      const nextWait = computeInterval(elapsed)
      console.warn(
        `[PRE-TRANSLATE][POLL] Error on attempt ${attempt}: ${(e as Error).message}. Retrying in ${nextWait}ms.`
      )
      await delay(nextWait)
      continue
    }
    if (res.status !== "in_progress") {
      if (res.status === "finished") {
        console.log(
          `[PRE-TRANSLATE][POLL] Completed after ${attempt} attempts; elapsed ${Math.round(
            (Date.now() - start) / 60000
          )}m.`
        )
        return res
      }
      throw new Error(
        `Pre-translation ended with unexpected status: ${res.status}`
      )
    }
    const nextWait = computeInterval(elapsed)
    const progressPct = res.progress ?? 0
    console.log(
      `[PRE-TRANSLATE][POLL] attempt=${attempt} progress=${progressPct}% elapsed=${Math.round(
        elapsed / 60000
      )}m nextWait=${nextWait}ms`
    )
    await delay(nextWait)
  }
  const finalElapsed = Date.now() - start
  throw new Error(
    `Timed out waiting for pre-translation (elapsed ${Math.round(
      finalElapsed / 60000
    )}m)`
  )
}
