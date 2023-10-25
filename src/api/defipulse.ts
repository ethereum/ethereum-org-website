import axios from "axios"
import takeRightWhile from "lodash/takeRightWhile"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
): Promise<void> {
  try {
    const response = await axios.get(`https://api.llama.fi/charts/Ethereum`)
    if (response.status < 200 || response.status >= 300) {
      return res
        .status(response.status)
        .send(JSON.stringify(response.statusText))
    }

    const { data } = response

    // get only the last 90 days
    const daysToFetch = 90
    const now = new Date()
    const startDate = new Date(now.setDate(now.getDate() - daysToFetch))
    const startTimestamp = Math.round(startDate.getTime() / 1000)

    const trimmedData = takeRightWhile(
      data,
      ({ date }) => Number(date) > startTimestamp
    )

    res.status(200).send(JSON.stringify(trimmedData))
  } catch (error) {
    console.error(error)
    res.status(500).send(JSON.stringify({ msg: (error as Error)?.message }))
  }
}

export default handler
