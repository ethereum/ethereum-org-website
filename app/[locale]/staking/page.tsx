import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import {
  CommitHistory,
  EpochResponse,
  EthStoreResponse,
  Lang,
  PageParams,
  StakingStatsData,
} from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import StakingPage from "./_components/staking"
import StakingPageJsonLD from "./page-jsonld"

import { fetchBeaconchainEpoch } from "@/lib/api/fetchBeaconchainEpoch"
import { fetchBeaconchainEthstore } from "@/lib/api/fetchBeaconchainEthstore"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["beaconchainEpoch", fetchBeaconchainEpoch],
    ["beaconchainApr", fetchBeaconchainEthstore],
  ],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  const [{ totalEthStaked, validatorscount }, apr] = await loadData()

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
