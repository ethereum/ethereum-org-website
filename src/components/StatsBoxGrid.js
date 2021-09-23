import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import axios from "axios"

import { AreaChart, ResponsiveContainer, Area, XAxis } from "recharts"
import Translation from "./Translation"
import Tooltip from "./Tooltip"
import Link from "./Link"
import Icon from "./Icon"

import { getData } from "../utils/cache"

const Value = styled.h3`
  position: absolute;
  bottom: 8%;
  font-size: min(4.4vw, 64px);
  font-weight: 600;
  margin-top: 0rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  flex-wrap: wrap;
  text-overflow: ellipsis;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    font-size: max(8.8vw, 48px);
  }
`

const Title = styled.p`
  font-size: 20px;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  font-family: "SFMono-Regular", monospace;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2rem 2rem 0;
  border-radius: 2px;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2rem 0 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    margin: 0;
  }
`

const Box = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  height: 20rem;
  background: ${({ theme, color }) => theme.colors[color]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.color};
  padding: 1.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    border-left: 0px solid #000000;
    border-right: 0px solid #000000;
    margin-top: -1px;
    padding: 1rem;
    padding-top: 2rem;
  }
`

const StatRow = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.text};
  margin-right: 0.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
  }
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const IndicatorSpan = styled.span`
  font-size: 2rem;
`

const ErrorMessage = () => (
  <IndicatorSpan>
    <Translation id="loading-error-refresh" />
  </IndicatorSpan>
)

const LoadingMessage = () => (
  <IndicatorSpan>
    <Translation id="loading" />
  </IndicatorSpan>
)

const Lines = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 65%;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-family: "SFMono-Regular", monospace;
`

const Button = styled.button`
  background: ${(props) => props.theme.colors.background};
  font-family: "SFMono-Regular", monospace;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  padding: 2px 15px;
  border-radius: 1px;
  border: 1px solid ${({ theme, color }) => theme.colors[color]};
  outline: none;
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`

const ButtonToggle = styled(Button)`
  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colors.gridPurple};
    opacity: 1;
  `}
`

const ranges = ["30d", "90d"]

const GridItem = ({ metric }) => {
  const { title, description, state, buttonContainer, range } = metric
  const isLoading = !state.value
  const value = state.hasError ? (
    <ErrorMessage />
  ) : isLoading ? (
    <LoadingMessage />
  ) : (
    <StatRow>
      <span>
        {state.value}{" "}
        <Tooltip content={tooltipContent(metric)}>
          <StyledIcon name="info" />
        </Tooltip>
      </span>
    </StatRow>
  )

  // Returns either 90 or 30-day data range depending on `range` selection
  const filteredData = (data) => {
    if (!data) return null
    if (range === ranges[1]) return [...data]
    return data.filter(({ timestamp }) => {
      const millisecondRange = 1000 * 60 * 60 * 24 * 30
      const now = new Date().getTime()
      return timestamp >= now - millisecondRange
    })
  }

  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={filteredData(state.data)}
        margin={{ left: -5, right: -5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={0.3}
          fill="url(#colorUv)"
          fillOpacity="0.2"
          connectNulls={true}
        />
        <XAxis dataKey="timestamp" axisLine={false} tick={false} />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <Box>
      <div>
        <Title>{title}</Title>
        <p>{description}</p>
      </div>
      {!state.hasError && !isLoading && (
        <>
          <Lines>{chart}</Lines>
          <ButtonContainer>{buttonContainer}</ButtonContainer>
        </>
      )}
      <Value>{value}</Value>
    </Box>
  )
}

const tooltipContent = (metric) => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link to={metric.apiUrl}>{metric.apiProvider}</Link>
  </div>
)

const RangeSelector = ({ state, setState }) => (
  <div>
    {ranges.map((range, idx) => (
      <ButtonToggle
        active={state === range}
        onClick={() => {
          setState(ranges[idx])
        }}
        key={idx}
      >
        {range}
      </ButtonToggle>
    ))}
  </div>
)

const StatsBoxGrid = () => {
  const intl = useIntl()
  const [ethPrices, setEthPrices] = useState({
    data: [],
    value: 0,
    hasError: false,
  })
  const [valueLocked, setValueLocked] = useState({
    data: [],
    value: 0,
    hasError: false,
  })
  const [txs, setTxs] = useState({
    data: [],
    value: 0,
    hasError: false,
  })
  const [nodes, setNodes] = useState({
    data: [],
    value: 0,
    hasError: false,
  })
  const [selectedRangePrice, setSelectedRangePrice] = useState(ranges[0])
  const [selectedRangeTvl, setSelectedRangeTvl] = useState(ranges[0])
  const [selectedRangeNodes, setSelectedRangeNodes] = useState(ranges[0])
  const [selectedRangeTxs, setSelectedRangeTxs] = useState(ranges[0])

  const formatPrice = (price) => {
    return new Intl.NumberFormat(intl.locale, {
      style: "currency",
      currency: "USD",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 4,
    }).format(price)
  }

  const formatTVL = (tvl) => {
    return new Intl.NumberFormat(intl.locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 4,
    }).format(tvl)
  }

  const formatTxs = (txs) => {
    return new Intl.NumberFormat(intl.locale, {
      notation: "compact",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 4,
    }).format(txs)
  }

  const formatNodes = (nodes) => {
    return new Intl.NumberFormat(intl.locale, {
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 4,
    }).format(nodes)
  }

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const daysToFetch = 90
        const toUnixTimestamp = Math.floor(new Date().getTime() / 1000) // "Now" as unix timestamp (seconds)
        const fromUnixTimestamp = toUnixTimestamp - 60 * 60 * 24 * daysToFetch // {daysToFetch} days ago (in seconds)
        // TODO: Switch back to `getData()` to use cache before prod
        const {
          data: { prices },
        } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${fromUnixTimestamp}&to=${toUnixTimestamp}`
        )
        const data = prices
          .map(([timestamp, value]) => ({
            timestamp,
            value,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        const value = formatPrice(data[data.length - 1].value)
        setEthPrices({
          data, // historical data: {timestamp: unix-milliseconds, value }
          value, // current value
          hasError: false,
        })
      } catch (error) {
        setEthPrices({
          ...ethPrices,
          hasError: true,
        })
      }
    }
    fetchPrices()

    const fetchNodes = async () => {
      try {
        const { result } = await getData("/.netlify/functions/etherscan")
        const data = result
          .map(({ UTCDate, TotalNodeCount }) => ({
            timestamp: new Date(UTCDate).getTime(),
            value: TotalNodeCount,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        const value = formatNodes(data[data.length - 1].value)
        setNodes({
          data, // historical data: {timestamp: unix-milliseconds, value }
          value, // current value
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setNodes({
          ...nodes,
          hasError: true,
        })
      }
    }
    fetchNodes()

    const fetchTotalValueLocked = async () => {
      try {
        const response = await getData("/.netlify/functions/defipulse")
        const data = response
          .map(({ timestamp, tvlUSD }) => ({
            timestamp: parseInt(timestamp) * 1000,
            value: tvlUSD,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        const value = formatTVL(data[data.length - 1].value)
        setValueLocked({
          data, // historical data: {timestamp: unix-milliseconds, value }
          value, // current value
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setValueLocked({
          ...valueLocked,
          hasError: true,
        })
      }
    }
    fetchTotalValueLocked()

    const fetchTxCount = async () => {
      try {
        const response = await getData("/.netlify/functions/txs")
        const data = response.result
          .map(({ unixTimeStamp, transactionCount }) => ({
            timestamp: parseInt(unixTimeStamp) * 1000, // unix milliseconds
            value: transactionCount,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        const value = formatTxs(data[data.length - 1].value)
        setTxs({
          data,
          value,
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setTxs({
          ...txs,
          hasError: true,
        })
      }
    }
    fetchTxCount()
  }, [])

  const metrics = [
    {
      apiProvider: "CoinGecko",
      apiUrl: "https://www.coingecko.com/en/coins/ethereum",
      title: (
        <Translation id="page-index-network-stats-eth-price-description" />
      ),
      description: (
        <Translation id="page-index-network-stats-eth-price-explainer" />
      ),
      buttonContainer: (
        <RangeSelector
          state={selectedRangePrice}
          setState={setSelectedRangePrice}
        />
      ),
      state: ethPrices,
      range: selectedRangePrice,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/",
      title: <Translation id="page-index-network-stats-tx-day-description" />,
      description: (
        <Translation id="page-index-network-stats-tx-day-explainer" />
      ),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTxs}
          setState={setSelectedRangeTxs}
        />
      ),
      state: txs,
      range: selectedRangeTxs,
    },
    {
      apiProvider: "DeFi Pulse",
      apiUrl: "https://defipulse.com",
      title: (
        <Translation id="page-index-network-stats-value-defi-description" />
      ),
      description: (
        <Translation id="page-index-network-stats-value-defi-explainer" />
      ),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTvl}
          setState={setSelectedRangeTvl}
        />
      ),
      state: valueLocked,
      range: selectedRangeTvl,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/nodetracker",
      title: <Translation id="page-index-network-stats-nodes-description" />,
      description: (
        <Translation id="page-index-network-stats-nodes-explainer" />
      ),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeNodes}
          setState={setSelectedRangeNodes}
        />
      ),
      state: nodes,
      range: selectedRangeNodes,
    },
  ]

  return (
    <Grid>
      {metrics.map((metric, idx) => (
        <GridItem key={idx} metric={metric} />
      ))}
    </Grid>
  )
}

export default StatsBoxGrid
