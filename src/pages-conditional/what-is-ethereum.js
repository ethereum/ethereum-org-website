import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import ActionCard from "../components/ActionCard"
import Callout from "../components/Callout"
import Card from "../components/Card"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Divider,
  Intro,
  GrayContainer,
  Page,
} from "../components/SharedStyledComponents"

const HeroContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
  }
`

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
const SubtitleTwo = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text300};
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

const StyledGrayContatiner = styled(GrayContainer)`
  padding: 4rem 2rem;
  margin-top: -14rem;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    margin-top: -15rem;
  }
  @media (max-width: 1160px) {
    margin-top: -14rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -12rem;
  }
  @media (max-width: 920px) {
    margin-top: -11rem;
  }
  @media (max-width: 870px) {
    margin-top: -10rem;
  }
  @media (max-width: 810px) {
    margin-top: -9rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0rem;
    box-shadow: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 2rem 2rem;
  }
`

const ActionCardContainer = styled(CardContainer)`
  justify-content: center;
  margin-bottom: 3rem;
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

const Banner = styled(GatsbyImage)`
  opacity: 0.3;
  width: 100%;
  height: 400px;
`

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 4rem;
`

const BannerMessage = styled.h2`
  position: absolute;
  width: 100%;
  padding: 0.5rem;
  top: 30%;
  text-align: center;
  font-size: 3rem;
  line-height: 140%;
  margin-top: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
    top: 35%;
  }
`

const ActionIntro = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
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

const CardColumn = styled.div`
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 3rem;
`

const SingleCard = styled(StyledCard)`
  max-width: 420px;
  min-width: 320px;
  margin: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 7rem;
    margin-left: 7rem;
  }
`

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
`

const cards = [
  {
    emoji: ":bank:",
    title: <Translation id="page-what-is-ethereum-banking-card" />,
    description: <Translation id="page-what-is-ethereum-banking-card-desc" />,
  },

  {
    emoji: ":detective:",
    title: <Translation id="page-what-is-ethereum-internet-card" />,
    description: <Translation id="page-what-is-ethereum-internet-card-desc" />,
  },
  {
    emoji: ":busts_in_silhouette:",
    title: <Translation id="page-what-is-ethereum-p2p-card" />,
    description: <Translation id="page-what-is-ethereum-p2p-card-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-what-is-ethereum-censorless-card" />,
    description: (
      <Translation id="page-what-is-ethereum-censorless-card-desc" />
    ),
  },
  {
    emoji: ":shopping_bags:",
    title: <Translation id="page-what-is-ethereum-commerce-card" />,
    description: <Translation id="page-what-is-ethereum-commerce-card-desc" />,
  },
  {
    emoji: ":handshake:",
    title: <Translation id="page-what-is-ethereum-compatibility-card" />,
    description: (
      <Translation id="page-what-is-ethereum-compatibility-card-desc" />
    ),
  },
]

const WhatIsEthereumPage = ({ data }) => {
  const intl = useIntl()
  const actions = [
    {
      title: <Translation id="page-what-is-ethereum-native-title" />,
      to: "/eth/",
      alt: translateMessageId("page-what-is-ethereum-native-alt", intl),
      image: getImage(data.eth),
      description: <Translation id="page-what-is-ethereum-native-crypto" />,
    },
    {
      title: <Translation id="page-what-is-ethereum-wallets" />,
      to: "/wallets/",
      alt: translateMessageId("page-what-is-ethereum-native-img-alt", intl),
      image: getImage(data.wallets),

      description: <Translation id="page-what-is-ethereum-wallets-desc" />,
    },
    {
      title: <Translation id="page-what-is-ethereum-dapps-title" />,
      to: "/dapps/",
      alt: translateMessageId("page-what-is-ethereum-dapps-img-alt", intl),
      image: getImage(data.dapps),
      description: <Translation id="page-what-is-ethereum-dapps-desc" />,
    },
  ]
  const usecases = [
    {
      title: <Translation id="page-what-is-ethereum-defi-title" />,
      to: "/defi/",
      alt: translateMessageId("page-what-is-ethereum-defi-alt", intl),
      image: getImage(data.defi),
      description: <Translation id="page-what-is-ethereum-defi-description" />,
    },
    {
      title: <Translation id="page-what-is-ethereum-nft-title" />,
      to: "/nft/",
      alt: translateMessageId("page-what-is-ethereum-nft-alt", intl),
      image: getImage(data.nft),
      description: <Translation id="page-what-is-ethereum-nft-description" />,
    },
    {
      title: <Translation id="page-what-is-ethereum-dao-title" />,
      to: "/dao/",
      alt: translateMessageId("page-what-is-ethereum-dao-alt", intl),
      image: getImage(data.dao),
      description: <Translation id="page-what-is-ethereum-dao-description" />,
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
      <HeroContent>
        <HeroContainer>
          <Header>
            <Title>
              <Translation id="page-what-is-ethereum-title" />
            </Title>
            <Slogan>
              <Translation id="page-what-is-ethereum-desc" />
            </Slogan>
            <Subtitle>
              <Translation id="page-what-is-ethereum-accessibility" />
            </Subtitle>
            <SubtitleTwo>
              <Translation id="page-what-is-ethereum-tools-needed" />
            </SubtitleTwo>
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
      </HeroContent>
      <StyledGrayContatiner>
        <Intro>
          <p>
            <Translation id="page-what-is-ethereum-in-depth-description" />
          </p>
        </Intro>
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
      </StyledGrayContatiner>
      <BannerContainer>
        <Banner
          image={getImage(data.banner)}
          alt={translateMessageId("page-what-is-ethereum-alt-img-social", intl)}
        />
        <BannerMessage>
          <Translation id="page-what-is-ethereum-welcome" /> <br />
          <Translation id="page-what-is-ethereum-welcome-2" />
        </BannerMessage>
      </BannerContainer>
      <TwoColumnContent>
        <Column>
          <h2>
            <Translation id="page-what-is-ethereum-101" />
          </h2>
          <p>
            <Translation id="page-what-is-ethereum-101-desc" />
          </p>
          <p>
            <strong>
              <Translation id="page-what-is-ethereum-101-strong" />
              <i>
                <Translation id="page-what-is-ethereum-101-italic" />
              </i>
            </strong>
          </p>
          <p>
            <Translation id="page-what-is-ethereum-101-desc-2" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum-101-desc-3" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum-101-desc-4" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum-tryit" />
          </p>
        </Column>
        <CardColumn>
          <SingleCard
            emoji=":gear:"
            title={translateMessageId(
              "page-what-is-ethereum-singlecard-title",
              intl
            )}
            description={translateMessageId(
              "page-what-is-ethereum-singlecard-desc",
              intl
            )}
          >
            <Link to="/learn/">
              <Translation id="page-what-is-ethereum-singlecard-link" />
            </Link>
          </SingleCard>
        </CardColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <ActionIntro>
          <h2>
            <Translation id="page-what-is-ethereum-try" />
          </h2>
          <Subtitle>
            <Translation id="page-what-is-ethereum-get-started" />{" "}
          </Subtitle>
          <SubtitleTwo>
            <Translation id="page-what-is-ethereum-adventure" />
          </SubtitleTwo>
        </ActionIntro>
        <ActionCardContainer>
          {actions.map((action, idx) => (
            <ActionCard
              key={idx}
              to={action.to}
              alt={action.alt}
              image={action.image}
              title={action.title}
              description={action.description}
            />
          ))}
        </ActionCardContainer>
      </Content>
      <Content>
        <ActionIntro>
          <h2>
            <Translation id="page-what-is-ethereum-use-cases-title" />
          </h2>
          <Subtitle>
            <Translation id="page-what-is-ethereum-use-cases-subtitle" />
          </Subtitle>
          <SubtitleTwo>
            <Translation id="page-what-is-ethereum-use-cases-subtitle-two" />
          </SubtitleTwo>
        </ActionIntro>
        <ActionCardContainer>
          {usecases.map((usecase, idx) => (
            <ActionCard
              key={idx}
              to={usecase.to}
              alt={usecase.alt}
              image={usecase.image}
              title={usecase.title}
              description={usecase.description}
              isBottom={false}
            />
          ))}
        </ActionCardContainer>
      </Content>
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
  {
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
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...actionCardImage
    }
    wallets: file(relativePath: { eq: "wallet-cropped.png" }) {
      ...actionCardImage
    }
    eth: file(relativePath: { eq: "eth.png" }) {
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
