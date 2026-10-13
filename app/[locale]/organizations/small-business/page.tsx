import { Fragment } from "react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
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
import { ListItem, OrderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { formatPriceUSD, numberToPercent } from "@/lib/utils/numbers"
import { createPageTracking } from "@/lib/utils/pageTracking"

import AdoptionChart from "../_components/adoption-chart"
import ChecklistPanel from "../_components/checklist-panel"
import ComparisonTable from "../_components/comparison-table"
import OrganizationPathways from "../_components/organization-pathways"
import SectionIntro from "../_components/section-intro"

import CryptoHoldersChart from "./_components/crypto-holders-chart"
import PurchaseIntentChart, {
  type PurchaseIntentItem,
} from "./_components/purchase-intent-chart"
import PageJsonLD from "./page-jsonld"

import paymentsImg from "@/public/images/organizations/cafe-counter-tap-to-pay.png"
import sellImg from "@/public/images/organizations/online-store-wallet-checkout.png"
import suppliersImg from "@/public/images/organizations/payment-arc-to-overseas-supplier.png"
import payrollImg from "@/public/images/organizations/payouts-to-remote-freelancers.png"
import heroImg from "@/public/images/organizations/shop-street-corner-digital-payments.png"
import shopifyImg from "@/public/images/organizations/shopify-logo.png"

const REFERENCES_ID = "references"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-small-business")
  const tCommon = await getTranslations("common")

  const { footnote, cite, linkTo } = createPageTracking(
    "organizations-small-business",
    REFERENCES_ID
  )

  const { contributors } = await getAppPageContributorInfo(
    "organizations/small-business",
    locale as Lang
  )

  const percent = (value: number) =>
    numberToPercent(value, locale, { maximumFractionDigits: 1 })

  const useCases = [
    { key: "payments", image: paymentsImg },
    { key: "suppliers", image: suppliersImg },
    { key: "payroll", image: payrollImg },
    { key: "sell", image: sellImg },
  ] as const

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
    display: percent(value / 100),
    label: t(`page-organizations-small-business-purchases-${key}`),
  }))

  const settlementItems = ["final", "keep-more", "flat-fees", "no-till"].map(
    (key) => ({
      title: t(`page-organizations-small-business-settlement-${key}-title`),
      description: t.rich(
        `page-organizations-small-business-settlement-${key}-description`,
        {
          link: linkTo(
            "/roadmap/account-abstraction/#beyond-seed-phrases",
            "settlement",
            "Smart accounts"
          ),
        }
      ),
    })
  )

  const compareColumns = ["stablecoins", "cash", "card"] as const
  const compareRows = [
    "fees",
    "final",
    "access",
    "theft",
    "moving",
    "reach",
    "refunds",
  ].map((row) => ({
    label: t(`page-organizations-small-business-compare-row-${row}`),
    cells: compareColumns.map((col) =>
      t(`page-organizations-small-business-compare-row-${row}-${col}`)
    ),
  }))

  const example = {
    price: 100,
    cardRate: 0.029,
    cardFixed: 0.3,
    discount: 0.02,
  }
  const usd = (value: number) => formatPriceUSD(value, locale)
  const cardFee = example.price * example.cardRate + example.cardFixed
  const cardNet = example.price - cardFee
  const exampleSales = [
    { key: "card", fee: cardFee, net: cardNet, toneClass: "text-error" },
    {
      key: "stablecoin",
      fee: 0,
      net: example.price,
      toneClass: "text-success",
    },
  ] as const

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

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page *:[section]:py-space-3x">
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
              <p className="text-lg text-pretty text-body-medium">
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

          <ChecklistPanel
            id="settlement"
            tint="success"
            title={t("page-organizations-small-business-settlement-title")}
            description={t(
              "page-organizations-small-business-settlement-description"
            )}
            items={settlementItems}
          />

          <Section id="compare">
            <SectionIntro
              title={t("page-organizations-small-business-compare-title")}
              description={t.rich(
                "page-organizations-small-business-compare-description",
                { disputes: cite(2, "compare"), fees: cite(3, "compare") }
              )}
            />
            <ComparisonTable
              caption={t("page-organizations-small-business-compare-caption")}
              columns={compareColumns.map((col) =>
                t(`page-organizations-small-business-compare-col-${col}`)
              )}
              rows={compareRows}
            />

            <h3 className="text-center">
              {t("page-organizations-small-business-example-title", {
                price: formatPriceUSD(example.price, locale, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
              })}
            </h3>
            <Grid balanced={2} className="mx-auto max-w-4xl">
              {exampleSales.map(({ key, fee, net, toneClass }) => (
                <Card key={key} variant="header-bar">
                  <CardHeader>
                    <CardTitle size="sm" asChild>
                      <h4>
                        {t(
                          `page-organizations-small-business-example-${key}-title`
                        )}
                      </h4>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                      <dt className="text-body-medium">
                        {t("page-organizations-small-business-example-price")}
                      </dt>
                      <dd className="text-end tabular-nums">
                        {usd(example.price)}
                      </dd>
                      <dt className="text-body-medium">
                        {t("page-organizations-small-business-example-fee")}*
                      </dt>
                      <dd className="text-end tabular-nums">{usd(fee)}</dd>
                      <dt className="font-bold">
                        {t("page-organizations-small-business-example-net")}
                      </dt>
                      <dd
                        className={cn(
                          "text-end font-bold tabular-nums",
                          toneClass
                        )}
                      >
                        {usd(net)}
                      </dd>
                      <dt className="text-body-medium">
                        {t("page-organizations-small-business-example-final")}
                      </dt>
                      <dd className={cn("text-end", toneClass)}>
                        {t(
                          `page-organizations-small-business-example-${key}-final`
                        )}
                      </dd>
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <p className="mx-auto max-w-4xl text-sm text-body-medium">
              *{" "}
              {t.rich("page-organizations-small-business-example-note", {
                cardRate: percent(example.cardRate),
                cardFixed: usd(example.cardFixed),
                rate: cite(4, "compare"),
              })}
            </p>
            <p className="mx-auto max-w-4xl text-body-medium">
              {t.rich(
                "page-organizations-small-business-example-discount-tip",
                {
                  cardRate: percent(example.cardRate),
                  discount: percent(example.discount),
                  strong: Strong,
                }
              )}
            </p>
            <p className="mx-auto max-w-4xl text-body-medium">
              {t.rich("page-organizations-small-business-compare-privacy", {
                link: linkTo(
                  "/privacy/ethereum/#protecting-your-digital-privacy-on-ethereum-today",
                  "compare",
                  "Stealth addresses"
                ),
              })}
            </p>
          </Section>

          <Section
            id="accept-payments"
            data-flow="skip"
            className="flex items-center gap-space-2x bg-tint-primary transition-[border-radius] max-md:flex-col 2xl:rounded-4xl"
          >
            <div className="flow flex-1 max-md:self-stretch">
              <h2 className="text-h3">
                {t("page-organizations-small-business-payments-title")}
              </h2>
              <p className="max-w-3xl text-lg text-pretty text-body-medium">
                {t("page-organizations-small-business-payments-description")}
              </p>
              <div
                data-flow="cta"
                className="flex gap-4 max-sm:flex-col sm:flex-wrap"
              >
                <ButtonLink href="https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/usdc-payments">
                  {t("page-organizations-small-business-payments-shopify-cta")}
                </ButtonLink>
                <ButtonLink
                  href="https://woocommerce.com/cryptocurrency/"
                  variant="outline"
                >
                  {t(
                    "page-organizations-small-business-payments-wordpress-cta"
                  )}
                </ButtonLink>
              </div>
            </div>
            <Image
              src={shopifyImg}
              alt=""
              className="h-auto w-32 shrink-0 md:w-48"
              sizes="(max-width: 768px) 128px, 192px"
            />
          </Section>

          <Section
            id="adoption"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <div className="flow">
              <h2>{t("page-organizations-small-business-adoption-title")}</h2>
              <p className="text-lg text-pretty text-body-medium">
                {t("page-organizations-small-business-adoption-description")}
                {footnote(5, "adoption")}
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
              <p className="text-lg text-pretty text-body-medium">
                {t("page-organizations-small-business-holders-description")}
                {footnote(1, "crypto-holders")}
              </p>
            </div>
            <CryptoHoldersChart
              className="lg:col-start-1 lg:row-start-1"
              callouts={[
                {
                  value: holders.now,
                  display: percent(holders.now / 100),
                  label: t(
                    "page-organizations-small-business-holders-now-label"
                  ),
                },
                {
                  value: holders.expected,
                  display: percent(holders.expected / 100),
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
                  link: linkTo(
                    "https://nca.org/2026%20Annual%20State%20of%20Crypto%20Holders%20Report.pdf",
                    REFERENCES_ID,
                    "NCA report"
                  ),
                })}
              </ListItem>
              <ListItem>
                {t.rich(
                  "page-organizations-small-business-reference-disputes",
                  {
                    link: linkTo(
                      "https://docs.adyen.com/risk-management/understanding-disputes/dispute-timeframes",
                      REFERENCES_ID,
                      "Adyen dispute timeframes"
                    ),
                  }
                )}
              </ListItem>
              <ListItem>
                {t.rich("page-organizations-small-business-reference-nilson", {
                  link: linkTo(
                    "https://markets.financialcontent.com/stocks/article/gnwcq-2025-3-19-merchant-processing-fees-in-the-united-states-exceeded-187-billion-in-2024",
                    REFERENCES_ID,
                    "Nilson Report"
                  ),
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-organizations-small-business-reference-stripe", {
                  link: linkTo(
                    "https://stripe.com/pricing",
                    REFERENCES_ID,
                    "Stripe pricing"
                  ),
                })}
              </ListItem>
              <ListItem>
                {t.rich("page-organizations-small-business-reference-a16z", {
                  link: linkTo(
                    "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/",
                    REFERENCES_ID,
                    "a16z State of Crypto"
                  ),
                })}
              </ListItem>
            </OrderedList>
          </Section>

          <OrganizationPathways pathways={["founders", "enterprise"]} />
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

  const t = await getTranslations("page-organizations-small-business")

  return await getMetadata({
    locale,
    slug: ["organizations", "small-business"],
    title: t("page-organizations-small-business-meta-title"),
    description: t("page-organizations-small-business-meta-description"),
    image: "/images/organizations/shop-street-corner-digital-payments.png",
  })
}

export default Page
