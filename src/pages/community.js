import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import PageHero from "../components/PageHero"
import MeetupList from "../components/MeetupList"

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

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 75%;
  }
`

const IntroImage = styled(Img)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const FeatureImage = styled(Img)`
  width: 100%;
`

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 20px;
  line-height: 140%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 16px;
  }
`

const H2 = styled.h2`
  margin-top: 0rem;
`

const H3 = styled.h3`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
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

const CommunityPage = ({ data }) => {
  const intl = useIntl()

  // const heroContent = {
  //   title: translateMessageId("page-community-title, intl),
  //   header: translateMessageId("page-community-hero-header", intl),
  //   subtitle: translateMessageId("page-community-hero-subtitle", intl),
  //   image: data.stablecoins.childImageSharp.fluid,
  //   alt: translateMessageId("page-community-hero-alt", intl),
  //   buttons: [
  //     {
  //       content: translateMessageId("page-community-hero-button", intl),
  //       path: "#",
  //     },
  //     {
  //       content: translateMessageId(
  //         "page-community-developer-support-button",
  //         intl
  //       ),
  //       path: "#",
  //       isSecondary: "isSecondary",
  //     },
  //   ],
  // }

  const heroContent = {
    title: "Join the community",
    header: "Welcome to the Ethereum community hub",
    subtitle:
      "The Ethereum community is home to hundreds of thousands of developers, technologists, designers, users, HODLers and enthusiasts.",
    image: data.enterprise.childImageSharp.fluid,
    alt: translateMessageId("page-community-hero-alt", intl),
    buttons: [
      {
        content: "How can I get involved?",
        path: "#",
      },
      {
        content: "Developer support",
        path: "#",
        isSecondary: "isSecondary",
      },
    ],
  }

  const cards = [
    {
      image: data.docking.childImageSharp.fixed,
      title: "Join an online community",
      description:
        "Find your tribe and participate in community with other Ethereum enthusiasts",
      alt: translateMessageId("page-index-get-started-wallet-image-alt", intl),
      to: "/community/online",
    },
    {
      image: data.eth.childImageSharp.fixed,
      title: "Find Ethereum events",
      description: "We've identified impactful work that needs doing.",
      alt: translateMessageId("page-index-get-started-eth-image-alt", intl),
      to: "/#",
    },
    {
      image: data.doge.childImageSharp.fixed,
      title: "Contribute to the ecosystem",
      description:
        "Help us bring ethereum.org to new cultures through language.",
      alt: translateMessageId("page-index-get-started-dapps-image-alt", intl),
      to: "/#",
    },
    {
      image: data.enterpriseFixed.childImageSharp.fixed,
      title: "Get Support",
      description:
        "Need help? Connect with experts from the ecosystem to get your questions answered.",
      alt: translateMessageId("page-index-get-started-devs-image-alt", intl),
      to: "/#",
    },
  ]

  return (
    <Page>
      {/* <PageMetadata
        title={translateMessageId("page-community-title", intl)}
        description={translateMessageId(
          "page-community-meta-description",
          intl
        )}
      /> */}
      <PageMetadata
        title="Community home"
        description="Community homepage description"
      />
      <PageHero isReverse content={heroContent} />
      <Divider />
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2>
                {/* <Translation id="page-community-get-involved" /> */}
                How can I get involved?
              </H2>
              <Subtitle>
                {/* <Translation id="page-community-get-involved-description" /> */}
                There are many ways to get involved in the fast-growing Ethereum
                community; you can join one of the popular online communities,
                attend an event, join a meetup group, contribute to a project,
                or participate in one of the many online forums about Ethereum.
              </Subtitle>
              <ButtonLink to="/">
                {/* <Translation id="page-community-get-involved-button" /> */}
                Get involved!
              </ButtonLink>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage
                fluid={data.developerBlocks.childImageSharp.fluid}
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
            {/* <StyledH2>
              <Translation id="page-index-what-is-ethereum" />
            </StyledH2> */}
            <H2>
              {/* <Translation id="page-community-open-source" /> */}
              New to open source?
            </H2>
            <Subtitle>
              {/* <Translation id="page-community-open-source-description" /> */}
              Don't worry—we all start somewhere. We have low barrier to entry
              issues on our GitHub repository specifically designed for
              developers who are new to open-source labelled 'good-first-issue'.
            </Subtitle>
            <div>
              <ButtonLink isSecondary to="/#">
                {/* <Translation id="page-community-open-source-button" /> */}
                View on GitHub
              </ButtonLink>
            </div>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              fluid={data.ethereum.childImageSharp.fluid}
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
                {/* <Translation id="page-community-poap" /> */}
                Claim your contributor POAP
              </H2>
              <Subtitle>
                {/* <Translation id="page-community-poap-description" /> */}
                If your contribution gets merged into ethereum.org, we'll mint
                you a unique contributors PAOP. Reach three and five
                contributions and you'll receive our new POAPs. A Proof of
                Attendance Protocol (POAP) token is on-chain proof that you
                helped make the ecosystem a little more awesome.
              </Subtitle>
              <ButtonRow>
                <ButtonLink to="/">
                  {/* <Translation id="page-community-poap-button" /> */}
                  More on POAPs
                </ButtonLink>
                <StyledButtonLink isSecondary to="/#">
                  {/* <Translation id="page-community-poap-secondary-button" /> */}
                  GitHub
                </StyledButtonLink>
              </ButtonRow>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              fluid={data.finance.childImageSharp.fluid}
              alt={translateMessageId("page-index-internet-image-alt", intl)}
            />
          </ImageContainer>
        </Row>
      </PoapContainer>
      <SupportContainer>
        <RowReverse>
          <FeatureContent>
            <H2>
              {/* <Translation id="page-community-support" /> */}
              Developer support
            </H2>
            <Subtitle>
              {/* <Translation id="page-community-support-description" /> */}
              The Ethereum community has adopted many standards that are helpful
              to developers. Typically these are introduced as Ethereum
              Improvement Proposals (EIPS), which are discussed by community
              members through a standard process. We've created a dedicated area
              to help you get started.
            </Subtitle>
            <div>
              <ButtonLink to="/">
                {/* <Translation id="page-community-support-button" /> */}
                Find out more
              </ButtonLink>
            </div>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              fluid={data.hackathon.childImageSharp.fluid}
              alt={translateMessageId("page-community-support-alt", intl)}
            />
          </ImageContainer>
        </RowReverse>
      </SupportContainer>
      <Divider />
      <MeetupList />
    </Page>
  )
}

export default CommunityPage

export const query = graphql`
  query {
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developerBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    docking: file(relativePath: { eq: "eth2/core.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    enterpriseFixed: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
