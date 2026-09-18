import { Banknote, Coins, Move, ScanEye } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams, StablecoinType } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
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

import { stablecoins } from "../../../stablecoins/data"
import ComparisonTable from "../../_components/comparison-table"
import ExpertContacts from "../../_components/expert-contacts"
import FurtherReading from "../../_components/further-reading"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import SectionIntro from "../../_components/section-intro"

import StablecoinsTable, {
  type StablecoinRow,
} from "./_components/stablecoins-table"
import PageJsonLD from "./page-jsonld"

import { getEthereumStablecoinsMcapData, getStablecoinsData } from "@/lib/data"
import heroImg from "@/public/images/organizations/isometric-tokenization.png"

const DEFILLAMA = {
  sourceName: "DefiLlama",
  sourceUrl: "https://defillama.com/",
}

// TODO(data): no live source yet -- figures hard-coded from the design
const STABLECOINS_L2_USD = 12_100_000_000
const VALUE_SECURED_USD = 336_000_000_000

const TOP_STABLECOINS_COUNT = 8

type StablecoinMarketEntry = {
  id: string
  name: string
  market_cap: number
  image?: string
}

// TODO(data): design-time snapshot used only when the CoinGecko getter fails
const FALLBACK_STABLECOINS: StablecoinMarketEntry[] = [
  { id: "tether", name: "Tether", market_cap: 189_540_192_303 },
  { id: "usd-coin", name: "USDC", market_cap: 77_200_113_225 },
  { id: "usds", name: "USDS", market_cap: 11_472_529_149 },
  { id: "dai", name: "Dai", market_cap: 4_366_533_802 },
  { id: "ethena-usde", name: "Ethena USDe", market_cap: 3_909_571_199 },
  { id: "paypal-usd", name: "PayPal USD", market_cap: 3_400_151_014 },
  { id: "ripple-usd", name: "Ripple USD", market_cap: 1_572_768_419 },
  { id: "usdd", name: "USDD", market_cap: 1_477_885_641 },
]

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-tokenization")

  const [stablecoinsMcap, stablecoinsData, { contributors }] =
    await Promise.all([
      getEthereumStablecoinsMcapData(),
      getStablecoinsData(),
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

  const marketData: StablecoinMarketEntry[] =
    stablecoinsData ?? FALLBACK_STABLECOINS
  const topStablecoins: StablecoinRow[] = stablecoins
    .flatMap(({ id, symbol, type }) => {
      const coin = marketData.find((entry) => entry.id === id)
      return coin ? [{ ...coin, symbol, type }] : []
    })
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, TOP_STABLECOINS_COUNT)
    .map(({ name, symbol, type, market_cap, image }) => ({
      name,
      symbol,
      type,
      marketCap: marketCapFormatter.format(market_cap),
      image,
    }))

  const stablecoinTypeLabels: Record<StablecoinType, string> = {
    FIAT: t("page-organizations-enterprise-tokenization-stablecoins-type-fiat"),
    CRYPTO: t(
      "page-organizations-enterprise-tokenization-stablecoins-type-crypto"
    ),
    ASSET: t(
      "page-organizations-enterprise-tokenization-stablecoins-type-asset"
    ),
    ALGORITHMIC: t(
      "page-organizations-enterprise-tokenization-stablecoins-type-algorithmic"
    ),
  }

  const assetCards = [
    { key: "treasuries", hasExamples: true },
    { key: "credit", hasExamples: true },
    {
      key: "infrastructure",
      hasExamples: false,
      href: "/organizations/enterprise/privacy/",
    },
    { key: "consumer", hasExamples: false },
  ] as const

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise/tokenization" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-tokenization-hero-title")}
        description={t(
          "page-organizations-enterprise-tokenization-hero-description"
        )}
      />

      <main className="px-page pb-page">
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-2x">
          <Section id="stats" data-flow="skip">
            <HeroStats stats={stats} />
          </Section>

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
            className="rounded-4xl bg-tint-primary px-page py-space-3x"
          >
            <SectionIntro
              title={t(
                "page-organizations-enterprise-tokenization-stablecoins-title"
              )}
              description={t(
                "page-organizations-enterprise-tokenization-stablecoins-description"
              )}
            />
            <StablecoinsTable
              caption={t(
                "page-organizations-enterprise-tokenization-stablecoins-title"
              )}
              columns={{
                currency: t(
                  "page-organizations-enterprise-tokenization-stablecoins-col-currency"
                ),
                marketCap: t(
                  "page-organizations-enterprise-tokenization-stablecoins-col-market-cap"
                ),
                collateral: t(
                  "page-organizations-enterprise-tokenization-stablecoins-col-collateral"
                ),
              }}
              typeLabels={stablecoinTypeLabels}
              rows={topStablecoins}
            />
            <div className="flex justify-center" data-flow="cta">
              <ButtonLink href="/stablecoins/">
                {t(
                  "page-organizations-enterprise-tokenization-stablecoins-show-more"
                )}
              </ButtonLink>
            </div>
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
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-tokenization-assets-${card.key}-description`
                      )}
                    </CardParagraph>
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

          <FurtherReading />

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
