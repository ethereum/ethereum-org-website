const axios = require("axios")

const lambda = async () => {
  try {
    const response = await axios.get(
      "https://community-api.coinmetrics.io/v2/assets/eth/metricdata/?metrics=TxCnt"
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

const handler = () => {
  return lambda()
}

module.exports = { handler, lambda }
