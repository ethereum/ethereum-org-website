import { Flex } from "@chakra-ui/react"
import React from "react"
import { SendReceiveButtons } from "./SendReceiveButtons"
import { TokenBalanceList } from "./TokenBalanceList"
import { CategoryTabs } from "./CategoryTabs"
import { WalletBalance } from "./WalletBalance"
import { TokenBalance } from "./interfaces"
import { defaultTokenBalances } from "../constants"
import type { SimulatorNav } from "../interfaces"
import type { SendReceiveEnabled } from "./types"

interface IProps {
  nav?: SimulatorNav
  isEnabled?: SendReceiveEnabled
  tokenBalances?: Array<TokenBalance>
}
export const WalletHome: React.FC<IProps> = ({
  nav,
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
        pb={4}
        px={6}
        justify="space-between"
        w="full"
      >
        <WalletBalance usdAmount={totalAmounts} />
        <SendReceiveButtons nav={nav} isEnabled={isEnabled} />
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
