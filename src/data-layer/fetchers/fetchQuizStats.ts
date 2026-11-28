import allQuizzesData from "@/data/quizzes"

import { fetchRetry } from "./fetchRetry"

export interface QuizStatsEntry {
  /** Mean of the correct/incorrect event values, as a percentage */
  averageScore: number
  /** Estimated lifetime runs; see the median note in fetchQuizStats */
  timesTaken: number
}

export interface QuizStatsData {
  /** Mean of the correct/incorrect event values, as a percentage */
  averageScore: number
  /** Total "Question answered" events */
  questionsAnswered: number
  /** Retries as a percentage of questions answered */
  retryRate: number
  /** Per-quiz figures keyed by quiz id. A quiz nobody has taken is omitted. */
  byQuiz: Record<string, QuizStatsEntry>
  timestamp: number
}

/** Matomo Events API row (only the fields we read) */
type MatomoEventRow = {
  label: string
  /** Set on flattened secondaryDimension=eventName rows */
  Events_EventName?: string
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

// Each "Question answered" event names the question it belongs to, not the quiz
// (QuizButtonGroup sends `QID: <question id>`), so per-quiz figures are derived
// from each quiz's question list. Questions shared by two quizzes -- currently
// only wallets-3 -- count toward both.
const QID_PREFIX = "QID: "

const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  return sorted.length % 2
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

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

  const report = async (
    method: string,
    extraParams: Record<string, string> = {}
  ): Promise<MatomoEventRow[]> => {
    const params = new URLSearchParams({
      module: "API",
      method,
      idSite: siteId,
      period: "range",
      // Lifetime totals, so the figures read as "since the quizzes launched"
      date: "2019-01-01,today",
      filter_limit: "-1",
      format: "JSON",
      token_auth: apiToken,
      ...extraParams,
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

  const [actionRows, nameRows, questionRowList] = await Promise.all([
    report("Events.getAction"),
    report("Events.getName"),
    // Events.getName folds all but the top 500 names into "Others", which drops
    // most QID rows. The "Question answered" action's name subtable is not
    // truncated, so read it flattened and filtered to that action server-side.
    report("Events.getAction", {
      secondaryDimension: "eventName",
      flat: "1",
      filter_column: "label",
      filter_pattern: `^${ANSWERED_ACTION} - ${QID_PREFIX}`,
    }),
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

  // Same reasoning, and `undefined` rather than falsy: a lifetime sum of 0 is a
  // real (if implausible) result, an absent field is a dropped event value.
  if (answered.sum_event_value === undefined) {
    throw new Error(
      `No event value on the "${ANSWERED_ACTION}" row returned by Matomo`
    )
  }

  const questionsAnswered = answered.nb_events
  const averageScore = (answered.sum_event_value / questionsAnswered) * 100
  const retryRate = (retried.nb_events / questionsAnswered) * 100

  const questionRows = new Map(
    questionRowList.flatMap((row) =>
      row.Events_EventName?.startsWith(QID_PREFIX)
        ? [[row.Events_EventName.slice(QID_PREFIX.length), row] as const]
        : []
    )
  )

  if (!questionRows.size) {
    throw new Error(`No "${QID_PREFIX}" rows returned by Matomo`)
  }

  const byQuiz: Record<string, QuizStatsEntry> = {}

  for (const [quizId, quiz] of Object.entries(allQuizzesData)) {
    const rows = quiz.questions
      .map((questionId) => questionRows.get(questionId))
      .filter((row) => !!row)

    const quizAnswered = rows.reduce((sum, row) => sum + row.nb_events, 0)

    // Omit rather than store zeros: a quiz that just shipped has no data, which
    // is not the same as a quiz everyone got wrong.
    if (!quizAnswered) continue

    const quizCorrect = rows.reduce(
      (sum, row) => sum + (row.sum_event_value ?? 0),
      0
    )

    byQuiz[quizId] = {
      averageScore: (quizCorrect / quizAnswered) * 100,
      // Questions are shuffled per run, so each is answered about once per run
      // and any single question's count approximates the number of runs.
      // Median rather than sum (which just scales with question count), max (a
      // question borrowed by another quiz carries its traffic too -- security
      // borrows wallets-3) or mean (dragged down by questions added after the
      // quiz launched).
      timesTaken: median(rows.map((row) => row.nb_events)),
    }
  }

  const data: QuizStatsData = {
    averageScore,
    questionsAnswered,
    retryRate,
    byQuiz,
    timestamp: Date.now(),
  }

  console.log("Successfully fetched quiz stats", {
    averageScore,
    questionsAnswered,
    retryRate,
    quizzesWithData: Object.keys(byQuiz).length,
  })

  return data
}
