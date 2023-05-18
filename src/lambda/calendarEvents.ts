import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (): Promise<HandlerResponse> => {
  try {
    return { statusCode: 200, body: "hello world" }
  } catch (error) {
    console.error(error)
    // @ts-ignore
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

export const handler = (): Promise<HandlerResponse> => {
  return lambda()
}
