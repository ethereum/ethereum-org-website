import type { StablecoinsTableRow } from "@/components/StablecoinsTable"

import { numberFormat } from "@/lib/utils/numbers"

import { stablecoins } from "@/data/stablecoins"
import type { CoinGeckoCoinMarket } from "@/data-layer/fetchers/fetchStablecoinsData"

const MIN_MARKET_CAP_USD = 500_000

/** Rows for `StablecoinsTable`: listed Ethereum stablecoins, largest first */
export const buildStablecoinRows = (
  marketData: CoinGeckoCoinMarket[],
  locale: string
): StablecoinsTableRow[] => {
  const formatter = numberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return stablecoins
    .flatMap(({ id, ...rest }) => {
      const coin = marketData.find((market) => market.id === id)
      return coin ? [{ ...coin, ...rest }] : []
    })
    .filter((coin) => coin.market_cap >= MIN_MARKET_CAP_USD)
    .sort((a, b) => b.market_cap - a.market_cap)
    .map(({ market_cap, name, image, type, url, peg, symbol }) => ({
      name,
      image,
      type,
      url,
      peg,
      symbol,
      marketCap: formatter.format(market_cap),
    }))
}
