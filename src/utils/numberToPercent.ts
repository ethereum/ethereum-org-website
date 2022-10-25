export const numberToPercent = (num: number, locale: string = "en"): string =>
  new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
