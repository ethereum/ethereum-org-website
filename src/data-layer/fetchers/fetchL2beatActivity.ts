import type { MetricReturnData } from "@/lib/types"

import { fetchRetry } from "./fetchRetry"

const DAYS = 30

type L2beatActivityResponse = {
  data: { chart: { types: string[]; data: number[][] } }
}

/**
 * Average daily user operations across L2s over the last 30 days.
 * L2BEAT's chart rows are daily counts, not per-second rates.
 *
 * @see https://l2beat.com/api/scaling/activity
 */
export async function fetchL2beatActivity(): Promise<MetricReturnData> {
  const url = "https://l2beat.com/api/scaling/activity"

  const response = await fetchRetry(url)

  if (!response.ok) {
    console.warn("L2BEAT activity fetch non-OK", { status: response.status })
    throw new Error(`L2BEAT activity API responded with ${response.status}`)
  }

  const json: L2beatActivityResponse = await response.json()
  const { types, data } = json.data.chart
  const uopsIdx = types.indexOf("uopsCount")
  const rows = data.slice(-DAYS)

  if (uopsIdx < 0 || rows.length === 0) {
    throw new Error("L2BEAT activity response has no uopsCount data")
  }

  const value = rows.reduce((sum, row) => sum + row[uopsIdx], 0) / rows.length

  return { value, timestamp: Date.now() }
}
