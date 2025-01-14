import { MdInfoOutline } from "react-icons/md"

import { ButtonLink } from "@/components/Buttons"
import NetworkUsageChart from "@/components/Layer2NetworksTable/NetworkUsageChart"
import InlineLink from "@/components/Link"
import Tooltip from "@/components/Tooltip"

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

const NetworkSubComponent = ({ network }) => {
  return (
    <div className="flex w-full flex-col gap-4 px-6 pb-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex h-fit flex-1 flex-col gap-4 bg-background p-4">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  Age{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Age</p>
                        <p>Shows how long the networks has been operational.</p>
                        <p>
                          Data from{" "}
                          <InlineLink href="https://growthepie.xyz">
                            growthepie
                          </InlineLink>
                          .
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
                  Wallet support{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Wallet support</p>
                        <p>
                          Indicates how many wallet apps support using the
                          network.
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
                  Active addresses{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">
                          Active addresses (weekly)
                        </p>
                        <p>
                          Number of active addresses on the network in the past
                          7 days.
                        </p>
                        <p>
                          Data from{" "}
                          <InlineLink href="https://growthepie.xyz">
                            growthepie
                          </InlineLink>
                          .
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
              <p>{formatNumber(network.activeAddresses)}</p>
            </div>
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold text-body-medium">
                  Fee token{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold">Fee token</p>
                        <p>
                          The token that is used to pay for transactions and
                          using the network.
                        </p>
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
              Network usage{" "}
              <Tooltip
                content={
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">Network usage</p>
                    <p>
                      An overview of network usage. Measures transaction count
                      in respective areas within the last 30 days.
                    </p>
                    <p>
                      Data from{" "}
                      <InlineLink href="https://growthepie.xyz">
                        growthepie
                      </InlineLink>
                      .
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
                  <p>No data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-body-medium">Links</p>
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
                Official website
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
                  Risk analysis
                </InlineLink>
              </div>
              <p className="text-xs text-body-medium">Assessment by L2BEAT</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <div>
                <InlineLink
                  href={network.growThePieLink}
                  customEventOptions={{
                    eventCategory: "l2_networks",
                    eventAction: "analytics_profiles",
                    eventName: network.name,
                  }}
                >
                  Detailed analytics
                </InlineLink>
              </div>
              <p className="text-xs text-body-medium">
                Assessment by growthepie
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
              Bridge to {network.name}
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
              View apps
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkSubComponent
