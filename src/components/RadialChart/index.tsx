"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Info } from "lucide-react"
import { useLocale } from "next-intl"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"

import Tooltip from "../Tooltip"
import Link from "../ui/Link"

import { useTranslation } from "@/hooks/useTranslation"

/**
 * RadialChartProps defines the properties for the RadialChart component.
 *
 * @property {number} value - The value to be displayed in the chart.
 * @property {number} [totalValue] - The total value for the chart. If not provided, the chart will display the value as a percentage.
 * @property {ReactNode} label - The label for the chart.
 * @property {string} [sourceName] - The name of the data source.
 * @property {string} [sourceUrl] - The URL of the data source.
 * @property {number | string} [lastUpdated] - The last updated timestamp for the data.
 * @property {string} [className] - Additional class names for the chart container.
 * @property {string} [displayValue] - The custom display value to be shown.
 */
type RadialChartProps = {
  value: number
  totalValue?: number
  label: ReactNode
  sourceName?: string
  sourceUrl?: string
  lastUpdated?: number | string
  className?: string
  displayValue?: string
}

/**
 * RadialChart component renders a radial chart with the provided value and optional total value, label, source name, source URL, last updated timestamp, additional class names, and custom display value.
 *
 * @param {RadialChartProps} props - The properties for the RadialChart component.
 * @returns {JSX.Element} The rendered RadialChart component.
 */
const RadialChart = ({
  value,
  totalValue,
  label,
  sourceName,
  sourceUrl,
  lastUpdated,
  className,
  displayValue,
}: RadialChartProps) => {
  const { t } = useTranslation("common")
  const locale = useLocale()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const lastUpdatedDisplay =
    lastUpdated && isValidDate(lastUpdated)
      ? new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }).format(new Date(lastUpdated))
      : ""

  const data = [{ value }]

  if (!isMounted) return null

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <RadialBarChart
          width={170}
          height={90}
          cx={85}
          cy={80}
          innerRadius={70}
          outerRadius={100}
          barSize={10}
          data={data}
          startAngle={185}
          endAngle={-5}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, totalValue || 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "hsla(var(--body-light))", strokeWidth: 1 }}
            dataKey="value"
            cornerRadius={16}
            fill="hsla(var(--accent-a))"
          />
        </RadialBarChart>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform text-3xl font-black">
          {displayValue || value}
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm">
          {label}
          {sourceName && sourceUrl && (
            <Tooltip
              content={
                <>
                  <p>
                    {t("data-provided-by")}{" "}
                    <Link href={sourceUrl}>{sourceName}</Link>
                  </p>
                  {lastUpdated && (
                    <p className="mt-2">
                      {t("last-updated")}: {lastUpdatedDisplay}
                    </p>
                  )}
                </>
              }
            >
              <Info className="mb-0.5 ms-2 inline size-[0.875em] align-text-bottom" />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

export default RadialChart
