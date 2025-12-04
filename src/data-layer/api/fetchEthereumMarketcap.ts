import type { MetricReturnData } from "@/lib/types"

export const FETCH_ETHEREUM_MARKETCAP_TASK_ID = "fetch-ethereum-marketcap"

/**
 * Fetch Ethereum market cap data from CoinGecko API.
 * Returns the latest USD market cap data.
 */
export async function fetchEthereumMarketcap(): Promise<MetricReturnData> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true"

  console.log("Starting Ethereum market cap data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko fetch non-OK", { status, url })
    const error = `CoinGecko responded with status ${status}`
    throw new Error(error)
  }

  const data: { ethereum: { usd_market_cap: number } } = await response.json()
  const {
    ethereum: { usd_market_cap },
  } = data

  if (!usd_market_cap) {
    throw new Error("Unable to fetch ETH market cap from CoinGecko")
  }

  const timestamp = Date.now()

  console.log("Successfully fetched Ethereum market cap data", {
    marketCap: usd_market_cap,
    timestamp,
  })

  return { value: usd_market_cap, timestamp }
}
