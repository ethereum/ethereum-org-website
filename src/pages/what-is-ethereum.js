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
    emoji: ":bank:",
    title: "Banking for everyone",
    description:
      "Not everyone has access to financial services. But all you need to access Ethereum and its lending, borrowing and savings products is an internet connection.",
  },
  {
    emoji: ":detective:",
    title: "A more private internet",
    description:
      "You don't need to provide all your personal details to use an Ethereum app. Ethereum is building an economy based on value, not surveillance.",
  },
  {
    emoji: ":busts_in_silhouette:",
    title: "A peer-to-peer network",
    description:
      "Ethereum allows you to move money, or make agreements, directly with someone else. You don't need to go through intermediary companies.",
  },
  {
    emoji: ":shield:",
    title: "Censorship-resistant",
    description:
      "No government or company has control over Ethereum. This decentralization makes it nearly impossible for anyone to stop you receiving payments or using services on Ethereum. ",
  },
  {
    emoji: ":shopping_bags:",
    title: "Commerce guarantees",
    description:
      "Ethereum creates a more level playing field. Customers have a secure, built-in guarantee that funds will only change hands if you provide what was agreed. You don’t need large company clout to do business.",
  },
  {
    emoji: ":handshake:",
    title: "Compatability for the win",
    description:
      "Better products and experiences are being built all the time because Ethereum products are compatible by default. Companies can build on each other's success.",
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
            <Title>What is Ethereum?</Title>
            <Slogan>The foundation for our digital future</Slogan>
            <Subtitle>Ethereum is open to everyone. </Subtitle>
            <SubtitleTwo> All you need is a wallet to take part.</SubtitleTwo>
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
          <p>
            Ethereum is open access to digital money and data-friendly services
            for everyone – no matter your background or location. It's a
            community-built technology behind the cryptocurrency Ether (ETH) and
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
        <Banner
          fluid={data.banner.childImageSharp.fluid}
          alt="An illustration of characters in a social space dedicated to Ethereum with a large ETH logo"
        />
        <BannerMessage>
          Welcome to Ethereum. <br />
          We hope you stay.
        </BannerMessage>
      </BannerContainer>
      <TwoColumnContent>
        <Column>
          <h2>Ethereum 101</h2>
          <p>
            Ethereum is a technology that lets you send cryptocurrency to anyone
            for a small fee. It also powers applications that everyone can use
            and no one can take down.
          </p>
          <p>
            <strong>
              It's <i>the world's programmable blockchain.</i>
            </strong>
          </p>
          <p>
            Ethereum builds on Bitcoin's innovation, with some big differences.
          </p>
          <p>
            Both let you use digital money without payment providers or banks.
            But Ethereum is programmable, so you can also use it for lots of
            different digital assets – even Bitcoin!
          </p>
          <p>
            This also means Ethereum is for more than payments. It's a
            marketplace of financial services, games and apps that can't steal
            your data or censor you.
          </p>
          <p>So step into the bazaar and give it a try...</p>
        </Column>
        <CardColumn>
          <SingleCard
            emoji=":gear:"
            title="How Ethereum works"
            description="If you're interested in blockchain and the technical side of Ethereum, we've got you covered."
          >
            <Link to="/learn/">How Ethereum works</Link>
          </SingleCard>
        </CardColumn>
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
