import axios from "axios"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const apiKey = process.env.ETHERSCAN_API_KEY

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=block&action=getblockcountdown&blockno=12965000&apikey=${apiKey}`
    )
    if (response.status < 200 || response.status >= 300) {
      return res.status(response.status).send(response.statusText)
    }

    const { data } = response
    res.status(200).send(JSON.stringify(data.result.EstimateTimeInSec || 0))
  } catch (error) {
    console.error(error)
    res.status(500).send(JSON.stringify({ msg: (error as Error).message }))
  }
}

export default handler
