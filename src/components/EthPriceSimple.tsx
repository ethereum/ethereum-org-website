"use client"

import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import { useLocale } from "next-intl"

import type { LoadingState } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"

type EthPriceResponse = {
  ethereum: {
    usd: string
  }
}

type EthPriceState = {
  currentPriceUSD: string
}

const EthPriceSimple = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const locale = useLocale()
  const { t } = useTranslation()
  const [state, setState] = useState<LoadingState<EthPriceState>>({
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        if (!response.ok) throw new Error(response.statusText)
        const data: EthPriceResponse = await response.json()
        if (data && data.ethereum) {
          const currentPriceUSD = data.ethereum.usd
          setState({
            loading: false,
            data: { currentPriceUSD },
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

  const formatPrice = (price: string) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(+price)

  const getPriceString = (): string => {
    if (state.loading) return t("loading")
    if (hasError) return t("loading-error-refresh")
    return formatPrice(state.data.currentPriceUSD)
  }

  const price = getPriceString()

  const tooltipContent = (
    <div>
      {t("data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/coins/ethereum">
        coingecko.com
      </InlineLink>
    </div>
  )

  return (
    <div className={cn("py-4", className)} {...props}>
      <div
        className={cn("text-5xl font-bold", hasError && "text-md text-error")}
      >
        {price}
      </div>
      <div className="mt-1 flex items-center gap-1 text-sm text-body-medium">
        {t("eth-current-price")}
        <Tooltip content={tooltipContent}>
          <Info className="size-4" />
        </Tooltip>
      </div>
    </div>
  )
}

export default EthPriceSimple
