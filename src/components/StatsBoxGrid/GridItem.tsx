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
import { Box, Flex, Icon, Text } from "@chakra-ui/react"

import type { StatsBoxMetric, TimestampedData } from "@/lib/types"

import { RANGES } from "@/lib/constants"

import InlineLink from "../Link"
import OldText from "../OldText"
import StatErrorMessage from "../StatErrorMessage"
import Tooltip from "../Tooltip"
import Translation from "../Translation"

const tooltipContent = (metric: StatsBoxMetric) => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <InlineLink href={metric.apiUrl}>{metric.apiProvider}</InlineLink>
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
    <Box display="inline">
      <Box
        fontSize={{ base: "max(8.8vw, 48px)", lg: "min(4.4vw, 4rem)" }}
        display="inline"
        lineHeight="100%"
      >
        {state.value}{" "}
      </Box>
      <Box display="inline">
        <Tooltip content={tooltipContent(metric)}>
          <Box as="span" display="inline-block">
            <Icon
              as={MdInfoOutline}
              boxSize={6}
              fill="text"
              _hover={{ fill: "primary.base" }}
              _active={{ fill: "primary.base" }}
              _focus={{ fill: "primary.base" }}
            />
          </Box>
        </Tooltip>
      </Box>
    </Box>
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
    <Flex
      position="relative"
      color="text"
      height={80}
      flexDirection="column"
      justifyContent="space-between"
      borderX={{
        base: "0px solid #000000",
        lg: "1px solid",
      }}
      borderY="1px solid"
      marginTop={{
        base: "-1px",
        lg: "0",
      }}
      padding={{ base: "2rem 1rem 1rem", lg: "1.5rem" }}
    >
      <Box>
        <Text
          fontSize="xl"
          mb={2}
          color="text"
          textTransform="uppercase"
          fontFamily="monospace"
        >
          {title}
        </Text>
        <OldText>{description}</OldText>
      </Box>
      {hasData && (
        <Box position="absolute" insetInline="0" bottom={7} height="60%">
          <Line options={chartOptions} data={chartData} />
        </Box>
      )}
      <Flex
        justifyContent="space-between"
        position="relative"
        alignItems="flex-end"
      >
        <Box
          fontWeight={600}
          color="text"
          flexWrap="wrap"
          textOverflow="ellipsis"
        >
          {value}
        </Box>
        {hasData && (
          <Box fontFamily="monospace" me="-1" mb="-1">
            {buttonContainer}
          </Box>
        )}
      </Flex>
    </Flex>
  )
}
