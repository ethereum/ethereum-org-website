import type { ImageProps } from "@/components/Image"

export const resizeImage = (image: ImageProps["src"], width: number): ImageProps["src"] => {
  if (typeof image === "string") return image
  return { ...image, width }
}
