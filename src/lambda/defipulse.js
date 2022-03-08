const axios = require("axios")

const lambda = async (apiKey) => {
  try {
    const response = await axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=${apiKey}&period=3m&length=1`
    )
    if (response.status < 200 || response.status >= 300) {
      return {
        statusCode: response.status,
        body: response.statusText,
      }
    }
    const { data } = response
    return { statusCode: 200, body: JSON.stringify(data) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

const handler = () => {
  return lambda(process.env.DEFI_PULSE_API_KEY)
}

module.exports = { handler, lambda }
