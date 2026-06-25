"use client"

import { ArrowUpRight, Info } from "lucide-react"
import { useLocale } from "next-intl"

import Tooltip from "@/components/Tooltip"
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

  const isLoading = ethPrice === 0
  const hasChange = typeof ethPercentChange24h === "number"
  const isNegativeChange = hasChange && ethPercentChange24h < 0

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
        "max-h-48 w-full max-w-[420px] flex-col items-center justify-between rounded-base border p-6",
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
    </Flex>
  )
}

export default EthPriceCard
