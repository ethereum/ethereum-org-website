import type { MetricReturnData } from "@/lib/types"

export const FETCH_ETHEREUM_STABLECOINS_MCAP_TASK_ID =
  "fetch-ethereum-stablecoins-mcap"

export type LlamaStablecoinchainsResponseItem = {
  gecko_id: string | null
  totalCirculatingUSD: Record<string, number>
  tokenSymbol: string | null
  name: string
}

/**
 * Fetch Ethereum stablecoins market cap data from Llama.fi API.
 * Returns the total circulating USD value of all stablecoins on Ethereum.
 */
export async function fetchEthereumStablecoinsMcap(): Promise<MetricReturnData> {
  const url = "https://stablecoins.llama.fi/stablecoinchains"

  console.log("Starting Ethereum stablecoins market cap data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("Llama.fi fetch non-OK", { status, url })
    const error = `Llama.fi responded with status ${status}`
    throw new Error(error)
  }

  const data: LlamaStablecoinchainsResponseItem[] = await response.json()

  const ethereumData = data.find(({ gecko_id }) => gecko_id === "ethereum")
  if (!ethereumData) {
    throw new Error("Ethereum stablecoin data not found")
  }

  const value = Object.values(ethereumData.totalCirculatingUSD).reduce(
    (acc, value) => acc + value,
    0
  )

  const timestamp = Date.now()

  console.log("Successfully fetched Ethereum stablecoins market cap data", {
    marketCap: value,
    timestamp,
  })

  return { value, timestamp }
}
