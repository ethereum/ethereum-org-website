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
          gatsbyImageData(
            height: 500
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
            height: 500
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const ethImage = useColorModeValue(data.pageviewsLight, data.pageviewsDark)

  return (
    <Flex justifyContent="center" objectFit="contain">
      <Image
        as={GatsbyImage}
        image={getImage(ethImage)!}
        alt=""
        fit="contain"
        minW="263px"
      />
    </Flex>
  )
}

export default TranslationChartImage
