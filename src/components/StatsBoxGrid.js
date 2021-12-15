import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import axios from "axios"

import { AreaChart, ResponsiveContainer, Area, XAxis } from "recharts"
import Translation from "./Translation"
import Tooltip from "./Tooltip"
import Link from "./Link"
import Icon from "./Icon"

import { isLangRightToLeft } from "../utils/translations"
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
  font-family: ${(props) => props.theme.fonts.monospace};
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
  ${({ dir }) => (dir === "rtl" ? "left:" : "right:")} 20px;
  bottom: 20px;
  font-family: ${(props) => props.theme.fonts.monospace};
`

const Button = styled.button`
  background: ${(props) => props.theme.colors.background};
  font-family: ${(props) => props.theme.fonts.monospace};
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
    background-color: ${theme.colors.homeBoxPurple};
    opacity: 1;
  `}
`

const ranges = ["30d", "90d"]

const GridItem = ({ metric, dir }) => {
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
          <ButtonContainer dir={dir}>{buttonContainer}</ButtonContainer>
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
    data: [ { timestamp: 1639407830407, value: 3929.633738994626 },
  { timestamp: 1639411227619, value: 3817.904947548677 },
  { timestamp: 1639415055599, value: 3810.344831624288 },
  { timestamp: 1639418582451, value: 3831.5690191985314 },
  { timestamp: 1639422254456, value: 3830.1929762723826 },
  { timestamp: 1639425968348, value: 3762.646672520613 },
  { timestamp: 1639429418457, value: 3754.035253817073 },
  { timestamp: 1639433022496, value: 3774.1942722802905 },
  { timestamp: 1639436548109, value: 3806.004148743122 },
  { timestamp: 1639440115290, value: 3782.8952622347147 },
  { timestamp: 1639443698343, value: 3826.6531823195887 },
  { timestamp: 1639447393834, value: 3788.5510239453865 },
  { timestamp: 1639451040886, value: 3780.404112324499 },
  { timestamp: 1639454563622, value: 3774.25505936072 },
  { timestamp: 1639458170608, value: 3777.2237468681574 },
  { timestamp: 1639461850755, value: 3761.9649986771856 },
  { timestamp: 1639465383930, value: 3718.9566995666114 },
  { timestamp: 1639469039289, value: 3782.509569401334 },
  { timestamp: 1639472646781, value: 3823.1432733403526 },
  { timestamp: 1639476165843, value: 3777.5401922318065 },
  { timestamp: 1639479764046, value: 3815.791642389086 },
  { timestamp: 1639483417634, value: 3830.132476681905 },
  { timestamp: 1639487012808, value: 3837.276771862022 },
  { timestamp: 1639490668053, value: 3791.9246917782903 },
  { timestamp: 1639494221644, value: 3824.011155339998 },
  { timestamp: 1639497814956, value: 3787.5285974193916 },
  { timestamp: 1639501350627, value: 3790.154910467007 },
  { timestamp: 1639504927223, value: 3775.2195950146133 },
  { timestamp: 1639508600224, value: 3742.66594924193 },
  { timestamp: 1639512108963, value: 3770.62002537378 },
  { timestamp: 1639515891417, value: 3841.4464146457954 },
  { timestamp: 1639519405953, value: 3886.1117047052967 },
  { timestamp: 1639522926628, value: 3848.209144369092 },
  { timestamp: 1639526616096, value: 3865.2666087105254 },
  { timestamp: 1639530124747, value: 3865.2554479768364 },
  { timestamp: 1639533818518, value: 3841.6397304612433 } ],
    value: '$1234',
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
        // throw new Error("Debug: Skip fetching prices from CoinGecko")
        const daysToFetch = 90
        const toUnixTimestamp = Math.floor(new Date().getTime() / 1000) // "Now" as unix timestamp (seconds)
        const fromUnixTimestamp = toUnixTimestamp - 60 * 60 * 24 * daysToFetch // {daysToFetch} days ago (in seconds)
        // TODO: Switch back to `getData()` to use cache before prod
        // const {
        //   data: { prices },
        // } = await axios.get(
        //   `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${fromUnixTimestamp}&to=${toUnixTimestamp}`
        // )

        const { prices } = {
          prices: [
            [1639407830407, 3929.633738994626],
            [1639411227619, 3817.904947548677],
            [1639415055599, 3810.344831624288],
            [1639418582451, 3831.5690191985314],
            [1639422254456, 3830.1929762723826],
            [1639425968348, 3762.646672520613],
            [1639429418457, 3754.035253817073],
            [1639433022496, 3774.1942722802905],
            [1639436548109, 3806.004148743122],
            [1639440115290, 3782.8952622347147],
            [1639443698343, 3826.6531823195887],
            [1639447393834, 3788.5510239453865],
            [1639451040886, 3780.404112324499],
            [1639454563622, 3774.25505936072],
            [1639458170608, 3777.2237468681574],
            [1639461850755, 3761.9649986771856],
            [1639465383930, 3718.9566995666114],
            [1639469039289, 3782.509569401334],
            [1639472646781, 3823.1432733403526],
            [1639476165843, 3777.5401922318065],
            [1639479764046, 3815.791642389086],
            [1639483417634, 3830.132476681905],
            [1639487012808, 3837.276771862022],
            [1639490668053, 3791.9246917782903],
            [1639494221644, 3824.011155339998],
            [1639497814956, 3787.5285974193916],
            [1639501350627, 3790.154910467007],
            [1639504927223, 3775.2195950146133],
            [1639508600224, 3742.66594924193],
            [1639512108963, 3770.62002537378],
            [1639515891417, 3841.4464146457954],
            [1639519405953, 3886.1117047052967],
            [1639522926628, 3848.209144369092],
            [1639526616096, 3865.2666087105254],
            [1639530124747, 3865.2554479768364],
            [1639533818518, 3841.6397304612433],
          ],
        }
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
//     fetchPrices()

    const fetchNodes = async () => {
      try {
        const { result } = await getData(
          process.env.NODE_ENV === "production"
            ? "/.netlify/functions/etherscan"
            : "http://localhost:9000/etherscan"
        )
        const data = result
          .map(({ UTCDate, TotalNodeCount }) => ({
            timestamp: new Date(UTCDate).getTime(),
            value: Number(TotalNodeCount),
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
        const response = await getData(
          process.env.NODE_ENV === "production"
            ? "/.netlify/functions/defipulse"
            : "http://localhost:9000/defipulse"
        )
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
        const response = await getData(
          process.env.NODE_ENV === "production"
            ? "/.netlify/functions/txs"
            : "http://localhost:9000/txs"
        )
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
  const dir = isLangRightToLeft(intl.locale) ? "rtl" : "ltr"
  return (
    <Grid>
      {metrics.map((metric, idx) => (
        <GridItem key={idx} metric={metric} dir={dir} />
      ))}
    </Grid>
  )
}

export default StatsBoxGrid
