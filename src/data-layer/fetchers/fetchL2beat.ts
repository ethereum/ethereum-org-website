import { fetchRetry } from "./fetchRetry"

export const FETCH_L2BEAT_TASK_ID = "fetch-l2beat"

/**
 * Fetch ETHBEAT scaling summary data.
 * Returns scaling project data including TVL, maturity, and other metrics.
 *
 * @see https://ethbeat.org/api/scaling/summary
 */
export async function fetchL2beat(): Promise<unknown> {
  const url = "https://ethbeat.org/api/scaling/summary"

  console.log("Starting ETHBEAT data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("ETHBEAT fetch non-OK", { status, url })
    throw new Error(
      `ETHBEAT API responded with ${status}: ${response.statusText}`
    )
  }

  const data = await response.json()

  console.log("Successfully fetched ETHBEAT data")

  return data
}
