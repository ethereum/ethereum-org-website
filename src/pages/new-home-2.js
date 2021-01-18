import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Icon from "../components/Icon"
import styled from "styled-components"
import Modal from "../components/Modal"
import CalloutBanner from "../components/CalloutBanner"
import Tooltip from "../components/Tooltip"
import StatsBoxGrid from "../components/StatsBoxGrid"
import CardList from "../components/CardList"
import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import ActionCard from "../components/ActionCard"
import {
  GrayContainer,
  CardContainer,
  Content,
  Divider,
  H2,
  LeftColumn,
  ButtonSecondary,
} from "../components/SharedStyledComponents"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 500px;
  background-size: cover;
  background: no-repeat 50px;
  margin-bottom: 2rem;
`

const StyledContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem 1rem;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1rem;
    margin-left: 0rem;
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
    flex-direction: column-reverse;
    margin: 0rem;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
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
  align-self: center;
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
  padding: 0rem;
  padding-bottom: 4rem;
  margin-top: 0rem;
`

const OldH3 = styled.h3`
  margin-top: 2.5rem;
`

const StyledCard = styled(ActionCard)`
  min-width: 480px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
    min-width: 240px;
  }
`
const Tout = styled(ActionCard)`
  min-width: 400px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
    min-width: 240px;
  }
`

const StyledCardContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
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
  margin-bottom: 0rem;
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

const DeveloperContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    height: 100%;
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
  border-left: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-top: 1px solid ${(props) => props.theme.colors.text};
  }
`

const TestStyledLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const LeftColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem;
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
  &:hover {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:active {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:focus {
    fill: ${(props) => props.theme.colors.primary};
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

const StyledCardList = styled(CardList)`
  margin-right: 4rem;
  max-width: 624px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    max-width: 100%;
  }
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

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  padding: 0rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 4rem;
    padding: 2rem;
  }
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

  const touts = [
    {
      image: data.docking.childImageSharp.fixed,
      title: "Upgrade your knowledge on Eth2",
      description:
        "Ethereum 2.0 is a program of interconnected upgrades designed to make Ethereum more scalable, secure, and sustainable.",
      to: "/eth2/",
    },
    {
      image: data.infrastructurefixed.childImageSharp.fixed,
      title: "Ethereum for enterprise",
      description:
        "See how Ethereum can open up new business models, reduce your costs and future-proof your business.",
      to: "/enterprise/",
    },
    {
      image: data.enterprise.childImageSharp.fixed,
      title: "The Ethereum community",
      description:
        "Ethereum is all about community. It's made up of people from all different backgrounds and interests. See how you can join in.",
      to: "/enterprise/",
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
      explainer:
        "The latest price for 1 Ether. You can buy as little as 0.000000000000000001 ETH – you don't need to buy 1 whole ETH.",
    },
    {
      title: "10,000,000,000",
      description: "Transactions today",
      emoji: ":handshake:",
      explainer:
        "The number of transactions succesfully processed on the network in the last 24 hours",
    },
    {
      title: "$24,500,000,000",
      description: "Value locked in Defi (USD)",
      emoji: ":chart_with_upwards_trend:",
      explainer:
        "The amount of money in decentralized finance (defi) applications, the Ethereum digital economy. Yes, that's billions.",
    },
    {
      title: "12,000",
      description: "Nodes",
      emoji: ":computer:",
      explainer:
        "Ethereum is run by thousands of volunteers around the globe, known as nodes.",
    },
  ]

  const codeexamples = [
    {
      link: "https://google.com",
      title: "Simple smart contract",
      description: "test",
    },
    {
      link: "https://google.com",
      title: "Ethereum with JavaScript",
      description: "test",
    },
    {
      link: "https://google.com",
      title: "test",
      description: "test",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Hero
        fluid={data.hero.childImageSharp.fluid}
        alt={translateMessageId("page-index-hero-image-alt", intl)}
        loading="eager"
      />
      <Morpher />
      <StyledContent>
        <Header>
          <Description>
            Ethereum is the blockchain behind the Ether cryptocurrency and
            decentralized applications. Ethereum is a bazaar of products and
            services that you only need an internet connection to use.
          </Description>
          <Caption>Welcome to Ethereum, we hope you stick around</Caption>
        </Header>
      </StyledContent>
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2>Get started</H2>
              <TestSubtitle>
                We at ethereum.org are your sherpas for Ethereum. The tech is
                new and exciting – it helps to have a guide. Here's what we
                recommend you do if you want to dive in.
              </TestSubtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage fluid={data.hackathon.childImageSharp.fluid} />
            </ImageContainer>
          </IntroRow>
          <StyledCardContainer>
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
          </StyledCardContainer>
        </StyledContent>
      </StyledGrayContainer>
      <IntroTestContainer>
        <RowReverse>
          <TestStyledLeftColumn>
            <StyledH2>Welcome to Ethereum</StyledH2>
            <TestSubtitle>
              Ethereum is an experimental technology that we believe has the
              power to form the foundation of our online future. A vibrant
              community is working on making this future a reality, but there’s
              plenty to explore already.
            </TestSubtitle>
            <div>
              <ButtonLink to="/what-is-ethereum/">What is Ethereum?</ButtonLink>
            </div>
          </TestStyledLeftColumn>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.ethereum.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </IntroTestContainer>

      <FinanceContainer>
        <TestStyledLeftColumn>
          <LeftColumnContent>
            <StyledH2>A fairer financial system</StyledH2>
            <TestSubtitle>
              Today, some folks can’t open bank accounts, others have their
              payments blocked. Ethereum's open financial system never sleeps or
              discriminates. With just an internet connection, you can send,
              borrow, earn interest, and even stream funds anywhere in the
              world.
            </TestSubtitle>
            <div>
              <ButtonLink to="/dapps/">Explore Defi</ButtonLink>
            </div>
          </LeftColumnContent>
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
            <LeftColumnContent>
              <StyledH2>An open internet</StyledH2>
              <TestSubtitle>
                Today, internet services are closed. You pay for access with
                your personal data. Ethereum services are open by default – you
                just need a wallet. These are easy to set up, controlled by you,
                and work without any personal info.
              </TestSubtitle>
              <ButtonRow>
                <ButtonLink to="/dapps/">Explore the open internet</ButtonLink>
                <StyledButtonLink isSecondary to="/wallets/">
                  More on wallets
                </StyledButtonLink>
              </ButtonRow>
            </LeftColumnContent>
          </TestStyledLeftColumn>
          <ImageContainer>
            <WhatIsEthereumImage fluid={data.future.childImageSharp.fluid} />
          </ImageContainer>
        </RowReverse>
      </InternetContainer>
      <DeveloperContainer>
        <TestStyledLeftColumn>
          <LeftColumnContent>
            <StyledH2>A new frontier for development</StyledH2>
            <TestSubtitle>
              Ethereum apps are built with smart contracts. You can use existing
              contracts like open APIs or build your own. You don't need to
              learn a new language to start. You can use JavaScript and other
              existing languages to interact with contracts and the blockchain.
              Take a look at the examples.
            </TestSubtitle>
            <ButtonRow>
              <ButtonLink to="/developers/">
                More developer resources
              </ButtonLink>
            </ButtonRow>
          </LeftColumnContent>
        </TestStyledLeftColumn>
        <Content>
          <StyledCardList content={codeexamples} limit={5} />
        </Content>
      </DeveloperContainer>

      {/* <DaoContainer>
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
      </DaoContainer> */}
      {/* <Row>
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
      </Row> */}
      <StyledGrayContainer>
        <StyledContent>
          <H2>Ethereum today</H2>
          <TestSubtitle>The latest network statistics</TestSubtitle>
        </StyledContent>
        <StatsBoxGrid items={features} />
      </StyledGrayContainer>
      <StyledContent>
        <H2>Explore ethereum.org</H2>
      </StyledContent>
      <StyledContent>
        <StyledCardContainer>
          {touts.map((tout, idx) => {
            return (
              <Tout
                key={idx}
                title={tout.title}
                description={tout.description}
                to={tout.to}
                image={tout.image}
              ></Tout>
            )
          })}
        </StyledCardContainer>
        <StyledCalloutBanner
          title="Contribute to ethereum.org"
          description="This website is open source with hundreds of community contributors. You can propose edits to any of the content on this site, suggest awesome new features, or help us squash bugs. "
          image={data.finance.childImageSharp.fluid}
          maxImageWidth={600}
          alt={translateMessageId("page-dapps-wallet-callout-image-alt", intl)}
        >
          <ButtonRow>
            <ButtonLink to="/contributing/">More on contributing</ButtonLink>
            <StyledButtonLink
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website"
            >
              <StyledIcon name="github" /> GitHub
            </StyledButtonLink>
          </ButtonRow>
        </StyledCalloutBanner>
      </StyledContent>
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
    developersfluid: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
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
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
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
    docking: file(relativePath: { eq: "eth2/docking.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
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
