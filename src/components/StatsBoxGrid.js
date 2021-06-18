import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import axios from "axios"

import {
  AreaChart,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
} from "recharts"
import Translation from "./Translation"
import Tooltip from "./Tooltip"
import Link from "./Link"
import Icon from "./Icon"

import { getData } from "../utils/cache"
import { range } from "lodash"
import { act } from "react-test-renderer"

const Value = styled.h3`
  font-size: min(4.4vw, 64px);
  font-weight: 600;
  margin-top: 0rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  flex-wrap: wrap;
  text-overflow: ellipsis;
  width: 100%;
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
  z-index: 1;
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
  &:hover {
    fill: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    fill: ${({ theme }) => theme.colors.primary};
  }
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
  margin-left: -5px;
  left: 0;
  bottom: 0;
  width: 101%;
  height: 200px;
  z-index: -1;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-family: "SFMono-Regular", monospace;
  // background: ${({ theme, color }) => theme.colors[color]};
`

const Button = styled.button`
  background: ${(props) => props.theme.colors.background};
  font-family: "SFMono-Regular", monospace;
  color: ${({ theme }) => theme.colors.text};
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid ${({ theme, color }) => theme.colors[color]};
  outline: none;
  // text-transform: uppercase;
  // margin: 10px 0px;
  cursor: pointer;
  // box-shadow: 0px 2px 2px lightgray;
  // transition: ease background-color 250ms;
  &:hover {
    background-color: blue;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`

const GridItem = ({ metric }) => {
  const { title, description, line, buttonContainer, state } = metric
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

  return (
    <Box>
      <div>
        <Title>{title}</Title>
        <p>{description}</p>
        <Lines>{line}</Lines>
        <ButtonContainer>{buttonContainer}</ButtonContainer>
      </div>

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

const StatsBoxGrid = () => {
  const intl = useIntl()
  const [ethPrice, setEthPrice] = useState({
    value: 0,
    hasError: false,
  })
  const [valueLocked, setValueLocked] = useState({
    value: 0,
    hasError: false,
  })
  const [txs, setTxs] = useState({
    value: 0,
    hasError: false,
  })
  const [nodes, setNodes] = useState({
    value: 0,
    hasError: false,
  })

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
    // Skip APIs when not in production
    if (process.env.NODE_ENV !== "production") {
      setEthPrice({
        value: formatPrice(1330),
        hasError: false,
      })
      setValueLocked({
        value: formatTVL(23456789000),
        hasError: false,
      })
      setTxs({
        value: formatTxs(1234567),
        hasError: false,
      })
      setNodes({
        value: formatNodes(8040),
        hasError: false,
      })
    } else {
      const fetchPrice = async () => {
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
          )
          const { usd } = response.data.ethereum
          const value = formatPrice(usd)
          setEthPrice({
            value,
            hasError: false,
          })
        } catch (error) {
          console.error(error)
          setEthPrice({
            hasError: true,
          })
        }
      }
      fetchPrice()

      const fetchNodes = async () => {
        try {
          const data = await getData("/.netlify/functions/etherscan")
          const total = data.result.TotalNodeCount
          const value = formatNodes(total)
          setNodes({
            value,
            hasError: false,
          })
        } catch (error) {
          console.error(error)
          setNodes({
            hasError: true,
          })
        }
      }
      fetchNodes()

      const fetchTotalValueLocked = async () => {
        try {
          const data = await getData("/.netlify/functions/defipulse")
          const ethereumTVL = data.ethereumTVL
          const value = formatTVL(ethereumTVL)
          setValueLocked({
            value,
            hasError: false,
          })
        } catch (error) {
          console.error(error)
          setValueLocked({
            hasError: true,
          })
        }
      }
      fetchTotalValueLocked()

      const fetchTxCount = async () => {
        try {
          const { result } = await getData("/.netlify/functions/txs")
          // result: [{UTCDate: string, unixTimeStamp: string, transactionCount: number}, {...}]
          const count = result[0].transactionCount
          const value = formatTxs(count)
          setTxs({
            value,
            hasError: false,
          })
        } catch (error) {
          console.error(error)
          setTxs({
            hasError: true,
          })
        }
      }
      fetchTxCount()
    }
  }, [])

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() - 1),
    oneMonthAgo =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
  const start = "2019-10-30"

  // let url =
  //   "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30&interval=hour"

  // const url1 =
  //   "https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=" +
  //   oneMonthAgo +
  //   "&enddate=" +
  //   date +
  //   "&sort=asc&apikey=2JD9ZCGGPST7VHY8FHW3NZKI1D34VQR4I5"

  // const url1 =
  //   "https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=2019-10-30&enddate=2021-06-14&clienttype=geth&syncmode=default&sort=asc&apikey=2JD9ZCGGPST7VHY8FHW3NZKI1D34VQR4I5"

  // const url2 =
  //   "https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key={{DeFi_Pulse_Key}}&period=1y&length=hours"

  const [App, setApp] = useState(null)
  useEffect(() => {
    coinGeckoData("30")
  }, [])

  function coinGeckoData(mode) {
    let url = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${mode}&interval=hour`
    axios.get(url).then((response) => {
      setApp(response.data)
    })
  }

  const [App1, setApp1] = useState(null)
  useEffect(() => {
    etherscanData(oneMonthAgo)
  }, [])

  let type
  function etherscanData(mode1) {
    let url1 = `https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=${mode1}&enddate=${date}&sort=asc&apikey=2JD9ZCGGPST7VHY8FHW3NZKI1D34VQR4I5`
    axios.get(url1).then((response) => {
      setApp1(response.data)
    })
  }

  const [App2, setApp2] = useState(null)
  useEffect(() => {
    defipalseData("1m")
  }, [])

  function defipalseData(mode2) {
    let url2 = `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=d68cfcfe749887913f720b22df372feb1b0f69e06e3e0c76eb25c592065a&period=${mode2}&length=days`
    axios.get(url2).then((response) => {
      setApp2(response.data)
    })
  }

  // console.log(App2)

  // let [data, setData] = useState(null)
  let data = []
  let data2 = []
  let data1 = []

  if (App) {
    for (const i in App.prices) {
      data.push({
        name: "Page A",
        uv: App.prices[i][1],
        pv: i,
        amt: 2400,
      })
    }
  }

  if (App1) {
    for (const i in App1.result) {
      data1.push({
        name: "Page A",
        uv: App1.result[i]["TotalNodeCount"],
        pv: App1.result[i]["UTCDate"],
        amt: 2400,
      })
    }
  }

  if (App2) {
    console.log(Object.keys(App2).length)
    for (let i = 1; i <= Object.keys(App2).length; i++) {
      if (i != "error") {
        data2.push({
          name: " Page A",
          uv: App2[Object.keys(App2).length - i]["tvlUSD"] / 1000000000,
          pv: Object.keys(App2).length - i,
          amt: 2400,
        })
      }
    }
  }

  const types = ["0", "1"]
  const coingeckoTypes = ["30", "max"]
  const defaultTypes = ["30d", "All"]

  function ToggleGroup() {
    const [active, setActive] = useState(types[0])
    return (
      <div>
        {types.map((type) => (
          <ButtonToggle
            active={active === type}
            onClick={() => {
              coinGeckoData(coingeckoTypes[type])
              setActive(type)
            }}
          >
            {defaultTypes[type]}
          </ButtonToggle>
        ))}
      </div>
    )
  }

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
      line: (
        <ResponsiveContainer>
          <AreaChart height={200} data={data}>
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
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="url(#colorUv)"
              fillOpacity="0.2"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
      buttonContainer: (
        // <div>
        //   <button onClick={() => coinGeckoData("30")}>30d</button>
        //   <button onClick={() => coinGeckoData("max")}>ALL</button>
        // </div>
        <ToggleGroup />
      ),
      state: ethPrice,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/",
      title: <Translation id="page-index-network-stats-tx-day-description" />,
      description: (
        <Translation id="page-index-network-stats-tx-day-explainer" />
      ),
      line: (
        <ResponsiveContainer>
          <AreaChart height={200} data={data}>
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
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="url(#colorUv)"
              fillOpacity="0.2"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
      buttonContainer: (
        <div>
          <button>30d</button>
          <button>ALL</button>
        </div>
      ),
      state: txs,
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
      line: (
        <ResponsiveContainer>
          <AreaChart data={data2}>
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
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="url(#colorUv)"
              fillOpacity="0.2"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
      buttonContainer: (
        <div>
          <button onClick={() => defipalseData("1m")}>30d</button>
          <button onClick={() => defipalseData("all")}>ALL</button>
        </div>
      ),
      state: valueLocked,
    },
    {
      apiProvider: "Etherscan",
      apiUrl: "https://etherscan.io/nodetracker",
      title: <Translation id="page-index-network-stats-nodes-description" />,
      description: (
        <Translation id="page-index-network-stats-nodes-explainer" />
      ),
      line: (
        <ResponsiveContainer>
          <AreaChart height={200} data={data1}>
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
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={0.3}
              fill="url(#colorUv)"
              fillOpacity="0.2"
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
      buttonContainer: (
        <div>
          <button onClick={() => etherscanData(oneMonthAgo)}>30d</button>
          <button onClick={() => etherscanData(start)}>ALL</button>
        </div>
      ),
      state: nodes,
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
