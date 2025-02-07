import { type Dispatch, type SetStateAction } from "react"

import { Flex } from "@/components/ui/flex"

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
    <Flex className="absolute inset-0 flex-col items-center bg-background">
      <Flex className="w-full flex-1 flex-col justify-between px-6 pb-4 pt-8">
        <WalletBalance usdAmount={totalAmounts} />
        <SendReceiveButtons nav={nav} isEnabled={isEnabled} />
      </Flex>
      <Flex className="w-full flex-1 flex-col justify-between gap-6 bg-background-highlight p-6">
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
