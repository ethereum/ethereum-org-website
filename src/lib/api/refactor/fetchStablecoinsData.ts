import type {
  CoinGeckoCoinMarketItem,
  ExternalDataReturnData,
} from "@/lib/types"

import {
  COINGECKO_API_BASE_URL,
  COINGECKO_API_URL_PARAMS,
} from "@/lib/constants"

export const fetchStablecoinsData =
  async (): Promise<ExternalDataReturnData> => {
    const url = `${COINGECKO_API_BASE_URL}stablecoins${COINGECKO_API_URL_PARAMS}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        console.error("CoinGecko stablecoins fetch non-OK", {
          status: response.status,
          statusText: response.statusText,
          url,
        })
        return {
          error: `CoinGecko responded with status ${response.status}: ${response.statusText}`,
        }
      }

      const data: CoinGeckoCoinMarketItem[] = await response.json()

      return {
        value: data,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error("Error fetching Ethereum stablecoins data:", error)
      return {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch Ethereum stablecoins data",
      }
    }
  }
