import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"

import type { LoadingState } from "@/lib/types"

import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"

import InlineLink from "./ui/Link"

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

export type EthPriceCardProps = {
  isLeftAlign?: boolean
  className?: string
}

const EthPriceCard = ({
  isLeftAlign = false,
  className,
}: EthPriceCardProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [state, setState] = useState<LoadingState<EthPriceState>>({
    loading: true,
  })
  const { isRtl } = useRtlFlip()

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
    <div>
      {t("data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/coins/ethereum">
        coingecko.com
      </InlineLink>
    </div>
  )

  return (
    <div
      className={cn(
        "flex max-h-[192px] w-full max-w-[420px] flex-col justify-between rounded border border-solid p-6",
        isLeftAlign ? "items-start" : "items-center",
        isNegativeChange
          ? "border-body-light dark:border-error"
          : "border-body-light dark:border-success",
        isNegativeChange
          ? "bg-gradient-to-b from-error-light to-transparent dark:bg-none"
          : "bg-gradient-to-t from-success-light to-transparent dark:bg-none",
        className
      )}
    >
      <h4 className="text-sm font-medium uppercase tracking-wider text-body-medium">
        {t("eth-current-price")}
        <Tooltip content={tooltipContent}>
          <span className="ms-2 inline-block">
            <MdInfoOutline className="h-4 w-4" />
          </span>
        </Tooltip>
      </h4>

      <div
        className={cn(
          hasError ? "my-4" : "my-0",
          hasError ? "text-md" : "text-5xl",
          hasError ? "text-error" : "text-body"
        )}
      >
        {price}
      </div>
      <div
        className={cn(
          "flex min-h-[33px] w-full flex-row items-center gap-4",
          isLeftAlign ? "justify-start" : "justify-center"
        )}
      >
        <div>
          <span
            className={cn(
              "text-2xl after:inline-block",
              isNegativeChange ? "text-error" : "text-success",
              isNegativeChange
                ? "after:content-['↘']"
                : "after:content-['↗']",
              isRtl ? "transform-[scaleX(-1)]" : ""
            )}
          >
            {change}
          </span>
        </div>
        <div className="text-sm uppercase text-body-medium">
          ({t("last-24-hrs")})
        </div>
      </div>
    </div>
  )
}

export default EthPriceCard
