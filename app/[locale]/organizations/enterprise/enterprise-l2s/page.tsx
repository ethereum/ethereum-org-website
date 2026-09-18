import {
  ArrowRightLeft,
  ChevronsUp,
  Paintbrush,
  ShieldPlus,
  Sparkles,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import EthGlyphSolid from "@/components/icons/eth-glyph-solid.svg"
import { Image } from "@/components/Image"
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
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatLargeUSD } from "@/lib/utils/numbers"

import ChecklistPanel from "../../_components/checklist-panel"
import ComparisonTable from "../../_components/comparison-table"
import ExpertContacts from "../../_components/expert-contacts"
import FurtherReading from "../../_components/further-reading"
import HeroStats, { type HeroStat } from "../../_components/hero-stats"
import SectionIntro from "../../_components/section-intro"

import PageJsonLD from "./page-jsonld"

import { getL2beatData } from "@/lib/data"
import arbitrumLogo from "@/public/images/layer-2/arbitrum.jpg"
import optimismLogo from "@/public/images/layer-2/optimism.png"
import zksyncLogo from "@/public/images/layer-2/zksyncEra.jpg"
import heroImg from "@/public/images/organizations/isometric-l2-stack.png"
import issuanceImg from "@/public/images/organizations/l2-issuance-partners.png"

const L2BEAT = { sourceName: "L2BEAT", sourceUrl: "https://l2beat.com/" }

const BENEFITS = [
  { key: "scalable", Icon: ChevronsUp },
  { key: "customizable", Icon: Paintbrush },
  { key: "security", Icon: ShieldPlus },
  { key: "interoperability", Icon: ArrowRightLeft },
] as const

const CASE_STUDIES = [
  { key: "tokenization", href: "/organizations/enterprise/tokenization/" },
  { key: "finance", href: "/organizations/enterprise/onchain-finance/" },
  { key: "infrastructure", href: "/organizations/enterprise/privacy/" },
  { key: "consumer" },
] as const

const NETWORKS = [
  { key: "arbitrum", href: "https://arbitrum.io/", logo: arbitrumLogo },
  { key: "zksync", href: "https://www.zksync.io/", logo: zksyncLogo },
  { key: "optimism", href: "https://www.optimism.io/", logo: optimismLogo },
] as const

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-enterprise-l2s")

  const [l2beatData, { contributors }] = await Promise.all([
    getL2beatData(),
    getAppPageContributorInfo(
      "organizations/enterprise/enterprise-l2s",
      locale as Lang
    ),
  ])

  const l2Tvl = l2beatData
    ? Object.values(l2beatData.projects).reduce(
        (sum, project) => sum + (project.tvs?.breakdown?.total ?? 0),
        0
      )
    : undefined

  const stats: HeroStat[] = [
    {
      value: l2Tvl !== undefined ? formatLargeUSD(l2Tvl, locale) : undefined,
      label: t("page-organizations-enterprise-l2s-stat-l2-tvl"),
      ...L2BEAT,
    },
    {
      // TODO(data): no live source yet for average L2 user operations per second
      value: t("page-organizations-enterprise-l2s-stat-uops-value"),
      label: t("page-organizations-enterprise-l2s-stat-uops"),
    },
  ]

  const trustItems = [
    "elegance",
    "future-proof",
    "reduced-risk",
    "battle-tested",
  ].map((key) => ({
    title: t(`page-organizations-enterprise-l2s-trust-${key}-title`),
    description: t(
      `page-organizations-enterprise-l2s-trust-${key}-description`
    ),
  }))

  const approachColumns = ["existing", "custom"]
  const approachRows = [
    "time-to-market",
    "integration",
    "compliance",
    "security",
  ].map((row) => ({
    label: t(`page-organizations-enterprise-l2s-approach-row-${row}`),
    cells: approachColumns.map((col) => (
      <>
        <strong className="block text-body">
          {t(
            `page-organizations-enterprise-l2s-approach-row-${row}-${col}-title`
          )}
        </strong>
        {t(
          `page-organizations-enterprise-l2s-approach-row-${row}-${col}-description`
        )}
      </>
    )),
  }))

  const strong = (chunks: ReactNode) => <strong>{chunks}</strong>

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/enterprise/enterprise-l2s" }}
        heroImg={heroImg}
        title={t("page-organizations-enterprise-l2s-hero-title")}
        description={
          <>
            <p>{t("page-organizations-enterprise-l2s-hero-description-1")}</p>
            <p>{t("page-organizations-enterprise-l2s-hero-description-2")}</p>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow mx-auto max-w-7xl">
          <Section id="stats" data-flow="skip">
            <HeroStats stats={stats} />
          </Section>

          <Section id="benefits">
            <SectionIntro
              title={t("page-organizations-enterprise-l2s-benefits-title")}
              description={t(
                "page-organizations-enterprise-l2s-benefits-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {BENEFITS.map(({ key, Icon }) => (
                <Card key={key}>
                  <CardHeader>
                    <CardIconContainer>
                      <Icon />
                    </CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-l2s-benefits-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-l2s-benefits-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Card variant="ghost" border href="#approach">
              <CardHeader>
                <CardIconContainer>
                  <Sparkles />
                </CardIconContainer>
              </CardHeader>
              <CardContent>
                <CardTitle>
                  {t(
                    "page-organizations-enterprise-l2s-benefits-ecosystem-title"
                  )}
                </CardTitle>
                <CardParagraph>
                  {t(
                    "page-organizations-enterprise-l2s-benefits-ecosystem-description"
                  )}
                </CardParagraph>
              </CardContent>
              <CardFooter buttons="inherit">
                <CardLinkFake withForwardArrow>
                  {t(
                    "page-organizations-enterprise-l2s-benefits-ecosystem-cta"
                  )}
                </CardLinkFake>
              </CardFooter>
            </Card>
          </Section>

          <Section
            id="issuance"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col lg:*:flex-1"
          >
            <div className="flow">
              <h2>{t("page-organizations-enterprise-l2s-issuance-title")}</h2>
              <p className="text-xl font-bold text-body-medium">
                {t("page-organizations-enterprise-l2s-issuance-lead")}
              </p>
              <UnorderedList className="text-lg text-body-medium">
                <ListItem>
                  {t("page-organizations-enterprise-l2s-issuance-bullet-1")}
                </ListItem>
                <ListItem>
                  {t("page-organizations-enterprise-l2s-issuance-bullet-2")}
                </ListItem>
                <ListItem>
                  {t("page-organizations-enterprise-l2s-issuance-bullet-3")}
                </ListItem>
              </UnorderedList>
              <p>
                {t.rich(
                  "page-organizations-enterprise-l2s-issuance-transparency",
                  { strong }
                )}
              </p>
              <p>
                {t.rich(
                  "page-organizations-enterprise-l2s-issuance-recoverability",
                  { strong }
                )}
              </p>
            </div>
            <div className="relative max-lg:min-h-64">
              <Image
                src={issuanceImg}
                alt=""
                className="absolute inset-0 size-full object-contain"
                sizes="(max-width: 992px) 100vw, 512px"
              />
            </div>
          </Section>

          <ChecklistPanel
            id="trust-layer"
            tint="success"
            title={t("page-organizations-enterprise-l2s-trust-title")}
            description={t(
              "page-organizations-enterprise-l2s-trust-description"
            )}
            items={trustItems}
          />

          <Section id="approach">
            <SectionIntro
              title={t("page-organizations-enterprise-l2s-approach-title")}
              description={t(
                "page-organizations-enterprise-l2s-approach-description"
              )}
            />
            <ComparisonTable
              caption={t("page-organizations-enterprise-l2s-approach-title")}
              columns={approachColumns.map((col) =>
                t(`page-organizations-enterprise-l2s-approach-col-${col}`)
              )}
              rows={approachRows}
            />
          </Section>

          <Section
            id="case-studies"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col"
          >
            <div className="flow lg:w-1/3 lg:shrink-0">
              <h2>
                {t("page-organizations-enterprise-l2s-case-studies-title")}
              </h2>
              <p className="text-lg text-body-medium">
                {t(
                  "page-organizations-enterprise-l2s-case-studies-description"
                )}
              </p>
            </div>
            <Grid balanced={2} className="flex-1">
              {CASE_STUDIES.map((study) => (
                <Card
                  key={study.key}
                  href={"href" in study ? study.href : undefined}
                >
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-enterprise-l2s-case-studies-${study.key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-enterprise-l2s-case-studies-${study.key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                  {"href" in study && (
                    <CardFooter buttons="inherit">
                      <CardLinkFake>
                        {t(
                          `page-organizations-enterprise-l2s-case-studies-${study.key}-cta`
                        )}
                      </CardLinkFake>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="deployment"
            data-flow="skip"
            className="flex gap-space-2x max-lg:flex-col"
          >
            <div className="flow lg:w-1/3 lg:shrink-0">
              <h2>{t("page-organizations-enterprise-l2s-deployment-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-enterprise-l2s-deployment-description")}
              </p>
            </div>
            <div className="flex-1 rounded-4xl bg-tint-primary p-page">
              <ul className="divide-y divide-background">
                {NETWORKS.map(({ key, href, logo }) => (
                  <li
                    key={key}
                    className="flex flex-wrap items-center gap-4 py-4 first:pt-0"
                  >
                    <Image
                      src={logo}
                      alt=""
                      className="size-14 shrink-0 rounded-md bg-background object-contain p-1 shadow-md"
                      sizes="56px"
                    />
                    <div className="min-w-48 flex-1">
                      <h3 className="text-h5">
                        {t(
                          `page-organizations-enterprise-l2s-deployment-${key}-name`
                        )}
                      </h3>
                      <p className="text-body-medium">
                        {t(
                          `page-organizations-enterprise-l2s-deployment-${key}-description`
                        )}
                      </p>
                    </div>
                    <ButtonLink href={href} variant="outline" size="sm">
                      {t("page-organizations-enterprise-l2s-deployment-cta")}
                      {/* the three CTAs share the visible label "Go", so the
                          network name keeps their accessible names distinct */}
                      <span className="sr-only">
                        &nbsp;
                        {t(
                          `page-organizations-enterprise-l2s-deployment-${key}-name`
                        )}
                      </span>
                    </ButtonLink>
                  </li>
                ))}
              </ul>
              <div className="mt-space flex justify-center">
                <Tag status="tag" variant="high-contrast" className="gap-2">
                  <EthGlyphSolid className="size-4" />
                  {t("page-organizations-enterprise-l2s-deployment-powered-by")}
                </Tag>
              </div>
            </div>
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

  const t = await getTranslations("page-organizations-enterprise-l2s")

  return await getMetadata({
    locale,
    slug: ["organizations", "enterprise", "enterprise-l2s"],
    title: t("page-organizations-enterprise-l2s-meta-title"),
    description: t("page-organizations-enterprise-l2s-meta-description"),
    image: "/images/organizations/isometric-l2-stack.png",
  })
}

export default Page
