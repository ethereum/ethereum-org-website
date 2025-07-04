import { ChainName } from "@/lib/types"

import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

interface ChainImagesProps {
  chains: ChainName[]
  size?: number
  className?: string
}

export const ChainImages = ({
  chains,
  size = 24,
  className = "",
}: ChainImagesProps) => {
  return (
    <div className={`flex flex-row ${className}`}>
      {chains.map((chain) => {
        const chainData = [ethereumNetworkData, ...layer2Data].find(
          (l2) => l2.chainName === chain
        )
        return (
          <div key={chain} className="-ml-1.5 overflow-hidden rounded-full">
            <Tooltip content={chainData?.name || ""}>
              <Image
                src={chainData?.logo || ""}
                alt=""
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
