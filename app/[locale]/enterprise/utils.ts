import { getTranslations } from "next-intl/server"

import type {
  AllEnterpriseActivityData,
  Lang,
  StatsBoxMetric,
} from "@/lib/types"

import { /* formatLargeNumber, */ formatLargeUSD } from "@/lib/utils/numbers"
import { getLocaleForNumberFormat } from "@/lib/utils/translations"

// Convert numerical value to formatted values
export const parseActivity = async (
  {
    // dailyTxCount,
    stablecoinMarketCap,
    // totalCapitalSecured,
  }: AllEnterpriseActivityData,
  locale: Lang
): Promise<StatsBoxMetric[]> => {
  const t = await getTranslations("page-enterprise")

  const localeForNumberFormat = getLocaleForNumberFormat(locale)

  // const dailyTxCountFormatted =
  //   "error" in dailyTxCount
  //     ? { error: dailyTxCount.error }
  //     : {
  //         ...dailyTxCount,
  //         value: formatLargeNumber(dailyTxCount.value, localeForNumberFormat),
  //       }

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

  // const totalCapitalSecuredFormatted =
  //   "error" in totalCapitalSecured
  //     ? { error: totalCapitalSecured.error }
  //     : {
  //         ...totalCapitalSecured,
  //         value: formatLargeUSD(
  //           totalCapitalSecured.value,
  //           localeForNumberFormat
  //         ),
  //       }

  const metrics: StatsBoxMetric[] = [
    // {
    //   // TODO
    //   label: t("page-enterprise-activity-daily-tx"),
    //   apiProvider: "TBD",
    //   apiUrl: "https://www.TBD.com",
    //   state: dailyTxCountFormatted,
    // },
    {
      label: t("page-enterprise-activity-stablecoin-mktcap"),
      apiProvider: "CoinGecko",
      apiUrl: "https://www.coingecko.com/en/categories/stablecoins",
      state: stablecoinMarketCapFormatted,
    },
    // {
    //   // TODO
    //   label: t("page-enterprise-activity-total-secured"),
    //   apiProvider: "TBD",
    //   apiUrl: "https://www.TBD.com",
    //   state: totalCapitalSecuredFormatted,
    // },
  ]

  return metrics
}
