import React, { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { FaGithub } from "react-icons/fa"

import ButtonLink from "../components/ButtonLink"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Content } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"
import QuizzesList from "../components/Quiz/QuizzesList"
import QuizzesModal from "../components/Quiz/QuizzesModal"
import QuizzesStats from "../components/Quiz/QuizzesStats"
import { QuizzesHubContext } from "../components/Quiz/context"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { getImage } from "../utils/image"
import { trackCustomEvent } from "../utils/matomo"

import { INITIAL_QUIZ, USER_STATS_KEY } from "../constants"

import { CompletedQuizzes, QuizStatus, UserStats } from "../types"

import allQuizzesData, {
  ethereumBasicsQuizzes,
  usingEthereumQuizzes,
} from "../data/quizzes"

// Contains each quiz id as key and <boolean, number> to indicate if its completed and the highest score in that quiz
// Initialize all quizzes as not completed
const INITIAL_COMPLETED_QUIZZES: CompletedQuizzes = Object.keys(
  allQuizzesData
).reduce((object, key) => ({ ...object, [key]: [false, 0] }), {})

export const INITIAL_USER_STATS: UserStats = {
  score: 0,
  average: [],
  completed: JSON.stringify(INITIAL_COMPLETED_QUIZZES),
}

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

const QuizzesHubPage = ({ data }: PageProps<Queries.QuizzesHubPageQuery>) => {
  const [currentQuiz, setCurrentQuiz] = useState<string | undefined>(
    INITIAL_QUIZ
  )
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  // Read initial data from localStorage if available
  const [userStats, setUserStats] = useLocalStorage<UserStats>(
    USER_STATS_KEY,
    INITIAL_USER_STATS
  )
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { t } = useTranslation()

  const heroContent = {
    title: <Translation id="quizzes-title" />,
    header: <Translation id="test-your-knowledge" />,
    subtitle: <Translation id="quizzes-subtitle" />,
    image: getImage(data.doge)!,
    alt: t("quizzes-title"),
  }

  const contextState = {
    status: quizStatus,
    quizKey: currentQuiz,
    userStats: {
      score: userStats.score,
      average: userStats.average,
      completed: userStats.completed,
    },
    setUserStats: setUserStats,
  }

  return (
    <Box>
      <PageMetadata
        title={t("quizzes-title")}
        description={t("quizzes-subtitle")}
      />
      <Box w="100%" bg="layer2Gradient" pb={8}>
        <PageHero content={heroContent} isReverse />
      </Box>

      <QuizzesHubContext.Provider value={contextState}>
        <QuizzesModal isOpen={isOpen} onClose={onClose}>
          <QuizWidget
            quizKey={currentQuiz}
            currentHandler={setCurrentQuiz}
            statusHandler={setQuizStatus}
            isStandaloneQuiz={false}
          />
        </QuizzesModal>

        <Box px={{ base: 0, lg: 8 }} py={{ base: 0, lg: 4 }} mb={12}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            alignItems="start"
            gap={{ base: 0, lg: 20 }}
          >
            {/* quizzes list */}
            <Box flex={1} order={{ base: 2, lg: 1 }}>
              <Box px={{ base: 8, lg: 0 }}>
                <Heading
                  fontSize={{ base: "1.75rem", lg: "2rem" }}
                  color="body"
                >
                  <Translation id="basics" />
                </Heading>

                <Text mb={8} color="body">
                  <Translation id="basics-description" />
                </Text>

                <QuizzesList
                  content={ethereumBasicsQuizzes}
                  quizHandler={setCurrentQuiz}
                  modalHandler={onOpen}
                />
              </Box>

              <Box px={{ base: 8, lg: 0 }} mb={10}>
                <Heading
                  fontSize={{ base: "1.75rem", lg: "2rem" }}
                  color="body"
                >
                  <Translation id="using-ethereum" />
                </Heading>

                <Text mb={8} color="body">
                  <Translation id="using-ethereum-description" />
                </Text>

                <QuizzesList
                  content={usingEthereumQuizzes}
                  quizHandler={setCurrentQuiz}
                  modalHandler={onOpen}
                />
              </Box>

              <Flex
                direction={{ base: "column", xl: "row" }}
                justifyContent="space-between"
                alignItems="center"
                bg="backgroundHighlight"
                borderRadius={{ base: "none", lg: "lg" }}
                border="none"
                p={8}
              >
                <Stack mb={{ base: 4, xl: 0 }}>
                  <Text
                    align={{ base: "center", xl: "left" }}
                    fontWeight="bold"
                    color="body"
                    mb={-2}
                  >
                    <Translation id="want-more-quizzes" />
                  </Text>

                  <Text align={{ base: "center", xl: "left" }} color="body">
                    <Translation id="contribute" />
                  </Text>
                </Stack>

                <ButtonLink
                  to={"/contributing/quizzes/"}
                  variant="outline"
                  hideArrow
                  mt={0}
                  onClick={handleGHAdd}
                >
                  <Flex alignItems="center">
                    <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                    <Translation id="add-quiz" />
                  </Flex>
                </ButtonLink>
              </Flex>
            </Box>

            {/* quizzes stats */}
            <QuizzesStats />
          </Flex>
        </Box>
      </QuizzesHubContext.Provider>

      <Content>
        <FeedbackCard />
      </Content>
    </Box>
  )
}

export default QuizzesHubPage

export const query = graphql`
  query QuizzesHubPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["common", "learn-quizzes"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
