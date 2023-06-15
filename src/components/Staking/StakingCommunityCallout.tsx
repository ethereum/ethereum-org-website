import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import { FlexProps } from "@chakra-ui/react"

import ButtonLink from "../ButtonLink"
import CalloutBanner from "../CalloutBanner"
import Translation from "../Translation"

import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

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
      <ButtonContainer>
        <StyledButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked discord",
            })
          }}
          to="https://discord.io/ethstaker"
        >
          Discord
        </StyledButtonLink>
        <StyledButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked reddit",
            })
          }}
          to="https://reddit.com/r/ethstaker"
        >
          Reddit
        </StyledButtonLink>
        <StyledButtonLink
          onClick={() => {
            trackCustomEvent({
              eventCategory: `StakingCommunityCallout`,
              eventAction: `Clicked`,
              eventName: "clicked website",
            })
          }}
          to="https://ethstaker.cc"
        >
          <Translation id="rollup-component-website" />
        </StyledButtonLink>
      </ButtonContainer>
    </CalloutBanner>
  )
}

export default StakingCommunityCallout
