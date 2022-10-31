import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

import { lambda } from "../lambda/translations"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // passing env vars as arguments due to a bug on GC functions where env vars
  // can not be accessed by imported functions
  const { statusCode, body } = await lambda(process.env.CROWDIN_API_KEY)
  res.status(statusCode).send(body)
}

export default handler
