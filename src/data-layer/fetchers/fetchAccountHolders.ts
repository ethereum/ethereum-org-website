import { createSign } from "node:crypto"

import type { MetricReturnData } from "@/lib/types"

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

// Hard cost ceiling: a full scan is ~250GB and the free tier is 1TB/month
const MAX_BYTES_BILLED = String(400 * 1024 ** 3)

interface ServiceAccount {
  client_email: string
  private_key: string
  project_id: string
}

interface QueryResponse {
  jobComplete: boolean
  jobReference: { jobId: string; location: string }
  rows?: Array<{ f: Array<{ v: string }> }>
}

const base64url = (input: string | Buffer) =>
  Buffer.from(input).toString("base64url")

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/bigquery",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claims}`)
    .sign(sa.private_key, "base64url")

  const response = await fetchRetry("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  })
  if (!response.ok) {
    throw new Error(
      `Google token exchange failed: ${response.status} ${await response.text()}`
    )
  }
  return (await response.json()).access_token
}

/**
 * Cumulative unique Ethereum mainnet addresses (ever sent or received a tx),
 * computed on the BigQuery public dataset.
 */
export async function fetchAccountHolders(): Promise<MetricReturnData> {
  const credentials = process.env.GOOGLE_BIGQUERY_CREDENTIALS
  if (!credentials) {
    throw new Error(
      "BigQuery credentials not set (GOOGLE_BIGQUERY_CREDENTIALS)"
    )
  }
  const sa: ServiceAccount = JSON.parse(credentials)
  const token = await getAccessToken(sa)
  const api = `https://bigquery.googleapis.com/bigquery/v2/projects/${sa.project_id}`
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
