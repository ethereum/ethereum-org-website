"use client"

import { Info } from "lucide-react"
import { useLocale } from "next-intl"

import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { Flex } from "./ui/flex"

import { useGasEthPrice } from "@/hooks/useGasEthPrice"
import { useTranslation } from "@/hooks/useTranslation"

const EthPriceCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const locale = useLocale()
  const { t } = useTranslation()
  const { ethPrice } = useGasEthPrice()

  const isLoading = ethPrice === 0

  const formatPrice = (price: number) =>
    numberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

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
        "max-h-48 w-full max-w-[420px] flex-col items-center justify-between rounded border bg-linear-to-t from-success/20 p-6 dark:border-success/50",
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

      <div className="text-5xl leading-xs">
        {isLoading ? (
          <Skeleton className="my-4 h-12 w-48" />
        ) : (
          formatPrice(ethPrice)
        )}
      </div>
    </Flex>
  )
}

export default EthPriceCard
