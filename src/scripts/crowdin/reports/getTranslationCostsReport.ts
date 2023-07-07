import fs from "fs"
import axios, { AxiosResponse } from "axios"

import { ReportsModel } from "@crowdin/crowdin-api-client"

import crowdinClient from "../api-client/crowdinClient"
import {
  CROWDIN_PROJECT_ID,
  FIRST_CROWDIN_CONTRIBUTION_DATE,
} from "../../../constants"
import { findFileIdsByPaths } from "../utils"
import getCrowdinCode from "../../../../src/utils/getCrowdinCode"
import path from "path"

const { reportsApi } = crowdinClient
const combinedFilePath = path.join(
  __dirname,
  "../../../data/crowdin/combined-translators.json"
)
let excludedTranslatorsGlobal: {
  excludedNames: string[]
  excludedUsernames: string[]
  excludedPhrases: string[]
} = { excludedNames: [], excludedUsernames: [], excludedPhrases: [] }
let combinedDataGlobal: any[]

interface User {
  id: number
  username: string
  totalCosts: number
  avatarUrl: string
}

interface UserData {
  user: User
  // languages: any[];
}

interface ReportData {
  data: UserData[]
}

const regularRates: ReportsModel.RegularRate[] = [
  {
    mode: "tm_match",
    value: 1.01,
  },
  {
    mode: "no_match",
    value: 1.01,
  },
]

function getPreviousDayISOString(): string {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  return now.toISOString()
}

async function fetchTranslationCostsReport(
  fileId: number,
  language: string
): Promise<void> {
  const now = new Date()
  now.setDate(now.getDate() - 1) // set the date to one day in the past (yesterday)
  const dateTo = getPreviousDayISOString()

  // Todo: Remove ts-ignore when this PR gets merged
  // https://github.com/crowdin/crowdin-api-client-js/pull/282
  const schema: ReportsModel.TranslationCostSchema = {
    unit: "words",
    currency: "USD",
    mode: "simple",
    format: "json",
    groupBy: "user",
    regularRates,
    dateFrom: FIRST_CROWDIN_CONTRIBUTION_DATE,
    dateTo,
    // @ts-ignore
    languageId: language,
    fileIds: [fileId],
  }

  const reportRequest: ReportsModel.GenerateReportRequest = {
    name: "translation-costs",
    schema: schema,
  }

  try {
    const response = await reportsApi.generateReport(
      CROWDIN_PROJECT_ID,
      reportRequest
    )
    if (response.data.status === "created") {
      await checkReportStatus(response.data.identifier, fileId, language)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem generating the report for file ID ${fileId}: ${error.message}`
      )
    }
  }
}

async function checkReportStatus(
  identifier: string,
  fileId: number,
  language: string
): Promise<void> {
  try {
    const response = await reportsApi.checkReportStatus(
      CROWDIN_PROJECT_ID,
      identifier
    )
    if (response.data.status === "finished" && response.data.progress === 100) {
      console.log(`Report for identifier ${identifier} is finished`)
      await downloadReport(identifier, fileId, language)
    } else {
      console.log("Not ready")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await checkReportStatus(identifier, fileId, language)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem checking the report status for identifier ${identifier}: ${error.message}`
      )
    }
  }
}

async function downloadReport(
  identifier: string,
  fileId: number,
  language: string
): Promise<void> {
  console.log(`Starting download of report for file ID ${fileId}`)

  try {
    const response = await reportsApi.downloadReport(
      CROWDIN_PROJECT_ID,
      identifier
    )
    const jsonUrl = response.data.url
    console.log(jsonUrl)
    console.log(`Retrieved JSON URL for report of file ID ${fileId}`)

    const reportData: AxiosResponse<ReportData> = await axios.get(jsonUrl)
    console.log(`Downloaded report data for file ID ${fileId}`)
    console.log(reportData.data)

    await saveReportDataToJson(reportData.data, fileId, language)
    console.log(`Saved report data for file ID ${fileId} to JSON file`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem downloading the report for identifier ${identifier}: ${error.message}`
      )
    }
  }
}

async function loadExcludedTranslators(): Promise<{
  excludedNames: string[]
  excludedUsernames: string[]
  excludedPhrases: string[]
}> {
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

async function loadCombinedTranslators(): Promise<any[]> {
  let combinedData: any[] = []
  if (fs.existsSync(combinedFilePath)) {
    const rawData = fs.readFileSync(combinedFilePath, "utf8")
    combinedData = rawData ? JSON.parse(rawData) : []
  }
  return combinedData
}

function filterAndFormatData(data: any[]) {
  return data
    .filter(
      (userObj) =>
        !excludedTranslatorsGlobal.excludedNames.includes(userObj.user.name) &&
        !excludedTranslatorsGlobal.excludedUsernames.includes(
          userObj.user.username
        ) &&
        !excludedTranslatorsGlobal.excludedPhrases.some(
          (phrase) =>
            userObj.user.name.toLowerCase().includes(phrase) ||
            userObj.user.username.toLowerCase().includes(phrase)
        )
    )
    .map((userObj) => ({
      id: userObj.user.id,
      username: userObj.user.username,
      totalCosts: userObj.user.totalCosts,
      avatarUrl: userObj.user.avatarUrl,
    }))
}

async function ensureDataIsLoaded(): Promise<void> {
  if (
    excludedTranslatorsGlobal.excludedNames.length === 0 &&
    excludedTranslatorsGlobal.excludedUsernames.length === 0
  ) {
    excludedTranslatorsGlobal = await loadExcludedTranslators()
  }

  if (combinedDataGlobal === undefined || combinedDataGlobal.length === 0) {
    combinedDataGlobal = await loadCombinedTranslators()
  }
}

async function saveReportDataToJson(
  reportData: ReportData,
  fileId: number,
  language: string
): Promise<void> {
  // Make sure data is loaded
  await ensureDataIsLoaded()

  const formattedData = filterAndFormatData(reportData.data)

  // Find if the language data already exists in the array
  console.log(combinedDataGlobal)
  const languageData = combinedDataGlobal.find((data) => data.lang === language)

  if (languageData) {
    languageData.data.push({
      fileId: fileId.toString(),
      contributors: formattedData,
    })
  } else {
    combinedDataGlobal!.push({
      lang: language,
      data: [
        {
          fileId: fileId.toString(),
          contributors: formattedData,
        },
      ],
    })
  }

  // Write to the file every time
  // Might be optimized further by only writing once per batch, depending on the exact requirements
  try {
    await fs.promises.writeFile(
      combinedFilePath,
      JSON.stringify(combinedDataGlobal, null, 2)
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error writing to ${combinedFilePath}:`, error.message)
    }
  }
}

async function getTranslationCostsReports(translatedMarkdownPaths) {
  for (let lang in translatedMarkdownPaths) {
    const fileIds = await findFileIdsByPaths(
      translatedMarkdownPaths[lang],
      lang
    )

    // The CrowdinCode is often different from what we use in our repo
    const crowdinLangCode = await getCrowdinCode(lang)

    for (const fileId of fileIds) {
      if (fileId !== null) {
        await fetchTranslationCostsReport(fileId, crowdinLangCode)
      } else {
        console.log("Error: No file ID found for one of the paths")
      }
    }
  }
}

export default getTranslationCostsReports
