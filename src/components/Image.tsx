import NextImage, {
  ImageProps as NextImageProps,
  StaticImageData,
} from "next/image"
import { chakra, ChakraComponent, HTMLChakraProps } from "@chakra-ui/react"

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
  "style",
  "useMap",
]

const isStaticImageData = (src: ImageProps["src"]): src is StaticImageData => {
  return typeof src === "object" && "blurDataURL" in src
}

const DefaultNextImage = (props: ImageProps) => {
  if (isStaticImageData(props.src)) {
    return <NextImage placeholder="blur" {...props} />
  }

  const hasBlurData = !!props.blurDataURL
  return <NextImage placeholder={hasBlurData ? "blur" : "empty"} {...props} />
}

/**
 * TODO: Rename this component to `Image` once all components are using Tailwind
 */
export const TwImage = (props: NextImageProps) => (
  <DefaultNextImage {...props} />
)

/**
 * DEPRECATED: Use `TWImage` instead
 *
 * TODO: Remove this component once all components are using Tailwind
 *
 * @deprecated
 */
export const Image: ChakraComponent<"img", NextImageProps> = chakra(
  DefaultNextImage,
  {
    shouldForwardProp: (prop) => (imageProps as string[]).includes(prop),
  }
)
