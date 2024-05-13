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
  useToken,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

// const RechartText = chakra(Text, {
//   shouldForwardProp: (prop) => {
//     const isValidRechartProp = [
//       "width",
//       "children",
//       "x",
//       "y",
//       "dy",
//       "angle",
//       "scaleToFit",
//       "textAnchor",
//       "verticalAnchor",
//       "breakAll",
//       "maxLines",
//     ].includes(prop)

//     return isValidRechartProp
//   },
// })

// ChartDataLabels required to display y-labels on top of bars
ChartJS.register(
  CategoryScale,
  LinearScale,
  Legend,
  BarElement,
  ChartDataLabels
)

// TODO: move to constants
const ENERGY_CONSUMPTION_CHART_COLORS = [
  "#FF0000",
  "#D7B14A",
  "#D7B14A",
  "#71BB8A",
  "#C1B6F5",
  "#E50914",
  "#E50914",
  "#C1B6F5",
  "#E50914",
  "#C1B6F5",
]

// TODO: move to utils/charts
const splitLongLabels = (label) => {
  const labelLength = label.length
  const splittedLabel: any[] = label

  for (let i = 0; i < labelLength; i++) {
    const word = label[i].trim().split(" ")

    if (word.length > 1) {
      splittedLabel[i] = word
    }
  }

  return splittedLabel
}

// TODO: move to constants
const ENERGY_CONSUMPTION_CHART_DATA = [
  190, 149, 131, 34, 21, 19, 0.457, 0.26, 0.02, 0.0026,
]

const EnergyConsumptionChart = () => {
  const { t } = useTranslation("page-what-is-ethereum")
  const textColor = useToken("colors", "text")
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale as Lang)

  // useColorModeValue("blackAlpha.700", "whiteAlpha.800")
  // const { colorMode } = useColorMode()
  // const isDark = colorMode === "dark"
  // isDark ? "#FBF9A5" : "#95935B"

  // TODO: fix
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
    type: "bar",
    aspectRatio: 1.1,
    maintainAspectRatio: true,
    barThickness: 38,
    borderRadius: 4,
    minBarLength: 1,
    tooltips: { enabled: false },
    hover: { mode: null },
    backgroundColor: ENERGY_CONSUMPTION_CHART_COLORS,
    plugins: {
      // required for labels on top
      datalabels: {
        // https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html#alignment-and-offset
        anchor: "end", // position of the labels (start, end, center)
        align: "end", // alignment of the labels (start, end, center)
        offset: -0.5, // distance (in pixels) to pull the label away from the anchor point
        font: {
          size: "14px",
        },
        color: useColorModeValue("#333333", "#F2F2F2"),
      },
      // hide legend
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          font: {
            weight: "bold",
            size: "16px",
          },
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
        ticks: { color: useColorModeValue("#333333", "#F2F2F2") },
      },
    },
  }

  const chartData = {
    labels: splitLongLabels(labels),
    datasets: [
      {
        label: t("page-what-is-ethereum-energy-consumption-chart-legend"),
        data: ENERGY_CONSUMPTION_CHART_DATA,
        // barPercentage: 1.0,
        // categoryPercentage: 1.0,
      },
    ],
  }

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
        {/* <ResponsiveContainer height={500}>
          <BarChart
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            barGap={15}
            barSize={38}
            data={isRtl ? data?.reverse() : data}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={(props) => <CustomTick {...props} />}
              interval={0}
            />
            <Legend
              content={
                <Box textAlign="center" color="text" fontWeight="600" mt={8}>
                  {t("page-what-is-ethereum-energy-consumption-chart-legend")}
                </Box>
              }
            />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              // Disable animation ~ issue w/ LabelList. Ref: https://github.com/recharts/recharts/issues/1135
              isAnimationActive={false}
            >
              <LabelList
                position="top"
                fill={textColor}
                fontSize={14}
                offset={10}
              />
              {(data || []).map((cell, index) => (
                <Cell key={`cell-${index}`} fill={cell.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer> */}
        {/* TODO: isRtl ? data?.reverse() : data */}
        <Bar options={chartOptions} data={chartData} />
      </Box>
    </Center>
  )
}

export default EnergyConsumptionChart
