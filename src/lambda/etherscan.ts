import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (apiKey: string): Promise<HandlerResponse> => {
  const daysToFetch = 90
  const now = new Date()
  const endDate = now.toISOString().split("T")[0] // YYYY-MM-DD
  const startDate = new Date(now.setDate(now.getDate() - daysToFetch))
    .toISOString()
    .split("T")[0] // {daysToFetch} days ago
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=${startDate}&enddate=${endDate}&sort=desc&apikey=${apiKey}`
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }
    const { data } = response
    return { statusCode: 200, body: JSON.stringify(data) }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: (error as Error).message }),
    }
  }
}

export const handler = () => {
  let apiKey = process.env.ETHERSCAN_API_KEY

  if (!apiKey) {
    throw new Error("required env ETHERSCAN_API_KEY not set")
  }

  return lambda(apiKey)
}
