import React from "react"
import { useTranslations } from "next-intl"

import { Flex } from "@/components/ui/flex"

import { numberFormat } from "@/lib/utils/numbers"

import { getMaxFractionDigitsUsd } from "../utils"

import { AddressPill } from "./AddressPill"

type WalletBalanceProps = {
  usdAmount?: number
}

export const WalletBalance = ({ usdAmount = 0 }: WalletBalanceProps) => {
  const t = useTranslations("simulator")
  return (
    <div className="z-[1]">
      <p className="mb-2 text-center text-body-medium md:mb-4">
        {t("sim-your-total")}
      </p>
      <p className="text-center text-3xl font-bold !leading-base md:text-5xl">
        {numberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: getMaxFractionDigitsUsd(usdAmount),
        }).format(usdAmount)}
      </p>
      <Flex className="mb-4 justify-center">
        <AddressPill />
      </Flex>
    </div>
  )
}
