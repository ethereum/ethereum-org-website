import type {
  BeaconchainEpochData,
  EpochResponse,
  EthStoreResponse,
  MetricReturnData,
} from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

export type BeaconChainData = BeaconchainEpochData & { apr: MetricReturnData }

/**
 * Fetch beaconchain data from Beaconcha.in API.
 * Combines epoch and ethstore endpoints sequentially.
 */
export async function fetchBeaconChain(): Promise<BeaconChainData> {
  const base = "https://beaconcha.in"
  const apiKey = process.env.BEACONCHAIN_API_KEY

  if (!apiKey) {
    throw new Error("BEACONCHAIN_API_KEY environment variable is required")
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
  }

  console.log("Starting beaconchain data fetch")

  // Fetch epoch data
  const epochUrl = new URL("api/v1/epoch/latest", base).href
  const epochResponse = await fetchRetry(epochUrl, { headers })
  if (!epochResponse.ok) {
    const status = epochResponse.status
    console.warn("Beaconcha.in epoch fetch non-OK", { status, url: epochUrl })
    throw new Error(`Beaconcha.in epoch responded with status ${status}`)
  }
  const epochJson: EpochResponse = await epochResponse.json()
  const { validatorscount, eligibleether } = epochJson.data
  const totalEthStaked = Math.floor(eligibleether * 1e-9)

  // Fetch ethstore data
  const ethstoreUrl = new URL("api/v1/ethstore/latest", base).href
  const ethstoreResponse = await fetchRetry(ethstoreUrl, { headers })
  if (!ethstoreResponse.ok) {
    const status = ethstoreResponse.status
    console.warn("Beaconcha.in ethstore fetch non-OK", {
      status,
      url: ethstoreUrl,
    })
    throw new Error(`Beaconcha.in ethstore responded with status ${status}`)
  }
  const ethstoreJson: EthStoreResponse = await ethstoreResponse.json()
  const apr = ethstoreJson.data.apr

  const timestamp = Date.now()

  console.log("Successfully fetched beaconchain data", {
    totalEthStaked,
    validatorscount,
    apr,
  })

  return {
    totalEthStaked: { value: totalEthStaked, timestamp },
    validatorscount: { value: validatorscount, timestamp },
    apr: { value: apr, timestamp },
  }
}
