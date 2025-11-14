import type { CommunityPick } from "@/lib/types"

export const fetchCommunityPicks = async (): Promise<
  CommunityPick[] | { error: string }
> => {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_DAPPS

  if (!sheetId) {
    return {
      error: "Google Sheets ID not set",
    }
  }

  if (!googleApiKey) {
    return {
      error: "Google API key not set",
    }
  }

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/community_picks!A:Z?majorDimension=ROWS&key=${googleApiKey}`
    )

    if (!response.ok) {
      console.error(
        "Failed to fetch community picks:",
        response.status,
        response.statusText
      )
      return {
        error: `Failed to fetch community picks: ${response.status} ${response.statusText}`,
      }
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
  } catch (error) {
    console.error("Error fetching community picks:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch community picks",
    }
  }
}
