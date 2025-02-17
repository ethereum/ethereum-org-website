import React from "react"
import { useTranslation } from "next-i18next"

import CalloutBanner from "@/components/CalloutBanner"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import image from "@/public/images/enterprise-eth.png"

export type StakingCommunityCalloutProps =
  React.HTMLAttributes<HTMLDivElement> & {
    id?: string
  }

const StakingCommunityCallout = (props: StakingCommunityCalloutProps) => {
  const { t } = useTranslation("page-staking")

  return (
    <CalloutBanner
      {...props}
      image={image}
      alt={t("page-staking-image-alt")}
      titleKey={"page-staking-join-community"}
      descriptionKey={"page-staking-join-community-desc"}
      imageWidth={350}
    >
      <Flex className="flex-col gap-4 md:flex-row">
        <ButtonLink
          className="w-full md:w-auto"
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked discord",
            })
          }}
          href="https://discord.gg/ethstaker"
        >
          Discord
        </ButtonLink>
        <ButtonLink
          className="w-full md:w-auto"
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked reddit",
            })
          }}
          href="https://reddit.com/r/ethstaker"
        >
          Reddit
        </ButtonLink>
        <ButtonLink
          className="w-full md:w-auto"
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked website",
            })
          }}
          href="https://ethstaker.cc"
        >
          {t("common:rollup-component-website")}
        </ButtonLink>
      </Flex>
    </CalloutBanner>
  )
}

export default StakingCommunityCallout
