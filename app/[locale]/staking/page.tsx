import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang, PageParams, StakingStatsData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import StakingPage from "./_components/staking"
import StakingPageJsonLD from "./page-jsonld"

import { getBeaconchainEpochData, getBeaconchainEthstoreData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data using the new data-layer functions (already cached)
  const [beaconchainEpochData, apr] = await Promise.all([
    getBeaconchainEpochData(),
    getBeaconchainEthstoreData(),
  ])

  // Handle null cases - throw error if required data is missing
  if (!beaconchainEpochData) {
    throw new Error("Failed to fetch Beaconchain epoch data")
  }
  if (!apr) {
    throw new Error("Failed to fetch Beaconchain APR data")
  }

  // Extract values from data structures
  const { totalEthStaked, validatorscount } = beaconchainEpochData

  const data: StakingStatsData = {
    totalEthStaked: "value" in totalEthStaked ? totalEthStaked.value : 0,
    validatorscount: "value" in validatorscount ? validatorscount.value : 0,
    apr: "value" in apr ? apr.value : 0,
  }

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/staking")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "staking",
      locale as Lang,
      commitHistoryCache
    )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StakingPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />
      <StakingPage
        data={data}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
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

  const t = await getTranslations({ locale, namespace: "page-staking" })

  return await getMetadata({
    locale,
    slug: ["staking"],
    title: t("page-staking-meta-title"),
    description: t("page-staking-meta-description"),
    image: "/images/upgrades/upgrade_rhino.png",
  })
}

export default Page
