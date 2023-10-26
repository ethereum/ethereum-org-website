import axios from "axios"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const apiKey = process.env.ETHERSCAN_API_KEY

  const daysToFetch = 90
  const now = new Date()
  const endDate = now.toISOString().split("T")[0] // YYYY-MM-DD
  const startDate = new Date(now.setDate(now.getDate() - daysToFetch))
    .toISOString()
    .split("T")[0] // {daysToFetch} days ago
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=${startDate}&enddate=${endDate}&sort=desc&apikey=${apiKey}`
    )
    if (response.status < 200 || response.status >= 300) {
      return res
        .status(response.status)
        .send(JSON.stringify(response.statusText))
    }
    const { data } = response
    res.status(200).send(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    res.status(500).send(JSON.stringify({ msg: (error as Error).message }))
  }
}

export default handler
