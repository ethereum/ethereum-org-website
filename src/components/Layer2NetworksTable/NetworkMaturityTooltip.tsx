import { MaturityLevel } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import { Badge, BadgeProps } from "@/components/ui/badge"

const NetworkMaturityTooltip = ({ maturity }: { maturity: MaturityLevel }) => {
  const maturityDescription = {
    "n/a": {
      label: "N/A",
      description: "Not applicable to Ethereum mainnet.",
    },
    robust: {
      label: "Robust",
      description:
        "Fully decentralized and secure network that cannot be tampered with or stopped by any individual or group, including its creators.\n\nThis is a network that fulfills Ethereum's vision of decentralization.",
    },
    maturing: {
      label: "Maturing",
      description:
        "A network transitioning to being decentralized. A group of actors still may be able to halt the network in extreme situations.",
    },
    developing: {
      label: "Developing",
      description:
        "A centralized operator runs the network but adds fail-safe features to reduce risks of centralization.",
    },
    emerging: {
      label: "Emerging",
      description:
        "A centralized operator runs the network. The data is publicly visible on Ethereum to verify whether the operator is being honest.",
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
      <Badge variant={maturity as BadgeProps["variant"]}>
        {maturity.toUpperCase()}
      </Badge>
    </Tooltip>
  )
}

export default NetworkMaturityTooltip
