// 1) agregar boton start
// 2) reordenar imports
// 3) remover componentes no usados

// Libraries
import React, { ReactNode, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "@emotion/styled"
import { type Icon as ChakraIcon } from "@chakra-ui/react"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Content, Divider, Page } from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import FeedbackCard from "../components/FeedbackCard"
import Icon from "../components/Icon"
import Modal from "../components/Modal"
import QuizWidget from "../components/Quiz/QuizWidget"
import QuizzesList, { QuizzesListItem } from "../components/QuizzesList"

// Utils
import { getImage } from "../utils/image"

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

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`

const ModalBody = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    max-height: 16rem;
    overflow-y: scroll;
  }
`

const QuizzesHubPage = ({ data }: PageProps<Queries.QuizzesHubPageQuery>) => {
  const [currentQuiz, setCurrentQuiz] = useState("what-is-ethereum")
  const [isModalOpen, setModalOpen] = useState(false)

  const { t } = useTranslation()
  const heroContent = {
    // TODO: move to translations
    title: "Ethereum Quizzes",
    header: "How well do you know Ethereum?",
    subtitle:
      "Test your knowledge and find out how well you understand Ethereum and cryptocurrencies in general.",
    // TODO: update image alt
    image: getImage(data.doge)!,
    alt: t("page-run-a-node-hero-alt"),
  }

  // TODO: move somewhere else
  const ethereumBasicsQuizzes: Array<QuizzesListItem> = [
    {
      id: "what-is-ethereum",
      title: "What is Ethereum?",
    },
    {
      id: "what-is-ether",
      title: "What is Ether?",
    },
    {
      id: "wallets",
      title: "What is a Wallet?",
    },
    {
      id: "nfts",
      title: "What are NFTs?",
    },
    {
      id: "web3",
      title: "What is Web3?",
    },
    {
      id: "merge",
      title: "What is The Merge?",
    },
    {
      id: "security",
      title: "Scam and Prevention in Crypto",
    },
  ]

  const usingEthereumQuizzes: Array<QuizzesListItem> = [
    {
      id: "layer-2",
      title: "Using Layer 2",
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
          <QuizWidget quizKey={currentQuiz} hideHeading />
        </ModalBody>
      </Modal>

      <Content>
        <SplitContent>
          <Column>
            <h2>
              {/* TODO: move to translations */}
              Ethereum Basics
            </h2>
            <p>
              Test your knowledge on the basics of ethereum. Every quiz draws
              from a larger pool of questions around specific topic so even
              repeated take will test you on different aspects and deepen your
              understanding.
            </p>

            <QuizzesList
              content={ethereumBasicsQuizzes}
              quizHandler={setCurrentQuiz}
              modalHandler={setModalOpen}
            />

            <h2>
              {/* TODO: move to translations */}
              Using Ethereum
            </h2>
            <p>
              Quizzes in this section are a great way to make sure you
              understand things well enough if you want to use your crypto more
              actively . Some questions may be more advanced and technical.
            </p>

            <QuizzesList
              content={usingEthereumQuizzes}
              quizHandler={setCurrentQuiz}
              modalHandler={setModalOpen}
            />
          </Column>
          <Column></Column>
        </SplitContent>
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
