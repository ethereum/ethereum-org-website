import type { ValueOrError } from "../types"

type BlobscanOverallStats = {
  avgBlobAsCalldataFee: number
  avgBlobFee: number
  avgBlobGasPrice: number
  avgMaxBlobGasFee: number
  totalBlobGasUsed: string
  totalBlobAsCalldataGasUsed: string
  totalBlobFee: string
  totalBlobAsCalldataFee: string
  totalBlobs: number
  totalBlobSize: string
  totalBlocks: number
  totalTransactions: number
  totalUniqueBlobs: number
  totalUniqueReceivers: number
  totalUniqueSenders: number
  updatedAt: string
}

/**
 * Fetch the overall stats from Blobscan
 *
 * @see https://api.blobscan.com/#/stats/stats-getOverallStats
 *
 */
export const fetchBlobscanStats = async (): Promise<
  ValueOrError<BlobscanOverallStats>
> => {
  const response = await fetch("https://api.blobscan.com/stats/overall")

  if (!response.ok) return { error: "Response for fetchBlobscanStats not okay" }

  const [json]: [BlobscanOverallStats] = await response.json()

  return { value: json, timestamp: Date.now() }
}
