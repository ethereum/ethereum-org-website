import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, GrowThePieData, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
import HubHero, { HubHeroProps } from "@/components/Hero/HubHero"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data, Rollups } from "@/data/networks/networks"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"
import WalkingImage from "@/public/images/layer-2/layer-2-walking.png"
import ExploreImage from "@/public/images/layer-2/learn-hero.png"
import ManDogCardImage from "@/public/images/man-and-dog-playing.png"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [["growThePieData", fetchGrowThePie]],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const [growThePieData] = await loadData()

  const randomL2s = layer2Data.sort(() => 0.5 - Math.random()).slice(0, 9)

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      randomL2s,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      locale,
      growThePieData,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Hub = ({
  randomL2s,
  growThePieData,
  locale,
}: {
  randomL2s: Rollups
  growThePieData: GrowThePieData
  locale: Lang
}) => {
  const { t } = useTranslation(["page-layer-2", "common"])
  const medianTxCost =
    "error" in growThePieData.txCostsMedianUsd
      ? { error: growThePieData.txCostsMedianUsd.error }
      : growThePieData.txCostsMedianUsd.value

  // TODO: setup translation
  const heroContent: HubHeroProps = {
    title: t("page-layer-2-hero-title"),
    header: t("page-layer-2-hero-header"),
    description: t("page-layer-2-hero-description"),
    heroImg: HeroImage,
    buttons: [
      {
        content: t("nav-networks-explore-networks-label"),
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "l2_hub",
          eventAction: "button_click",
          eventName: "hero_explore_networks",
        },
      },
      {
        content: t("page-layer-2-hero-button-2-content"),
        href: "#layer-2-powered-by-ethereum",
        matomo: {
          eventCategory: "l2_hub",
          eventAction: "button_click",
          eventName: "hero_get_started",
        },
      },
    ],
  }

  // TODO: Setup for translation
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
    <MainArticle className="relative flex flex-col">
      {/* TODO: Clarify title and description here */}
      {/* TODO: Setup for translation */}
      <PageMetadata
        title={t("page-layer-2-meta-title")}
        description={t("page-layer-2-meta-description")}
        image="/images/layer-2/learn-hero.png"
      />

      <HubHero {...heroContent} />

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-powered-by-ethereum"
        className="flex w-full flex-col gap-8 px-8 py-9"
      >
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <h2>{t("page-layer-2-powered-by-ethereum-title")}</h2>
            <p>
              <strong>
                {t("page-layer-2-powered-by-ethereum-description-1")}{" "}
              </strong>
              {t("page-layer-2-powered-by-ethereum-description-2")}
            </p>
            <p>{t("page-layer-2-powered-by-ethereum-description-3")}</p>
          </div>
          <div className="flex flex-1">
            <TwImage
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

      {/* TODO: Setup for translation */}
      <div id="layer-2-stats-box" className="w-full px-8 py-9">
        <div className="m-auto max-w-[992px] py-9">
          <div className="flex flex-col gap-8 border border-body-light p-8 md:flex-row md:gap-14">
            <div className="flex-1">
              <div className="max-w-[224px]">
                <p className="text-5xl">
                  $
                  {growThePieData.dailyTxCosts["ethereum"].toLocaleString(
                    locale as Lang,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                  )}
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
                  {medianTxCost.toLocaleString(locale as Lang, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  })}
                </p>
                <p className="text-body-medium">
                  {t("page-layer-2-networks-transaction-cost")}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Commented out for now, remove before release if we don't ship with it. */}
        {/* <div className="relative m-auto -mt-4 h-44 w-44 -rotate-12 rounded-full bg-primary sm:absolute sm:right-10 sm:-mt-28 md:-mt-80 xl:right-52">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-background">over</p>
            <p className="text-5xl text-background">100x</p>
            <p className="text-background">cheaper</p>
          </div>
        </div> */}
      </div>

      {/* TODO: Setup for translation */}
      <div id="layer-2-the-network-of-networks" className="w-full py-9 sm:px-8">
        <div className="flex flex-col gap-8 overflow-hidden bg-[#B9B9F1] bg-opacity-20 px-4 py-10 text-center">
          <h2>{t("page-layer-2-network-of-networks-title")}</h2>
          <p className="font-md">
            {t("page-layer-2-network-of-networks-description")}
          </p>
          <div className="relative m-auto h-[275px] w-[275px] sm:h-[375px] sm:w-[375px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-body-medium"></div>
            <div className="absolute inset-0 animate-spin-30 rounded-full">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full bg-primary">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[0].logo}
                  alt={randomL2s[0].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[17%] right-[8%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[1].logo}
                  alt={randomL2s[1].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[17%] left-[8%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-30 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[2].logo}
                  alt={randomL2s[2].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Middle ring */}
            <div className="absolute inset-[30px] rounded-full border border-dashed border-body-medium sm:inset-[54px]"></div>
            <div className="absolute inset-[30px] animate-spin-21 rounded-full sm:inset-[54px]">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[3].logo}
                  alt={randomL2s[3].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[15%] right-[5%] h-6 w-6 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[4].logo}
                  alt={randomL2s[4].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 transform animate-counter-spin-21 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[5].logo}
                  alt={randomL2s[5].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Inner ring */}
            <div className="absolute inset-[60px] rounded-full border border-dashed border-body-medium sm:inset-[108px]"></div>
            <div className="absolute inset-[60px] animate-spin-9 rounded-full sm:inset-[108px]">
              {/* Top logo */}
              <div className="absolute -top-[12px] left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[6].logo}
                  alt={randomL2s[6].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom right logo */}
              <div className="absolute bottom-[15%] right-[5%] h-6 w-6 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[7].logo}
                  alt={randomL2s[7].name}
                  width={24}
                  height={24}
                />
              </div>
              {/* Bottom left logo */}
              <div className="absolute bottom-[15%] left-[5%] h-6 w-6 transform animate-counter-spin-9 rounded-full">
                <TwImage
                  className="rounded-full"
                  src={randomL2s[8].logo}
                  alt={randomL2s[8].name}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Center Ethereum Logo */}
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform">
              <TwImage
                src={EthereumLogo}
                alt={t("page-layer-2-ethereum-logo-alt")}
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="layer-2-callout-cards" className="w-full px-8 py-9">
        <div className="flex flex-col gap-9 md:flex-row">
          {calloutCards.map((card, idx) => {
            return (
              <div key={idx} className="flex flex-1">
                <Card
                  description={card.description}
                  title={card.title}
                  emoji={card.emoji}
                  className="flex flex-1 flex-col"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* TODO: Setup for translation */}
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

      {/* TODO: Setup for translation */}
      <div id="layer-2-cta" className="w-full px-8 py-9">
        <div className="mx-auto flex max-w-[640px] flex-col gap-6 rounded bg-main-gradient p-8">
          <div className="flex flex-col gap-6">
            {randomL2s.slice(0, 3).map((l2, idx) => {
              return (
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
                      <TwImage
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
              )
            })}
          </div>

          <div className="flex justify-center">
            <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-bold">
              <TwImage
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

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-why-do-we-need-multiple-networks"
        className="w-full px-8 py-9"
      >
        <div className="flex flex-col gap-8 bg-background-highlight px-12 py-12 md:flex-row">
          <div className="flex flex-1 items-center justify-center">
            <TwImage
              src={WalkingImage}
              alt={t("page-layer-2-walking-alt")}
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
                {t("learn-more")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Setup for translation */}
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
            <div className="flex flex-col gap-8">
              <p>
                {t("page-layer-2-faq-ExpandableCard-1-description-1")}{" "}
                <InlineLink href="/layer-2/networks">
                  {t("nav-ethereum-networks")}
                </InlineLink>
                {t("page-layer-2-period")}
              </p>
              <p>{t("page-layer-2-faq-ExpandableCard-1-description-2")}</p>
            </div>
          </ExpandableCard>
          <ExpandableCard
            title={t("page-layer-2-faq-ExpandableCard-2-title")}
            eventCategory="l2_hub"
            eventAction="expand"
            eventName="are all these networks safe"
          >
            <div className="flex flex-col gap-8">
              <p>
                {t("page-layer-2-faq-ExpandableCard-2-description-1")}{" "}
                <InlineLink href="/layer-2/networks">
                  {t("page-layer-2-faq-ExpandableCard-2-link")}
                </InlineLink>
                {t("page-layer-2-period")}
              </p>
              <p>{t("page-layer-2-faq-ExpandableCard-2-description-2")}</p>
            </div>
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

      {/* TODO: Setup for translation */}
      <div
        id="layer-2-callout-cards"
        className="flex w-full flex-col px-8 py-8 md:flex-row"
      >
        <Callout
          image={ExploreImage}
          title={t("page-layer-2-callout-1-title")}
          description={t("page-layer-2-callout-1-description")}
        >
          <div>
            <ButtonLink
              href="/layer-2/networks"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "bottom_explore_networks",
              }}
            >
              {t("nav-networks-explore-networks-label")}
            </ButtonLink>
          </div>
        </Callout>
        <Callout
          image={WalkingImage}
          title={t("page-layer-2-callout-2-title")}
          description={t("page-layer-2-callout-2-description")}
          headerClassName="-mt-6"
        >
          <div>
            <ButtonLink
              href="/layer-2/learn"
              customEventOptions={{
                eventCategory: "l2_hub",
                eventAction: "button_click",
                eventName: "bottom_l2_learn",
              }}
            >
              {t("learn-more")}
            </ButtonLink>
          </div>
        </Callout>
      </div>
    </MainArticle>
  )
}

export default Layer2Hub
