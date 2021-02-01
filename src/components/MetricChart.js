import React, { useMemo, useEffect, useState } from "react"
import { Chart } from "react-charts"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  width: 900px;
  height: 500px;
`

const MetricChart = () => {
  const [ethPriceHistory, setEthPriceHistory] = useState({
    values: 0,
    hasError: false,
  })
  const [valueLockedHistory, setValueLockedHistory] = useState({
    values: 0,
    hasError: false,
  })
  const [txsHistory, setTxsHistory] = useState({
    values: 0,
    hasError: false,
  })

  useEffect(() => {
    const fetchPriceHistory = async () => {
      const to = Math.floor(new Date().getTime() / 1000) // Epoch today in seconds
      const from = to - 30 * 24 * 60 * 60 // Epoch 30 days ago in seconds
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
        )
        const values = response.data["prices"] // Double-nested array, inner:[0]=time, [1]=price
        setEthPriceHistory({
          values,
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setEthPriceHistory({
          hasError: true,
        })
      }
    }
    fetchPriceHistory()
    ;(async () => {
      try {
        const response = await axios.get("/.netlify/functions/defipulse")
        const { data } = response // array of {timestamp, tvlUSD}
        setValueLockedHistory({
          values: data,
          hasError: false,
        })
      } catch (error) {
        console.error(error)
        setValueLockedHistory({
          hasError: true,
        })
      }
    })()
  }, [])

  const dataPrice = useMemo(() => {
    console.log(ethPriceHistory)
    const iterable = ethPriceHistory?.values || []
    const dataArray = []
    for (const point of iterable) {
      dataArray.push({
        primary: point[0],
        secondary: point[1],
      })
    }
    console.log({ dataArray })
    return [
      {
        label: "ETH Price History",
        data: dataArray,
      },
    ]
  }, [ethPriceHistory])

  const dataValueLocked = useMemo(() => {
    const iterable = valueLockedHistory?.values || []
    const dataArray = []
    for (const point of iterable) {
      dataArray.push({
        primary: point.timestamp,
        secondary: point.tvlUSD,
      })
    }
    return [
      {
        label: "Total Value Locked - Ethereum DeFi",
        data: dataArray,
      },
    ]
  }, [valueLockedHistory])

  const axesPrice = useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
      },
      { type: "linear", position: "left" },
    ],
    []
  )

  const axesValueLocked = useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
      },
      { type: "linear", position: "left" },
    ],
    []
  )

  return (
    <Container>
      <Chart data={dataPrice} axes={axesPrice} />
    </Container>
  )
}

export default MetricChart
