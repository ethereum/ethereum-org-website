import React, {
  type ComponentPropsWithRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Badge,
  Box,
  Button,
  type ButtonProps,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  SimpleGrid,
  useToken,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import BoxGrid from "@/components/BoxGrid"
import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import CalloutBanner from "@/components/CalloutBanner"
import Card from "@/components/Card"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import InlineLink, { BaseLink } from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import ProductCard from "@/components/ProductCard"
import ProductListComponent, {
  type ProductListProps,
} from "@/components/ProductList"
import Translation from "@/components/Translation"
import { Divider } from "@/components/ui/divider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import aave from "@/public/images/dapps/aave.png"
import ankr from "@/public/images/dapps/ankr.png"
import api3 from "@/public/images/dapps/api3.png"
import artblocks from "@/public/images/dapps/artblocks.png"
import arweave from "@/public/images/dapps/arweave.png"
import asyncart from "@/public/images/dapps/asyncart.png"
import audius from "@/public/images/dapps/audius.png"
import axie from "@/public/images/dapps/axie.png"
import balancer from "@/public/images/dapps/balancer.png"
import brave from "@/public/images/dapps/brave.png"
import compound from "@/public/images/dapps/compound.png"
import convex from "@/public/images/dapps/convex.png"
import crackAndStack from "@/public/images/dapps/crackandstack.png"
import cryptopunks from "@/public/images/dapps/cryptopunks.png"
import cryptovoxels from "@/public/images/dapps/cryptovoxels.png"
import curve from "@/public/images/dapps/curve.png"
import cyberconnect from "@/public/images/dapps/cyberconnect.png"
import darkforest from "@/public/images/dapps/darkforest.png"
import decentraland from "@/public/images/dapps/decentraland.png"
import dodo from "@/public/images/dapps/dodo.png"
import ens from "@/public/images/dapps/ens.png"
import etherisc from "@/public/images/dapps/etherisc.png"
import foundation from "@/public/images/dapps/foundation.png"
import gitcoin from "@/public/images/dapps/gitcoin.png"
import gm from "@/public/images/dapps/gm.png"
import gods from "@/public/images/dapps/gods.png"
import golem from "@/public/images/dapps/golem.png"
import graph from "@/public/images/dapps/graph.png"
import index from "@/public/images/dapps/index-coop.png"
import ipfs from "@/public/images/dapps/ipfs.png"
import krystal from "@/public/images/dapps/krystal.png"
import kyberswap from "@/public/images/dapps/kyberswap.png"
import lido from "@/public/images/dapps/lido.png"
import loopring from "@/public/images/dapps/loopring.png"
import marble from "@/public/images/dapps/marble.png"
import matcha from "@/public/images/dapps/matcha.png"
import meeds from "@/public/images/dapps/meeds.png"
import mirror from "@/public/images/dapps/mirror.png"
import nexus from "@/public/images/dapps/nexus.png"
import nifty from "@/public/images/dapps/nifty.png"
import opensea from "@/public/images/dapps/opensea.png"
import opera from "@/public/images/dapps/opera.png"
import osuvox from "@/public/images/dapps/osuvox.png"
import poap from "@/public/images/dapps/poap.png"
import polymarket from "@/public/images/dapps/polymarket.png"
import pooltogether from "@/public/images/dapps/pooltogether.png"
import pwn from "@/public/images/dapps/pwn.png"
import radicle from "@/public/images/dapps/radicle.png"
import rarible from "@/public/images/dapps/rarible.png"
import requestFinance from "@/public/images/dapps/requestFinance.png"
import rotki from "@/public/images/dapps/rotki.png"
import rubic from "@/public/images/dapps/rubic.png"
import sablier from "@/public/images/dapps/sablier.png"
import spatial from "@/public/images/dapps/spatial.png"
import spruce from "@/public/images/dapps/spruce.png"
import status from "@/public/images/dapps/status.png"
import summerfi from "@/public/images/dapps/summerfi.png"
import superrare from "@/public/images/dapps/superrare.png"
import synthetix from "@/public/images/dapps/synthetix.png"
import uniswap from "@/public/images/dapps/uni.png"
import xmtp from "@/public/images/dapps/xmtp.png"
import yearn from "@/public/images/dapps/yearn.png"
import zapper from "@/public/images/dapps/zapper.png"
import zerion from "@/public/images/dapps/zerion.png"
import developers from "@/public/images/developers-eth-blocks.png" // Handled inside Callout => height=200
import doge from "@/public/images/doge-computer.png" // HERO, full? 624px
import oneinch from "@/public/images/exchanges/1inch.png"
import magicians from "@/public/images/magicians.png"
import wallet from "@/public/images/wallet.png" // width=300

const Page = (props: ChildOnlyProp & FlexProps) => (
  <Flex
    as={MainArticle}
    direction="column"
    align="center"
    mx="auto"
    w="full"
    {...props}
  />
)

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
    me={{ lg: 8 }}
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
  <Box flex="1 1 75%" mb={6} me={{ lg: 8 }} {...props} />
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
  <Box w="full" m={{ base: "auto 0", lg: 0 }} me={{ lg: 8 }} {...props} />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Box w="full" m={{ base: "auto 0", lg: 0 }} ms={{ lg: 8 }} {...props} />
)

const StyledCallout = (props: ComponentPropsWithRef<typeof Callout>) => (
  <Callout
    className="mt-48 min-h-full flex-1 basis-[416px] lg:mt-32"
    {...props}
  />
)

const StyledCardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid gap={8} minChildWidth="min(100%, 280px)" my={16} {...props} />
)

const MoreButtonContainer = (props: ChildOnlyProp) => (
  <Flex justify="center" mt={12} mb={4} {...props} />
)

const ProductList = (props: Omit<ProductListProps, "actionLabel">) => {
  const { t } = useTranslation("page-dapps")
  return (
    <ProductListComponent
      actionLabel={t("page-dapps-ready-button")}
      {...props}
    />
  )
}

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
    description: ReactNode
  }>
}

interface Categories {
  [key: string]: Category
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const DappsPage = () => {
  const { t } = useTranslation(["page-dapps", "common"])
  const { locale, query } = useRouter()

  const [selectedCategory, setCategory] = useState<CategoryType>(
    CategoryType.FINANCE
  )
  const explore = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch category on load
    const queryParamCategories = (query.category as string) || ""
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
  }, [query.category])

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
        newPath = `/${locale}${newPath}`
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
          description: (
            <Translation id="page-dapps:page-dapps-finance-benefits-3-description" />
          ),
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
      image: aave,
      alt: t("page-dapps-aave-logo-alt"),
    },
    {
      title: "Compound",
      description: t("page-dapps-dapp-description-compound"),
      link: "https://compound.finance/",
      image: compound,
      alt: t("page-dapps-compound-logo-alt"),
    },
    {
      title: "Summer.fi",
      description: t("page-dapps-dapp-description-summerfi"),
      link: "https://summer.fi/",
      image: summerfi,
      alt: t("page-dapps-summerfi-logo-alt"),
    },
    {
      title: "PWN",
      description: t("page-dapps-dapp-description-pwn"),
      link: "https://pwn.xyz",
      image: pwn,
      alt: t("page-dapps-pwn-image-alt"),
    },
    {
      title: "Yearn",
      description: t("page-dapps-dapp-description-yearn"),
      link: "https://yearn.finance/",
      image: yearn,
      alt: t("page-dapps-yearn-image-alt"),
    },
    {
      title: "Convex",
      description: t("page-dapps-dapp-description-convex"),
      link: "https://www.convexfinance.com/",
      image: convex,
      alt: t("page-dapps-convex-image-alt"),
    },
  ]

  const dex = [
    {
      title: "Uniswap",
      description: t("page-dapps-dapp-description-uniswap"),
      link: "https://uniswap.org/",
      image: uniswap,
      alt: t("page-dapps-uniswap-logo-alt"),
    },
    {
      title: "Loopring",
      description: t("page-dapps-dapp-description-loopring"),
      link: "https://loopring.org/#/",
      image: loopring,
      alt: t("page-dapps-loopring-logo-alt"),
    },
    {
      title: "Balancer",
      description: t("page-dapps-dapp-description-balancer"),
      link: "https://balancer.fi/",
      image: balancer,
      alt: t("page-dapps-balancer-logo-alt"),
    },
    {
      title: "Curve",
      description: t("page-dapps-dapp-description-curve"),
      link: "https://curve.fi/",
      image: curve,
      alt: t("page-dapps-curve-logo-alt"),
    },
    {
      title: "DODO",
      description: t("page-dapps-dapp-description-dodo"),
      link: "https://dodoex.io/",
      image: dodo,
      alt: t("page-dapps-dodo-logo-alt"),
    },
  ]

  const trading = [
    {
      title: "Polymarket",
      description: t("page-dapps-dapp-description-polymarket"),
      link: "https://polymarket.com",
      image: polymarket,
      alt: t("page-dapps-polymarket-logo-alt"),
    },
    {
      title: "Synthetix",
      description: t("page-dapps-dapp-description-synthetix"),
      link: "https://synthetix.io/",
      image: synthetix,
      alt: t("page-dapps-sythetix-logo-alt"),
    },
  ]

  const lottery = [
    {
      title: "Gitcoin Grants",
      description: t("page-dapps-dapp-description-gitcoin-grants"),
      link: "https://gitcoin.co/grants/?",
      image: gitcoin,
      alt: t("page-dapps-gitcoin-grants-logo-alt"),
    },
  ]

  const payments = [
    {
      title: "Sablier",
      description: t("page-dapps-dapp-description-sablier"),
      link: "https://app.sablier.com",
      image: sablier,
      alt: t("page-dapps-sablier-logo-alt"),
    },
    {
      title: "Request Finance",
      description: t("page-dapps-dapp-description-request-finance"),
      link: "https://request.finance",
      image: requestFinance,
      alt: t("page-dapps-request-finance-logo-alt"),
    },
  ]

  const investments = [
    {
      title: "PoolTogether",
      description: t("page-dapps-dapp-description-pooltogether"),
      link: "https://pooltogether.com/",
      image: pooltogether,
      alt: t("page-dapps-pooltogether-logo-alt"),
    },
    {
      title: "Index Coop",
      description: t("page-dapps-dapp-description-index-coop"),
      link: "https://www.indexcoop.com/",
      image: index,
      alt: t("page-dapps-index-coop-logo-alt"),
    },
    {
      title: "Yearn",
      description: t("page-dapps-dapp-description-yearn"),
      link: "https://yearn.finance/",
      image: yearn,
      alt: t("page-dapps-yearn-logo-alt"),
    },
    {
      title: "Convex",
      description: t("page-dapps-dapp-description-convex"),
      link: "https://www.convexfinance.com/",
      image: convex,
      alt: t("page-dapps-convex-logo-alt"),
    },
  ]

  const insurance = [
    {
      title: "Nexus Mutual",
      description: t("page-dapps-dapp-description-nexus-mutual"),
      link: "https://nexusmutual.io/",
      image: nexus,
      alt: t("page-dapps-nexus-mutual-logo-alt"),
    },
    {
      title: "Etherisc",
      description: t("page-dapps-dapp-description-etherisc"),
      link: "https://etherisc.com/",
      image: etherisc,
      alt: t("page-dapps-etherisc-logo-alt"),
    },
  ]

  const portfolios = [
    {
      title: "Zapper",
      description: t("page-dapps-dapp-description-zapper"),
      link: "https://zapper.fi/",
      image: zapper,
      alt: t("page-dapps-zapper-logo-alt"),
    },
    {
      title: "Zerion",
      description: t("page-dapps-dapp-description-zerion"),
      link: "https://app.zerion.io/",
      image: zerion,
      alt: t("page-dapps-zerion-logo-alt"),
    },
    {
      title: "Rotki",
      description: t("page-dapps-dapp-description-rotki"),
      link: "https://rotki.com/",
      image: rotki,
      alt: t("page-dapps-rotki-logo-alt"),
    },
    {
      title: "Krystal",
      description: t("page-dapps-dapp-description-krystal"),
      link: "https://defi.krystal.app/",
      image: krystal,
      alt: t("page-dapps-krystal-logo-alt"),
    },
  ]

  const computing = [
    {
      title: "radicle.xyz",
      description: t("page-dapps-dapp-description-radicle"),
      link: "https://radicle.xyz/",
      image: radicle,
      alt: t("page-dapps-radicle-logo-alt"),
    },
    {
      title: "API3",
      description: t("page-dapps-dapp-description-api3"),
      link: "https://api3.org/",
      image: api3,
      alt: t("page-dapps-api3-logo-alt"),
    },
  ]

  const codeMarketplaces = [
    {
      title: "Gitcoin",
      description: t("page-dapps-dapp-description-gitcoin"),
      link: "https://gitcoin.co/",
      image: gitcoin,
      alt: t("page-dapps-gitcoin-logo-alt"),
    },
  ]

  const utilities = [
    {
      title: "IPFS",
      description: t("page-dapps-dapp-description-ipfs"),
      link: "https://ipfs.tech/",
      image: ipfs,
      alt: t("page-dapps-ipfs-logo-alt"),
    },
    {
      title: "Golem",
      description: t("page-dapps-dapp-description-golem"),
      link: "https://golem.network/",
      image: golem,
      alt: t("page-dapps-golem-logo-alt"),
    },
    {
      title: "Graph",
      description: t("page-dapps-dapp-description-graph"),
      link: "https://thegraph.com/en/",
      image: graph,
      alt: t("page-dapps-graph-logo-alt"),
    },
    {
      title: "Arweave",
      description: t("page-dapps-dapp-description-arweave"),
      link: "https://www.arweave.org/",
      image: arweave,
      alt: t("page-dapps-arweave-logo-alt"),
    },
  ]

  const browsers = [
    {
      title: "Brave",
      description: t("page-dapps-dapp-description-brave"),
      link: "https://brave.com/",
      image: brave,
      alt: t("page-dapps-brave-logo-alt"),
    },
    {
      title: "Opera",
      description: t("page-dapps-dapp-description-opera"),
      link: "https://www.opera.com/crypto",
      image: opera,
      alt: t("page-dapps-opera-logo-alt"),
    },
  ]

  const arts = [
    {
      title: "Foundation",
      description: t("page-dapps-dapp-description-foundation"),
      link: "https://foundation.app/",
      image: foundation,
      alt: t("page-dapps-foundation-logo-alt"),
    },
    {
      title: "SuperRare",
      description: t("page-dapps-dapp-description-superrare"),
      link: "https://www.superrare.com",
      image: superrare,
      alt: t("page-dapps-superrare-logo-alt"),
    },
    {
      title: "Nifty Gateway",
      description: t("page-dapps-dapp-description-nifty-gateway"),
      link: "https://niftygateway.com/",
      image: nifty,
      alt: t("page-dapps-nifty-gateway-logo-alt"),
    },
    {
      title: "Async Art",
      description: t("page-dapps-dapp-description-async-art"),
      link: "https://async.art/",
      image: asyncart,
      alt: t("page-dapps-async-logo-alt"),
    },
  ]

  const music = [
    {
      title: "Audius",
      description: t("page-dapps-dapp-description-audius"),
      link: "https://audius.co/",
      image: audius,
      alt: t("page-dapps-audius-logo-alt"),
    },
  ]

  const collectibles = [
    {
      title: "marble.cards",
      description: t("page-dapps-dapp-description-marble-cards"),
      link: "https://marble.cards/",
      image: marble,
      alt: t("page-dapps-marble-cards-logo-alt"),
    },
    {
      title: "CryptoPunks",
      description: t("page-dapps-dapp-description-cryptopunks"),
      link: "https://cryptopunks.app/",
      image: cryptopunks,
      alt: t("page-dapps-cryptopunks-logo-alt"),
    },
  ]

  const worlds = [
    {
      title: "Cryptovoxels",
      description: t("page-dapps-dapp-description-cryptovoxels"),
      link: "https://www.cryptovoxels.com/",
      image: cryptovoxels,
      alt: t("page-dapps-cryptovoxels-logo-alt"),
    },
    {
      title: "Decentraland",
      description: t("page-dapps-dapp-description-decentraland"),
      link: "https://decentraland.org/",
      image: decentraland,
      alt: t("page-dapps-decentraland-logo-alt"),
    },
  ]

  const avatar = [
    {
      title: "OSUVOX",
      description: t("page-dapps-dapp-description-osuvox"),
      link: "https://osuvox.io/",
      image: osuvox,
      alt: t("page-dapps-osuvox-logo-alt"),
    },
    {
      title: "Spatial",
      description: t("page-dapps-dapp-description-spatial"),
      link: "https://www.spatial.io/",
      image: spatial,
      alt: t("page-dapps-spatial-logo-alt"),
    },
  ]

  const competitive = [
    {
      title: "Axie Infinity",
      description: t("page-dapps-dapp-description-axie-infinity"),
      link: "https://axieinfinity.com/",
      image: axie,
      alt: t("page-dapps-axie-infinity-logo-alt"),
    },
    {
      title: "Gods Unchained",
      description: t("page-dapps-dapp-description-gods-unchained"),
      link: "https://godsunchained.com/",
      image: gods,
      alt: t("page-dapps-gods-unchained-logo-alt"),
    },
    {
      title: "Dark Forest",
      description: t("page-dapps-dapp-description-dark-forest"),
      link: "https://zkga.me/",
      image: darkforest,
      alt: t("page-dapps-dark-forest-logo-alt"),
    },
    {
      title: "Crack & Stack",
      description: t("page-dapps-dapp-description-crack-and-stack"),
      link: "https://crackandstack.com/",
      image: crackAndStack,
      alt: t("page-dapps-crack-and-stack-logo-alt"),
    },
  ]

  const social = [
    {
      title: "GM",
      description: t("page-dapps-dapp-description-gm"),
      link: "https://gm.xyz/",
      image: gm,
      alt: t("page-dapps-gm-logo-alt"),
    },
    {
      title: "CyberConnect",
      description: t("page-dapps-dapp-description-cyberconnect"),
      link: "https://link3.to/cyberconnect",
      image: cyberconnect,
      alt: t("page-dapps-cyberconnect-logo-alt"),
    },
  ]

  const content = [
    {
      title: "Mirror",
      description: t("page-dapps-dapp-description-mirror"),
      link: "https://mirror.xyz/",
      image: mirror,
      alt: t("page-dapps-mirror-logo-alt"),
    },
  ]

  const messaging = [
    {
      title: "Status",
      description: t("page-dapps-dapp-description-status"),
      link: "https://status.im/",
      image: status,
      alt: t("page-dapps-status-logo-alt"),
    },
    {
      title: "XMTP",
      description: t("page-dapps-dapp-description-xmtp"),
      link: "https://xmtp.org/",
      image: xmtp,
      alt: t("page-dapps-xmtp-logo-alt"),
    },
  ]

  const identity = [
    {
      title: "Ethereum Name Service",
      description: t("page-dapps-dapp-description-ens"),
      link: "https://ens.domains/",
      image: ens,
      alt: t("page-dapps-ens-logo-alt"),
    },
    {
      title: "Spruce",
      description: t("page-dapps-dapp-description-spruce"),
      link: "https://www.spruceid.com/",
      image: spruce,
      alt: t("page-dapps-spruce-logo-alt"),
    },
  ]

  const community = [
    {
      title: "Meeds",
      description: t("page-dapps-dapp-description-meeds"),
      link: "https://meeds.io",
      image: meeds,
      alt: t("page-dapps-meeds-logo-alt"),
    },
  ]

  const demandAggregator = [
    {
      title: "KyberSwap",
      description: t("page-dapps-dapp-description-kyberswap"),
      link: "https://kyberswap.com/",
      image: kyberswap,
      alt: t("page-dapps-kyberswap-logo-alt"),
    },
    {
      title: "Matcha",
      description: t("page-dapps-dapp-description-matcha"),
      link: "https://matcha.xyz",
      image: matcha,
      alt: t("page-dapps-matcha-logo-alt"),
    },
    {
      title: "1inch",
      description: t("page-dapps-dapp-description-1inch"),
      link: "https://1inch.exchange/",
      image: oneinch,
      alt: t("page-dapps-1inch-logo-alt"),
    },
  ]

  const derivatives = [
    {
      title: "Synthetix",
      description: t("page-dapps-dapp-description-synthetix"),
      link: "https://synthetix.io/",
      image: synthetix,
      alt: t("page-dapps-synthetix-logo-alt"),
    },
  ]

  const liquidStaking = [
    {
      title: "Lido",
      description: t("page-dapps-dapp-description-lido"),
      link: "https://lido.fi/",
      image: lido,
      alt: t("page-dapps-lido-logo-alt"),
    },
    {
      title: "Ankr",
      description: t("page-dapps-dapp-description-ankr"),
      link: "https://www.ankr.com/",
      image: ankr,
      alt: t("page-dapps-ankr-logo-alt"),
    },
  ]

  const bridges = [
    {
      title: "Rubic",
      description: t("page-dapps-dapp-description-rubic"),
      link: "https://rubic.exchange/",
      image: rubic,
      alt: t("page-dapps-rubic-logo-alt"),
    },
  ]

  const experiences = [
    {
      title: "POAP - Proof of Attendance Protocol",
      description: t("page-dapps-dapp-description-poap"),
      link: "https://poap.xyz",
      image: poap,
      alt: t("page-dapps-poap-logo-alt"),
    },
  ]

  const marketplaces = [
    {
      title: "OpenSea",
      description: t("page-dapps-dapp-description-opensea"),
      link: "https://opensea.io/",
      image: opensea,
      alt: t("page-dapps-opensea-logo-alt"),
    },
    {
      title: "Rarible",
      description: t("page-dapps-dapp-description-rarible"),
      link: "https://rarible.com/",
      image: rarible,
      alt: t("page-dapps-rarible-logo-alt"),
    },
    {
      title: "Art Blocks",
      description: t("page-dapps-dapp-description-artblocks"),
      link: "https://artblocks.io/",
      image: artblocks,
      alt: t("page-dapps-artblocks-logo-alt"),
    },
  ]

  const editorChoices = [
    {
      name: "Uniswap",
      description: t("page-dapps-editors-choice-uniswap"),
      url: "https://uniswap.exchange/swap",
      image: uniswap,
      alt: t("page-dapps-uniswap-logo-alt"),
      background: "#212f46",
      type: CategoryType.FINANCE,
      pillColor: "tagMint",
    },
    {
      name: "OpenSea",
      description: t("page-dapps-dapp-description-opensea"),
      url: "https://opensea.io/",
      image: opensea,
      alt: t("page-dapps-opensea-logo-alt"),
      background: "#181b21",
      type: CategoryType.COLLECTIBLES,
      pillColor: "tagBlue",
    },
    {
      name: "Gods Unchained",
      description: t("page-dapps-dapp-description-gods-unchained"),
      url: "https://godsunchained.com/",
      image: gods,
      alt: t("page-dapps-gods-unchained-logo-alt"),
      background: "#111c25",
      type: CategoryType.GAMING,
      pillColor: "tagOrange",
    },
    {
      name: "Ethereum Name Service",
      description: t("page-dapps-dapp-description-ens"),
      url: "https://ens.domains/",
      image: ens,
      alt: t("page-dapps-ens-logo-alt"),
      background: "#fff",
      type: CategoryType.SOCIAL,
      pillColor: "tagMint",
    },
  ]

  const heroContent = {
    title: t("common:decentralized-applications-dapps"),
    header: t("page-dapps-hero-header"),
    subtitle: t("page-dapps-hero-subtitle"),
    image: doge,
    alt: t("page-dapps-doge-img-alt"),
    buttons: [
      {
        content: t("page-dapps-explore-dapps-title"),
        href: "#beginner",
        matomo: {
          eventCategory: "dapp hero buttons",
          eventAction: "click",
          eventName: "explore dapps",
        },
      },
      {
        content: t("page-dapps-what-are-dapps"),
        href: "#what-are-dapps",
        variant: "outline" as const,
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
        title={t("common:decentralized-applications-dapps")}
        description={t("page-dapps-desc")}
        image="/images/doge-computer.png"
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <StyledH2>{t("common:get-started")}</StyledH2>
        <Text>
          <Translation id="page-dapps:page-dapps-get-started-subtitle" />
        </Text>
        <Row>
          <StepBoxContainer>
            <StepBox href="/get-eth/">
              <Box>
                <StyledH3>
                  {/* TODO: Use CSS counter for intl-friendly numbering  */}
                  1. {t("page-wallets-get-some")}
                </StyledH3>
                <Text>{t("page-dapps-get-some-eth-description")}</Text>
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
                {t("common:get-eth")}
              </ButtonSecondary>
            </StepBox>
            <StepBox href="/wallets/find-wallet/">
              <Box>
                <StyledH3>2. {t("page-dapps-set-up-a-wallet-title")}</StyledH3>
                <Text>{t("page-dapps-set-up-a-wallet-description")}</Text>
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
                {t("page-dapps-set-up-a-wallet-button")}
              </ButtonSecondary>
            </StepBox>
            <StepBox href="#explore">
              <Box>
                <StyledH3>3. {t("page-dapps-ready-title")}</StyledH3>
                <Text>{t("page-dapps-ready-description")}</Text>
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
                {t("page-dapps-ready-button")}
              </ButtonPrimary>
            </StepBox>
          </StepBoxContainer>
        </Row>
        <H3 id="beginner">
          {t("page-dapps-beginner-friendly-header")} <Emoji text=":+1:" />
        </H3>
        <Text>{t("page-dapps-beginner-friendly-description")}</Text>
        <StyledCardGrid>
          {editorChoices.map((choice, idx) => (
            <ProductCard
              key={idx}
              background={choice.background}
              description={choice.description}
              url={choice.url}
              alt={choice.alt}
              image={choice.image}
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
        <H2 id="explore">{t("page-dapps-explore-dapps-title")}</H2>
        <CenterText>{t("page-dapps-explore-dapps-description")}</CenterText>
        <H3>{t("page-dapps-choose-category")}</H3>
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
                <Emoji className="me-4 text-2xl" text={category.emoji} />
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
                  {t("page-dapps-finance-title")}{" "}
                  <Emoji className="ms-2 text-5xl" text=":money_with_wings:" />
                </StyledH2>
                <Subtitle>{t("page-dapps-finance-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>{t("page-dapps-warning-header")}</StyledH2>
                {t("page-dapps-warning-message")}
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
            <Box py={4} w="full">
              <Text m={0} fontWeight="bold">
                {t("page-dapps:page-dapps-explore-title")}
              </Text>
              <Text m={0}>
                <InlineLink href="https://www.ethereum-ecosystem.com/apps">
                  {t("page-dapps:page-dapps-explore")}
                </InlineLink>
              </Text>
            </Box>
            <CalloutBanner
              className="m-0 mx-0 mt-32 lg:mb-16"
              titleKey={"page-dapps:page-dapps-wallet-callout-title"}
              descriptionKey={
                "page-dapps:page-dapps-wallet-callout-description"
              }
              image={wallet}
              imageWidth={300}
              alt={t("page-dapps-wallet-callout-image-alt")}
            >
              <Box>
                <ButtonLink href="/wallets/find-wallet/">
                  {t("page-dapps-wallet-callout-button")}
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
                  {t("page-dapps-gaming-title")}{" "}
                  <Emoji className="ms-2 text-5xl" text=":video_game:" />
                </StyledH2>
                <Subtitle>{t("page-dapps-gaming-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>{t("page-dapps-warning-header")}</StyledH2>
                {t("page-dapps-warning-message")}
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
                  {t("page-dapps-technology-title")}{" "}
                  <Emoji className="ms-2 text-5xl" text=":keyboard:" />
                </StyledH2>
                <Subtitle>{t("page-dapps-technology-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>{t("page-dapps-warning-header")}</StyledH2>
                {t("page-dapps-warning-message")}
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
                  {t("page-dapps-collectibles-title")}{" "}
                  <Emoji
                    className="ms-2 text-5xl"
                    text=":frame_with_picture:"
                  />
                </StyledH2>
                <Subtitle>{t("page-dapps-collectibles-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <StyledH2>{t("page-dapps-warning-header")}</StyledH2>
                {t("page-dapps-warning-message")}
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
                  {t("page-dapps-metaverse-title")}{" "}
                  <Emoji
                    className="ms-2 text-5xl"
                    text=":globe_with_meridians:"
                  />
                </H2>
                <Subtitle>{t("page-dapps-metaverse-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <H2>{t("page-dapps-warning-header")}</H2>
                {t("page-dapps-warning-message")}
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
                  {t("page-dapps-social-title")}{" "}
                  <Emoji className="ms-2 text-5xl" text=":incoming_envelope:" />
                </H2>
                <Subtitle>{t("page-dapps-social-description")}</Subtitle>
              </Column>
              <StyledInfoBanner isWarning>
                <H2>{t("page-dapps-warning-header")}</H2>
                {t("page-dapps-warning-message")}
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
            <TwoColumnContent>
              <LeftColumn>
                <ProductList
                  category={t("page-dapps-category-community")}
                  content={community}
                />
              </LeftColumn>
              <RightColumn />
            </TwoColumnContent>
          </Content>
        )}
        {selectedCategory !== CategoryType.FINANCE && (
          <Content>
            <Text m={0} fontWeight="bold">
              {t("page-dapps:page-dapps-explore-title")}
            </Text>
            <Text m={0}>
              <InlineLink href="https://www.ethereum-ecosystem.com/apps">
                {t("page-dapps:page-dapps-explore")}
              </InlineLink>
            </Text>
          </Content>
        )}
        {/* General content for all categories */}
        <Content>
          <Divider />
          {categories[selectedCategory].benefits && (
            <Box mt={12}>
              <H2>
                {t("page-dapps-magic-title-1")}{" "}
                <Emoji className="text-[2rem]" text=":sparkles:" />{" "}
                {t("page-dapps-magic-title-2")}{" "}
                {categories[selectedCategory].benefitsTitle}
              </H2>
              <Text>{categories[selectedCategory].benefitsDescription}</Text>
              <CardContainer>
                {(categories[selectedCategory].benefits || []).map(
                  (art, idx) => (
                    <Card
                      className="text-center"
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
                  <ButtonLink variant="outline" href="/defi/">
                    {t("page-dapps-more-on-defi-button")}
                  </ButtonLink>
                </MoreButtonContainer>
              )}
              {selectedCategory === CategoryType.COLLECTIBLES && (
                <MoreButtonContainer>
                  <ButtonLink variant="outline" href="/nft/">
                    {t("page-dapps-more-on-nft-button")}
                  </ButtonLink>
                </MoreButtonContainer>
              )}
              {selectedCategory === CategoryType.GAMING && (
                <MoreButtonContainer>
                  <ButtonLink variant="outline" href="/nft/">
                    {t("page-dapps-more-on-nft-gaming-button")}
                  </ButtonLink>
                </MoreButtonContainer>
              )}
            </Box>
          )}
        </Content>
      </FullWidthContainer>
      <Content>
        <ImageContainer id="what-are-dapps">
          <GhostCard className="mt-2 flex items-center">
            <Image
              bgSize="cover"
              bgRepeat="no-repeat"
              alignSelf="center"
              width={300} // 300px denoted in graphql
              // w="full" // ?
              // minW="240px" // ?
              // maxW="300px" // ?
              my="8"
              mx={{ base: 0, sm: "8", md: "24" }}
              src={magicians}
              alt={t("page-dapps-magician-img-alt")}
            />
          </GhostCard>
        </ImageContainer>
        <Flex
          direction="column"
          align={{ base: "flex-start", sm: "center" }}
          mt={12}
        >
          <H2>{t("page-dapps-magic-behind-dapps-title")}</H2>
          <Text textAlign={{ base: "left", sm: "center" }} maxW="800px" mb={4}>
            {t("page-dapps-magic-behind-dapps-description")}
          </Text>
          <InlineLink href="/what-is-ethereum/">
            {t("page-dapps-magic-behind-dapps-link")}
          </InlineLink>
        </Flex>
        <BoxGrid items={features} />
        <Row>
          <LeftColumn>
            <H2>{t("page-dapps-how-dapps-work-title")}</H2>
            <Text>
              <Translation id="page-dapps:page-dapps-how-dapps-work-p1" />
            </Text>
            <Text>{t("page-dapps-how-dapps-work-p2")}</Text>
            <Text>{t("page-dapps-how-dapps-work-p3")}</Text>
            <DocLink href="/developers/docs/dapps/">
              {t("page-dapps-docklink-dapps")}
            </DocLink>
            <DocLink href="/developers/docs/smart-contracts/">
              {t("page-dapps-docklink-smart-contracts")}
            </DocLink>
          </LeftColumn>
          <RightColumn>
            <StyledCallout
              titleKey="page-dapps:page-dapps-learn-callout-title"
              descriptionKey="page-dapps:page-dapps-learn-callout-description"
              image={developers}
              alt={t("page-dapps-learn-callout-image-alt")}
            >
              <Box>
                <ButtonLink href="/developers/">
                  {t("page-dapps-learn-callout-button")}
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
