import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const LightImage = styled(Img)`
  display: ${(props) => props.theme.colors.displayDark} !important;
`
const DarkImage = styled(Img)`
  display: ${(props) => props.theme.colors.displayLight} !important;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      dark: file(relativePath: { eq: "ef-logo.png" }) {
        childImageSharp {
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      light: file(relativePath: { eq: "ef-logo-white.png" }) {
        childImageSharp {
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <>
      <LightImage
        fixed={data.light.childImageSharp.fixed}
        alt="Ethereum Foundation Logo"
      />
      <DarkImage
        fixed={data.dark.childImageSharp.fixed}
        alt="Ethereum Foundation Logo"
      />
    </>
  )
}

export default Logo
