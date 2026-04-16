import React from "react"
import { useTranslations } from "next-intl"

import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { ETH_TRANSFER_FEE } from "../../constants"
import { getMaxFractionDigitsUsd } from "../../utils"

type SendSummaryProps = {
  chosenAmount: number
  ethPrice: number
  recipient: string
  ethAvailable: number
}
export const SendSummary = ({
  chosenAmount,
  ethPrice,
  recipient,
}: SendSummaryProps) => {
  const t = useTranslations("simulator")

  const formatEth = (amount: number): string =>
    numberFormat("en", { maximumFractionDigits: 5 }).format(amount)

  const formatChosenAmount = numberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(chosenAmount),
  }).format(chosenAmount)

  const usdFee = ETH_TRANSFER_FEE * ethPrice
  return (
    <>
      {/* Top section */}
      <div className="px-6 py-6 md:py-8">
        <p className="mb-4 text-xl font-bold md:mb-8 md:text-2xl">
          {t("sim-summary-title")}
        </p>
        <Flex
          className={cn(
            "flex-1 font-bold md:mb-2",
            chosenAmount > 0 ? "text-body" : "text-inherit"
          )}
        >
          <p className="h-full text-5xl leading-[1em] md:text-6xl">
            {formatChosenAmount}
          </p>
        </Flex>
        <p className="text-xs text-body-medium">
          {formatEth(chosenAmount / ethPrice)} ETH
        </p>
      </div>
      {/* Bottom section */}
      <Flex className="h-full flex-col gap-3 bg-background-highlight px-6 py-4 text-sm md:gap-6 md:py-8 md:text-md">
        <div>
          <p>{t("sim-summary-to")}</p>
          <p className="font-bold">{recipient}</p>
        </div>
        <div>
          <p>{t("sim-summary-arrival")}</p>
          <p className="font-bold">{t("sim-summary-arrival-est")}</p>
        </div>
        <div>
          <p>{t("sim-summary-fees")}</p>
          <p className="font-bold">
            {numberFormat("en", {
              maximumFractionDigits: getMaxFractionDigitsUsd(usdFee),
              style: "currency",
              currency: "USD",
              notation: "compact",
            }).format(usdFee)}
            <span className="ms-2 text-xs font-normal text-body-medium">
              (
              {numberFormat("en", {
                maximumFractionDigits: 6,
              }).format(ETH_TRANSFER_FEE)}{" "}
              ETH)
            </span>
          </p>
        </div>
      </Flex>
    </>
  )
}
