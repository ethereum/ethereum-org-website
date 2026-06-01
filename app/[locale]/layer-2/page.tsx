import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ExpandableCard from "@/components/ExpandableCard"
import HubHero, { type HubHeroProps } from "@/components/Hero/HubHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import InlineLink from "@/components/ui/Link"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"

import Layer2PageJsonLD from "./page-jsonld"

import { getGrowThePieData, getL2beatData } from "@/lib/data"
import HeroImage from "@/public/images/heroes/futuristic-community-center-trees-central-column.png"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"
import ExploreImage from "@/public/images/layer-2/learn-hero.png"
import ManDogCardImage from "@/public/images/man-playing-with-robot-shiba-dog.png"
import WalkingImage from "@/public/images/two-people-walking-and-talking.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

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

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "layer-2",
    locale as Lang
  )

  const t = await getTranslations("page-layer-2")
  const tCommon = await getTranslations("common")

  const medianTxCost =
    "error" in growThePieData.txCostsMedianUsd
      ? { error: growThePieData.txCostsMedianUsd.error }
      : growThePieData.txCostsMedianUsd.value

  const heroContent: HubHeroProps = {
    title: t("page-layer-2-hero-title"),
    header: t("page-layer-2-hero-header"),
    description: t("page-layer-2-hero-description"),
    heroImg: HeroImage,
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
    <I18nProvider locale={locale} messages={messages}>
      <Layer2PageJsonLD locale={locale} contributors={contributors} />
      <MainArticle className="relative flex flex-col">
        <HubHero {...heroContent} />

        <div
          id="layer-2-powered-by-ethereum"
          className="flex w-full flex-col gap-8 px-8 py-9"
        >
          <div className="flex flex-col gap-16 md:flex-row">
            <div className="flex flex-1 flex-col gap-8">
              <h2>{t("page-layer-2-powered-by-ethereum-title")}</h2>
              <p>
                <strong>
                  <Translation id="page-layer-2:page-layer-2-powered-by-ethereum-description-1" />{" "}
                </strong>
                {t("page-layer-2-powered-by-ethereum-description-2")}
              </p>
              <p>{t("page-layer-2-powered-by-ethereum-description-3")}</p>
            </div>
            <div className="flex flex-1">
              <Image
                src={ManDogCardImage}
                alt={t("page-layer-2-man-and-dog-alt")}
                style={{
                  width: "100%",
                  maxHeight: "240px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        <div id="layer-2-stats-box" className="w-full px-8 py-9">
          <div className="m-auto max-w-[992px] py-9">
            <div className="flex flex-col gap-8 border border-body-light p-8 md:flex-row md:gap-14">
              <div className="flex-1">
                <div className="max-w-[224px]">
                  <p className="text-5xl">
                    $
                    {numberFormat(locale, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(growThePieData.dailyTxCosts["ethereum"] || 0)}
                  </p>
                  <p className="text-body-medium">
                    {t("page-layer-2-blockchain-transaction-cost")}
                  </p>
                </div>
              </div>
              <div className="h-auto w-auto self-stretch border-b border-body-light md:border-r" />
              <div className="flex-1">
                <div className="max-w-[224px]">
                  <p className="text-5xl">
                    $
                    {numberFormat(locale, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 3,
                    }).format(
                      typeof medianTxCost === "number" ? medianTxCost : 0
                    )}
                  </p>
                  <p className="text-body-medium">
                    {t("page-layer-2-networks-transaction-cost")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="layer-2-the-network-of-networks"
          className="w-full py-9 sm:px-8"
        >
          <div className="flex flex-col gap-8 overflow-hidden bg-[#B9B9F1]/20 px-4 py-10 text-center">
            <h2>{t("page-layer-2-network-of-networks-title")}</h2>
            <p className="font-md">
              {t("page-layer-2-network-of-networks-description")}
            </p>
            <div className="relative m-auto h-[275px] w-[275px] sm:h-[375px] sm:w-[375px]">
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
                <Image
                  src={EthereumLogo}
                  alt="Ethereum"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="layer-2-callout-cards"
          className="flex w-full flex-col gap-8 p-8 *:flex-1 md:flex-row"
        >
          {calloutCards.map((card, idx) => (
            <MarkdownCard
              key={idx}
              description={card.description}
              title={card.title}
              emoji={card.emoji}
            />
          ))}
        </div>

        <div id="layer-2-ready-to-start" className="w-full px-8 py-9">
          <div className="flex flex-col items-center gap-8">
            <h2>{t("page-layer-2-ready-to-start-title")}</h2>
            <p>{t("page-layer-2-ready-to-start-description")}</p>
            <div>
              <ButtonLink
                href="/layer-2/networks"
                customEventOptions={{
                  eventCategory: "l2_hub",
                  eventAction: "button_click",
                  eventName: "mid_explore_networks",
                }}
              >
                {t("page-layer-2-ready-to-start-button")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div id="layer-2-cta" className="w-full px-8 py-9">
          <div className="mx-auto flex max-w-[640px] flex-col gap-6 rounded bg-main-gradient p-8">
            <div className="flex flex-col gap-6">
              {userRandomL2s.map((l2, idx) => (
                <div
                  key={idx}
                  className={`flex flex-1 flex-col items-start gap-4 p-4 md:flex-row md:items-center ${
                    idx < randomL2s.slice(0, 3).length - 1
                      ? "border-b border-background"
                      : ""
                  }`}
                >
                  <div className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-background shadow-drop">
                      <Image
                        src={l2.logo}
                        alt={l2.name}
                        style={{
                          width: "46px",
                          height: "46px",
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-xl font-bold">{l2.name}</p>
                      <p className="text-body-medium">{t(l2.description)}</p>
                    </div>
                  </div>
                  <div className="flex w-full md:w-auto">
                    <ButtonLink
                      href={l2.website}
                      variant="outline"
                      className="w-full"
                      customEventOptions={{
                        eventCategory: "l2_hub",
                        eventAction: "button_click",
                        eventName: "mid_powered_by_ethereum",
                      }}
                    >
                      {t("page-layer-2-go")}
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-bold">
                <Image
                  src={EthereumLogo}
                  alt={t("page-layer-2-ethereum-logo-alt")}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <p>{t("page-layer-2-powered-by-ethereum-title")}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="layer-2-why-do-we-need-multiple-networks"
          className="w-full px-8 py-9"
        >
          <div className="flex flex-col gap-8 bg-background-highlight px-12 py-12 md:flex-row">
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={WalkingImage}
                alt="Walking"
                height={345}
                width={264}
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-6">
              <h2>{t("page-layer-2-why-do-we-need-multiple-networks-1")}</h2>
              <p>{t("page-layer-2-why-do-we-need-multiple-networks-2")}</p>
              <div>
                <ButtonLink
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
            </div>
          </div>
        </div>

        <div
          id="layer-2-faq"
          className="flex w-full max-w-[832px] flex-col gap-12 px-8 py-9"
        >
          <h2>{t("page-layer-2-faq-title")}</h2>
          <div>
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
          </div>
        </div>
        <div
          id="layer-2-callout-cards"
          className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2"
        >
          <Callout
            image={ExploreImage}
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
            image={WalkingImage}
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
        </div>
      </MainArticle>
    </I18nProvider>
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
