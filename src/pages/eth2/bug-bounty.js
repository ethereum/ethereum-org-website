import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Leaderboard from "../../components/Leaderboard"
import BugHuntCards from "../../components/BugHuntCards"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"
import CardList from "../../components/CardList"

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
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`

const LeaderboardContainer = styled.div`
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 8rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
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
  margin-top: 2rem;
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
  width: 100%;
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
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

const BugBountiesPage = ({ data }) => {
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

  const fullLeaderboard = [
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
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
  ]

  const clients = [
    {
      title: "Prysm",
      link: "https://prylabs.net/",
      image: data.prysmsmall.childImageSharp.fixed,
    },
    {
      title: "Lighthouse",
      link: "https://lighthouse-book.sigmaprime.io/",
      image: data.lighthousesmall.childImageSharp.fixed,
    },
    {
      title: "Teku",
      link: "https://pegasys.tech/teku",
      image: data.tekusmall.childImageSharp.fixed,
    },
  ]

  const specs = [
    {
      title: "Beacon chain",
      link: "https://github.com",
    },
    {
      title: "Fork choice",
      link: "https://github.com",
    },
    {
      title: "Solidity deposit contract",
      link: "https://github.com",
    },
    {
      title: "Peer-to-peer networking",
      link: "https://github.com",
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
            <Row>
              <On />
              <Title>Open for submissions</Title>
            </Row>
            <SloganGradient>
              Eth2 bug bounties <Emoji size={1} text=":bug:" />
            </SloganGradient>
            <Subtitle>
              Earn up to $50,000 USD and a place on the leaderboard by finding
              Eth2 protocols and clients bugs.
            </Subtitle>
            <ButtonRow>
              <StyledButton to="#">Submit a bug</StyledButton>
              <StyledButton isSecondary to="#">
                Read rules
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={bugHunters} />
            <ButtonLink isSecondary to="#">
              See full leaderboard
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>Clients featured in the bounties</ClientIntro>
      <Row>
        <Client fixed={data.prysm.childImageSharp.fixed} />
        <Client fixed={data.lighthouse.childImageSharp.fixed} />
        <Client fixed={data.teku.childImageSharp.fixed} />
      </Row>
      <StyledGrayContainer>
        <Content>
          <H2>Valid bugs</H2>
          <p>
            This bug bounty program is focused on finding bugs in the core Eth2{" "}
            <Link to="/en/eth2/beacon-chain/">Beacon chain</Link> specification
            and the following client implementations:{" "}
            <Link to="https://prylabs.net/">Prysm</Link>,{" "}
            <Link to="https://lighthouse-book.sigmaprime.io/">Lighthouse</Link>,
            and <Link to="https://pegasys.tech/teku">Teku</Link>
          </p>
          <StyledCardContainer>
            <StyledCard
              emoji=":ledger:"
              title="The beacon chain specification bugs"
              description="The beacon chain spec..."
            >
              <h4>Types of bug</h4>
              <ul>
                <li>safety/finality-breaking bugs.</li>
                <li>denial of service (DOS) vectors</li>
                <li>
                  inconsistencies in assumptions, like situations where honest
                  validators can be slashed.
                </li>
                <li>calculation or parameter inconsistencies.</li>
              </ul>
              <Link to="#">Read the full spec</Link>
              <h4>Helpful resources</h4>
              <CardList content={specs} />
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title="Eth2 client bugs"
              description="The clients..."
            >
              <h4>Types of bug</h4>
              <ul>
                <li>spec non-compliance issues.</li>
                <li>
                  unexpected crashes or denial of service (DOS) vulnerabilities.
                </li>
                <li>
                  {" "}
                  any issues causing irreparable consensus splits from the rest
                  of the network.
                </li>
              </ul>
              <p>
                More clients will be added as they complete audits and become
                production ready.
              </p>
              <h4>Helpful links</h4>
              <CardList content={clients} />
            </StyledCard>
          </StyledCardContainer>
          <H2>Not included</H2>
          <p>
            The <Link to="/en/eth2/shard-chains/">shard chains</Link> and{" "}
            <Link to="/en/eth2/docking/">docking</Link> upgrades are still in
            active development and so are not yet included as part of this
            bounty program.
          </p>
        </Content>
      </StyledGrayContainer>
      <Content>
        <Row>
          <div>
            <H2>Submit a bug</H2>
            <p>
              For each bug you find you’ll be rewarded points. The points you
              earn depend on the severity of the bug. The EF determine severity
              using the <Link to="#">OWASP method</Link>.
            </p>
            <p>The EF wil also award points based on:</p>
            <p>
              <b>Quality of description</b>: Higher rewards are paid for clear,
              well-written submissions.
            </p>
            <p>
              <b>Quality of reproducibility</b>: Please include test code,
              scripts and detailed instructions. The easier it is for us to
              reproduce and verify the vulnerability, the higher the reward.
            </p>
            <p>
              <b>Quality of fix</b>, if included: Higher rewards are paid for
              submissions with clear description of how to fix the issue.
            </p>
          </div>
          <PointsExchange>
            <PointsExchangeLabel>Points Exchange</PointsExchangeLabel>
            <PointsExchangeTitle>1 point</PointsExchangeTitle>
            <ValueRow>
              <Row>
                <Emoji marginRight={0.5} text=":dollar:" />
                <TokenValue>2 USD</TokenValue>
              </Row>
              <Row>
                <Token fixed={data.dai.childImageSharp.fixed} />
                <TokenValue>2.21345</TokenValue>
              </Row>
              <Row>
                <Token fixed={data.eth.childImageSharp.fixed} />
                <TokenValue>0.0012334</TokenValue>
              </Row>
            </ValueRow>
            <p>
              The Ethereum Foundation will pay out the value of USD in ETH or
              DAI.
            </p>
            <TextNoMargin>
              <em>
                The Ethereum Foundation reserves the right to change this
                without prior notice.
              </em>
            </TextNoMargin>
          </PointsExchange>
        </Row>
      </Content>
      <BugHuntCards />
      <Rules>
        <H2>Bug hunting rules</H2>
        <p>
          <em>
            The bug bounty program is an experimental and discretionary rewards
            program for our active Ethereum community to encourage and reward
            those who are helping to improve the platform. It is not a
            competition. You should know that we can cancel the program at any
            time, and awards are at the sole discretion of Ethereum Foundation
            bug bounty panel. In addition, we are not able to issue awards to
            individuals who are on sanctions lists or who are in countries on
            sanctions lists (e.g. North Korea, Iran, etc). You are responsible
            for all taxes. All awards are subject to applicable law. Finally,
            your testing must not violate any law or compromise any data that is
            not yours.
          </em>
        </p>
        <p>
          <ul>
            <li>
              Issues that have already been submitted by another user or are
              already known to spec and client maintainers are not eligible for
              bounty rewards.
            </li>
            <li>
              Public disclosure of a vulnerability makes it ineligible for a
              bounty.
            </li>
            <li>
              Ethereum Foundation researchers and employees of Eth2 client teams
              are not eligible for rewards.
            </li>
            <li>
              Ethereum bounty program considers a number of variables in
              determining rewards. Determinations of eligibility, score and all
              terms related to an award are at the sole and final discretion of
              the Ethereum Foundation bug bounty panel.
            </li>
          </ul>
        </p>
      </Rules>
      <FullLeaderboardContainer>
        <H2>Bug hunting leaderboard</H2>
        <p>Find Eth2 bugs to get added to this leaderboard</p>
        <Leaderboard content={fullLeaderboard} />
      </FullLeaderboardContainer>
      <Contact>
        <div>
          <H2>Questions?</H2>
          <TextNoMargin>
            Email us at{" "}
            <Link to="mailto:eth2bounty@ethereum.org">
              eth2bounty@ethereum.org
            </Link>
          </TextNoMargin>
        </div>
        <Emoji size={3} text=":email:" />
      </Contact>
    </Page>
  )
}

export default BugBountiesPage

export const Avatar = graphql`
  fragment Avatar on File {
    childImageSharp {
      fixed(width: 40) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const ClientLogos = graphql`
  fragment ClientLogos on File {
    childImageSharp {
      fixed(width: 80) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const ClientLogosSmall = graphql`
  fragment ClientLogosSmall on File {
    childImageSharp {
      fixed(width: 24) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const TokenLogo = graphql`
  fragment TokenLogo on File {
    childImageSharp {
      fixed(width: 24) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    example: file(relativePath: { eq: "eth2/avatar_example.png" }) {
      ...Avatar
    }
    prysm: file(relativePath: { eq: "eth2/prysm.png" }) {
      ...ClientLogos
    }
    lighthouse: file(relativePath: { eq: "eth2/lighthouse.png" }) {
      ...ClientLogos
    }
    teku: file(relativePath: { eq: "eth2/teku.png" }) {
      ...ClientLogos
    }
    prysmsmall: file(relativePath: { eq: "eth2/prysm.png" }) {
      ...ClientLogosSmall
    }
    lighthousesmall: file(relativePath: { eq: "eth2/lighthouse.png" }) {
      ...ClientLogosSmall
    }
    tekusmall: file(relativePath: { eq: "eth2/teku.png" }) {
      ...ClientLogosSmall
    }
    dai: file(relativePath: { eq: "eth2/dai.png" }) {
      ...TokenLogo
    }
    eth: file(relativePath: { eq: "eth2/eth.png" }) {
      ...TokenLogo
    }
  }
`
