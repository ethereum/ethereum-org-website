export const fetchL2beat = async () => {
  try {
    const response = await fetch("https://l2beat.com/api/scaling/summary")
    if (!response.ok) {
      throw new Error(
        `L2BEAT API responded with ${response.status}: ${response.statusText}`
      )
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
