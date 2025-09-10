import { memo } from "react"

import { ChainName } from "@/lib/types"

import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

interface ChainImagesProps {
  chains: ChainName[]
  size?: number
  className?: string
}

const ChainImages = ({
  chains,
  size = 24,
  className = "",
}: ChainImagesProps) => {
  const networkData = [ethereumNetworkData, ...layer2Data]

  const filteredChains = chains.filter((chain) =>
    networkData.some((network) => network.chainName === chain)
  )

  return (
    <div className={`flex flex-row ${className}`}>
      {filteredChains.map((chain) => {
        const chainData = networkData.find(
          (network) => network.chainName === chain
        )
        return (
          <div key={chain} className="overflow-hidden rounded-full">
            <Tooltip content={chainData?.name || ""}>
              <Image
                src={chainData?.logo || ""}
                alt={`${chain} blockchain network`}
                className="rounded-full"
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
