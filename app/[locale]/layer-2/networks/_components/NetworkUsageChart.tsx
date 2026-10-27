import type { BlockspaceData } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { numberToPercent } from "@/lib/utils/numbers"

/** Share of transactions per usage category, ranked; unlabeled always last. */
const NetworkUsageChart = ({
  usageData,
  labels,
  locale,
}: {
  usageData: BlockspaceData
  labels: Record<keyof BlockspaceData, string>
  locale: string
}) => {
  const keys = Object.keys(labels) as (keyof BlockspaceData)[]
  const total = keys.reduce((sum, key) => sum + usageData[key], 0)
  const rows = keys
    .map((key) => ({ key, share: total ? usageData[key] / total : 0 }))
    .sort(
      (a, b) =>
        Number(a.key === "unlabeled") - Number(b.key === "unlabeled") ||
        b.share - a.share
    )

  return (
    <ul className="m-0 flex list-none flex-col gap-5 p-0">
      {rows.map(({ key, share }) => {
        const muted = key === "unlabeled"
        return (
          <li key={key} className="m-0 flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className={cn("text-sm", muted && "text-body-medium")}>
                {labels[key]}
              </span>
              <span
                className={cn(
                  "text-lg font-bold tabular-nums",
                  muted && "font-normal text-body-medium"
                )}
              >
                {numberToPercent(share, locale, {
                  maximumFractionDigits: share > 0 && share < 0.01 ? 1 : 0,
                })}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-background">
              <div
                className={cn(
                  "h-full rounded-full",
                  muted ? "bg-body-medium" : "bg-primary"
                )}
                style={{ width: `${share * 100}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default NetworkUsageChart
