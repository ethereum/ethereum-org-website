import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaXTwitter } from "react-icons/fa6"
import {
  Box,
  Circle,
  Flex,
  GridItem,
  Highlight,
  HStack,
  ListItem,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

import { CompletedQuizzes, QuizShareStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "../../data/quizzes"
import { Button } from "../Buttons"
import { TrophyIcon } from "../icons/quiz"
import Translation from "../Translation"

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
    <Box>
      <Stack mt={{ base: 0, lg: "12" }} spacing={{ base: "4", lg: "2" }}>
        {/* user stats */}
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "6", lg: "4" }}
          bg="background.highlight"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p="8"
        >
          <GridItem alignSelf="center" order={1}>
            <Text
              fontWeight="bold"
              size="xl"
              textAlign={{ base: "center", lg: "left" }}
            >
              {t("your-total")}
            </Text>
          </GridItem>

          <GridItem justifySelf={{ lg: "end" }} order={{ base: 3, lg: 2 }}>
            <Button
              variant="outline"
              leftIcon={<FaXTwitter />}
              onClick={() =>
                handleShare({
                  score: totalCorrectAnswers,
                  total: totalQuizzesPoints,
                })
              }
              w={{ base: "full", lg: "auto" }}
            >
              {t("share-results")}
            </Button>
          </GridItem>

          <GridItem colSpan={{ lg: 2 }} order={{ base: 2, lg: 3 }}>
            <Stack spacing="2">
              <HStack
                spacing="4"
                justify={{ base: "center", lg: "flex-start" }}
              >
                <Circle size="64px" bg="primary.base">
                  <TrophyIcon color="neutral" w="35.62px" h="35.62px" />
                </Circle>
                <Text as="span" fontWeight="bold" fontSize="5xl">
                  <Highlight
                    query={`/${totalQuizzesPoints}`}
                    styles={{ color: "body.medium" }}
                  >
                    {totalCorrectAnswers + "/" + totalQuizzesPoints}
                  </Highlight>
                </Text>
              </HStack>

              <Progress
                value={(totalCorrectAnswers / totalQuizzesPoints) * 100}
              />

              <Flex columnGap="10" direction={{ base: "column", lg: "row" }}>
                <Text mt={{ base: "2", lg: 0 }} color="body.medium">
                  {t("average-score")}{" "}
                  <Text as="span">{formattedUserAverageScore}</Text>
                </Text>

                <Text color="body.medium">
                  {t("completed")}{" "}
                  <Text as="span">
                    {numberOfCompletedQuizzes}/{totalQuizzesNumber}
                  </Text>
                </Text>
              </Flex>
            </Stack>
          </GridItem>
        </SimpleGrid>

        {/* community stats */}
        <Stack
          gap="6"
          bg="background.highlight"
          borderRadius={{ lg: "lg" }}
          border="none"
          p="8"
        >
          <Text fontWeight="bold" fontSize="xl">
            {t("community-stats")}
          </Text>

          <Flex
            as={UnorderedList}
            direction={{ base: "column", md: "row" }}
            columnGap="20"
            rowGap="6"
            m={0}
          >
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
              <Stack as={ListItem} key={labelId} spacing={0} m={0}>
                <Text as="span" color="body.medium">
                  <Translation id={labelId} options={{ ns: "learn-quizzes" }} />
                </Text>
                {/* Data from Matomo, manually updated */}
                <Text as="span">{value}</Text>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Box>
  )
}

export default QuizzesStats
