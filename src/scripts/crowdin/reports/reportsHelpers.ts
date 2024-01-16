import { ReportsModel } from "@crowdin/crowdin-api-client"

import {
  CROWDIN_PROJECT_ID,
  FIRST_CROWDIN_CONTRIBUTION_DATE,
  REGULAR_RATES,
} from "../../../lib/constants"
import crowdinClient from "../api-client/crowdinClient"

import { ReportData, saveReportDataToJson } from "./fileHelpers"

const { reportsApi } = crowdinClient

function getPreviousDayISOString(): string {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  return now.toISOString()
}

export async function fetchTranslationCostsReport(
  fileId: number,
  crowdinLangCode: string
): Promise<void> {
  const dateTo = getPreviousDayISOString()

  // Todo: Remove ts-ignore when this PR gets merged
  // https://github.com/crowdin/crowdin-api-client-js/pull/282
  const schema: ReportsModel.TranslationCostSchema = {
    unit: "words",
    currency: "USD",
    mode: "simple",
    format: "json",
    groupBy: "user",
    regularRates: REGULAR_RATES,
    dateFrom: FIRST_CROWDIN_CONTRIBUTION_DATE,
    dateTo,
    languageId: crowdinLangCode,
    // @ts-expect-error Not part of the Crowdin schema type, which is deprecated anyway
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
      await checkReportStatus(response.data.identifier, fileId, crowdinLangCode)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem generating the report for file ID ${fileId}: ${error.message}`
      )
    }
  }
}

export async function checkReportStatus(
  identifier: string,
  fileId: number,
  crowdinLangCode: string
): Promise<void> {
  try {
    const response = await reportsApi.checkReportStatus(
      CROWDIN_PROJECT_ID,
      identifier
    )
    if (response.data.status === "finished" && response.data.progress === 100) {
      console.log(`Report for identifier ${identifier} is finished`)
      await downloadReport(identifier, fileId, crowdinLangCode)
    } else {
      console.log("Not ready")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await checkReportStatus(identifier, fileId, crowdinLangCode)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem checking the report status for identifier ${identifier}: ${error.message}`
      )
    }
  }
}

export async function downloadReport(
  identifier: string,
  fileId: number,
  crowdinLangCode: string
): Promise<void> {
  console.log(`Starting download of report for file ID ${fileId}`)

  try {
    const response = await reportsApi.downloadReport(
      CROWDIN_PROJECT_ID,
      identifier
    )
    const jsonUrl = response.data.url
    console.log(
      `${crowdinLangCode}—Retrieved JSON URL for report of file ID ${fileId}`
    )

    const reportReq = await fetch(jsonUrl)
    console.log(`Downloaded report data for file ID ${fileId}`)
    const reportData: ReportData = await reportReq.json()

    await saveReportDataToJson(reportData, fileId, crowdinLangCode)
    console.log(`Saved report data for file ID ${fileId} to JSON file`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `There was a problem downloading the report for identifier ${identifier}: ${error.message}`
      )
    }
  }
}
