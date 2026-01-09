import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"

import Layer2Page from "./_components/layer-2"
import Layer2PageJsonLD from "./page-jsonld"

import { getGrowThePieData, getL2beatData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data using the new data-layer functions (already cached)
  const [growThePieData, l2beatData] = await Promise.all([
    getGrowThePieData(),
    getL2beatData(),
  ])

  // Handle null cases - throw error if required data is missing
  if (!l2beatData) {
    throw new Error("Failed to fetch L2beat data")
  }

  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
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
