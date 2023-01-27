import React, { useRef, useState, useEffect } from "react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

import Translation from "../components/Translation"
import BoxGrid from "../components/BoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import ProductCard from "../components/ProductCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import InfoBanner from "../components/InfoBanner"
import DocLink from "../components/DocLink"
import Emoji from "../components/OldEmoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import PageHero from "../components/PageHero"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Content,
  Page,
  CenterDivider,
  Divider,
  Option,
  OptionContainer,
  OptionText,
} from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"

import { getImage, getSrc } from "../utils/image"
import { Context } from "../types"
import { Badge } from "@chakra-ui/react"

const MagiciansImage = styled(GatsbyImage)`
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

const StyledButtonSecondary = styled(ButtonSecondary)`
  margin-top: 0;
`

const StyledGhostCard = styled(GhostCard)`
  .ghost-card-base {
    display: flex;
    justify-content: center;
  }
`

const Subtitle = styled.div`
  font-size: 1.5rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 1.25rem;
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
  font-size: 1.5rem;
  font-style: normal;
  margin-top: 0.5rem;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const StyledInfoBanner = styled(InfoBanner)`
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
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
    text-decoration: none;
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
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;

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
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2rem;
    margin-left: 0rem;
  }
`

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 12rem;
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
  margin-top: 4rem;
`

const MoreButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

enum CategoryType {
  FINANCE = "finance",
  TECHNOLOGY = "technology",
  COLLECTIBLES = "collectibles",
  GAMING = "gaming",
}

interface Category {
  title: string
  emoji: string
  benefitsTitle?: string
  benefitsDescription?: string
  benefits?: Array<{
    emoji: string
    title: string
    description: string
  }>
}

interface Categories {
  [key: string]: Category
}

const DappsPage = ({
  data,
  location,
}: PageProps<Queries.DappsPageQuery, Context>) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const [selectedCategory, setCategory] = useState<CategoryType>(
    CategoryType.FINANCE
  )
  const explore = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch category on load
    const queryParamCategories = new URLSearchParams(location.search || "").get(
      "category"
    ) // Comma separated string
    const selectedCategory = queryParamCategories
      ? (queryParamCategories.split(",")[0] as CategoryType)
      : CategoryType.FINANCE // Default to finance category if empty
    setCategory(
      [
        CategoryType.FINANCE,
        CategoryType.TECHNOLOGY,
        CategoryType.COLLECTIBLES,
        CategoryType.GAMING,
      ].includes(selectedCategory)
        ? selectedCategory
        : CategoryType.FINANCE
    )
    if (window && queryParamCategories && explore.current) {
      window.scrollTo({
        top: explore.current.offsetTop - 76,
        behavior: "smooth",
      })
    }
  }, [location.search])

  const updatePath = (
    selectedCategory: CategoryType,
    isMobile: boolean
  ): void => {
    // Update URL path with new filter query params
    let newPath = `/dapps/?category=${selectedCategory || CategoryType.FINANCE}`
    // If "mobile" option at bottom of the page...
    if (isMobile) {
      // Add #explore and refresh
      newPath += "#explore"
    } else {
      // If within `window` and not in the bottom mobile selection...
      if (window) {
        newPath = `/${language}${newPath}`
        // Apply new path without page refresh
        window.history.pushState(null, "", newPath)
      }
    }
  }

  const handleCategorySelect = (
    category: CategoryType,
    isMobile = false
  ): void => {
    setCategory(category)
    updatePath(category, isMobile)
  }

  const features = [
    {
      title: t("page-dapps-features-1-title"),
      description: t("page-dapps-features-1-description"),
      emoji: ":bust_in_silhouette:",
    },
    {
      title: t("page-dapps-features-2-title"),
      description: t("page-dapps-features-2-description"),
      emoji: ":megaphone:",
    },
    {
      title: t("page-dapps-features-3-title"),
      description: t("page-dapps-features-3-description"),
      emoji: ":money-mouth_face:",
    },
    {
      title: t("page-dapps-features-4-title"),
      description: t("page-dapps-features-4-description"),
      emoji: ":electric_plug:",
    },
    {
      title: t("page-dapps-features-5-title"),
      description: t("page-dapps-features-5-description"),
      emoji: ":detective:",
    },
    {
      title: t("page-dapps-features-6-title"),
      description: t("page-dapps-features-6-description"),
      emoji: ":key:",
    },
    {
      title: t("page-dapps-features-7-title"),
      description: t("page-dapps-features-7-description"),
      emoji: ":antenna_with_bars:",
    },
  ]

  const categories: Categories = {
    [CategoryType.FINANCE]: {
      title: t("page-dapps-finance-button"),
      emoji: ":money_with_wings:",
      benefitsTitle: t("page-dapps-finance-benefits-title"),
      benefitsDescription: t("page-dapps-finance-benefits-description"),
      benefits: [
        {
          emoji: ":open_lock:",
          title: t("page-dapps-finance-benefits-1-title"),
          description: t("page-dapps-finance-benefits-1-description"),
        },
        {
          emoji: ":bank:",
          title: t("page-dapps-finance-benefits-2-title"),
          description: t("page-dapps-finance-benefits-2-description"),
        },
        {
          emoji: ":scales:",
          title: t("page-dapps-finance-benefits-3-title"),
          description: t("page-dapps-finance-benefits-3-description"),
        },
        {
          emoji: ":chains:",
          title: t("page-dapps-finance-benefits-4-title"),
          description: t("page-dapps-finance-benefits-4-description"),
        },
      ],
    },
    [CategoryType.COLLECTIBLES]: {
      title: t("page-dapps-collectibles-button"),
      emoji: ":frame_with_picture:",
      benefitsTitle: t("page-dapps-collectibles-benefits-title"),
      benefitsDescription: t("page-dapps-collectibles-benefits-description"),
      benefits: [
        {
          emoji: ":white_check_mark:",
          title: t("page-dapps-collectibles-benefits-1-title"),
          description: t("page-dapps-collectibles-benefits-1-description"),
        },
        {
          emoji: ":man_singer:",
          title: t("page-dapps-collectibles-benefits-2-title"),
          description: t("page-dapps-collectibles-benefits-2-description"),
        },
        {
          emoji: ":shopping_bags:",
          title: t("page-dapps-collectibles-benefits-3-title"),
          description: t("page-dapps-collectibles-benefits-3-description"),
        },
        {
          emoji: ":department_store:",
          title: t("page-dapps-collectibles-benefits-4-title"),
          description: t("page-dapps-collectibles-benefits-4-description"),
        },
      ],
    },
    [CategoryType.GAMING]: {
      title: t("page-dapps-gaming-button"),
      emoji: ":video_game:",
      benefitsTitle: t("page-dapps-gaming-benefits-title"),
      benefitsDescription: t("page-dapps-gaming-benefits-description"),
      benefits: [
        {
          emoji: ":crossed_swords:",
          title: t("page-dapps-gaming-benefits-1-title"),
          description: t("page-dapps-gaming-benefits-1-description"),
        },
        {
          emoji: ":european_castle:",
          title: t("page-dapps-gaming-benefits-2-title"),
          description: t("page-dapps-gaming-benefits-2-description"),
        },
        {
          emoji: ":handshake:",
          title: t("page-dapps-gaming-benefits-3-title"),
          description: t("page-dapps-gaming-benefits-3-description"),
        },
      ],
    },
    [CategoryType.TECHNOLOGY]: {
      title: t("page-dapps-technology-button"),
      emoji: ":keyboard:",
    },
  }

  const categoryKeys = Object.keys(categories)

  const lending = [
    {
      title: "Aave",
      description: t("page-dapps-dapp-description-aave"),
      link: "https://aave.com/",
      image: getImage(data.aave),
      alt: t("page-dapps-aave-logo-alt"),
    },
    {
      title: "Compound",
      description: t("page-dapps-dapp-description-compound"),
      link: "https://compound.finance/",
      image: getImage(data.compound),
      alt: t("page-dapps-compound-logo-alt"),
    },
    {
      title: "Oasis",
      description: t("page-dapps-dapp-description-oasis"),
      link: "https://oasis.app/",
      image: getImage(data.dai),
      alt: t("page-dapps-oasis-logo-alt"),
    },
    {
      title: "PWN",
      description: t("page-dapps-dapp-description-pwn"),
      link: "https://pwn.xyz",
      image: getImage(data.pwn),
      alt: t("page-dapps-pwn-image-alt"),
    },
  ]

  const dex = [
    {
      title: "Uniswap",
      description: t("page-dapps-dapp-description-uniswap"),
      link: "https://uniswap.org/",
      image: getImage(data.uniswap),
      alt: t("page-dapps-uniswap-logo-alt"),
    },
    {
      title: "Matcha",
      description: t("page-dapps-dapp-description-matcha"),
      link: "https://matcha.xyz",
      image: getImage(data.matcha),
      alt: t("page-dapps-matcha-logo-alt"),
    },
    {
      title: "1inch",
      description: t("page-dapps-dapp-description-1inch"),
      link: "https://1inch.exchange/",
      image: getImage(data.oneinch),
      alt: t("page-dapps-1inch-logo-alt"),
    },
  ]

  const trading = [
    {
      title: "Polymarket",
      description: t("page-dapps-dapp-description-polymarket"),
      link: "https://polymarket.com",
      image: getImage(data.polymarket),
      alt: t("page-dapps-polymarket-logo-alt"),
    },
    {
      title: "Augur",
      description: t("page-dapps-dapp-description-augur"),
      link: "https://augur.net",
      image: getImage(data.augur),
      alt: t("page-dapps-augur-logo-alt"),
    },
    {
      title: "Loopring",
      description: t("page-dapps-dapp-description-loopring"),
      link: "https://loopring.org/#/",
      image: getImage(data.loopring),
      alt: t("page-dapps-loopring-logo-alt"),
    },
  ]

  const lottery = [
    {
      title: "Gitcoin Grants",
      description: t("page-dapps-dapp-description-gitcoin-grants"),
      link: "https://gitcoin.co/grants/?",
      image: getImage(data.gitcoin),
      alt: t("page-dapps-gitcoin-grants-logo-alt"),
    },
  ]

  const payments = [
    {
      title: "Tornado cash",
      description: t("page-dapps-dapp-description-tornado-cash"),
      link: "https://tornado.cash/",
      image: getImage(data.tornado),
      alt: t("page-dapps-tornado-cash-logo-alt"),
    },
    {
      title: "Sablier",
      description: t("page-dapps-dapp-description-sablier"),
      link: "https://pay.sablier.finance/",
      image: getImage(data.sablier),
      alt: t("page-dapps-sablier-logo-alt"),
    },
  ]

  const investments = [
    {
      title: "Token Sets",
      description: t("page-dapps-dapp-description-token-sets"),
      link: "https://www.tokensets.com/",
      image: getImage(data.set),
      alt: t("page-dapps-token-sets-logo-alt"),
    },
    {
      title: "PoolTogether",
      description: t("page-dapps-dapp-description-pooltogether"),
      link: "https://pooltogether.com/",
      image: getImage(data.pooltogether),
      alt: t("page-dapps-pooltogether-logo-alt"),
    },
    {
      title: "Index Coop",
      description: t("page-dapps-dapp-description-index-coop"),
      link: "https://www.indexcoop.com/",
      image: getImage(data.index),
      alt: t("page-dapps-index-coop-logo-alt"),
    },
    {
      title: "Balancer",
      description: t("page-dapps-dapp-description-balancer"),
      link: "https://balancer.fi/",
      image: getImage(data.balancer),
      alt: t("page-dapps-balancer-logo-alt"),
    },
  ]

  const insurance = [
    {
      title: "Nexus Mutual",
      description: t("page-dapps-dapp-description-nexus-mutual"),
      link: "https://nexusmutual.io/",
      image: getImage(data.nexus),
      alt: t("page-dapps-nexus-mutual-logo-alt"),
    },
    {
      title: "Etherisc",
      description: t("page-dapps-dapp-description-etherisc"),
      link: "https://etherisc.com/",
      image: getImage(data.etherisc),
      alt: t("page-dapps-etherisc-logo-alt"),
    },
  ]

  const portfolios = [
    {
      title: "Zapper",
      description: t("page-dapps-dapp-description-zapper"),
      link: "https://zapper.fi/",
      image: getImage(data.zapper),
      alt: t("page-dapps-zapper-logo-alt"),
    },
    {
      title: "Zerion",
      description: t("page-dapps-dapp-description-zerion"),
      link: "https://app.zerion.io/",
      image: getImage(data.zerion),
      alt: t("page-dapps-zerion-logo-alt"),
    },
    {
      title: "Rotki",
      description: t("page-dapps-dapp-description-rotki"),
      link: "https://rotki.com/",
      image: getImage(data.rotki),
      alt: t("page-dapps-rotki-logo-alt"),
    },
    {
      title: "Krystal",
      description: t("page-dapps-dapp-description-krystal"),
      link: "https://defi.krystal.app/",
      image: getImage(data.krystal),
      alt: t("page-dapps-krystal-logo-alt"),
    },
  ]

  const computing = [
    {
      title: "Golem",
      description: t("page-dapps-dapp-description-golem"),
      link: "https://golem.network/",
      image: getImage(data.golem),
      alt: t("page-dapps-golem-logo-alt"),
    },
    {
      title: "radicle.xyz",
      description: t("page-dapps-dapp-description-radicle"),
      link: "https://radicle.xyz/",
      image: getImage(data.radicle),
      alt: t("page-dapps-radicle-logo-alt"),
    },
  ]

  const marketplaces = [
    {
      title: "Gitcoin",
      description: t("page-dapps-dapp-description-gitcoin"),
      link: "https://gitcoin.co/",
      image: getImage(data.gitcoin),
      alt: t("page-dapps-gitcoin-logo-alt"),
    },
  ]

  const utilities = [
    {
      title: "Ethereum Name Service (ENS)",
      description: t("page-dapps-dapp-description-ens"),
      link: "http://ens.domains/",
      image: getImage(data.ens),
      alt: t("page-dapps-ens-logo-alt"),
    },
  ]

  const browsers = [
    {
      title: "Brave",
      description: t("page-dapps-dapp-description-brave"),
      link: "https://brave.com/",
      image: getImage(data.brave),
      alt: t("page-dapps-brave-logo-alt"),
    },
    {
      title: "Opera",
      description: t("page-dapps-dapp-description-opera"),
      link: "https://www.opera.com/crypto",
      image: getImage(data.opera),
      alt: t("page-dapps-opera-logo-alt"),
    },
  ]

  const arts = [
    {
      title: "Foundation",
      description: t("page-dapps-dapp-description-foundation"),
      link: "https://foundation.app/",
      image: getImage(data.foundation),
      alt: t("page-dapps-foundation-logo-alt"),
    },
    {
      title: "SuperRare",
      description: t("page-dapps-dapp-description-superrare"),
      link: "https://www.superrare.co",
      image: getImage(data.superrare),
      alt: t("page-dapps-superrare-logo-alt"),
    },
    {
      title: "Nifty Gateway",
      description: t("page-dapps-dapp-description-nifty-gateway"),
      link: "https://niftygateway.com/",
      image: getImage(data.nifty),
      alt: t("page-dapps-nifty-gateway-logo-alt"),
    },
    {
      title: "Async Art",
      description: t("page-dapps-dapp-description-async-art"),
      link: "https://async.art/",
      image: getImage(data.asyncart),
      alt: t("page-dapps-async-logo-alt"),
    },
  ]

  const music = [
    {
      title: "Audius",
      description: t("page-dapps-dapp-description-audius"),
      link: "https://audius.co/",
      image: getImage(data.audius),
      alt: t("page-dapps-audius-logo-alt"),
    },
  ]

  const collectibles = [
    {
      title: "OpenSea",
      description: t("page-dapps-dapp-description-opensea"),
      link: "https://opensea.io/",
      image: getImage(data.opensea),
      alt: t("page-dapps-opensea-logo-alt"),
    },
    {
      title: "marble.cards",
      description: t("page-dapps-dapp-description-marble-cards"),
      link: "https://marble.cards/",
      image: getImage(data.marble),
      alt: t("page-dapps-marble-cards-logo-alt"),
    },
    {
      title: "Rarible",
      description: t("page-dapps-dapp-description-rarible"),
      link: "https://rarible.com/",
      image: getImage(data.rarible),
      alt: t("page-dapps-rarible-logo-alt"),
    },
    {
      title: "CryptoPunks",
      description: t("page-dapps-dapp-description-cryptopunks"),
      link: "https://cryptopunks.app/",
      image: getImage(data.cryptopunks),
      alt: t("page-dapps-cryptopunks-logo-alt"),
    },
    {
      title: "POAP - Proof of Attendance Protocol",
      description: t("page-dapps-dapp-description-poap"),
      link: "https://poap.xyz",
      image: getImage(data.poap),
      alt: t("page-dapps-poap-logo-alt"),
    },
  ]

  const worlds = [
    {
      title: "Cryptovoxels",
      description: t("page-dapps-dapp-description-cryptovoxels"),
      link: "https://www.cryptovoxels.com/",
      image: getImage(data.cryptovoxels),
      alt: t("page-dapps-cryptovoxels-logo-alt"),
    },
    {
      title: "Decentraland",
      description: t("page-dapps-dapp-description-decentraland"),
      link: "https://decentraland.org/",
      image: getImage(data.decentraland),
      alt: t("page-dapps-decentraland-logo-alt"),
    },
  ]

  const competitive = [
    {
      title: "Axie Infinity",
      description: t("page-dapps-dapp-description-axie-infinity"),
      link: "https://axieinfinity.com/",
      image: getImage(data.axie),
      alt: t("page-dapps-axie-infinity-logo-alt"),
    },
    {
      title: "Gods Unchained",
      description: t("page-dapps-dapp-description-gods-unchained"),
      link: "https://godsunchained.com/",
      image: getImage(data.gods),
      alt: t("page-dapps-gods-unchained-logo-alt"),
    },
    {
      title: "Dark Forest",
      description: t("page-dapps-dapp-description-dark-forest"),
      link: "https://zkga.me/",
      image: getImage(data.darkforest),
      alt: t("page-dapps-dark-forest-logo-alt"),
    },
  ]

  const editorChoices = [
    {
      name: "Uniswap",
      description: t("page-dapps-editors-choice-uniswap"),
      url: "https://uniswap.exchange/swap",
      image: getImage(data.uniswapec),
      alt: t("page-dapps-uniswap-logo-alt"),
      background: "#212f46",
      type: CategoryType.FINANCE,
      pillColor: "tagMint",
    },
    {
      name: "Dark Forest",
      description: t("page-dapps-editors-choice-dark-forest"),
      url: "https://zkga.me",
      image: getImage(data.darkforestec),
      alt: t("page-dapps-dark-forest-logo-alt"),
      background: "#080808",
      type: CategoryType.GAMING,
      pillColor: "tagOrange",
    },
    {
      name: "Foundation",
      description: t("page-dapps-editors-choice-foundation"),
      url: "https://foundation.app",
      image: getImage(data.foundationec),
      alt: t("page-dapps-foundation-logo-alt"),
      background: "#ffffff",
      type: CategoryType.COLLECTIBLES,
      pillColor: "tagBlue",
    },
    {
      name: "PoolTogether",
      description: t("page-dapps-editors-choice-pooltogether"),
      url: "https://pooltogether.com",
      image: getImage(data.pooltogetherec),
      alt: t("page-dapps-pooltogether-logo-alt"),
      background: "#7e4cf2",
      type: CategoryType.FINANCE,
      pillColor: "tagMint",
    },
  ]

  const heroContent = {
    title: t("decentralized-applications-dapps"),
    header: t("page-dapps-hero-header"),
    subtitle: t("page-dapps-hero-subtitle"),
    image: getImage(data.doge)!,
    alt: t("page-dapps-doge-img-alt"),
    buttons: [
      {
        content: t("page-dapps-explore-dapps-title"),
        to: "#explore",
      },
      {
        content: t("page-dapps-what-are-dapps"),
        to: "#what-are-dapps",
        variant: "outline",
      },
    ],
  }
  return (
    <Page>
      <PageMetadata
        title={t("decentralized-applications-dapps")}
        description={t("page-dapps-desc")}
        image={getSrc(data.ogImage)}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <H2>
          <Translation id="get-started" />
        </H2>
        <p>
          <Translation id="page-dapps-get-started-subtitle" />{" "}
          <Link to="/glossary/#transaction-fee">
            <Translation id="transaction-fees" />
          </Link>
        </p>
        <Row>
          <StepBoxContainer>
            <StepBox to="/get-eth/">
              <div>
                <H3>
                  1. <Translation id="page-wallets-get-some" />
                </H3>
                <p>
                  <Translation id="page-dapps-get-some-eth-description" />
                </p>
              </div>
              <StyledButtonSecondary>
                <Translation id="get-eth" />
              </StyledButtonSecondary>
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
              <StyledButtonSecondary>
                <Translation id="page-dapps-set-up-a-wallet-button" />
              </StyledButtonSecondary>
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
          {editorChoices.map((choice, idx) => (
            <ProductCard
              key={idx}
              background={choice.background}
              description={choice.description}
              url={choice.url}
              alt={choice.alt}
              image={choice.image!}
              name={choice.name}
            >
              <Badge size="sm" background={choice.pillColor}>
                {choice.type}
              </Badge>
            </ProductCard>
          ))}
        </StyledCardGrid>
      </Content>
      <FullWidthContainer ref={explore}>
        <h2 id="explore">
          <Translation id="page-dapps-explore-dapps-title" />
        </h2>
        <CenterText>
          <Translation id="page-dapps-explore-dapps-description" />
        </CenterText>
        <h3>
          <Translation id="page-dapps-choose-category" />
        </h3>
        <OptionContainer>
          {categoryKeys.map((key, idx) => {
            const categoryType = key as CategoryType
            const category = categories[categoryType]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === categoryType}
                onClick={() => handleCategorySelect(categoryType, false)}
              >
                <Emoji mr={`1rem`} text={category.emoji} />
                <OptionText>{category.title}</OptionText>
              </Option>
            )
          })}
        </OptionContainer>
        {/* Category-specific content */}
        {selectedCategory === CategoryType.FINANCE && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-finance-title" />{" "}
                  <Emoji size={2} ml={"0.5rem"} text=":money_with_wings:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-finance-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-lending")}
                  content={lending}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-dex")}
                  content={dex}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-trading")}
                  content={trading}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-investments")}
                  content={investments}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-payments")}
                  content={payments}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-lottery")}
                  content={lottery}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-insurance")}
                  content={insurance}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-portfolios")}
                  content={portfolios}
                />
              </RightColumn>
            </TwoColumnContent>
            <StyledCalloutBanner
              titleKey={"page-dapps-wallet-callout-title"}
              descriptionKey={"page-dapps-wallet-callout-description"}
              image={getImage(data.wallet)!}
              maxImageWidth={300}
              alt={t("page-dapps-wallet-callout-image-alt")}
            >
              <div>
                <ButtonLink to="/wallets/find-wallet/">
                  <Translation id="page-dapps-wallet-callout-button" />
                </ButtonLink>
              </div>
            </StyledCalloutBanner>
          </Content>
        )}
        {selectedCategory === CategoryType.GAMING && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-gaming-title" />{" "}
                  <Emoji size={2} ml={"0.5rem"} text=":video_game:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-gaming-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-worlds")}
                  content={worlds}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-competitive")}
                  content={competitive}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === CategoryType.TECHNOLOGY && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-technology-title" />{" "}
                  <Emoji size={2} ml={"0.5rem"} text=":keyboard:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-technology-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-utilities")}
                  content={utilities}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-marketplaces")}
                  content={marketplaces}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-computing")}
                  content={computing}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-browsers")}
                  content={browsers}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === CategoryType.COLLECTIBLES && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-collectibles-title" />{" "}
                  <Emoji size={2} ml={"0.5rem"} text=":frame_with_picture:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-collectibles-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-arts")}
                  content={arts}
                />

                <ProductList
                  category={t("page-dapps-category-music")}
                  content={music}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-collectibles")}
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
                <Translation id="listing-policy-disclaimer" />{" "}
              </TextNoMargin>
            </div>
            <AddDappButton
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_dapp.md&title="
            >
              <Translation id="page-dapps-add-button" />
            </AddDappButton>
          </AddDapp>
          <CenterDivider />
          {categories[selectedCategory].benefits && (
            <About>
              <h2>
                <Translation id="page-dapps-magic-title-1" />{" "}
                <Emoji size={1} text=":sparkles:" />{" "}
                <Translation id="page-dapps-magic-title-2" />{" "}
                {categories[selectedCategory].benefitsTitle}
              </h2>
              <p>{categories[selectedCategory].benefitsDescription}</p>
              <CardContainer>
                {(categories[selectedCategory].benefits || []).map(
                  (art, idx) => (
                    <CenteredCard
                      key={idx}
                      emoji={art.emoji}
                      title={art.title}
                      description={art.description}
                    />
                  )
                )}
              </CardContainer>
              {selectedCategory === CategoryType.FINANCE && (
                <MoreButtonContainer>
                  <ButtonLink variant="outline" to="/defi/">
                    <Translation id="page-dapps-more-on-defi-button" />
                  </ButtonLink>
                </MoreButtonContainer>
              )}
              {selectedCategory === CategoryType.COLLECTIBLES && (
                <MoreButtonContainer>
                  <ButtonLink variant="outline" to="/nft/">
                    <Translation id="page-dapps-more-on-nft-button" />
                  </ButtonLink>
                </MoreButtonContainer>
              )}
              {selectedCategory === CategoryType.GAMING && (
                <MoreButtonContainer>
                  <ButtonLink variant="outline" to="/nft/">
                    <Translation id="page-dapps-more-on-nft-gaming-button" />
                  </ButtonLink>
                </MoreButtonContainer>
              )}
            </About>
          )}
        </Content>
        <MobileOptionContainer>
          <h3>
            <Translation id="page-dapps-mobile-options-header" />
          </h3>
          {categoryKeys.map((key, idx) => {
            const categoryType = key as CategoryType
            const category = categories[categoryType]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === categoryType}
                onClick={() => handleCategorySelect(categoryType, true)}
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
              image={getImage(data.magicians)!}
              alt={t("page-dapps-magician-img-alt")}
            />
          </StyledGhostCard>
        </ImageContainer>
        <Box>
          <h2>
            <Translation id="page-dapps-magic-behind-dapps-title" />
          </h2>
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
            <h2>
              <Translation id="page-dapps-how-dapps-work-title" />
            </h2>
            <p>
              <Translation id="page-dapps-how-dapps-work-p1" />
            </p>
            <p>
              <Translation id="page-dapps-how-dapps-work-p2" />
            </p>
            <p>
              <Translation id="page-dapps-how-dapps-work-p3" />
            </p>
            <DocLink to="/developers/docs/dapps/">
              <Translation id="page-dapps-docklink-dapps" />
            </DocLink>
            <DocLink to="/developers/docs/smart-contracts/">
              <Translation id="page-dapps-docklink-smart-contracts" />
            </DocLink>
          </LeftColumn>
          <RightColumn>
            <StyledCallout
              titleKey="page-dapps-learn-callout-title"
              descriptionKey="page-dapps-learn-callout-description"
              image={getImage(data.developers)}
              alt={t("page-dapps-learn-callout-image-alt")}
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
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default DappsPage

export const dappImage = graphql`
  fragment dappImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 80
        layout: CONSTRAINED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`
export const editorImage = graphql`
  fragment editorImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 80
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query DappsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-dapps", "common"] }
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
    ogImage: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    magicians: file(relativePath: { eq: "magicians.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          height: 200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
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
    augur: file(relativePath: { eq: "dapps/augur.png" }) {
      ...dappImage
    }
    asyncart: file(relativePath: { eq: "dapps/asyncart.png" }) {
      ...dappImage
    }
    index: file(relativePath: { eq: "dapps/index-coop.png" }) {
      ...dappImage
    }
    nexus: file(relativePath: { eq: "dapps/nexus.png" }) {
      ...dappImage
    }
    etherisc: file(relativePath: { eq: "dapps/etherisc.png" }) {
      ...dappImage
    }
    zapper: file(relativePath: { eq: "dapps/zapper.png" }) {
      ...dappImage
    }
    zerion: file(relativePath: { eq: "dapps/zerion.png" }) {
      ...dappImage
    }
    rotki: file(relativePath: { eq: "dapps/rotki.png" }) {
      ...dappImage
    }
    krystal: file(relativePath: { eq: "dapps/krystal.png" }) {
      ...dappImage
    }
    poap: file(relativePath: { eq: "dapps/poap.png" }) {
      ...dappImage
    }
    pwn: file(relativePath: { eq: "dapps/pwn.png" }) {
      ...dappImage
    }
    balancer: file(relativePath: { eq: "dapps/balancer.png" }) {
      ...dappImage
    }
  }
`
