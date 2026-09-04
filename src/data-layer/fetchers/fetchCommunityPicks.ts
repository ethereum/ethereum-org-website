import type { CommunityPick } from "@/lib/types"

import { uploadToS3 } from "../s3"

import { fetchRetry } from "./fetchRetry"

export const FETCH_COMMUNITY_PICKS_TASK_ID = "fetch-community-picks"

const AVATAR_PREFIX = "community/picks"

/**
 * Re-host each pick's Twitter avatar (served by unavatar.io) on our S3 bucket
 * so /apps never hot-links a third-party avatar host. Leaves avatarImage empty
 * on failure, letting the card fall back to the member's initial.
 */
async function withMirroredAvatars(
  picks: CommunityPick[]
): Promise<CommunityPick[]> {
  return Promise.all(
    picks.map(async (pick) => {
      const handle = pick.twitterHandle?.replace("@", "").trim()
      if (!handle) return { ...pick, avatarImage: "" }

      const avatarImage = await uploadToS3(
        `https://unavatar.io/twitter/${handle}`,
        AVATAR_PREFIX
      )
      return { ...pick, avatarImage: avatarImage ?? "" }
    })
  )
}

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

  const response = await fetchRetry(
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

  return withMirroredAvatars(communityPicks)
}
