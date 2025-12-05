export const FETCH_GROW_THE_PIE_MASTER_TASK_ID = "fetch-grow-the-pie-master"

interface Chain {
  url_key: string
  launch_date: string
}

type GrowThePieMasterResponse = {
  chains: Record<string, Chain>
}

type GrowThePieMasterData = {
  launchDates: Record<string, string>
}

/**
 * Fetch GrowThePie master data containing chain launch dates.
 * Returns launch dates for all chains indexed by their URL key.
 */
export async function fetchGrowThePieMaster(): Promise<GrowThePieMasterData> {
  const url = "https://api.growthepie.com/v1/master.json"

  console.log("Starting GrowThePie master data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("GrowThePie master fetch non-OK", { status, url })
    throw new Error(
      `GrowThePie Master API responded with ${status}: ${response.statusText}`
    )
  }

  const data = (await response.json()) as GrowThePieMasterResponse

  const launchDates = Object.values(data.chains).reduce<Record<string, string>>(
    (acc, curr: Chain) => {
      return {
        ...acc,
        [curr.url_key]: curr.launch_date,
      }
    },
    {}
  )

  const chainsCount = Object.keys(launchDates).length

  console.log("Successfully fetched GrowThePie master data", {
    chainsCount,
  })

  return { launchDates }
}
