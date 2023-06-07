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
import { Lang } from "../../utils/languages"

export const ranges = ["30d", "90d"] as const

export interface State {
  value: string
  data: Array<{ timestamp: number; value: number }>
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

interface IFetchEthstoreResponse {
  data: {
    day: number
    effective_balances_sum_wei: number
  }
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

  const [totalEthStaked, setTotalEthStaked] = useState<State>({
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
  const [selectedRangeTotalStaked, setSelectedRangeTotalStaked] =
    useState<string>(ranges[0])
  const [selectedRangeTvl, setSelectedRangeTvl] = useState<string>(ranges[0])
  const [selectedRangeNodes, setSelectedRangeNodes] = useState<string>(
    ranges[0]
  )
  const [selectedRangeTxs, setSelectedRangeTxs] = useState<string>(ranges[0])

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)

    const formatTotalStaked = (amount: number): string => {
      return new Intl.NumberFormat(localeForStatsBoxNumbers, {
        notation: "compact",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 4,
      }).format(amount)
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

    const weiToRoundedEther = (wei: number): number => Math.floor(wei * 1e-18)

    const fetchTotalStaked = async (): Promise<void> => {
      const { href: ethstoreLatest } = new URL(
        "api/v1/ethstore/latest",
        "https://beaconcha.in"
      )
      try {
        // 1- Use initial call to `latest` to fetch current Beacon Chain "day" (for use in secondary fetches)
        const ethStoreResponse = await getData<IFetchEthstoreResponse>(
          ethstoreLatest
        )
        const {
          data: { day, effective_balances_sum_wei },
        } = ethStoreResponse
        const valueTotalEth = weiToRoundedEther(effective_balances_sum_wei)
        const currentValueTotalEth = formatTotalStaked(valueTotalEth)
        const MS_PER_DAY = 1000 * 60 * 60 * 24
        const [DAYS_TO_FETCH, DAY_DELTA] = [90, 5]
        const data = [
          {
            timestamp: new Date().getTime(),
            value: valueTotalEth,
          },
        ]
        // 2- Perform multiple API calls to fetch data for the last 90 days, `getData` for caching
        for (let i = DAY_DELTA; i <= DAYS_TO_FETCH; i += DAY_DELTA) {
          const lookupDay = day - i
          const timestamp = new Date().getTime() - i * MS_PER_DAY
          const { href: ethstoreDay } = new URL(
            `api/v1/ethstore/${lookupDay}`,
            "https://beaconcha.in"
          )
          const {
            data: { effective_balances_sum_wei: sumWei },
          } = await getData<IFetchEthstoreResponse>(ethstoreDay)
          const value = weiToRoundedEther(sumWei)
          data.push({ timestamp, value })
        }
        data.sort((a, b) => a.timestamp - b.timestamp)
        setTotalEthStaked({
          data, // historical data: { timestamp: unix-milliseconds, value }
          value: currentValueTotalEth, // current value
          hasError: false,
        })
      } catch (error) {
        setTotalEthStaked((prev) => ({ ...prev, hasError: true }))
      }
    }
    fetchTotalStaked()

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
          data, // historical data: { timestamp: unix-milliseconds, value }
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
          data, // historical data: { timestamp: unix-milliseconds, value }
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
      apiProvider: "Beaconcha.in",
      apiUrl: "https://beaconcha.in/",
      title: t("page-index-network-stats-total-eth-staked"),
      description: t("page-index-network-stats-total-eth-staked-explainer"),
      buttonContainer: (
        <RangeSelector
          state={selectedRangeTotalStaked}
          setState={setSelectedRangeTotalStaked}
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "total eth staked",
          }}
        />
      ),
      state: totalEthStaked,
      range: selectedRangeTotalStaked,
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
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "transactions",
          }}
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
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "defi tvl",
          }}
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
          matomo={{
            eventCategory: "Stats",
            eventAction: "click",
            eventName: "nodes",
          }}
        />
      ),
      state: nodes,
      range: selectedRangeNodes,
    },
  ]
  const dir: Direction = isLangRightToLeft(language as Lang) ? "rtl" : "ltr"

  return {
    metrics,
    dir,
  }
}
