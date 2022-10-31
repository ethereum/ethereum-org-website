import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"

import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import ActionCard from "../../components/ActionCard"
import CalloutBanner from "../../components/CalloutBanner"
import Emoji from "../../components/OldEmoji"
import UpgradeArticles from "../../components/UpgradeArticles"
import ExpandableCard from "../../components/ExpandableCard"
import GhostCard from "../../components/GhostCard"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import PageHero, {
  IContent as IPageHeroContent,
} from "../../components/PageHero"
import {
  CardContainer,
  Content,
  Page,
  Divider,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"

import { translateMessageId } from "../../utils/translations"
import { getImage } from "../../utils/image"

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
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
    box-shadow: 0px 8px 17px rgba(#000000, 0.15);
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
  margin: 0rem auto;
  margin-bottom: 2rem;
  max-width: 100ch;
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

const StakingImage = styled(GatsbyImage)`
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
    title: <Translation id="page-upgrades-scalable" />,
    description: <Translation id="page-upgrades-scalable-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-upgrades-secure" />,
    description: <Translation id="page-upgrades-secure-desc" />,
  },
  {
    emoji: ":evergreen_tree:",
    title: <Translation id="page-upgrades-index-staking-sustainability" />,
    description: <Translation id="page-upgrades-sustainable-desc" />,
  },
]

const Eth2IndexPage = ({ data }: PageProps<Queries.UpgradesPageQuery>) => {
  const intl = useIntl()

  const heroContent: IPageHeroContent = {
    title: translateMessageId("page-upgrades-upgrades", intl),
    header: translateMessageId("page-upgrades-upgrading", intl),
    subtitle: translateMessageId("page-upgrades-upgrade-desc", intl),
    image: getImage(data.merge)!,
    alt: translateMessageId("page-dapps-doge-img-alt", intl),
    buttons: [
      {
        content: translateMessageId("page-upgrades-explore-btn", intl),
        to: "/upgrades/beacon-chain/",
      },
      {
        content: translateMessageId("page-upgrades-whats-ethereum", intl),
        to: "/what-is-ethereum/",
        variant: "outline",
      },
    ],
  }

  const upgrades = [
    {
      image: getImage(data.beaconchain),
      title: <Translation id="page-upgrades-beacon-chain-title" />,
      description: <Translation id="page-upgrades-beacon-chain-desc" />,
      to: "/upgrades/beacon-chain/",
      date: <Translation id="page-upgrades-beacon-chain-estimate" />,
    },
    {
      image: getImage(data.themerge),
      title: <Translation id="page-upgrades-docking" />,
      description: <Translation id="page-upgrades-merge-desc" />,
      to: "/upgrades/merge/",
      date: <Translation id="page-upgrades-merge-estimate" />,
    },
    {
      image: getImage(data.shards),
      title: <Translation id="page-upgrades-shard-title" />,
      description: <Translation id="page-upgrades-shard-desc" />,
      to: "/upgrades/sharding/",
      date: <Translation id="page-upgrades-shard-estimate" />,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-upgrades-meta-title", intl)}
        description={translateMessageId("page-upgrades-meta-desc", intl)}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <Row>
          <GhostCard>
            <H2>
              <Translation id="page-upgrades-whats-next" />
            </H2>
            <Translation id="page-upgrades-whats-next-desc" /> <br />
            <Link to="/history/">
              <Translation id="page-upgrades-whats-next-history" />
            </Link>
          </GhostCard>
          <StyledInfoBanner isWarning={true}>
            <H2>
              <Translation id="page-upgrades-what-to-do" />
            </H2>
            <Translation id="page-upgrades-what-to-do-desc" /> <br />
            <Link to="/upgrades/get-involved/">
              <Translation id="page-upgrades-get-involved" />
            </Link>
          </StyledInfoBanner>
        </Row>
        <Vision>
          <H2>
            <Translation id="page-upgrades-vision" />
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <p>
            <Translation id="page-upgrades-vision-desc" />
          </p>
          <CardContainer>
            {paths.map((path, idx) => (
              <CentreCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              />
            ))}
          </CardContainer>
        </Vision>
      </Content>
      <StyledCallout
        image={getImage(data.oldship)!}
        alt={translateMessageId("page-eth-whats-eth-hero-alt", intl)}
        titleKey={"page-upgrades-dive"}
        descriptionKey={"page-upgrades-dive-desc"}
      >
        <div>
          <ButtonLink to="/upgrades/vision/">
            <Translation id="page-upgrades-vision-btn" />
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-upgrades-the-upgrades" />
        </H2>
        <p>
          <Translation id="page-upgrades-the-upgrades-desc" />
        </p>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => (
            <ActionCard
              isRight
              key={idx}
              image={upgrade.image!}
              title={upgrade.title}
              description={upgrade.description}
              to={upgrade.to}
            >
              <h6>{upgrade.date}</h6>
            </ActionCard>
          ))}
        </StyledCardContainer>
      </Content>
      <Content id="eth2">
        <ContributeCard>
          <div>
            <H2>
              <Translation id="page-upgrades-what-happened-to-eth2-title" />
            </H2>
            <p>
              <Translation id="page-upgrades-what-happened-to-eth2-1" />{" "}
              <Link to="/upgrades/merge">
                <Translation id="page-upgrades-what-happened-to-eth2-1-more" />
              </Link>
            </p>
            <p>
              <Translation id="page-upgrades-what-happened-to-eth2-2" />
            </p>
            <p>
              <Translation id="page-upgrades-what-happened-to-eth2-3" />
            </p>
            <ul>
              <li>
                <Translation id="page-upgrades-what-happened-to-eth2-3-1" />
              </li>
              <li>
                <Translation id="page-upgrades-what-happened-to-eth2-3-2" />
              </li>
            </ul>
            <p>
              <Translation id="page-upgrades-what-happened-to-eth2-4" />
            </p>
            <p>
              <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
                <Translation id="page-upgrades-what-happened-to-eth2-5" />
              </Link>
            </p>
            <h3>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-title" />
            </h3>
            <h4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-mental-models-title" />
            </h4>
            <p>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-mental-models-description" />
            </p>
            <h4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-inclusivity-title" />
            </h4>
            <p>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-inclusivity-description" />
            </p>
            <h4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-scam-prevention-title" />
            </h4>
            <p>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-scam-prevention-description" />
            </p>
            <h4>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-staking-clarity-title" />
            </h4>
            <p>
              <Translation id="page-upgrades-why-cant-we-just-use-eth2-staking-clarity-description" />
            </p>
          </div>
        </ContributeCard>
        <ContributeCard>
          <div>
            <H2>
              <Translation id="page-upgrades-help" />
            </H2>
            <Translation id="page-upgrades-help-desc" />
          </div>
          <ContributeButton variant="outline" to="/upgrades/get-involved/">
            <Translation id="page-upgrades-get-involved-2" />
          </ContributeButton>
        </ContributeCard>
        <Disclaimer>
          <em>
            <Translation id="page-upgrades-unofficial-roadmap" />
          </em>
        </Disclaimer>
      </Content>

      <Staking>
        <H2>
          <Translation id="page-upgrades-index-staking" />
        </H2>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              <Translation id="page-upgrades-index-staking-desc" />
            </p>
            <h3>
              <Translation id="page-upgrades-index-staking-step-1" />
            </h3>
            <p>
              <Translation id="page-upgrades-index-staking-step-1-desc" />
            </p>
            <ButtonLink to="https://launchpad.ethereum.org">
              <Translation id="page-upgrades-index-staking-step-1-btn" />
            </ButtonLink>
            <h3>
              <Translation id="page-upgrades-index-staking-step-2" />
            </h3>
            <p>
              <Translation id="page-upgrades-index-staking-step-2-desc" />
            </p>
            <ButtonLink to="/staking/deposit-contract/">
              <Translation id="page-upgrades-index-staking-step-2-btn" />
            </ButtonLink>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":money_with_wings:"
              title={translateMessageId(
                "page-upgrades-index-staking-learn",
                intl
              )}
              description={translateMessageId(
                "page-upgrades-index-staking-learn-desc",
                intl
              )}
            >
              <ButtonLink to="/staking/">
                <Translation id="page-staking-deposit-contract-staking-more-link" />
              </ButtonLink>
            </StakingCard>
            <StakingImage image={getImage(data.rhino)!} alt="" />
          </StakingRightColumn>
        </StakingColumns>
      </Staking>
      <Divider />
      <Content>
        <CenterH2>
          <Translation id="page-upgrades-question-title" />
        </CenterH2>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-1-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-1-title", intl)}
            >
              <Link to="/upgrades/beacon-chain/">
                <Translation id="page-upgrades-beacon-chain-title" />
              </Link>
              <p>
                <Translation id="page-upgrades-beacon-chain-date" />
              </p>
              <Link to="/upgrades/merge/">
                <Translation id="page-upgrades-docking" />
              </Link>
              <p>
                <Translation id="page-upgrades-merge-answer-1" />{" "}
              </p>
              <Link to="/upgrades/sharding/">
                <Translation id="page-upgrades-shard-title" />
              </Link>
              <p>
                <Translation id="page-upgrades-shard-date" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-2-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-2-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-answer-1" />{" "}
              </p>
              <p>
                <Translation id="page-upgrades-answer-2" />{" "}
                <Link to="/upgrades/merge/">
                  <Translation id="page-upgrades-merge-btn" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-answer-4" />{" "}
                <Link to="/upgrades/vision/">
                  <Translation id="page-upgrades-vision-btn" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-3-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-3-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question3-answer-1" />{" "}
                <Link to="/security/">
                  <Translation id="page-upgrades-security-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-3-answer-2a" />
              </p>
              <ul>
                <li>
                  <Link to="/upgrades/merge/">
                    <Translation id="page-upgrades-merge-btn" />
                  </Link>
                </li>
                <li>
                  <Link to="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">
                    <Translation id="page-upgrades-question-3-answer-2a-link" />
                  </Link>
                </li>
              </ul>
              <p>
                <Translation id="page-upgrades-question-3-answer-2b" />
              </p>
              <ul>
                <li>
                  <Link to="/upgrades/sharding/">
                    <Translation id="page-upgrades-shard-lower" />
                  </Link>
                </li>
                <li>
                  <Link to="/layer-2/">
                    <Translation id="page-upgrades-layer-2-rollups" />
                  </Link>
                </li>
              </ul>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-4-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-4-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-4-answer-1" />{" "}
                <Link to="/glossary/#mainnet">
                  <Translation id="page-upgrades-merge-mainnet" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-4-answer-3" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-upgrades-proof-stake-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-4-answer-6" />{" "}
                <Link to="/staking/">
                  <Translation id="page-upgrades-question-4-answer-7" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-5-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-5-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-5-answer-1" />
              </p>
              <p>
                <Link to="/staking/">
                  <Translation id="page-staking-deposit-contract-staking-more-link" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-11-desc",
                intl
              )}
              title={translateMessageId(
                "page-upgrades-question-11-title",
                intl
              )}
            >
              <p>
                <Translation id="page-upgrades-question-11-answer-1" />
                <Link to="/security/#eth2-token-scam/">
                  <Translation id="page-upgrades-question-11-answer-2" />
                </Link>
              </p>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-6-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-6-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-6-answer-1" />
              </p>
              <p>
                <Link to="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">
                  <Translation id="page-upgrades-question-6-answer-1-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-6-answer-2" />
              </p>
              <ul>
                <li>
                  <Translation id="page-upgrades-question-6-answer-3" />{" "}
                  <Link to="https://blog.ethereum.org">
                    <Translation id="page-upgrades-eth-blog" />
                  </Link>
                </li>
                <li>
                  <Translation id="page-upgrades-question-6-answer-4" />{" "}
                  <Link to="https://eth2.news">
                    <Translation id="page-upgrades-whats-new" />
                  </Link>
                </li>
                <li>
                  <Translation id="page-upgrades-question-6-answer-5" />{" "}
                  <Link to="https://ethresear.ch">
                    <Translation id="page-upgrades-question-3-answer-3-link" />
                  </Link>
                </li>
              </ul>
              <p>
                <Link to="/upgrades/merge/">
                  <Translation id="page-upgrades-merge-btn" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-7-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-7-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-7-teams" />
              </p>
              <ul>
                <li>
                  <Link to="https://sigmaprime.io/">
                    <Translation id="page-upgrades-question-7-lighthouse" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-lighthouse-lang" />
                </li>
                <li>
                  <Link to="https://nimbus.team/">
                    <Translation id="page-upgrades-question-7-nimbus" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-nimbus-lang" />
                </li>
                <li>
                  <Link to="https://prysmaticlabs.com/">
                    <Translation id="page-upgrades-question-7-prysm" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-prysm-lang" />
                </li>
                <li>
                  <Link to="https://pegasys.tech/teku-ethereum-2-for-enterprise/">
                    <Translation id="page-upgrades-question-7-teku" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-teku-lang" />
                </li>
                <li>
                  <Link to="https://github.com/chainsafe/lodestar#getting-started">
                    <Translation id="page-upgrades-question-7-lodestar" />
                  </Link>{" "}
                  <Translation id="page-upgrades-question-7-lodestar-lang" />
                </li>
              </ul>
              <p>
                <Link to="/developers/docs/nodes-and-clients/">
                  <Translation id="page-upgrades-question-7-clients" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-8-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-8-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-8-answer-1" />
              </p>
              <p>
                <Translation id="page-upgrades-question-8-answer-2" />{" "}
              </p>
              <p>
                <Translation id="page-upgrades-question-8-answer-3" />{" "}
                <Link to="/energy-consumption/">
                  <Translation id="page-upgrades-energy-consumption" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-8-answer-4" />
              </p>
              <p>
                <ButtonLink to="/upgrades/vision/">
                  <Translation id="page-upgrades-question-8-answer-6" />
                </ButtonLink>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-9-desc",
                intl
              )}
              title={translateMessageId("page-upgrades-question-9-title", intl)}
            >
              <p>
                <Translation id="page-upgrades-question-9-answer-1" />{" "}
                <Link to="/staking/">
                  <Translation id="page-upgrades-question-9-stake-eth" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-9-answer-2" />{" "}
                <Link to="/upgrades/get-involved/">
                  <Translation id="page-upgrades-clients" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-9-answer-3" />{" "}
                <Link to="/bug-bounty/">
                  <Translation id="page-upgrades-bug-bounty" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-9-answer-4" />{" "}
                <Link to="https://ethresear.ch">
                  <Translation id="page-upgrades-question-3-answer-3-link" />
                </Link>
              </p>
              <p>
                <Link to="/community/get-involved/">
                  <Translation id="page-upgrades-question-9-more" />
                </Link>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview={translateMessageId(
                "page-upgrades-question-10-desc",
                intl
              )}
              title={translateMessageId(
                "page-upgrades-question-10-title",
                intl
              )}
            >
              <p>
                <Translation id="page-upgrades-question-10-answer-0" />
              </p>

              <p>
                <Translation id="page-upgrades-question-10-answer-1" />{" "}
                <Link to="/upgrades/beacon-chain/">
                  <Translation id="page-upgrades-question-10-answer-1-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-10-answer-2" />
              </p>
              <p>
                <Translation id="page-upgrades-question-10-answer-3" />
              </p>
              <p>
                <Translation id="page-upgrades-question-10-answer-5" />
              </p>
              <p>
                <Translation id="page-upgrades-question-10-answer-6" />{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  <Translation id="page-upgrades-proof-stake-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-upgrades-question-10-answer-7" />{" "}
                <Link to="/upgrades/sharding/#code-execution">
                  <Translation id="page-upgrades-question-10-answer-8" />
                </Link>
              </p>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Content>
        <H2>
          <Translation id="page-upgrades-stay-up-to-date" />
        </H2>
        <p>
          <Translation id="page-upgrades-stay-up-to-date-desc" />
        </p>
        <UpgradeArticles />
        <ResearchContainer>
          <H2>
            <Translation id="page-upgrades-take-part" />
          </H2>
          <p>
            <Translation id="page-upgrades-take-part-desc" />
          </p>
          <ButtonLink to="https://ethresear.ch/">
            <Translation id="page-upgrades-head-to" /> ethresear.ch
          </ButtonLink>
        </ResearchContainer>
      </Content>
      <FeedbackCard />
    </Page>
  )
}

export default Eth2IndexPage

export const query = graphql`
  query UpgradesPage {
    oldship: file(relativePath: { eq: "upgrades/oldship.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    beaconchain: file(relativePath: { eq: "upgrades/core.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    shards: file(relativePath: { eq: "upgrades/newrings.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    themerge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 420
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
