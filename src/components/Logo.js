import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeContext } from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import { translateMessageId } from "../utils/translations"

const Logo = () => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
  const data = useStaticQuery(graphql`
    {
      dark: file(relativePath: { eq: "ef-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            height: 100
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      light: file(relativePath: { eq: "ef-logo-white.png" }) {
        childImageSharp {
          gatsbyImageData(
            height: 100
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const image = isDarkTheme ? data.light : data.dark
  return (
    <GatsbyImage
      image={getImage(image)}
      alt={translateMessageId("ethereum-foundation-logo", intl)}
    />
  )
}

export default Logo
