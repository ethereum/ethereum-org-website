import { numberFormat } from "@/lib/utils/numbers"

import { PATH_IDS } from "./constants"
import type { PathId } from "./types"

export const getValidPathId = (pathIdString: string | null): PathId | null => {
  if (!isValidPathId(pathIdString)) return null
  return pathIdString
}

export const isValidPathId = (
  pathIdString: string | null
): pathIdString is PathId => {
  return PATH_IDS.includes(pathIdString as PathId)
}

export const getMaxFractionDigitsUsd = (value: number): 0 | 2 => {
  const roundedToCent = Math.round(value * 100) / 100
  const isEvenDollar = roundedToCent % 1 === 0
  return isEvenDollar ? 0 : 2
}

/**
 * Compact USD formatting for the wallet simulator. Always uses en-US so the
 * demo wallet shows the universally-recognizable "$" symbol regardless of
 * the page locale — non-English currency formats (e.g. "50 US$" in Spanish,
 * "50 $US" in French) overflow the fixed-width phone mockup. ETH amounts
 * still format per page locale via formatWalletToken.
 * Uses getMaxFractionDigitsUsd so even dollar amounts render as "$5" not "$5.00".
 */
export const formatWalletUsd = (
  value: number,
  options?: Intl.NumberFormatOptions
): string =>
  numberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(value),
    ...options,
  }).format(value)

/**
 * Token amount formatting for the wallet simulator. Defaults to 5 fraction
 * digits, which is the granularity used by the wallet balance and transfer
 * screens.
 */
export const formatWalletToken = (
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string =>
  numberFormat(locale, {
    maximumFractionDigits: 5,
    ...options,
  }).format(value)
