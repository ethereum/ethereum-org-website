import type { CommunityPick } from "@/lib/types"

export const FETCH_COMMUNITY_PICKS_TASK_ID = "fetch-community-picks"

/**
 * Fetch community picks data from Google Sheets.
 * Returns the fetched community picks data.
 */
export async function fetchCommunityPicks(): Promise<CommunityPick[]> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_DAPPS

  if (!sheetId) {
    throw new Error("Google Sheets ID not set")
  }

  if (!googleApiKey) {
    throw new Error("Google API key not set")
  }

  console.log("Starting community picks data fetch from Google Sheets")

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/community_picks!A:Z?majorDimension=ROWS&key=${googleApiKey}`
  )

  if (!response.ok) {
    const status = response.status
    console.warn("Community picks fetch non-OK", { status })
    throw new Error(`Failed to fetch community picks: ${status}`)
  }

  const data = await response.json()
  const rows = data.values || []

  // Process data rows (skip header)
  const dataRows = rows.slice(1).filter((row: string[]) => {
    // Filter out completely empty rows or rows without a name
    return row.length > 0 && row[0]?.trim() !== ""
  })

  const communityPicks: CommunityPick[] = dataRows.map((row: string[]) => ({
    name: row[0],
    twitterURL: row[1],
    twitterHandle: row[2],
    app1Name: row[3] || null,
    app2Name: row[4] || null,
    app3Name: row[5] || null,
  }))

  console.log(
    `Successfully fetched ${communityPicks.length} community picks from Google Sheets`
  )

  return communityPicks
}
