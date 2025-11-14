import type { GrowThePieLaunchDates } from "@/lib/types"

interface Chain {
  url_key: string
  launch_date: string
}

export const fetchGrowThePieMaster = async (): Promise<
  GrowThePieLaunchDates | { error: string }
> => {
  try {
    const response = await fetch("https://api.growthepie.com/v1/master.json")
    if (!response.ok) {
      console.error("GrowThePie Master fetch non-OK", {
        status: response.status,
        statusText: response.statusText,
        url: "https://api.growthepie.com/v1/master.json",
      })
      return {
        error: `GrowThePie Master API responded with ${response.status}: ${response.statusText}`,
      }
    }

    const data = (await response.json()) as { chains: Record<string, Chain> }

    const launchDates = Object.values(
      data.chains
    ).reduce<GrowThePieLaunchDates>((acc, curr: Chain) => {
      return {
        ...acc,
        [curr.url_key]: curr.launch_date,
      }
    }, {})

    return launchDates
  } catch (error) {
    console.error("Error fetching GrowThePie Master data:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch GrowThePie Master data",
    }
  }
}
