import React from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Bar } from "react-chartjs-2"
import {
  Box,
  Center,
  chakra,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { splitLongLabels } from "@/lib/utils/charts"
import { isLangRightToLeft } from "@/lib/utils/translations"

import {
  ENERGY_CONSUMPTION_CHART_COLORS,
  ENERGY_CONSUMPTION_CHART_DATA,
} from "@/lib/constants"

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
  const isRtl = isLangRightToLeft(locale as Lang)

  // chart labels
  const labels = [
    t("energy-consumption-chart-global-data-centers-label"),
    t("energy-consumption-chart-btc-pow-label"),
    t("energy-consumption-gold-mining-cbeci-label"),
    t("energy-consumption-chart-gaming-us-label"),
    t("energy-consumption-chart-eth-pow-label"),
    "Google",
    t("energy-consumption-chart-netflix-label"),
    t("energy-consumption-chart-paypal-label"),
    t("energy-consumption-chart-airbnb-label"),
    t("energy-consumption-chart-eth-pos-label"),
  ]

  const chartOptions = {
    // chart styles
    barThickness: 38,
    borderRadius: 4,
    aspectRatio: 1.1,
    responsive: true,
    maintainAspectRatio: true,
    hover: { mode: null } as any, // casted to avoid TS issue
    backgroundColor: ENERGY_CONSUMPTION_CHART_COLORS as any, // casted to avoid TS issue
    plugins: {
      // required for labels on top
      datalabels: {
        // https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html#alignment-and-offset
        anchor: "end" as any, // position of the labels (start, end, center), casted to avoid TS issue
        align: "end" as any, // alignment of the labels (start, end, center), casted to avoid TS issue
        offset: -0.5, // distance (in pixels) to pull the label away from the anchor point
        font: {
          size: "14px",
        } as any, // casted to avoid TS issue,
        color: useColorModeValue("#333333", "#F2F2F2"),
      },
      // hide legend
      legend: {
        display: true,
        position: "bottom" as any, // casted to avoid TS issue
        align: "center" as any, // casted to avoid TS issue
        labels: {
          font: {
            weight: "bold",
            size: "16px",
          } as any, // casted to avoid TS issue
          color: useColorModeValue("#333333", "#F2F2F2"),
          boxWidth: 0,
        },
        rtl: isRtl,
      },
      // hide chart title
      title: {
        display: false,
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
        },
      },
    },
  }

  const chartData = {
    labels: splitLongLabels(labels),
    datasets: [
      {
        label: t("page-what-is-ethereum-energy-consumption-chart-legend"),
        data: ENERGY_CONSUMPTION_CHART_DATA,
      },
    ],
  }

  // TODO: add mobile breakpoints
  // const data = useBreakpointValue<Data>({
  //   base: [
  //     {
  //       name: t("energy-consumption-chart-global-data-centers-label"),
  //       amount: 190,
  //       color: "#FF0000",
  //     },
  //     {
  //       name: t("energy-consumption-chart-btc-pow-label"),
  //       amount: 149,
  //       color: "#F2A900",
  //     },
  //     {
  //       name: t("energy-consumption-chart-gaming-us-label"),
  //       amount: 34,
  //       color: "#71BB8A",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pow-label"),
  //       amount: 21,
  //       color: "#C1B6F5",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pos-label"),
  //       amount: 0.0026,
  //       color: "#C1B6F5",
  //     },
  //   ],
  //   sm: [
  //     {
  //       name: t("energy-consumption-chart-global-data-centers-label"),
  //       amount: 190,
  //       color: "#FF0000",
  //     },
  //     {
  //       name: t("energy-consumption-chart-btc-pow-label"),
  //       amount: 149,
  //       color: "#D7B14A",
  //     },
  //     {
  //       name: t("energy-consumption-gold-mining-cbeci-label"),
  //       amount: 131,
  //       color: "#F2A900",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pow-label"),
  //       amount: 21,
  //       color: "#C1B6F5",
  //     },
  //     {
  //       name: t("energy-consumption-chart-netflix-label"),
  //       amount: 0.457,
  //       color: "#E50914",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pos-label"),
  //       amount: 0.0026,
  //       color: "#C1B6F5",
  //     },
  //   ],
  //   md: [
  //     {
  //       name: t("energy-consumption-chart-global-data-centers-label"),
  //       amount: 190,
  //       color: "#FF0000",
  //     },
  //     {
  //       name: t("energy-consumption-chart-btc-pow-label"),
  //       amount: 149,
  //       color: "#D7B14A",
  //     },
  //     {
  //       name: t("energy-consumption-gold-mining-cbeci-label"),
  //       amount: 131,
  //       color: "#D7B14A",
  //     },
  //     {
  //       name: t("energy-consumption-chart-gaming-us-label"),
  //       amount: 34,
  //       color: "#71BB8A",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pow-label"),
  //       amount: 21,
  //       color: "#C1B6F5",
  //     },
  //     {
  //       name: "Google",
  //       amount: 19,
  //       color: "#E50914",
  //     },
  //     {
  //       name: t("energy-consumption-chart-netflix-label"),
  //       amount: 0.457,
  //       color: "#E50914",
  //     },
  //     {
  //       name: t("energy-consumption-chart-paypal-label"),
  //       amount: 0.26,
  //       color: "#C1B6F5",
  //     },
  //     {
  //       name: t("energy-consumption-chart-airbnb-label"),
  //       amount: 0.02,
  //       color: "#E50914",
  //     },
  //     {
  //       name: t("energy-consumption-chart-eth-pos-label"),
  //       amount: 0.0026,
  //       color: "#C1B6F5",
  //     },
  //   ],
  // })

  return (
    <Center w="full">
      <Box maxW="500px" w="full">
        {/* TODO: isRtl ? data?.reverse() : data */}
        <Bar options={chartOptions} data={chartData} />
      </Box>
    </Center>
  )
}

export default EnergyConsumptionChart
