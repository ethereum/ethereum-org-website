import React from "react"
import { getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"

import image from "@/public/images/enterprise-eth.png"

const StakingCommunityCallout = async (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  const t = await getTranslations("page-staking")
  const tCommon = await getTranslations("common")

  return (
    <Callout
      image={image}
      title={t("page-staking-join-community")}
      description={t("page-staking-join-community-desc")}
      {...props}
    >
      <ButtonLink
        href="https://discord.gg/ethstaker"
        customEventOptions={{
          eventCategory: "StakingCommunityCallout",
          eventAction: "Clicked",
          eventName: "clicked discord",
        }}
      >
        Discord
      </ButtonLink>
      <ButtonLink
        href="https://reddit.com/r/ethstaker"
        customEventOptions={{
          eventCategory: "StakingCommunityCallout",
          eventAction: "Clicked",
          eventName: "clicked reddit",
        }}
      >
        Reddit
      </ButtonLink>
      <ButtonLink
        href="https://ethstaker.cc"
        customEventOptions={{
          eventCategory: "StakingCommunityCallout",
          eventAction: "Clicked",
          eventName: "clicked website",
        }}
      >
        {tCommon("rollup-component-website")}
      </ButtonLink>
    </Callout>
  )
}

export default StakingCommunityCallout
