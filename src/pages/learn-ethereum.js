import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import CardList from "../components/CardList"
import ActionCard from "../components/ActionCard"
import CalloutBanner from "../components/CalloutBanner"
import Emoji from "../components/Emoji"
import Eth2Articles from "../components/Eth2Articles"
import Eth2Diagram from "../components/Eth2Diagram"
import ExpandableCard from "../components/ExpandableCard"
import GhostCard from "../components/GhostCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import PageHero from "../components/PageHero"
import {
  CardContainer,
  Content,
  Page,
  Divider,
} from "../components/SharedStyledComponents"
import { translateMessageId } from "../utils/translations"

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
`

const StyledInfoBanner = styled(InfoBanner)`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0;
  }
`

const Vision = styled.div`
  margin-top: 4rem;
`

const ContributeCard = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 3rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    margin-right: 0rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const ContributeButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin-top: 1.5rem;
  }
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const StakingColumns = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const CenterH2 = styled(H2)`
  text-align: center;
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
    flex-direction: column-reverse;
    margin: 0rem;
    margin-top: 2rem;
  }
`

const StakingCard = styled(StyledCard)`
  margin: 0;
`

const StakingImage = styled(Img)`
  margin: 3rem 0;
  align-self: center;
  width: 100%;
  max-width: 320px;
`

const LeftColumn = styled.div`
  width: 100%;
`

const RightColumn = styled.div`
  width: 100%;
  margin-left: 2rem;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    flex-direction: column;
  }
`

const FullWidthContainer = styled(Page)`
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 3rem 0rem;
  margin: 3rem 0rem;
`

const Faq = styled.div`
  display: flex;
  margin-top: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ResearchContainer = styled.div`
  margin-top: 2rem;
`

const paths = [
  {
    emoji: ":rocket:",
    title: <Translation id="page-eth2-scalable" />,
    description: <Translation id="page-eth2-scalable-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-eth2-secure" />,
    description: <Translation id="page-eth2-secure-desc" />,
  },
  {
    emoji: ":evergreen_tree:",
    title: <Translation id="page-eth2-index-staking-sustainability" />,
    description: <Translation id="page-eth2-sustainable-desc" />,
  },
]

const LearnPage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: "Learn about Ethereum",
    header: "Get to know Ethereum",
    subtitle: translateMessageId("page-eth2-upgrade-desc", intl),
    image: data.hero.childImageSharp.fluid,
    alt: translateMessageId("page-dapps-doge-img-alt", intl),
  }

  const fundamentals = [
    {
      image: data.ethereum.childImageSharp.fixed,
      title: "What is Ethereum?",
      description: "What is Ethereum?",
      to: "/what-is-ethereum/",
    },
    {
      image: data.eth.childImageSharp.fixed,
      title: "What is ETH?",
      description: "What is ETH?",
      to: "/eth/",
    },
    {
      image: data.wallets.childImageSharp.fixed,
      title: "What are wallets?",
      description: "What are wallets?",
      to: "/walllets/",
    },
  ]

  const fundamentalsQuests = [
    {
      title: "Get some ETH",
      description: "Buy some ETH so you can start using the ecosystem.",
      to: "/get-eth/",
    },
    {
      title: "Download a wallet",
      description: "Download a wallet",
      to: "/find-wallet/",
    },
    {
      title: "Join a community",
      description:
        "Ethereum communities are the perfect place to get help and talk with like-minded folks.",
      to: "/community/",
    },
  ]

  const usecases = [
    {
      image: data.defi.childImageSharp.fixed,
      title: "Decentralized finance",
      description: "What is Ethereum?",
      to: "/defi/",
    },
    {
      image: data.nft.childImageSharp.fixed,
      title: "Non-fungible tokens",
      description: "What is ETH?",
      to: "/nft/",
    },
    {
      image: data.dao.childImageSharp.fixed,
      title: "Decentralized autonomous organisations",
      description: "What are wallets?",
      to: "/dao/",
    },
  ]

  const usecasesQuests = [
    {
      title: "Try a dapp",
      description:
        "Give one of the dapps we recommend a go to explore the ecosystem.",
      to: "/dapps/",
    },
    {
      title: "Get a stablecoin",
      description: "You'll find these useful in lots of dapps.",
      to: "/stablecoins/",
    },
    {
      title: "Buy/mint an NFT",
      description: "Start your digital artwork collection.",
      to: "/dapps/?category=collectibles",
    },
    {
      title: "Buy an ENS name",
      description: "Buy an ENS domain name for your wallet.",
      to: "/dapps/?category=technology",
    },
    {
      title: "Join a DAO",
      description: "Find a DAO you might want to contribute to.",
      to: "/community/#decentralized-autonomous-organizations-daos",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-eth2-meta-title", intl)}
        description={translateMessageId("page-eth2-meta-desc", intl)}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <H2>Ethereum fundamentals</H2>
        <p>
          Start here if you're new to Ethereum. We'll cover the basics of what
          you need to know.
        </p>
        <StyledCardContainer>
          {fundamentals.map((fundamental, idx) => {
            return (
              <ActionCard
                key={idx}
                image={fundamental.image}
                title={fundamental.title}
                description={fundamental.description}
                to={fundamental.to}
              />
            )
          })}
        </StyledCardContainer>
        <h3>Quests</h3>
        <p>Now that you know the fundamentals, try these...</p>
        <CardList content={fundamentalsQuests} />
      </Content>
      <FullWidthContainer>
        <Content>
          <H2>Further down the rabbit hole</H2>
          <p>
            If you've got Ethereum and ETH covered, you might like to learn more
            about what you can do on Ethereum.
          </p>
          <StyledCardContainer>
            {usecases.map((usecase, idx) => {
              return (
                <ActionCard
                  key={idx}
                  image={usecase.image}
                  title={usecase.title}
                  description={usecase.description}
                  to={usecase.to}
                />
              )
            })}
          </StyledCardContainer>
          <h3>Quests</h3>
          <p>Now that you know the fundamentals, try these...</p>
          <CardList content={usecasesQuests} />
        </Content>
      </FullWidthContainer>
    </Page>
  )
}

export default LearnPage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "ethereum-learn.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    docking: file(relativePath: { eq: "eth2/docking.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wallets: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    defi: file(relativePath: { eq: "use-cases/defi.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    nft: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
