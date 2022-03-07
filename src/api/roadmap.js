import { lambda } from "../lambda/roadmap"

async function handler(__req, res) {
  const { statusCode, body } = await lambda(process.env.GITHUB_TOKEN)
  res.status(statusCode).send(body)
}

export default handler
