import type { ExternalDataReturnData, L2beatResponse } from "@/lib/types"

export const fetchL2beat = async (): Promise<ExternalDataReturnData> => {
  try {
    const response = await fetch("https://l2beat.com/api/scaling/summary")
    if (!response.ok) {
      console.error("L2beat fetch non-OK", {
        status: response.status,
        statusText: response.statusText,
        url: "https://l2beat.com/api/scaling/summary",
      })
      return {
        error: `L2BEAT API responded with ${response.status}: ${response.statusText}`,
      }
    }

    const data = (await response.json()) as L2beatResponse

    return {
      value: data,
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error("Error fetching L2beat data:", error)
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch L2beat data",
    }
  }
}
