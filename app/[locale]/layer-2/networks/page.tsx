import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"
import type { GrowThePieData } from "@/lib/types"
import type { MetricReturnData } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import { walletsData } from "@/data/wallets/wallet-data"
import { FETCH_ETHEREUM_MARKETCAP_TASK_ID } from "@/data-layer/api/fetchEthereumMarketcap"
import { FETCH_GROW_THE_PIE_TASK_ID } from "@/data-layer/api/fetchGrowThePie"
import { FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID } from "@/data-layer/api/fetchGrowThePieBlockspace"
import { FETCH_GROW_THE_PIE_MASTER_TASK_ID } from "@/data-layer/api/fetchGrowThePieMaster"
import { FETCH_L2BEAT_TASK_ID } from "@/data-layer/api/fetchL2beat"
import { getCachedData } from "@/data-layer/storage/cachedGetter"

import { BASE_TIME_UNIT } from "@/lib/constants"

import Layer2Networks from "./_components/networks"
import Layer2NetworksPageJsonLD from "./page-jsonld"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data from data layer with Next.js caching
  const [
    ethereumMarketcapData,
    growThePieData,
    growThePieBlockspaceData,
    growThePieMasterData,
    l2beatData,
  ] = await Promise.all([
    getCachedData<MetricReturnData>(
      FETCH_ETHEREUM_MARKETCAP_TASK_ID,
      REVALIDATE_TIME
    ),
    getCachedData<GrowThePieData>(FETCH_GROW_THE_PIE_TASK_ID, REVALIDATE_TIME),
    getCachedData<Record<string, unknown>>(
      FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID,
      REVALIDATE_TIME
    ),
    getCachedData<{ launchDates: Record<string, string> }>(
      FETCH_GROW_THE_PIE_MASTER_TASK_ID,
      REVALIDATE_TIME
    ),
    getCachedData<{
      projects: Record<
        string,
        {
          tvs: { breakdown: { total: number } }
        }
      >
    }>(FETCH_L2BEAT_TASK_ID, REVALIDATE_TIME),
  ])

  // Handle missing data gracefully
  const safeGrowThePieData: GrowThePieData = growThePieData || {
    dailyTxCosts: {},
    activeAddresses: {},
    txCount: { value: 0, timestamp: Date.now() },
    txCostsMedianUsd: { value: 0, timestamp: Date.now() },
  }
  const safeL2beatData = l2beatData || { projects: {} }
  const safeGrowThePieBlockspaceData = growThePieBlockspaceData || {}
  const safeGrowThePieMasterData = growThePieMasterData || { launchDates: {} }

  const layer2DataCompiled = layer2Data
    .map((network) => {
      return {
        ...network,
        txCosts: safeGrowThePieData.dailyTxCosts[network.growthepieID],
        tvl:
          safeL2beatData.projects[network.l2beatID]?.tvs?.breakdown?.total || 0,
        networkMaturity: safeL2beatData.projects[network.l2beatID]
          ? networkMaturity(safeL2beatData.projects[network.l2beatID])
          : "emerging",
        activeAddresses:
          safeGrowThePieData.activeAddresses[network.growthepieID],
        blockspaceData:
          (safeGrowThePieBlockspaceData as Record<string, unknown>)[
            network.growthepieID
          ] || null,
        launchDate:
          safeGrowThePieMasterData.launchDates[
            network.growthepieID.replace(/_/g, "-")
          ] || null,
        walletsSupported: walletsData
          .filter((wallet) =>
            wallet.supported_chains.includes(network.chainName)
          )
          .map((wallet) => wallet.name),
        walletsSupportedCount: `${
          walletsData.filter((wallet) =>
            wallet.supported_chains.includes(network.chainName)
          ).length
        }/${walletsData.length}`,
      }
    })
    .sort((a, b) => {
      const maturityOrder = {
        robust: 4,
        maturing: 3,
        developing: 2,
        emerging: 1,
      }

      const maturityDiff =
        maturityOrder[b.networkMaturity] - maturityOrder[a.networkMaturity]

      if (maturityDiff === 0) {
        return (b.tvl || 0) - (a.tvl || 0)
      }

      return maturityDiff
    })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/networks")
  const messages = pick(allMessages, requiredNamespaces)

  const props = {
    locale,
    layer2Data: layer2DataCompiled,
    mainnetData: {
      ...ethereumNetworkData,
      txCosts: safeGrowThePieData.dailyTxCosts.ethereum,
      tvl:
        (ethereumMarketcapData && "value" in ethereumMarketcapData
          ? ethereumMarketcapData.value
          : null) || 0,
      walletsSupported: walletsData
        .filter((wallet) =>
          wallet.supported_chains.includes("Ethereum Mainnet")
        )
        .map((wallet) => wallet.name),
    },
  }

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "layer-2/networks",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Layer2NetworksPageJsonLD
        locale={locale}
        layer2Data={layer2DataCompiled}
        contributors={contributors}
      />
      <Layer2Networks {...props} />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({
    locale,
    namespace: "page-layer-2-networks",
  })

  return await getMetadata({
    locale,
    slug: ["layer-2", "networks"],
    title: t("page-layer-2-networks-meta-title"),
    description: t("page-layer-2-networks-hero-description"),
    image: "/images/heroes/layer-2-hub-hero.png",
  })
}

export default Page
