// 2) local storage
// 1) col derecha data (current completed, average score, progress, current/total)

// 5) TODO: hide green tick if not passed
// 6) tw share results copy

// 0) colors theme dark mode design
// 5) dark mode colors

import React, { useState } from "react"
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
import { QuizStatus, QuizzesHubContext } from "../components/Quiz/context"

import { getImage } from "../utils/image"

// Styles
// TODO: remove styled components
const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.layer2Gradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const QuizzesHubPage = ({ data }: PageProps<Queries.QuizzesHubPageQuery>) => {
  const INITIAL_QUIZ = "what-is-ethereum"

  // useEffect(() => {
  //   const isDismissed = localStorage.getItem(storageKey) === "true"
  //   setShow(!isDismissed)
  // }, [])

  // const onClose = () => {
  //   localStorage.setItem(storageKey, "true")
  //   setShow(false)
  // }

  const [currentQuiz, setCurrentQuiz] = useState(INITIAL_QUIZ)
  const [nextQuiz, setNextQuiz] = useState("neutral")
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  // TODO: fix score computing
  const [userScore, setUserScore] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false)

  const { t } = useTranslation()
  const heroContent = {
    title: <Translation id="quizzes-title" />,
    header: <Translation id="test-your-knowledge" />,
    subtitle: <Translation id="quizzes-subtitle" />,
    image: getImage(data.doge)!,
    alt: t("quizzes-title"),
  }

  // TODO: move somewhere else (compute from allQuizzesData??)
  const ethereumBasicsQuizzes = [
    {
      id: "what-is-ethereum",
      title: "What is Ethereum?",
      level: "beginner",
      next: "what-is-ether",
    },
    {
      id: "what-is-ether",
      title: "What is ether?",
      level: "beginner",
      next: "wallets",
    },
    {
      id: "wallets",
      title: "What is a Wallet?",
      level: "beginner",
      next: "web3",
    },
    {
      id: "web3",
      title: "What is Web3?",
      level: "beginner",
      next: "security",
    },
    {
      id: "security",
      title: "Security and scams",
      level: "beginner",
      next: "merge",
    },
    {
      id: "merge",
      title: "What is The Merge?",
      level: "beginner",
    },
  ]

  const usingEthereumQuizzes = [
    {
      id: "nfts",
      title: "What are NFTs?",
      level: "beginner",
      next: "layer-2",
    },
    {
      id: "layer-2",
      title: "Using Layer 2",
      level: "intermediate",
    },
  ]

  const totalQuizzesNumber =
    ethereumBasicsQuizzes.length + usingEthereumQuizzes.length

  return (
    <Box>
      <PageMetadata
        title={t("quizzes-title")}
        description={t("quizzes-subtitle")}
      />
      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <QuizzesHubContext.Provider
        value={{ status: quizStatus, next: nextQuiz }}
      >
        <QuizzesModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
          {/* TODO: fix TS error */}
          <QuizWidget
            quizKey={currentQuiz}
            nextHandler={setCurrentQuiz}
            statusHandler={setQuizStatus}
            setUserScore={setUserScore}
            isStandaloneQuiz={false}
          />
        </QuizzesModal>
      </QuizzesHubContext.Provider>

      <Box px={{ base: 0, lg: 8 }} py={{ base: 0, lg: 4 }} mb={12}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="start"
          gap={{ base: 0, lg: 20 }}
        >
          {/* quizzes list */}
          <Box flex={1} order={{ base: 2, lg: 1 }}>
            <Box px={{ base: 8, lg: 0 }}>
              <Heading fontSize={{ base: "1.75rem", lg: "2rem" }}>
                <Translation id="basics" />
              </Heading>

              <Text mb={8}>
                <Translation id="basics-description" />
              </Text>

              {/* TODO: fix TS error */}
              <QuizzesList
                content={ethereumBasicsQuizzes}
                quizHandler={setCurrentQuiz}
                nextHandler={setNextQuiz}
                modalHandler={setModalOpen}
              />
            </Box>

            <Box px={{ base: 8, lg: 0 }} mb={10}>
              <Heading fontSize={{ base: "1.75rem", lg: "2rem" }}>
                <Translation id="using-ethereum" />
              </Heading>

              <Text mb={8}>
                <Translation id="using-ethereum-description" />
              </Text>

              {/* TODO: fix TS error */}
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
                  mb={-2}
                >
                  <Translation id="want-more-quizzes" />
                </Text>

                <Text align={{ base: "center", lg: "left" }}>
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
          <QuizzesStats
            totalQuizzesNumber={totalQuizzesNumber}
            userScore={userScore}
          />
        </Flex>
      </Box>

      <Content>
        <FeedbackCard />
      </Content>
    </Box>
  )
}

export default QuizzesHubPage

export const query = graphql`
  query QuizzesHubPage($languagesToFetch: [String!]!) {
    # TODO: update locales query
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-run-a-node", "common", "learn-quizzes"] }
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
