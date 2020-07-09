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

// TODO use theme variables
const GrayContainer = styled.div`
  margin-top: -14rem;
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.grayBackground};
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: 1280px) {
    margin-top: -13rem;
  }
  @media (max-width: 1160px) {
    margin-top: -11rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -10rem;
  }
  @media (max-width: 920px) {
    margin-top: -10rem;
  }
  @media (max-width: 870px) {
    margin-top: -9rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0rem;
    box-shadow: none;
  }
`

const Intro = styled.div`
  max-width: 608px;
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
  max-width: 420px;
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
`

const SingleCard = styled(StyledCard)`
  margin: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 2rem;
  }
  a {
    text-decoration: underline;
  }
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
`

// TODO fill out copy
const cards = [
  {
    emoji: ":money_bag:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":detective:",
    title: "A more private internet",
    description:
      "You don't need to provide all your personal details to use Ethereum. And no one is selling your data on to the highest bidder.",
  },
  {
    emoji: ":money_with_wings:",
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
    emoji: ":shopping_bags:",
    title: "Better opportunities",
    description:
      "The Ethereum marketplace is a more level playing field. Your customers have a secure, built-in guarantee that funds will only change hands if you provide what was agreed. You don't need large company clout to do business.",
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
      "Ethereum's native cryptocurrency and equivalent to Bitcoin. You can use ETH on Ethereum applications or for sending value to friends and family. ",
  },
  {
    title: "Wallets",

    description:
      "How you manage your ETH and your Ethereum account. You'll need a wallet to get started – we'll help you choose one.",
  },
  {
    title: "Ethereum dapps",
    description:
      "Products and services that run on Ethereum. There's dapps for finance, work, social media, gaming and more – meet the apps for our digital future.",
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
        <Intro>
          <h2>What is Ethereum?</h2>
          <p>
            Ethereum is open access to digital money and data-friendly services
            for everyone – no matter your background or location. It's a
            community-built technology behind the cryptocurrency Ether and
            thousands of applications you can use today.
          </p>
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
      <BannerContainer>
        <Banner fluid={data.banner.childImageSharp.fluid} />
        <BannerMessage>
          Welcome to Ethereum. <br />
          We hope you stay.
        </BannerMessage>
      </BannerContainer>
      <TwoColumnContent>
        <Column>
          <h2>Ethereum</h2>
          <p>
            Ethereum is <i>the world's programmable blockchain.</i>
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
            Inspired by Bitcoin, Ethereum's creators believed Bitcoin was only
            scratching the surface of blockchain technology. Bitcoin lets you
            send value to others securely without a trusted third party.
            Ethereum does that and powers digital services that you don't need
            to pay for with your personal data. Blockchain is technical and
            quite complicated. Luckily, you don't need to understand how
            blockchains work to use Ethereum.
          </p>
        </Column>
        <CardColumn>
          <SingleCard
            emoji=":gear:"
            title="How Ethereum works"
            description="If you're interested in blockchain and the technical side of Ethereum, we've got you covered."
          >
            <a href="#">How Ethereum works</a>
          </SingleCard>
        </CardColumn>
      </TwoColumnContent>
      <TwoColumnContent>
        <Column>
          <h2>Try Ethereum</h2>
          <p>
            The best way to learn more about Ethereum is to download a wallet,
            buy some Ether and try out an Ethereum application. We've got guides
            to help you navigate this new digital frontier. Choose your
            adventure.
          </p>
        </Column>
      </TwoColumnContent>
      <Content>
        <ActionCardContainer>
          <ActionCard
            to="/eth/"
            image={data.eth.childImageSharp.fixed}
            title="ETH"
            description="Ethereum's native cryptocurrency and equivalent to Bitcoin. You can use ETH on Ethereum applications or for sending value to friends and family. "
          />
          <ActionCard
            to="/wallets/"
            image={data.wallets.childImageSharp.fixed}
            title="Wallets"
            description="How you manage your ETH and your Ethereum account. You'll need a wallet to get started – we'll help you choose one."
          />
          <ActionCard
            to="/dapps/"
            image={data.dapps.childImageSharp.fixed}
            title="Ethereum dapps"
            description="Products and services that run on Ethereum. There's dapps for finance, work, social media, gaming and more – meet the apps for our digital future."
          />
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
            image={data.developers.childImageSharp.fluid}
            maxImageWidth={"350px"}
            title="Want to build with Ethereum?"
            description="We've got Ethereum studio for playing with code. If you're completely new, you might want to read up on how Ethereum works."
          >
            <div>
              <Button to="/build/">Start building</Button>
            </div>
          </StyledCallout>
          <StyledCallout
            maxImageWidth={"240px"}
            image={data.community.childImageSharp.fluid}
            title="The Ethereum community"
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
      fixed(width: 372) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      fluid(maxHeight: 250) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

// TODO replace `eth` image
export const query = graphql`
  query {
    hero: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
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
    eth: file(relativePath: { eq: "wallets-cropped.png" }) {
      ...actionCardImage
    }
    developers: file(relativePath: { eq: "home/developers_eth_lego.png" }) {
      childImageSharp {
        fluid(maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    community: file(relativePath: { eq: "home/enterprise.png" }) {
      ...calloutImage
    }
  }
`
