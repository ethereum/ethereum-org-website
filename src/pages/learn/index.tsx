import React from "react"
import styled from "styled-components"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"

import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import { CardGrid as OriginalCardGrid } from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"
import PageMetadata from "../../components/PageMetadata"
import ButtonLink from "../../components/ButtonLink"
import DocLink from "../../components/DocLink"
import Link from "../../components/Link"
import PageHero from "../../components/PageHero"
import OriginalCard from "../../components/Card"

import { isLangRightToLeft } from "../../utils/translations"
import { Lang } from "../../utils/languages"
import type { Context } from "../../types"

const Container = styled.div`
  position: relative;
  width: 100%;
`

const HeroBackground = styled.div`
  background: ${(props) => props.theme.colors.layer2Gradient};
`

const HeroContainer = styled.div``

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
    display: none;
  }
`

const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.l}) {
    h2:first-of-type {
      margin-top: 0;
    }
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`
const Card = styled(OriginalCard)`
  justify-content: space-between;
  h3 {
    margin-top: 0;
  }
`

const CardGradient = styled(Card)`
  justify-content: start;
  background: ${(props) => props.theme.colors.cardGradient};

  ul {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-bottom: 0;
  }
`

const CardImage = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const DocsContainer = styled.div`
  margin: 0 9rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    margin: 0;
  }
`

const AdditionalReadingHeader = styled.h3`
  margin-top: 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`

const Banner = styled.div`
  margin: 3rem 0;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.cardGradient};

  h3 {
    margin-top: 0;
  }

  ul {
    margin-bottom: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-flow: column nowrap;
  }
`

const BannerBody = styled.div`
  padding: 3rem;
`

const BannerImage = styled.div`
  align-self: end;
`

const Section = styled.section`
  margin-top: 6rem;
  &:first-child {
    margin-top: 0;
  }
`

const CardGrid = styled(OriginalCardGrid)`
  margin-top: 2rem;
`

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
    alt: "Illustration of a group of people marvelling at an ether (ETH) glyph in awe.",
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
              Bitcoin, and blockchain, but do you know what those actually are
              and how they relate to Ethereum? And what is Ethereum anyway?{" "}
              <strong>
                Check out our introductory{" "}
                <Link to="/what-is-ethereum/">What is Ethereum</Link> page.
              </strong>
            </p>
            <p>
              Not only can Ethereum do what Bitcoin does (transfer money
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
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.whatIsEth)}
                      alt="Illustration of a person peering into a bazaar, meant to represent Ethereum.1"
                    />
                  </CardImage>
                  <ButtonLink to="/what-is-ethereum/">
                    What is Ethereum?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="What is ETH?"
                description="The currency of Ethereum network is called ether or ETH."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.eth)}
                      alt="Illustration of a group of people marvelling at an ether (ETH) glyph in awe."
                    />
                  </CardImage>
                  <ButtonLink to="/eth/">What is ETH?</ButtonLink>
                </>
              </Card>
              <Card
                title="Where can I get ETH?"
                description="There are many ways how to get ETH depending on your
              location."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.impact)}
                      alt="Illustration of hands offering an ETH symbol."
                    />
                  </CardImage>
                  <ButtonLink to="/get-eth/">Where can I get ETH?</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/smart-contracts/">
                What are Smart Contracts?
              </DocLink>
              <DocLink to="/developers/docs/">
                A technical introduction to Ethereum
              </DocLink>
              <DocLink to="/web3/">What is Web3?</DocLink>
              <DocLink
                to="https://www.youtube.com/watch?v=WSN5BaCzsbo"
                isExternal
              >
                Decentralizing Everything
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[1].id}>{tocItems[1].title}</h2>
            <p>
              It’s actually quite simple once you get the hang of it. You need
              an application that is commonly called a “wallet”. It's an app
              that helps you store your funds and to authenticate/interact with
              applications on Ethereum.
            </p>
            <CardGrid>
              <Card
                title="What is a wallet?"
                description="How you manage your ETH and your Ethereum account."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.wallet)}
                      alt="Illustration of a robot."
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/">What is a wallet?</ButtonLink>
                </>
              </Card>
              <Card
                title="Find a wallet"
                description="We will help you find the right wallet."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.futureTransparent)}
                      alt="Illustration of a futuristic computer set up, powered by Ethereum crystals."
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/find-wallet/">
                    List of wallets
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Crypto security 101"
                description="Learn how to identify scams and see the list of most common tricks."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.dogeComputer)}
                      alt="Doge using dapps"
                    />
                  </CardImage>
                  <ButtonLink to="/security/">Crypto security 101</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <Banner>
              <BannerBody>
                <h3>Things to consider when using Ethereum</h3>
                <ul>
                  <li>
                    Each Ethereum transaction requires a fee in the form of ETH,
                    even if you need to move different tokens built on Ethereum
                    like USDC or DAI.
                  </li>
                  <li>
                    Fees can be high depending on the demand so we recommend
                    using <Link to="/layer-2/">Layer 2s</Link>.
                  </li>
                  <li>
                    There are options for custodial and non-custodial wallets.
                  </li>
                </ul>
              </BannerBody>
              <BannerImage>
                <GatsbyImage
                  image={getImage(data.newRings)}
                  alt="Illustration of a person building a futuristic machine"
                />
              </BannerImage>
            </Banner>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/community/support/">
                Ethereum & wallet support
              </DocLink>
              <DocLink to="/layer-2/">
                Layer 2 - reducing transaction cost
              </DocLink>
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
                title="Decentralized Finance"
                description="Explore an alternative financial system that is built without banks and is open to anyone."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)}
                      alt="An Ethereum logo made of lego bricks."
                    />
                  </CardImage>
                  <ButtonLink to="/defi/">What is DEFI?</ButtonLink>
                </>
              </Card>
              <Card
                title="Stablecoins"
                description="Stablecoins are cryptocurrencies designed to stay at a fixed value of a dollar."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.stablecoins)}
                      alt="The three biggest stablecoins by market cap: Dai, USDC, and Tether."
                    />
                  </CardImage>
                  <ButtonLink to="/stablecoins/">
                    What are stablecoins?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Non-fungible tokens"
                description="Non-fungible tokens represent ownership of unique items."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.infrastructureTransparent)}
                      alt="Illustration of a futuristic computer/device."
                    />
                  </CardImage>
                  <ButtonLink to="/nft/">What are NFTs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralized autonomous organizations"
                description="Organizations that run without the need for coordination by a central entity."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.dao)}
                      alt="A representation of a DAO voting on a proposal."
                    />
                  </CardImage>
                  <ButtonLink to="/dao/">What are DAOs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralized applications"
                description="Are creating a new digital economy of peer-to-peer services."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.developersEthBlocks)}
                      alt="Illustration of a hand building an ETH symbol out of lego bricks."
                    />
                  </CardImage>
                  <ButtonLink to="/dapps/">Explore dapps</ButtonLink>
                </>
              </Card>
              <CardGradient
                title="Emerging use cases"
                description="There are also other prominent industries being disrupted by blockchain:"
              >
                <ul>
                  <li>
                    <Link to="/decentralized-identity/">
                      Self-sovereign identity
                    </Link>
                  </li>
                  <li>
                    <Link to="/social-networks/">
                      Decentralized social networks
                    </Link>
                  </li>
                  <li>
                    <Link to="https://future.com/what-is-decentralized-science-aka-desci/">
                      Decentralised Science (DeSci)
                    </Link>
                  </li>
                  <li>
                    <Link to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      Play-to-earn games (GameFI)
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
                </ul>
              </CardGradient>
            </CardGrid>

            <AdditionalReadingHeader>
              Additional reading on Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink
                to="http://governance40.com/wp-content/uploads/2019/06/Blockchain-in-Developing-Countries.pdf"
                isExternal
              >
                Blockchain in developing countries
              </DocLink>
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
                description="Learn about different ways to earn rewards by staking ETH."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.rhino)}
                      alt="Image of the Rhino mascot for the staking launchpad."
                    />
                  </CardImage>
                  <ButtonLink to="/staking/">Start staking</ButtonLink>
                </>
              </Card>
              <Card
                title="Run a node"
                description="Run a node to play a crucial part in the Ethereum network."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.ethereumInside)}
                      alt="Graphic of node"
                    />
                  </CardImage>
                  <ButtonLink to="/run-a-node/">Run a node</ButtonLink>
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
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.hackathon)}
                      alt="Illustration of a person working on a computer."
                    />
                  </CardImage>
                  <ButtonLink to="/energy-consumption/">
                    Is Ethereum green?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Ethereum upgrades"
                description="How are we going to make Ethereum more scalable, secure, and sustainable?"
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.merge)}
                      alt="Illustration of a spaceship representing the increased power after Ethereum upgrades."
                    />
                  </CardImage>
                  <ButtonLink to="/upgrades/">Read more</ButtonLink>
                </>
              </Card>
              <Card
                title="Ethereum Whitepaper"
                description="The original Ethereum proposal written by Vitalik Buterin in 2014."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)}
                      alt="An Ethereum logo made of lego bricks."
                    />
                  </CardImage>
                  <ButtonLink to="/whitepaper/">Read whitepaper</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              More about Ethereum protocol
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/developers/">
                Intro to Ethereum for Developers
              </DocLink>
              <DocLink to="/eips/">Ethereum Improvement Proposals</DocLink>
              <DocLink to="/history/">Ethereum History</DocLink>
              <DocLink to="/governance/">Governance</DocLink>
              <DocLink to="/bridges/">Bridges</DocLink>
              <DocLink to="https://weekinethereumnews.com/" isExternal>
                Week in Ethereum News
              </DocLink>
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
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.enterprise)}
                      alt="Illustration of a group of builders working together."
                    />
                  </CardImage>
                  <ButtonLink to="/community/">Explore more</ButtonLink>
                </>
              </Card>
              <Card
                title="How can I get involved?"
                description="There are technical and non-technical ways to be part of the community."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.dogeComputer)}
                      alt="Doge using dapps"
                    />
                  </CardImage>
                  <ButtonLink to="/community/get-involved/">
                    How can I get Involved?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Online communities"
                description="Online communities provide a great opportunity to ask more specific questions or get involved."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.impact)}
                      alt="Illustration of hands offering an ETH symbol."
                    />
                  </CardImage>
                  <ButtonLink to="/community/online/">
                    Explore communities
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2>Books and podcasts</h2>
            <div>
              <p>Books on Ethereum and Cryptocurrencies:</p>
              <ul>
                <li>
                  <Link to="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                    Out of the Ether: The Amazing Story of Ethereum and the $55
                    Million Heist that Almost Destroyed It All
                  </Link>{" "}
                  <em>September 29, 2020 - Matthew Leising</em>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                    The Infinite Machine: How an Army of Crypto-hackers Is
                    Building the Next Internet with Ethereum
                  </Link>{" "}
                  <em>July 14, 2020 - Camila Russo</em>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/22174460-the-age-of-cryptocurrency">
                    The Age of Cryptocurrency: How Bitcoin and the Blockchain
                    Are Challenging the Global Economic Order
                  </Link>{" "}
                  <em>January 12, 2016 - Paul Vigna, Michael J. Casey</em>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/34964890-the-truth-machine">
                    The Truth Machine: The Blockchain and the Future of
                    Everything
                  </Link>{" "}
                  <em>February 27, 2018 - Paul Vigna, Michael J. Casey</em>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/book/show/23546676-digital-gold">
                    Digital Gold: Bitcoin and the Inside Story of the Misfits
                    and Millionaires Trying to Reinvent Money
                  </Link>{" "}
                  <em>May 24, 2021 - Nathaniel Popper</em>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/56274031-kings-of-crypto">
                    Kings of Crypto: One Startup&#39;s Quest to Take
                    Cryptocurrency Out of Silicon Valley and Onto Wall Street
                  </Link>{" "}
                  <em>December 15, 2020 - Jeff John Roberts</em>
                </li>
                <li>
                  <Link to="https://github.com/ethereumbook/ethereumbook">
                    Mastering Ethereum
                  </Link>{" "}
                  <em>
                    December 23, 2018 – Andreas M. Antonopoulos, Gavin Wood
                    Ph.D.{" "}
                  </em>
                </li>
              </ul>
              <p>Podcasts addressing Ethereum and Cryptocurrencies:</p>
              <ul>
                <li>
                  <Link to="https://podcast.ethhub.io/">Into the Ether</Link>{" "}
                  <em>A podcast focusing on all things Ethereum and DeFi</em>
                </li>
                <li>
                  <Link to="http://podcast.banklesshq.com/">Bankless</Link>{" "}
                  <em>A guide to Crypto finance</em>
                </li>
                <li>
                  <Link to="https://uncommoncore.co/podcast/">
                    Uncommon Core
                  </Link>{" "}
                  <em>
                    Explores the transformative nature of trust-minimized
                    currency and financial services
                  </em>
                </li>
                <li>
                  <Link to="https://www.zeroknowledge.fm/">Zero Knowledge</Link>{" "}
                  <em>
                    Goes deep into the tech that will power the emerging
                    decentralised web and the community building this
                  </em>
                </li>
                <li>
                  <Link to="https://epicenter.tv/">Epicenter</Link>{" "}
                  <em>
                    Explores the technical, economic, and social implications of
                    the Crypto industry
                  </em>
                </li>
                <li>
                  <Link to="https://unchainedpodcast.com/">Unchained</Link>{" "}
                  <em>
                    dives deep into the people building the decentralized
                    internet, the details of this technology that could underpin
                    our future, and some of the thorniest topics in crypto, such
                    as regulation, security and privacy
                  </em>
                </li>
              </ul>
            </div>
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
