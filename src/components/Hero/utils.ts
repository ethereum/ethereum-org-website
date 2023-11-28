import { StaticImageData } from "next/image"
import { CallToActionProps } from "./CallToAction"

export type CommonHeroProps = {
  heroImgSrc: StaticImageData
  header: string
  title: string
  description: string
  buttons?: [CallToActionProps, CallToActionProps?]
}
