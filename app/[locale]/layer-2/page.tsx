import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"
import type { GrowThePieData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"
import { FETCH_GROW_THE_PIE_TASK_ID } from "@/data-layer/api/fetchGrowThePie"
import { FETCH_L2BEAT_TASK_ID } from "@/data-layer/api/fetchL2beat"
import { getCachedData } from "@/data-layer/storage/cachedGetter"

import { BASE_TIME_UNIT } from "@/lib/constants"

import Layer2Page from "./_components/layer-2"
import Layer2PageJsonLD from "./page-jsonld"

import { routing } from "@/i18n/routing"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data from data layer with Next.js caching
  const [growThePieDataResult, l2beatDataResult] = await Promise.all([
    getCachedData<GrowThePieData>(FETCH_GROW_THE_PIE_TASK_ID, REVALIDATE_TIME),
    getCachedData<{
      projects: Record<
        string,
        {
          stage?: string
          tvl?: { total: number }
          risks?: Array<{ name: string; sentiment: string }>
        }
      >
    }>(FETCH_L2BEAT_TASK_ID, REVALIDATE_TIME),
  ])

  // Handle missing data gracefully
  const growThePieData = growThePieDataResult || {
    dailyTxCosts: {},
    activeAddresses: {},
    txCount: { value: 0, timestamp: Date.now() },
    txCostsMedianUsd: { value: 0, timestamp: Date.now() },
  }
  const l2beatData = l2beatDataResult || { projects: {} }

  const getRandomL2s = () => {
    let randomL2s = layer2Data.filter(
      (network) =>
        networkMaturity(l2beatData.projects[network.l2beatID]) === "robust"
    )

    if (randomL2s.length === 0) {
      randomL2s = layer2Data.filter(
        (network) =>
          networkMaturity(l2beatData.projects[network.l2beatID]) === "maturing"
      )
    }

    return randomL2s.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const randomL2s = layer2Data.sort(() => 0.5 - Math.random()).slice(0, 9)

  const userRandomL2s = getRandomL2s()

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "layer-2",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Layer2PageJsonLD locale={locale} contributors={contributors} />
      <Layer2Page
        randomL2s={randomL2s}
        userRandomL2s={userRandomL2s}
        growThePieData={growThePieData}
        locale={locale}
      />
    </I18nProvider>
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
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-layer-2" })

  return await getMetadata({
    locale,
    slug: ["layer-2"],
    title: t("page-layer-2-meta-title"),
    description: t("page-layer-2-meta-description"),
    image: "/images/layer-2/learn-hero.png",
  })
}

export default Page
