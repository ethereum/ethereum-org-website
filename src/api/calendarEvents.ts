import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { lambda } from "../lambda/calendarEvents"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
): Promise<void> {
  const { GOOGLE_API_KEY, GOOGLE_CALENDAR_ID } = process.env
  // passing env vars as arguments due to a bug on GC functions where env vars
  // can not be accessed by imported functions
  const { statusCode, body } = await lambda(GOOGLE_API_KEY, GOOGLE_CALENDAR_ID)
  res.status(statusCode).send(body)
}

export default handler
