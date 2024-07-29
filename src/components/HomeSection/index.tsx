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
        "flex flex-col gap-8 lg:flex-row xl:gap-16",
        isFlipped && "lg:flex-row-reverse",
        className
      )}
    >
      {imgSrc && (
        <NextImage
          className="min-h-full w-full rounded-4xl object-cover object-center lg:max-w-128"
          src={imgSrc}
          alt=""
        />
      )}
      <div className="w-full">
        <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
          {tag}
        </div>
        <h2 className="mb-4 mt-2 text-5xl font-black xl:mb-6 xl:text-7xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default HomeSection
