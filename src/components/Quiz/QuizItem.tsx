import { useTranslation } from "next-i18next"

import type { QuizzesSection } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import GreenTickIcon from "../icons/quiz/green-tick-icon.svg"
import Translation from "../Translation"
import { Button } from "../ui/buttons/Button"
import { Stack } from "../ui/flex"
import { Tag } from "../ui/tag"

export type QuizzesListItemProps = Omit<QuizzesSection, "id"> & {
  isCompleted: boolean
  numberOfQuestions: number
  titleId: string
  handleStart: () => void
}

const QuizItem = ({
  level,
  isCompleted = false,
  titleId,
  numberOfQuestions,
  handleStart,
}: QuizzesListItemProps) => {
  const { t } = useTranslation("learn-quizzes")

  return (
    <li
      className={cn(
        "mb-0 border-b border-disabled px-0 py-4 font-bold text-body lg:px-4",
        isCompleted && "text-body-medium"
      )}
      style={{ counterIncrement: "list-counter" }}
    >
      <div className="flex flex-col justify-center lg:flex-row lg:items-center">
        <Stack className="mb-5 lg:mb-0">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                'text-body before:content-[counter(list-counter)_"._"]',
                isCompleted && "text-body-medium"
              )}
            >
              <Translation id={titleId} />
            </p>

            {/* Show green tick if quizz was completed only */}
            {isCompleted && <GreenTickIcon />}
          </div>

          {/* Labels */}
          <div className="flex gap-3">
            {/* number of questions - label */}
            <Tag className="lg:-ms-2">
              t(`${numberOfQuestions} ${t("questions")}`)
            </Tag>

            {/* difficulty - label */}
            <Tag>{level.toUpperCase()}</Tag>
          </div>
        </Stack>

        {/* Start Button */}
        <div className="w-full lg:w-auto">
          <Button
            variant="outline"
            className="w-full lg:w-auto"
            onClick={handleStart}
          >
            <Translation id="learn-quizzes:start" />
          </Button>
        </div>
      </div>
    </li>
  )
}

export default QuizItem
