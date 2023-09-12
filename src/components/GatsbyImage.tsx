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
    // Have to add all used GatsbyImage props, else console warnings will throw
    return ["image", "loading", "objectFit", "alt"].includes(prop)
  },
})

export default GatsbyImage
