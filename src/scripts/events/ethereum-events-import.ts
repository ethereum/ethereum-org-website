import { CommunityConference } from "@/lib/types"
import "dotenv/config"

export async function EthereumEventsImport() {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = "1NEu_FCc1hnGAuRgPmbXXpf0h2lCrCOlMKbbFEqgkVDQ"

  if (!googleApiKey || !sheetId) {
    console.warn("googleApiKey or sheetId not set")
    return []
  }

  console.log("Importing Ethereum Events from Google Sheet")
  const currentYear = new Date().getFullYear()
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${currentYear}%20Ethereum%20Events!B:H?majorDimension=COLUMNS&key=${googleApiKey}`
  )
  const data = await res.json()

  // 7 columns: Event, StartDate, EndDate, Location, Link, Twitter, Chat
  if (data.values.length !== 7) return []

  const events: CommunityConference[] = []
  for (let i = 0; i < data.values[0].length; i++) {
    const title = data.values[0][i]
    const startDate = data.values[1][i]
    const endDate = data.values[2][i]
    const location = data.values[3][i]
    const link = data.values[4][i]
    const twitter = data.values[5][i]
    const chat = data.values[6][i]

    if (!title || !startDate || !endDate || !location) continue
    if (startDate.includes("TBD") || endDate.includes("TBD") || !startDate.includes(' ') || !endDate.includes(' ')) continue

    let start, end
    try {
      start = Date.parse(`${startDate}, ${currentYear}`)
      end = Date.parse(`${endDate}, ${currentYear}`)
      if (Number.isNaN(start) || Number.isNaN(end)) continue
    } catch (e) {
      console.log("Invalid date", i[0])
      continue
    }

    events.push({
      title: title,
      startDate: start,
      endDate: end,
      to: link,
      location: location,
      description: `Follow @${twitter} on Twitter for updates`
    })
  }

  return events
}
