import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getExternalData } from "@/lib/utils/data/refactor/getExternalData"
import { processGrowThePieData } from "@/lib/utils/layer-2"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"

import { BASE_TIME_UNIT } from "@/lib/constants"

import Layer2Page from "./_components/layer-2"
import Layer2PageJsonLD from "./page-jsonld"

import { routing } from "@/i18n/routing"
import { fetchL2beat } from "@/lib/api/fetchL2beat"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [["l2beatData", fetchL2beat]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  const [l2beatData] = await loadData()

  // Fetch hourly data (growThePie) with 1-hour revalidation
  const hourlyData = await getExternalData(["growThePie"], 3600)

  // Extract and process growThePie data from hourly data
  const growThePieDataRaw = hourlyData?.growThePie as
    | {
        value: Array<{
          metric_key: string
          origin_key: string
          date: string
          value: number
        }>
      }
    | { error: string }
    | undefined
  const growThePieData =
    growThePieDataRaw && "value" in growThePieDataRaw
      ? processGrowThePieData(growThePieDataRaw.value)
      : {
          txCount: { value: 0, timestamp: Date.now() },
          txCostsMedianUsd: { value: 0, timestamp: Date.now() },
          dailyTxCosts: {} as Record<string, number | undefined>,
          activeAddresses: {} as Record<string, number | undefined>,
        }

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
