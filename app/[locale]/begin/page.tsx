import {
  CircleHelp,
  Coins,
  Compass,
  Fuel,
  History,
  Landmark,
  Lightbulb,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams, SectionNavDetails } from "@/lib/types"

import PathwayCard from "@/components/cards/pathway-card"
import ContentFeedback from "@/components/ContentFeedback"
import ExpandableCard from "@/components/ExpandableCard"
import { PageHero } from "@/components/Hero"
import ExtraSecurityIcon from "@/components/icons/extra-security.svg"
import PrivacyIcon from "@/components/icons/privacy.svg"
import BetterUserExperienceIcon from "@/components/icons/roadmap/better-user-experience.svg"
import OpenSourceStakingIcon from "@/components/icons/staking/open-source-staking.svg"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { LinkWithArrow } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import TabNav, { StickyContainer } from "@/components/ui/TabNav"
import { Tag } from "@/components/ui/tag"

import { getMetadata } from "@/lib/utils/metadata"
import { formatSmallUSD } from "@/lib/utils/numbers"
import { createPageTracking } from "@/lib/utils/pageTracking"

import ComparisonTable from "../organizations/_components/comparison-table"
import SectionIntro from "../organizations/_components/section-intro"

import { getGrowThePieData } from "@/lib/data"
import heroImg from "@/public/images/community-campfire-people-robot-cut-out.png"
import codeImg from "@/public/images/developers-eth-blocks.png"
import researchImg from "@/public/images/future_transparent.png"
import fundingImg from "@/public/images/hackathon_transparent.png"
import aidImg from "@/public/images/organizations/aid-delivery-transparent-funds.png"
import enterpriseImg from "@/public/images/organizations/financial-district-plaza-with-settlement.png"
import identityImg from "@/public/images/organizations/resident-sharing-digital-credential.png"
import founderImg from "@/public/images/organizations/startup-warehouse-founders-workspace.png"
import publicSectorImg from "@/public/images/organizations/town-hall-plaza-public-services.png"
import paymentsImg from "@/public/images/stablecoins/gold-rollup-spaceship-with-coins.png"
import curiousImg from "@/public/images/what-is-ethereum.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-begin")

  const { track, linkTo } = createPageTracking("begin")

  // Median Ethereum mainnet transaction cost, same source and formatting as
  // /layer-2/. Formatted by significant digits: the value is often a few cents
  // or less. Missing data drops the live sentence instead of failing the page.
  const growThePieData = await getGrowThePieData()
  const ethereumTxCost = growThePieData?.dailyTxCosts["ethereum"]
  // One formatted value for both the table and the fees answer, so they match
  const txCost = ethereumTxCost ? formatSmallUSD(ethereumTxCost, locale) : null

  const ethUses = [
    { key: "gas", icon: <Fuel /> },
    { key: "staking", icon: <ShieldCheck /> },
    { key: "money", icon: <Send /> },
    { key: "collateral", icon: <Landmark /> },
  ] as const

  // The five anchors the draft lists under the hero
  const navSections: SectionNavDetails[] = [
    { key: "changed", label: t("page-begin-changed-title"), icon: <History /> },
    {
      key: "misconceptions",
      label: t("page-begin-misconceptions-title"),
      icon: <CircleHelp />,
    },
    { key: "eth", label: t("page-begin-eth-nav"), icon: <Coins /> },
    { key: "uses", label: t("page-begin-uses-title"), icon: <Lightbulb /> },
    { key: "matters", label: t("page-begin-matters-title"), icon: <Scale /> },
    { key: "path", label: t("page-begin-path-title"), icon: <Compass /> },
  ]

  const changedRows = (
    [
      { key: "fees" },
      { key: "energy" },
      { key: "ux" },
      { key: "uses" },
      { key: "clients", note: true },
      { key: "scaling" },
    ] as const
  ).map(({ key, ...rest }) => ({
    label: t.rich(`page-begin-changed-${key}-then`, { strong: Strong }),
    cells: [
      <>
        {t.rich(
          key === "fees" && !txCost
            ? "page-begin-changed-fees-now-fallback"
            : `page-begin-changed-${key}-now`,
          { strong: Strong, cost: txCost ?? "" }
        )}
        {"note" in rest && (
          <span className="mt-1 block text-sm text-body-medium">
            {t(`page-begin-changed-${key}-note`)}
          </span>
        )}
      </>,
    ],
  }))

  const licenses = ["GPL-3.0", "LGPL-3.0", "Apache-2.0", "MIT"]

  const useCases = [
    { key: "payments", href: "/stablecoins/", image: paymentsImg },
    { key: "aid", href: "/organizations/public-sector/", image: aidImg },
    { key: "identity", href: "/decentralized-identity/", image: identityImg },
    { key: "funding", href: "/community/grants/", image: fundingImg },
  ] as const

  // Same icons and descriptions /values/ pairs with each principle. `proof`
  // adds how Ethereum does it in practice (merged from "Built in the open").
  const principles = [
    { key: "open-source", icon: <OpenSourceStakingIcon />, proof: true },
    { key: "privacy", icon: <PrivacyIcon />, proof: false },
    {
      key: "censorship-resistance",
      icon: <BetterUserExperienceIcon />,
      proof: true,
    },
    { key: "security", icon: <ExtraSecurityIcon />, proof: true },
  ] as const

  const pathways = [
    { key: "code", href: "/developers/", image: codeImg },
    { key: "research", href: "/community/research/", image: researchImg },
    {
      key: "public-sector",
      href: "/organizations/public-sector/",
      image: publicSectorImg,
    },
    {
      key: "enterprise",
      href: "/organizations/enterprise/",
      image: enterpriseImg,
    },
    { key: "founder", href: "/organizations/founders/", image: founderImg },
    { key: "curious", href: "/what-is-ethereum/", image: curiousImg },
  ] as const

  return (
    <>
      <PageHero
        breadcrumbs={{ slug: "begin" }}
        variant="no-divider"
        heroImg={heroImg}
        title={t("page-begin-hero-title")}
        description={
          <p>{t.rich("page-begin-hero-description", { strong: Strong })}</p>
        }
      />

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page *:[section]:py-space-3x">
          <StickyContainer className="top-10 pt-space-2x">
            <TabNav
              sections={navSections}
              customEventOptions={{
                eventCategory: "begin",
                eventAction: "whats_on_this_page",
              }}
              useMotion
            />
          </StickyContainer>

          <Section id="changed" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-changed-title")}
              description={t("page-begin-changed-description")}
            />
            <div className="mx-auto max-w-4xl">
              <ComparisonTable
                caption={t("page-begin-changed-caption")}
                rowHeader={t("page-begin-changed-col-then")}
                columns={[t("page-begin-changed-col-now")]}
                rows={changedRows}
                className="min-w-0"
              />
            </div>
            <LinkWithArrow
              href="/apps/"
              className="mx-auto"
              customEventOptions={track("changed", "Explore apps")}
            >
              {t("page-begin-changed-link")}
            </LinkWithArrow>
          </Section>

          <Section id="misconceptions" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-misconceptions-title")}
              description={t("page-begin-misconceptions-description")}
            />
            <AccordionContainer className="mx-auto max-w-4xl">
              <ExpandableCard
                title={t("page-begin-misconceptions-fees-question")}
                eventCategory="begin"
                eventAction="misconceptions"
                eventName="fees"
              >
                <p>
                  {t.rich("page-begin-misconceptions-fees-answer", {
                    strong: Strong,
                  })}
                </p>
                {txCost && (
                  <p>
                    {t.rich("page-begin-misconceptions-fees-live", {
                      cost: txCost,
                      strong: Strong,
                      link: linkTo(
                        "https://www.growthepie.com/",
                        "misconceptions",
                        "growthepie"
                      ),
                    })}
                  </p>
                )}
                <p>
                  {t.rich("page-begin-misconceptions-fees-scale", {
                    strong: Strong,
                  })}
                </p>
                <LinkWithArrow href="/organizations/enterprise/enterprise-l2s/">
                  {t("page-begin-misconceptions-fees-link")}
                </LinkWithArrow>
              </ExpandableCard>
              <ExpandableCard
                title={t("page-begin-misconceptions-energy-question")}
                eventCategory="begin"
                eventAction="misconceptions"
                eventName="energy"
              >
                <p>
                  {t.rich("page-begin-misconceptions-energy-answer", {
                    strong: Strong,
                  })}
                </p>
                <LinkWithArrow href="/energy-consumption/">
                  {t("page-begin-misconceptions-energy-link")}
                </LinkWithArrow>
              </ExpandableCard>
              <ExpandableCard
                title={t("page-begin-misconceptions-crypto-question")}
                eventCategory="begin"
                eventAction="misconceptions"
                eventName="just-a-cryptocurrency"
              >
                <p>
                  {t.rich("page-begin-misconceptions-crypto-answer", {
                    strong: Strong,
                  })}
                </p>
                <LinkWithArrow href="/what-is-ethereum/">
                  {t("page-begin-misconceptions-crypto-link")}
                </LinkWithArrow>
              </ExpandableCard>
              <ExpandableCard
                title={t("page-begin-misconceptions-accept-question")}
                eventCategory="begin"
                eventAction="misconceptions"
                eventName="who-accepts-it"
              >
                <p>
                  {t.rich("page-begin-misconceptions-accept-answer", {
                    shopify: linkTo(
                      "https://www.shopify.com/news/stablecoins-on-shopify",
                      "misconceptions",
                      "Shopify stablecoins"
                    ),
                    paypal: linkTo(
                      "https://newsroom.paypal-corp.com/2023-08-07-PayPal-Launches-U-S-Dollar-Stablecoin",
                      "misconceptions",
                      "PayPal PYUSD"
                    ),
                    nca: linkTo(
                      "https://nca.org/2026%20Annual%20State%20of%20Crypto%20Holders%20Report.pdf",
                      "misconceptions",
                      "NCA report"
                    ),
                  })}
                </p>
                <LinkWithArrow href="/organizations/small-business/">
                  {t("page-begin-misconceptions-accept-link")}
                </LinkWithArrow>
              </ExpandableCard>
              <ExpandableCard
                title={t("page-begin-misconceptions-scams-question")}
                eventCategory="begin"
                eventAction="misconceptions"
                eventName="speculation-and-scams"
              >
                <p>
                  {t.rich("page-begin-misconceptions-scams-answer", {
                    strong: Strong,
                  })}
                </p>
              </ExpandableCard>
            </AccordionContainer>
          </Section>

          <Section id="eth" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-eth-title")}
              description={t("page-begin-eth-description")}
            />
            <Grid balanced={4} data-flow="cta">
              {ethUses.map(({ key, icon }) => (
                <Card key={key}>
                  <CardHeader>
                    <CardIconContainer>{icon}</CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle asChild>
                      <h3>{t(`page-begin-eth-${key}-title`)}</h3>
                    </CardTitle>
                    <CardParagraph>
                      {t.rich(`page-begin-eth-${key}-description`, {
                        strong: Strong,
                      })}
                    </CardParagraph>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <p className="mx-auto max-w-3xl text-center text-body-medium">
              {t.rich("page-begin-eth-burn", {
                link: linkTo(
                  "https://ultrasound.money/?timeFrame=since_burn",
                  "eth",
                  "Ultrasound money"
                ),
              })}
            </p>
            <LinkWithArrow href="/what-is-ether/" className="mx-auto">
              {t("page-begin-eth-link")}
            </LinkWithArrow>
          </Section>

          <Section id="uses" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-uses-title")}
              description={t.rich("page-begin-uses-description", {
                strong: Strong,
              })}
            />
            <Grid balanced={4} data-flow="cta">
              {useCases.map(({ key, href, image }) => (
                <Card
                  key={key}
                  href={href}
                  customEventOptions={track("uses", key)}
                >
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
                    <CardTitle>{t(`page-begin-uses-${key}-title`)}</CardTitle>
                    <CardParagraph>
                      {t(`page-begin-uses-${key}-description`)}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <CardLinkFake>
                      {t(`page-begin-uses-${key}-cta`)}
                    </CardLinkFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
            <div
              data-flow="cta"
              className="flex justify-center gap-4 max-sm:flex-col sm:flex-wrap"
            >
              <ButtonLink href="/organizations/">
                {t("page-begin-uses-link-organizations")}
              </ButtonLink>
              <ButtonLink href="/use-cases/" variant="outline">
                {t("page-begin-uses-link-all")}
              </ButtonLink>
            </div>
          </Section>

          <Section id="matters" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-matters-title")}
              description={t("page-begin-matters-description")}
            />
            <Grid balanced={4} data-flow="cta">
              {principles.map(({ key, icon, proof }) => (
                <Card key={key}>
                  <CardHeader className="flex items-center justify-between gap-4">
                    <CardTitle asChild>
                      <h3>{t(`page-begin-matters-${key}`)}</h3>
                    </CardTitle>
                    <CardIconContainer>{icon}</CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardParagraph>
                      {t(`page-begin-matters-${key}-description`)}
                    </CardParagraph>
                    {proof && (
                      <CardParagraph className="mt-3">
                        {t.rich(`page-begin-matters-${key}-proof`, {
                          strong: Strong,
                        })}
                      </CardParagraph>
                    )}
                    {key === "open-source" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {licenses.map((license) => (
                          <Tag key={license} status="normal">
                            {license}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <LinkWithArrow href="/values/" className="mx-auto">
              {t("page-begin-matters-link")}
            </LinkWithArrow>
          </Section>

          <Section id="path" scrollMargin="tabNav">
            <SectionIntro
              title={t("page-begin-path-title")}
              description={t("page-begin-path-description")}
            />
            <div
              className="mx-auto flex max-w-4xl flex-col gap-4"
              data-flow="cta"
            >
              {pathways.map(({ key, href, image }) => (
                <PathwayCard
                  key={key}
                  href={href}
                  title={t(`page-begin-path-${key}-title`)}
                  description={t(`page-begin-path-${key}-description`)}
                  banner={<Image src={image} alt="" sizes="160px" />}
                />
              ))}
            </div>
          </Section>

          <Section
            id="contribute"
            data-flow="skip"
            className="flow bg-tint-primary transition-[border-radius] 2xl:rounded-4xl"
          >
            <h2 className="text-h3">{t("page-begin-contribute-title")}</h2>
            <p className="max-w-3xl text-lg text-pretty text-body-medium">
              {t.rich("page-begin-contribute-description", { strong: Strong })}
            </p>
            <div
              data-flow="cta"
              className="flex gap-4 max-sm:flex-col sm:flex-wrap"
            >
              <ButtonLink href="/community/get-involved/">
                {t("page-begin-contribute-get-involved")}
              </ButtonLink>
              <ButtonLink href="/contributing/" variant="outline">
                {t("page-begin-contribute-website")}
              </ButtonLink>
              <ButtonLink
                href="/contributing/translation-program/"
                variant="outline"
              >
                {t("page-begin-contribute-translate")}
              </ButtonLink>
            </div>
          </Section>
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
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-begin")

  return await getMetadata({
    locale,
    slug: ["begin"],
    title: t("page-begin-meta-title"),
    description: t("page-begin-meta-description"),
  })
}

export default Page
