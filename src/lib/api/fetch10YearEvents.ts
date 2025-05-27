interface TenYearEvent {
  host: string
  eventLink: string
  pingedForURL: string
  eventLocation: string
  address: string
  city: string
  country: string
  region: string
  continent: string
  lat: string
  lng: string
  readyToShow: string
  countryFlag: string
}

export async function fetch10YearEvents(): Promise<
  Record<string, { label: string; events: TenYearEvent[] }>
> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_10_YEAR

  if (!googleApiKey) {
    console.warn("Google API key not set")
    return {}
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:M?majorDimension=ROWS&key=${googleApiKey}`

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Google Sheets API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      })
      throw new Error(
        `Google Sheets API responded with ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()

    const regions =
      Object.fromEntries(
        data.values
          ?.slice(1)
          .map((row: string[]) => row[8] || "")
          .filter(Boolean)
          .sort()
          .map((region) => [
            region.toLowerCase(),
            { label: region, events: [] },
          ])
      ) || {}

    const rows = data.values.slice(1).filter((row) => row[11] === "TRUE") || []

    // Sort events into their respective regions
    rows.forEach((row: string[]) => {
      const region = (row[8] || "").toLowerCase()
      if (region && regions[region]) {
        regions[region].events.push({
          host: row[0] || "",
          eventLink: row[1] || "",
          pingedForURL: row[2] || "",
          eventLocation: row[3] || undefined,
          address: row[4] || undefined,
          city: row[5] || undefined,
          country: row[6] || undefined,
          region: row[7] || undefined,
          continent: row[8] || undefined,
          lat: row[9] || undefined,
          lng: row[10] || undefined,
          readyToShow: row[11] || undefined,
          countryFlag: row[12] || "",
        })
      }
    })

    return regions
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error)
    return {}
  }
}
