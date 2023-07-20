import {
  GatsbyImage as Image,
  type GatsbyImageProps,
} from "gatsby-plugin-image"
import { chakra, ChakraComponent } from "@chakra-ui/react"

/**
 * The `GatsbyImage` component optimized for Chakra.
 *
 * @deprecated
 * To be deprecated in favor of a global component version.
 */
export const GatsbyImage: ChakraComponent<"img", GatsbyImageProps> = chakra(
  Image,
  {
    shouldForwardProp: (prop) => {
      return ["image", "loading", "objectFit", "alt"].includes(prop)
    },
  }
)
