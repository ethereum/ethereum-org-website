import React from "react"
import {
  Box,
  Center,
  chakra,
  useBreakpointValue,
  useToken,
} from "@chakra-ui/react"
import {
  BarChart,
  Bar,
  Cell,
  Text,
  XAxis,
  LabelList,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Translation from "./Translation"

interface ITickProps {
  x: number
  y: number
  payload: { value: number | string }
}

type Data = Array<{
  name: string
  amount: number
  color: string
}>

const RechartText = chakra(Text, {
  shouldForwardProp: (prop) => {
    const isValidRechartProp = [
      "width",
      "children",
      "x",
      "y",
      "dy",
      "angle",
      "scaleToFit",
      "textAnchor",
      "verticalAnchor",
      "breakAll",
      "maxLines",
    ].includes(prop)

    if (isValidRechartProp) return true

    return false
  },
})

const CustomTick: React.FC<ITickProps> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <RechartText
        x={0}
        y={0}
        dy={15}
        fill="text"
        width={50}
        textAnchor="middle"
        verticalAnchor="middle"
        fontSize="2xs"
      >
        {payload.value}
      </RechartText>
    </g>
  )
}

const EnergyConsumptionChart: React.FC = () => {
  const { t } = useTranslation()

  const textColor = useToken("colors", "text")

  const data = useBreakpointValue<Data>({
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

  return (
    <Center w="full">
      <Box maxW="500px" w="full">
        <ResponsiveContainer height={500}>
          <BarChart
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            barGap={15}
            barSize={38}
            data={data}
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
                  <Translation id="page-what-is-ethereum-energy-consumption-chart-legend" />
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
        </ResponsiveContainer>
      </Box>
    </Center>
  )
}

export default EnergyConsumptionChart
