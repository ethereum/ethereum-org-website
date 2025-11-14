import type { GrowThePieRawDataItem } from "@/lib/types"

export const fetchGrowThePie = async (): Promise<
  GrowThePieRawDataItem[] | { error: string }
> => {
  const url = "https://api.growthepie.com/v1/fundamentals_7d.json"

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(
        "GrowThePie fetch error:",
        response.status,
        response.statusText
      )
      throw new Error(
        `Failed to fetch growthepie data: ${response.status} ${response.statusText}`
      )
    }
    const data: GrowThePieRawDataItem[] = await response.json()

    // Store only the raw API response
    return data
  } catch (error) {
    console.error("Error fetching GrowThePie data:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch GrowThePie data",
    }
  }
}
