import { IGatsbyImageData } from "gatsby-plugin-image"
import { CallToActionProps } from "./CallToAction"

export type CommonHeroProps = {
  heroImgSrc: IGatsbyImageData
  header: string
  title: string
  description: string
  buttons?: [CallToActionProps, CallToActionProps?]
}
