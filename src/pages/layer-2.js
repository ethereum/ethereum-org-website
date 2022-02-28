// Libraries
import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import { Content, Page } from "../components/SharedStyledComponents"

// Styles
const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.runNodeGradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const Layer2Page = ({ data }) => {
  const intl = useIntl()
  const heroContent = {
    title: "Layer 2",
    header: "Layer 2",
    subtitle: "Smart solutions to scale Ethereum",
    image: getImage(data.ethereumInside),
    alt: "test",
    buttons: [
      {
        content: "Use Layer 2",
        pathId: "use-layer-2",
      },
      {
        content: "Wait, what's Ethereum?",
        pathId: "/",
        isSecondary: "isSecondary",
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />

      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <Content></Content>
    </Page>
  )
}

export default Layer2Page

export const query = graphql`
  query {
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
