import type { MetricReturnData } from "@/lib/types"

export const SOURCES = {
  defillama: { sourceName: "DefiLlama", sourceUrl: "https://defillama.com/" },
  ultrasound: {
    sourceName: "ultrasound.money",
    sourceUrl: "https://ultrasound.money/",
  },
}

/** Value + timestamp props for a `HeroStat`, or an error dash when missing */
export const metricStat = (
  metric: MetricReturnData | null | undefined,
  format: (value: number) => string
) =>
  metric && "value" in metric
    ? { value: format(metric.value), lastUpdated: metric.timestamp }
    : {}
