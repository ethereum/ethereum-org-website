import { handler as lambda } from "../lambda/translations"

async function handler(__req, res) {
  const { statusCode, body } = await lambda()
  res.status(statusCode).send(body)
}

export default handler
