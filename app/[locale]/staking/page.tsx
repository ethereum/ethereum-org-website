import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { BeaconchainEpochData, MetricReturnData } from "@/lib/types"
import { CommitHistory, Lang, PageParams, StakingStatsData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { FETCH_BEACONCHAIN_EPOCH_TASK_ID } from "@/data-layer/api/fetchBeaconChainEpoch"
import { FETCH_BEACONCHAIN_ETHSTORE_TASK_ID } from "@/data-layer/api/fetchBeaconChainEthstore"
import { getCachedData } from "@/data-layer/storage/cachedGetter"

import { BASE_TIME_UNIT } from "@/lib/constants"

import StakingPage from "./_components/staking"
import StakingPageJsonLD from "./page-jsonld"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data from data layer with Next.js caching
  const [beaconchainEpochResult, aprResult] = await Promise.all([
    getCachedData<BeaconchainEpochData>(
      FETCH_BEACONCHAIN_EPOCH_TASK_ID,
      REVALIDATE_TIME
    ),
    getCachedData<MetricReturnData>(
      FETCH_BEACONCHAIN_ETHSTORE_TASK_ID,
      REVALIDATE_TIME
    ),
  ])

  // Handle missing data gracefully
  const totalEthStaked =
    beaconchainEpochResult?.totalEthStaked &&
    "value" in beaconchainEpochResult.totalEthStaked
      ? beaconchainEpochResult.totalEthStaked.value
      : 0
  const validatorscount =
    beaconchainEpochResult?.validatorscount &&
    "value" in beaconchainEpochResult.validatorscount
      ? beaconchainEpochResult.validatorscount.value
      : 0
  const apr = aprResult && "value" in aprResult ? aprResult.value : 0

  const data: StakingStatsData = {
    totalEthStaked,
    validatorscount,
    apr,
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
