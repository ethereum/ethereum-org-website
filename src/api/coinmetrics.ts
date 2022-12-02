import type { GatsbyFunctionResponse } from "gatsby"

import { lambda } from "../lambda/coinmetrics"

async function handler(res: GatsbyFunctionResponse) {
  const { statusCode, body } = await lambda()
  res.status(statusCode).json(body)
}

export default handler
