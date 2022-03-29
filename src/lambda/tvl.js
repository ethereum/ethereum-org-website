const axios = require("axios")
const takeRightWhile = require("lodash/takeRightWhile")

const lambda = async () => {
  try {
    const response = await axios.get(`https://api.llama.fi/charts/Ethereum`)
    if (response.status < 200 || response.status >= 300) {
      return {
        statusCode: response.status,
        body: response.statusText,
      }
    }

    const { data } = response

    // get only the last 90 days
    const daysToFetch = 90
    const now = new Date()
    const startDate = new Date(now.setDate(now.getDate() - daysToFetch))
    const startTimestamp = Math.round(startDate.getTime() / 1000)

    const trimmedData = takeRightWhile(
      data,
      ({ date }) => Number(date) > startTimestamp
    )

    return { statusCode: 200, body: JSON.stringify(trimmedData) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

const handler = () => {
  return lambda()
}

module.exports = { handler, lambda }
