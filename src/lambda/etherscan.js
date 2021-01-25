const axios = require("axios")

const handler = async (event) => {
  try {
    const response = await axios.get(
      "https://etherscan.io/stats_nodehandler.ashx?range=1"
    )
    if (response.status < 200 || response.status >= 300) {
      return { statusCode: response.status, body: response.statusText }
    }

    return { statusCode: 200, body: JSON.stringify(response.data) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

module.exports = { handler }
