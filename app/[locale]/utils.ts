/**
 * TODO: Update metric for new homepage:
 * - [ ] Replace TVL DeFi with "Total value held on Ethereum"
 */

import { getTranslations } from "next-intl/server"

import type {
  AllHomepageActivityData,
  CommunityConference,
  Lang,
  StatsBoxMetric,
} from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"
import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import { DEFAULT_LOCALE } from "@/lib/constants"

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

export const getActivity = async (
  {
    totalEthStaked,
    totalValueLocked,
    txCount,
    txCostsMedianUsd,
    ethPrice,
  }: AllHomepageActivityData,
  locale: Lang
): Promise<StatsBoxMetric[]> => {
  const t = await getTranslations("page-index")

  const localeForNumberFormat = getLocaleForNumberFormat(locale)

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
      apiUrl: "https://www.growthepie.com/fundamentals/transaction-costs",
      label: t("page-index-network-stats-tx-cost-description"),
      state: medianTxCost,
    },
    {
      apiProvider: "growthepie",
      apiUrl: "https://www.growthepie.com/fundamentals/transaction-count",
      label: t("page-index-network-stats-tx-day-description"),
      state: txs,
    },
  ]

  return metrics
}

export const getUpcomingEvents = (
  events: CommunityConference[],
  locale = DEFAULT_LOCALE
): CommunityConference[] =>
  events
    .filter((event) => {
      const isValid = isValidDate(event.endDate)
      const beginningOfEndDate = new Date(event.endDate).getTime()
      const endOfEndDate = beginningOfEndDate + 24 * 60 * 60 * 1000
      const isUpcoming = endOfEndDate >= new Date().getTime()
      return isValid && isUpcoming
    })
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .map(({ startDate, endDate, ...event }) => {
      const formattedDate =
        isValidDate(startDate) || isValidDate(endDate)
          ? new Intl.DateTimeFormat(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).formatRange(
              new Date(isValidDate(startDate) ? startDate : endDate),
              new Date(isValidDate(endDate) ? endDate : startDate)
            )
          : ""
      return {
        ...event,
        startDate,
        endDate,
        formattedDate,
      }
    })
