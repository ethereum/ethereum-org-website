// Add interface for the chain data structure
interface Chain {
  url_key: string
  launch_date: string
}

export const fetchGrowThePieMaster = async () => {
  const response = await fetch("https://api.growthepie.xyz/v1/master.json")
  if (!response.ok) {
    throw new Error(
      `growthepie Master API responded with ${response.status}: ${response.statusText}`
    )
  }

  const data = (await response.json()) as { chains: Record<string, Chain> }

  const launchDates = Object.values(data.chains).reduce<Record<string, string>>(
    (acc, curr: Chain) => {
      return {
        ...acc,
        [curr.url_key]: curr.launch_date,
      }
    },
    {}
  )

  return { launchDates: launchDates }
}
