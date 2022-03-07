const axios = require("axios")

const lambda = async function (apiKey) {
  try {
    const baseURL = "https://api.crowdin.com/api/project/ethereum-org/status"

    const resp = await axios.get(`${baseURL}?key=${apiKey}&json`)

    if (resp.status < 200 || resp.status >= 300) {
      return { statusCode: resp.status, body: resp.statusText }
    }

    const data = await resp.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}

const handler = () => {
  return lambda(process.env.CROWDIN_API_KEY)
}

module.exports = { handler, lambda }
