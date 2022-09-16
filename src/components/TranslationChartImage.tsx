import React from "react"
import { useTheme } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "../utils/image"

export interface IProps {}

const TranslationChartImage: React.FC<IProps> = () => {
  const theme = useTheme()
  const isDarkTheme = theme.isDark

  const data = useStaticQuery(graphql`
    {
      pageviewsLight: file(
        relativePath: { eq: "translation-program/pageviews-light.png" }
      ) {
        childImageSharp {
          gatsbyImageData(
            height: 100
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      pageviewsDark: file(
        relativePath: { eq: "translation-program/pageviews-dark.png" }
      ) {
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

  const ethImage = isDarkTheme ? data.pageviewsDark : data.pageviewsLight

  return (
    <>
      <GatsbyImage image={getImage(ethImage)!} alt="" />
    </>
  )
}

export default TranslationChartImage
