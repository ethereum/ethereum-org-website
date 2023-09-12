import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useColorMode } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { getImage } from "../utils/image"
import GatsbyImage from "./GatsbyImage"

export interface IProps {}

const Logo: React.FC<IProps> = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isDarkTheme = colorMode === "dark"
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
    <GatsbyImage image={getImage(image)!} alt={t("ethereum-foundation-logo")} />
  )
}

export default Logo
