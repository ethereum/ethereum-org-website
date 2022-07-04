import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (): Promise<HandlerResponse> => {
  try {
    const response = await axios.get(
      "https://community-api.coinmetrics.io/v2/assets/eth/metricdata/?metrics=TxCnt"
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }

    return { statusCode: 200, body: JSON.stringify(response.data) }
  } catch (error) {
    console.error(error)
    // @ts-ignore
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

export const handler = (): Promise<HandlerResponse> => {
  return lambda()
}
