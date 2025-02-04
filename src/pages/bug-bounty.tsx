import { HTMLAttributes } from "react"
import { useRouter } from "next/router"
import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import BugBountyBanner from "@/components/Banners/BugBountyBanner"
import Breadcrumbs from "@/components/Breadcrumbs"
import BugBountyCards from "@/components/BugBountyCards"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import { type ImageProps, TwImage } from "@/components/Image"
import Leaderboard from "@/components/Leaderboard"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Center, Flex, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import consensusData from "@/data/consensus-bounty-hunters.json"
import executionData from "@/data/execution-bounty-hunters.json"

import useColorModeValue from "@/hooks/useColorModeValue"
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
import solidity from "@/public/images/upgrades/solidity.png"
import tekuDark from "@/public/images/upgrades/teku-dark.png"
import tekuLight from "@/public/images/upgrades/teku-light.png"
import vyper from "@/public/images/upgrades/vyper.png"

const Page = (props: ChildOnlyProp) => (
  <MainArticle
    className="mx-auto my-0 flex w-full flex-col items-center"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <div className="w-full px-8 py-4" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <Text className="mb-0 ms-2 text-sm uppercase text-body" {...props} />
)

const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="mb-8 mt-12 text-center tracking-normal" {...props} />
)

const H4 = (props: ChildOnlyProp) => (
  <h4 className="my-8 leading-xs" {...props} />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text className="mt-4 max-w-[480px] leading-xs text-body-medium" {...props} />
)

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const SloganGradient = ({ children }: ChildOnlyProp) => (
  <div
    className="mt-4 max-w-[720px] overflow-auto bg-linear-bug-bounty-title bg-clip-text"
    style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
  >
    <h1 className="mb-6 text-4xl font-bold lg:text-5xl">{children}</h1>
  </div>
)

const Rules = (props: ChildOnlyProp) => (
  <VStack className="mx-auto my-0 max-w-3xl" {...props} />
)

const SubmitInstructions = (props: ChildOnlyProp) => (
  <div className="me-8 max-w-[100ch] flex-1 basis-[600px]" {...props} />
)

const GradientContainer = (props: ChildOnlyProp) => (
  <div
    className="mt-8 w-full border-t bg-banner-grid-gradient px-0 py-16 shadow-table-item-box"
    {...props}
  />
)

const LeaderboardContainer = (props: ChildOnlyProp) => (
  <VStack
    className="flex-1 basis-1/2 p-0 lg:pb-32 lg:pl-0 lg:pr-8 lg:pt-24"
    {...props}
  />
)

const FullLeaderboardContainer = (props: ChildOnlyProp) => (
  <VStack className="mx-auto my-8 max-w-3xl px-8 py-0" {...props} />
)

const On = () => <div className="h-2 w-2 rounded-full bg-success" />

const Contact = (props: ChildOnlyProp) => (
  <Flex
    className="mx-32 my-12 w-4/5 items-center justify-between rounded-sm border border-border p-6"
    {...props}
  />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex className="mt-4 flex-wrap items-center" {...props} />
)

const StyledButton = ({ children, ...props }) => (
  <ButtonLink className="mb-0 me-4" href={props.href} {...props}>
    {children}
  </ButtonLink>
)

const ClientIntro = (props: ChildOnlyProp) => (
  <Text className="mt-5xl uppercase lg:mt-0" {...props} />
)

const ClientRow = (props: ChildOnlyProp) => (
  <VStack className="lg:flex-row" {...props} />
)

const Client = (props: ChildOnlyProp) => (
  <div className="m-16 mb-12 mt-4 w-[60px]" {...props} />
)

const HeroCard = (props: ChildOnlyProp) => (
  <VStack
    className="-mt-8 justify-between lg:mt-0 lg:flex-row lg:ps-0"
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <div
    className="flex-1 basis-1/2 pb-16 pl-0 pr-0 pt-24 lg:-mt-32 lg:pb-32 lg:pl-8 lg:pr-8 lg:pt-32"
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Flex className="items-center lg:flex-wrap" {...props} />
)

const StyledCardContainer = (props: ChildOnlyProp) => (
  <Flex className="-ml-4 -mr-4 mb-12 mt-8 flex-wrap" {...props} />
)

const StyledCard = ({ children, ...props }) => (
  <Card className="m-4 flex-[1_1_464px] justify-start p-6" {...props}>
    {children}
  </Card>
)

const StyledGrayContainer = ({ children, ...props }) => (
  <div
    className="mb-12 mt-8 w-full border-t bg-background-highlight px-0 py-16 shadow-table-item-box"
    {...props}
  >
    {children}
  </div>
)

const Faq = (props: ChildOnlyProp) => (
  <Flex className="mt-16 flex-col lg:flex-row" {...props} />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <div className="w-full" {...props} />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Flex className="ms-0 w-full flex-col lg:ms-8" {...props} />
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

type Language = {
  title: string
  link: string
  image: ImageProps["src"]
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

  const languages: Language[] = [
    {
      title: "Solidity",
      link: "https://soliditylang.org/",
      image: solidity,
    },
    {
      title: "Vyper",
      link: "https://vyperlang.org/",
      image: vyper,
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
      {/* TODO: Remove on the 25th of January */}
      <BugBountyBanner />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Breadcrumbs slug={pathname} className="mb-8" />
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
          <TwImage src={besu} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={erigon} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={geth} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={nethermind} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={reth} alt="" {...iconImageProps} />
        </Client>
      </ClientRow>
      <ClientRow>
        <Client>
          <TwImage
            src={useColorModeValue(lighthouseLight, lighthouseDark)}
            alt=""
            {...iconImageProps}
          />
        </Client>
        <Client>
          <TwImage src={lodestar} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={nimbus} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage src={prysm} alt="" {...iconImageProps} />
        </Client>
        <Client>
          <TwImage
            src={useColorModeValue(tekuDark, tekuLight)}
            alt=""
            {...iconImageProps}
          />
        </Client>
      </ClientRow>
      <StyledGrayContainer id="rules">
        <Content>
          <H2 className="mb-4 text-left">
            {t("page-upgrades-bug-bounty-validity")}
          </H2>
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
              <div>
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
              </div>
              <div>
                <H4>{t("page-upgrades-bug-bounty-types")}</H4>
                <UnorderedList>
                  <ListItem>{t("page-upgrades-bug-bounty-type-1")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-2")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-3")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-4")}</ListItem>
                </UnorderedList>
              </div>
              <div>
                <H4>{t("page-upgrades-bug-bounty-specs-docs")}</H4>
                <CardList items={specs} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":computer:"
              title={t("page-upgrades-bug-bounty-client-bugs")}
              description={t("page-upgrades-bug-bounty-client-bugs-desc")}
            >
              <div>
                <Text>
                  <Translation id="page-bug-bounty:page-upgrades-bug-bounty-client-bugs-desc-2" />
                </Text>
                <H4>{t("page-upgrades-bug-bounty-types")}</H4>
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
              </div>
              <div>
                <H4>{t("page-upgrades-bug-bounty-help-links")}</H4>
                <CardList items={clients} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":book:"
              title={t("page-upgrades-bug-bounty-misc-bugs")}
              description={t("page-upgrades-bug-bounty-misc-bugs-desc")}
            >
              <div>
                <Text>{t("page-upgrades-bug-bounty-misc-bugs-desc-2")}</Text>
              </div>
              <div>
                <H4>{t("page-upgrades-bug-bounty-help-links")}</H4>
                <CardList items={languages} />
              </div>
            </StyledCard>
            <StyledCard
              emoji=":scroll:"
              title={t("page-upgrades-bug-bounty-deposit-bugs")}
              description={t("page-upgrades-bug-bounty-deposit-bugs-desc")}
            >
              <div>
                <H4>{t("page-upgrades-bug-bounty-help-links")}</H4>
                <InlineLink href="https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/deposit-contract.md">
                  Deposit Contract Specifications
                </InlineLink>
                <br />
                <InlineLink href="https://github.com/ethereum/consensus-specs/blob/dev/solidity_deposit_contract/deposit_contract.sol">
                  Deposit Contract Source Code
                </InlineLink>
              </div>
            </StyledCard>
            <StyledCard
              emoji=":bug:"
              title={t("page-upgrades-bug-bounty-dependency-bugs")}
              description={t("page-upgrades-bug-bounty-dependency-bugs-desc")}
            >
              <div>
                <H4>{t("page-upgrades-bug-bounty-help-links")}</H4>
                <InlineLink href="https://github.com/ethereum/c-kzg-4844">
                  C-KZG-4844
                </InlineLink>
                <br />
                <InlineLink href="https://github.com/crate-crypto/go-kzg-4844">
                  Go-KZG-4844
                </InlineLink>
              </div>
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
              <b>{t("page-upgrades-bug-bounty-quality")}</b>
              {t("page-upgrades-bug-bounty-quality-desc")}
            </Text>
            <Text>
              <b>{t("page-upgrades-bug-bounty-quality-repro")}</b>
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
            <em>{t("page-upgrades-bug-bounty-hunting-desc")}</em>
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
        <div>
          <Text className="mb-4 text-xl font-bold">
            {t("page-upgrades-bug-bounty-questions")}
          </Text>
          <Text className="mb-0">
            {t("page-upgrades-bug-bounty-email-us")}{" "}
            <InlineLink href="mailto:bounty@ethereum.org">
              bounty@ethereum.org
            </InlineLink>
          </Text>
        </div>
        <Emoji className="text-5xl" text=":email:" />
      </Contact>
      <FeedbackCard />
    </Page>
  )
}

export default BugBountiesPage
