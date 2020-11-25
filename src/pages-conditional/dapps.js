import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl, navigate } from "gatsby-plugin-intl"
import { translateMessageId } from "../utils/translations"
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
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
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
  const [selectedCategory, setCategory] = useState(FINANCE)

  const handleMobileCategorySelect = (category) => {
    setCategory(category)
    navigate("/dapps/#explore")
  }

  const features = [
    {
      title: translateMessageId("page-dapps-features-1-title", intl),
      description: translateMessageId(
        "page-dapps-features-1-description",
        intl
      ),
      emoji: ":bust_in_silhouette:",
    },
    {
      title: translateMessageId("page-dapps-features-2-title", intl),
      description: translateMessageId(
        "page-dapps-features-2-description",
        intl
      ),
      emoji: ":megaphone:",
    },
    {
      title: translateMessageId("page-dapps-features-3-title", intl),
      description: translateMessageId(
        "page-dapps-features-3-description",
        intl
      ),
      emoji: ":money-mouth_face:",
    },
    {
      title: translateMessageId("page-dapps-features-4-title", intl),
      description: translateMessageId(
        "page-dapps-features-4-description",
        intl
      ),
      emoji: ":electric_plug:",
    },
    {
      title: translateMessageId("page-dapps-features-5-title", intl),
      description: translateMessageId(
        "page-dapps-features-5-description",
        intl
      ),
      emoji: ":detective:",
    },
    {
      title: translateMessageId("page-dapps-features-6-title", intl),
      description: translateMessageId(
        "page-dapps-features-6-description",
        intl
      ),
      emoji: ":key:",
    },
    {
      title: translateMessageId("page-dapps-features-7-title", intl),
      description: translateMessageId(
        "page-dapps-features-7-description",
        intl
      ),
      emoji: ":antenna_with_bars:",
    },
  ]

  const categories = {
    finance: {
      title: translateMessageId("page-dapps-finance-button", intl),
      emoji: ":money_with_wings:",
      benefitsTitle: translateMessageId(
        "page-dapps-finance-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-dapps-finance-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":open_lock:",
          title: translateMessageId(
            "page-dapps-finance-benefits-1-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-finance-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":bank:",
          title: translateMessageId(
            "page-dapps-finance-benefits-2-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-finance-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":scales:",
          title: translateMessageId(
            "page-dapps-finance-benefits-3-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-finance-benefits-3-description",
            intl
          ),
        },
        {
          emoji: ":chains:",
          title: translateMessageId(
            "page-dapps-finance-benefits-4-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-finance-benefits-4-description",
            intl
          ),
        },
      ],
    },
    collectibles: {
      title: translateMessageId("page-dapps-collectibles-button", intl),
      emoji: ":frame_with_picture:",
      benefitsTitle: translateMessageId(
        "page-dapps-collectibles-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-dapps-collectibles-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":white_check_mark:",
          title: translateMessageId(
            "page-dapps-collectibles-benefits-1-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-collectibles-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":man_singer:",
          title: translateMessageId(
            "page-dapps-collectibles-benefits-2-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-collectibles-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":shopping_bags:",
          title: translateMessageId(
            "page-dapps-collectibles-benefits-3-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-collectibles-benefits-3-description",
            intl
          ),
        },
        {
          emoji: ":department_store:",
          title: translateMessageId(
            "page-dapps-collectibles-benefits-4-title",
            intl
          ),
          description: translateMessageId(
            "page-dapps-collectibles-benefits-4-description",
            intl
          ),
        },
      ],
    },
    gaming: {
      title: translateMessageId("page-dapps-gaming-button", intl),
      emoji: ":video_game:",
      benefitsTitle: translateMessageId(
        "page-dapps-gaming-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-dapps-gaming-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":crossed_swords:",
          title: translateMessageId("page-dapps-gaming-benefits-1-title", intl),
          description: translateMessageId(
            "page-dapps-gaming-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":european_castle:",
          title: translateMessageId("page-dapps-gaming-benefits-2-title", intl),
          description: translateMessageId(
            "page-dapps-gaming-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":handshake:",
          title: translateMessageId("page-dapps-gaming-benefits-3-title", intl),
          description: translateMessageId(
            "page-dapps-gaming-benefits-3-description",
            intl
          ),
        },
      ],
    },
    technology: {
      title: translateMessageId("page-dapps-technology-button", intl),
      emoji: ":keyboard:",
    },
  }

  const categoryKeys = Object.keys(categories)

  const lending = [
    {
      title: "Aave",
      description: translateMessageId("page-dapps-dapp-description-aave", intl),
      link: "https://aave.com/",
      image: data.aave.childImageSharp.fluid,
    },
    {
      title: "Compound",
      description: translateMessageId(
        "page-dapps-dapp-description-compound",
        intl
      ),
      link: "https://compound.finance/",
      image: data.compound.childImageSharp.fluid,
    },
    {
      title: "Oasis",
      description: translateMessageId(
        "page-dapps-dapp-description-oasis",
        intl
      ),
      link: "https://oasis.app/",
      image: data.dai.childImageSharp.fluid,
    },
  ]

  const dex = [
    {
      title: "Uniswap",
      description: translateMessageId(
        "page-dapps-dapp-description-uniswap",
        intl
      ),
      link: "https://uniswap.org/",
      image: data.uniswap.childImageSharp.fluid,
    },
    {
      title: "Matcha",
      description: translateMessageId(
        "page-dapps-dapp-description-matcha",
        intl
      ),
      link: "https://matcha.xyz",
      image: data.matcha.childImageSharp.fluid,
    },
    {
      title: "1inch",
      description: translateMessageId(
        "page-dapps-dapp-description-1inch",
        intl
      ),
      link: "https://1inch.exchange/",
      image: data.oneinch.childImageSharp.fluid,
    },
  ]

  const trading = [
    {
      title: "Polymarket",
      description: translateMessageId(
        "page-dapps-dapp-description-polymarket",
        intl
      ),
      link: "https://polymarket.com",
      image: data.polymarket.childImageSharp.fluid,
    },
    {
      title: "Augur",
      description: translateMessageId(
        "page-dapps-dapp-description-augur",
        intl
      ),
      link: "https://augur.net",
      image: data.augur.childImageSharp.fluid,
    },
    {
      title: "Loopring",
      description: translateMessageId(
        "page-dapps-dapp-description-loopring",
        intl
      ),
      link: "https://loopring.org/#/",
      image: data.loopring.childImageSharp.fluid,
    },
    {
      title: "dYdX",
      description: translateMessageId("page-dapps-dapp-description-dydx", intl),
      link: "https://dydx.exchange/",
      image: data.dydx.childImageSharp.fluid,
    },
  ]

  const lottery = [
    {
      title: "Gitcoin Grants",
      description: translateMessageId(
        "page-dapps-dapp-description-gitcoin-grants",
        intl
      ),
      link: "https://gitcoin.co/grants/?",
      image: data.gitcoin.childImageSharp.fluid,
    },
  ]

  const payments = [
    {
      title: "Tornado cash",
      description: translateMessageId(
        "page-dapps-dapp-description-tornado-cash",
        intl
      ),
      link: "https://tornado.cash/",
      image: data.tornado.childImageSharp.fluid,
    },
    {
      title: "Sablier",
      description: translateMessageId(
        "page-dapps-dapp-description-sablier",
        intl
      ),
      link: "https://pay.sablier.finance/",
      image: data.sablier.childImageSharp.fluid,
    },
  ]

  const investments = [
    {
      title: "Token Sets",
      description: translateMessageId(
        "page-dapps-dapp-description-token-sets",
        intl
      ),
      link: "https://www.tokensets.com/",
      image: data.set.childImageSharp.fluid,
    },
    {
      title: "PoolTogether",
      description: translateMessageId(
        "page-dapps-dapp-description-pooltogether",
        intl
      ),
      link: "https://pooltogether.com/",
      image: data.pooltogether.childImageSharp.fluid,
    },
  ]

  const computing = [
    {
      title: "Golem",
      description: translateMessageId(
        "page-dapps-dapp-description-golem",
        intl
      ),
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
      description: translateMessageId(
        "page-dapps-dapp-description-gitcoin",
        intl
      ),
      link: "https://gitcoin.co/",
      image: data.gitcoin.childImageSharp.fluid,
    },
  ]

  const utilities = [
    {
      title: "Ethereum Name Service (ENS)",
      description: translateMessageId("page-dapps-dapp-description-ens", intl),
      link: "http://ens.domains/",
      image: data.ens.childImageSharp.fluid,
    },
  ]

  const browsers = [
    {
      title: "Brave",
      description: translateMessageId(
        "page-dapps-dapp-description-brave",
        intl
      ),
      link: "https://brave.com/",
      image: data.brave.childImageSharp.fluid,
    },
    {
      title: "Opera",
      description: translateMessageId(
        "page-dapps-dapp-description-opera",
        intl
      ),
      link: "https://www.opera.com/crypto",
      image: data.opera.childImageSharp.fluid,
    },
  ]

  const arts = [
    {
      title: "Foundation",
      description: translateMessageId(
        "page-dapps-dapp-description-foundation",
        intl
      ),
      link: "https://foundation.app/",
      image: data.foundation.childImageSharp.fluid,
    },
    {
      title: "SuperRare",
      description: translateMessageId(
        "page-dapps-dapp-description-superrare",
        intl
      ),
      link: "https://www.superrare.co",
      image: data.superrare.childImageSharp.fluid,
    },
    {
      title: "Nifty Gateway",
      description: translateMessageId(
        "page-dapps-dapp-description-nifty-gateway",
        intl
      ),
      link: "https://niftygateway.com/",
      image: data.nifty.childImageSharp.fluid,
    },
  ]

  const music = [
    {
      title: "Audius",
      description: translateMessageId(
        "page-dapps-dapp-description-audius",
        intl
      ),
      link: "https://audius.co/",
      image: data.audius.childImageSharp.fluid,
    },
  ]

  const collectibles = [
    {
      title: "OpenSea",
      description: translateMessageId(
        "page-dapps-dapp-description-opensea",
        intl
      ),
      link: "https://opensea.io/",
      image: data.opensea.childImageSharp.fluid,
    },
    {
      title: "marble.cards",
      description: translateMessageId(
        "page-dapps-dapp-description-marble-cards",
        intl
      ),
      link: "https://marble.cards/",
      image: data.marble.childImageSharp.fluid,
    },
    {
      title: "Rarible",
      description: translateMessageId(
        "page-dapps-dapp-description-rarible",
        intl
      ),
      link: "https://rarible.com/",
      image: data.rarible.childImageSharp.fluid,
    },
    {
      title: "CryptoPunks",
      description: translateMessageId(
        "page-dapps-dapp-description-cryptopunks",
        intl
      ),
      link: "https://www.larvalabs.com/cryptopunks",
      image: data.cryptopunks.childImageSharp.fluid,
    },
  ]

  const worlds = [
    {
      title: "Cryptovoxels",
      description: translateMessageId(
        "page-dapps-dapp-description-cryptovoxels",
        intl
      ),
      link: "https://www.cryptovoxels.com/",
      image: data.cryptovoxels.childImageSharp.fluid,
    },
    {
      title: "Decentraland",
      description: translateMessageId(
        "page-dapps-dapp-description-decentraland",
        intl
      ),
      link: "https://decentraland.org/",
      image: data.decentraland.childImageSharp.fluid,
    },
  ]

  const competitive = [
    {
      title: "Axie Infinity",
      description: translateMessageId(
        "page-dapps-dapp-description-axie-infinity",
        intl
      ),
      link: "https://axieinfinity.com/",
      image: data.axie.childImageSharp.fluid,
    },
    {
      title: "Gods Unchained",
      description: translateMessageId(
        "page-dapps-dapp-description-gods-unchained",
        intl
      ),
      link: "https://godsunchained.com/",
      image: data.gods.childImageSharp.fluid,
    },
    {
      title: "Dark Forest",
      description: translateMessageId(
        "page-dapps-dapp-description-dark-forest",
        intl
      ),
      link: "https://zkga.me/",
      image: data.darkforest.childImageSharp.fluid,
    },
  ]

  const editorChoices = [
    {
      name: "Uniswap",
      description: translateMessageId(
        "page-dapps-editors-choice-uniswap",
        intl
      ),
      url: "https://uniswap.exchange/swap",
      image: data.uniswapec.childImageSharp.fixed,
      alt: "Uniswap Logo",
      background: "#212F46",
      type: FINANCE,
      pillColor: "tagMint",
    },
    {
      name: "Dark Forest",
      description: translateMessageId(
        "page-dapps-editors-choice-dark-forest",
        intl
      ),
      url: "https://zkga.me",
      image: data.darkforestec.childImageSharp.fixed,
      alt: "Darkforest logo",
      background: "#080808",
      type: GAMING,
      pillColor: "tagOrange",
    },
    {
      name: "Foundation",
      description: translateMessageId(
        "page-dapps-editors-choice-foundation",
        intl
      ),
      url: "https://foundation.app",
      image: data.foundationec.childImageSharp.fixed,
      alt: "Foundation logo",
      background: "#ffffff",
      type: COLLECTIBLES,
      pillColor: "tagBlue",
    },
    {
      name: "PoolTogether",
      description: translateMessageId(
        "page-dapps-editors-choice-pooltogether",
        intl
      ),
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
                  category={translateMessageId(
                    "page-dapps-category-lending",
                    intl
                  )}
                  content={lending}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId("page-dapps-category-dex", intl)}
                  content={dex}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-trading",
                    intl
                  )}
                  content={trading}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-investments",
                    intl
                  )}
                  content={investments}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-payments",
                    intl
                  )}
                  content={payments}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-lottery",
                    intl
                  )}
                  content={lottery}
                />
              </RightColumn>
            </TwoColumnContent>
            <StyledCalloutBanner
              title={translateMessageId(
                "page-dapps-wallet-callout-title",
                intl
              )}
              description={translateMessageId(
                "page-dapps-wallet-callout-description",
                intl
              )}
              image={data.wallet.childImageSharp.fluid}
              maxImageWidth={300}
              alt={translateMessageId(
                "page-dapps-wallet-callout-image-alt",
                intl
              )}
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
                  category={translateMessageId(
                    "page-dapps-category-worlds",
                    intl
                  )}
                  content={worlds}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-competitive",
                    intl
                  )}
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
                  category={translateMessageId(
                    "page-dapps-category-utilities",
                    intl
                  )}
                  content={utilities}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-marketplaces",
                    intl
                  )}
                  content={marketplaces}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-computing",
                    intl
                  )}
                  content={computing}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-browsers",
                    intl
                  )}
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
                  category={translateMessageId(
                    "page-dapps-category-arts",
                    intl
                  )}
                  content={arts}
                />

                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-music",
                    intl
                  )}
                  content={music}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={translateMessageId(
                    "page-dapps-category-collectibles",
                    intl
                  )}
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
              title={translateMessageId("page-dapps-learn-callout-title", intl)}
              description={translateMessageId(
                "page-dapps-learn-callout-description",
                intl
              )}
              image={data.developers.childImageSharp.fixed}
              alt={translateMessageId(
                "page-dapps-learn-callout-image-alt",
                intl
              )}
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
