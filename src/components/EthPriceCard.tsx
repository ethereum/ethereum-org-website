"use client"

import { useEffect, useState } from "react"
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react"
import { useLocale } from "next-intl"

import type { LoadingState } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import Input from "@/components/ui/input"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { Flex } from "./ui/flex"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { useTranslation } from "@/hooks/useTranslation"

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

const EthPriceCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const locale = useLocale()
  const { t } = useTranslation()
  const [state, setState] = useState<LoadingState<EthPriceState>>({
    loading: true,
  })
  const [ethAmount, setEthAmount] = useState("1")
  const { twFlipForRtl } = useRtlFlip()

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

  const handleEthAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string, numbers, and decimals up to 4 places
    if (value === "" || /^\d*\.?\d{0,4}$/.test(value)) {
      setEthAmount(value)
    }
  }

  const formatPrice = (price: string | number) =>
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
    if (hasData) return formatPrice(state.data.currentPriceUSD)
    return t("loading")
  }

  const price = getPriceString()
  const parsedEthAmount = parseFloat(ethAmount) || 0
  const convertedValue = hasData
    ? parsedEthAmount * +state.data.currentPriceUSD
    : 0

  const isNegativeChange = hasData && state.data.percentChangeUSD < 0

  const change = hasData ? formatPercentage(state.data.percentChangeUSD) : ""

  const tooltipContent = (
    <div>
      {t("data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/coins/ethereum">
        coingecko.com
      </InlineLink>
    </div>
  )

  return (
    <Flex
      className={cn(
        "w-full max-w-[420px] flex-col items-center justify-between rounded border p-6",
        isNegativeChange
          ? "bg-gradient-to-b from-error/10 dark:border-error/50"
          : "bg-gradient-to-t from-success/20 dark:border-success/50",
        className
      )}
      {...props}
    >
      <h4 className="m-0 flex items-center text-sm font-medium uppercase leading-xs tracking-wider">
        {t("eth-current-price")}&nbsp;
        <Tooltip content={tooltipContent}>
          <Info className="size-[0.875em] text-sm" />
        </Tooltip>
      </h4>

      {hasError ? (
        <div className="my-4 text-md text-error">
          {t("loading-error-refresh")}
        </div>
      ) : (
        <>
          <div className="text-5xl leading-xs">{price}</div>

          {/* min-h-[33px] prevents jump when price loads */}
          <Flex className="mt-2 min-h-[33px] w-full flex-col-reverse items-center justify-center sm:flex-row">
            <div
              className={cn(
                "me-4 text-2xl leading-xs",
                isNegativeChange ? "text-error" : "text-success"
              )}
            >
              {change}
              {isNegativeChange ? (
                <ArrowDownRight className={cn(twFlipForRtl, "inline-block")} />
              ) : (
                <ArrowUpRight className={cn(twFlipForRtl, "inline-block")} />
              )}
            </div>
            <div className="text-sm uppercase leading-xs tracking-wider text-body-medium">
              ({t("last-24-hrs")})
            </div>
          </Flex>

          {/* ETH to USD Converter */}
          {hasData && (
            <div className="mt-4 w-full border-t pt-4">
              <p className="mb-2 text-center text-sm text-body-medium">
                {t("eth-convert-to-usd")}
              </p>
              <Flex className="flex-col items-center gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-body-medium">
                    ETH
                  </span>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={ethAmount}
                    onChange={handleEthAmountChange}
                    placeholder="0.0000"
                    className="w-full pl-12 text-right"
                  />
                </div>
                <span className="px-2 text-xl text-body-medium">=</span>
                <div className="flex-1 rounded border bg-background p-2 text-right">
                  <span className="text-lg font-medium">
                    {formatPrice(convertedValue)}
                  </span>
                </div>
              </Flex>
            </div>
          )}
        </>
      )}
    </Flex>
  )
}

export default EthPriceCard
