import takeRightWhile from "lodash/takeRightWhile"

import { DefiLlamaTVLResponse, MetricReturnData } from "@/lib/types"

import { DAYS_TO_FETCH } from "@/lib/constants"

export const fetchTotalValueLocked = async (): Promise<MetricReturnData> => {
  const now = new Date()
  const startDate = new Date(now.setDate(now.getDate() - DAYS_TO_FETCH))
  const startTimestamp = Math.round(startDate.getTime() / 1000)

  try {
    const response = await fetch(`https://api.llama.fi/charts/Ethereum`)
    if (!response.ok) {
      console.log(response.status, response.statusText)
      throw new Error("Failed to fetch Defi Llama TVL data")
    }

    const json: DefiLlamaTVLResponse = await response.json()
    const data = takeRightWhile(json, ({ date }) => +date > startTimestamp)
      .map(({ date, totalLiquidityUSD }) => ({
        timestamp: +date * 1000,
        value: totalLiquidityUSD,
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
