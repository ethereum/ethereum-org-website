import { Fragment } from "react"
import nextDynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type {
  AllHomepageActivityData,
  CommunityBlog,
  PageParams,
  ValuesPairing,
} from "@/lib/types"

import ActivityStats from "@/components/ActivityStats"
import FusakaBanner from "@/components/Banners/FusakaBanner"
import HomeHero from "@/components/Hero/HomeHero"
import { getBentoBoxItems } from "@/components/Homepage/utils"
import MainArticle from "@/components/MainArticle"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"
import { polishRSSList } from "@/lib/utils/rss"

import {
  ATTESTANT_BLOG,
  BASE_TIME_UNIT,
  BLOG_FEEDS,
  BLOGS_WITHOUT_FEED,
  LOCALES_CODES,
  RSS_DISPLAY_COUNT,
} from "@/lib/constants"

import IndexPageJsonLD from "./page-jsonld"
import { getActivity } from "./utils"

import { routing } from "@/i18n/routing"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchApps } from "@/lib/api/fetchApps"
import { fetchBeaconchainEpoch } from "@/lib/api/fetchBeaconchainEpoch"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchAttestantPosts } from "@/lib/api/fetchPosts"
import { fetchRSS } from "@/lib/api/fetchRSS"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import RoadmapFusakaImage from "@/public/images/roadmap/roadmap-fusaka.png"

/* =====================
   Client-only components
   ===================== */

const BentoCardSwiper = nextDynamic(
  () => import("@/components/Homepage/BentoCardSwiper"),
  { ssr: false }
)

const RecentPostsSwiper = nextDynamic(
  () => import("@/components/Homepage/RecentPostsSwiper"),
  { ssr: false }
)

const ValuesMarquee = nextDynamic(
  () => import("@/components/Homepage/ValuesMarquee"),
  { ssr: false }
)

/* =====================
   Data
   ===================== */

const fetchXmlBlogFeeds = async () => {
  const xmlUrls = BLOG_FEEDS.filter((f) => f !== ATTESTANT_BLOG)
  return fetchRSS(xmlUrls)
}

const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["ethPrice", fetchEthPrice],
    ["beaconchainEpoch", fetchBeaconchainEpoch],
    ["totalValueLocked", fetchTotalValueLocked],
    ["growThePieData", fetchGrowThePie],
    ["communityEvents", fetchCommunityEvents],
    ["attestantPosts", fetchAttestantPosts],
    ["rssData", fetchXmlBlogFeeds],
    ["appsData", fetchApps],
  ],
  REVALIDATE_TIME * 1000
)

/* =====================
   Page
   ===================== */

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) notFound()

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "page-index" })
  const tCommon = await getTranslations({ locale, namespace: "common" })
  const { direction: dir } = getDirection(locale)

  const [
    ethPrice,
    { totalEthStaked },
    totalValueLocked,
    growThePieData,
    ,
    attestantPosts,
    xmlBlogs,
  ] = await loadData()

  const bentoItems = await getBentoBoxItems(locale)

  const metricResults: AllHomepageActivityData = {
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    txCount: growThePieData.txCount,
    txCostsMedianUsd: growThePieData.txCostsMedianUsd,
  }

  const metrics = await getActivity(metricResults, locale)

  const rssItems = polishRSSList([attestantPosts, ...xmlBlogs], locale).slice(
    0,
    RSS_DISPLAY_COUNT
  )

  const blogLinks: CommunityBlog[] = rssItems.map(({ source, sourceUrl }) => ({
    name: source,
    href: sourceUrl,
  }))
  blogLinks.push(...BLOGS_WITHOUT_FEED)

  return (
    <>
      <IndexPageJsonLD locale={locale} />
      <MainArticle dir={dir}>
        <FusakaBanner />
        <HomeHero image={RoadmapFusakaImage} alt="Fusaka Hero" />

        <BentoCardSwiper
          bentoItems={bentoItems}
          eventCategory={`Homepage - ${locale}`}
        />

        <ValuesMarquee
          pairings={[] as ValuesPairing[]}
          eventCategory={`Homepage - ${locale}`}
          categoryLabels={{
            ethereum: tCommon("ethereum"),
            legacy: t("page-index-values-legacy"),
          }}
        />

        <ActivityStats metrics={metrics} />

        <RecentPostsSwiper
          rssItems={rssItems}
          eventCategory={`Homepage - ${locale}`}
        />
      </MainArticle>
    </>
  )
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "page-index",
  })

  return getMetadata({
    locale: params.locale,
    slug: [""],
    title: t("page-index-meta-title"),
    description: t("page-index-meta-description"),
  })
}

export default Page
