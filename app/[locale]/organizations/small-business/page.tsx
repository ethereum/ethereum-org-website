import { Fragment, type ReactNode } from "react"
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
import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"

import AdoptionChart from "../_components/adoption-chart"
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

/** Target of every footnote marker; the source link itself lives on the citation. */
const SOURCES_ID = "sources"

/**
 * Footnote marker. It points at the on-page source list (not straight out to
 * the PDF, which skipped the citation entirely), and the numbering is rendered
 * outside the strings so translators never carry it -- the `[n]` pattern the
 * open-source page established.
 */
const footnote = (n: number) => (
  <sup>
    <InlineLink
      href={`#${SOURCES_ID}`}
      hideArrow
      className="inline-flex h-6 items-center justify-center"
    >{`[${n}]`}</InlineLink>
  </sup>
)

/** `t.rich` link placeholder for the citation in the source list. */
const ncaLink = (chunks: ReactNode) => (
  <InlineLink href={NCA_REPORT_URL}>{chunks}</InlineLink>
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-small-business")
  const tCommon = await getTranslations("common")

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

  // TODO(data): no live source yet -- NCA 2026 Annual State of Crypto Holders Report
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

  // TODO(data): no live source yet -- NCA 2026 Annual State of Crypto Holders Report
  const holders = [
    { key: "now", value: 40 },
    { key: "expected", value: 72 },
  ] as const

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
                {footnote(1)}
              </p>
            </div>
            {/* Recharts renders nothing server-side, so the six values live in a
                server-rendered sr-only list: the accessible representation, and
                the no-JS fallback for what would otherwise be an empty box. */}
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
              {/* TODO(content): this panel had "Shopify" and "WordPress" CTAs
                  that opened a Crypto.com support article and an unaudited
                  third-party plugin -- a button must not be labelled with a
                  destination it does not open, and neither target clears the
                  product-listing bar in
                  public/content/contributing/adding-products/index.md. Approved
                  first-party destinations are needed before any CTA returns
                  here. */}
            </div>
            {/* Named rather than decorative: with the CTAs gone this is the
                panel's only mention of Shopify, so `alt=""` would drop it for
                screen readers entirely. The art is transparent, so it sits on
                the dark page without the glare the opaque hub images have. */}
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
                {footnote(1)}
              </p>
            </div>
            {/* TODO(data): no live source yet -- figures from the design (NCA footnote) */}
            <AdoptionChart
              items={[
                {
                  value: t(
                    "page-organizations-small-business-adoption-owners-value"
                  ),
                  label: t(
                    "page-organizations-small-business-adoption-owners-label"
                  ),
                },
                {
                  value: t(
                    "page-organizations-small-business-adoption-addresses-value"
                  ),
                  label: t(
                    "page-organizations-small-business-adoption-addresses-label"
                  ),
                },
                {
                  value: t(
                    "page-organizations-small-business-adoption-users-value"
                  ),
                  label: t(
                    "page-organizations-small-business-adoption-users-label"
                  ),
                },
              ]}
            />
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
                {footnote(1)}
              </p>
            </div>
            <CryptoHoldersChart
              className="lg:col-start-1 lg:row-start-1"
              callouts={[
                {
                  key: holders[0].key,
                  display: percent(holders[0].value),
                  label: t(
                    "page-organizations-small-business-holders-now-label"
                  ),
                },
                {
                  key: holders[1].key,
                  display: percent(holders[1].value),
                  label: t(
                    "page-organizations-small-business-holders-expected-label"
                  ),
                },
              ]}
            />
          </Section>

          {/* Target of the `[1]` markers above. */}
          <Section id={SOURCES_ID}>
            <h2>{tCommon("sources")}</h2>
            <OrderedList className="m-0 list-decimal text-sm text-body-medium">
              <ListItem>
                {t.rich("page-organizations-small-business-reference-nca", {
                  link: ncaLink,
                })}
              </ListItem>
            </OrderedList>
          </Section>
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
