import fs from "fs"
import path from "path"
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
    console.error(
      // @ts-ignore
      `There was a problem fetching the directories: ${error.message}`
    )
    return []
  }
}

async function filterDirectoriesAndSave(directoriesData) {
  try {
    if (directoriesData.length === 0) {
      console.log("No data received from the API. Keeping the existing data.")
      return
    }

    const filteredData = directoriesData
      .filter(
        (item) =>
          item.data.directoryId === null && !item.data.path.includes("v.1")
      )
      .map((item) => ({ id: item.data.id, name: item.data.name })) // Extract only id and name

    const dir = "./src/data/crowdin"
    const outputFilePath = path.join(dir, "translation-buckets-dirs.json")

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outputFilePath, JSON.stringify(filteredData, null, 2))

    console.log(
      "Filtered directory data saved to translation-buckets-dirs.json"
    )
  } catch (error) {
    console.error("Error filtering and saving directories:", error)
  }
}

async function getAndSaveDirectories() {
  const directoriesData = await getDirectories()
  filterDirectoriesAndSave(directoriesData)
}

export default getAndSaveDirectories
