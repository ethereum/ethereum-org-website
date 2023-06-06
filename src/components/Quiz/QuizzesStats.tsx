import React, { useContext } from "react"
import { mean } from "lodash"
import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"
import { useI18next } from "gatsby-plugin-react-i18next"

import Button from "../Button"
import Translation from "../Translation"
import { TrophyIcon } from "../icons/quiz"

import { QuizzesHubContext } from "./context"

// Utils
import {
  getNumberOfCompletedQuizzes,
  getTotalQuizzesPoints,
  shareOnTwitter,
} from "./utils"
import {
  isLangRightToLeft,
  getLocaleForNumberFormat,
} from "../../utils/translations"
import { Lang } from "../../utils/languages"
import { trackCustomEvent } from "../../utils/matomo"

import { QuizShareStats } from "../../types"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "../../data/quizzes"

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

const getFormattedStats = (
  language,
  average,
  collectiveQuestionsAnswered,
  collectiveAverageScore,
  collectiveRetryRate
) => {
  const localeForNumbers = getLocaleForNumberFormat(language as Lang)

  // Initialize number and percent formatters
  const numberFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "decimal",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const percentFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "percent",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  // Calculate average
  const computedAverage = average.length > 0 ? mean(average) : 0

  // Convert collective stats to fraction for percentage format
  const normalizedCollectiveAverageScore = collectiveAverageScore / 100
  const normalizedCollectiveRetryRate = collectiveRetryRate / 100

  // Return formatted values
  return {
    formattedUserAverageScore: percentFormatter.format(computedAverage / 100), // Normalize user average
    formattedCollectiveQuestionsAnswered: numberFormatter.format(
      collectiveQuestionsAnswered
    ),
    formattedCollectiveAverageScore: percentFormatter.format(
      normalizedCollectiveAverageScore
    ),
    formattedCollectiveRetryRate: percentFormatter.format(
      normalizedCollectiveRetryRate
    ),
  }
}

const QuizzesStats: React.FC = () => {
  const { language } = useI18next()
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

  // Data from Matomo, manually updated
  const collectiveQuestionsAnswered = 100000
  const collectiveAverageScore = 67.4
  const collectiveRetryRate = 15.6

  const {
    formattedUserAverageScore,
    formattedCollectiveQuestionsAnswered,
    formattedCollectiveAverageScore,
    formattedCollectiveRetryRate,
  } = getFormattedStats(
    language,
    average,
    collectiveQuestionsAnswered,
    collectiveAverageScore,
    collectiveRetryRate
  )

  return (
    <Box flex={1} order={{ base: 1, lg: 2 }} w="full">
      <Stack mt={{ base: 0, lg: 12 }} gap={{ base: 8, lg: 4 }}>
        {/* user stats */}
        <Grid
          gap={4}
          bg="backgroundHighlight"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p={{ base: 8, lg: 4 }}
          mb={-2}
        >
          <GridItem colSpan={{ base: 2, lg: 1 }} alignSelf="center" order={1}>
            <Text
              color="body"
              fontWeight="bold"
              fontSize="xl"
              margin={0}
              textAlign={{ base: "center", lg: "left" }}
            >
              <Translation id="your-total" />
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 2, lg: 1 }}
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
              mt={{ base: 2, lg: 0 }}
            >
              <Translation id="share-results" />
            </Button>
          </GridItem>

          <GridItem colSpan={2} order={{ base: 2, lg: 3 }}>
            <Stack gap={2}>
              <Flex
                justifyContent={{ base: "center", lg: "flex-start" }}
                alignItems="center"
              >
                <Circle size="64px" bg="primary" mr={4}>
                  <TrophyIcon color="neutral" w="35.62px" h="35.62px" />
                </Circle>

                <Text fontWeight="bold" fontSize="5xl" mb={0} color="body">
                  {userScore}
                  <Text as="span" color="bodyMedium">
                    /{totalQuizzesPoints}
                  </Text>
                </Text>
              </Flex>

              <Progress value={(userScore / totalQuizzesPoints) * 100} />

              <Flex direction={{ base: "column", lg: "row" }}>
                <Text mr={10} mb={0} mt={{ base: 2, lg: 0 }} color="bodyMedium">
                  <Translation id="average-score" />{" "}
                  <Text as="span" color="body">
                    {formattedUserAverageScore}
                  </Text>
                </Text>

                <Text mb={0} color="bodyMedium">
                  <Translation id="completed" />{" "}
                  <Text as="span" color="body">
                    {numberOfCompletedQuizzes}/{totalQuizzesNumber}
                  </Text>
                </Text>
              </Flex>
            </Stack>
          </GridItem>
        </Grid>

        {/* community stats */}
        <Flex
          direction="column"
          gap={6}
          justifyContent="space-between"
          bg="backgroundHighlight"
          borderRadius={{ base: "none", lg: "lg" }}
          border="none"
          p={{ base: 8, lg: 4 }}
        >
          <Text color="body" fontWeight="bold" fontSize="xl" mb={0}>
            <Translation id="community-stats" />
          </Text>

          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
          >
            <Stack>
              <Text mr={10} mb={-2} color="bodyMedium">
                <Translation id="average-score" />
              </Text>
              {/* Data from Matomo, manually updated */}
              <Text color="body">{formattedCollectiveAverageScore}</Text>
            </Stack>

            <Stack>
              <Text mr={10} mb={-2} color="bodyMedium">
                <Translation id="questions-answered" />
              </Text>

              {/* Data from Matomo, manually updated */}
              <Text color="body">
                {formattedCollectiveQuestionsAnswered}
                <Text as="span">+</Text>
              </Text>
            </Stack>

            <Stack>
              <Text mr={10} mb={-2} color="bodyMedium">
                <Translation id="retry" />
              </Text>

              {/* Data from Matomo, manually updated */}
              <Text color="body">{formattedCollectiveRetryRate}</Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}

export default QuizzesStats
