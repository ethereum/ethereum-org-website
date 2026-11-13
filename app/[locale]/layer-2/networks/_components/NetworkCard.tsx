"use client"

import { memo } from "react"

import { Image } from "@/components/Image"
import { LinkBox } from "@/components/ui/link-box"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { MAINNET_ID, type NetworkCardData } from "@/lib/utils/networkData"

import NetworkMaturityTag from "./NetworkMaturityTag"

type NetworkCardProps = {
  network: NetworkCardData
  maturityLabel: string
  /** Raw "{count} wallets" message */
  walletsCount: string
  onOpen?: () => void
}

const NetworkCard = memo(function NetworkCard({
  network,
  maturityLabel,
  walletsCount,
  onOpen,
}: NetworkCardProps) {
  return (
    <LinkBox className="flex flex-row items-start gap-3 rounded-xl p-3 transition-colors hover:bg-background-highlight">
      <Image
        src={network.logo}
        alt=""
        className="size-14 shrink-0 rounded-lg object-contain"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <button
          type="button"
          data-network-card={network.slug ?? MAINNET_ID}
          onClick={() => {
            trackCustomEvent({
              eventCategory: "l2_networks",
              eventAction: "open_network_modal",
              eventName: network.name,
            })
            onOpen?.()
          }}
          className="text-start text-lg font-bold text-body after:absolute after:inset-0"
        >
          {network.name}
        </button>
        <NetworkMaturityTag maturity={network.maturity} label={maturityLabel} />
        <div className="space-y-0.5 text-sm text-body-medium">
          <p>{network.tvl}</p>
          <p>{walletsCount.replace("{count}", network.walletSupport)}</p>
        </div>
      </div>
    </LinkBox>
  )
})

export default NetworkCard
