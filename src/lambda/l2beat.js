const axios = require("axios")

const lambda = async () => {
  try {
    const response = await axios.get(`https://l2beat.com/api/tvl.json`)
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

const handler = () => {
  return lambda()
}

module.exports = { handler, lambda }
