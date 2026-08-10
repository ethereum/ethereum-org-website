"use client"

import { useTranslations } from "next-intl"

import Tools from "@/components/icons/tools.svg"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { CANONICAL_STAKING_TESTNET } from "@/lib/constants"

import { Strong } from "../IntlStringElements"
import InlineLink from "../ui/Link"

import rhinoImg from "@/public/images/upgrades/upgrade_rhino.png"

const StakingLaunchpadWidget = () => {
  const t = useTranslations("page-staking")

  const testnetLabel = t("page-staking-network-testnet", {
    network: CANONICAL_STAKING_TESTNET,
  })

  return (
    <div className="flex flex-col items-center gap-8 rounded-4xl bg-background-highlight p-6 lg:flex-row lg:items-start lg:justify-between lg:p-12">
      {/* Prose cap only applies once the image sits alongside; stacked, the text
          fills the container */}
      <div className="flow lg:max-w-prose">
        <p>
          {t.rich("page-staking-launchpad-widget-p1", {
            network: CANONICAL_STAKING_TESTNET,
            strong: Strong,
            link: (chunks) => (
              <InlineLink href="/developers/docs/nodes-and-clients/client-diversity/">
                {chunks}
              </InlineLink>
            ),
          })}
        </p>
        <p>{t("page-staking-launchpad-widget-p2")}</p>
        <p className="text-sm text-body-medium">
          {t("page-staking-launchpad-widget-span")}
        </p>
        {/* Stretch to full width below md, natural width from md up -- matches the
            standalone tools button below */}
        <div className="flex flex-col items-stretch gap-4 md:items-start">
          <ButtonLink
            href={`https://${CANONICAL_STAKING_TESTNET.toLowerCase()}.launchpad.ethereum.org`}
            customEventOptions={{
              eventCategory: "StakingLaunchpadWidget",
              eventAction: "Clicked",
              eventName: "clicked start staking testnet",
            }}
          >
            {t("page-staking-launchpad-widget-start", {
              network: testnetLabel,
            })}
          </ButtonLink>
          <ButtonLink
            href="https://launchpad.ethereum.org"
            variant="outline"
            customEventOptions={{
              eventCategory: "StakingLaunchpadWidget",
              eventAction: "Clicked",
              eventName: "clicked start staking mainnet",
            }}
          >
            {t("page-staking-launchpad-widget-start", {
              network: t("page-staking-launchpad-widget-mainnet-label"),
            })}
          </ButtonLink>
        </div>
        <p>{t("page-staking-launchpad-widget-p3")}</p>
        <ButtonLink
          href="#node-and-client-tools"
          variant="outline"
          className="max-md:w-full"
        >
          <Tools /> {t("page-staking-launchpad-widget-link")}
        </ButtonLink>
      </div>
      <Image
        src={rhinoImg}
        alt={t("page-staking-image-alt")}
        className="h-auto w-72 max-w-full shrink-0 object-contain lg:self-center"
      />
    </div>
  )
}

export default StakingLaunchpadWidget
