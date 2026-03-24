/**
 * Shared retry.fetch configuration for all data-layer fetchers.
 *
 * Uses Trigger.dev's built-in retry.fetch which automatically handles
 * 429 (rate-limit) and 5xx (server error) responses with exponential backoff.
 */
import { retry } from "@trigger.dev/sdk/v3"

const RETRY_BY_STATUS = {
  "429": {
    strategy: "backoff" as const,
    maxAttempts: 2,
  },
  "500-599": {
    strategy: "backoff" as const,
    maxAttempts: 2,
  },
}

/**
 * Drop-in replacement for `fetch()` with built-in 429 and 5xx retry.
 * Delegates to Trigger.dev's `retry.fetch` under the hood.
 */
export function fetchRetry(
  url: string | URL,
  init?: RequestInit
): Promise<Response> {
  return retry.fetch(url, {
    ...init,
    retry: { byStatus: RETRY_BY_STATUS },
  })
}
