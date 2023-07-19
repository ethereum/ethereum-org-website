import fs from "fs"
import path from "path"
import { filterAndFormatData } from "./dataHelpers"
import { getLangCodeFromCrowdinCode } from "../../../utils/getCrowdinCode"

export type CombinedData = {
  lang: string
  data: {
    fileId: string
    contributors: User[]
  }[]
}

export interface User {
  id: number
  username: string
  fullName?: string
  totalCosts: number
  avatarUrl: string
}

export interface UserData {
  user: User
}

export interface ReportData {
  data: UserData[]
}

const combinedFilePath = path.join(
  __dirname,
  "../../../data/crowdin/combined-translators.json"
)

export async function saveReportDataToJson(
  reportData: ReportData,
  fileId: number,
  language: string
): Promise<void> {
  const repoLangCode = await getLangCodeFromCrowdinCode(language)
  const combinedData = await loadCombinedTranslators()
  const formattedData = await filterAndFormatData(reportData.data)
  const languageData = combinedData.find((data) => data.lang === repoLangCode)

  if (languageData) {
    const existingData = languageData.data.find(
      (data) => data.fileId === fileId.toString()
    )
    if (existingData) {
      existingData.contributors = formattedData
    } else {
      languageData.data.push({
        fileId: fileId.toString(),
        contributors: formattedData,
      })
    }
  } else {
    combinedData.push({
      lang: repoLangCode,
      data: [
        {
          fileId: fileId.toString(),
          contributors: formattedData,
        },
      ],
    })
  }

  try {
    await fs.promises.writeFile(
      combinedFilePath,
      JSON.stringify(combinedData, null, 2)
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error writing to ${combinedFilePath}:`, error.message)
    }
  }
}

interface ExcludedTranslatorsData {
  excludedNames: string[]
  excludedUsernames: string[]
  excludedPhrases: string[]
}

export async function loadExcludedTranslators(): Promise<ExcludedTranslatorsData> {
  const filePath = path.join(
    __dirname,
    "../../../data/crowdin/excluded-translators.json"
  )
  let excludedTranslators = {
    excludedNames: [],
    excludedUsernames: [],
    excludedPhrases: [],
  }
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf8")
    excludedTranslators = rawData
      ? JSON.parse(rawData)
      : { excludedNames: [], excludedUsernames: [], excludedPhrases: [] }
  }

  return excludedTranslators
}

export async function loadCombinedTranslators(): Promise<CombinedData[]> {
  let combinedData: CombinedData[] = []
  if (fs.existsSync(combinedFilePath)) {
    const rawData = fs.readFileSync(combinedFilePath, "utf8")
    combinedData = rawData ? JSON.parse(rawData) : []
  }
  return combinedData
}
