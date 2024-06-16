import allQuizzesData from "@/data/quizzes"
import questionBank from "@/data/quizzes/questionBank"

import { getTranslation } from "@/storybook-utils"

export const LAYER_2_QUIZ_KEY = "layer-2" as const

export const LAYER_2_QUIZ_TITLE = getTranslation(
  allQuizzesData[LAYER_2_QUIZ_KEY].title
)

// TODO: Can a util be created to extract this question data here and in prod?
export const layer2Questions = allQuizzesData[LAYER_2_QUIZ_KEY].questions.map(
  (id) => {
    const rawQuestion = questionBank[id]
    return { id, ...rawQuestion }
  }
)
