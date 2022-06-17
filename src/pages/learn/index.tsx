import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"

import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import FeedbackCard from "../../components/FeedbackCard"
import PageMetadata from "../../components/PageMetadata"
import ButtonLink from "../../components/ButtonLink"
import DocLink from "../../components/DocLink"

import { isLangRightToLeft } from "../../utils/translations"
import { Lang } from "../../utils/languages"
import type { Context } from "../../types"

import {
  Container,
  HeroBackground,
  HeroContainer,
  Hero,
  Page,
  InfoColumn,
  InfoTitle,
  ContentContainer,
  Card,
  Center,
  DocsContainer,
  AdditionalReadingHeader,
  Banner,
  BannerBody,
  BannerImage,
  CardGradient,
  Section,
  CardGrid,
} from "./styles"
import Link from "../../components/Link"

const LearnPage = ({ data }: PageProps<Queries.LearnPageQuery, Context>) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale as Lang)

  const tocItems = [
    {
      id: "what-is-crypto-ethereum",
      title: "What is crypto and Ethereum?",
    },
    {
      id: "how-do-i-use-ethereum",
      title: "How do I use Ethereum?",
    },
    {
      id: "what-is-ethereum-used-for",
      title: "What is Ethereum used for?",
    },
    {
      id: "strengthen-the-ethereum-network",
      title: "Strengthen the Ethereum network",
    },
    {
      id: "learn-about-ethereum-the-protocol",
      title: "Learn about Ethereum the protocol",
    },
    {
      id: "learn-about-the-ethereum-community",
      title: "Learn about the Ethereum community",
    },
  ]

  const heroContent = {
    title: "Learn Hub",
    header: "Learn about Ethereum",
    subtitle:
      "Your educational guide to the world of Ethereum. Learn how Ethereum works and how to connect to it. This page includes technical and non-technical articles, guides, and resources.",
    image: getImage(data.heroImage),
    alt: "", // TODO
    buttons: [
      {
        content: "Let's get started",
        pathId: tocItems[0].id,
      },
    ],
  }

  return (
    <Container>
      <PageMetadata title={"Learn Hub"} description={""} />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>
      </HeroBackground>

      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <InfoColumn>
          <InfoTitle>Learn Hub</InfoTitle>
          <StakingHomeTableOfContents items={tocItems} />
        </InfoColumn>

        <ContentContainer id="content">
          <Section>
            <h2 id={tocItems[0].id}>{tocItems[0].title}</h2>
            <p>
              You have probably heard a thing or two about cryptocurrencies,
              Bitcoin and blockchain, but do you know what those actually are
              and how they relate to Ethereum? And what is Ethereum anyway?{" "}
              <strong>
                Check out our introductory{" "}
                <Link to="/what-is-ethereum/">What is Ethereum</Link> page.
              </strong>
            </p>
            <p>
              Not only that Ethereum can do what Bitcoin does (transfer money
              globally), it’s capable of a lot more – people can actually deploy
              code onto the network. Because it’s so flexible, any kind of
              computer application can be launched on Ethereum.
            </p>
            <CardGrid>
              <Card
                title="What is Ethereum?"
                description="If you are new, start here and learn the basics of what
              crypto and Ethereum are and why they matter."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.whatIsEth)} />
                  </Center>
                  <ButtonLink to="/what-is-ethereum/">
                    What is Ethereum?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="What is ETH?"
                description="The currency of Ethereum network is called Ether or ETH."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.eth)} />
                  </Center>
                  <ButtonLink to="/eth">What is ETH?</ButtonLink>
                </>
              </Card>
              <Card
                title="Where to get ETH?"
                description="There are many ways how to get ETH depending on your
              location."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.impact)} />
                  </Center>
                  <ButtonLink to="/">Where to get ETH?</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/smart-contracts">What are Smart Contracts?</DocLink>
              <DocLink to="/">A technical introduction to Ethereum</DocLink>
              <DocLink to="/">What is Web3?</DocLink>
              <DocLink to="/">Decentralizing Everything</DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[1].id}>{tocItems[1].title}</h2>
            <p>
              It’s actually quite simple once you get the hang of it. You need
              an application that is commonly called a “wallet”. Its an app that
              helps you store you funds and to authenticate/interact with
              applications on Ethereum.
            </p>
            <CardGrid>
              <Card
                title="What is a wallet?"
                description="How you manage your ETH and your Ethereum account."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.wallet)} />
                  </Center>
                  <ButtonLink to="/wallets">What is a wallet?</ButtonLink>
                </>
              </Card>
              <Card
                title="List of wallets"
                description="We will help you find the right wallet for you."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.futureTransparent)} />
                  </Center>
                  <ButtonLink to="/wallets">List of wallets</ButtonLink>
                </>
              </Card>
              <Card
                title="Crypto security 101"
                description="Learn how to identify scams and see the list of most common tricks."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.dogeComputer)} />
                  </Center>
                  <ButtonLink to="/security">Crypto security 101</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <Banner>
              <BannerBody>
                <h3>Things to consider</h3>
                <ul>
                  <li>
                    Each Ethereum transaction requires a fee in form of ETH,
                    even if you need to move different tokens built on Ethereum
                    like USDC or DAI.
                  </li>
                  <li>
                    Fees can be high depending on the demand so we reccomend
                    using <Link to="/layer-2">Layer 2s</Link>.
                  </li>
                  <li>
                    There are options for custodial and non custodial wallets.
                  </li>
                </ul>
              </BannerBody>
              <BannerImage>
                <GatsbyImage image={getImage(data.newRings)} />
              </BannerImage>
            </Banner>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/">Ethereum & wallet support</DocLink>
              <DocLink to="/">Layer 2 - reducing transaction cost</DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[2].id}>{tocItems[2].title}</h2>
            <p>
              Ethereum has led to the creation of new products and services that
              can improve different areas of our lives. We're still in the early
              stages but there's a lot to be excited about.
            </p>
            <CardGrid>
              <Card
                title="Decentralised Finance"
                description="Explore an alternative financial system that is built without banks and is open to anyone."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.financeTransparent)} />
                  </Center>
                  <ButtonLink>What is DEFI?</ButtonLink>
                </>
              </Card>
              <Card
                title="Stablecoins"
                description="Stablecoins are cryptocurrencies designed to stay at a fixed value of a dollar."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.stablecoins)} />
                  </Center>
                  <ButtonLink>What are stablecoins?</ButtonLink>
                </>
              </Card>
              <Card
                title="Non Fungible Tokens"
                description="Non fungible tokens represent ownership of unique items."
              >
                <>
                  <Center>
                    <GatsbyImage
                      image={getImage(data.infrastructureTransparent)}
                    />
                  </Center>
                  <ButtonLink>What are NFTs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralized autonomous organizations"
                description="Organizations that run without the need for coordination by a central entity."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.dao)} />
                  </Center>
                  <ButtonLink>What are DAOs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralised applications"
                description="Are creating a new digital economy of peer-to-peer services."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.developersEthBlocks)} />
                  </Center>
                  <ButtonLink>Explore dApps</ButtonLink>
                </>
              </Card>
              <CardGradient
                title="Emerging usecases"
                description="There are also other prominent industries being disrupted by blockchain:"
              >
                <ul>
                  <li>
                    <Link to="https://future.com/what-is-decentralized-science-aka-desci/">
                      Decentralised Science (Desci)
                    </Link>
                  </li>
                  <li>
                    <Link to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      Play-to-earn Games (GameFI)
                    </Link>
                  </li>
                  <li>
                    <Link to="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                      Fundraising via Quadratic Funding
                    </Link>
                  </li>
                  <li>
                    <Link to="https://hbr.org/2022/01/how-walmart-canada-uses-blockchain-to-solve-supply-chain-challenges">
                      Supply chain management
                    </Link>
                  </li>
                  <li>
                    <Link to="https://tykn.tech/self-sovereign-identity/">
                      Self-sovereign identity
                    </Link>
                  </li>
                </ul>
              </CardGradient>
            </CardGrid>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/">Blockchain in developing countries</DocLink>
              <DocLink to="/">Ethereum developer resurces</DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[3].id}>{tocItems[3].title}</h2>
            <p>
              You can help secure Ethereum and earn rewards at the same time on
              your ETH by staking it. There are several methods of staking
              depending on your technical knowledge and the amount of ETH.
            </p>
            <CardGrid>
              <Card
                title="Staking Ethereum"
                description="Learn about different ways how to earn rewards by staking ETH."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.rhino)} />
                  </Center>
                  <ButtonLink>Start staking</ButtonLink>
                </>
              </Card>
              <Card
                title="Run a node"
                description="Run a node to play a crucial part in the Ethereum network."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.ethereumInside)} />
                  </Center>
                  <ButtonLink>Run a node</ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2 id={tocItems[4].id}>{tocItems[4].title}</h2>
            <p>
              For users most interested in the technical part of the Ethereum
              network.
            </p>
            <CardGrid>
              <Card
                title="Energy Consumption"
                description="How much energy does it cost to run Ethereum network?"
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.hackathon)} />
                  </Center>
                  <ButtonLink>Is Ethereum green?</ButtonLink>
                </>
              </Card>
              <Card
                title="Ethereum Upgrades"
                description="How are we going to make Ethereum more scalable, secure, and sustainable?"
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.merge)} />
                  </Center>
                  <ButtonLink>Read more</ButtonLink>
                </>
              </Card>
              <Card
                title="Ethereum Whitepaper"
                description="The original Ethereum proposal written by Vitalik Buterin in 2014."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.financeTransparent)} />
                  </Center>
                  <ButtonLink>Read whitepaper</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              More about Ethereum protocol
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/">Intro to Ethereum for Developers</DocLink>
              <DocLink to="/">Ethereum Improvement Proposals</DocLink>
              <DocLink to="/">Ethereum History</DocLink>
              <DocLink to="/">Governance</DocLink>
              <DocLink to="/">Bridges</DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[5].id}>{tocItems[5].title}</h2>
            <p>For users most interested in Ethereum protocol itself.</p>
            <CardGrid>
              <Card
                title="Community hub"
                description="Our community includes people from all backgrounds."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.enterprise)} />
                  </Center>
                  <ButtonLink>Explore more</ButtonLink>
                </>
              </Card>
              <Card
                title="How can I get involved?"
                description="There are technical and non-technical ways how to be part of the community."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.dogeComputer)} />
                  </Center>
                  <ButtonLink>How can I get Involved?</ButtonLink>
                </>
              </Card>
              <Card
                title="Online communities"
                description="These provide great opportunity to ask more specific questions or get involved."
              >
                <>
                  <Center>
                    <GatsbyImage image={getImage(data.impact)} />
                  </Center>
                  <ButtonLink>Explore communities</ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2>Books and podcasts</h2>
          </Section>

          <FeedbackCard />
        </ContentContainer>
      </Page>
    </Container>
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
