import { MaturityLevel } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import { Tag } from "@/components/ui/tag"

const NetworkMaturityTooltip = ({ maturity }: { maturity: MaturityLevel }) => {
  const maturityDescription = {
    "n/a": {
      label: "N/A",
      description: "Not applicable to Ethereum mainnet.",
      tag: {
        variant: "outline",
      },
    },
    robust: {
      label: "Robust",
      description:
        "Fully decentralized and secure network that cannot be tampered with or stopped by any individual or group, including its creators.\n\nThis is a network that fulfills Ethereum's vision of decentralization.",
      tag: {
        className: "bg-blue-600 text-white border-none",
      },
    },
    maturing: {
      label: "Maturing",
      description:
        "A network transitioning to being decentralized. A group of actors still may be able to halt the network in extreme situations.",
      tag: {
        className: "bg-blue-400 text-white border-none",
      },
    },
    developing: {
      label: "Developing",
      description:
        "A centralized operator runs the network but adds fail-safe features to reduce risks of centralization.",
      tag: {
        className: "bg-blue-200 text-black border-none",
      },
    },
    emerging: {
      label: "Emerging",
      description:
        "A centralized operator runs the network. The data is publicly visible on Ethereum to verify whether the operator is being honest.",
      tag: {
        className: "bg-blue-100 text-black border-none",
      },
    },
  } as const

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">
            Network maturity: {maturityDescription[maturity].label}
          </p>
          <p className="whitespace-pre-wrap">
            {maturityDescription[maturity].description}
          </p>
        </div>
      }
    >
      <Tag variant="solid" {...maturityDescription[maturity].tag}>
        {maturity.toUpperCase()}
      </Tag>
    </Tooltip>
  )
}

export default NetworkMaturityTooltip
