import React from "react"
import { useIntl } from "react-intl"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import ButtonLink from "../ButtonLink"
import CalloutBanner from "../CalloutBanner"
import Translation from "../Translation"

import { translateMessageId } from "../../utils/translations"
import { trackCustomEvent } from "../../utils/matomo"

const StyledCallout = styled(CalloutBanner)`
  margin: 4rem 0;
`

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

export interface IProps {
  id?: string
}

const StakingCommunityCallout: React.FC<IProps> = (props) => {
  const intl = useIntl()
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
    <StyledCallout
      {...props}
      image={getImage(image)}
      alt={translateMessageId("page-staking-image-alt", intl)}
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
    </StyledCallout>
  )
}

export default StakingCommunityCallout
