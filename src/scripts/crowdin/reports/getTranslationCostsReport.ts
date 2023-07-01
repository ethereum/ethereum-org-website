import fs from "fs"
import axios, { AxiosResponse } from "axios"

import { ReportsModel } from "@crowdin/crowdin-api-client"

import crowdinClient from "../api-client/crowdinClient"
import {
  CROWDIN_PROJECT_ID,
  FIRST_CROWDIN_CONTRIBUTION_DATE,
} from "../../../constants"
import { findFileIdsByPaths } from "../utils"

const { reportsApi } = crowdinClient

interface UserData {
  userId: number
  username: string
  totalCosts: number
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
    console.log(`Retrieved JSON URL for report of file ID ${fileId}`)

    const reportData: AxiosResponse<ReportData> = await axios.get(jsonUrl)
    console.log(`Downloaded report data for file ID ${fileId}`)

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

async function saveReportDataToJson(
  reportData: ReportData,
  fileId: number,
  language: string
): Promise<void> {
  let combinedData: Record<number, UserData[]>
  const filename = `${language}-translators-by-file-id.json`

  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, "{}", "utf8")
  }

  try {
    const rawData = fs.readFileSync(filename, "utf8")
    combinedData = rawData ? JSON.parse(rawData) : {}
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error reading from " + filename + ":", error.message)
    }
    combinedData = {}
  }

  const formattedData = reportData.data.map((user) => ({
    userId: user.userId,
    username: user.username,
    totalCosts: user.totalCosts,
  }))

  // Todo: Find out if we want to order the contributors in any particular way
  // formattedData.sort((a, b) => b.totalCosts - a.totalCosts)

  combinedData[fileId] = formattedData

  try {
    await fs.promises.writeFile(filename, JSON.stringify(combinedData, null, 2))
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error writing to ${filename}:`, error.message)
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
