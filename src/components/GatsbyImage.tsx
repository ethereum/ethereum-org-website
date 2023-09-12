import { chakra, type ChakraComponent } from "@chakra-ui/react"
import {
  GatsbyImage as Image,
  type GatsbyImageProps as Props,
} from "gatsby-plugin-image"

export type GatsbyImageProps = ChakraComponent<"img", Props>

/**
 * Custom version of `GatsbyImage` optimized for Chakra
 */
const GatsbyImage: GatsbyImageProps = chakra(Image, {
  shouldForwardProp: (prop) => {
    // Forward props that only GatsbyImage should be applying, else warnings may throw
    return ["image", "loading", "objectFit", "alt", "objectPosition"].includes(
      prop
    )
  },
})

export default GatsbyImage
