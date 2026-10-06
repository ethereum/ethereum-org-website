import { pick } from "lodash"
import { Banknote, Coins, Move, ScanEye } from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import StablecoinsTable from "@/components/StablecoinsTable"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD } from "@/lib/utils/numbers"
import { buildStablecoinRows } from "@/lib/utils/stablecoins"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import ComparisonTable from "../../_components/comparison-table"
import ExpertContacts from "../../_components/expert-contacts"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import OrganizationPathways from "../../_components/organization-pathways"
import SectionIntro from "../../_components/section-intro"
import { L2BEAT_SOURCE, sumL2Breakdown } from "../../_lib/l2beat"

import PageJsonLD from "./page-jsonld"

import {
  getEthereumStablecoinsMcapData,
  getL2beatData,
  getStablecoinsData,
} from "@/lib/data"
import heroImg from "@/public/images/organizations/isometric-tokenization.png"

const DEFILLAMA = {
  sourceName: "DefiLlama",
  sourceUrl: "https://defillama.com/",
}

// TODO(data): unsourced -- see PR discussion for candidate sources
const VALUE_SECURED_USD = 336_000_000_000

const STABLECOINS_SHOWN = 12
const STABLECOINS_PAGE_SIZE = 6

// Netlify Blobs throws without credentials; degrade per-getter instead of a 500
const nullOnError = <T,>(promise: Promise<T>): Promise<T | null> =>
  promise.catch((error) => {
    console.error(error)
    return null
  })

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-tokenization")

  // `StablecoinsTable` needs `page-stablecoins` client-side (see `translations.ts`)
  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage("/organizations/enterprise/tokenization")
  )

  const [stablecoinsMcap, stablecoinsData, l2beatData, { contributors }] =
    await Promise.all([
      nullOnError(getEthereumStablecoinsMcapData()),
      nullOnError(getStablecoinsData()),
      nullOnError(getL2beatData()),
      getAppPageContributorInfo(
        "organizations/enterprise/tokenization",
        locale as Lang
      ),
    ])

  const l2Stablecoins = sumL2Breakdown(l2beatData, "stablecoin")

  const stats: HeroStat[] = [
    {
      value:
        stablecoinsMcap && "value" in stablecoinsMcap
          ? formatLargeUSD(stablecoinsMcap.value, locale)
          : undefined,
      label: t(
        "page-organizations-enterprise-tokenization-stat-stablecoins-l1"
      ),
      lastUpdated:
        stablecoinsMcap && "timestamp" in stablecoinsMcap
          ? stablecoinsMcap.timestamp
          : undefined,
      ...DEFILLAMA,
    },
    {
      value: l2Stablecoins && formatLargeUSD(l2Stablecoins, locale),
      label: t(
        "page-organizations-enterprise-tokenization-stat-stablecoins-l2"
      ),
      ...L2BEAT_SOURCE,
    },
    {
      value: formatLargeUSD(VALUE_SECURED_USD, locale),
      label: t("page-organizations-enterprise-tokenization-stat-value-secured"),
    },
  ]

  const infrastructureItems = [
    { key: "liquidity", Icon: Coins },
    { key: "settlement", Icon: Banknote },
    { key: "compliance", Icon: ScanEye },
    { key: "capital", Icon: Move },
  ] as const

  const compareColumns = ["ethereum", "l1", "private-dlt", "traditional"]
  const compareRows = [
    "finality",
    "tenure",
    "security",
    "dev-base",
    "liquidity",
    "auditability",
    "neutrality",
    "geo-risk",
    "composability",
  ].map((row) => ({
    label: t(`page-organizations-enterprise-tokenization-compare-row-${row}`),
    cells: compareColumns.map((col) =>
      t(`page-organizations-enterprise-tokenization-compare-row-${row}-${col}`)
    ),
  }))

  const coinDetails = stablecoinsData
    ? buildStablecoinRows(stablecoinsData, locale).slice(0, STABLECOINS_SHOWN)
    : []

  const marketsHasError = !stablecoinsData

  // TODO(content): body copy for the "treasuries" and "credit" cards
  const assetCards = [
    { key: "treasuries", hasDescription: false, hasExamples: true },
    { key: "credit", hasDescription: false, hasExamples: true },
    {
      key: "infrastructure",
      hasDescription: true,
      hasExamples: false,
      href: "/organizations/enterprise/privacy/",
    },
    { key: "consumer", hasDescription: true, hasExamples: false },
  ] as const

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise/tokenization" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-tokenization-hero-title")}
        description={
          <>
            <p>
              {t("page-organizations-enterprise-tokenization-hero-description")}
            </p>
            <div className="mt-space-3x">
              <HeroStats stats={stats} />
            </div>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow *:[section]:py-space-3x">
          <Section id="infrastructure">
            <SectionIntro
              title={t(
                "page-organizations-enterprise-tokenization-infrastructure-title"
              )}
              description={t(
                "page-organizations-enterprise-tokenization-infrastructure-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {infrastructureItems.map(({ key, Icon }) => (
                <Card key={key}>
                  <CardHeader>
                    <CardIconContainer>
                      <Icon />
                    </CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-tokenization-infrastructure-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-tokenization-infrastructure-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section id="compare">
            <h2>
              {t("page-organizations-enterprise-tokenization-compare-title")}
            </h2>
            <p className="text-lg text-pretty text-body-medium">
              {t(
                "page-organizations-enterprise-tokenization-compare-description"
              )}
            </p>
            <ComparisonTable
              caption={t(
                "page-organizations-enterprise-tokenization-compare-title"
              )}
              rowHeader={t(
                "page-organizations-enterprise-tokenization-compare-col-functions"
              )}
              columns={compareColumns.map((col) =>
                t(
                  `page-organizations-enterprise-tokenization-compare-col-${col}`
                )
              )}
              rows={compareRows}
            />
          </Section>

          <Section
            id="stablecoins"
            className="rounded-4xl bg-tint-primary px-page py-space-3x gradient-reverse"
          >
            <SectionIntro
              title={t(
                "page-organizations-enterprise-tokenization-stablecoins-title"
              )}
              description={t(
                "page-organizations-enterprise-tokenization-stablecoins-description"
              )}
            />
            <I18nProvider locale={locale} messages={messages}>
              <StablecoinsTable
                content={coinDetails}
                hasError={marketsHasError}
                pageSize={STABLECOINS_PAGE_SIZE}
              />
            </I18nProvider>
          </Section>

          <Section
            id="tokenized-assets"
            data-flow="skip"
            className="grid gap-space-2x lg:grid-cols-3"
          >
            <div className="flow lg:sticky lg:top-28 lg:self-start">
              <h2>
                {t("page-organizations-enterprise-tokenization-assets-title")}
              </h2>
              <p className="text-lg text-pretty text-body-medium">
                {t(
                  "page-organizations-enterprise-tokenization-assets-description"
                )}
              </p>
            </div>
            <Grid balanced={2} className="lg:col-span-2">
              {assetCards.map((card) => (
                <Card
                  key={card.key}
                  href={"href" in card ? card.href : undefined}
                >
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-tokenization-assets-${card.key}-title`
                      )}
                    </CardTitle>
                    {card.hasDescription && (
                      <CardParagraph>
                        {t(
                          `page-organizations-enterprise-tokenization-assets-${card.key}-description`
                        )}
                      </CardParagraph>
                    )}
                    {card.hasExamples && (
                      <div>
                        <p className="text-body-medium">
                          {t(
                            "page-organizations-enterprise-tokenization-assets-example-label"
                          )}
                        </p>
                        <p className="text-body">
                          {t(
                            `page-organizations-enterprise-tokenization-assets-${card.key}-examples`
                          )}
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {"href" in card && (
                    <CardFooter buttons="inherit">
                      <CardLinkFake withForwardArrow>
                        {t(
                          `page-organizations-enterprise-tokenization-assets-${card.key}-cta`
                        )}
                      </CardLinkFake>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </Grid>
          </Section>
          <ExpertContacts />

          <OrganizationPathways current="tokenization" />
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

  const t = await getTranslations("page-organizations-enterprise-tokenization")

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise", "tokenization"],
    title: t("page-organizations-enterprise-tokenization-meta-title"),
    description: t(
      "page-organizations-enterprise-tokenization-meta-description"
    ),
    image: "/images/organizations/isometric-tokenization.png",
  })
}

export default Page
