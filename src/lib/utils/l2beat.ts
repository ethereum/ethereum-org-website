import type { L2beatData } from "@/lib/types"

export const L2BEAT_SOURCE = {
  sourceName: "L2BEAT",
  sourceUrl: "https://l2beat.com/scaling/summary",
}

/** Sum a value-secured breakdown field across L2s; L3s are skipped since their value already sits on an L2 */
export const sumL2Breakdown = (
  data: L2beatData | null | undefined,
  field: "total" | "stablecoin"
): number | undefined => {
  if (!data) return undefined
  const sum = Object.values(data.projects)
    .filter(({ type }) => type !== "layer3")
    .reduce((acc, { tvs }) => acc + (tvs?.breakdown?.[field] ?? 0), 0)
  return sum > 0 ? sum : undefined
}
