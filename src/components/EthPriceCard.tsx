import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"
import {
  Box,
  Flex,
  type FlexProps,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"

import type { LoadingState } from "@/lib/types"

import InlineLink from "@/components/Link"
import Tooltip from "@/components/Tooltip"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type EthPriceResponse = {
  ethereum: {
    usd: string
    usd_24h_change: number
  }
}

type EthPriceState = {
  currentPriceUSD: string
  percentChangeUSD: number
}

export type EthPriceCardProps = FlexProps & {
  isLeftAlign?: boolean
}

const EthPriceCard = ({ isLeftAlign = false, ...props }: EthPriceCardProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [state, setState] = useState<LoadingState<EthPriceState>>({
    loading: true,
  })
  const { flipForRtl } = useRtlFlip()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
        )
        if (!response.ok) throw new Error(response.statusText)
        const data: EthPriceResponse = await response.json()
        if (data && data.ethereum) {
          const currentPriceUSD = data.ethereum.usd
          const percentChangeUSD = +data.ethereum.usd_24h_change / 100
          setState({
            loading: false,
            data: { currentPriceUSD, percentChangeUSD },
          })
        }
      } catch (error: unknown) {
        error instanceof Error && console.error(error.message)
        setState({
          loading: false,
          error,
        })
      }
    }
    fetchData()
  }, [])

  const hasError = "error" in state
  const hasData = "data" in state

  const formatPrice = (price: string) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(+price)

  const formatPercentage = (amount: number): string =>
    new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  const getPriceString = (): string => {
    if (state.loading) return t("loading")
    if (hasError) return t("loading-error-refresh")
    return formatPrice(state.data.currentPriceUSD)
  }

  const price = getPriceString()

  const isNegativeChange = hasData && state.data.percentChangeUSD < 0

  const change = hasData ? formatPercentage(state.data.percentChangeUSD) : ""

  const tooltipContent = (
    <Box>
      {t("data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/coins/ethereum">
        coingecko.com
      </InlineLink>
    </Box>
  )

  return (
    <Flex
      direction="column"
      align={isLeftAlign ? "flex-start" : "center"}
      justify="space-between"
      background={
        isNegativeChange
          ? "priceCardBackgroundNegative"
          : "priceCardBackgroundPositive"
      }
      border="1px solid"
      borderColor={
        isNegativeChange ? "priceCardBorderNegative" : "priceCardBorder"
      }
      p={6}
      w="full"
      maxW="420px"
      maxH="192px"
      borderRadius="base"
      {...props}
    >
      <Heading
        as="h4"
        color="text200"
        m={0}
        fontSize="sm"
        fontWeight="medium"
        lineHeight="140%"
        letterSpacing="0.04em"
        textTransform="uppercase"
      >
        {t("eth-current-price")}
        <Tooltip content={tooltipContent}>
          <Box as="span" ms={2}>
            <Icon as={MdInfoOutline} boxSize="14px" />
          </Box>
        </Tooltip>
      </Heading>

      <Box
        m={hasError ? "1rem 0" : 0}
        lineHeight="1.4"
        fontSize={hasError ? "md" : "5xl"}
        color={hasError ? "fail" : "text"}
      >
        {price}
      </Box>
      <Flex
        w="full"
        align="center"
        justify={isLeftAlign ? "flex-start" : "center"}
        minH="33px" /* prevents jump when price loads*/
      >
        <Box
          fontSize="2xl"
          lineHeight="140%"
          me={4}
          color={isNegativeChange ? "fail300" : "success.base"}
        >
          <Text
            as="span"
            _after={{
              content: isNegativeChange ? '"↘"' : '"↗"',
              transform: flipForRtl,
              display: "inline-block",
            }}
          >
            {change}
          </Text>
        </Box>
        <Box
          fontSize="sm"
          lineHeight="140%"
          letterSpacing="0.04em"
          textTransform="uppercase"
          color="text300"
        >
          ({t("last-24-hrs")})
        </Box>
      </Flex>
    </Flex>
  )
}

export default EthPriceCard
