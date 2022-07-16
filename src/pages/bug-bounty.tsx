import React, { ReactNode, useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import Card from "../components/Card"
import Leaderboard from "../components/Leaderboard"
import BugBountyCards from "../components/BugBountyCards"
import Link from "../components/Link"
import Emoji from "../components/Emoji"
import CardList from "../components/CardList"
import Breadcrumbs from "../components/Breadcrumbs"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ExpandableCard from "../components/ExpandableCard"
import {
  CardContainer,
  Content,
  Divider,
  Page,
  GrayContainer,
  GradientContainer,
  SloganGradient,
} from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import { Context } from "../types"

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
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 1.5rem;
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
  margin-top: 1rem;
  flex-wrap: wrap;
`

const StyledButton = styled(ButtonLink)`
  flex: 0 1 7.75rem;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const H2 = styled.h2`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const CenterH2 = styled(H2)`
  text-align: center;
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

const Client = styled(GatsbyImage)`
  margin: 4rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`

const ClientIntro = styled.p`
  text-transform: uppercase;
  font-size: 0.875rem;
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
  max-width: 100ch;
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

type BountyHuntersArg = {
  score?: number | null
}

function sortBountyHuntersFn(a: BountyHuntersArg, b: BountyHuntersArg) {
  if (a.score && b.score) {
    return b.score - a.score
  }

  return 0
}

interface INode {
  readonly username: string
  readonly name: string
  readonly score: number
}

interface IClient {
  title: string
  link: string
  image: any
}

interface ISpec {
  title: ReactNode
  link: string
}

const BugBountiesPage = ({
  data,
  location,
}: PageProps<Queries.BugBountyPageQuery, Context>) => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  // TODO sort query isn't working :(
  const consensusBountyHuntersNodes = data.consensusBountyHunters
    .nodes as Array<INode>
  const consensusBountyHunters = [...consensusBountyHuntersNodes].sort(
    sortBountyHuntersFn
  )

  const executionBountyHuntersNodes = data.executionBountyHunters
    .nodes as Array<INode>
  const executionBountyHunters = [...executionBountyHuntersNodes].sort(
    sortBountyHuntersFn
  )

  const bountyHuntersArrayToObject: Record<string, INode> = [
    ...consensusBountyHunters,
    ...executionBountyHunters,
  ].reduce((acc, next) => {
    const name = next.name
    if (!name) {
      return acc
    }

    if (acc[name]) {
      return {
        ...acc,
        [name]: {
          ...next,
          score: acc[name].score + next.score,
        },
      }
    }

    return {
      ...acc,
      [name]: next,
    }
  }, {})

  // total all counts using name as identifier, then sort
  const allBounterHunters = Object.values(bountyHuntersArrayToObject).sort(
    (a, b) => b.score - a.score
  )

  const clients: Array<IClient> = [
    {
      title: "Besu",
      link: "https://besu.hyperledger.org/en/stable/",
      image: getImage(data.besuSmall),
    },
    {
      title: "Erigon",
      link: "https://github.com/ledgerwatch/erigon",
      image: getImage(data.erigonSmall),
    },
    {
      title: "Geth",
      link: "https://geth.ethereum.org/",
      image: getImage(data.gethSmall),
    },
    {
      title: "Lighthouse",
      link: "https://lighthouse-book.sigmaprime.io/",
      image: isDarkTheme
        ? getImage(data.lighthouseSmallDark)
        : getImage(data.lighthouseSmallLight),
    },
    {
      title: "Lodestar",
      link: "https://chainsafe.github.io/lodestar/",
      image: getImage(data.lodestarSmall),
    },
    {
      title: "Nimbus",
      link: "https://our.status.im/tag/nimbus/",
      image: getImage(data.nimbusSmall),
    },
    {
      title: "Nethermind",
      link: "https://docs.nethermind.io/nethermind/",
      image: getImage(data.nethermindSmall),
    },
    {
      title: "Prysm",
      link: "https://prylabs.net/",
      image: getImage(data.prysmSmall),
    },
    {
      title: "Teku",
      link: "https://pegasys.tech/teku",
      image: isDarkTheme
        ? getImage(data.tekuSmallLight)
        : getImage(data.tekuSmallDark),
    },
  ]

  const tekuImage = isDarkTheme
    ? getImage(data.tekuLight)
    : getImage(data.tekuDark)

  const lighthouseImage = isDarkTheme
    ? getImage(data.lighthouseDark)
    : getImage(data.lighthouseLight)

  const specs: Array<ISpec> = [
    {
      title: <Translation id="page-upgrades-bug-bounty-title-1" />,
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md",
    },
    {
      title: <Translation id="page-upgrades-bug-bounty-title-2" />,
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/fork-choice.md",
    },
    {
      title: <Translation id="page-upgrades-bug-bounty-title-3" />,
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md",
    },
    {
      title: <Translation id="page-upgrades-bug-bounty-title-4" />,
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md",
    },
  ]
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-upgrades-bug-bounty-meta-title", intl)}
        description={translateMessageId(
          "page-upgrades-bug-bounty-meta-description",
          intl
        )}
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Breadcrumbs slug={location.pathname} />
            <Row>
              <On />
              <Title>
                <Translation id="page-upgrades-bug-bounty-title" />
              </Title>
            </Row>
            <SloganGradient>
              <Translation id="page-upgrades-bug-bounty-slogan" />{" "}
              <Emoji size={1} text=":bug:" />
            </SloganGradient>
            <Subtitle>
              <Translation id="page-upgrades-bug-bounty-subtitle" />
            </Subtitle>
            <ButtonRow>
              <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
                <Translation id="page-upgrades-bug-bounty-submit" />
              </StyledButton>
              <StyledButton isSecondary to="#rules">
                <Translation id="page-upgrades-bug-bounty-rules" />
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={allBounterHunters} limit={5} />
            <ButtonLink isSecondary to="#leaderboard">
              <Translation id="page-upgrades-bug-bounty-leaderboard" />
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>
        <Translation id="page-upgrades-bug-bounty-clients" />
      </ClientIntro>
      <ClientRow>
        <Client image={getImage(data.besu)} />
        <Client image={getImage(data.erigon)} />
        <Client image={getImage(data.geth)} />
        <Client image={getImage(data.nethermind)} />
      </ClientRow>
      <ClientRow>
        <Client image={lighthouseImage} />
        <Client image={getImage(data.lodestar)} />
        <Client image={getImage(data.nimbus)} />
        <Client image={getImage(data.prysm)} />
        <Client image={tekuImage} />
      </ClientRow>
      <StyledGrayContainer id="rules">
        <Content>
          <H2>
            <Translation id="page-upgrades-bug-bounty-validity" />
          </H2>
          <p>
            <Translation id="page-upgrades-bug-bounty-validity-desc" />
          </p>
          <StyledCardContainer>
            <StyledCard
              emoji=":ledger:"
              title={translateMessageId(
                "page-upgrades-bug-bounty-ledger-title",
                intl
              )}
              description={translateMessageId(
                "page-upgrades-bug-bounty-ledger-desc",
                intl
              )}
            >
              <Link to="https://github.com/ethereum/consensus-specs">
                <Translation id="page-upgrades-bug-bounty-specs" />
              </Link>
              <br />
              <Link to="https://github.com/ethereum/execution-specs">
                <Translation id="page-upgrades-bug-bounty-execution-specs" />
              </Link>
              <br />
              <div>
                <p>
                  <Translation id="page-upgrades-bug-bounty-annotations" />
                </p>
                <ul>
                  <li>
                    <Link to="https://benjaminion.xyz/eth2-annotated-spec/">
                      Ben Edgington's{" "}
                      <Translation id="page-upgrades-bug-bounty-annotated-specs" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://github.com/ethereum/annotated-spec">
                      Vitalik Buterin's{" "}
                      <Translation id="page-upgrades-bug-bounty-annotated-specs" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-types" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-type-1" />
                  </li>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-type-2" />
                  </li>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-type-3" />
                  </li>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-type-4" />
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-specs-docs" />
                </h4>
                <CardList content={specs} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title={translateMessageId(
                "page-upgrades-bug-bounty-client-bugs",
                intl
              )}
              description={translateMessageId(
                "page-upgrades-bug-bounty-client-bugs-desc",
                intl
              )}
            >
              <div>
                <p>
                  <Translation id="page-upgrades-bug-bounty-client-bugs-desc-2" />
                </p>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-types" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-clients-type-1" />
                  </li>
                  <li>
                    <Translation id="page-upgrades-bug-bounty-clients-type-2" />
                  </li>
                  <li>
                    {" "}
                    <Translation id="page-upgrades-bug-bounty-clients-type-3" />
                  </li>
                </ul>
              </div>
              <div>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </h4>
                <CardList content={clients} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":book:"
              title={translateMessageId(
                "page-upgrades-bug-bounty-misc-bugs",
                intl
              )}
              description={translateMessageId(
                "page-upgrades-bug-bounty-misc-bugs-desc",
                intl
              )}
            >
              <div>
                <p>
                  <Translation id="page-upgrades-bug-bounty-misc-bugs-desc-2" />
                </p>
              </div>
              <div>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </h4>
                <Link to="https://github.com/ethereum/solidity/blob/develop/SECURITY.md">
                  SECURITY.md
                </Link>
              </div>
            </StyledCard>
            <StyledCard
              emoji=":scroll:"
              title={translateMessageId(
                "page-upgrades-bug-bounty-deposit-bugs",
                intl
              )}
              description={translateMessageId(
                "page-upgrades-bug-bounty-deposit-bugs-desc",
                intl
              )}
            >
              <div>
                <h4>
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </h4>
                <Link to="https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md">
                  Deposit Contract Specifications
                </Link>
                <br />
                <Link to="https://github.com/ethereum/consensus-specs/blob/dev/solidity_deposit_contract/deposit_contract.sol">
                  Deposit Contract Source Code
                </Link>
              </div>
            </StyledCard>
          </StyledCardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-not-included" />
          </H2>
          <p>
            <Translation id="page-upgrades-bug-bounty-not-included-desc" />
          </p>
        </Content>
      </StyledGrayContainer>
      <Content>
        <Row>
          <SubmitInstructions>
            <H2>
              <Translation id="page-upgrades-bug-bounty-submit" />
            </H2>
            <p>
              <Translation id="page-upgrades-bug-bounty-submit-desc" />{" "}
              <Link to="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                <Translation id="page-upgrades-bug-bounty-owasp" />
              </Link>
            </p>
            <p>
              <Translation id="page-upgrades-bug-bounty-points" />
            </p>
            <p>
              <b>
                <Translation id="page-upgrades-bug-bounty-quality" />
              </b>
              <Translation id="page-upgrades-bug-bounty-quality-desc" />
            </p>
            <p>
              <b>
                <Translation id="page-upgrades-bug-bounty-quality-repro" />
              </b>
              <Translation id="page-upgrades-bug-bounty-quality-repro-desc" />
            </p>
            <p>
              <Translation id="page-upgrades-bug-bounty-quality-fix" />
            </p>
          </SubmitInstructions>
          {/* TODO: Re-add Points Exchange (BugBountyPoints Component) */}
        </Row>
      </Content>
      <BugBountyCards />
      <Content>
        <Rules>
          <H2>
            <Translation id="page-upgrades-bug-bounty-hunting" />
          </H2>
          <p>
            <em>
              <Translation id="page-upgrades-bug-bounty-hunting-desc" />
            </em>
          </p>
          <ul>
            <li>
              <Translation id="page-upgrades-bug-bounty-hunting-li-1" />
            </li>
            <li>
              <Translation id="page-upgrades-bug-bounty-hunting-li-2" />
            </li>
            <li>
              <Translation id="page-upgrades-bug-bounty-hunting-li-3" />
            </li>
            <li id="leaderboard">
              <Translation id="page-upgrades-bug-bounty-hunting-li-4" />
            </li>
          </ul>
        </Rules>
      </Content>
      <GradientContainer>
        <FullLeaderboardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-hunting-execution-leaderboard" />
          </H2>
          <p>
            <Translation id="page-upgrades-bug-bounty-hunting-execution-leaderboard-subtitle" />
          </p>
          <Leaderboard content={executionBountyHunters} />
        </FullLeaderboardContainer>

        <FullLeaderboardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-hunting-leaderboard" />
          </H2>
          <p>
            <Translation id="page-upgrades-bug-bounty-hunting-leaderboard-subtitle" />
          </p>
          <Leaderboard content={consensusBountyHunters} />
        </FullLeaderboardContainer>
      </GradientContainer>
      <Divider />
      <Content>
        <CenterH2>
          <Translation id="page-upgrades-question-title" />
        </CenterH2>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              title="What should a good vulnerability submission look like?"
              contentPreview="See a real example of a quality vulnerability submission."
            >
              <p>
                <b>Description:</b> Remote Denial-of-service using non-validated
                blocks
              </p>
              <p>
                <b>Attack scenario:</b> An attacker can send blocks that may
                require a high amount of computation (the maximum gasLimit) but
                has no proof-of-work. If the attacker sends blocks continuously,
                the attacker may force the victim node to 100% CPU utilization.
              </p>
              <p>
                <b>Impact:</b> An attacker can abuse CPU utilization on remote
                nodes, possibly causing full DoS.
              </p>
              <p>
                <b>Components:</b> Go client version v0.6.8
              </p>
              <p>
                <b>Reproduction:</b> Send a block to a Go node that contains
                many txs but no valid PoW.
              </p>
              <p>
                <b>Details:</b> Blocks are validated in the method{" "}
                <code>Process(Block, dontReact)</code>. This method performs
                expensive CPU-intensive tasks, such as executing transactions (
                <code>sm.ApplyDiff</code>) and afterward it verifies the
                proof-of-work (<code>sm.ValidateBlock()</code>). This allows an
                attacker to send blocks that may require a high amount of
                computation (the maximum <code>gasLimit</code>) but has no
                proof-of-work. If the attacker sends blocks continuously, the
                attacker may force the victim node to 100% CPU utilization.
              </p>
              <p>
                <b>Fix:</b> Invert the order of the checks.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="Is the bug bounty program is time limited?"
              contentPreview="No."
            >
              <p>
                No end date is currently set. See{" "}
                <a
                  href="https://blog.ethereum.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  the Ethereum Foundation blog
                </a>{" "}
                for the latest news.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="How are bounties paid out?"
              contentPreview="Rewards are paid out in ETH or DAI."
            >
              <p>
                Rewards are paid out in ETH or DAI after the submission has been
                validated, usually a few days later. Local laws require us to
                ask for <b>proof of your identity</b>. In addition, we will need
                your ETH address.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="Can I donate my reward to charity?"
              contentPreview="Yes!"
            >
              <p>
                We can donate your reward to an established charitable
                organization of your choice.
              </p>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              title="I reported an issue / vulnerability but have not received a response!"
              contentPreview="Please allow a few days for someone to respond to your submission."
            >
              <p>
                We aim to respond to submissions as fast as possible. Feel free
                to email us at{" "}
                <a
                  href="mailto:bounty@ethereum.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  bounty@ethereum.org
                </a>{" "}
                if you have not received a response within a day or two.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="I want to be anonymous / I do not want my name on the leader board."
              contentPreview="You can do this, but it might make you ineligble for rewards."
            >
              <p>
                Submitting anonymously or with a pseudonym is OK, but will make
                you ineligible for ETH/DAI rewards. To be eligible for ETH/DAI
                rewards, we require your real name and a proof of your identity.
                Donating your bounty to a charity doesn’t require your identity.
              </p>
              <p>
                Please let us know if you do not want your name/nick displayed
                on the leader board.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="What are the points in the leaderboard?"
              contentPreview="Every found vulnerability / issue is assigned a score"
            >
              <p>
                Every found vulnerability / issue is assigned a score. Bounty
                hunters are ranked on our leaderboard by total points.
              </p>
            </ExpandableCard>
            <ExpandableCard
              title="Do you have a PGP key?"
              contentPreview="Yes. Expand for details."
            >
              <p>
                Please use{" "}
                <code>AE96 ED96 9E47 9B00 84F3 E17F E88D 3334 FA5F 6A0A</code>
              </p>
              <Link to="https://ethereum.org/security_at_ethereum.org.asc">
                PGP Key
              </Link>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Contact>
        <div>
          <H2>
            <Translation id="page-upgrades-bug-bounty-questions" />
          </H2>
          <TextNoMargin>
            <Translation id="page-upgrades-bug-bounty-email-us" />{" "}
            <Link to="mailto:bounty@ethereum.org">bounty@ethereum.org</Link>
          </TextNoMargin>
        </div>
        <Emoji size={3} text=":email:" />
      </Contact>
      <FeedbackCard />
    </Page>
  )
}

export default BugBountiesPage

export const ClientLogos = graphql`
  fragment ClientLogos on File {
    childImageSharp {
      gatsbyImageData(
        width: 60
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const ClientLogosSmall = graphql`
  fragment ClientLogosSmall on File {
    childImageSharp {
      gatsbyImageData(
        width: 24
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query BugBountyPage {
    consensusBountyHunters: allConsensusBountyHuntersCsv(
      sort: { order: DESC, fields: score }
    ) {
      nodes {
        username
        name
        score
      }
    }
    executionBountyHunters: allExecutionBountyHuntersCsv(
      sort: { order: DESC, fields: score }
    ) {
      nodes {
        username
        name
        score
      }
    }
    prysm: file(relativePath: { eq: "upgrades/prysm.png" }) {
      ...ClientLogos
    }
    lodestar: file(relativePath: { eq: "upgrades/lodestar.png" }) {
      ...ClientLogos
    }
    besu: file(relativePath: { eq: "upgrades/besu.png" }) {
      ...ClientLogos
    }
    erigon: file(relativePath: { eq: "upgrades/erigon.png" }) {
      ...ClientLogos
    }
    geth: file(relativePath: { eq: "upgrades/geth.png" }) {
      ...ClientLogos
    }
    nethermind: file(relativePath: { eq: "upgrades/nethermind.png" }) {
      ...ClientLogos
    }
    lighthouse: file(relativePath: { eq: "upgrades/lighthouse.png" }) {
      ...ClientLogos
    }
    tekuDark: file(relativePath: { eq: "upgrades/teku-dark.png" }) {
      ...ClientLogos
    }
    tekuLight: file(relativePath: { eq: "upgrades/teku-light.png" }) {
      ...ClientLogos
    }
    lighthouseLight: file(
      relativePath: { eq: "upgrades/lighthouse-light.png" }
    ) {
      ...ClientLogos
    }
    lighthouseDark: file(relativePath: { eq: "upgrades/lighthouse-dark.png" }) {
      ...ClientLogos
    }
    prysmSmall: file(relativePath: { eq: "upgrades/prysm.png" }) {
      ...ClientLogosSmall
    }
    lodestarSmall: file(relativePath: { eq: "upgrades/lodestar.png" }) {
      ...ClientLogosSmall
    }
    besuSmall: file(relativePath: { eq: "upgrades/besu.png" }) {
      ...ClientLogosSmall
    }
    erigonSmall: file(relativePath: { eq: "upgrades/erigon.png" }) {
      ...ClientLogosSmall
    }
    gethSmall: file(relativePath: { eq: "upgrades/geth.png" }) {
      ...ClientLogosSmall
    }
    nethermindSmall: file(relativePath: { eq: "upgrades/nethermind.png" }) {
      ...ClientLogosSmall
    }
    lighthouseSmallLight: file(
      relativePath: { eq: "upgrades/lighthouse-light.png" }
    ) {
      ...ClientLogosSmall
    }
    lighthouseSmallDark: file(
      relativePath: { eq: "upgrades/lighthouse-dark.png" }
    ) {
      ...ClientLogosSmall
    }
    tekuSmallDark: file(relativePath: { eq: "upgrades/teku-dark.png" }) {
      ...ClientLogosSmall
    }
    tekuSmallLight: file(relativePath: { eq: "upgrades/teku-light.png" }) {
      ...ClientLogosSmall
    }
    nimbus: file(relativePath: { eq: "upgrades/nimbus-cloud.png" }) {
      ...ClientLogos
    }
    nimbusSmall: file(relativePath: { eq: "upgrades/nimbus-cloud.png" }) {
      ...ClientLogosSmall
    }
  }
`
