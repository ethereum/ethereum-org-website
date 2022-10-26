import { getLocaleForNumberFormat } from "./translations"
import type { Lang } from "./languages"

export const numberToPercent = (num: number, locale: Lang = "en"): string =>
  new Intl.NumberFormat(getLocaleForNumberFormat(locale), {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
