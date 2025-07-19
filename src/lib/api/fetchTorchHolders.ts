import type { TorchHolder } from "@/lib/torch"

export async function fetchTorchHolders(): Promise<TorchHolder[]> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_TORCH_HOLDERS

  if (!googleApiKey) {
    console.warn("Google API key not set")
    return []
  }

  if (!sheetId) {
    console.warn("Google Sheet ID for torch holders not set")
    return []
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:E?majorDimension=ROWS&key=${googleApiKey}`
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
    // data.values[0] is the header row
    const rows = data.values.slice(1) || []

    // Map rows to TorchHolder objects
    const holders: TorchHolder[] = rows
      .filter((row: string[]) => row[0]) // must have address
      .map((row: string[]) => ({
        address: row[0],
        name: row[1] || "",
        twitter: row[2] || "",
        role: row[3] || "",
      }))

    return holders
  } catch (error) {
    console.error("Error fetching torch holders from Google Sheets:", error)
    return []
  }
}
