import React, { type Dispatch, type SetStateAction } from "react"
import { Flex } from "@chakra-ui/react"

import { defaultTokenBalances } from "../constants"
import type { SimulatorNav } from "../interfaces"

import { CategoryTabs } from "./CategoryTabs"
import { NFT, TokenBalance } from "./interfaces"
import { NFTList } from "./NFTList"
import { SendReceiveButtons } from "./SendReceiveButtons"
import { TokenBalanceList } from "./TokenBalanceList"
import type { SendReceiveEnabled } from "./types"
import { WalletBalance } from "./WalletBalance"

type WalletHomeProps = {
  nav?: SimulatorNav
  isEnabled?: SendReceiveEnabled
  tokenBalances?: Array<TokenBalance>
  activeTabIndex?: number
  setActiveTabIndex?: (i: number) => void
  categoryTabState?: [number, Dispatch<SetStateAction<number>>]
  nfts?: Array<NFT>
}
export const WalletHome = ({
  nav,
  isEnabled,
  tokenBalances,
  activeTabIndex = 0,
  setActiveTabIndex,
  nfts = [],
}: WalletHomeProps) => {
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
        <CategoryTabs
          categories={["Crypto", "NFTs"]}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
        {activeTabIndex === 0 || !setActiveTabIndex ? (
          <TokenBalanceList tokenBalances={data} />
        ) : (
          <NFTList nfts={nfts} />
        )}
      </Flex>
    </Flex>
  )
}
