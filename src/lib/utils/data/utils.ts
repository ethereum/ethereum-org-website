import {
  BASE_TIME_UNIT,
  RETRY_DELAY_BASE_MS,
  TIMEOUT_MS,
} from "@/lib/constants"

/**
 * Returns a delay time in milliseconds by adding a random jitter to the base delay.
 *
 * @param ms - The base delay in milliseconds. Defaults to `RETRY_DELAY_BASE_MS`.
 * @param jitterMs - The maximum jitter in milliseconds to add to the base delay. Defaults to `RETRY_DELAY_BASE_MS`.
 * @returns The total delay in milliseconds, including a random jitter.
 */
export const delayWithJitter = (
  ms: number = RETRY_DELAY_BASE_MS,
  jitterMs: number = RETRY_DELAY_BASE_MS
) => ms + Math.floor(Math.random() * jitterMs)

/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified delay.
 */
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Determines whether a request should be retried based on the HTTP status code.
 *
 * Retries are recommended for:
 * - 429 (Too Many Requests)
 * - 5xx server errors (status codes between 500 and 599, inclusive)
 *
 * @param status - The HTTP status code to evaluate.
 * @returns `true` if the request should be retried, otherwise `false`.
 */
export const shouldStatusRetry = (status: number) =>
  status === 429 || (status >= 500 && status <= 599)

/**
 * Fetches a resource with a specified timeout and optional revalidation.
 *
 * Initiates a fetch request to the provided URL or Request object, aborting the request if it exceeds the given delay.
 * Optionally sets the `next.revalidate` property for caching behavior.
 *
 * @param href - The resource to fetch. Can be a string URL, a URL object, or a Request object.
 * @param delay - The timeout in milliseconds before aborting the request. Defaults to `TIMEOUT_MS`.
 * @param revalidate - The revalidation time in seconds or `false` to disable revalidation. Defaults to `BASE_TIME_UNIT`.
 * @returns A promise that resolves to the fetch response.
 */
export const fetchWithTimeoutAndRevalidation = async (
  href: string | URL | globalThis.Request,
  delay: number = TIMEOUT_MS,
  revalidate: number | false = BASE_TIME_UNIT
) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), delay)
  try {
    return await fetch(href, {
      signal: controller.signal,
      next: { revalidate },
    })
  } finally {
    clearTimeout(timeout)
  }
}
