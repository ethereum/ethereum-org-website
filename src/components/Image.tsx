import { chakra, ChakraComponent, HTMLChakraProps } from "@chakra-ui/react"
import NextImage, { ImageProps as NextImageProps } from "next/image"

export type ImageProps = NextImageProps &
  Omit<HTMLChakraProps<"img">, keyof NextImageProps>

const imageProps: (keyof NextImageProps)[] = [
  "src",
  "alt",
  "sizes",
  "width",
  "height",
  "fill",
  "loader",
  "quality",
  "priority",
  "loading",
  "placeholder",
  "blurDataURL",
  "unoptimized",
  "onLoadingComplete",
  "alt",
  "crossOrigin",
  "decoding",
  "loading",
  "referrerPolicy",
  "sizes",
  "src",
  "useMap",
]

/**
 * TODO: replace this component with import { Image } from "@chakra-ui/next-js"
 * once https://github.com/vercel/next.js/issues/52216 is fixed
 */
export const Image: ChakraComponent<"img", NextImageProps> = chakra(NextImage, {
  shouldForwardProp: (prop) => (imageProps as string[]).includes(prop),
})
