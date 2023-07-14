import React from "react"
import { Box, Center, useToken } from "@chakra-ui/react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Text,
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

const CustomTick: React.FC<ITickProps> = ({ x, y, payload }) => {
  const textColor = useToken("colors", "text")

  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={0}
        y={0}
        dy={15}
        width={50}
        fill={textColor}
        textAnchor="middle"
        verticalAnchor="middle"
        fontSize="10px"
      >
        {payload.value}
      </Text>
    </g>
  )
}

const EnergyConsumptionChart: React.FC = () => {
  const { t } = useTranslation()

  const textColor = useToken("colors", "text")

  const data = [
    {
      name: "Global data centers",
      amount: 190,
      color: "#C1B6F5",
    },
    {
      name: "Bitcoin",
      amount: 149,
      color: "#C1B6F5",
    },
    {
      name: "Gold mining",
      amount: 131,
      color: "#C1B6F5",
    },
    {
      name: "Gaming in USA",
      amount: 34,
      color: "#C1B6F5",
    },
    {
      name: "PoW Ethereum",
      amount: 21,
      color: "#C1B6F5",
    },
    {
      name: "Google",
      amount: 19,
      color: "#C1B6F5",
    },
    {
      name: "Netflix",
      amount: 0.457,
      color: "#C1B6F5",
    },
    {
      name: "PayPal",
      amount: 0.26,
      color: "#C1B6F5",
    },
    {
      name: "Airbnb",
      amount: 0.02,
      color: "#C1B6F5",
    },
    {
      name: "PoS Ethereum",
      amount: 0.0026,
      color: "#C1B6F5",
    },
  ]

  return (
    <Center w="full">
      <Box maxW="500px" w="full">
        <ResponsiveContainer height={550}>
          <BarChart
            margin={{ top: 30, right: 40, bottom: 30, left: 20 }}
            data={data}
            barGap={20}
            barSize={30}
            layout={"vertical"}
          >
            <XAxis type={"number"} orientation={"bottom"} />
            <YAxis
              type={"category"}
              orientation={"left"}
              dataKey={"name"}
              tick={{ fontSize: 14 }}
              width={120}
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
                position="right"
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
