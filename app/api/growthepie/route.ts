import { NextResponse } from "next/server"

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
const ACTIVE_ADDRESSES = "aa_last7d"

export async function GET() {
  try {
    const url = "https://api.growthepie.xyz/v1/fundamentals.json"
    const response = await fetch(url, { next: { revalidate: 3600 * 24 } }) // Cache for 1 day
    if (!response.ok) {
      throw new Error("Failed to fetch growthepie data")
    }
    const data: DataItem[] = await response.json()

    // Get the date 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Filter data to only include the last 7 days and the metrics we need
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date)
      return (
        itemDate >= sevenDaysAgo &&
        [TXCOSTS_MEDIAN_USD, TXCOUNT, ACTIVE_ADDRESSES].includes(
          item.metric_key
        )
      )
    })

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
      .filter((item) =>
        layer2Data.some((l2) => l2.growthepieID === item.origin_key)
      )
      .forEach((item) => {
        if (item.metric_key !== TXCOSTS_MEDIAN_USD) return

        const txCountItem = mostRecentData.find(
          (txItem) =>
            txItem.metric_key === TXCOUNT &&
            txItem.origin_key === item.origin_key
        )
        if (!txCountItem) return

        totalTxCount += txCountItem.value
        weightedSum += item.value * txCountItem.value
      })

    // The weighted average of txcosts_median_usd, by txcount on each network (origin_key)
    const weightedAverage = totalTxCount ? weightedSum / totalTxCount : 0

    // Last updated timestamp
    const timestamp = Date.now()

    const result: GrowThePieData = {
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

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching GrowThePie data:", error)
    return NextResponse.json(
      { error: "Failed to fetch GrowThePie data" },
      { status: 500 }
    )
  }
}
