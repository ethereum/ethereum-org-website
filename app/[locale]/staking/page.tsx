import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang, PageParams, StakingStatsData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getExternalData } from "@/lib/utils/data/getExternalData"
import { getMetadata } from "@/lib/utils/metadata"
import { every } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import StakingPage from "./_components/staking"
import StakingPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch hourly data (beaconchain epoch and APR) with 1-hour revalidation
  const {
    beaconchainEpoch: beaconchainEpochData,
    beaconchainApr: aprResponse,
  } =
    (await getExternalData(
      ["beaconchainEpoch", "beaconchainApr"],
      every("hour")
    )) || {}

  // Extract beaconchain epoch data
  const totalEthStaked =
    beaconchainEpochData &&
    !("error" in beaconchainEpochData) &&
    typeof beaconchainEpochData === "object" &&
    "totalEthStaked" in beaconchainEpochData &&
    beaconchainEpochData.totalEthStaked &&
    "value" in beaconchainEpochData.totalEthStaked
      ? beaconchainEpochData.totalEthStaked
      : { value: 0, timestamp: Date.now() }
  const validatorscount =
    beaconchainEpochData &&
    !("error" in beaconchainEpochData) &&
    typeof beaconchainEpochData === "object" &&
    "validatorscount" in beaconchainEpochData &&
    beaconchainEpochData.validatorscount &&
    "value" in beaconchainEpochData.validatorscount
      ? beaconchainEpochData.validatorscount
      : { value: 0, timestamp: Date.now() }

  // Extract APR data
  const apr =
    aprResponse && "value" in aprResponse
      ? aprResponse
      : { value: 0, timestamp: Date.now() }

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
