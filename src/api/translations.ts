import axios from "axios"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const apiKey = process.env.CROWDIN_API_KEY

  try {
    const baseURL = "https://api.crowdin.com/api/project/ethereum-org/status"

    const resp = await axios.get(`${baseURL}?key=${apiKey}&json`)

    if (resp.status < 200 || resp.status >= 300) {
      return res.status(resp.status).send(resp.statusText)
    }

    const data = await resp.data
    res.status(200).send(JSON.stringify({ data }))
  } catch (error) {
    console.log(error) // output to netlify function log
    res.status(500).send(JSON.stringify({ msg: (error as Error).message }))
  }
}

export default handler
