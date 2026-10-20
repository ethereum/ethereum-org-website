import type { Metadata } from "next"
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
import { metricStat, SOURCES } from "@/lib/utils/metrics"
import { formatLargeUSD, numberFormat } from "@/lib/utils/numbers"

import ChecklistPanel from "../_components/checklist-panel"
import ComparisonTable from "../_components/comparison-table"
import ExpertContacts from "../_components/expert-contacts"
import HeroStats, { type HeroStat } from "../_components/hero-stats"
import OrganizationPathways from "../_components/organization-pathways"
import SectionIntro from "../_components/section-intro"
import { organizationPages } from "../_lib/pages"
import { ETHEREUM_GENESIS_TIMESTAMP, uptimeYearsSince } from "../_lib/uptime"

import PageJsonLD from "./page-jsonld"

import {
  getDefiTvlShareData,
  getEthereumStablecoinsMcapData,
  getTotalValueLockedData,
} from "@/lib/data"
import heroImg from "@/public/images/organizations/financial-district-plaza-with-settlement.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise")

  const [stablecoinsMcap, totalValueLocked, defiShare, { contributors }] =
    await Promise.all([
      getEthereumStablecoinsMcapData(),
      getTotalValueLockedData(),
      getDefiTvlShareData(),
      getAppPageContributorInfo("organizations/enterprise", locale as Lang),
    ])

  const uptimeYears = uptimeYearsSince(ETHEREUM_GENESIS_TIMESTAMP)
  // `years` picks the plural form; `count` is the locale-formatted figure
  const uptime = {
    years: uptimeYears,
    count: numberFormat(locale).format(uptimeYears),
  }

  const stats: HeroStat[] = [
    {
      value: t("page-organizations-enterprise-stat-uptime-value", uptime),
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
    { key: "tokenization", ...organizationPages.tokenization },
    { key: "defi", ...organizationPages["onchain-finance"] },
    { key: "l2s", ...organizationPages["enterprise-l2s"] },
    { key: "privacy", ...organizationPages.privacy },
  ]

  // The multiplier sentence renders only when its data loaded
  const multiplier =
    defiShare && "runnerUpMultiplier" in defiShare
      ? numberFormat(locale, { maximumFractionDigits: 0 }).format(
          defiShare.runnerUpMultiplier
        )
      : undefined

  const whyItems = ["neutrality", "composable", "liquidity", "resilience"].map(
    (key) => ({
      title: t(`page-organizations-enterprise-why-${key}-title`),
      // `uptime` keeps the copy in step with the uptime stat above
      description:
        key === "liquidity" && multiplier
          ? t(
              "page-organizations-enterprise-why-liquidity-description-multiplier",
              {
                ...uptime,
                multiplier,
              }
            )
          : t(`page-organizations-enterprise-why-${key}-description`, uptime),
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
            <HeroStats stats={stats} />
          </>
        }
      />

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page *:[section]:py-space-3x">
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

        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise")

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise"],
    title: t("page-organizations-enterprise-meta-title"),
    description: t("page-organizations-enterprise-meta-description"),
    image: "/images/organizations/financial-district-plaza-with-settlement.png",
  })
}

export default Page
