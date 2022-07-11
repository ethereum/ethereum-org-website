import axios from "axios"
import takeRightWhile from "lodash/takeRightWhile"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (): Promise<HandlerResponse> => {
  try {
    const response = await axios.get(`https://api.llama.fi/charts/Ethereum`)
    if (response.status < 200 || response.status >= 300) {
      return {
        statusCode: response.status,
        body: response.statusText,
      }
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

    return { statusCode: 200, body: JSON.stringify(trimmedData) }
  } catch (error) {
    console.error(error)
    // @ts-ignore
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

export const handler = (): Promise<HandlerResponse> => {
  return lambda()
}
