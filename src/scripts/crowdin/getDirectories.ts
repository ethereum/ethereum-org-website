import axios from "axios"

// Constants
import { CROWDIN_PROJECT_ID, CROWDIN_API_MAX_LIMIT } from "../../constants"

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer a1a33522970990c7edf8d9fd71b8d6054ce31cbba24c7722908783944c753e458d6e30ba20c15b29`,
}

async function getDirectories() {
  const url = `https://api.crowdin.com/api/v2/projects/${CROWDIN_PROJECT_ID}/directories?limit=${CROWDIN_API_MAX_LIMIT}`

  try {
    const response = await axios.get(url, { headers })

    // Check for successful response
    if (
      response.status === 200 &&
      response.data &&
      Array.isArray(response.data.data)
    ) {
      // Return the data directly
      return response.data.data
    } else {
      console.log("Invalid response from API:", response.data)
      return []
    }
  } catch (error) {
    // @ts-ignore
    console.log(
      `There was a problem fetching the directories: ${error.message}`
    )
    return []
  }
}

export default getDirectories
