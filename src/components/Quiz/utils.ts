import { USER_STATS_KEY } from "../../pages/quizzes"
import allQuizzesData from "../../data/quizzes"

export const getTotalQuizzesPoints = () =>
  Object.values(allQuizzesData)
    .map((quiz) => quiz.questions.length)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

export const getNumberOfCompletedQuizzes = (quizzes) =>
  Object.values(quizzes).filter((v) => v).length

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

  // Update user score, average and save to local storage
  const newUserScore = userScore + numberOfCorrectAnswers
  const newAverage = average === 0 ? quizScore : (average + quizScore) / 2

  setUserStats({ ...userStats, score: newUserScore, average: newAverage })
  localStorage.setItem(
    USER_STATS_KEY,
    JSON.stringify({ ...userStats, score: newUserScore, average: newAverage })
  )

  // Update number of completed quizzes if needed
  if (quizScore === 100) {
    const completedQuizzes = JSON.parse(completed)
    const newCompleted = JSON.stringify({
      ...completedQuizzes,
      [quizKey!]: true,
    })

    setUserStats({ ...userStats, completed: newCompleted })
    localStorage.setItem(
      USER_STATS_KEY,
      JSON.stringify({ ...userStats, completed: newCompleted })
    )
  }
}
