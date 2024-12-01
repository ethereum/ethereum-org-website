import React from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Bar } from "react-chartjs-2"

import type { Lang } from "@/lib/types"

import { Center } from "@/components/ui/flex"

import { wrapLabel } from "@/lib/utils/charts"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import useColorModeValue from "@/hooks/useColorModeValue"
import { useIsClient } from "@/hooks/useIsClient"

// ChartDataLabels required to display y-labels on top of bars
ChartJS.register(
  CategoryScale,
  LinearScale,
  Legend,
  BarElement,
  ChartDataLabels
)

const EnergyConsumptionChart = () => {
  const { t } = useTranslation("page-what-is-ethereum")
  const { locale } = useRouter()
  const isClient = useIsClient()
  const isRtl = isLangRightToLeft(locale as Lang)

  // chart rawData, according to different breakpoints
  let rawData = useBreakpointValue({
    base: [
      {
        name: t("energy-consumption-chart-global-data-centers-label"),
        amount: 190,
        color: "#FF0000",
      },
      {
        name: t("energy-consumption-chart-btc-pow-label"),
        amount: 149,
        color: "#F2A900",
      },
      {
        name: t("energy-consumption-chart-gaming-us-label"),
        amount: 34,
        color: "#71BB8A",
      },
      {
        name: t("energy-consumption-chart-eth-pow-label"),
        amount: 21,
        color: "#C1B6F5",
      },
      {
        name: t("energy-consumption-chart-eth-pos-label"),
        amount: 0.0026,
        color: "#C1B6F5",
      },
    ],
    sm: [
      {
        name: t("energy-consumption-chart-global-data-centers-label"),
        amount: 190,
        color: "#FF0000",
      },
      {
        name: t("energy-consumption-chart-btc-pow-label"),
        amount: 149,
        color: "#D7B14A",
      },
      {
        name: t("energy-consumption-gold-mining-cbeci-label"),
        amount: 131,
        color: "#F2A900",
      },
      {
        name: t("energy-consumption-chart-eth-pow-label"),
        amount: 21,
        color: "#C1B6F5",
      },
      {
        name: t("energy-consumption-chart-netflix-label"),
        amount: 0.457,
        color: "#E50914",
      },
      {
        name: t("energy-consumption-chart-eth-pos-label"),
        amount: 0.0026,
        color: "#C1B6F5",
      },
    ],
    md: [
      {
        name: t("energy-consumption-chart-global-data-centers-label"),
        amount: 190,
        color: "#FF0000",
      },
      {
        name: t("energy-consumption-chart-btc-pow-label"),
        amount: 149,
        color: "#D7B14A",
      },
      {
        name: t("energy-consumption-gold-mining-cbeci-label"),
        amount: 131,
        color: "#D7B14A",
      },
      {
        name: t("energy-consumption-chart-gaming-us-label"),
        amount: 34,
        color: "#71BB8A",
      },
      {
        name: t("energy-consumption-chart-eth-pow-label"),
        amount: 21,
        color: "#C1B6F5",
      },
      {
        name: "Google",
        amount: 19,
        color: "#E50914",
      },
      {
        name: t("energy-consumption-chart-netflix-label"),
        amount: 0.457,
        color: "#E50914",
      },
      {
        name: t("energy-consumption-chart-paypal-label"),
        amount: 0.26,
        color: "#C1B6F5",
      },
      {
        name: t("energy-consumption-chart-airbnb-label"),
        amount: 0.02,
        color: "#E50914",
      },
      {
        name: t("energy-consumption-chart-eth-pos-label"),
        amount: 0.0026,
        color: "#C1B6F5",
      },
    ],
  })

  // reverse data if RTL
  if (isRtl) {
    rawData = rawData?.reverse()
  }

  // chart options config
  const chartOptions = {
    // chart styles
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
      },
    },
    hover: { mode: undefined },
    plugins: {
      // required plugin to display labels on top
      datalabels: {
        // https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html#alignment-and-offset
        anchor: "end", // position of the labels (start, end, center)
        align: "end", // alignment of the labels (start, end, center)
        offset: 0, // distance (in pixels) to pull the label away from the anchor point
        font: {
          size: 14,
        },
        color: useColorModeValue("#333333", "#F2F2F2"),
        textAlign: "center",
      },
      // legend styles
      legend: {
        display: false, // hide chart top legend
      },
      title: {
        display: false, // hide chart title
      },
    },
    // axis styles
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        display: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: useColorModeValue("#333333", "#F2F2F2"),
          font: {
            size: 10,
          },
          autoSkip: false,
          padding: 0,
          maxRotation: 0,
          minRotation: 45,
        },
      },
    },
  } satisfies ChartOptions

  const chartData = {
    labels: rawData?.map((item) => wrapLabel(item.name)),
    datasets: [
      {
        label: undefined, // don't remove, needs some value provided to render properly
        data: rawData?.map((item) => item.amount) || [],
        barThickness: 38,
        borderRadius: 4,
        backgroundColor: rawData?.map((item) => item.color),
      },
    ],
  } satisfies ChartData

  return (
    <div className="my-16">
      <Center className="mb-4 w-full md:mb-6">
        <div className="relative m-auto mb-4 h-[300px] w-[80vw] max-w-[500px] md:mb-0 md:h-[400px]">
          {isClient && (
            <Bar options={chartOptions} data={chartData} updateMode="none" />
          )}
        </div>
      </Center>

      <p className="text-center font-semibold">
        {t("page-what-is-ethereum-energy-consumption-chart-legend")}
      </p>
    </div>
  )
}

export default EnergyConsumptionChart
