import { lambda } from "../lambda/txs"

async function handler(__req, res) {
  const { statusCode, body } = await lambda(process.env.ETHERSCAN_API_KEY)
  res.status(statusCode).send(body)
}

export default handler
