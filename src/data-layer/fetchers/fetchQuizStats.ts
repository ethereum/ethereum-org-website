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
type MatomoEventRow = {
  label: string
  nb_events: number
  sum_event_value?: number
}

// The two figures live at different levels of Matomo's event hierarchy, so they
// need different report methods. QuizButtonGroup sends the answer as
// action "Question answered" (with eventValue 1 correct / 0 incorrect), but the
// retry as action "Other" with *name* "Retry question" -- alongside "Submit
// results", which shares that action. So the retry count is only addressable by
// name, and Events.getAction never returns a row labelled "Retry question".
const ANSWERED_ACTION = "Question answered"
const RETRY_NAME = "Retry question"

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

  const report = async (method: string): Promise<MatomoEventRow[]> => {
    // Lifetime totals, so the figures read as "since the quizzes launched"
    const params = new URLSearchParams({
      module: "API",
      method,
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
        `Matomo ${method} responded with status ${response.status}`
      )
    }

    const rows = await response.json()

    if (!Array.isArray(rows)) {
      throw new Error(`Unexpected Matomo ${method} response shape`)
    }

    return rows
  }

  const [actionRows, nameRows] = await Promise.all([
    report("Events.getAction"),
    report("Events.getName"),
  ])

  const answered = actionRows.find((row) => row.label === ANSWERED_ACTION)
  const retried = nameRows.find((row) => row.label === RETRY_NAME)

  if (!answered?.nb_events) {
    throw new Error(`No "${ANSWERED_ACTION}" events returned by Matomo`)
  }

  // Never default a missing row to zero: that is indistinguishable from a real
  // zero, which is how the previous hard-coded figures went stale unnoticed.
  if (!retried) {
    throw new Error(`No "${RETRY_NAME}" row returned by Matomo`)
  }

  const questionsAnswered = answered.nb_events
  const averageScore =
    ((answered.sum_event_value ?? 0) / questionsAnswered) * 100
  const retryRate = (retried.nb_events / questionsAnswered) * 100

  const data: QuizStatsData = {
    averageScore,
    questionsAnswered,
    retryRate,
    timestamp: Date.now(),
  }

  console.log("Successfully fetched quiz stats", data)

  return data
}
