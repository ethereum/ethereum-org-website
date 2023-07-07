import { ReportsModel } from "@crowdin/crowdin-api-client"

export const SITE_URL = "https://ethereum.org" as const
export const DISCORD_PATH = "/discord/" as const
export const GATSBY_FUNCTIONS_PATH = process.env.GATSBY_FUNCTIONS_PATH || "/api"

// Quiz Hub
export const PROGRESS_BAR_GAP = "4px"
export const PASSING_QUIZ_SCORE = 65
export const USER_STATS_KEY = "quizzes-stats"
export const INITIAL_QUIZ = "what-is-ethereum"
export const TOTAL_QUIZ_QUESTIONS_ANSWERED = 100000
export const TOTAL_QUIZ_AVERAGE_SCORE = 67.4
export const TOTAL_QUIZ_RETRY_RATE = 15.6

// Crowdin
export const CROWDIN_PROJECT_ID = 363359
export const CROWDIN_API_MAX_LIMIT = 500
export const FIRST_CROWDIN_CONTRIBUTION_DATE = "2019-07-01T00:00:00+00:00"
export const REGULAR_RATES: ReportsModel.RegularRate[] = [
  {
    mode: "tm_match",
    value: 1.01,
  },
  {
    mode: "no_match",
    value: 1.01,
  },
]
