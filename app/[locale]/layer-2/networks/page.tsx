import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  extractGrowThePieBlockspace,
  extractGrowThePieData,
  extractGrowThePieMaster,
  extractL2beatData,
  extractValue,
} from "@/lib/utils/data/refactor/extractExternalData"
import { getExternalData } from "@/lib/utils/data/refactor/getExternalData"
import { processGrowThePieData } from "@/lib/utils/layer-2"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import { walletsData } from "@/data/wallets/wallet-data"

import Layer2Networks from "./_components/networks"
import Layer2NetworksPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch hourly data (growThePie, ethereum market cap, blockspace data, master data, and l2beat data) with 1-hour revalidation
  const hourlyData = await getExternalData(
    [
      "growThePie",
      "ethereumMarketcap",
      "growThePieBlockspace",
      "growThePieMaster",
      "l2beatData",
    ],
    3600
  )

  // Extract blockspace data
  const growThePieBlockspaceData = extractGrowThePieBlockspace(hourlyData)

  // Extract master data (launch dates)
  const growThePieMasterData = extractGrowThePieMaster(hourlyData)

  // Extract L2beat data
  const l2beatData = extractL2beatData(hourlyData)

  // Extract and process growThePie data
  const growThePieDataRaw = extractGrowThePieData(hourlyData)
  const growThePieData = growThePieDataRaw
    ? processGrowThePieData(growThePieDataRaw)
    : {
        txCount: { value: 0, timestamp: Date.now() },
        txCostsMedianUsd: { value: 0, timestamp: Date.now() },
        dailyTxCosts: {} as Record<string, number | undefined>,
        activeAddresses: {} as Record<string, number | undefined>,
      }

  // Extract Ethereum market cap
  const ethereumMarketcapData = extractValue(hourlyData, "ethereumMarketcap", 0)

  const layer2DataCompiled = layer2Data
    .map((network) => {
      const project = l2beatData?.projects[network.l2beatID]
      return {
        ...network,
        txCosts: growThePieData.dailyTxCosts[network.growthepieID],
        tvl: project?.tvs.breakdown.total || 0,
        networkMaturity: project ? networkMaturity(project) : "emerging",
        activeAddresses: growThePieData.activeAddresses[network.growthepieID],
        blockspaceData: growThePieBlockspaceData[network.growthepieID] || null,
        launchDate:
          growThePieMasterData[network.growthepieID.replace(/_/g, "-")] || null,
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
      txCosts: growThePieData.dailyTxCosts.ethereum,
      tvl:
        "value" in ethereumMarketcapData &&
        typeof ethereumMarketcapData.value === "number"
          ? ethereumMarketcapData.value
          : 0,
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
