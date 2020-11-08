import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import Callout from "../components/Callout"
import Link from "../components/Link"

import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const HeroCopyContainer = styled.div`
  position: absolute;
  top: 175px;
  left: 50%;
  flex: 1;
  max-width: 1504px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 0 1 400px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    max-width: 100%;
    max-height: 340px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-height: 280px;
  }
`

const HeroCopy = styled.div`
  position: relative;
  left: -50%;
  z-index: 3;
  background: ${(props) => props.theme.colors.background};
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem;
  @media (max-width: 1240px) {
    margin-top: -2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 0;
  }
`

const H1 = styled.h1`
  font-style: normal;
  font-weight: normal;
  // font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 32px;
  line-height: 110%;
  // background: ${(props) => props.theme.colors.ednBackground};
  padding: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleWithMargin = styled(Subtitle)`
  margin-bottom: 1.5rem;
`

const MonoSubtitle = styled.h2`
  margin-bottom: 0rem;
`

const Hero = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1 1;
  max-width: 1504px;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  // margin-top: 3rem;
  // margin-left: 2rem;
  // @media (min-width: ${(props) => props.theme.breakpoints.m}) {
  //   align-self: center;
  // }
  // @media (max-width: ${(props) => props.theme.breakpoints.m}) {
  //   margin-top: 0;
  //   margin-left: 0;
  // }
`

const Image = styled(Img)`
  max-width: 400px;
  margin-top: 4rem;
`

const ImageContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ThreeColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem 2rem;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
`
const RightColumn = styled(Column)`
  margin-right: 0;
`
const IntroColumn = styled(Column)`
  margin-top: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const StyledCallout = styled(Callout)`
  min-height: 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 1 1 416px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
    margin-left: 0;
  }
`

const paths = [
  {
    emoji: ":world_map:",
    title: "Online Communities",
    description: "...description...",
    url: "#online-communities",
    button: "Say Hello!",
  },
  {
    emoji: ":woman-raising-hand:",
    title: "How can I get involved?",
    description: "...description...",
    url: "#how-can-i-get-involved",
    button: "Get Involved!",
  },
  {
    emoji: ":bank:",
    title: "Decentralized Autonomous Organizations",
    description: "...description...",
    url: "#decentralized-autonomous-organizations-daos",
    button: "More about DAOs",
  },
]

const CommunityPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum Community Center"
        description="...PageMetadata description..."
      />
      <Content>
        <HeroContainer>
          <Hero
            fluid={data.communityHero.childImageSharp.fluid}
            alt="Community artwork"
            loading="eager"
          />
          <HeroCopyContainer>
            <HeroCopy>
              <H1>
                Ethereum <b>community</b> center
              </H1>
              <Subtitle>Welcome.</Subtitle>
            </HeroCopy>
          </HeroCopyContainer>
        </HeroContainer>
        <MonoSubtitle>Some subtitles here...</MonoSubtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              >
                <ButtonLink to={path.url}>{path.button}</ButtonLink>
              </StyledCard>
            )
          })}
        </StyledCardContainer>
      </Content>
    </Page>
  )
}
export default CommunityPage

export const query = graphql`
  query {
    communityHero: file(relativePath: { eq: "communityHero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1504) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
