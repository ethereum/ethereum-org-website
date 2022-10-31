import { getLocaleForNumberFormat } from "./translations"
import type { Lang } from "./languages"

export const numberToPercent = (
  num: number,
  locale: string | Lang = "en"
): string =>
  new Intl.NumberFormat(getLocaleForNumberFormat(locale as Lang), {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
