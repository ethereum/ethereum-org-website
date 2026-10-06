import { useTranslations } from "next-intl"

import type { QuizLevel, QuizzesSection } from "@/lib/types"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"

import { GreenTickIcon } from "../icons/quiz"
import { Button } from "../ui/buttons/Button"
import { Flex, Stack } from "../ui/flex"
import { ListItem } from "../ui/list"
import { Tag, type TagProps } from "../ui/tag"

const LEVEL_STATUS: Record<QuizLevel, NonNullable<TagProps["status"]>> = {
  beginner: "tag-green",
  intermediate: "tag-yellow",
  advanced: "tag-red",
}

// Quiz titles are common-namespace keys, except those pointing into
// learn-quizzes with this legacy prefix.
const LEARN_QUIZZES_PREFIX = "learn-quizzes:"

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
  const t = useTranslations("learn-quizzes")
  const tCommon = useTranslations("common")

  const title = titleId.startsWith(LEARN_QUIZZES_PREFIX)
    ? t(titleId.slice(LEARN_QUIZZES_PREFIX.length))
    : tCommon(titleId)

  return (
    // The whole row is clickable via LinkOverlay's ::before, the same pattern
    // CardList uses. Overlaying the real Button keeps one tab stop and native
    // keyboard handling, which a click handler on the row would not.
    <LinkBox asChild>
      <ListItem
        className={cn(
          isCompleted ? "text-body-medium" : "text-body",
          "m-0 flex justify-between gap-4 p-4 font-bold transition-colors",
          "not-last:border-b hover:bg-background-highlight",
          "[counter-increment:list-counter] max-sm:flex-col sm:items-center"
        )}
      >
        <Stack>
          <Flex className="items-center gap-2">
            <span className="before:content-[counter(list-counter)_'._']">
              {title}
            </span>

            {/* Show green tick if quizz was completed only */}
            {isCompleted && <GreenTickIcon />}
          </Flex>

          {/* Labels */}
          <Flex className="gap-3 font-normal">
            {/* number of questions - label */}
            <Tag>{`${numberOfQuestions} ${t("questions")}`}</Tag>

            {/* difficulty - label */}
            <Tag status={LEVEL_STATUS[level]}>{level.toUpperCase()}</Tag>
          </Flex>
        </Stack>

        <LinkOverlay asChild>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleStart}
          >
            {t("start")}
          </Button>
        </LinkOverlay>
      </ListItem>
    </LinkBox>
  )
}

export default QuizItem
