import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

const lambda = async (apiKey: string | undefined): Promise<HandlerResponse> => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=block&action=getblockcountdown&blockno=12965000&apikey=${apiKey}`
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }

    const { data } = response
    return {
      statusCode: 200,
      body: JSON.stringify(data.result.EstimateTimeInSec || 0),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: (error as Error).message }),
    }
  }
}

const handler = () => {
  return lambda(process.env.ETHERSCAN_API_KEY)
}

export { handler, lambda }
