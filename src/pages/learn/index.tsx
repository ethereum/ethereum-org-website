// Libraries
import React from "react"
import styled from "@emotion/styled"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"

// Components
import { CardGrid as OriginalCardGrid } from "../../components/SharedStyledComponents"
import ButtonLink from "../../components/ButtonLink"
import DocLink from "../../components/DocLink"
import FeedbackCard from "../../components/FeedbackCard"
import Link from "../../components/Link"
import OriginalCard from "../../components/Card"
import PageHero from "../../components/PageHero"
import PageMetadata from "../../components/PageMetadata"
import StakingHomeTableOfContents from "../../components/Staking/StakingHomeTableOfContents"
import Translation from "../../components/Translation"

// Utils
import { Lang } from "../../utils/languages"
import { translateMessageId, isLangRightToLeft } from "../../utils/translations"

// Types
import type { Context } from "../../types"

// Styles
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
    image: getImage(data.heroImage),
    alt: "",
    buttons: [
      {
        content: translateMessageId("hero-button-lets-get-started", intl),
        toId: tocItems[0].id,
      },
    ],
  }

  return (
    <Container>
      <PageMetadata
        title={translateMessageId("hero-title", intl)}
        description={""}
      />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>
      </HeroBackground>

      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <InfoColumn>
          <InfoTitle>
            <Translation id="toc-learn-hub" />
          </InfoTitle>
          <StakingHomeTableOfContents items={tocItems} />
        </InfoColumn>

        <ContentContainer id="content">
          <Section>
            <h2 id={tocItems[0].id}>{tocItems[0].title}</h2>
            <p>
              <Translation id="what-is-crypto-1" />{" "}
              <Link to="/what-is-ethereum/">
                <Translation id="what-is-crypto-link-1" />
              </Link>
            </p>
            <p>
              <Translation id="what-is-crypto-2" />
            </p>
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
                      image={getImage(data.whatIsEth)}
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
                    <GatsbyImage image={getImage(data.eth)} alt="" />
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
                    <GatsbyImage image={getImage(data.impact)} alt="" />
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
            <h2 id={tocItems[1].id}>{tocItems[1].title}</h2>
            <p>
              <Translation id="how-do-i-use-ethereum-1" />
            </p>
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
                      image={getImage(data.wallet)}
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
                      image={getImage(data.futureTransparent)}
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
                    <GatsbyImage image={getImage(data.dogeComputer)} alt="" />
                  </CardImage>
                  <ButtonLink to="/security/">
                    <Translation id="crypto-security-basics-card-button" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>

            <Banner>
              <BannerBody>
                <h3>
                  <Translation id="things-to-consider-banner-title" />
                </h3>
                <ul>
                  <li>
                    <Translation id="things-to-consider-banner-1" />
                  </li>
                  <li>
                    <Translation id="things-to-consider-banner-2" />{" "}
                    <Link to="/layer-2/">
                      <Translation id="things-to-consider-banner-layer-2" />
                    </Link>
                    .
                  </li>
                </ul>
              </BannerBody>
              <BannerImage>
                <GatsbyImage image={getImage(data.newRings)} alt="" />
              </BannerImage>
            </Banner>

            <AdditionalReadingHeader>
              <Translation id="additional-reading-more-on-using-ethereum" />
            </AdditionalReadingHeader>
            <DocsContainer>
              <DocLink to="/community/support/">
                <Translation id="additional-reading-support-for-ethereum-and-wallets" />
              </DocLink>
              <DocLink to="/layer-2/">
                <Translation id="additional-reading-layer-2" />
              </DocLink>
            </DocsContainer>
          </Section>

          <Section>
            <h2 id={tocItems[2].id}>{tocItems[2].title}</h2>
            <p>
              <Translation id="what-is-ethereum-used-for-1" />
            </p>
            <CardGrid>
              <Card
                title={translateMessageId("defi-card-title", intl)}
                description={translateMessageId("defi-card-description", intl)}
              >
                <>
                  <CardImage>
                    <GatsbyImage
                      image={getImage(data.financeTransparent)}
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
                    <GatsbyImage image={getImage(data.stablecoins)} alt="" />
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
                      image={getImage(data.infrastructureTransparent)}
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
                    <GatsbyImage image={getImage(data.dao)} alt="" />
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
                      image={getImage(data.developersEthBlocks)}
                      alt=""
                    />
                  </CardImage>
                  <ButtonLink to="/dapps/">
                    <Translation id="dapp-card-button" />
                  </ButtonLink>
                </>
              </Card>
              <CardGradient
                title={translateMessageId("emerging-use-cases-title", intl)}
                description={translateMessageId(
                  "emerging-use-cases-description",
                  intl
                )}
              >
                <ul>
                  <li>
                    <Link to="/decentralized-identity/">
                      <Translation id="decentralized-identity" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/social-networks/">
                      <Translation id="decentralized-social-networks" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/desci/">
                      <Translation id="decentralized-science" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                      <Translation id="play-to-earn" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                      <Translation id="fundraising-through-quadratic-funding" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://hbr.org/2022/01/how-walmart-canada-uses-blockchain-to-solve-supply-chain-challenges">
                      <Translation id="supply-chain-management" />
                    </Link>
                  </li>
                </ul>
              </CardGradient>
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
            <h2 id={tocItems[3].id}>{tocItems[3].title}</h2>
            <p>
              <Translation id="strengthening-the-ethereum-network-description" />
            </p>
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
                    <GatsbyImage image={getImage(data.rhino)} alt="" />
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
                    <GatsbyImage image={getImage(data.ethereumInside)} alt="" />
                  </CardImage>
                  <ButtonLink to="/run-a-node/">
                    <Translation id="run-a-node-card-title" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2 id={tocItems[4].id}>{tocItems[4].title}</h2>
            <p>
              <Translation id="learn-about-ethereum-protocol-description" />
            </p>
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
                    <GatsbyImage image={getImage(data.hackathon)} alt="" />
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
                    <GatsbyImage image={getImage(data.merge)} alt="" />
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
                      image={getImage(data.financeTransparent)}
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
            <h2 id={tocItems[5].id}>{tocItems[5].title}</h2>
            <p>
              <Translation id="ethereum-community-description" />
            </p>
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
                      image={getImage(data.enterprise)}
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
                    <GatsbyImage image={getImage(data.dogeComputer)} alt="" />
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
                    <GatsbyImage image={getImage(data.impact)} alt="" />
                  </CardImage>
                  <ButtonLink to="/community/online/">
                    <Translation id="online-communities-card-button" />
                  </ButtonLink>
                </>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2 id={tocItems[6].id}>{tocItems[6].title}</h2>
            <div>
              <h3>
                <Translation id="books-about-ethereum" />
              </h3>
              <ul>
                <li>
                  <Link to="https://www.goodreads.com/book/show/57356067-the-cryptopians">
                    The Cryptopians
                  </Link>{" "}
                  <i>
                    <Translation id="cryptopians-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                    Out of the Ether
                  </Link>{" "}
                  <i>
                    <Translation id="out-of-the-ether-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                    The Infinite Machine
                  </Link>{" "}
                  <i>
                    <Translation id="the-infinite-machine-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/22174460-the-age-of-cryptocurrency">
                    The Age of Cryptocurrency
                  </Link>{" "}
                  <i>
                    <Translation id="the-age-of-cryptocurrency-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/34964890-the-truth-machine">
                    The Truth Machine
                  </Link>{" "}
                  <i>
                    <Translation id="the-truth-machine-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/book/show/23546676-digital-gold">
                    Digital Gold
                  </Link>{" "}
                  <i>
                    <Translation id="digital-gold-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.goodreads.com/en/book/show/56274031-kings-of-crypto">
                    Kings of Crypto
                  </Link>{" "}
                  <i>
                    <Translation id="kings-of-crypto-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://github.com/ethereumbook/ethereumbook">
                    Mastering Ethereum
                  </Link>{" "}
                  <i>
                    <Translation id="mastering-ethereum-description" />{" "}
                  </i>
                </li>
              </ul>
              <h3>
                <Translation id="podcasts-about-ethereum" />
              </h3>
              <ul>
                <li>
                  <Link to="https://podcast.ethhub.io/">Into the Ether</Link>{" "}
                  <i>
                    <Translation id="ethhub-description" />
                  </i>
                </li>
                <li>
                  <Link to="http://podcast.banklesshq.com/">Bankless</Link>{" "}
                  <i>
                    <Translation id="bankless-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://uncommoncore.co/podcast/">
                    Uncommon Core
                  </Link>{" "}
                  <i>
                    <Translation id="uncommon-core-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.zeroknowledge.fm/">Zero Knowledge</Link>{" "}
                  <i>
                    <Translation id="zeroknowledge-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://epicenter.tv/">Epicenter</Link>{" "}
                  <i>
                    <Translation id="epicenter-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://unchainedpodcast.com/">Unchained</Link>{" "}
                  <i>
                    <Translation id="unchained-description" />
                  </i>
                </li>
                <li>
                  <Link to="https://www.intothebytecode.xyz/">
                    Into the Bytecode
                  </Link>{" "}
                  <i>
                    <Translation id="into-the-bytecode-description" />
                  </i>
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
