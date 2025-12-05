import type { DefiLlamaTVLResponse, MetricReturnData } from "@/lib/types"

export const FETCH_TOTAL_VALUE_LOCKED_TASK_ID = "fetch-total-value-locked"

/**
 * Fetch total value locked (TVL) data from DefiLlama API.
 * Returns the latest total liquidity USD value for Ethereum.
 */
export async function fetchTotalValueLocked(): Promise<MetricReturnData> {
  const url = "https://api.llama.fi/charts/Ethereum"

  console.log("Starting total value locked data fetch from DefiLlama")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("DefiLlama fetch non-OK", { status, url })
    throw new Error(`DefiLlama API responded with status ${status}`)
  }

  const json: DefiLlamaTVLResponse = await response.json()

  if (!json || json.length === 0) {
    throw new Error("No data returned from DefiLlama API")
  }

  // Today's value at end of array
  const value = json[json.length - 1].totalLiquidityUSD
  const timestamp = Date.now()

  console.log("Successfully fetched total value locked data", {
    value,
    timestamp,
  })

  return { value, timestamp }
}
