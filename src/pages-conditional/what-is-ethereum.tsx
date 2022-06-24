import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import Translation from "../components/Translation"
import Callout from "../components/Callout"
import Card from "../components/Card"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import Tabs from "../components/Tabs"
import Icon from "../components/Icon"
import Link from "../components/Link"
import {
  CardContainer,
  Content,
  GrayContainer,
  Page,
  Width60,
  Width40,
} from "../components/SharedStyledComponents"
import {
  Banner,
  BannerBody,
  BannerGrid,
  BannerGridCell,
  BannerImage,
} from "../components/BannerGrid"

import { translateMessageId } from "../utils/translations"
import { Context } from "../types"

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 0;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textTableOfContents};
`

const Subtitle = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Hero = styled(GatsbyImage)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
`

const Header = styled.header`
  margin-top: 12rem;
  @media (max-width: 1280px) {
    margin-top: 8rem;
  }
  @media (max-width: 1160px) {
    margin-top: 7rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 4rem;
  }
  @media (max-width: 920px) {
    margin-top: 2rem;
  }
  @media (max-width: 870px) {
    margin-top: 1rem;
  }
  @media (max-width: 840px) {
    margin-top: 0;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  padding: 4rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0rem;
    box-shadow: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 2rem 0;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const Summary = styled.div`
  padding: 1rem;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.cardGradient};
`

const TwoColumnContent = styled(Content)`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Column = styled.div`
  flex: 0 0 50%;
  max-width: 75%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-bottom: 1.5rem;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
`

const TabContent = styled.p`
  margin: 0;
`

const StatPrimary = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
`

const StatDescription = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text200};
  max-width: 200px;
`

const WhatIsEthereumPage = ({
  data,
}: PageProps<Queries.WhatIsEthereumQuery, Context>) => {
  const intl = useIntl()

  const cards = [
    {
      emoji: ":bank:",
      title: translateMessageId("page-what-is-ethereum-banking-card", intl),
      description: translateMessageId(
        "page-what-is-ethereum-banking-card-desc",
        intl
      ),
    },

    {
      emoji: ":detective:",
      title: translateMessageId("page-what-is-ethereum-internet-card", intl),
      description: translateMessageId(
        "page-what-is-ethereum-internet-card-desc",
        intl
      ),
    },
    {
      emoji: ":busts_in_silhouette:",
      title: translateMessageId("page-what-is-ethereum-p2p-card", intl),
      description: translateMessageId(
        "page-what-is-ethereum-p2p-card-desc",
        intl
      ),
    },
    {
      emoji: ":shield:",
      title: translateMessageId("page-what-is-ethereum-censorless-card", intl),
      description: translateMessageId(
        "page-what-is-ethereum-censorless-card-desc",
        intl
      ),
    },
    {
      emoji: ":shopping_bags:",
      title: translateMessageId("page-what-is-ethereum-commerce-card", intl),
      description:
        "Customers have a secure, built-in guarantee that funds will only change hands if you provide what was agreed. Likewise, developers can have certainty that the rules won't change on them.",
    },
    {
      emoji: ":handshake:",
      title: "All products are composable",
      description:
        "Since all apps are built on the same blockchain / share the same state, they can build off each other (similar to legos). This allows for better products and experiences being built all the time.",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-what-is-ethereum-meta-title", intl)}
        description={translateMessageId(
          "page-what-is-ethereum-meta-description",
          intl
        )}
        image={getImage(data.ogImage)?.images.fallback.src}
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>
              <Translation id="page-what-is-ethereum-title" />
            </Title>
            <Slogan>
              <Translation id="page-what-is-ethereum-desc" />
            </Slogan>
            <Subtitle>
              Learn more about how Ethereum works, the benefits it brings and
              how it is being used by millions of people around the world. A
              complete beginner's guide.
            </Subtitle>
          </Header>
          <Hero
            image={getImage(data.hero)}
            alt={translateMessageId(
              "page-what-is-ethereum-alt-img-bazaar",
              intl
            )}
            loading="eager"
          />
        </HeroContainer>
      </Content>
      <StyledGrayContainer>
        <TwoColumnContent>
          <Width60>
            <Summary>
              <p>
                <b>Summary</b>
              </p>
              <p>
                Ethereum is a technology that lets you send cryptocurrency to
                anyone for a small fee. Its also a marketplace of apps that
                anyone can use and no one can take down. Ethereum doesn’t
                require any central authority to maintain and secure it.
                Instead, individuals can make peer-to-peer transactions without
                needing to trust a third party or one another.
              </p>
              <p>Still confused? Let's explain everything step by step.</p>
            </Summary>
          </Width60>
          <Width40 />
        </TwoColumnContent>
        <TwoColumnContent>
          <Width60>
            <h2>What is a cryptocurrency?</h2>
            <p>
              <b>
                Crypto (short for cryptocurrency) is a new form of digital money
                powered by cryptography.
              </b>
            </p>
            <p>
              It alll started in 2008 with Bitcoin. You could use it to send
              funds to anyone anywhere globally. What made crypto different from
              normal bank transfers or other services like Paypal is that there
              was no middle man for the first time.
            </p>
            <p>Wait, what is a middle man?</p>
            <p>
              Traditionally, banks hold your money for you. They review and
              process every transaction you request and can decline it. Since
              banks store the funds, they have a lot of control over it. They
              can dictate which financial services you have access to and which
              not.
            </p>
            <p>
              Things are different with crypto. You act as <b>your own bank</b>.
              Nobody else has access to your funds. You and your friends can
              make direct <b>peer-to-peer transactions</b> with no single
              authority controling the transfer. This is possible because of the
              blockchain technology upon which cryptocurrencies operate.
            </p>
          </Width60>
          <Width40>
            <GatsbyImage image={getImage(data.wallet)} />
          </Width40>
        </TwoColumnContent>
        <TwoColumnContent>
          <Width60>
            <Tabs
              tabs={[
                {
                  title: "What is a blockchain?",
                  content: (
                    <TabContent>
                      <b>A blockchain is a database of transactions</b> that is
                      updated and shared across many computers in a network.
                      Every time a new set of transactions is added, its called
                      a “block” - hence the name blockchain. Most blockchains
                      are public, and you can only add data, not remove. If
                      someone wanted to alter any of the information or cheat
                      the system, they’d need to do so on the majority of
                      computers on the network. That is a lot! This makes
                      established blockchains highly secure.
                    </TabContent>
                  ),
                },
                {
                  title: "Why is it called cryptocurrency?",
                  content: (
                    <TabContent>
                      Blockchain uses cryptographic techniques to ensure that
                      your funds are safe. Similar techniques have been used in
                      the banking industries to ensure the security of monetary
                      transactions for years. So you could say cryptocurencies
                      have a bank level of security.
                    </TabContent>
                  ),
                },
              ]}
            />
          </Width60>
          <Width40 />
        </TwoColumnContent>

        <TwoColumnContent>
          <Width40>
            <GatsbyImage image={getImage(data.eth)} />
          </Width40>
          <Width60>
            <h2>What is the difference between Ethereum and Bitcoin?</h2>
            <p>
              Launched in 2015, Ethereum builds on Bitcoin's innovation, with
              some big differences.
            </p>
            <p>
              Both let you use digital money without payment providers or banks.
              But <b>Ethereum is programmable</b>, so you can also use it to
              create any type of application on top of it.
            </p>
            <p>
              Ethereum being programmable means that you can build apps that use
              the blockchain to store data or control what your app can do. This
              results in a general purpose blockchain that can be programmed to
              do anything. As there is no limit to what Ethereum can do, it
              allows for great innovation to happen on the Ethereum network.
            </p>
            <p>
              While Bitcoin is only a payment network, Ethereum is more like a
              marketplace of financial services, games, social networks and
              other apps that respect your privacy and cannot censor you.
            </p>
          </Width60>
        </TwoColumnContent>

        <Content>
          <h2>What Ethereum can do?</h2>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </StyledGrayContainer>

      <Banner>
        <BannerBody>
          <h2>Ethereum in numbers</h2>
          <BannerGrid>
            <BannerGridCell>
              <StatPrimary>2970</StatPrimary>
              <StatDescription>
                Projects built on Ethereum{" "}
                <Link
                  to="https://www.stateofthedapps.com/stats/platform/ethereum#new"
                  hideArrow
                  ariaLabel="Read more about Ethereum projects stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
            <BannerGridCell>
              <StatPrimary>71M+</StatPrimary>
              <StatDescription>
                Accounts (wallets) with an ETH balance{" "}
                <Link
                  to="https://bitcoinist.com/ethereum-reaches-new-milestone-as-over-71-million-wallets-hold-eth/"
                  hideArrow
                  ariaLabel="Read more about wallets stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
            <BannerGridCell>
              <StatPrimary>50.5M</StatPrimary>
              <StatDescription>
                Smart contracts on Ethereum{" "}
                <Link
                  to="https://www.TODO.com"
                  hideArrow
                  ariaLabel="Read more about smart contracts stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
            <BannerGridCell>
              <StatPrimary>$11.6T</StatPrimary>
              <StatDescription>
                Value moved through the Ethereum network in 2021{" "}
                <Link
                  to="https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I"
                  hideArrow
                  ariaLabel="Read more about 2021 Ethereum network stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
            <BannerGridCell>
              <StatPrimary>$3.5B</StatPrimary>
              <StatDescription>
                Creator earnings on Ethereum in 2021{" "}
                <Link
                  to="https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I"
                  hideArrow
                  ariaLabel="Read more about 2021 Ethereum earnings stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
            <BannerGridCell>
              <StatPrimary>1.1M</StatPrimary>
              <StatDescription>
                Number of transactions today{" "}
                <Link
                  to="https://www.TODO.com"
                  hideArrow
                  ariaLabel="Read more about number of transactions stats"
                >
                  <Icon name="info" size="1rem" />
                </Link>
              </StatDescription>
            </BannerGridCell>
          </BannerGrid>
        </BannerBody>
        <BannerImage>
          <GatsbyImage image={getImage(data.newrings)} />
        </BannerImage>
      </Banner>

      <TwoColumnContent>
        <Width60>
          <h2>Why would I use Ethereum?</h2>
          <p>
            If you’ve ever sent money overseas (or plan to), or had to worry
            about the future of your assets due to external forces outside of
            your control where you live, or been fed up by the numerous
            restrictions and fees imposed by traditional financial institutions
            for everyday transactions, you might be interested in what
            cryptocurrencies have to offer.
          </p>
          <p>
            Bear in mind that Ethereum is a story that is still being written,
            and many more reasons to use it are being uncovered as it evolves
            and develops over time.
          </p>
        </Width60>
        <Width40>
          <GatsbyImage image={getImage(data.chart1)} />
        </Width40>
      </TwoColumnContent>

      <TwoColumnContent>
        <Column>
          <h2>
            <Translation id="page-what-is-ethereum-explore" />{" "}
          </h2>
        </Column>
      </TwoColumnContent>
      <Content>
        <CardContainer>
          <StyledCallout
            image={getImage(data.developers)}
            titleKey="page-what-is-ethereum-build"
            alt={translateMessageId("page-what-is-ethereum-alt-img-lego", intl)}
            descriptionKey="page-what-is-ethereum-build-desc"
          >
            <div>
              <ButtonLink to="/developers/">
                <Translation id="page-what-is-ethereum-start-building-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            image={getImage(data.community)}
            titleKey="page-what-is-ethereum-community"
            alt={translateMessageId("page-what-is-ethereum-alt-img-comm", intl)}
            descriptionKey="page-what-is-ethereum-comm-desc"
          >
            <div>
              <ButtonLink to="/community/">
                <Translation id="page-what-is-ethereum-meet-comm" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default WhatIsEthereumPage

export const useCaseImage = graphql`
  fragment useCaseImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 260
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`
export const actionCardImage = graphql`
  fragment actionCardImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 368
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`
export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 200
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query WhatIsEthereum {
    hero: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    ogImage: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    banner: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 400
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 470
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    newrings: file(relativePath: { eq: "upgrades/newrings.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 433
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    chart1: file(relativePath: { eq: "what-is-eth/chart1.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 361
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...actionCardImage
    }
    wallets: file(relativePath: { eq: "wallet-cropped.png" }) {
      ...actionCardImage
    }
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      ...useCaseImage
    }
    defi: file(relativePath: { eq: "finance_transparent.png" }) {
      ...useCaseImage
    }
    nft: file(relativePath: { eq: "infrastructure_transparent.png" }) {
      ...useCaseImage
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      ...calloutImage
    }
    community: file(relativePath: { eq: "enterprise.png" }) {
      ...calloutImage
    }
  }
`
