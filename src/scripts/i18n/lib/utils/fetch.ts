// Utilities: resilient fetch with retry logic

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

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
        const wait = backoffMs * Math.pow(2, attempt)
        console.warn(
          `[RETRY] ${url} -> ${res.status}. Attempt ${attempt + 1}/${retries}. Waiting ${wait}ms.`
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
