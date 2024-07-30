import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Grid,
  HeadingProps,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import DataProductCard from "@/components/DataProductCard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import ProductList from "@/components/ProductList"
import StablecoinAccordion from "@/components/StablecoinAccordion"
import StablecoinBoxGrid from "@/components/StablecoinBoxGrid"
import StablecoinsTable from "@/components/StablecoinsTable"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import {
  fetchEthereumEcosystemData,
  fetchEthereumStablecoinsData,
} from "@/lib/api/stablecoinsData"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
// -- daps
import aaveImg from "@/public/images/stablecoins/aave.png"
import compoundImg from "@/public/images/stablecoins/compound.png"
// Static assets
import daiLargeImg from "@/public/images/stablecoins/dai-large.png"
import heroImg from "@/public/images/stablecoins/hero.png"
import stablecoinsWtfImg from "@/public/images/stablecoins/tools/stablecoinswtf.png"
import usdcLargeImg from "@/public/images/stablecoins/usdc-large.png"

type EthereumDataResponse = Array<{
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}>

type StablecoinDataResponse = Array<{
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}>

interface Market {
  name: string
  marketCap: string
  image: string
  type: string
  url: string
}

type Props = BasePageProps & {
  markets: Market[]
  marketsHasError: boolean
}

// Fetch external API data once to avoid hitting rate limit
const ethereumEcosystemDataFetch = runOnlyOnce(fetchEthereumEcosystemData)
const ethereumStablecoinsDataFetch = runOnlyOnce(fetchEthereumStablecoinsData)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/stablecoins")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  let marketsHasError = false
  let markets: Market[] = []

  // Stablecoin types
  const FIAT = "FIAT"
  const CRYPTO = "CRYPTO"
  const ASSET = "ASSET"
  const ALGORITHMIC = "ALGORITHMIC"

  const stablecoins = {
    USDT: { type: FIAT, url: "https://tether.to/" },
    USDC: { type: FIAT, url: "https://www.coinbase.com/usdc" },
    DAI: { type: CRYPTO, url: "https://makerdao.com/en/" },
    BUSD: { type: FIAT, url: "https://www.binance.com/en/busd" },
    PAX: { type: FIAT, url: "https://www.paxos.com/pax/" },
    TUSD: { type: FIAT, url: "https://www.trusttoken.com/trueusd" },
    HUSD: { type: FIAT, url: "https://www.huobi.com/en-us/usd-deposit/" },
    SUSD: { type: CRYPTO, url: "https://www.synthetix.io/" },
    EURS: { type: FIAT, url: "https://eurs.stasis.net/" },
    USDK: { type: FIAT, url: "https://www.oklink.com/usdk" },
    MUSD: { type: CRYPTO, url: "https://mstable.org/" },
    USDX: { type: CRYPTO, url: "https://usdx.cash/usdx-stablecoin" },
    GUSD: { type: FIAT, url: "https://gemini.com/dollar" },
    SAI: { type: CRYPTO, url: "https://makerdao.com/en/whitepaper/sai/" },
    DUSD: { type: CRYPTO, url: "https://dusd.finance/" },
    PAXG: { type: ASSET, url: "https://www.paxos.com/paxgold/" },
    AMPL: { type: ALGORITHMIC, url: "https://www.ampleforth.org/" },
    FRAX: { type: ALGORITHMIC, url: "https://frax.finance/" },
    MIM: { type: ALGORITHMIC, url: "https://abracadabra.money/" },
    USDP: { type: FIAT, url: "https://paxos.com/usdp/" },
    FEI: { type: ALGORITHMIC, url: "https://fei.money/" },
  }

  try {
    // Fetch token data in the Ethereum ecosystem
    const ethereumEcosystemData: EthereumDataResponse =
      await ethereumEcosystemDataFetch()
    // Fetch token data for stablecoins
    const stablecoinsData: StablecoinDataResponse =
      await ethereumStablecoinsDataFetch()

    // Get the intersection of stablecoins and Ethereum tokens to only have a list of data for stablecoins in the Ethereum ecosystem
    const ethereumStablecoinData = stablecoinsData.filter(
      (stablecoin) =>
        ethereumEcosystemData.findIndex(
          // eslint-disable-next-line
          (etherToken) => stablecoin.id == etherToken.id
        ) > -1
    )

    marketsHasError = false
    markets = ethereumStablecoinData
      .filter((token) => {
        return stablecoins[token.symbol.toUpperCase()]
      })
      .map((token) => {
        return {
          name: token.name,
          marketCap: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(token.market_cap),
          image: token.image,
          type: stablecoins[token.symbol.toUpperCase()].type,
          url: stablecoins[token.symbol.toUpperCase()].url,
        }
      })
  } catch (error) {
    console.error(error)
    markets = []
    marketsHasError = true
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      markets,
      marketsHasError,
    },
    // Updated once a week
    revalidate: BASE_TIME_UNIT * 24 * 7,
  }
}) satisfies GetStaticProps<Props>

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const Divider = () => <Box my={16} w="10%" h={1} bg="homeDivider" />

const EditorsChoice = (props: FlexProps) => (
  <Flex
    flexDirection={{ base: "column-reverse", lg: "row" }}
    justifyContent="space-between"
    width="full"
    border="1.5px solid"
    borderColor="text"
    borderRadius="sm"
    background="background.base"
    color="text"
    p={8}
    mb={8}
    {...props}
  />
)

const Page = (props: FlexProps) => (
  <Flex
    width="full"
    direction="column"
    align="center"
    my={0}
    mx="auto"
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
)

const StablecoinsPage = ({ markets, marketsHasError }) => {
  const { t } = useTranslation("page-stablecoins")

  const tooltipContent = (
    <Box>
      {t("common:data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </Box>
  )

  const features = [
    {
      title: t("page-stablecoins-fiat-backed"),
      description: t("page-stablecoins-fiat-backed-description"),
      emoji: ":dollar:",
      pros: [
        t("page-stablecoins-fiat-backed-pro-1"),
        t("page-stablecoins-fiat-backed-pro-2"),
      ],
      cons: [
        t("page-stablecoins-fiat-backed-con-1"),
        t("page-stablecoins-fiat-backed-con-2"),
      ],
      links: [
        { text: "USDC", url: "https://www.coinbase.com/usdc" },
        { text: "TrueUSD", url: "https://www.trusttoken.com/trueusd" },
      ],
    },
    {
      title: t("page-stablecoins-crypto-backed"),
      description: t("page-stablecoins-crypto-backed-description"),
      emoji: ":unicorn:",
      pros: [
        t("page-stablecoins-crypto-backed-pro-1"),
        t("page-stablecoins-crypto-backed-pro-2"),
        t("page-stablecoins-crypto-backed-pro-3"),
      ],
      cons: [
        t("page-stablecoins-crypto-backed-con-1"),
        t("page-stablecoins-crypto-backed-con-2"),
      ],
      links: [{ text: "Dai", url: "https://makerdao.com/en/" }],
    },
    {
      title: t("page-stablecoins-precious-metals"),
      description: t("page-stablecoins-precious-metals-description"),
      emoji: ":gem_stone:",
      pros: [t("page-stablecoins-precious-metals-pro-1")],
      cons: [
        t("page-stablecoins-precious-metals-con-1"),
        t("page-stablecoins-precious-metals-con-2"),
      ],
      links: [{ text: "Pax Gold", url: "https://paxos.com/paxgold/" }],
    },
    {
      title: t("page-stablecoins-algorithmic"),
      description: t("page-stablecoins-algorithmic-description"),
      disclaimer: t("page-stablecoins-algorithmic-disclaimer"),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        t("page-stablecoins-algorithmic-pro-1"),
        t("page-stablecoins-algorithmic-pro-2"),
      ],
      cons: [
        t("page-stablecoins-algorithmic-con-1"),
        t("page-stablecoins-algorithmic-con-2"),
      ],
      links: [{ text: "Ampleforth", url: "https://www.ampleforth.org/" }],
    },
  ]

  const tokens = [
    {
      emoji: ":globe_showing_americas:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-1" />
      ),
    },
    {
      emoji: ":chart_with_upwards_trend:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-2" />
      ),
    },
    {
      emoji: ":handshake:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-3" />
      ),
    },
    {
      emoji: ":key:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-4" />
      ),
    },
  ]

  const dapps = [
    {
      background: "linear-gradient(225deg, #aa589b 0%, #5cb8c4 100%)",
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: aaveImg,
      width: "64px",
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
    },
    {
      background: "#f9fafb",
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: compoundImg,
      width: "160px",
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
    },
    {
      background: "linear-gradient(135deg, #c7efe6 0%, #eeeac7 100%)",
      url: "https://summer.fi/",
      alt: t("summerfi-logo"),
      image: summerfiImg,
      width: "80px",
      name: "Summer.fi",
      description: t("page-stablecoins-stablecoins-dapp-description-4"),
    },
  ]

  const tableColumns = [
    t("page-stablecoins-stablecoins-table-header-column-1"),
    t("page-stablecoins-stablecoins-table-header-column-2"),
    t("page-stablecoins-stablecoins-table-header-column-3"),
  ]

  const heroContent = {
    title: t("page-stablecoins-title"),
    header: t("page-stablecoins-hero-header"),
    subtitle: t("page-stablecoins-hero-subtitle"),
    image: heroImg,
    alt: t("page-stablecoins-hero-alt"),
    buttons: [
      {
        content: t("page-stablecoins-hero-button"),
        toId: "explore",
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "get stablecoins",
        },
      },
      {
        content: t("page-stablecoins-how-they-work-button"),
        toId: "how",
        variant: "outline",
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "how they work",
        },
      },
    ],
  }

  const toolsData = [
    {
      title: "Stablecoins.wtf",
      description: t("page-stablecoins-tools-stablecoinswtf-description"),
      link: "https://stablecoins.wtf",
      image: stablecoinsWtfImg,
      alt: "Stablecoins.wtf",
    },
  ]

  return (
    <Page as={MainArticle}>
      <PageMetadata
        title={t("page-stablecoins-title")}
        description={t("page-stablecoins-meta-description")}
        image="/images/stablecoins/hero.png"
      />
      <PageHero isReverse content={heroContent} />
      <Divider />
      <Content>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
          me={8}
          mb={8}
        >
          <Box
            w="full"
            ms={{ base: "auto", lg: 0 }}
            me={{ base: "auto", lg: 2 }}
          >
            <H2 mt={0}>{t("page-stablecoins-why-stablecoins")}</H2>
            <Text>
              {t("page-stablecoins-prices-definition")}{" "}
              <InlineLink href="#how">
                {t("page-stablecoins-prices-definition-how")}
              </InlineLink>
            </Text>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
          me={{ base: 0, lg: 8 }}
          mb={8}
        >
          <Box w="full" margin={{ base: "auto 0", lg: "0 2rem 0" }}>
            {tokens.map((token, index) => (
              <Box key={index} minWidth="full" my={2}>
                <HorizontalCard
                  emoji={token.emoji}
                  description={token.description}
                  emojiSize={3}
                />
              </Box>
            ))}
          </Box>
          <GhostCard
            maxW="640px"
            me={{ base: 0, lg: 8 }}
            mt={{ base: 16, lg: 2 }}
          >
            <Emoji text=":pizza:" fontSize="5xl" />
            <H3>{t("page-stablecoins-bitcoin-pizza")}</H3>
            <Text>{t("page-stablecoins-bitcoin-pizza-body")} </Text>
          </GhostCard>
        </Flex>
      </Content>
      <Box
        w="full"
        py={16}
        mt={8}
        mb={8}
        background="cardGradient"
        boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
      >
        <Box mb={-8} py={4} px={8} w="full">
          <H2 mt={0}>{t("page-stablecoins-find-stablecoin")}</H2>
          <Box
            display="flex"
            w="full"
            width={{ base: "full", lg: "50%" }}
            justifyContent="center"
            flexDirection="column"
            ms={{ base: "auto", lg: 0 }}
            me={{ base: "auto", lg: 2 }}
          >
            <Text>{t("page-stablecoins-find-stablecoin-intro")}</Text>
            <ul>
              <li>
                <InlineLink href="#how">
                  {t("page-stablecoins-find-stablecoin-types-link")}
                </InlineLink>
              </li>
              <li>
                <InlineLink href="#explore">
                  {t("page-stablecoins-find-stablecoin-how-to-get-them")}
                </InlineLink>
              </li>
            </ul>
          </Box>
          <H3 mt={0} mb={4}>
            {t("page-stablecoins-editors-choice")}
          </H3>
          <Text>{t("page-stablecoins-editors-choice-intro")}</Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            <EditorsChoice boxShadow="gridYellowBoxShadow">
              <Box
                display="flex"
                w="full"
                width={{ base: "full", lg: "50%" }}
                justifyContent="center"
                flexDirection="column"
                ms={{ base: "auto", lg: 0 }}
                me={{ base: "auto", lg: 8 }}
              >
                <Box>
                  <H2 fontSize="2rem" mt={0} mb={2}>
                    {t("page-stablecoins-dai-banner-title")}
                  </H2>
                  <Text fontSize="xl" lineHeight={1.4} color="text200">
                    {t("page-stablecoins-dai-banner-body")}
                  </Text>
                  <Flex direction="column">
                    <Box>
                      <ButtonLink
                        mb={4}
                        me={4}
                        href="https://matcha.xyz/tokens/ethereum/0x6b175474e89094c44da98b954eedeac495271d0f?sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                      >
                        {t("page-stablecoins-dai-banner-swap-button")}
                      </ButtonLink>
                    </Box>
                    <Box>
                      <ButtonLink
                        variant="outline"
                        href="https://www.coinbase.com/price/dai#WhatIsDaiDAI"
                        isSecondary
                      >
                        {t("page-stablecoins-dai-banner-learn-button")}
                      </ButtonLink>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Image
                src={daiLargeImg}
                alt={t("page-stablecoins-dai-logo")}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                alignSelf="center"
                flex="1"
                maxWidth={{ base: "96px", sm: "160px", md: "240px" }}
                minWidth={{ base: "96px", sm: "160px" }}
                my={{ base: 8, md: 0 }}
              />
            </EditorsChoice>

            <EditorsChoice boxShadow="gridBlueBowShadow">
              <Box
                display="flex"
                w="full"
                width={{ base: "full", lg: "50%" }}
                justifyContent="center"
                flexDirection="column"
                ms={{ base: "auto", lg: 0 }}
                me={{ base: "auto", lg: 8 }}
              >
                <H2 fontSize="2rem" mt={0} mb={2}>
                  {t("page-stablecoins-usdc-banner-title")}
                </H2>
                <Text fontSize="xl" lineHeight={1.4} color="text200">
                  {t("page-stablecoins-usdc-banner-body")}
                </Text>
                <Flex direction="column">
                  <Box>
                    <ButtonLink
                      mb={4}
                      me={4}
                      href="https://matcha.xyz/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                    >
                      {t("page-stablecoins-usdc-banner-swap-button")}
                    </ButtonLink>
                  </Box>
                  <Box>
                    <ButtonLink
                      variant="outline"
                      href="https://www.coinbase.com/usdc"
                      isSecondary
                    >
                      {t("page-stablecoins-usdc-banner-learn-button")}
                    </ButtonLink>
                  </Box>
                </Flex>
              </Box>
              <Image
                src={usdcLargeImg}
                alt={t("page-stablecoins-usdc-logo")}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                alignSelf="center"
                flex="1"
                maxWidth={{ base: "96px", sm: "160px", md: "240px" }}
                minWidth={{ base: "96px", sm: "160px" }}
                mb={{ base: 8, md: 0 }}
              />
            </EditorsChoice>
          </SimpleGrid>
          <H3>
            {t("page-stablecoins-top-coins")}
            <Tooltip content={tooltipContent}>
              <Icon ms={2} fill="'text" name="info" boxSize={4} />
            </Tooltip>
          </H3>
          <InfoBanner emoji="⚠️" isWarning mb="4">
            {t("page-stablecoins-algorithmic-disclaimer")}
          </InfoBanner>
          <Text>
            {t("page-stablecoins-top-coins-intro")}{" "}
            {t("page-stablecoins-top-coins-intro-code")}
          </Text>
        </Box>
        <Box px={8} py={4} width="full" overflowX="auto">
          <StablecoinsTable
            columns={tableColumns}
            content={markets}
            hasError={marketsHasError}
          />
        </Box>
      </Box>
      <Content id="explore">
        <H2>{t("page-stablecoins-get-stablecoins")}</H2>
      </Content>
      <Flex
        alignItems="center"
        w="full"
        ps={{ base: "0rem", lg: "2rem" }}
        pe={{ base: "0rem", lg: "2rem" }}
        pb={16}
      >
        <StablecoinAccordion />
      </Flex>
      <Divider />
      <Content>
        <CalloutBanner
          mt={8}
          mb={16}
          mx={0}
          titleKey={t("page-stablecoins-stablecoins-dapp-callout-title")}
          descriptionKey={t(
            "page-stablecoins-stablecoins-dapp-callout-description"
          )}
          image={dogeComputerImg}
          imageWidth={600}
          alt={t("page-stablecoins-stablecoins-dapp-callout-image-alt")}
        >
          <Flex flexFlow="wrap" gap="1em">
            <ButtonLink href="/dapps/">
              {t("page-stablecoins-explore-dapps")}
            </ButtonLink>
            <ButtonLink
              variant="outline"
              href="/defi/"
              whiteSpace="normal"
              isSecondary
            >
              {t("page-stablecoins-more-defi-button")}
            </ButtonLink>
          </Flex>
        </CalloutBanner>
        <H2>{t("page-stablecoins-save-stablecoins")}</H2>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="full"
          me={8}
          mb={8}
        >
          <Box
            w="full"
            ms={{ base: "auto", lg: 0 }}
            me={{ base: "auto", lg: 2 }}
          >
            <Text>{t("page-stablecoins-save-stablecoins-body")}</Text>
            <H3>{t("page-stablecoins-interest-earning-dapps")}</H3>
            <Text>{t("page-stablecoins-saving")}</Text>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius="sm"
            w="full"
            border="1.5px solid"
            boxShadow="cardBoxShadow"
            borderColor="text"
            p={8}
            mx={{ base: "auto", lg: 0 }}
          >
            <Emoji mb={4} text=":bank:" fontSize="5rem" />
            <Text as="p" fontSize="64px" lineHeight="100%">
              {t("page-stablecoins-bank-apy")}
            </Text>
            <Text as="em">
              {t("page-stablecoins-bank-apy-source")}{" "}
              <InlineLink href="https://www.nytimes.com/2020/09/18/your-money/savings-interest-rates.html">
                {t("page-stablecoins-bank-apy-source-link")}
              </InlineLink>
            </Text>
          </Box>
        </Flex>
        <Grid
          templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
          gap={8}
          mb={16}
        >
          {dapps.map((dapp, idx) => (
            <DataProductCard
              key={idx}
              background={dapp.background}
              url={dapp.url}
              alt={dapp.alt}
              image={dapp.image!}
              imgWidth={dapp.width!}
              name={dapp.name}
              description={dapp.description}
            />
          ))}
        </Grid>
      </Content>
      <Divider />
      <Content id="how">
        <H2 mt={0}>{t("page-stablecoins-types-of-stablecoin")}</H2>
        <InfoBanner emoji="⚠️" isWarning>
          <H3 mt={0} mb={4}>
            {t("page-stablecoins-research-warning-title")}
          </H3>
          {t("page-stablecoins-algorithmic-disclaimer")}
        </InfoBanner>
        <StablecoinBoxGrid items={features} />
      </Content>
      <Box id="tools" py={12} px={8} w="full">
        <H2>{t("page-stablecoins-tools-title")}</H2>

        <Flex
          alignItems="flex-start"
          width="full"
          me={8}
          mb={8}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            display="flex"
            w="full"
            width={{ base: "full", lg: "50%" }}
            justifyContent="center"
            flexDirection="column"
            ms={{ base: "auto", lg: 0 }}
            me={{ base: "auto", lg: 2 }}
          >
            <ProductList
              actionLabel={t("page-stablecoins:page-dapps-ready-button")}
              category={t("page-stablecoins-category-dashboard-and-education")}
              content={toolsData}
            />
          </Box>
        </Flex>
      </Box>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default StablecoinsPage
