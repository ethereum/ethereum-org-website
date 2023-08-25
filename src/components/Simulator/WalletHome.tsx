import { Flex } from "@chakra-ui/react"
import React from "react"
import { EthTokenIcon, DaiTokenIcon, UniTokenIcon } from "./icons"
import {
  SendReceiveButtons,
  TokenBalanceList,
  TokenCategoryTabs,
  WalletBalance,
} from "./Wallet"
import { TokenBalance } from "./Wallet/interfaces"

const tokenBalances: Array<TokenBalance> = [
  {
    name: "Ether",
    ticker: "ETH",
    amount: 0,
    usdConversion: 1600, // TODO: Fetch?
    Icon: EthTokenIcon,
  },
  {
    name: "DAI",
    ticker: "DAI",
    amount: 0,
    usdConversion: 1,
    Icon: DaiTokenIcon,
  },
  {
    name: "Uniswap",
    ticker: "UNI",
    amount: 0,
    usdConversion: 4.5, // TODO: Fetch?
    Icon: UniTokenIcon,
  },
]

export const WalletHome: React.FC = () => {
  const totalAmounts = tokenBalances.reduce(
    (acc, { amount, usdConversion }) => acc + amount * usdConversion,
    0
  )
  return (
    <Flex
      direction="column"
      alignItems="center"
      h="full"
      w="full"
      bg="background.base"
    >
      <Flex
        direction="column"
        flex={1}
        py={8}
        px={6}
        justify="space-between"
        w="full"
      >
        <WalletBalance usdAmount={totalAmounts} />
        <SendReceiveButtons />
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
        <TokenCategoryTabs categories={["Crypto", "NFTs"]} />
        <TokenBalanceList tokenBalances={tokenBalances} />
      </Flex>
    </Flex>
  )
}
