import type { DuneResultResponse } from "@/lib/types"

import { DUNE_API_URL } from "@/lib/constants"

import { fetchRetry } from "./fetchRetry"

type DuneRow = Record<string, number | string | null>

/**
 * Read the latest cached results of a Dune query.
 *
 * Uses the results endpoint, which is free (0 credits) and returns whatever the
 * query's last execution produced — so the data is only as fresh as that
 * execution. Keep the source query on a refresh schedule (or a dashboard Dune
 * auto-refreshes). Throws on missing key, non-OK responses, and empty results.
 */
async function fetchDuneQueryRows(queryId: number): Promise<DuneRow[]> {
  const duneApiKey = process.env.DUNE_API_KEY

  if (!duneApiKey) {
    throw new Error("Dune API key not found (DUNE_API_KEY)")
  }

  const url = new URL(`api/v1/query/${queryId}/results`, DUNE_API_URL)

  const response = await fetchRetry(url, {
    headers: { "X-Dune-API-Key": duneApiKey },
  })

  if (!response.ok) {
    const status = response.status
    console.warn("Dune Analytics fetch non-OK", { status, queryId })
    throw new Error(`Dune Analytics query ${queryId} responded with ${status}`)
  }

  const json: DuneResultResponse = await response.json()
  const rows = json.result.rows ?? []

  if (rows.length === 0) {
    throw new Error(`No data returned from Dune Analytics query ${queryId}`)
  }

  return rows
}

/**
 * Read a single-value Dune "counter" query — returns the first numeric value of
 * the first row, tolerating whatever column name the source query uses.
 */
export async function fetchDuneCounter(queryId: number): Promise<number> {
  const [row] = await fetchDuneQueryRows(queryId)
  const value = Object.values(row).find(
    (v): v is number => typeof v === "number"
  )

  if (value === undefined) {
    throw new Error(`No numeric value in Dune Analytics query ${queryId}`)
  }

  return value
}
