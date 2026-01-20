import type { EthStakedResponse, MetricReturnData } from "@/lib/types"

import { DUNE_API_URL } from "@/lib/constants"

export const FETCH_TOTAL_ETH_STAKED_TASK_ID = "fetch-total-eth-staked"

/**
 * Fetch total ETH staked data from Dune Analytics API.
 * Returns the cumulative deposited ETH value.
 */
export async function fetchTotalEthStaked(): Promise<MetricReturnData> {
  const duneApiKey = process.env.DUNE_API_KEY

  if (!duneApiKey) {
    throw new Error("Dune API key not found (DUNE_API_KEY)")
  }

  const url = new URL("api/v1/query/3915587/results", DUNE_API_URL)

  console.log("Starting total ETH staked data fetch from Dune Analytics")

  const response = await fetch(url, {
    headers: { "X-Dune-API-Key": duneApiKey },
  })

  if (!response.ok) {
    const status = response.status
    console.warn("Dune Analytics fetch non-OK", { status, url: url.toString() })
    throw new Error(`Dune Analytics API responded with status ${status}`)
  }

  const json: EthStakedResponse = await response.json()
  const {
    result: { rows = [] },
  } = json

  if (rows.length === 0) {
    throw new Error("No data returned from Dune Analytics query")
  }

  // Today's value at start of array
  const value = rows[0].cum_deposited_eth
  const timestamp = Date.now()

  console.log("Successfully fetched total ETH staked data", {
    value,
    timestamp,
  })

  return { value, timestamp }
}
