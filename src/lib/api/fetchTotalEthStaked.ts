import type { EthStakedResponse, MetricReturnData } from "@/lib/types"

import { DUNE_API_URL } from "../constants"

const DUNE_API_KEY = process.env.DUNE_API_KEY

export const fetchTotalEthStaked = async (): Promise<MetricReturnData> => {
  if (!DUNE_API_KEY) {
    console.error("Dune API key not found")
    return { error: "Dune API key not found" }
  }

  const url = new URL("api/v1/query/3915587/results", DUNE_API_URL)

  const response = await fetch(url, {
    headers: { "X-Dune-API-Key": DUNE_API_KEY },
  })
  if (!response.ok) {
    console.log(response.status, response.statusText)
    throw new Error("Failed to fetch eth staked data")
  }

  const json: EthStakedResponse = await response.json()
  const {
    result: { rows = [] },
  } = json
  // Today's value at start of array
  const value = rows[0].cum_deposited_eth

  // current value (number, unformatted)
  return { value, timestamp: Date.now() }
}
