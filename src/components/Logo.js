import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeContext } from "styled-components"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import { translateMessageId } from "../utils/translations"

const Logo = () => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
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

  const image = isDarkTheme ? data.light : data.dark
  return (
    <Img
      fixed={image.childImageSharp.fixed}
      alt={translateMessageId("ethereum-foundation-logo", intl)}
    />
  )
}

export default Logo
