import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { motion } from "framer-motion"
import Icon from "../components/Icon"
import styled from "styled-components"
import Emoji from "../components/Emoji"
import Modal from "../components/Modal"
import Tooltip from "../components/Tooltip"
import StatsBoxGrid from "../components/StatsBoxGrid"
import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"
import Morpher from "../components/Morpher"
import BenefitMorpher from "../components/BenefitMorpher"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import ActionCard from "../components/ActionCard"
import {
  Divider,
  GrayContainer,
  CardContainer,
  H2,
  LeftColumn,
  RightColumn,
  FakeLink,
  ButtonSecondary,
} from "../components/SharedStyledComponents"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 500px;
  background-size: cover;
  background: no-repeat 50px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const OldHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  margin: 0 auto;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
`

const H1 = styled.h1`
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.5rem;
  margin: 1.5rem 0;

  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonSecondary)`
  margin-left: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0.5rem;
  }
`

const StyledModal = styled(Modal)`
  padding: 0rem;
  width: 100%;
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const ToutRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 2rem;
`

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
  text-align: center;
  font-size: 20px;
  margin-top: 1rem;
`

const Caption = styled.p`
  color: ${(props) => props.theme.colors.text200};
  text-align: center;
  margin-top: 1rem;
  text-transform: uppercase;
  font-size: 14px;
`

const H3 = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 1rem;
  padding-bottom: 3rem;
`

const OldH3 = styled.h3`
  margin-top: 2.5rem;
`

const StyledCard = styled(ActionCard)`
  min-width: 640px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

/* const ImageCard = styled(Card)`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.text};
` */

const Banner = styled(Img)`
  width: 100%;
  background-color: "#F1FFFD";
  border: 2px solid ${(props) => props.theme.colors.text};
  margin-top: 1rem;
`

const BannerContainer = styled.div`
  display: flex;
  height: 400px;
  margin-bottom: 2rem;
`

const StyledLeftColumn = styled(LeftColumn)`
  padding-left: 4rem;
  padding-right: 4rem;
`

const Image = styled(Img)`
  height: 480px;
  background-size: cover;
  background: no-repeat 50px;
`

const IntroImage = styled(Img)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const WhatIsEthereumImage = styled(Img)`
  width: 100%;
`

const ContainerContent = styled.div`
  padding: 2rem 4rem;
  padding-bottom: 8rem;
`

const ContainerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const MobileOptionContainer = styled(OptionContainer)`
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const Option = styled.div`
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const Stat = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const StatCaption = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  line-height: 100%;
`

const StatContainer = styled.div`
  margin: 4rem;
`

const InfoIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-left: 0.5rem;
`

const Tout = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
`

const TextUpper = styled.div`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: -1rem;
  text-transform: uppercase;
`

const CodeBox = styled.div`
  background: #2a2733;
  color: #9488f3;
  max-height: 320px;
  overflow: scroll;
  font-family: "SFMono-Regular", monospace;
  border-radius: 2px;
`

const CodeBoxHeader = styled.div`
  background: ${(props) => props.theme.colors.ednBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  padding: 1rem;
  position: sticky;
  top: 0;
  display: flex;
`

const CodeBoxContent = styled.div`
  padding: 1rem;
`

const Red = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.fail300};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Yellow = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.gridYellow};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Green = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.success300};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const TestContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxOrange};
  display: flex;
  flex-direction: row;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const TestContainer3 = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  flex-direction: row;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const TestContainerReverse = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  flex-direction: row-reverse;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const IntroTestContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const FinanceContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxOrange};
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 2rem;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const InternetContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const DaoContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 2rem;
  height: 720px;
  margin-top: -1px;
  margin-bottom: 3rem;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const TestCodeBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: #9488f3;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.text};
  font-family: "SFMono-Regular", monospace;
  overflow: scroll;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-top: 1px solid ${(props) => props.theme.colors.text};
  }
`

const RightTestCodeBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: #9488f3;
  height: 100%;
  font-family: "SFMono-Regular", monospace;
  overflow: scroll;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-top: 1px solid ${(props) => props.theme.colors.text};
  }
`

const TestStyledLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const TestCodeBoxContent = styled.div`
  padding: 2rem;
  height: 720px;
  overflow: scroll;
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
`

const StyledH2 = styled(H2)`
  margin-bottom: 0.5rem;
  font-family: serif;
`

const TestOptionContainer = styled.div`
  display: flex;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const TestOption = styled.div`
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const TestOptionRight = styled.div`
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const TestOptionText = styled.div`
  font-size: 16px;
  line-height: 100%;
`

const TestSubtitle = styled(Subtitle)`
  margin-bottom: 2rem;
  font-size: 20px;
`

const DefiBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-left: 1px solid ${(props) => props.theme.colors.text};
  width: 100%;
  height: 100%;
`

const DefiLabel = styled.p`
  font-size: 16px;
  padding-top: 3rem;
  padding-left: 3rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  margin-bottom: 2rem;
`

const DefiStat = styled.p`
  font-size: 64px;
  font-weight: 700;
  padding-left: 3rem;
  margin-bottom: 4rem;
  font-family: "SFMono-Regular", monospace;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
`

const StyledLink = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  text-transform: uppercase;
  text-decoration: underline;
  margin-right: 1rem;
  cursor: pointer;
`

const LinkRow = styled.div`
  padding-left: 3rem;
  display: flex;
  margin-bottom: 0rem;
`

// TODO: defi page, smart contracts (non dev) page, DAOs page

const tooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
  </div>
)

const defiTooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">defipulse.com</Link>
  </div>
)

const nodeTooltipContent = (
  <div>
    Ethereum is run by thousands of volunteers around the globe, known as nodes.
    The more nodes, the healthier the network. Data provided by{" "}
    <Link to="https://www.coingecko.com/en/api">etherscan.io</Link>
  </div>
)

// TODO refactor so all content versions display the same info
const NewHomeTwoPage = ({ data }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)
  const [isModalOpen, setModalOpen] = useState(false)

  const cards = [
    {
      image: data.robotfixed.childImageSharp.fixed,
      title: "Download a wallet",
      description:
        "A wallet lets you connect to Ethereum and manage your funds.",
      to: "/wallets/find-wallet/",
    },

    {
      image: data.ethfixed.childImageSharp.fixed,
      title: "Get ETH",
      description:
        "ETH is the currency of Ethereum – you can use it in applications.",
      to: "/get-eth/",
    },
    {
      image: data.dogefixed.childImageSharp.fixed,
      title: "Use a dapp",
      description:
        "Dapps are applications powered by Ethereum. See what you can do.",
      to: "/dapps/",
    },
    {
      image: data.devfixed.childImageSharp.fixed,
      title: "Start building",
      description:
        "If you want to start coding with Ethereum, check out our docs.",
      to: "/developers/",
    },
  ]

  // lastest contentVersion

  const newSections = [
    {
      img: {
        src: data.individuals,
        alt: "page-index-sections-individuals-image-alt",
      },
      title: "page-index-sections-individuals-title",
      desc: "page-index-sections-individuals-desc",
      link: {
        text: "page-index-sections-individuals-link-text",
        to: "/what-is-ethereum/",
      },
    },
    {
      img: {
        src: data.developers,
        alt: "page-index-sections-developers-image-alt",
      },
      title: "page-index-sections-developers-title",
      desc: "page-index-sections-developers-desc",
      link: {
        text: "page-index-sections-developers-link-text",
        to: "/en/developers/",
      },
    },
    {
      img: {
        src: data.enterprise,
        alt: "page-index-sections-enterprise-image-alt",
      },
      title: "page-index-sections-enterprise-title",
      desc: "page-index-sections-enterprise-desc",
      link: {
        text: "page-index-sections-enterprise-link-text",
        to: "/enterprise/",
      },
    },
  ]

  const features = [
    {
      title: "$512",
      description: "ETH price (USD)",
      emoji: ":money_with_wings:",
      explainer: "The latest price – data from CoinGecko",
    },
    {
      title: "10,000,000,000",
      description: "Transactions today",
      emoji: ":handshake:",
      explainer:
        "The number of transactions succesfully processed on the network in the last 24 hours",
    },
    {
      title: "$21,000,000",
      description: "Daily transaction value",
      emoji: ":chart_with_upwards_trend:",
      explainer: "Total value processed on the network in the last 24 hours",
    },
    {
      title: "12,000",
      description: "Nodes",
      emoji: ":computer:",
      explainer:
        "Ethereum is run by thousands of volunteers around the globe, known as nodes.",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Content>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt={translateMessageId("page-index-hero-image-alt", intl)}
          loading="eager"
        />
      </Content>
      <Morpher />
      <Header>
        <Description>
          <span>
            ethereum.org is your sherpa for Ethereum, the game-changing
            technology behind the cryptocurrency Ether (ETH) and 1000s of
            applications.
          </span>
        </Description>
        <Caption>Welcome to Ethereum, we hope you stick around</Caption>
      </Header>
      <StyledGrayContainer>
        <Content>
          <IntroRow>
            <IntroLeftColumn>
              <H2>Get started</H2>
              <TestSubtitle>
                Ethereum's new and exciting but it can be a learning curve.
                Here's some of the things we recommend you do if you're getting
                started.
              </TestSubtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage fluid={data.hackathon.childImageSharp.fluid} />
            </ImageContainer>
          </IntroRow>
          <CardContainer>
            {cards.map((card, idx) => {
              return (
                <StyledCard
                  key={idx}
                  title={card.title}
                  description={card.description}
                  to={card.to}
                  image={card.image}
                ></StyledCard>
              )
            })}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <IntroTestContainer>
        <RowReverse>
          <TestStyledLeftColumn>
            <StyledH2>Welcome to Ethereum</StyledH2>
            <TestSubtitle>
              Ethereum is an experimental technology that we hope will form the
              infrastructure of our digital future.
            </TestSubtitle>
            <Text>
              It’s a blockchain but it’s also a lot bigger than that. We believe
              it has the power to create a fairer internet, a new digital
              economy and change the way we work together and fund public goods.
              A vibrant community is working on making this future a reality,
              but there’s plenty to explore already.
            </Text>
            <ButtonLink to="/what-is-ethereum/">What is Ethereum?</ButtonLink>
          </TestStyledLeftColumn>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.ethereum.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </IntroTestContainer>

      <FinanceContainer>
        <TestStyledLeftColumn>
          <StyledH2>A fairer financial system</StyledH2>
          <TestSubtitle>
            Legacy financial systems are not fair. Some folks can’t open bank
            accounts or take out a loan. The opportunities to build wealth are
            not equal.
          </TestSubtitle>
          <Text>
            Ethereum is a platform for a new financial system that never sleeps
            or discriminates. It’s a whole digital economy that lets you send,
            receive, borrow, exchange, lend, earn interest, and even stream
            digital funds anywhere in the world. You are your own bank and you
            only need the internet to join in.
          </Text>
          <ButtonRow>
            <ButtonLink to="/what-is-ethereum/">Explore Defi</ButtonLink>
            <StyledButtonLink isSecondary onClick={() => setModalOpen(true)}>
              <StyledIcon name="code" /> See code
            </StyledButtonLink>
          </ButtonRow>
        </TestStyledLeftColumn>
        <ImageContainer>
          <WhatIsEthereumImage fluid={data.impact.childImageSharp.fluid} />
        </ImageContainer>
        <StyledModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
          <RightTestCodeBox>
            <CodeBoxHeader>
              <Red />
              <Yellow />
              <Green />
            </CodeBoxHeader>
            <TestCodeBoxContent>
              // This contract is a bank pragma solidity 0.6.11; contract
              VendingMachine // Declare state variables of the contract address
              public owner; mapping (address = uint) public cupcakeBalances; //
              When 'VendingMachine' contract is deployed: // 1. set the
              deploying address as the owner of the contract // 2. set the
              deployed smart contract's cupcake balance to 100 constructor()
              public owner = msg.sender; cupcakeBalances[address(this)] = 100;
              // Allow the owner to increase the smart contract's cupcake
              balance function refill(uint amount) public require(msg.sender ==
              owner, "Only the owner can refill.")
              cupcakeBalances[address(this)] += amount; // Allow anyone to
              purchase cupcakes function purchase(uint amount) public payable
              require(msg.value = amount * 1 ether, "You must pay at least 1 ETH
              per cupcake"); require(cupcakeBalances[address(this)] = amount,
              "Not enough cupcakes in stock to complete this purchase");
              cupcakeBalances[address(this)] -= amount;
              cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
              contract VendingMachine // Declare state variables of the contract
              address public owner; mapping (address = uint) public
              cupcakeBalances; // When 'VendingMachine' contract is deployed: //
              1. set the deploying address as the owner of the contract // 2.
              set the deployed smart contract's cupcake balance to 100
              constructor() public owner = msg.sender;
              cupcakeBalances[address(this)] = 100; // Allow the owner to
              increase the smart contract's cupcake balance function refill(uint
              amount) public require(msg.sender == owner, "Only the owner can
              refill.") cupcakeBalances[address(this)] += amount; // Allow
              anyone to purchase cupcakes function purchase(uint amount) public
              payable require(msg.value = amount * 1 ether, "You must pay at
              least 1 ETH per cupcake"); require(cupcakeBalances[address(this)]
              = amount, "Not enough cupcakes in stock to complete this
              purchase"); cupcakeBalances[address(this)] -= amount;
              cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
              contract VendingMachine // Declare state variables of the contract
              address public owner; mapping (address = uint) public
              cupcakeBalances; // When 'VendingMachine' contract is deployed: //
              1. set the deploying address as the owner of the contract // 2.
              set the deployed smart contract's cupcake balance to 100
              constructor() public owner = msg.sender;
              cupcakeBalances[address(this)] = 100; // Allow the owner to
              increase the smart contract's cupcake balance function refill(uint
              amount) public require(msg.sender == owner, "Only the owner can
              refill.") cupcakeBalances[address(this)] += amount; // Allow
              anyone to purchase cupcakes function purchase(uint amount) public
              payable require(msg.value = amount * 1 ether, "You must pay at
              least 1 ETH per cupcake"); require(cupcakeBalances[address(this)]
              = amount, "Not enough cupcakes in stock to complete this
              purchase"); cupcakeBalances[address(this)] -= amount;
              cupcakeBalances[msg.sender] += amount;pragma solidity 0.6.11;
              contract VendingMachine // Declare state variables of the contract
              address public owner; mapping (address = uint) public
              cupcakeBalances; // When 'VendingMachine' contract is deployed: //
              1. set the deploying address as the owner of the contract // 2.
              set the deployed smart contract's cupcake balance to 100
              constructor() public owner = msg.sender;
              cupcakeBalances[address(this)] = 100; // Allow the owner to
              increase the smart contract's cupcake balance function refill(uint
              amount) public require(msg.sender == owner, "Only the owner can
              refill.") cupcakeBalances[address(this)] += amount; // Allow
              anyone to purchase cupcakes function purchase(uint amount) public
              payable require(msg.value = amount * 1 ether, "You must pay at
              least 1 ETH per cupcake"); require(cupcakeBalances[address(this)]
              = amount, "Not enough cupcakes in stock to complete this
              purchase"); cupcakeBalances[address(this)] -= amount;
              cupcakeBalances[msg.sender] += amount;
            </TestCodeBoxContent>
          </RightTestCodeBox>
        </StyledModal>
      </FinanceContainer>

      <InternetContainer>
        <RowReverse>
          <TestStyledLeftColumn>
            <StyledH2>An open internet</StyledH2>
            <TestSubtitle>
              Today, you have to hand over your personal information for most
              internet service you want to use – sometimes that personal
              information will even block you from using that service. So even
              if you're not paying for that service with money, you're paying
              with your data.
            </TestSubtitle>
            <Text>
              Services on Ethereum are accessible with an anonymous Ethereum
              walllet, something you can create without any personal
              information. So you can use any of Ethereum's services, including
              the open financial system, whoever you are, wherever you live –
              all without service providers storing those details and profiting
              on them later.
            </Text>
            <ButtonRow>
              <ButtonLink to="/wallets/">What are wallets?</ButtonLink>
              <StyledButtonLink isSecondary>
                <StyledIcon name="code" /> See code
              </StyledButtonLink>
            </ButtonRow>
          </TestStyledLeftColumn>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.future.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </InternetContainer>

      <DaoContainer>
        <TestStyledLeftColumn>
          <StyledH2>A new way to drive change</StyledH2>
          <TestSubtitle>
            Ethereum is a secure way to organise and collaborate with anyone,
            anywhere in the world – even if you've only ever communicated over
            the internet.
          </TestSubtitle>
          <Text>
            In an Ethereum organisation, everyone has a say in how the group's
            money is spent via voting. And a passing vote is the only way to
            spend the funds. This and any other rules are set in the
            organisation's code. No one can break the rules or quietly make
            changes to them – not even the founder. Everyone has an equal voice.
          </Text>
          <Text>
            Many Ethereum product companies have been set up this way in an
            attempt to forge a more diverse and successful future.
          </Text>
          <ButtonRow>
            <ButtonLink to="/wallets/">See organisations</ButtonLink>
            <StyledButtonLink isSecondary>
              <StyledIcon name="code" /> See code
            </StyledButtonLink>
          </ButtonRow>
        </TestStyledLeftColumn>
        <ImageContainer>
          <WhatIsEthereumImage fluid={data.eth.childImageSharp.fluid} />
        </ImageContainer>
      </DaoContainer>

      <H2>Ethereum today</H2>
      <Row>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":money_with_wings:" />
          <StatCaption>
            ETH price (USD)
            <Tooltip content={tooltipContent}>
              <InfoIcon name="info" size="14" />
            </Tooltip>
          </StatCaption>
          <Stat>$512</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":handshake:" />
          <StatCaption>Transactions today</StatCaption>
          <Stat>10,000,000,000</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":chart_with_upwards_trend:" />
          <StatCaption>Daily transaction value (USD)</StatCaption>
          <Stat>$21,000,000</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":computer:" />
          <StatCaption>
            Nodes
            <Tooltip content={nodeTooltipContent}>
              <InfoIcon name="info" size="14" />
            </Tooltip>
          </StatCaption>
          <Stat>12,000</Stat>
        </StatContainer>
      </Row>
      <Content>
        <StatsBoxGrid items={features} />
      </Content>
      {/* // Ethereum tomorrow eth2 section? */}
      <Content>
        <ToutRow>
          <Tout>
            <ImageContainer>
              <Image
                fixed={data.developers.childImageSharp.fixed}
                alt={translateMessageId(
                  "page-what-is-ethereum-alt-img-social",
                  intl
                )}
              />
            </ImageContainer>
            <H3>Build with Ethereum</H3>
            <Text>
              See how Ethereum can open up new business models, reduce your
              costs and future-proof your business.
            </Text>
            <div>
              <ButtonLink to="/developers/">Developer portal</ButtonLink>
            </div>
          </Tout>
          <Tout>
            <ImageContainer>
              <Image
                fixed={data.enterprise.childImageSharp.fixed}
                alt={translateMessageId(
                  "page-what-is-ethereum-alt-img-social",
                  intl
                )}
              />
            </ImageContainer>
            <H3>Add Ethereum to your business</H3>
            <Text>
              See how Ethereum can open up new business models, reduce your
              costs and future-proof your business.
            </Text>
            <div>
              <ButtonLink to="/enterprise/">Mainnet for enterprise</ButtonLink>
            </div>
          </Tout>
        </ToutRow>
      </Content>
    </Page>
  )
}

export default NewHomeTwoPage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dogefixed: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    robotfixed: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethfixed: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    devfixed: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impactfixed: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    hackathonfixed: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    robot: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
