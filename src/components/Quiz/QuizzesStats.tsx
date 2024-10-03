import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaXTwitter } from "react-icons/fa6"

import { CompletedQuizzes, QuizShareStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "../../data/quizzes"
import { TrophyIcon } from "../icons/quiz"
import Translation from "../Translation"
import { Button } from "../ui/buttons/Button"
import { Center, Flex, HStack, Stack } from "../ui/flex"
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
      <Stack className="gap-4 lg:mt-12 lg:gap-2">
        {/* user stats */}
        <div className="grid columns-1 gap-6 rounded-none border-none bg-background-highlight p-8 lg:columns-2 lg:gap-4 lg:rounded-lg">
          <div className="order-1 self-center">
            <span className="text-xl font-bold max-lg:text-center">
              {t("your-total")}
            </span>
          </div>

          <div className="order-3 lg:order-2 lg:justify-self-end">
            <Button
              variant="outline"
              onClick={() =>
                handleShare({
                  score: totalCorrectAnswers,
                  total: totalQuizzesPoints,
                })
              }
              className="max-lg:w-full"
            >
              <FaXTwitter />
              {t("share-results")}
            </Button>
          </div>

          <div className="order-2 lg:order-3 lg:col-span-2">
            <Stack className="gap-2">
              <HStack className="gap-4 max-lg:justify-center">
                <Center className="size-16 rounded-full bg-primary">
                  <TrophyIcon className="size-[35.62px] fill-background" />
                </Center>
                <span className="text-5xl font-bold leading-base">
                  {totalCorrectAnswers}
                  <span className="text-body-medium">
                    /{totalQuizzesPoints}
                  </span>
                </span>
              </HStack>

              <Progress
                value={(totalCorrectAnswers / totalQuizzesPoints) * 100}
                className="h-2.5 bg-primary-low-contrast [&>div]:bg-primary"
              />

              <Flex className="gap-x-10 max-lg:flex-col">
                <span className="text-body-medium max-lg:mt-2">
                  {t("average-score")} {formattedUserAverageScore}
                </span>

                <span className="text-body-medium">
                  {t("completed")} {numberOfCompletedQuizzes}/
                  {totalQuizzesNumber}
                </span>
              </Flex>
            </Stack>
          </div>
        </div>

        {/* community stats */}
        <Stack className="gap-6 border-none bg-background-highlight p-8 lg:rounded-lg">
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
                    value: formattedCollectiveQuestionsAnswered + "+",
                  },
                  {
                    labelId: "retry",
                    value: formattedCollectiveRetryRate,
                  },
                ] satisfies Array<{ labelId: string; value: string }>
              ).map(({ labelId, value }) => (
                <Stack key={labelId} className="m-0 gap-0" asChild>
                  <ListItem>
                    <span className="text-body">
                      <Translation
                        id={labelId}
                        options={{ ns: "learn-quizzes" }}
                      />
                    </span>
                    {/* Data from Matomo, manually updated */}
                    <span>{value}</span>
                  </ListItem>
                </Stack>
              ))}
            </UnorderedList>
          </Flex>
        </Stack>
      </Stack>
    </div>
  )
}

export default QuizzesStats
