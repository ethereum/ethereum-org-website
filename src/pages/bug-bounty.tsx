import React, { ReactNode } from "react"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import Card from "../components/Card"
import Leaderboard from "../components/Leaderboard"
import BugBountyCards from "../components/BugBountyCards"
import Link from "../components/Link"
import Emoji from "../components/OldEmoji"
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
import { getImage } from "../utils/image"
import { Accordion, Box, Center, Heading, Text } from "@chakra-ui/react"

const Title = ({ children }) => (
  <Text
    textTransform={"uppercase"}
    fontSize={"0.875rem"}
    color="text"
    marginBottom={"0rem"}
    marginLeft={"0.5rem"}
  >
    {children}
  </Text>
)

const H2 = ({ children }) => (
  <Heading
    as="h2"
    fontSize={"1.5rem"}
    fontStyle={"normal"}
    fontWeight={"700"}
    lineHeight={"22px"}
    letterSpacing={"0px"}
    textAlign={"left"}
  >
    {children}
  </Heading>
)

const Subtitle = ({ children }) => (
  <Box
    fontSize={"1.5rem"}
    lineHeight={"140%"}
    color="text200"
    maxWidth={"480px"}
    marginTop={"1rem"}
  >
    {children}
  </Box>
)

const Rules = ({ children }) => (
  <Box
    margin={"0 auto"}
    maxWidth="3xl"
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
  >
    {children}
  </Box>
)

const SubmitInstructions = ({ children }) => (
  <Box flex={"1 1 600px"} marginRight={"2rem"} maxWidth={"100ch"}>
    {children}
  </Box>
)

const LeaderboardContainer = ({ children }) => (
  <Box
    flex={"1 1 50%"}
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
    padding={{ lg: "6rem 2rem 8rem 0rem", base: "0" }}
  >
    {children}
  </Box>
)

const FullLeaderboardContainer = ({ children }) => (
  <Box
    margin={"2rem auto"}
    padding={"0 2rem"}
    maxWidth="3xl"
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
  >
    {children}
  </Box>
)

const On = () => (
  <Box
    width={"8px"}
    height={"8px"}
    background="success400"
    borderRadius={"64px"}
  ></Box>
)

const Contact = ({ children }) => (
  <Box
    borderRadius={"2px"}
    border={"1px"}
    borderStyle={"solid"}
    borderColor="border"
    padding={"1.5rem"}
    display={"flex"}
    justifyContent={"space-between"}
    alignItems={"center"}
    margin={"3rem 8rem"}
    width={"80%"}
  >
    {children}
  </Box>
)

const ButtonRow = ({ children }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    marginTop={"1rem"}
    flexWrap={"wrap"}
  >
    {children}
  </Box>
)

const StyledButton = ({ children, ...props }) => {
  return (
    <ButtonLink marginRight={"1rem"} marginBottom={"0rem"} {...props}>
      {children}
    </ButtonLink>
  )
}

const ClientIntro = ({ children }) => (
  <Text
    textTransform={"uppercase"}
    fontSize={"0.875rem"}
    color="text300"
    fontWeight={"600"}
    marginTop={{ base: "3rem", lg: "0" }}
  >
    {children}
  </Text>
)

const ClientRow = ({ children }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    flexDirection={{ base: "column", lg: "row" }}
  >
    {children}
  </Box>
)

const Client = ({ children }) => (
  <Box margin={"4rem"} marginTop={"1rem"} marginBottom={"3rem"}>
    {children}
  </Box>
)

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

const Row = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 464px;
  margin: 1rem;
  padding: 1.5rem;
  justify-content: flex-start;
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
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
  const theme = useTheme()
  const isDarkTheme = theme.isDark

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
              <StyledButton variant="outline" to="#rules">
                <Translation id="page-upgrades-bug-bounty-rules" />
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={allBounterHunters} limit={5} />
            <ButtonLink variant="outline" to="#leaderboard">
              <Translation id="page-upgrades-bug-bounty-leaderboard" />
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>
        <Translation id="page-upgrades-bug-bounty-clients" />
      </ClientIntro>
      <ClientRow>
        <Client>
          <GatsbyImage image={getImage(data.besu)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.erigon)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.geth)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.nethermind)!} alt=""></GatsbyImage>
        </Client>
      </ClientRow>
      <ClientRow>
        <Client>
          <GatsbyImage image={lighthouseImage!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.lodestar)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.nimbus)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={getImage(data.prysm)!} alt=""></GatsbyImage>
        </Client>
        <Client>
          <GatsbyImage image={tekuImage!} alt=""></GatsbyImage>
        </Client>
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
        <Center>
          <H2>
            <Translation id="page-upgrades-question-title" />
          </H2>
        </Center>
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          display={"flex"}
          marginTop={"2rem"}
        >
          <Box w={"50%"}>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q1-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q1-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q1-content-1" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-2" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-3" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-4" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-5" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-6" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q1-content-7" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q2-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q2-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q2-content-1" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q3-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q3-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q3-content-1" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q4-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q4-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q4-content-1" />
              </p>
            </ExpandableCard>
          </Box>
          <Box w={"50%"} marginLeft={"2rem"} flexDirection={"column"}>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q5-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q5-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q5-content-1" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q6-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q6-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q6-content-1" />
              </p>
              <p>
                <Translation id="bug-bounty-faq-q6-content-2" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q7-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q7-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q7-content-1" />
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={translateMessageId("bug-bounty-faq-q8-title", intl)}
              contentPreview={translateMessageId(
                "bug-bounty-faq-q8-contentPreview",
                intl
              )}
            >
              <p>
                <Translation id="bug-bounty-faq-q8-content-1" />
              </p>
              <Link to="https://ethereum.org/security_at_ethereum.org.asc">
                <Translation id="bug-bounty-faq-q8-PGP-key" />
              </Link>
            </ExpandableCard>
          </Box>
        </Accordion>
      </Content>
      <Divider />
      <Contact>
        <div>
          <H2>
            <Translation id="page-upgrades-bug-bounty-questions" />
          </H2>
          <Text marginBottom={"0rem"}>
            <Translation id="page-upgrades-bug-bounty-email-us" />{" "}
            <Link to="mailto:bounty@ethereum.org">bounty@ethereum.org</Link>
          </Text>
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
      sort: { score: DESC }
    ) {
      nodes {
        username
        name
        score
      }
    }
    executionBountyHunters: allExecutionBountyHuntersCsv(
      sort: { score: DESC }
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
