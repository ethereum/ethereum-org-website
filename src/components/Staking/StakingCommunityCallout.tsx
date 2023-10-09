import { Flex, type FlexProps } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import CalloutBanner from "@/components/CalloutBanner"
// TODO: Re-enable after i18n implemented
// import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
import image from "@/../public/enterprise-eth.png"

export interface IProps extends FlexProps {
  id?: string
}

const StakingCommunityCallout: React.FC<IProps> = (props) => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()

  return (
    <CalloutBanner
      {...props}
      image={image}
      // alt={t("page-staking-image-alt")}
      alt="page-staking-image-alt"
      titleKey={"page-staking-join-community"}
      descriptionKey={"page-staking-join-community-desc"}
      maxImageWidth={350}
    >
      <Flex gap={4} direction={{ base: "column", md: "row" }}>
        <ButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked discord",
            })
          }}
          to="https://discord.gg/ethstaker"
          w={{ base: "full", md: "auto" }}
        >
          Discord
        </ButtonLink>
        <ButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked reddit",
            })
          }}
          to="https://reddit.com/r/ethstaker"
          w={{ base: "full", md: "auto" }}
        >
          Reddit
        </ButtonLink>
        <ButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked website",
            })
          }}
          to="https://ethstaker.cc"
          w={{ base: "full", md: "auto" }}
        >
          {/* TODO */}
          {/* <Translation id="rollup-component-website" /> */}
          Website
        </ButtonLink>
      </Flex>
    </CalloutBanner>
  )
}

export default StakingCommunityCallout
