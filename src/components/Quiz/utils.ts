import { USER_STATS_KEY } from "../../constants"

import { CompletedQuizzes, QuizShareStats } from "../../types"

import allQuizzesData from "../../data/quizzes"

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

export const updateUserStats = ({
  average,
  completed,
  numberOfCorrectAnswers,
  quizKey,
  quizScore,
  setUserStats,
  userScore,
}) => {
  const userStats = JSON.parse(localStorage.getItem(USER_STATS_KEY)!)
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

// TODO: track event on matomo
export const shareOnTwitter = ({ score, total }: QuizShareStats): void => {
  // if (!quizData || !window) return
  //   trackCustomEvent({
  //     eventCategory: "Quiz widget",
  //     eventAction: "Other",
  //     eventName: "Share results",
  //   })
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
