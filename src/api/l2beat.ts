import axios from "axios"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const response = await axios.get(`https://api.l2beat.com/api/tvl`)
    if (response.status < 200 || response.status >= 300) {
      return res.status(response.status).send(response.statusText)
    }

    const { data } = response
    res.status(200).send(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    res.status(500).send(JSON.stringify({ msg: (error as Error).message }))
  }
}

export default handler
