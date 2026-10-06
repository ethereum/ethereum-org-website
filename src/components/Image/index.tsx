import NextImage, {
  ImageProps as NextImageProps,
  StaticImageData,
} from "next/image"

export type ImageProps = NextImageProps

// The `src !== null` check is load-bearing: `typeof null === "object"`, so a null
// src reaches the `in` operator and throws, which aborts the whole static export.
const isStaticImageData = (src: ImageProps["src"]): src is StaticImageData => {
  return typeof src === "object" && src !== null && "blurDataURL" in src
}

const DefaultNextImage = (props: ImageProps) => {
  if (isStaticImageData(props.src)) {
    return <NextImage placeholder="blur" {...props} />
  }

  const hasBlurData = !!props.blurDataURL
  return <NextImage placeholder={hasBlurData ? "blur" : "empty"} {...props} />
}

export const Image = (props: NextImageProps) => <DefaultNextImage {...props} />
