import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD, numberFormat } from "@/lib/utils/numbers"

import ChecklistPanel from "../_components/checklist-panel"
import ComparisonTable from "../_components/comparison-table"
import ExpertContacts from "../_components/expert-contacts"
import HeroStats, { type HeroStat } from "../_components/hero-stats"
import OrganizationPathways from "../_components/organization-pathways"
import SectionIntro from "../_components/section-intro"
import {
  DEFI_RUNNER_UP_FALLBACK,
  metricStat,
  nullOnError,
  RWA_SHARE_FALLBACK,
  SOURCES,
} from "../_lib/metrics"
import { ETHEREUM_GENESIS_TIMESTAMP, uptimeYearsSince } from "../_lib/uptime"

import PageJsonLD from "./page-jsonld"

import {
  getDefiTvlShareData,
  getEthereumStablecoinsMcapData,
  getRwaMarketShareData,
  getTotalValueLockedData,
} from "@/lib/data"
import heroImg from "@/public/images/organizations/hero-enterprise.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import l2StackImg from "@/public/images/organizations/isometric-l2-stack.png"
import privacyImg from "@/public/images/organizations/isometric-privacy.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise")

  const [
    stablecoinsMcap,
    totalValueLocked,
    rwaShare,
    defiShare,
    { contributors },
  ] = await Promise.all([
    nullOnError(getEthereumStablecoinsMcapData()),
    nullOnError(getTotalValueLockedData()),
    nullOnError(getRwaMarketShareData()),
    nullOnError(getDefiTvlShareData()),
    getAppPageContributorInfo("organizations/enterprise", locale as Lang),
  ])

  const uptimeYears = uptimeYearsSince(ETHEREUM_GENESIS_TIMESTAMP)

  const stats: HeroStat[] = [
    {
      value: t("page-organizations-enterprise-stat-uptime-value", {
        years: uptimeYears,
      }),
      label: t("page-organizations-enterprise-stat-uptime"),
    },
    {
      ...metricStat(stablecoinsMcap, (value) => formatLargeUSD(value, locale)),
      label: t("page-organizations-enterprise-stat-stablecoin-tvl"),
      ...SOURCES.defillama,
    },
    {
      ...metricStat(totalValueLocked, (value) => formatLargeUSD(value, locale)),
      label: t("page-organizations-enterprise-stat-defi-tvl"),
      ...SOURCES.defillama,
    },
  ]

  const useCases = [
    {
      key: "tokenization",
      href: "/organizations/enterprise/tokenization/",
      image: tokenizationImg,
    },
    {
      key: "defi",
      href: "/organizations/enterprise/onchain-finance/",
      image: defiImg,
    },
    {
      key: "l2s",
      href: "/organizations/enterprise/enterprise-l2s/",
      image: l2StackImg,
    },
    {
      key: "privacy",
      href: "/organizations/enterprise/privacy/",
      image: privacyImg,
    },
  ] as const

  const whyItems = ["neutrality", "composable", "liquidity", "resilience"].map(
    (key) => ({
      title: t(`page-organizations-enterprise-why-${key}-title`),
      // `years` keeps the copy in step with the uptime stat above
      description: t(`page-organizations-enterprise-why-${key}-description`, {
        years: uptimeYears,
        rwaShare: numberFormat(locale, { style: "percent" }).format(
          (rwaShare && "rwas" in rwaShare ? rwaShare : RWA_SHARE_FALLBACK).rwas
        ),
        multiplier: numberFormat(locale, { maximumFractionDigits: 0 }).format(
          defiShare && "runnerUpMultiplier" in defiShare
            ? defiShare.runnerUpMultiplier
            : DEFI_RUNNER_UP_FALLBACK
        ),
      }),
    })
  )

  const compareColumns = ["ethereum", "l1", "private-dlt", "traditional"]
  const compareRows = [
    "finality",
    "auditability",
    "neutrality",
    "composability",
  ].map((row) => ({
    label: t(`page-organizations-enterprise-compare-row-${row}`),
    cells: compareColumns.map((col) =>
      t(`page-organizations-enterprise-compare-row-${row}-${col}`)
    ),
  }))

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-hero-title")}
        description={
          <>
            <p>{t("page-organizations-enterprise-hero-description-1")}</p>
            <p>{t("page-organizations-enterprise-hero-description-2")}</p>
            <div className="mt-space-3x">
              <HeroStats stats={stats} />
            </div>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow *:[section]:py-space-3x">
          <Section id="use-cases">
            <SectionIntro
              title={t("page-organizations-enterprise-use-cases-title")}
              description={t(
                "page-organizations-enterprise-use-cases-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {useCases.map(({ key, href, image }) => (
                <Card key={key} href={href}>
                  <CardHeader>
                    <CardBanner background="none" fit="contain">
                      <Image
                        src={image}
                        alt=""
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </CardBanner>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-use-cases-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-use-cases-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <CardButtonFake>
                      {t(`page-organizations-enterprise-use-cases-${key}-cta`)}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <ChecklistPanel
            id="why-ethereum"
            tint="success"
            title={t("page-organizations-enterprise-why-title")}
            description={t("page-organizations-enterprise-why-description")}
            items={whyItems}
          />

          <Section id="compare">
            <SectionIntro
              title={t("page-organizations-enterprise-compare-title")}
              description={t(
                "page-organizations-enterprise-compare-description"
              )}
            />
            <ComparisonTable
              caption={t("page-organizations-enterprise-compare-title")}
              columns={compareColumns.map((col) =>
                t(`page-organizations-enterprise-compare-col-${col}`)
              )}
              rows={compareRows}
            />
          </Section>

          <ExpertContacts />

          <OrganizationPathways
            pathways={["tokenization", "onchain-finance"]}
          />
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

  const t = await getTranslations("page-organizations-enterprise")

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise"],
    title: t("page-organizations-enterprise-meta-title"),
    description: t("page-organizations-enterprise-meta-description"),
    image: "/images/organizations/hero-enterprise.png",
  })
}

export default Page
