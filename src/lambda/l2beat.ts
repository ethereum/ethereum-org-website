import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (): Promise<HandlerResponse> => {
  try {
    const response = await axios.get(`https://l2beat.com/api/tvl.json`)
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }

    const { data } = response
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: (error as Error).message }),
    }
  }
}

export const handler = () => {
  return lambda()
}
