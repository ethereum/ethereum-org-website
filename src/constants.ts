import { getTotalQuizzesPoints } from "./components/Quiz/utils"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "./data/quizzes"

export const GATSBY_FUNCTIONS_PATH = process.env.GATSBY_FUNCTIONS_PATH || "/api"

// Quiz Hub
export const PASSING_QUIZ_SCORE = 65
export const USER_STATS_KEY = "quizzes-stats"
export const INITIAL_QUIZ = "what-is-ethereum"
export const TOTAL_QUIZZES_NUMBER =
  ethereumBasicsQuizzes.length + usingEthereumQuizzes.length
export const TOTAL_QUIZZES_POINTS = getTotalQuizzesPoints()
