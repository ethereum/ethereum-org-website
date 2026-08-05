import { memo } from "react"

import { ChainName } from "@/lib/types"

import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"

import { appOnlyNetworks } from "@/data/networks/app-networks"
import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

const networkData = [ethereumNetworkData, ...layer2Data, ...appOnlyNetworks]

/**
 * Chains this component can actually draw. Callers must guard on this rather
 * than the raw list, or a chain missing from `networkData` renders an empty row.
 */
export const getRenderableChains = (chains: ChainName[]): ChainName[] =>
  chains.filter((chain) =>
    networkData.some((network) => network.chainName === chain)
  )

interface ChainImagesProps {
  chains: ChainName[]
  size?: number
  className?: string
  /**
   * Render the network-name tooltips with the base `bg-background` color
   * instead of `bg-background-highlight`, for when these icons live in a
   * container that turns `bg-background-highlight` (e.g. a wallet table row on
   * hover/open) and the default tooltip would blend in.
   */
  nested?: boolean
}

const ChainImages = ({
  chains,
  size = 24,
  className = "",
  nested,
}: ChainImagesProps) => {
  const filteredChains = getRenderableChains(chains)

  return (
    <div className={`flex flex-row ${className}`}>
      {filteredChains.map((chain) => {
        const chainData = networkData.find(
          (network) => network.chainName === chain
        )
        return (
          <div
            key={chain}
            className="inline-flex items-center justify-center overflow-hidden rounded-full leading-none"
            style={{
              height: `${size}px`,
            }}
          >
            <Tooltip content={chainData?.name || ""} nested={nested}>
              <Image
                src={chainData?.logo || ""}
                alt={`${chain} blockchain network`}
                className="block rounded-full"
                style={{
                  objectFit: "contain",
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              />
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default memo(ChainImages)
