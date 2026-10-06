import type { MetricReturnData } from "@/lib/types"

export const SOURCES = {
  defillama: { sourceName: "DefiLlama", sourceUrl: "https://defillama.com/" },
  ultrasound: {
    sourceName: "ultrasound.money",
    sourceUrl: "https://ultrasound.money/",
  },
  rwa: { sourceName: "rwa.xyz", sourceUrl: "https://www.rwa.xyz/" },
}

// TODO(data): drop once RWA_API_KEY is set in the data-layer environment
export const RWA_SHARE_FALLBACK = { rwas: 0.6, stablecoins: 0.5 }
// Before the first fetch-defi-tvl-share run
export const DEFI_RUNNER_UP_FALLBACK = 8

/** Netlify Blobs throws without credentials; degrade per-getter instead of a 500 */
export const nullOnError = <T>(promise: Promise<T>): Promise<T | null> =>
  promise.catch((error) => {
    console.error(error)
    return null
  })

/** Value + timestamp props for a `HeroStat`, or an error dash when missing */
export const metricStat = (
  metric: MetricReturnData | null | undefined,
  format: (value: number) => string
) =>
  metric && "value" in metric
    ? { value: format(metric.value), lastUpdated: metric.timestamp }
    : {}
