import type { MetricReturnData } from "@/lib/types"

import { DUNE_API_URL } from "@/lib/constants"

export const FETCH_ACCOUNT_HOLDERS_TASK_ID = "fetch-account-holders"

// Dune query: https://dune.com/queries/6676254
// "Ethereum Cumulative Unique Addresses" - Total count of unique addresses
// that have ever sent or received a transaction on Ethereum mainnet.
const DUNE_QUERY_ID = "6676254"

type AccountHoldersResponse = {
  result: {
    rows: Array<{ unique_addresses: number }>
  }
}

/**
 * Fetch cumulative unique Ethereum addresses from Dune Analytics API.
 * Returns the total count of addresses that have ever transacted on mainnet.
 */
export async function fetchAccountHolders(): Promise<MetricReturnData> {
  const duneApiKey = process.env.DUNE_API_KEY

  if (!duneApiKey) {
    throw new Error("Dune API key not found (DUNE_API_KEY)")
  }

  const url = new URL(`api/v1/query/${DUNE_QUERY_ID}/results`, DUNE_API_URL)

  console.log("Starting account holders data fetch from Dune Analytics")

  const response = await fetch(url, {
    headers: { "X-Dune-API-Key": duneApiKey },
  })

  if (!response.ok) {
    const status = response.status
    console.warn("Dune Analytics fetch non-OK", { status, url: url.toString() })
    throw new Error(`Dune Analytics API responded with status ${status}`)
  }

  const json: AccountHoldersResponse = await response.json()
  const {
    result: { rows = [] },
  } = json

  if (rows.length === 0) {
    throw new Error("No data returned from Dune Analytics query")
  }

  const value = rows[0].unique_addresses
  const timestamp = Date.now()

  console.log("Successfully fetched account holders data", {
    value,
    timestamp,
  })

  return { value, timestamp }
}
