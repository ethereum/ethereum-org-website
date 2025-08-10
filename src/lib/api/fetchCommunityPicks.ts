import { CommunityPick } from "@/lib/types"

export async function fetchCommunityPicks() {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_DAPPS

  if (!sheetId) {
    throw new Error("Google Sheets ID not set")
  }

  if (!googleApiKey) {
    throw new Error("Google API key not set")
  }
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/community_picks!A:Z?majorDimension=ROWS&key=${googleApiKey}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch community picks")
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

  return communityPicks
}
