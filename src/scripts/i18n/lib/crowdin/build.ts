// Crowdin build and download operations

import {
  config,
  CROWDIN_API_BASE_URL,
  crowdinBearerHeaders,
} from "../../config"
import type { BuildProjectFileTranslationResponse } from "../types"

/**
 * Build a project file translation for a specific language
 *
 * @param fileId - The Crowdin file ID
 * @param targetLanguageId - The target language ID
 * @param projectId - The Crowdin project ID (defaults to config)
 * @returns Build response with download URL
 */
export const postBuildProjectFileTranslation = async (
  fileId: number,
  targetLanguageId: string,
  projectId = config.projectId
): Promise<BuildProjectFileTranslationResponse> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${projectId}/translations/builds/files/${fileId}`
  )

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      ...crowdinBearerHeaders,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ targetLanguageId }),
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(
      `Crowdin postBuildProjectFileTranslation failed (${res.status}): ${body}`
    )
  }

  type JsonResponse = { data: BuildProjectFileTranslationResponse }
  const json: JsonResponse = await res.json()
  console.log("Built file:", json.data)
  return json.data
}

/**
 * Download a built file from Crowdin
 *
 * @param downloadUrl - The download URL from the build response
 * @returns Buffer containing the file contents
 */
export const getBuiltFile = async (
  downloadUrl: string
): Promise<{ buffer: Buffer }> => {
  try {
    const res = await fetch(downloadUrl)

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(`Failed to download built file (${res.status}): ${body}`)
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return { buffer }
  } catch (error) {
    console.error("getBuiltFile error:", error)
    throw error
  }
}
