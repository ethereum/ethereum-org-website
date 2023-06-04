import { USER_STATS_KEY } from "../../constants"

import { CompletedQuizzes, QuizShareStats } from "../../types"

import allQuizzesData, {
  ethereumBasicsQuizzes,
  usingEthereumQuizzes,
} from "../../data/quizzes"

export const getTotalQuizzesPoints = () =>
  Object.values(allQuizzesData)
    .map((quiz) => quiz.questions.length)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

export const getNumberOfCompletedQuizzes = (quizzes: CompletedQuizzes) =>
  Object.values(quizzes)
    .map((v) => v[0])
    .filter((v) => v).length

export const getNextQuiz = (currentQuiz?: string) => {
  const allQuizzes = [...ethereumBasicsQuizzes, ...usingEthereumQuizzes]
  const nextQuiz = allQuizzes.find((quiz) => quiz.id === currentQuiz)

  return nextQuiz ? nextQuiz.next : undefined
}

export const updateUserStats = ({
  quizKey,
  quizScore,
  numberOfCorrectAnswers,
  setUserStats,
}) => {
  // Read userStats from localStorage as quiz could be standalone (out of Quiz Hub page)
  const userStats = JSON.parse(localStorage.getItem(USER_STATS_KEY)!)
  const { score: userScore, average, completed } = userStats
  const completedQuizzes = JSON.parse(completed)
  // Get previous score on quiz to compare on retry, if previous score is higher then keep it
  const lastScore = completedQuizzes[quizKey][1]
  // Update user score, average and save to local storage
  const newUserScore = userScore + numberOfCorrectAnswers - lastScore
  const newAverage = [...average, quizScore]
  const newCompleted = JSON.stringify({
    ...completedQuizzes,
    [quizKey!]: [
      quizScore === 100,
      quizScore > lastScore ? numberOfCorrectAnswers : lastScore,
    ],
  })

  if (numberOfCorrectAnswers > lastScore) {
    setUserStats({
      ...userStats,
      score: newUserScore,
      average: newAverage,
      completed: newCompleted,
    })

    localStorage.setItem(
      USER_STATS_KEY,
      JSON.stringify({
        ...userStats,
        score: newUserScore,
        average: newAverage,
        completed: newCompleted,
      })
    )
  }
}

export const shareOnTwitter = ({ score, total }: QuizShareStats): void => {
  const url = "https://ethereum.org/quizzes"
  const hashtags = ["ethereumquiz", "ethereum", "quiz"]
  const tweet =
    score > 0
      ? `${encodeURI(
          `I took Ethereum quizzes on ethereum.org and overall scored ${score} out of ${total}! Try it yourself at ${url}`
        )}`
      : `${encodeURI(
          `How well do you know Ethereum? Check out these Ethereum quizzes on ethereum.org: ${url}`
        )}`

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}
