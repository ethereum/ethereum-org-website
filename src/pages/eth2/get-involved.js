import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Leaderboard from "../../components/Leaderboard"
import CalloutBanner from "../../components/CalloutBanner"
import Emoji from "../../components/Emoji"
import ProductCard from "../../components/ProductCard"

import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
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

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: -3rem;
  display: flex;
  flex-direction: column;
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

const StyledCalloutBanner = styled(CalloutBanner)`
  background: transparent;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: -2rem;
    margin-right: -4rem;
  }
`

const GetInvolvedPage = ({ data }) => {
  // TODO sort query isn't working :(
  const bountyHunters = data.bountyHunters.nodes.sort(
    (a, b) => b.score - a.score
  )
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

  return (
    <Page>
      <PageMetadata
        title="Get involved in Eth2"
        description="How to participate in Eth2: run nodes, stake, hunt bugs and more."
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
              <ButtonLink to="/eth2/bug-bounty/">Go bug hunting</ButtonLink>
            </LeftColumn>
            <LeaderboardContainer>
              <Leaderboard content={bountyHunters} limit={5} />
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
            <ButtonLink to="/eth2/staking/">Stake ETH</ButtonLink>
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

export const query = graphql`
  query {
    bountyHunters: allEth2BountyHuntersCsv(
      sort: { order: DESC, fields: score }
    ) {
      nodes {
        username
        name
        score
      }
    }
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
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
