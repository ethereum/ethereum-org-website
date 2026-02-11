const COINGECKO_API_BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category="
const COINGECKO_API_URL_PARAMS = `&order=market_cap_desc&per_page=250&page=1&sparkline=false&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`

export interface CoinGeckoCoinMarket {
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}

export type CoinGeckoCoinMarketResponse = CoinGeckoCoinMarket[]

export const FETCH_STABLECOINS_DATA_TASK_ID = "fetch-stablecoins-data"

/**
 * Fetch Ethereum stablecoins data from CoinGecko API.
 * Returns market data for stablecoins on Ethereum.
 */
export async function fetchStablecoinsData(): Promise<CoinGeckoCoinMarketResponse> {
  const url = `${COINGECKO_API_BASE_URL}stablecoins${COINGECKO_API_URL_PARAMS}`

  console.log("Starting Ethereum stablecoins data fetch from CoinGecko")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("CoinGecko stablecoins fetch non-OK", { status, url })
    throw new Error(`CoinGecko API responded with status ${status}`)
  }

  const data = await response.json()

  console.log("Successfully fetched Ethereum stablecoins data", {
    itemsCount: Array.isArray(data) ? data.length : "unknown",
  })

  return data
}
