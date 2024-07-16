import fs from "fs"
import path from "path"

import { ResponseObject, SourceFilesModel } from "@crowdin/crowdin-api-client"

import {
  CROWDIN_API_MAX_LIMIT,
  CROWDIN_PROJECT_ID,
} from "../../../lib/constants"
import crowdinClient from "../api-client/crowdinClient"

const { sourceFilesApi } = crowdinClient

interface FileItem {
  id: number
  path: string
}

async function fetchFileIdsForDirectory(
  directoryId: number
): Promise<FileItem[]> {
  try {
    const response = await sourceFilesApi.listProjectFiles(CROWDIN_PROJECT_ID, {
      limit: CROWDIN_API_MAX_LIMIT,
      directoryId,
      recursion: true,
    })

    if (!response.data || !Array.isArray(response.data)) {
      console.error(`Invalid response data structure.`, response.data)
      return []
    }

    return response.data
      .map(
        (item: ResponseObject<SourceFilesModel.File>): FileItem => ({
          id: item.data.id,
          path: item.data.path,
        })
      )
      .filter((file: FileItem) => file.path.endsWith(".md")) // filter out non-md files
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `There was a problem with the fetch operation for directory ${directoryId}: ${error.message}`
      )
    }
    return []
  }
}

async function fetchFileIdsForMultipleDirectories(
  directoryIds: number[]
): Promise<FileItem[] | undefined> {
  const promises = directoryIds.map(fetchFileIdsForDirectory)
  const results = await Promise.allSettled(promises)

  const successfulResults: FileItem[][] = results
    .filter(
      (result): result is PromiseFulfilledResult<FileItem[]> =>
        result.status === "fulfilled"
    )
    .map((result) => result.value)

  if (successfulResults.length === 0) {
    console.log("No successful fetch operations.")
    return
  }

  const combinedData: FileItem[] = successfulResults
    .flat()
    .map(transformResponseData)

  return combinedData
}

// Convert path by removing everything before the second forward slash
// Before: '/28) Developer Tutorials IV/developers/tutorials/testing-erc-20-tokens-with-waffle/index.md'
// After: '/developers/tutorials/testing-erc-20-tokens-with-waffle/index.md'
function transformResponseData(item: FileItem): FileItem {
  const pathSegments = item.path.split("/")
  const newPath = "/" + pathSegments.slice(2).join("/")

  return {
    id: item.id,
    path: newPath,
  }
}

function saveFileIdsToJSON(combinedData: FileItem[]): void {
  const dir = "./src/data/crowdin"
  const outputFilePath = path.join(dir, "file-ids.json")

  try {
    // Do not overwrite the file if there's no data to save
    if (combinedData.length === 0) {
      console.log("No data to save. Keeping the existing data.")
      return
    }

    // TODO: Remove if check is redundant (will this always follow getAndSaveDirectories.ts??)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedData, null, 2))
    console.log(`File id data saved to ${outputFilePath}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "There was a problem saving the data to the file:",
        error.message
      )
    }
  }
}

async function fetchAndSaveFileIds(directoryIds: number[]): Promise<void> {
  const transformedFileData =
    await fetchFileIdsForMultipleDirectories(directoryIds)

  if (transformedFileData) {
    saveFileIdsToJSON(transformedFileData)
  } else {
    console.log("No data to save. Keeping the existing data.")
  }
}

export default fetchAndSaveFileIds
