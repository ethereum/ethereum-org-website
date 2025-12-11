import { Info } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import type { MetricReturnData } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

interface EthPriceSimpleProps extends React.HTMLAttributes<HTMLDivElement> {
  ethPrice: MetricReturnData
}

const EthPriceSimple = async ({
  ethPrice,
  className,
  ...props
}: EthPriceSimpleProps) => {
  const locale = await getLocale()
  const t = await getTranslations()

  const hasError = "error" in ethPrice

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

  const price = hasError
    ? t("loading-error-refresh")
    : formatPrice(ethPrice.value)

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
