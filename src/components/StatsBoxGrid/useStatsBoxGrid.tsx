/**
 * TODO: Update metric for new homepage:
 * - Replace TVL DeFi with "Total value held on Ethereum"
 * - Replace Node Count with "Average transaction cost"
 */
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { AllMetricData, Lang, StatsBoxMetric } from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

const formatTotalStaked = (amount: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(amount)
}

const formatTVL = (tvl: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(tvl)
}

const formatTxs = (txs: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(txs)
}

const formatNodes = (nodes: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(nodes)
}

export const useStatsBoxGrid = ({
  totalEthStaked,
  nodeCount,
  totalValueLocked,
  txCount,
}: AllMetricData): StatsBoxMetric[] => {
  const { t } = useTranslation("page-index")
  const { locale } = useRouter()

  const localeForNumberFormat = getLocaleForNumberFormat(locale! as Lang)

  const totalEtherStaked =
    "error" in totalEthStaked
      ? { error: totalEthStaked.error }
      : {
          value: formatTotalStaked(totalEthStaked.value, localeForNumberFormat),
        }

  const valueLocked =
    "error" in totalValueLocked
      ? { error: totalValueLocked.error }
      : { value: formatTVL(totalValueLocked.value, localeForNumberFormat) }

  const txs =
    "error" in txCount
      ? { error: txCount.error }
      : { value: formatTxs(txCount.value, localeForNumberFormat) }

  const nodes =
    "error" in nodeCount
      ? { error: nodeCount.error }
      : { value: formatNodes(nodeCount.value, localeForNumberFormat) }

  const metrics: StatsBoxMetric[] = [
    {
      apiProvider: "Dune Analytics",
      apiUrl: "https://dune.com/",
      label: t("page-index-network-stats-total-eth-staked"),
      state: totalEtherStaked,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/",
      label: t("page-index-network-stats-tx-day-description"),
      state: txs,
    },
    {
      apiProvider: "DeFi Llama",
      apiUrl: "https://defillama.com/",
      label: t("page-index-network-stats-value-defi-description"),
      state: valueLocked,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/nodetracker",
      label: t("page-index-network-stats-nodes-description"),
      state: nodes,
    },
  ]

  return metrics
}
