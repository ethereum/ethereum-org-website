import { Flex } from "@chakra-ui/react"
import React, { type Dispatch, type SetStateAction, useState } from "react"
import { SendReceiveButtons } from "./SendReceiveButtons"
import { TokenBalanceList } from "./TokenBalanceList"
import { CategoryTabs } from "./CategoryTabs"
import { WalletBalance } from "./WalletBalance"
import { NFT, TokenBalance } from "./interfaces"
import { defaultTokenBalances } from "../constants"
import type { SimulatorNav } from "../interfaces"
import type { SendReceiveEnabled } from "./types"
import { NFTList } from "./NFTList"

interface IProps {
  nav?: SimulatorNav
  isEnabled?: SendReceiveEnabled
  tokenBalances?: Array<TokenBalance>
  activeTabIndex?: number
  setActiveTabIndex?: (i: number) => void
  categoryTabState?: [number, Dispatch<SetStateAction<number>>]
  nfts?: Array<NFT>
}
export const WalletHome: React.FC<IProps> = ({
  nav,
  isEnabled,
  tokenBalances,
  activeTabIndex = 0,
  setActiveTabIndex,
  nfts = [],
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
