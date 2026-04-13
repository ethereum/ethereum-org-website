import React from "react"

import { Flex } from "@/components/ui/flex"

import { numberFormat } from "@/lib/utils/numbers"

import { getMaxFractionDigitsUsd } from "../utils"

import { AddressPill } from "./AddressPill"

type WalletBalanceProps = {
  usdAmount?: number
}

export const WalletBalance = ({ usdAmount = 0 }: WalletBalanceProps) => (
  <div className="z-[1]">
    <p className="text-body-medium mb-2 text-center md:mb-4">Your total</p>
    <p className="!leading-base text-center text-3xl font-bold md:text-5xl">
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
