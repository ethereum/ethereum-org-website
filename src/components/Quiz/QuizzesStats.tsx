import { useLocale, useTranslations } from "next-intl"

import { CompletedQuizzes, QuizShareStats } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"

import { cn } from "@/lib/utils/cn"
import { formatDate } from "@/lib/utils/date"
import { trackCustomEvent } from "@/lib/utils/matomo"

import type { QuizStatsData } from "@/data-layer/fetchers/fetchQuizStats"

import { allQuizzesInOrder } from "../../data/quizzes"
import { TrophyIcon } from "../icons/quiz"
import { Button } from "../ui/buttons/Button"
import { Center, Flex, HStack, Stack } from "../ui/flex"
import { Grid } from "../ui/grid"
import { ListItem, UnorderedList } from "../ui/list"
import { Progress } from "../ui/progress"

import {
  getFormattedStats,
  getNumberOfCompletedQuizzes,
  getTotalQuizzesPoints,
  shareOnTwitter,
} from "./utils"

const handleShare = ({ score, total }: QuizShareStats) => {
  shareOnTwitter({
    score,
    total,
  })

  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "Twitter_share_stats",
  })
}

type QuizzesStatsProps = {
  totalCorrectAnswers: number
  averageScoresArray: number[]
  completedQuizzes: CompletedQuizzes
  /** Null when the Matomo fetch has not populated the blob yet */
  communityStats: QuizStatsData | null
}

const QuizzesStats = ({
  totalCorrectAnswers,
  averageScoresArray,
  completedQuizzes,
  communityStats,
}: QuizzesStatsProps) => {
  const locale = useLocale()
  const t = useTranslations("learn-quizzes")
  const tCommon = useTranslations("common")
  const numberOfCompletedQuizzes = getNumberOfCompletedQuizzes(completedQuizzes)

  // Pinned to UTC so server and client render identically; a local-timezone
  // stamp would only agree after hydration.
  const lastUpdated =
    communityStats &&
    formatDate(new Date(communityStats.timestamp).toISOString(), locale, {
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    })

  // These values are not fixed but calculated each time, can't be moved to /constants
  const totalQuizzesNumber = allQuizzesInOrder.length
  const totalQuizzesPoints = getTotalQuizzesPoints()

  const {
    formattedUserAverageScore,
    formattedCollectiveQuestionsAnswered,
    formattedCollectiveAverageScore,
    formattedCollectiveRetryRate,
  } = getFormattedStats(locale, averageScoresArray, communityStats)

  return (
    <Grid columns={2} size="wider">
      {/* user stats */}
      <Stack
        className={cn(
          "gap-space rounded-base bg-background-highlight p-page",
          !communityStats && "md:col-span-2"
        )}
      >
        <Flex className="items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
          <span className="text-xl font-bold">{t("your-total")}</span>

          <Button
            variant="outline"
            onClick={() =>
              handleShare({
                score: totalCorrectAnswers,
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
              {totalCorrectAnswers}
              <span className="text-body-medium">/{totalQuizzesPoints}</span>
            </span>
          </HStack>

          <Progress
            value={(totalCorrectAnswers / totalQuizzesPoints) * 100}
            className="h-2.5 bg-primary-low-contrast [&>div]:bg-primary"
          />

          <Flex className="gap-x-10 gap-y-2 max-sm:flex-col">
            <span className="text-body-medium">
              {t("average-score")} {formattedUserAverageScore}
            </span>

            <span className="text-body-medium">
              {t("completed")} {numberOfCompletedQuizzes}/{totalQuizzesNumber}
            </span>
          </Flex>
        </Stack>
      </Stack>

      {/* community stats -- omitted entirely when Matomo data is unavailable */}
      {communityStats && (
        <Stack className="gap-space rounded-base bg-background-highlight p-page">
          <span className="text-xl font-bold">{t("community-stats")}</span>

          <Flex className="m-0 gap-x-20 gap-y-6 max-md:flex-col" asChild>
            <UnorderedList>
              {(
                [
                  {
                    labelId: "average-score",
                    value: formattedCollectiveAverageScore,
                  },
                  {
                    labelId: "questions-answered",
                    value: formattedCollectiveQuestionsAnswered,
                  },
                  {
                    labelId: "retry",
                    value: formattedCollectiveRetryRate,
                  },
                ] satisfies Array<{ labelId: string; value: string }>
              ).map(({ labelId, value }) => (
                <Stack key={labelId} className="m-0 gap-0" asChild>
                  <ListItem>
                    <span className="text-body">{t(labelId)}</span>
                    <span>{value}</span>
                  </ListItem>
                </Stack>
              ))}
            </UnorderedList>
          </Flex>

          {lastUpdated && (
            <span className="text-sm text-body-medium">
              {tCommon("last-updated")}: {lastUpdated}
            </span>
          )}
        </Stack>
      )}
    </Grid>
  )
}

export default QuizzesStats
