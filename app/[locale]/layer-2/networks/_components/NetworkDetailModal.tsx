"use client"

import type { ComponentProps } from "react"

import CatalogDetailModal from "@/components/CatalogDetailModal"
import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import type { NetworkCardData } from "@/lib/utils/networkData"

import NetworkMaturityTag from "./NetworkMaturityTag"

/** Built on the server so no i18n runtime ships to the browser. */
export type NetworkModalLabels = {
  close: string
  maturity: string
  age: string
  walletSupport: string
  marketShare: string
  marketShareTooltip: string
  activeAddresses: string
  activeAddressesTooltip: string
  feeToken: string
  feeTokenTooltip: string
  txFee: string
  txFeeTooltip: string
  bridgeTo: string
  viewApps: string
}

const event = (action: string, name: string) => ({
  eventCategory: "l2_networks",
  eventAction: action,
  eventName: name,
})

/** Client-side detail modal fed from the card payload. */
const NetworkDetailModal = ({
  network,
  maturityLabel,
  labels,
  onClose,
  onCloseAutoFocus,
}: {
  network: NetworkCardData
  maturityLabel: string
  labels: NetworkModalLabels
  onClose: () => void
  onCloseAutoFocus: ComponentProps<
    typeof CatalogDetailModal
  >["onCloseAutoFocus"]
}) => (
  <CatalogDetailModal
    title={network.name}
    image={network.logo}
    closeLabel={labels.close}
    onClose={onClose}
    onCloseAutoFocus={onCloseAutoFocus}
  >
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <DetailRow label={labels.maturity}>
          <NetworkMaturityTag
            maturity={network.maturity}
            label={maturityLabel}
          />
        </DetailRow>
        <DetailRow label={labels.age}>
          <span className="font-bold text-body">{network.age ?? "-"}</span>
        </DetailRow>
        <DetailRow label={labels.walletSupport}>
          <InlineLink href={network.walletsHref}>
            {network.walletSupport}
          </InlineLink>
        </DetailRow>
        <DetailRow
          label={labels.marketShare}
          tooltip={labels.marketShareTooltip}
        >
          <span className="font-bold text-body">{network.tvl}</span>
        </DetailRow>
        <DetailRow
          label={labels.activeAddresses}
          tooltip={labels.activeAddressesTooltip}
        >
          <span className="font-bold text-body">
            {network.activeAddresses ?? "-"}
          </span>
        </DetailRow>
        <DetailRow label={labels.feeToken} tooltip={labels.feeTokenTooltip}>
          <span className="font-bold text-body">{network.feeToken}</span>
        </DetailRow>
        <DetailRow label={labels.txFee} tooltip={labels.txFeeTooltip}>
          <span className="font-bold text-body">{network.txFee ?? "-"}</span>
        </DetailRow>
      </div>

      <div className="flex flex-wrap gap-4">
        {network.bridgeLink && (
          <ButtonLink
            href={network.bridgeLink}
            className="w-full sm:w-fit"
            customEventOptions={event("bridge", network.name)}
          >
            {labels.bridgeTo} {network.name}
          </ButtonLink>
        )}
        <ButtonLink
          href={network.applicationsLink}
          variant="outline"
          className="w-full sm:w-fit"
          customEventOptions={event("view_apps", network.name)}
        >
          {labels.viewApps}
        </ButtonLink>
      </div>
    </div>
  </CatalogDetailModal>
)

export default NetworkDetailModal
