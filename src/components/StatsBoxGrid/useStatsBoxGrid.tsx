import React, { useState, useEffect } from "react"
import axios from "axios"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

import { RangeSelector } from "./RangeSelector"
import { Direction } from "../../types"
import { GATSBY_FUNCTIONS_PATH } from "../../constants"
import { getData } from "../../utils/cache"
import {
  getLocaleForNumberFormat,
  isLangRightToLeft,
} from "../../utils/translations"

export const ranges = ["30d", "90d"] as const

export interface State {
  value: string
  data: Array<{ timestamp: number }>
  hasError: boolean
}

export interface Metric {
  title: string
  description: string
  state: State
  buttonContainer: JSX.Element
  range: string
  apiUrl: string
  apiProvider: string
}

interface IFetchPriceResponse {
  prices: Array<[number, number]>
}

interface IFetchNodeResponse {
  result: Array<{ UTCDate: number; TotalNodeCount: number }>
}

interface IFetchTotalValueLockedResponse {
  date: string
  totalLiquidityUSD: number
}

interface IFetchTxResponse {
  unixTimeStamp: string
  transactionCount: number
}

export const useStatsBoxGrid = () => {
  const { t } = useTranslation()
  const { language } = useI18next()

  const [ethPrices, setEthPrices] = useState<State>({
    data: [],
    value: "0",
    hasError: false,
  })
  const [valueLocked, setValueLocked] = useState<State>({
    data: [],
    value: "0",
    hasError: false,
  })
  const [txs, setTxs] = useState<State>({
    data: [],
    value: "0",
    hasError: false,
  })
  const [nodes, setNodes] = useState<State>({
    data: [],
    value: "0",
    hasError: false,
  })
  const [selectedRangePrice, setSelectedRangePrice] = useState<string>(
    ranges[0]
  )
  const [selectedRangeTvl, setSelectedRangeTvl] = useState<string>(ranges[0])
  const [selectedRangeNodes, setSelectedRangeNodes] = useState<string>(
    ranges[0]
  )
  const [selectedRangeTxs, setSelectedRangeTxs] = useState<string>(ranges[0])

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(language)

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat(localeForStatsBoxNumbers, {
        style: "currency",
        currency: "USD",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 4,
      }).format(price)
    }

    const formatTVL = (tvl: number): string => {
      return new Intl.NumberFormat(localeForStatsBoxNumbers, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 4,
      }).format(tvl)
    }

    const formatTxs = (txs: number): string => {
      return new Intl.NumberFormat(localeForStatsBoxNumbers, {
        notation: "compact",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 4,
      }).format(txs)
    }

    const formatNodes = (nodes: number): string => {
      return new Intl.NumberFormat(localeForStatsBoxNumbers, {
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 4,
      }).format(nodes)
    }

    const fetchPrices = async (): Promise<void> => {
      try {
        const {
          data: { prices },
        } = await axios.get<IFetchPriceResponse>(
          `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=90&interval=daily`
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
        setEthPrices((ethPrices) => ({
          ...ethPrices,
          hasError: true,
        }))
      }
    }
    fetchPrices()

    const fetchNodes = async (): Promise<void> => {
      try {
        const { result } = await getData<IFetchNodeResponse>(
          `${GATSBY_FUNCTIONS_PATH}/etherscan`
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
        setNodes((nodes) => ({
          ...nodes,
          hasError: true,
        }))
      }
    }
    fetchNodes()

    const fetchTotalValueLocked = async (): Promise<void> => {
      try {
        const response = await getData<Array<IFetchTotalValueLockedResponse>>(
          `${GATSBY_FUNCTIONS_PATH}/defipulse`
        )
        const data = response
          .map(({ date, totalLiquidityUSD }) => ({
            timestamp: parseInt(date) * 1000,
            value: totalLiquidityUSD,
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
        setValueLocked((valueLocked) => ({
          ...valueLocked,
          hasError: true,
        }))
      }
    }
    fetchTotalValueLocked()

    const fetchTxCount = async (): Promise<void> => {
      try {
        const response = await getData<Array<IFetchTxResponse>>(
          `${process.env.GATSBY_FUNCTIONS_PATH}/txs`
        )
        const data = response
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
        setTxs((txs) => ({
          ...txs,
          hasError: true,
        }))
      }
    }
    fetchTxCount()
  }, [language])

  const metrics: Array<Metric> = [
    {
      apiProvider: "CoinGecko",
      apiUrl: "https://www.coingecko.com/en/coins/ethereum",
      title: t("page-index-network-stats-eth-price-description"),
      description: t("page-index-network-stats-eth-price-explainer"),
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
      title: t("page-index-network-stats-tx-day-description"),
      description: t("page-index-network-stats-tx-day-explainer"),
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
      apiProvider: "DeFi Llama",
      apiUrl: "https://defillama.com/",
      title: t("page-index-network-stats-value-defi-description"),
      description: t("page-index-network-stats-value-defi-explainer"),
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
      title: t("page-index-network-stats-nodes-description"),
      description: t("page-index-network-stats-nodes-explainer"),
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
  const dir: Direction = isLangRightToLeft(language) ? "rtl" : "ltr"

  return {
    metrics,
    dir,
  }
}
