import crowdin from "@crowdin/crowdin-api-client"

import type { CostLeaderboardData } from "@/lib/types"

// Translatathon date range: August 25-31, 2025
const TRANSLATATHON_START = "2025-08-25T00:00:00Z"
const TRANSLATATHON_END = "2025-08-31T23:59:59Z"

// Timeout for report generation (5 minutes)
const REPORT_TIMEOUT_MS = 5 * 60 * 1000

const crowdinClient = new crowdin({
  token: process.env.CROWDIN_API_KEY || "",
})

// Try different schema names for contributor reports
const SCHEMA_ATTEMPTS = [
  "contribution-raw-data",
  "translation-costs-pe",
  "costs-estimation-pe",
] as const

const generateContributorReport = async (
  projectId: number,
  schemaName: (typeof SCHEMA_ATTEMPTS)[number]
): Promise<string | null> => {
  try {
    let schema

    if (schemaName === "contribution-raw-data") {
      schema = {
        unit: "words",
        format: "json",
        dateFrom: TRANSLATATHON_START,
        dateTo: TRANSLATATHON_END,
        mode: "translations",
      }
    } else if (schemaName === "translation-costs-pe") {
      schema = {
        unit: "words",
        format: "json",
        dateFrom: TRANSLATATHON_START,
        dateTo: TRANSLATATHON_END,
        baseRates: {
          fullTranslation: 1,
          proofread: 1,
        },
        individualRates: [],
        netRateSchemes: {
          tmMatch: [
            { matchType: "perfect", price: 0 },
            { matchType: "100", price: 0 },
          ],
          mtMatch: [{ matchType: "100", price: 1 }],
          suggestionMatch: [{ matchType: "100", price: 1 }],
        },
        groupBy: "user",
      }
    } else {
      schema = {
        unit: "words",
        format: "json",
        dateFrom: TRANSLATATHON_START,
        dateTo: TRANSLATATHON_END,
      }
    }

    const response = await crowdinClient.reportsApi.generateReport(projectId, {
      name: schemaName,
      schema,
    })
    return response.data.identifier
  } catch (error) {
    console.warn(`Schema ${schemaName} failed for project ${projectId}:`, error)
    return null
  }
}

const waitForReport = async (
  projectId: number,
  reportId: string
): Promise<boolean> => {
  const startTime = Date.now()

  while (Date.now() - startTime < REPORT_TIMEOUT_MS) {
    try {
      const status = await crowdinClient.reportsApi.checkReportStatus(
        projectId,
        reportId
      )

      if (status.data.status === "finished") {
        return true
      } else if (status.data.status === "failed") {
        console.error(`Report ${reportId} failed for project ${projectId}`)
        return false
      }

      // Wait 5 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 5000))
    } catch (error) {
      console.error(`Error checking report status:`, error)
      return false
    }
  }

  console.error(`Report ${reportId} timed out for project ${projectId}`)
  return false
}

const downloadReport = async (
  projectId: number,
  reportId: string
): Promise<unknown[]> => {
  try {
    const downloadResponse = await crowdinClient.reportsApi.downloadReport(
      projectId,
      reportId
    )

    // Use no-store to avoid Next.js cache size issues with large reports
    const reportResponse = await fetch(downloadResponse.data.url, {
      cache: "no-store",
    })
    if (!reportResponse.ok) {
      throw new Error(`Failed to download report: ${reportResponse.statusText}`)
    }

    const reportData = (await reportResponse.json()) as { data?: unknown[] }
    return reportData.data || []
  } catch (error) {
    console.error(`Error downloading report for project ${projectId}:`, error)
    return []
  }
}

const fetchProjectTranslators = async (
  projectId: number
): Promise<CostLeaderboardData[]> => {
  // Try different schema names
  for (const schemaName of SCHEMA_ATTEMPTS) {
    const reportId = await generateContributorReport(projectId, schemaName)
    if (!reportId) continue

    const isReady = await waitForReport(projectId, reportId)
    if (!isReady) continue

    const reportData = await downloadReport(projectId, reportId)

    // Transform report data to CostLeaderboardData format
    return reportData.map((item: unknown) => {
      const data = item as Record<string, unknown>
      const user = (data.user as Record<string, unknown>) || {}
      const languages = (data.languages as unknown[]) || []

      return {
        username:
          (user.username as string) || (data.username as string) || "unknown",
        fullName: (user.fullName as string) || (data.fullName as string) || "",
        avatarUrl:
          (user.avatarUrl as string) || (data.avatarUrl as string) || "",
        totalCosts: Math.floor(
          (data.targetWords as number) ||
            (data.words as number) ||
            (data.totalWords as number) ||
            (data.totalCosts as number) ||
            0
        ),
        langs: languages
          .map((lang: unknown) => {
            const langObj = lang as Record<string, unknown>
            return (langObj.name as string) || (lang as string) || ""
          })
          .filter(Boolean),
      }
    })
  }

  console.error(`All schema attempts failed for project ${projectId}`)
  return []
}

export async function fetchTranslatathonTranslators(): Promise<
  CostLeaderboardData[]
> {
  try {
    const projectIds =
      process.env.TRANSLATATHON_PROJECT_IDS?.split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id)) || []

    if (projectIds.length === 0) {
      console.error("No valid project IDs found in TRANSLATATHON_PROJECT_IDS")
      return []
    }

    console.log(`Fetching translators from ${projectIds.length} projects`)

    // Fetch data from all projects
    const allProjectData = await Promise.all(
      projectIds.map((projectId) => fetchProjectTranslators(projectId))
    )

    // Aggregate translators across projects
    const translatorMap = new Map<string, CostLeaderboardData>()

    for (const projectData of allProjectData) {
      for (const translator of projectData) {
        const { username, totalCosts, langs, fullName, avatarUrl } = translator

        if (!username || username === "unknown") continue

        // Filter out bot/internal accounts (reuse existing filters)
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

        if (isBlocked) continue

        const existing = translatorMap.get(username)
        if (existing) {
          // Merge data from multiple projects
          existing.totalCosts += totalCosts
          existing.langs = [...new Set([...existing.langs, ...langs])]
        } else {
          translatorMap.set(username, {
            username,
            fullName,
            avatarUrl,
            totalCosts,
            langs,
          })
        }
      }
    }

    const result = Array.from(translatorMap.values())
      .filter((translator) => translator.totalCosts > 0)
      .sort((a, b) => b.totalCosts - a.totalCosts)

    console.log(`Found ${result.length} translators with total contributions`)
    return result
  } catch (error) {
    console.error("Error fetching translatathon translators:", error)
    return []
  }
}
