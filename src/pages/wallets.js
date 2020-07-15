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
import HorizontalCard from "../components/HorizontalCard"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 4rem auto 0;
`

const Content = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`

const HeroContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textSidebar};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleThree = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
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

const GrayContainer = styled.div`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.grayBackground};
  box-shadow: inset 0px 1px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-top: -14rem;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    margin-top: -2rem;
  }
  @media (max-width: 1160px) {
    margin-top: -1rem;
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

const Intro = styled.div`
  max-width: 608px;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-bottom: 3rem;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
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

const Banner = styled(Img)`
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
  font-size: 48px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
    top: 35%;
  }
`

const Divider = styled.div`
  margin-bottom: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

const ActionIntro = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled(Content)`
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Column = styled.div`
  flex: 0 0 50%;
  max-width: 75%;
  padding-right: 2rem;
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

const WalletTypes = styled(HorizontalCard)`
  border: 0px;
  display: flex;
  align-items: center;
  margin-bottom: -0.5rem;
`

const SingleCard = styled(StyledCard)`
  max-width: 420px;
  min-width: 320px;
  margin: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 7rem;
    margin-left: 7rem;
  }
  /* TODO remove once global link styles are updated */
  a {
    text-decoration: underline;
  }
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
  min-height: 100%;
`

const cards = [
  {
    emoji: ":dollar:",
    title: "An app for managing your funds",
    description:
      "Your wallet shows your balances, transaction history and gives you a way to send/receive funds. Some wallets may offer more.",
  },
  {
    emoji: ":window:",
    title: "Access to your account",
    description:
      "Your wallet is your window into your Ethereum account. None of your account information is stored in your wallet, so you can swap wallet providers at any time. ",
  },
  {
    emoji: ":old_key:",
    title: "Your key to Ethereum applications",
    description:
      "Your wallet lets you connect to any Ethereum application using your Ethereum account. Your wallet is your access.",
  },
]

const types = [
  {
    emoji: ":cd:",
    description:
      "Physical hardware wallets that let you keep your crypto offline – very secure",
  },
  {
    emoji: ":mobile_phone:",
    description:
      "Mobile applications that make your funds accessible from anywhere",
  },
  {
    emoji: ":globe_with_meridians:",
    description:
      "Web wallets that let you interact with your account via a web browser",
  },
  {
    emoji: ":desktop_computer:",
    description:
      "Desktop applications if you prefer to manage your funds via MacOS, windows or linux",
  },
]

const WhatIsEthereumPage = ({ data }) => {
  const actions = [
    {
      title: "ETH",
      to: "/eth/",
      alt: "The symbol for Ether (ETH)",
      image: data.eth.childImageSharp.fixed,
      description:
        "Ethereum's native cryptocurrency and equivalent to Bitcoin. You can use ETH on Ethereum applications or for sending value to friends and family. ",
    },
    {
      title: "Wallets",
      to: "/wallets/",
      alt:
        "An illustration of a robot with a safe for a torso, used to represent Ethereum wallets",
      image: data.wallets.childImageSharp.fixed,

      description:
        "How you manage your ETH and your Ethereum account. You'll need a wallet to get started – we'll help you choose one.",
    },
    {
      title: "Ethereum dapps",
      to: "/dapps/",
      alt:
        "An illustration of a doge using an Ethereum application on a computer",
      image: data.dapps.childImageSharp.fixed,
      description:
        "Products and services that run on Ethereum. There are dapps for finance, work, social media, gaming and more – meet the apps for our digital future.",
    },
  ]
  return (
    <Page>
      <PageMetadata
        title="What is Ethereum?"
        description="Learn about Ethereum, what it does and how to try it for yourself."
      />
      <HeroContent>
        <HeroContainer>
          <Header>
            <Title>Ethereum wallets</Title>
            <Slogan>Your key to your digital future</Slogan>
            <Subtitle>Ethereum wallets are free.</Subtitle>
            <SubtitleTwo>
              They’re your access to your funds and Ethereum applications.
            </SubtitleTwo>
            <SubtitleThree>
              Only you should have access to your wallet.
            </SubtitleThree>
            <Button to="#">Find a wallet</Button>
          </Header>
          <Hero
            fluid={data.hero.childImageSharp.fluid}
            alt="Illustration of a person peering into a bazaar, meant to represent Ethereum"
            loading="eager"
          />
        </HeroContainer>
      </HeroContent>
      <GrayContainer>
        <Intro>
          <h2>What's a wallet?</h2>
        </Intro>
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
      <TwoColumnContent>
        <Column>
          <h2>Wallets 101</h2>
          <p>
            Ethereum wallets are applications that let you interact with your
            Ethereum account. Think of it like an internet banking app – without
            the bank. Your wallet lets you read your balance, send transactions
            and connect to applications.
          </p>
          <p>
            You need a wallet to send funds and manage your{" "}
            <Link to="/eth">ETH</Link>
          </p>
          <p>
            Your wallet is only a tool for managing your Ethereum account. That
            means you can swap wallet providers at any time. Many wallets also
            let you manage several Ethereum accounts from one application.
          </p>
          <p>
            That's because wallets don't have custody of your funds, you do.
            They're just a tool for managing what's really yours.
          </p>
        </Column>
        <Column>
          <h2>Types of wallet</h2>
          <CardContainer>
            {types.map((type, idx) => {
              return (
                <WalletTypes
                  key={idx}
                  emoji={type.emoji}
                  title={type.title}
                  description={type.description}
                />
              )
            })}
          </CardContainer>
        </Column>
      </TwoColumnContent>
      <Content>
        <Divider />
        <ActionIntro>
          <h2>Try Ethereum</h2>
          <Subtitle>
            The best way to learn more is to download a wallet, get some ETH and
            try an Ethereum dapp.
          </Subtitle>
          <SubtitleTwo>Choose your adventure!</SubtitleTwo>
        </ActionIntro>
        <ActionCardContainer>
          {actions.map((action, idx) => {
            return (
              <ActionCard
                key={idx}
                to={action.to}
                alt={action.alt}
                image={action.image}
                title={action.title}
                description={action.description}
              />
            )
          })}
        </ActionCardContainer>
      </Content>
      <TwoColumnContent>
        <Column>
          <h2>Explore Ethereum</h2>
        </Column>
      </TwoColumnContent>
      <Content>
        <CardContainer>
          <StyledCallout
            image={data.developers.childImageSharp.fixed}
            title="Make something with Ethereum"
            alt="An illustration of a hand creating an ETH logo made of lego bricks"
            description="If you want to try building something, Ethereum studio will introduce you to the code. You'll also find more tutorials and resources that will help you get started."
          >
            <div>
              <Button to="/build/">Start building</Button>
            </div>
          </StyledCallout>
          <StyledCallout
            image={data.community.childImageSharp.fixed}
            title="The Ethereum community"
            alt="An illustration of Ethereum community members working together"
            description="Our community includes people from all backgrounds, including artists, crypto-anarchists, fortune 500 companies, and now you. Find out how you can get involved today."
          >
            <div>
              <Button to="/community/">Meet the community</Button>
            </div>
          </StyledCallout>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default WhatIsEthereumPage

export const actionCardImage = graphql`
  fragment actionCardImage on File {
    childImageSharp {
      fixed(width: 368) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      fixed(height: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

// TODO replace `eth` image
export const query = graphql`
  query {
    hero: file(relativePath: { eq: "wallets-cropped.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    banner: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "home/doge_computer.png" }) {
      ...actionCardImage
    }
    wallets: file(relativePath: { eq: "wallets-cropped.png" }) {
      ...actionCardImage
    }
    eth: file(relativePath: { eq: "eth-logo.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    developers: file(relativePath: { eq: "home/developers_eth_lego.png" }) {
      ...calloutImage
    }
    community: file(relativePath: { eq: "home/enterprise.png" }) {
      ...calloutImage
    }
  }
`
