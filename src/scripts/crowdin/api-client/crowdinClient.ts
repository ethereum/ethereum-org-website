import crowdin from "@crowdin/crowdin-api-client"

import "dotenv/config"

const crowdinClient = new crowdin({
  token: process.env.CROWDIN_API_KEY || "",
})

export default crowdinClient
