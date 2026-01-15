import type { MetricReturnData } from "@/lib/types"

export const FETCH_ETH_PRICE_TASK_ID = "fetch-eth-price"

/**
 * Fetch Ethereum price data from CoinGecko API.
 * Returns the latest USD price data.
 */
export async function fetchEthPrice(): Promise<MetricReturnData> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

  console.log("Starting Ethereum price data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko fetch non-OK", { status, url })
    const error = `CoinGecko responded with status ${status}`
    throw new Error(error)
  }

  const data: { ethereum: { usd: number } } = await response.json()
  const {
    ethereum: { usd },
  } = data

  if (!usd) {
    throw new Error("Unable to fetch ETH price from CoinGecko")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched Ethereum price data", {
    price: usd,
    timestamp,
  })

  return { value: usd, timestamp }
}
