import fs from "fs"
import path from "path"
import { SourceFilesModel, ResponseList } from "@crowdin/crowdin-api-client"

import crowdinClient from "../api-client/crowdinClient"
const { sourceFilesApi } = crowdinClient

// Constants
import { CROWDIN_PROJECT_ID, CROWDIN_API_MAX_LIMIT } from "../../../constants"

async function getDirectories(): Promise<
  ResponseList<SourceFilesModel.Directory>
> {
  try {
    const response = await sourceFilesApi.listProjectDirectories(
      CROWDIN_PROJECT_ID,
      { limit: CROWDIN_API_MAX_LIMIT }
    )
    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `There was a problem fetching the directories: ${error.message}`
      )
    }
    throw new Error("An unknown error occurred while fetching the directories.")
  }
}

async function filterDirectoriesAndSave(
  directoriesData: ResponseList<SourceFilesModel.Directory>
): Promise<void> {
  try {
    if (directoriesData.data.length === 0) {
      console.log("No data received from the API. Keeping the existing data.")
      return
    }

    const filteredData = directoriesData.data
      .filter((item) => item.data.directoryId === null)
      .map((item) => ({ id: item.data.id, name: item.data.name })) // Extract only id and name

    const dir = "./src/data/crowdin"
    const outputFilePath = path.join(dir, "translation-buckets-dirs.json")

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outputFilePath, JSON.stringify(filteredData, null, 2))

    console.log(
      "Filtered directory data saved to translation-buckets-dirs.json"
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error filtering and saving directories:", error.message)
    }
  }
}

async function getAndSaveDirectories(): Promise<void> {
  try {
    const directoriesData = await getDirectories()
    await filterDirectoriesAndSave(directoriesData)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getAndSaveDirectories:", error.message)
    }
  }
}

export default getAndSaveDirectories
