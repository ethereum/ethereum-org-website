import NextImage, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

type HomeSectionProps = {
  tag: string
  title: ReactNode
  imgSrc?: StaticImageData // TODO: Revert to required before prod
  isFlipped?: boolean
  className?: string
  children?: ReactNode
}

const HomeSection = ({
  tag,
  title,
  imgSrc,
  isFlipped,
  className,
  children,
}: HomeSectionProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row lg:gap-16",
        isFlipped && "md:flex-row-reverse",
        className
      )}
    >
      {imgSrc && (
        <NextImage
          className="min-h-full w-full rounded-4xl object-cover object-center md:max-w-96 lg:max-w-128"
          src={imgSrc}
          alt=""
        />
      )}
      <div className="w-full">
        <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0.5 text-sm uppercase text-primary">
          {tag}
        </div>
        <h2 className="mb-4 mt-2 text-5xl font-black lg:mb-6 lg:text-6xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default HomeSection
