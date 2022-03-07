import { lambda } from "../lambda/translations"

async function handler(__req, res) {
  const { statusCode, body } = await lambda(process.env.CROWDIN_API_KEY)
  res.status(statusCode).send(body)
}

export default handler
