import type { BeaconchainEpochData, EpochResponse } from "@/lib/types"

export const FETCH_BEACONCHAIN_EPOCH_TASK_ID = "fetch-beaconchain-epoch"

/**
 * Fetch beaconchain epoch data from Beaconcha.in API.
 * Returns the latest epoch data including total ETH staked and validator count.
 */
export async function fetchBeaconChainEpoch(): Promise<BeaconchainEpochData> {
  const base = "https://beaconcha.in"
  const endpoint = "api/v1/epoch/latest"
  const { href } = new URL(endpoint, base)

  console.log("Starting beaconchain epoch data fetch")

  const response = await fetch(href)

  if (!response.ok) {
    const status = response.status
    console.warn("Beaconcha.in fetch non-OK", { status, url: href })
    const error = `Beaconcha.in responded with status ${status}`
    throw new Error(error)
  }

  const json: EpochResponse = await response.json()
  const { validatorscount, eligibleether } = json.data
  const totalEthStaked = Math.floor(eligibleether * 1e-9) // `eligibleether` value returned in `gwei`
  const timestamp = Date.now()

  console.log("Successfully fetched beaconchain epoch data", {
    totalEthStaked,
    validatorscount,
    timestamp,
  })

  return {
    totalEthStaked: { value: totalEthStaked, timestamp },
    validatorscount: { value: validatorscount, timestamp },
  }
}
