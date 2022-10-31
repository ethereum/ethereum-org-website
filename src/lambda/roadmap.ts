import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (githubToken: string): Promise<HandlerResponse> => {
  try {
    const baseURL =
      "https://api.github.com/repos/ethereum/ethereum-org-website/issues?per_page=100&state=all"

    const resp = await axios.get(`${baseURL}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

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
  let apiKey = process.env.GITHUB_TOKEN

  if (!apiKey) {
    throw new Error("required env GITHUB_TOKEN not set")
  }

  return lambda(apiKey)
}
