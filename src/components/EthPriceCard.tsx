"use client"

import { useState } from "react"
import { ArrowUpRight, Info } from "lucide-react"
import { useLocale } from "next-intl"

import Tooltip from "@/components/Tooltip"
import Input from "@/components/ui/input"
import InlineLink from "@/components/ui/Link"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
import { formatPriceUSD, numberToPercent } from "@/lib/utils/numbers"

import { Flex } from "./ui/flex"

import { useGasEthPrice } from "@/hooks/useGasEthPrice"
import { useTranslation } from "@/hooks/useTranslation"

const EthPriceCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const locale = useLocale()
  const { t } = useTranslation()
  const { ethPrice, ethPercentChange24h } = useGasEthPrice()
  const [ethAmount, setEthAmount] = useState("1")

  const isLoading = ethPrice === 0
  const hasChange = typeof ethPercentChange24h === "number"
  const isNegativeChange = hasChange && ethPercentChange24h < 0

  const handleEthAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string, numbers, and decimals up to 4 places
    if (value === "" || /^\d*\.?\d{0,4}$/.test(value)) {
      setEthAmount(value)
    }
  }

  const convertedValue = (parseFloat(ethAmount) || 0) * ethPrice

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
        "w-full max-w-[420px] flex-col items-center justify-between rounded-base border p-6",
        isNegativeChange
          ? "bg-linear-to-b from-error/10 dark:border-error/50"
          : "bg-linear-to-t from-success/20 dark:border-success/50",
        className
      )}
      {...props}
    >
      <h4 className="m-0 flex items-center text-sm leading-xs font-medium tracking-wider uppercase">
        {t("eth-current-price")}&nbsp;
        <Tooltip content={tooltipContent}>
          <Info className="size-[0.875em] text-sm" />
        </Tooltip>
      </h4>

      <div className="flex w-full items-center justify-center text-5xl leading-xs">
        {isLoading ? (
          <Skeleton className="h-[1lh] w-60" />
        ) : (
          formatPriceUSD(ethPrice, locale)
        )}
      </div>

      {/* min-h-[33px] prevents jump when price loads */}
      <Flex className="mt-2 min-h-[33px] w-full flex-col-reverse items-center justify-center sm:flex-row">
        <div className="me-4 flex h-7 w-28 items-center justify-end">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            hasChange && (
              <span
                className={cn(
                  "text-2xl leading-xs",
                  isNegativeChange ? "text-error" : "text-success"
                )}
              >
                {numberToPercent(ethPercentChange24h, locale, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <ArrowUpRight
                  className={cn(
                    "inline-block rtl:-scale-x-100",
                    isNegativeChange && "-scale-y-100 rtl:-scale-100"
                  )}
                />
              </span>
            )
          )}
        </div>
        <div className="text-sm leading-xs tracking-wider text-body-medium uppercase">
          ({t("last-24-hrs")})
        </div>
      </Flex>

      {/* ETH to USD converter */}
      <div className="mt-4 w-full border-t pt-4">
        <p className="mb-2 text-center text-sm text-body-medium">
          {t("eth-convert-to-usd")}
        </p>
        <Flex className="flex-col items-center gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-sm text-body-medium">
              ETH
            </span>
            <Input
              type="text"
              inputMode="decimal"
              value={ethAmount}
              onChange={handleEthAmountChange}
              placeholder="0.0000"
              disabled={isLoading}
              className="w-full ps-12 text-end"
            />
          </div>
          <span className="px-2 text-xl text-body-medium">=</span>
          <div className="flex-1 rounded border bg-background p-2 text-end">
            {isLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <span className="text-lg font-medium">
                {formatPriceUSD(convertedValue, locale)}
              </span>
            )}
          </div>
        </Flex>
      </div>
    </Flex>
  )
}

export default EthPriceCard
