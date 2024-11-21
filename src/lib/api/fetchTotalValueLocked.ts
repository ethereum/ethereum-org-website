import { DefiLlamaTVLResponse, MetricReturnData } from "@/lib/types"

export const fetchTotalValueLocked = async (): Promise<MetricReturnData> => {
  const response = await fetch(`https://api.llama.fi/charts/Ethereum`)
  if (!response.ok) {
    console.log(response.status, response.statusText)
    throw new Error("Failed to fetch Defi Llama TVL data")
  }

  const json: DefiLlamaTVLResponse = await response.json()
  // Today's value at end of array
  const value = json[json.length - 1].totalLiquidityUSD

  // current value (number, unformatted)
  return { value, timestamp: Date.now() }
}
