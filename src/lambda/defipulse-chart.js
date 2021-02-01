const axios = require("axios")

const handler = async () => {
  try {
    // Pull TOTAL value locked in DeFi (includes all cryto networks, including Lightning Network)
    const responseTotal = await axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=${process.env.DEFI_PULSE_API_KEY}&period=1m`
    )
    if (responseTotal.status < 200 || responseTotal.status >= 300) {
      return {
        statusCode: responseTotal.status,
        body: responseTotal.statusText,
      }
    }

    // Pull TVL of Lightning Network
    const responseOther = await axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=${process.env.DEFI_PULSE_API_KEY}&period=1m&project=lightning-network`
    )
    if (responseOther.status < 200 || responseOther.status >= 300) {
      return {
        statusCode: responseOther.status,
        body: responseOther.statusText,
      }
    }

    /**
     * responseTotal =
     *  [
     *    {timestamp: string, tvlUSD: number},{...},
     *  ]
     * responseOther =
     * [
     *    {timestamp: number, tvlUSD: number},{...},
     * ]
     */

    const ethereumTvl = []
    for (let i = 0; i < responseTotal.length && i < responseOther.length; i++) {
      ethereumTvl.push({
        timestamp: responseOtherl[i].timestamp,
        tvlUSD: responseTotal[i].tvlUSD - responseOther[i].tvlUSD,
      })
    }

    return { statusCode: 200, body: JSON.stringify({ ethereumTVL }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) }
  }
}

module.exports = { handler }
