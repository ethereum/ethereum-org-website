import { IGatsbyImageData } from "gatsby-plugin-image"
import { CTAParentProps } from "./CallToAction"

export type CommonHeroProps = {
  heroImgSrc: IGatsbyImageData
  header: string
  title: string
  description: string
  buttons?: [CTAParentProps, CTAParentProps?]
}
