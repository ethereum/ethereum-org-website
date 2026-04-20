import { useLocale } from "next-intl"

import { Flex } from "@/components/ui/flex"

import { formatWalletToken, formatWalletUsd } from "../utils"

import { TokenBalance } from "./interfaces"

type TokenBalanceItemProps = {
  item: TokenBalance
}
export const TokenBalanceItem = ({ item }: TokenBalanceItemProps) => {
  const { name, ticker, amount, usdConversion, Icon } = item
  const locale = useLocale()
  const usdAmount = amount * usdConversion
  const usdValue = formatWalletUsd(usdAmount)
  const tokenAmount = formatWalletToken(amount, locale)
  return (
    <Flex className="gap-4">
      <Icon className="text-3xl" />
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
