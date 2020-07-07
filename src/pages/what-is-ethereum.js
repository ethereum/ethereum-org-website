import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 8rem auto 0;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem;
  }
`

// TODO use theme variables
const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleTwo = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  display: flex;
`

const Hero = styled(Img)`
  flex: 1 1 800px;
  max-width: 800px;
`

const Header = styled.header`
  margin-top: 6rem;
`

// TODO use theme variables
const GrayContainer = styled.div`
  margin-top: -14rem;
  padding: 14rem 1rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
    #ffffff;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledCard = styled(Card)`
  flex: 1 1 424px;
  margin: 1rem;
  padding: 1rem;
`

// TODO fill out copy
const cards = [
  {
    emoji: ":robot:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":robot:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":robot:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":robot:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
]

const WhatIsEthereumPage = ({ data }) => {
  return (
    <Page>
      <Content>
        <HeroContainer>
          <Header>
            <h1>The foundation for our digital future</h1>
            <Subtitle>Ethereum is open to everyone. </Subtitle>
            <SubtitleTwo> All you need is a wallet to take part.</SubtitleTwo>
          </Header>
          <Hero
            fluid={data.hero.childImageSharp.fluid}
            alt="What is Ethereum image"
            loading="eager"
          />
        </HeroContainer>
      </Content>
      <GrayContainer>
        <h2>What is Ethereum?</h2>
        <p>
          Ethereum is open access to digital money and data-friendly services
          for everyone – no matter your background or location. It’s a
          community-built technology behind the cryptocurrency Ether and
          thousands of applications you can use today.
        </p>
        <CardContainer>
          {cards.map((card, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            )
          })}
        </CardContainer>
      </GrayContainer>
    </Page>
  )
}

export default WhatIsEthereumPage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
