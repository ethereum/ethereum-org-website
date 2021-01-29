import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import axios from "axios"

import Translation from "./Translation"
import Tooltip from "./Tooltip"
import Link from "./Link"
import Icon from "./Icon"

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

const GridItem = ({ item }) => {
  const { value, title, description } = item
  return (
    <Box>
      <div>
        <Title>{title}</Title>
        <p>{description}</p>
      </div>
      <Value>{value}</Value>
    </Box>
  )
}

const tooltipContent = (metricState) => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link to={metricState.apiUrl}>{metricState.apiProvider}</Link>
  </div>
)

const StatsBoxGrid = () => {
  const intl = useIntl()
  const [ethPrice, setEthPrice] = useState({
    usd: 0,
    apiProvider: "",
    apiUrl: "",
    hasError: false,
  })
  const [valueLocked, setValueLocked] = useState({
    total: 0,
    apiProvider: "",
    apiUrl: "",
    hasError: false,
  })
  const [nodes, setNodes] = useState({
    total: 0,
    apiProvider: "",
    apiUrl: "",
    hasError: false,
  })
  const [txns, setTxns] = useState({
    count: 0,
    apiProvider: "",
    apiUrl: "",
    hasError: false,
  })

  useEffect(() => {
    // Skip APIs when not in production
    if (process.env.NODE_ENV !== "production") {
      setEthPrice({
        usd: 1330,
        apiProvider: "CoinGecko",
        apiUrl: "https://coingecko.com",
        hasError: false,
      })
      setNodes({
        total: 8040,
        apiProvider: "Etherscan",
        apiUrl: "https://etherscan.io",
        hasError: false,
      })
      setValueLocked({
        total: 23456789000,
        apiProvider: "DeFi Pulse",
        apiUrl: "https://defipulse.com",
        hasError: false,
      })
      setTxns({
        count: 1234567,
        apiProvider: "Coin Metrics",
        apiUrl: "https://coinmetrics.io",
        hasError: false,
      })
    } else {
      // Fetch ETH Price - Coin Gecko
      const fetchPrice = async () => {
        try {
          const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
          )
          const { usd } = response.data.ethereum
          setEthPrice({
            usd,
            apiProvider: "CoinGecko",
            apiUrl: "https://coingecko.com",
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

      // Fetch Ethereum Node data - Etherscan.io (Serverless lambda function)
      const fetchNodes = async () => {
        try {
          const response = await axios.get("/.netlify/functions/etherscan")
          const { data } = response
          const total = data.result.TotalNodeCount
          setNodes({
            total,
            apiProvider: "Etherscan",
            apiUrl: "https://etherscan.io",
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

      // Fetch Total Value Locked (TVL) in DeFi - DeFi Pulse (Serverless lambda function)
      const fetchTotalValueLocked = async () => {
        try {
          const responseAll = await axios.get(
            "/.netlify/functions/defipulse-all"
          )
          const responseOther = await axios.get(
            "/.netlify/functions/defipulse-other"
          )
          const { data: dataAll } = responseAll
          const { data: dataOther } = responseOther
          // Subtract most recent value (in USD) locked in Lightning Network (index 0)
          const tvlEthereum = dataAll.All.total - dataOther[0].tvlUSD
          setValueLocked({
            total: tvlEthereum,
            apiProvider: "DeFi Pulse",
            apiUrl: "https://defipulse.com",
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

      // Fetch Last 24hr Transaction Count - Coinmetrics.io (Serverless lambda function)
      const fetchTxnCount = async () => {
        try {
          const response = await axios.get("/.netlify/functions/coinmetrics")
          const { series } = response.data.metricData
          const count = +series[series.length - 1].values[0]
          setTxns({
            count,
            apiProvider: "Coin Metrics",
            apiUrl: "https://coinmetrics.io",
            hasError: false,
          })
        } catch (error) {
          console.error(error)
          setTxns({
            hasError: true,
          })
        }
      }
      fetchTxnCount()
    }
  }, [])

  // Price loading handlers
  const isLoadingPrice = !ethPrice.usd
  const price = ethPrice.hasError ? (
    <ErrorMessage />
  ) : isLoadingPrice ? (
    <LoadingMessage />
  ) : (
    <StatRow>
      <span>
        {new Intl.NumberFormat(intl.locale, {
          style: "currency",
          currency: "USD",
          minimumSignificantDigits: 3,
          maximumSignificantDigits: 4,
        }).format(ethPrice.usd)}{" "}
        <Tooltip content={tooltipContent(ethPrice)}>
          <StyledIcon name="info" />
        </Tooltip>
      </span>
    </StatRow>
  )

  // TVL loading handlers
  const isLoadingTVL = !valueLocked.total
  const tvl = valueLocked.hasError ? (
    <ErrorMessage />
  ) : isLoadingTVL ? (
    <LoadingMessage />
  ) : (
    <StatRow>
      <span>
        {new Intl.NumberFormat(intl.locale, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 3,
          maximumSignificantDigits: 4,
        }).format(valueLocked.total)}{" "}
        <Tooltip content={tooltipContent(valueLocked)}>
          <StyledIcon name="info" />
        </Tooltip>
      </span>
    </StatRow>
  )

  // Node count loading handlers
  const isLoadingNodes = !nodes.total
  const totalNodes = nodes.hasError ? (
    <ErrorMessage />
  ) : isLoadingNodes ? (
    <LoadingMessage />
  ) : (
    <StatRow>
      <span>
        {nodes.total.toLocaleString()}{" "}
        <Tooltip content={tooltipContent(nodes)}>
          <StyledIcon name="info" />
        </Tooltip>
      </span>
    </StatRow>
  )

  // Transaction count loading handlers
  const isLoadingTxns = !txns.count
  const txnCount = txns.hasError ? (
    <ErrorMessage />
  ) : isLoadingTxns ? (
    <LoadingMessage />
  ) : (
    <StatRow>
      <span>
        {new Intl.NumberFormat(intl.locale, {
          notation: "compact",
          minimumSignificantDigits: 3,
          maximumSignificantDigits: 4,
        }).format(txns.count)}{" "}
        <Tooltip content={tooltipContent(txns)}>
          <StyledIcon name="info" />
        </Tooltip>
      </span>
    </StatRow>
  )

  const metrics = [
    {
      title: (
        <Translation id="page-index-network-stats-eth-price-description" />
      ),
      description: (
        <Translation id="page-index-network-stats-eth-price-explainer" />
      ),
      value: price,
    },
    {
      title: <Translation id="page-index-network-stats-tx-day-description" />,
      description: (
        <Translation id="page-index-network-stats-tx-day-explainer" />
      ),
      value: txnCount,
    },
    {
      title: (
        <Translation id="page-index-network-stats-value-defi-description" />
      ),
      description: (
        <Translation id="page-index-network-stats-value-defi-explainer" />
      ),
      value: tvl,
    },
    {
      title: <Translation id="page-index-network-stats-nodes-description" />,
      description: (
        <Translation id="page-index-network-stats-nodes-explainer" />
      ),
      value: totalNodes,
    },
  ]

  return (
    <Grid>
      {metrics.map((item, idx) => {
        return <GridItem key={idx} item={item} />
      })}
    </Grid>
  )
}

export default StatsBoxGrid
