import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import CalloutBanner from "../../components/CalloutBanner"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"
import Eth2Diagram from "../../components/Eth2Diagram"
import ExpandableCard from "../../components/ExpandableCard"
import GhostCard from "../../components/GhostCard"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
} from "../../components/SharedStyledComponents"
import { translateMessageId } from "../../utils/translations"

const HeroContainer = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem;
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

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
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

const StyledInfoBanner = styled(InfoBanner)`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0;
  }
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

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const StakingColumns = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const CenterH2 = styled(H2)`
  text-align: center;
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
    flex-direction: column-reverse;
    margin: 0rem;
    margin-top: 2rem;
  }
`

const StakingCard = styled(StyledCard)`
  margin: 0;
`

const StakingImage = styled(Img)`
  margin: 3rem 0;
  align-self: center;
  width: 100%;
  max-width: 320px;
`

const LeftColumn = styled.div`
  width: 100%;
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

const FullWidthContainer = styled(Page)`
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 2rem;
  overflow-x: scroll;
  margin-bottom: 2rem;
`

const Faq = styled.div`
  display: flex;
  margin-top: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ResearchContainer = styled.div`
  margin-top: 2rem;
`

const paths = [
  {
    emoji: ":rocket:",
    title: <Translation id="page-eth2-scalable" />,
    description: <Translation id="page-eth2-scalable-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-eth2-secure" />,
    description: <Translation id="page-eth2-secure-desc" />,
  },
  {
    emoji: ":evergreen_tree:",
    title: <Translation id="page-eth2-index-staking-sustainability" />,
    description: <Translation id="page-eth2-sustainable-desc" />,
  },
]

const upgrades = [
  {
    emoji: ":police_car_light:",
    title: <Translation id="page-eth2-beacon-chain-title" />,
    description: <Translation id="page-eth2-beacon-chain-desc" />,
    url: "/en/eth2/beacon-chain/",
    button: <Translation id="page-eth2-beacon-chain-btn" />,
    date: <Translation id="page-eth2-beacon-chain-estimate" />,
  },
  {
    emoji: ":chains:",
    title: <Translation id="page-eth2-shard-title" />,
    description: <Translation id="page-eth2-shard-desc" />,
    url: "/en/eth2/shard-chains/",
    button: <Translation id="page-eth2-shard-button" />,
    date: <Translation id="page-eth2-shard-estimate" />,
  },
  {
    emoji: ":ship:",
    title: <Translation id="page-eth2-docking" />,
    description: <Translation id="page-eth2-docking-desc" />,
    url: "/en/eth2/docking/",
    button: <Translation id="page-eth2-docking-btn" />,
    date: <Translation id="page-eth2-docking-estimate" />,
  },
]

const Eth2IndexPage = ({ data }) => {
  const intl = useIntl()
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-eth2-meta-title", intl)}
        description={translateMessageId("page-eth2-meta-desc", intl)}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>
              <Translation id="page-eth2-upgrades" />
            </Title>
            <Eth2Header>
              <Translation id="page-eth2-upgrading" />{" "}
              <Eth2HeaderGradient>
                <Translation id="page-eth2-upgrades-radical" />
              </Eth2HeaderGradient>{" "}
              <Translation id="page-eth2-upgrade-new" />
            </Eth2Header>
            <Subtitle>
              <Translation id="page-eth2-upgrade-desc" />
            </Subtitle>
            <ButtonRow>
              <StyledButton to="/eth2/beacon-chain/">
                <Translation id="page-eth2-explore-btn" />
              </StyledButton>
              <StyledButton isSecondary to="/what-is-ethereum/">
                <Translation id="page-eth2-whats-ethereum" />
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <Hero fluid={data.doge.childImageSharp.fluid} />
        </HeroCard>

        <Row>
          <GhostCard>
            <H2>
              <Translation id="page-eth2-whats-eth2" />
            </H2>
            <Translation id="page-eth2-whats-eth2-desc" />
          </GhostCard>
          <StyledInfoBanner isWarning={true}>
            <H2>
              <Translation id="page-eth2-what-to-do" />
            </H2>
            <Translation id="page-eth2-what-to-do-desc" /> <br />
            <Link to="/eth2/get-involved/">
              <Translation id="page-eth2-get-involved" />
            </Link>
          </StyledInfoBanner>
        </Row>
        <Vision>
          <H2>
            <Translation id="page-eth2-vision" />
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <p>
            <Translation id="page-eth2-vision-desc" />
          </p>
          <CardContainer>
            {paths.map((path, idx) => {
              return (
                <CentreCard
                  key={idx}
                  emoji={path.emoji}
                  title={path.title}
                  description={path.description}
                />
              )
            })}
          </CardContainer>
        </Vision>
      </Content>
      <StyledCallout
        image={data.eth.childImageSharp.fluid}
        alt={translateMessageId("page-eth-whats-eth-hero-alt", intl)}
        title={translateMessageId("page-eth2-dive", intl)}
        description={translateMessageId("page-eth2-dive-desc", intl)}
      >
        <div>
          <ButtonLink to="/en/eth2/vision/">
            <Translation id="page-eth2-vision-btn" />
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-eth2-the-upgrades" />
        </H2>
        <p>
          <Translation id="page-eth2-the-upgrades-desc" />
        </p>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={upgrade.emoji}
                title={upgrade.title}
                description={upgrade.description}
              >
                <h6>{upgrade.date}</h6>
                <ButtonLink to={upgrade.url}>{upgrade.button}</ButtonLink>
              </StyledCard>
            )
          })}
        </StyledCardContainer>
      </Content>
      <FullWidthContainer>
        <Eth2Diagram />
      </FullWidthContainer>
      <Content>
        <ContributeCard>
          <div>
            <H2>
              <Translation id="page-eth2-help" />
            </H2>
            <Translation id="page-eth2-help-desc" />
          </div>
          <ContributeButton isSecondary to="/eth2/get-involved/">
            <Translation id="page-eth2-get-involved-2" />
          </ContributeButton>
        </ContributeCard>
        <Disclaimer>
          <em>
            <Translation id="page-eth2-unofficial-roadmap" />
          </em>
        </Disclaimer>
      </Content>

      <Staking>
        <H2>
          <Translation id="page-eth2-index-staking" />
        </H2>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              <Translation id="page-eth2-index-staking-desc" />
            </p>
            <h3>
              <Translation id="page-eth2-index-staking-step-1" />
            </h3>
            <p>
              <Translation id="page-eth2-index-staking-step-1-desc" />
            </p>
            <ButtonLink to="https://launchpad.ethereum.org">
              <Translation id="page-eth2-index-staking-step-1-btn" />
            </ButtonLink>
            <h3>
              <Translation id="page-eth2-index-staking-step-2" />
            </h3>
            <p>
              <Translation id="page-eth2-index-staking-step-2-desc" />
            </p>
            <ButtonLink to="/eth2/deposit-contract/">
              <Translation id="page-eth2-index-staking-step-2-btn" />
            </ButtonLink>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":money_with_wings:"
              title={translateMessageId("page-eth2-index-staking-learn", intl)}
              description={translateMessageId(
                "page-eth2-index-staking-learn-desc",
                intl
              )}
            >
              <ButtonLink to="/eth2/staking/">
                <Translation id="page-eth2-deposit-contract-staking-more-link" />
              </ButtonLink>
            </StakingCard>
            <StakingImage fluid={data.rhino.childImageSharp.fluid} />
          </StakingRightColumn>
        </StakingColumns>
      </Staking>
      <Divider />
      <Content>
        <CenterH2>
          <Translation id="page-eth2-question-title" />
        </CenterH2>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-1-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-1-title", intl)}
            >
              <Link to="/eth2/beacon-chain/">
                <Translation id="page-eth2-beacon-chain-title" />
              </Link>
              <p>
                <Translation id="page-eth2-beacon-chain-date" />
              </p>
              <Link to="/eth2/shard-chains/">
                <Translation id="page-eth2-shard-title" />
              </Link>
              <p>
                <Translation id="page-eth2-shard-date" />
              </p>
              <Link to="/eth2/docking/">
                <Translation id="page-eth2-docking" />
              </Link>
              <p>
                <Translation id="page-eth2-docking-answer-1" />{" "}
                <Link to="/glossary/#mainnet">
                  <Translation id="page-eth2-docking-mainnet" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-2-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-2-title", intl)}
            >
              <p>
                <Translation id="page-eth2-answer-1" />{" "}
                <Link to="/eth2/beacon-chain/">
                  <Translation id="page-eth2-more-on-upgrades" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-answer-2" />{" "}
                <Link to="/glossary/#mainnet">
                  <Translation id="page-eth2-docking-mainnet" />
                </Link>{" "}
              </p>
              <p>
                <Translation id="page-eth2-answer-4" />{" "}
                <Link to="/eth2/vision/">
                  <Translation id="page-eth2-vision-btn" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-3-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-3-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question3-answer-1" />
              </p>
              <p>
                <Translation id="page-eth2-question-3-answer-2" />
              </p>
              <ul>
                <li>
                  <Link to="/eth2/shard-chains/">
                    <Translation id="page-eth2-shard-lower" />
                  </Link>
                </li>
                <li>
                  <Link to="/eth2/docking/">
                    <Translation id="page-eth2-just-docking" />
                  </Link>
                </li>
              </ul>
              <p>
                <Translation id="page-eth2-question-3-answer-3" />
              </p>
              <Link to="https://ethresear.ch">
                <Translation id="page-eth2-question-3-answer-3-link" />
              </Link>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-4-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-4-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-4-answer-1" />{" "}
                <Link to="/developers/docs/mining/">
                  <Translation id="page-eth2-miners" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-4-answer-2" />{" "}
                <Link to="/eth2/docking/">
                  <Translation id="page-eth2-just-docking" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-4-answer-3" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-eth2-proof-stake-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-4-answer-6" />{" "}
                <Link to="/eth2/staking/">
                  <Translation id="page-eth2-question-4-answer-7" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-4-answer-8" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-5-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-5-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-5-answer-1" />
              </p>
              <p>
                <Link to="/eth2/staking/">
                  <Translation id="page-eth2-deposit-contract-staking-more-link" />
                </Link>
              </p>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-6-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-6-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-6-answer-1" />
              </p>
              <ul>
                <li>
                  <Link to="/eth2/shard-chains/">
                    <Translation id="page-eth2-shard-lower" />
                  </Link>
                </li>
                <li>
                  <Link to="/eth2/docking/">
                    <Translation id="page-eth2-just-docking" />
                  </Link>
                </li>
              </ul>
              <p>
                <Translation id="page-eth2-question-6-answer-3" />{" "}
                <Link to="https://blog.ethereum.org">
                  <Translation id="page-eth2-eth-blog" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-6-answer-4" />{" "}
                <Link to="https://eth2.news">
                  <Translation id="page-eth2-whats-new" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-6-answer-5" />{" "}
                <Link to="https://ethresear.ch">
                  <Translation id="page-eth2-question-3-answer-3-link" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-7-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-7-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-7-teams" />
              </p>
              <p>
                <ul>
                  <li>
                    <Link to="https://trinity.ethereum.org/">
                      <Translation id="page-eth2-question-7-trinity" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-trinity-lang" />
                  </li>
                  <li>
                    <Link to="https://sigmaprime.io/">
                      <Translation id="page-eth2-question-7-lighthouse" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-lighthouse-lang" />
                  </li>
                  <li>
                    <Link to="https://nimbus.team/">
                      <Translation id="page-eth2-question-7-nimbus" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-nimbus-lang" />
                  </li>
                  <li>
                    <Link to="https://prysmaticlabs.com/">
                      <Translation id="page-eth2-question-7-prysm" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-prysm-lang" />
                  </li>
                  <li>
                    <Link to="https://nethermind.io/">
                      <Translation id="page-eth2-question-7-cortex" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-cortex-lang" />
                  </li>
                  <li>
                    <Link to="https://pegasys.tech/teku-ethereum-2-for-enterprise/">
                      <Translation id="page-eth2-question-7-teku" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-teku-lang" />
                  </li>
                  <li>
                    <Link to="https://github.com/chainsafe/lodestar#getting-started">
                      <Translation id="page-eth2-question-7-lodestar" />
                    </Link>{" "}
                    <Translation id="page-eth2-question-7-lodestar-lang" />
                  </li>
                </ul>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-8-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-8-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-8-answer-1" />
              </p>
              <p>
                <Translation id="page-eth2-question-8-answer-2" />{" "}
                <Link to="/eth2/beacon-chain">
                  <Translation id="page-eth2-upgrades-guide" />
                </Link>
              </p>
              <p>
                <Translation id="page-eth2-question-8-answer-3" />
              </p>
              <p>
                <Translation id="page-eth2-question-8-answer-4" />
              </p>
              <p>
                <ButtonLink to="/eth2/vision/">
                  <Translation id="page-eth2-question-8-answer-6" />
                </ButtonLink>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-9-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-9-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-9-answer-1" />{" "}
                <Link to="/eth2/staking/">
                  <Translation id="page-eth2-question-9-stake-eth" />
                </Link>
                .
              </p>
              <p>
                <Translation id="page-eth2-question-9-answer-2" />{" "}
                <Link to="/eth2/get-involved/">
                  <Translation id="page-eth2-clients" />
                </Link>
                .
              </p>
              <p>
                <Translation id="page-eth2-question-9-answer-3" />{" "}
                <Link to="/eth2/get-involved/bug-bounty/">
                  <Translation id="page-eth2-bug-bounty" />
                </Link>
                .
              </p>
              <p>
                <Translation id="page-eth2-question-9-answer-4" />{" "}
                <Link to="https://ethresear.ch">ethresear.ch</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-eth2-question-10-desc",
                intl
              )}
              title={translateMessageId("page-eth2-question-10-title", intl)}
            >
              <p>
                <Translation id="page-eth2-question-10-answer-1" />{" "}
                <Link to="/eth2/beacon-chain/">
                  <Translation id="page-eth2-upgrades-lower" />
                </Link>
                <Translation id="page-eth2-question-10-answer-2" />
              </p>
              <p>
                <Translation id="page-eth2-question-10-answer-3" />{" "}
                <Link to="/eth2/beacon-chain/">
                  <Translation id="page-eth2-beacon-chain-title" />
                </Link>{" "}
                <Translation id="page-eth2-question-10-answer-4" />
              </p>
              <p>
                <Translation id="page-eth2-question-10-answer-5" />{" "}
                <Link to="/eth2/shard-chains/">
                  <Translation id="page-eth2-the-shard-chains" />
                </Link>
                .
              </p>
              <p>
                <Link to="/eth2/docking/">
                  <Translation id="page-eth2-docking-mainnet-eth2" />
                </Link>{" "}
                <Translation id="page-eth2-question-10-answer-6" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-eth2-proof-stake" />
                </Link>
                .
              </p>
              <p>
                <Translation id="page-eth2-question-10-answer-7" />{" "}
                <Link to="/eth2/shard-chains/">
                  <Translation id="page-eth2-the-shard-chains" />
                </Link>{" "}
                <Translation id="page-eth2-but" />{" "}
                <Link to="/eth2/shard-chains/#code-execution">
                  <Translation id="page-eth2-question-10-answer-8" />
                </Link>
                .
              </p>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Content>
        <H2>
          <Translation id="page-eth2-stay-up-to-date" />
        </H2>
        <p>
          <Translation id="page-eth2-stay-up-to-date-desc" />
        </p>
        <Eth2Articles />
        <ResearchContainer>
          <H2>
            <Translation id="page-eth2-take-part" />
          </H2>
          <p>
            <Translation id="page-eth2-take-part-desc" />
          </p>
          <ButtonLink to="https://ethresear.ch/">
            <Translation id="page-eth2-head-to" /> ethresear.ch
          </ButtonLink>
        </ResearchContainer>
      </Content>
    </Page>
  )
}

export default Eth2IndexPage

export const query = graphql`
  query {
    eth: file(relativePath: { eq: "eth2/eth2_eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    doge: file(relativePath: { eq: "eth2/eth2_doge.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethresearch: file(relativePath: { eq: "eth2/ethresearch.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
