import type { EthPriceData, MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

type SuccessfulEthPriceData = Extract<EthPriceData, { value: number }>
type SuccessfulMetricReturnData = Extract<
  MetricReturnData,
  { value: number }
>

interface CoinGeckoEthereumResponse {
  ethereum?: {
    usd?: number
    usd_24h_change?: number | null
    usd_market_cap?: number
  }
}

export interface EthereumMetricsData {
  ethPrice: SuccessfulEthPriceData
  ethereumMarketcap: SuccessfulMetricReturnData
}

export function parseEthereumMetrics(
  data: CoinGeckoEthereumResponse,
  timestamp = Date.now()
): EthereumMetricsData {
  const { usd, usd_24h_change, usd_market_cap } = data.ethereum ?? {}

  if (typeof usd !== "number" || !Number.isFinite(usd)) {
    throw new Error("Unable to fetch ETH price from CoinGecko")
  }

  if (
    typeof usd_market_cap !== "number" ||
    !Number.isFinite(usd_market_cap)
  ) {
    throw new Error("Unable to fetch ETH market cap from CoinGecko")
  }

  const percentChange24h =
    typeof usd_24h_change === "number" && Number.isFinite(usd_24h_change)
      ? usd_24h_change / 100
      : undefined

  return {
    ethPrice: { value: usd, timestamp, percentChange24h },
    ethereumMarketcap: { value: usd_market_cap, timestamp },
  }
}

/**
 * Fetch Ethereum price, 24-hour change, and market cap in one CoinGecko call.
 */
export async function fetchEthereumMetrics(): Promise<EthereumMetricsData> {
  const apiKey = process.env.COINGECKO_API_KEY
  const params = new URLSearchParams({
    ids: "ethereum",
    vs_currencies: "usd",
    include_24hr_change: "true",
    include_market_cap: "true",
  })
  const url = `https://api.coingecko.com/api/v3/simple/price?${params}`

  console.log("Starting Ethereum metrics fetch")

  const response = await fetchRetry(url, {
    headers: apiKey ? { "x-cg-demo-api-key": apiKey } : undefined,
  })

  if (!response.ok) {
    const { status } = response
    console.warn("CoinGecko fetch non-OK", { status })
    throw new Error(`CoinGecko responded with status ${status}`)
  }

  const metrics = parseEthereumMetrics(
    (await response.json()) as CoinGeckoEthereumResponse
  )

  console.log("Successfully fetched Ethereum metrics", {
    price: metrics.ethPrice.value,
    percentChange24h: metrics.ethPrice.percentChange24h,
    marketCap: metrics.ethereumMarketcap.value,
    timestamp: metrics.ethPrice.timestamp,
  })

  return metrics
}
