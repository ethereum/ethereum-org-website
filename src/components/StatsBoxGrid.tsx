import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import axios from "axios"
import { kebabCase } from "lodash"
import { AreaChart, ResponsiveContainer, Area, XAxis } from "recharts"

import { VStack, Grid, Box, Icon, Button, Text, Flex } from "@chakra-ui/react"
import { MdInfoOutline } from "react-icons/md"

import Translation from "./Translation"
import Tooltip from "./Tooltip"
import Link from "./Link"
import StatErrorMessage from "./StatErrorMessage"
import StatLoadingMessage from "./StatLoadingMessage"

import {
  isLangRightToLeft,
  translateMessageId,
  getLocaleForNumberFormat,
} from "../utils/translations"
import { getData } from "../utils/cache"

import { GATSBY_FUNCTIONS_PATH } from "../constants"
import { Lang } from "../utils/languages"
import { Direction } from "../types"

const ranges = ["30d", "90d"] as const

interface State {
  value: string
  data: Array<{ timestamp: number }>
  hasError: boolean
}

interface Metric {
  title: string
  description: string
  state: State
  buttonContainer: JSX.Element
  range: string
  apiUrl: string
  apiProvider: string
}

interface IGridItemProps {
  metric: Metric
  dir?: Direction
}

const GridItem: React.FC<IGridItemProps> = ({ metric, dir }) => {
  const { title, description, state, buttonContainer, range } = metric
  const isLoading = !state.value
  const value = state.hasError ? (
    <StatErrorMessage />
  ) : isLoading ? (
    <StatLoadingMessage />
  ) : (
    <VStack>
      <Box>
        {state.value}{" "}
        <Tooltip content={tooltipContent(metric)}>
          <Icon
            as={MdInfoOutline}
            boxSize={6}
            fill="text"
            mr={2}
            _hover={{ fill: "primary" }}
            _active={{ fill: "primary" }}
            _focus={{ fill: "primary" }}
          ></Icon>
        </Tooltip>
      </Box>
    </VStack>
  )

  // Returns either 90 or 30-day data range depending on `range` selection
  const filteredData = (data: Array<{ timestamp: number }>) => {
    if (!data) return
    if (range === ranges[1]) return [...data]
    return data.filter(({ timestamp }) => {
      const millisecondRange = 1000 * 60 * 60 * 24 * 30
      const now = new Date().getTime()
      return timestamp >= now - millisecondRange
    })
  }

  const chart: React.ReactNode = (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={filteredData(state.data)}
        margin={{ left: -5, right: -5 }}
      >
        <defs>
          <linearGradient
            id={`colorUv-${kebabCase(title)}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id={`colorPv-${kebabCase(title)}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={0.3}
          fill={`url(#colorUv-${kebabCase(title)})`}
          connectNulls={true}
        />
        <XAxis dataKey="timestamp" axisLine={false} tick={false} />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <Flex
      position="relative"
      color="text"
      height={80}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      borderX={{
        base: "0px solid #000000",
        lg: "1px solid",
      }}
      borderY="1px solid"
      marginTop={{
        base: "-1px",
        lg: "0",
      }}
      padding={{ base: "2rem 1rem 1rem", lg: "1.5rem" }}
    >
      <div>
        <Text
          fontSize="xl"
          mb={2}
          color="text"
          textTransform="uppercase"
          fontFamily="monospace"
        >
          {title}
        </Text>
        <p>{description}</p>
      </div>
      {!state.hasError && !isLoading && (
        <>
          <Box
            position="absolute"
            left={0}
            bottom={0}
            width="100%"
            height="65%"
          >
            {chart}
          </Box>
          {dir === "rtl" ? (
            <Box
              position="absolute"
              bottom="20px"
              fontFamily="monospace"
              left="20px"
            >
              {buttonContainer}
            </Box>
          ) : (
            <Box
              position="absolute"
              bottom="20px"
              fontFamily="monospace"
              right="20px"
            >
              {buttonContainer}
            </Box>
          )}
        </>
      )}
      <Text
        position="absolute"
        bottom="8%"
        fontSize={{ base: "max(8.8vw, 48px)", lg: "min(4.4vw, 4rem)" }}
        fontWeight={600}
        marginTop={0}
        marginBottom={4}
        color="text"
        flexWrap="wrap"
        textOverflow="ellipsis"
      >
        {value}
      </Text>
    </Flex>
  )
}

const tooltipContent = (metric: Metric) => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link to={metric.apiUrl}>{metric.apiProvider}</Link>
  </div>
)

interface IRangeSelectorProps {
  state: string
  setState: (state: string) => void
}

const RangeSelector: React.FC<IRangeSelectorProps> = ({ state, setState }) => (
  <div>
    {ranges.map((range, idx) => (
      <Button
        onClick={() => setState(ranges[idx])}
        key={idx}
        color={""}
        background="background"
        fontFamily="monospace"
        fontSize="xl"
        padding="2px 15px"
        borderRadius="1px"
        border="1px solid"
        cursor="pointer"
        _focus={{ outline: "none" }}
        _hover={{ color: "" }}
        _active={{ color: "" }}
        _disabled={{
          cursor: "default",
          opacity: "0.7",
        }}
        size="sm"
        backgroundColor={state === ranges[idx] ? "homeBoxPurple" : ""}
      >
        {range}
      </Button>
    ))}
  </div>
)

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

export interface IProps {}

const StatsBoxGrid: React.FC<IProps> = () => {
  const intl = useIntl()

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
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(
      intl.locale as Lang
    )

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
  }, [intl.locale])

  const metrics: Array<Metric> = [
    {
      apiProvider: "CoinGecko",
      apiUrl: "https://www.coingecko.com/en/coins/ethereum",
      title: translateMessageId(
        "page-index-network-stats-eth-price-description",
        intl
      ),
      description: translateMessageId(
        "page-index-network-stats-eth-price-explainer",
        intl
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
      title: translateMessageId(
        "page-index-network-stats-tx-day-description",
        intl
      ),
      description: translateMessageId(
        "page-index-network-stats-tx-day-explainer",
        intl
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
      apiProvider: "DeFi Llama",
      apiUrl: "https://defillama.com/",
      title: translateMessageId(
        "page-index-network-stats-value-defi-description",
        intl
      ),
      description: translateMessageId(
        "page-index-network-stats-value-defi-explainer",
        intl
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
      title: translateMessageId(
        "page-index-network-stats-nodes-description",
        intl
      ),
      description: translateMessageId(
        "page-index-network-stats-nodes-explainer",
        intl
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
  const dir = isLangRightToLeft(intl.locale as Lang) ? "rtl" : "ltr"
  return (
    <Grid
      display={{
        base: "flex",
        lg: "grid",
      }}
      gridTemplateColumns="repeat(2, 1fr)"
      margin={{
        base: "0",
        sm: "2rem 0 0",
        lg: "2rem 2rem 0",
      }}
      borderRadius="sm"
      flexDirection={{
        base: "column",
        lg: "column",
      }}
    >
      {metrics.map((metric, idx) => (
        <GridItem key={idx} metric={metric} dir={dir} />
      ))}
    </Grid>
  )
}

export default StatsBoxGrid
