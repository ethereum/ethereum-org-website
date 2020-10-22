const axios = require("axios")
const ethers = require("ethers")

const sendFunds = async (to, amount = "2.0", network = "goerli") => {
  const { FAUCET_PRIVATE_KEY, NODE_ENDPOINT } = process.env
  const privateKey = `0x${FAUCET_PRIVATE_KEY}`
  const provider = new ethers.providers.JsonRpcProvider(NODE_ENDPOINT, network)
  const wallet = new ethers.Wallet(privateKey, provider)
  const transaction = {
    to,
    value: ethers.utils.parseEther(amount),
  }
  const pendingTx = await wallet.sendTransaction(transaction)
  return pendingTx.hash
}

const isAddress = (address) => {
  try {
    return !!ethers.utils.getAddress(address)
  } catch (error) {
    return false
  }
}

exports.handler = async function (event) {
  try {
    const params = JSON.parse(event.body)
    const { captchaResponse, walletAddress } = params

    if (!captchaResponse || !isAddress(walletAddress)) {
      return {
        statusCode: 500,
        // TODO what's the right message format? Can't read from frontend.
        body: JSON.stringify({
          msg: "There was a problem with your request. Please try again later.",
        }),
      }
    }

    const { CAPTCHA_SECRET } = process.env
    // TODO add `remoteip` param?
    // https://developers.google.com/recaptcha/docs/verify
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${captchaResponse}`

    const resp = await axios.get(verificationUrl)
    const { success, score } = resp.data

    if (!success || score < 0.5) {
      // TODO what is error response for verification failure?
      return {
        statusCode: 500,
        // TODO what's the right message format? Can't read from frontend.
        body: JSON.stringify({
          msg: "There was a problem with your request. Please try again later.",
        }),
      }
    }

    const pendingTxHash = await sendFunds(walletAddress)

    return {
      statusCode: 200,
      body: JSON.stringify({ pendingTxHash }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    // TODO what to send back in body?
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }
}
