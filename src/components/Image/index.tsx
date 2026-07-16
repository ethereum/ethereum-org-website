import NextImage, {
  ImageProps as NextImageProps,
  StaticImageData,
} from "next/image"

export type ImageProps = NextImageProps

/**
 * These third-party hosts serve user-managed images that can expire or be
 * removed independently of ethereum.org. Sending them through `/_next/image`
 * turns a stale upstream response into a 400 from the image optimizer. Loading
 * them directly lets the browser's error event reach the contextual fallback
 * used by components such as event cards and avatars.
 */
const VOLATILE_REMOTE_IMAGE_HOSTS = new Set([
  "avatars.githubusercontent.com",
  "avatars0.githubusercontent.com",
  "avatars1.githubusercontent.com",
  "avatars2.githubusercontent.com",
  "avatars3.githubusercontent.com",
  "avatars4.githubusercontent.com",
  "coin-images.coingecko.com",
  "i.imgur.com",
  "images.lumacdn.com",
  "img.evbuc.com",
  "pbs.twimg.com",
  "secure.meetupstatic.com",
  "unavatar.io",
])

export const isVolatileRemoteImage = (src: ImageProps["src"]): boolean => {
  if (typeof src !== "string" || !src.startsWith("https://")) return false

  try {
    return VOLATILE_REMOTE_IMAGE_HOSTS.has(new URL(src).hostname)
  } catch {
    return false
  }
}

const isStaticImageData = (src: ImageProps["src"]): src is StaticImageData => {
  return typeof src === "object" && "blurDataURL" in src
}

const DefaultNextImage = (props: ImageProps) => {
  const unoptimized = props.unoptimized || isVolatileRemoteImage(props.src)

  if (isStaticImageData(props.src)) {
    return <NextImage placeholder="blur" {...props} unoptimized={unoptimized} />
  }

  const hasBlurData = !!props.blurDataURL
  return (
    <NextImage
      placeholder={hasBlurData ? "blur" : "empty"}
      {...props}
      unoptimized={unoptimized}
    />
  )
}

export const Image = (props: NextImageProps) => <DefaultNextImage {...props} />
