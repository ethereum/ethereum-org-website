import React, { useMemo } from "react"
import styled, { useTheme } from "styled-components"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Text,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { useWindowSize } from "../hooks/useWindowSize"

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 0.3rem;
`

const StyledText = styled(Text)`
  font-size: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    font-size: 12px;
  }
`

const StyledLegend = styled.div`
  text-align: center;
  color: ${({ theme }) => (theme.isDark ? theme.colors.text : "#08084d")};
  font-weight: 600;
  margin-top: 2rem;
`

interface ILegendProps {
  legend: string
}

const CustomLegend: React.FC<ILegendProps> = ({ legend }) => {
  return <StyledLegend>{legend}</StyledLegend>
}

interface ITickProps {
  x: number
  y: number
  payload: { value: number | string }
}

const CustomTick: React.FC<ITickProps> = ({ x, y, payload }) => {
  const theme = useTheme()

  return (
    <g transform={`translate(${x},${y})`}>
      <StyledText
        x={0}
        y={0}
        dy={15}
        width={50}
        fill={theme.colors.text}
        textAnchor="middle"
        verticalAnchor="middle"
      >
        {payload.value}
      </StyledText>
    </g>
  )
}

export interface IProps {
  data: Array<{
    name: string
    amount: number
    color: string
    breakpoint?: number
  }>
  legend: string
}

const EnergyConsumptionChart: React.FC<IProps> = ({ data, legend }) => {
  const theme = useTheme()
  const [width] = useWindowSize()

  const filteredData = useMemo(() => {
    return data.filter((cell) => {
      if (!cell.breakpoint) {
        return true
      }

      return cell.breakpoint < width
    })
  }, [data, width])

  return (
    <Container>
      <ResponsiveContainer height={500}>
        <BarChart
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          barGap={15}
          barSize={38}
          data={filteredData}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="5 3"
            stroke="#B9B9B9"
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            // @ts-ignore
            tick={<CustomTick />}
            interval={0}
          />
          <Legend content={<CustomLegend legend={legend} />} />
          <Bar
            dataKey="amount"
            radius={[4, 4, 0, 0]}
            // Disable animation ~ issue w/ LabelList. Ref: https://github.com/recharts/recharts/issues/1135
            isAnimationActive={false}
          >
            <LabelList
              position="top"
              fill={theme.colors.text}
              fontSize={14}
              offset={10}
            />
            {filteredData.map((cell, index) => (
              <Cell key={`cell-${index}`} fill={cell.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default EnergyConsumptionChart
