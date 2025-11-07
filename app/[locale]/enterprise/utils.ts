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
      : "value" in txCount && typeof txCount.value === "number"
        ? {
            ...txCount,
            value: formatLargeNumber(txCount.value, localeForNumberFormat),
          }
        : { value: "0", timestamp: Date.now() }

  const medianTxCost =
    "error" in txCostsMedianUsd
      ? { error: txCostsMedianUsd.error }
      : "value" in txCostsMedianUsd &&
          typeof txCostsMedianUsd.value === "number"
        ? {
            ...txCostsMedianUsd,
            value: formatSmallUSD(
              txCostsMedianUsd.value,
              localeForNumberFormat
            ),
          }
        : { value: "0", timestamp: Date.now() }

  const stablecoinMarketCapFormatted =
    "error" in stablecoinMarketCap
      ? { error: stablecoinMarketCap.error }
      : "value" in stablecoinMarketCap &&
          typeof stablecoinMarketCap.value === "number"
        ? {
            ...stablecoinMarketCap,
            value: formatLargeUSD(
              stablecoinMarketCap.value,
              localeForNumberFormat
            ),
          }
        : { value: "0", timestamp: Date.now() }

  const totalEthStakedValue =
    "value" in totalEthStaked && typeof totalEthStaked.value === "number"
      ? totalEthStaked.value
      : 0
  const ethPriceValue =
    "value" in ethPrice && typeof ethPrice.value === "number"
      ? ethPrice.value
      : 0
  const totalStakedInUsd = totalEthStakedValue * ethPriceValue

  const totalValueSecuringFormatted =
    !totalStakedInUsd || totalEthStakedValue === 0 || ethPriceValue === 0
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
      apiUrl: "https://www.growthepie.com/fundamentals/transaction-count",
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
      apiProvider: "Beaconcha.in",
      apiUrl: "https://beaconcha.in",
      state: totalValueSecuringFormatted,
    },

    {
      label: t("page-enterprise-activity-media-tx-cost"),
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.com/fundamentals/transaction-costs",
      state: medianTxCost,
    },
  ]

  return metrics
}
