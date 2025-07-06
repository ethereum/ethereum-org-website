import NextImage, {
  ImageProps as NextImageProps,
  StaticImageData,
} from "next/image"

export type ImageProps = NextImageProps

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

export const Image = (props: NextImageProps) => <DefaultNextImage {...props} />
