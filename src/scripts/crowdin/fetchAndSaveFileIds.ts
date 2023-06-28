import fs from "fs"
import path from "path"
import axios from "axios"

// Constants
import { CROWDIN_PROJECT_ID, CROWDIN_API_MAX_LIMIT } from "../../constants"

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer a1a33522970990c7edf8d9fd71b8d6054ce31cbba24c7722908783944c753e458d6e30ba20c15b29`,
}

async function fetchFileIdsForDirectory(directoryId) {
  const recursion = true
  const url = `https://api.crowdin.com/api/v2/projects/${CROWDIN_PROJECT_ID}/files?limit=${CROWDIN_API_MAX_LIMIT}&directoryId=${directoryId}&recursion=${recursion}`

  try {
    const response = await axios.get(url, { headers })

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error(`Invalid response data structure.`, response.data)
      return []
    }

    return response.data.data.map((item) => {
      return {
        id: item.data.id,
        path: item.data.path,
      }
    })
  } catch (error) {
    console.error(
      `There was a problem with the fetch operation for directory ${directoryId}: ` +
        // @ts-ignore
        error.message
    )
    return []
  }
}

async function fetchFileIdsForMultipleDirectories(directoryIds) {
  const promises = directoryIds.map((directoryId) =>
    fetchFileIdsForDirectory(directoryId)
  )

  const results = await Promise.allSettled(promises)
  const successfulResults = results
    .filter((result) => result.status === "fulfilled")
    // @ts-ignore
    .map((result) => result.value)

  if (successfulResults.length === 0) {
    console.log("No successful fetch operations.")
    return
  }

  const combinedData = successfulResults.flat().map(transformResponseData)

  return combinedData
}

// Convert path by removing everything before the second forward slash
// Before: '/28) Developer Tutorials IV/developers/tutorials/testing-erc-20-tokens-with-waffle/index.md'
// After: '/developers/tutorials/testing-erc-20-tokens-with-waffle/index.md'
function transformResponseData(item) {
  const pathSegments = item.path.split("/")
  const newPath = "/" + pathSegments.slice(2).join("/")
  return {
    id: item.id,
    path: newPath,
  }
}

function saveFileIdsToJSON(combinedData) {
  const dir = "./src/data/crowdin"
  const outputFilePath = path.join(dir, "file-ids.json")

  try {
    // TODO: Remove if check is redundant (will this always follow getAndSaveDirectories.ts??)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedData, null, 2))
    console.log(`File id data saved to ${outputFilePath}`)
  } catch (error) {
    console.error(
      "There was a problem saving the data to the file:",
      // @ts-ignore
      error.message
    )
  }
}

async function fetchAndSaveFileIds(directoryIds) {
  const transformedFileData = await fetchFileIdsForMultipleDirectories(
    directoryIds
  )
  saveFileIdsToJSON(transformedFileData)
}

export default fetchAndSaveFileIds
