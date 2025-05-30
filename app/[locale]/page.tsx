import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { AllMetricData, CommunityBlog, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { isValidDate } from "@/lib/utils/date"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { pick } from "@/lib/utils/lodash"
import { getMetadata } from "@/lib/utils/metadata"
import { polishRSSList } from "@/lib/utils/rss"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  BASE_TIME_UNIT,
  BLOG_FEEDS,
  BLOGS_WITHOUT_FEED,
  CALENDAR_DISPLAY_COUNT,
  RSS_DISPLAY_COUNT,
} from "@/lib/constants"

import HomePage from "./_components/home"

import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchAttestantPosts } from "@/lib/api/fetchPosts"
import { fetchRSS } from "@/lib/api/fetchRSS"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"

// API calls
const fetchXmlBlogFeeds = async () => {
  return await fetchRSS(BLOG_FEEDS)
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

  setRequestLocale(locale)

  const [
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    growThePieData,
    communityEvents,
    attestantPosts,
    xmlBlogs,
  ] = await loadData()

  const metricResults: AllMetricData = {
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    txCount: growThePieData.txCount,
    txCostsMedianUsd: growThePieData.txCostsMedianUsd,
  }

  const calendar = communityEvents.upcomingEventData
    .sort((a, b) => {
      const dateA = isValidDate(a.date) ? new Date(a.date).getTime() : -Infinity
      const dateB = isValidDate(b.date) ? new Date(b.date).getTime() : -Infinity
      return dateA - dateB
    })
    .slice(0, CALENDAR_DISPLAY_COUNT)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/")
  const messages = pick(allMessages, requiredNamespaces)

  // check if the translated page content file exists for locale
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  // load last deploy date to pass to Footer in RootLayout
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  // RSS feed items
  const polishedRssItems = polishRSSList(attestantPosts, ...xmlBlogs)
  const rssItems = polishedRssItems.slice(0, RSS_DISPLAY_COUNT)

  const blogLinks = polishedRssItems.map(({ source, sourceUrl }) => ({
    name: source,
    href: sourceUrl,
  })) as CommunityBlog[]
  blogLinks.push(...BLOGS_WITHOUT_FEED)

  const props = {
    calendar,
    contentNotTranslated,
    lastDeployLocaleTimestamp,
    metricResults,
    rssData: { rssItems, blogLinks },
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <HomePage {...props} />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-index" })

  return await getMetadata({
    locale,
    slug: [""],
    title: t("page-index-meta-title"),
    description: t("page-index-meta-description"),
  })
}

export default Page
