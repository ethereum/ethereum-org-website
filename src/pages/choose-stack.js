import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import ActionCard from "../components/ActionCard"
import Callout from "../components/Callout"
import Card from "../components/Card"
import Link from "../components/Link"
import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import {
  Content,
  Divider,
  Intro,
  Page,
  InfoBanner,
} from "../components/SharedStyledComponents"

const HeroContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
    margin-top: 3rem;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: "SFMono-Regular", monospace;
  color: ${(props) => props.theme.colors.textSidebar};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0.5rem;
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Hero = styled(Img)`
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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: 2rem;
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
`

const frameworks = [
  {
    emoji: ":chocolate_bar:",
    title: "Truffle",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":construction_worker:",
    title: "Buidler",
    description:
      "You don't need to provide all your personal details to use an Ethereum app. Ethereum is building an economy based on value, not surveillance.",
  },
  {
    emoji: ":busts_in_silhouette:",
    title: "OpenZeppelin",
    description:
      "Ethereum allows you to move money, or make agreements, directly with someone else. You don't need to go through intermediary companies.",
  },
]

const languages = [
  {
    emoji: ":page_with_curl:",
    title: "Solidity",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":snake:",
    title: "Vyper",
    description:
      "You don't need to provide all your personal details to use an Ethereum app. Ethereum is building an economy based on value, not surveillance.",
  },
]

const StackContainer = styled(Content)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: 3rem 2rem;
  margin: 2rem;
  width: auto;
  background: ${(props) => props.theme.colors.ednBackground};
`

const ChooseStackPage = ({ data }) => {
  return (
    <Page>
      <HeroContent>
        <HeroContainer>
          <Header>
            <Title>Start building</Title>
            <Slogan>Choose your stack</Slogan>
            <Intro>
              <p>
                Ready to start? Put together the tools you'll need to build your
                dapp.
              </p>
            </Intro>
          </Header>
          <Hero
            fluid={data.hero.childImageSharp.fluid}
            alt="Illustration of blocks being organised like an ETH symbol"
            loading="eager"
          />
        </HeroContainer>
      </HeroContent>
      <StackContainer>
        <Subtitle>Choose your development framework</Subtitle>
        <p>A lot of out-of-the-box functionality, so we highly recommend it!</p>
        <Link to="/en/edn/learn/development-frameworks/">
          More on development frameworks
        </Link>
        <CardContainer>
          {frameworks.map((framework, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={framework.emoji}
                title={framework.title}
                description={framework.description}
              >
                <Button to="#">Add to stack</Button>
              </StyledCard>
            )
          })}
        </CardContainer>
      </StackContainer>
      <StackContainer>
        <Subtitle>Choose your smart contract language (optional)</Subtitle>
        <p>
          You don’t have to write a smart contract to build a dapp, but if you
          want to create new functionality, you’ll need to write your own. So
          pick your language.
        </p>
        <Link to="/en/edn/learn/smart-contracts/">
          More on smart contract languages
        </Link>
        <CardContainer>
          {languages.map((language, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={language.emoji}
                title={language.title}
                description={language.description}
              >
                <Button to="#">Add to stack</Button>
              </StyledCard>
            )
          })}
        </CardContainer>
      </StackContainer>
    </Page>
  )
}
export default ChooseStackPage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 1200) {
          src
        }
      }
    }
  }
`
