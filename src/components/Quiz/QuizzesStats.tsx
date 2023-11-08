import { useContext } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaTwitter } from "react-icons/fa"
import {
  Box,
  Circle,
  Flex,
  GridItem,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "../../data/quizzes"
import { QuizShareStats } from "../../types"
import { trackCustomEvent } from "../../utils/matomo"
import { Button } from "../Buttons"
import { TrophyIcon } from "../icons/quiz"

import { QuizzesHubContext } from "./context"
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

const QuizzesStats: React.FC = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("learn-quizzes")
  const {
    userStats: { score: userScore, completed, average },
  } = useContext(QuizzesHubContext)
  const numberOfCompletedQuizzes = getNumberOfCompletedQuizzes(
    JSON.parse(completed)
  )

  // These values are not fixed but calculated each time, can't be moved to /constants
  const totalQuizzesNumber =
    ethereumBasicsQuizzes.length + usingEthereumQuizzes.length
  const totalQuizzesPoints = getTotalQuizzesPoints()

  const {
    formattedUserAverageScore,
    formattedCollectiveQuestionsAnswered,
    formattedCollectiveAverageScore,
    formattedCollectiveRetryRate,
  } = getFormattedStats(locale!, average)

  return (
    <Box flex={1} order={{ base: "1", lg: "2" }} w="full">
      <Stack mt={{ base: 0, lg: "12" }} spacing={{ base: "8", lg: "4" }}>
        {/* user stats */}
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap="4"
          bg="background.highlight"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p="8"
          mb="-2"
        >
          <GridItem alignSelf="center" order={1}>
            <Text
              color="body.base"
              fontWeight="bold"
              fontSize="xl"
              margin={0}
              textAlign={{ base: "center", lg: "left" }}
            >
              {t("your-total")}
            </Text>
          </GridItem>

          <GridItem
            justifySelf={{ base: "auto", lg: "end" }}
            alignSelf="center"
            order={{ base: 3, lg: 2 }}
          >
            <Button
              variant="outline-color"
              leftIcon={<FaTwitter />}
              onClick={() =>
                handleShare({ score: userScore, total: totalQuizzesPoints })
              }
              w={{ base: "full", lg: "auto" }}
              mt={{ base: "2", lg: 0 }}
            >
              {t("share-results")}
            </Button>
          </GridItem>

          <GridItem colSpan={2} order={{ base: 2, lg: 3 }}>
            <Stack spacing="2">
              <Flex
                justifyContent={{ base: "center", lg: "flex-start" }}
                alignItems="center"
              >
                <Circle size="64px" bg="primary.base" mr={4}>
                  <TrophyIcon color="neutral" w="35.62px" h="35.62px" />
                </Circle>

                <Text fontWeight="bold" fontSize="5xl" color="body.base">
                  {userScore}
                  <Text as="span" color="body.medium">
                    /{totalQuizzesPoints}
                  </Text>
                </Text>
              </Flex>

              <Progress value={(userScore / totalQuizzesPoints) * 100} />

              <Flex columnGap="10" direction={{ base: "column", lg: "row" }}>
                <Text mt={{ base: "2", lg: 0 }} color="body.medium">
                  {t("average-score")}{" "}
                  <Text as="span" color="body.base">
                    {formattedUserAverageScore}
                  </Text>
                </Text>

                <Text color="body.medium">
                  {t("completed")}{" "}
                  <Text as="span" color="body.base">
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
          justifyContent="space-between"
          bg="background.highlight"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p="8"
        >
          <Text color="body.base" fontWeight="bold" fontSize="xl">
            {t("community-stats")}
          </Text>

          <Flex
            direction={{ base: "column", md: "row" }}
            columnGap="20"
            rowGap="6"
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
              <Stack key={labelId}>
                <Text mb="-2" color="body.medium">
                  <Translation id={labelId} />
                </Text>
                {/* Data from Matomo, manually updated */}
                <Text color="body.base">{value}</Text>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Box>
  )
}

export default QuizzesStats
