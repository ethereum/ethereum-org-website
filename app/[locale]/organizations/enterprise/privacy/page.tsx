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

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import ChecklistPanel from "../../_components/checklist-panel"
import ComparisonTable from "../../_components/comparison-table"
import ExpertContacts from "../../_components/expert-contacts"
import FurtherReading from "../../_components/further-reading"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import SectionIntro from "../../_components/section-intro"

import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/organizations/hero-privacy.png"
import scalesImg from "@/public/images/organizations/privacy-scales.png"

// TODO(data): no live source yet -- figures hard-coded from the design
const STAT_TEAMS_BUILDING = "750+"
// TODO(data): no live source yet -- figures hard-coded from the design
const STAT_YEARS_RESEARCH = "7+"
// TODO(data): no live source yet -- figures hard-coded from the design
const STAT_VALUE_SECURED = "$400B+"

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
      { name: "zkSync Prividium", href: "https://www.zksync.io/prividium" },
    ],
  },
  {
    key: "programmable",
    examples: [
      { name: "Aztec", href: "https://aztec.network/" },
      { name: "EY Nightfall", href: EY_URL },
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
      { name: "EY Starlight", href: EY_URL },
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

/** Comparison cell: verdict icon stacked above the copy, with a sr-only verdict */
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
    <span className="flex flex-col gap-2">
      <Icon
        className={tone === "warning" ? "text-warning" : "text-success"}
        aria-hidden
      />
      <span className="sr-only">{verdict}</span>
      <span>{children}</span>
    </span>
  )
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-privacy")

  const { contributors } = await getAppPageContributorInfo(
    "organizations/enterprise/privacy",
    locale as Lang
  )

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
      value: STAT_VALUE_SECURED,
      label: t("page-organizations-enterprise-privacy-stat-value-secured"),
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
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-3x">
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

          {/* Tinted band: the solutions grid and the trust-vs-cryptographic
              comparison are one argument in the design, so a single panel
              carries both. Same wrapper rationale as the stablecoins page
              bands -- the wrapper owns the background and radius, each
              <Section> inside owns its max-width and padding (the
              `*:[section]:py-space-3x` rule on MainArticle only reaches its
              direct children). */}
          <div className="mt-space-3x w-full rounded-4xl bg-tint-primary">
            <Section
              id="solutions"
              className="mx-auto w-full max-w-7xl px-page py-space-3x"
            >
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
                  <Card key={key} variant="nested" hoverLift>
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
              className="mx-auto w-full max-w-7xl px-page py-space-3x"
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
                  <p className="text-lg text-body-medium">
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
              <p className="text-lg text-body-medium">
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

          <FurtherReading />

          <ExpertContacts experts={["ethsystems"]} />
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
    image: "/images/organizations/hero-privacy.png",
  })
}

export default Page
