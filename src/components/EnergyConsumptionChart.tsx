import React from "react"
import { useEffect, useState } from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
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
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { wrapLabel } from "@/lib/utils/charts"
import { isLangRightToLeft } from "@/lib/utils/translations"

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

  const useIsClient = () => {
    const [isClient, setClient] = useState(false)

    useEffect(() => {
      setClient(true)
    }, [])

    return isClient
  }

  // chart rawData, according to different breakpoints
  const rawData = useBreakpointValue({
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

  const aspectRatioValue = useBreakpointValue({
    base: 0.55,
    sm: 0.75,
    md: 1.1,
  })

  // chart options config
  const chartOptions = {
    // chart styles
    barThickness: 38,
    borderRadius: 4,
    responsive: true,
    aspectRatio: aspectRatioValue,
    maintainAspectRatio: true,
    hover: { mode: null } as any, // casted to avoid TS issue
    backgroundColor: rawData?.map((item) => item.color) as any, // casted to avoid TS issue
    plugins: {
      // required plugin to display labels on top
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
          autoSkip: false, // avoid long labels to be hidden
          padding: 0, // removes default padding betwen x-labels and chart
          maxRotation: 0, // turns off rotation
          beginAtZero: true,
        },
      },
    },
  }

  const chartData = {
    labels: rawData?.map((item) => wrapLabel(item.name)),
    datasets: [
      {
        label: undefined, // don't remove, needs some value provided to render properly
        data: rawData?.map((item) => item.amount) || [],
      },
    ],
  } satisfies ChartData

  return (
    <Box my={16}>
      <Center w="full" mb={{ base: 4, md: 6 }}>
        <Box
          position="relative"
          maxW="500px"
          m="auto"
          w="80vw"
          mb={{ base: 4, md: 0 }}
        >
          {/* TODO: isRtl ? data?.reverse() : data */}
          {useIsClient() && (
            <Bar options={chartOptions} data={chartData} updateMode="none" />
          )}
        </Box>
      </Center>

      <Text fontWeight="semibold" textAlign="center">
        {t("page-what-is-ethereum-energy-consumption-chart-legend")}
      </Text>
    </Box>
  )
}

export default EnergyConsumptionChart
