// Libraries
import React from "react"
import {
  Box,
  Center,
  Flex,
  Grid,
  HeadingProps,
  ListItem,
  Show,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

// Components
import ButtonLink from "../../components/Buttons/ButtonLink"
import DocLink from "../../components/DocLink"
import FeedbackCard from "../../components/FeedbackCard"
import InlineLink from "../../components/Link"
import OriginalCard, {
  IProps as IOriginalCardProps,
} from "../../components/Card"
import { HubHero, type HubHeroProps } from "../../components/Hero"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import UpgradeTableOfContents from "../../components/UpgradeTableOfContents"
import Text from "../../components/OldText"
import OldHeading from "../../components/OldHeading"
import GatsbyImage from "../../components/GatsbyImage"
import LeftNavBar from "../../components/LeftNavBar"
import { ContentContainer } from "../../templates/use-cases"

// Utils
import { Lang } from "../../utils/languages"
import { isLangRightToLeft } from "../../utils/translations"
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
    <OldHeading
      as="h3"
      mt={16}
      fontSize="xl"
      fontWeight="bold"
      textAlign="center"
    >
      {children}
    </OldHeading>
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
    <OldHeading
      fontSize={{ base: "2xl", md: "2rem" }}
      lineHeight={1.4}
      {...props}
    >
      {children}
    </OldHeading>
  )
}

const H3 = ({ children, ...props }: HeadingProps) => {
  return (
    <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }} {...props}>
      {children}
    </OldHeading>
  )
}

const LearnPage = ({ data }: PageProps<Queries.LearnPageQuery, Context>) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const isRightToLeft = isLangRightToLeft(language as Lang)
  const lgBp = useToken("breakpoints", "lg")

  const tocItems = [
    {
      id: "what-is-crypto-ethereum",
      title: t("toc-what-is-crypto-ethereum"),
    },
    {
      id: "how-do-i-use-ethereum",
      title: t("toc-how-do-i-use-ethereum"),
    },
    {
      id: "what-is-ethereum-used-for",
      title: t("toc-what-is-ethereum-used-for"),
    },
    {
      id: "strengthen-the-ethereum-network",
      title: t("toc-strengthen-the-ethereum-network"),
    },
    {
      id: "learn-about-the-ethereum-protocol",
      title: t("toc-learn-about-the-ethereum-protocol"),
    },
    {
      id: "learn-about-the-ethereum-community",
      title: t("toc-learn-about-the-ethereum-community"),
    },
    {
      id: "books-and-podcasts",
      title: t("toc-books-and-podcasts"),
    },
  ]

  const heroContent: HubHeroProps = {
    title: t("learn-hub"),
    header: t("hero-header"),
    description: t("hero-subtitle"),
    heroImgSrc: getImage(data.heroImage)!,
    buttons: [
      {
        content: t("hero-button-lets-get-started"),
        toId: tocItems[0].id,
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
    ],
  }

  return (
    <Box position="relative" w="full">
      <PageMetadata title={t("learn-hub")} description={t("hero-subtitle")} />

      <HubHero {...heroContent} />

      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        w="full"
        mb={16}
        mx="auto"
        pt={{ base: "10", lg: "16" }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar tocItems={tocItems} hideBelow={lgBp} />

        <ContentContainer id="content">
          <Section>
            <H2 mt={{ lg: 0 }} id={tocItems[0].id}>
              {tocItems[0].title}
            </H2>
            <Text>
              <Translation id="what-is-crypto-2" />
            </Text>
            <CardGrid>
              <Card
                title={t("what-is-ethereum-card-title")}
                description={t("what-is-ethereum-card-description")}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.whatIsEth)!}
                      alt={t("what-is-ethereum-card-image-alt")}
                    />
                  </CardImage>
                  <ButtonLink to="/what-is-ethereum/">
                    <Translation id="what-is-ethereum-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={t("what-is-eth-card-title")}
                description={t("what-is-eth-description")}
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
                title={t("what-is-web3-card-title")}
                description={t("what-is-web3-card-description")}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.impact)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/web3/">
                    <Translation id="what-is-web3-card-title" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              <Translation id="additional-reading-more-on-ethereum-basics" />
            </AdditionalReadingHeader>

            <DocsContainer>
              <DocLink to="/guides/">
                <Translation id="guides-hub-desc" />
              </DocLink>
              <DocLink to="/quizzes/">
                <Translation id="quiz-hub-desc" />
              </DocLink>
              <DocLink to="/smart-contracts/">
                <Translation id="additional-reading-what-are-smart-contracts" />
              </DocLink>
              <DocLink
                to="https://www.youtube.com/watch?v=UihMqcj-cqc"
                isExternal
              >
                <Translation id="additional-reading-ethereum-in-thirty-minutes" />
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
                title={t("what-is-a-wallet-card-title")}
                description={t("what-is-a-wallet-card-description")}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.wallet)!}
                      alt={t("what-is-a-wallet-card-alt")}
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/">
                    <Translation id="what-is-a-wallet-card-title" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={t("find-a-wallet-card-title")}
                description={t("find-a-wallet-card-description")}
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
                title={t("crypto-security-basics-card-title")}
                description={t("crypto-security-basics-card-description")}
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
                    <InlineLink to="/layer-2/">
                      <Translation id="things-to-consider-banner-layer-2" />
                    </InlineLink>
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
              <DocLink to="/guides/how-to-create-an-ethereum-account/">
                <Translation id="additional-reading-how-to-create-an-ethereum-account" />
              </DocLink>
              <DocLink to="/guides/how-to-use-a-wallet/">
                <Translation id="additional-reading-how-to-use-a-wallet" />
              </DocLink>
              <DocLink to="/layer-2/">
                <Translation id="additional-reading-layer-2" />
              </DocLink>
              <DocLink to="/get-eth/">
                <Translation id="additional-reading-get-eth" />
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
                title={t("defi-card-title")}
                description={t("defi-card-description")}
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
                title={t("stablecoins-card-title")}
                description={t("stablecoins-card-description")}
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
                title={t("nft-card-title")}
                description={t("nft-card-description")}
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
                title={t("dao-card-title")}
                description={t("dao-card-description")}
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
                title={t("dapp-card-title")}
                description={t("dapp-card-description")}
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
                title={t("emerging-use-cases-title")}
                description={t("emerging-use-cases-description")}
              >
                <UnorderedList
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mb={0}
                >
                  <ListItem>
                    <InlineLink to="/decentralized-identity/">
                      <Translation id="decentralized-identity" />
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink to="/social-networks/">
                      <Translation id="decentralized-social-networks" />
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink to="/desci/">
                      <Translation id="decentralized-science" />
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      <Translation id="play-to-earn" />
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink to="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                      <Translation id="fundraising-through-quadratic-funding" />
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink to="https://hbr.org/2022/01/how-walmart-canada-uses-blockchain-to-solve-supply-chain-challenges">
                      <Translation id="supply-chain-management" />
                    </InlineLink>
                  </ListItem>
                </UnorderedList>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <H2 id={tocItems[3].id}>{tocItems[3].title}</H2>
            <Text>
              <Translation id="strengthening-the-ethereum-network-description" />
            </Text>
            <CardGrid>
              <Card
                title={t("staking-ethereum-card-title")}
                description={t("staking-ethereum-card-description")}
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
                title={t("run-a-node-card-title")}
                description={t("run-a-node-card-description")}
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
                title={t("energy-consumption-card-title")}
                description={t("energy-consumption-card-description")}
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
                title={t("ethereum-upgrades-card-title")}
                description={t("ethereum-upgrades-card-description")}
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.merge)!} alt="" />
                  </CardImage>
                  <ButtonLink to="/roadmap/">
                    <Translation id="ethereum-upgrades-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={t("ethereum-whitepaper-card-title")}
                description={t("ethereum-whitepaper-card-description")}
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
              <DocLink to="/developers/docs/consensus-mechanisms">
                <Translation id="more-on-ethereum-protocol-consensus" />
              </DocLink>
              <DocLink to="/developers/docs/evm/">
                <Translation id="more-on-ethereum-protocol-evm" />
              </DocLink>
              <DocLink to="/developers/docs/nodes-and-clients/">
                <Translation id="more-on-ethereum-protocol-nodes-and-clients" />
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
                title={t("community-hub-card-title")}
                description={t("community-hub-card-description")}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.enterprise)!}
                      alt={t("community-hub-card-alt")}
                    />
                  </CardImage>
                  <ButtonLink to="/community/">
                    <Translation id="community-hub-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <Card
                title={t("get-involved-card-title")}
                description={t("get-involved-card-description")}
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
                title={t("online-communities-card-title")}
                description={t("online-communities-card-description")}
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
                  <InlineLink to="https://www.goodreads.com/book/show/57356067-the-cryptopians">
                    <Translation id="cryptopians-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="cryptopians-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                    <Translation id="out-of-the-ether-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="out-of-the-ether-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                    <Translation id="the-infinite-machine-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="the-infinite-machine-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://github.com/ethereumbook/ethereumbook">
                    <Translation id="mastering-ethereum-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="mastering-ethereum-description" />{" "}
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://www.goodreads.com/en/book/show/59892281-proof-of-stake">
                    <Translation id="proof-of-stake-title" />
                  </InlineLink>{" "}
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
                  <InlineLink to="https://www.youtube.com/@Green_Pill_Podcast">
                    <Translation id="green-pill-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="green-pill-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://www.zeroknowledge.fm/">
                    <Translation id="zeroknowledge-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="zeroknowledge-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://unchainedpodcast.com/">
                    <Translation id="unchained-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="unchained-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="https://www.youtube.com/@TheDailyGwei/">
                    <Translation id="the-daily-gwei-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="the-daily-gwei-description" />
                  </Text>
                </ListItem>
                <ListItem>
                  <InlineLink to="http://podcast.banklesshq.com/">
                    <Translation id="bankless-title" />
                  </InlineLink>{" "}
                  <Text as="i">
                    <Translation id="bankless-description" />
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </Section>

          <FeedbackCard />
        </ContentContainer>
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
  query LearnPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-learn", "common"] }
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
    heroImage: file(relativePath: { eq: "heroes/learn-hub-hero.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1504
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
