const axios = require("axios")

const lambda = async (apiKey) => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=block&action=getblockcountdown&blockno=12965000&apikey=${apiKey}`
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }

    const { data } = response
    return {
      statusCode: 200,
      body: JSON.stringify(data.result.EstimateTimeInSec || 0),
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

const handler = () => {
  return lambda(process.env.ETHERSCAN_API_KEY)
}

module.exports = { handler, lambda }
