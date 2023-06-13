import React, { ReactNode } from "react"
import { useTheme } from "@emotion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Center,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

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
import FeedbackCard from "../components/FeedbackCard"
import { getImage } from "../utils/image"

import type { ChildOnlyProp, Context } from "../types"

const Page = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <Text
    textTransform="uppercase"
    fontSize="0.875rem"
    color="text"
    mb={0}
    ml={2}
    {...props}
  />
)

const H2 = (props: ChildOnlyProp) => (
  <Heading
    as="h2"
    fontSize="1.5rem"
    fontStyle="normal"
    fontWeight="700"
    lineHeight="22px"
    letterSpacing="0rem"
    textAlign="left"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text
    fontSize="1.5rem"
    lineHeight="140%"
    color="text200"
    maxW="480px"
    mt={4}
    {...props}
  />
)

const SloganGradient = (props: ChildOnlyProp) => (
  <Box
    fontWeight="800"
    fontSize={{ base: "2.5rem", lg: "3rem" }}
    lineHeight="140%"
    maxW="720px"
    mt={4}
    mb={0}
    bgClip="text"
    sx={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
    bg="upgradesGradient"
  >
    <Text>{props.children}</Text>
  </Box>
)

const Rules = (props: ChildOnlyProp) => (
  <Box
    my={0}
    mx="auto"
    maxW="3xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
    {...props}
  />
)

const SubmitInstructions = (props: ChildOnlyProp) => (
  <Box flex="1 1 600px" mr={8} maxW="100ch" {...props} />
)

const GradientContainer = (props: ChildOnlyProp) => (
  <Box
    w="full"
    py={16}
    px={0}
    mt={8}
    bg="cardGradient"
    boxShadow="inset 0px 1px 0px tableItemBoxShadow"
    {...props}
  />
)

const LeaderboardContainer = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 50%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    p={{ lg: "6rem 2rem 8rem 0rem", base: "0" }}
    {...props}
  />
)

const FullLeaderboardContainer = (props: ChildOnlyProp) => (
  <Box
    my={8}
    mx="auto"
    py={0}
    px={8}
    maxW="3xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
    {...props}
  />
)

const On = () => <Box w="8px" h="8px" bg="success400" borderRadius="64px" />

const Divider = () => (
  <Box my={16} mx={0} w="10%" h={1} backgroundColor="homeDivider" />
)

const Contact = (props: ChildOnlyProp) => (
  <Box
    borderRadius="2px"
    border="1px"
    borderStyle="solid"
    borderColor="border"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    p={6}
    my={12}
    mx={32}
    w="80%"
    {...props}
  />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Box display="flex" alignItems="center" mt={4} flexWrap="wrap" {...props} />
)

const StyledButton = ({ children, ...props }) => {
  return (
    <ButtonLink mr={4} mb={0} {...props}>
      {children}
    </ButtonLink>
  )
}

const ClientIntro = (props: ChildOnlyProp) => (
  <Text
    textTransform="uppercase"
    fontSize="0.875rem"
    color="text300"
    fontWeight="600"
    mt={{ base: "3rem", lg: "0" }}
    {...props}
  />
)

const ClientRow = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    alignItems="center"
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Client = (props: ChildOnlyProp) => (
  <Box m={16} mt={4} mb={12} {...props} />
)

const HeroCard = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    justifyContent="space-between"
    flexDirection={{ base: "column", lg: "row" }}
    pl={{ lg: "0" }}
    mt={{ base: "-2rem", lg: "0" }}
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 50%"
    p={{ lg: "8rem 2rem 8rem 2rem", base: "6rem 0 4rem 0" }}
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    alignItems="center"
    flexWrap={{ base: "nowrap", lg: "wrap" }}
    {...props}
  />
)

const StyledCardContainer = (props: ChildOnlyProp) => (
  <Box display="flex" flexWrap="wrap" m="2rem -1rem 3rem -1rem" {...props} />
)

const StyledCard = ({ children, ...props }) => {
  return (
    <Card flex="1 1 464px" m={4} p={6} justifyContent="flex-start" {...props}>
      {children}
    </Card>
  )
}

const StyledGrayContainer = ({ children, ...props }) => (
  <Box
    w="full"
    py={16}
    px={0}
    mt={8}
    mb={12}
    bg="grayBackground"
    boxShadow="inset 0px 1px 0px tableItemBoxShadow"
    {...props}
  >
    {children}
  </Box>
)

const Faq = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    mt={16}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)
const LeftColumn = (props: ChildOnlyProp) => <Box w="full" {...props} />
const RightColumn = (props: ChildOnlyProp) => (
  <Box
    w="full"
    ml={{ base: "0rem", lg: "2rem" }}
    flexDirection={{ base: "column", lg: "column" }}
    {...props}
  />
)

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
  const { t } = useTranslation()
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
        title={t("page-upgrades-bug-bounty-meta-title")}
        description={t("page-upgrades-bug-bounty-meta-description")}
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
              <Emoji text=":bug:" />
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
          <Text>
            <Translation id="page-upgrades-bug-bounty-validity-desc" />
          </Text>
          <StyledCardContainer>
            <StyledCard
              emoji=":ledger:"
              title={t("page-upgrades-bug-bounty-ledger-title")}
              description={t("page-upgrades-bug-bounty-ledger-desc")}
            >
              <Link to="https://github.com/ethereum/consensus-specs">
                <Translation id="page-upgrades-bug-bounty-specs" />
              </Link>
              <br />
              <Link to="https://github.com/ethereum/execution-specs">
                <Translation id="page-upgrades-bug-bounty-execution-specs" />
              </Link>
              <br />
              <Box>
                <Text>
                  <Translation id="page-upgrades-bug-bounty-annotations" />
                </Text>
                <UnorderedList>
                  <ListItem>
                    <Link to="https://benjaminion.xyz/eth2-annotated-spec/">
                      Ben Edgington's{" "}
                      <Translation id="page-upgrades-bug-bounty-annotated-specs" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="https://github.com/ethereum/annotated-spec">
                      Vitalik Buterin's{" "}
                      <Translation id="page-upgrades-bug-bounty-annotated-specs" />
                    </Link>
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-types" />
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-type-1" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-type-2" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-type-3" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-type-4" />
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-specs-docs" />
                </Heading>
                <CardList content={specs} />
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title={t("page-upgrades-bug-bounty-client-bugs")}
              description={t("page-upgrades-bug-bounty-client-bugs-desc")}
            >
              <Box>
                <Text>
                  <Translation id="page-upgrades-bug-bounty-client-bugs-desc-2" />
                </Text>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-types" />
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-clients-type-1" />
                  </ListItem>
                  <ListItem>
                    <Translation id="page-upgrades-bug-bounty-clients-type-2" />
                  </ListItem>
                  <ListItem>
                    {" "}
                    <Translation id="page-upgrades-bug-bounty-clients-type-3" />
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </Heading>
                <CardList content={clients} />
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":book:"
              title={t("page-upgrades-bug-bounty-misc-bugs")}
              description={t("page-upgrades-bug-bounty-misc-bugs-desc")}
            >
              <Box>
                <Text>
                  <Translation id="page-upgrades-bug-bounty-misc-bugs-desc-2" />
                </Text>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </Heading>
                <Link to="https://github.com/ethereum/solidity/blob/develop/SECURITY.md">
                  SECURITY.md
                </Link>
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":scroll:"
              title={t("page-upgrades-bug-bounty-deposit-bugs")}
              description={t("page-upgrades-bug-bounty-deposit-bugs-desc")}
            >
              <Box>
                <Heading
                  as="h4"
                  fontWeight={500}
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  <Translation id="page-upgrades-bug-bounty-help-links" />
                </Heading>
                <Link to="https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md">
                  Deposit Contract Specifications
                </Link>
                <br />
                <Link to="https://github.com/ethereum/consensus-specs/blob/dev/solidity_deposit_contract/deposit_contract.sol">
                  Deposit Contract Source Code
                </Link>
              </Box>
            </StyledCard>
          </StyledCardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-not-included" />
          </H2>
          <Text>
            <Translation id="page-upgrades-bug-bounty-not-included-desc" />
          </Text>
        </Content>
      </StyledGrayContainer>
      <Content>
        <Row>
          <SubmitInstructions>
            <H2>
              <Translation id="page-upgrades-bug-bounty-submit" />
            </H2>
            <Text>
              <Translation id="page-upgrades-bug-bounty-submit-desc" />{" "}
              <Link to="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                <Translation id="page-upgrades-bug-bounty-owasp" />
              </Link>
            </Text>
            <Text>
              <Translation id="page-upgrades-bug-bounty-points" />
            </Text>
            <Text>
              <Text as="b">
                <Translation id="page-upgrades-bug-bounty-quality" />
              </Text>
              <Translation id="page-upgrades-bug-bounty-quality-desc" />
            </Text>
            <Text>
              <Text as="b">
                <Translation id="page-upgrades-bug-bounty-quality-repro" />
              </Text>
              <Translation id="page-upgrades-bug-bounty-quality-repro-desc" />
            </Text>
            <Text>
              <Translation id="page-upgrades-bug-bounty-quality-fix" />
            </Text>
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
          <Text>
            <Text as="em">
              <Translation id="page-upgrades-bug-bounty-hunting-desc" />
            </Text>
          </Text>
          <UnorderedList>
            <ListItem>
              <Translation id="page-upgrades-bug-bounty-hunting-li-1" />
            </ListItem>
            <ListItem>
              <Translation id="page-upgrades-bug-bounty-hunting-li-2" />
            </ListItem>
            <ListItem>
              <Translation id="page-upgrades-bug-bounty-hunting-li-3" />
            </ListItem>
            <ListItem id="leaderboard">
              <Translation id="page-upgrades-bug-bounty-hunting-li-4" />
            </ListItem>
          </UnorderedList>
        </Rules>
      </Content>
      <GradientContainer>
        <FullLeaderboardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-hunting-execution-leaderboard" />
          </H2>
          <Text>
            <Translation id="page-upgrades-bug-bounty-hunting-execution-leaderboard-subtitle" />
          </Text>
          <Leaderboard content={executionBountyHunters} />
        </FullLeaderboardContainer>
        <FullLeaderboardContainer>
          <H2>
            <Translation id="page-upgrades-bug-bounty-hunting-leaderboard" />
          </H2>
          <Text>
            <Translation id="page-upgrades-bug-bounty-hunting-leaderboard-subtitle" />
          </Text>
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
        <Faq>
          <LeftColumn>
            <ExpandableCard
              title={t("bug-bounty-faq-q1-title")}
              contentPreview={t("bug-bounty-faq-q1-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q1-content-1" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-2" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-3" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-4" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-5" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-6" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q1-content-7" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q2-title")}
              contentPreview={t("bug-bounty-faq-q2-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q2-content-1" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q3-title")}
              contentPreview={t("bug-bounty-faq-q3-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q3-content-1" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q4-title")}
              contentPreview={t("bug-bounty-faq-q4-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q4-content-1" />
              </Text>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              title={t("bug-bounty-faq-q5-title")}
              contentPreview={t("bug-bounty-faq-q5-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q5-content-1" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q6-title")}
              contentPreview={t("bug-bounty-faq-q6-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q6-content-1" />
              </Text>
              <Text>
                <Translation id="bug-bounty-faq-q6-content-2" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q7-title")}
              contentPreview={t("bug-bounty-faq-q7-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q7-content-1" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q8-title")}
              contentPreview={t("bug-bounty-faq-q8-contentPreview")}
            >
              <Text>
                <Translation id="bug-bounty-faq-q8-content-1" />
              </Text>
              <Link to="https://ethereum.org/security_at_ethereum.org.asc">
                <Translation id="bug-bounty-faq-q8-PGP-key" />
              </Link>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Contact>
        <Box>
          <H2>
            <Translation id="page-upgrades-bug-bounty-questions" />
          </H2>
          <Text mb="0rem">
            <Translation id="page-upgrades-bug-bounty-email-us" />{" "}
            <Link to="mailto:bounty@ethereum.org">bounty@ethereum.org</Link>
          </Text>
        </Box>
        <Emoji fontSize="5xl" text=":email:" />
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
  query BugBountyPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-bug-bounty", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
