import { CostLeaderboardData, TranslationCostReport } from "@/lib/types"

import crowdin from "../api-client/crowdinClient"

import { ONE, TIMEOUT_DURATION_MS, ZERO } from "./constants"

export const getLastQuarter = (): { from: string; to: string } => {
  const now = new Date()

  // Months per quarter
  const MPQ = 3

  // Get current quarter
  const currentQ = Math.floor(now.getUTCMonth() / MPQ)

  // Get start of current quarter
  const currentQStart = new Date(now.getUTCFullYear(), currentQ * MPQ)
  currentQStart.setUTCHours(0)

  // Get start of last quarter
  const lastQStart = new Date(currentQStart)
  lastQStart.setUTCMonth(lastQStart.getUTCMonth() - MPQ)

  // Return ISO strings of start and end of last quarter
  return {
    from: lastQStart.toISOString(),
    to: currentQStart.toISOString(),
  }
}

export const getLastMonth = (): { from: string; to: string } => {
  const now = new Date()
  // Get current month
  const currentM = now.getUTCMonth()
  // Get start of current month
  const currentMStart = new Date(now.getUTCFullYear(), currentM)
  currentMStart.setUTCDate(1)
  currentMStart.setUTCHours(0)

  // Get start of last month
  const lastMStart = new Date(currentMStart)
  lastMStart.setUTCMonth(lastMStart.getUTCMonth() - 1)

  // Return ISO strings of start and end of last month
  return {
    from: lastMStart.toISOString(),
    to: currentMStart.toISOString(),
  }
}

export const generateReport = async (
  projectId: number,
  from: string,
  to: string
): Promise<string> => {
  const generatedReport = await crowdin.reportsApi.generateReport(projectId, {
    name: "translation-costs-pe",
    schema: {
      unit: "words",
      format: "json",
      dateFrom: from,
      dateTo: to,
      baseRates: {
        fullTranslation: ONE,
        proofread: ONE,
      },
      individualRates: [],
      netRateSchemes: {
        tmMatch: [
          { matchType: "perfect", price: ZERO },
          { matchType: "100", price: ZERO },
        ],
        mtMatch: [{ matchType: "100", price: ONE }],
        suggestionMatch: [{ matchType: "100", price: ONE }],
      },
      groupBy: "user",
    },
  })
  if (!generatedReport)
    throw new Error(
      "getLeaderboardCosts.ts > Error generating report for translation costs"
    )
  return generatedReport.data.identifier
}

/**
 * Checks the status of a report in the Crowdin API.
 * @param projectId - The ID of the project.
 * @param reportId - The ID of the report.
 * @returns A boolean indicating whether the report status is "finished".
 * @throws An error if the report status is not acceptable.
 */
export const checkReportStatus = async (
  projectId: number,
  reportId: string
) => {
  const [FINISHED, IN_PROGRESS] = ["finished", "in_progress"]
  const checkReport = await crowdin.reportsApi.checkReportStatus(
    projectId,
    reportId
  )

  if (![FINISHED, IN_PROGRESS].includes(checkReport.data.status))
    throw new Error(`Status not acceptable. ReportId: ${reportId}`)

  return checkReport.data.status === FINISHED
}

export const getUrlFromReport = async (projectId: number, reportId: string) => {
  const readReport = await crowdin.reportsApi.downloadReport(
    projectId,
    reportId
  )
  return readReport.data.url
}

export const downloadJsonReport = async (
  url: string
): Promise<TranslationCostReport> => {
  const reportResponse = await fetch(url)

  if (!reportResponse.ok)
    throw new Error(
      `getLeaderboardCosts.ts > Error fetching report from report url: ${url}`
    )

  const reportData = (await reportResponse.json()) as TranslationCostReport

  return reportData
}

export const parseData = (json: TranslationCostReport): CostLeaderboardData[] =>
  json.data
    .map(({ user, languages, totalCosts }) => {
      const { username, fullName, avatarUrl } = user
      const langs = languages
        .sort((a, b) => b.totalCosts - a.totalCosts)
        .map(({ language: { name } }) => name)
      const _totalCosts = Math.floor(totalCosts)
      return { username, fullName, avatarUrl, totalCosts: _totalCosts, langs }
    })
    .filter(({ username, fullName }) => {
      // TODO: Remove specific user checks once Acolad has updated their usernames
      const lUser = username.toLowerCase()
      const lFull = (username + fullName).toLowerCase()
      const isBlocked =
        lUser.includes("lqs_") ||
        lUser.includes("removed_user") ||
        lFull.includes("aco_") ||
        lFull.includes("acc_") ||
        [
          "ethdotorg",
          "finnish_sandberg",
          "norwegian_sandberg",
          "swedish_sandberg",
        ].includes(lUser)
      return !isBlocked
    })

export const awaitFinishedReport = async (
  projectId: number,
  reportId: string
) => {
  const start = new Date().getTime()
  let now = start
  while (
    !(await checkReportStatus(projectId, reportId)) &&
    now - start < TIMEOUT_DURATION_MS
  ) {
    now = new Date().getTime()
  }
}
