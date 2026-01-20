import type {
  BeaconchainEpochData,
  EpochResponse,
  EthStoreResponse,
  MetricReturnData,
} from "@/lib/types"

export type BeaconChainData = BeaconchainEpochData & { apr: MetricReturnData }

/**
 * Fetch beaconchain data from Beaconcha.in API.
 * Combines epoch and ethstore endpoints (sequential to respect 1 req/sec limit).
 */
export async function fetchBeaconChain(): Promise<BeaconChainData> {
  const base = "https://beaconcha.in"

  console.log("Starting beaconchain data fetch")

  // Fetch epoch data
  const epochUrl = new URL("api/v1/epoch/latest", base).href
  const epochResponse = await fetch(epochUrl)
  if (!epochResponse.ok) {
    const status = epochResponse.status
    console.warn("Beaconcha.in epoch fetch non-OK", { status, url: epochUrl })
    const error = `Beaconcha.in epoch responded with status ${status}`
    throw new Error(error)
  }
  const epochJson: EpochResponse = await epochResponse.json()
  const { validatorscount, eligibleether } = epochJson.data
  const totalEthStaked = Math.floor(eligibleether * 1e-9)

  // Wait 1s to respect rate limit
  await new Promise((r) => setTimeout(r, 1000))

  // Fetch ethstore data
  const ethstoreUrl = new URL("api/v1/ethstore/latest", base).href
  const ethstoreResponse = await fetch(ethstoreUrl)
  if (!ethstoreResponse.ok) {
    const status = ethstoreResponse.status
    console.warn("Beaconcha.in ethstore fetch non-OK", {
      status,
      url: ethstoreUrl,
    })
    const error = `Beaconcha.in ethstore responded with status ${status}`
    throw new Error(error)
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
