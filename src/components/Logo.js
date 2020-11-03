import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeContext } from "styled-components"
import Img from "gatsby-image"

const Logo = () => {
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
    <Img fixed={image.childImageSharp.fixed} alt="Ethereum Foundation Logo" />
  )
}

export default Logo
