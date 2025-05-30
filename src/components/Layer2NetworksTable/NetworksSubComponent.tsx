import { MdInfoOutline } from "react-icons/md"

import { ExtendedRollup } from "@/lib/types"

import NetworkUsageChart from "@/components/Layer2NetworksTable/NetworkUsageChart"
import Tooltip from "@/components/Tooltip"

import { ButtonLink } from "../ui/buttons/Button"
import InlineLink from "../ui/Link"

import useTranslation from "@/hooks/useTranslation"

const formatNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + "K"
  }
  return num.toString()
}

type NetworkSubComponentProps = {
  network: ExtendedRollup
}

const NetworkSubComponent = ({ network }: NetworkSubComponentProps) => {
  const { t } = useTranslation("page-layer-2-networks")

  return (
    <div className="flex w-full flex-col gap-4 px-6 pb-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex h-fit flex-1 flex-col gap-4 bg-background p-4">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  {t("page-layer-2-networks-age")}{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">
                          {t("page-layer-2-networks-age")}
                        </p>
                        <p>{t("page-layer-2-networks-show-how-long")}</p>
                        <p>
                          {t("page-layer-2-networks-data-from")}{" "}
                          <InlineLink href="https://growthepie.com">
                            growthepie
                          </InlineLink>
                          {t("page-layer-2-networks-period")}
                        </p>
                      </div>
                    }
                    customMatomoEvent={{
                      eventCategory: "l2_networks",
                      eventAction: "tooltip",
                      eventName: "age",
                    }}
                  >
                    <MdInfoOutline className="translate-y-0.5" />
                  </Tooltip>
                </p>
                <p>
                  {(() => {
                    if (!network.launchDate) return "-"
                    const launch = new Date(network.launchDate)
                    const today = new Date()
                    const yearDiff = today.getFullYear() - launch.getFullYear()
                    const monthDiff = today.getMonth() - launch.getMonth()

                    const totalMonths = yearDiff * 12 + monthDiff
                    const years = Math.floor(totalMonths / 12)
                    const months = totalMonths % 12

                    return `${years ? years + " year" + (years > 1 ? "s" : "") : ""} ${months ? months + " month" + (months > 1 ? "s" : "") : ""}`.trim()
                  })()}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  {t("page-layer-2-networks-wallet-support")}{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">
                          {t("page-layer-2-networks-wallet-support")}
                        </p>
                        <p>
                          {t("page-layer-2-networks-how-many-wallet-support")}
                        </p>
                      </div>
                    }
                    customMatomoEvent={{
                      eventCategory: "l2_networks",
                      eventAction: "tooltip",
                      eventName: "wallet_support",
                    }}
                  >
                    <MdInfoOutline className="translate-y-0.5" />
                  </Tooltip>
                </p>
              </div>
              <p>
                <InlineLink
                  href={`/wallets/find-wallet/?layer_2_support=["${network.chainName}"]`}
                >
                  {network.walletsSupportedCount}
                </InlineLink>
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  {t("page-layer-2-networks-active-address")}{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">
                          {t("page-layer-2-networks-active-address-weekly")}
                        </p>
                        <p>
                          {t("page-layer-2-networks-active-address-number")}
                        </p>
                        <p>
                          {t("page-layer-2-networks-data-from")}{" "}
                          <InlineLink href="https://growthepie.xyz">
                            growthepie
                          </InlineLink>
                          {t("page-layer-2-networks-period")}
                        </p>
                      </div>
                    }
                    customMatomoEvent={{
                      eventCategory: "l2_networks",
                      eventAction: "tooltip",
                      eventName: "active_addresses",
                    }}
                  >
                    <MdInfoOutline className="translate-y-0.5" />
                  </Tooltip>
                </p>
              </div>
              <p>
                {network.activeAddresses
                  ? formatNumber(network.activeAddresses)
                  : "-"}
              </p>
            </div>
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  {t("page-layer-2-networks-fee-token")}{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Fee token</p>
                        <p>{t("page-layer-2-networks-token-used-to-pay")}</p>
                      </div>
                    }
                    customMatomoEvent={{
                      eventCategory: "l2_networks",
                      eventAction: "tooltip",
                      eventName: "fee_token",
                    }}
                  >
                    <MdInfoOutline className="translate-y-0.5" />
                  </Tooltip>
                </p>
              </div>
              <p>{network.feeToken.join(", ")}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 gap-2">
          <div>
            <p className="text-xs font-bold text-body-medium">
              {t("page-layer-2-networks-network-usage")}{" "}
              <Tooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">
                      {t("page-layer-2-networks-network-usage")}
                    </p>
                    <p>{t("page-layer-2-networks-network-usage-overview")}</p>
                    <p>
                      {t("page-layer-2-networks-data-from")}{" "}
                      <InlineLink href="https://growthepie.xyz">
                        growthepie
                      </InlineLink>
                      {t("page-layer-2-networks-period")}
                    </p>
                  </div>
                }
              >
                <MdInfoOutline className="translate-y-0.5" />
              </Tooltip>
            </p>
            <div className="w-full">
              {network.blockspaceData && (
                <NetworkUsageChart usageData={network.blockspaceData} />
              )}
              {network.blockspaceData === null && (
                <div className="flex h-20 w-full items-center justify-center">
                  <p>{t("page-layer-2-networks-no-data-available")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-body-medium">
            {t("page-layer-2-networks-links")}
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <InlineLink
                href={network.website}
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: "networks_website",
                  eventName: network.name,
                }}
              >
                {t("page-layer-2-networks-official-website")}
              </InlineLink>
            </div>
            <div className="flex flex-col gap-0.5">
              <div>
                <InlineLink
                  href={network.l2BeatLink}
                  customEventOptions={{
                    eventCategory: "l2_networks",
                    eventAction: "l2beat_profiles",
                    eventName: network.name,
                  }}
                >
                  {t("page-layer-2-networks-risk-analysis")}
                </InlineLink>
              </div>
              <p className="text-xs text-body-medium">
                {t("page-layer-2-networks-assessment-by-l2beat")}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <div>
                <InlineLink
                  href={network.growthepieLink}
                  customEventOptions={{
                    eventCategory: "l2_networks",
                    eventAction: "analytics_profiles",
                    eventName: network.name,
                  }}
                >
                  {t("page-layer-2-networks-detailed-analytics")}
                </InlineLink>
              </div>
              <p className="text-xs text-body-medium">
                {t("page-layer-2-networks-assessment-by-growthepie")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-body-medium">Actions</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink
              href={network.bridgeLink}
              customEventOptions={{
                eventCategory: "l2_networks",
                eventAction: "bridge",
                eventName: network.name,
              }}
            >
              {t("page-layer-2-networks-bridge-to")} {network.name}
            </ButtonLink>
            <ButtonLink
              href={network.applicationsLink}
              variant="outline"
              customEventOptions={{
                eventCategory: "l2_networks",
                eventAction: "view_apps",
                eventName: network.name,
              }}
            >
              {t("page-layer-2-networks-view-apps")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkSubComponent
