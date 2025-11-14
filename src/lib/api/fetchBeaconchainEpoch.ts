import type { BeaconchainEpochData, EpochResponse } from "@/lib/types"

import { MAX_RETRIES } from "../constants"
import {
  delayWithJitter,
  fetchWithTimeoutAndRevalidation,
  shouldStatusRetry,
  sleep,
} from "../utils/data/utils"

export const fetchBeaconchainEpoch =
  async (): Promise<BeaconchainEpochData> => {
    const base = "https://beaconcha.in"
    const endpoint = "api/v1/epoch/latest"
    const { href } = new URL(endpoint, base)

    const defaultErrorMessage = `Failed to fetch Beaconcha.in ${endpoint}`
    const defaultError: BeaconchainEpochData = {
      totalEthStaked: { error: defaultErrorMessage },
      validatorscount: { error: defaultErrorMessage },
    }

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
          const error = `Beaconcha.in responded with status ${status}`
          return { totalEthStaked: { error }, validatorscount: { error } }
        }
        const json: EpochResponse = await response.json()
        const { validatorscount, eligibleether } = json.data
        const totalEthStaked = Math.floor(eligibleether * 1e-9) // `eligibleether` value returned in `gwei`
        const timestamp = Date.now()
        return {
          totalEthStaked: { value: totalEthStaked, timestamp },
          validatorscount: { value: validatorscount, timestamp },
        }
      } catch (err: unknown) {
        const isLastAttempt = attempt >= MAX_RETRIES
        if (isLastAttempt) {
          console.error("Beaconcha.in fetch failed", {
            name: err instanceof Error ? err.name : undefined,
            message: err instanceof Error ? err.message : String(err),
            url: href,
          })
          return defaultError
        }
        await sleep(delayWithJitter())
      }
    }

    return defaultError
  }

export default fetchBeaconchainEpoch
