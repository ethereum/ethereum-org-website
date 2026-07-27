import { Info } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { ExtendedRollup } from "@/lib/types"

import NetworkUsageChart from "@/components/Layer2NetworksTable/NetworkUsageChart"
import Tooltip from "@/components/Tooltip"

import { formatCompactNumber } from "@/lib/utils/numbers"
import { formatDuration } from "@/lib/utils/time"

import { ButtonLink } from "../ui/buttons/Button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Grid } from "../ui/grid"
import InlineLink from "../ui/Link"

type NetworkSubComponentProps = {
  network: ExtendedRollup
}

const NetworkSubComponent = ({ network }: NetworkSubComponentProps) => {
  const t = useTranslations("page-layer-2-networks")
  const locale = useLocale()

  return (
    <div className="@container space-y-4">
      <Card size="md">
        <CardContent>
          <Grid className="grid-cols-1! @md:grid-cols-2! @3xl:grid-cols-4!">
            <div>
              <p className="text-sm font-bold text-pretty text-body-medium">
                {t("page-layer-2-networks-age")}&nbsp;
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
                  <Info className="size-[0.875em] translate-y-0.5" />
                </Tooltip>
              </p>
              <p>
                {network.launchDate
                  ? formatDuration(
                      Date.now() - new Date(network.launchDate).getTime(),
                      locale,
                      { units: ["y", "mo"], round: true }
                    )
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-pretty text-body-medium">
                {t("page-layer-2-networks-wallet-support")}&nbsp;
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
                  <Info className="size-[0.875em] translate-y-0.5" />
                </Tooltip>
              </p>
              <p>
                <InlineLink
                  href={`/wallets/find-wallet/?layer_2_support=["${network.chainName}"]`}
                >
                  {network.walletsSupportedCount}
                </InlineLink>
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-pretty text-body-medium">
                {t("page-layer-2-networks-active-address")}&nbsp;
                <Tooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-bold">
                        {t("page-layer-2-networks-active-address-weekly")}
                      </p>
                      <p>{t("page-layer-2-networks-active-address-number")}</p>
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
                    eventName: "active_addresses",
                  }}
                >
                  <Info className="size-[0.875em] translate-y-0.5" />
                </Tooltip>
              </p>
              <p>
                {network.activeAddresses
                  ? formatCompactNumber(network.activeAddresses, locale)
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-pretty text-body-medium">
                {t("page-layer-2-networks-fee-token")}&nbsp;
                <Tooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-bold">
                        {t("page-layer-2-networks-fee-token")}
                      </p>
                      <p>{t("page-layer-2-networks-token-used-to-pay")}</p>
                    </div>
                  }
                  customMatomoEvent={{
                    eventCategory: "l2_networks",
                    eventAction: "tooltip",
                    eventName: "fee_token",
                  }}
                >
                  <Info className="size-[0.875em] translate-y-0.5" />
                </Tooltip>
              </p>
              <p>{network.feeToken.join(", ")}</p>
            </div>
          </Grid>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4 @2xl:flex-row-reverse">
        {network.blockspaceData && (
          <Card variant="nested" size="md">
            <CardContent>
              <p className="text-sm font-bold text-pretty text-body-medium">
                {t("page-layer-2-networks-network-usage")}&nbsp;
                <Tooltip
                  content={
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-bold">
                        {t("page-layer-2-networks-network-usage")}
                      </p>
                      <p>{t("page-layer-2-networks-network-usage-overview")}</p>
                      <p>
                        {t("page-layer-2-networks-data-from")}{" "}
                        <InlineLink href="https://growthepie.com">
                          growthepie
                        </InlineLink>
                        {t("page-layer-2-networks-period")}
                      </p>
                    </div>
                  }
                >
                  <Info className="size-[0.875em] translate-y-0.5" />
                </Tooltip>
              </p>
              <NetworkUsageChart usageData={network.blockspaceData} />
            </CardContent>
          </Card>
        )}
        <Card variant="nested" size="md" className="flex-1">
          <CardContent>
            <p className="text-sm font-bold text-body-medium">
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
          </CardContent>
          {/* </Card>
      <Card variant="nested" size="md"> */}
          <CardFooter>
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
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default NetworkSubComponent
