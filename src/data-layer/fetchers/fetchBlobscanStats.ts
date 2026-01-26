export const FETCH_BLOBSCAN_STATS_TASK_ID = "fetch-blobscan-stats"

export type BlobscanStats = {
  totalBlobs: number
  avgBlobFee: number
  updatedAt: string
}

type BlobscanApiResponse = {
  data: Array<{
    dimension: { type: string; name: string }
    metrics: { totalBlobs: number; avgBlobFee: number }
    updatedAt: string
  }>
}

/**
 * Fetch overall blob stats from Blobscan
 *
 * The API returns stats by category. We sum "other" + "rollup" for network totals.
 *
 * @see https://api.blobscan.com/#/stats/stats-getOverallStats
 */
export async function fetchBlobscanStats(): Promise<BlobscanStats> {
  const url = "https://api.blobscan.com/stats/overall"

  console.log("Starting blobscan stats data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("Blobscan fetch non-OK", { status, url })
    throw new Error(`Blobscan responded with status ${status}`)
  }

  const json: BlobscanApiResponse = await response.json()

  const other = json.data.find(
    (d) => d.dimension.type === "category" && d.dimension.name === "other"
  )
  const rollup = json.data.find(
    (d) => d.dimension.type === "category" && d.dimension.name === "rollup"
  )

  if (!other || !rollup) {
    throw new Error("Blobscan API missing category data")
  }

  const totalBlobs = other.metrics.totalBlobs + rollup.metrics.totalBlobs

  const avgBlobFee =
    (other.metrics.avgBlobFee * other.metrics.totalBlobs +
      rollup.metrics.avgBlobFee * rollup.metrics.totalBlobs) /
    totalBlobs

  const stats: BlobscanStats = {
    totalBlobs,
    avgBlobFee,
    updatedAt: other.updatedAt,
  }

  console.log("Successfully fetched blobscan stats data", stats)

  return stats
}
