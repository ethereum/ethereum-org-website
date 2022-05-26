import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

import { lambda } from "../lambda/coinmetrics"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { statusCode, body } = await lambda()
  res.status(statusCode).send(body)
}

export default handler
