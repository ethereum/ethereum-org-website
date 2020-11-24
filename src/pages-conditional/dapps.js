import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl, navigate } from "gatsby-plugin-intl"
import { getLangContentVersion, getDefaultMessage } from "../utils/translations"
import Translation from "../components/Translation"
import Pill from "../components/Pill"
import BoxGrid from "../components/BoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import ProductCard from "../components/ProductCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import Warning from "../components/Warning"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Content,
  Page,
  CenterDivider,
  Eth2Header,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  border-radius: 2px;
  padding: 0rem 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    padding: 0;
  }
`

const HeroContent = styled.div`
  max-width: 640px;
  padding: 8rem 0 8rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 4rem 0;
    max-width: 100%;
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  margin-top: 3rem;
  margin-right: 3rem;
  width: 100%;
  max-width: 624px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
    margin-right: 0;
    max-width: 560px;
  }
`

const HeroHeader = styled(Eth2Header)`
  max-width: 100%;
`

const MagiciansImage = styled(Img)`
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  width: 100%;
  min-width: 240px;
  max-width: 300px;
  margin: 2rem 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 2rem 0rem;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledGhostCard = styled(GhostCard)`
  .ghost-card-base {
    display: flex;
    justify-content: center;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
`

const HeroSubtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const IntroRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  background: ${(props) => props.theme.colors.background};
  border-radius: 32px;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
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

const StyledWarning = styled(Warning)`
  margin: 0rem 0 0rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0;
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
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
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

const Column = styled.div`
  flex: 1 1 75%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const FullWidthContainer = styled(Page)`
  margin: 0rem 0rem;
  margin-bottom: 4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 2rem 0rem;
  padding-top: 4rem;
`

const CardContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`

const CenteredCard = styled(Card)`
  text-align: center;
`

const StepBoxContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0rem;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const StepBox = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  width: 100%;
  &:hover {
    background: ${(props) => props.theme.colors.ednBackground};
    transition: transform 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2rem;
  }
`

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  a {
    display: none;
  }
`

const CenterText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 1.5rem;
    margin-bottom: 1rem;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`

const RightColumn = styled.div`
  margin-left: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`
const About = styled.div`
  margin-top: 3rem;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-items: flex-start;
  }
`

const BoxText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    text-align: left;
  }
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
  margin-right: 1rem;
`
const AddDapp = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const AddDappButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2rem;
  }
`

const StyledDocLink = styled(DocLink)``

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 12rem;
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
`

const FINANCE = "finance"
const TECHNOLOGY = "technology"
const COLLECTIBLES = "collectibles"
const GAMING = "gaming"

const DappsPage = ({ data }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)
  const [selectedCategory, setCategory] = useState(FINANCE)

  const handleMobileCategorySelect = (category) => {
    setCategory(category)
    navigate("/dapps/#explore")
  }

  const features = [
    {
      title: intl.formatMessage({
        id: "page-dapps-features-1-title",
        defaultMessage: getDefaultMessage("page-dapps-features-1-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-1-description",
        defaultMessage: getDefaultMessage("page-dapps-features-1-description"),
      }),
      emoji: ":bust_in_silhouette:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-2-title",
        defaultMessage: getDefaultMessage("page-dapps-features-2-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-2-description",
        defaultMessage: getDefaultMessage("page-dapps-features-2-description"),
      }),
      emoji: ":megaphone:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-3-title",
        defaultMessage: getDefaultMessage("page-dapps-features-3-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-3-description",
        defaultMessage: getDefaultMessage("page-dapps-features-3-description"),
      }),
      emoji: ":money-mouth_face:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-4-title",
        defaultMessage: getDefaultMessage("page-dapps-features-4-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-4-description",
        defaultMessage: getDefaultMessage("page-dapps-features-4-description"),
      }),
      emoji: ":electric_plug:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-5-title",
        defaultMessage: getDefaultMessage("page-dapps-features-5-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-5-description",
        defaultMessage: getDefaultMessage("page-dapps-features-5-description"),
      }),
      emoji: ":detective:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-6-title",
        defaultMessage: getDefaultMessage("page-dapps-features-6-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-6-description",
        defaultMessage: getDefaultMessage("page-dapps-features-6-description"),
      }),
      emoji: ":key:",
    },
    {
      title: intl.formatMessage({
        id: "page-dapps-features-7-title",
        defaultMessage: getDefaultMessage("page-dapps-features-7-title"),
      }),
      description: intl.formatMessage({
        id: "page-dapps-features-7-description",
        defaultMessage: getDefaultMessage("page-dapps-features-7-description"),
      }),
      emoji: ":antenna_with_bars:",
    },
  ]

  const categories = {
    finance: {
      title: intl.formatMessage({
        id: "page-dapps-finance-button",
        defaultMessage: getDefaultMessage("page-dapps-finance-button"),
      }),
      emoji: ":money_with_wings:",
      benefitsTitle: intl.formatMessage({
        id: "page-dapps-finance-title",
        defaultMessage: getDefaultMessage("page-dapps-finance-benefits-title"),
      }),
      benefitsDescription: intl.formatMessage({
        id: "page-dapps-finance-benefits-description",
        defaultMessage: getDefaultMessage(
          "page-dapps-finance-benefits-description"
        ),
      }),
      benefits: [
        {
          emoji: ":open_lock:",
          title: intl.formatMessage({
            id: "page-dapps-finance-benefits-1-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-1-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-finance-benefits-1-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-1-description"
            ),
          }),
        },
        {
          emoji: ":bank:",
          title: intl.formatMessage({
            id: "page-dapps-finance-benefits-2-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-2-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-finance-benefits-2-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-2-description"
            ),
          }),
        },
        {
          emoji: ":scales:",
          title: intl.formatMessage({
            id: "page-dapps-finance-benefits-3-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-3-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-finance-benefits-3-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-3-description"
            ),
          }),
        },
        {
          emoji: ":chains:",
          title: intl.formatMessage({
            id: "page-dapps-finance-benefits-4-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-4-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-finance-benefits-4-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-finance-benefits-4-description"
            ),
          }),
        },
      ],
    },
    collectibles: {
      title: intl.formatMessage({
        id: "page-dapps-collectibles-button",
        defaultMessage: getDefaultMessage("page-dapps-collectibles-button"),
      }),
      emoji: ":frame_with_picture:",
      benefitsTitle: intl.formatMessage({
        id: "page-dapps-collectibles-benefits-title",
        defaultMessage: getDefaultMessage(
          "page-dapps-collectibles-benefits-title"
        ),
      }),
      benefitsDescription: intl.formatMessage({
        id: "page-dapps-collectibles-benefits-description",
        defaultMessage: getDefaultMessage(
          "page-dapps-collectibles-benefits-description"
        ),
      }),
      benefits: [
        {
          emoji: ":white_check_mark:",
          title: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-1-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-1-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-1-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-1-description"
            ),
          }),
        },
        {
          emoji: ":man_singer:",
          title: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-2-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-2-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-2-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-2-description"
            ),
          }),
        },
        {
          emoji: ":shopping_bags:",
          title: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-3-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-3-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-3-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-3-description"
            ),
          }),
        },
        {
          emoji: ":department_store:",
          title: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-4-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-4-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-collectibles-benefits-4-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-collectibles-benefits-4-description"
            ),
          }),
        },
      ],
    },
    gaming: {
      title: intl.formatMessage({
        id: "page-dapps-gaming-button",
        defaultMessage: getDefaultMessage("page-dapps-gaming-button"),
      }),
      emoji: ":video_game:",
      benefitsTitle: intl.formatMessage({
        id: "page-dapps-gaming-benefits-title",
        defaultMessage: getDefaultMessage("page-dapps-gaming-benefits-title"),
      }),
      benefitsDescription: intl.formatMessage({
        id: "page-dapps-gaming-benefits-description",
        defaultMessage: getDefaultMessage(
          "page-dapps-gaming-benefits-description"
        ),
      }),
      benefits: [
        {
          emoji: ":crossed_swords:",
          title: intl.formatMessage({
            id: "page-dapps-gaming-benefits-1-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-1-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-gaming-benefits-1-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-1-description"
            ),
          }),
        },
        {
          emoji: ":european_castle:",
          title: intl.formatMessage({
            id: "page-dapps-gaming-benefits-2-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-2-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-gaming-benefits-2-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-2-description"
            ),
          }),
        },
        {
          emoji: ":handshake:",
          title: intl.formatMessage({
            id: "page-dapps-gaming-benefits-3-title",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-3-title"
            ),
          }),
          description: intl.formatMessage({
            id: "page-dapps-gaming-benefits-3-description",
            defaultMessage: getDefaultMessage(
              "page-dapps-gaming-benefits-3-description"
            ),
          }),
        },
      ],
    },
    technology: {
      title: intl.formatMessage({
        id: "page-dapps-technology-button",
        defaultMessage: getDefaultMessage("page-dapps-technology-button"),
      }),
      emoji: ":keyboard:",
    },
  }

  const categoryKeys = Object.keys(categories)

  const lending = [
    {
      title: "Aave",
      description: "Lend your tokens to earn interest and withdraw any time.",
      link: "https://aave.com/",
      image: data.aave.childImageSharp.fluid,
    },
    {
      title: "Compound",
      description: "Lend your tokens to earn interest and withdraw any time.",
      link: "https://compound.finance/",
      image: data.compound.childImageSharp.fluid,
    },
    {
      title: "Oasis",
      description: "Trade, borrow, and save with Dai, an Ethereum stablecoin.",
      link: "https://oasis.app//",
      image: data.dai.childImageSharp.fluid,
    },
  ]

  const dex = [
    {
      title: "Uniswap",
      description: "Swap tokens simply or provide tokens for % rewards.",
      link: "https://uniswap.org/",
      image: data.uniswap.childImageSharp.fluid,
    },
    {
      title: "Matcha",
      description:
        "Searches multiple exchanges to help find you the best prices.",
      link: "https://matcha.xyz",
      image: data.matcha.childImageSharp.fluid,
    },
    {
      title: "1inch",
      description:
        "Helps you avoid high price slippage by aggregating best prices.",
      link: "https://1inch.exchange/",
      image: data.oneinch.childImageSharp.fluid,
    },
  ]

  const trading = [
    {
      title: "Polymarket",
      description: "Bet on outcomes. Trade on information markets.",
      link: "https://polymarket.com",
      image: data.polymarket.childImageSharp.fluid,
    },
    {
      title: "Augur",
      description:
        "Bet on outcomes of sports, economics, and more world events.",
      link: "https://augur.net",
      image: data.augur.childImageSharp.fluid,
    },
    {
      title: "Loopring",
      description: "Peer-to-peer trading platform built for speed.",
      link: "https://loopring.org/#/",
      image: data.loopring.childImageSharp.fluid,
    },
    {
      title: "dYdX",
      description:
        "Open short or leveraged positions with leverage up to 10x. Lending and borrowing available too.",
      link: "https://dydx.exchange/",
      image: data.dydx.childImageSharp.fluid,
    },
  ]

  const lottery = [
    {
      title: "Gitcoin Grants",
      description:
        "Crowdfunding for Ethereum community projects with amplified contributions.",
      link: "https://gitcoin.co/grants/?",
      image: data.gitcoin.childImageSharp.fluid,
    },
  ]

  const payments = [
    {
      title: "Tornado cash",
      description: "Send anonymous transactions on Ethereum.",
      link: "https://tornado.cash/",
      image: data.tornado.childImageSharp.fluid,
    },
    {
      title: "Sablier",
      description: "Stream money in real-time.",
      link: "https://pay.sablier.finance/",
      image: data.sablier.childImageSharp.fluid,
    },
  ]

  const investments = [
    {
      title: "Token Sets",
      description: "Crypto investment strategies that automatically rebalance.",
      link: "https://www.tokensets.com/",
      image: data.set.childImageSharp.fluid,
    },
    {
      title: "PoolTogether",
      description: "A lottery you can't lose. Prizes every week.",
      link: "https://pooltogether.com/",
      image: data.pooltogether.childImageSharp.fluid,
    },
  ]

  const computing = [
    {
      title: "Golem",
      description: "Access shared computing power or rent your own resources.",
      link: "https://golem.network/",
      image: data.golem.childImageSharp.fluid,
    },
    /* {
      title: "radicle.xyz",
      description:
        "Secure peer-to-peer code collaboration without intermediaries.",
      link: "https://radicle.xyz/",
      image: data.radicle.childImageSharp.fluid,
    }, */
  ]

  const marketplaces = [
    {
      title: "Gitcoin",
      description: "Earn crypto working on open-source software.",
      link: "https://gitcoin.co/",
      image: data.gitcoin.childImageSharp.fluid,
    },
  ]

  const utilities = [
    {
      title: "Ethereum Name Service (ENS)",
      description:
        "User-friendly names for Ethereum addresses and decentralized sites.",
      link: "http://ens.domains/",
      image: data.ens.childImageSharp.fluid,
    },
  ]

  const browsers = [
    {
      title: "Brave",
      description:
        "Earn tokens for browsing and support your favorite creators with them.",
      link: "https://brave.com/",
      image: data.brave.childImageSharp.fluid,
    },
    {
      title: "Opera",
      description:
        "Send crypto from your browser to merchants, other users and apps.",
      link: "https://www.opera.com/crypto",
      image: data.opera.childImageSharp.fluid,
    },
  ]

  const arts = [
    {
      title: "Foundation",
      description:
        "Invest in unique editions of digital artwork and trade pieces with other buyers.",
      link: "https://foundation.app/",
      image: data.foundation.childImageSharp.fluid,
    },
    {
      title: "SuperRare",
      description:
        "Buy digital artworks direct from artists or in secondary markets. ",
      link: "https://www.superrare.co",
      image: data.superrare.childImageSharp.fluid,
    },
    {
      title: "Nifty Gateway",
      description:
        "Buy works on-chain from top artists, athletes, brands, and creators.",
      link: "https://niftygateway.com/",
      image: data.nifty.childImageSharp.fluid,
    },
  ]

  const music = [
    {
      title: "Audius",
      description:
        "Decentralized streaming platform. Listens = money for creators, not labels.",
      link: "https://audius.co/",
      image: data.audius.childImageSharp.fluid,
    },
  ]

  const collectibles = [
    {
      title: "OpenSea",
      description: "Buy, sell, discover, and trade limited-edition goods.",
      link: "https://opensea.io/",
      image: data.opensea.childImageSharp.fluid,
    },
    {
      title: "marble.cards",
      description: "Create and trade unique digital cards based on URLs.",
      link: "https://marble.cards/",
      image: data.marble.childImageSharp.fluid,
    },
    {
      title: "Rarible",
      description: "Create, sell and buy tokenised collectibles.",
      link: "https://rarible.com/",
      image: data.rarible.childImageSharp.fluid,
    },
    {
      title: "CryptoPunks",
      description:
        "Buy, bid on, and offer punks for sale – one of the first token collectibles on Ethereum.",
      link: "https://www.larvalabs.com/cryptopunks",
      image: data.cryptopunks.childImageSharp.fluid,
    },
  ]

  const worlds = [
    {
      title: "Cryptovoxels",
      description:
        "Create art galleries, build stores, and buy land – an Ethereum virtual world.",
      link: "https://www.cryptovoxels.com/",
      image: data.cryptovoxels.childImageSharp.fluid,
    },
    {
      title: "Decentraland",
      description:
        "Collect, trade virtual land in a virtual world you can explore.",
      link: "https://decentraland.org/",
      image: data.decentraland.childImageSharp.fluid,
    },
  ]

  const competitive = [
    {
      title: "Axie Infinity",
      description:
        "Trade and battle creatures called Axies. And earn as you play – available on mobile",
      link: "https://axieinfinity.com/",
      image: data.axie.childImageSharp.fluid,
    },
    {
      title: "Gods Unchained",
      description:
        "Strategic trading card game. Earn cards by playing that you can sell in real life.",
      link: "https://godsunchained.com/",
      image: data.gods.childImageSharp.fluid,
    },
    {
      title: "Dark Forest",
      description:
        "Conquer planets in an infinite, procedurally-generated, cryptographically-specified universe.",
      link: "https://zkga.me/",
      image: data.darkforest.childImageSharp.fluid,
    },
  ]

  const editorChoices = [
    {
      name: "Uniswap",
      description:
        "Swap your tokens with ease. A community favourite that allows you to trade tokens with folks across the network.",
      url: "https://uniswap.exchange/swap",
      image: data.uniswapec.childImageSharp.fixed,
      alt: "Uniswap Logo",
      background: "#212F46",
      type: FINANCE,
      pillColor: "tagMint",
    },
    {
      name: "Dark Forest",
      description:
        "Play against others to conquer planets and try out bleeding-edge Ethereum scaling/privacy technology. Maybe one for those already familiar with Ethereum.",
      url: "https://zkga.me",
      image: data.darkforestec.childImageSharp.fixed,
      alt: "Darkforest logo",
      background: "#080808",
      type: GAMING,
      pillColor: "tagOrange",
    },
    {
      name: "Foundation",
      description:
        "Invest in culture. Buy, trade, and sell unique digital artwork and fashion from some incredible artists, musicians, and  brands.",
      url: "https://foundation.app",
      image: data.foundationec.childImageSharp.fixed,
      alt: "Foundation logo",
      background: "#ffffff",
      type: COLLECTIBLES,
      pillColor: "tagBlue",
    },
    {
      name: "PoolTogether",
      description:
        "Buy a ticket for the no-loss lottery. Each week, the interest generated from the entire ticket pool is sent to one lucky winner. Get your money back whenever you like.",
      url: "https://pooltogether.com",
      image: data.pooltogetherec.childImageSharp.fixed,
      alt: "Pooltogether logo",
      background: "#7E4CF2",
      type: FINANCE,
      pillColor: "tagMint",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title="Decentralized applications (dapps)"
        description="Find an Ethereum application to try."
      />
      <Content>
        <HeroContainer>
          <HeroContent>
            <Title>
              <Translation id="page-dapps-title" />
            </Title>
            <HeroHeader>
              <Translation id="page-dapps-hero-header" />
            </HeroHeader>
            <HeroSubtitle>
              <Translation id="page-dapps-hero-subtitle" />
            </HeroSubtitle>
            <ButtonRow>
              <StyledButtonLink to="#explore">
                <Translation id="page-dapps-explore-dapps-title" />
              </StyledButtonLink>
              <StyledButtonLink isSecondary to="#what-are-dapps">
                <Translation id="page-dapps-what-are-dapps" />
              </StyledButtonLink>
            </ButtonRow>
          </HeroContent>
          <Hero
            fluid={data.doge.childImageSharp.fluid}
            alt="Illustration of a doge using a computer"
          />
        </HeroContainer>
      </Content>
      <Content>
        <H2>
          <Translation id="get-started" />
        </H2>
        <p>
          <Translation id="page-dapps-get-started-subtitle" />{" "}
          <Link to="/glossary/#transaction-fee">
            <Translation id="transaction-fees" />
          </Link>
          .
        </p>
        <Row>
          <StepBoxContainer>
            <StepBox to="/get-eth/">
              <div>
                <H3>
                  1. <Translation id="page-wallet-get-some" />
                </H3>
                <p>
                  <Translation id="page-dapps-get-some-eth-description" />
                </p>
              </div>
              <ButtonSecondary>
                <Translation id="page-home-section-individuals-item-six" />
              </ButtonSecondary>
            </StepBox>
            <StepBox to="/wallets/find-wallet/">
              <div>
                <H3>
                  2. <Translation id="page-dapps-set-up-a-wallet-title" />
                </H3>
                <p>
                  <Translation id="page-dapps-set-up-a-wallet-description" />
                </p>
              </div>
              <ButtonSecondary>
                <Translation id="page-dapps-set-up-a-wallet-button" />
              </ButtonSecondary>
            </StepBox>
            <StepBox to="#explore">
              <div>
                <H3>
                  3. <Translation id="page-dapps-ready-title" />
                </H3>
                <p>
                  <Translation id="page-dapps-ready-description" />
                </p>
              </div>
              <ButtonPrimary>
                <Translation id="page-dapps-ready-button" />
              </ButtonPrimary>
            </StepBox>
          </StepBoxContainer>
        </Row>
        <h3>
          <Translation id="page-dapps-editors-choice-header" />{" "}
          <Emoji text=":+1:" size={1} />
        </h3>
        <p>
          <Translation id="page-dapps-editors-choice-description" />
        </p>
        <StyledCardGrid>
          {editorChoices.map((choice, idx) => {
            return (
              <ProductCard
                key={idx}
                background={choice.background}
                description={choice.description}
                url={choice.url}
                alt={choice.alt}
                image={choice.image}
                name={choice.name}
              >
                <Pill color={choice.pillColor}>{choice.type}</Pill>
              </ProductCard>
            )
          })}
        </StyledCardGrid>
      </Content>
      <FullWidthContainer>
        <H2 id="explore">
          <Translation id="page-dapps-explore-dapps-title" />
        </H2>
        <CenterText>
          <Translation id="page-dapps-explore-dapps-description" />
        </CenterText>
        <h3>
          <Translation id="page-dapps-choose-category" />
        </h3>
        <OptionContainer>
          {categoryKeys.map((key, idx) => {
            const category = categories[key]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === key}
                onClick={() => setCategory(key)}
              >
                <Emoji mr={`1rem`} text={category.emoji} />
                <OptionText>{category.title}</OptionText>
              </Option>
            )
          })}
        </OptionContainer>
        {/* Category-specific content */}
        {selectedCategory === FINANCE && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-finance-title" />{" "}
                  <Emoji
                    size={"2rem"}
                    ml={"0.5rem"}
                    text=":money_with_wings:"
                  />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-finance-description" />
                </Subtitle>
              </Column>
              <StyledWarning>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledWarning>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-lending",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-lending"
                    ),
                  })}
                  content={lending}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-dex",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-dex"
                    ),
                  })}
                  content={dex}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-trading",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-trading"
                    ),
                  })}
                  content={trading}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-investments",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-investments"
                    ),
                  })}
                  content={investments}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-payments",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-payments"
                    ),
                  })}
                  content={payments}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-lottery",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-lottery"
                    ),
                  })}
                  content={lottery}
                />
              </RightColumn>
            </TwoColumnContent>
            <StyledCalloutBanner
              title={intl.formatMessage({
                id: "page-dapps-wallet-callout-title",
                defaultMessage: getDefaultMessage(
                  "page-dapps-wallet-callout-title"
                ),
              })}
              description={intl.formatMessage({
                id: "page-dapps-wallet-callout-description",
                defaultMessage: getDefaultMessage(
                  "page-dapps-wallet-callout-description"
                ),
              })}
              image={data.wallet.childImageSharp.fluid}
              maxImageWidth={300}
              alt={intl.formatMessage({
                id: "page-dapps-wallet-callout-image-alt",
                defaultMessage: getDefaultMessage(
                  "page-dapps-wallet-callout-image-alt"
                ),
              })}
            >
              <div>
                <ButtonLink to="/wallets/find-wallet/">
                  <Translation id="page-dapps-wallet-callout-button" />
                </ButtonLink>
              </div>
            </StyledCalloutBanner>
          </Content>
        )}
        {selectedCategory === GAMING && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-gaming-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":video_game:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-gaming-description" />
                </Subtitle>
              </Column>
              <StyledWarning>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledWarning>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-worlds",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-worlds"
                    ),
                  })}
                  content={worlds}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-competitive",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-competitive"
                    ),
                  })}
                  content={competitive}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === TECHNOLOGY && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-technology-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":keyboard:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-technology-description" />
                </Subtitle>
              </Column>
              <StyledWarning>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledWarning>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-utilities",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-utilities"
                    ),
                  })}
                  content={utilities}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-marketplaces",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-marketplaces"
                    ),
                  })}
                  content={marketplaces}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-computing",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-computing"
                    ),
                  })}
                  content={computing}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-browsers",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-browsers"
                    ),
                  })}
                  content={browsers}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === COLLECTIBLES && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-collectibles-title" />{" "}
                  <Emoji
                    size={"2rem"}
                    ml={"0.5rem"}
                    text=":frame_with_picture:"
                  />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-collectibles-description" />
                </Subtitle>
              </Column>
              <StyledWarning>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledWarning>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-arts",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-arts"
                    ),
                  })}
                  content={arts}
                />

                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-music",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-music"
                    ),
                  })}
                  content={music}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={intl.formatMessage({
                    id: "page-dapps-category-collectibles",
                    defaultMessage: getDefaultMessage(
                      "page-dapps-category-collectibles"
                    ),
                  })}
                  content={collectibles}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {/* General content for all categories */}
        <Content>
          <AddDapp>
            <div>
              <H2>
                <Translation id="page-dapps-add-title" />
              </H2>
              <TextNoMargin>
                <Translation id="page-dapps-add-description" />{" "}
                <Link to="/contributing/adding-products/">
                  <Translation id="page-dapps-add-link" />
                </Link>
              </TextNoMargin>
            </div>
            <AddDappButton
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_dapp.md&title="
            >
              <Translation id="page-dapps-add-button" />
            </AddDappButton>
          </AddDapp>
          <CenterDivider />
          {categories[selectedCategory].benefits && (
            <About>
              <H2>
                <Translation id="page-dapps-magic-title-1" />{" "}
                <Emoji size={"1rem"} text=":sparkles:" />{" "}
                <Translation id="page-dapps-magic-title-2" />{" "}
                {categories[selectedCategory].benefitsTitle}
              </H2>
              <p>{categories[selectedCategory.benefitsDescription]}</p>
              <CardContainer>
                {categories[selectedCategory].benefits.map((art, idx) => {
                  return (
                    <CenteredCard
                      key={idx}
                      emoji={art.emoji}
                      title={art.title}
                      description={art.description}
                    />
                  )
                })}
              </CardContainer>
            </About>
          )}
        </Content>
        <MobileOptionContainer>
          <h3>
            <Translation id="page-dapps-mobile-options-header" />
          </h3>
          {categoryKeys.map((key, idx) => {
            const category = categories[key]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === key}
                onClick={() => handleMobileCategorySelect(key)}
              >
                <Emoji mr={`1rem`} text={category.emoji} />
                <OptionText>{category.title}</OptionText>
              </Option>
            )
          })}
        </MobileOptionContainer>
      </FullWidthContainer>
      <Content>
        <ImageContainer id="what-are-dapps">
          <StyledGhostCard>
            <MagiciansImage
              fluid={data.magicians.childImageSharp.fluid}
              alt="Illustration of magicians"
            />
          </StyledGhostCard>
        </ImageContainer>
        <Box>
          <H2>
            <Translation id="page-dapps-magic-behind-dapps-title" />
          </H2>
          <BoxText>
            <Translation id="page-dapps-magic-behind-dapps-description" />
          </BoxText>
          <Link to="/what-is-ethereum/">
            <Translation id="page-dapps-magic-behind-dapps-link" />
          </Link>
        </Box>
        <BoxGrid items={features} />
        <Row>
          <LeftColumn>
            <H2>
              <Translation id="page-dapps-how-dapps-work-title" />
            </H2>
            <p>
              <Translation id="page-dapps-how-dapps-work-p1" />
            </p>
            <p>
              <Translation id="page-dapps-how-dapps-work-p2" />
            </p>
            <p>
              <Translation id="page-dapps-how-dapps-work-p3" />
            </p>
            <StyledDocLink
              to="/developers/docs/dapps/"
              title="Intro to dapps"
            />
            <StyledDocLink
              to="/developers/docs/smart-contracts/"
              title="Smart contracts"
            />
          </LeftColumn>
          <RightColumn>
            <StyledCallout
              title={intl.formatMessage({
                id: "page-dapps-learn-callout-title",
                defaultMessage: getDefaultMessage(
                  "page-dapps-learn-callout-title"
                ),
              })}
              description={intl.formatMessage({
                id: "page-dapps-learn-callout-description",
                defaultMessage: getDefaultMessage(
                  "page-dapps-learn-callout-description"
                ),
              })}
              image={data.developers.childImageSharp.fixed}
              alt={intl.formatMessage({
                id: "page-dapps-learn-callout-image-alt",
                defaultMessage: getDefaultMessage(
                  "page-dapps-learn-callout-image-alt"
                ),
              })}
            >
              <div>
                <ButtonLink to="/developers/">
                  <Translation id="page-dapps-learn-callout-button" />
                </ButtonLink>
              </div>
            </StyledCallout>
          </RightColumn>
        </Row>
      </Content>
    </Page>
  )
}

export default DappsPage

export const dappImage = graphql`
  fragment dappImage on File {
    childImageSharp {
      fluid(maxWidth: 80) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const editorImage = graphql`
  fragment editorImage on File {
    childImageSharp {
      fixed(height: 80, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    magicians: file(relativePath: { eq: "magicians.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    uniswapec: file(relativePath: { eq: "dapps/uni.png" }) {
      ...editorImage
    }
    foundationec: file(relativePath: { eq: "dapps/foundation.png" }) {
      ...editorImage
    }
    darkforestec: file(relativePath: { eq: "dapps/darkforest.png" }) {
      ...editorImage
    }
    pooltogetherec: file(relativePath: { eq: "dapps/pooltogether.png" }) {
      ...editorImage
    }
    aave: file(relativePath: { eq: "dapps/aave.png" }) {
      ...dappImage
    }
    compound: file(relativePath: { eq: "dapps/compound.png" }) {
      ...dappImage
    }
    pooltogether: file(relativePath: { eq: "dapps/pooltogether.png" }) {
      ...dappImage
    }
    uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
      ...dappImage
    }
    dai: file(relativePath: { eq: "dapps/stabledai.png" }) {
      ...dappImage
    }
    set: file(relativePath: { eq: "dapps/set.png" }) {
      ...dappImage
    }
    tornado: file(relativePath: { eq: "dapps/tornado.png" }) {
      ...dappImage
    }
    loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
      ...dappImage
    }
    polymarket: file(relativePath: { eq: "dapps/polymarket.png" }) {
      ...dappImage
    }
    sablier: file(relativePath: { eq: "dapps/sablier.png" }) {
      ...dappImage
    }
    golem: file(relativePath: { eq: "dapps/golem.png" }) {
      ...dappImage
    }
    gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
      ...dappImage
    }
    ens: file(relativePath: { eq: "dapps/ens.png" }) {
      ...dappImage
    }
    radicle: file(relativePath: { eq: "dapps/radicle.png" }) {
      ...dappImage
    }
    brave: file(relativePath: { eq: "dapps/brave.png" }) {
      ...dappImage
    }
    opera: file(relativePath: { eq: "dapps/opera.png" }) {
      ...dappImage
    }
    foundation: file(relativePath: { eq: "dapps/foundation.png" }) {
      ...dappImage
    }
    superrare: file(relativePath: { eq: "dapps/superrare.png" }) {
      ...dappImage
    }
    audius: file(relativePath: { eq: "dapps/audius.png" }) {
      ...dappImage
    }
    marble: file(relativePath: { eq: "dapps/marble.png" }) {
      ...dappImage
    }
    nifty: file(relativePath: { eq: "dapps/nifty.png" }) {
      ...dappImage
    }
    opensea: file(relativePath: { eq: "dapps/opensea.png" }) {
      ...dappImage
    }
    rarible: file(relativePath: { eq: "dapps/rarible.png" }) {
      ...dappImage
    }
    decentraland: file(relativePath: { eq: "dapps/decentraland.png" }) {
      ...dappImage
    }
    cryptopunks: file(relativePath: { eq: "dapps/cryptopunks.png" }) {
      ...dappImage
    }
    darkforest: file(relativePath: { eq: "dapps/darkforest.png" }) {
      ...dappImage
    }
    axie: file(relativePath: { eq: "dapps/axie.png" }) {
      ...dappImage
    }
    gods: file(relativePath: { eq: "dapps/gods.png" }) {
      ...dappImage
    }
    cryptovoxels: file(relativePath: { eq: "dapps/cryptovoxels.png" }) {
      ...dappImage
    }
    matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
      ...dappImage
    }
    oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
      ...dappImage
    }
    dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
      ...dappImage
    }
    augur: file(relativePath: { eq: "dapps/augur.png" }) {
      ...dappImage
    }
  }
`
