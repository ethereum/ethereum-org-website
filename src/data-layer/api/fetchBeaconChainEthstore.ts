import type { EthStoreResponse, MetricReturnData } from "@/lib/types"

export const FETCH_BEACONCHAIN_ETHSTORE_TASK_ID = "fetch-beaconchain-ethstore"

/**
 * Fetch beaconchain ethstore data from Beaconcha.in API.
 * Returns the latest APR data.
 */
export async function fetchBeaconChainEthstore(): Promise<MetricReturnData> {
  const base = "https://beaconcha.in"
  const endpoint = "api/v1/ethstore/latest"
  const { href } = new URL(endpoint, base)

  console.log("Starting beaconchain ethstore data fetch")

  const response = await fetch(href)

  if (!response.ok) {
    const status = response.status
    console.warn("Beaconcha.in fetch non-OK", { status, url: href })
    const error = `Beaconcha.in responded with status ${status}`
    throw new Error(error)
  }

  const json: EthStoreResponse = await response.json()
  const apr = json.data.apr
  const timestamp = Date.now()

  console.log("Successfully fetched beaconchain ethstore data", {
    apr,
    timestamp,
  })

  return { value: apr, timestamp }
}
