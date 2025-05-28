export async function fetch10YearStories() {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_10_YEAR

  if (!googleApiKey) {
    console.warn("Google API key not set")
    return {}
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet2!A:H?majorDimension=ROWS&key=${googleApiKey}`

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

    const rows = data.values.slice(1) || []

    const stories = rows.map((row) => {
      return {
        storyEnglish: row[0],
        storyOriginal: row[1],
        category: row[2],
        name: row[3],
        date: row[4],
        country: row[5],
        twitter: row[6],
        region: row[7],
      }
    })

    return stories
  } catch (error) {
    console.error("Error fetching 10 year stories:", error)
    return {}
  }
}
