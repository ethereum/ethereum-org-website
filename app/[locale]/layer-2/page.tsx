import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type {
  CommitHistory,
  GrowThePieRawDataItem,
  L2beatResponse,
  Lang,
  PageParams,
} from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getExternalData } from "@/lib/utils/data/getExternalData"
import { processGrowThePieData } from "@/lib/utils/layer-2"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { every } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"

import Layer2Page from "./_components/layer-2"
import Layer2PageJsonLD from "./page-jsonld"

import { routing } from "@/i18n/routing"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch hourly data (growThePie and l2beat) with 1-hour revalidation
  const { growThePie: growThePieResponse, l2beatData: l2beatResponse } =
    (await getExternalData(["growThePie", "l2beatData"], every("hour"))) || {}

  // Extract and process growThePie data
  const growThePieDataRaw =
    growThePieResponse && "value" in growThePieResponse
      ? (growThePieResponse.value as GrowThePieRawDataItem[])
      : null
  const growThePieData = growThePieDataRaw
    ? processGrowThePieData(growThePieDataRaw)
    : {
        txCount: { value: 0, timestamp: Date.now() },
        txCostsMedianUsd: { value: 0, timestamp: Date.now() },
        dailyTxCosts: {} as Record<string, number | undefined>,
        activeAddresses: {} as Record<string, number | undefined>,
      }

  // Extract L2beat data
  const l2beatData =
    l2beatResponse && "value" in l2beatResponse
      ? (l2beatResponse.value as L2beatResponse)
      : null

  const getRandomL2s = () => {
    if (!l2beatData)
      return layer2Data.sort(() => 0.5 - Math.random()).slice(0, 3)

    let randomL2s = layer2Data.filter((network) => {
      const project = l2beatData.projects[network.l2beatID]
      return project && networkMaturity(project) === "robust"
    })

    if (randomL2s.length === 0) {
      randomL2s = layer2Data.filter((network) => {
        const project = l2beatData.projects[network.l2beatID]
        return project && networkMaturity(project) === "maturing"
      })
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
