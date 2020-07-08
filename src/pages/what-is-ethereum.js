import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import ActionCard from "../components/ActionCard"
import Callout from "../components/Callout"
import Button from "../components/Button"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 4rem auto 0;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem;
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

// TODO use theme variables
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

const HeroContainer = styled.div`
  display: flex;
`

const Hero = styled(Img)`
  flex: 1 1 800px;
  max-width: 800px;
`

const Header = styled.header`
  margin-top: 12rem;
`

// TODO use theme variables
const GrayContainer = styled.div`
  margin-top: -14rem;
  padding: 4rem 2rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
    #ffffff;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
`

const Column = styled.div`
  width: 50%;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledCard = styled(Card)`
  flex: 1 1 424px;
  margin: 1rem;
  padding: 1.5rem;
`

const Banner = styled.div`
  background: url("https://ethereum.org/static/6b43bf17d918f936ead1675032294b8c/96d01/hero.png");
  opacity: 0.3;
  display: flex;
  width: 100%;
  height: 400px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem;
  }
`

const SingleCard = styled(StyledCard)`
  max-width: 424px;
  margin: 7rem;
`
const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
`

const CalloutContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 7rem;
  padding: 1rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem;
  }
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
    emoji: ":detective:",
    title: "A more private internet",
    description:
      "You don’t need to provide all your personal details to use Ethereum. And no one is selling your data on to the highest bidder.",
  },
  {
    emoji: ":receipt:",
    title: "Cheaper services",
    description:
      "Ethereum applications can run without intemediaries, passing on savings to you.",
  },
  {
    emoji: ":shield:",
    title: "Censorship-resistant",
    description:
      "No government or company can control what lives on Ethereum. No one can stop you receiving payments or using services on Ethereum. ",
  },
  {
    emoji: ":shopping:",
    title: "Better opportunities",
    description:
      "The Ethereum marketplace is a more level playing field. Your customers have a secure, built-in guarantee that funds will only change hands if you provide what was agreed. You don’t need large company clout to do business.",
  },
  {
    emoji: ":handshake:",
    title: "Collaboration over competition",
    description:
      "Companies learn from each other through open-source software. Products work better together and innovate faster because all code is publicly available.",
  },
]

const actions = [
  {
    title: "ETH",
    description:
      "Ethereum’s native cryptocurrency and equivalent to Bitcoin. You can use ETH on Ethereum applications or for sending value to friends and family. ",
  },
  {
    title: "Wallets",
    description:
      "How you manage your ETH and your Ethereum account. You’ll need a wallet to get started – we’ll help you choose one.",
  },
  {
    title: "Ethereum dapps",
    description:
      "Products and services that run on Ethereum. There’s dapps for finance, work, social media, gaming and more – meet the apps for our digital future.",
  },
]

const WhatIsEthereumPage = ({ data }) => {
  return (
    <Page>
      <Content>
        <HeroContainer>
          <Header>
            <Title>What is Ethereum?</Title>
            <Slogan>The foundation for our digital future</Slogan>
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
        <Column>
          <h2>What is Ethereum?</h2>
          <p>
            Ethereum is open access to digital money and data-friendly services
            for everyone – no matter your background or location. It’s a
            community-built technology behind the cryptocurrency Ether and
            thousands of applications you can use today.
          </p>
        </Column>
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
      <Banner>
        <h2>
          Welcome to Ethereum. <br />
          We hope you stay.
        </h2>
      </Banner>
      <TwoColumnContent>
        <Column>
          <h2>Ethereum</h2>
          <p>
            Ethereum is <i>the world’s programmable blockchain.</i>
          </p>
          <h3>What this really means... </h3>
          <p>
            Ethereum is a technology that allows you to send cryptocurrency to
            anyone, anywhere in the world for a small fee. It also powers
            applications and services that everyone can use and no one can take
            down.
          </p>
          <p>Ethereum launched in 2015 and has been growing ever since.</p>
          <p>
            Inspired by Bitcoin, Ethereum’s creators believed Bitcoin was only
            scratching the surface of blockchain technology. Bitcoin lets you
            send value to others securely without a trusted third party.
            Ethereum does that and powers digital services that you don't need
            to pay for with your personal data. Blockchain is technical and
            quite complicated. Luckily, you don’t need to understand how
            blockchains work to use Ethereum.
          </p>
        </Column>
        <Column>
          <SingleCard
            emoji=":gear:"
            title="How Ethereum works"
            description="If you’re interested in blockchain and the technical side of Ethereum,we’ve got you covered."
          >
            <a href="#">How Ethereum works</a>
          </SingleCard>
        </Column>
      </TwoColumnContent>
      <TwoColumnContent>
        <Column>
          <h2>Try Ethereum</h2>
          <p>
            The best way to learn more about Ethereum is to download a wallet,
            buy some Ether and try out an Ethereum application. We’ve got guides
            to help you navigate this new digital frontier. Choose your
            adventure.
          </p>
        </Column>
      </TwoColumnContent>
      <Content>
        <CardContainer>
          <ActionCard
            to="#"
            image="http://localhost:8000/static/22580a5e7d69e200d6b2d2131904fbdf/32411/doge_computer.png"
            title="ETH"
            description="Ethereum’s native cryptocurrency and equivalent to Bitcoin. You can use ETH on Ethereum applications or for sending value to friends and family. "
          />
          <ActionCard
            to="#"
            image="http://localhost:8000/static/22580a5e7d69e200d6b2d2131904fbdf/32411/doge_computer.png"
            title="Wallets"
            description="How you manage your ETH and your Ethereum account. You’ll need a wallet to get started – we’ll help you choose one."
          />
          <ActionCard
            to="#"
            image="http://localhost:8000/static/22580a5e7d69e200d6b2d2131904fbdf/32411/doge_computer.png"
            title="Ethereum dapps"
            description="Products and services that run on Ethereum. There’s dapps for finance, work, social media, gaming and more – meet the apps for our digital future."
          />
        </CardContainer>
      </Content>
      <TwoColumnContent>
        <Column>
          <h2>Explore Ethereum</h2>
        </Column>
      </TwoColumnContent>
      <CalloutContainer>
        <StyledCallout
          image="http://localhost:8000/static/fce17312797633920b22de3016169f5d/32411/developers_eth_lego.png"
          title="Want to build with Ethereum?"
          description="We’ve got Ethereum studio for playing with code. If you’re completely new, you might want to read up on how Ethereum works."
        >
          <Button to="/build">Start building</Button>
          <Button isSecondary to="/build">
            How Ethereum works
          </Button>
        </StyledCallout>
        <StyledCallout
          image="http://localhost:8000/static/22580a5e7d69e200d6b2d2131904fbdf/32411/doge_computer.png"
          title="The Ethereum community"
          description="Our community includes people from all backgrounds, including artists, crypto-anarchists, fortune 500 companies, and now you. Find out how you can get involved today."
        >
          <Button to="/community">Meet the community</Button>
        </StyledCallout>
      </CalloutContainer>
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
