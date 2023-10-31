import "dotenv/config"
import crowdin from "@crowdin/crowdin-api-client"

const crowdinClient = new crowdin({
  token: process.env.CROWDIN_API_KEY || "",
})

export default crowdinClient
