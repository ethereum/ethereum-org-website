import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, useStaticQuery } from "gatsby"
import { Flex, FlexProps } from "@chakra-ui/react"

import ButtonLink from "../ButtonLink"
import CalloutBanner from "../CalloutBanner"
import Translation from "../Translation"

import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"

export interface IProps extends FlexProps {
  id?: string
}

const StakingCommunityCallout: React.FC<IProps> = (props) => {
  const { t } = useTranslation()
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "enterprise-eth.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 500
            layout: CONSTRAINED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  return (
    <CalloutBanner
      {...props}
      image={getImage(image)!}
      alt={t("page-staking-image-alt")}
      titleKey={"page-staking-join-community"}
      descriptionKey={"page-staking-join-community-desc"}
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
          to="https://discord.io/ethstaker"
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
          <Translation id="rollup-component-website" />
        </ButtonLink>
      </Flex>
    </CalloutBanner>
  )
}

export default StakingCommunityCallout
