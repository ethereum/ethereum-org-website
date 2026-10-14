import type { MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

/**
 * Average daily DEX volume on Ethereum over the trailing 12 months.
 *
 * @see https://api.llama.fi/overview/dexs/ethereum
 */
export async function fetchDexVolume(): Promise<MetricReturnData> {
  const url =
    "https://api.llama.fi/overview/dexs/ethereum?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true"

  const response = await fetchRetry(url)

  if (!response.ok) {
    console.warn("DefiLlama DEX fetch non-OK", { status: response.status })
    throw new Error(`DefiLlama DEX API responded with ${response.status}`)
  }

  const { total1y }: { total1y: number } = await response.json()

  if (!total1y) throw new Error("DefiLlama returned no 12-month DEX volume")

  return { value: total1y / 365, timestamp: Date.now() }
}
