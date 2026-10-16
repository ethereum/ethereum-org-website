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
  // data-flow="skip" so the flow rhythm doesn't add margins between columns.
  // Grid, not the responsiveFlex variant: `flex-basis: 0` is floored by an
  // item's own padding/border, so this bordered list and the padded callout
  // below landed on different 1/3 splits. `minmax(0, 1fr)` tracks don't.
  <Section
    id={sectionId}
    className="grid gap-space-2x md:grid-cols-3"
    data-flow="skip"
  >
    {/* Sticks alongside the list once the two columns exist. `self-start` +
        `h-fit` are required: a stretched grid item fills the row and has no
        room to travel. `top-24` clears the sticky nav (h-19). */}
    <Stack className="h-fit gap-2 self-start md:sticky md:top-24">
      <h2>{headingId}</h2>
      <p>{descriptionId}</p>
    </Stack>

    <OrderedList className="ms-0 mb-0 list-none overflow-hidden rounded-base border bg-background [counter-reset:list-counter] md:col-span-2">
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
