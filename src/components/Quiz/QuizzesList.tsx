import React from "react"

import type { QuizKey, QuizzesSection, UserStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import allQuizzesData from "@/data/quizzes"

import { Stack } from "../ui/flex"
import { OrderedList } from "../ui/list"

import QuizItem from "./QuizItem"

type QuizzesListProps = {
  userStats: UserStats
  content: QuizzesSection[]
  headingId: string
  descriptionId: string
  quizHandler: (id: QuizKey) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList = ({
  content,
  userStats,
  headingId,
  descriptionId,
  quizHandler,
  modalHandler,
}: QuizzesListProps) => (
  <Stack className="gap-8 pt-12 max-lg:px-8">
    <Stack className="gap-8">
      <h2>{headingId}</h2>
      <p>{descriptionId}</p>
    </Stack>

    <OrderedList className="m-0 list-none [counter-reset:_list-counter]">
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
  </Stack>
)

export default QuizzesList
