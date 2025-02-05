import type { GrowThePieData } from "@/lib/types"

import { layer2Data } from "@/data/networks/networks"

type DataItem = {
  metric_key: string
  origin_key: string
  date: string
  value: number
}

const TXCOSTS_MEDIAN_USD = "txcosts_median_usd"
const TXCOUNT = "txcount"

export const fetchGrowThePie = async (): Promise<GrowThePieData> => {
  const url = "https://api.growthepie.xyz/v1/fundamentals.json"

  const response = await fetch(url)
  if (!response.ok) {
    console.log(response.status, response.statusText)
    throw new Error("Failed to fetch growthepie data")
  }
  const data: DataItem[] = await response.json()

  const mostRecentDate = data.reduce((latest, item) => {
    const itemDate = new Date(item.date)
    return itemDate > new Date(latest) ? item.date : latest
  }, data[0].date)

  const activeAddresses = data
    .filter((item) => item.date === mostRecentDate)
    .filter((item) => item.metric_key === "aa_last7d")
    .reduce((acc, item) => {
      return {
        ...acc,
        [item.origin_key]: item.value,
      }
    }, {})

  const mostRecentData = data.filter(
    (item) =>
      item.date === mostRecentDate &&
      [TXCOSTS_MEDIAN_USD, TXCOUNT].includes(item.metric_key)
  )

  let totalTxCount = 0
  let weightedSum = 0

  mostRecentData
    .filter((item) =>
      layer2Data.some((l2) => l2.growthepieID === item.origin_key)
    )
    .forEach((item) => {
      if (item.metric_key !== TXCOSTS_MEDIAN_USD) return

      const txCountItem = mostRecentData.find(
        (txItem) =>
          txItem.metric_key === TXCOUNT && txItem.origin_key === item.origin_key
      )
      if (!txCountItem) return

      totalTxCount += txCountItem.value
      weightedSum += item.value * txCountItem.value
    })

  // The weighted average of txcosts_median_usd, by txcount on each network (origin_key)
  const weightedAverage = totalTxCount ? weightedSum / totalTxCount : 0

  // Last updated timestamp
  const timestamp = Date.now()

  return {
    txCount: { value: totalTxCount, timestamp },
    txCostsMedianUsd: { value: weightedAverage, timestamp },
    dailyTxCosts: mostRecentData
      .filter((item) => item.metric_key === TXCOSTS_MEDIAN_USD)
      .reduce((acc, item) => {
        acc[item.origin_key] = item.value
        return acc
      }, {}),
    activeAddresses: activeAddresses,
  }
}
