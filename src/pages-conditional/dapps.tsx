import React, {
  useRef,
  useState,
  useEffect,
  ComponentPropsWithRef,
} from "react"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Divider as ChakraDivider,
  DividerProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  SimpleGrid,
  useToken,
} from "@chakra-ui/react"

import Translation from "../components/Translation"
import BoxGrid from "../components/BoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import ProductCard from "../components/ProductCard"
import GhostCard from "../components/GhostCard"
import InlineLink, { BaseLink } from "../components/Link"
import InfoBanner from "../components/InfoBanner"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/Buttons/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import PageHero from "../components/PageHero"
import FeedbackCard from "../components/FeedbackCard"
import Text from "../components/OldText"
import OldHeading from "../components/OldHeading"
import GlossaryTooltip from "../components/Glossary/GlossaryTooltip"
import GatsbyImage, { GatsbyImageType } from "../components/GatsbyImage"

import { getImage, getSrc } from "../utils/image"
import { trackCustomEvent } from "../utils/matomo"
import { ChildOnlyProp, Context } from "../types"

const Page = (props: ChildOnlyProp & FlexProps) => (
  <Flex direction="column" align="center" mx="auto" w="full" {...props} />
)

const Divider = (props: DividerProps) => (
  <ChakraDivider
    opacity={1}
    my={16}
    w="10%"
    borderBottomWidth="0.25rem"
    borderColor="homeDivider"
    {...props}
  />
)

const CenterDivider = () => <Divider display="flex" justifyContent="center" />

const Content = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const OptionContainer = (props: ChildOnlyProp) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    justify="center"
    px={8}
    mb={8}
    w={{ base: "full", lg: "auto" }}
    {...props}
  />
)

const Option = (
  props: Pick<ButtonProps, "children" | "onClick"> & { isActive: boolean }
) => {
  const tableBoxShadow = useToken("colors", "tableBoxShadow")

  return (
    <Button
      variant="outline"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "center", lg: "flex-start" }}
      boxShadow={props.isActive ? tableBoxShadow : `none`}
      color={props.isActive ? "primary.base" : "text"}
      borderColor={props.isActive ? "primary.base" : "text"}
      borderRadius="2rem"
      height="auto"
      w={{ base: "full", lg: "auto" }}
      my={2}
      mx={{ base: 0, lg: 2 }}
      py={4}
      px={6}
      transition="none"
      _hover={{
        color: "primary.base",
        borderColor: "primary.base",
      }}
      _active={{ bg: "transparent" }}
      {...props}
    />
  )
}

const OptionText = (props: ChildOnlyProp) => (
  <Text
    as="span"
    fontSize={{ base: "md", md: "2xl" }}
    textAlign="center"
    fontWeight={{ base: "semibold", md: "normal" }}
    lineHeight="100%"
    {...props}
  />
)

const ButtonPrimary = (props: Pick<ButtonProps, "children" | "onClick">) => (
  <Button py={2} px={3} borderRadius="0.25em" {...props} />
)

const ButtonSecondary = (props: Pick<ButtonProps, "children" | "onClick">) => (
  <Button variant="outline" py={2} px={3} borderRadius="0.25em" {...props} />
)

const MagiciansImage: GatsbyImageType = (props) => (
  <GatsbyImage
    bgSize="cover"
    bgRepeat="no-repeat"
    alignSelf="center"
    w="full"
    minW="240px"
    maxW="300px"
    my="8"
    mx={{ base: 0, sm: "8", md: "24" }}
    {...props}
  />
)

const ImageContainer = (props: Pick<FlexProps, "children" | "id">) => (
  <Flex justify="center" {...props} />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text
    fontSize={{ base: "xl", lg: "2xl" }}
    lineHeight="140%"
    color="text200"
    mt={4}
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    align="flex-start"
    {...props}
  />
)

const IntroRow = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    align="flex-start"
    bg="background.base"
    p={8}
    borderRadius="32px"
    {...props}
  />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    align="flex-start"
    mr={{ lg: 8 }}
    {...props}
  />
)

const StyledH2 = (props: ChildOnlyProp) => (
  <OldHeading
    fontSize="2xl"
    lineHeight="22px"
    letterSpacing={0}
    mt={2}
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <Heading
    mt={12}
    mb={8}
    fontSize={{ base: "2xl", md: "2rem" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const StyledH3 = (props: ChildOnlyProp) => (
  <Heading
    as="h3"
    lineHeight={1.4}
    fontSize="xl"
    fontWeight="bold"
    mb={2}
    mt={6}
    sx={{
      a: {
        dispalay: "none",
      },
    }}
    {...props}
  />
)

const StyledInfoBanner = (props: ComponentPropsWithRef<typeof InfoBanner>) => (
  <InfoBanner w={{ lg: "50%" }} {...props} />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="1 1 75%" mb={6} mr={{ lg: 8 }} {...props} />
)

const FullWidthContainer = (
  props: ChildOnlyProp & { ref: React.RefObject<HTMLDivElement> }
) => (
  <Page
    m={0}
    mb={16}
    pt={16}
    pb={8}
    borderTop="1px solid"
    borderColor="border"
    bg="ednBackground"
    {...props}
  />
)

const CardContainer = (props: ChildOnlyProp) => (
  <SimpleGrid gap={4} columns={[1, null, 2]} {...props} />
)

const StepBoxContainer = (props: ChildOnlyProp) => (
  <Flex
    flexWrap={{ base: "wrap", lg: "nowrap" }}
    w="full"
    my={4}
    mb={16}
    mx={0}
    {...props}
  />
)

const StepBox = (props: ComponentPropsWithRef<typeof BaseLink>) => (
  <BaseLink
    border="1px solid"
    borderColor="border"
    pt={0}
    pb={{ base: 8, md: 0 }}
    px={8}
    display="flex"
    flexDirection={{ base: "column", md: "row" }}
    justifyContent="space-between"
    alignItems={{ base: "flex-start", md: "center" }}
    color="text"
    textDecor="none"
    w="full"
    transition="transform 0.2s"
    _hover={{
      bg: "ednBackground",
      transform: "scale(1.05)",
    }}
    {...props}
  />
)

const CenterText = (props: ChildOnlyProp) => (
  <Text
    textAlign="center"
    maxW="800px"
    mt={{ base: "auto", lg: 0 }}
    mx={{ base: 6, lg: 0 }}
    mb={4}
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <Box w="full" m={{ base: "auto 0", lg: 0 }} mr={{ lg: 8 }} {...props} />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Box w="full" m={{ base: "auto 0", lg: 0 }} ml={{ lg: 8 }} {...props} />
)

const StyledCallout = (props: ComponentPropsWithRef<typeof Callout>) => (
  <Callout flex="1 1 416px" minH="full" mt={{ base: 48, lg: 32 }} {...props} />
)

const StyledCardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid gap={8} minChildWidth="min(100%, 280px)" my={16} {...props} />
)

const MoreButtonContainer = (props: ChildOnlyProp) => (
  <Flex justify="center" mt={12} mb={4} {...props} />
)

enum CategoryType {
  FINANCE = "finance",
  TECHNOLOGY = "technology",
  COLLECTIBLES = "collectibles",
  GAMING = "gaming",
  METAVERSE = "metaverse",
  SOCIAL = "social",
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
        CategoryType.METAVERSE,
        CategoryType.SOCIAL,
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
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "no owners",
      },
    },
    {
      title: t("page-dapps-features-2-title"),
      description: t("page-dapps-features-2-description"),
      emoji: ":megaphone:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "free from censorship",
      },
    },
    {
      title: t("page-dapps-features-3-title"),
      description: t("page-dapps-features-3-description"),
      emoji: ":money-mouth_face:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "built in payments",
      },
    },
    {
      title: t("page-dapps-features-4-title"),
      description: t("page-dapps-features-4-description"),
      emoji: ":electric_plug:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "plug and play",
      },
    },
    {
      title: t("page-dapps-features-5-title"),
      description: t("page-dapps-features-5-description"),
      emoji: ":detective:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "one anonymous login",
      },
    },
    {
      title: t("page-dapps-features-6-title"),
      description: t("page-dapps-features-6-description"),
      emoji: ":key:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "backed by cryptography",
      },
    },
    {
      title: t("page-dapps-features-7-title"),
      description: t("page-dapps-features-7-description"),
      emoji: ":antenna_with_bars:",
      matomo: {
        eventCategory: "dapp benefits",
        eventAction: "click",
        eventName: "no down time",
      },
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
    [CategoryType.METAVERSE]: {
      title: t("page-dapps-metaverse-button"),
      emoji: ":globe_with_meridians:",
      benefitsTitle: t("page-dapps-metaverse-benefits-title"),
      benefitsDescription: t("page-dapps-metaverse-benefits-description"),
      benefits: [
        {
          emoji: ":tophat:",
          title: t("page-dapps-metaverse-benefits-1-title"),
          description: t("page-dapps-metaverse-benefits-1-description"),
        },
        {
          emoji: ":person:",
          title: t("page-dapps-metaverse-benefits-2-title"),
          description: t("page-dapps-metaverse-benefits-2-description"),
        },
      ],
    },
    [CategoryType.SOCIAL]: {
      title: t("page-dapps-social-button"),
      emoji: ":incoming_envelope:",
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
    {
      title: "Yearn",
      description: t("page-dapps-dapp-description-yearn"),
      link: "https://yearn.finance/",
      image: getImage(data.yearn),
      alt: t("page-dapps-yearn-image-alt"),
    },
    {
      title: "Convex",
      description: t("page-dapps-dapp-description-convex"),
      link: "https://www.convexfinance.com/",
      image: getImage(data.convex),
      alt: t("page-dapps-convex-image-alt"),
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
      title: "Loopring",
      description: t("page-dapps-dapp-description-loopring"),
      link: "https://loopring.org/#/",
      image: getImage(data.loopring),
      alt: t("page-dapps-loopring-logo-alt"),
    },
    {
      title: "Balancer",
      description: t("page-dapps-dapp-description-balancer"),
      link: "https://balancer.fi/",
      image: getImage(data.balancer),
      alt: t("page-dapps-balancer-logo-alt"),
    },
    {
      title: "Curve",
      description: t("page-dapps-dapp-description-curve"),
      link: "https://curve.fi/",
      image: getImage(data.curve),
      alt: t("page-dapps-curve-logo-alt"),
    },
    {
      title: "DODO",
      description: t("page-dapps-dapp-description-dodo"),
      link: "https://dodoex.io/",
      image: getImage(data.dodo),
      alt: t("page-dapps-dodo-logo-alt"),
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
      title: "Synthetix",
      description: t("page-dapps-dapp-description-synthetix"),
      link: "https://synthetix.io/",
      image: getImage(data.synthetix),
      alt: t("page-dapps-sythetix-logo-alt"),
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
      title: "Sablier",
      description: t("page-dapps-dapp-description-sablier"),
      link: "https://app.sablier.com",
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
      title: "Yearn",
      description: t("page-dapps-dapp-description-yearn"),
      link: "https://yearn.finance/",
      image: getImage(data.yearn),
      alt: t("page-dapps-yearn-logo-alt"),
    },
    {
      title: "Convex",
      description: t("page-dapps-dapp-description-convex"),
      link: "https://www.convexfinance.com/",
      image: getImage(data.convex),
      alt: t("page-dapps-convex-logo-alt"),
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
      title: "radicle.xyz",
      description: t("page-dapps-dapp-description-radicle"),
      link: "https://radicle.xyz/",
      image: getImage(data.radicle),
      alt: t("page-dapps-radicle-logo-alt"),
    },
    {
      title: "API3",
      description: t("page-dapps-dapp-description-api3"),
      link: "https://api3.org/",
      image: getImage(data.api3),
      alt: t("page-dapps-api3-logo-alt"),
    },
  ]

  const codeMarketplaces = [
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
      title: "IPFS",
      description: t("page-dapps-dapp-description-ipfs"),
      link: "https://ipfs.tech/",
      image: getImage(data.ipfs),
      alt: t("page-dapps-ipfs-logo-alt"),
    },
    {
      title: "Golem",
      description: t("page-dapps-dapp-description-golem"),
      link: "https://golem.network/",
      image: getImage(data.golem),
      alt: t("page-dapps-golem-logo-alt"),
    },
    {
      title: "Graph",
      description: t("page-dapps-dapp-description-graph"),
      link: "https://thegraph.com/en/",
      image: getImage(data.graph),
      alt: t("page-dapps-graph-logo-alt"),
    },
    {
      title: "Arweave",
      description: t("page-dapps-dapp-description-arweave"),
      link: "https://www.arweave.org/",
      image: getImage(data.arweave),
      alt: t("page-dapps-arweave-logo-alt"),
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
      link: "https://www.superrare.com",
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
      title: "marble.cards",
      description: t("page-dapps-dapp-description-marble-cards"),
      link: "https://marble.cards/",
      image: getImage(data.marble),
      alt: t("page-dapps-marble-cards-logo-alt"),
    },
    {
      title: "CryptoPunks",
      description: t("page-dapps-dapp-description-cryptopunks"),
      link: "https://cryptopunks.app/",
      image: getImage(data.cryptopunks),
      alt: t("page-dapps-cryptopunks-logo-alt"),
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

  const avatar = [
    {
      title: "OSUVOX",
      description: t("page-dapps-dapp-description-osuvox"),
      link: "https://osuvox.io/",
      image: getImage(data.osuvox),
      alt: t("page-dapps-osuvox-logo-alt"),
    },
    {
      title: "Spatial",
      description: t("page-dapps-dapp-description-spatial"),
      link: "https://www.spatial.io/",
      image: getImage(data.spatial),
      alt: t("page-dapps-spatial-logo-alt"),
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

  const social = [
    {
      title: "GM",
      description: t("page-dapps-dapp-description-gm"),
      link: "https://gm.xyz/",
      image: getImage(data.gm),
      alt: t("page-dapps-gm-logo-alt"),
    },
    {
      title: "CyberConnect",
      description: t("page-dapps-dapp-description-cyberconnect"),
      link: "https://link3.to/cyberconnect",
      image: getImage(data.cyberconnect),
      alt: t("page-dapps-cyberconnect-logo-alt"),
    },
  ]

  const content = [
    {
      title: "Mirror",
      description: t("page-dapps-dapp-description-mirror"),
      link: "https://mirror.xyz/",
      image: getImage(data.mirror),
      alt: t("page-dapps-mirror-logo-alt"),
    },
  ]

  const messaging = [
    {
      title: "Status",
      description: t("page-dapps-dapp-description-status"),
      link: "https://status.im/",
      image: getImage(data.status),
      alt: t("page-dapps-status-logo-alt"),
    },
    {
      title: "XMTP",
      description: t("page-dapps-dapp-description-xmtp"),
      link: "https://xmtp.org/",
      image: getImage(data.xmtp),
      alt: t("page-dapps-xmtp-logo-alt"),
    },
    {
      title: "Skiff",
      description: t("page-dapps-dapp-description-skiff"),
      link: "https://skiff.com/",
      image: getImage(data.skiff),
      alt: t("page-dapps-skiff-logo-alt"),
    },
  ]

  const identity = [
    {
      title: "Ethereum Name Service",
      description: t("page-dapps-dapp-description-ens"),
      link: "https://ens.domains/",
      image: getImage(data.ens),
      alt: t("page-dapps-ens-logo-alt"),
    },
    {
      title: "Spruce",
      description: t("page-dapps-dapp-description-spruce"),
      link: "https://www.spruceid.com/",
      image: getImage(data.spruce),
      alt: t("page-dapps-spruce-logo-alt"),
    },
  ]

  const demandAggregator = [
    {
      title: "KyberSwap",
      description: t("page-dapps-dapp-description-kyberswap"),
      link: "https://kyberswap.com/",
      image: getImage(data.kyberswap),
      alt: t("page-dapps-kyberswap-logo-alt"),
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

  const derivatives = [
    {
      title: "Synthetix",
      description: t("page-dapps-dapp-description-synthetix"),
      link: "https://synthetix.io/",
      image: getImage(data.synthetix),
      alt: t("page-dapps-synthetix-logo-alt"),
    },
  ]

  const liquidStaking = [
    {
      title: "Lido",
      description: t("page-dapps-dapp-description-lido"),
      link: "https://lido.fi/",
      image: getImage(data.lido),
      alt: t("page-dapps-lido-logo-alt"),
    },
    {
      title: "Ankr",
      description: t("page-dapps-dapp-description-ankr"),
      link: "https://www.ankr.com/",
      image: getImage(data.ankr),
      alt: t("page-dapps-ankr-logo-alt"),
    },
  ]

  const bridges = [
    {
      title: "Multichain",
      description: t("page-dapps-dapp-description-multichain"),
      link: "https://multichain.xyz/",
      image: getImage(data.multichain),
      alt: t("page-dapps-multichain-logo-alt"),
    },
    {
      title: "Rubic",
      description: t("page-dapps-dapp-description-rubic"),
      link: "https://rubic.exchange/",
      image: getImage(data.rubic),
      alt: t("page-dapps-rubic-logo-alt"),
    },
  ]

  const experiences = [
    {
      title: "POAP - Proof of Attendance Protocol",
      description: t("page-dapps-dapp-description-poap"),
      link: "https://poap.xyz",
      image: getImage(data.poap),
      alt: t("page-dapps-poap-logo-alt"),
    },
  ]

  const marketplaces = [
    {
      title: "OpenSea",
      description: t("page-dapps-dapp-description-opensea"),
      link: "https://opensea.io/",
      image: getImage(data.opensea),
      alt: t("page-dapps-opensea-logo-alt"),
    },
    {
      title: "Rarible",
      description: t("page-dapps-dapp-description-rarible"),
      link: "https://rarible.com/",
      image: getImage(data.rarible),
      alt: t("page-dapps-rarible-logo-alt"),
    },
    {
      title: "Art Blocks",
      description: t("page-dapps-dapp-description-artblocks"),
      link: "https://artblocks.io/",
      image: getImage(data.artblocks),
      alt: t("page-dapps-artblocks-logo-alt"),
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
      name: "OpenSea",
      description: t("page-dapps-dapp-description-opensea"),
      url: "https://opensea.io/",
      image: getImage(data.opensea),
      alt: t("page-dapps-opensea-logo-alt"),
      background: "#181b21",
      type: CategoryType.COLLECTIBLES,
      pillColor: "tagBlue",
    },
    {
      name: "Gods Unchained",
      description: t("page-dapps-dapp-description-gods-unchained"),
      url: "https://godsunchained.com/",
      image: getImage(data.gods),
      alt: t("page-dapps-gods-unchained-logo-alt"),
      background: "#111c25",
      type: CategoryType.GAMING,
      pillColor: "tagOrange",
    },
    {
      name: "Ethereum Name Service",
      description: t("page-dapps-dapp-description-ens"),
      url: "https://ens.domains/",
      image: getImage(data.ens),
      alt: t("page-dapps-ens-logo-alt"),
      background: "#fff",
      type: CategoryType.SOCIAL,
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
        to: "#beginner",
        matomo: {
          eventCategory: "dapp hero buttons",
          eventAction: "click",
          eventName: "explore dapps",
        },
      },
      {
        content: t("page-dapps-what-are-dapps"),
        to: "#what-are-dapps",
        variant: "outline",
        matomo: {
          eventCategory: "dapp hero buttons",
          eventAction: "click",
          eventName: "what are dapps",
        },
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
        <StyledH2>
          <Translation id="get-started" />
        </StyledH2>
        <Text>
          <Translation id="page-dapps-get-started-subtitle" />{" "}
          <GlossaryTooltip termKey="transaction-fee">
            <Translation id="transaction-fees" />
          </GlossaryTooltip>
        </Text>
        <Row>
          <StepBoxContainer>
            <StepBox to="/get-eth/">
              <Box>
                <StyledH3>
                  1. <Translation id="page-wallets-get-some" />
                </StyledH3>
                <Text>
                  <Translation id="page-dapps-get-some-eth-description" />
                </Text>
              </Box>
              <ButtonSecondary
                onClick={() =>
                  trackCustomEvent({
                    eventCategory: "dapp hero buttons",
                    eventAction: "click",
                    eventName: "get eth",
                  })
                }
              >
                <Translation id="get-eth" />
              </ButtonSecondary>
            </StepBox>
            <StepBox to="/wallets/find-wallet/">
              <Box>
                <StyledH3>
                  2. <Translation id="page-dapps-set-up-a-wallet-title" />
                </StyledH3>
                <Text>
                  <Translation id="page-dapps-set-up-a-wallet-description" />
                </Text>
              </Box>
              <ButtonSecondary
                onClick={() =>
                  trackCustomEvent({
                    eventCategory: "dapp hero buttons",
                    eventAction: "click",
                    eventName: "find wallet",
                  })
                }
              >
                <Translation id="page-dapps-set-up-a-wallet-button" />
              </ButtonSecondary>
            </StepBox>
            <StepBox to="#explore">
              <Box>
                <StyledH3>
                  3. <Translation id="page-dapps-ready-title" />
                </StyledH3>
                <Text>
                  <Translation id="page-dapps-ready-description" />
                </Text>
              </Box>
              <ButtonPrimary
                onClick={() =>
                  trackCustomEvent({
                    eventCategory: "dapp hero buttons",
                    eventAction: "click",
                    eventName: "go",
                  })
                }
              >
                <Translation id="page-dapps-ready-button" />
              </ButtonPrimary>
            </StepBox>
          </StepBoxContainer>
        </Row>
        <H3 id="beginner">
          <Translation id="page-dapps-beginner-friendly-header" />{" "}
          <Emoji text=":+1:" />
        </H3>
        <Text>
          <Translation id="page-dapps-beginner-friendly-description" />
        </Text>
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
        <H2 id="explore">
          <Translation id="page-dapps-explore-dapps-title" />
        </H2>
        <CenterText>
          <Translation id="page-dapps-explore-dapps-description" />
        </CenterText>
        <H3>
          <Translation id="page-dapps-choose-category" />
        </H3>
        <OptionContainer>
          {categoryKeys.map((key, idx) => {
            const categoryType = key as CategoryType
            const category = categories[categoryType]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === categoryType}
                onClick={() => {
                  handleCategorySelect(categoryType, false)
                  trackCustomEvent({
                    eventCategory: "choose dapp category",
                    eventAction: "click",
                    eventName: categoryType,
                  })
                }}
              >
                <Emoji fontSize="2xl" mr={`1rem`} text={category.emoji} />
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
                <StyledH2>
                  <Translation id="page-dapps-finance-title" />{" "}
                  <Emoji fontSize="5xl" ml="2" text=":money_with_wings:" />
                </StyledH2>
                <Subtitle>
                  <Translation id="page-dapps-finance-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>
                  <Translation id="page-dapps-warning-header" />
                </StyledH2>
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
                  category={t("page-dapps-category-demand-aggregator")}
                  content={demandAggregator}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-bridges")}
                  content={bridges}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-investments")}
                  content={investments}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-portfolios")}
                  content={portfolios}
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
                  category={t("page-dapps-category-payments")}
                  content={payments}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-lottery")}
                  content={lottery}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-derivatives")}
                  content={derivatives}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-liquid-staking")}
                  content={liquidStaking}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-trading")}
                  content={trading}
                />
              </RightColumn>
            </TwoColumnContent>
            <CalloutBanner
              mt={32}
              mx={0}
              mb={{ base: 0, lg: 16 }}
              titleKey={"page-dapps-wallet-callout-title"}
              descriptionKey={"page-dapps-wallet-callout-description"}
              image={getImage(data.wallet)!}
              maxImageWidth={300}
              alt={t("page-dapps-wallet-callout-image-alt")}
            >
              <Box>
                <ButtonLink to="/wallets/find-wallet/">
                  <Translation id="page-dapps-wallet-callout-button" />
                </ButtonLink>
              </Box>
            </CalloutBanner>
          </Content>
        )}
        {selectedCategory === CategoryType.GAMING && (
          <Content>
            <IntroRow>
              <Column>
                <StyledH2>
                  <Translation id="page-dapps-gaming-title" />{" "}
                  <Emoji fontSize="5xl" ml="2" text=":video_game:" />
                </StyledH2>
                <Subtitle>
                  <Translation id="page-dapps-gaming-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>
                  <Translation id="page-dapps-warning-header" />
                </StyledH2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-competitive")}
                  content={competitive}
                />
              </LeftColumn>
              <RightColumn></RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === CategoryType.TECHNOLOGY && (
          <Content>
            <IntroRow>
              <Column>
                <StyledH2>
                  <Translation id="page-dapps-technology-title" />{" "}
                  <Emoji fontSize="5xl" ml="2" text=":keyboard:" />
                </StyledH2>
                <Subtitle>
                  <Translation id="page-dapps-technology-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>
                  <Translation id="page-dapps-warning-header" />
                </StyledH2>
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
                  category={t("page-dapps-category-code-marketplaces")}
                  content={codeMarketplaces}
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
                <StyledH2>
                  <Translation id="page-dapps-collectibles-title" />{" "}
                  <Emoji
                    fontSize="5xl"
                    ml={"0.5rem"}
                    text=":frame_with_picture:"
                  />
                </StyledH2>
                <Subtitle>
                  <Translation id="page-dapps-collectibles-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>
                  <Translation id="page-dapps-warning-header" />
                </StyledH2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-marketplaces")}
                  content={marketplaces}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-collectibles")}
                  content={collectibles}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-arts")}
                  content={arts}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-experiences")}
                  content={experiences}
                />
                <ProductList
                  category={t("page-dapps-category-music")}
                  content={music}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === CategoryType.METAVERSE && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-metaverse-title" />{" "}
                  <Emoji fontSize="5xl" ml="2" text=":globe_with_meridians:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-metaverse-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
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
                  category={t("page-dapps-category-avatar")}
                  content={avatar}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory === CategoryType.SOCIAL && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-dapps-social-title" />{" "}
                  <Emoji fontSize="5xl" ml="2" text=":incoming_envelope:" />
                </H2>
                <Subtitle>
                  <Translation id="page-dapps-social-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <H2>
                  <Translation id="page-dapps-warning-header" />
                </H2>
                <Translation id="page-dapps-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-social")}
                  content={social}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-content")}
                  content={content}
                />
              </RightColumn>
            </TwoColumnContent>
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-messaging")}
                  content={messaging}
                />
              </LeftColumn>
              <RightColumn>
                <ProductList
                  category={t("page-dapps-category-identity")}
                  content={identity}
                />
              </RightColumn>
            </TwoColumnContent>
          </Content>
        )}
        {/* General content for all categories */}
        <Content>
          <CenterDivider />
          {categories[selectedCategory].benefits && (
            <Box mt={12}>
              <H2>
                <Translation id="page-dapps-magic-title-1" />{" "}
                <Emoji fontSize="2rem" text=":sparkles:" />{" "}
                <Translation id="page-dapps-magic-title-2" />{" "}
                {categories[selectedCategory].benefitsTitle}
              </H2>
              <Text>{categories[selectedCategory].benefitsDescription}</Text>
              <CardContainer>
                {(categories[selectedCategory].benefits || []).map(
                  (art, idx) => (
                    <Card
                      textAlign="center"
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
            </Box>
          )}
        </Content>
      </FullWidthContainer>
      <Content>
        <ImageContainer id="what-are-dapps">
          <GhostCard
            mt={2}
            sx={{
              ".ghost-card-base": {
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            <MagiciansImage
              image={getImage(data.magicians)!}
              alt={t("page-dapps-magician-img-alt")}
            />
          </GhostCard>
        </ImageContainer>
        <Flex
          direction="column"
          align={{ base: "flex-start", sm: "center" }}
          mt={12}
        >
          <H2>
            <Translation id="page-dapps-magic-behind-dapps-title" />
          </H2>
          <Text textAlign={{ base: "left", sm: "center" }} maxW="800px" mb={4}>
            <Translation id="page-dapps-magic-behind-dapps-description" />
          </Text>
          <InlineLink to="/what-is-ethereum/">
            <Translation id="page-dapps-magic-behind-dapps-link" />
          </InlineLink>
        </Flex>
        <BoxGrid items={features} />
        <Row>
          <LeftColumn>
            <H2>
              <Translation id="page-dapps-how-dapps-work-title" />
            </H2>
            <Text>
              <Translation id="page-dapps-how-dapps-work-p1" />
            </Text>
            <Text>
              <Translation id="page-dapps-how-dapps-work-p2" />
            </Text>
            <Text>
              <Translation id="page-dapps-how-dapps-work-p3" />
            </Text>
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
              <Box>
                <ButtonLink to="/developers/">
                  <Translation id="page-dapps-learn-callout-button" />
                </ButtonLink>
              </Box>
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
        layout: FIXED
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
        ns: { in: ["page-dapps", "common", "glossary"] }
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
    convex: file(relativePath: { eq: "dapps/convex.png" }) {
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
    yearn: file(relativePath: { eq: "dapps/yearn.png" }) {
      ...dappImage
    }
    balancer: file(relativePath: { eq: "dapps/balancer.png" }) {
      ...dappImage
    }
    yearn: file(relativePath: { eq: "dapps/yearn.png" }) {
      ...dappImage
    }
    convex: file(relativePath: { eq: "dapps/convex.png" }) {
      ...dappImage
    }
    api3: file(relativePath: { eq: "dapps/api3.png" }) {
      ...dappImage
    }
    ipfs: file(relativePath: { eq: "dapps/ipfs.png" }) {
      ...dappImage
    }
    graph: file(relativePath: { eq: "dapps/graph.png" }) {
      ...dappImage
    }
    arweave: file(relativePath: { eq: "dapps/arweave.png" }) {
      ...dappImage
    }
    osuvox: file(relativePath: { eq: "dapps/osuvox.png" }) {
      ...dappImage
    }
    spatial: file(relativePath: { eq: "dapps/spatial.png" }) {
      ...dappImage
    }
    gm: file(relativePath: { eq: "dapps/gm.png" }) {
      ...dappImage
    }
    cyberconnect: file(relativePath: { eq: "dapps/cyberconnect.png" }) {
      ...dappImage
    }
    mirror: file(relativePath: { eq: "dapps/mirror.png" }) {
      ...dappImage
    }
    status: file(relativePath: { eq: "dapps/status.png" }) {
      ...dappImage
    }
    xmtp: file(relativePath: { eq: "dapps/xmtp.png" }) {
      ...dappImage
    }
    skiff: file(relativePath: { eq: "dapps/skiff.png" }) {
      ...dappImage
    }
    spruce: file(relativePath: { eq: "dapps/spruce.png" }) {
      ...dappImage
    }
    kyberswap: file(relativePath: { eq: "dapps/kyberswap.png" }) {
      ...dappImage
    }
    synthetix: file(relativePath: { eq: "dapps/synthetix.png" }) {
      ...dappImage
    }
    lido: file(relativePath: { eq: "dapps/lido.png" }) {
      ...dappImage
    }
    ankr: file(relativePath: { eq: "dapps/ankr.png" }) {
      ...dappImage
    }
    multichain: file(relativePath: { eq: "dapps/multichain.png" }) {
      ...dappImage
    }
    rubic: file(relativePath: { eq: "dapps/rubic.png" }) {
      ...dappImage
    }
    synthetix: file(relativePath: { eq: "dapps/synthetix.png" }) {
      ...dappImage
    }
    curve: file(relativePath: { eq: "dapps/curve.png" }) {
      ...dappImage
    }
    dodo: file(relativePath: { eq: "dapps/dodo.png" }) {
      ...dappImage
    }
    artblocks: file(relativePath: { eq: "dapps/artblocks.png" }) {
      ...dappImage
    }
  }
`
