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
import { formatLargeUSD, numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import StablecoinsTable, {
  type TableRow as StablecoinsTableRow,
} from "../../../stablecoins/_components/stablecoins-table"
import { stablecoins } from "../../../stablecoins/data"
import ComparisonTable from "../../_components/comparison-table"
import ExpertContacts from "../../_components/expert-contacts"
import FurtherReading from "../../_components/further-reading"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import SectionIntro from "../../_components/section-intro"

import PageJsonLD from "./page-jsonld"

import { getEthereumStablecoinsMcapData, getStablecoinsData } from "@/lib/data"
import heroImg from "@/public/images/organizations/isometric-tokenization.png"

const DEFILLAMA = {
  sourceName: "DefiLlama",
  sourceUrl: "https://defillama.com/",
}

// TODO(data): these two figures come from the Figma frame and carry no source
// or as-of date, so they render without BigNumber's source tooltip while the
// stat beside them is live. No data-layer getter matches either label: the
// L2BEAT getter is L2-only total value secured (~$40B, already shipped as
// "L2 TVL" on the enterprise-l2s page) and `getTotalValueLockedData` is
// DefiLlama Ethereum DeFi TVL (~$140B, already shipped as "DeFi TVL" on the
// enterprise hub) -- binding either one here would put an
// order-of-magnitude-different number under these words.
// MUST be sourced or dropped before this page ships. See the PR description.
const STABLECOINS_L2_USD = 12_100_000_000
const VALUE_SECURED_USD = 336_000_000_000

/** Same floor /stablecoins/ applies, so both pages list the same coins. */
const MIN_MARKET_CAP_USD = 500_000

/**
 * The data-layer getters read Netlify Blobs, whose client *throws* when its
 * credentials are missing rather than returning null. Unguarded, that failure
 * takes the whole page down with a 500, so each getter degrades to `null` here
 * and the render falls back -- the `hasError` degradation /stablecoins/ uses,
 * expressed per-getter so one failure doesn't blank the others.
 */
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

  // `StablecoinsTable` is the client component from /stablecoins/ and binds the
  // `page-stablecoins` namespace itself, so its messages have to reach the
  // client -- the route's extra namespaces are registered in `translations.ts`.
  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage("/organizations/enterprise/tokenization")
  )

  const [stablecoinsMcap, stablecoinsData, { contributors }] =
    await Promise.all([
      nullOnError(getEthereumStablecoinsMcapData()),
      nullOnError(getStablecoinsData()),
      getAppPageContributorInfo(
        "organizations/enterprise/tokenization",
        locale as Lang
      ),
    ])

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
      value: formatLargeUSD(STABLECOINS_L2_USD, locale),
      label: t(
        "page-organizations-enterprise-tokenization-stat-stablecoins-l2"
      ),
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

  const marketCapFormatter = numberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  // Built exactly as /stablecoins/ builds it, so both tables carry the same
  // rows and fields (CoinGecko logo, ticker, peg, project URL, collateral
  // type). A failed getter degrades to the component's own error row.
  const coinDetails: StablecoinsTableRow[] = stablecoins
    .flatMap(({ id, ...rest }) => {
      const coinMarketData = stablecoinsData?.find((coin) => coin.id === id)
      return coinMarketData ? [{ ...coinMarketData, ...rest }] : []
    })
    .filter((coin) => coin.market_cap >= MIN_MARKET_CAP_USD)
    .sort((a, b) => b.market_cap - a.market_cap)
    .map(({ market_cap, ...rest }) => ({
      ...rest,
      marketCap: marketCapFormatter.format(market_cap),
    }))

  const marketsHasError = !stablecoinsData

  // TODO(content): the "treasuries" and "credit" cards ship with no body copy.
  // The Figma grid is a draft ("Suggestion (Paul)") whose bodies were pasted
  // from the L2s page and contradicted their own titles -- one described two
  // firms building L2s under "Tokenized Treasuries & Cash-Equivalents", the
  // other payments pilots under "Private Credit & Structured Credit". Both were
  // dropped rather than rewritten, since replacement prose would invent claims
  // about named institutions. Each card stands on its title plus its on-topic
  // Example list until a content owner writes real bodies.
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
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-3x">
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
            <p className="text-lg text-body-medium">
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
            {/* The shared table is a client component and brings its own
                column headers, collateral-type labels, error row and
                "Show more" paging, so the section adds none of those. */}
            <I18nProvider locale={locale} messages={messages}>
              <StablecoinsTable
                content={coinDetails}
                hasError={marketsHasError}
              />
            </I18nProvider>
          </Section>

          <Section
            id="tokenized-assets"
            data-flow="skip"
            className="grid gap-space-2x lg:grid-cols-3"
          >
            <div className="flow">
              <h2>
                {t("page-organizations-enterprise-tokenization-assets-title")}
              </h2>
              <p className="text-lg text-body-medium">
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

          <FurtherReading current="tokenization" />

          <ExpertContacts />
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
