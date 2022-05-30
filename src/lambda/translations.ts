import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

const lambda = async (apiKey: string | undefined): Promise<HandlerResponse> => {
  try {
    const baseURL = "https://api.crowdin.com/api/project/ethereum-org/status"

    const resp = await axios.get(`${baseURL}?key=${apiKey}&json`)

    if (resp.status < 200 || resp.status >= 300) {
      return { statusCode: resp.status, body: resp.statusText }
    }

    const data = await resp.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (error) {
    console.log(error) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: (error as Error).message }),
    }
  }
}

const handler = () => {
  return lambda(process.env.CROWDIN_API_KEY)
}

export { handler, lambda }
