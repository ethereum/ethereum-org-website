// 0) colors theme dark mode design

// 2) local storage
// 1) col derecha data
// 5) custom Progress y Modal components
// 5) TODO: hide green tick if not passed
// 5) mobile version

// 5) dark mode colors
// 6) reordenar imports
// 7) remover componentes no usados
// 8) add translation strings to copy

import React, { useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "@emotion/styled"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Content, Page } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import Modal from "../components/Modal"
import QuizWidget from "../components/Quiz/QuizWidget"

import QuizzesList, { QuizzesListItem } from "../components/QuizzesList"

import { getImage } from "../utils/image"

import {
  Box,
  Flex,
  Heading,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react"

import Button from "../components/Button"
import { FaGithub, FaTwitter } from "react-icons/fa"
import ButtonLink from "../components/ButtonLink"

// Styles
const GappedPage = styled(Page)`
  gap: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    gap: 3rem;
  }
  * {
    scroll-margin-top: 5.5rem;
  }
`

const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.runNodeGradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const SplitContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
    flex-direction: column-reverse;
  }
`

const Column = styled.div`
  flex: 1;
`

// const ModalTitle = styled.h2`
//   margin-top: 0;
//   margin-bottom: 1rem;
// `

const ModalBody = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    max-height: 16rem;
    overflow-y: scroll;
  }
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
  const ethereumBasicsQuizzes: Array<QuizzesListItem> = [
    {
      id: "what-is-ethereum",
      title: "What is Ethereum?",
      level: "beginner",
    },
    {
      id: "what-is-ether",
      title: "What is ether?",
      level: "beginner",
    },
    {
      id: "wallets",
      title: "What is a Wallet?",
      level: "beginner",
    },
    {
      id: "web3",
      title: "What is Web3?",
      level: "beginner",
    },
    {
      id: "security",
      title: "Security and scams",
      level: "beginner",
    },
    {
      id: "merge",
      title: "What is The Merge?",
      level: "beginner",
    },
  ]

  const usingEthereumQuizzes: Array<QuizzesListItem> = [
    {
      id: "nfts",
      title: "What are NFTs?",
      level: "beginner",
    },
    {
      id: "layer-2",
      title: "Using Layer 2",
      level: "intermediate",
    },
  ]

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

      {/* <Divider /> */}

      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <ModalBody>
          <QuizWidget
            quizKey={currentQuiz}
            setUserScore={setUserScore}
            hideHeading
          />
        </ModalBody>
      </Modal>

      <Content>
        {/* TODO: use SplitContent instead?? */}
        <Flex alignItems="start" gap={20}>
          <Box flex={1}>
            <Box>
              <h2>
                {/* TODO: move to translations */}
                Ethereum Basics
              </h2>

              <p>
                This section covers the fundamental concepts of Ethereum,
                ensuring you have a strong foundation.
              </p>

              <QuizzesList
                content={ethereumBasicsQuizzes}
                numberOfQuizzes={ethereumBasicsQuizzes.length}
                quizHandler={setCurrentQuiz}
                modalHandler={setModalOpen}
              />
            </Box>

            <Box mb={10}>
              <h2>
                {/* TODO: move to translations */}
                Using Ethereum
              </h2>

              <p>
                Delve into the real-world applications of Ethereum and uncover
                how this revolutionary blockchain platform is reshaping
                industries. This is a great way to make sure you understand
                things well enough before you start using cryptocurrencies
                actively.
              </p>

              <QuizzesList
                content={usingEthereumQuizzes}
                numberOfQuizzes={usingEthereumQuizzes.length}
                quizHandler={setCurrentQuiz}
                modalHandler={setModalOpen}
              />
            </Box>

            <Flex
              justifyContent="space-between"
              alignItems="center"
              bg="ednBackground"
              borderRadius="lg"
              border="none"
              p={6}
            >
              <Stack>
                <Text fontWeight="bold" mb={-2}>
                  {/* TODO: move to translations */}
                  Want to see more quizzes here?
                </Text>

                <Text>
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

          <Box flex={1}>
            <Stack mt={12} gap={2}>
              <Flex
                direction="column"
                gap="1rem"
                justifyContent="space-between"
                bg="ednBackground"
                borderRadius="lg"
                border="none"
                p={6}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  {/* TODO: move text to translations */}
                  <Text fontWeight="bold" fontSize="xl" margin={0}>
                    Your total points
                  </Text>

                  <Button
                    variant="outline-color"
                    leftIcon={<Icon as={FaTwitter} />}
                    onClick={handleShare}
                  >
                    <Translation id="share-results" />
                  </Button>
                </Flex>

                <Heading
                  as="h4"
                  color="text200"
                  m={0}
                  fontSize="5xl"
                  fontWeight="medium"
                  lineHeight="140%"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                >
                  {/* TODO: update styles here, remove span?? */}
                  <Text as="span" sx={{ color: "black !important" }}>
                    {userScore}
                  </Text>
                  /{TOTAL_QUIZZES_POINTS}
                </Heading>

                <Box>
                  <Progress value={20} />
                </Box>

                <Flex>
                  {/* TODO: move text to translations */}
                  <Text mr={10} mb={0}>
                    Average score: <Text as="span">83%</Text>
                  </Text>

                  {/* TODO: move text to translations */}
                  <Text mb={0}>
                    Completed: <Text as="span">2/8</Text>
                  </Text>
                </Flex>
              </Flex>

              <Flex
                direction="column"
                gap="1rem"
                justifyContent="space-between"
                bg="ednBackground"
                borderRadius="lg"
                border="none"
                p={6}
              >
                {/* TODO: move text to translations */}
                <Text fontWeight="bold" fontSize="xl" margin={0}>
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
      </Content>

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
