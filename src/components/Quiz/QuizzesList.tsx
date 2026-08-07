import React from "react"

import type { QuizKey, QuizzesSection, UserStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import allQuizzesData from "@/data/quizzes"

import { Stack } from "../ui/flex"
import { OrderedList } from "../ui/list"
import { Section } from "../ui/section"

import QuizItem from "./QuizItem"

type QuizzesListProps = {
  sectionId: string
  userStats: UserStats
  content: QuizzesSection[]
  headingId: string
  descriptionId: string
  quizHandler: (id: QuizKey) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList = ({
  sectionId,
  content,
  userStats,
  headingId,
  descriptionId,
  quizHandler,
  modalHandler,
}: QuizzesListProps) => (
  // data-flow="skip" so the flow rhythm doesn't add margins between the two
  // columns; spacing within the header column is set here instead.
  <Section id={sectionId} variant="responsiveFlex" data-flow="skip">
    <Stack className="gap-2 md:w-80 md:shrink-0 lg:w-96">
      <h2>{headingId}</h2>
      <p>{descriptionId}</p>
    </Stack>

    <OrderedList className="ms-0 w-full max-w-3xl list-none [counter-reset:list-counter]">
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
  </Section>
)

export default QuizzesList
