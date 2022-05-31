import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (apiKey: string): Promise<HandlerResponse> => {
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

export const handler = () => {
  let apiKey = process.env.CROWDIN_API_KEY

  if (!apiKey) {
    throw new Error("required env CROWDIN_API_KEY not set")
  }

  return lambda(apiKey)
}
