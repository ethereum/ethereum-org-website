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
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:N?majorDimension=ROWS&key=${googleApiKey}`

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

    const rows = data.values.slice(1).filter((row) => row[12] === "TRUE") || []

    const regions =
      Object.fromEntries(
        rows
          ?.map((row: string[]) => row[9] || "")
          .filter(Boolean)
          .sort()
          .map((region) => [
            region.toLowerCase(),
            { label: region, events: [] },
          ])
      ) || {}

    // Sort events into their respective regions
    rows.forEach((row: string[]) => {
      const region = (row[9] || "").toLowerCase()
      if (region && regions[region]) {
        regions[region].events.push({
          host: row[0] || "",
          eventLink: row[1] || "",
          pingedForURL: row[2] || "",
          eventLocation: row[4] || undefined,
          address: row[5] || undefined,
          city: row[6] || undefined,
          country: row[7] || undefined,
          region: row[8] || undefined,
          continent: row[9] || undefined,
          lat: row[10] || undefined,
          lng: row[11] || undefined,
          readyToShow: row[12] || undefined,
          countryFlag: row[13] || "",
        })
      }
    })

    return regions
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error)
    return {}
  }
}
