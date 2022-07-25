import React from "react"
import styled from "styled-components"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"

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
    {
      id: "books-and-podcasts",
      title: "Books and podcasts",
    },
  ]

  const heroContent = {
    title: "Learn Hub",
    header: "Learn about Ethereum",
    subtitle:
      "Your educational guide to the world of Ethereum. Learn how Ethereum works and how to connect to it. This page includes technical and non-technical articles, guides, and resources.",
    image: getImage(data.heroImage),
    alt: "",
    buttons: [
      {
        content: "Let's get started",
        toId: tocItems[0].id,
      },
    ],
  }

  return (
    <Container>
      <PageMetadata title={"Learn hub"} description={""} />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>
      </HeroBackground>

      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <InfoColumn>
          <InfoTitle>Learn hub</InfoTitle>
          <StakingHomeTableOfContents items={tocItems} />
        </InfoColumn>

        <ContentContainer id="content">
          <Section>
            <h2 id={tocItems[0].id}>{tocItems[0].title}</h2>
            <p>
              You have probably heard a thing or two about cryptocurrencies,
              Bitcoin, and blockchain, but do you know what those actually are
              and how they relate to Ethereum?{" "}
              <Link to="/what-is-ethereum/">And what is Ethereum anyway?</Link>
            </p>
            <p>
              Not only can Ethereum do what Bitcoin does (transfer money
              globally), it’s capable of much more – anyone can deploy code onto
              the network. And because it’s so flexible, any computer program
              can run on Ethereum.
            </p>
            <CardGrid>
              <Card
                title="What is Ethereum?"
                description="If you are new, start here to learn the basics of crypto and why Ethereum matters."
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
                description="Ether (ETH) is the currency powering the Ethereum network and apps."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.eth)} alt="" />
                  </CardImage>
                  <ButtonLink to="/eth/">What is ETH?</ButtonLink>
                </>
              </Card>
              <Card
                title="Where can I get ETH?"
                description="There are many ways to get ETH, depending on your location."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.impact)} alt="" />
                  </CardImage>
                  <ButtonLink to="/get-eth/">Where can I get ETH?</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              More on Ethereum basics
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/smart-contracts/">
                What are smart contracts?
              </DocLink>
              <DocLink to="/developers/docs/intro-to-ethereum/">
                A developers' introduction to Ethereum
              </DocLink>
              <DocLink to="/web3/">What is web3?</DocLink>
              <DocLink
                to="https://www.youtube.com/watch?v=WSN5BaCzsbo"
                isExternal
              >
                Decentralizing everything
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[1].id}>{tocItems[1].title}</h2>
            <p>
              Using Ethereum is relatively straightforward once you get the hang
              of it. First, you need to download a "wallet". A wallet is an app
              that helps you store your crypto and interact with applications on
              Ethereum.
            </p>
            <CardGrid>
              <Card
                title="What is a wallet?"
                description="Wallets let you manage your ETH and Ethereum applications."
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
                description="We'll help you find the best wallet based on the features that matter to you."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.futureTransparent)}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/wallets/find-wallet/">
                    List of wallets
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Crypto security basics"
                description="Learn how to identify scams and how to avoid the most common tricks."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dogeComputer)} alt="" />
                  </CardImage>
                  <ButtonLink to="/security/">Stay secure</ButtonLink>
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
                    like the stablecoins USDC or DAI.
                  </li>
                  <li>
                    Fees can be high depending on the number of people trying to
                    use Ethereum, so we recommend using{" "}
                    <Link to="/layer-2/">Layer 2s</Link>.
                  </li>
                </ul>
              </BannerBody>
              <BannerImage>
                <GatsbyImage image={getImage(data.newRings)} alt="" />
              </BannerImage>
            </Banner>

            <AdditionalReadingHeader>
              More on using Ethereum
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/community/support/">
                Support for Ethereum and wallets
              </DocLink>
              <DocLink to="/layer-2/">
                Layer 2: reducing transaction fees
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
                title="Decentralized finance (DeFi)"
                description="Explore an alternative financial system that is built without banks and is open to anyone."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/defi/">What is DeFi?</ButtonLink>
                </>
              </Card>
              <Card
                title="Stablecoins"
                description="Stablecoins are cryptocurrencies designed to stay at a fixed value of a dollar."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.stablecoins)} alt="" />
                  </CardImage>
                  <ButtonLink to="/stablecoins/">
                    What are stablecoins?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Non-fungible tokens (NFTs)"
                description="Non-fungible tokens represent ownership of unique items."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.infrastructureTransparent)}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/nft/">What are NFTs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralized autonomous organizations (DAOs)"
                description="DAOs run without the need for coordination by a central entity."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dao)} alt="" />
                  </CardImage>
                  <ButtonLink to="/dao/">What are DAOs?</ButtonLink>
                </>
              </Card>
              <Card
                title="Decentralized applications (dapps)"
                description="Dapps are creating a new digital economy of peer-to-peer services."
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.developersEthBlocks)}
                      alt=""
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
                      Decentralized identity
                    </Link>
                  </li>
                  <li>
                    <Link to="/social-networks/">
                      Decentralized social networks
                    </Link>
                  </li>
                  <li>
                    <Link to="https://future.com/what-is-decentralized-science-aka-desci/">
                      Decentralized Science (DeSci)
                    </Link>
                  </li>
                  <li>
                    <Link to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      Play-to-earn games (P2E)
                    </Link>
                  </li>
                  <li>
                    <Link to="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                      Fundraising through Quadratic Funding
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
              More on Ethereum use cases
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
              your ETH by staking it. There are different options for staking
              depending on your technical knowledge and how much ETH you have.
            </p>
            <CardGrid>
              <Card
                title="Staking Ethereum"
                description="Learn how to start staking your ETH."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.rhino)} alt="" />
                  </CardImage>
                  <ButtonLink to="/staking/">Start staking</ButtonLink>
                </>
              </Card>
              <Card
                title="Run a node"
                description="Play a critical role in the Ethereum network by running a node."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.ethereumInside)} alt="" />
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
                title="Energy consumption"
                description="How much energy does Ethereum use?"
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.hackathon)} alt="" />
                  </CardImage>
                  <ButtonLink to="/energy-consumption/">
                    Is Ethereum green?
                  </ButtonLink>
                </>
              </Card>
              <Card
                title="Ethereum upgrades"
                description="Ethereum upgrades make it more scalable, secure, and sustainable."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.merge)} alt="" />
                  </CardImage>
                  <ButtonLink to="/upgrades/">Explore upgrades</ButtonLink>
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
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/whitepaper/">Read whitepaper</ButtonLink>
                </>
              </Card>
            </CardGrid>

            <AdditionalReadingHeader>
              More on the Ethereum protocol
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/developers/">Ethereum for developers</DocLink>
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
            <p>
              The success of Ethereum is thanks to its incredibly dedicated
              community. Thousands of inspiring and driven people help push
              Ethereum’s vision forward. Come and join us!
            </p>
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
                description="You don't need to be technical to get involved in the Ethereum community."
              >
                <>
                  <CardImage>
                    <GatsbyImage image={getImage(data.dogeComputer)} alt="" />
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
                    <GatsbyImage image={getImage(data.impact)} alt="" />
                  </CardImage>
                  <ButtonLink to="/community/online/">
                    Explore communities
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2 id={tocItems[6].id}>{tocItems[6].title}</h2>
            <div>
              <h3>Books about Ethereum and Cryptocurrencies</h3>
              <ul>
                <li>
                  <Link to="https://www.goodreads.com/book/show/57356067-the-cryptopians">
                    The Cryptopians
                  </Link>{" "}
                  <i>February 22, 2022 - Laura Shin</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                    Out of the Ether
                  </Link>{" "}
                  <i>September 29, 2020 - Matthew Leising</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                    The Infinite Machine
                  </Link>{" "}
                  <i>July 14, 2020 - Camila Russo</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/22174460-the-age-of-cryptocurrency">
                    The Age of Cryptocurrency
                  </Link>{" "}
                  <i>January 12, 2016 - Paul Vigna, Michael J. Casey</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/34964890-the-truth-machine">
                    The Truth Machine
                  </Link>{" "}
                  <i>February 27, 2018 - Paul Vigna, Michael J. Casey</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/book/show/23546676-digital-gold">
                    Digital Gold
                  </Link>{" "}
                  <i>May 24, 2021 - Nathaniel Popper</i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/56274031-kings-of-crypto">
                    Kings of Crypto
                  </Link>{" "}
                  <i>December 15, 2020 - Jeff John Roberts</i>
                </li>
                <li>
                  <Link to="https://github.com/ethereumbook/ethereumbook">
                    Mastering Ethereum
                  </Link>{" "}
                  <i>
                    December 23, 2018 – Andreas M. Antonopoulos, Gavin Wood
                    Ph.D.{" "}
                  </i>
                </li>
              </ul>
              <h3>Podcasts about Ethereum and Cryptocurrencies</h3>
              <ul>
                <li>
                  <Link to="https://podcast.ethhub.io/">Into the Ether</Link>{" "}
                  <i>A podcast focusing on all things Ethereum and DeFi</i>
                </li>
                <li>
                  <Link to="http://podcast.banklesshq.com/">Bankless</Link>{" "}
                  <i>A guide to Crypto finance</i>
                </li>
                <li>
                  <Link to="https://uncommoncore.co/podcast/">
                    Uncommon Core
                  </Link>{" "}
                  <i>
                    Explores the transformative nature of trust-minimized
                    currency and financial services
                  </i>
                </li>
                <li>
                  <Link to="https://www.zeroknowledge.fm/">Zero Knowledge</Link>{" "}
                  <i>
                    Goes deep into the tech that will power the emerging
                    decentralized web and the community building this
                  </i>
                </li>
                <li>
                  <Link to="https://epicenter.tv/">Epicenter</Link>{" "}
                  <i>
                    Explores the technical, economic, and social implications of
                    the Crypto industry
                  </i>
                </li>
                <li>
                  <Link to="https://unchainedpodcast.com/">Unchained</Link>{" "}
                  <i>
                    Dives deep into the people building the decentralized
                    internet, the details of this technology that could underpin
                    our future, and some of the thorniest topics in crypto, such
                    as regulation, security and privacy
                  </i>
                </li>
                <li>
                  <Link to="https://www.intothebytecode.xyz/">
                    Into the Bytecode
                  </Link>{" "}
                  <i>A podcast about the ideas shaping crypto</i>
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
