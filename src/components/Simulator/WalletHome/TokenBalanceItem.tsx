import { Flex } from "@/components/ui/flex"

import { getMaxFractionDigitsUsd } from "../utils"

import { TokenBalance } from "./interfaces"

type TokenBalanceItemProps = {
  item: TokenBalance
}
export const TokenBalanceItem = ({ item }: TokenBalanceItemProps) => {
  const { name, ticker, amount, usdConversion, Icon } = item
  const usdAmount = amount * usdConversion
  const usdValue = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(usdAmount),
  }).format(usdAmount)
  const tokenAmount = Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(amount)
  return (
    <Flex className="gap-4">
      <Icon />
      <p className="flex-1 font-medium">{name}</p>
      <div className="text-end text-sm font-bold leading-normal [&_p]:m-0">
        <p>{usdValue}</p>
        <p className="text-body-medium">
          {tokenAmount} {ticker}
        </p>
      </div>
    </Flex>
  )
}
