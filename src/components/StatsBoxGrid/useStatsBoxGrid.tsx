import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { AllMetricData, Lang, StatsBoxMetric } from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import { RANGES } from "@/lib/constants"

import { RangeSelector } from "./RangeSelector"

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

  const [selectedRangeTotalStaked, setSelectedRangeTotalStaked] =
    useState<string>(RANGES[0])
  const [selectedRangeTvl, setSelectedRangeTvl] = useState<string>(RANGES[0])
  const [selectedRangeNodes, setSelectedRangeNodes] = useState<string>(
    RANGES[0]
  )
  const [selectedRangeTxs, setSelectedRangeTxs] = useState<string>(RANGES[0])

  const localeForNumberFormat = getLocaleForNumberFormat(locale! as Lang)

  const totalEtherStaked =
    "error" in totalEthStaked
      ? { error: totalEthStaked.error }
      : {
          data: totalEthStaked.data,
          value: formatTotalStaked(totalEthStaked.value, localeForNumberFormat),
        }

  const valueLocked =
    "error" in totalValueLocked
      ? { error: totalValueLocked.error }
      : {
          data: totalValueLocked.data,
          value: formatTVL(totalValueLocked.value, localeForNumberFormat),
        }

  const txs =
    "error" in txCount
      ? { error: txCount.error }
      : {
          data: txCount.data,
          value: formatTxs(txCount.value, localeForNumberFormat),
        }

  const nodes =
    "error" in nodeCount
      ? { error: nodeCount.error }
      : {
          data: nodeCount.data,
          value: formatNodes(nodeCount.value, localeForNumberFormat),
        }

  const metrics: StatsBoxMetric[] = [
    {
      apiProvider: "Dune Analytics",
      apiUrl: "https://dune.com/",
      title: t("page-index-network-stats-total-eth-staked"),
      description: t("page-index-network-stats-total-eth-staked-explainer"),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTotalStaked}
          setState={setSelectedRangeTotalStaked}
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "total eth staked",
          }}
        />
      ),
      state: totalEtherStaked,
      range: selectedRangeTotalStaked,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/",
      title: t("page-index-network-stats-tx-day-description"),
      description: t("page-index-network-stats-tx-day-explainer"),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTxs}
          setState={setSelectedRangeTxs}
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "transactions",
          }}
        />
      ),
      state: txs,
      range: selectedRangeTxs,
    },
    {
      apiProvider: "DeFi Llama",
      apiUrl: "https://defillama.com/",
      title: t("page-index-network-stats-value-defi-description"),
      description: t("page-index-network-stats-value-defi-explainer"),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTvl}
          setState={setSelectedRangeTvl}
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "defi tvl",
          }}
        />
      ),
      state: valueLocked,
      range: selectedRangeTvl,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/nodetracker",
      title: t("page-index-network-stats-nodes-description"),
      description: t("page-index-network-stats-nodes-explainer"),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeNodes}
          setState={setSelectedRangeNodes}
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "nodes",
          }}
        />
      ),
      state: nodes,
      range: selectedRangeNodes,
    },
  ]

  return metrics
}
