import { fetchRetry } from "./fetchRetry"

export type BlobStats = {
  totalBlobs: number
  avgBlobFee: number
  updatedAt: string
}

type DaFundamentalsRow = {
  metric_key: string
  origin_key: string
  date: string
  value: number
}

/**
 * Fetch overall Ethereum blob stats from growthepie
 *
 * The endpoint returns daily data-availability metrics per DA layer.
 * We sum the "da_ethereum_blobs" rows for all-time totals and derive the
 * average blob fee (in wei) from total fees paid over total blob count.
 *
 * @see https://www.growthepie.com/data-availability/blob-count
 */
export async function fetchBlobStats(): Promise<BlobStats> {
  const url = "https://api.growthepie.com/v1/da_fundamentals.json"

  console.log("Starting blob stats data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("growthepie fetch non-OK", { status, url })
    throw new Error(`growthepie responded with status ${status}`)
  }

  const rows: DaFundamentalsRow[] = await response.json()

  let totalBlobs = 0
  let totalFeesEth = 0
  let updatedAt = ""

  for (const { metric_key, origin_key, date, value } of rows) {
    if (origin_key !== "da_ethereum_blobs") continue

    if (metric_key === "da_blob_count") {
      totalBlobs += value
      if (date > updatedAt) updatedAt = date
    } else if (metric_key === "da_fees_eth") {
      totalFeesEth += value
    }
  }

  if (!totalBlobs) {
    throw new Error("growthepie API missing Ethereum blob data")
  }

  // Convert ETH to wei to match the unit consumers expect
  const avgBlobFee = (totalFeesEth / totalBlobs) * 1e18

  const stats: BlobStats = { totalBlobs, avgBlobFee, updatedAt }

  console.log("Successfully fetched blob stats data", stats)

  return stats
}
