import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import axios from "axios"

import {
  AreaChart,
  ResponsiveContainer,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"
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
  // margin-left: -10%;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  // z-index: 0;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-family: "SFMono-Regular", monospace;
  // background: ${({ theme, color }) => theme.colors[color]};
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
  // text-transform: uppercase;
  // margin: 10px 0px;
  cursor: pointer;
  // box-shadow: 0px 2px 2px lightgray;
  // transition: ease background-color 250ms;
  // &:hover {
  //   background-color: blue;
  // }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`

const ButtonToggle = styled(Button)`
  // opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    background-color: #C0B9DD;
    opacity: 1; 
  `}
`

const GridItem = ({ metric }) => {
  const { title, description, state, line, buttonContainer } = metric
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
      </div>

      <ButtonContainer>{buttonContainer}</ButtonContainer>
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

  // const [coingecko, setCoingecko] = useState(null)
  // const [etherscan, setEtherscan] = useState(null)

  useEffect(() => {
    // coinGeckoData("30")
    // etherscanData(oneMonthAgo)
    // defipalseData("1m")

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

      // coinGeckoData("30")
      // etherscanData(oneMonthAgo)
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
          console.log(result)

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

    // coinGeckoData("30")
    // etherscanData(oneMonthAgo)
  }, [])

  // var today = new Date(),
  //   date =
  //     today.getFullYear() +
  //     "-" +
  //     (today.getMonth() + 1) +
  //     "-" +
  //     (today.getDate() - 1),
  //   oneMonthAgo =
  //     today.getFullYear() + "-" + today.getMonth() + "-" + (today.getDate() - 1)
  // const start = "2019-10-30"

  // useEffect(() => {
  //   coinGeckoData("30")
  //   etherscanData(oneMonthAgo)
  //   // defipalseData("1m")
  // }, [])

  // const [coingecko, setCoingecko] = useState([
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  // ])
  // const coinGeckoData = async (mode) => {
  //   // useEffect(() => {
  //   //   coinGeckoData("30")
  //   // }, [])

  //   let pricesData = [
  //     {
  //       name: "Page A",
  //       uv: 4000,
  //       pv: 2400,
  //       amt: 2400,
  //     },
  //     {
  //       name: "Page B",
  //       uv: 3000,
  //       pv: 1398,
  //       amt: 2210,
  //     },
  //   ]

  //   let coingeckoUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${mode}&interval=hour`
  //   await axios
  //     .get(coingeckoUrl)
  //     .then((response) => {
  //       console.log(response.data)
  //       for (const i in response.data.prices) {
  //         pricesData.push({
  //           name: "Page A",
  //           uv: response.data.prices[i][1],
  //           pv: i,
  //           amt: 2400,
  //         })
  //       }

  //       setCoingecko(pricesData)
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data)
  //         console.log(error.response.status)
  //         console.log(error.response.headers)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message)
  //       }
  //       console.log(error.config)
  //     })
  // }

  // console.log(coingecko)
  // const [etherscan, setEtherscan] = useState([
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  // ])
  // // useEffect(() => {
  // //   etherscanData(oneMonthAgo)
  // // }, [])

  // const etherscanData = async (mode1) => {
  //   let nodesData = [
  //     {
  //       name: "Page A",
  //       uv: 4000,
  //       pv: 2400,
  //       amt: 2400,
  //     },
  //     {
  //       name: "Page B",
  //       uv: 3000,
  //       pv: 1398,
  //       amt: 2210,
  //     },
  //   ]

  //   let etherscanUrl = `https://api.etherscan.io/api?module=stats&action=nodecounthistory&startdate=${mode1}&enddate=${date}&sort=asc&apikey=2JD9ZCGGPST7VHY8FHW3NZKI1D34VQR4I5`
  //   await axios
  //     .get(etherscanUrl)
  //     .then((response) => {
  //       for (const i in response.data.result) {
  //         nodesData.push({
  //           name: "Page A",
  //           uv: response.data.result[i]["TotalNodeCount"],
  //           pv: response.data.result[i]["UTCDate"],
  //           amt: 2400,
  //         })
  //       }
  //       console.log(nodesData)
  //       setEtherscan(nodesData)
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data)
  //         console.log(error.response.status)
  //         console.log(error.response.headers)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message)
  //       }
  //       console.log(error.config)
  //     })
  // }
  // console.log(etherscan)

  // const [defipulse, setDefipulse] = useState(null)
  // useEffect(() => {
  //   defipalseData("1m")
  // }, [])

  // const defipalseData = async (mode2) => {
  //   let defipalseUrl = `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?api-key=9ea611a770bebe40246e9c3042d6e90a83a641a2748cbf4aec964cb7c41b&period=${mode2}&length=days`
  //   axios
  //     .get(defipalseUrl)
  //     .then((response) => {
  //       setDefipulse(response.data)
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data)
  //         console.log(error.response.status)
  //         console.log(error.response.headers)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message)
  //       }
  //       console.log(error.config)
  //     })
  // }

  // let pricesData = []
  // if (coingecko) {
  //   for (const i in coingecko.prices) {
  //     pricesData.push({
  //       name: "Page A",
  //       uv: coingecko.prices[i][1],
  //       pv: i,
  //       amt: 2400,
  //     })
  //   }
  // }

  // let nodesData = []
  // if (etherscan) {
  //   for (const i in etherscan.result) {
  //     nodesData.push({
  //       name: "Page A",
  //       uv: etherscan.result[i]["TotalNodeCount"],
  //       pv: etherscan.result[i]["UTCDate"],
  //       amt: 2400,
  //     })
  //   }
  // }

  // let valueLockedData = []
  // if (defipulse) {
  //   for (let i = 1; i <= Object.keys(defipulse).length; i++) {
  //     try {
  //       valueLockedData.push({
  //         name: " Page A",
  //         uv:
  //           defipulse[Object.keys(defipulse).length - i]["tvlUSD"] / 1000000000,
  //         pv: Object.keys(defipulse).length - i,
  //         amt: 2400,
  //       })
  //     } catch {}
  //   }
  // }

  const types = [0, 1]
  const defaultTypes = ["30d", "ALL"]

  // const coingeckoTypes = ["30", "max"]

  // const [priceActive, setPriceActive] = useState(types[0])
  // function ToggleGroupPrice() {
  //   return (
  //     <div>
  //       {types.map((type) => (
  //         <ButtonToggle
  //           active={priceActive === type}
  //           onClick={() => {
  //             coinGeckoData(coingeckoTypes[type])
  //             setPriceActive(type)
  //           }}
  //         >
  //           {defaultTypes[type]}
  //         </ButtonToggle>
  //       ))}
  //     </div>
  //   )
  // }
  const transactionsData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]
  const [transactionsActive, setTransactionsActive] = useState(types[0])
  function ToggleGroupTransactions() {
    return (
      <div>
        {types.map((type) => (
          <ButtonToggle
            active={transactionsActive === type}
            onClick={() => {
              setTransactionsActive(type)
            }}
          >
            {defaultTypes[type]}
          </ButtonToggle>
        ))}
      </div>
    )
  }

  // const defipulseTypes = ["1m", "all"]
  // const [valueLockedActive, setValueLockedActive] = useState(types[0])
  // function ToggleGroupValueLocked() {
  //   return (
  //     <div>
  //       {types.map((type) => (
  //         <ButtonToggle
  //           active={valueLockedActive === type}
  //           onClick={() => {
  //             defipalseData(defipulseTypes[type])
  //             setValueLockedActive(type)
  //           }}
  //         >
  //           {defaultTypes[type]}
  //         </ButtonToggle>
  //       ))}
  //     </div>
  //   )
  // }
  // const etherscanTypes = [oneMonthAgo, start]
  // const [nodesActive, setNodesActive] = useState(types[0])
  // function ToggleGroupNodes() {
  //   return (
  //     <div>
  //       {types.map((type) => (
  //         <ButtonToggle
  //           active={nodesActive === type}
  //           onClick={() => {
  //             etherscanData(etherscanTypes[type])
  //             setNodesActive(type)
  //           }}
  //         >
  //           {defaultTypes[type]}
  //         </ButtonToggle>
  //       ))}
  //     </div>
  //   )
  // }

  // console.log(pricesData)
  // console.log(nodesData)
  // console.log(valueLockedData)

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
        <AreaChart width={700} height={200} data={transactionsData}>
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
            connectNulls={true}
          />
          <XAxis dataKey="name" />
        </AreaChart>
      ),
      buttonContainer: <ToggleGroupTransactions />,
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
        <AreaChart width={700} height={200} data={transactionsData}>
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
            connectNulls={true}
          />
          <XAxis dataKey="name" />
        </AreaChart>
      ),
      buttonContainer: <ToggleGroupTransactions />,
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
        <AreaChart width={700} height={200} data={transactionsData}>
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
            connectNulls={true}
          />
          <XAxis dataKey="name" />
        </AreaChart>
      ),
      buttonContainer: <ToggleGroupTransactions />,
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
        <AreaChart width={700} height={200} data={transactionsData}>
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
            connectNulls={true}
          />
          <XAxis dataKey="name" />
        </AreaChart>
      ),
      buttonContainer: <ToggleGroupTransactions />,
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
