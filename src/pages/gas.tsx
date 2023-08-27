import React, { ComponentPropsWithRef } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import {
  Box,
  Flex,
  Heading,
  Text,
  BoxProps,
  FlexProps,
  HeadingProps,
  Td,
  Th,
  Tr,
  Tbody,
  Thead,
  Table,
  Show,
  Link,
} from "@chakra-ui/react"
import { ListItem, UnorderedList } from "@chakra-ui/react"

import QuizWidget from "../components/Quiz/QuizWidget"
import Emoji from "../components/Emoji"
import ExpandableCard from "../components/ExpandableCard"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import Card from "../components/Card"
import ButtonLink from "../components/ButtonLink"

import { getImage } from "../utils/image"

const Content = (props: BoxProps) => <Box px={8} w="full" {...props} />

const Divider = (props: BoxProps) => (
  <Box my={16} w="10%" h={1} bg="homeDivider" {...props} />
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

export const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%" }}
    m={4}
    p={6}
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
    alt: "",
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
    ],
  }

  return (
    <Page>
      <PageMetadata
        title="Gas fees on Ethereum: how do they work?"
        description="Learn about gas on Ethereum: how they work and how to pay less in gas fees"
      />
      {/* Hero Section */}
      <Box background="layer2Gradient" width="full">
        <Box pb={8}>
          <PageHero content={heroContent} isReverse />
        </Box>
      </Box>
      <>
        {/* Introduction / What are gas fees */}
        <Content mb={{ base: 16, md: 16, lg: 32 }} mt={16}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            w="full"
          >
            <Box flex="60%" w="full" mr={{ base: "auto", lg: 2 }}>
              <Box mb={16}>
                <Text>
                  Every transaction on Ethereum requires a small form of payment
                  to process—these fees are known as ‘gas’ fee. Just like you
                  need to pay for postage to send a letter, Ethereum requires
                  you to pay gas fee to send a transaction.
                </Text>
              </Box>
              <H2 mt={0}>What are gas fees?</H2>
              <Text>
                Think of Ethereum as a large computer network where people can
                do tasks like sending messages or running programs. Just like in
                the real world, these tasks require energy to get done.
              </Text>
              <Text>
                In Ethereum, each computational action has a set "gas" price.
                Your gas fees are the total cost of the actions in your
                transaction. When you send a transaction or run a smart
                contract, you pay in gas fees to process it.
              </Text>
            </Box>

            <Show above="lg">
              <Box flex="50%">
                <GatsbyImage
                  image={getImage(data.robot)!}
                  alt=""
                  style={{ maxHeight: "400px" }}
                  objectFit="contain"
                />
              </Box>
            </Show>
          </Flex>
        </Content>

        <Content mb={{ base: 16, md: 16, lg: 32 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="center"
            width="full"
            // mr={{ base: 0, lg: 8 }}
          >
            <Box w="full">
              <H2 mt={0}>How do I pay less gas?</H2>
              <Text>
                While higher fees on Ethereum are sometimes inevitable, there
                are strategies you can use to reduce the cost:
              </Text>
              <Flex
                flexWrap="wrap"
                mx={{ base: 0, lg: 8 }}
                my={{ base: 4, lg: 0 }}
              >
                <StyledCard
                  emoji=":alarm_clock:"
                  title="Time your transactions"
                  description="Just like travelling off-peak is less crowded and more affordable, Ethereum is generally cheaper to use when North America is asleep."
                ></StyledCard>
                <StyledCard
                  emoji=":robot:"
                  title="Wait for gas to go down"
                  description="Gas prices go up and down every twelve seconds based on how congested Ethereum is. When gas prices are high, waiting just a few minutes before making a transaction could see a significant drop in what you pay."
                ></StyledCard>
                <StyledCard
                  emoji=":rocket:"
                  title="Use layer 2"
                  description="Layer-2 chains are built atop Ethereum, offering lower fees and handling more transactions. They're a good choice to save on fees for transactions that don't need to happen on the main Ethereum network."
                >
                  <ButtonLink w="fit-content" to="/layer-2/">
                    Try layer 2
                  </ButtonLink>
                </StyledCard>
              </Flex>
            </Box>
          </Flex>
        </Content>
        {/* What causes high gas fees / Attack of the Cryptokitties */}
        <Content mb={{ base: 16, md: 16, lg: 32 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
          >
            <Box
              w="full"
              ml={{ base: "auto", lg: 0 }}
              mr={{ base: "auto", lg: 16 }}
              flex="60%"
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
              <Link href="/developers/docs/gas/">
                Want to dive deeper? Check out developer docs.
              </Link>
            </Box>
            <GhostCard
              flex="40%"
              maxW="640px"
              alignSelf="center"
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
        </Content>
        {/* Why do we need gas section */}
        <Content mb={{ base: 16, md: 16, lg: 32 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            width="full"
            mr={{ base: 0, lg: 8 }}
          >
            <Box w="full" mr={{ base: "auto", lg: "8" }}>
              <Box>
                <H2 mt={0}>Why do we need gas?</H2>
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
                    align="center"
                  />
                </Box>
              ))}
            </Box>
            <Box w="full">
              <GatsbyImage
                image={getImage(data.eth)!}
                alt=""
                style={{ maxHeight: "400px" }}
                objectFit="contain"
              />
            </Box>
          </Flex>
        </Content>
        {/* How is gas calculated? */}
        <Content mb={{ base: 16, md: 16, lg: 32 }}>
          <Flex direction={{ base: "column", lg: "row" }} align="flex-start">
            <Box w="full" mr={{ base: "auto", lg: 8 }}>
              <Flex alignItems="flex-start">
                <H2 mt={0}>How is gas calculated?</H2>

                <Pill mt={1.5} ml={4} background="warning">
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

        {/* Faq section */}
        <Content>
          <H2 mt="0">Frequently asked questions</H2>
          {/* MaxWidth will be enforced by FAQ component once implemented */}
          <Box maxWidth="832px">
            <ExpandableCard title="Who gets paid the gas fee in my transaction?">
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
            <ExpandableCard title="Do I need to pay gas in ETH?">
              <Text>
                Yes. All gas fees on Ethereum must be paid in the native ETH
                currency.
              </Text>
              <Link href="/eth/">More on ETH</Link>
            </ExpandableCard>
            <ExpandableCard title="What is gwei?">
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
      <Divider mb={0} />
      <Box mt={0}>
        <QuizWidget quizKey="layer-2" />
      </Box>
    </Page>
  )
}

export default GasPage

export const query = graphql`
  query GasPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["learn-quizzes", "common"] }
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
    robot: file(relativePath: { eq: "wallet.png" }) {
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
