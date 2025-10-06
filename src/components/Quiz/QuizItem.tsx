import type { QuizzesSection } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { GreenTickIcon } from "../icons/quiz"
import Translation from "../Translation"
import { Button } from "../ui/buttons/Button"
import { Flex, Stack } from "../ui/flex"
import { ListItem } from "../ui/list"
import { Tag } from "../ui/tag"

import { useTranslation } from "@/hooks/useTranslation"

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
    <ListItem
      className={cn(
        isCompleted ? "text-body-medium" : "text-body",
        "mb-0 border-b border-disabled py-4 font-bold [counter-increment:_list-counter] lg:px-4"
      )}
    >
      <Flex className="justify-between max-lg:flex-col lg:items-center">
        <Stack className="max-lg:mb-5">
          <Flex className="items-center gap-2">
            <span className="before:content-[counter(list-counter)_'._']">
              <Translation id={titleId} />
            </span>

            {/* Show green tick if quizz was completed only */}
            {isCompleted && <GreenTickIcon />}
          </Flex>

          {/* Labels */}
          <Flex className="gap-3 font-normal">
            {/* number of questions - label */}
            <Tag className="lg:-ms-2">
              {t(`${numberOfQuestions} ${t("questions")}`)}
            </Tag>

            {/* difficulty - label */}
            <Tag>{level.toUpperCase()}</Tag>
          </Flex>
        </Stack>

        {/* Start Button */}
        <div className="max-lg:w-full">
          <Button
            variant="outline"
            className="max-lg:w-full"
            onClick={handleStart}
          >
            <Translation id="learn-quizzes:start" />
          </Button>
        </div>
      </Flex>
    </ListItem>
  )
}

export default QuizItem
