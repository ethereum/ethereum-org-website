import { lambda } from "../lambda/defipulse"

async function handler(__req, res) {
  const { statusCode, body } = await lambda(process.env.DEFI_PULSE_API_KEY)
  res.status(statusCode).send(body)
}

export default handler
