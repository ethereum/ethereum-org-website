import { getLocale, getTranslations } from "next-intl/server"

import type {
  AllEnterpriseActivityData,
  Lang,
  StatsBoxMetric,
} from "@/lib/types"

import {
  formatLargeNumber,
  formatLargeUSD,
  formatSmallUSD,
} from "@/lib/utils/numbers"
import { getLocaleForNumberFormat } from "@/lib/utils/translations"

// Convert numerical value to formatted values
export const parseActivity = async ({
  txCount,
  txCostsMedianUsd,
  stablecoinMarketCap,
  ethPrice,
  totalEthStaked,
}: AllEnterpriseActivityData): Promise<StatsBoxMetric[]> => {
  const locale = (await getLocale()) as Lang
  const t = await getTranslations({ locale, namespace: "page-enterprise" })

  const localeForNumberFormat = getLocaleForNumberFormat(locale)

  const txCountFormatted =
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

  const stablecoinMarketCapFormatted =
    "error" in stablecoinMarketCap
      ? { error: stablecoinMarketCap.error }
      : {
          ...stablecoinMarketCap,
          value: formatLargeUSD(
            stablecoinMarketCap.value,
            localeForNumberFormat
          ),
        }

  const hasEthStakerAndPriceData =
    "value" in totalEthStaked && "value" in ethPrice
  const totalStakedInUsd = hasEthStakerAndPriceData
    ? totalEthStaked.value * ethPrice.value
    : 0

  const totalValueSecuringFormatted = !totalStakedInUsd
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

  const metrics: StatsBoxMetric[] = [
    {
      label: t("page-enterprise-activity-tx-count"),
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.xyz/fundamentals/transaction-count",
      state: txCountFormatted,
    },
    {
      label: t("page-enterprise-activity-stablecoin-mktcap"),
      apiProvider: "DefiLlama",
      apiUrl: "https://defillama.com/chain/ethereum",
      state: stablecoinMarketCapFormatted,
    },
    {
      label: t("page-enterprise-activity-value-protecting"),
      apiProvider: "Dune Analytics",
      apiUrl: "https://dune.com/hildobby/eth2-staking",
      state: totalValueSecuringFormatted,
    },

    {
      label: t("page-enterprise-activity-media-tx-cost"),
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.xyz/fundamentals/transaction-costs",
      state: medianTxCost,
    },
  ]

  return metrics
}
