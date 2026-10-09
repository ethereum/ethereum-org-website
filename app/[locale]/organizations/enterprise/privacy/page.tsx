import { Fragment, type ReactNode } from "react"
import {
  Blocks,
  CircleAlert,
  HatGlasses,
  type LucideIcon,
  ScanEye,
  ThumbsUp,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  CalloutBanner,
  CalloutButtons,
  CalloutContent,
  CalloutDescription,
  CalloutMain,
  CalloutRoot,
  CalloutTitle,
} from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD } from "@/lib/utils/numbers"

import ChecklistPanel from "../../_components/checklist-panel"
import ComparisonTable from "../../_components/comparison-table"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import OrganizationPathways from "../../_components/organization-pathways"
import SectionIntro from "../../_components/section-intro"
import { metricStat, nullOnError, SOURCES } from "../../_lib/metrics"

import PageJsonLD from "./page-jsonld"

import { getTotalValueSecuredData } from "@/lib/data"
import heroImg from "@/public/images/organizations/frosted-glass-pavilion-private-settlement.png"
import EthSystemsLogo from "@/public/images/organizations/logos/ethsystems.svg"
import scalesImg from "@/public/images/organizations/privacy-scales.png"

// TODO(data): no public source found -- cite one or drop
const STAT_TEAMS_BUILDING = "750+"
const STAT_YEARS_RESEARCH = "7+"

const COMPLIANCE_CARDS: { key: string; icon: LucideIcon }[] = [
  { key: "selective-disclosure", icon: ScanEye },
  { key: "credentials", icon: HatGlasses },
  { key: "composable", icon: Blocks },
]

const EY_URL = "https://blockchain.ey.com/technology"

const SOLUTIONS: {
  key: string
  examples: { name: string; href: string }[]
}[] = [
  {
    key: "prividium",
    examples: [
      { name: "ZKsync Prividium", href: "https://www.zksync.io/prividium" },
    ],
  },
  {
    key: "programmable",
    examples: [
      { name: "Aztec", href: "https://aztec.network/" },
      { name: "EY Starlight", href: EY_URL },
      { name: "Miden", href: "https://miden.xyz/" },
    ],
  },
  {
    key: "pools",
    examples: [{ name: "Privacy Pools", href: "https://privacypools.com/" }],
  },
  {
    key: "shielded",
    examples: [
      { name: "Railgun", href: "https://railgun.org/" },
      { name: "EY Nightfall", href: EY_URL },
    ],
  },
]

const COMPARE_ROWS = [
  "guarantee",
  "mechanism",
  "incentives",
  "vendor",
  "regulatory",
] as const

const WHY_ITEMS = [
  "resilience",
  "censorship",
  "counterparty",
  "interoperability",
] as const

const PROBLEM_CARDS = [
  "vendor",
  "interoperability",
  "talent",
  "fragility",
  "instability",
  "auditability",
  "offchain",
  "abstractions",
] as const

/** Comparison cell: verdict icon inline before the copy, with a sr-only verdict */
const VerdictCell = ({
  tone,
  verdict,
  children,
}: {
  tone: "warning" | "success"
  verdict: ReactNode
  children: ReactNode
}) => {
  const Icon = tone === "warning" ? CircleAlert : ThumbsUp
  return (
    <span className="flex items-start gap-2">
      <Icon
        className={cn(
          "size-5 shrink-0",
          tone === "warning" ? "text-warning" : "text-success"
        )}
        aria-hidden
      />
      <span>
        <span className="sr-only">{verdict} </span>
        {children}
      </span>
    </span>
  )
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-privacy")

  const [valueSecured, { contributors }] = await Promise.all([
    nullOnError(getTotalValueSecuredData()),
    getAppPageContributorInfo(
      "organizations/enterprise/privacy",
      locale as Lang
    ),
  ])

  const stats: HeroStat[] = [
    {
      value: STAT_TEAMS_BUILDING,
      label: t("page-organizations-enterprise-privacy-stat-teams"),
    },
    {
      value: STAT_YEARS_RESEARCH,
      label: t("page-organizations-enterprise-privacy-stat-years"),
    },
    {
      ...metricStat(valueSecured, (value) => formatLargeUSD(value, locale)),
      label: t("page-organizations-enterprise-privacy-stat-value-secured"),
      ...SOURCES.ultrasound,
    },
  ]

  const compareRows = COMPARE_ROWS.map((row) => ({
    label: t(`page-organizations-enterprise-privacy-compare-row-${row}`),
    cells: [
      <VerdictCell
        key="trust"
        tone="warning"
        verdict={t(
          "page-organizations-enterprise-privacy-compare-icon-warning"
        )}
      >
        {t(`page-organizations-enterprise-privacy-compare-row-${row}-trust`)}
      </VerdictCell>,
      <VerdictCell
        key="cryptographic"
        tone="success"
        verdict={t(
          "page-organizations-enterprise-privacy-compare-icon-positive"
        )}
      >
        {t(
          `page-organizations-enterprise-privacy-compare-row-${row}-cryptographic`
        )}
      </VerdictCell>,
    ],
  }))

  const whyItems = WHY_ITEMS.map((key) => ({
    title: t(`page-organizations-enterprise-privacy-why-${key}-title`),
    description: t(
      `page-organizations-enterprise-privacy-why-${key}-description`
    ),
  }))

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise/privacy" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-privacy-hero-title")}
        description={
          <>
            <p>
              {t("page-organizations-enterprise-privacy-hero-description-1")}
            </p>
            <p>
              {t("page-organizations-enterprise-privacy-hero-description-2")}
            </p>
            <div className="mt-space-3x">
              <HeroStats stats={stats} />
            </div>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow *:[section]:py-space-3x">
          <Section id="compliance">
            <SectionIntro
              title={t(
                "page-organizations-enterprise-privacy-compliance-title"
              )}
              description={t(
                "page-organizations-enterprise-privacy-compliance-description"
              )}
            />
            <Grid columns={3} data-flow="cta">
              {COMPLIANCE_CARDS.map(({ key, icon: Icon }) => (
                <Card key={key}>
                  <CardHeader>
                    <CardIconContainer>
                      <Icon />
                    </CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-privacy-compliance-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-privacy-compliance-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* `*:[section]` rules only reach direct children, so inner Sections own their padding */}
          <div className="mt-space-3x w-full rounded-4xl bg-tint-primary">
            <Section id="solutions" className="px-page py-space-3x">
              <SectionIntro
                title={t(
                  "page-organizations-enterprise-privacy-solutions-title"
                )}
                description={t(
                  "page-organizations-enterprise-privacy-solutions-description"
                )}
              />
              <Grid balanced={4} data-flow="cta">
                {SOLUTIONS.map(({ key, examples }) => (
                  <Card key={key} variant="nested">
                    <CardContent>
                      <CardTitle>
                        {t(
                          `page-organizations-enterprise-privacy-solutions-${key}-title`
                        )}
                      </CardTitle>
                      <CardParagraph>
                        {t(
                          `page-organizations-enterprise-privacy-solutions-${key}-description`
                        )}
                      </CardParagraph>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm">
                        <span className="block text-body-medium">
                          {t(
                            "page-organizations-enterprise-privacy-solutions-examples-label"
                          )}
                        </span>
                        {examples.map(({ name, href }, idx) => (
                          <Fragment key={name}>
                            {idx > 0 && ", "}
                            <InlineLink href={href}>{name}</InlineLink>
                          </Fragment>
                        ))}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </Grid>
            </Section>

            <Section
              id="trust-vs-cryptographic"
              className="px-page py-space-3x"
            >
              <div className="flex gap-space-2x max-lg:flex-col lg:items-center">
                <div className="shrink-0 max-lg:max-w-64 lg:w-64">
                  <Image
                    src={scalesImg}
                    alt=""
                    className="w-full"
                    sizes="256px"
                  />
                </div>
                <div className="flow">
                  <h2>
                    {t("page-organizations-enterprise-privacy-compare-title")}
                  </h2>
                  <p className="text-lg text-pretty text-body-medium">
                    {t(
                      "page-organizations-enterprise-privacy-compare-description"
                    )}
                  </p>
                </div>
              </div>
              <ComparisonTable
                caption={t(
                  "page-organizations-enterprise-privacy-compare-title"
                )}
                columns={[
                  t("page-organizations-enterprise-privacy-compare-col-trust"),
                  t(
                    "page-organizations-enterprise-privacy-compare-col-cryptographic"
                  ),
                ]}
                rows={compareRows}
                surface="tint"
              />
            </Section>
          </div>

          <ChecklistPanel
            id="why-it-matters"
            tint="success"
            title={t("page-organizations-enterprise-privacy-why-title")}
            description={t(
              "page-organizations-enterprise-privacy-why-description"
            )}
            items={whyItems}
          />

          <Section
            id="private-chain-problems"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col"
          >
            <div className="flow lg:sticky lg:top-28 lg:w-1/3 lg:shrink-0 lg:self-start">
              <h2>
                {t("page-organizations-enterprise-privacy-problems-title")}
              </h2>
              <p className="text-lg text-pretty text-body-medium">
                {t(
                  "page-organizations-enterprise-privacy-problems-description"
                )}
              </p>
            </div>
            <Grid balanced={2} className="lg:flex-1">
              {PROBLEM_CARDS.map((key) => (
                <Card key={key}>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-privacy-problems-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-privacy-problems-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>
          <Section id="experts">
            <SectionIntro
              title={t("page-organizations-enterprise-privacy-experts-title")}
              description={t(
                "page-organizations-enterprise-privacy-experts-description"
              )}
            />
            <CalloutRoot data-flow="cta">
              <CalloutBanner>
                <EthSystemsLogo
                  aria-hidden="true"
                  className="h-48 w-auto text-body @3xl/callout:h-56"
                />
              </CalloutBanner>
              <CalloutMain>
                <CalloutContent>
                  <CalloutTitle as="h3">EthSystems</CalloutTitle>
                  <CalloutDescription>
                    {t(
                      "page-organizations-enterprise-privacy-experts-ethsystems-description"
                    )}
                  </CalloutDescription>
                </CalloutContent>
                <CalloutButtons>
                  <ButtonLink href="https://ethsystems.org/">
                    {t("page-organizations-enterprise-privacy-experts-cta")}
                  </ButtonLink>
                </CalloutButtons>
              </CalloutMain>
            </CalloutRoot>
          </Section>

          <OrganizationPathways current="privacy" />
        </MainArticle>

        <ContentFeedback />
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-privacy")

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise", "privacy"],
    title: t("page-organizations-enterprise-privacy-meta-title"),
    description: t("page-organizations-enterprise-privacy-meta-description"),
    image:
      "/images/organizations/frosted-glass-pavilion-private-settlement.png",
  })
}

export default Page
