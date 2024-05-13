import type { Lang } from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import { DEFAULT_LOCALE } from "../constants"

export const numberToPercent = (
  num: number,
  locale: string | Lang = DEFAULT_LOCALE
): string =>
  new Intl.NumberFormat(getLocaleForNumberFormat(locale as Lang), {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
