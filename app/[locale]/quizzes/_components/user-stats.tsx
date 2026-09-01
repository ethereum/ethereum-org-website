"use client"

import { useLocale, useTranslations } from "next-intl"

import type { QuizShareStats } from "@/lib/types"

import { TrophyIcon } from "@/components/icons/quiz"
import Twitter from "@/components/icons/twitter.svg"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"
import {
  getFormattedUserAverageScore,
  getNumberOfCompletedQuizzes,
  getTotalQuizzesPoints,
  shareOnTwitter,
} from "@/components/Quiz/utils"
import { Button } from "@/components/ui/buttons/Button"
import { Center, Flex, HStack, Stack } from "@/components/ui/flex"
import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { allQuizzesInOrder } from "@/data/quizzes"

const handleShare = ({ score, total }: QuizShareStats) => {
  shareOnTwitter({ score, total })

  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "Twitter_share_stats",
  })
}

/**
 * Client-only: the score lives in localStorage. Reads the same key as the quiz
 * widget, and `useLocalStorage` broadcasts a `local-storage` event on write, so
 * this stays in sync with the modal without sharing a hook instance.
 */
const QuizzesUserStats = ({ className }: { className?: string }) => {
  const locale = useLocale()
  const t = useTranslations("learn-quizzes")
  const [userStats] = useLocalQuizData()

  // Recalculated on every render rather than pulled from /constants: both totals
  // move whenever a quiz is added or a question changes.
  const totalQuizzesNumber = allQuizzesInOrder.length
  const totalQuizzesPoints = getTotalQuizzesPoints()

  return (
    <Stack
      className={cn(
        "gap-space rounded-base bg-background-highlight p-page",
        className
      )}
    >
      <Flex className="items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
        <h2>{t("your-total")}</h2>

        <Button
          variant="outline"
          onClick={() =>
            handleShare({
              score: userStats.score,
              total: totalQuizzesPoints,
            })
          }
        >
          <Twitter />
          {t("share-results")}
        </Button>
      </Flex>

      <Stack className="gap-2">
        <HStack className="gap-4">
          <Center className="size-16 rounded-full bg-primary">
            <TrophyIcon className="text-4xl text-background" />
          </Center>
          <span className="text-h2 font-bold">
            {userStats.score}
            <span className="text-body-medium">/{totalQuizzesPoints}</span>
          </span>
        </HStack>

        <Progress
          value={(userStats.score / totalQuizzesPoints) * 100}
          className="h-2.5 bg-primary-low-contrast [&>div]:bg-primary"
        />

        <Flex className="gap-x-10 gap-y-2 max-sm:flex-col">
          <span className="text-body-medium">
            {t("average-score")}{" "}
            {getFormattedUserAverageScore(locale, userStats.average)}
          </span>

          <span className="text-body-medium">
            {t("completed")} {getNumberOfCompletedQuizzes(userStats.completed)}/
            {totalQuizzesNumber}
          </span>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default QuizzesUserStats
