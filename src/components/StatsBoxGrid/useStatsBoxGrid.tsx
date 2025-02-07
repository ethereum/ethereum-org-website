/**
 * TODO: Update metric for new homepage:
 * - [ ] Replace TVL DeFi with "Total value held on Ethereum"
 */
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { AllMetricData, Lang, StatsBoxMetric } from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

const formatLargeUSD = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(value)
}

const formatSmallUSD = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value)
}

const formatLargeNumber = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(value)
}

export const useStatsBoxGrid = ({
  totalEthStaked,
  totalValueLocked,
  txCount,
  txCostsMedianUsd,
  ethPrice,
}: AllMetricData): StatsBoxMetric[] => {
  const { t } = useTranslation("page-index")
  const { locale } = useRouter()

  const localeForNumberFormat = getLocaleForNumberFormat(locale! as Lang)

  const hasEthStakerAndPriceData =
    "value" in totalEthStaked && "value" in ethPrice
  const totalStakedInUsd = hasEthStakerAndPriceData
    ? totalEthStaked.value * ethPrice.value
    : 0

  const totalEtherStaked = !totalStakedInUsd
    ? {
        error:
          "error" in totalEthStaked
            ? totalEthStaked.error
            : "error" in ethPrice
              ? ethPrice.error
              : "",
      }
    : {
        ...totalEthStaked,
        value: formatLargeUSD(totalStakedInUsd, localeForNumberFormat),
      }

  const valueLocked =
    "error" in totalValueLocked
      ? { error: totalValueLocked.error }
      : {
          ...totalValueLocked,
          value: formatLargeUSD(totalValueLocked.value, localeForNumberFormat),
        }

  const txs =
    "error" in txCount
      ? { error: txCount.error }
      : {
          ...txCount,
          value: formatLargeNumber(txCount.value, localeForNumberFormat),
        }

  const medianTxCost =
    "error" in txCostsMedianUsd
      ? { error: txCostsMedianUsd.error }
      : {
          ...txCostsMedianUsd,
          value: formatSmallUSD(txCostsMedianUsd.value, localeForNumberFormat),
        }

  const metrics: StatsBoxMetric[] = [
    {
      apiProvider: "DeFi Llama",
      apiUrl: "https://defillama.com/chain/Ethereum",
      label: t("page-index-network-stats-value-defi-description"),
      state: valueLocked,
    },
    {
      apiProvider: "Dune Analytics",
      apiUrl: "https://dune.com/hildobby/eth2-staking",
      label: t("page-index-network-stats-total-eth-staked"),
      state: totalEtherStaked,
    },
    {
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.xyz/fundamentals/transaction-costs",
      label: t("page-index-network-stats-tx-cost-description"),
      state: medianTxCost,
    },
    {
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.xyz/fundamentals/transaction-count",
      label: t("page-index-network-stats-tx-day-description"),
      state: txs,
    },
  ]

  return metrics
}
