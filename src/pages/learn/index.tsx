// Libraries
import React, { ReactNode } from "react"
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HeadingProps,
  ListItem,
  Text,
  UnorderedList,
  useTheme,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"

// Components
import ButtonLink from "../../components/ButtonLink"
import DocLink from "../../components/DocLink"
import FeedbackCard from "../../components/FeedbackCard"
import Link from "../../components/Link"
import OriginalCard, {
  IProps as IOriginalCardProps,
} from "../../components/Card"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import Translation from "../../components/Translation"

// Utils
import { Lang } from "../../utils/languages"
import { translateMessageId, isLangRightToLeft } from "../../utils/translations"
import { getImage } from "../../utils/image"

// Types
import type { ChildOnlyProp, Context } from "../../types"

const Card = ({ children, ...props }: IOriginalCardProps) => {
  return (
    <OriginalCard
      justifyContent="space-between"
      sx={{
        h3: {
          mt: 0,
        },
      }}
      {...props}
    >
      {children}
    </OriginalCard>
  )
}

const CardImage = ({ children }: ChildOnlyProp) => {
  return (
    <Center textAlign="center" mb={4}>
      {children}
    </Center>
  )
}

const DocsContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex mx={{ base: 0, xl: 36 }} direction="column" gap="0.8rem">
      {children}
    </Flex>
  )
}

const AdditionalReadingHeader = ({ children }: ChildOnlyProp) => {
  return (
    <Heading as="h3" mt={16} fontSize="xl" fontWeight="bold" textAlign="center">
      {children}
    </Heading>
  )
}

const Section = ({ children }: ChildOnlyProp) => {
  return (
    <Box as="section" mt={24} _first={{ mt: 0 }}>
      {children}
    </Box>
  )
}

const CardGrid = ({ children }: ChildOnlyProp) => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={8}
      mt={8}
    >
      {children}
    </Grid>
  )
}

const H2 = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4} {...props}>
      {children}
    </Heading>
  )
}

const H3 = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} {...props}>
      {children}
    </Heading>
  )
}

const LearnPage = ({ data }: PageProps<Queries.LearnPageQuery, Context>) => {
  const theme = useTheme()
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale as Lang)

  const tocItems = [
    {
      id: "what-is-crypto-ethereum",
      title: translateMessageId("toc-what-is-crypto-ethereum", intl),
    },
    {
      id: "how-do-i-use-ethereum",
      title: translateMessageId("toc-how-do-i-use-ethereum", intl),
    },
    {
      id: "what-is-ethereum-used-for",
      title: translateMessageId("toc-what-is-ethereum-used-for", intl),
    },
    {
      id: "strengthen-the-ethereum-network",
      title: translateMessageId("toc-strengthen-the-ethereum-network", intl),
    },
    {
      id: "learn-about-the-ethereum-protocol",
      title: translateMessageId("toc-learn-about-the-ethereum-protocol", intl),
    },
    {
      id: "learn-about-the-ethereum-community",
      title: translateMessageId("toc-learn-about-the-ethereum-community", intl),
    },
    {
      id: "books-and-podcasts",
      title: translateMessageId("toc-books-and-podcasts", intl),
    },
  ]

  const heroContent = {
    title: translateMessageId("hero-title", intl),
    header: translateMessageId("hero-header", intl),
    subtitle: translateMessageId("hero-subtitle", intl),
    image: getImage(data.heroImage)!,
    alt: "",
    buttons: [
      {
        content: translateMessageId("hero-button-lets-get-started", intl),
        toId: tocItems[0].id,
      },
    ],
  }

  return (
    <Box position="relative" w="full">
      <PageMetadata
        title={translateMessageId("hero-title", intl)}
        description={translateMessageId("hero-subtitle", intl)}
      />

      <Box bg="layer2Gradient">
        <Box>
          <Box as={PageHero} pb={8} content={heroContent} isReverse />
        </Box>
      </Box>

      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        w="full"
        mb={16}
        mx="auto"
        pt={{ lg: 16 }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        <Box
          as="aside"
          display={{ base: "none", lg: "flex" }}
          flexDirection="column"
          position="sticky"
          top="6.25rem" // account for navbar
          h="calc(100vh - 80px)"
          flex="0 1 330px"
          mx={8}
        >
          <Heading
            lineHeight={1.4}
            fontSize={{ base: "2.5rem", lg: "5xl" }}
            fontWeight="bold"
            textAlign={{ base: "left", lg: "right" }}
            mt={0}
            display={{ base: "none", lg: "block" }}
          >
            <Translation id="toc-learn-hub" />
          </Heading>
          <StakingHomeTableOfContents items={tocItems} />
        </Box>

        <Box
          as="article"
          flex={`1 1 ${theme.breakpoints.l}`}
          pb={8}
          px={8}
          id="content"
        >
          <Section>
            <H2 mt={{ lg: 0 }} id={tocItems[0].id}>
              {tocItems[0].title}
            </H2>
            <Text>
              <Translation id="what-is-crypto-1" />{" "}
              <Link to="/what-is-ethereum/">
                <Translation id="what-is-crypto-link-1" />
              </Link>
            </Text>
            <Text>
              <Translation id="what-is-crypto-2" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId("what-is-ethereum-card-title", intl)}
                description={translateMessageId(
                  "what-is-ethereum-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.whatIsEth)!}
                      alt={translateMessageId(
                        "what-is-ethereum-card-image-alt",
                        intl
                      )}
                    />
                  </CardImage>
                  <ButtonLink to="/what-is-ethereum/">
                    <Translation id="what-is-ethereum-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("what-is-eth-card-title", intl)}
                description={translateMessageId(
                  "what-is-eth-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.eth)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/eth/">
                    <Translation id="what-is-eth-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId(
                  "where-can-i-get-eth-card-title",
                  intl
                )}
                description={translateMessageId(
                  "where-can-i-get-eth-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.impact)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/get-eth/">
                    <Translation id="where-can-i-get-eth-card-title" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              <Translation id="additional-reading-more-on-ethereum-basics" />
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/guides/">
                <Translation id="guides-hub" />
              </DocLink>
              <DocLink to="/smart-contracts/">
                <Translation id="additional-reading-what-are-smart-contracts" />
              </DocLink>
              <DocLink to="/developers/docs/intro-to-ethereum/">
                <Translation id="additional-reading-a-developers-intro" />
              </DocLink>
              <DocLink to="/web3/">
                <Translation id="additional-reading-what-is-web3" />
              </DocLink>
              <DocLink
                to="https://www.youtube.com/watch?v=WSN5BaCzsbo"
                isExternal
              >
                <Translation id="additional-reading-decentralize-everything" />
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <H2 id={tocItems[1].id}>{tocItems[1].title}</H2>
            <Text>
              <Translation id="how-do-i-use-ethereum-1" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId("what-is-a-wallet-card-title", intl)}
                description={translateMessageId(
                  "what-is-a-wallet-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.wallet)!}
                      alt={translateMessageId(
                        "what-is-a-wallet-card-alt",
                        intl
                      )}
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/">
                    <Translation id="what-is-a-wallet-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("find-a-wallet-card-title", intl)}
                description={translateMessageId(
                  "find-a-wallet-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.futureTransparent)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/find-wallet/">
                    <Translation id="find-a-wallet-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId(
                  "crypto-security-basics-card-title",
                  intl
                )}
                description={translateMessageId(
                  "crypto-security-basics-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dogeComputer)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/security/">
                    <Translation id="crypto-security-basics-card-button" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>

            <Flex
              my={12}
              borderRadius="10px"
              overflow="hidden"
              bg="cardGradient"
              direction={{ base: "column", lg: "row" }}
            >
              <Box p={12}>
                <H3 mt={0}>
                  <Translation id="things-to-consider-banner-title" />
                </H3>
                <UnorderedList mb={0}>
                  <ListItem>
                    <Translation id="things-to-consider-banner-1" />
                  </ListItem>
                  <ListItem>
                    <Translation id="things-to-consider-banner-2" />{" "}
                    <Link to="/layer-2/">
                      <Translation id="things-to-consider-banner-layer-2" />
                    </Link>
                    .
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box alignSelf="end">
                <GatsbyImage image={getImage(data.newRings)!} alt="" />
              </Box>
            </Flex>

            <AdditionalReadingHeader>
              <Translation id="additional-reading-more-on-using-ethereum" />
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/guides/how-to-register-an-ethereum-account/">
                <Translation id="additional-reading-how-to-register-an-ethereum-account" />
              </DocLink>
              <DocLink to="/guides/how-to-use-a-wallet/">
                <Translation id="additional-reading-how-to-use-a-wallet" />
              </DocLink>
              <DocLink to="/community/support/">
                <Translation id="additional-reading-support-for-ethereum-and-wallets" />
              </DocLink>
              <DocLink to="/layer-2/">
                <Translation id="additional-reading-layer-2" />
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <H2 id={tocItems[2].id}>{tocItems[2].title}</H2>
            <Text>
              <Translation id="what-is-ethereum-used-for-1" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId("defi-card-title", intl)}
                description={translateMessageId("defi-card-description", intl)}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/defi/">
                    <Translation id="defi-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("stablecoins-card-title", intl)}
                description={translateMessageId(
                  "stablecoins-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.stablecoins)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/stablecoins/">
                    <Translation id="stablecoins-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("nft-card-title", intl)}
                description={translateMessageId("nft-card-description", intl)}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.infrastructureTransparent)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/nft/">
                    <Translation id="nft-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("dao-card-title", intl)}
                description={translateMessageId("dao-card-description", intl)}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dao)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/dao/">
                    <Translation id="dao-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("dapp-card-title", intl)}
                description={translateMessageId("dapp-card-description", intl)}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.developersEthBlocks)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/dapps/">
                    <Translation id="dapp-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                justifyContent="start"
                bg="cardGradient"
                title={translateMessageId("emerging-use-cases-title", intl)}
                description={translateMessageId(
                  "emerging-use-cases-description",
                  intl
                )}
              >
                <UnorderedList
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={0}
                >
                  <ListItem>
                    <Link to="/decentralized-identity/">
                      <Translation id="decentralized-identity" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/social-networks/">
                      <Translation id="decentralized-social-networks" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/desci/">
                      <Translation id="decentralized-science" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      <Translation id="play-to-earn" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                      <Translation id="fundraising-through-quadratic-funding" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="https://hbr.org/2022/01/how-walmart-canada-uses-blockchain-to-solve-supply-chain-challenges">
                      <Translation id="supply-chain-management" />
                    </Link>
                  </ListItem>
                </UnorderedList>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              <Translation id="more-on-ethereum-use-cases" />
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink
                to="http://governance40.com/wp-content/uploads/2019/06/Blockchain-in-Developing-Countries.pdf"
                isExternal
              >
                <Translation id="more-on-ethereum-use-cases-link" />
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <H2 id={tocItems[3].id}>{tocItems[3].title}</H2>
            <Text>
              <Translation id="strengthening-the-ethereum-network-description" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId("staking-ethereum-card-title", intl)}
                description={translateMessageId(
                  "staking-ethereum-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.rhino)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/staking/">
                    <Translation id="staking-ethereum-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("run-a-node-card-title", intl)}
                description={translateMessageId(
                  "run-a-node-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.ethereumInside)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/run-a-node/">
                    <Translation id="run-a-node-card-title" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <H2 id={tocItems[4].id}>{tocItems[4].title}</H2>
            <Text>
              <Translation id="learn-about-ethereum-protocol-description" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId(
                  "energy-consumption-card-title",
                  intl
                )}
                description={translateMessageId(
                  "energy-consumption-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.hackathon)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/energy-consumption/">
                    <Translation id="energy-consumption-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("ethereum-upgrades-card-title", intl)}
                description={translateMessageId(
                  "ethereum-upgrades-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.merge)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/upgrades/">
                    <Translation id="ethereum-upgrades-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId(
                  "ethereum-whitepaper-card-title",
                  intl
                )}
                description={translateMessageId(
                  "ethereum-whitepaper-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)!}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/whitepaper/">
                    <Translation id="ethereum-whitepaper-card-button" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              <Translation id="more-on-ethereum-protocol-title" />
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/developers/">
                <Translation id="more-on-ethereum-protocol-ethereum-for-developers" />
              </DocLink>
              <DocLink to="/eips/">
                <Translation id="more-on-ethereum-protocol-eips" />
              </DocLink>
              <DocLink to="/history/">
                <Translation id="more-on-ethereum-protocol-history" />
              </DocLink>
              <DocLink to="/governance/">
                <Translation id="more-on-ethereum-protocol-governance" />
              </DocLink>
              <DocLink to="/bridges/">
                <Translation id="more-on-ethereum-protocol-bridges" />
              </DocLink>
              <DocLink to="https://weekinethereumnews.com/" isExternal>
                <Translation id="more-on-ethereum-protocol-week-in-ethereum" />
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <H2 id={tocItems[5].id}>{tocItems[5].title}</H2>
            <Text>
              <Translation id="ethereum-community-description" />
            </Text>
            <CardGrid>
              <Card
                title={translateMessageId("community-hub-card-title", intl)}
                description={translateMessageId(
                  "community-hub-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.enterprise)!}
                      alt={translateMessageId("community-hub-card-alt", intl)}
                    />
                  </CardImage>
                  <ButtonLink to="/community/">
                    <Translation id="community-hub-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId("get-involved-card-title", intl)}
                description={translateMessageId(
                  "get-involved-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dogeComputer)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/community/get-involved/">
                    <Translation id="get-involved-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={translateMessageId(
                  "online-communities-card-title",
                  intl
                )}
                description={translateMessageId(
                  "online-communities-card-description",
                  intl
                )}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.impact)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/community/online/">
                    <Translation id="online-communities-card-button" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <H2 id={tocItems[6].id}>{tocItems[6].title}</H2>
            <Box>
              <H3>
                <Translation id="books-about-ethereum" />
              </H3>
              <UnorderedList>
                <ListItem>
                  <Link to="https://www.goodreads.com/book/show/57356067-the-cryptopians">
                    <Translation id="cryptopians-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="cryptopians-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                    <Translation id="out-of-the-ether-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="out-of-the-ether-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                    <Translation id="the-infinite-machine-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="the-infinite-machine-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/en/book/show/22174460-the-age-of-cryptocurrency">
                    <Translation id="the-age-of-cryptocurrency-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="the-age-of-cryptocurrency-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/en/book/show/34964890-the-truth-machine">
                    <Translation id="the-truth-machine-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="the-truth-machine-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/book/show/23546676-digital-gold">
                    <Translation id="digital-gold-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="digital-gold-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/en/book/show/56274031-kings-of-crypto">
                    <Translation id="kings-of-crypto-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="kings-of-crypto-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://github.com/ethereumbook/ethereumbook">
                    <Translation id="mastering-ethereum-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="mastering-ethereum-description" />{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.goodreads.com/en/book/show/59892281-proof-of-stake">
                    <Translation id="proof-of-stake-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="proof-of-stake-description" />
                  </Text>
                </ListItem>
              </UnorderedList>
              <H3>
                <Translation id="podcasts-about-ethereum" />
              </H3>
              <UnorderedList>
                <ListItem>
                  <Link to="http://podcast.banklesshq.com/">
                    <Translation id="bankless-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="bankless-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://uncommoncore.co/podcast/">
                    <Translation id="uncommon-core-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="uncommon-core-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.zeroknowledge.fm/">
                    <Translation id="zeroknowledge-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="zeroknowledge-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://epicenter.tv/">
                    <Translation id="epicenter-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="epicenter-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://unchainedpodcast.com/">
                    <Translation id="unchained-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="unchained-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.intothebytecode.xyz/">
                    <Translation id="into-the-bytecode-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="into-the-bytecode-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Link to="https://www.youtube.com/@TheDailyGwei/">
                    <Translation id="the-daily-gwei-title" />
                  </Link>{" "}
                  <Text as="i">
                    <Translation id="the-daily-gwei-description" />
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </Section>

          <FeedbackCard />
        </Box>
      </Flex>
    </Box>
  )
}

export default LearnPage

export const cardImageFragment = graphql`
  fragment CardImageFragment on File {
    childImageSharp {
      gatsbyImageData(
        # width: 200
        height: 200
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query LearnPage {
    heroImage: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    whatIsEth: file(relativePath: { eq: "what-is-ethereum.png" }) {
      ...CardImageFragment
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      ...CardImageFragment
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      ...CardImageFragment
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      ...CardImageFragment
    }
    futureTransparent: file(relativePath: { eq: "future_transparent.png" }) {
      ...CardImageFragment
    }
    dogeComputer: file(relativePath: { eq: "doge-computer.png" }) {
      ...CardImageFragment
    }
    financeTransparent: file(relativePath: { eq: "finance_transparent.png" }) {
      ...CardImageFragment
    }
    stablecoins: file(relativePath: { eq: "stablecoins/hero.png" }) {
      ...CardImageFragment
    }
    infrastructureTransparent: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      ...CardImageFragment
    }
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      ...CardImageFragment
    }
    developersEthBlocks: file(
      relativePath: { eq: "developers-eth-blocks.png" }
    ) {
      ...CardImageFragment
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      ...CardImageFragment
    }
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      ...CardImageFragment
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      ...CardImageFragment
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      ...CardImageFragment
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      ...CardImageFragment
    }
    newRings: file(relativePath: { eq: "upgrades/newrings.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 265
          # height: 200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
