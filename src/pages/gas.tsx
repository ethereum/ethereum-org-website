import React, { useState } from "react"
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
  Td,
  Th,
  Tr,
  Tbody,
  Thead,
  Table,
} from "@chakra-ui/react"
import { ListItem, UnorderedList } from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import QuizWidget from "../components/Quiz/QuizWidget"
import Emoji from "../components/Emoji"
import FeedbackCard from "../components/FeedbackCard"
import ExpandableCard from "../components/ExpandableCard"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import InfoBanner from "../components/InfoBanner"
import InlineLink from "../components/Link"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Pill from "../components/Pill"

import { getImage } from "../utils/image"

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const Divider = () => <Box my={16} w="10%" h={1} bg="homeDivider" />

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

const GasPage = ({ data }: PageProps<Queries.GasPageQuery>) => {
  const { t } = useTranslation()

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

  const heroContent = {
    title: "Network fees",
    header: "Network fees",
    subtitle:
      "Network fees on Ethereum are called gas. Gas is the fuel that powers Ethereum.",
    image: getImage(data.infrastructure)!,
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
      <>
        {/* Intro section */}
        <Content>
          <Box
            w="75%"
            ml={{ base: "auto", lg: 0 }}
            mr={{ base: "auto", lg: 2 }}
            mb={16}
            mt={16}
          >
            <Text>
              Every transaction on Ethereum requires a small form of payment to
              process—these fees are known as ‘gas’ fee. Just like you need to
              pay for postage to send a letter, Ethereum requires you to pay gas
              fee to send a transaction.
            </Text>
          </Box>
        </Content>
        <Content>
          <Box>
            <Flex
              direction={{ base: "column", lg: "row" }}
              align="flex-start"
              width="full"
              mr={8}
              mb={16}
            >
              <Box
                flex="50%"
                w="full"
                ml={{ base: "auto", lg: 0 }}
                mr={{ base: "auto", lg: 2 }}
              >
                <H2 mt={0}>What are gas fees?</H2>
                <Text>
                  Think of Ethereum as a large computer network where people can
                  do tasks like sending messages or running programs. Just like
                  in the real world, these tasks require energy to get done.
                </Text>
                <Text>
                  In Ethereum, each computational action has a set "gas" price.
                  Your gas fees are the total cost of the actions in your
                  transaction. When you send a transaction or run a smart
                  contract, you pay in gas fees to process it.
                </Text>
              </Box>

              <Box flex="50%">
                <GatsbyImage
                  image={getImage(data.eth)!}
                  alt=""
                  style={{ maxHeight: "400px" }}
                  objectFit="contain"
                />
              </Box>
            </Flex>
            <Flex
              direction={{ base: "column", lg: "row" }}
              align="center"
              justify="center"
              width="full"
              mr={{ base: 0, lg: 8 }}
              mb={16}
            >
              <Box w="full" margin={{ base: "auto 0", lg: "0 2rem 0 0" }}>
                <H2>How do I pay less gas?</H2>
                <Text>
                  While higher fees on Ethereum are sometimes inevitable, there
                  are strategies you can use to reduce the cost:
                </Text>
                <H3 mb={4}>⏰ Wait for gas to go down</H3>
                <Text>
                  Gas prices go up and down every twelve seconds based on how
                  congested Ethereum is. When gas prices are high, waiting just
                  a few minutes before making a transaction could see a
                  significant drop in what you pay.{" "}
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
                  lower fees and handling more transactions. They're a good
                  choice to save on fees for transactions that don't need to
                  happen on the main Ethereum network"
                </Text>
              </Box>
              <GhostCard
                maxW="640px"
                // maxH="600px"
                alignSelf="center"
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
        </Content>
        {/* Why do we need gas / What causes high gas fees */}
        <Divider />
        <Content>
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
        </Content>
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
            <Table maxW={"100%"} minW={"auto"}>
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
        <Content>
          <H2>Frequently asked questions</H2>
          {/* MaxWidth will be enforced by FAQ component once implemented */}
          <Box maxWidth="832px">
            <ExpandableCard
              title="Who gets paid the gas fee in my transaction?"
              contentPreview="Content preview"
            >
              <Text>
                The majority is gas fee—the base fee— is destroyed by the
                protocol (burned). The priority fee, if included in your
                transaction, will be given to the validator who proposed your
                transaction.
              </Text>
              <Text>
                You can read a detailed description of the process in the gas
                developer docs.
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title="Do I need to pay gas in ETH?"
              contentPreview="Content preview"
            >
              <Text>
                Yes. All gas fees on Ethereum must be paid in the native ETH
                currency.
              </Text>
              <Text>More on ETH</Text>
            </ExpandableCard>
            <ExpandableCard
              title="What is gwei?"
              contentPreview="Content preview"
            >
              <Text>
                In some wallets or gas trackers, you will see gas prices
                denominated as ‘gwei’.
              </Text>
              <Text>
                Gwei is just a smaller unit of ETH, just as pennies are to
                dollars, with the difference being that 1 ETH equals 1 billion
                gwei. Gwei is useful when talking about very small amounts of
                ETH.
              </Text>
            </ExpandableCard>
          </Box>
        </Content>
      </>
      <Divider />
      <QuizWidget quizKey="layer-2" />
    </Page>
  )
}

export default GasPage

export const query = graphql`
  query GasPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-stablecoins", "learn-quizzes", "common"] }
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
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
