// Utilities: resilient fetch with retry logic

import { delay } from "../workflows/utils"

export type RetryOptions = {
  retries?: number
  timeoutMs?: number
  backoffMs?: number
  retryOnStatuses?: number[]
}

export const fetchWithRetry = async (
  url: string,
  init?: RequestInit,
  options?: RetryOptions
) => {
  const retries = options?.retries ?? 3
  const timeoutMs = options?.timeoutMs ?? 30000
  const backoffMs = options?.backoffMs ?? 1000
  const retryOnStatuses = options?.retryOnStatuses ?? [
    403, // GitHub secondary rate limits
    408, 429, 500, 502, 503, 504,
  ]

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        ...(init || {}),
        signal: controller.signal,
      })
      clearTimeout(id)
      if (
        !res.ok &&
        retryOnStatuses.includes(res.status) &&
        attempt < retries
      ) {
        // Check if this is a rate limit error and use longer backoff
        let wait = backoffMs * Math.pow(2, attempt)
        let isRateLimit = false

        if (res.status === 403 || res.status === 429) {
          try {
            const bodyText = await res.clone().text()
            if (
              bodyText.includes("rate limit") ||
              bodyText.includes("Rate limit")
            ) {
              isRateLimit = true
              // Use much longer backoff for rate limits (60s, 120s, 240s)
              wait = 60000 * Math.pow(2, attempt)
            }
          } catch {
            // If we can't read the body, treat 403/429 as rate limits
            isRateLimit = true
            wait = 60000 * Math.pow(2, attempt)
          }
        }

        console.warn(
          `[${isRateLimit ? "RATE LIMIT" : "RETRY"}] ${url} -> ${res.status}. Attempt ${attempt + 1}/${retries}. Waiting ${wait}ms.`
        )
        await delay(wait)
        continue
      }
      return res
    } catch (err: unknown) {
      clearTimeout(id)
      const errObj = err as { name?: string; code?: string }
      const isAbort = errObj?.name === "AbortError"
      const isConnectTimeout = errObj?.code === "UND_ERR_CONNECT_TIMEOUT"
      if ((isAbort || isConnectTimeout) && attempt < retries) {
        const wait = backoffMs * Math.pow(2, attempt)
        console.warn(
          `[RETRY] ${url} -> ${isAbort ? "AbortError" : errObj?.code}. Attempt ${
            attempt + 1
          }/${retries}. Waiting ${wait}ms.`
        )
        await delay(wait)
        continue
      }
      throw err
    }
  }
  // Unreachable, but TS wants a return
  throw new Error("fetchWithRetry: exhausted retries")
}
