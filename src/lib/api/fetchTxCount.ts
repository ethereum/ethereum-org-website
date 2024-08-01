import type { EtherscanTxCountResponse, MetricReturnData } from "@/lib/types"

import { DAYS_TO_FETCH, ETHERSCAN_API_URL } from "@/lib/constants"

export const fetchTxCount = async (): Promise<MetricReturnData> => {
  const apiKey = process.env.ETHERSCAN_API_KEY
  const now = new Date()
  const endDate = now.toISOString().split("T")[0] // YYYY-MM-DD
  const startDate = new Date(now.setDate(now.getDate() - DAYS_TO_FETCH))
    .toISOString()
    .split("T")[0] // {DAYS_TO_FETCH} days ago

  const queryParams = new URLSearchParams({
    module: "stats",
    action: "dailytx",
    startdate: startDate,
    enddate: endDate,
    sort: "desc",
    apikey: apiKey,
  }).toString()

  const { href } = new URL(`api?${queryParams}`, ETHERSCAN_API_URL)

  try {
    const response = await fetch(href)
    if (!response.ok) {
      console.log(response.status, response.statusText)
      throw new Error("Failed to fetch Etherscan tx count data")
    }

    const json: EtherscanTxCountResponse = await response.json()
    // Today's value at start (only value) of array
    const value = json.result[0].transactionCount

    // current value (number, unformatted)
    return { value }
  } catch (error: unknown) {
    console.error((error as Error).message)
    return {
      error: (error as Error).message,
    }
  }
}
