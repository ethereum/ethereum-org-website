import { lambda } from "../lambda/coinmetrics"

async function handler(__req, res) {
  const { statusCode, body } = await lambda()
  res.status(statusCode).send(body)
}

export default handler
