import type { GrowThePieData } from "@/lib/types"

import { LAYER2_GROWTHEPIE_IDS } from "@/data/networks/growthepieIds"

export const FETCH_GROW_THE_PIE_TASK_ID = "fetch-grow-the-pie"

type DataItem = {
  metric_key: string
  origin_key: string
  date: string
  value: number
}

const TXCOSTS_MEDIAN_USD = "txcosts_median_usd"
const TXCOUNT = "txcount"
const ACTIVE_ADDRESSES = "aa_last7d"

/**
 * Fetch GrowThePie fundamentals data.
 * Returns transaction counts, costs, and active addresses for Layer 2 networks.
 */
export async function fetchGrowThePie(): Promise<GrowThePieData> {
  const url = "https://api.growthepie.com/v1/fundamentals_7d.json"

  console.log("Starting GrowThePie data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("GrowThePie fetch non-OK", { status, url })
    throw new Error(`GrowThePie API responded with status ${status}`)
  }

  const data: DataItem[] = await response.json()

  // Filter data to only include the metrics we need
  const filteredData = data.filter((item) =>
    [TXCOSTS_MEDIAN_USD, TXCOUNT, ACTIVE_ADDRESSES].includes(item.metric_key)
  )

  const mostRecentDate = filteredData.reduce((latest, item) => {
    const itemDate = new Date(item.date)
    return itemDate > new Date(latest) ? item.date : latest
  }, filteredData[0].date)

  const activeAddresses = filteredData
    .filter((item) => item.date === mostRecentDate)
    .filter((item) => item.metric_key === ACTIVE_ADDRESSES)
    .reduce((acc, item) => {
      return {
        ...acc,
        [item.origin_key]: item.value,
      }
    }, {})

  const mostRecentData = filteredData.filter(
    (item) =>
      item.date === mostRecentDate &&
      [TXCOSTS_MEDIAN_USD, TXCOUNT].includes(item.metric_key)
  )

  let totalTxCount = 0
  let weightedSum = 0

  mostRecentData
    .filter((item) => LAYER2_GROWTHEPIE_IDS.includes(item.origin_key))
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

  const result = {
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

  console.log("Successfully fetched GrowThePie data", {
    totalTxCount,
    weightedAverage,
    mostRecentDate,
    networksCount: Object.keys(result.dailyTxCosts).length,
  })

  return result
}
