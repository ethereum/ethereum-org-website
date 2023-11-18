import React from "react"
import { OrderedList } from "@chakra-ui/react"

import type { QuizzesSection, UserStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import allQuizzesData from "@/data/quizzes"

import QuizItem from "./QuizItem"

export interface QuizzesListProps {
  userStats: UserStats
  content: Array<QuizzesSection>
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList = ({
  content,
  userStats,
  quizHandler,
  modalHandler,
}: QuizzesListProps) => (
  <OrderedList m={0} listStyleType="none" sx={{ counterReset: "list-counter" }}>
    {content.map((listItem) => {
      const handleStart = () => {
        quizHandler(listItem.id)
        modalHandler(true)

        trackCustomEvent({
          eventCategory: "quiz_hub_events",
          eventAction: "quizzes click",
          eventName: `${listItem.id}`,
        })
      }

      return (
        <QuizItem
          key={listItem.id}
          {...listItem}
          isCompleted={userStats.completed[listItem.id]?.[0]}
          numberOfQuestions={allQuizzesData[listItem.id].questions.length}
          titleId={allQuizzesData[listItem.id].title}
          handleStart={handleStart}
        />
      )
    })}
  </OrderedList>
)

export default QuizzesList
