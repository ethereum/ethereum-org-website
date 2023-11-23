import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useTranslation } from "next-i18next"

import { Question, Quiz, RawQuestion, RawQuiz } from "@/lib/interfaces"

import allQuizzesData from "@/data/quizzes"
import questionBank from "@/data/quizzes/questionBank"

import { QuizWidgetProps } from "."

export const useQuizWidget = ({
  quizKey,
}: Pick<QuizWidgetProps, "quizKey">) => {
  const { t } = useTranslation()

  const [quizData, setQuizData] = useState<Quiz | null>(null)

  const initialize = () => {
    setQuizData(null)

    const currentQuizKey =
      quizKey ||
      Object.keys(allQuizzesData).filter((quizUri) =>
        window?.location.href.includes(quizUri)
      )[0] ||
      null

    if (!currentQuizKey) return

    // Get quiz data from key, shuffle, then truncate if necessary
    const rawQuiz: RawQuiz = allQuizzesData[currentQuizKey]
    const questions: Array<Question> = rawQuiz.questions.map((id) => {
      const rawQuestion: RawQuestion = questionBank[id]
      return { id, ...rawQuestion }
    })
    const shuffledQuestions = shuffle(questions)
    const quiz: Quiz = {
      title: t(rawQuiz.title),
      questions: shuffledQuestions,
    }

    setQuizData(quiz)
  }

  useEffect(initialize, [quizKey, t])

  return { quizData }
}
