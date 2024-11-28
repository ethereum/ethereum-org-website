import { CommunityConference } from "@/lib/types"

import "dotenv/config"

async function getPageMetadata(url: string): Promise<Record<string, string>> {
  try {
    const metaTags: Record<string, string> = {}
    const text = await fetch(url).then((r) => r.text())

    const description = text.match(
      /<meta.*?name="description".*?content="(.*?)".*?>|<meta.*?content="(.*?)".*?name="description".*?>/i
    )
    if (description && Array.from(description).length > 2)
      metaTags["description"] = Array.from(description)[1]

    const tags = text.matchAll(
      /<meta (property|name)="(og|twitter):(\S+)" content="(\S+)"/gm
    )
    for (const matchGroup of Array.from(tags)) {
      const key = matchGroup[3]
      const value = matchGroup[4]
      if (key && value) metaTags[key] = value
    }

    return metaTags
  } catch (error) {
    console.error("Unable to fetch metadata", url)
    return {}
  }
}

export async function EthereumEventsImport(year: number) {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = "1NEu_FCc1hnGAuRgPmbXXpf0h2lCrCOlMKbbFEqgkVDQ"

  if (!googleApiKey) {
    console.warn("googleApiKey not set")
    return []
  }

  console.log("Importing Ethereum Events from Google Sheet")
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${year}%20Ethereum%20Events!B:H?majorDimension=COLUMNS&key=${googleApiKey}`
  )
  const data = await res.json()

  // 7 columns: Event, StartDate, EndDate, Location, Link, Twitter, Chat
  if (data.values.length !== 7) return []

  const events: CommunityConference[] = []
  for (let i = 0; i < data.values[0].length; i++) {
    const title: string = data.values[0][i]
    const startDate: string = data.values[1][i]
    const endDate: string = data.values[2][i]
    const location = data.values[3][i]
    const link: string = data.values[4][i]

    if (!title || !startDate || !endDate || !location) continue
    if (
      startDate.includes("TBD") ||
      endDate.includes("TBD") ||
      !startDate.includes(" ") ||
      !endDate.includes(" ")
    )
      continue

    let start, end
    try {
      start = Date.parse(`${startDate}, ${year} GMT`)
      end = Date.parse(`${endDate}, ${year} GMT`)
      if (Number.isNaN(start) || Number.isNaN(end)) continue
    } catch (e) {
      console.log("Invalid date", i[0])
      continue
    }

    let websiteUrl = link
    let description = ""
    let imageUrl = ""
    if (link) {
      websiteUrl =
        link.startsWith("https://") || link.startsWith("http://")
          ? link
          : `https://${link}`
      const meta = await getPageMetadata(websiteUrl)

      if (meta.description) description = meta.description
      if (meta.image && meta.image.startsWith("http")) imageUrl = meta.image
    }

    events.push({
      title: title,
      startDate: new Date(start).toISOString().substring(0, 10),
      endDate: new Date(end).toISOString().substring(0, 10),
      href: websiteUrl,
      location: location,
      description: description,
      imageUrl: imageUrl,
    })
  }

  return events
}
