import type { EthStoreResponse, MetricReturnData } from "@/lib/types"

import { MAX_RETRIES } from "../constants"
import {
  delayWithJitter,
  fetchWithTimeoutAndRevalidation,
  shouldStatusRetry,
  sleep,
} from "../utils/data/utils"

export const fetchBeaconchainEthstore = async (): Promise<MetricReturnData> => {
  const base = "https://beaconcha.in"
  const endpoint = "api/v1/ethstore/latest"
  const { href } = new URL(endpoint, base)

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeoutAndRevalidation(href)
      if (!response.ok) {
        const status = response.status
        const shouldRetry = attempt < MAX_RETRIES && shouldStatusRetry(status)
        if (shouldRetry) {
          await sleep(delayWithJitter())
          continue
        }
        console.warn("Beaconcha.in fetch non-OK", { status, url: href })
        return { error: `Beaconcha.in responded with status ${status}` }
      }

      const json: EthStoreResponse = await response.json()
      const apr = json.data.apr
      return { value: apr, timestamp: Date.now() }
    } catch (err: unknown) {
      const isLastAttempt = attempt >= MAX_RETRIES
      if (isLastAttempt) {
        console.error("Beaconcha.in fetch failed", {
          name: err instanceof Error ? err.name : undefined,
          message: err instanceof Error ? err.message : String(err),
          url: href,
        })
        return { error: `Failed to fetch Beaconcha.in ${endpoint}` }
      }
      await sleep(delayWithJitter())
    }
  }

  return { error: "Failed to fetch Beaconcha.in ethstore" }
}

export default fetchBeaconchainEthstore
