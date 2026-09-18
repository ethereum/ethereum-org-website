import { Blocks, BookOpenCheck, Coins, Move } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
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
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD } from "@/lib/utils/numbers"

import ExpertContacts from "../../_components/expert-contacts"
import FurtherReading from "../../_components/further-reading"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import SectionIntro from "../../_components/section-intro"

import PageJsonLD from "./page-jsonld"

import { getTotalValueLockedData } from "@/lib/data"
import heroImg from "@/public/images/organizations/isometric-defi.png"

const DEFILLAMA = {
  sourceName: "DefiLlama",
  sourceUrl: "https://defillama.com/",
}

const PRIMITIVES = [
  { key: "open-standards", Icon: BookOpenCheck },
  { key: "deep-liquidity", Icon: Coins },
  { key: "composable", Icon: Blocks },
  { key: "permissionless", Icon: Move },
] as const

const INNOVATIONS = [
  "stablecoins",
  "tokenized-assets",
  "digital-bonds",
  "fx",
] as const

const PROTOCOLS = [
  { key: "aave", href: "https://aave.com/" },
  { key: "sky", href: "https://sky.money/" },
  { key: "ethena", href: "https://ethena.fi/" },
  { key: "uniswap", href: "https://uniswap.org/" },
  { key: "pendle", href: "https://www.pendle.finance/" },
  { key: "spark", href: "https://spark.fi/" },
  { key: "morpho", href: "https://morpho.org/" },
  { key: "compound", href: "https://compound.finance/" },
] as const

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations(
    "page-organizations-enterprise-onchain-finance"
  )

  const [totalValueLocked, { contributors }] = await Promise.all([
    getTotalValueLockedData(),
    getAppPageContributorInfo(
      "organizations/enterprise/onchain-finance",
      locale as Lang
    ),
  ])

  const stats: HeroStat[] = [
    {
      value:
        totalValueLocked && "value" in totalValueLocked
          ? formatLargeUSD(totalValueLocked.value, locale)
          : undefined,
      label: t("page-organizations-enterprise-onchain-finance-stat-defi-tvl"),
      lastUpdated:
        totalValueLocked && "timestamp" in totalValueLocked
          ? totalValueLocked.timestamp
          : undefined,
      ...DEFILLAMA,
    },
    {
      // TODO(data): no live source yet — Ethereum's share of global DeFi TVL is hard-coded from the design
      value: t(
        "page-organizations-enterprise-onchain-finance-stat-global-share-value"
      ),
      label: t(
        "page-organizations-enterprise-onchain-finance-stat-global-share"
      ),
    },
    {
      // TODO(data): no live source yet — 24h DEX volume (12-month avg) is hard-coded from the design
      value: t(
        "page-organizations-enterprise-onchain-finance-stat-dex-volume-value"
      ),
      label: t("page-organizations-enterprise-onchain-finance-stat-dex-volume"),
    },
  ]

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise/onchain-finance" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-onchain-finance-hero-title")}
        description={
          <>
            <p>
              {t(
                "page-organizations-enterprise-onchain-finance-hero-description-1"
              )}
            </p>
            <p>
              {t(
                "page-organizations-enterprise-onchain-finance-hero-description-2"
              )}
            </p>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-2x">
          <Section id="stats" data-flow="skip">
            <HeroStats stats={stats} />
          </Section>

          <Section id="defi-primitives">
            <SectionIntro
              title={t(
                "page-organizations-enterprise-onchain-finance-primitives-title"
              )}
              description={t(
                "page-organizations-enterprise-onchain-finance-primitives-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {PRIMITIVES.map(({ key, Icon }) => (
                <Card key={key} size="lg">
                  <CardHeader>
                    <CardIconContainer>
                      <Icon />
                    </CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-onchain-finance-primitives-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-onchain-finance-primitives-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="enterprise-innovation"
            className="rounded-4xl bg-tint-primary px-page py-space-3x text-center"
          >
            <h2>
              {t(
                "page-organizations-enterprise-onchain-finance-innovation-title"
              )}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-body-medium">
              {t(
                "page-organizations-enterprise-onchain-finance-innovation-description"
              )}
            </p>
            <Grid balanced={4} data-flow="cta" className="text-start">
              {INNOVATIONS.map((key) => (
                <Card key={key} variant="nested">
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-onchain-finance-innovation-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-onchain-finance-innovation-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter buttons="inherit">
                    <CardParagraph>
                      {t(
                        "page-organizations-enterprise-onchain-finance-innovation-examples-label"
                      )}
                    </CardParagraph>
                    <CardParagraph textColor="body">
                      {t(
                        `page-organizations-enterprise-onchain-finance-innovation-${key}-examples`
                      )}
                    </CardParagraph>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="defi-ecosystem"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col"
          >
            <div className="flow lg:basis-1/3">
              <h2>
                {t(
                  "page-organizations-enterprise-onchain-finance-ecosystem-title"
                )}
              </h2>
              <p className="text-lg text-body-medium">
                {t(
                  "page-organizations-enterprise-onchain-finance-ecosystem-description"
                )}
              </p>
            </div>
            <Grid columns={3} size="narrow" className="lg:basis-2/3">
              {PROTOCOLS.map(({ key, href }) => (
                <Card key={key} href={href} size="md">
                  <CardContent>
                    <CardTitle size="sm">
                      {t(
                        `page-organizations-enterprise-onchain-finance-ecosystem-${key}-name`
                      )}
                    </CardTitle>
                  </CardContent>
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

  const t = await getTranslations(
    "page-organizations-enterprise-onchain-finance"
  )

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise", "onchain-finance"],
    title: t("page-organizations-enterprise-onchain-finance-meta-title"),
    description: t(
      "page-organizations-enterprise-onchain-finance-meta-description"
    ),
    image: "/images/organizations/isometric-defi.png",
  })
}

export default Page
