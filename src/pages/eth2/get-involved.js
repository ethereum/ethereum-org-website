import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Leaderboard from "../../components/Leaderboard"
import BugHuntCards from "../../components/BugHuntCards"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"
import ProductCard from "../../components/ProductCard"

import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  Divider,
} from "../../components/SharedStyledComponents"

const HeroContainer = styled.div`
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 2rem;
    padding-left: 0rem;
    width: 100%;
  }
`
const LeaderboardContainer = styled.div`
  padding-left: 0rem;
  padding-top: 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-top: 2rem;
  }
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-right: 3rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    align-self: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-left: 0;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
  max-width: 780px;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.white600};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const SloganGradient = styled.h1`
  font-weight: 800;
  font-size: 48px;
  line-height: 140%;
  max-width: 720px;
  margin-top: 1rem;
  background-clip: text;
  background-image: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #1c1ce1 61.77%,
    #000000 69.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const Title = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
`

const Image = styled(Img)``

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
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

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const HeroCopyContainer = styled.div`
  flex: 0 1 500px;
  max-width: 500px;
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

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  border: 0px;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-right: 1rem;
`

const Definition = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
  z-index: 999;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const GhostBox = styled.div`
  top: 739px;
  position: absolute;
  width: 46.5%;
  height: 22%;
  left: 40px;
  background-color: ${(props) => props.theme.colors.white600};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    top: 1043px;
    width: 87%;
    height: 31.5%;
  }
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

const WarningMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
`

const StyledWarning = styled(Warning)`
  margin-top: 0rem;
  margin-left: 2rem;
  width: 100%;
`

const Vision = styled.div`
  margin-top: 4rem;
`

const ContributeCard = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 3rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    margin-right: 0rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const ContributeButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin-top: 1.5rem;
  }
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: -3rem;
  display: flex;
  flex-direction: column;
`

const StakingColumns = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const On = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.success400};
  border-radius: 64px;
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    margin-top: 2rem;
  }
`

const LeftColumn = styled.div`
  width: 50%;
  margin-right: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: 4rem;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const FullLeaderboardContainer = styled.div`
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 4rem 20rem;
  margin: 2rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightColumn = styled.div`
  width: 100%;
  margin-left: 2rem;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    flex-direction: column;
  }
`

const Faq = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StakingImage = styled.div`
  display: flex;
  justify-content: center;
`

const Client = styled(Img)`
  margin: 4rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`

const ClientIntro = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
  font-weight: 600;
`

const Rules = styled.div`
  padding: 0rem 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubmitBug = styled.div`
  margin: 4rem 0rem;
`

const PointsExchange = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  margin: 0rem 2rem;
`

const PointsExchangeLabel = styled.p`
  text-transform: uppercase;
  font-size: 14px;
`

const PointsExchangeTitle = styled.h2`
  font-family: "SFMono-Regular", monospace;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0rem;
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
`

const Token = styled(Img)`
  margin-right: 0.5rem;
`

const TokenValue = styled.p`
  font-size: 20px;
  margin: 0rem;
  margin-right: 1rem;
`

const ValueRow = styled(Row)`
  margin-bottom: 2rem;
`

const Contact = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 8rem;
  width: 80%;
`

const StyledCalloutBanner = styled(CalloutBanner)`
  background: transparent;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: -2rem;
    margin-right: -4rem;
  }
`

const GetInvolvedPage = ({ data }) => {
  const clients = [
    {
      name: "Prysm",
      background: "",
      description: "Written in Go",
      url: "https://prylabs.net/",
      image: data.prysm.childImageSharp.fixed,
    },
    {
      name: "Lighthouse",
      background: "",
      description: "Written in Rust",
      url: "https://lighthouse-book.sigmaprime.io/",
      image: data.lighthouse.childImageSharp.fixed,
    },
    {
      name: "Teku",
      backgrund: "#3359D5",
      description: "Written in Java",
      url: "https://pegasys.tech/teku",
      image: data.teku.childImageSharp.fixed,
    },
    {
      name: "Cortex",
      backgrund: "",
      description: "Written in .NET",
      url: "https://nethermind.io/",
      image: data.cortex.childImageSharp.fixed,
    },
    {
      name: "Lodestar",
      background: "#14140B",
      description: "Written in JavaScript",
      url: "https://chainsafe.io/",
      image: data.lodestar.childImageSharp.fixed,
    },
    {
      name: "Nimbus",
      background: "#DC8600",
      description: "Written in Nim",
      url: "https://nimbus.team/",
      image: data.nimbus.childImageSharp.fixed,
    },
    {
      name: "Trinity",
      backgrund: "#0B131E",
      description: "Written in Python",
      url: "https://trinity.ethereum.org/",
      image: data.trinity.childImageSharp.fixed,
    },
  ]

  const bugHunters = [
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
      emoji: ":trophy:",
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
      emoji: ":2nd_place_medal:",
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
      emoji: ":3rd_place_medal:",
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title="Eth2 bug hunting bounty program"
        description="An overview of the Ethereum 2.0 bug hunting program: how to get involved and reward information."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <SloganGradient>
              Get involved in Eth2 <Emoji size={1} text=":wave:" />
            </SloganGradient>
            <Subtitle>
              Here's all the ways you can help with Ethereum and future
              Eth2-related efforts.
            </Subtitle>
          </HeroContainer>
        </HeroCard>
      </Content>
      <Content>
        <H2 id="#clients">Run beacon chain clients</H2>
        <p>
          Key to Ethereum's long term security is a strong distribution of
          clients. A client is software that runs the blockchain, checking
          transactions and the creation of new blocks. Each client has its own
          features, so choose one based on what you're comfortable with.
        </p>
        <StyledCardContainer>
          {clients.map((client, idx) => {
            return (
              <ProductCard
                key={idx}
                url={client.url}
                background={client.background}
                image={client.image}
                name={client.name}
                description={client.description}
              />
            )
          })}
        </StyledCardContainer>
      </Content>
      <StyledGrayContainer>
        <Content>
          <Row>
            <LeftColumn>
              <H2 id="#bug-bounty">Go bug hunting</H2>
              <p>
                Find and report bugs in Eth2 upgrade specifications or the
                clients themselves. You can earn up to $50,000 USD and earn a
                place on the leaderboard.
              </p>
              <p>A bug might be:</p>
              <p>
                <ul>
                  <li>specification non-compliance issues</li>
                  <li>finality breaking bugs</li>
                  <li>denial of service (DOS) vectors</li>
                  <li>and more...</li>
                </ul>
              </p>
              <ButtonLink to="/en/eth2/bug-bounty/">Go bug hunting</ButtonLink>
            </LeftColumn>
            <LeaderboardContainer>
              <Leaderboard content={bugHunters} />
            </LeaderboardContainer>
          </Row>
        </Content>
      </StyledGrayContainer>
      <Staking>
        <StyledCalloutBanner
          image={data.rhino.childImageSharp.fluid}
          title="Stake your ETH"
          description="You can now stake your ETH to help secure the beacon chain. "
        >
          <div>
            <ButtonLink to="/en/eth2/staking/">Stake ETH</ButtonLink>
          </div>
        </StyledCalloutBanner>
      </Staking>
    </Page>
  )
}

export default GetInvolvedPage

export const Clients = graphql`
  fragment Clients on File {
    childImageSharp {
      fixed(width: 80) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const Hunters = graphql`
  fragment Hunters on File {
    childImageSharp {
      fixed(width: 40) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    example: file(relativePath: { eq: "eth2/avatar_example.png" }) {
      ...Hunters
    }
    prysm: file(relativePath: { eq: "eth2/prysm.png" }) {
      ...Clients
    }
    lighthouse: file(relativePath: { eq: "eth2/lighthouse.png" }) {
      ...Clients
    }
    teku: file(relativePath: { eq: "eth2/teku_light.png" }) {
      ...Clients
    }
    cortex: file(relativePath: { eq: "eth2/cortex.png" }) {
      ...Clients
    }
    lodestar: file(relativePath: { eq: "eth2/lodestar.png" }) {
      ...Clients
    }
    trinity: file(relativePath: { eq: "eth2/trinity.png" }) {
      ...Clients
    }
    nimbus: file(relativePath: { eq: "eth2/nimbus.png" }) {
      ...Clients
    }
  }
`
