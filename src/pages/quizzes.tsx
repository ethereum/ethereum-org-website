// 0) colors theme dark mode design

// 0) doge background color
// 2) local storage
// 1) col derecha data (current completed, average score, progress, current/total)

// 5) TODO: hide green tick if not passed
// 5) mobile version
// 6) tw share results copy

// 5) dark mode colors
// 6) reordenar imports
// 7) remover componentes no usados
// 8) add translation strings to copy

// 9) rewrite QuizzesModal as Modal with prop borderless, removing padding/borderprops

import React, { useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "@emotion/styled"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Content, Page } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import QuizzesList, { QuizzesListItem } from "../components/Quiz/QuizzesList"

import { getImage } from "../utils/image"

import {
  Box,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react"

import Button from "../components/Button"
import ButtonLink from "../components/ButtonLink"

import { FaGithub, FaTwitter } from "react-icons/fa"
import { TrophyIcon } from "../components/icons/quiz"
import QuizzesModal from "../components/Quiz/QuizzesModal"

// Styles
const GappedPage = styled(Page)`
  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    gap: 3rem;
  }

  * {
    scroll-margin-top: 5.5rem;
  }
`

const HeroContainer = styled.div`
  /* TODO: update background */
  background: ${({ theme }) => theme.colors.runNodeGradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

// TODO: move to custom re-usable hook
const handleShare = (): void => {
  // if (!quizData || !window) return
  // trackCustomEvent({
  //   eventCategory: "Quiz widget",
  //   eventAction: "Other",
  //   eventName: "Share results",
  // })
  const url = `https://ethereum.org${window.location.pathname}%23quiz` // %23 is # character, needs to added to already encoded tweet string
  const tweet =
    encodeURI(
      `I just took the "X" quiz on ethereum.org and scored Y out of Z! Try it yourself at `
    ) + url
  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${"ethereumquiz"}`
  )
}

const QuizzesHubPage = ({ data }: PageProps<Queries.QuizzesHubPageQuery>) => {
  const INITIAL_QUIZ = "what-is-ethereum"
  // TODO: compute value and remove hardcoded number
  const TOTAL_QUIZZES_POINTS = 37
  const USER_SCORE_KEY = "userScoreKey"

  // useEffect(() => {
  //   const isDismissed = localStorage.getItem(storageKey) === "true"
  //   setShow(!isDismissed)
  // }, [])

  // const onClose = () => {
  //   localStorage.setItem(storageKey, "true")
  //   setShow(false)
  // }

  const [currentQuiz, setCurrentQuiz] = useState(INITIAL_QUIZ)
  const [nextQuiz, setNextQuiz] = useState()
  const [userScore, setUserScore] = useState("0")
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(USER_SCORE_KEY)) {
      setUserScore(localStorage.getItem(USER_SCORE_KEY)!)
    } else {
      localStorage.setItem(USER_SCORE_KEY, "0")
      setUserScore("0")
    }
  }, [])

  const { t } = useTranslation()
  const heroContent = {
    // TODO: move to translations
    title: "Ethereum Quizzes",
    header: "Test Your Ethereum Knowledge",
    subtitle:
      "Find out how well you understand Ethereum and cryptocurrencies. Are you ready to become an expert?",
    // TODO: update image alt
    image: getImage(data.doge)!,
    alt: t("page-run-a-node-hero-alt"),
  }

  // TODO: move somewhere else
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
    <GappedPage>
      {/* TODO: update metadata, page title */}
      <PageMetadata
        title={t("page-run-a-node-title")}
        description={t("page-run-a-node-meta-description")}
      />
      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <QuizzesModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <QuizWidget
          quizKey={currentQuiz}
          nextHandler={setNextQuiz}
          setUserScore={setUserScore}
          isStandaloneQuiz={false}
        />
      </QuizzesModal>

      <Box px={{ base: 0, lg: 8 }} py={{ base: 0, lg: 4 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="start"
          gap={{ base: 0, lg: 20 }}
        >
          {/* quizzes list */}
          <Box flex={1} order={{ base: 2, lg: 1 }}>
            <Box px={{ base: 8, lg: 0 }}>
              <Heading fontSize={{ base: "1.75rem", lg: "2rem" }}>
                {/* TODO: move to translations */}
                Ethereum Basics
              </Heading>

              <Text mb={8}>
                This section covers the fundamental concepts of Ethereum,
                ensuring you have a strong foundation.
              </Text>

              <QuizzesList
                content={ethereumBasicsQuizzes}
                numberOfQuizzes={ethereumBasicsQuizzes.length}
                quizHandler={setCurrentQuiz}
                // nextHandler={setNextQuiz}
                modalHandler={setModalOpen}
              />
            </Box>

            <Box px={{ base: 8, lg: 0 }} mb={10}>
              <Heading fontSize={{ base: "1.75rem", lg: "2rem" }}>
                {/* TODO: move to translations */}
                Using Ethereum
              </Heading>

              <Text mb={8}>
                Delve into the real-world applications of Ethereum and uncover
                how this revolutionary blockchain platform is reshaping
                industries. This is a great way to make sure you understand
                things well enough before you start using cryptocurrencies
                actively.
              </Text>

              <QuizzesList
                content={usingEthereumQuizzes}
                numberOfQuizzes={usingEthereumQuizzes.length}
                quizHandler={setCurrentQuiz}
                // nextHandler={setNextQuiz}
                modalHandler={setModalOpen}
              />
            </Box>

            <Flex
              direction={{ base: "column", lg: "row" }}
              justifyContent="space-between"
              alignItems="center"
              bg="ednBackground"
              borderRadius="lg"
              border="none"
              p={{ base: 8, lg: 12 }}
            >
              <Stack mb={{ base: 4, lg: 0 }}>
                {/* TODO: RTL left on md */}
                <Text
                  align={{ base: "center", lg: "left" }}
                  fontWeight="bold"
                  mb={-2}
                >
                  {/* TODO: move to translations */}
                  Want to see more quizzes here?
                </Text>

                {/* TODO: RTL left on md */}
                <Text align={{ base: "center", lg: "left" }}>
                  {/* TODO: move to translations */}
                  Contribute to our library.
                </Text>
              </Stack>

              <ButtonLink
                to={"https://github.com/ethereum/ethereum-org-website"}
                variant="outline"
                hideArrow
                mt={0}
              >
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  {/* TODO: move text to translations */}
                  Add a question/quiz
                </Flex>
              </ButtonLink>
            </Flex>
          </Box>

          {/* quizzes stats */}
          <Box flex={1} order={{ base: 1, lg: 2 }} w="full">
            <Stack mt={{ base: 0, lg: 12 }} gap={2}>
              <Grid
                gap={4}
                bg="ednBackground"
                borderRadius="lg"
                border="none"
                p={{ base: 8, lg: 12 }}
              >
                <GridItem
                  colSpan={{ base: 2, lg: 1 }}
                  alignSelf="center"
                  order={1}
                >
                  {/* TODO: make text RTL */}
                  <Text
                    fontWeight="bold"
                    fontSize="xl"
                    margin={0}
                    textAlign={{ base: "center", lg: "left" }}
                  >
                    Your total points
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
                    leftIcon={<Icon as={FaTwitter} />}
                    onClick={handleShare}
                    w={{ base: "full", lg: "auto" }}
                    mt={{ base: 2, lg: 0 }}
                  >
                    <Translation id="share-results" />
                  </Button>
                </GridItem>

                <GridItem colSpan={2} order={{ base: 2, lg: 3 }}>
                  <Stack gap={2}>
                    {/* user stats */}
                    <Flex
                      justifyContent={{ base: "center", lg: "flex-start" }}
                      alignItems="center"
                    >
                      <Circle size="64px" bg="primary" mr={4}>
                        <TrophyIcon color="neutral" w="35.62px" h="35.62px" />
                      </Circle>

                      <Text fontWeight="bold" fontSize="5xl" mb={0}>
                        {userScore}
                        <Text as="span" color="bodyLight">
                          /{TOTAL_QUIZZES_POINTS}
                        </Text>
                      </Text>
                    </Flex>

                    <Progress value={20} />

                    <Flex direction={{ base: "column", lg: "row" }}>
                      {/* TODO: move text to translations */}
                      {/* TODO: remove hardcoded value */}
                      <Text mr={10} mb={0} mt={{ base: 2, lg: 0 }}>
                        Average score: <Text as="span">83%</Text>
                      </Text>

                      {/* TODO: move text to translations */}
                      {/* TODO: remove hardcoded value */}
                      <Text mb={0}>
                        Completed: <Text as="span">2/{totalQuizzesNumber}</Text>
                      </Text>
                    </Flex>
                  </Stack>
                </GridItem>
              </Grid>

              {/* community stats */}
              <Flex
                direction="column"
                gap="1rem"
                justifyContent="space-between"
                bg="ednBackground"
                borderRadius="lg"
                border="none"
                p={{ base: 8, lg: 12 }}
                display={{ base: "none", lg: "block" }}
              >
                {/* TODO: move text to translations */}
                <Text fontWeight="bold" fontSize="xl">
                  Community stats
                </Text>

                <Flex>
                  <Stack>
                    {/* TODO: move text to translations */}
                    <Text mr={10} mb={-2}>
                      Average score:
                    </Text>

                    <Text>67,4%</Text>
                  </Stack>

                  <Stack>
                    {/* TODO: move text to translations */}
                    <Text mr={10} mb={-2}>
                      Questions answered:
                    </Text>

                    <Text>100000+</Text>
                  </Stack>

                  <Stack>
                    {/* TODO: move text to translations */}
                    <Text mr={10} mb={-2}>
                      Retry:
                    </Text>

                    <Text>15,6%</Text>
                  </Stack>
                </Flex>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>

      <Content>
        <FeedbackCard />
      </Content>
    </GappedPage>
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
