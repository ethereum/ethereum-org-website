import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"

import type { LoadingState } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { Flex } from "./ui/flex"

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

const EthPriceCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
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
    <Flex
      className={cn(
        "max-h-48 w-full max-w-[420px] flex-col items-center justify-between rounded border p-6",
        isNegativeChange
          ? "bg-gradient-to-b from-error/10 dark:border-error/50"
          : "bg-gradient-to-t from-success/20 dark:border-success/50",
        className
      )}
      {...props}
    >
      <h4 className="m-0 flex items-center text-sm font-medium uppercase leading-xs tracking-wider">
        {t("eth-current-price")}
        <Tooltip content={tooltipContent}>
          <MdInfoOutline className="ms-2 size-[14px]" />
        </Tooltip>
      </h4>

      <div
        className={cn(
          "text-5xl leading-xs",
          hasError && "my-4 text-md text-error"
        )}
      >
        {price}
      </div>

      {/* min-h-[33px] prevents jump when price loads */}
      <Flex className="mt-2 min-h-[33px] w-full flex-col-reverse items-center justify-center sm:flex-row">
        <div
          className={cn(
            "me-4 text-2xl leading-xs",
            isNegativeChange ? "text-error" : "text-success"
          )}
        >
          <span
            className={cn(
              isNegativeChange
                ? "after:content-['↘']"
                : "after:content-['↗']",
              "after:inline-block",
              /* Cannot string-interpolate 'after:', using isRtl instead */
              isRtl ? "after:-scale-x-100" : ""
            )}
          >
            {change}
          </span>
        </div>
        <div className="text-sm uppercase leading-xs tracking-wider text-body-medium">
          ({t("last-24-hrs")})
        </div>
      </Flex>
    </Flex>
  )
}

export default EthPriceCard
