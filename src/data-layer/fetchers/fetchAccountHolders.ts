import type { MetricReturnData } from "@/lib/types"

import { getGoogleAccessToken } from "../google"

import { fetchRetry, sleep } from "./fetchRetry"

export const FETCH_ACCOUNT_HOLDERS_TASK_ID = "fetch-account-holders"

// Same SQL as Dune query 6676254, against Google's free public dataset
const QUERY = `
SELECT APPROX_COUNT_DISTINCT(address) AS unique_addresses
FROM (
  SELECT from_address AS address FROM \`bigquery-public-data.crypto_ethereum.transactions\`
  UNION ALL
  SELECT to_address FROM \`bigquery-public-data.crypto_ethereum.transactions\` WHERE to_address IS NOT NULL
)`

// Hard cost ceiling: a full scan is ~315GiB and the free tier is 1TiB/month
const MAX_BYTES_BILLED = String(400 * 1024 ** 3)

interface QueryResponse {
  jobComplete: boolean
  jobReference: { jobId: string; location: string }
  rows?: Array<{ f: Array<{ v: string }> }>
}

/**
 * Cumulative unique Ethereum mainnet addresses (ever sent or received a tx),
 * computed on the BigQuery public dataset.
 */
export async function fetchAccountHolders(): Promise<MetricReturnData> {
  const { token, projectId } = await getGoogleAccessToken(
    "https://www.googleapis.com/auth/bigquery"
  )
  const api = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}`
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  console.log("Starting account holders query on BigQuery")

  let response = await fetchRetry(`${api}/queries`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: QUERY,
      useLegacySql: false,
      maximumBytesBilled: MAX_BYTES_BILLED,
      timeoutMs: 60_000,
    }),
  })

  for (;;) {
    if (!response.ok) {
      throw new Error(
        `BigQuery responded with ${response.status}: ${await response.text()}`
      )
    }
    const json: QueryResponse = await response.json()
    if (json.jobComplete) {
      const value = Number(json.rows?.[0]?.f[0]?.v)
      if (!value) throw new Error("No data returned from BigQuery")
      console.log("Successfully fetched account holders data", { value })
      return { value, timestamp: Date.now() }
    }
    await sleep(5_000)
    const { jobId, location } = json.jobReference
    response = await fetchRetry(
      `${api}/queries/${jobId}?location=${location}&timeoutMs=60000`,
      { headers }
    )
  }
}
