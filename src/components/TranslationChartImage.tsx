import React from "react"
import { Image, useColorModeValue } from "@chakra-ui/react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "../utils/image"

export interface IProps {}

const TranslationChartImage: React.FC<IProps> = () => {
  const data = useStaticQuery(graphql`
    {
      pageviewsLight: file(
        relativePath: { eq: "translation-program/pageviews-light.png" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 500, placeholder: BLURRED, quality: 100)
        }
      }
      pageviewsDark: file(
        relativePath: { eq: "translation-program/pageviews-dark.png" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 500, placeholder: BLURRED, quality: 100)
        }
      }
    }
  `)

  const ethImage = useColorModeValue(data.pageviewsLight, data.pageviewsDark)

  return (
    <Image
      as={GatsbyImage}
      image={getImage(ethImage)!}
      alt=""
      fit="contain"
      minW="263px"
    />
  )
}

export default TranslationChartImage
