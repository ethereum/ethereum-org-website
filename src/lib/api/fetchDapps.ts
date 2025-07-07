import { DappCategoryEnum, DappData } from "@/lib/types"

export async function fetchDapps(): Promise<Record<string, DappData[]>> {
  const googleApiKey = process.env.GOOGLE_API_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID_DAPPS

  if (!sheetId) {
    throw new Error("Google Sheets ID not set")
  }

  if (!googleApiKey) {
    throw new Error("Google API key not set")
  }

  try {
    // First, let's get the spreadsheet metadata to see what sheets exist
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${googleApiKey}`

    const metadataResponse = await fetch(metadataUrl)

    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text()
      console.error("Metadata fetch error:", {
        status: metadataResponse.status,
        statusText: metadataResponse.statusText,
        error: errorText,
      })
      throw new Error(
        `Metadata fetch failed: ${metadataResponse.status} ${metadataResponse.statusText}`
      )
    }

    const metadata = await metadataResponse.json()
    const sheetNames =
      metadata.sheets?.map(
        (sheet: { properties: { title: string } }) => sheet.properties.title
      ) || []

    const result: Record<string, DappData[]> = {}

    // Fetch and process data from each sheet
    for (const sheetName of sheetNames) {
      const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:Z?majorDimension=ROWS&key=${googleApiKey}`
      const dataResponse = await fetch(dataUrl)

      if (!dataResponse.ok) {
        console.error(
          `Failed to fetch from sheet ${sheetName}:`,
          dataResponse.status,
          dataResponse.statusText
        )
        result[sheetName] = []
        continue
      }

      const data = await dataResponse.json()
      const rows = data.values || []

      if (rows.length === 0) {
        result[sheetName] = []
        continue
      }

      // Process data rows (skip header)
      const dataRows = rows.slice(1).filter((row: string[]) => {
        // Filter out completely empty rows or rows without a name
        return row.length > 0 && row[0]?.trim() !== ""
      })

      const dapps: DappData[] = dataRows
        .map((row: string[]) => {
          // Map row data to dapp object
          const dappData = {
            name: row[0] || "",
            url: row[1] || "",
            description: row[2] || "",
            image: row[3] || "", // Use the SVG data directly from the Logo Image column
            category: getCategoryFromSheetName(sheetName),
            subCategory: parseCommaSeparated(row[5] || ""),
            networks: parseNetworks(row[6] || ""),
            screenshots: parseCommaSeparated(row[7] || ""),
            bannerImage: row[8] || "",
            platforms: parseCommaSeparated(row[9] || ""),
            twitter: row[10] || "",
            github: row[11] || "",
            discord: row[12] || "",
            kpiUrl: row[13] || "",
            sortingWeight: parseInt(row[14] || "0") || 0,
            staffPicks: row[15]?.toLowerCase() === "true",
            highlight: row[16]?.toLowerCase() === "true",
            languages: parseCommaSeparated(row[17] || ""),
            parentCompany: row[18] || "",
            parentCompanyURL: row[19] || "",
            openSource: row[20]?.toLowerCase() === "true",
            contractAddress: row[21] || "",
            dateOfLaunch: row[22] || "",
            lastUpdated: row[23] || "",
            ready: row[24]?.toLowerCase(),
          }

          return dappData as unknown as DappData
        })
        .filter((dapp: DappData) => dapp.name && dapp.url) // Filter out dapps without name or URL
        .filter((dapp: DappData) => dapp.ready === "true")

      result[sheetName] = dapps
    }

    return result
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error)
    return {}
  }
}

// Helper function to map sheet names to DappCategoryEnum
function getCategoryFromSheetName(sheetName: string): DappCategoryEnum {
  switch (sheetName) {
    case "DeFi":
      return DappCategoryEnum.DEFI
    case "Collectibles":
      return DappCategoryEnum.COLLECTIBLE
    case "Social":
      return DappCategoryEnum.SOCIAL
    case "Gaming":
      return DappCategoryEnum.GAMING
    case "Bridge":
      return DappCategoryEnum.BRIDGE
    case "Productivity":
      return DappCategoryEnum.PRODUCTIVITY
    case "Privacy":
      return DappCategoryEnum.PRIVACY
    case "DAO":
      return DappCategoryEnum.GOVERNANCE_DAO
    default:
      return DappCategoryEnum.DEFI // Default fallback
  }
}

// Helper function to parse comma-separated strings into arrays
function parseCommaSeparated(value: string): string[] {
  if (!value || value.trim() === "") return []
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

// Helper function to parse networks
function parseNetworks(value: string): Array<"Ethereum" | "Starknet"> {
  if (!value || value.trim() === "") return ["Ethereum"] // Default to Ethereum
  const networks = value.split(",").map((n) => n.trim().toLowerCase())
  const supportedNetworks: Array<"Ethereum" | "Starknet"> = []

  if (networks.some((n) => n.includes("ethereum")))
    supportedNetworks.push("Ethereum")
  if (networks.some((n) => n.includes("starknet")))
    supportedNetworks.push("Starknet")

  return supportedNetworks.length > 0 ? supportedNetworks : ["Ethereum"]
}
