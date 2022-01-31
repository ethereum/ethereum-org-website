import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ActionCard from "../components/ActionCard"
import Callout from "../components/Callout"
import Card from "../components/Card"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import PageHero from "../components/PageHero"

import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Page,
} from "../components/SharedStyledComponents"
import { translateMessageId } from "../utils/translations"

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1rem;
    margin-left: 0rem;
  }
`

const StyledContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem;
  }
`

const StyledCard = styled(ActionCard)`
  min-width: 480px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
    min-width: min(100%, 240px);
  }
`

const StyledGetInvolvedCard = styled(Card)`
  margin: 1rem;
  padding: 1.5rem;
  flex: 1 0 30%;
  min-width: 280px;
  max-width: 31%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 46%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

const StyledPurpleContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  /* border-top: 1px solid ${(props) => props.theme.colors.text}; */
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 0rem;
  padding-bottom: 4rem;
  margin-top: 0rem;
`

const StyledCardContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-columns: 1fr;
  }
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    margin: 0rem;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 75%;
  }
`

const IntroImage = styled(GatsbyImage)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const FeatureImage = styled(GatsbyImage)`
  width: 100%;
`

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 1.25rem;
  line-height: 140%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1rem;
  }
`

const H2 = styled.h2`
  margin-top: 0rem;
`

const OpenSourceContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const PoapContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  margin-bottom: 0rem;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const SupportContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`

const FeatureContent = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const LeftColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0rem;
  }
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

const CommunityPage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-community-hero-title", intl),
    header: translateMessageId("page-community-hero-header", intl),
    subtitle: translateMessageId("page-community-hero-subtitle", intl),
    image: getImage(data.enterprise),
    alt: translateMessageId("page-community-hero-alt", intl),
  }

  const cards = [
    {
      image: getImage(data.docking),
      title: translateMessageId("page-community-card-1-title", intl),
      description: translateMessageId(
        "page-community-card-1-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-wallet-image-alt", intl),
      to: "/community/online/",
    },
    {
      image: getImage(data.eth),
      title: translateMessageId("page-community-card-2-title", intl),
      description: translateMessageId(
        "page-community-card-2-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-eth-image-alt", intl),
      to: "/community/events/",
    },
    {
      image: getImage(data.doge),
      title: translateMessageId("page-community-card-3-title", intl),
      description: translateMessageId(
        "page-community-card-3-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-dapps-image-alt", intl),
      to: "/community/get-involved/",
    },
    {
      image: getImage(data.future),
      title: translateMessageId("page-community-card-4-title", intl),
      description: translateMessageId(
        "page-community-card-4-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-dapps-image-alt", intl),
      to: "/community/grants/",
    },
  ]

  const whyGetInvolvedCards = [
    {
      emoji: ":mage:",
      title: translateMessageId(
        "page-community-why-get-involved-card-1-title",
        intl
      ),
      description: translateMessageId(
        "page-community-why-get-involved-card-1-description",
        intl
      ),
    },
    {
      emoji: ":dollar:",
      title: translateMessageId(
        "page-community-why-get-involved-card-2-title",
        intl
      ),
      description: translateMessageId(
        "page-community-why-get-involved-card-2-description",
        intl
      ),
    },
    {
      emoji: ":collision:",
      title: translateMessageId(
        "page-community-why-get-involved-card-3-title",
        intl
      ),
      description: translateMessageId(
        "page-community-why-get-involved-card-3-description",
        intl
      ),
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-community-meta-title", intl)}
        description={translateMessageId(
          "page-community-meta-description",
          intl
        )}
      />
      <PageHero isReverse content={heroContent} />
      <Divider />
      <StyledPurpleContainer>
        <Content>
          <CentralColumn>
            <H2>
              <Translation id="page-community-why-get-involved-title" />
            </H2>
          </CentralColumn>
          <CardContainer>
            {whyGetInvolvedCards.map((card, idx) => (
              <StyledGetInvolvedCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </StyledPurpleContainer>
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2 id="get-involved">
                <Translation id="page-community-get-involved-title" />
              </H2>
              <Subtitle>
                <Translation id="page-community-get-involved-description" />
              </Subtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage
                image={getImage(data.developerBlocks)}
                alt={translateMessageId(
                  "page-community-get-involved-image-alt",
                  intl
                )}
              />
            </ImageContainer>
          </IntroRow>
          <StyledCardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                title={card.title}
                description={card.description}
                to={card.to}
                image={card.image}
                alt={card.alt}
              />
            ))}
          </StyledCardContainer>
        </StyledContent>
      </StyledGrayContainer>
      <OpenSourceContainer>
        <RowReverse>
          <FeatureContent>
            <H2>
              <Translation id="page-community-open-source" />
            </H2>
            <Subtitle>
              <Translation id="page-community-open-source-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/community/get-involved/#ethereum-jobs/">
                <Translation id="page-community-find-a-job" />
              </ButtonLink>
              <StyledButtonLink isSecondary to="/community/grants/">
                <Translation id="page-community-explore-grants" />
              </StyledButtonLink>
            </ButtonRow>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.ethereum)}
              alt={translateMessageId(
                "page-community-open-source-image-alt",
                intl
              )}
            />
          </ImageContainer>
        </RowReverse>
      </OpenSourceContainer>
      <PoapContainer>
        <Row>
          <FeatureContent>
            <LeftColumnContent>
              <H2>
                <Translation id="page-community-contribute" />
              </H2>
              <Subtitle>
                <Translation id="page-community-contribute-description" />
              </Subtitle>
              <ButtonRow>
                <ButtonLink to="/contributing/">
                  <Translation id="page-community-contribute-button" />
                </ButtonLink>
                <StyledButtonLink
                  isSecondary
                  to="https://github.com/ethereum/ethereum-org-website/"
                >
                  <Translation id="page-community-contribute-secondary-button" />
                </StyledButtonLink>
              </ButtonRow>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.finance)}
              alt={translateMessageId("page-index-internet-image-alt", intl)}
            />
          </ImageContainer>
        </Row>
      </PoapContainer>
      <SupportContainer>
        <RowReverse>
          <FeatureContent>
            <H2>
              <Translation id="page-community-support" />
            </H2>
            <Subtitle>
              <Translation id="page-community-support-description" />
            </Subtitle>
            <div>
              <ButtonLink to="/community/support/">
                <Translation id="page-community-support-button" />
              </ButtonLink>
            </div>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.hackathon)}
              alt={translateMessageId("page-community-support-alt", intl)}
            />
          </ImageContainer>
        </RowReverse>
      </SupportContainer>
      <Divider />
      <TwoColumnContent>
        <Column>
          <h2>
            <Translation id="page-community-try-ethereum" />
          </h2>
        </Column>
      </TwoColumnContent>
      <Content>
        <CardContainer>
          <StyledCallout
            image={getImage(data.eth)}
            titleKey="page-community-get-eth-title"
            alt={translateMessageId("page-community-get-eth-alt", intl)}
            descriptionKey="page-community-get-eth-description"
          >
            <div>
              <ButtonLink to="/get-eth/">
                <Translation id="page-community-get-eth" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            image={getImage(data.doge)}
            titleKey="page-community-explore-dapps-title"
            alt={translateMessageId("page-community-explore-dapps-alt", intl)}
            descriptionKey="page-community-explore-dapps-description"
          >
            <div>
              <ButtonLink to="/dapps/">
                <Translation id="page-community-explore-dapps" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default CommunityPage

export const query = graphql`
  query {
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    developerBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1440
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1440
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    docking: file(relativePath: { eq: "upgrades/core.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    enterpriseFixed: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
