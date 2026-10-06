import { Blocks, BookOpenCheck, Coins, Move } from "lucide-react"
import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import AppCard from "@/components/AppCard"
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

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD, numberFormat } from "@/lib/utils/numbers"

import ExpertContacts from "../../_components/expert-contacts"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import OrganizationPathways from "../../_components/organization-pathways"
import SectionIntro from "../../_components/section-intro"
import { metricStat, nullOnError, SOURCES } from "../../_lib/metrics"

import PageJsonLD from "./page-jsonld"

import {
  getDefiTvlShareData,
  getDexVolumeData,
  getTotalValueLockedData,
} from "@/lib/data"
import aaveImg from "@/public/images/dapps/aave.png"
import compoundImg from "@/public/images/dapps/compound.png"
import morphoImg from "@/public/images/dapps/morpho.png"
import sparkImg from "@/public/images/dapps/sparkfi.png"
import uniswapImg from "@/public/images/exchanges/uniswap.png"
import heroImg from "@/public/images/organizations/isometric-defi.png"
import makerImg from "@/public/images/stablecoins/maker.png"

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

// TODO(content): Ethena and Pendle logos
const PROTOCOLS: {
  key: string
  href: string
  logo?: StaticImageData
  invertOnDark?: boolean
}[] = [
  { key: "aave", href: "https://aave.com/", logo: aaveImg },
  { key: "sky", href: "https://sky.money/", logo: makerImg },
  { key: "ethena", href: "https://ethena.fi/" },
  {
    key: "uniswap",
    href: "https://uniswap.org/",
    logo: uniswapImg,
    invertOnDark: true,
  },
  { key: "pendle", href: "https://www.pendle.finance/" },
  { key: "spark", href: "https://spark.finance/", logo: sparkImg },
  { key: "morpho", href: "https://morpho.org/", logo: morphoImg },
  { key: "compound", href: "https://compound.finance/", logo: compoundImg },
]

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations(
    "page-organizations-enterprise-onchain-finance"
  )

  const [totalValueLocked, defiShare, dexVolume, { contributors }] =
    await Promise.all([
      nullOnError(getTotalValueLockedData()),
      nullOnError(getDefiTvlShareData()),
      nullOnError(getDexVolumeData()),
      getAppPageContributorInfo(
        "organizations/enterprise/onchain-finance",
        locale as Lang
      ),
    ])

  const stats: HeroStat[] = [
    {
      ...metricStat(totalValueLocked, (value) => formatLargeUSD(value, locale)),
      label: t("page-organizations-enterprise-onchain-finance-stat-defi-tvl"),
      ...SOURCES.defillama,
    },
    {
      ...(defiShare && "mainnetShare" in defiShare
        ? {
            value: numberFormat(locale, { style: "percent" }).format(
              defiShare.mainnetShare
            ),
            lastUpdated: defiShare.timestamp,
          }
        : {}),
      label: t(
        "page-organizations-enterprise-onchain-finance-stat-global-share"
      ),
      ...SOURCES.defillama,
    },
    {
      ...metricStat(dexVolume, (value) => formatLargeUSD(value, locale)),
      label: t("page-organizations-enterprise-onchain-finance-stat-dex-volume"),
      ...SOURCES.defillama,
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
            <div className="mt-space-3x">
              <HeroStats stats={stats} />
            </div>
          </>
        }
      />

      {/* px-page on each section so the band wrapper can go full-bleed */}
      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page *:[section]:py-space-3x">
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

          {/* `mt-space-3x`: `flow` skips non-section wrappers */}
          <div className="mt-space-3x w-full bg-radial-primary transition-[border-radius] 2xl:rounded-4xl">
            <Section
              id="enterprise-innovation"
              className="px-page py-space-3x text-center"
            >
              <h2>
                {t(
                  "page-organizations-enterprise-onchain-finance-innovation-title"
                )}
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-pretty text-body-medium">
                {t(
                  "page-organizations-enterprise-onchain-finance-innovation-description"
                )}
              </p>
              <Grid balanced={4} data-flow="cta" className="text-start">
                {INNOVATIONS.map((key) => (
                  <Card
                    key={key}
                    variant="nested"
                    className="row-span-2 grid grid-rows-subgrid gap-0"
                  >
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
          </div>

          <Section
            id="defi-ecosystem"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col"
          >
            <div className="flow lg:sticky lg:top-28 lg:basis-1/3 lg:self-start">
              <h2>
                {t(
                  "page-organizations-enterprise-onchain-finance-ecosystem-title"
                )}
              </h2>
              <p className="text-lg text-pretty text-body-medium">
                {/* TODO(content): ecosystem lead needs content-owner copy */}
                {t(
                  "page-organizations-enterprise-onchain-finance-ecosystem-description"
                )}
              </p>
            </div>
            <Grid columns={3} size="narrow" className="lg:basis-2/3">
              {PROTOCOLS.map(({ key, href, logo, invertOnDark }) => (
                <AppCard
                  key={key}
                  name={t(
                    `page-organizations-enterprise-onchain-finance-ecosystem-${key}-name`
                  )}
                  nameClassName="line-clamp-2 text-base leading-tight sm:text-lg"
                  thumbnail={logo?.src}
                  // TODO(content): protocol descriptions and category tags
                  href={href}
                  className={cn(invertOnDark && "dark:[&_img]:invert")}
                />
              ))}
            </Grid>
          </Section>
          <ExpertContacts />

          <OrganizationPathways current="onchain-finance" />
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
    // TODO(content): meta description needs content-owner copy
    description: t(
      "page-organizations-enterprise-onchain-finance-meta-description"
    ),
    image: "/images/organizations/isometric-defi.png",
  })
}

export default Page
