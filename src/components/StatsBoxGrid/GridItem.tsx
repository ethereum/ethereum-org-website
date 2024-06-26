import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Line } from "react-chartjs-2"
import { MdInfoOutline } from "react-icons/md"

import type { StatsBoxMetric, TimestampedData } from "@/lib/types"

import { RANGES } from "@/lib/constants"

import StatErrorMessage from "../StatErrorMessage"
// import Tooltip from "../Tooltip"
import Translation from "../Translation"
import Link from "next/link"

const tooltipContent = (metric: StatsBoxMetric) => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link href={metric.apiUrl}>{metric.apiProvider}</Link>
  </div>
)

type GridItemProps = {
  metric: StatsBoxMetric
}

// ChartJS config
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  // to avoid a production error, we must include this plugin even if we do
  // not use it (we are using it on the energy consumption chart)
  ChartDataLabels
)

export const GridItem = ({ metric }: GridItemProps) => {
  const { title, description, state, buttonContainer, range } = metric
  const hasError = "error" in state
  const hasData = "data" in state

  const value = hasError ? (
    <StatErrorMessage />
  ) : (
    <div className="inline">
      <div className="inline text-[max(8.8vw,48px)] lg:text-[min(4.4vw,4rem)] leading-[100%]">
        {state.value}{" "}
      </div>
      <div className="inline">
        <span className="inline-block">
          <MdInfoOutline className="box-content w-6 h-6 fill-current text-current hover:fill-primary-base active:fill-primary-base focus:fill-primary-base" />
        </span>
      </div>
    </div>
  )

  // Returns either 90 or 30-day data range depending on `range` selection
  const filteredData = (data: TimestampedData<number>[]) => {
    if (range === RANGES[1]) return [...data]

    return data.filter(({ timestamp }) => {
      const millisecondRange = 1000 * 60 * 60 * 24 * 30
      const now = new Date().getTime()

      return timestamp >= now - millisecondRange
    })
  }

  const minValue = hasData
    ? state.data.reduce(
        (prev, { value }) => (prev < value ? prev : value),
        Infinity
      )
    : 0

  const maxValue = hasData
    ? state.data.reduce((prev, { value }) => (prev > value ? prev : value), 0)
    : 0

  // ChartJS options
  const chartOptions = {
    // chart styles
    borderColor: "#8884db",
    borderWidth: 1,
    tension: 0.3,
    fill: true,
    backgroundColor: (context: ScriptableContext<"line">) => {
      const ctx = context.chart.ctx
      const gradient = ctx.createLinearGradient(0, 0, 0, 220)
      // gradient.addColorStop(offset, color)
      gradient.addColorStop(0, "#8884d84d")
      gradient.addColorStop(0.85, "#ffffff00")

      return gradient
    },
    pointRadius: 0,
    maintainAspectRatio: false,
    // chart legend/title config
    plugins: {
      legend: {
        display: false, // hide chart legend
      },
      title: {
        display: false, // hide titles
      },
      // force disabling chart labels because when the user do an internal
      // navigation, labels are displayed incorrectly (probably a bug in
      // chart.js or the react wrapper)
      datalabels: {
        display: false,
      },
    },
    // chart labels config
    scales: {
      y: {
        display: false, // hide Y axis labels
        grid: {
          display: false,
        },
        min: minValue,
        max: maxValue,
      },
      x: {
        display: false, // hide X axis labels
        grid: {
          display: false,
        },
      },
    },
  }

  const filteredRange = filteredData(hasData ? state.data : [])

  const chartData = {
    labels: filteredRange,
    datasets: [
      {
        data: filteredRange.map((item) => item.value),
      },
    ],
  }

  return (
    <div
      className="relative text-current h-20 flex flex-col justify-between border-y border lg:border-x lg:border-y-0 mt-[-1px] lg:mt-0 p-8 lg:p-6"
      style={{ borderColor: "#000000" }}
    >
      <div>
        <p className="text-xl mb-2 text-current uppercase font-mono">{title}</p>
        <p>{description}</p>
      </div>
      {hasData && (
        <div className="absolute inset-x-0 bottom-7 h-[60%]">
          <Line options={chartOptions} data={chartData} />
        </div>
      )}
      <div className="relative flex justify-between items-end">
        <div className="font-semibold text-current flex-wrap text-ellipsis">
          {value}
        </div>
        {hasData && (
          <div className="font-mono me-[-1] mb-[-1]">{buttonContainer}</div>
        )}
      </div>
    </div>
  )
}
