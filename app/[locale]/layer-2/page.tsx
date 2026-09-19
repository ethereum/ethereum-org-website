import { getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import BigNumber from "@/components/BigNumber"
import ExpandableCard from "@/components/ExpandableCard"
import HubHero, { type HubHeroProps } from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import Translation from "@/components/Translation"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { formatSmallUSD } from "@/lib/utils/numbers"

import { layer2Data } from "@/data/networks/networks"

import PageJsonLD from "./page-jsonld"

import { getGrowThePieData, getL2beatData } from "@/lib/data"
import layer2NetworksCalloutImage from "@/public/images/counter-screen-network-towers-rings-collage-cut-out.png"
import heroImg from "@/public/images/heroes/layer-2-hub-hero.png"
import ethereumLogo from "@/public/images/layer-2/ethereum.png"
import mainnetImage from "@/public/images/mainnet.png"
import manDogCardImage from "@/public/images/man-and-dog-playing.png"
import layer2LearnCalloutImage from "@/public/images/network-column-rooftop-piping-construction.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const [growThePieData, l2beatData] = await Promise.all([
    getGrowThePieData(),
    getL2beatData(),
  ])

  if (!l2beatData) {
    throw new Error("Failed to fetch L2beat data")
  }

  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
  }

  const getRandomL2s = () => {
    let candidates = layer2Data.filter(
      (network) =>
        networkMaturity(l2beatData.projects[network.l2beatID]) === "robust"
    )

    if (candidates.length === 0) {
      candidates = layer2Data.filter(
        (network) =>
          networkMaturity(l2beatData.projects[network.l2beatID]) === "maturing"
      )
    }

    return candidates.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const randomL2s = layer2Data.sort(() => 0.5 - Math.random()).slice(0, 9)
  const userRandomL2s = getRandomL2s()

  const { contributors } = await getAppPageContributorInfo(
    "layer-2",
    locale as Lang
  )

  const t = await getTranslations("page-layer-2")
  const tCommon = await getTranslations("common")

  // Both fees are formatted by significant digits, not fixed decimals: median
  // costs are routinely sub-cent and 2-decimal rounding flattens them to $0.00
  const ethereumTxCost = growThePieData.dailyTxCosts["ethereum"]
  const medianTxCost =
    "error" in growThePieData.txCostsMedianUsd
      ? null
      : growThePieData.txCostsMedianUsd.value

  const heroContent: HubHeroProps = {
    title: t("page-layer-2-hero-title"),
    header: t("page-layer-2-hero-header"),
    description: t("page-layer-2-hero-description"),
    heroImg: heroImg,
    buttons: [
      {
        content: tCommon("nav-networks-explore-networks-label"),
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "l2_hub",
          eventAction: "button_click",
          eventName: "hero_explore_networks",
        },
      },
      {
        content: t("page-layer-2-hero-button-2-content"),
        href: "/layer-2/learn",
        matomo: {
          eventCategory: "l2_learn_page",
          eventAction: "button_click",
          eventName: "hero_get_started",
        },
      },
    ],
  }

  const calloutCards = [
    {
      title: t("page-layer-2-calloutCard-1-title"),
      description: t("page-layer-2-calloutCard-1-description"),
      emoji: ":money_with_wings:",
    },
    {
      title: t("page-layer-2-calloutCard-2-title"),
      description: t("page-layer-2-calloutCard-2-description"),
      emoji: ":closed_lock_with_key:",
    },
    {
      title: t("page-layer-2-calloutCard-3-title"),
      description: t("page-layer-2-calloutCard-3-description"),
      emoji: ":hammer_and_wrench:",
    },
  ]

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero {...heroContent} />

      <MainArticle className="flow px-page pt-page-2x pb-page">
        <Section
          id="powered-by-ethereum"
          data-flow="skip"
          className="flex gap-space-2x *:flex-1 max-lg:flex-col"
        >
          <div className="flow">
            <h2>{t("page-layer-2-powered-by-ethereum-title")}</h2>
            <p>
              <strong>
                <Translation id="page-layer-2:page-layer-2-powered-by-ethereum-description-1" />{" "}
              </strong>
              {t("page-layer-2-powered-by-ethereum-description-2")}
            </p>
            <p>{t("page-layer-2-powered-by-ethereum-description-3")}</p>
          </div>
          <div className="relative max-lg:min-h-64">
            <Image
              src={manDogCardImage}
              alt={t("page-layer-2-man-and-dog-alt")}
              className="absolute inset-0 size-full object-contain"
              sizes="(max-width: 992px) 100vw, 45vw"
            />
          </div>
        </Section>

        <Section id="stats">
          <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-2xl border p-8 md:flex-row md:gap-14">
            <BigNumber
              center={false}
              className="py-0"
              value={
                ethereumTxCost ? formatSmallUSD(ethereumTxCost, locale) : "-"
              }
            >
              {t("page-layer-2-blockchain-transaction-cost")}
            </BigNumber>
            <div className="self-stretch border-b border-border md:border-e md:border-b-0" />
            <BigNumber
              center={false}
              className="py-0"
              value={medianTxCost ? formatSmallUSD(medianTxCost, locale) : "-"}
            >
              {t("page-layer-2-networks-transaction-cost")}
            </BigNumber>
          </div>
        </Section>

        <Section
          id="network-of-networks"
          className="overflow-hidden rounded-2xl bg-tint-primary p-8 text-center md:p-12"
        >
          <h2>{t("page-layer-2-network-of-networks-title")}</h2>
          <p>{t("page-layer-2-network-of-networks-description")}</p>
          <div className="relative mx-auto h-[275px] w-[275px] sm:h-[375px] sm:w-[375px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-body-medium"></div>
            <div className="absolute inset-0 animate-spin-30 rounded-full">
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 animate-counter-spin-30 rounded-full bg-primary">
                <Image
                  className="rounded-full"
                  src={randomL2s[0].logo}
                  alt={randomL2s[0].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute right-[8%] bottom-[17%] h-6 w-6 animate-counter-spin-30 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[1].logo}
                  alt={randomL2s[1].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute bottom-[17%] left-[8%] h-6 w-6 animate-counter-spin-30 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[2].logo}
                  alt={randomL2s[2].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="absolute inset-[30px] rounded-full border border-dashed border-body-medium sm:inset-[54px]"></div>
            <div className="absolute inset-[30px] animate-spin-21 rounded-full sm:inset-[54px]">
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 animate-counter-spin-21 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[3].logo}
                  alt={randomL2s[3].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute right-[5%] bottom-[15%] h-6 w-6 animate-counter-spin-21 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[4].logo}
                  alt={randomL2s[4].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 animate-counter-spin-21 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[5].logo}
                  alt={randomL2s[5].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="absolute inset-[60px] rounded-full border border-dashed border-body-medium sm:inset-[108px]"></div>
            <div className="absolute inset-[60px] animate-spin-9 rounded-full sm:inset-[108px]">
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 animate-counter-spin-9 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[6].logo}
                  alt={randomL2s[6].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute right-[5%] bottom-[15%] h-6 w-6 animate-counter-spin-9 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[7].logo}
                  alt={randomL2s[7].name}
                  width={24}
                  height={24}
                />
              </div>
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 animate-counter-spin-9 rounded-full">
                <Image
                  className="rounded-full"
                  src={randomL2s[8].logo}
                  alt={randomL2s[8].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform">
              <Image src={ethereumLogo} alt="Ethereum" width={48} height={48} />
            </div>
          </div>
        </Section>

        <Section id="benefits-cards">
          <Grid columns={3}>
            {calloutCards.map((card, idx) => (
              <MarkdownCard
                key={idx}
                description={card.description}
                title={card.title}
                emoji={card.emoji}
              />
            ))}
          </Grid>
        </Section>

        <Section id="ready-to-start" className="text-center">
          <h2>{t("page-layer-2-ready-to-start-title")}</h2>
          <p>{t("page-layer-2-ready-to-start-description")}</p>
          <ButtonLink
            data-flow="cta"
            href="/layer-2/networks"
            customEventOptions={{
              eventCategory: "l2_hub",
              eventAction: "button_click",
              eventName: "mid_explore_networks",
            }}
          >
            {t("page-layer-2-ready-to-start-button")}
          </ButtonLink>
        </Section>

        <Section id="featured-networks">
          <div className="mx-auto flex max-w-[640px] flex-col gap-6 rounded-2xl bg-linear-primary p-8">
            <div className="flex flex-col">
              {userRandomL2s.map((l2, idx) => (
                <div
                  key={idx}
                  className={`flex flex-1 flex-col items-start gap-4 p-4 md:flex-row md:items-center ${
                    idx < userRandomL2s.length - 1
                      ? "border-b border-background"
                      : ""
                  }`}
                >
                  <div className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-center">
                    <div className="flex size-14 items-center justify-center rounded-md bg-background shadow-lg">
                      <Image
                        src={l2.logo}
                        alt={l2.name}
                        className="size-[46px] object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-xl font-bold">{l2.name}</p>
                      <p className="text-body-medium">{t(l2.description)}</p>
                    </div>
                  </div>
                  <ButtonLink
                    href={l2.website}
                    variant="outline"
                    className="w-full md:w-auto"
                    customEventOptions={{
                      eventCategory: "l2_hub",
                      eventAction: "button_click",
                      eventName: "mid_powered_by_ethereum",
                    }}
                  >
                    {t("page-layer-2-go")}
                  </ButtonLink>
                </div>
              ))}
            </div>

            <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-bold">
              <Image
                src={ethereumLogo}
                alt={t("page-layer-2-ethereum-logo-alt")}
                className="size-6 object-contain"
              />
              <p>{t("page-layer-2-powered-by-ethereum-title")}</p>
            </div>
          </div>
        </Section>

        <Section
          id="why-multiple-networks"
          data-flow="skip"
          className="flex gap-space-2x rounded-2xl bg-background-highlight p-8 *:flex-1 max-md:flex-col md:p-12"
        >
          <div className="relative max-md:min-h-64">
            <Image
              src={mainnetImage}
              alt=""
              className="absolute inset-0 size-full object-contain"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="flow">
            <h2>{t("page-layer-2-why-do-we-need-multiple-networks-1")}</h2>
            <p>{t("page-layer-2-why-do-we-need-multiple-networks-2")}</p>
            <ButtonLink
              data-flow="cta"
              href="/layer-2/learn"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "mid_l2_learn",
              }}
            >
              {tCommon("learn-more")}
            </ButtonLink>
          </div>
        </Section>

        <Section id="faq">
          <h2>{t("page-layer-2-faq-title")}</h2>
          <AccordionContainer>
            <ExpandableCard
              title={t("page-layer-2-faq-ExpandableCard-1-title")}
              eventCategory="l2_hub"
              eventAction="expand"
              eventName="how do i know if a network is part of ethereum"
            >
              <p>
                {t("page-layer-2-faq-ExpandableCard-1-description-1")}{" "}
                <InlineLink href="/layer-2/networks">
                  {tCommon("nav-ethereum-networks")}
                </InlineLink>
                {t("page-layer-2-period")}
              </p>
              <p>{t("page-layer-2-faq-ExpandableCard-1-description-2")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("page-layer-2-faq-ExpandableCard-2-title")}
              eventCategory="l2_hub"
              eventAction="expand"
              eventName="are all these networks safe"
            >
              <p>
                {t("page-layer-2-faq-ExpandableCard-2-description-1")}{" "}
                <InlineLink href="/layer-2/networks">
                  {t("page-layer-2-faq-ExpandableCard-2-link")}
                </InlineLink>
                {t("page-layer-2-period")}
              </p>
              <p>{t("page-layer-2-faq-ExpandableCard-2-description-2")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("page-layer-2-faq-ExpandableCard-3-title")}
              eventCategory="l2_hub"
              eventAction="expand"
              eventName="why can't ethereum scale its own chain instead of relying on these networks"
            >
              <p>{t("page-layer-2-faq-ExpandableCard-3-description")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("page-layer-2-faq-ExpandableCard-4-title")}
              eventCategory="l2_hub"
              eventAction="expand"
              eventName="why is there no official ethereum networks"
            >
              <p>{t("page-layer-2-faq-ExpandableCard-4-description")}</p>
            </ExpandableCard>
          </AccordionContainer>
        </Section>

        <Section id="callouts">
          <Grid columns={2} size="wide">
            <Callout
              image={layer2NetworksCalloutImage}
              title={t("page-layer-2-callout-1-title")}
              description={t("page-layer-2-callout-1-description")}
            >
              <ButtonLink
                href="/layer-2/networks"
                customEventOptions={{
                  eventCategory: "l2_hub",
                  eventAction: "button_click",
                  eventName: "bottom_explore_networks",
                }}
              >
                {tCommon("nav-networks-explore-networks-label")}
              </ButtonLink>
            </Callout>
            <Callout
              image={layer2LearnCalloutImage}
              title={t("page-layer-2-callout-2-title")}
              description={t("page-layer-2-callout-2-description")}
            >
              <ButtonLink
                href="/layer-2/learn"
                customEventOptions={{
                  eventCategory: "l2_hub",
                  eventAction: "button_click",
                  eventName: "bottom_l2_learn",
                }}
              >
                {tCommon("learn-more")}
              </ButtonLink>
            </Callout>
          </Grid>
        </Section>
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-layer-2")

  return await getMetadata({
    locale,
    slug: ["layer-2"],
    title: t("page-layer-2-meta-title"),
    description: t("page-layer-2-meta-description"),
    image: "/images/layer-2/learn-hero.png",
  })
}

export default Page
