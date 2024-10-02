import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaXTwitter } from "react-icons/fa6"

import type { CompletedQuizzes, QuizShareStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "../../data/quizzes"
import TrophyIcon from "../icons/quiz/trophy-icon.svg"
import Translation from "../Translation"
import { Button } from "../ui/buttons/Button"
import { HStack, Stack } from "../ui/flex"
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
}

const QuizzesStats = ({
  totalCorrectAnswers,
  averageScoresArray,
  completedQuizzes,
}: QuizzesStatsProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("learn-quizzes")
  const numberOfCompletedQuizzes = getNumberOfCompletedQuizzes(completedQuizzes)

  // These values are not fixed but calculated each time, can't be moved to /constants
  const totalQuizzesNumber =
    ethereumBasicsQuizzes.length + usingEthereumQuizzes.length
  const totalQuizzesPoints = getTotalQuizzesPoints()

  const {
    formattedUserAverageScore,
    formattedCollectiveQuestionsAnswered,
    formattedCollectiveAverageScore,
    formattedCollectiveRetryRate,
  } = getFormattedStats(locale!, averageScoresArray)

  return (
    <div>
      <Stack className="space-y-4 lg:mt-12 lg:space-y-2">
        {/* user stats */}
        <div className="grid grid-cols-1 gap-6 bg-background-highlight p-8 lg:grid-cols-2 lg:gap-4 lg:rounded-lg">
          <div className="self-center lg:order-1">
            <p className="max-lg:align-center text-xl font-bold">
              {t("your-total")}
            </p>
          </div>

          <div className="lg:order-2 lg:justify-self-end">
            <Button
              variant="outline"
              onClick={() =>
                handleShare({
                  score: totalCorrectAnswers,
                  total: totalQuizzesPoints,
                })
              }
              className="w-full lg:w-auto"
            >
              <FaXTwitter />
              {t("share-results")}
            </Button>
          </div>

          <div className="order-2 lg:order-3 lg:col-span-2">
            <Stack className="space-y-2">
              <HStack className="space-x-4 max-lg:justify-center">
                <div className="grid size-16 place-items-center rounded-full bg-primary">
                  <TrophyIcon className="size-9 text-background-highlight" />
                </div>
                <span className="text-5xl font-bold">
                  {totalCorrectAnswers}
                  <span className="text-body-medium">
                    / {totalQuizzesPoints}
                  </span>
                </span>
              </HStack>

              <Progress
                value={(totalCorrectAnswers / totalQuizzesPoints) * 100}
                className="h-2.5 bg-primary-low-contrast [&>div]:bg-primary"
              />

              <div className="flex flex-col gap-x-10 lg:flex-row">
                <p className="mt-2 text-body-medium lg:mt-0">
                  {t("average-score")} <span>{formattedUserAverageScore}</span>
                </p>

                <p className="text-body-medium">
                  {t("completed")}{" "}
                  <span>
                    {numberOfCompletedQuizzes}/{totalQuizzesNumber}
                  </span>
                </p>
              </div>
            </Stack>
          </div>
        </div>

        {/* community stats */}
        <Stack className="bg-backgroung-highlight gap-6 p-8 lg:rounded-lg">
          <p className="text-xl font-bold">{t("community-stats")}</p>

          <ul className="m-0 flex flex-col gap-x-20 gap-y-6 md:flex-row">
            {(
              [
                {
                  labelId: "average-score",
                  value: formattedCollectiveAverageScore,
                },
                {
                  labelId: "questions-answered",
                  value: formattedCollectiveQuestionsAnswered + "+",
                },
                {
                  labelId: "retry",
                  value: formattedCollectiveRetryRate,
                },
              ] satisfies Array<{ labelId: string; value: string }>
            ).map(({ labelId, value }) => (
              <li className="m-0 flex flex-col space-y-0" key={labelId}>
                <span className="text-body-medium">
                  <Translation id={labelId} options={{ ns: "learn-quizzes" }} />
                </span>
                {/* Data from Matomo, manually updated */}
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </Stack>
      </Stack>
    </div>
  )
}

export default QuizzesStats
