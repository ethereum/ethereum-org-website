import React, { useEffect, useState, useMemo } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Flex,
  Heading,
  Text,
  useToken,
  Img,
  Icon,
  Grid,
} from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import DataProductCard from "../components/DataProductCard"
import Emoji from "../components/Emoji"
import FeedbackCard from "../components/FeedbackCard"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import { Content, Divider, Page } from "../components/SharedStyledComponents"
import SimpleTable from "../components/SimpleTable"
import StablecoinAccordion from "../components/StablecoinAccordion"
import StablecoinBoxGrid from "../components/StablecoinBoxGrid"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"

import { getData } from "../utils/cache"
import { getImage } from "../utils/image"

const tooltipContent = (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
  </div>
)

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

interface State {
  markets: Array<Market>
  marketsHasError: boolean
}

const StablecoinsPage = ({ data }: PageProps<Queries.StablecoinsPageQuery>) => {
  const [state, setState] = useState<State>({
    markets: [],
    marketsHasError: false,
  })
  const { t } = useTranslation()

  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  // Stablecoin types
  const FIAT = t("page-stablecoins-stablecoins-table-type-fiat-backed")
  const CRYPTO = t("page-stablecoins-stablecoins-table-type-crypto-backed")
  const ASSET = t(
    "page-stablecoins-stablecoins-table-type-precious-metals-backed"
  )
  const ALGORITHMIC = t("page-stablecoins-algorithmic")

  const stablecoins = useMemo(
    () => ({
      USDT: { type: FIAT, url: "https://tether.to/" },
      USDC: { type: FIAT, url: "https://www.coinbase.com/usdc" },
      DAI: { type: CRYPTO, url: "https://kb.oasis.app/help/what-is-dai" },
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
    }),
    [ALGORITHMIC, ASSET, CRYPTO, FIAT]
  )

  useEffect(() => {
    ;(async () => {
      try {
        // Fetch token data in the Ethereum ecosystem
        const ethereumData = await getData<EthereumDataResponse>(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        // Fetch token data for stablecoins
        const stablecoinData = await getData<StablecoinDataResponse>(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )

        // Get the intersection of stablecoins and Ethereum tokens to only have a list of data for stablecoins in the Ethereum ecosystem
        const ethereumStablecoinData = stablecoinData.filter(
          (stablecoin) =>
            ethereumData.findIndex(
              // eslint-disable-next-line eqeqeq
              (etherToken) => stablecoin.id == etherToken.id
            ) > -1
        )

        // Filter stablecoins that aren't in stablecoins useMemo above, and then map the type of stablecoin and url for the filtered stablecoins
        const markets = ethereumStablecoinData
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
        setState({
          markets: markets,
          marketsHasError: false,
        })
      } catch (error) {
        console.error(error)
        setState({
          markets: [],
          marketsHasError: true,
        })
      }
    })()
  }, [stablecoins])

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
      description: t("page-stablecoins-stablecoins-feature-1"),
    },
    {
      emoji: ":chart_with_upwards_trend:",
      description: t("page-stablecoins-stablecoins-feature-2"),
    },
    {
      emoji: ":handshake:",
      description: t("page-stablecoins-stablecoins-feature-3"),
    },
    {
      emoji: ":key:",
      description: t("page-stablecoins-stablecoins-feature-4"),
    },
  ]

  const dapps = [
    {
      background: "linear-gradient(225deg, #aa589b 0%, #5cb8c4 100%)",
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: getImage(data.aave),
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
    },
    {
      background: "#f9fafb",
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: getImage(data.compound),
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
    },
    {
      background: "linear-gradient(135deg, #c7efe6 0%, #eeeac7 100%)",
      url: "https://oasis.app",
      alt: t("oasis-logo"),
      image: getImage(data.oasis),
      name: "Oasis",
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
    image: getImage(data.stablecoins)!,
    alt: t("page-stablecoins-hero-alt"),
    buttons: [
      {
        content: t("page-stablecoins-hero-button"),
        toId: "explore",
      },
      {
        content: t("page-stablecoins-how-they-work-button"),
        toId: "how",
        variant: "outline",
      },
    ],
  }

  const toolsData = [
    {
      title: "Stablecoins.wtf",
      description: t("page-stablecoins-tools-stablecoinswtf-description"),
      link: "https://stablecoins.wtf",
      image: getImage(data.stablecoinswtf),
      alt: "Stablecoins.wtf",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-stablecoins-title")}
        description={t("page-stablecoins-meta-description")}
      />
      <PageHero isReverse content={heroContent} />
      <Divider />
      <Content>
        <Flex
          align="flex-start"
          width="full"
          mr={8}
          mb={8}
          direction={{ base: "column", lg: "row" }}
        >
          <Box mr={8} w="full" margin={{ base: "auto 0rem", lg: "" }}>
            <Heading as="h2" mt={0}>
              <Translation id="page-stablecoins-why-stablecoins" />
            </Heading>
            <p>
              <Translation id="page-stablecoins-prices-definition" />{" "}
              <Link to="#how">
                <Translation id="page-stablecoins-prices-definition-how" />
              </Link>
            </p>
          </Box>
        </Flex>
        <Flex
          align="flex-start"
          width="full"
          mr={8}
          mb={8}
          direction={{ base: "column", lg: "row" }}
        >
          <Box mr={8} w="full" margin={{ base: "auto 0rem", lg: "" }}>
            {tokens.map((token, idx) => (
              <Box minWidth="full" my={2} borderRadius={0}>
                <HorizontalCard
                  key={idx}
                  emoji={token.emoji}
                  description={token.description}
                  emojiSize={3}
                />
              </Box>
            ))}
          </Box>
          <Box maxW="640px" mr={8} mt={{ base: 16, lg: 0 }}>
            <GhostCard>
              <Emoji text=":pizza:" fontSize="5xl" />
              <h3>
                <Translation id="page-stablecoins-bitcoin-pizza" />
              </h3>
              <p>
                <Translation id="page-stablecoins-bitcoin-pizza-body" />{" "}
              </p>
            </GhostCard>
          </Box>
        </Flex>
      </Content>
      <Box
        w="full"
        py={16}
        mt={8}
        mb={8}
        background="cardGradient"
        shadow="tableItemBoxShadow"
      >
        <Box mb={-8} py={4} px={8} w="full">
          <Heading as="h2" mt={0}>
            <Translation id="page-stablecoins-find-stablecoin" />
          </Heading>
          <Box
            display="flex"
            w="full"
            width={{ base: "full", lg: "50%" }}
            justifyContent="center"
            flexDirection="column"
            mr={8}
            margin={{ base: "auto 0rem", lg: "" }} // TODO: fix this
          >
            <p>
              <Translation id="page-stablecoins-find-stablecoin-intro" />
            </p>
            <ul>
              <li>
                <Link to="#how">
                  <Translation id="page-stablecoins-find-stablecoin-types-link" />
                </Link>
              </li>
              <li>
                <Link to="#explore">
                  <Translation id="page-stablecoins-find-stablecoin-how-to-get-them" />
                </Link>
              </li>
            </ul>
          </Box>
          <Heading
            as="h3"
            fontSize="1.25rem"
            fontWeight="700"
            textAlign="left"
            mt={0}
            mb={4}
          >
            <Translation id="page-stablecoins-editors-choice" />
          </Heading>
          <p>
            <Translation id="page-stablecoins-editors-choice-intro" />
          </p>
          <Flex width="full" flexDirection={{ base: "column", lg: "row" }}>
            <Box
              border="1.5px solid"
              borderColor="text"
              boxShadow="gridYellowBoxShadow"
              borderRadius="sm"
              background="background"
              justifyContent="space-between"
              display="flex"
              width="full"
              mr={{ base: 0, lg: 8 }}
              mb={8}
              color="text"
              flexDirection={{ base: "column-reverse", lg: "row" }}
              px={{ base: 8, lg: 24 }}
              py={{ base: 8, lg: 4 }}
            >
              <Box
                display="flex"
                w="full"
                width={{ base: "full", lg: "50%" }}
                justifyContent="center"
                flexDirection="column"
                mr={8}
                margin={{ base: "auto 0rem", lg: "" }} // TODO: fix this
              >
                <Box>
                  <Heading
                    as="h2"
                    fontSize="2rem"
                    fontWeight="700"
                    mt={0}
                    mb={2}
                  >
                    <Translation id="page-stablecoins-dai-banner-title" />
                  </Heading>
                  <Text
                    as="p"
                    fontSize="1.25rem"
                    lineHeight="140%"
                    color="text200"
                  >
                    <Translation id="page-stablecoins-dai-banner-body" />
                  </Text>
                  <Flex direction="column">
                    <Box>
                      <ButtonLink mb={4} mr={4} to="https://1inch.exchange">
                        <Translation id="page-stablecoins-dai-banner-swap-button" />
                      </ButtonLink>
                    </Box>
                    <Box>
                      <ButtonLink
                        variant="outline"
                        to="https://kb.oasis.app/help/what-is-dai"
                      >
                        <Translation id="page-stablecoins-dai-banner-learn-button" />
                      </ButtonLink>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Img
                as={GatsbyImage}
                image={getImage(data.dailarge)!}
                alt={t("page-stablecoins-dai-logo")}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                alignSelf="center"
                width="full"
                flex="1"
                maxWidth={{ base: "96px", sm: "160px", md: "240px" }}
                minWidth={{ base: "96px", sm: "160px" }}
                mx={{ base: 0, lg: 8 }}
                mb={{ base: 8, lg: 8 }}
                mt={0}
              />
            </Box>

            <Box
              border="1.5px solid"
              borderColor="text"
              boxShadow="gridBlueBowShadow"
              borderRadius="sm"
              background="background"
              justifyContent="space-between"
              display="flex"
              width="full"
              p={8}
              ml={{ base: 0, lg: 8 }}
              mb={8}
              color="text"
              flexDirection={{ base: "column-reverse", lg: "row" }}
            >
              <Box
                display="flex"
                w="full"
                width={{ base: "full", lg: "50%" }}
                justifyContent="center"
                flexDirection="column"
                mr={8}
                margin={{ base: "auto 0rem", lg: "" }} // TODO: fix this
              >
                <div>
                  <Heading
                    as="h2"
                    fontSize="2rem"
                    fontWeight="700"
                    mt={0}
                    mb={2}
                  >
                    <Translation id="page-stablecoins-usdc-banner-title" />
                  </Heading>
                  <Text
                    as="p"
                    fontSize="1.25rem"
                    lineHeight="140%"
                    color="text200"
                  >
                    <Translation id="page-stablecoins-usdc-banner-body" />
                  </Text>
                  <Flex direction="column">
                    <div>
                      <ButtonLink
                        mb={4}
                        mr={4}
                        to="https://matcha.xyz/markets/ETH/USDC"
                      >
                        <Translation id="page-stablecoins-usdc-banner-swap-button" />
                      </ButtonLink>
                    </div>
                    <div>
                      <ButtonLink
                        variant="outline"
                        to="https://www.coinbase.com/usdc"
                      >
                        <Translation id="page-stablecoins-usdc-banner-learn-button" />
                      </ButtonLink>
                    </div>
                  </Flex>
                </div>
              </Box>
              <Img
                as={GatsbyImage}
                image={getImage(data.usdclarge)!}
                alt={t("page-stablecoins-usdc-logo")}
                backgroundSize="cover"
                backgroundRepeat="repeat"
                alignSelf="center"
                width="full"
                flex="1"
                maxWidth={{ base: "96px", sm: "160px", md: "240px" }}
                minWidth={{ base: "96px", sm: "160px" }}
                mx={{ base: 0, lg: 8 }}
                mb={{ base: 8, lg: 8 }}
                mt={0}
              />
            </Box>
          </Flex>
          <h3>
            <Translation id="page-stablecoins-top-coins" />
            <Tooltip content={tooltipContent}>
              <Icon ml={2} fill="'text" name="info" fontSize="14px" />
            </Tooltip>
          </h3>
          <p>
            <Translation id="page-stablecoins-top-coins-intro" />{" "}
            <Translation id="page-stablecoins-top-coins-intro-code" />
          </p>
        </Box>
        <Box px={8} py={4} width="full" overflowX="scroll">
          <SimpleTable
            columns={tableColumns}
            content={state.markets}
            hasError={state.marketsHasError}
          />
        </Box>
      </Box>
      <Content id="explore">
        <h2>
          <Translation id="page-stablecoins-get-stablecoins" />
        </h2>
      </Content>
      <Flex
        alignItems="center"
        w="full"
        m={{ base: "0rem", lg: "0 auto" }}
        pl={{ base: "0rem", lg: "2rem" }}
        pr={{ base: "0rem", lg: "2rem" }}
        pb={16}
        mt={-8}
      >
        <StablecoinAccordion />
      </Flex>
      <Divider />
      <Content>
        <CalloutBanner
          mt={8}
          mb={16}
          mx={0}
          titleKey={"page-stablecoins-stablecoins-dapp-callout-title"}
          descriptionKey={
            "page-stablecoins-stablecoins-dapp-callout-description"
          }
          image={getImage(data.doge)!}
          maxImageWidth={600}
          alt={t("page-stablecoins-stablecoins-dapp-callout-image-alt")}
        >
          <Flex flexFlow="wrap" gap="1em">
            <ButtonLink to="/dapps/">
              <Translation id="page-stablecoins-explore-dapps" />
            </ButtonLink>
            <Box whiteSpace="break-spaces">
              <ButtonLink variant="outline" to="/defi/">
                <Translation id="page-stablecoins-more-defi-button" />
              </ButtonLink>
            </Box>
          </Flex>
        </CalloutBanner>
        <h2>
          <Translation id="page-stablecoins-save-stablecoins" />
        </h2>
        <Flex
          alignItems="flex-start"
          width="full"
          mr={8}
          mb={8}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box mr={8} w="full" margin={{ base: "auto 0rem", lg: "" }}>
            {" "}
            // TODO: fix this
            <p>
              <Translation id="page-stablecoins-save-stablecoins-body" />
            </p>
            <h3>
              <Translation id="page-stablecoins-interest-earning-dapps" />
            </h3>
            <p>
              <Translation id="page-stablecoins-saving" />
            </p>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius="sm"
            p={8}
            w="full"
            border="1.5px solid"
            boxShadow="cardBoxShadow"
            borderColor="text"
            margin={{ base: "auto 0rem", lg: "" }} // TODO: fix this
          >
            <div>
              <Emoji mb={4} text=":bank:" fontSize="5rem" />
              <Text as="p" fontSize="64px" lineHeight="100%">
                <Translation id="page-stablecoins-bank-apy" />
              </Text>
              <em>
                <Translation id="page-stablecoins-bank-apy-source" />{" "}
                <Link to="https://www.nytimes.com/2020/09/18/your-money/savings-interest-rates.html">
                  <Translation id="page-stablecoins-bank-apy-source-link" />
                </Link>
              </em>
            </div>
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
              name={dapp.name}
              description={dapp.description}
            />
          ))}
        </Grid>
        <InfoBanner isWarning shouldCenter>
          <Heading
            as="h3"
            fontSize="1.25rem"
            fontWeight="700"
            textAlign="left"
            mt={0}
            mb={4}
          >
            <Translation id="page-stablecoins-research-warning-title" />
          </Heading>
          <Translation id="page-stablecoins-research-warning" />
        </InfoBanner>
      </Content>
      <Divider />
      <Content id="how">
        <Heading as="h2" mt={0}>
          <Translation id="page-stablecoins-types-of-stablecoin" />
        </Heading>
        <StablecoinBoxGrid items={features} />
      </Content>
      <Box id="tools" py={12} px={8} w="full">
        <h2>
          <Translation id="page-stablecoins-tools-title" />
        </h2>
        <Flex
          alignItems="flex-start"
          width="full"
          mr={8}
          mb={8}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Box
            display="flex"
            w="full"
            width={{ base: "full", lg: "50%" }}
            justifyContent="center"
            flexDirection="column"
            mr={8}
            margin={{ base: "auto 0rem", lg: "" }} // TODO: fix this
          >
            <ProductList
              category="Dashboards & Education"
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

export const query = graphql`
  query StablecoinsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-stablecoins", "common"] }
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
    stablecoins: file(relativePath: { eq: "stablecoins/hero.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dai: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dailarge: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    usdclarge: file(relativePath: { eq: "stablecoins/usdc-large.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    compound: file(relativePath: { eq: "stablecoins/compound.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 160
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    aave: file(relativePath: { eq: "stablecoins/aave.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 64
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    oasis: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 80
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    oasissmall: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 24
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    stablecoinswtf: file(
      relativePath: { eq: "stablecoins/tools/stablecoinswtf.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
