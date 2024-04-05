import fs from "fs"
import { join } from "path"

import { TranslationCostReport } from "@/lib/types"

import { ALL_TIME_START, DATA_SAVE_PATH } from "./constants"
import {
  awaitFinishedReport,
  downloadJsonReport,
  generateReport,
  getLastMonth,
  getLastQuarter,
  getUrlFromReport,
  parseData,
} from "./utils"

import "dotenv/config"

const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

const dates = {
  month: {
    from: getLastMonth().from,
    to: getLastMonth().to,
  },
  quarter: {
    from: getLastQuarter().from,
    to: getLastQuarter().to,
  },
  allTime: {
    from: ALL_TIME_START,
    to: new Date().toISOString(),
  },
}

const reports = Object.keys(dates)

async function main() {
  // Log calculated dates being used for report generation
  console.table(dates)

  const summary = {}

  for (const report of reports) {
    // Generate a report for the given date range
    const reportId = await generateReport(
      projectId,
      dates[report].from,
      dates[report].to
    )

    // Log reportId's for each report
    console.log({ report, reportId })

    // Wait for report to finish generating
    await awaitFinishedReport(projectId, reportId)

    // Read data url from report
    const url = await getUrlFromReport(projectId, reportId)

    // Fetch JSON data from url
    const json: TranslationCostReport = await downloadJsonReport(url)

    // Parse data
    const data = parseData(json)

    // Write parsed data to file system
    const filePath = join(
      DATA_SAVE_PATH,
      report,
      `${report}-data.json`
    ).toLowerCase()
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    // Add report to summary table
    summary[report] = {
      reportId,
      from: dates[report].from,
      to: dates[report].to,
      filePath,
    }
  }

  // Write summary table
  fs.writeFileSync(
    join(DATA_SAVE_PATH, "leaderboard-import-summary.json"),
    JSON.stringify(summary, null, 2)
  )

  console.table(summary, ["filePath"])
}

main()

export default main
