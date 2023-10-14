import { chakra, type ChakraComponent } from "@chakra-ui/react"
import {
  GatsbyImage as Image,
  type GatsbyImageProps,
} from "gatsby-plugin-image"

export type GatsbyImageType = ChakraComponent<"img", GatsbyImageProps>

/**
 * Custom version of `GatsbyImage` optimized for Chakra
 */
const GatsbyImage: GatsbyImageType = chakra(Image, {
  shouldForwardProp: (prop) => {
    // Forward props that only GatsbyImage should be applying, else warnings may throw
    return [
      "image",
      "loading",
      "objectFit",
      "alt",
      "objectPosition",
      "imgClassName",
      "imgStyle",
    ].includes(prop)
  },
  label: "ChakraGatsbyImage",
})

export default GatsbyImage
