import React, { useEffect, useState } from "react"
import { Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "@emotion/styled"
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

import { getImage } from "../utils/image"

import { CompletedQuizzes, QuizStatus, UserStats } from "../types"

import allQuizzesData, {
  ethereumBasicsQuizzes,
  usingEthereumQuizzes,
} from "../data/quizzes"

// TODO: remove styled components?
const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.layer2Gradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

export const USER_STATS_KEY = "quizzes-stats"
// Create an object that contains each quiz id as key and a boolean flag to indicate if its completed
// Initialize all quizzes as not completed
const INITIAL_COMPLETED_QUIZZES: CompletedQuizzes = Object.keys(
  allQuizzesData
).reduce((object, key) => ({ ...object, [key]: false }), {})

const INITIAL_USER_STATS = {
  score: 0,
  average: 0,
  completed: JSON.stringify(INITIAL_COMPLETED_QUIZZES),
}

// Hook
// TODO: move to other place
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      setStoredValue(item ? JSON.parse(item) : initialValue)
    } catch (error) {
      console.log(error)
      return setStoredValue(initialValue)
    }
  }, [])

  return [storedValue, setValue]
}

const QuizzesHubPage = ({ data }: PageProps<Queries.QuizzesHubPageQuery>) => {
  const INITIAL_QUIZ = "what-is-ethereum"

  const [currentQuiz, setCurrentQuiz] = useState<string | undefined>(
    INITIAL_QUIZ
  )
  const [nextQuiz, setNextQuiz] = useState<string | undefined>(undefined)
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  // TODO: read stats from local storage (useLocalStorage)
  const [userStats, setUserStats] = useLocalStorage(
    USER_STATS_KEY,
    INITIAL_USER_STATS
  )
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // set user stats in Context if available
    if (localStorage.getItem(USER_STATS_KEY)) {
      setUserStats(JSON.parse(localStorage.getItem(USER_STATS_KEY)!))
    } else {
      // initialize
      localStorage.setItem(USER_STATS_KEY, JSON.stringify(userStats))
    }
  }, [])

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
    next: nextQuiz,
    score: userStats.score,
    average: userStats.average,
    completed: userStats.completed,
  }

  return (
    <Box>
      <PageMetadata
        title={t("quizzes-title")}
        description={t("quizzes-subtitle")}
      />
      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <QuizzesHubContext.Provider value={contextState}>
        <QuizzesModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
          <QuizWidget
            quizKey={currentQuiz}
            nextHandler={setCurrentQuiz}
            statusHandler={setQuizStatus}
            setUserStats={setUserStats}
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
                  nextHandler={setNextQuiz}
                  modalHandler={setModalOpen}
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
                  nextHandler={setNextQuiz}
                  modalHandler={setModalOpen}
                />
              </Box>

              <Flex
                direction={{ base: "column", lg: "row" }}
                justifyContent="space-between"
                alignItems="center"
                bg="ednBackground"
                borderRadius={{ base: "none", lg: "lg" }}
                border="none"
                p={{ base: 8, lg: 12 }}
              >
                <Stack mb={{ base: 4, lg: 0 }}>
                  <Text
                    align={{ base: "center", lg: "left" }}
                    fontWeight="bold"
                    color="body"
                    mb={-2}
                  >
                    <Translation id="want-more-quizzes" />
                  </Text>

                  <Text align={{ base: "center", lg: "left" }} color="body">
                    <Translation id="contribute" />
                  </Text>
                </Stack>

                <ButtonLink
                  to={"/contributing/learning-quizzes/"}
                  variant="outline"
                  hideArrow
                  mt={0}
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
