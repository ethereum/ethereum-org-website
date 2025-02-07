import { Flex } from "@/components/ui/flex"

import { type TokenBalance } from "./interfaces"
import { TokenBalanceItem } from "./TokenBalanceItem"

type TokenBalanceListProps = {
  tokenBalances: Array<TokenBalance>
}
export const TokenBalanceList = ({ tokenBalances }: TokenBalanceListProps) => {
  return (
    <Flex className="w-full flex-col gap-4">
      {tokenBalances.map((item) => (
        <TokenBalanceItem key={item.name} item={item} />
      ))}
    </Flex>
  )
}
