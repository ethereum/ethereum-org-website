const axios = require("axios")

const lambda = async function (githubToken) {
  try {
    const baseURL =
      "https://api.github.com/repos/ethereum/ethereum-org-website/issues?per_page=100&state=all"

    const resp = await axios.get(`${baseURL}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

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
  return lambda(process.env.GITHUB_TOKEN)
}

module.exports = { handler, lambda }
