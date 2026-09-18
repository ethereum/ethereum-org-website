import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
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

const NCA_REPORT_URL =
  "https://nca.org/2026%20Annual%20State%20of%20Crypto%20Holders%20Report.pdf"

const Footnote = () => (
  <sup>
    <InlineLink href={NCA_REPORT_URL} hideArrow>
      1
    </InlineLink>
  </sup>
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-small-business")

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
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-2x">
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
                {t("page-organizations-small-business-purchases-description")}{" "}
                <Footnote />
              </p>
            </div>
            <PurchaseIntentChart
              items={purchaseIntent}
              caption={t(
                "page-organizations-small-business-purchases-chart-caption"
              )}
            />
          </Section>

          <Section
            id="accept-payments"
            className="rounded-4xl bg-tint-primary px-page py-space-3x"
          >
            <h2 className="text-h3">
              {t("page-organizations-small-business-payments-title")}
            </h2>
            <p className="max-w-3xl text-lg text-body-medium">
              {t("page-organizations-small-business-payments-description")}
            </p>
            <div data-flow="cta" className="flex flex-wrap gap-4">
              <ButtonLink href="https://help.crypto.com/en/articles/6188943-shopify-setup-guide">
                {t("page-organizations-small-business-payments-shopify-cta")}
              </ButtonLink>
              <ButtonLink href="https://wordpress.org/plugins/mycryptocheckout/">
                {t("page-organizations-small-business-payments-wordpress-cta")}
              </ButtonLink>
            </div>
          </Section>

          <Section
            id="adoption"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-[2fr_3fr]"
          >
            <div className="flow">
              <h2>{t("page-organizations-small-business-adoption-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-small-business-adoption-description")}{" "}
                <Footnote />
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
                {t("page-organizations-small-business-holders-description")}{" "}
                <Footnote />
              </p>
            </div>
            <CryptoHoldersChart
              className="lg:col-start-1 lg:row-start-1"
              items={[
                {
                  key: holders[0].key,
                  value: holders[0].value,
                  display: percent(holders[0].value),
                  label: t(
                    "page-organizations-small-business-holders-now-label"
                  ),
                },
                {
                  key: holders[1].key,
                  value: holders[1].value,
                  display: percent(holders[1].value),
                  label: t(
                    "page-organizations-small-business-holders-expected-label"
                  ),
                },
              ]}
              caption={t(
                "page-organizations-small-business-holders-chart-caption"
              )}
            />
          </Section>

          <Section id="sources">
            <p className="text-sm text-body-medium">
              {t("page-organizations-small-business-footnote-source")}
            </p>
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
