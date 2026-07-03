import { getTranslations } from "next-intl/server"

import type { Lang, Params } from "@/lib/types"

import BugBountyCards from "@/components/BugBountyCards"
import CardList, { type CardProps } from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FileContributors from "@/components/FileContributors"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
// Uncomment `Alert` for Bug Bounty Banner:
// import { Alert } from "@/components/ui/alert"
import { Card, CardContent, CardParagraph } from "@/components/ui/card"
import { Flex, VStack } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import consensusData from "@/data/consensus-bounty-hunters.json"
import executionData from "@/data/execution-bounty-hunters.json"

import Leaderboard from "./_components/bug-bounty-leaderboard"
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

const StrongGreaterThan = (chunks: React.ReactNode) => (
  <strong>&gt;{chunks}</strong>
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

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-bug-bounty")
  const tCommon = await getTranslations("common")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("bug-bounty", locale as Lang)

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
      link: "https://nimbus.team/",
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
      link: "https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-2"),
      link: "https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/fork-choice.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-3"),
      link: "https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/deposit-contract.md",
    },
    {
      title: t("page-upgrades-bug-bounty-title-4"),
      link: "https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md",
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
      {/* Uncomment for Bug Bounty Banner: */}
      {/* <Alert variant="banner">
        Fusaka vulnerabilities are now part of the Bug Bounty Program!
      </Alert> */}

      <PageHero
        breadcrumbs={{ slug: "bug-bounty" }}
        eyebrow={
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-success" />
            <p className="text-sm uppercase">
              {t("page-upgrades-bug-bounty-title")}
            </p>
          </div>
        }
        heroComponent={
          <VStack className="mx-auto w-full max-w-2xl">
            <Leaderboard content={allBounterHunters.slice(0, 5)} />
            <ButtonLink variant="outline" href="#leaderboard">
              {t("page-upgrades-bug-bounty-leaderboard")}
            </ButtonLink>
          </VStack>
        }
        title={
          <>
            {t("page-upgrades-bug-bounty-slogan")}&nbsp;
            <Emoji text=":bug:" />
          </>
        }
        description={t("page-upgrades-bug-bounty-subtitle")}
        buttons={[
          <ButtonLink key="submit" href="https://bbp-form.ethereum.org/">
            {t("page-upgrades-bug-bounty-submit")}
          </ButtonLink>,
          <ButtonLink
            key="rules"
            variant="outline"
            href="#in-scope"
            isSecondary
          >
            {t("page-upgrades-bug-bounty-rules")}
          </ButtonLink>,
        ]}
        variant="no-divider"
        className="**:[h1]:bg-linear-to-r **:[h1]:from-body **:[h1]:via-primary **:[h1]:to-accent-b **:[h1]:bg-clip-text **:[h1]:pb-1 **:[h1]:text-transparent"
      />

      <MainArticle className="flow *:px-page! **:[:is(p,ul,ol)]:max-w-3xl">
        <Section id="clients">
          <p className="mx-auto text-center uppercase">
            {t("page-upgrades-bug-bounty-clients")}
          </p>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-x-16 gap-y-space-3x p-page *:mx-auto *:flex-1 *:basis-15 md:gap-x-32">
            <div>
              <Image
                src={besu}
                alt={tCommon("item-logo", { item: "Besu" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={erigon}
                alt={tCommon("item-logo", { item: "Erigon" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={geth}
                alt={tCommon("item-logo", { item: "Geth" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={nethermind}
                alt={tCommon("item-logo", { item: "Nethermind" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={reth}
                alt={tCommon("item-logo", { item: "Reth" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={lighthouseLight}
                alt={tCommon("item-logo", { item: "Lighthouse" })}
                {...iconImageProps(true)}
              />
            </div>
            <div>
              <Image
                src={lodestar}
                alt={tCommon("item-logo", { item: "Lodestar" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={nimbus}
                alt={tCommon("item-logo", { item: "Nimbus" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={prysm}
                alt={tCommon("item-logo", { item: "Prysm" })}
                {...iconImageProps()}
              />
            </div>
            <div>
              <Image
                src={tekuLight}
                alt={tCommon("item-logo", { item: "Teku" })}
                {...iconImageProps(true)}
              />
            </div>
            <div>
              <Image
                src={grandine}
                alt={tCommon("item-logo", { item: "Grandine" })}
                {...iconImageProps()}
              />
            </div>
          </div>
        </Section>

        <div className="flow space-y-space-3x bg-background-highlight pt-space-3x pb-space-2x">
          <Section id="in-scope">
            <h2>{t("page-upgrades-bug-bounty-validity")}</h2>
            <p>
              {t.rich("page-upgrades-bug-bounty-validity-desc", {
                a: (chunks) => (
                  <InlineLink href="https://bbp-form.ethereum.org/">
                    {chunks}
                  </InlineLink>
                ),
              })}
            </p>

            <Flex className="flex-wrap gap-8">
              <MarkdownCard
                emoji=":ledger:"
                title={t("page-upgrades-bug-bounty-ledger-title")}
                description={t("page-upgrades-bug-bounty-ledger-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <div>
                  <InlineLink href="https://github.com/ethereum/consensus-specs">
                    {t("page-upgrades-bug-bounty-specs")}
                  </InlineLink>
                  <br />
                  <InlineLink href="https://github.com/ethereum/execution-specs">
                    {t("page-upgrades-bug-bounty-execution-specs")}
                  </InlineLink>
                </div>

                <CardParagraph>
                  {t("page-upgrades-bug-bounty-annotations")}
                </CardParagraph>
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

                <h4>{t("page-upgrades-bug-bounty-types")}</h4>
                <UnorderedList>
                  <ListItem>{t("page-upgrades-bug-bounty-type-1")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-2")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-3")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-4")}</ListItem>
                </UnorderedList>

                <h4>{t("page-upgrades-bug-bounty-specs-docs")}</h4>
                <CardList items={specs} />
              </MarkdownCard>

              <MarkdownCard
                emoji=":computer:"
                title={t("page-upgrades-bug-bounty-client-bugs")}
                description={t("page-upgrades-bug-bounty-client-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <CardParagraph>
                  {t("page-upgrades-bug-bounty-client-bugs-desc-2")}
                </CardParagraph>
                <h4>{t("page-upgrades-bug-bounty-types")}</h4>
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

                <h4>{t("page-upgrades-bug-bounty-help-links")}</h4>
                <CardList items={clients} />
              </MarkdownCard>

              <MarkdownCard
                emoji=":book:"
                title={t("page-upgrades-bug-bounty-misc-bugs")}
                description={t("page-upgrades-bug-bounty-misc-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <CardParagraph>
                  {t("page-upgrades-bug-bounty-misc-bugs-desc-2")}
                </CardParagraph>
                <h4>{t("page-upgrades-bug-bounty-help-links")}</h4>
                <CardList items={languages} />
              </MarkdownCard>

              <MarkdownCard
                emoji=":scroll:"
                title={t("page-upgrades-bug-bounty-deposit-bugs")}
                description={t("page-upgrades-bug-bounty-deposit-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <h4>{t("page-upgrades-bug-bounty-help-links")}</h4>
                <div>
                  <InlineLink href="https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/deposit-contract.md">
                    {t("page-upgrades-bug-bounty-deposit-contract-specs")}
                  </InlineLink>
                  <br />
                  <InlineLink href="https://github.com/ethereum/consensus-specs/blob/master/solidity_deposit_contract/deposit_contract.sol">
                    {t("page-upgrades-bug-bounty-deposit-contract-source")}
                  </InlineLink>
                </div>
              </MarkdownCard>

              <MarkdownCard
                emoji=":bug:"
                title={t("page-upgrades-bug-bounty-dependency-bugs")}
                description={t("page-upgrades-bug-bounty-dependency-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <h4>{t("page-upgrades-bug-bounty-help-links")}</h4>
                <div>
                  <InlineLink href="https://github.com/ethereum/c-kzg-4844">
                    C-KZG-4844
                  </InlineLink>
                  <br />
                  <InlineLink href="https://github.com/crate-crypto/go-eth-kzg">
                    Go-ETH-KZG
                  </InlineLink>
                </div>
              </MarkdownCard>
            </Flex>
          </Section>

          <Section id="out-of-scope">
            {/* Out of Scope */}
            <MarkdownCard variant="nested" className="shrink grow basis-full">
              <h2>{t("page-upgrades-bug-bounty-not-included")}</h2>
              <CardParagraph>
                {t.rich("page-upgrades-bug-bounty-not-included-desc", {
                  a: (chunks) => (
                    <InlineLink href="#in-scope">{chunks}</InlineLink>
                  ),
                })}
              </CardParagraph>
              <UnorderedList>
                {(
                  [
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-1",
                      footnote: true,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-2",
                      footnote: true,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-3",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-4",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-10",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-5",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-6",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-7",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-8",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-9",
                      footnote: false,
                    },
                  ] as const
                ).map(({ key, footnote }) => (
                  <ListItem
                    key={key}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-0.5 shrink-0 text-error">✕</span>
                    <span>
                      {t(key)}
                      {footnote && <sup>*</sup>}
                    </span>
                  </ListItem>
                ))}
              </UnorderedList>
              <CardParagraph size="sm">
                <sup>*</sup>
                {t("page-upgrades-bug-bounty-out-of-scope-footnote")}
              </CardParagraph>
            </MarkdownCard>
          </Section>

          <Section id="rules">
            <MarkdownCard variant="nested">
              <h2>{t("page-upgrades-bug-bounty-hunting")}</h2>
              <CardParagraph>
                <em>{t("page-upgrades-bug-bounty-hunting-desc")}</em>
              </CardParagraph>
              <OrderedList className="m-0">
                {(
                  [
                    "page-upgrades-bug-bounty-hunting-li-1",
                    "page-upgrades-bug-bounty-hunting-li-2",
                    "page-upgrades-bug-bounty-hunting-li-3",
                    "page-upgrades-bug-bounty-hunting-li-4",
                  ] as const
                ).map((key, idx) => (
                  <ListItem
                    key={key}
                    className="flex gap-4 rounded-base border bg-background p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{t(key)}</span>
                  </ListItem>
                ))}
              </OrderedList>
            </MarkdownCard>
          </Section>

          <Section id="qualifications">
            <h2 className="max-w-[100ch]">
              {t("page-upgrades-bug-bounty-severity-qualifications-title")}
            </h2>
            <p className="mb-8 max-w-[100ch] text-body-medium">
              {t("page-upgrades-bug-bounty-severity-qualifications-desc")}
            </p>
            <Grid balanced={4}>
              {/* Low */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-green-500/10 px-3 py-1 font-semibold text-green-600 dark:text-green-400">
                    {t("page-upgrades-bug-bounty-severity-low-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* Medium */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-yellow-500/10 px-3 py-1 font-semibold text-yellow-600 dark:text-yellow-400">
                    {t("page-upgrades-bug-bounty-severity-medium-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* High */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-orange-500/10 px-3 py-1 font-semibold text-orange-600 dark:text-orange-400">
                    {t("page-upgrades-bug-bounty-severity-high-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* Critical */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-red-500/10 px-3 py-1 font-semibold text-red-600 dark:text-red-400">
                    {t("page-upgrades-bug-bounty-severity-critical-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-1",
                        {
                          strong: StrongGreaterThan,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-2",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-3",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-4",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-5",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
            </Grid>
          </Section>
        </div>

        <Section id="submit-bug">
          <h2>{t("page-upgrades-bug-bounty-submit")}</h2>
          <BugBountyCards />
        </Section>

        <Flex
          id="leaderboard"
          data-flow="skip"
          className={cn(
            "w-full justify-center *:max-w-3xl *:flex-1 max-lg:flex-col",
            "mt-space-3x gap-x-space-3x gap-y-space-2x pt-space-3x pb-space-2x",
            "border-t bg-linear-primary"
          )}
        >
          <Section id="el-leaderboard">
            <h2>
              {t("page-upgrades-bug-bounty-hunting-execution-leaderboard")}
            </h2>
            <p>
              {t(
                "page-upgrades-bug-bounty-hunting-execution-leaderboard-subtitle"
              )}
            </p>
            <Leaderboard content={executionBountyHunters} />
          </Section>

          <Section id="cl-leaderboard">
            <h2>{t("page-upgrades-bug-bounty-hunting-leaderboard")}</h2>
            <p>{t("page-upgrades-bug-bounty-hunting-leaderboard-subtitle")}</p>
            <Leaderboard content={consensusBountyHunters} />
          </Section>
        </Flex>

        <Section id="faq" className="px-page py-4">
          <h2>{t("page-upgrades-question-title")}</h2>
          <AccordionContainer>
            <ExpandableCard
              title={t("bug-bounty-faq-q2-title")}
              contentPreview={t("bug-bounty-faq-q2-contentPreview")}
            >
              {t.rich("bug-bounty-faq-q2-content-1", {
                a: (chunks) => (
                  <InlineLink href="https://blog.ethereum.org/">
                    {chunks}
                  </InlineLink>
                ),
              })}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q3-title")}
              contentPreview={t("bug-bounty-faq-q3-contentPreview")}
            >
              {t.rich("bug-bounty-faq-q3-content-1", {
                strong: Strong,
              })}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q4-title")}
              contentPreview={t("bug-bounty-faq-q4-contentPreview")}
            >
              {t("bug-bounty-faq-q4-content-1")}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q5-title")}
              contentPreview={t("bug-bounty-faq-q5-contentPreview")}
            >
              {t("bug-bounty-faq-q5-content-1")}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q6-title")}
              contentPreview={t("bug-bounty-faq-q6-contentPreview")}
            >
              <p>{t("bug-bounty-faq-q6-content-1")}</p>
              <p>{t("bug-bounty-faq-q6-content-2")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q7-title")}
              contentPreview={t("bug-bounty-faq-q7-contentPreview")}
            >
              {t("bug-bounty-faq-q7-content-1")}
            </ExpandableCard>
          </AccordionContainer>
        </Section>

        <FileContributors
          className="border-t"
          contributors={contributors}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        />
      </MainArticle>

      <div className="px-page">
        <ContentFeedback />
      </div>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-bug-bounty")

  return await getMetadata({
    locale,
    slug: ["bug-bounty"],
    title: t("page-upgrades-bug-bounty-meta-title"),
    description: t("page-upgrades-bug-bounty-meta-description"),
  })
}
