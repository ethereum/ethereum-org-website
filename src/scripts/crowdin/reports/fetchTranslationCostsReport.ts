import fs from "fs"
import path from "path"
import axios from "axios"

// Constants
import { CROWDIN_PROJECT_ID, CROWDIN_API_MAX_LIMIT } from "../../../constants"
import { HEADERS } from "../api-config"

const REPORT_SCHEMA = {
  unit: "words",
  currency: "USD",
  mode: "simple",
  format: "json",
  groupBy: "user",
  regularRates: [
    {
      mode: "tm_match",
      // Todo: Email Crowdin re: API?
      // 1.00 breaks API call as it say it isnt a float...
      value: 1.01,
    },
    {
      mode: "no_match",
      value: 1.01,
    },
  ],
  // Todo: Get first date of translations
  dateFrom: "2021-09-23T07:00:14+00:00",
}

async function fetchTranslationCostsReport(fileId, language) {
  const now = new Date()
  now.setDate(now.getDate() - 1) // set the date to one day in the past (yesterday)
  const dateTo = now.toISOString()

  // Is 'name=translation-costs' necessary in URL?
  const url =
    "https://api.crowdin.com/api/v2/projects/363359/reports?name=translation-costs"
  const body = {
    name: "translation-costs",
    schema: {
      ...REPORT_SCHEMA,
      dateTo: dateTo,
      languageId: language,
      fileIds: [fileId],
    },
  }

  try {
    const response = await axios.post(url, body, { headers: HEADERS })
    if (response.data.data.status === "created") {
      await checkReportStatus(response.data.data.identifier, fileId, language)
    }
  } catch (error) {
    // @ts-ignore
    console.log(
      `There was a problem generating the report for file ID ${fileId}: ` +
        JSON.stringify(error.response.data, null, 2)
    )
  }
}

async function checkReportStatus(identifier, fileId, language) {
  const url = `https://api.crowdin.com/api/v2/projects/363359/reports/${identifier}`

  try {
    const response = await axios.get(url, { headers: HEADERS })
    if (
      response.data.data.status === "finished" &&
      response.data.data.progress === 100
    ) {
      // console.log(`Report for identifier ${identifier} is finished`);
      await downloadReport(identifier, fileId, language)
    } else {
      // Wait 1 second and check again
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await checkReportStatus(identifier, fileId, language)
    }
  } catch (error) {
    // @ts-ignore
    console.log(
      `There was a problem checking the report status for identifier ${identifier}: ` +
        error.message
    )
  }
}

async function downloadReport(identifier, fileId, language) {
  // console.log(`Starting download of report for file ID ${fileId}`);

  try {
    const url = `https://api.crowdin.com/api/v2/projects/363359/reports/${identifier}/download`
    const response = await axios.get(url, { headers: HEADERS })

    // Extract the URL of the JSON file from the response
    const jsonUrl = response.data.data.url
    // console.log(`Retrieved JSON URL for report of file ID ${fileId}`);

    // Download the JSON file
    const reportData = await axios.get(jsonUrl)
    // console.log(`Downloaded report data for file ID ${fileId}`);

    // Save the report data to the JSON file
    await saveReportData(reportData.data, fileId, language)
    // console.log(`Saved report data for file ID ${fileId} to JSON file`);
  } catch (error) {
    // @ts-ignore
    console.log(
      `There was a problem downloading the report for identifier ${identifier}: ` +
        error.message
    )
  }
}

async function saveReportData(reportData, fileId, language) {
  let combinedData
  // console.log("Language in saveReportData", language)
  const filename = `${language}-translators-by-file-id.json`

  // Check if the file exists and create it if not
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, "{}", "utf8")
  }

  try {
    const rawData = fs.readFileSync(filename, "utf8")
    combinedData = rawData ? JSON.parse(rawData) : {}
  } catch (error) {
    console.log("Error reading from " + filename + ":", error)
    combinedData = {}
  }

  // Filter and format the report data
  const formattedData = reportData.data.map((user) => ({
    userId: user.user.id,
    username: user.user.username,
    totalCosts: user.user.totalCosts,
  }))

  // Sort by highest cost first
  formattedData.sort((a, b) => b.totalCosts - a.totalCosts)

  // Replace the data for this fileId (even if it already exists)
  combinedData[fileId] = formattedData

  // Write the updated data back to the file
  fs.writeFileSync(filename, JSON.stringify(combinedData, null, 2))
}

export default fetchTranslationCostsReport
