import { Flex } from "@chakra-ui/react"
import React from "react"
import {
  SendReceiveButtons,
  TokenBalanceList,
  CategoryTabs,
  WalletBalance,
} from "./Wallet"
import { TokenBalance } from "./Wallet/interfaces"
import { defaultTokenBalances } from "./data"
import type { SimulatorState } from "./interfaces"
import type { SendReceiveEnabled } from "./Wallet/types"

interface IProps {
  state?: SimulatorState
  isEnabled?: SendReceiveEnabled
  tokenBalances?: Array<TokenBalance>
}
export const WalletHome: React.FC<IProps> = ({
  state,
  isEnabled,
  tokenBalances,
}) => {
  const data: Array<TokenBalance> = tokenBalances ?? defaultTokenBalances
  const totalAmounts = data.reduce(
    (acc, { amount, usdConversion }) => acc + amount * usdConversion,
    0
  )
  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="background.base"
      position="absolute"
      inset={0}
    >
      <Flex
        direction="column"
        flex={1}
        pt={8}
        pb={{ base: 4, md: 8 }}
        px={6}
        justify="space-between"
        w="full"
      >
        <WalletBalance usdAmount={totalAmounts} />
        <SendReceiveButtons state={state} isEnabled={isEnabled} />
      </Flex>
      <Flex
        direction="column"
        flex={1}
        p={6}
        gap={6}
        justify="space-between"
        w="full"
        bg="background.highlight"
      >
        <CategoryTabs categories={["Crypto", "NFTs"]} />
        <TokenBalanceList tokenBalances={data} />
      </Flex>
    </Flex>
  )
}
