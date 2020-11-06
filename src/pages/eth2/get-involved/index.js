import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import { graphql } from "gatsby"
import Card from "../../../components/Card"
import Leaderboard from "../../../components/Leaderboard"
import CalloutBanner from "../../../components/CalloutBanner"
import Emoji from "../../../components/Emoji"
import ProductCard from "../../../components/ProductCard"
import ButtonLink from "../../../components/ButtonLink"
import PageMetadata from "../../../components/PageMetadata"
import CardList from "../../../components/CardList"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  Divider,
  SloganGradient,
} from "../../../components/SharedStyledComponents"

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

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
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

const ReverseRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Status = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
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

const On = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.success400};
  border-radius: 64px;
`

const StyledCardList = styled(CardList)`
  margin-right: 2rem;
`

const Title = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  margin-bottom: -2rem;
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

const RightColumn = styled.div`
  width: 50%;
  margin-left: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-right: 4rem;
    margin-bottom: -2rem;
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

const TemporaryCallout = styled(CalloutBanner)`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: -2rem;
    margin-right: -4rem;
  }
`

const GetInvolvedPage = ({ data }) => {
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  // TODO sort query isn't working :(
  const bountyHunters = data.bountyHunters.nodes.sort(
    (a, b) => b.score - a.score
  )
  const clients = [
    {
      name: "Prysm",
      background: "#23292E",
      description: "Written in Go",
      url: "https://prylabs.net/",
      image: data.prysm.childImageSharp.fixed,
    },
    {
      name: "Lighthouse",
      background: "",
      description: "Written in Rust",
      url: "https://lighthouse-book.sigmaprime.io/",
      image: isDarkTheme
        ? data.lighthouseDark.childImageSharp.fixed
        : data.lighthouseLight.childImageSharp.fixed,
    },
    {
      name: "Teku",
      background: "#3359D5",
      description: "Written in Java",
      url: "https://pegasys.tech/teku",
      image: isDarkTheme
        ? data.tekuLight.childImageSharp.fixed
        : data.tekuDark.childImageSharp.fixed,
    },
    {
      name: "Cortex",
      background: "#4CAEE5",
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
      background: "#0B131E",
      description: "Written in Python",
      url: "https://trinity.ethereum.org/",
      image: data.trinity.childImageSharp.fixed,
    },
  ]

  const ethresearch = [
    {
      title: "Sharding",
      description: "",
      link: "https://ethresear.ch/c/sharding/6",
    },
    {
      title: "Eth1 to Eth2 transition",
      description: "",
      link: "https://ethresear.ch/c/eth1-to-eth2-transition/38",
    },
    {
      title: "Shards and state execution",
      description: "",
      link: "https://ethresear.ch/c/eth2-phase-2/35",
    },
    {
      title: "All research topics",
      description: "",
      link: "https://ethresear.ch/",
    },
  ]

  const paths = [
    {
      emoji: ":computer:",
      title: "Run a client",
      description:
        "Running a client means you'll be an active participant in Ethereum. Your client will help keep track of transactions and check new blocks.",
      url: "#clients",
      button: "See clients",
    },
    {
      emoji: ":moneybag:",
      title: "Stake your ETH",
      description:
        "If you have ETH, you can stake it to become a validator and help secure the network. As a validator you can earn ETH rewards.",
      url: "/eth2/staking/",
      button: "More on staking",
    },
    {
      emoji: ":bug:",
      title: "Find bugs",
      description:
        "Join the community testing effort! Help test the Eth2 upgrades before they're shipped, find  bugs, and earn rewards.",
      url: "/eth2/get-involved/bug-bounty/",
      button: "Find bugs",
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
        <H2>How do you want to get involved?</H2>
        <p>
          The Ethereum community will always benefit from more folks running
          clients, staking, and bug hunting.
        </p>
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
        <TemporaryCallout
          image={data.rhino.childImageSharp.fluid}
          title="Staking community grants"
          description="Help create tooling and educational content for the staking community"
        >
          <div>
            <ButtonLink to="/eth2/get-involved/staking-community-challenge/">
              More info
            </ButtonLink>
          </div>
          <Status>
            <On />
            <Title>Closing date: 10 December 2020</Title>
          </Status>
        </TemporaryCallout>
      </Content>
      <Divider id="clients" />
      <Content>
        <H2>Run beacon chain clients</H2>
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
              <ButtonLink to="/eth2/get-involved/bug-bounty/">
                Go bug hunting
              </ButtonLink>
            </LeftColumn>
            <LeaderboardContainer>
              <Leaderboard content={bountyHunters} limit={5} />
            </LeaderboardContainer>
          </Row>
        </Content>
      </StyledGrayContainer>
      <Content>
        <ReverseRow>
          <LeaderboardContainer>
            <StyledCardList content={ethresearch} />
          </LeaderboardContainer>
          <RightColumn>
            <H2>Join the research</H2>
            <p>
              Like most things with Ethereum, a lot of the research is public.
              This means you can take part in the discussions or just read
              through what the Ethereum researchers have to say. ethresear.ch
              covers more than just the Eth2 upgrades, but there's a large Eth2
              focus.
            </p>
          </RightColumn>
        </ReverseRow>
      </Content>
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
    lighthouseLight: file(relativePath: { eq: "eth2/lighthouse-light.png" }) {
      ...Clients
    }
    lighthouseDark: file(relativePath: { eq: "eth2/lighthouse-dark.png" }) {
      ...Clients
    }
    tekuDark: file(relativePath: { eq: "eth2/teku-dark.png" }) {
      ...Clients
    }
    tekuLight: file(relativePath: { eq: "eth2/teku-light.png" }) {
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
