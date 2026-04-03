/**
 * Shared retry.fetch configuration for all data-layer fetchers.
 *
 * Uses Trigger.dev's built-in retry.fetch which automatically handles
 * retryable HTTP responses with exponential backoff.
 *
 * Retried status codes (up to 3 attempts each):
 * - 408 Request Timeout
 * - 409 Conflict
 * - 429 Too Many Requests (rate-limit)
 * - 500-599 Server errors
 */
import { retry } from "@trigger.dev/sdk/v3"

type RetryFetchInit = NonNullable<Parameters<typeof retry.fetch>[1]>
type RetryByStatus = NonNullable<
  NonNullable<RetryFetchInit["retry"]>["byStatus"]
>

/** Sleep for specified milliseconds. */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const RETRY_STRATEGY = { strategy: "backoff" as const, maxAttempts: 3 }

const RETRY_BY_STATUS: RetryByStatus = {
  "408": RETRY_STRATEGY,
  "409": RETRY_STRATEGY,
  "429": RETRY_STRATEGY,
  "500-599": RETRY_STRATEGY,
}

/**
 * Drop-in replacement for `fetch()` with built-in retry on transient errors.
 * Delegates to Trigger.dev's `retry.fetch` under the hood.
 *
 * Callers can override retry behavior for specific status codes:
 * ```ts
 * fetchRetry(url, { headers }, { "429": { strategy: "headers", ... } })
 * ```
 */
export function fetchRetry(
  url: string | URL,
  init?: RequestInit,
  retryByStatus?: RetryByStatus
): Promise<Response> {
  return retry.fetch(url, {
    ...init,
    retry: { byStatus: { ...RETRY_BY_STATUS, ...retryByStatus } },
  })
}
