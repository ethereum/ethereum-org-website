import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../../components/Card"
import Leaderboard from "../../../components/Leaderboard"
import BugBountyCards from "../../../components/BugBountyCards"
import BugBountyPoints from "../../../components/BugBountyPoints"
import Link from "../../../components/Link"
import Emoji from "../../../components/Emoji"
import CardList from "../../../components/CardList"

import ButtonLink from "../../../components/ButtonLink"
import PageMetadata from "../../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  GradientContainer,
  SloganGradient,
} from "../../../components/SharedStyledComponents"

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
  }
`

const HeroContainer = styled.div`
  flex: 1 1 50%;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-bottom: 4rem;
    padding-left: 0;
    padding-right: 0;
  }
`

const LeaderboardContainer = styled.div`
  flex: 1 1 50%;
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0;
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

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const ClientRow = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(ButtonLink)`
  margin-top: 1rem;
  flex: 0 1 7.75rem;
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

const StyledCard = styled(Card)`
  flex: 1 1 464px;
  margin: 1rem;
  padding: 1.5rem;
  justify-content: flex-start;
`

const On = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.success400};
  border-radius: 64px;
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`

const FullLeaderboardContainer = styled.div`
  margin: 2rem auto;
  padding: 0 2rem;
  max-width: ${(props) => props.theme.breakpoints.m};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 3rem;
  }
`

const Rules = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.m};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubmitInstructions = styled.div`
  flex: 1 1 600px;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0;
  }
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
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
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  // TODO sort query isn't working :(
  const bountyHunters = data.bountyHunters.nodes.sort(
    (a, b) => b.score - a.score
  )

  const clients = [
    {
      title: "Prysm",
      link: "https://prylabs.net/",
      image: data.prysmSmall.childImageSharp.fixed,
    },
    {
      title: "Lighthouse",
      link: "https://lighthouse-book.sigmaprime.io/",
      image: isDarkTheme
        ? data.lighthouseSmallDark.childImageSharp.fixed
        : data.lighthouseSmallLight.childImageSharp.fixed,
    },
    {
      title: "Teku",
      link: "https://pegasys.tech/teku",
      image: isDarkTheme
        ? data.tekuSmallLight.childImageSharp.fixed
        : data.tekuSmallDark.childImageSharp.fixed,
    },
  ]

  const tekuImage = isDarkTheme
    ? data.tekuLight.childImageSharp.fixed
    : data.tekuDark.childImageSharp.fixed

  const lighthouseImage = isDarkTheme
    ? data.lighthouseDark.childImageSharp.fixed
    : data.lighthouseLight.childImageSharp.fixed

  const specs = [
    {
      title: "Beacon chain",
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/beacon-chain.md",
    },
    {
      title: "Fork choice",
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/fork-choice.md",
    },
    {
      title: "Solidity deposit contract",
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/deposit-contract.md",
    },
    {
      title: "Peer-to-peer networking",
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/p2p-interface.md",
    },
  ]
  return (
    <Page>
      <PageMetadata
        title="Eth2 bug hunting bounty program"
        description="An overview of the Eth2 bug hunting program: how to get involved and reward information."
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
              Eth2 protocol and client bugs.
            </Subtitle>
            <ButtonRow>
              <StyledButton
                mr={`1rem`}
                to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2"
              >
                Submit a bug
              </StyledButton>
              <StyledButton isSecondary to="#rules">
                Read rules
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={bountyHunters} limit={5} />
            <ButtonLink isSecondary to="#leaderboard">
              See full leaderboard
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>Clients featured in the bounties</ClientIntro>
      <ClientRow>
        <Client fixed={data.prysm.childImageSharp.fixed} />
        <Client fixed={lighthouseImage} />
        <Client fixed={tekuImage} />
      </ClientRow>
      <StyledGrayContainer id="rules">
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
              description="The beacon chain specification details the design rationale and proposed changes to Ethereum via the beacon chain upgrade."
            >
              <Link to="https://github.com/ethereum/eth2.0-specs">
                Read the full spec
              </Link>
              <br />
              <div>
                <p>
                  It might be helpful to check out the following annotations:
                </p>
                <ul>
                  <li>
                    <Link to="https://benjaminion.xyz/eth2-annotated-spec/">
                      Ben Edgington's annotated spec
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/ethereum/annotated-spec">
                      Vitalik Buterin's annotated spec
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
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
              </div>
              <div>
                <h4>Specification documents</h4>
                <CardList content={specs} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title="Eth2 client bugs"
              description="The clients will run the beacon chain once the upgrade has been deployed. Clients will need to follow the logic set out in the specification and be secure against potential attacks. The bugs we want to find are related to the implementation of the protocol."
            >
              <div>
                <p>
                  Only Prysm, Lighthouse, and Teku bugs are currently eligible
                  for this bounty. More clients will be added as they complete
                  audits and become production ready.
                </p>
                <h4>Types of bug</h4>
                <ul>
                  <li>spec non-compliance issues.</li>
                  <li>
                    unexpected crashes or denial of service (DOS)
                    vulnerabilities.
                  </li>
                  <li>
                    {" "}
                    any issues causing irreparable consensus splits from the
                    rest of the network.
                  </li>
                </ul>
              </div>
              <div>
                <h4>Helpful links</h4>
                <CardList content={clients} />
              </div>
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
          <SubmitInstructions>
            <H2>Submit a bug</H2>
            <p>
              For each bug you find you’ll be rewarded points. The points you
              earn depend on the severity of the bug. The Ethereum Foundation
              (EF) determine severity using the{" "}
              <Link to="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                OWASP method
              </Link>
              .
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
          </SubmitInstructions>
          <BugBountyPoints />
        </Row>
      </Content>
      <BugBountyCards />
      <Content>
        <Rules>
          <H2>Bug hunting rules</H2>
          <p>
            <em>
              The bug bounty program is an experimental and discretionary
              rewards program for our active Ethereum community to encourage and
              reward those who are helping to improve the platform. It is not a
              competition. You should know that we can cancel the program at any
              time, and awards are at the sole discretion of Ethereum Foundation
              bug bounty panel. In addition, we are not able to issue awards to
              individuals who are on sanctions lists or who are in countries on
              sanctions lists (e.g. North Korea, Iran, etc). You are responsible
              for all taxes. All awards are subject to applicable law. Finally,
              your testing must not violate any law or compromise any data that
              is not yours.
            </em>
          </p>
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
            <li id="leaderboard">
              Ethereum bounty program considers a number of variables in
              determining rewards. Determinations of eligibility, score and all
              terms related to an award are at the sole and final discretion of
              the Ethereum Foundation bug bounty panel.
            </li>
          </ul>
        </Rules>
      </Content>
      <GradientContainer>
        <FullLeaderboardContainer>
          <H2>Bug hunting leaderboard</H2>
          <p>Find Eth2 bugs to get added to this leaderboard</p>
          <Leaderboard content={bountyHunters} />
        </FullLeaderboardContainer>
      </GradientContainer>
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

export const ClientLogos = graphql`
  fragment ClientLogos on File {
    childImageSharp {
      fixed(width: 60) {
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
    prysm: file(relativePath: { eq: "eth2/prysm.png" }) {
      ...ClientLogos
    }
    lighthouse: file(relativePath: { eq: "eth2/lighthouse.png" }) {
      ...ClientLogos
    }
    tekuDark: file(relativePath: { eq: "eth2/teku-dark.png" }) {
      ...ClientLogos
    }
    tekuLight: file(relativePath: { eq: "eth2/teku-light.png" }) {
      ...ClientLogos
    }
    lighthouseLight: file(relativePath: { eq: "eth2/lighthouse-light.png" }) {
      ...ClientLogos
    }
    lighthouseDark: file(relativePath: { eq: "eth2/lighthouse-dark.png" }) {
      ...ClientLogos
    }
    prysmSmall: file(relativePath: { eq: "eth2/prysm.png" }) {
      ...ClientLogosSmall
    }
    lighthouseSmallLight: file(
      relativePath: { eq: "eth2/lighthouse-light.png" }
    ) {
      ...ClientLogosSmall
    }
    lighthouseSmallDark: file(
      relativePath: { eq: "eth2/lighthouse-dark.png" }
    ) {
      ...ClientLogosSmall
    }
    tekuSmallDark: file(relativePath: { eq: "eth2/teku-dark.png" }) {
      ...ClientLogosSmall
    }
    tekuSmallLight: file(relativePath: { eq: "eth2/teku-light.png" }) {
      ...ClientLogosSmall
    }
  }
`
