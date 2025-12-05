export const FETCH_L2BEAT_TASK_ID = "fetch-l2beat"

/**
 * Fetch L2BEAT scaling summary data.
 * Returns scaling project data including TVL, maturity, and other metrics.
 *
 * @see https://l2beat.com/api/scaling/summary
 */
export async function fetchL2beat(): Promise<unknown> {
  const url = "https://l2beat.com/api/scaling/summary"

  console.log("Starting L2BEAT data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("L2BEAT fetch non-OK", { status, url })
    throw new Error(
      `L2BEAT API responded with ${status}: ${response.statusText}`
    )
  }

  const data = await response.json()

  console.log("Successfully fetched L2BEAT data")

  return data
}
