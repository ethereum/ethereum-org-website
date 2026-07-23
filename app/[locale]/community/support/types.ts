import { type LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type ItemSection = {
  titleKey: string
  Svg: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  colorClass: string
  descriptionKey: string
  eventAction: string
  items: { labelKey: string; href: string; eventName: string }[]
}
