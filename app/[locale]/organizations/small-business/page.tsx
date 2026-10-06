import { Fragment } from "react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { ListItem, OrderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { createPageTracking } from "@/lib/utils/pageTracking"

import AdoptionChart from "../_components/adoption-chart"
import OrganizationPathways from "../_components/organization-pathways"
import SectionIntro from "../_components/section-intro"

import CryptoHoldersChart from "./_components/crypto-holders-chart"
import PurchaseIntentChart, {
  type PurchaseIntentItem,
} from "./_components/purchase-intent-chart"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/organizations/hero-small-business.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import l2StackImg from "@/public/images/organizations/isometric-l2-stack.png"
import privacyImg from "@/public/images/organizations/isometric-privacy.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"
import shopifyImg from "@/public/images/organizations/shopify-logo.png"

const NCA_REPORT_URL =
  "https://nca.org/2026%20Annual%20State%20of%20Crypto%20Holders%20Report.pdf"
const A16Z_REPORT_URL =
  "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/"

const REFERENCES_ID = "references"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-small-business")
  const tCommon = await getTranslations("common")
  const { footnote, linkTo } = createPageTracking(
    "organizations-small-business",
    REFERENCES_ID
  )

  const { contributors } = await getAppPageContributorInfo(
    "organizations/small-business",
    locale as Lang
  )

  const percent = (value: number) =>
    numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    }).format(value / 100)

  const useCases = [
    { key: "payments", image: tokenizationImg },
    { key: "suppliers", image: defiImg },
    { key: "payroll", image: l2StackImg },
    { key: "sell", image: privacyImg },
  ] as const

  // TODO(data): live source (NCA 2026 Annual State of Crypto Holders Report)
  const purchaseIntent: PurchaseIntentItem[] = (
    [
      ["retailers", 54],
      ["grocery", 46],
      ["apparel", 42],
      ["travel", 41],
      ["convenience", 39],
      ["cafes", 31],
    ] as const
  ).map(([key, value]) => ({
    key,
    value,
    display: percent(value),
    label: t(`page-organizations-small-business-purchases-${key}`),
  }))

  // TODO(data): live source (NCA 2026 Annual State of Crypto Holders Report)
  const holders = { now: 40, expected: 72 }

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/small-business" }}
        heroImg={heroImg}
        title={t("page-organizations-small-business-hero-title")}
        description={
          <>
            <p>{t("page-organizations-small-business-hero-description-1")}</p>
            <p>{t("page-organizations-small-business-hero-description-2")}</p>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-3x">
          <Section id="use-cases">
            <SectionIntro
              title={t("page-organizations-small-business-use-cases-title")}
              description={t(
                "page-organizations-small-business-use-cases-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {useCases.map(({ key, image }) => (
                <Card key={key}>
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
                        `page-organizations-small-business-use-cases-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-small-business-use-cases-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="everyday-purchases"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-2"
          >
            <div className="flow">
              <h2>{t("page-organizations-small-business-purchases-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-small-business-purchases-description")}
                {footnote(1, "everyday-purchases")}
              </p>
            </div>
            {/* Recharts renders nothing server-side; the sr-only list is the a11y/no-JS fallback */}
            <figure className="m-0 min-w-0">
              <PurchaseIntentChart items={purchaseIntent} />
              <dl className="sr-only">
                {purchaseIntent.map(({ key, label, display }) => (
                  <Fragment key={key}>
                    <dt>{label}</dt>
                    <dd>{display}</dd>
                  </Fragment>
                ))}
              </dl>
              <figcaption className="sr-only">
                {t("page-organizations-small-business-purchases-chart-caption")}
              </figcaption>
            </figure>
          </Section>

          <Section
            id="accept-payments"
            className="flex items-center gap-space-2x rounded-4xl bg-tint-primary px-page py-space-3x max-md:flex-col"
          >
            <div className="flex-1">
              <h2 className="text-h3">
                {t("page-organizations-small-business-payments-title")}
              </h2>
              <p className="mt-space max-w-3xl text-lg text-body-medium">
                {t("page-organizations-small-business-payments-description")}
              </p>
              {/* TODO(content): approved first-party Shopify/WordPress CTAs */}
            </div>
            {/* Not decorative: the panel's only mention of Shopify */}
            <Image
              src={shopifyImg}
              alt="Shopify"
              className="h-auto w-32 shrink-0 md:w-48"
              sizes="(max-width: 768px) 128px, 192px"
            />
          </Section>

          <Section
            id="adoption"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-[2fr_3fr]"
          >
            <div className="flow">
              <h2>{t("page-organizations-small-business-adoption-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-small-business-adoption-description")}
                {footnote(2, "adoption")}
              </p>
            </div>
            <AdoptionChart />
          </Section>

          <Section
            id="crypto-holders"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-2"
          >
            <div className="flow lg:col-start-2">
              <h2>{t("page-organizations-small-business-holders-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-small-business-holders-description")}
                {footnote(1, "crypto-holders")}
              </p>
            </div>
            <CryptoHoldersChart
              className="lg:col-start-1 lg:row-start-1"
              callouts={[
                {
                  value: holders.now,
                  display: percent(holders.now),
                  label: t(
                    "page-organizations-small-business-holders-now-label"
                  ),
                },
                {
                  value: holders.expected,
                  display: percent(holders.expected),
                  label: t(
                    "page-organizations-small-business-holders-expected-label"
                  ),
                },
              ]}
            />
          </Section>

          {/* Target of the `[1]` markers above. */}
          <Section id={REFERENCES_ID}>
            <h2>{tCommon("references")}</h2>
            <OrderedList className="ms-0 list-inside list-decimal text-sm text-body-medium">
              <ListItem>
                {t.rich("page-organizations-small-business-reference-nca", {
                  link: linkTo(NCA_REPORT_URL, REFERENCES_ID, "NCA report"),
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-organizations-small-business-reference-a16z", {
                  link: linkTo(
                    A16Z_REPORT_URL,
                    REFERENCES_ID,
                    "a16z State of Crypto"
                  ),
                })}
              </ListItem>
            </OrderedList>
          </Section>

          <OrganizationPathways pathways={["founders", "enterprise"]} />
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

  const t = await getTranslations("page-organizations-small-business")

  return await getMetadata({
    locale,
    slug: ["organizations", "small-business"],
    title: t("page-organizations-small-business-meta-title"),
    description: t("page-organizations-small-business-meta-description"),
    image: "/images/organizations/hero-small-business.png",
  })
}

export default Page
