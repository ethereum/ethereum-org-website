export const fetchGrowThePieMaster = async () => {
  try {
    const response = await fetch("https://api.growthepie.xyz/v1/master.json")
    if (!response.ok) {
      throw new Error(
        `GrowThePie Master API responded with ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()

    const launchDates = Object.values(data.chains).reduce((acc, curr) => {
      return {
        ...acc,
        [curr.url_key]: curr.launch_date,
      }
    }, {})

    return { launchDates: launchDates }
  } catch (error) {
    console.error(error)
  }
}
