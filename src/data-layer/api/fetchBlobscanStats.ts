import type { BlobscanOverallStats } from "@/lib/types"

export const FETCH_BLOBSCAN_STATS_TASK_ID = "fetch-blobscan-stats"

/**
 * Fetch the overall stats from Blobscan
 *
 * @see https://api.blobscan.com/#/stats/stats-getOverallStats
 */
export async function fetchBlobscanStats(): Promise<BlobscanOverallStats> {
  const url = "https://api.blobscan.com/stats/overall"

  console.log("Starting blobscan stats data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("Blobscan fetch non-OK", { status, url })
    const error = `Blobscan responded with status ${status}`
    throw new Error(error)
  }

  const json: [BlobscanOverallStats] = await response.json()
  const stats = json[0]

  console.log("Successfully fetched blobscan stats data", {
    totalBlobs: stats.totalBlobs,
    totalTransactions: stats.totalTransactions,
    updatedAt: stats.updatedAt,
  })

  return stats
}
