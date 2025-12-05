import {
  COINGECKO_API_BASE_URL,
  COINGECKO_API_URL_PARAMS,
} from "@/lib/constants"

export const FETCH_STABLECOINS_DATA_TASK_ID = "fetch-stablecoins-data"

/**
 * Fetch Ethereum stablecoins data from CoinGecko API.
 * Returns market data for stablecoins on Ethereum.
 */
export async function fetchStablecoinsData(): Promise<unknown> {
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
