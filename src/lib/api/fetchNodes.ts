import type {
  EtherscanNodeResponse,
  MetricReturnData,
  TimestampedData,
} from "@/lib/types"

import { DAYS_TO_FETCH, ETHERSCAN_API_URL } from "@/lib/constants"

export const fetchNodes = async (): Promise<MetricReturnData> => {
  const apiKey = process.env.ETHERSCAN_API_KEY
  const now = new Date()
  const endDate = now.toISOString().split("T")[0] // YYYY-MM-DD
  const startDate = new Date(now.setDate(now.getDate() - DAYS_TO_FETCH))
    .toISOString()
    .split("T")[0] // {daysToFetch} days ago

  const queryParams = new URLSearchParams({
    module: "stats",
    action: "nodecounthistory",
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
      throw new Error("Failed to fetch Etherscan node data")
    }

    const json: EtherscanNodeResponse = await response.json()
    const data: TimestampedData<number>[] = json.result
      .map(({ UTCDate, TotalNodeCount }) => ({
        timestamp: new Date(UTCDate).getTime(),
        value: +TotalNodeCount,
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
    const { value } = data[data.length - 1]

    return {
      data, // historical data: { timestamp: unix-milliseconds, value }
      value, // current value (number, unformatted)
    }
  } catch (error: unknown) {
    console.error((error as Error).message)
    return { error: (error as Error).message }
  }
}
