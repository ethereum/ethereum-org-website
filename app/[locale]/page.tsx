import { Fragment } from "react"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type {
  AllHomepageActivityData,
  CommunityBlog,
  ValuesPairing,
} from "@/lib/types"
import type { EventCardProps } from "@/lib/types"
import type { Lang } from "@/lib/types"
import { CodeExample } from "@/lib/interfaces"

import ActivityStats from "@/components/ActivityStats"
import BannerNotification from "@/components/Banners/BannerNotification"
import { ChevronNext } from "@/components/Chevron"
import HomeHero from "@/components/Hero/HomeHero"
import BentoCard from "@/components/Homepage/BentoCard"
import CodeExamples from "@/components/Homepage/CodeExamples"
import { getBentoBoxItems } from "@/components/Homepage/utils"
import ValuesMarqueeFallback from "@/components/Homepage/ValuesMarquee/Fallback"
import BlockHeap from "@/components/icons/block-heap.svg"
import BuildAppsIcon from "@/components/icons/build-apps.svg"
import Calendar from "@/components/icons/calendar.svg"
import CalendarAdd from "@/components/icons/calendar-add.svg"
import Discord from "@/components/icons/discord.svg"
import EthGlyphIcon from "@/components/icons/eth-glyph.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import PickWalletIcon from "@/components/icons/eth-wallet.svg"
import Github from "@/components/icons/github.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import RoadmapSign from "@/components/icons/roadmap-sign.svg"
import Twitter from "@/components/icons/twitter.svg"
import Whitepaper from "@/components/icons/whitepaper.svg"
import { Image } from "@/components/Image"
import CardImage from "@/components/Image/CardImage"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import SvgButtonLink, {
  type SvgButtonLinkProps,
} from "@/components/ui/buttons/SvgButtonLink"
import {
  Card,
  CardBanner,
  CardContent,
  CardHighlight,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"
import Link from "@/components/ui/Link"
import {
  Section,
  SectionBanner,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "@/components/ui/section"
import { Skeleton, SkeletonCardGrid } from "@/components/ui/skeleton"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { isValidDate } from "@/lib/utils/date"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"
import { polishRSSList } from "@/lib/utils/rss"

import events from "@/data/community-events.json"
import CreateWalletContent from "@/data/CreateWallet"

import {
  ATTESTANT_BLOG,
  BASE_TIME_UNIT,
  BLOG_FEEDS,
  BLOGS_WITHOUT_FEED,
  CALENDAR_DISPLAY_COUNT,
  DEFAULT_LOCALE,
  GITHUB_REPO_URL,
  LOCALES_CODES,
  RSS_DISPLAY_COUNT,
} from "@/lib/constants"

import TenYearHomeBanner from "./10years/_components/TenYearHomeBanner"
import { getActivity } from "./utils"

import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { routing } from "@/i18n/routing"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchAttestantPosts } from "@/lib/api/fetchPosts"
import { fetchRSS } from "@/lib/api/fetchRSS"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import EventFallback from "@/public/images/events/event-placeholder.png"
import BuildersImage from "@/public/images/heroes/developers-hub-hero.jpg"
import ActivityImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import LearnImage from "@/public/images/heroes/learn-hub-hero.png"
import CommunityImage from "@/public/images/heroes/quizzes-hub-hero.png"
import Hero from "@/public/images/home/hero.png"

const BentoCardSwiper = dynamic(
  () => import("@/components/Homepage/BentoCardSwiper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="mx-auto mt-4 h-[476px] w-[512px] max-w-128 rounded-2xl border-primary/10 bg-background bg-gradient-to-b from-primary/10 from-20% to-primary/5 to-60% p-4 opacity-50 shadow-card-hover lg:hidden dark:from-primary/20 dark:to-primary/10" />
        <Skeleton className="h-6 w-[12rem] rounded-full" />
      </div>
    ),
  }
)

const RecentPostsSwiper = dynamic(
  () => import("@/components/Homepage/RecentPostsSwiper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4">
        <SkeletonCardGrid className="mt-4 w-full md:mt-16" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
    ),
  }
)

const ValuesMarquee = dynamic(
  () => import("@/components/Homepage/ValuesMarquee"),
  {
    ssr: false,
    loading: () => <ValuesMarqueeFallback />,
  }
)

const fetchXmlBlogFeeds = async () => {
  const xmlUrls = BLOG_FEEDS.filter((feed) => ![ATTESTANT_BLOG].includes(feed))
  return await fetchRSS(xmlUrls)
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["ethPrice", fetchEthPrice],
    ["totalEthStaked", fetchTotalEthStaked],
    ["totalValueLocked", fetchTotalValueLocked],
    ["growThePieData", fetchGrowThePie],
    ["communityEvents", fetchCommunityEvents],
    ["attestantPosts", fetchAttestantPosts],
    ["rssData", fetchXmlBlogFeeds],
  ],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "page-index" })
  const tCommon = await getTranslations({ locale, namespace: "common" })
  const { direction: dir, isRtl } = getDirection(locale)

  const [
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    growThePieData,
    communityEvents,
    attestantPosts,
    xmlBlogs,
  ] = await loadData()

  const bentoItems = await getBentoBoxItems(locale)

  const eventCategory = `Homepage - ${locale}`

  const subHeroCTAs = [
    {
      label: t("page-index-cta-wallet-label"),
      description: t("page-index-cta-wallet-description"),
      href: "/wallets/find-wallet/",
      Svg: PickWalletIcon,
      className: "text-primary hover:text-primary-hover",
      eventName: "find wallet",
    },
    {
      label: t("page-index-cta-get-eth-label"),
      description: t("page-index-cta-get-eth-description"),
      href: "/get-eth/",
      Svg: EthTokenIcon,
      className: "text-accent-a hover:text-accent-a-hover",
      eventName: "get eth",
    },
    {
      label: t("page-index-cta-dapps-label"),
      description: t("page-index-cta-dapps-description"),
      href: "/dapps/",
      Svg: TryAppsIcon,
      className: cn(
        "text-accent-c hover:text-accent-c-hover",
        isRtl && "[&_svg]:-scale-x-100"
      ),
      eventName: "dapps",
    },
    {
      label: t("page-index-cta-build-apps-label"),
      description: t("page-index-cta-build-apps-description"),
      href: "/developers/",
      Svg: BuildAppsIcon,
      className: "text-accent-b hover:text-accent-b-hover",
      eventName: "build apps",
    },
  ]

  const popularTopics = [
    {
      label: t("page-index-popular-topics-ethereum"),
      Svg: EthTokenIcon,
      href: "/what-is-ethereum/",
      eventName: "ethereum",
    },
    {
      label: t("page-index-popular-topics-wallets"),
      Svg: PickWalletIcon,
      href: "/wallets/",
      eventName: "wallets",
    },
    {
      label: t("page-index-popular-topics-start"),
      Svg: BlockHeap,
      href: "/guides/",
      eventName: "start guides",
    },
    {
      label: t("page-index-popular-topics-whitepaper"),
      Svg: Whitepaper,
      className: cn(isRtl && "[&_div_div:has(svg)]:-scale-x-100"),
      href: "/whitepaper/",
      eventName: "whitepaper",
    },
    {
      label: t("page-index-popular-topics-roadmap"),
      Svg: RoadmapSign,
      className: cn(isRtl && "[&_div_div:has(svg)]:-scale-x-100 "),
      href: "/roadmap/",
      eventName: "roadmap",
    },
  ]

  const valuesPairings: ValuesPairing[] = [
    {
      legacy: {
        label: t("page-index-values-ownership-legacy-label"),
        content: [
          t("page-index-values-ownership-legacy-content-0"),
          t("page-index-values-ownership-legacy-content-1"),
        ],
      },
      ethereum: {
        label: t("page-index-values-ownership-ethereum-label"),
        content: [t("page-index-values-ownership-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-fairness-legacy-label"),
        content: [t("page-index-values-fairness-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-fairness-ethereum-label"),
        content: [t("page-index-values-fairness-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-privacy-legacy-label"),
        content: [
          t("page-index-values-privacy-legacy-content-0"),
          t("page-index-values-privacy-legacy-content-1"),
        ],
      },
      ethereum: {
        label: t("page-index-values-privacy-ethereum-label"),
        content: [t("page-index-values-privacy-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-integration-legacy-label"),
        content: [t("page-index-values-integration-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-integration-ethereum-label"),
        content: [t("page-index-values-integration-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-decentralization-legacy-label"),
        content: [t("page-index-values-decentralization-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-decentralization-ethereum-label"),
        content: [t("page-index-values-decentralization-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-censorship-legacy-label"),
        content: [t("page-index-values-censorship-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-censorship-ethereum-label"),
        content: [
          t("page-index-values-censorship-ethereum-content-0"),
          t("page-index-values-censorship-ethereum-content-1"),
        ],
      },
    },
    {
      legacy: {
        label: t("page-index-values-open-legacy-label"),
        content: [t("page-index-values-open-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-open-ethereum-label"),
        content: [t("page-index-values-open-ethereum-content-0")],
      },
    },
  ]

  const codeExamples: CodeExample[] = [
    {
      title: t("page-index-developers-code-example-title-0"),
      description: t("page-index-developers-code-example-description-0"),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
      eventName: "bank",
    },
    {
      title: t("page-index-developers-code-example-title-1"),
      description: t("page-index-developers-code-example-description-1"),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
      eventName: "token",
    },
    {
      title: t("page-index-developers-code-example-title-2"),
      description: t("page-index-developers-code-example-description-2"),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
      eventName: "wallet",
    },
    {
      title: t("page-index-developers-code-example-title-3"),
      description: t("page-index-developers-code-example-description-3"),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
      eventName: "dns",
    },
  ]

  const joinActions = [
    {
      Svg: EthGlyphIcon,
      label: t("page-index-join-action-contribute-label"),
      href: "/contributing/",
      className: "text-accent-c hover:text-accent-c-hover",
      description: t("page-index-join-action-contribute-description"),
      eventName: "contribute",
    },
    {
      Svg: Github,
      label: "GitHub",
      href: GITHUB_REPO_URL,
      className: "text-accent-a hover:text-accent-a-hover",
      description: t("page-index-join-action-github-description"),
      eventName: "GitHub",
    },
    {
      Svg: Discord,
      label: "Discord",
      href: "/discord/",
      className: "text-primary hover:text-primary-hover",
      description: t("page-index-join-action-discord-description"),
      eventName: "Discord",
    },
    {
      Svg: Twitter,
      label: "X",
      href: "https://x.com/EthDotOrg",
      className: "text-accent-b hover:text-accent-b-hover",
      description: t("page-index-join-action-twitter-description"),
      eventName: "Twitter",
    },
  ]

  const upcomingEvents = events
    .filter((event) => {
      const isValid = isValidDate(event.endDate)
      const beginningOfEndDate = new Date(event.endDate).getTime()
      const endOfEndDate = beginningOfEndDate + 24 * 60 * 60 * 1000
      const isUpcoming = endOfEndDate >= new Date().getTime()
      return isValid && isUpcoming
    })
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 3) as EventCardProps[] // Show 3 events ending soonest

  const metricResults: AllHomepageActivityData = {
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    txCount: growThePieData.txCount,
    txCostsMedianUsd: growThePieData.txCostsMedianUsd,
  }
  const metrics = await getActivity(metricResults, locale)

  const calendar = communityEvents.upcomingEventData
    .sort((a, b) => {
      const dateA = isValidDate(a.date) ? new Date(a.date).getTime() : -Infinity
      const dateB = isValidDate(b.date) ? new Date(b.date).getTime() : -Infinity
      return dateA - dateB
    })
    .slice(0, CALENDAR_DISPLAY_COUNT)

  // RSS feed items
  const polishedRssItems = polishRSSList([attestantPosts, ...xmlBlogs], locale)
  const rssItems = polishedRssItems.slice(0, RSS_DISPLAY_COUNT)

  const blogLinks = polishedRssItems.map(({ source, sourceUrl }) => ({
    name: source,
    href: sourceUrl,
  })) as CommunityBlog[]
  blogLinks.push(...BLOGS_WITHOUT_FEED)

  return (
    <MainArticle className="flex w-full flex-col items-center" dir={dir}>
      <BannerNotification shouldShow={locale === DEFAULT_LOCALE}>
        <p>
          10 years of Ethereum! -{" "}
          <Link href="/10years/" className="text-white">
            Join us to celebrate 10 years of Ethereum!
          </Link>
        </p>
      </BannerNotification>
      <HomeHero heroImg={Hero} className="w-full" locale={locale} />
      <div className="w-full space-y-32 px-4 md:mx-6 lg:space-y-48">
        <div className="my-20 grid w-full grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-10">
          {subHeroCTAs.map(
            ({ label, description, href, className, Svg }, idx) => {
              const Link = (
                props: Omit<
                  SvgButtonLinkProps,
                  "Svg" | "href" | "label" | "children"
                >
              ) => (
                <SvgButtonLink
                  Svg={Svg}
                  href={href}
                  label={label}
                  customEventOptions={{
                    eventCategory,
                    eventAction: "Top 4 CTAs",
                    eventName: subHeroCTAs[idx].eventName,
                  }}
                  {...props}
                >
                  <p className="text-body">{description}</p>
                </SvgButtonLink>
              )
              return (
                <Fragment key={label}>
                  <Link className={cn("xl:hidden", className)} variant="col" />
                  <Link
                    className={cn("hidden xl:block", className)}
                    variant="row"
                  />
                </Fragment>
              )
            }
          )}
        </div>

        {/* Use Cases - A new way to use the internet */}
        <Section
          id="use"
          className={cn(
            "max-lg:-mx-4 max-lg:flex max-lg:w-[100vw] max-lg:flex-col max-lg:overflow-hidden max-lg:px-4 sm:max-lg:-mx-6 sm:max-lg:px-6", // Mobile: Swiper cards
            "lg:grid lg:grid-cols-bento lg:gap-4" // Desktop: BentoBox grid
          )}
        >
          <div
            className={cn(
              "flex flex-col",
              "lg:col-span-12 xl:col-span-3 xl:col-start-2"
            )}
          >
            <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
              {t("page-index-use-cases-tag")}
            </div>
            <h2 className="mb-4 me-4 mt-2 text-5xl font-black xl:mb-6 xl:text-7xl">
              {t("page-index-bento-header")}
            </h2>
          </div>

          {/* Mobile - dynamic / lazy loaded */}
          <BentoCardSwiper
            bentoItems={bentoItems}
            eventCategory={eventCategory}
          />

          {/* Desktop */}
          {bentoItems.map(({ className, ...item }) => (
            <BentoCard
              key={item.title}
              {...item}
              className={cn(className, "max-lg:hidden")} // Desktop only
              eventCategory={eventCategory}
            />
          ))}
        </Section>

        {/* Activity - The strongest ecosystem */}
        <Section id="activity" variant="responsiveFlex">
          <SectionBanner>
            <Image src={ActivityImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index-activity-tag")}</SectionTag>
            <SectionHeader>{t("page-index-activity-header")}</SectionHeader>
            <div className="py-16 lg:py-32">
              <p className="mt-8 text-xl font-bold">
                {t("page-index-activity-description")}
              </p>
              <ActivityStats metrics={metrics} />

              <div className="mt-12 flex flex-wrap gap-6 py-8">
                <ButtonLink
                  size="lg"
                  href="/enterprise/"
                  customEventOptions={{
                    eventCategory: eventCategory,
                    eventAction: "ethereum_activity",
                    eventName: "enterprise",
                  }}
                >
                  {t("page-index-activity-action-primary")} <ChevronNext />
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="/resources/"
                  isSecondary
                  variant="outline"
                  customEventOptions={{
                    eventCategory: eventCategory,
                    eventAction: "ethereum_activity",
                    eventName: "ethereum_activity",
                  }}
                >
                  {t("page-index-activity-action")} <ChevronNext />
                </ButtonLink>
              </div>
            </div>
          </SectionContent>
        </Section>

        {/* Learn - Understand Ethereum */}
        <Section
          id="learn"
          variant="responsiveFlex"
          className="md:flex-row-reverse"
        >
          <SectionBanner>
            <Image src={LearnImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index-learn-tag")}</SectionTag>
            <SectionHeader>{t("page-index-learn-header")}</SectionHeader>
            <div className="flex flex-col gap-y-16 lg:gap-y-32">
              <p className="text-lg">{t("page-index-learn-description")}</p>
              <div className="flex flex-col gap-y-8">
                <h3 className="text-xl font-bold">
                  {t("page-index-popular-topics-header")}
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {popularTopics.map(
                    ({ label, Svg, href, eventName, className }) => (
                      <SvgButtonLink
                        key={label}
                        Svg={Svg}
                        href={href}
                        className={cn(
                          "text-accent-b hover:text-accent-b-hover [&>:first-child]:flex-row",
                          className
                        )}
                        customEventOptions={{
                          eventCategory,
                          eventAction: "popular topics",
                          eventName,
                        }}
                      >
                        <p className="text-start text-xl font-bold text-body group-hover:underline">
                          {label}
                        </p>
                      </SvgButtonLink>
                    )
                  )}
                </div>
                <div className="flex py-8 sm:justify-center">
                  <ButtonLink
                    href="/learn/"
                    size="lg"
                    variant="outline"
                    isSecondary
                    className="max-sm:self-start"
                    customEventOptions={{
                      eventCategory,
                      eventAction: "learn",
                      eventName: "learn",
                    }}
                  >
                    {t("page-index-popular-topics-action")} <ChevronNext />
                  </ButtonLink>
                </div>
              </div>
            </div>{" "}
          </SectionContent>
        </Section>

        {/* Values - The Internet Is Changing */}
        <Section id="values" className="!sm:my-64 !my-48 scroll-m-48">
          <SectionContent className="flex flex-col items-center text-center">
            <SectionTag>{t("page-index-values-tag")}</SectionTag>
            <SectionHeader>{t("page-index-values-header")}</SectionHeader>
            <p className="text-lg text-body-medium">
              {t("page-index-values-description")}
            </p>
          </SectionContent>

          {/* dynamic / lazy loaded */}
          <ValuesMarquee
            pairings={valuesPairings}
            eventCategory={eventCategory}
            categoryLabels={{
              ethereum: tCommon("ethereum"),
              legacy: t("page-index-values-legacy"),
            }}
          />
        </Section>

        {/* Builders - Blockchain's biggest builder community */}
        <Section id="builders" variant="responsiveFlex">
          <SectionBanner className="relative">
            <Image src={BuildersImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index-builders-tag")}</SectionTag>
            <SectionHeader>{t("page-index-builders-header")}</SectionHeader>
            <p className="text-lg">{t("page-index-builders-description")}</p>
            <div className="flex flex-wrap gap-6 py-8">
              <ButtonLink
                href="/developers/"
                size="lg"
                className="w-fit"
                customEventOptions={{
                  eventCategory,
                  eventAction: "builders",
                  eventName: "developers",
                }}
              >
                {t("page-index-builders-action-primary")} <ChevronNext />
              </ButtonLink>
              <ButtonLink
                href="/developers/docs/"
                size="lg"
                variant="outline"
                isSecondary
                className="w-fit"
                customEventOptions={{
                  eventCategory,
                  eventAction: "builders",
                  eventName: "dev docs",
                }}
              >
                {t("page-index-builders-action-secondary")}
              </ButtonLink>
            </div>
            <div className="py-8 md:pb-16 md:pt-8 lg:pb-32 lg:pt-16">
              {/* CLIENT SIDE */}
              <CodeExamples
                title={t("page-index-developers-code-examples")}
                codeExamples={codeExamples}
                eventCategory={eventCategory}
              />
            </div>
          </SectionContent>
        </Section>

        {/* Ethereum.org community - Built by the community */}
        <Section
          id="community"
          variant="responsiveFlex"
          className="md:flex-row-reverse"
        >
          <SectionBanner>
            <Image src={CommunityImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index-community-tag")}</SectionTag>
            <SectionHeader>{t("page-index-community-header")}</SectionHeader>
            <div className="mt-8 flex flex-col gap-8 text-lg">
              <p>{t("page-index-community-description-1")}</p>
              <p>{t("page-index-community-description-2")}</p>
              <p>{t("page-index-community-description-3")}</p>
            </div>
            <div className="flex flex-wrap gap-3 py-8">
              <ButtonLink
                href="/community/"
                size="lg"
                customEventOptions={{
                  eventCategory,
                  eventAction: "community",
                  eventName: "community",
                }}
              >
                {t("page-index-community-action")} <ChevronNext />
              </ButtonLink>
              <div className="flex gap-3">
                <ButtonLink
                  href="/discord/"
                  size="lg"
                  variant="outline"
                  isSecondary
                  hideArrow
                  customEventOptions={{
                    eventCategory,
                    eventAction: "community",
                    eventName: "discord",
                  }}
                >
                  <Discord />
                </ButtonLink>
                <ButtonLink
                  href={GITHUB_REPO_URL}
                  size="lg"
                  variant="outline"
                  isSecondary
                  hideArrow
                  customEventOptions={{
                    eventCategory,
                    eventAction: "community",
                    eventName: "github",
                  }}
                >
                  <Github />
                </ButtonLink>
              </div>
            </div>
            <div className="py-8 md:pt-8 lg:pt-16">
              <WindowBox title={t("page-index-calendar-title")} Svg={Calendar}>
                {calendar.length > 0 ? (
                  calendar.map(({ date, title, calendarLink }) => {
                    const customEventOptions = {
                      eventCategory,
                      eventAction: "Community Events Widget",
                      eventName: "upcoming",
                    }
                    return (
                      <div
                        key={title + date}
                        className="flex flex-col justify-between gap-6 border-t px-6 py-4 xl:flex-row"
                      >
                        <div className="flex flex-col gap-y-0.5 text-center text-base sm:text-start">
                          <Link
                            href={calendarLink}
                            className="text-sm font-bold text-body no-underline hover:underline"
                            customEventOptions={customEventOptions}
                            hideArrow
                          >
                            {title}
                          </Link>
                          <p className="italic text-body-medium">
                            {new Intl.DateTimeFormat(locale, {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }).format(new Date(date))}
                          </p>
                        </div>
                        <ButtonLink
                          className="h-fit w-full text-nowrap px-5 sm:w-fit xl:self-center"
                          size="md"
                          variant="ghost"
                          href={calendarLink}
                          hideArrow
                          customEventOptions={customEventOptions}
                        >
                          <CalendarAdd /> {t("page-index-calendar-add")}
                        </ButtonLink>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex flex-col justify-between gap-6 border-t px-6 py-4 lg:flex-row">
                    {t("page-index-calendar-fallback")}
                  </div>
                )}
              </WindowBox>
            </div>
          </SectionContent>
        </Section>

        <Section
          id="10-year-anniversary"
          className={cn(locale !== "en" && "hidden")} // TODO: Show again when translations ready
        >
          <TenYearHomeBanner />
        </Section>

        {/* Recent posts */}
        <Section id="recent">
          <h3 className="mb-4 mt-2 text-4xl font-black lg:text-5xl">
            {t("page-index-posts-header")}
          </h3>
          <p>{t("page-index-posts-subtitle")}</p>

          {/* dynamic / lazy loaded */}
          <RecentPostsSwiper
            className="mt-4 md:mt-16"
            rssItems={rssItems}
            eventCategory={eventCategory}
          />

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border p-8">
            <p className="text-lg">{t("page-index-posts-action")}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {blogLinks.map(({ name, href }) => (
                <Link
                  href={href}
                  key={name}
                  customEventOptions={{
                    eventCategory,
                    eventAction: "blogs_read_more",
                    eventName: name!,
                  }}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* Events */}
        <Section id="events">
          <h3 className="mb-4 mt-2 text-4xl font-black lg:text-5xl">
            {t("page-index-events-header")}
          </h3>
          <p>{t("page-index-events-subtitle")}</p>
          <div className="mt-4 md:mt-16">
            <div className="grid grid-cols-1 gap-8 self-stretch sm:grid-cols-2 md:grid-cols-3">
              {upcomingEvents.map(
                (
                  {
                    title,
                    href,
                    location,
                    description,
                    startDate,
                    endDate,
                    imageUrl,
                  },
                  idx
                ) => (
                  <Card
                    key={title + description}
                    href={href}
                    className={cn(
                      idx === 0 && "col-span-1 sm:col-span-2 md:col-span-1"
                    )}
                    customEventOptions={{
                      eventCategory,
                      eventAction: "posts",
                      eventName: title,
                    }}
                  >
                    <CardBanner>
                      {imageUrl ? (
                        <CardImage
                          src={imageUrl}
                          className="max-w-full object-cover object-center"
                        />
                      ) : (
                        <Image src={EventFallback} alt="" />
                      )}
                      <Image src={EventFallback} alt="" />
                    </CardBanner>
                    <CardContent>
                      <CardTitle>{title}</CardTitle>
                      <CardSubTitle>
                        {(isValidDate(startDate) || isValidDate(endDate)) &&
                          new Intl.DateTimeFormat(locale, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).formatRange(
                            new Date(
                              isValidDate(startDate) ? startDate : endDate
                            ),
                            new Date(isValidDate(endDate) ? endDate : startDate)
                          )}
                      </CardSubTitle>
                      <CardHighlight>{location}</CardHighlight>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
          <div className="flex py-8 sm:justify-center">
            <ButtonLink
              href="/community/events/"
              size="lg"
              customEventOptions={{
                eventCategory,
                eventAction: "events",
                eventName: "community events",
              }}
            >
              {t("page-index-events-action")} <ChevronNext />
            </ButtonLink>
          </div>
        </Section>

        {/* Join ethereum.org */}
        <Section
          id="join"
          className={cn(
            "before:absolute before:-inset-px before:bottom-0 before:z-hide before:rounded-[calc(theme(borderRadius.4xl)+1px)] before:content-['']", // Border/gradient positioning
            "before:bg-gradient-to-b before:from-primary-hover/[0.24] before:to-primary-hover/[0.08] before:dark:from-primary-hover/40 before:dark:to-primary-hover/20", // Border/gradient coloring
            "relative inset-0 rounded-4xl bg-background" // Paint background color over card portion
          )}
        >
          <div className="mb-12 flex flex-col gap-y-8 rounded-4xl bg-radial-a px-8 py-12 lg:mb-32 xl:mb-36">
            <div className="flex flex-col gap-y-4 text-center">
              <h2>{t("page-index-join-header")}</h2>
              <p>{t("page-index-join-description")}</p>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
              {joinActions.map(
                ({ Svg, label, href, className, description, eventName }) => (
                  <SvgButtonLink
                    key={label}
                    Svg={Svg}
                    label={label}
                    href={href}
                    className={cn("max-w-screen-sm", className)}
                    variant="row"
                    customEventOptions={{
                      eventCategory,
                      eventAction: "join",
                      eventName,
                    }}
                  >
                    <p className="text-body">{description}</p>
                  </SvgButtonLink>
                )
              )}
            </div>
          </div>
        </Section>
      </div>
    </MainArticle>
  )
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  try {
    const t = await getTranslations({ locale, namespace: "page-index" })
    return await getMetadata({
      locale,
      slug: [""],
      title: t("page-index-meta-title"),
      description: t("page-index-meta-description"),
    })
  } catch (error) {
    const t = await getTranslations({
      locale: DEFAULT_LOCALE,
      namespace: "common",
    })

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default Page
