import { fetchRetry } from "./fetchRetry"

export interface QuizStatsData {
  /** Mean of the correct/incorrect event values, as a percentage */
  averageScore: number
  /** Total "Question answered" events */
  questionsAnswered: number
  /** Retries as a percentage of questions answered */
  retryRate: number
  timestamp: number
}

/** Matomo Events API row (only the fields we read) */
type MatomoEventAction = {
  label: string
  nb_events: number
  sum_event_value?: number
}

// Set by QuizButtonGroup: "Question answered" carries eventValue 1 (correct) or
// 0 (incorrect), so the mean of those values is the collective score.
const ANSWERED_LABEL = "Question answered"
const RETRY_LABEL = "Retry question"

export async function fetchQuizStats(): Promise<QuizStatsData> {
  const matomoUrl = process.env.MATOMO_URL
  const siteId = process.env.MATOMO_SITE_ID
  const apiToken = process.env.MATOMO_API_TOKEN

  if (!matomoUrl || !siteId || !apiToken) {
    throw new Error(
      "Missing MATOMO_URL, MATOMO_SITE_ID or MATOMO_API_TOKEN; cannot fetch quiz stats"
    )
  }

  console.log("Starting quiz stats fetch")

  // Lifetime totals, so the figures read as "since the quizzes launched"
  const params = new URLSearchParams({
    module: "API",
    method: "Events.getAction",
    idSite: siteId,
    period: "range",
    date: "2019-01-01,today",
    filter_limit: "-1",
    format: "JSON",
    token_auth: apiToken,
  })

  const response = await fetchRetry(`${matomoUrl}/index.php?${params}`)

  if (!response.ok) {
    throw new Error(
      `Matomo Events API responded with status ${response.status}`
    )
  }

  const rows: MatomoEventAction[] = await response.json()

  if (!Array.isArray(rows)) {
    throw new Error("Unexpected Matomo Events API response shape")
  }

  const answered = rows.find((row) => row.label === ANSWERED_LABEL)
  const retried = rows.find((row) => row.label === RETRY_LABEL)

  if (!answered?.nb_events) {
    throw new Error(`No "${ANSWERED_LABEL}" events returned by Matomo`)
  }

  const questionsAnswered = answered.nb_events
  const averageScore =
    ((answered.sum_event_value ?? 0) / questionsAnswered) * 100
  const retryRate = ((retried?.nb_events ?? 0) / questionsAnswered) * 100

  const data: QuizStatsData = {
    averageScore,
    questionsAnswered,
    retryRate,
    timestamp: Date.now(),
  }

  console.log("Successfully fetched quiz stats", data)

  return data
}
