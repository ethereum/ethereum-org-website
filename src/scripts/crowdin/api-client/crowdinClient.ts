import crowdin from "@crowdin/crowdin-api-client"

import "dotenv/config"

// Validate that the CROWDIN_API_KEY environment variable is set
if (!process.env.CROWDIN_API_KEY) {
  console.error(
    "ERROR: CROWDIN_API_KEY environment variable is not set. " +
      "Please provide a valid Crowdin API key to access the Crowdin API."
  )
  throw new Error(
    "Missing CROWDIN_API_KEY environment variable. Cannot initialize Crowdin client."
  )
}

const crowdinClient = new crowdin({
  token: process.env.CROWDIN_API_KEY,
})

export default crowdinClient
