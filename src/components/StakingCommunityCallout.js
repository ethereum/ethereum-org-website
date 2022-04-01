import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import ButtonLink from "./ButtonLink"
import CalloutBanner from "./CalloutBanner"

import { translateMessageId } from "../utils/translations"

const StyledCallout = styled(CalloutBanner)`
  margin: 4rem 0;
`

const ButtonContaier = styled.div`
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

const StakingCommunityCallout = ({ className, id }) => {
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
      image={getImage(image)}
      alt={translateMessageId("page-staking-image-alt", intl)}
      titleKey={"page-staking-join-community"}
      descriptionKey={"page-staking-join-community-desc"}
      id={id}
      className={className}
    >
      <ButtonContaier>
        <StyledButtonLink to="https://discord.io/ethstaker">
          Join Discord
        </StyledButtonLink>
        <StyledButtonLink to="https://reddit.com/r/ethstaker">
          Join Reddit
        </StyledButtonLink>
        <StyledButtonLink to="https://ethstaker.cc">
          Visit Website
        </StyledButtonLink>
      </ButtonContaier>
    </StyledCallout>
  )
}

export default StakingCommunityCallout
