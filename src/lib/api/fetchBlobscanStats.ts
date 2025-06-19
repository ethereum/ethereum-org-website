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

type BlobscanOverallStatsErr = {
  message: string
  code: string
  issues: [message: string]
}

/**
 * Fetch the overall stats from Blobscan
 *
 * @see https://api.blobscan.com/#/stats/stats-getOverallStats
 *
 */
export const fetchBlobscanStats = async () => {
  const data = await fetch("https://api.blobscan.com/stats/overall").then(
    (res) => responseHandler(res)
  )

  return data
}

type BlobscanResponse =
  | (Omit<Response, "json"> & {
      json: () => BlobscanOverallStats | PromiseLike<BlobscanOverallStats>
    })
  | (Omit<Response, "json"> & {
      json: () => BlobscanOverallStatsErr | PromiseLike<BlobscanOverallStatsErr>
    })

const responseHandler = async (response: Response) => {
  const res = await (response as BlobscanResponse).json()

  if ("message" in res) {
    throw Error(`Code ${res.code}: Failed to fetch Blobscan Overall Stats`, {
      cause: res.message,
    })
  }
  return res
}
