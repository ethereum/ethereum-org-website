import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../../../utils/translations"
import Translation from "../../../components/Translation"
import Card from "../../../components/Card"
import Leaderboard from "../../../components/Leaderboard"
import BugBountyCards from "../../../components/BugBountyCards"
import BugBountyPoints from "../../../components/BugBountyPoints"
import Link from "../../../components/Link"
import Emoji from "../../../components/Emoji"
import CardList from "../../../components/CardList"
import Breadcrumbs from "../../../components/Breadcrumbs"
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
    margin-top: -2rem;
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
  padding-top: 6rem;
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

const BugBountiesPage = ({ data, location }) => {
  const intl = useIntl()
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
      title: <Translation id="page-eth2-bugbounty-title-1" />,
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/beacon-chain.md",
    },
    {
      title: <Translation id="page-eth2-bugbounty-title-2" />,
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/fork-choice.md",
    },
    {
      title: <Translation id="page-eth2-bugbounty-title-3" />,
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/deposit-contract.md",
    },
    {
      title: <Translation id="page-eth2-bugbounty-title-4" />,
      link:
        "https://github.com/ethereum/eth2.0-specs/blob/dev/specs/phase0/p2p-interface.md",
    },
  ]
  return (
    <Page>
      <PageMetadata
        title={intl.formatMessage({
          id: "page-eth2-bugbounty-meta-title",
          defaultMessage: getDefaultMessage("page-eth2-bugbounty-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-eth2-bugbounty-meta-description",
          defaultMessage: getDefaultMessage(
            "page-eth2-bugbounty-meta-description"
          ),
        })}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Breadcrumbs slug={location.pathname} startDepth={1} />
            <Row>
              <On />
              <Title>
                <Translation id="page-eth2-bugbounty-title" />
              </Title>
            </Row>
            <SloganGradient>
              <Translation id="page-eth2-bugbounty-slogan" />{" "}
              <Emoji size={1} text=":bug:" />
            </SloganGradient>
            <Subtitle>
              <Translation id="page-eth2-bugbounty-subtitle" />
            </Subtitle>
            <ButtonRow>
              <StyledButton
                mr={`1rem`}
                to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2"
              >
                <Translation id="page-eth2-bugbounty-submit" />
              </StyledButton>
              <StyledButton isSecondary to="#rules">
                <Translation id="page-eth2-bugbounty-rules" />
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={bountyHunters} limit={5} />
            <ButtonLink isSecondary to="#leaderboard">
              <Translation id="page-eth2-bugbounty-leaderboard" />
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>
        <Translation id="page-eth2-bugbounty-clients" />
      </ClientIntro>
      <ClientRow>
        <Client fixed={data.prysm.childImageSharp.fixed} />
        <Client fixed={lighthouseImage} />
        <Client fixed={tekuImage} />
      </ClientRow>
      <StyledGrayContainer id="rules">
        <Content>
          <H2>
            <Translation id="page-eth2-bugbounty-validity" />
          </H2>
          <p>
            <Translation id="page-eth2-bugbounty-validity-desc" />{" "}
            <Link to="/en/eth2/beacon-chain/">Beacon chain</Link>{" "}
            <Translation id="page-eth2-bugbounty-validity-desc-1" />{" "}
            <Link to="https://prylabs.net/">Prysm</Link>,{" "}
            <Link to="https://lighthouse-book.sigmaprime.io/">Lighthouse</Link>,
            <Translation id="page-eth2-bugbounty-and" />{" "}
            <Link to="https://pegasys.tech/teku">Teku</Link>
          </p>
          <StyledCardContainer>
            <StyledCard
              emoji=":ledger:"
              title={intl.formatMessage({
                id: "page-eth2-bugbounty-ledger-title",
                defaultMessage: getDefaultMessage(
                  "page-eth2-bugbounty-ledger-title"
                ),
              })}
              description={intl.formatMessage({
                id: "page-eth2-bugbounty-ledger-desc",
                defaultMessage: getDefaultMessage(
                  "page-eth2-bugbounty-ledger-desc"
                ),
              })}
            >
              <Link to="https://github.com/ethereum/eth2.0-specs">
                <Translation id="page-eth2-bugbounty-specs" />
              </Link>
              <br />
              <div>
                <p>
                  <Translation id="page-eth2-bugbounty-annotations" />
                </p>
                <ul>
                  <li>
                    <Link to="https://benjaminion.xyz/eth2-annotated-spec/">
                      Ben Edgington's{" "}
                      <Translation id="page-eth2-bugbounty-annotated-specs" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/ethereum/annotated-spec">
                      Vitalik Buterin's{" "}
                      <Translation id="page-eth2-bugbounty-annotated-specs" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-eth2-bugbounty-types" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-eth2-bugbounty-type-1" />
                  </li>
                  <li>
                    <Translation id="page-eth2-bugbounty-type-2" />
                  </li>
                  <li>
                    <Translation id="page-eth2-bugbounty-type-3" />
                  </li>
                  <li>
                    <Translation id="page-eth2-bugbounty-type-4" />
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-eth2-bugbounty-specs-docs" />
                </h4>
                <CardList content={specs} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title={intl.formatMessage({
                id: "page-eth2-bugbounty-client-bugs",
                defaultMessage: getDefaultMessage(
                  "page-eth2-bugbounty-client-bugs"
                ),
              })}
              description={intl.formatMessage({
                id: "page-eth2-bugbounty-client-bugs-desc",
                defaultMessage: getDefaultMessage(
                  "page-eth2-bugbounty-client-bugs-desc"
                ),
              })}
            >
              <div>
                <p>
                  <Translation id="page-eth2-bugbounty-client-bugs-desc-2" />
                </p>
                <h4>
                  <Translation id="page-eth2-bugbounty-types" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-eth2-bugbounty-clients-type-1" />
                  </li>
                  <li>
                    <Translation id="page-eth2-bugbounty-clients-type-2" />
                  </li>
                  <li>
                    {" "}
                    <Translation id="page-eth2-bugbounty-clients-type-3" />
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-eth2-bugbounty-help-links" />
                </h4>
                <CardList content={clients} />
              </div>
            </StyledCard>
          </StyledCardContainer>
          <H2>
            <Translation id="page-eth2-bugbounty-not-included" />
          </H2>
          <p>
            <Translation id="page-eth2-the" />{" "}
            <Link to="/en/eth2/shard-chains/">shard chains</Link>{" "}
            <Translation id="page-eth2-and" />{" "}
            <Link to="/en/eth2/docking/">docking</Link>{" "}
            <Translation id="page-eth2-bugbounty-not-included-desc" />
          </p>
        </Content>
      </StyledGrayContainer>
      <Content>
        <Row>
          <SubmitInstructions>
            <H2>
              <Translation id="page-eth2-bugbounty-submit" />
            </H2>
            <p>
              <Translation id="page-eth2-bugbounty-submit-desc" />{" "}
              <Link to="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                <Translation id="page-eth2-bugbounty-owasp" />
              </Link>
              .
            </p>
            <p>
              <Translation id="page-eth2-bugbounty-points" />
            </p>
            <p>
              <b>
                <Translation id="page-eth2-bugbounty-quality" />
              </b>
              <Translation id="page-eth2-bugbounty-quality-desc" />
            </p>
            <p>
              <b>
                <Translation id="page-eth2-bugbounty-quality-repro" />
              </b>
              <Translation id="page-eth2-bugbounty-quality-repro-desc" />
            </p>
            <p>
              <b>
                <Translation id="page-eth2-bugbounty-quality-fix" />
              </b>
              <Translation id="page-eth2-bugbounty-quality-fix-desc" />
            </p>
          </SubmitInstructions>
          <BugBountyPoints />
        </Row>
      </Content>
      <BugBountyCards />
      <Content>
        <Rules>
          <H2>
            <Translation id="page-eth2-bugbounty-hunting" />
          </H2>
          <p>
            <em>
              <Translation id="page-eth2-bugbounty-hunting-desc" />
            </em>
          </p>
          <ul>
            <li>
              <Translation id="page-eth2-bugbounty-hunting-li-1" />
            </li>
            <li>
              <Translation id="page-eth2-bugbounty-hunting-li-2" />
            </li>
            <li>
              <Translation id="page-eth2-bugbounty-hunting-li-3" />
            </li>
            <li id="leaderboard">
              <Translation id="page-eth2-bugbounty-hunting-li-4" />
            </li>
          </ul>
        </Rules>
      </Content>
      <GradientContainer>
        <FullLeaderboardContainer>
          <H2>
            <Translation id="page-eth2-bugbounty-hunting-leaderboard" />
          </H2>
          <p>
            <Translation id="page-eth2-bugbounty-hunting-leaderboard-subtitle" />
          </p>
          <Leaderboard content={bountyHunters} />
        </FullLeaderboardContainer>
      </GradientContainer>
      <Contact>
        <div>
          <H2>
            <Translation id="page-eth2-bugbounty-questions" />
          </H2>
          <TextNoMargin>
            <Translation id="page-eth2-bugbounty-email-us" />{" "}
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
