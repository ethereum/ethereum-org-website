import { getTranslations } from "next-intl/server"
import type { ComponentProps } from "react"

import type { ChildOnlyProp, CommitHistory, Lang, Params } from "@/lib/types"

/* Uncomment for Bug Bounty Banner: */
import BugBountyBanner from "@/components/Banners/BugBountyBanner"
import Breadcrumbs from "@/components/Breadcrumbs"
import BugBountyCards from "@/components/BugBountyCards"
import Card from "@/components/Card"
import CardList, { CardProps } from "@/components/CardList"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import Leaderboard from "@/components/Leaderboard"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Center, Flex, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import Link from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import consensusData from "@/data/consensus-bounty-hunters.json"
import executionData from "@/data/execution-bounty-hunters.json"

import BugBountyJsonLD from "./page-jsonld"

import besu from "@/public/images/upgrades/besu.png"
import erigon from "@/public/images/upgrades/erigon.png"
import geth from "@/public/images/upgrades/geth.png"
import grandine from "@/public/images/upgrades/grandine.png"
import lighthouseLight from "@/public/images/upgrades/lighthouse-light.png"
import lodestar from "@/public/images/upgrades/lodestar.png"
import nethermind from "@/public/images/upgrades/nethermind.png"
import nimbus from "@/public/images/upgrades/nimbus-cloud.png"
import prysm from "@/public/images/upgrades/prysm.png"
import reth from "@/public/images/upgrades/reth.png"
import solidityLight from "@/public/images/upgrades/solidity-light.png"
import tekuLight from "@/public/images/upgrades/teku-dark.png"
import vyper from "@/public/images/upgrades/vyper.png"

const Content = (props: ChildOnlyProp) => (
  <div className="w-full px-8 py-4" {...props} />
)

const H2 = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2 className={cn("mb-8 mt-12", className)} {...props} />
)

const H4 = (props: ChildOnlyProp) => (
  <h4 className="my-8 leading-xs" {...props} />
)

const Text = ({ className, ...props }: ComponentProps<"p">) => (
  <p className={cn("mb-6", className)} {...props} />
)

const FullLeaderboardContainer = (props: ChildOnlyProp) => (
  <VStack className="mx-auto my-8 max-w-3xl px-8 py-0" {...props} />
)

const ClientRow = (props: ChildOnlyProp) => (
  <VStack className="lg:flex-row" {...props} />
)

const Client = (props: ChildOnlyProp) => (
  <div className="m-16 mb-12 mt-4 w-[60px]" {...props} />
)

const Row = (props: ChildOnlyProp) => (
  <Flex className="items-center lg:flex-wrap" {...props} />
)

const StyledCard = ({ children, ...props }) => (
  <Card className="m-4 flex-[1_1_464px] justify-start p-6" {...props}>
    {children}
  </Card>
)

type CardDetails = Required<Pick<CardProps, "title" | "link" | "image">> &
  Pick<CardProps, "className">

type Node = {
  readonly name: string
  readonly username: string
  readonly score: number
}

type Spec = {
  title: string
  link: string
}

type BountyHuntersArg = { score?: number }

const sortBountyHuntersFn = (a: BountyHuntersArg, b: BountyHuntersArg) => {
  if (!a.score || !b.score) return 0
  return b.score - a.score
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params

  const t = await getTranslations({ namespace: "page-bug-bounty" })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "bug-bounty",
      locale as Lang,
      commitHistoryCache
    )

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

  const clients: CardDetails[] = [
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
      image: lighthouseLight,
      className: "[&_img]:dark:invert",
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
      link: "https://docs.nethermind.io/",
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
      image: tekuLight,
      className: "[&_img]:dark:invert",
    },
    {
      title: "Grandine",
      link: "https://grandine.io/",
      image: grandine,
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

  const languages: CardDetails[] = [
    {
      title: "Solidity",
      link: "https://soliditylang.org/",
      image: solidityLight,
      className: "[&_img]:dark:invert",
    },
    {
      title: "Vyper",
      link: "https://vyperlang.org/",
      image: vyper,
    },
  ]

  const iconImageProps = (duotone?: boolean) => ({
    className: cn("w-[60px]", duotone && "dark:invert"),
    sizes: "60px",
  })

  return (
    <>
      <BugBountyJsonLD locale={locale} contributors={contributors} />
      <MainArticle className="mx-auto my-0 flex w-full flex-col items-center">
        {/* Uncomment for Bug Bounty Banner: */}
        <BugBountyBanner />
        <Content>
          <VStack className="-mt-8 justify-between lg:mt-0 lg:flex-row lg:ps-0">
            <div className="flex-1 basis-1/2 pb-16 pl-0 pr-0 pt-24 lg:-mt-32 lg:pb-32 lg:pl-8 lg:pr-8 lg:pt-32">
              <Breadcrumbs slug="bug-bounty" className="mb-8" />
              <Row>
                <div className="h-2 w-2 rounded-full bg-success" />{" "}
                <Text className="mb-0 ms-2 text-sm uppercase text-body">
                  {t("page-upgrades-bug-bounty-title")}
                </Text>
              </Row>
              <div
                className="mt-4 max-w-[720px] overflow-auto bg-linear-bug-bounty-title bg-clip-text"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
                  {t("page-upgrades-bug-bounty-slogan")}&nbsp;
                  <Emoji text=":bug:" />
                </h1>
              </div>
              <Text className="mt-4 max-w-[480px] leading-xs text-body-medium">
                {t("page-upgrades-bug-bounty-subtitle")}
              </Text>
              <Flex className="mt-4 flex-wrap items-center gap-4">
                <ButtonLink href="https://forms.gle/Gnh4gzGh66Yc3V7G8">
                  {t("page-upgrades-bug-bounty-submit")}
                </ButtonLink>
                <ButtonLink variant="outline" href="#in-scope" isSecondary>
                  {t("page-upgrades-bug-bounty-rules")}
                </ButtonLink>
              </Flex>
            </div>
            <VStack className="flex-1 basis-1/2 p-0 lg:pb-32 lg:pl-0 lg:pr-8 lg:pt-24">
              <Leaderboard content={allBounterHunters.slice(0, 5)} />
              <ButtonLink variant="outline" href="#leaderboard">
                {t("page-upgrades-bug-bounty-leaderboard")}
              </ButtonLink>
            </VStack>
          </VStack>
        </Content>
        <Text className="mt-5xl uppercase lg:mt-0">
          {t("page-upgrades-bug-bounty-clients")}
        </Text>
        <ClientRow>
          <Client>
            <Image src={besu} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={erigon} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={geth} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={nethermind} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={reth} alt="" {...iconImageProps()} />
          </Client>
        </ClientRow>
        <ClientRow>
          <Client>
            <Image src={lighthouseLight} alt="" {...iconImageProps(true)} />
          </Client>
          <Client>
            <Image src={lodestar} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={nimbus} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={prysm} alt="" {...iconImageProps()} />
          </Client>
          <Client>
            <Image src={tekuLight} alt="" {...iconImageProps(true)} />
          </Client>
          <Client>
            <Image src={grandine} alt="" {...iconImageProps()} />
          </Client>
        </ClientRow>
        <div className="mb-12 mt-8 w-full border-t bg-background-highlight px-0 py-16 shadow-table-item-box">
          <Content>
            <div className="max-w-[100ch] flex-1">
              <H2 id="in-scope">{t("page-upgrades-bug-bounty-validity")}</H2>
              <Text>
                {t.rich("page-upgrades-bug-bounty-validity-desc", {
                  mailto: (chunks) => (
                    <Link href="mailto:bounty@ethereum.org">{chunks}</Link>
                  ),
                  a: (chunks) => (
                    <Link href="https://ethereum.org/security_at_ethereum.org.asc">
                      {chunks}
                    </Link>
                  ),
                })}
              </Text>
            </div>
            <Flex className="-ml-4 -mr-4 mb-12 mt-8 flex-wrap">
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
                    {t("page-upgrades-bug-bounty-client-bugs-desc-2")}
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
            </Flex>
            <div>
              <H2 id="qualifications" className="max-w-[100ch]">
                Vulnerability severity qualifications
              </H2>
              <p className="max-w-[100ch]">
                Severity is assessed based on a discovered vulnerability&apos;s
                ability to do the following:
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
                <div className="space-y-4">
                  <h3>Low severity</h3>
                  <ul>
                    <li>
                      Slash <strong>&gt;0.01%</strong> of validators
                    </li>
                    <li>
                      Trivially cause network splits affecting at least{" "}
                      <strong>0.01%</strong> of the network
                    </li>
                    <li>
                      Be able to bring down more than <strong>0.01%</strong> of
                      the network by sending a single network packet or an
                      onchain transaction
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3>Medium severity</h3>
                  <ul>
                    <li>
                      Slash <strong>&gt;1%</strong> of validators
                    </li>
                    <li>
                      Trivially cause network splits affecting more than{" "}
                      <strong>5%</strong> of the network
                    </li>
                    <li>
                      Be able to bring down more than <strong>5%</strong> of the
                      network by sending a single network packet or an onchain
                      transaction
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3>High severity</h3>
                  <ul>
                    <li>
                      Slash <strong>&gt;33%</strong> of validators
                    </li>
                    <li>
                      Trivially cause network splits affecting more than{" "}
                      <strong>33%</strong> of the network
                    </li>
                    <li>
                      Be able to bring down more than <strong>33%</strong> of
                      the network by sending a single network packet or an
                      onchain transaction
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3>Critical severity</h3>
                  <ul>
                    <li>
                      Slash <strong>&gt;50%</strong> of validators
                    </li>
                    <li>
                      Exploit an EIP/specification or client bug to easily{" "}
                      <strong>create an infinite amount of ETH</strong> which is
                      finalized by the network
                    </li>
                    <li>
                      <strong>Steal ETH</strong> from all EOAs
                    </li>
                    <li>
                      <strong>Burn ETH</strong> from all EOAs
                    </li>
                    <li>
                      <strong>Take down the entire network</strong> by sending a
                      single malicious onchain transaction that ends up crashing
                      all clients
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-[100ch] flex-1">
              <H2 id="out-of-scope">
                {t("page-upgrades-bug-bounty-not-included")}
              </H2>
              <p>
                {t.rich("page-upgrades-bug-bounty-not-included-desc", {
                  a: (chunks) => <Link href="#in-scope">{chunks}</Link>,
                })}
              </p>
              <ul className="mt-8 [&>li]:mb-2">
                <li>
                  Infrastructure bugs—such as webpages, dns, email, etc.
                  <sup>*</sup>
                </li>
                <li>
                  ERC-20 contract bugs<sup>*</sup>
                </li>
                <li>
                  Ethereum Naming Service (ENS) bugs (maintained by the ENS
                  foundation)
                </li>
                <li>
                  Vulnerabilities requiring the user to have publicly exposed an
                  API, such as JSON-RPC or the Beacon API
                </li>
                <li>Typographical errors</li>
                <li>Tests</li>
                <li>
                  High-effort (sustained, CPU or bandwidth intensive, and/or
                  requires more than 1 packet or onchain transaction)
                  single-peer DoS attacks
                </li>
                <li>
                  Any publicly known issues (includes forum posts, PRs, github
                  issues, commits, blog posts, public discord messages, etc.)
                </li>
              </ul>
              <Text>
                <sup>*</sup>These are typically not included, however, we can
                help reach out to affected parties, such as authors or exchanges
                in such cases
              </Text>
            </div>
          </Content>
        </div>
        <Content>
          <Row>
            <div className="max-w-[100ch] flex-1">
              <H2 id="submit-bug">{t("page-upgrades-bug-bounty-submit")}</H2>
              <Text>
                {t.rich("page-upgrades-bug-bounty-submit-desc", {
                  strong: Strong,
                })}{" "}
                <InlineLink href="https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology">
                  {t("page-upgrades-bug-bounty-owasp")}
                </InlineLink>
              </Text>
              <Text>{t("page-upgrades-bug-bounty-points")}</Text>
              <Text>
                <span className="font-bold">
                  {t("page-upgrades-bug-bounty-quality")}
                </span>
                {t("page-upgrades-bug-bounty-quality-desc")}
              </Text>
              <Text>
                <span className="font-bold">
                  {t("page-upgrades-bug-bounty-quality-repro")}
                </span>
                {t("page-upgrades-bug-bounty-quality-repro-desc")}
              </Text>
              <Text>
                {t.rich("page-upgrades-bug-bounty-quality-fix", {
                  strong: Strong,
                })}
              </Text>
            </div>
          </Row>
        </Content>
        <BugBountyCards />
        <Content>
          <div className="max-w-[100ch]">
            <H2 id="rules">{t("page-upgrades-bug-bounty-hunting")}</H2>
            <Text className="italic">
              {t("page-upgrades-bug-bounty-hunting-desc")}
            </Text>
            <UnorderedList>
              <ListItem>{t("page-upgrades-bug-bounty-hunting-li-1")}</ListItem>
              <ListItem>{t("page-upgrades-bug-bounty-hunting-li-2")}</ListItem>
              <ListItem>{t("page-upgrades-bug-bounty-hunting-li-3")}</ListItem>
              <ListItem id="leaderboard">
                {t("page-upgrades-bug-bounty-hunting-li-4")}
              </ListItem>
            </UnorderedList>
          </div>
        </Content>
        <div className="mt-8 w-full border-t bg-banner-grid-gradient px-0 py-16 shadow-table-item-box">
          <FullLeaderboardContainer>
            <H2 id="el-leaderboard" className="text-center">
              {t("page-upgrades-bug-bounty-hunting-execution-leaderboard")}
            </H2>
            <Text>
              {t(
                "page-upgrades-bug-bounty-hunting-execution-leaderboard-subtitle"
              )}
            </Text>
            <Leaderboard content={executionBountyHunters} />
          </FullLeaderboardContainer>
          <FullLeaderboardContainer>
            <H2 id="cl-leaderboard" className="text-center">
              {t("page-upgrades-bug-bounty-hunting-leaderboard")}
            </H2>
            <Text>
              {t("page-upgrades-bug-bounty-hunting-leaderboard-subtitle")}
            </Text>
            <Leaderboard content={consensusBountyHunters} />
          </FullLeaderboardContainer>
        </div>
        <Divider />
        <Content>
          <Center>
            <H2 id="faq" className="text-center">
              {t("page-upgrades-question-title")}
            </H2>
          </Center>
          <Flex className="mt-16 flex-col lg:flex-row">
            <div className="w-full">
              <ExpandableCard
                title={t("bug-bounty-faq-q1-title")}
                contentPreview={t("bug-bounty-faq-q1-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q1-content-1")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-2")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-3")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-4")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-5")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-6")}</Text>
                <Text>{t("bug-bounty-faq-q1-content-7")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q2-title")}
                contentPreview={t("bug-bounty-faq-q2-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q2-content-1")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q3-title")}
                contentPreview={t("bug-bounty-faq-q3-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q3-content-1")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q4-title")}
                contentPreview={t("bug-bounty-faq-q4-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q4-content-1")}</Text>
              </ExpandableCard>
            </div>
            <Flex className="ms-0 w-full flex-col lg:ms-8">
              <ExpandableCard
                title={t("bug-bounty-faq-q5-title")}
                contentPreview={t("bug-bounty-faq-q5-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q5-content-1")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q6-title")}
                contentPreview={t("bug-bounty-faq-q6-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q6-content-1")}</Text>
                <Text>{t("bug-bounty-faq-q6-content-2")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q7-title")}
                contentPreview={t("bug-bounty-faq-q7-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q7-content-1")}</Text>
              </ExpandableCard>
              <ExpandableCard
                title={t("bug-bounty-faq-q8-title")}
                contentPreview={t("bug-bounty-faq-q8-contentPreview")}
              >
                <Text>{t("bug-bounty-faq-q8-content-1")}</Text>
                <InlineLink href="https://ethereum.org/security_at_ethereum.org.asc">
                  {t("bug-bounty-faq-q8-PGP-key")}
                </InlineLink>
              </ExpandableCard>
            </Flex>
          </Flex>
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
        </Content>
        <Divider />
        <Flex className="mx-32 my-12 w-4/5 items-center justify-between rounded-sm border border-border p-6">
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
        </Flex>
        <FeedbackCard />
      </MainArticle>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-bug-bounty" })

  return await getMetadata({
    locale,
    slug: ["bug-bounty"],
    title: t("page-upgrades-bug-bounty-meta-title"),
    description: t("page-upgrades-bug-bounty-meta-description"),
  })
}
