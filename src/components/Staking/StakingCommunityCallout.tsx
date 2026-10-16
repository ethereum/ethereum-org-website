import React from "react"
import { getTranslations } from "next-intl/server"

import Discord from "@/components/icons/discord.svg"
import Reddit from "@/components/icons/reddit.svg"
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
        href="https://ethstaker.cc"
        customEventOptions={{
          eventCategory: "StakingCommunityCallout",
          eventAction: "Clicked",
          eventName: "clicked website",
        }}
      >
        {tCommon("rollup-component-website")}
      </ButtonLink>
      <div className="flex items-center justify-around gap-4 @max-sm/content:*:w-full">
        <ButtonLink
          href="https://discord.gg/ethstaker"
          customEventOptions={{
            eventCategory: "StakingCommunityCallout",
            eventAction: "Clicked",
            eventName: "clicked discord",
          }}
          variant="outline"
          isSecondary
          hideArrow
        >
          <Discord />
          Discord
        </ButtonLink>
        <ButtonLink
          href="https://reddit.com/r/ethstaker"
          customEventOptions={{
            eventCategory: "StakingCommunityCallout",
            eventAction: "Clicked",
            eventName: "clicked reddit",
          }}
          variant="outline"
          isSecondary
          hideArrow
        >
          <Reddit />
          Reddit
        </ButtonLink>
      </div>
    </Callout>
  )
}

export default StakingCommunityCallout
