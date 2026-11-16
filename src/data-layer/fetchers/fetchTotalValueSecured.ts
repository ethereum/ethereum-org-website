import type { MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

/**
 * Total value secured by Ethereum (ETH, ERC-20s and NFTs on L1).
 *
 * @see https://ultrasound.money/api/fees/total-value-secured
 */
export async function fetchTotalValueSecured(): Promise<MetricReturnData> {
  const url = "https://ultrasound.money/api/fees/total-value-secured"

  const response = await fetchRetry(url)

  if (!response.ok) {
    console.warn("ultrasound.money fetch non-OK", { status: response.status })
    throw new Error(`ultrasound.money responded with ${response.status}`)
  }

  const { sum }: { sum: number } = await response.json()

  if (!sum) throw new Error("ultrasound.money returned no total value secured")

  return { value: sum, timestamp: Date.now() }
}
