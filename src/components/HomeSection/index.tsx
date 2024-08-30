import NextImage, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"

import {
  Section,
  SectionBanner,
  SectionContent,
  SectionTag,
  SectionTitle,
} from "../ui/section"

type HomeSectionProps = {
  tag: string
  title: ReactNode
  imgSrc: StaticImageData
  className?: string
  children?: ReactNode
}

const HomeSection = ({
  tag,
  title,
  imgSrc,
  className,
  children,
}: HomeSectionProps) => (
  <Section className={className}>
    <SectionBanner>
      <NextImage src={imgSrc} alt="" />
    </SectionBanner>

    <SectionContent>
      <SectionTag>{tag}</SectionTag>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContent>
  </Section>
)

export default HomeSection
