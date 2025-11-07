import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang, PageParams, StakingStatsData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  extractNestedValue,
  extractValue,
} from "@/lib/utils/data/extractExternalData"
import { getExternalData } from "@/lib/utils/data/getExternalData"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import StakingPage from "./_components/staking"
import StakingPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch hourly data (beaconchain epoch and APR) with 1-hour revalidation
  const hourlyData = await getExternalData(
    ["beaconchainEpoch", "beaconchainApr"],
    3600
  )

  // Extract beaconchain epoch data
  const totalEthStaked = extractNestedValue(
    hourlyData,
    "beaconchainEpoch",
    "totalEthStaked",
    0
  )
  const validatorscount = extractNestedValue(
    hourlyData,
    "beaconchainEpoch",
    "validatorscount",
    0
  )

  // Extract APR data
  const apr = extractValue(hourlyData, "beaconchainApr", 0)

  const data: StakingStatsData = {
    totalEthStaked:
      "value" in totalEthStaked && typeof totalEthStaked.value === "number"
        ? totalEthStaked.value
        : 0,
    validatorscount:
      "value" in validatorscount && typeof validatorscount.value === "number"
        ? validatorscount.value
        : 0,
    apr: "value" in apr && typeof apr.value === "number" ? apr.value : 0,
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
