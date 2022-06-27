import React from "react"
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

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.chartBackground};
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

const CustomTick = ({ x, y, payload }) => {
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
        fontSize={12}
      >
        {payload.value}
      </StyledText>
    </g>
  )
}

const EnergyConsumptionChart = ({ data, legend }) => {
  const theme = useTheme()

  return (
    <Container>
      <ResponsiveContainer height={500}>
        <BarChart
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          barGap={15}
          barSize={38}
          data={data}
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
          <Legend content={<StyledLegend>{legend}</StyledLegend>} />
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
            {data.map((data, index) => (
              <Cell key={`cell-${index}`} fill={data.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default EnergyConsumptionChart
