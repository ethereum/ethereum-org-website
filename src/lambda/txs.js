const axios = require("axios")

const handler = async () => {
  try {
    const daysToFetch = 90
    const now = new Date()
    const endDate = now.toISOString().split("T")[0] // YYYY-MM-DD
    const startDate = new Date(now.setDate(now.getDate() - daysToFetch))
      .toISOString()
      .split("T")[0] // {daysToFetch} days ago
    const response = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=dailytx&startdate=${startDate}&enddate=${endDate}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }
    const { data } = response
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

module.exports = { handler }
