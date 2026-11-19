import { createSign } from "node:crypto"

import { fetchRetry } from "./fetchers/fetchRetry"

interface ServiceAccount {
  client_email: string
  private_key: string
  project_id: string
}

/** OAuth token for the data-layer Google service account (BigQuery, Sheets). */
export async function getGoogleAccessToken(
  scope: string
): Promise<{ token: string; projectId: string }> {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
  if (!credentials) {
    throw new Error(
      "Google service account not set (GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)"
    )
  }
  let sa: ServiceAccount
  try {
    sa = JSON.parse(credentials)
  } catch {
    // JSON.parse errors quote the input, which would leak the key into alerts
    throw new Error("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is not valid JSON")
  }

  const now = Math.floor(Date.now() / 1000)
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString("base64url")
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: sa.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(sa.private_key, "base64url")

  const response = await fetchRetry("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  })
  if (!response.ok) {
    throw new Error(
      `Google token exchange failed: ${response.status} ${await response.text()}`
    )
  }
  const { access_token } = await response.json()
  return { token: access_token, projectId: sa.project_id }
}

/** Auth header for read-only Google Sheets API calls. */
export async function getSheetsHeaders(): Promise<Record<string, string>> {
  const { token } = await getGoogleAccessToken(
    "https://www.googleapis.com/auth/spreadsheets.readonly"
  )
  return { Authorization: `Bearer ${token}` }
}
