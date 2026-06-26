import type { EthPriceData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

export const FETCH_ETH_PRICE_TASK_ID = "fetch-eth-price"

/**
 * Fetch Ethereum price data from CoinGecko API.
 * Returns the latest USD price and 24hr percent change.
 */
export async function fetchEthPrice(): Promise<EthPriceData> {
  const apiKey = process.env.COINGECKO_API_KEY
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${apiKey}`

  console.log("Starting Ethereum price data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko fetch non-OK", { status, url })
    const error = `CoinGecko responded with status ${status}`
    throw new Error(error)
  }

  const data: { ethereum: { usd: number; usd_24h_change?: number } } =
    await response.json()
  const {
    ethereum: { usd, usd_24h_change },
  } = data

  if (!usd) {
    throw new Error("Unable to fetch ETH price from CoinGecko")
  }

  const timestamp = Date.now()
  const percentChange24h =
    typeof usd_24h_change === "number" ? usd_24h_change / 100 : undefined

  console.log("Successfully fetched Ethereum price data", {
    price: usd,
    percentChange24h,
    timestamp,
  })

  return { value: usd, timestamp, percentChange24h }
}
