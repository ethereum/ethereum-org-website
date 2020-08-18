import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import CalloutBanner from "../../components/CalloutBanner"
import Button from "../../components/Button"
import PageMetadata from "../../components/PageMetadata"
import WalletCompare from "../../components/WalletCompare"
import { Divider, Page } from "../../components/SharedStyledComponents"

// TODO move to shared?
const Title = styled.h1`
  font-weight: normal;
  font-size: 3rem;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Hero = styled(Img)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  min-height: 300px;
  max-height: 400px;
  background-size: cover;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const FindWalletPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Find an Ethereum Wallet"
        description="Find and compare wallets based on the features you want."
      />

      <HeroContainer>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt="Get ETH hero image"
          loading="eager"
        />
        <Header>
          <Title>Find a wallet</Title>
          <Subtitle>
            Wallets have lots of optional features which you might like.
          </Subtitle>
          <SubtitleTwo>
            So choose your wallet based on the features you want.
          </SubtitleTwo>
        </Header>
      </HeroContainer>
      <WalletCompare />
      <Divider />
      {/* TODO discuss copy w/ Ryan */}
      <CalloutBanner
        title="Use your wallet"
        description="Now that you have a wallet, check out some Ethereum applications (dapps). There are dapps for finance, social media, gaming and lots of other categories."
        image={data.dapps.childImageSharp.fluid}
        maxImageWidth={600}
      >
        <div>
          <Button to="/dapps">Check out dapps</Button>
        </div>
      </CalloutBanner>
    </Page>
  )
}

export default FindWalletPage

// TODO update hero
export const query = graphql`
  query {
    hero: file(relativePath: { eq: "get-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
