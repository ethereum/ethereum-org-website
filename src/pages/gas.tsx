import React, { useEffect, useState, useMemo } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Flex,
  Heading,
  Text,
  Img,
  Icon,
  Grid,
  BoxProps,
  FlexProps,
  HeadingProps,
  SimpleGrid,
  Td,
  Th,
  Tr,
  Tbody,
  Thead,
  Table,
} from "@chakra-ui/react"
import { ListItem, UnorderedList } from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import DataProductCard from "../components/DataProductCard"
import Emoji from "../components/Emoji"
import FeedbackCard from "../components/FeedbackCard"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import InfoBanner from "../components/InfoBanner"
import InlineLink from "../components/Link"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import SimpleTable from "../components/SimpleTable"
import StablecoinAccordion from "../components/StablecoinAccordion"
import StablecoinBoxGrid from "../components/StablecoinBoxGrid"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"
import Pill from "../components/Pill"

import { getData } from "../utils/cache"
import { getImage } from "../utils/image"

const tooltipContent = (
  <div>
    <Translation id="data-provided-by" />{" "}
    <InlineLink to="https://www.coingecko.com/en/api">coingecko.com</InlineLink>
  </div>
)

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
  <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4} {...props} />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", m: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
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
      emoji: "🪪",
      description:
        "Gas keeps Ethereum sybil-resistant by preventing malicious actors from overwhelming the network with fraudulent activities.",
    },
    {
      emoji: ":money_with_wings:",
      description:
        "Because computation costs gas, spamming Ethereum with expensive transactions, either accidentally and maliciously, is financially disencentivised.",
    },
    {
      emoji: ":hourglass_flowing_sand:",
      description:
        "A hard-limit on the amount of computation that can be done at any one time prevents Ethereum from being overwhelmed, helping to ensure the network is always accessible.",
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
    title: "Network fees",
    header: "Network fees",
    subtitle: t("page-stablecoins-hero-subtitle"),
    image: getImage(data.stablecoins)!,
    alt: t("page-stablecoins-hero-alt"),
    buttons: [
      {
        content: "What is gas?",
        toId: "explore",
        matomo: {
          eventCategory: "gas hero buttons",
          eventAction: "click",
          eventName: "wgat is gas",
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
      {/* Hero Section */}
      <Box background="layer2Gradient" width="full">
        <Box pb={8}>
          <PageHero content={heroContent} isReverse />
        </Box>
      </Box>
      <Divider />
      <Content>
        <Box>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
            mr={8}
            mb={8}
          >
            <Box
              w="full"
              ml={{ base: "auto", lg: 0 }}
              mr={{ base: "auto", lg: 2 }}
            >
              <H2 mt={0}>What are gas fees?</H2>
              <Text>
                Think of Ethereum as a large computer network where people can
                do tasks like sending messages or running programs. Just like in
                the real world, these tasks require energy to get done. In
                Ethereum, each computational action has a set "gas" price. Your
                gas fees are the total cost of the actions in your transaction.
                When you send a transaction or run a smart contract, you pay in
                gas fees to process it.
              </Text>
            </Box>
          </Flex>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
            mr={{ base: 0, lg: 8 }}
            mb={8}
          >
            <Box w="full" margin={{ base: "auto 0", lg: "0 2rem 0 0" }}>
              <H3 mb={4}>⏰ Wait for gas to go down</H3>
              <Text>
                Gas prices go up and down every twelve seconds based on how
                congested Ethereum is. When gas prices are high, waiting just a
                few minutes before making a transaction could see a significant
                drop in what you pay.{" "}
              </Text>
              <H3 mb={4}>🌚 Time your transactions</H3>
              <Text>
                At popular times, congestion can sustain longer. Just like
                off-peak travel is less crowded and more cost-effective,
                Ethereum is usually more affordable during off-peak periods,
                particularly during North American nighttime hours.
              </Text>
              <H3 mb={4}>🚀 Use Layer 2</H3>
              <Text>
                Layer-2 chains are blockchains that extend Ethereum, offering
                lower fees and handling more transactions. They're a good choice
                to save on fees for transactions that don't need to happen on
                the main Ethereum network"
              </Text>
            </Box>
            <GhostCard
              maxW="640px"
              mr={{ base: 0, lg: 8 }}
              mt={{ base: 16, lg: 2 }}
            >
              <Emoji text=":cat:" fontSize="5xl" />
              <H3>Attack of the Cryptokitties</H3>
              <Text>
                In November 2017, the popular CryptoKitties project was
                launched. Its rapid spike in popularity caused significant
                network congestion and extremely high gas fees. The challenges
                posed by CryptoKitties accelerated the urgency of finding
                solutions for scaling Ethereum.
              </Text>
            </GhostCard>
          </Flex>
        </Box>
        <>
          {/* <Flex
          direction={{ base: "column", lg: "row" }}
          align="flex-start"
          width="full"
          mr={8}
          mb={8}
        >
          <Box
            w="full"
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 2 }}
          >
            <H3 mt={0}>
              Why do we need gas?
            </H3>
            <Text>
              In November 2017, the popular CryptoKitties project was launched. Its rapid spike in popularity caused significant network congestion and extremely high gas fees. The challenges posed by CryptoKitties accelerated the urgency of finding solutions for scaling Ethereum.
            </Text>
          </Box>
        </Flex> */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
            mr={{ base: 0, lg: 8 }}
            mb={8}
          >
            <Box w="full" margin={{ base: "auto 0", lg: "0 2rem 0 0" }}>
              <Box
                w="full"
                ml={{ base: "auto", lg: 0 }}
                mr={{ base: "auto", lg: 2 }}
              >
                <H3 mt={0}>Why do we need gas?</H3>
                <Text>
                  Gas is a critical element in keeping Ethereum secure and
                  processing transactions. Gas helps in many ways:
                </Text>
              </Box>
              {tokens.map((token, idx) => (
                <Box minWidth="full" my={2}>
                  <HorizontalCard
                    key={idx}
                    emoji={token.emoji}
                    description={token.description}
                    emojiSize={3}
                  />
                </Box>
              ))}
            </Box>
            <Box
              w="full"
              ml={{ base: "auto", lg: 0 }}
              mr={{ base: "auto", lg: 2 }}
            >
              <H3 mt={0}>What causes high gas fees?</H3>
              <Text>
                Whenever the amount of computation (gas) being done on Ethereum
                exceeds its target level, gas fees will begin to increase. The
                more it goes over the target level, the quicker gas fees
                increase.
              </Text>
              <Text>
                Higher fees could be caused by things like popular dapps or
                NFTs, periodically increased trading on DEXs, or an overwhelming
                number of user activity at peak times.
              </Text>
              <Text>
                Developers on Ethereum should take care to optimise their smart
                contracts usage before deploying. If lots of people are using a
                poorly written smart contract, it will consume more gas and
                could inadvertently cause network congestion.
              </Text>
            </Box>
          </Flex>
        </>
        {/* Divider */}
        <Divider />
        {/* How is gas calculated? */}
        <Content>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
            mr={{ base: 0, lg: 8 }}
            mb={8}
          >
            <Box
              w="full"
              ml={{ base: "auto", lg: 0 }}
              mr={{ base: "auto", lg: 2 }}
            >
              <Flex alignItems="center" mb={4}>
                <Heading as="h2" my={0}>
                  How is gas calculated?
                </Heading>

                <Pill ml={4} background="warning">
                  Advanced
                </Pill>
              </Flex>
              <Text>The total gas fee you pay is made up of a few parts:</Text>
              <UnorderedList ml={6} spacing={3}>
                <ListItem>
                  <b>Base fee:</b> a fee set by the network that has to be paid
                  for a transaction
                </ListItem>
                <ListItem>
                  <b>Priority fee:</b> an optional tip to incentivise node
                  operators to include your transaction
                </ListItem>
                <ListItem>
                  <b>Amount of gas used:</b> remember we said gas represented
                  computation? More complex actions, like interacting with a
                  smart contract, use more gas than simple ones, such as sending
                  a transaction.
                </ListItem>
              </UnorderedList>
              <Text>
                The formula for calculating a gas fee is units of gas used *
                (base fee + priority fee). Most wallets will calculate gas usage
                and display it in a more straight-forward way.
              </Text>
            </Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>Transaction type</Th>
                  <Th>Gas used</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Simple ETH transaction</Td>
                  <Td>21,000</Td>
                </Tr>
                <Tr>
                  <Td>Transferring an NFT</Td>
                  <Td>84,904</Td>
                </Tr>
                <Tr>
                  <Td>Swapping on Uniswap</Td>
                  <Td>184,523</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Content>
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
          <H2 mt={0}>
            <Translation id="page-stablecoins-find-stablecoin" />
          </H2>
          <Box
            display="flex"
            w="full"
            width={{ base: "full", lg: "50%" }}
            justifyContent="center"
            flexDirection="column"
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 2 }}
          >
            <Text>
              <Translation id="page-stablecoins-find-stablecoin-intro" />
            </Text>
            <ul>
              <li>
                <InlineLink to="#how">
                  <Translation id="page-stablecoins-find-stablecoin-types-link" />
                </InlineLink>
              </li>
              <li>
                <InlineLink to="#explore">
                  <Translation id="page-stablecoins-find-stablecoin-how-to-get-them" />
                </InlineLink>
              </li>
            </ul>
          </Box>
          <H3 mt={0} mb={4}>
            <Translation id="page-stablecoins-editors-choice" />
          </H3>
          <Text>
            <Translation id="page-stablecoins-editors-choice-intro" />
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            <EditorsChoice boxShadow="gridYellowBoxShadow">
              <Box
                display="flex"
                w="full"
                width={{ base: "full", lg: "50%" }}
                justifyContent="center"
                flexDirection="column"
                ml={{ base: "auto", lg: 0 }}
                mr={{ base: "auto", lg: 8 }}
              >
                <Box>
                  <H2 fontSize="2rem" mt={0} mb={2}>
                    <Translation id="page-stablecoins-dai-banner-title" />
                  </H2>
                  <Text fontSize="xl" lineHeight={1.4} color="text200">
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
                ml={{ base: "auto", lg: 0 }}
                mr={{ base: "auto", lg: 8 }}
              >
                <H2 fontSize="2rem" mt={0} mb={2}>
                  <Translation id="page-stablecoins-usdc-banner-title" />
                </H2>
                <Text fontSize="xl" lineHeight={1.4} color="text200">
                  <Translation id="page-stablecoins-usdc-banner-body" />
                </Text>
                <Flex direction="column">
                  <Box>
                    <ButtonLink
                      mb={4}
                      mr={4}
                      to="https://matcha.xyz/markets/ETH/USDC"
                    >
                      <Translation id="page-stablecoins-usdc-banner-swap-button" />
                    </ButtonLink>
                  </Box>
                  <Box>
                    <ButtonLink
                      variant="outline"
                      to="https://www.coinbase.com/usdc"
                    >
                      <Translation id="page-stablecoins-usdc-banner-learn-button" />
                    </ButtonLink>
                  </Box>
                </Flex>
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
                mb={{ base: 8, md: 0 }}
              />
            </EditorsChoice>
          </SimpleGrid>
          <H3>
            <Translation id="page-stablecoins-top-coins" />
            <Tooltip content={tooltipContent}>
              <Icon ml={2} fill="'text" name="info" boxSize={4} />
            </Tooltip>
          </H3>
          <Text>
            <Translation id="page-stablecoins-top-coins-intro" />{" "}
            <Translation id="page-stablecoins-top-coins-intro-code" />
          </Text>
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
        <H2>
          <Translation id="page-stablecoins-get-stablecoins" />
        </H2>
      </Content>
      <Flex
        alignItems="center"
        w="full"
        pl={{ base: "0rem", lg: "2rem" }}
        pr={{ base: "0rem", lg: "2rem" }}
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
            <ButtonLink variant="outline" to="/defi/" whiteSpace="normal">
              <Translation id="page-stablecoins-more-defi-button" />
            </ButtonLink>
          </Flex>
        </CalloutBanner>
        <H2>
          <Translation id="page-stablecoins-save-stablecoins" />
        </H2>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="full"
          mr={8}
          mb={8}
        >
          <Box
            w="full"
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 2 }}
          >
            <Text>
              <Translation id="page-stablecoins-save-stablecoins-body" />
            </Text>
            <H3>
              <Translation id="page-stablecoins-interest-earning-dapps" />
            </H3>
            <Text>
              <Translation id="page-stablecoins-saving" />
            </Text>
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
              <Translation id="page-stablecoins-bank-apy" />
            </Text>
            <Text as="em">
              <Translation id="page-stablecoins-bank-apy-source" />{" "}
              <InlineLink to="https://www.nytimes.com/2020/09/18/your-money/savings-interest-rates.html">
                <Translation id="page-stablecoins-bank-apy-source-link" />
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
              name={dapp.name}
              description={dapp.description}
            />
          ))}
        </Grid>
        <InfoBanner isWarning shouldCenter>
          <H3 mt={0} mb={4}>
            <Translation id="page-stablecoins-research-warning-title" />
          </H3>
          <Translation id="page-stablecoins-research-warning" />
        </InfoBanner>
      </Content>
      <Divider />
      <Content id="how">
        <H2 mt={0}>
          <Translation id="page-stablecoins-types-of-stablecoin" />
        </H2>
        <StablecoinBoxGrid items={features} />
      </Content>
      <Box id="tools" py={12} px={8} w="full">
        <H2>
          <Translation id="page-stablecoins-tools-title" />
        </H2>
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
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 2 }}
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
