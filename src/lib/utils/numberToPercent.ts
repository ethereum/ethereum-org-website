import { getLocaleForNumberFormat } from "@/lib/utils/translations"
import type { Lang } from "@/lib/types"

export const numberToPercent = (
  num: number,
  locale: string | Lang = "en"
): string =>
  new Intl.NumberFormat(getLocaleForNumberFormat(locale as Lang), {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
