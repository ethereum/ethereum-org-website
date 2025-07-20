import { resolveEnsName, type TorchHolder } from "@/lib/torch"

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
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Website%20Info!A:E?majorDimension=ROWS&key=${googleApiKey}`
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

    // Map rows to TorchHolder objects with ENS resolution
    const holders: TorchHolder[] = []

    for (const row of rows) {
      if (!row[0]) continue // must have address or ENS name

      const addressOrEns = row[0].trim()
      const resolvedAddress = await resolveEnsName(addressOrEns)

      if (resolvedAddress) {
        holders.push({
          address: resolvedAddress,
          name: row[1] || "",
          role: row[2] || "",
          twitter: row[3] || "",
        })
      } else {
        console.warn(`Could not resolve address or ENS name: ${addressOrEns}`)
      }
    }

    return holders
  } catch (error) {
    console.error("Error fetching torch holders from Google Sheets:", error)
    return []
  }
}
