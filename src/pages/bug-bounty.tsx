import { useRouter } from "next/router"
import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Center,
  Heading,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import BugBountyCards from "@/components/BugBountyCards"
import ButtonLink from "@/components/Buttons/ButtonLink"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import { Image, type ImageProps } from "@/components/Image"
import Leaderboard from "@/components/Leaderboard"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import consensusData from "@/data/consensus-bounty-hunters.json"
import executionData from "@/data/execution-bounty-hunters.json"

import besu from "@/public/images/upgrades/besu.png"
import erigon from "@/public/images/upgrades/erigon.png"
import geth from "@/public/images/upgrades/geth.png"
import lighthouseDark from "@/public/images/upgrades/lighthouse-dark.png"
import lighthouseLight from "@/public/images/upgrades/lighthouse-light.png"
import lodestar from "@/public/images/upgrades/lodestar.png"
import nethermind from "@/public/images/upgrades/nethermind.png"
import nimbus from "@/public/images/upgrades/nimbus-cloud.png"
import prysm from "@/public/images/upgrades/prysm.png"
import reth from "@/public/images/upgrades/reth.png"
import tekuDark from "@/public/images/upgrades/teku-dark.png"
import tekuLight from "@/public/images/upgrades/teku-light.png"

const Page = (props: ChildOnlyProp) => (
  <Box
    as={MainArticle}
    display="flex"
    flexDirection="column"
    alignItems="center"
    w="full"
    my="0"
    mx="auto"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box py="4" px="8" w="full" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <Text
    textTransform="uppercase"
    fontSize="0.875rem"
    color="text"
    mb="0"
    ms="2"
    {...props}
  />
)

const H2 = (props: ChildOnlyProp) => (
  <OldHeading
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
    mt="4"
    {...props}
  />
)

const SloganGradient = (props: ChildOnlyProp) => (
  <Box
    maxW="720px"
    mt="4"
    bgClip="text"
    overflow="auto"
    sx={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
    bg="upgradesGradient"
  >
    <Heading
      as="h1"
      fontSize={{ base: "2.5rem", lg: "5xl" }}
      fontWeight="800"
      mb="1.45rem"
    >
      {props.children}
    </Heading>
  </Box>
)

const Rules = (props: ChildOnlyProp) => (
  <Box
    my="0"
    mx="auto"
    maxW="3xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
    {...props}
  />
)

const SubmitInstructions = (props: ChildOnlyProp) => (
  <Box flex="1 1 600px" me="8" maxW="100ch" {...props} />
)

const GradientContainer = (props: ChildOnlyProp) => (
  <Box
    w="full"
    py="16"
    px="0"
    mt="8"
    bg="cardGradient"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
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
    my="8"
    mx="auto"
    py="0"
    px="8"
    maxW="3xl"
    display="flex"
    flexDirection="column"
    alignItems="center"
    {...props}
  />
)

const On = () => <Box w="8px" h="8px" bg="success400" borderRadius="64px" />

const Divider = () => (
  <Box my="16" mx="0" w="10%" h="1" backgroundColor="homeDivider" />
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
    p="6"
    my="12"
    mx="32"
    w="80%"
    {...props}
  />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Box display="flex" alignItems="center" mt="4" flexWrap="wrap" {...props} />
)

const StyledButton = ({ children, ...props }) => (
  <ButtonLink me="4" mb="0" {...props}>
    {children}
  </ButtonLink>
)

const ClientIntro = (props: ChildOnlyProp) => (
  <Text
    textTransform="uppercase"
    fontSize="0.875rem"
    color="text300"
    fontWeight="semibold"
    mt={{ base: "5xl", lg: "0" }}
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
  <Box m="16" mt="4" mb="12" w="60px" {...props} />
)

const HeroCard = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    justifyContent="space-between"
    flexDirection={{ base: "column", lg: "row" }}
    ps={{ lg: "0" }}
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

const StyledCard = ({ children, ...props }) => (
  <Card flex="1 1 464px" m="4" p="6" justifyContent="flex-start" {...props}>
    {children}
  </Card>
)

const StyledGrayContainer = ({ children, ...props }) => (
  <Box
    w="full"
    py="16"
    px="0"
    mt="8"
    mb="12"
    bg="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  >
    {children}
  </Box>
)

const Faq = (props: ChildOnlyProp) => (
  <Box
    display="flex"
    mt="16"
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => <Box w="full" {...props} />

const RightColumn = (props: ChildOnlyProp) => (
  <Box
    w="full"
    ms={{ base: "0rem", lg: "2rem" }}
    flexDirection={{ base: "column", lg: "column" }}
    {...props}
  />
)

type BountyHuntersArg = { score?: number }

type Node = {
  readonly name: string
  readonly username: string
  readonly score: number
}

type Client = {
  title: string
  link: string
  image: ImageProps["src"]
}

type Spec = {
  title: string
  link: string
}

const sortBountyHuntersFn = (a: BountyHuntersArg, b: BountyHuntersArg) => {
  if (!a.score || !b.score) return 0
  return b.score - a.score
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("bug-bounty")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const BugBountiesPage = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation("page-bug-bounty")

  const consensusBountyHunters: Node[] = consensusData.sort(sortBountyHuntersFn)
  const executionBountyHunters: Node[] = executionData.sort(sortBountyHuntersFn)

  const bountyHuntersArrayToObject: Record<string, Node> = [
    ...consensusData,
    ...executionData,
  ].reduce((acc, next) => {
    const name = next.name
    if (!name) return acc

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

  const clients: Client[] = [
    {
      title: "Besu",
      link: "https://besu.hyperledger.org/en/stable/",
      image: besu,
    },
    {
      title: "Erigon",
      link: "https://github.com/ledgerwatch/erigon",
      image: erigon,
    },
    {
      title: "Geth",
      link: "https://geth.ethereum.org/",
      image: geth,
    },
    {
      title: "Lighthouse",
      link: "https://lighthouse-book.sigmaprime.io/",
      image: useColorModeValue(lighthouseLight, lighthouseDark),
    },
    {
      title: "Lodestar",
      link: "https://chainsafe.github.io/lodestar/",
      image: lodestar,
    },
    {
      title: "Nimbus",
      link: "https://our.status.im/tag/nimbus/",
      image: nimbus,
    },
    {
      title: "Nethermind",
      link: "https://docs.nethermind.io/nethermind/",
      image: nethermind,
    },
    {
      title: "Prysm",
      link: "https://prylabs.net/",
      image: prysm,
    },
    {
      title: "Reth",
      link: "https://reth.rs/",
      image: reth,
    },
    {
      title: "Teku",
      link: "https://pegasys.tech/teku",
      image: useColorModeValue(tekuDark, tekuLight),
    },
  ]

  const specs: Spec[] = [
    {
      title: t("page-upgrades-bug-bounty-title-1"),
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-2"),
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/fork-choice.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-3"),
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-4"),
      link: "https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md",
    },
  ]

  const iconImageProps = {
    width: 60,
  }
  return (
    <Page>
      <PageMetadata
        title={t("page-upgrades-bug-bounty-meta-title")}
        description={t("page-upgrades-bug-bounty-meta-description")}
      />
      {/* INFO: Uncomment this to enable Bug Bounty Banner: <BugBountyBanner /> */}
      <Content>
        <HeroCard>
          <HeroContainer>
            <Breadcrumbs slug={pathname} mb="8" />
            <Row>
              <On />
              <Title>{t("page-upgrades-bug-bounty-title")}</Title>
            </Row>
            <SloganGradient>
              {t("page-upgrades-bug-bounty-slogan")} <Emoji text=":bug:" />
            </SloganGradient>
            <Subtitle>{t("page-upgrades-bug-bounty-subtitle")}</Subtitle>
            <ButtonRow>
              <StyledButton href="https://forms.gle/Gnh4gzGh66Yc3V7G8">
                {t("page-upgrades-bug-bounty-submit")}
              </StyledButton>
              <StyledButton variant="outline" href="#rules" isSecondary>
                {t("page-upgrades-bug-bounty-rules")}
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={allBounterHunters.slice(0, 5)} />
            <ButtonLink variant="outline" href="#leaderboard">
              {t("page-upgrades-bug-bounty-leaderboard")}
            </ButtonLink>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
      <ClientIntro>{t("page-upgrades-bug-bounty-clients")}</ClientIntro>
      <ClientRow>
        <Client>
          <Image src={besu} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={erigon} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={geth} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={nethermind} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={reth} alt="" {...iconImageProps} />
        </Client>
      </ClientRow>
      <ClientRow>
        <Client>
          <Image
            src={useColorModeValue(lighthouseLight, lighthouseDark)}
            alt=""
            {...iconImageProps}
          />
        </Client>
        <Client>
          <Image src={lodestar} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={nimbus} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image src={prysm} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <Image
            src={useColorModeValue(tekuDark, tekuLight)}
            alt=""
            {...iconImageProps}
          />
        </Client>
      </ClientRow>
      <StyledGrayContainer id="rules">
        <Content>
          <H2>{t("page-upgrades-bug-bounty-validity")}</H2>
          <Text>
            <Translation id="page-bug-bounty:page-upgrades-bug-bounty-validity-desc" />
          </Text>
          <StyledCardContainer>
            <StyledCard
              emoji=":ledger:"
              title={t("page-upgrades-bug-bounty-ledger-title")}
              description={t("page-upgrades-bug-bounty-ledger-desc")}
            >
              <InlineLink href="https://github.com/ethereum/consensus-specs">
                {t("page-upgrades-bug-bounty-specs")}
              </InlineLink>
              <br />
              <InlineLink href="https://github.com/ethereum/execution-specs">
                {t("page-upgrades-bug-bounty-execution-specs")}
              </InlineLink>
              <br />
              <Box>
                <Text>{t("page-upgrades-bug-bounty-annotations")}</Text>
                <UnorderedList>
                  <ListItem>
                    <InlineLink href="https://benjaminion.xyz/eth2-annotated-spec/">
                      Ben Edgington&apos;s{" "}
                      {t("page-upgrades-bug-bounty-annotated-specs")}
                    </InlineLink>
                  </ListItem>
                  <ListItem>
                    <InlineLink href="https://github.com/ethereum/annotated-spec">
                      Vitalik Buterin&apos;s{" "}
                      {t("page-upgrades-bug-bounty-annotated-specs")}
                    </InlineLink>
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-types")}
                </OldHeading>
                <UnorderedList>
                  <ListItem>{t("page-upgrades-bug-bounty-type-1")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-2")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-3")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-4")}</ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-specs-docs")}
                </OldHeading>
                <CardList items={specs} />
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title={t("page-upgrades-bug-bounty-client-bugs")}
              description={t("page-upgrades-bug-bounty-client-bugs-desc")}
            >
              <Box>
                <Text>
                  <Translation id="page-bug-bounty:page-upgrades-bug-bounty-client-bugs-desc-2" />
                </Text>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-types")}
                </OldHeading>
                <UnorderedList>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-1")}
                  </ListItem>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-2")}
                  </ListItem>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-3")}
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-help-links")}
                </OldHeading>
                <CardList items={clients} />
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":book:"
              title={t("page-upgrades-bug-bounty-misc-bugs")}
              description={t("page-upgrades-bug-bounty-misc-bugs-desc")}
            >
              <Box>
                <Text>{t("page-upgrades-bug-bounty-misc-bugs-desc-2")}</Text>
              </Box>
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-help-links")}
                </OldHeading>
                <InlineLink href="https://github.com/ethereum/solidity/blob/develop/SECURITY.md">
                  SECURITY.md
                </InlineLink>
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":scroll:"
              title={t("page-upgrades-bug-bounty-deposit-bugs")}
              description={t("page-upgrades-bug-bounty-deposit-bugs-desc")}
            >
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-help-links")}
                </OldHeading>
                <InlineLink href="https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md">
                  Deposit Contract Specifications
                </InlineLink>
                <br />
                <InlineLink href="https://github.com/ethereum/consensus-specs/blob/dev/solidity_deposit_contract/deposit_contract.sol">
                  Deposit Contract Source Code
                </InlineLink>
              </Box>
            </StyledCard>
            <StyledCard
              emoji=":bug:"
              title={t("page-upgrades-bug-bounty-dependency-bugs")}
              description={t("page-upgrades-bug-bounty-dependency-bugs-desc")}
            >
              <Box>
                <OldHeading
                  as="h4"
                  fontWeight="medium"
                  lineHeight={1.4}
                  fontSize={{ base: "md", md: "xl" }}
                >
                  {t("page-upgrades-bug-bounty-help-links")}
                </OldHeading>
                <InlineLink href="https://github.com/ethereum/c-kzg-4844">
                  C-KZG-4844
                </InlineLink>
                <br />
                <InlineLink href="https://github.com/crate-crypto/go-kzg-4844">
                  Go-KZG-4844
                </InlineLink>
              </Box>
            </StyledCard>
          </StyledCardContainer>
          <H2>{t("page-upgrades-bug-bounty-not-included")}</H2>
          <Text>{t("page-upgrades-bug-bounty-not-included-desc")}</Text>
        </Content>
      </StyledGrayContainer>
      <Content>
        <Row>
          <SubmitInstructions>
            <H2>{t("page-upgrades-bug-bounty-submit")}</H2>
            <Text>
              {t("page-upgrades-bug-bounty-submit-desc")}{" "}
              <InlineLink href="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                {t("page-upgrades-bug-bounty-owasp")}
              </InlineLink>
            </Text>
            <Text>{t("page-upgrades-bug-bounty-points")}</Text>
            <Text>
              <Text as="b">{t("page-upgrades-bug-bounty-quality")}</Text>
              {t("page-upgrades-bug-bounty-quality-desc")}
            </Text>
            <Text>
              <Text as="b">{t("page-upgrades-bug-bounty-quality-repro")}</Text>
              {t("page-upgrades-bug-bounty-quality-repro-desc")}
            </Text>
            <Text>
              <Translation id="page-bug-bounty:page-upgrades-bug-bounty-quality-fix" />
            </Text>
          </SubmitInstructions>
        </Row>
      </Content>
      <BugBountyCards />
      <Content>
        <Rules>
          <H2>{t("page-upgrades-bug-bounty-hunting")}</H2>
          <Text>
            <Text as="em">{t("page-upgrades-bug-bounty-hunting-desc")}</Text>
          </Text>
          <UnorderedList>
            <ListItem>{t("page-upgrades-bug-bounty-hunting-li-1")}</ListItem>
            <ListItem>{t("page-upgrades-bug-bounty-hunting-li-2")}</ListItem>
            <ListItem>{t("page-upgrades-bug-bounty-hunting-li-3")}</ListItem>
            <ListItem id="leaderboard">
              {t("page-upgrades-bug-bounty-hunting-li-4")}
            </ListItem>
          </UnorderedList>
        </Rules>
      </Content>
      <GradientContainer>
        <FullLeaderboardContainer>
          <H2>{t("page-upgrades-bug-bounty-hunting-execution-leaderboard")}</H2>
          <Text>
            {t(
              "page-upgrades-bug-bounty-hunting-execution-leaderboard-subtitle"
            )}
          </Text>
          <Leaderboard content={executionBountyHunters} />
        </FullLeaderboardContainer>
        <FullLeaderboardContainer>
          <H2>{t("page-upgrades-bug-bounty-hunting-leaderboard")}</H2>
          <Text>
            {t("page-upgrades-bug-bounty-hunting-leaderboard-subtitle")}
          </Text>
          <Leaderboard content={consensusBountyHunters} />
        </FullLeaderboardContainer>
      </GradientContainer>
      <Divider />
      <Content>
        <Center>
          <H2>{t("page-upgrades-question-title")}</H2>
        </Center>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-contentPreview" />
              }
            >
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-1" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-2" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-3" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-4" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-5" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-6" />
              </Text>
              <Text>
                <Translation id="page-bug-bounty:bug-bounty-faq-q1-content-7" />
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q2-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q2-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q2-content-1" />
                }
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q3-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q3-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q3-content-1" />
                }
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q4-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q4-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q4-content-1" />
                }
              </Text>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q5-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q5-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q5-content-1" />
                }
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q6-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q6-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q6-content-1" />
                }
              </Text>
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q6-content-2" />
                }
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q7-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q7-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q7-content-1" />
                }
              </Text>
            </ExpandableCard>
            <ExpandableCard
              title={
                <Translation id="page-bug-bounty:bug-bounty-faq-q8-title" />
              }
              contentPreview={
                <Translation id="page-bug-bounty:bug-bounty-faq-q8-contentPreview" />
              }
            >
              <Text>
                {
                  <Translation id="page-bug-bounty:bug-bounty-faq-q8-content-1" />
                }
              </Text>
              <InlineLink href="https://ethereum.org/security_at_ethereum.org.asc">
                {<Translation id="page-bug-bounty:bug-bounty-faq-q8-PGP-key" />}
              </InlineLink>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Contact>
        <Box>
          <H2>{t("page-upgrades-bug-bounty-questions")}</H2>
          <Text mb="0rem">
            {t("page-upgrades-bug-bounty-email-us")}{" "}
            <InlineLink href="mailto:bounty@ethereum.org">
              bounty@ethereum.org
            </InlineLink>
          </Text>
        </Box>
        <Emoji fontSize="5xl" text=":email:" />
      </Contact>
      <FeedbackCard />
    </Page>
  )
}

export default BugBountiesPage
