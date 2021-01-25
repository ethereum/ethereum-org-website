const axios = require("axios")

const handler = async (event) => {
  try {
    // Pulls TVL of Lightning Network, used when calculating Ethereum-only TVL
    const response = await axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=${process.env.DEFI_PULSE_API_KEY}&period=1m&length=1&project=lightning-network`
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
