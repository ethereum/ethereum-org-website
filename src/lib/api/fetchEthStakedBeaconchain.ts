import type { EpochResponse, MetricReturnData } from "@/lib/types"

const TIMEOUT_MS = 5000
const MAX_RETRIES = 1
const RETRY_DELAY_BASE_MS = 250

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Fetch total eligible ETH staked from Beaconcha.in with timeout, minimal retry, and Next fetch caching.
export const fetchEthStakedBeaconchain =
  async (): Promise<MetricReturnData> => {
    const base = "https://beaconcha.in"
    const { href } = new URL("api/v1/epoch/latest", base)

    const fetchWithTimeout = async () => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
      try {
        // Use Next.js fetch caching with hourly revalidation
        return await fetch(href, {
          signal: controller.signal,
          // Hint Next's incremental cache to revalidate hourly
          next: { revalidate: 3600 },
        })
      } finally {
        clearTimeout(timeout)
      }
    }

    // One minimal retry on 429 or 5xx or network/timeout errors
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetchWithTimeout()

        if (!response.ok) {
          const status = response.status
          // Retry on rate limit or transient server errors
          const shouldRetry =
            attempt < MAX_RETRIES &&
            (status === 429 || (status >= 500 && status <= 599))
          if (shouldRetry) {
            await sleep(RETRY_DELAY_BASE_MS + Math.floor(Math.random() * 150))
            continue
          }

          console.warn("Beaconcha.in fetch non-OK", { status, url: href })
          return { error: `Beaconcha.in responded with status ${status}` }
        }

        const json: EpochResponse = await response.json()

        // Endpoint naming uses `eligibleether`, but this is technically a `gwei` value
        const eligibleGwei = json.data.eligibleether
        const totalEthStaked = Math.floor(eligibleGwei * 1e-9)

        return { value: totalEthStaked, timestamp: Date.now() }
      } catch (err: unknown) {
        const isLastAttempt = attempt >= MAX_RETRIES
        if (isLastAttempt) {
          console.error("Beaconcha.in fetch failed", {
            name: err instanceof Error ? err.name : undefined,
            message: err instanceof Error ? err.message : String(err),
            url: href,
          })
          return { error: "Failed to fetch Beaconcha.in staked ETH" }
        }
        // Add 0-300ms random jitter to avoid additional synchronized traffic spike
        await sleep(RETRY_DELAY_BASE_MS + Math.floor(Math.random() * 300))
      }
    }

    // Fallback (should not reach here)
    return { error: "Failed to fetch Beaconcha.in staked ETH" }
  }
